"""
The ORM layer: one Pydantic `LanceModel` per LanceDB table, and a typed `Table`
repository that speaks in model instances rather than Arrow batches.

Every filter that reaches LanceDB is built by `Q`, which quotes every literal.
Nothing else in the codebase interpolates a value into a filter string, and
nothing must.
"""

from __future__ import annotations

import threading
from typing import Any, Generic, Iterable, Optional, TypeVar

import pyarrow as pa
from lancedb.pydantic import LanceModel, Vector

T = TypeVar("T", bound=LanceModel)


# ── filters ───────────────────────────────────────────────────────────────────


class Q:
    """Filter fragments. Every literal is quoted here and nowhere else."""

    @staticmethod
    def lit(value: Any) -> str:
        if value is None:
            return "NULL"
        if isinstance(value, bool):
            return "true" if value else "false"
        if isinstance(value, (int, float)):
            return repr(value)
        return "'" + str(value).replace("'", "''") + "'"

    @staticmethod
    def eq(column: str, value: Any) -> str:
        return f"{column} = {Q.lit(value)}"

    @staticmethod
    def ne(column: str, value: Any) -> str:
        return f"{column} != {Q.lit(value)}"

    @staticmethod
    def in_(column: str, values: Iterable[Any]) -> str:
        items = [Q.lit(v) for v in values]
        if not items:
            return "false"
        return f"{column} IN ({', '.join(items)})"

    @staticmethod
    def starts_with(column: str, prefix: str) -> str:
        return f"starts_with({column}, {Q.lit(prefix)})"

    @staticmethod
    def has_tag(column: str, tag: str) -> str:
        """
        A tag inside the JSON array the column holds.

        Quoted on both sides so "ha" cannot match "haos" — the same guard the
        in-Python filter uses, expressed where the database can apply it.

        `lower()` goes on the COLUMN as well as the needle, and that is the whole
        point. `normalize_tags` keeps the first spelling it sees, so the column
        can hold `["LanceDB"]`; lowercasing only the needle produced
        `tags LIKE '%"lancedb"%'`, which a case-sensitive LIKE never matches. The
        memory then became unreachable by tag on every surface — while
        /api/facets, the tag cloud and MCP list_tags all went on advertising the
        tag — and keyword search still found it, so the failure read as "nothing
        has that tag" rather than as a bug. The TypeScript original applied
        `lower(tags) LIKE ?`; the port dropped the column half.

        `%` and `_` in the tag are escaped, because a tag is user text: without
        this, the tag `a%` matches every tag beginning with `a`.
        """
        needle = str(tag).lower().replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")
        # Built outside the f-string: a backslash inside an f-string EXPRESSION
        # is a syntax error before Python 3.12, and 3.11 is this package's floor
        # (tests/test_python_floor.py, which caught exactly this).
        pattern = Q.lit('%"' + needle + '"%')
        escape = "'\\'"
        return f"lower({column}) LIKE {pattern} ESCAPE {escape}"

    @staticmethod
    def is_null(column: str) -> str:
        return f"{column} IS NULL"

    @staticmethod
    def not_null(column: str) -> str:
        return f"{column} IS NOT NULL"

    @staticmethod
    def and_(*parts: str | None) -> str:
        kept = [p for p in parts if p]
        return " AND ".join(f"({p})" for p in kept) if kept else ""

    @staticmethod
    def or_(*parts: str | None) -> str:
        kept = [p for p in parts if p]
        return " OR ".join(f"({p})" for p in kept) if kept else ""


# ── the tables ────────────────────────────────────────────────────────────────


class KVRow(LanceModel):
    key: str
    value: str
    expires_at: Optional[int] = None


class OAuthClientRow(LanceModel):
    client_id: str
    client_name: Optional[str] = None
    redirect_uris: str  # JSON array
    created_at: str


class OAuthCodeRow(LanceModel):
    code: str
    client_id: str
    redirect_uri: str
    code_challenge: str
    code_challenge_method: str
    scope: str = ""
    expires_at: int


class OAuthTokenRow(LanceModel):
    token: str
    client_id: str
    scope: str = ""
    created_at: str
    expires_at: Optional[int] = None


class SearchLogRow(LanceModel):
    id: str
    query: str = ""
    mode: str = "keyword"
    kind: str = ""
    workspace: str = ""
    project: str = ""
    tag: str = ""
    result_count: int = 0
    result_ids: str = "[]"
    duration_ms: int = 0
    source: str = ""
    created_at: str


class TraceRow(LanceModel):
    """
    The station log: one row shape for MCP calls and for traced reads.

    `kind` is what makes one table answer both questions — the two source
    projects carried a `traces` table AND an `mcp_calls` table, which doubled the
    write path and made "search the log" two searches.

    `seq` is a synthetic monotonic counter, not decoration: both of those
    projects relied on SQLite's rowid to break ties inside one millisecond and
    both had a real ordering bug before they did. LanceDB has no rowid.
    """

    id: str
    seq: int = 0
    at: str
    day: str = ""
    kind: str = "mcp"
    tool: str = ""
    subject: str = ""
    subject_kind: str = ""
    surface: str = ""
    outcome: str = "ok"
    hits: int = 0
    duration_ms: int = 0
    mode: str = ""
    who: str = ""
    input: str = ""
    result: str = ""
    error: str = ""
    # What a text search over the log reads.
    text: str = ""


MEMORY_COLUMNS: tuple[str, ...] = (
    "id",
    "title",
    "content",
    "kind",
    "tags",
    "source",
    "importance",
    "workspace",
    "project",
    "url",
    "created_by",
    "created_at",
    "updated_at",
)


def memory_model(dimensions: int) -> type[LanceModel]:
    """The memories table. Built per dimension because the vector width is part of the schema."""

    class MemoryRow(LanceModel):
        id: str
        title: str
        content: str
        kind: str = "learn"
        tags: str = "[]"
        source: str = "web"
        importance: int = 3
        workspace: str = ""
        project: str = ""
        url: str = ""
        created_by: str = ""
        created_at: str
        updated_at: str
        # What the full-text index reads: title, content and tags together.
        text: str = ""
        vector: Optional[Vector(dimensions)] = None  # type: ignore[valid-type]
        embedding_model: str = ""

    return MemoryRow


def fts_text(title: str, content: str, tags: list[str]) -> str:
    return "\n".join([title, content, " ".join(tags)])


# ── the repository ────────────────────────────────────────────────────────────


class Table(Generic[T]):
    """A typed view over one LanceDB table."""

    def __init__(self, conn, name: str, model: type[T], key: str):
        self.conn = conn
        self.name = name
        self.model = model
        self.key = key
        self._lock = threading.RLock()
        self._table = None

    # -- lifecycle -------------------------------------------------------------

    @property
    def raw(self):
        if self._table is None:
            with self._lock:
                if self._table is None:
                    self._table = self._open_or_create()
        return self._table

    def _open_or_create(self):
        listed = self.conn.list_tables()
        names = set(getattr(listed, "tables", listed))
        if self.name in names:
            return self.conn.open_table(self.name)
        return self.conn.create_table(self.name, schema=self.model, mode="create")

    @property
    def schema(self) -> pa.Schema:
        return self.raw.schema

    # -- reads -----------------------------------------------------------------

    def scan(self, where: str | None = None, columns: list[str] | None = None) -> pa.Table:
        query = self.raw.search()
        if where:
            query = query.where(where)
        if columns:
            query = query.select(columns)
        return query.limit(None).to_arrow()

    def rows(self, where: str | None = None, columns: list[str] | None = None) -> list[dict]:
        return self.scan(where, columns).to_pylist()

    def find(self, where: str | None = None) -> list[T]:
        return [self.model(**row) for row in self.rows(where)]

    def first(self, where: str) -> T | None:
        found = self.rows(where)
        return self.model(**found[0]) if found else None

    def get(self, key_value: Any) -> T | None:
        return self.first(Q.eq(self.key, key_value))

    def count(self, where: str | None = None) -> int:
        return self.raw.count_rows(where) if where else self.raw.count_rows()

    # -- writes ----------------------------------------------------------------

    def insert(self, *objs: T) -> None:
        if not objs:
            return
        with self._lock:
            self.raw.add([o.model_dump() for o in objs])

    def upsert(self, *objs: T) -> None:
        if not objs:
            return
        with self._lock:
            (
                self.raw.merge_insert(self.key)
                .when_matched_update_all()
                .when_not_matched_insert_all()
                .execute([o.model_dump() for o in objs])
            )

    def update(self, where: str, values: dict[str, Any]) -> int:
        with self._lock:
            result = self.raw.update(where=where, values=values)
        return int(getattr(result, "rows_updated", 0) or 0)

    def delete(self, where: str) -> int:
        with self._lock:
            result = self.raw.delete(where)
        return int(getattr(result, "num_deleted_rows", 0) or 0)

    def optimize(self) -> None:
        with self._lock:
            try:
                self.raw.optimize()
            except Exception:
                pass

"""
One LanceDB directory holds everything: the memory corpus, the key/value store,
the OAuth tables and the search log. `DATA_DIR/lancedb` by default.

The memories table carries a native full-text index over `text` with an n-gram
(trigram) tokenizer — the same choice the libSQL add-on made, for the same
measured reason: Thai has no inter-word spaces, and a word-boundary tokenizer
swallows a whole sentence as one token. Trigrams need no boundaries.

Rows written after the index was built are still searched (LanceDB scans the
unindexed tail), and `optimize()` folds them in; it runs in the background after
writes so a search never pays for it.
"""

from __future__ import annotations

import logging
import os
import threading
import time
from pathlib import Path

import lancedb
from lancedb.index import FTS

from . import config
from .models import (
    KVRow,
    OAuthClientRow,
    OAuthCodeRow,
    OAuthTokenRow,
    SearchLogRow,
    Table,
    TraceRow,
    memory_model,
)

log = logging.getLogger("arra-memory")

FTS_COLUMN = "text"
FTS_INDEX = "text_idx"
OPTIMIZE_DELAY_SECONDS = 5.0
# However busy it stays, compaction happens within this of the first pending write.
OPTIMIZE_MAX_WAIT_SECONDS = 60.0


def lancedb_dir() -> Path:
    configured = os.environ.get("LANCEDB_DIR")
    return Path(configured).expanduser() if configured else config.data_dir() / "lancedb"


def configured_dimensions() -> int:
    try:
        return int(config.setting("embedding_dimensions") or 1024)
    except ValueError:
        return 1024


class Database:
    def __init__(self, path: Path, dimensions: int):
        self.path = path
        self.dimensions = dimensions
        path.mkdir(parents=True, exist_ok=True)
        self.conn = lancedb.connect(str(path))
        self.memories: Table = Table(self.conn, "memories", memory_model(dimensions), "id")
        self.kv: Table[KVRow] = Table(self.conn, "kv", KVRow, "key")
        self.oauth_clients: Table[OAuthClientRow] = Table(self.conn, "oauth_clients", OAuthClientRow, "client_id")
        self.oauth_codes: Table[OAuthCodeRow] = Table(self.conn, "oauth_codes", OAuthCodeRow, "code")
        self.oauth_tokens: Table[OAuthTokenRow] = Table(self.conn, "oauth_tokens", OAuthTokenRow, "token")
        self.search_log: Table[SearchLogRow] = Table(self.conn, "search_log", SearchLogRow, "id")
        self.traces: Table[TraceRow] = Table(self.conn, "traces", TraceRow, "id")
        self.vector_dimensions: int | None = None
        self.schema_error: str | None = None
        self._optimize_timer: threading.Timer | None = None
        self._optimize_deadline: float | None = None
        self._optimize_lock = threading.Lock()

    # -- schema ------------------------------------------------------------------

    def ensure_schema(self) -> None:
        for table in (
            self.memories,
            self.kv,
            self.oauth_clients,
            self.oauth_codes,
            self.oauth_tokens,
            self.search_log,
            self.traces,
        ):
            table.raw  # opens or creates
        self._check_vector_width()
        self._ensure_fts()

    def _check_vector_width(self) -> None:
        field = self.memories.schema.field("vector")
        width = getattr(field.type, "list_size", None)
        self.vector_dimensions = int(width) if width else None
        if self.vector_dimensions and self.vector_dimensions != self.dimensions:
            self.schema_error = (
                f"the memories table stores {self.vector_dimensions}-dimension vectors but "
                f"embedding_dimensions is {self.dimensions}; change the setting back or "
                f"start a fresh data directory and re-embed"
            )
            log.error("[arra-memory] %s", self.schema_error)

    def _ensure_fts(self) -> None:
        try:
            existing = {index.name for index in self.memories.raw.list_indices()}
        except Exception:
            existing = set()
        if FTS_INDEX in existing:
            return
        try:
            self.memories.raw.create_index(
                FTS_COLUMN,
                config=FTS(
                    base_tokenizer="ngram",
                    ngram_min_length=3,
                    ngram_max_length=3,
                    prefix_only=False,
                    lower_case=True,
                    stem=False,
                    remove_stop_words=False,
                    ascii_folding=False,
                    with_position=True,
                ),
                name=FTS_INDEX,
                replace=True,
            )
        except Exception as error:  # a missing index degrades to a scan, never to a crash
            log.warning("[arra-memory] could not build the full-text index: %s", error)

    def has_fts(self) -> bool:
        try:
            return any(index.name == FTS_INDEX for index in self.memories.raw.list_indices())
        except Exception:
            return False

    # -- housekeeping ------------------------------------------------------------

    def schedule_optimize(self) -> None:
        """
        Fold recent writes into the indices, soon, off the request path.

        Debounced, but with a ceiling — a pure debounce starves under exactly the
        workload it exists for. Every write rescheduled the timer, so a cadence
        faster than one write per delay meant compaction never ran at all: 1000
        memories imported one at a time left 1000 data files and 1003 manifests,
        and the scan behind /api/facets went from 3ms to 249ms, permanently, for
        as long as the import continued. LanceDB writes a file per commit, so this
        is a cliff the original's single append-only SQLite file did not have.

        `_optimize_deadline` is the promise: once a write is pending, compaction
        happens within OPTIMIZE_MAX_WAIT_SECONDS however busy it stays.
        """
        with self._optimize_lock:
            now = time.monotonic()
            if self._optimize_deadline is None:
                self._optimize_deadline = now + OPTIMIZE_MAX_WAIT_SECONDS
            delay = min(OPTIMIZE_DELAY_SECONDS, max(0.0, self._optimize_deadline - now))
            if self._optimize_timer is not None:
                self._optimize_timer.cancel()
            timer = threading.Timer(delay, self.optimize_now)
            timer.daemon = True
            self._optimize_timer = timer
            timer.start()

    def optimize_now(self) -> None:
        with self._optimize_lock:
            self._optimize_timer = None
            self._optimize_deadline = None
        for table in (self.memories, self.search_log, self.traces, self.kv, self.oauth_tokens, self.oauth_codes):
            table.optimize()

    def close(self) -> None:
        with self._optimize_lock:
            if self._optimize_timer is not None:
                self._optimize_timer.cancel()
                self._optimize_timer = None
            self._optimize_deadline = None


_db: Database | None = None
_db_lock = threading.Lock()


def db() -> Database:
    global _db
    if _db is None:
        with _db_lock:
            if _db is None:
                instance = Database(lancedb_dir(), configured_dimensions())
                instance.ensure_schema()
                _db = instance
    return _db


def reset() -> None:
    """Forget the open database — tests point DATA_DIR somewhere new and call this."""
    global _db
    with _db_lock:
        if _db is not None:
            _db.close()
        _db = None

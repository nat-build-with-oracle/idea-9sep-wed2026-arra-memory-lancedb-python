"""
The memory corpus. Validation, shaping rows into objects, search — and every
write path embeds what it writes, so no call site can forget.
"""

from __future__ import annotations

import re
import threading
import time
import uuid
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from typing import Any

from lancedb.query import MatchQuery, PhraseQuery

from .db import db
from .embedding import EmbeddingProvider, provider_from_settings
from .models import MEMORY_COLUMNS, Q, fts_text
from .searchlog import record_search
from .utils import (
    clamp_limit,
    make_memory_title,
    normalize_created_by,
    normalize_importance,
    normalize_kind,
    normalize_project,
    normalize_source,
    normalize_tags,
    normalize_text,
    normalize_url,
    normalize_workspace,
    now_iso,
    parse_tags,
    read_kind,
)

# ── shapes ────────────────────────────────────────────────────────────────────

COLUMNS = list(MEMORY_COLUMNS)


def to_memory(row: dict) -> dict:
    return {
        "id": row["id"],
        "title": row["title"],
        "content": row["content"],
        "kind": read_kind(row.get("kind")),
        "tags": parse_tags(row.get("tags")),
        "source": row.get("source") or "",
        "importance": int(row.get("importance") or 3),
        "workspace": row.get("workspace") or "",
        "project": row.get("project") or "",
        "url": row.get("url") or "",
        "createdBy": row.get("created_by") or "",
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"],
    }


def _row_values(memory: dict) -> dict:
    return {
        "id": memory["id"],
        "title": memory["title"],
        "content": memory["content"],
        "kind": memory["kind"],
        "tags": _dump_tags(memory["tags"]),
        "source": memory["source"],
        "importance": int(memory["importance"]),
        "workspace": memory["workspace"],
        "project": memory["project"],
        "url": memory["url"],
        "created_by": memory["createdBy"],
        "created_at": memory["createdAt"],
        "updated_at": memory["updatedAt"],
        "text": fts_text(memory["title"], memory["content"], memory["tags"]),
    }


def _dump_tags(tags: list[str]) -> str:
    import json

    return json.dumps(tags, ensure_ascii=False)


# ── scope ─────────────────────────────────────────────────────────────────────


def _scope_set(value, normalize) -> list[str]:
    values = value if isinstance(value, list) else ([] if value is None else [value])
    out: list[str] = []
    for v in values:
        n = normalize(v) if v else ""
        if n and n not in out:
            out.append(n)
    return out


def scope_filter(scope: dict) -> str:
    """Within a facet OR (any of these); across facets AND."""
    kinds = _scope_set(scope.get("kind"), normalize_kind)
    workspaces = _scope_set(scope.get("workspace"), normalize_workspace)
    projects = _scope_set(scope.get("project"), normalize_project)
    agents = _scope_set(scope.get("createdBy"), normalize_created_by)
    return Q.and_(
        Q.in_("kind", kinds) if kinds else None,
        Q.in_("workspace", workspaces) if workspaces else None,
        Q.in_("project", projects) if projects else None,
        Q.in_("created_by", agents) if agents else None,
    )


def scope_label(value) -> str:
    if value is None:
        return ""
    values = value if isinstance(value, list) else [value]
    return ", ".join(v for v in values if v)


def _tag_set(value) -> list[str]:
    """Tags as a lowercased set. A bare string is one tag and stays the shape
    every MCP tool passes; a list is "any of these"."""
    values = value if isinstance(value, list) else ([] if value is None else [value])
    out: list[str] = []
    for v in values:
        t = str(v).strip().lower()
        if t and t not in out:
            out.append(t)
    return out


def _scope_of(input: dict) -> dict:
    return {k: input.get(k) for k in ("kind", "workspace", "project", "createdBy")}


# ── sorting helpers ───────────────────────────────────────────────────────────


def _sort(rows: list[dict], *keys: tuple[str, bool]) -> list[dict]:
    """Stable multi-key sort; keys are (column, descending) in priority order."""
    for column, descending in reversed(keys):
        rows.sort(key=lambda r: r.get(column) or "", reverse=descending)
    return rows


# ── writes ────────────────────────────────────────────────────────────────────


def create_memory(input: dict) -> dict:
    content = normalize_text(input.get("content"), "content", 12_000)
    title = normalize_text((input.get("title") or "").strip() or make_memory_title(content), "title", 160)
    now = now_iso()
    memory = {
        "id": str(uuid.uuid4()),
        "title": title,
        "content": content,
        "kind": normalize_kind(input.get("kind")),
        "tags": normalize_tags(input.get("tags")),
        "source": normalize_source(input.get("source")),
        "importance": normalize_importance(input.get("importance")),
        "workspace": normalize_workspace(input.get("workspace")),
        "project": normalize_project(input.get("project")),
        "url": normalize_url(input.get("url")),
        "createdBy": normalize_created_by(input.get("createdBy")),
        "createdAt": now,
        "updatedAt": now,
    }
    database = db()
    database.memories.insert(database.memories.model(**_row_values(memory)))
    database.schedule_optimize()
    index_memory_async(memory)
    return memory


def get_memory(memory_id: str) -> dict | None:
    rows = db().memories.rows(Q.eq("id", normalize_text(memory_id, "id", 100)), COLUMNS)
    return to_memory(rows[0]) if rows else None


def update_memory(memory_id: str, input: dict) -> dict | None:
    existing = get_memory(memory_id)
    if not existing:
        return None

    def pick(key: str, normalize, name: str | None = None, maximum: int | None = None):
        if key not in input or input[key] is None:
            return existing[key]
        return normalize(input[key], name, maximum) if maximum else normalize(input[key])

    memory = dict(existing)
    memory["content"] = pick("content", normalize_text, "content", 12_000)
    memory["title"] = pick("title", normalize_text, "title", 160)
    memory["kind"] = pick("kind", normalize_kind)
    memory["tags"] = pick("tags", normalize_tags)
    memory["source"] = pick("source", normalize_source)
    memory["importance"] = pick("importance", normalize_importance)
    memory["workspace"] = pick("workspace", normalize_workspace)
    memory["project"] = pick("project", normalize_project)
    memory["url"] = pick("url", normalize_url)
    memory["createdBy"] = pick("createdBy", normalize_created_by)
    memory["updatedAt"] = now_iso()

    values = _row_values(memory)
    values.pop("id")
    values.pop("created_at")
    database = db()
    database.memories.update(Q.eq("id", existing["id"]), values)
    database.schedule_optimize()

    # Re-embed only when the embedded TEXT changed — a tag or importance edit
    # cannot move the vector and must not pay for an embed call.
    if memory["title"] != existing["title"] or memory["content"] != existing["content"]:
        index_memory_async(memory)
    return memory


def delete_memory(memory_id: str) -> bool:
    database = db()
    deleted = database.memories.delete(Q.eq("id", normalize_text(memory_id, "id", 100)))
    if deleted:
        database.schedule_optimize()
    return deleted > 0


# ── search ────────────────────────────────────────────────────────────────────

TRIGRAM_MIN = 3
_ID_PREFIX = re.compile(r"^[0-9a-f]{8}[0-9a-f-]*$", re.IGNORECASE)


def _logged(run, meta: dict) -> list[dict]:
    started = time.monotonic()
    results = run()
    if (meta.get("query") or "").strip():
        record_search(
            result_ids=[r["id"] for r in results],
            duration_ms=(time.monotonic() - started) * 1000,
            query=meta.get("query") or "",
            mode=meta.get("mode") or "keyword",
            kind=meta.get("kind") or "",
            workspace=meta.get("workspace") or "",
            project=meta.get("project") or "",
            tag=meta.get("tag") or "",
            source=meta.get("source") or "internal",
        )
    return results


def search_memories(input: dict | None = None) -> list[dict]:
    input = input or {}
    return _logged(
        lambda: search_memories_nolog(input),
        {
            "query": input.get("query"),
            "mode": "keyword",
            "kind": scope_label(input.get("kind")),
            "workspace": scope_label(input.get("workspace")),
            "project": scope_label(input.get("project")),
            "tag": input.get("tag"),
            "source": input.get("source"),
        },
    )


# `_score` is named in the select list rather than left to LanceDB's scoring
# auto-projection, which it warns is going away. Without it the column would one
# day simply stop arriving and every hit would rank equal — a silent flattening
# of relevance, not an error.
FTS_COLUMNS = COLUMNS + ["_score"]

# How many FTS candidates to consider before deciding the index is not selective
# enough to be trusted for this query. See _fts_hits.
FTS_CANDIDATES = 2000


def contains_query(row: dict, needle: str) -> bool:
    """The original's match condition, exactly: the query as a substring of
    title, content or tags, case-insensitively."""
    return (
        needle in (row.get("title") or "").lower()
        or needle in (row.get("content") or "").lower()
        or needle in (row.get("tags") or "").lower()
    )


def _fts_hits(query: str, where: str) -> list[dict] | None:
    """
    Candidates from the full-text index, then the original's match condition
    applied on top. Returns None when the index cannot answer completely and the
    caller should scan instead.

    The index CANNOT be trusted on its own, and this is measured, not cautious.
    LanceDB's n-gram tokenizer splits both the document and the query into
    3-character sequences, and once rows are folded into the index (which happens
    automatically a few seconds after any write) a `PhraseQuery` stops enforcing
    that those sequences are adjacent: searching "kubernetes" in a five-memory
    corpus returned "remember the november deadline", "the internet connection
    dropped" and "tests are green today" — matched on the shared trigrams "ber",
    "net" and "tes". Before the same rows were indexed, the flat scan behind the
    identical call returned only the one memory that contains the word. A search
    that quietly answers with unrelated memories is worse than a slow one, and it
    is invisible: every result looks like a result.

    So the index is used for what it is good at — narrowing — and the substring
    test the original ran in SQL decides what actually matches. If the candidate
    window fills up, the index has not narrowed anything and a true match could
    be sitting outside the window, so the caller scans instead of guessing.
    """
    table = db().memories.raw
    needle = query.lower()
    last_error: Exception | None = None
    for q in (PhraseQuery(query, "text"), MatchQuery(query, "text", operator="AND")):
        try:
            search = table.search(q, query_type="fts")
            if where:
                search = search.where(where)
            candidates = search.select(FTS_COLUMNS).limit(FTS_CANDIDATES).to_list()
            if len(candidates) >= FTS_CANDIDATES:
                return None
            return [row for row in candidates if contains_query(row, needle)]
        except Exception as error:  # a broken index degrades to the scan
            last_error = error
    if last_error:
        raise last_error
    return None


def search_memories_nolog(input: dict | None = None) -> list[dict]:
    input = input or {}
    query = (input.get("query") or "").strip()[:240]
    limit = clamp_limit(input.get("limit"))
    where = scope_filter(_scope_of(input))
    # A SET, like every other facet: within a facet it is OR, across facets AND.
    # This was the one filter that read a single value while its siblings read
    # lists, so ticking two tags lit both chips and quietly filtered by whichever
    # arrived last — inherited from the original, and much easier to hit now that
    # the tag row is a cloud people click.
    tags = _tag_set(input.get("tag"))
    table = db().memories

    # An id, or the front of one, is answered directly — and deliberately NOT
    # narrowed by the active scope. An id is unique and belongs to no facet, so
    # the original looks it up with no filter at all: pasting an id must open that
    # memory whatever chips happen to be ticked, and every generated
    # recall_project_* tool pins a project, which would otherwise make "read this
    # id" answer that the memory does not exist.
    if _ID_PREFIX.match(query):
        found = table.rows(Q.starts_with("id", query.lower()), COLUMNS)
        if found:
            return [to_memory(r) for r in _sort(found, ("updated_at", True))[:limit]]

    lowered = query.lower()
    rows: list[dict] | None = None
    if len(query) >= TRIGRAM_MIN and not tags and db().has_fts():
        try:
            rows = _fts_hits(query, where)
        except Exception:
            rows = None

    if rows is not None:
        # Weighting happens across every match, then the limit cuts — the order the
        # original used. Doing it the other way round lets a bounded fetch window
        # drop a memory whose TITLE is the query before the title weight can lift
        # it: it never reaches the ranking that would have put it first.
        for row in rows:
            boost = 1.0
            if lowered in (row.get("title") or "").lower():
                boost += 2.0
            if lowered in (row.get("tags") or "").lower():
                boost += 1.0
            row["_rank"] = float(row.get("_score") or 0.0) * boost
        rows.sort(key=lambda r: int(r.get("importance") or 0), reverse=True)
        rows.sort(key=lambda r: r.get("updated_at") or "", reverse=True)
        rows.sort(key=lambda r: r["_rank"], reverse=True)
        return [to_memory(r) for r in rows[:limit]]

    rows = table.rows(where, COLUMNS)

    def matches(r: dict) -> bool:
        if lowered and not (
            lowered in r["title"].lower() or lowered in r["content"].lower() or lowered in (r["tags"] or "").lower()
        ):
            return False
        if tags:
            # Quoted so "ha" cannot match "haos" — the tags column is a JSON array.
            stored = (r["tags"] or "").lower()
            if not any(f'"{t}"' in stored for t in tags):
                return False
        return True

    def rank(r: dict) -> int:
        if not lowered:
            return 3
        title = r["title"].lower()
        if title == lowered:
            return 0
        if lowered in title:
            return 1
        if lowered in (r["tags"] or "").lower():
            return 2
        return 3

    filtered = [r for r in rows if matches(r)]
    filtered.sort(key=lambda r: int(r.get("importance") or 0), reverse=True)
    filtered.sort(key=lambda r: r.get("updated_at") or "", reverse=True)
    filtered.sort(key=rank)
    return [to_memory(r) for r in filtered[:limit]]


def search_in_range(input: dict) -> list[dict]:
    return _logged(
        lambda: _search_in_range_unlogged(input),
        {
            "query": input.get("query"),
            "mode": f"window:{input['label']}" if input.get("label") else "range",
            "kind": scope_label(input.get("kind")),
            "workspace": scope_label(input.get("workspace")),
            "project": scope_label(input.get("project")),
            "source": input.get("source"),
        },
    )


def _search_in_range_unlogged(input: dict) -> list[dict]:
    query = (input.get("query") or "").strip()[:240].lower()
    where = Q.and_(
        f"created_at >= {Q.lit(input['fromIso'])}",
        f"created_at <= {Q.lit(input['toIso'])}",
        scope_filter(_scope_of(input)),
    )
    rows = db().memories.rows(where, COLUMNS)
    if query:
        rows = [
            r
            for r in rows
            if query in r["title"].lower() or query in r["content"].lower() or query in (r["tags"] or "").lower()
        ]
    rows.sort(key=lambda r: r["created_at"], reverse=True)
    return [to_memory(r) for r in rows[: clamp_limit(input.get("limit"))]]


# ── stats and facets ──────────────────────────────────────────────────────────


def get_memory_stats() -> dict:
    rows = db().memories.rows(columns=["kind", "tags", "updated_at"])
    kinds = Counter(r["kind"] for r in rows)
    tags: Counter = Counter()
    for r in rows:
        tags.update(parse_tags(r["tags"]))
    return {
        "total": len(rows),
        "kinds": dict(sorted(kinds.items(), key=lambda kv: (-kv[1], kv[0]))),
        "topTags": [{"tag": t, "count": n} for t, n in sorted(tags.items(), key=lambda kv: (-kv[1], kv[0]))[:8]],
        "latestUpdatedAt": max((r["updated_at"] for r in rows), default=None),
    }


def _grouped(rows: list[dict], column: str, latest_column: str = "updated_at") -> list[tuple[str, int, str]]:
    counts: Counter = Counter()
    latest: dict[str, str] = {}
    for r in rows:
        value = r[column]
        if not value:
            continue
        counts[value] += 1
        stamp = r.get(latest_column) or ""
        if stamp > latest.get(value, ""):
            latest[value] = stamp
    ordered = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))
    return [(value, count, latest[value]) for value, count in ordered]


def _workspace_where(workspace: str | None) -> str | None:
    ws = normalize_workspace(workspace)
    return Q.eq("workspace", ws) if ws else None


def list_projects(limit: int = 20, workspace: str | None = None) -> list[dict]:
    rows = db().memories.rows(_workspace_where(workspace), ["project", "updated_at"])
    return [
        {"project": p, "count": n, "latest": latest}
        for p, n, latest in _grouped(rows, "project")[: clamp_limit(limit, 20)]
    ]


def list_tags(limit: int = 50, workspace: str | None = None) -> list[dict]:
    rows = db().memories.rows(_workspace_where(workspace), ["tags"])
    counts: Counter = Counter()
    for r in rows:
        counts.update(parse_tags(r["tags"]))
    ordered = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))
    return [{"tag": t, "count": n} for t, n in ordered[: clamp_limit(limit, 50)]]


def list_agents(limit: int = 50, workspace: str | None = None) -> list[dict]:
    rows = db().memories.rows(_workspace_where(workspace), ["created_by", "updated_at"])
    return [
        {"agent": a, "count": n, "latest": latest}
        for a, n, latest in _grouped(rows, "created_by")[: clamp_limit(limit, 50)]
    ]


def _workspace_facets(rows: list[dict], limit: int) -> list[dict]:
    counts: Counter = Counter()
    projects: dict[str, set[str]] = {}
    agents: dict[str, set[str]] = {}
    latest: dict[str, str] = {}
    for r in rows:
        ws = r["workspace"]
        if not ws:
            continue
        counts[ws] += 1
        if r["project"]:
            projects.setdefault(ws, set()).add(r["project"])
        if r["created_by"]:
            agents.setdefault(ws, set()).add(r["created_by"])
        if (r["updated_at"] or "") > latest.get(ws, ""):
            latest[ws] = r["updated_at"]
    ordered = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))
    return [
        {
            "workspace": ws,
            "count": n,
            "projects": len(projects.get(ws, ())),
            "agents": len(agents.get(ws, ())),
            "latest": latest[ws],
        }
        for ws, n in ordered[:limit]
    ]


_FACET_COLUMNS = ["kind", "tags", "workspace", "project", "created_by", "updated_at"]


def list_workspaces(limit: int = 50) -> dict:
    rows = db().memories.rows(columns=["workspace", "project", "created_by", "updated_at"])
    return {
        "workspaces": _workspace_facets(rows, clamp_limit(limit, 50)),
        "unassigned": sum(1 for r in rows if not r["workspace"]),
    }


def list_facets() -> dict:
    rows = db().memories.rows(columns=_FACET_COLUMNS)
    kinds = Counter(r["kind"] for r in rows)
    tags: Counter = Counter()
    for r in rows:
        tags.update(parse_tags(r["tags"]))
    return {
        "kinds": [{"kind": k, "count": n} for k, n in sorted(kinds.items(), key=lambda kv: (-kv[1], kv[0]))],
        "workspaces": _workspace_facets(rows, 50),
        "unassigned": sum(1 for r in rows if not r["workspace"]),
        "projects": [
            {"project": p, "count": n, "latest": latest} for p, n, latest in _grouped(rows, "project")[:50]
        ],
        "agents": [{"agent": a, "count": n, "latest": latest} for a, n, latest in _grouped(rows, "created_by")[:50]],
        # Tags carry their cloud size, so the filter bar can draw a real cloud
        # from the ONE request it already makes. Computed here rather than in the
        # browser because arra_memory/cloud.py is the only place the sizing law
        # is allowed to live — the MCP tool and this page must not be able to
        # disagree about how big a tag is.
        "tags": _sized_tags(sorted(tags.items(), key=lambda kv: (-kv[1], kv[0]))[:50]),
        "total": len(rows),
    }


def _sized_tags(pairs: list[tuple[str, int]]) -> list[dict]:
    from .cloud import MIN_PX, size_for

    largest = max((n for _, n in pairs), default=0)
    uniform = largest > 0 and all(n == largest for _, n in pairs)
    return [
        {"tag": tag, "count": n, "size": MIN_PX if uniform else size_for(n, largest)}
        for tag, n in pairs
    ]


def list_kinds() -> list[dict]:
    rows = db().memories.rows(columns=["kind"])
    kinds = Counter(r["kind"] for r in rows if r["kind"])
    return [{"kind": k, "count": n} for k, n in sorted(kinds.items(), key=lambda kv: (-kv[1], kv[0]))]


def list_months(limit: int = 24) -> list[dict]:
    rows = db().memories.rows(columns=["created_at"])
    months = Counter((r["created_at"] or "")[:7] for r in rows)
    ordered = sorted(months.items(), key=lambda kv: kv[0], reverse=True)
    return [{"month": m, "count": n} for m, n in ordered[: clamp_limit(limit, 24)] if m]


FACETS = ("kind", "workspace", "project", "agent", "tag")


def merge_facet(facet: str, source: str, target: str) -> dict:
    """Rename one facet value to another, everywhere. Reversible by merging back."""
    normalize = {
        "kind": normalize_kind,
        "workspace": normalize_workspace,
        "project": normalize_project,
        "agent": normalize_created_by,
    }.get(facet, lambda v: (v or "").strip())
    src = normalize(source)
    dst = normalize(target)
    if not src:
        raise ValueError("from is required")
    if not dst:
        raise ValueError("to is required")
    if src == dst:
        raise ValueError("from and to are the same value")

    database = db()
    if facet == "tag":
        rows = database.memories.rows(columns=["id", "title", "content", "tags"])
        merged = 0
        for r in rows:
            tags = parse_tags(r["tags"])
            if src not in tags:
                continue
            renamed: list[str] = []
            for t in tags:
                value = dst if t == src else t
                if value not in renamed:
                    renamed.append(value)
            database.memories.update(
                Q.eq("id", r["id"]),
                {"tags": _dump_tags(renamed), "text": fts_text(r["title"], r["content"], renamed)},
            )
            merged += 1
    else:
        column = {"kind": "kind", "workspace": "workspace", "project": "project", "agent": "created_by"}[facet]
        merged = database.memories.update(Q.eq(column, src), {column: dst})
    if merged:
        database.schedule_optimize()
    return {"facet": facet, "from": src, "to": dst, "merged": merged}


# ── semantic search ───────────────────────────────────────────────────────────

_provider: EmbeddingProvider | None = None
_provider_resolved = False
_provider_lock = threading.Lock()
_executor = ThreadPoolExecutor(max_workers=1, thread_name_prefix="embed")


def embeddings() -> EmbeddingProvider | None:
    """Resolved once. None means embeddings are switched off, not broken."""
    global _provider, _provider_resolved
    if not _provider_resolved:
        with _provider_lock:
            if not _provider_resolved:
                _provider = provider_from_settings()
                _provider_resolved = True
    if _provider and db().schema_error:
        return None
    return _provider


def set_provider(provider: EmbeddingProvider | None) -> None:
    """Tests swap the provider; production resolves it from settings."""
    global _provider, _provider_resolved
    with _provider_lock:
        _provider = provider
        _provider_resolved = True


def reset_provider() -> None:
    global _provider, _provider_resolved
    with _provider_lock:
        _provider = None
        _provider_resolved = False


def index_memory(memory: dict) -> bool:
    """Embeds one memory and stores the vector. Best-effort by contract."""
    provider = embeddings()
    if not provider:
        return False
    try:
        vectors = provider.embed([f"{memory['title']}\n\n{memory['content']}"])
        if not vectors:
            return False
        database = db()
        database.memories.update(Q.eq("id", memory["id"]), {"vector": vectors[0], "embedding_model": provider.model})
        database.schedule_optimize()
        return True
    except Exception:
        return False


def index_memory_async(memory: dict) -> None:
    if embeddings() is None:
        return
    _executor.submit(index_memory, dict(memory))


def wait_for_indexing(timeout: float = 30.0) -> None:
    """Block until every queued embed has run. For tests and shutdown."""
    _executor.submit(lambda: None).result(timeout=timeout)


def search_semantic(input: dict) -> dict:
    started = time.monotonic()
    result = search_semantic_nolog(input)
    if (input.get("query") or "").strip():
        record_search(
            result_ids=[m["id"] for m in result["memories"]],
            duration_ms=(time.monotonic() - started) * 1000,
            query=input["query"],
            mode="semantic",
            kind=scope_label(input.get("kind")),
            workspace=scope_label(input.get("workspace")),
            project=scope_label(input.get("project")),
            source=input.get("source") or "internal",
        )
    return result


def search_semantic_nolog(input: dict) -> dict:
    provider = embeddings()
    if not provider:
        raise RuntimeError("embeddings are not configured")
    vectors = provider.embed([input["query"]])
    if not vectors:
        raise RuntimeError("query produced no embedding")
    where = Q.and_(Q.not_null("vector"), scope_filter(_scope_of(input)))
    hits = (
        db()
        .memories.raw.search(vectors[0])
        .distance_type("cosine")
        .where(where)
        .select(COLUMNS)
        .limit(clamp_limit(input.get("limit")))
        .to_list()
    )
    return {
        "memories": [to_memory(h) for h in hits],
        "distances": {h["id"]: float(h.get("_distance") or 0.0) for h in hits},
    }


# ── recall: one implementation for every caller ───────────────────────────────


def recall_memories(input: dict) -> dict:
    requested = input.get("mode") or "hybrid"
    query = str(input.get("query") or "")
    source = input.get("source") or "internal"
    common = {**_scope_of(input), "limit": input.get("limit")}

    if requested == "keyword" or not query.strip():
        memories = search_memories({"query": query, **common, "tag": input.get("tag"), "source": source})
        return {"requestedMode": requested, "effectiveMode": "keyword", "fallback": None, "memories": memories}

    started = time.monotonic()
    try:
        semantic = search_semantic_nolog({"query": query, **common})
        if requested == "semantic":
            record_search(
                result_ids=[m["id"] for m in semantic["memories"]],
                duration_ms=(time.monotonic() - started) * 1000,
                query=query,
                mode="semantic",
                kind=scope_label(input.get("kind")),
                workspace=scope_label(input.get("workspace")),
                project=scope_label(input.get("project")),
                source=source,
            )
            return {
                "requestedMode": requested,
                "effectiveMode": "semantic",
                "fallback": None,
                "memories": semantic["memories"],
                "distances": semantic["distances"],
            }

        # Reciprocal rank fusion — ranks, not raw scores.
        keyword = search_memories_nolog({"query": query, **common})
        K = 60
        scores: dict[str, float] = {}
        by_id: dict[str, dict] = {}
        for i, m in enumerate(keyword):
            scores[m["id"]] = scores.get(m["id"], 0.0) + 1.0 / (K + i + 1)
            by_id[m["id"]] = m
        for i, m in enumerate(semantic["memories"]):
            scores[m["id"]] = scores.get(m["id"], 0.0) + 1.0 / (K + i + 1)
            by_id[m["id"]] = m
        merged = [by_id[i] for i, _ in sorted(scores.items(), key=lambda kv: -kv[1])[: clamp_limit(input.get("limit"))]]
        record_search(
            result_ids=[m["id"] for m in merged],
            duration_ms=(time.monotonic() - started) * 1000,
            query=query,
            mode="hybrid",
            kind=scope_label(input.get("kind")),
            workspace=scope_label(input.get("workspace")),
            project=scope_label(input.get("project")),
            source=source,
        )
        return {
            "requestedMode": requested,
            "effectiveMode": "hybrid",
            "fallback": None,
            "memories": merged,
            "counts": {"keyword": len(keyword), "semantic": len(semantic["memories"])},
        }
    except Exception as error:
        reason = str(error) or "embedding failed"
        if requested == "semantic":
            raise RuntimeError(reason) from error
        memories = search_memories({"query": query, **common, "tag": input.get("tag"), "source": source})
        return {
            "requestedMode": requested,
            "effectiveMode": "keyword",
            "fallback": {"used": True, "reason": reason},
            "memories": memories,
        }


def embedding_coverage() -> dict:
    provider = embeddings()
    try:
        table = db().memories
        total = table.count()
        embedded_rows = table.rows(Q.not_null("vector"), ["embedding_model"])
        model = max((r["embedding_model"] for r in embedded_rows if r["embedding_model"]), default=None)
        return {"total": total, "embedded": len(embedded_rows), "model": model, "enabled": bool(provider)}
    except Exception:
        return {"total": 0, "embedded": 0, "model": None, "enabled": bool(provider)}


def backfill_embeddings(limit: int = 50) -> int:
    provider = embeddings()
    if not provider:
        return 0
    pending = db().memories.rows(
        Q.or_(Q.is_null("vector"), Q.ne("embedding_model", provider.model)),
        ["id", "title", "content", "updated_at"],
    )
    pending.sort(key=lambda r: r["updated_at"], reverse=True)
    indexed = 0
    for row in pending[: clamp_limit(limit)]:
        if index_memory(row):
            indexed += 1
    return indexed


GRAPH_COLUMNS = [
    "id",
    "title",
    "content",
    "kind",
    "workspace",
    "project",
    "created_by",
    "importance",
    "created_at",
    "updated_at",
]


def embedded_rows(limit: int = 500, where: str | None = None) -> tuple[list[dict], int]:
    """
    Every memory that carries a vector, with the vector, most important first.

    In two passes, and that is the point. LanceDB has no ORDER BY to push a limit
    through, so the ranking columns are read first — cheap, no vectors — and only
    the rows that survive the limit are read back with their vectors. Reading
    everything and slicing afterwards materialised the whole embedded corpus as
    Python floats: 10,000 embedded memories at 1024 dimensions took ~645MB of
    transient memory to answer a request whose result is 500 nodes, and /api/graph
    is served on a threadpool that will happily run dozens of those at once.
    """
    table = db().memories
    scope = Q.and_(Q.not_null("vector"), where or "")
    ranking = table.rows(scope, ["id", "importance", "updated_at"])
    ranking.sort(key=lambda r: r["updated_at"], reverse=True)
    ranking.sort(key=lambda r: int(r["importance"] or 0), reverse=True)
    wanted = [r["id"] for r in ranking[:limit]]
    if not wanted:
        return [], table.count()

    rows = table.rows(Q.in_("id", wanted), GRAPH_COLUMNS + ["vector"])
    by_id = {r["id"]: r for r in rows}
    return [by_id[i] for i in wanted if i in by_id], table.count()

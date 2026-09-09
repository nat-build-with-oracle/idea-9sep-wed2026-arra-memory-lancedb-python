"""
A record of what was searched for, and what came back. Off unless `search_log`
is enabled — a search log is often more revealing than the corpus it searches.
Result IDs are stored, never result content. Recording never fails a search.
"""

from __future__ import annotations

import json
import uuid
from datetime import datetime, timedelta, timezone

from . import config
from .db import db
from .models import Q, SearchLogRow
from .utils import now_iso, to_iso


def search_log_enabled() -> bool:
    return config.setting_bool("search_log")


def _to_entry(row: dict) -> dict:
    try:
        parsed = json.loads(row.get("result_ids") or "[]")
        ids = [x for x in parsed if isinstance(x, str)] if isinstance(parsed, list) else []
    except ValueError:
        ids = []
    return {
        "id": row["id"],
        "query": row.get("query") or "",
        "mode": row.get("mode") or "keyword",
        "kind": row.get("kind") or "",
        "workspace": row.get("workspace") or "",
        "project": row.get("project") or "",
        "tag": row.get("tag") or "",
        "resultCount": int(row.get("result_count") or 0),
        "resultIds": ids,
        "durationMs": int(row.get("duration_ms") or 0),
        "source": row.get("source") or "",
        "createdAt": row["created_at"],
    }


def record_search(
    *,
    result_ids: list[str],
    duration_ms: float,
    query: str = "",
    mode: str = "keyword",
    kind: str = "",
    workspace: str = "",
    project: str = "",
    tag: str = "",
    source: str = "",
) -> None:
    if not search_log_enabled():
        return
    # `tag` is a str in this signature but the callers hold whatever the request
    # carried, and a multi-tag filter is a LIST. Passing it through built a row
    # whose tag column was a Python list, the insert raised, and the except
    # below swallowed it — so EVERY search carrying more than one tag was
    # missing from the log entirely, while single-tag searches were recorded.
    # A log with a shape-dependent hole in it is worse than no log: it answers
    # "what did I search for" with a confident, partial lie.
    if isinstance(tag, (list, tuple, set)):
        tag = ", ".join(str(t) for t in tag)
    try:
        db().search_log.insert(
            SearchLogRow(
                id=str(uuid.uuid4()),
                query=(query or "")[:240],
                mode=mode or "keyword",
                kind=kind or "",
                workspace=workspace or "",
                project=project or "",
                tag=str(tag or "")[:240],
                result_count=len(result_ids),
                result_ids=json.dumps(result_ids[:50]),
                duration_ms=int(round(duration_ms)),
                source=source or "",
                created_at=now_iso(),
            )
        )
        # Every other write site schedules this; without it the log is compacted
        # only when a MEMORY write happens to leave a gap. On a read-mostly
        # instance — the normal shape once search_log is on — that is never, and
        # the log accrues a data file per search forever: 800 searches with no
        # writes between them made the search-log page 77x slower, and it does not
        # recover on its own.
        db().schedule_optimize()
    except Exception:
        pass  # observability must never cost the thing it observes


def list_search_log(limit: int = 50, query: str | None = None) -> list[dict]:
    needle = (query or "").strip().lower()
    capped = max(1, min(200, int(limit) if limit else 50))
    rows = db().search_log.rows()
    if needle:
        rows = [r for r in rows if needle in (r.get("query") or "").lower()]
    rows.sort(key=lambda r: r["created_at"], reverse=True)
    return [_to_entry(r) for r in rows[:capped]]


def delete_search_log_entry(entry_id: str) -> bool:
    return db().search_log.delete(Q.eq("id", entry_id)) > 0


def clear_search_log() -> int:
    return db().search_log.delete("true")


def prune_search_log(days: int = 30) -> dict:
    safe_days = max(0, int(days))
    cutoff = to_iso(datetime.now(timezone.utc) - timedelta(days=safe_days))
    removed = db().search_log.delete(f"created_at < {Q.lit(cutoff)}")
    return {"removed": removed, "cutoff": cutoff}


def search_log_stats() -> dict:
    try:
        stamps = [r["created_at"] for r in db().search_log.rows(columns=["created_at"])]
        return {
            "enabled": search_log_enabled(),
            "total": len(stamps),
            "oldest": min(stamps) if stamps else None,
            "newest": max(stamps) if stamps else None,
        }
    except Exception:
        return {"enabled": search_log_enabled(), "total": 0, "oldest": None, "newest": None}

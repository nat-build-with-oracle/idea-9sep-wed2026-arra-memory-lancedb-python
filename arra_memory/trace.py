"""
What the corpus remembers about being used.

One table, one writer. `record_trace` is the ONLY function that writes a trace,
and both the MCP dispatcher and the HTTP routes call it — this fleet has shipped
"works on REST, missing on MCP" four times, and the fix each time was to move the
call off the call sites and into the shared layer.

WHAT IS RECORDED. Every MCP tool call, on the success path AND the error path —
the error row is the one you most want later. Plus every read that carries an
intent: a keyword someone searched, a tag they clicked, an id they opened.

WHAT IS NOT. Reads of the trace layer itself, and the corpus-shape endpoints the
UI polls (/api/facets, /api/stats, /api/health, the viewer). An observation must
not observe itself: a panel left open would otherwise fill the log with its own
polling, and the tag cloud would inflate its own counts. That is a property of
the endpoint rather than of a header — there is no opt-out a caller can send,
because any caller could then read unlogged.

TWO RULES THAT LOOK LIKE DETAILS AND ARE NOT:

  Clipping happens at WRITE time, with the original length named in the suffix,
  so a 100KB argument blob never enters the store and a reader can still see how
  much was lost. Clipping at read time would mean storing it forever.

  The whole body is inside a try/except that swallows. An audit trail that can
  fail the thing it audits is worse than no audit trail — this is the same
  contract searchlog.py already keeps.
"""

from __future__ import annotations

import json
import re
import threading
import unicodedata
import uuid
from datetime import datetime, timedelta, timezone

from . import config
from .db import db
from .models import Q, TraceRow
from .utils import now_iso, to_iso

CLIP = 4000
KEYWORD_MAX = 200

# A trace is a fact about usage, and usage is not always something to keep. Off
# switches the writer entirely rather than filtering on read.
def trace_enabled() -> bool:
    return config.setting("trace_log").lower() != "false"


_seq_lock = threading.Lock()
_seq = 0


def _next_seq() -> int:
    """
    A monotonic tiebreaker for rows written in the same millisecond.

    Both source implementations leaned on SQLite's rowid for deterministic
    ordering and both had a real non-determinism bug before they did. LanceDB has
    no rowid, so the column has to be written deliberately.
    """
    global _seq
    with _seq_lock:
        _seq += 1
        return _seq


def _resume_seq() -> None:
    """Continue the sequence across a restart rather than colliding with it."""
    global _seq
    try:
        rows = db().traces.rows(columns=["seq"])
        with _seq_lock:
            _seq = max([int(r["seq"] or 0) for r in rows] or [0])
    except Exception:
        pass


def clip(value, limit: int = CLIP) -> str:
    """Text as stored: bounded, and honest about what was dropped."""
    if value is None:
        return ""
    text = value if isinstance(value, str) else json.dumps(value, ensure_ascii=False, default=str)
    if len(text) <= limit:
        return text
    return f"{text[:limit]}…[{len(text)} chars]"


def normalize_keyword(value: str | None) -> str:
    """
    NFC, trim, collapse inner whitespace, lowercase, drop one trailing '*'.

    The clip to 200 happens BEFORE the normalise, and identically here and in
    `forget_keyword` — otherwise a keyword can be recorded under a key that
    nothing is able to forget.
    """
    raw = (value or "")[:KEYWORD_MAX]
    text = unicodedata.normalize("NFC", raw).strip()
    text = " ".join(text.split()).lower()
    return text[:-1] if text.endswith("*") else text


def record_trace(
    *,
    kind: str,
    surface: str,
    tool: str = "",
    subject: str = "",
    subject_kind: str = "",
    outcome: str = "ok",
    hits: int = 0,
    duration_ms: float = 0.0,
    mode: str = "",
    who: str = "",
    input: object = None,
    result: object = None,
    error: str = "",
) -> None:
    if not trace_enabled():
        return
    try:
        keyword = normalize_keyword(subject) if subject_kind == "keyword" else (subject or "")
        # An empty key after normalising means no intent was expressed, so there
        # is nothing to file it under.
        if subject_kind == "keyword" and not keyword:
            keyword = ""
        at = now_iso()
        db().traces.insert(
            TraceRow(
                id=str(uuid.uuid4()),
                seq=_next_seq(),
                at=at,
                day=at[:10],
                kind=kind,
                tool=tool or "",
                subject=keyword,
                subject_kind=subject_kind or "",
                surface=surface,
                outcome=outcome,
                hits=int(hits or 0),
                duration_ms=int(round(duration_ms or 0)),
                mode=mode or "",
                who=who or "",
                input=clip(input),
                result=clip(result),
                error=clip(error, 1000),
                text=" ".join(str(p) for p in (tool, keyword, mode, who, error) if p),
            )
        )
        db().schedule_optimize()
    except Exception:
        # An audit trail that can take down the thing it audits is worse than
        # no audit trail.
        pass


# ── reading ───────────────────────────────────────────────────────────────────


def _looks_like_id(value: str) -> bool:
    """A memory id is a subject too, and lowercasing a uuid would still match —
    but stripping a trailing `*` from one would not. Left exactly as written."""
    return bool(re.fullmatch(r"[0-9a-fA-F-]{8,36}", (value or "").strip()))


def _to_entry(row: dict) -> dict:
    return {
        "id": row["id"],
        "seq": int(row.get("seq") or 0),
        "at": row["at"],
        "day": row.get("day") or row["at"][:10],
        "kind": row.get("kind") or "",
        "tool": row.get("tool") or "",
        "subject": row.get("subject") or "",
        "subjectKind": row.get("subject_kind") or "",
        "surface": row.get("surface") or "",
        "outcome": row.get("outcome") or "",
        "hits": int(row.get("hits") or 0),
        "durationMs": int(row.get("duration_ms") or 0),
        "mode": row.get("mode") or "",
        "who": row.get("who") or "",
        "input": row.get("input") or "",
        "result": row.get("result") or "",
        "error": row.get("error") or "",
    }


def list_traces(
    *,
    limit: int = 50,
    query: str | None = None,
    kind: str | None = None,
    tool: str | None = None,
    outcome: str | None = None,
    surface: str | None = None,
    subject: str | None = None,
    since: str | None = None,
) -> list[dict]:
    """
    Ordered (at DESC, seq DESC) — the sequence is what keeps a page boundary
    inside one millisecond from skipping or repeating a row.
    """
    where = Q.and_(
        Q.eq("kind", kind) if kind else None,
        Q.eq("tool", tool) if tool else None,
        Q.eq("outcome", outcome) if outcome else None,
        Q.eq("surface", surface) if surface else None,
        Q.eq("subject", subject if _looks_like_id(subject) else normalize_keyword(subject)) if subject else None,
        f"at >= {Q.lit(since)}" if since else None,
    )
    rows = db().traces.rows(where or None)
    needle = (query or "").strip().lower()
    if needle:
        rows = [r for r in rows if needle in (r.get("text") or "").lower() or needle in (r.get("input") or "").lower()]
    rows.sort(key=lambda r: int(r.get("seq") or 0), reverse=True)
    rows.sort(key=lambda r: r.get("at") or "", reverse=True)
    capped = max(1, min(500, int(limit) if limit else 50))
    return [_to_entry(r) for r in rows[:capped]]


def subject_counts(limit: int = 50, days: int | None = None) -> list[tuple[str, int]]:
    """
    How often each subject has been asked for, busiest first.

    Only rows that carry a subject — a call with no intent (memory_stats,
    list_tags) is a real trace row and not a thing anyone asked ABOUT, so
    counting it would put an empty label in the cloud.
    """
    where = Q.and_(Q.ne("subject", ""), f"at >= {Q.lit(to_iso(datetime.now(timezone.utc) - timedelta(days=days)))}" if days else None)
    try:
        rows = db().traces.rows(where or None, ["subject"])
    except Exception:
        return []
    counts: dict[str, int] = {}
    for r in rows:
        subject = r["subject"]
        if subject:
            counts[subject] = counts.get(subject, 0) + 1
    return sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))[: max(1, min(200, limit))]


def trace_stats() -> dict:
    try:
        rows = db().traces.rows(columns=["at", "kind", "outcome", "surface"])
    except Exception:
        return {"enabled": trace_enabled(), "total": 0, "oldest": None, "newest": None, "byKind": {}, "bySurface": {}}
    by_kind: dict[str, int] = {}
    by_surface: dict[str, int] = {}
    for r in rows:
        by_kind[r["kind"]] = by_kind.get(r["kind"], 0) + 1
        by_surface[r["surface"]] = by_surface.get(r["surface"], 0) + 1
    stamps = [r["at"] for r in rows]
    return {
        "enabled": trace_enabled(),
        "total": len(rows),
        "oldest": min(stamps) if stamps else None,
        "newest": max(stamps) if stamps else None,
        "byKind": dict(sorted(by_kind.items(), key=lambda kv: -kv[1])),
        "bySurface": dict(sorted(by_surface.items(), key=lambda kv: -kv[1])),
    }


def subject_report(subject: str, subject_kind: str = "keyword") -> dict:
    """
    Everything the log knows about one subject — the answer to "have I asked this
    before, and what happened when I did".
    """
    key = normalize_keyword(subject) if subject_kind == "keyword" else subject
    rows = db().traces.rows(Q.eq("subject", key)) if key else []
    if not rows:
        return {"subject": key, "count": 0, "first": None, "last": None, "byKind": {}, "bySurface": {}, "days": []}
    by_kind: dict[str, int] = {}
    by_surface: dict[str, int] = {}
    days: dict[str, int] = {}
    for r in rows:
        by_kind[r["kind"]] = by_kind.get(r["kind"], 0) + 1
        by_surface[r["surface"]] = by_surface.get(r["surface"], 0) + 1
        days[r["day"]] = days.get(r["day"], 0) + 1
    stamps = [r["at"] for r in rows]
    return {
        "subject": key,
        "count": len(rows),
        "first": min(stamps),
        "last": max(stamps),
        "byKind": by_kind,
        "bySurface": by_surface,
        "days": [{"day": d, "count": n} for d, n in sorted(days.items())],
    }


def forget_keyword(keyword: str) -> int:
    """
    The one way to drop a subject. Raw keywords are retained indefinitely, so
    there must be exactly one way to remove one, and the removal is itself filed.

    The forget row deliberately does NOT carry the keyword it forgot. Filing it
    under the same subject writes the word straight back into the log the delete
    just cleared, so "forget this" would leave the thing behind with an extra
    step — caught by the test that asks for the subject again afterwards and
    still found it. What is kept is that a forget happened, when, and how many
    rows went: enough to audit the deletion without undoing it.
    """
    key = normalize_keyword(keyword)
    if not key:
        raise ValueError("a keyword is required")
    removed = db().traces.delete(Q.eq("subject", key))
    record_trace(kind="admin", surface="web", tool="trace_forget", hits=removed, result={"deleted": removed})
    return removed


def prune_traces(days: int = 90) -> dict:
    safe = max(0, int(days))
    cutoff = to_iso(datetime.now(timezone.utc) - timedelta(days=safe))
    removed = db().traces.delete(f"at < {Q.lit(cutoff)}")
    return {"removed": removed, "cutoff": cutoff}


def clear_traces() -> int:
    return db().traces.delete("true")


# ── the timeline ──────────────────────────────────────────────────────────────


def timeline(days: int = 30) -> dict:
    """
    The corpus on a time axis: what was written, and what was asked, per day.

    Both halves come from data that already exists — `created_at` on every memory
    and `at` on every trace — so this adds no write path. Days with nothing are
    present with zeroes rather than absent, because a gap is the interesting part
    of a timeline and a sparse array hides it.
    """
    span = max(1, min(365, int(days)))
    today = datetime.now(timezone.utc).date()
    start = today - timedelta(days=span - 1)
    buckets: dict[str, dict] = {
        (start + timedelta(days=i)).isoformat(): {"day": (start + timedelta(days=i)).isoformat(), "written": 0, "traced": 0, "kinds": {}}
        for i in range(span)
    }
    floor = start.isoformat()

    try:
        for r in db().memories.rows(f"created_at >= {Q.lit(floor)}", ["created_at", "kind"]):
            bucket = buckets.get((r["created_at"] or "")[:10])
            if bucket:
                bucket["written"] += 1
                bucket["kinds"][r["kind"]] = bucket["kinds"].get(r["kind"], 0) + 1
    except Exception:
        pass

    try:
        for r in db().traces.rows(f"at >= {Q.lit(floor)}", ["day"]):
            bucket = buckets.get(r["day"])
            if bucket:
                bucket["traced"] += 1
    except Exception:
        pass

    series = [buckets[k] for k in sorted(buckets)]
    return {
        "from": floor,
        "to": today.isoformat(),
        "days": series,
        "totals": {
            "written": sum(d["written"] for d in series),
            "traced": sum(d["traced"] for d in series),
            "busiest": max(series, key=lambda d: d["written"] + d["traced"])["day"] if series else None,
        },
    }

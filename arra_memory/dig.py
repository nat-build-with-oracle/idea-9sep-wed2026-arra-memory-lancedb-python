"""
The dig, and the chain — everything the corpus knows about one subject, and the
story of how it came to know it.

Two reads that answer questions no single search can:

  DIG   gathers from every source at once — the tag, the words, the meaning, the
        times it was asked for, the memories whose tags moved because of it —
        and each item says WHY it is in the answer, not just that it is.

  CHAIN puts the same subject on a timeline and links cause to effect: asked,
        found nothing, wrote this, tagged that, asked again and found it. That
        sequence is the thing "trace until found" actually means, and no single
        row in the log contains it.

Ported from `trace-node/src/dig.ts`, which states the two rules that matter:

  Scores are TIERS, not probabilities. An exact tag is not "more likely" than a
  body hit; it is a different kind of evidence, and mixing them into one
  probability would invent a precision neither has.

  Items under the confident floor are returned under `weak`, never hidden —
  "a low score is a signal, not a failure". A subject that surfaces only weakly
  everywhere is exactly the subject worth looking at by hand.

The dig is the one read that is also a write: it files itself in the trace log,
and its own sub-queries are never traced, or a dig would be mostly a record of
itself.
"""

from __future__ import annotations

import time
from datetime import datetime, timedelta

from .memory import (
    embeddings,
    get_memory,
    search_memories_nolog,
    search_semantic_nolog,
)
from .trace import list_traces, normalize_keyword, record_trace, subject_report
from .utils import clamp_limit, parse_iso, to_iso

# Tiers, in the order a reader would trust them.
SCORE = {
    "tag_exact": 100,
    "title": 25,
    "semantic": 20,
    "retagged": 12,
    "body": 15,
    "asked": 8,
}

# Below this an item is weak — returned, and said to be weak.
CONFIDENT_FLOOR = 15


def _item(source: str, id: str, label: str, score: int, why: str) -> dict:
    return {"source": source, "id": id, "label": label, "score": score, "why": why}


def dig(subject: str, limit: int = 20, source: str = "web") -> dict:
    """Everything the corpus knows about one subject, with provenance."""
    started = time.monotonic()
    key = normalize_keyword(subject)
    if not key:
        raise ValueError("a subject is required")

    capped = clamp_limit(limit, 20)
    items: list[dict] = []
    seen: set[tuple[str, str]] = set()

    def add(source_name: str, id_: str, label: str, score: int, why: str) -> None:
        if (source_name, id_) in seen:
            return
        seen.add((source_name, id_))
        items.append(_item(source_name, id_, label, score, why))

    # 1. Carried as a tag — the strongest claim the corpus can make.
    for memory in search_memories_nolog({"tag": key, "limit": capped}):
        add("tag", memory["id"], memory["title"], SCORE["tag_exact"], f"tagged {key}")

    # 2. In the words. A title hit outranks a body hit, the way the archive ranks.
    for memory in search_memories_nolog({"query": key, "limit": capped}):
        in_title = key in memory["title"].lower()
        add(
            "keyword",
            memory["id"],
            memory["title"],
            SCORE["title"] if in_title else SCORE["body"],
            "in the title" if in_title else "in the body",
        )

    # 3. By meaning — the source that finds what shares no words at all. Absent
    #    rather than failed when embeddings are off: a dig on a keyword-only
    #    instance is smaller, not broken.
    if embeddings() is not None:
        try:
            semantic = search_semantic_nolog({"query": key, "limit": capped})
            for memory in semantic["memories"]:
                distance = semantic["distances"].get(memory["id"], 1.0)
                add("meaning", memory["id"], memory["title"], SCORE["semantic"], f"cosine {distance:.3f}")
        except Exception:
            pass

    # 4. Memories whose tags moved to or from this word — the curation trail.
    for entry in list_traces(limit=200, kind="tag"):
        if key in (entry["input"] or "").lower():
            memory = get_memory(entry["subject"])
            if memory:
                add("retagged", memory["id"], memory["title"], SCORE["retagged"], f"tags changed {entry['at'][:10]}")

    # 5. How often it has been asked for. One item, because the subject itself is
    #    the evidence — and it is the item that makes an EMPTY dig meaningful.
    asked = subject_report(key)
    if asked["count"]:
        add("asked", key, key, SCORE["asked"], f"asked {asked['count']}× since {asked['first'][:10]}")

    items.sort(key=lambda i: -i["score"])
    strong = [i for i in items if i["score"] >= CONFIDENT_FLOOR][:capped]
    weak = [i for i in items if i["score"] < CONFIDENT_FLOOR][:capped]

    result = {
        "subject": key,
        "items": strong,
        # Returned, never hidden: a low score is a signal, not a failure.
        "weak": weak,
        "counts": {
            "total": len(items),
            **{s: sum(1 for i in items if i["source"] == s) for s in ("tag", "keyword", "meaning", "retagged", "asked")},
        },
        # The honest headline. "Asked for, and stored nowhere" is the single most
        # useful thing a dig can report, and it needs saying rather than inferring
        # from an empty list.
        "verdict": _verdict(strong, asked),
        "asked": {"count": asked["count"], "first": asked["first"], "last": asked["last"]},
    }

    # The dig is a read that writes. Its own sub-queries were unlogged (the
    # NoLog variants above), or this row would mostly be a record of itself.
    record_trace(
        kind="dig",
        surface=source,
        tool="dig",
        subject=key,
        subject_kind="keyword",
        outcome="ok" if strong else "empty",
        hits=len(strong),
        duration_ms=(time.monotonic() - started) * 1000,
        who=source,
        result={"verdict": result["verdict"], "counts": result["counts"]},
    )
    return result


def _verdict(strong: list[dict], asked: dict) -> str:
    if strong:
        return "found"
    if asked["count"]:
        # The gap worth acting on: people keep asking and nothing answers.
        return "asked-never-answered"
    return "unknown"


def chain(subject: str, limit: int = 50) -> dict:
    """
    One subject on a timeline, with cause linked to effect.

    Each ask is followed by what actually happened next — a memory written, tags
    moved, another ask that found something. That sequence is what "trace until
    found" means, and it exists in no single row: the log records events, and the
    chain is the reading of them in order with the gaps named.
    """
    key = normalize_keyword(subject)
    if not key:
        raise ValueError("a subject is required")

    asks = [e for e in list_traces(limit=500, subject=key) if e["kind"] in ("mcp", "read", "dig")]
    asks.sort(key=lambda e: (e["at"], e["seq"]))
    if not asks:
        return {"subject": key, "links": [], "resolved": False, "summary": "Never asked for."}

    # Every tag change, so an ask can be paired with the curation that followed it.
    retags = sorted(
        (e for e in list_traces(limit=500, kind="tag") if key in (e["input"] or "").lower()),
        key=lambda e: e["at"],
    )

    links: list[dict] = []
    for i, ask in enumerate(asks):
        following = asks[i + 1]["at"] if i + 1 < len(asks) else None
        # What happened between this ask and the next one is what this ask led to.
        caused = [
            {"at": r["at"], "memory": r["subject"], "change": r["input"]}
            for r in retags
            if r["at"] > ask["at"] and (following is None or r["at"] < following)
        ]
        links.append(
            {
                "at": ask["at"],
                "tool": ask["tool"],
                "surface": ask["surface"],
                "hits": ask["hits"],
                "outcome": ask["outcome"],
                "led_to": caused,
            }
        )

    first_hit = next((l for l in links if l["hits"] > 0), None)
    empties = sum(1 for l in links if l["hits"] == 0)
    if first_hit and empties:
        elapsed = _gap(links[0]["at"], first_hit["at"])
        summary = f"Asked {len(links)}×. Found nothing {empties}× before the first hit{elapsed}."
    elif first_hit:
        summary = f"Asked {len(links)}×, answered every time."
    else:
        # The chain that has not closed. This is the one worth acting on.
        summary = f"Asked {len(links)}× and never answered — nothing in the corpus carries it yet."

    return {
        "subject": key,
        "links": links[-clamp_limit(limit, 50) :],
        "resolved": bool(first_hit),
        "emptyAsks": empties,
        "summary": summary,
    }


def _gap(first: str, hit: str) -> str:
    """
    How long the gap was, in the largest unit that does not round it away.

    Seconds are reported as seconds. Rounding a nine-second gap up to "1m later"
    is a small lie, and a log that rounds is a log you have to go behind.
    """
    start, end = parse_iso(first), parse_iso(hit)
    if not start or not end:
        return ""
    delta: timedelta = end - start
    if delta.days >= 1:
        return f", {delta.days}d later"
    if delta.seconds >= 3600:
        return f", {delta.seconds // 3600}h later"
    if delta.seconds >= 60:
        return f", {delta.seconds // 60}m later"
    return f", {delta.seconds}s later" if delta.seconds else ""

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
    "semantic_far": 10,
    "retagged": 12,
    "body": 15,
    "asked": 8,
}

# Below this an item is weak — returned, and said to be weak.
CONFIDENT_FLOOR = 15

# list_traces' own hard cap on rows returned. The chain reads the log twice and
# both reads stop here, so the chain has to say when it did.
WINDOW = 500

# Cosine DISTANCE, so smaller is closer: 0 is the same direction, 1 is
# unrelated. A vector index always returns its k nearest neighbours, however far
# away they are — so without a threshold every subject on an instance with
# embeddings collected `limit` items at the full semantic tier, `strong` was
# never empty, and `_verdict` could only ever say "found". The two verdicts that
# make a dig worth reading — "asked-never-answered" and "unknown" — were
# unreachable.
#
# 0.55 is where bge-m3 stops being about the subject and starts being about the
# corpus: measured on this fleet's own memories, a genuinely related memory sits
# near 0.3-0.5 and an unrelated one near 0.8-1.0. Past it the item is still
# RETURNED — under `weak`, at `semantic_far` — because a low score is a signal,
# not a failure. It just no longer counts as an answer.
SEMANTIC_NEAR = 0.55


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
                near = distance <= SEMANTIC_NEAR
                add(
                    "meaning",
                    memory["id"],
                    memory["title"],
                    SCORE["semantic"] if near else SCORE["semantic_far"],
                    # "distance", not "cosine": the number is a cosine DISTANCE,
                    # and calling it a cosine inverts what the reader is told to
                    # trust — 0.9 read as a similarity looks like the best hit on
                    # the page when it is the worst.
                    f"distance {distance:.3f}" if near else f"distance {distance:.3f}, far",
                )
        except Exception:
            pass

    # 4. Memories whose tags moved to or from this word — the curation trail.
    #
    # The keyword goes to list_traces, which filters the whole table before it
    # caps. Reading the newest 200 tag rows and filtering them HERE meant the
    # window was shared with every other tag edit in the corpus: a few seconds of
    # unrelated tagging pushed this subject's curation trail out of it, and the
    # trail simply vanished from the dig with nothing to say it had.
    for entry in list_traces(limit=capped, kind="tag", query=key):
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

    # WINDOW is list_traces' own hard cap. Named, because both reads below are
    # bounded by it and the summary has to be honest about that rather than
    # claiming to have counted a history it only saw the newest slice of.
    asks = [e for e in list_traces(limit=WINDOW, subject=key) if e["kind"] in ("mcp", "read", "dig")]
    asks.sort(key=lambda e: (e["at"], e["seq"]))
    if not asks:
        return {"subject": key, "links": [], "resolved": False, "summary": "Never asked for.", "truncated": False}

    # Every tag change that mentions this subject, filtered by the DATABASE
    # rather than out of a shared newest-N window: the same defect as in dig,
    # where any other tagging activity silently emptied `led_to`.
    retags = sorted(list_traces(limit=WINDOW, kind="tag", query=key), key=lambda e: e["at"])

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
    # Only the empties BEFORE the first hit. Counting every empty ask made the
    # sentence "found nothing N× before the first hit" false whenever the subject
    # was asked again later and missed — the number said one thing and the
    # timeline beside it said another.
    empties = sum(1 for l in links[: links.index(first_hit)] if l["hits"] == 0) if first_hit else sum(1 for l in links if l["hits"] == 0)
    truncated = len(asks) >= WINDOW
    # A count that silently stopped at the window is a lie with a number in it.
    counted = f"at least {len(links)}" if truncated else f"{len(links)}"
    if first_hit and empties:
        elapsed = _gap(links[0]["at"], first_hit["at"])
        summary = f"Asked {counted}×. Found nothing {empties}× before the first hit{elapsed}."
    elif first_hit:
        summary = f"Asked {counted}×, answered every time."
    else:
        # The chain that has not closed. This is the one worth acting on.
        summary = f"Asked {counted}× and never answered — nothing in the corpus carries it yet."

    return {
        "subject": key,
        "links": links[-clamp_limit(limit, 50) :],
        "resolved": bool(first_hit),
        "emptyAsks": empties,
        "summary": summary,
        # Said out loud rather than left for the reader to infer from a round
        # number: the log was longer than this chain could see.
        "truncated": truncated,
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

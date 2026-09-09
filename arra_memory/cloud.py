"""
The tag cloud — the corpus's own shape, as a size.

The law is not invented here. Two siblings in this fleet already shipped it and
wrote the same reasoning down: `digger-node/src/sql.ts` and `trace-node/src/cloud.ts`.

  usage comes from a LEFT JOIN so a ZERO-usage term still appears — hiding it
  makes a fresh vocabulary look broken.

  sizes run 11px → 20px on a LOG scale, because with counts of 1 and 40 a linear
  map makes every tag but the top one identically tiny and the cloud stops
  carrying information.

  "a cloud whose sizes do not encode usage is just a list with inconsistent
  typography" — digger-node/src/sql.ts:84

The maths lives HERE, in one place, rather than in the browser — the MCP tool and
the UI must not be able to disagree about how big a tag is. The client receives
`size` and renders it.

Two departures from trace-node's exact formula, both measured rather than
preferred:

  It normalises with log1p rather than min-max over logs. Min-max divides by
  log(max) - log(min), which raises ZeroDivisionError when every tag has the same
  count and throws outright on a count of 0 — the very row the LEFT JOIN rule
  exists to keep. log1p(n)/log1p(max) handles both: a zero-usage tag lands
  exactly on the floor, which is what the spec asks for in words.

  A corpus where every tag is used equally renders at the FLOOR, not the ceiling.
  Normalising against the max would draw every tag at 20px and claim each one
  dominant; the cloud's whole claim is relative, and when there is no relation to
  show it should show none. Measured on the live corpus: counts of [2,2,2,1,1,1]
  under min-max produce a 20px-vs-11px cliff for a difference of one memory.
"""

from __future__ import annotations

import math

from .memory import tag_counts
from .utils import clamp_limit

MIN_PX = 11.0
MAX_PX = 20.0


def size_for(count: int, largest: int) -> float:
    """The one place a count becomes a size."""
    if largest <= 0:
        return MIN_PX
    weight = math.log1p(max(0, count)) / math.log1p(largest)
    return round(MIN_PX + (MAX_PX - MIN_PX) * weight, 1)


def _cloud(pairs: list[tuple[str, int]], key: str, extra: dict, limit: int = 50) -> dict:
    """
    Shape a list of (label, count) into a cloud. One law, two callers.

    `pairs` must be EVERY pair, not a top-N slice: the scale and the uniformity
    claim are facts about the whole population, and truncating first makes both
    of them wrong in the same direction. The truncation happens here, after the
    numbers that describe the population have been taken from it.
    """
    largest = max((n for _, n in pairs), default=0)
    flat = largest > 0 and all(n == largest for _, n in pairs)
    shown = pairs[: clamp_limit(limit, 50)]
    items = [
        {
            key: label,
            "count": n,
            "weight": 0.0 if flat else (round(math.log1p(n) / math.log1p(largest), 4) if largest else 0.0),
            "size": MIN_PX if flat else size_for(n, largest),
        }
        for label, n in shown
    ]
    return {
        "items": items,
        "max": largest,
        "total": sum(n for _, n in pairs),
        "distinct": len(pairs),
        "uniform": flat,
        "shown": len(items),
        "scale": {"min": MIN_PX, "max": MAX_PX, "law": "log1p"},
        **extra,
    }


def asked_cloud(limit: int = 50, days: int | None = None) -> dict:
    """
    What has been ASKED of this corpus, sized by how often — the trace log's
    subjects rather than the memories' tags.

    A second cloud, and deliberately not a second law. The two answer questions
    that only look alike: the tag cloud says what the corpus IS made of, this one
    says what people keep coming to it for. Reading them side by side is the
    point — a subject that is large here and absent there is a question the
    corpus has never been able to answer, which is the most useful thing either
    picture can tell you.

    trace-node draws the same distinction with `by: "keyword"` on one endpoint;
    kept as its own function here because the two read different tables.
    """
    from .trace import subject_counts

    # limit=0 asks for every subject: the scale and the uniformity claim are
    # facts about the whole log, and _cloud does the truncating afterwards.
    pairs = subject_counts(limit=0, days=days)
    return _cloud(pairs, "subject", {"days": days or 0}, limit=limit)


def tag_cloud(limit: int = 50, workspace: str | None = None) -> dict:
    """
    Every tag with its usage, its weight (0..1) and the size that follows.

    Ordered by count, because the caller decides whether to render it as a cloud
    (where order barely matters) or as a list (where it does), and a
    count-ordered list is the one both can use.

    The scale is derived from the WHOLE corpus and the items are then truncated
    to `limit` — not the other way round. Computed over the top-N slice, a long
    tail's head is usually flat: every one of the top 40 tags has the same count,
    so `flat` came out true, every size collapsed to the 11px floor, and the
    response claimed uniform:true about a corpus that was anything but. A cloud
    whose sizes do not encode usage is just a list with inconsistent typography,
    which is the one thing this module exists to prevent.

    `max`, `total` and `distinct` describe the corpus too, and say so — they are
    the numbers a reader uses to know what the truncation hid.
    """
    everything = tag_counts(workspace)
    shown = everything[: clamp_limit(limit, 50)]
    largest = max((t["count"] for t in everything), default=0)
    flat = largest > 0 and all(t["count"] == largest for t in everything)
    items = [
        {
            "tag": t["tag"],
            "count": t["count"],
            # Reported alongside size so a different renderer can size differently
            # without re-deriving the law.
            "weight": 0.0 if flat else round(math.log1p(t["count"]) / math.log1p(largest), 4) if largest else 0.0,
            "size": MIN_PX if flat else size_for(t["count"], largest),
        }
        for t in shown
    ]
    return {
        "items": items,
        "max": largest,
        "total": sum(t["count"] for t in everything),
        "distinct": len(everything),
        # Stated rather than implied: a renderer that draws every tag the same
        # size should be able to say why, and "every tag is used equally" is a
        # fact about the corpus worth surfacing.
        "uniform": flat,
        # So a reader can tell a small corpus from a truncated view of a big one.
        "shown": len(items),
        "scale": {"min": MIN_PX, "max": MAX_PX, "law": "log1p"},
        "workspace": workspace or "",
    }

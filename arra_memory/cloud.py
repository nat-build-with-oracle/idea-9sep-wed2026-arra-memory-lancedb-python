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

from .memory import list_tags

MIN_PX = 11.0
MAX_PX = 20.0


def size_for(count: int, largest: int) -> float:
    """The one place a count becomes a size."""
    if largest <= 0:
        return MIN_PX
    weight = math.log1p(max(0, count)) / math.log1p(largest)
    return round(MIN_PX + (MAX_PX - MIN_PX) * weight, 1)


def tag_cloud(limit: int = 50, workspace: str | None = None) -> dict:
    """
    Every tag with its usage, its weight (0..1) and the size that follows.

    Ordered by count, because the caller decides whether to render it as a cloud
    (where order barely matters) or as a list (where it does), and a
    count-ordered list is the one both can use.
    """
    tags = list_tags(limit, workspace)
    largest = max((t["count"] for t in tags), default=0)
    flat = largest > 0 and all(t["count"] == largest for t in tags)
    items = [
        {
            "tag": t["tag"],
            "count": t["count"],
            # Reported alongside size so a different renderer can size differently
            # without re-deriving the law.
            "weight": 0.0 if flat else round(math.log1p(t["count"]) / math.log1p(largest), 4) if largest else 0.0,
            "size": MIN_PX if flat else size_for(t["count"], largest),
        }
        for t in tags
    ]
    return {
        "items": items,
        "max": largest,
        "total": sum(t["count"] for t in tags),
        "distinct": len(items),
        # Stated rather than implied: a renderer that draws every tag the same
        # size should be able to say why, and "every tag is used equally" is a
        # fact about the corpus worth surfacing.
        "uniform": flat,
        "scale": {"min": MIN_PX, "max": MAX_PX, "law": "log1p"},
        "workspace": workspace or "",
    }

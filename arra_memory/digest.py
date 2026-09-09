"""
The corpus for a time window, as markdown grouped by kind — material to hand to
a model, deliberately NOT a summary. This server never calls an LLM.
"""

from __future__ import annotations

from .memory import search_in_range
from .timerange import RELATIVE_RANGES, resolve_range

KIND_ORDER = ["enlighten", "learn", "retro", "artifact"]


def digest_windows() -> list[str]:
    return list(RELATIVE_RANGES)


def _kind_rank(kind: str) -> int:
    return KIND_ORDER.index(kind) if kind in KIND_ORDER else len(KIND_ORDER)


def _stamp(iso: str) -> str:
    return f"{iso[:10]} {iso[11:16]}"


def _list(value) -> str:
    if value is None:
        return ""
    values = value if isinstance(value, list) else [value]
    return ", ".join(v for v in values if v)


def _scope_line(input: dict) -> str:
    parts = [
        _list(input.get("workspace")) and f"workspace: {_list(input.get('workspace'))}",
        _list(input.get("project")) and f"project: {_list(input.get('project'))}",
        _list(input.get("createdBy")) and f"agent: {_list(input.get('createdBy'))}",
        _list(input.get("kind")) and f"kind: {_list(input.get('kind'))}",
        input.get("query") and f"matching “{input['query']}”",
    ]
    kept = [p for p in parts if p]
    return " · ".join(kept) if kept else "the whole corpus"


def build_digest(input: dict) -> dict | None:
    window = str(input.get("window") or "today")
    rng = resolve_range(window)
    if not rng:
        return None

    memories = search_in_range(
        {
            "fromIso": rng.fromIso,
            "toIso": rng.toIso,
            "query": input.get("query"),
            "kind": input.get("kind"),
            "workspace": input.get("workspace"),
            "project": input.get("project"),
            "createdBy": input.get("createdBy"),
            "limit": input.get("limit") or 100,
            "label": rng.label,
            "source": "digest",
        }
    )

    by_kind: dict[str, int] = {}
    for m in memories:
        by_kind[m["kind"]] = by_kind.get(m["kind"], 0) + 1

    grouped = sorted(memories, key=lambda m: (_kind_rank(m["kind"]), -m["importance"], m["createdAt"]))

    lines = [f"# Memory digest — {rng.label}", "", f"Scope: {_scope_line(input)}", f"Window: {_stamp(rng.fromIso)} → now"]
    shape = ", ".join(f"{n} {k}" for k, n in sorted(by_kind.items(), key=lambda kv: _kind_rank(kv[0])))
    lines.append(f"{len(memories)} {'memory' if len(memories) == 1 else 'memories'}" + (f" — {shape}" if shape else ""))

    base = {
        "window": window,
        "label": rng.label,
        "fromIso": rng.fromIso,
        "toIso": rng.toIso,
        "count": len(memories),
        "byKind": by_kind,
        "memories": memories,
    }
    if not memories:
        lines += [
            "",
            "Nothing was written in this window. That is a fact about the window, not "
            "an error — do not infer inactivity elsewhere from it.",
        ]
        return {**base, "markdown": "\n".join(lines)}

    excerpt = input.get("excerpt") or 0
    last_kind = ""
    for m in grouped:
        if m["kind"] != last_kind:
            lines += ["", f"## {m['kind']}"]
            last_kind = m["kind"]
        meta = [
            _stamp(m["createdAt"]),
            m["workspace"] and f"workspace {m['workspace']}",
            m["project"] and f"project {m['project']}",
            m["createdBy"] and f"by {m['createdBy']}",
            f"importance {m['importance']}/5",
            " ".join(f"#{t}" for t in m["tags"]) if m["tags"] else "",
        ]
        lines += ["", f"### {m['title']}", f"*{' · '.join(p for p in meta if p)}*", ""]
        body = m["content"]
        if excerpt and len(body) > excerpt:
            body = body[:excerpt].rstrip() + "…"
        lines.append(body)

    return {**base, "markdown": "\n".join(lines)}

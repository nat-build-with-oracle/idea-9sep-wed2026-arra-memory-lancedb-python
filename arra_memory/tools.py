"""
Which tools the owner has switched off. Disabling is not deleting: a disabled
tool is hidden from tools/list and refused if called; re-enabling brings it back.
"""

from __future__ import annotations

import json

from .kv import kv_get, kv_put

KEY = "disabled-tools"

PROTECTED: dict[str, str] = {
    "list_workspaces": "it is how the corpus is discovered",
    "list_projects": "it is how the corpus is discovered",
    "list_tags": "it is how the corpus is discovered",
    "list_agents": "it is how the corpus is discovered",
    "memory_stats": "it is how the corpus is discovered",
    "list_tools": "it is how tools are switched back on",
    "toggle_tool": "it is how tools are switched back on",
}

UNDISABLEABLE: frozenset[str] = frozenset(PROTECTED)


def disabled_tools() -> set[str]:
    raw = kv_get(KEY)
    if not raw:
        return set()
    try:
        parsed = json.loads(raw)
        return {n for n in parsed if isinstance(n, str)} if isinstance(parsed, list) else set()
    except ValueError:
        return set()


def set_tool_disabled(name: str, disabled: bool) -> set[str]:
    if disabled and name in PROTECTED:
        raise ValueError(f"{name} cannot be disabled — {PROTECTED[name]}.")
    current = disabled_tools()
    if disabled:
        current.add(name)
    else:
        current.discard(name)
    kv_put(KEY, json.dumps(sorted(current)))
    return current


def enable_all_tools() -> None:
    kv_put(KEY, "[]")

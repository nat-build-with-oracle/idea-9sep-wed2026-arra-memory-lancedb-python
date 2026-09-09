"""
The MCP surface, implemented directly against the JSON-RPC wire format: one
stateless POST endpoint. `tools/list` is live — with `generated_tools` on, every
project in the corpus becomes its own `recall_project_<slug>` tool and every
calendar month its own `search_<yyyy_mm>` tool.
"""

from __future__ import annotations

import json
import re
import time

from . import VERSION, config
from .digest import build_digest, digest_windows
from .fleet import fleet_status, list_fleet, member_replies, send_to_member
from .memory import (
    create_memory,
    memory_history,
    retag_memory,
    delete_memory,
    get_memory,
    get_memory_stats,
    list_agents,
    list_months,
    list_projects,
    list_tags,
    list_workspaces,
    recall_memories,
    search_in_range,
    update_memory,
)
from .searchlog import (
    clear_search_log,
    delete_search_log_entry,
    list_search_log,
    prune_search_log,
    search_log_stats,
)
from .timerange import RELATIVE_RANGES, resolve_range
from .cloud import asked_cloud, tag_cloud
from .dig import chain, dig
from .trace import forget_keyword, list_traces, record_trace, subject_report, timeline
from .tools import UNDISABLEABLE, disabled_tools, set_tool_disabled
from .utils import SUGGESTED_KINDS, parse_iso, slugify, to_iso

SUPPORTED_PROTOCOL_VERSIONS = ("2026-07-28", "2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05")
PREFERRED_PROTOCOL_VERSION = SUPPORTED_PROTOCOL_VERSIONS[0]

MAX_GENERATED_TOOLS = 12
PROJECT_TOOL_PREFIX = "recall_project_"
TIME_TOOL_PREFIX = "search_"
MAX_MONTH_TOOLS = 6


def negotiate_protocol(requested) -> str:
    """Echo the client's version when we can speak it; otherwise offer our own."""
    if not isinstance(requested, str):
        return PREFERRED_PROTOCOL_VERSION
    if requested in SUPPORTED_PROTOCOL_VERSIONS:
        return requested
    return requested if re.fullmatch(r"\d{4}-\d{2}-\d{2}", requested) else PREFERRED_PROTOCOL_VERSION


# Reads of the trace layer itself. An observation must not observe itself: left
# untraced, `trace_search` would find its own previous call every time, and the
# log would grow from being read.
UNTRACED_TOOLS = frozenset(
    {
        "trace_search",
        "trace_subject",
        "forget_trace_keyword",
        "list_search_log",
        "list_tools",
        "timeline",
        # Not because it is unimportant — because it files its OWN row, carrying
        # the before and after sets. Letting the generic tracer log it too put
        # every tag edit in a memory's history twice, the second time with no
        # `after` to show.
        "retag_memory",
        # Same reason: dig writes its own row, with the verdict in it.
        "dig",
        "trace_chain",
    }
)


def _trace_call(name: str, args: dict, started: float, result: dict | None = None, error: Exception | None = None) -> None:
    if name in UNTRACED_TOOLS:
        return
    structured = (result or {}).get("structuredContent") or {}
    subject, subject_kind = "", ""
    for key, kind in (("query", "keyword"), ("tag", "term"), ("id", "item"), ("name", "term")):
        if args.get(key):
            subject, subject_kind = str(args[key]), kind
            break
    hits = structured.get("count")
    if hits is None:
        hits = len(structured.get("memories") or structured.get("entries") or structured.get("tags") or [])
    failed = bool(error) or bool((result or {}).get("isError"))
    record_trace(
        kind="mcp",
        surface="mcp",
        tool=name,
        subject=subject,
        subject_kind=subject_kind,
        outcome="error" if failed else ("empty" if not hits and subject else "ok"),
        hits=int(hits or 0),
        duration_ms=(time.monotonic() - started) * 1000,
        mode=str(structured.get("matchMode") or ""),
        who="claude",
        input=args,
        result=None if failed else structured.get("memory") or structured.get("count"),
        error=str(error) if error else (((result or {}).get("content") or [{}])[0].get("text", "") if failed else ""),
    )


def _ok(id_, result):
    return {"jsonrpc": "2.0", "id": id_ if id_ is not None else None, "result": result}


def _fail(id_, code: int, message: str):
    return {"jsonrpc": "2.0", "id": id_ if id_ is not None else None, "error": {"code": code, "message": message}}


def _text(value: str) -> dict:
    return {"content": [{"type": "text", "text": value}]}


def _tool_error(message: str) -> dict:
    return {"isError": True, "content": [{"type": "text", "text": message}]}


def _as_dict(raw: str | None) -> dict:
    """
    A stored JSON field, read back as a dict — or an empty one.

    Trace fields are written through `clip`, which truncates to `…[N chars]`.
    So a long value does not round-trip: it can fail to parse, and it can parse
    to a list, a string or a number. Anything that is not a dict is not a
    partially-usable dict, so it becomes {} rather than an AttributeError two
    lines later.
    """
    try:
        value = json.loads(raw or "{}")
    except ValueError:
        return {}
    return value if isinstance(value, dict) else {}


def render(memory: dict) -> str:
    tags = f" #{' #'.join(memory['tags'])}" if memory["tags"] else ""
    provenance = " · ".join(
        p
        for p in [
            f"id: {memory['id']}",
            f"importance: {memory['importance']}/5",
            memory["workspace"] and f"workspace: {memory['workspace']}",
            memory["project"] and f"project: {memory['project']}",
            memory["url"] and f"url: {memory['url']}",
            f"source: {memory['source']}",
            memory["createdBy"] and f"by: {memory['createdBy']}",
            f"updated: {memory['updatedAt']}",
        ]
        if p
    )
    return "\n".join([f"[{memory['kind']}] {memory['title']}{tags}", memory["content"], provenance])


# ── static tools ──────────────────────────────────────────────────────────────

KIND_ENUM = {
    "type": "string",
    "description": (
        "What this memory IS. Free text — reuse an existing kind where one fits, and "
        f"call list_kinds to see what the corpus already uses. Common: {', '.join(SUGGESTED_KINDS)}."
    ),
    "examples": list(SUGGESTED_KINDS),
}

WORKSPACE_PROP = {
    "type": "string",
    "description": (
        "Workspace this belongs to — the team-level namespace one tier above project. One workspace holds many "
        'projects, e.g. workspace "arra-memory-haos" with projects "oauth" and "fts". Free-form: a workspace '
        "exists as soon as a memory names it."
    ),
}

PROVENANCE_PROPS = {
    "workspace": WORKSPACE_PROP,
    "project": {"type": "string", "description": "Project this belongs to, e.g. github.com/owner/repo."},
    "url": {"type": "string", "description": "Reference URL. Must be http or https."},
    "createdBy": {"type": "string", "description": "Who or what produced this memory."},
}

SCOPE_PROPS = {
    "workspace": {
        "type": "string",
        "description": "Only memories in this workspace. Omit to search every workspace. Call list_workspaces to see what exists.",
    },
    "project": {"type": "string", "description": "Only memories filed under this project."},
    "createdBy": {
        "type": "string",
        "description": "Only memories written by this agent or person. Call list_agents to see who has written to the corpus.",
    },
}

WORKSPACE_FILTER_PROP = {
    "workspace": {"type": "string", "description": "Only count what is inside this workspace. Omit for the whole corpus."}
}

_LIMIT_100 = {"type": "integer", "minimum": 1, "maximum": 100}
_LIMIT_50 = {"type": "integer", "minimum": 1, "maximum": 50}

BASE_TOOLS: list[dict] = [
    {
        "name": "remember",
        "description": "Persist a durable memory. Use for facts, decisions, lessons, people, projects, or context worth recalling later.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "content": {"type": "string", "minLength": 1, "maxLength": 12000},
                "title": {"type": "string", "minLength": 1, "maxLength": 160},
                "kind": KIND_ENUM,
                "tags": {"type": "array", "items": {"type": "string"}, "maxItems": 10},
                "importance": {"type": "integer", "minimum": 1, "maximum": 5},
                **PROVENANCE_PROPS,
            },
            "required": ["content"],
        },
    },
    {
        "name": "recall_memories",
        "description": (
            "Recall memories across titles, content, and tags — by meaning and by keyword together, so a question "
            "phrased differently from the memory still finds it. Optionally narrowed by kind, workspace, project, "
            "agent, or tag. An empty query returns the most recent important memories. The response reports "
            "`matchMode`, which is what ACTUALLY ran: if it says `keyword`, embeddings were unavailable and a "
            "differently-worded question may still have an answer."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "maxLength": 240},
                "mode": {
                    "type": "string",
                    "enum": ["hybrid", "semantic", "keyword"],
                    "description": (
                        "How to search. `hybrid` (default) fuses meaning and keyword, and falls back to keyword — "
                        "saying so — if embeddings are unavailable. `semantic` is meaning only and FAILS rather than "
                        "degrade. `keyword` is a literal scan: correct for exact strings such as an id, a filename, "
                        "or an error message, where meaning-based recall is the wrong tool."
                    ),
                },
                "kind": KIND_ENUM,
                **SCOPE_PROPS,
                "tag": {"type": "string"},
                "limit": _LIMIT_50,
            },
        },
    },
    {
        "name": "retag_memory",
        "description": (
            "Add and remove tags on one memory without resending the others. Use this to curate — `PATCH`-style "
            "replacement means a client that read the memory a moment ago silently reverts a tag added since. "
            "Removals apply before additions, so renaming a tag is one call. Every change is filed in that "
            "memory's own history, readable with memory_history."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "id": {"type": "string"},
                "add": {"type": "array", "items": {"type": "string"}, "maxItems": 10},
                "remove": {"type": "array", "items": {"type": "string"}, "maxItems": 10},
            },
            "required": ["id"],
        },
    },
    {
        "name": "memory_history",
        "description": (
            "What has happened to one memory — every tag change, with what was added, what was removed, and the "
            "resulting set, newest first. The answer to “why is this tagged that?”, with a timestamp on it."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {"id": {"type": "string"}, "limit": {"type": "integer", "minimum": 1, "maximum": 200}},
            "required": ["id"],
        },
    },
    {
        "name": "read_memory",
        "description": "Read one exact memory by its stable id.",
        "inputSchema": {"type": "object", "properties": {"id": {"type": "string"}}, "required": ["id"]},
    },
    {
        "name": "revise_memory",
        "description": "Revise fields on an existing memory, preserving its id and creation time.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "id": {"type": "string"},
                "title": {"type": "string", "minLength": 1, "maxLength": 160},
                "content": {"type": "string", "minLength": 1, "maxLength": 12000},
                "kind": KIND_ENUM,
                "tags": {"type": "array", "items": {"type": "string"}, "maxItems": 10},
                "importance": {"type": "integer", "minimum": 1, "maximum": 5},
                **PROVENANCE_PROPS,
            },
            "required": ["id"],
        },
    },
    {
        "name": "forget_memory",
        "description": "Permanently delete one memory by id. Use only when the owner clearly asks to forget it.",
        "inputSchema": {"type": "object", "properties": {"id": {"type": "string"}}, "required": ["id"]},
        "annotations": {"destructiveHint": True, "idempotentHint": True},
    },
    {
        "name": "memory_stats",
        "description": "Summarize the corpus: total, counts by kind, top tags, last update.",
        "inputSchema": {"type": "object", "properties": {}},
    },
    {
        "name": "list_workspaces",
        "description": (
            "List every workspace in the corpus with how many memories, projects, and agents it holds. A workspace "
            "is the tier above project — start here to find out how the archive is divided before searching it."
        ),
        "inputSchema": {"type": "object", "properties": {"limit": _LIMIT_100}},
    },
    {
        "name": "list_agents",
        "description": (
            "List who has written to the corpus — every distinct createdBy value with its memory count. Use the "
            "names it returns as the createdBy filter on any search tool."
        ),
        "inputSchema": {"type": "object", "properties": {**WORKSPACE_FILTER_PROP, "limit": _LIMIT_100}},
    },
    {
        "name": "list_projects",
        "description": (
            "List every project in the corpus with its memory count, optionally only those inside one workspace. "
            "Each of these also appears as its own recall tool."
        ),
        "inputSchema": {"type": "object", "properties": {**WORKSPACE_FILTER_PROP, "limit": _LIMIT_100}},
    },
    {
        "name": "list_tags",
        "description": "List every tag in the corpus with how often it is used, optionally only the tags actually used inside one workspace.",
        "inputSchema": {"type": "object", "properties": {**WORKSPACE_FILTER_PROP, "limit": _LIMIT_100}},
    },
    {
        "name": "list_search_log",
        "description": "List recent searches with the query text, what was returned, and when. Only populated when the search log is enabled in the configuration.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "limit": {"type": "integer", "minimum": 1, "maximum": 200},
                "query": {"type": "string", "description": "Only entries whose query contains this."},
            },
        },
    },
    {
        "name": "forget_search_log",
        "description": "Delete search log entries: one by id, everything older than N days, or all of it. Exactly one of id/olderThanDays/all must be given.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "id": {"type": "string", "description": "Delete exactly this entry."},
                "olderThanDays": {"type": "integer", "minimum": 0, "description": "Delete entries older than this many days, e.g. 30."},
                "all": {"type": "boolean", "description": "Delete every entry. Irreversible."},
            },
        },
        "annotations": {"destructiveHint": True, "idempotentHint": False},
    },
    {
        "name": "list_tools",
        "description": "List every tool this connector can offer, whether it is currently enabled, and whether it was generated from the corpus rather than defined in source.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "includeDisabled": {"type": "boolean", "description": "Include tools that are switched off. Defaults to true."}
            },
        },
    },
    {
        "name": "toggle_tool",
        "description": "Switch one tool on or off. A disabled tool is hidden from tools/list and refused if called. Nothing is deleted — re-enabling brings it straight back.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "The tool to change."},
                "enabled": {"type": "boolean", "description": "true to switch on, false to switch off. Omit to flip it."},
            },
            "required": ["name"],
        },
    },
    {
        "name": "digest",
        "description": (
            "Assemble every memory from a time window into one markdown document, grouped by kind — built for "
            "summarising rather than searching. Use this for “what happened today / this week”, and "
            "recall_memories when looking for something specific."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "window": {
                    "type": "string",
                    "description": "today, yesterday, last_7days, last_2weeks, last_3weeks, last_1month, last_3months, last_6months, last_1year, or a month like 2026_08. Relative windows all run up to now.",
                },
                "query": {"type": "string", "maxLength": 240},
                "kind": KIND_ENUM,
                **SCOPE_PROPS,
                "excerpt": {"type": "integer", "minimum": 100, "description": "Trim each memory to this many characters. Omit for full text."},
                "limit": {"type": "integer", "minimum": 1, "maximum": 200},
            },
            "required": ["window"],
        },
    },
    {
        "name": "search_memories_between",
        "description": "Search memories created between two dates (ISO-8601, e.g. 2026-01-01). Use the named search_* tools for common windows; use this for anything else.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "from": {"type": "string", "description": "Start date, inclusive. ISO-8601."},
                "to": {"type": "string", "description": "End date, inclusive. ISO-8601."},
                "query": {"type": "string", "maxLength": 240},
                "kind": KIND_ENUM,
                **SCOPE_PROPS,
                "limit": _LIMIT_50,
            },
            "required": ["from", "to"],
        },
    },
    {
        "name": "tag_cloud",
        "description": (
            "The shape of the corpus, sized on a log scale so it is legible at a glance rather than read one "
            "count at a time. `by: tags` (the default) is what the corpus IS MADE OF; `by: asked` is what people "
            "keep COMING TO IT FOR, from the trace log. Reading them together is the point — a subject that is "
            "large in `asked` and absent from `tags` is a question this corpus has never been able to answer."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "by": {
                    "type": "string",
                    "enum": ["tags", "asked"],
                    "description": "`tags` = the memories' own tags. `asked` = the subjects in the trace log.",
                },
                "days": {"type": "integer", "minimum": 1, "maximum": 365, "description": "For `asked`: only this many days back."},
                **WORKSPACE_FILTER_PROP,
                "limit": _LIMIT_100,
            },
        },
    },
    {
        "name": "timeline",
        "description": (
            "What was written and what was asked, per day. Answers “when was this corpus busy” and “what was I "
            "doing that week” — the same data digest returns as prose, on a time axis instead."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {"days": {"type": "integer", "minimum": 1, "maximum": 365, "description": "How many days back. Defaults to 30."}},
        },
    },
    {
        "name": "dig",
        "description": (
            "Everything this corpus knows about one subject, gathered from every source at once — carried as a "
            "tag, present in the words, near by meaning, moved by a recent retagging, and how often it has been "
            "asked for — with each item saying WHY it is in the answer. Use it instead of several searches when "
            "the question is \"what do we have on X\". The `verdict` is the headline: `asked-never-answered` means "
            "people keep asking and nothing in the corpus carries it, which is a gap worth filling."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {"subject": {"type": "string"}, "limit": _LIMIT_50},
            "required": ["subject"],
        },
        "annotations": {"readOnlyHint": False},
    },
    {
        "name": "trace_chain",
        "description": (
            "One subject on a timeline, with cause linked to effect: asked, found nothing, a memory written, tags "
            "moved, asked again and found. That sequence exists in no single log row — the log records events and "
            "this reads them in order. Answers \"how long did we go without an answer to this, and what closed it\"."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {"subject": {"type": "string"}, "limit": _LIMIT_100},
            "required": ["subject"],
        },
    },
    {
        "name": "trace_search",
        "description": (
            "Search the trace log — every tool call and every read that carried an intent, with what came back. "
            "This is the corpus's memory of being USED, which is a different question from what it contains: use it "
            "for “have I asked this before”, “what did that client actually send”, and “which searches returned nothing”."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "maxLength": 240, "description": "Text to find in the logged tool, subject, mode or error."},
                "kind": {"type": "string", "description": "mcp, read, or admin."},
                "tool": {"type": "string", "description": "Only calls to this tool."},
                "outcome": {"type": "string", "enum": ["ok", "empty", "error"], "description": "`empty` is the interesting one — a search that found nothing."},
                "surface": {"type": "string", "enum": ["mcp", "web"], "description": "Which door the call came through."},
                "since": {"type": "string", "description": "ISO-8601 lower bound, e.g. 2026-09-01."},
                "limit": {"type": "integer", "minimum": 1, "maximum": 500},
            },
        },
    },
    {
        "name": "trace_subject",
        "description": (
            "Everything the log knows about one subject — how often it has been asked for, when it was first and "
            "last asked, through which door, and on which days. The honest answer to “have we been here before”."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {"subject": {"type": "string", "description": "A keyword, tag, or id that was searched for."}},
            "required": ["subject"],
        },
    },
    {
        "name": "forget_trace_keyword",
        "description": (
            "Delete every trace row recorded under one keyword. The trace log retains what was searched for "
            "indefinitely, so there is exactly one way to drop a subject, and the forget itself is filed in the log."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {"keyword": {"type": "string", "description": "The keyword to forget, as it was searched."}},
            "required": ["keyword"],
        },
        "annotations": {"destructiveHint": True, "idempotentHint": True},
    },
    {
        "name": "list_fleet",
        "description": (
            "List the oracle fleet as the message broker currently describes it — every member, whether it is "
            "online, whether a chat channel is attached (only those can be messaged), its host and version, and "
            "when it was last seen. Read live from retained MQTT state. This is NOT list_agents, which lists who "
            "has written memories to this corpus."
        ),
        "inputSchema": {"type": "object", "properties": {}},
    },
    {
        "name": "send_to_oracle",
        "description": (
            "Send a message to another oracle's chat channel. Returns the message id and the exact topic it was "
            "published to. Fire-and-forget: success means the registry accepted and published it, NOT that the "
            "other oracle read it. Poll oracle_replies for an answer."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Target oracle, as shown by list_fleet."},
                "text": {"type": "string", "description": "The message."},
                "room": {"type": "string", "description": "Room within that oracle's channel. Defaults to main."},
            },
            "required": ["name", "text"],
        },
    },
    {
        "name": "oracle_replies",
        "description": (
            "Recent replies from an oracle's channel. Reads an in-memory ring on the registry, so it polls RECENT "
            "traffic and is not a durable inbox — an empty result means nothing is buffered, never that no reply was sent."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Oracle whose replies to read."},
                "since": {"type": "number", "description": "Only replies with a sequence number above this."},
            },
            "required": ["name"],
        },
    },
]

FLEET_TOOLS = {"list_fleet", "send_to_oracle", "oracle_replies"}


def _base_tools() -> list[dict]:
    """Fleet tools are offered only when a broker is configured — never offered-and-failing."""
    from .fleet import fleet_enabled

    if fleet_enabled():
        return BASE_TOOLS
    return [t for t in BASE_TOOLS if t["name"] not in FLEET_TOOLS]


def _catalog_entry(tool: dict, off: set[str]) -> dict:
    name = tool["name"]
    return {
        "name": name,
        "description": tool["description"],
        "generated": bool(tool.get("_project"))
        or (name.startswith(TIME_TOOL_PREFIX) and name != "search_memories_between"),
        "project": tool.get("_project"),
        "destructive": bool((tool.get("annotations") or {}).get("destructiveHint")),
        "disabled": name in off,
    }


def build_tool_list() -> dict:
    base = _base_tools()
    if not config.setting_bool("generated_tools"):
        off = disabled_tools()
        return {
            "tools": [t for t in base if t["name"] not in off],
            "generated": [],
            "catalog": [_catalog_entry(t, off) for t in base],
        }

    projects = list_projects(MAX_GENERATED_TOOLS * 2)
    months = list_months(MAX_MONTH_TOOLS)
    taken: set[str] = set()
    generated: list[dict] = []

    for facet in projects:
        if len(generated) >= MAX_GENERATED_TOOLS:
            break
        slug = slugify(facet["project"])
        if not slug or slug in taken:
            continue
        taken.add(slug)
        generated.append(
            {
                "name": f"{PROJECT_TOOL_PREFIX}{slug}",
                "description": f"Recall memories filed under “{facet['project']}” ({facet['count']} stored). Optionally narrow with a keyword query.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string", "maxLength": 240},
                        "kind": KIND_ENUM,
                        "workspace": SCOPE_PROPS["workspace"],
                        "createdBy": SCOPE_PROPS["createdBy"],
                        "limit": _LIMIT_50,
                    },
                },
                "_project": facet["project"],
            }
        )

    time_schema = {
        "type": "object",
        "properties": {"query": {"type": "string", "maxLength": 240}, "kind": KIND_ENUM, **SCOPE_PROPS, "limit": _LIMIT_50},
    }
    for key, (label, _) in RELATIVE_RANGES.items():
        generated.append(
            {
                "name": f"{TIME_TOOL_PREFIX}{key}",
                "description": f"Search memories created in {label}. Optionally narrow with a keyword query.",
                "inputSchema": time_schema,
            }
        )
    for entry in months:
        token = entry["month"].replace("-", "_")
        generated.append(
            {
                "name": f"{TIME_TOOL_PREFIX}{token}",
                "description": f"Search the {entry['count']} memories created in {entry['month']}.",
                "inputSchema": time_schema,
            }
        )
    if len(months) >= 2:
        newest, older = months[0], months[1]
        generated.append(
            {
                "name": f"{TIME_TOOL_PREFIX}{older['month'].replace('-', '_')}_to_{newest['month'].replace('-', '_')}",
                "description": f"Search memories created from {older['month']} through {newest['month']}.",
                "inputSchema": time_schema,
            }
        )

    everything = base + generated
    off = disabled_tools()
    return {
        "tools": [t for t in everything if t["name"] not in off],
        "generated": generated,
        "catalog": [_catalog_entry(t, off) for t in everything],
    }


def tool_catalog() -> list[dict]:
    return build_tool_list()["catalog"]


# ── dispatch ──────────────────────────────────────────────────────────────────


def _scope_from(args: dict) -> dict:
    return {
        "kind": args.get("kind"),
        "workspace": args.get("workspace") or "",
        "project": args.get("project") or "",
        "createdBy": args.get("createdBy") or "",
    }


def _describe_scope(args: dict) -> str:
    parts = [
        args.get("workspace") and f"workspace “{args['workspace']}”",
        args.get("project") and f"project “{args['project']}”",
        args.get("createdBy") and f"memories by {args['createdBy']}",
        args.get("kind") and f"kind {args['kind']}",
        args.get("tag") and f"tag {args['tag']}",
    ]
    return ", ".join(p for p in parts if p)


def _recall(args: dict) -> dict:
    result = recall_memories(
        {
            "query": args.get("query") or "",
            "mode": args.get("mode"),
            **_scope_from(args),
            "tag": args.get("tag"),
            "match": args.get("match"),
            "limit": args.get("limit") or 10,
            "source": "mcp",
        }
    )
    memories = result["memories"]
    effective = result["effectiveMode"]
    fallback = result.get("fallback")
    scope = _describe_scope(args)
    if memories:
        body = "\n\n".join(f"{i + 1}. {render(m)}" for i, m in enumerate(memories))
    else:
        # Bound outside the f-string. Nesting the same quote inside one is
        # PEP 701, which is Python 3.12+ — and this runs on a Home Assistant
        # Debian base that ships 3.11, where it is a SyntaxError at IMPORT time.
        # pyproject declares >=3.11, so the floor is the contract.
        query_note = f" “{args['query']}”" if args.get("query") else ""
        scope_note = f" in {scope}" if scope else ""
        body = f"No memories matched{query_note}{scope_note}."
        if effective == "keyword" and args.get("query"):
            why = f" — {fallback['reason']}" if fallback else ""
            body += f"\n\n(Searched by keyword only{why}. A search by meaning may still find something.)"
    structured = {
        "query": args.get("query") or "",
        "matchMode": effective,
        "requestedMode": result["requestedMode"],
        **({"fallback": fallback} if fallback else {}),
        **({"counts": result["counts"]} if result.get("counts") else {}),
        **_scope_from(args),
        "count": len(memories),
        "memories": memories,
    }
    return {**_text(body), "structuredContent": structured}


def _range_result(memories: list[dict], args: dict, empty: str, extra: dict) -> dict:
    body = "\n\n".join(f"{i + 1}. {render(m)}" for i, m in enumerate(memories)) if memories else empty
    return {
        **_text(body),
        "structuredContent": {**extra, "matchMode": "keyword", **_scope_from(args), "count": len(memories), "memories": memories},
    }


def call_tool(name: str, args: dict) -> dict:
    if name.startswith(PROJECT_TOOL_PREFIX):
        generated = build_tool_list()["generated"]
        tool = next((t for t in generated if t["name"] == name), None)
        if not tool:
            return _tool_error(f"No project tool named {name}. The corpus may have changed — call list_projects or re-read tools/list.")
        return _recall({**args, "project": tool["_project"]})

    if name.startswith(TIME_TOOL_PREFIX):
        rng = resolve_range(name[len(TIME_TOOL_PREFIX):])
        if rng:
            memories = search_in_range(
                {
                    "fromIso": rng.fromIso,
                    "toIso": rng.toIso,
                    "query": args.get("query"),
                    **_scope_from(args),
                    "limit": args.get("limit") or 20,
                    "label": rng.label,
                    "source": "mcp",
                }
            )
            narrowed = _describe_scope(args)
            matching = f" matching “{args['query']}”" if args.get("query") else ""
            within = f" in {narrowed}" if narrowed else ""
            empty = f"No memories from {rng.label}{matching}{within}."
            return _range_result(memories, args, empty, {"window": rng.label, "from": rng.fromIso, "to": rng.toIso})

    if name == "remember":
        memory = create_memory({**args, "source": args.get("source") or "claude", "createdBy": args.get("createdBy") or "claude"})
        return {**_text(f"Remembered.\n\n{render(memory)}"), "structuredContent": {"memory": memory}}

    if name == "recall_memories":
        return _recall(args)

    if name == "retag_memory":
        try:
            memory = retag_memory(str(args.get("id") or ""), args.get("add"), args.get("remove"), "mcp")
        except (ValueError, TypeError, AttributeError) as error:
            return _tool_error(str(error) or "invalid")
        if not memory:
            return _tool_error(f"Memory {args.get('id')} was not found.")
        return {**_text(f"Tagged.\n\n{render(memory)}"), "structuredContent": {"memory": memory}}

    if name == "memory_history":
        try:
            entries = memory_history(str(args.get("id") or ""), args.get("limit") or 100)
        except ValueError as error:
            return _tool_error(str(error))
        if not entries:
            return {**_text(f"Nothing has been recorded against {args.get('id')}."), "structuredContent": {"entries": []}}
        lines = []
        for e in entries:
            # Every field here comes back from `clip`, which truncates long
            # values to `…[N chars]` — so the JSON can be legally invalid, and it
            # can also parse to a list or a string rather than the dict this
            # reader wants. Both were uncaught: `.get` on a list raised
            # AttributeError and the whole tool answered with a Python traceback.
            changed = _as_dict(e["input"])
            after = _as_dict(e["result"]).get("after")
            moved = " ".join(
                [*(f"+{t}" for t in changed.get("add") or []), *(f"-{t}" for t in changed.get("remove") or [])]
            )
            # A read is not a tag change that failed to happen. Rendering every
            # non-tag row as "(no tag change) → []" made a history of reads look
            # like a history of broken edits.
            if e["kind"] == "tag":
                lines.append(f"{e['at']}  {e['tool']}  {moved or '(no tags moved)'}  → {after if after is not None else []}")
            else:
                lines.append(f"{e['at']}  {e['tool']}  ({e['kind']}, {e['outcome']})")
        return {**_text("\n".join(lines)), "structuredContent": {"entries": entries}}

    if name == "read_memory":
        memory = get_memory(str(args.get("id") or ""))
        if not memory:
            return _tool_error(f"Memory {args.get('id')} was not found.")
        return {**_text(render(memory)), "structuredContent": {"memory": memory}}

    if name == "revise_memory":
        updates = {k: v for k, v in args.items() if k != "id"}
        if not updates:
            return _tool_error("Provide at least one field to revise.")
        memory = update_memory(str(args.get("id") or ""), updates)
        if not memory:
            return _tool_error(f"Memory {args.get('id')} was not found.")
        return {**_text(f"Revised.\n\n{render(memory)}"), "structuredContent": {"memory": memory}}

    if name == "forget_memory":
        if not delete_memory(str(args.get("id") or "")):
            return _tool_error(f"Memory {args.get('id')} was not found.")
        return {**_text(f"Forgot memory {args['id']}."), "structuredContent": {"id": args["id"], "deleted": True}}

    if name == "memory_stats":
        stats = get_memory_stats()
        return {**_text(json.dumps(stats, indent=2, ensure_ascii=False)), "structuredContent": {"stats": stats}}

    if name == "list_workspaces":
        result = list_workspaces(args.get("limit") or 50)
        lines = [
            f"{w['workspace']} — {w['count']} memories, {w['projects']} project(s), {w['agents']} agent(s), last {w['latest']}"
            for w in result["workspaces"]
        ]
        if result["unassigned"]:
            lines.append(f"(no workspace) — {result['unassigned']} memories not filed under any workspace")
        return {**_text("\n".join(lines) if lines else "No memories yet."), "structuredContent": result}

    if name == "list_agents":
        agents = list_agents(args.get("limit") or 50, args.get("workspace"))
        where = f" in workspace “{args['workspace']}”" if args.get("workspace") else ""
        body = "\n".join(f"{a['agent']} — {a['count']} memories, last {a['latest']}" for a in agents) or f"No memories record who wrote them{where}."
        return {**_text(body), "structuredContent": {"agents": agents, "workspace": args.get("workspace") or ""}}

    if name == "tag_cloud":
        asked = str(args.get("by") or "tags") == "asked"
        key = "subject" if asked else "tag"
        cloud = asked_cloud(args.get("limit") or 50, args.get("days")) if asked else tag_cloud(args.get("limit") or 50, args.get("workspace"))
        items = cloud["items"]
        if not items:
            return {**_text("Nothing has been asked yet." if asked else "No tags yet."), "structuredContent": cloud}
        widest = max(len(i[key]) for i in items)
        body = "\n".join(f"{i[key].ljust(widest)}  {str(i['count']).rjust(4)}  {'█' * max(1, round(i['weight'] * 12))}" for i in items)
        note = "\n\nEvery entry has the same count, so none is drawn larger than another." if cloud["uniform"] else ""
        heading = (
            f"{cloud['distinct']} subjects asked {cloud['total']} times"
            if asked
            else f"{cloud['distinct']} tags across {cloud['total']} uses"
        )
        return {**_text(f"{heading}\n\n{body}{note}"), "structuredContent": cloud}

    if name == "timeline":
        result = timeline(args.get("days") or 30)
        rows = [d for d in result["days"] if d["written"] or d["traced"]]
        if not rows:
            return {**_text(f"Nothing written or asked between {result['from']} and {result['to']}."), "structuredContent": result}
        peak = max(d["written"] + d["traced"] for d in rows) or 1
        body = "\n".join(
            f"{d['day']}  {'▇' * max(1, round((d['written'] + d['traced']) / peak * 20))}  {d['written']} written · {d['traced']} asked"
            for d in rows
        )
        return {**_text(body), "structuredContent": result}

    if name == "dig":
        try:
            found = dig(str(args.get("subject") or ""), args.get("limit") or 20, "mcp")
        except ValueError as error:
            return _tool_error(str(error))
        lines = [f"{i['score']:>3}  {i['source']:9}  {i['label']}  ({i['why']})" for i in found["items"]]
        if found["weak"]:
            lines.append("")
            lines.append("weak — returned rather than hidden, a low score is a signal:")
            lines += [f"{i['score']:>3}  {i['source']:9}  {i['label']}  ({i['why']})" for i in found["weak"]]
        headline = {
            "found": f"{len(found['items'])} strong result(s) for “{found['subject']}”",
            "asked-never-answered": f"“{found['subject']}” has been asked for {found['asked']['count']}× and nothing in the corpus carries it.",
            "unknown": f"Nothing on “{found['subject']}”, and nobody has asked for it before.",
        }[found["verdict"]]
        return {**_text(headline + ("\n\n" + "\n".join(lines) if lines else "")), "structuredContent": found}

    if name == "trace_chain":
        try:
            story = chain(str(args.get("subject") or ""), args.get("limit") or 50)
        except ValueError as error:
            return _tool_error(str(error))
        lines = [
            f"{l['at']}  {l['surface']}/{l['tool']}  {l['hits']} hit(s)"
            + ("".join(f"\n    ↳ tags moved on {c['memory'][:8]} — {c['change']}" for c in l["led_to"]))
            for l in story["links"]
        ]
        return {**_text(story["summary"] + ("\n\n" + "\n".join(lines) if lines else "")), "structuredContent": story}

    if name == "trace_search":
        entries = list_traces(
            limit=args.get("limit") or 50,
            query=args.get("query"),
            kind=args.get("kind"),
            tool=args.get("tool"),
            outcome=args.get("outcome"),
            surface=args.get("surface"),
            since=args.get("since"),
        )
        if not entries:
            return {**_text("Nothing in the trace log matched."), "structuredContent": {"count": 0, "entries": []}}
        body = "\n".join(
            f"{e['at']}  {e['surface']}/{e['kind']}  {e['tool']}"
            + (f"  “{e['subject']}”" if e["subject"] else "")
            + f"  → {e['hits']} hit(s), {e['durationMs']}ms"
            + (f", {e['mode']}" if e["mode"] else "")
            + (f"  ERROR: {e['error']}" if e["outcome"] == "error" else "")
            for e in entries
        )
        return {**_text(body), "structuredContent": {"count": len(entries), "entries": entries}}

    if name == "trace_subject":
        report = subject_report(str(args.get("subject") or ""))
        if not report["count"]:
            return {**_text(f"Nothing has been asked under “{report['subject']}”."), "structuredContent": report}
        days = " · ".join(f"{d['day']}×{d['count']}" for d in report["days"][-14:])
        body = (
            f"“{report['subject']}” — asked {report['count']} time(s)\n"
            f"first {report['first']}\nlast  {report['last']}\n"
            f"by kind: {report['byKind']}\nby surface: {report['bySurface']}\n{days}"
        )
        return {**_text(body), "structuredContent": report}

    if name == "forget_trace_keyword":
        try:
            removed = forget_keyword(str(args.get("keyword") or ""))
        except ValueError as error:
            return _tool_error(str(error))
        return {
            **_text(f"Forgot {removed} trace row(s) recorded under “{args['keyword']}”."),
            "structuredContent": {"keyword": args["keyword"], "deleted": removed},
        }

    if name == "list_fleet":
        r = list_fleet()
        if not r["ok"]:
            return _text(f"Cannot see the fleet: {r['error']}")
        lines = [
            ("● " if m.get("state") == "online" else "○ ")
            + m["name"]
            + (" · chat" if m.get("channel") else " · no channel")
            + (f" · {m['host']}" if m.get("host") else "")
            + (f" · v{m['version']}" if m.get("version") else "")
            + (f" · seen {m['seen']}" if m.get("seen") else "")
            for m in r["members"]
        ]
        body = "\n".join(lines) if lines else "No member has published presence to the broker. Connected, but the fleet is silent."
        return {**_text(body), "structuredContent": {"members": r["members"], "connection": fleet_status()}}

    if name == "send_to_oracle":
        r = send_to_member(str(args.get("name") or ""), str(args.get("text") or ""), str(args.get("room") or "main"))
        if not r["ok"]:
            return _text(f"Not sent: {r['error']}")
        return {
            **_text(f"Sent to {args['name']} (id {r['id']}, topic {r['topic']}). Published, not read — poll oracle_replies for an answer."),
            "structuredContent": {"sent": True, "id": r["id"], "topic": r["topic"]},
        }

    if name == "oracle_replies":
        replies = member_replies(str(args["name"]) if args.get("name") else None, int(args.get("since") or 0))
        body = (
            "\n\n".join(f"[{r['seq']}] {r['name']}/{r['room']} {r['at']}\n{r['text']}" for r in replies)
            if replies
            else "Nothing buffered"
            + (f" from {args['name']}" if args.get("name") else "")
            + ". This is a short in-memory ring of live traffic, so an empty result does not prove no reply was sent."
        )
        return {**_text(body), "structuredContent": {"replies": replies}}

    if name == "list_projects":
        projects = list_projects(args.get("limit") or 20, args.get("workspace"))
        where = f" in workspace “{args['workspace']}”" if args.get("workspace") else ""
        body = "\n".join(f"{p['project']} — {p['count']} memories, last {p['latest']}" for p in projects) or f"No memories carry a project{where} yet."
        return {**_text(body), "structuredContent": {"projects": projects, "workspace": args.get("workspace") or ""}}

    if name == "list_tags":
        tags = list_tags(args.get("limit") or 50, args.get("workspace"))
        where = f" in workspace “{args['workspace']}”" if args.get("workspace") else ""
        body = ", ".join(f"{t['tag']} ({t['count']})" for t in tags) or f"No tags{where} yet."
        return {**_text(body), "structuredContent": {"tags": tags, "workspace": args.get("workspace") or ""}}

    if name == "list_search_log":
        entries = list_search_log(args.get("limit") or 50, args.get("query"))
        stats = search_log_stats()
        if not stats["enabled"]:
            return {
                **_text("The search log is switched off. Enable `search_log` in the configuration to start recording queries."),
                "structuredContent": {"enabled": False, "entries": []},
            }
        def line(e: dict) -> str:
            mode = f", {e['mode']}" if e["mode"] != "keyword" else ""
            return f"{e['createdAt']}  “{e['query'] or '(empty)'}”  → {e['resultCount']} result(s), {e['durationMs']}ms{mode}"

        body = "\n".join(line(e) for e in entries) or "No searches recorded yet."
        return {**_text(body), "structuredContent": {"enabled": True, "stats": stats, "entries": entries}}

    if name == "forget_search_log":
        # `is not` rather than `not in`, because `in` compares by equality and in
        # Python `0 == False`. With `not in (None, False)` an olderThanDays of 0
        # vanished from the mode list: `{olderThanDays: 0, all: true}` collapsed to
        # one mode and cleared the WHOLE log, which is precisely the ambiguity this
        # guard exists to refuse, and `{olderThanDays: 0}` alone collapsed to none
        # and was refused even though the schema declares minimum 0.
        modes = [v for v in (args.get("id"), args.get("olderThanDays"), args.get("all")) if v is not None and v is not False]
        if len(modes) != 1:
            return _tool_error("Give exactly one of: id, olderThanDays, or all.")
        if args.get("id"):
            if delete_search_log_entry(str(args["id"])):
                return {**_text(f"Deleted search log entry {args['id']}."), "structuredContent": {"deleted": 1}}
            return _tool_error(f"No search log entry with id {args['id']}.")
        if args.get("all") is True:
            removed = clear_search_log()
            return {**_text(f"Cleared the whole search log ({removed} entries)."), "structuredContent": {"deleted": removed}}
        pruned = prune_search_log(int(args["olderThanDays"]))
        return {
            **_text(f"Pruned {pruned['removed']} search log entries older than {args['olderThanDays']} days (before {pruned['cutoff']})."),
            "structuredContent": {"deleted": pruned["removed"], "cutoff": pruned["cutoff"]},
        }

    if name == "list_tools":
        catalog = tool_catalog()
        shown = catalog if args.get("includeDisabled") is not False else [t for t in catalog if not t["disabled"]]
        lines = [
            f"{'off' if t['disabled'] else 'on '}  {t['name']}{'  (generated)' if t['generated'] else ''}{'  [always on]' if t['name'] in UNDISABLEABLE else ''}"
            for t in shown
        ]
        return {**_text(f"{len(shown)} tools\n\n" + "\n".join(lines)), "structuredContent": {"tools": shown, "locked": sorted(UNDISABLEABLE)}}

    if name == "toggle_tool":
        target = str(args.get("name") or "")
        known = next((t for t in tool_catalog() if t["name"] == target), None)
        if not known:
            return _tool_error(f"No tool named {target}. Call list_tools to see what exists — generated tools change with the corpus.")
        enable = known["disabled"] if args.get("enabled") is None else bool(args["enabled"])
        try:
            set_tool_disabled(target, not enable)
        except ValueError as error:
            return _tool_error(str(error))
        return {**_text(f"{target} is now {'enabled' if enable else 'disabled'}."), "structuredContent": {"name": target, "enabled": enable}}

    if name == "digest":
        digest = build_digest(
            {
                "window": str(args.get("window") or "today"),
                "query": args.get("query"),
                **_scope_from(args),
                "excerpt": args.get("excerpt"),
                "limit": args.get("limit"),
            }
        )
        if not digest:
            return _tool_error(f"Unknown window “{args.get('window')}”. Use one of: {', '.join(digest_windows())}, or a month like 2026_08.")
        return {
            **_text(digest["markdown"]),
            "structuredContent": {
                "window": digest["window"],
                "label": digest["label"],
                "from": digest["fromIso"],
                "count": digest["count"],
                "byKind": digest["byKind"],
            },
        }

    if name == "search_memories_between":
        start = parse_iso(str(args.get("from") or ""))
        end = parse_iso(str(args.get("to") or ""))
        if not start or not end:
            return _tool_error("from and to must be ISO-8601 dates, e.g. 2026-01-01.")
        if re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(args.get("to")).strip()):
            end = end.replace(hour=23, minute=59, second=59, microsecond=999000)
        if start > end:
            return _tool_error("from must not be later than to.")
        memories = search_in_range(
            {
                "fromIso": to_iso(start),
                "toIso": to_iso(end),
                "query": args.get("query"),
                **_scope_from(args),
                "limit": args.get("limit") or 20,
                "label": f"{args['from']} to {args['to']}",
                "source": "mcp",
            }
        )
        narrowed = _describe_scope(args)
        empty = f"No memories between {args['from']} and {args['to']}{f' in {narrowed}' if narrowed else ''}."
        return _range_result(memories, args, empty, {"from": to_iso(start), "to": to_iso(end)})

    return _tool_error(f"Unknown tool: {name}")


# ── JSON-RPC entry point ──────────────────────────────────────────────────────


def handle_mcp(request: dict):
    """Returns a JSON-RPC response dict, or None for a notification."""
    method = request.get("method")
    id_ = request.get("id")
    params = request.get("params") or {}
    if not isinstance(params, dict):
        params = {}

    if method == "initialize":
        return _ok(
            id_,
            {
                "protocolVersion": negotiate_protocol(params.get("protocolVersion")),
                "capabilities": {"tools": {"listChanged": True}},
                "serverInfo": {"name": config.instance_name(), "version": VERSION},
            },
        )
    if method in ("notifications/initialized", "notifications/cancelled"):
        return None
    if method == "ping":
        return _ok(id_, {})
    if method == "tools/list":
        tools = build_tool_list()["tools"]
        return _ok(id_, {"tools": [{k: v for k, v in t.items() if k != "_project"} for t in tools]})
    if method == "tools/call":
        name = str(params.get("name") or "")
        args = params.get("arguments") or {}
        if not isinstance(args, dict):
            args = {}
        if name in disabled_tools():
            return _ok(id_, _tool_error(f"{name} is switched off for this connector."))

        # Traced HERE, around the dispatcher, so no tool can be added without
        # being logged — and on BOTH paths, because the call that failed is the
        # one you most want to find later.
        started = time.monotonic()
        try:
            result = call_tool(name, args)
        except Exception as error:
            _trace_call(name, args, started, error=error)
            return _ok(id_, _tool_error(str(error) or "tool failed"))
        _trace_call(name, args, started, result=result)
        return _ok(id_, result)
    return _fail(id_, -32601, f"Method not found: {method}")

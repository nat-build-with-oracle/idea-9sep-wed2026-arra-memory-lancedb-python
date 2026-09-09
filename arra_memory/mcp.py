"""
The MCP surface, implemented directly against the JSON-RPC wire format: one
stateless POST endpoint. `tools/list` is live — with `generated_tools` on, every
project in the corpus becomes its own `recall_project_<slug>` tool and every
calendar month its own `search_<yyyy_mm>` tool.
"""

from __future__ import annotations

import json
import re

from . import VERSION, config
from .digest import build_digest, digest_windows
from .fleet import fleet_status, list_fleet, member_replies, send_to_member
from .memory import (
    create_memory,
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


def _ok(id_, result):
    return {"jsonrpc": "2.0", "id": id_ if id_ is not None else None, "result": result}


def _fail(id_, code: int, message: str):
    return {"jsonrpc": "2.0", "id": id_ if id_ is not None else None, "error": {"code": code, "message": message}}


def _text(value: str) -> dict:
    return {"content": [{"type": "text", "text": value}]}


def _tool_error(message: str) -> dict:
    return {"isError": True, "content": [{"type": "text", "text": message}]}


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
        body = f"No memories matched{f' “{args['query']}”' if args.get('query') else ''}{f' in {scope}' if scope else ''}."
        if effective == "keyword" and args.get("query"):
            body += (
                f"\n\n(Searched by keyword only{f' — {fallback['reason']}' if fallback else ''}. "
                "A search by meaning may still find something.)"
            )
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
            empty = f"No memories from {rng.label}{f' matching “{args['query']}”' if args.get('query') else ''}{f' in {narrowed}' if narrowed else ''}."
            return _range_result(memories, args, empty, {"window": rng.label, "from": rng.fromIso, "to": rng.toIso})

    if name == "remember":
        memory = create_memory({**args, "source": args.get("source") or "claude", "createdBy": args.get("createdBy") or "claude"})
        return {**_text(f"Remembered.\n\n{render(memory)}"), "structuredContent": {"memory": memory}}

    if name == "recall_memories":
        return _recall(args)

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
            else f"Nothing buffered{f' from {args['name']}' if args.get('name') else ''}. This is a short in-memory ring of live traffic, so an empty result does not prove no reply was sent."
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
        modes = [v for v in (args.get("id"), args.get("olderThanDays"), args.get("all")) if v not in (None, False)]
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
        try:
            return _ok(id_, call_tool(name, args))
        except Exception as error:
            return _ok(id_, _tool_error(str(error) or "tool failed"))
    return _fail(id_, -32601, f"Method not found: {method}")

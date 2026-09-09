"""
The HTTP surface: the web UI, the REST API it calls, OAuth for remote MCP
clients, and the MCP endpoint itself. One process, one LanceDB directory.
"""

from __future__ import annotations

import logging
import threading
import time
from collections import deque
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse, PlainTextResponse, Response
from starlette.concurrency import run_in_threadpool as tp

from . import VERSION, config
from .auth import AuthConfig, authenticate, unauthorized_headers
from .db import db
from .cloud import asked_cloud, tag_cloud
from .dig import chain, dig
from .digest import build_digest, digest_windows
from .fleet import fleet_enabled, start_fleet, stop_fleet
from .graph import build_graph
from .mcp import handle_mcp, tool_catalog
from .memory import (
    FACETS,
    memory_history,
    normalize_match,
    retag_memory,
    backfill_embeddings,
    create_memory,
    delete_memory,
    embedding_coverage,
    get_memory,
    get_memory_stats,
    list_agents,
    list_facets,
    list_projects,
    list_tags,
    list_workspaces,
    merge_facet,
    recall_memories,
    search_memories,
    update_memory,
    wait_for_indexing,
)
from .oauth import (
    authorization_server_metadata,
    exchange_code,
    get_client,
    is_registered_redirect,
    issue_code,
    list_clients,
    register_client,
    revoke_client,
    sweep_expired,
)
from .pages import approval_page
from .searchlog import (
    clear_search_log,
    delete_search_log_entry,
    list_search_log,
    prune_search_log,
    search_log_stats,
)
from .session import COOKIE_NAME, clear_session_cookie, issue_session, revoke_session, session_cookie
from .tools import UNDISABLEABLE, enable_all_tools, set_tool_disabled
from .trace import (
    clear_traces,
    forget_keyword,
    list_traces,
    prune_traces,
    record_trace,
    subject_report,
    timeline,
    trace_stats,
)
from .utils import escape_html, random_token, read_cookie, timing_safe_equal

log = logging.getLogger("arra-memory")

STATIC_DIR = Path(__file__).parent / "static"

CORS_HEADERS = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, DELETE, OPTIONS",
    "access-control-allow-headers": "authorization, content-type, mcp-session-id, mcp-protocol-version, last-event-id",
    "access-control-expose-headers": "mcp-session-id, mcp-protocol-version, www-authenticate",
    "access-control-max-age": "86400",
}

MCP_LOG_SIZE = 25

# What a malformed memory field can raise on its way through the normalisers.
# The original wrapped these routes in a bare `catch (error)` and answered 400,
# so a body like {"workspace": 123} or {"importance": 1e999} was a client error
# there and a 500 with a traceback here.
BAD_INPUT = (ValueError, TypeError, AttributeError, OverflowError)


def json_response(body, status: int = 200, headers: dict | None = None) -> JSONResponse:
    return JSONResponse(body, status_code=status, headers={**CORS_HEADERS, **(headers or {})})


def origin_of(request: Request) -> str:
    configured = config.setting("public_url")
    if configured:
        return configured.rstrip("/")
    proto = request.headers.get("x-forwarded-proto") or request.url.scheme
    host = request.headers.get("x-forwarded-host") or request.headers.get("host") or request.url.netloc
    return f"{proto.split(',')[0].strip()}://{host}"


def is_secure(request: Request) -> bool:
    forwarded = request.headers.get("x-forwarded-proto")
    if forwarded:
        return forwarded.split(",")[0].strip() == "https"
    return request.url.scheme == "https"


def unauthorized(origin: str) -> JSONResponse:
    return JSONResponse(
        {"error": "unauthorized", "error_description": "Authentication required."},
        status_code=401,
        headers=unauthorized_headers(origin),
    )


def sse_frame(payload) -> str:
    import json

    return f"event: message\ndata: {json.dumps(payload, ensure_ascii=False)}\n\n"


def method_not_allowed() -> JSONResponse:
    return JSONResponse(
        {"jsonrpc": "2.0", "id": None, "error": {"code": -32000, "message": "Method not allowed. This endpoint accepts POST only."}},
        status_code=405,
        headers={"allow": "POST", **CORS_HEADERS},
    )


def protected_resource_metadata(origin: str) -> dict:
    return {
        "resource": f"{origin}/mcp",
        "authorization_servers": [origin],
        "scopes_supported": ["memory:read", "memory:write"],
        "bearer_methods_supported": ["header"],
    }


async def read_json(request: Request) -> dict:
    try:
        body = await request.json()
    except Exception:
        return {}
    return body if isinstance(body, dict) else {}


def create_app() -> FastAPI:
    owner = config.setting("owner_passphrase")
    if not owner:
        raise RuntimeError(
            "owner_passphrase is not set. Set OWNER_PASSPHRASE (e.g. `openssl rand -base64 32`) — "
            "refusing to start, because an unset passphrase would serve your memories to anyone who reaches this URL."
        )
    auth_config = AuthConfig(owner_passphrase=owner, api_token=config.setting("api_token") or None)
    mcp_log: deque = deque(maxlen=MCP_LOG_SIZE)
    sweeper: dict = {"timer": None}

    def schedule_sweep():
        def run():
            try:
                sweep_expired()
            except Exception:
                pass
            schedule_sweep()

        timer = threading.Timer(60 * 60, run)
        timer.daemon = True
        sweeper["timer"] = timer
        timer.start()

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        try:
            await tp(db)
        except Exception as error:
            log.error("[arra-memory] schema startup failed: %s", error)
        start_fleet()
        schedule_sweep()
        log.info("[arra-memory] auth: owner-session + oauth%s", " + api-token" if auth_config.api_token else "")
        log.info(
            "[arra-memory] fleet: %s",
            "MQTT configured — list_fleet / send_to_oracle / oracle_replies live" if fleet_enabled() else "disabled (mqtt_url unset)",
        )
        yield
        if sweeper["timer"] is not None:
            sweeper["timer"].cancel()
        stop_fleet()
        try:
            await tp(wait_for_indexing, 5.0)
        except Exception:
            pass

    app = FastAPI(title=config.instance_name(), version=VERSION, lifespan=lifespan, docs_url=None, redoc_url=None, openapi_url=None)

    @app.middleware("http")
    async def cors(request: Request, call_next):
        if request.method == "OPTIONS":
            return Response(status_code=204, headers=CORS_HEADERS)
        response = await call_next(request)
        for key, value in CORS_HEADERS.items():
            if key not in response.headers:
                response.headers[key] = value
        return response

    async def gate(request: Request):
        return await tp(authenticate, request.headers, auth_config)

    def record_mcp(entry: dict):
        from .utils import now_iso

        mcp_log.appendleft({"at": now_iso(), **entry})

    # ── health ─────────────────────────────────────────────────────────────

    @app.get("/api/health")
    async def health():
        database = db()
        features = {
            "semantic": bool(config.setting("ollama_url")),
            "embeddingModel": (config.setting("embedding_model") or "bge-m3") if config.setting("ollama_url") else None,
            "searchLog": config.setting_bool("search_log"),
            "replica": False,
            "apiToken": bool(config.setting("api_token")),
            "engine": "lancedb",
            "fts": database.has_fts(),
        }
        if database.schema_error:
            features["schemaError"] = database.schema_error
        return json_response(
            {
                "status": "ok",
                "service": "arra-memory",
                "name": config.instance_name(),
                "version": VERSION,
                "defaults": {"language": config.setting("language") or "th", "theme": config.setting("theme") or "slate"},
                "features": features,
            }
        )

    # ── discovery ──────────────────────────────────────────────────────────

    @app.get("/.well-known/oauth-authorization-server")
    async def oauth_metadata(request: Request):
        return json_response(authorization_server_metadata(origin_of(request)))

    @app.get("/.well-known/oauth-protected-resource")
    @app.get("/.well-known/oauth-protected-resource/mcp")
    async def resource_metadata(request: Request):
        return json_response(protected_resource_metadata(origin_of(request)))

    # ── OAuth ──────────────────────────────────────────────────────────────

    @app.post("/oauth/register")
    async def oauth_register(request: Request):
        try:
            body = await request.json()
        except Exception:
            return json_response({"error": "invalid_client_metadata"}, 400)
        try:
            client = await tp(register_client, body if isinstance(body, dict) else {})
        except ValueError as error:
            return json_response({"error": "invalid_client_metadata", "error_description": str(error)}, 400)
        return json_response(
            {
                "client_id": client.client_id,
                "client_name": client.client_name,
                "redirect_uris": client.redirect_uris,
                "token_endpoint_auth_method": "none",
                "grant_types": ["authorization_code"],
                "response_types": ["code"],
            },
            201,
        )

    def approval_params(source) -> dict:
        return {
            "client_id": source.get("client_id") or "",
            "redirect_uri": source.get("redirect_uri") or "",
            "state": source.get("state") or "",
            "code_challenge": source.get("code_challenge") or "",
            "code_challenge_method": source.get("code_challenge_method") or "",
            "scope": source.get("scope") or "memory:read memory:write",
        }

    @app.get("/authorize")
    async def authorize_page(request: Request):
        params = approval_params(request.query_params)
        client = await tp(get_client, params["client_id"])
        if not client or not is_registered_redirect(client, params["redirect_uri"]):
            return PlainTextResponse("Unknown client or unregistered redirect_uri.", status_code=400)
        return HTMLResponse(approval_page(client_name=client.client_name or client.client_id, params=params))

    @app.post("/authorize")
    async def authorize_submit(request: Request):
        form = await request.form()
        params = approval_params({k: str(v) for k, v in form.items()})
        passphrase = str(form.get("passphrase") or "")
        client = await tp(get_client, params["client_id"])
        if not client or not is_registered_redirect(client, params["redirect_uri"]):
            return PlainTextResponse("Unknown client or unregistered redirect_uri.", status_code=400)
        if not timing_safe_equal(passphrase, auth_config.owner_passphrase):
            return HTMLResponse(
                approval_page(
                    client_name=client.client_name or client.client_id,
                    params=params,
                    error="That passphrase does not match. Try again.",
                ),
                status_code=401,
            )
        try:
            code = await tp(
                issue_code,
                client_id=params["client_id"],
                redirect_uri=params["redirect_uri"],
                code_challenge=params["code_challenge"],
                code_challenge_method=params["code_challenge_method"],
                scope=params["scope"],
            )
        except ValueError as error:
            return PlainTextResponse(escape_html(str(error)), status_code=400)
        from urllib.parse import urlencode, urlsplit, urlunsplit, parse_qsl

        target = urlsplit(params["redirect_uri"])
        query = dict(parse_qsl(target.query, keep_blank_values=True))
        query["code"] = code
        if params["state"]:
            query["state"] = params["state"]
        location = urlunsplit((target.scheme, target.netloc, target.path, urlencode(query), target.fragment))
        return Response(status_code=302, headers={"location": location})

    @app.post("/oauth/token")
    async def oauth_token(request: Request):
        form = await request.form()
        if str(form.get("grant_type")) != "authorization_code":
            return json_response({"error": "unsupported_grant_type"}, 400)
        try:
            result = await tp(
                exchange_code,
                code=str(form.get("code") or ""),
                client_id=str(form.get("client_id") or ""),
                redirect_uri=str(form.get("redirect_uri") or ""),
                code_verifier=str(form.get("code_verifier") or ""),
            )
        except Exception:
            return json_response({"error": "invalid_grant"}, 400)
        return json_response(
            {"access_token": result["accessToken"], "token_type": "Bearer", "expires_in": result["expiresIn"], "scope": result["scope"]}
        )

    # ── the web session ────────────────────────────────────────────────────

    @app.post("/api/session")
    async def session_open(request: Request):
        body = await read_json(request)
        if not timing_safe_equal(str(body.get("passphrase") or ""), auth_config.owner_passphrase):
            return json_response({"error": "invalid_passphrase"}, 401)
        token = await tp(issue_session, auth_config.owner_passphrase)
        return JSONResponse({"ok": True}, headers={"set-cookie": session_cookie(token, is_secure(request))})

    @app.get("/api/session")
    async def session_check(request: Request):
        auth = await gate(request)
        return json_response({"authenticated": auth.ok, "method": auth.method})

    @app.delete("/api/session")
    async def session_close(request: Request):
        await tp(revoke_session, read_cookie(request.headers.get("cookie"), COOKIE_NAME))
        return JSONResponse({"ok": True}, headers={"set-cookie": clear_session_cookie(is_secure(request))})

    # ── the corpus ─────────────────────────────────────────────────────────

    @app.get("/api/memories")
    async def memories_list(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        q = request.query_params
        started = time.monotonic()
        memories = await tp(
            search_memories,
            {
                "query": q.get("q"),
                "kind": q.getlist("kind"),
                "workspace": q.getlist("workspace"),
                "project": q.getlist("project"),
                "createdBy": q.getlist("createdBy"),
                # getlist, like every sibling facet — see _tag_set in memory.py.
                "tag": q.getlist("tag"),
                "match": q.get("match"),
                "limit": _int(q.get("limit")),
                "source": "web",
            },
        )
        # A read is traced only when it carries an INTENT. The archive refetches
        # this endpoint on every filter change and on load, and recording those
        # would bury the handful of rows worth reading under a wall of
        # "(no query) → 7 results".
        _trace_read(q.get("q"), ", ".join(q.getlist("tag")), len(memories), started, auth.method)
        # The effective match is echoed ALWAYS, not only when tags were passed: a
        # caller that cannot see which rule ran cannot tell an empty result from
        # a wrong one.
        return json_response(
            {"memories": memories, "count": len(memories), "match": normalize_match(q.get("match"))}
        )

    @app.get("/api/digest")
    async def digest(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        q = request.query_params
        result = await tp(
            build_digest,
            {
                "window": q.get("window") or "today",
                "query": q.get("q"),
                "kind": q.getlist("kind"),
                "workspace": q.getlist("workspace"),
                "project": q.getlist("project"),
                "createdBy": q.getlist("createdBy"),
                "limit": _int(q.get("limit")),
                "excerpt": _int(q.get("excerpt")),
            },
        )
        if not result:
            return json_response(
                {
                    "error": "unknown_window",
                    "message": f"window must be one of: {', '.join(digest_windows())}, or a month like 2026_08.",
                    "windows": digest_windows(),
                },
                400,
            )
        if q.get("format") == "json":
            return json_response(result)
        return PlainTextResponse(result["markdown"], headers=CORS_HEADERS)

    @app.post("/api/merge")
    async def merge(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        body = await read_json(request)
        facet = str(body.get("facet") or "")
        if facet not in FACETS:
            return json_response({"error": "invalid", "message": f"facet must be one of: {', '.join(FACETS)}"}, 400)
        try:
            return json_response(await tp(merge_facet, facet, str(body.get("from") or ""), str(body.get("to") or "")))
        except ValueError as error:
            return json_response({"error": "invalid", "message": str(error) or "merge failed"}, 400)

    @app.get("/api/graph")
    async def graph(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        q = request.query_params
        return json_response(
            await tp(
                build_graph,
                {
                    "kind": q.getlist("kind"),
                    "workspace": q.getlist("workspace"),
                    "project": q.getlist("project"),
                    "createdBy": q.getlist("createdBy"),
                    "limit": _int(q.get("limit")),
                },
            )
        )

    @app.get("/api/facets")
    async def facets(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        return json_response(await tp(list_facets))

    @app.get("/api/workspaces")
    async def workspaces(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        listed = await tp(list_workspaces, _int(request.query_params.get("limit")) or 50)
        agents = await tp(list_agents, 50)
        return json_response({**listed, "agents": agents})

    # `{name:path}`, not `{name}` — uvicorn percent-decodes the path before
    # Starlette routes it, so a workspace named "Soul-Brews/arra" arrives with a
    # real slash and the default `[^/]+` convertor does not match. The request
    # then fell through to the SPA catch-all and answered 200 text/html, which the
    # UI's fetch wrapper treats as success and chokes on parsing. Nothing stops a
    # workspace name containing a slash, and the workspace list happily shows it.
    @app.get("/api/workspaces/{name:path}")
    async def workspace(request: Request, name: str):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        if not name.strip():
            return json_response(
                {
                    "error": "invalid",
                    "message": "A workspace name is required. Memories with no workspace are not a workspace — browse the archive unfiltered to see them.",
                },
                400,
            )
        projects = await tp(list_projects, 50, name)
        agents = await tp(list_agents, 50, name)
        tags = await tp(list_tags, 50, name)
        memories = await tp(search_memories, {"workspace": name, "limit": 20, "source": "web"})
        return json_response({"workspace": name, "projects": projects, "agents": agents, "tags": tags, "memories": memories})

    @app.get("/api/memories/{memory_id}")
    async def memory_get(request: Request, memory_id: str):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        try:
            memory = await tp(get_memory, memory_id)
        except ValueError:
            memory = None
        return json_response({"memory": memory}) if memory else json_response({"error": "not_found"}, 404)

    @app.post("/api/memories")
    async def memory_create(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        body = await read_json(request)
        try:
            memory = await tp(create_memory, {**body, "source": body.get("source") or "web"})
        except BAD_INPUT as error:
            return json_response({"error": "invalid", "message": str(error) or "invalid"}, 400)
        return json_response({"memory": memory}, 201)

    @app.patch("/api/memories/{memory_id}")
    async def memory_update(request: Request, memory_id: str):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        body = await read_json(request)
        try:
            memory = await tp(update_memory, memory_id, body)
        except BAD_INPUT as error:
            return json_response({"error": "invalid", "message": str(error) or "invalid"}, 400)
        return json_response({"memory": memory}) if memory else json_response({"error": "not_found"}, 404)

    @app.post("/api/memories/{memory_id}/tags")
    async def memory_retag(request: Request, memory_id: str):
        """Add and remove tags in one operation, and file what changed."""
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        body = await read_json(request)
        try:
            memory = await tp(retag_memory, memory_id, body.get("add"), body.get("remove"), "web")
        except BAD_INPUT as error:
            return json_response({"error": "invalid", "message": str(error) or "invalid"}, 400)
        return json_response({"memory": memory}) if memory else json_response({"error": "not_found"}, 404)

    @app.get("/api/memories/{memory_id}/history")
    async def memory_history_route(request: Request, memory_id: str):
        """One memory's own history. Untraced, like every read of the log."""
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        return json_response({"id": memory_id, "entries": await tp(memory_history, memory_id)})

    @app.delete("/api/memories/{memory_id}")
    async def memory_delete(request: Request, memory_id: str):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        try:
            deleted = await tp(delete_memory, memory_id)
        except ValueError:
            deleted = False
        return json_response({"id": memory_id, "deleted": True}) if deleted else json_response({"error": "not_found"}, 404)

    @app.post("/api/search")
    async def search(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        body = await read_json(request)
        started = time.monotonic()
        query = str(body.get("query") or "")
        try:
            result = await tp(
                recall_memories,
                {
                    "query": query,
                    "mode": body.get("mode"),
                    "kind": body.get("kind"),
                    "workspace": body.get("workspace"),
                    "project": body.get("project"),
                    "createdBy": body.get("createdBy"),
                    "tag": body.get("tag"),
                    # Passed, like every other filter. Dropping it silently made
                    # `match: "all"` behave as "any" — the UI asks for
                    # memories carrying BOTH tags and was handed the ones
                    # carrying either, with no way to tell from the response.
                    "match": body.get("match"),
                    "limit": body.get("limit"),
                    "source": "web",
                },
            )
        except Exception as error:
            # The failed search is traced too — a search that could not run is
            # exactly what someone is looking for when they open the log.
            _trace_read(query, body.get("tag"), 0, started, auth.method, error=str(error))
            return json_response({"error": "semantic_unavailable", "message": str(error) or "embedding failed"}, 503)
        _trace_read(query, body.get("tag"), len(result["memories"]), started, auth.method, mode=result["effectiveMode"])
        # Echoed ALWAYS, like the GET sibling: a client that cannot see which
        # rule was applied cannot tell a narrow result from a broken filter.
        return json_response({**result, "match": normalize_match(body.get("match"))})

    # ── settings: OWNER SESSION ONLY ───────────────────────────────────────

    async def owner_only(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        if auth.method != "owner-session":
            return json_response({"error": "forbidden", "message": "Settings require an owner session."}, 403)
        return None

    @app.get("/api/settings")
    async def settings_get(request: Request):
        refused = await owner_only(request)
        if refused:
            return refused
        return json_response(config.describe_settings())

    @app.patch("/api/settings")
    async def settings_patch(request: Request):
        refused = await owner_only(request)
        if refused:
            return refused
        writable, reason = config.settings_writable()
        if not writable:
            return json_response({"error": "read_only", "message": reason}, 409)
        body = await read_json(request)
        patch: dict[str, str] = {}
        unknown: list[str] = []
        for key, value in body.items():
            if key in config.SETTING_KEYS:
                patch[key] = "" if value is None else str(value)
            else:
                unknown.append(key)
        if unknown:
            return json_response(
                {"error": "unknown_keys", "message": f"Not options this server accepts: {', '.join(unknown)}", "valid": list(config.SETTING_KEYS)},
                400,
            )
        written, ignored = await tp(config.write_settings, patch)
        return json_response(
            {
                "written": written,
                "ignored": ignored,
                "ignoredReason": "pinned by an environment variable" if ignored else None,
                "restartRequired": len(written) > 0,
                **config.describe_settings(),
            }
        )

    @app.get("/api/access/clients")
    async def access_clients(request: Request):
        refused = await owner_only(request)
        if refused:
            return refused
        return json_response({"clients": await tp(list_clients)})

    @app.delete("/api/access/clients/{client_id}")
    async def access_revoke(request: Request, client_id: str):
        refused = await owner_only(request)
        if refused:
            return refused
        await tp(revoke_client, client_id)
        return json_response({"revoked": client_id})

    @app.get("/api/settings/reveal/{key}")
    async def settings_reveal(request: Request, key: str):
        refused = await owner_only(request)
        if refused:
            return refused
        if key not in config.SECRET_KEYS:
            return json_response({"error": "not_secret", "message": "Only secret settings can be revealed."}, 400)
        return json_response({"key": key, "value": config.setting(key)})

    @app.post("/api/settings/regenerate/{key}")
    async def settings_regenerate(request: Request, key: str):
        refused = await owner_only(request)
        if refused:
            return refused
        if key != "api_token":
            return json_response({"error": "unsupported", "message": "Only api_token can be regenerated here."}, 400)
        writable, reason = config.settings_writable()
        if not writable:
            return json_response({"error": "read_only", "message": reason}, 409)
        if config.pinned_by_env("api_token"):
            return json_response({"error": "pinned", "message": "api_token comes from an environment variable — change it there."}, 409)
        value = random_token(24)
        await tp(config.write_settings, {"api_token": value})
        return json_response({"key": "api_token", "value": value, "restartRequired": True})

    @app.post("/api/index/backfill")
    async def index_backfill(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        body = await read_json(request)
        return json_response({"indexed": await tp(backfill_embeddings, body.get("limit") or 50)})

    # ── the MCP tool surface, as the owner sees it ─────────────────────────

    @app.get("/api/tools")
    async def tools_list(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        return json_response({"tools": await tp(tool_catalog), "locked": sorted(UNDISABLEABLE)})

    @app.patch("/api/tools/{name}")
    async def tools_patch(request: Request, name: str):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        body = await read_json(request)
        try:
            await tp(set_tool_disabled, name, bool(body.get("disabled")))
        except ValueError as error:
            return json_response({"error": "cannot_disable", "message": str(error) or "refused"}, 400)
        return json_response({"name": name, "disabled": bool(body.get("disabled"))})

    @app.post("/api/tools/enable-all")
    async def tools_enable_all(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        await tp(enable_all_tools)
        return json_response({"ok": True})

    # ── the search log ─────────────────────────────────────────────────────

    @app.get("/api/search-log")
    async def search_log_list(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        q = request.query_params
        entries = await tp(list_search_log, _int(q.get("limit")) or 50, q.get("q"))
        stats = await tp(search_log_stats)
        return json_response({"entries": entries, "stats": stats})

    @app.delete("/api/search-log/{entry_id}")
    async def search_log_delete(request: Request, entry_id: str):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        deleted = await tp(delete_search_log_entry, entry_id)
        return json_response({"id": entry_id, "deleted": True}) if deleted else json_response({"error": "not_found"}, 404)

    @app.delete("/api/search-log")
    async def search_log_bulk(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        q = request.query_params
        days = q.get("olderThanDays")
        everything = q.get("all") == "true"
        if everything == bool(days):
            return json_response({"error": "invalid", "message": "Give exactly one of all=true or olderThanDays."}, 400)
        if everything:
            return json_response({"deleted": await tp(clear_search_log)})
        pruned = await tp(prune_search_log, int(days))
        return json_response({"deleted": pruned["removed"], "cutoff": pruned["cutoff"]})

    # ── the trace log and the timeline ─────────────────────────────────────
    #
    # None of these routes is itself traced. An observation must not observe
    # itself: the panel below polls, and a log that grows from being read would
    # bury the rows anyone actually wants.

    @app.get("/api/cloud")
    async def cloud(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        q = request.query_params
        return json_response(await tp(tag_cloud, _int(q.get("limit")) or 50, q.get("workspace")))

    @app.get("/api/traces/cloud")
    async def asked(request: Request):
        """What has been asked for, sized by how often — the trace log's own cloud."""
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        q = request.query_params
        return json_response(await tp(asked_cloud, _int(q.get("limit")) or 50, _int(q.get("days"))))

    @app.get("/api/dig")
    async def dig_route(request: Request):
        """Everything the corpus knows about one subject, with provenance.
        A read that writes: it files itself, and its sub-queries do not."""
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        q = request.query_params
        try:
            return json_response(await tp(dig, q.get("q") or q.get("subject") or "", _int(q.get("limit")) or 20, "web"))
        except ValueError as error:
            return json_response({"error": "invalid", "message": str(error)}, 400)

    @app.get("/api/traces/chain")
    async def chain_route(request: Request):
        """One subject on a timeline, cause linked to effect. Untraced."""
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        q = request.query_params
        try:
            return json_response(await tp(chain, q.get("subject") or q.get("q") or "", _int(q.get("limit")) or 50))
        except ValueError as error:
            return json_response({"error": "invalid", "message": str(error)}, 400)

    @app.get("/api/timeline")
    async def timeline_route(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        return json_response(await tp(timeline, _int(request.query_params.get("days")) or 30))

    @app.get("/api/traces")
    async def traces_list(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        q = request.query_params
        entries = await tp(
            list_traces,
            limit=_int(q.get("limit")) or 50,
            query=q.get("q"),
            kind=q.get("kind"),
            tool=q.get("tool"),
            outcome=q.get("outcome"),
            surface=q.get("surface"),
            subject=q.get("subject"),
            since=q.get("since"),
        )
        return json_response({"entries": entries, "stats": await tp(trace_stats)})

    @app.get("/api/traces/subject")
    async def trace_subject_route(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        subject = request.query_params.get("keyword") or request.query_params.get("subject") or ""
        if not subject.strip():
            return json_response({"error": "invalid", "message": "A keyword is required."}, 400)
        return json_response(await tp(subject_report, subject))

    @app.delete("/api/traces")
    async def traces_bulk(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        q = request.query_params
        keyword = q.get("keyword")
        days = q.get("olderThanDays")
        everything = q.get("all") == "true"
        # Exactly one mode, for the same reason forget_search_log demands it: an
        # ambiguous request must not delete more than the caller pictured.
        chosen = [m for m in (keyword, days, "all" if everything else None) if m is not None]
        if len(chosen) != 1:
            return json_response({"error": "invalid", "message": "Give exactly one of keyword, olderThanDays, or all=true."}, 400)
        if keyword is not None:
            try:
                return json_response({"keyword": keyword, "deleted": await tp(forget_keyword, keyword)})
            except ValueError as error:
                return json_response({"error": "invalid", "message": str(error)}, 400)
        if everything:
            return json_response({"deleted": await tp(clear_traces)})
        pruned = await tp(prune_traces, int(days))
        return json_response({"deleted": pruned["removed"], "cutoff": pruned["cutoff"]})

    # Superseded by /api/traces, which is durable and searchable. Kept because it
    # is the one view that shows the RAW headers of a request, which is what a
    # silent connector failure is diagnosed from.
    @app.get("/api/debug/mcp-log")
    async def debug_mcp_log(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        return json_response({"entries": list(mcp_log)})

    @app.get("/api/stats")
    async def stats(request: Request):
        auth = await gate(request)
        if not auth.ok:
            return unauthorized(origin_of(request))
        return json_response({"stats": await tp(get_memory_stats), "embeddings": await tp(embedding_coverage)})

    # ── MCP ────────────────────────────────────────────────────────────────

    @app.post("/mcp")
    async def mcp(request: Request):
        headers = {k: v for k, v in request.headers.items() if k not in ("authorization", "cookie")}
        auth_header = request.headers.get("authorization")
        auth = await gate(request)
        if not auth.ok:
            record_mcp({"outcome": "401", "authPresented": auth_header.split(" ")[0] if auth_header else None, "headers": headers})
            return unauthorized(origin_of(request))
        try:
            body = await request.json()
            if not isinstance(body, dict):
                raise ValueError("not an object")
        except Exception:
            record_mcp({"outcome": "parse-error", "headers": headers})
            return json_response({"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": "Parse error"}}, 400)
        params = body.get("params") if isinstance(body.get("params"), dict) else {}
        record_mcp(
            {
                "outcome": "ok",
                "method": body.get("method"),
                "authMethod": auth.method,
                "accept": request.headers.get("accept"),
                "protocolVersion": params.get("protocolVersion"),
                "clientInfo": params.get("clientInfo"),
                "headers": headers,
            }
        )
        response = await tp(handle_mcp, body)
        if response is None:
            return Response(status_code=202, headers=CORS_HEADERS)
        if "text/event-stream" in (request.headers.get("accept") or ""):
            return Response(
                sse_frame(response),
                media_type="text/event-stream",
                headers={"cache-control": "no-cache, no-transform", "connection": "keep-alive", "x-accel-buffering": "no", **CORS_HEADERS},
            )
        return json_response(response)

    @app.get("/mcp")
    @app.delete("/mcp")
    async def mcp_other():
        return method_not_allowed()

    # ── the UI ─────────────────────────────────────────────────────────────

    @app.get("/{path:path}")
    async def static(path: str):
        target = "index.html" if path in ("", "/") else path
        if target != "index.html":
            # Every filesystem call here is guarded, because this route is the
            # unauthenticated fallback and the path arrives already percent-decoded:
            # `/%00` becomes a real NUL and `resolve()` raises ValueError, an
            # over-long segment raises OSError, and either one was a 500 with a
            # traceback that anyone could trigger in a loop. A path that cannot name
            # a file simply is not a file — serve the shell.
            try:
                candidate = (STATIC_DIR / target).resolve()
                is_file = candidate.is_file()
            except (OSError, ValueError):
                candidate, is_file = None, False
            if is_file and candidate is not None and STATIC_DIR.resolve() in candidate.parents:
                from fastapi.responses import FileResponse

                return FileResponse(candidate, headers={"cache-control": "public, max-age=31536000, immutable"})
        shell = (STATIC_DIR / "index.html").read_text("utf-8")
        stamped = shell.replace('"./main.js"', f'"./main.js?v={VERSION}"').replace('"./app.css"', f'"./app.css?v={VERSION}"')
        return HTMLResponse(stamped, headers={"cache-control": "no-store, must-revalidate"})

    return app


def _trace_read(query, tag, hits: int, started: float, method: str | None, mode: str = "", error: str = "") -> None:
    """
    One read, filed — if it carried an intent.

    Both HTTP read paths call this rather than writing their own record, for the
    same reason the MCP dispatcher is traced around rather than inside each tool:
    a log wired up at call sites is one forgotten call away from answering "what
    did I ask for" with a confident, partial lie.
    """
    # `tag` arrives as a list from the JSON body and as a joined string from the
    # query string. Passing the list straight through produced a TraceRow whose
    # subject was a Python list, the insert raised, and record_trace's own
    # except swallowed it — so a tag-only search through POST left NO row while
    # its GET sibling left one. A log that is silent for one of two equivalent
    # calls is worse than one that is silent for both.
    if isinstance(tag, (list, tuple, set)):
        tag = ", ".join(str(t) for t in tag)
    subject = (query or "").strip() or (str(tag or ""))
    if not subject:
        return
    record_trace(
        kind="read",
        surface="web",
        tool="search" if query else "tag",
        subject=subject,
        subject_kind="keyword" if query else "term",
        outcome="error" if error else ("empty" if not hits else "ok"),
        hits=hits,
        duration_ms=(time.monotonic() - started) * 1000,
        mode=mode,
        who=method or "",
        error=error,
    )


def _int(value) -> int | None:
    try:
        return int(value) if value not in (None, "") else None
    except (TypeError, ValueError):
        return None

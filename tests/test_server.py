"""
The HTTP surface: the gate on every route, the owner session, the OAuth flow a
claude.ai connector walks, and the MCP transport details that made three silent
failures survive as long as they did in the lineage this is ported from.
"""

from __future__ import annotations

import base64
import hashlib
import json

import pytest
from fastapi.testclient import TestClient

from arra_memory import config
from arra_memory.memory import create_memory

PASSPHRASE = "test-owner-passphrase"


@pytest.fixture
def client():
    from arra_memory.server import create_app

    with TestClient(create_app()) as test_client:
        yield test_client


@pytest.fixture
def owner(client):
    assert client.post("/api/session", json={"passphrase": PASSPHRASE}).status_code == 200
    return client


def test_the_server_refuses_to_start_without_an_owner_passphrase(monkeypatch):
    """An unset passphrase would serve the corpus to anyone who finds the URL."""
    from arra_memory.server import create_app

    monkeypatch.delenv("OWNER_PASSPHRASE")
    config.reload()
    with pytest.raises(RuntimeError, match="owner_passphrase"):
        create_app()


def test_health_is_public_and_carries_no_corpus_data(client):
    body = client.get("/api/health").json()
    assert body["status"] == "ok"
    assert body["service"] == "arra-memory"
    assert body["features"]["engine"] == "lancedb"
    assert "memories" not in json.dumps(body)


def test_the_corpus_is_closed_until_a_session_is_opened(client):
    response = client.get("/api/memories")
    assert response.status_code == 401
    # The pointer a claude.ai connector follows to discover /authorize.
    assert "oauth-protected-resource/mcp" in response.headers["www-authenticate"]


def test_a_wrong_passphrase_opens_nothing(client):
    assert client.post("/api/session", json={"passphrase": "wrong"}).status_code == 401
    assert client.get("/api/memories").status_code == 401


def test_the_owner_session_opens_the_corpus_and_logout_closes_it(owner):
    assert owner.get("/api/session").json() == {"authenticated": True, "method": "owner-session"}
    assert owner.get("/api/memories").status_code == 200
    owner.delete("/api/session")
    assert owner.get("/api/memories").status_code == 401


def test_a_static_api_token_is_a_second_door_for_scripts(client, monkeypatch):
    monkeypatch.setenv("API_TOKEN", "a-static-token")
    config.reload()
    from arra_memory.server import create_app

    with TestClient(create_app()) as scripted:
        assert scripted.get("/api/memories", headers={"Authorization": "Bearer a-static-token"}).status_code == 200
        assert scripted.get("/api/memories", headers={"Authorization": "Bearer wrong"}).status_code == 401


def test_memories_can_be_written_read_updated_and_deleted_over_rest(owner):
    created = owner.post("/api/memories", json={"content": "over the wire", "tags": ["rest"]})
    assert created.status_code == 201
    memory = created.json()["memory"]
    assert memory["source"] == "web"

    assert owner.get(f"/api/memories/{memory['id']}").json()["memory"]["id"] == memory["id"]
    patched = owner.patch(f"/api/memories/{memory['id']}", json={"importance": 5})
    assert patched.json()["memory"]["importance"] == 5
    assert owner.delete(f"/api/memories/{memory['id']}").json()["deleted"] is True
    assert owner.get(f"/api/memories/{memory['id']}").status_code == 404


def test_an_invalid_write_is_a_400_with_a_message_the_ui_can_show(owner):
    response = owner.post("/api/memories", json={"content": ""})
    assert response.status_code == 400
    assert response.json()["message"]


def test_repeated_query_params_are_a_set_not_a_comma_joined_string(owner):
    create_memory({"content": "a", "workspace": "alpha"})
    create_memory({"content": "b", "workspace": "beta"})
    create_memory({"content": "c", "workspace": "gamma"})
    body = owner.get("/api/memories?workspace=alpha&workspace=beta").json()
    assert body["count"] == 2


def test_the_archive_draws_its_whole_filter_bar_from_one_request(owner):
    create_memory({"content": "a", "workspace": "ws", "project": "p", "createdBy": "ann", "tags": ["t"]})
    facets = owner.get("/api/facets").json()
    assert {"kinds", "workspaces", "unassigned", "projects", "agents", "tags", "total"} <= set(facets)


def test_the_digest_is_text_by_default_so_it_pastes_cleanly(owner):
    create_memory({"content": "today's work"})
    response = owner.get("/api/digest?window=today")
    assert response.headers["content-type"].startswith("text/plain")
    assert "# Memory digest" in response.text
    assert owner.get("/api/digest?window=today&format=json").json()["count"] == 1
    assert owner.get("/api/digest?window=nonsense").status_code == 400


def test_settings_require_an_owner_session_never_a_machine_token(client, monkeypatch):
    """Letting a token rewrite owner_passphrase would turn a leak into a takeover."""
    monkeypatch.setenv("API_TOKEN", "a-static-token")
    config.reload()
    from arra_memory.server import create_app

    with TestClient(create_app()) as scripted:
        assert scripted.get("/api/settings", headers={"Authorization": "Bearer a-static-token"}).status_code == 403


def test_settings_report_where_each_value_came_from_and_never_leak_a_secret(owner):
    body = owner.get("/api/settings").json()
    passphrase = next(s for s in body["settings"] if s["key"] == "owner_passphrase")
    assert passphrase["value"] == f"<set:{len(PASSPHRASE)}>"
    assert PASSPHRASE not in json.dumps(body)


def test_a_setting_pinned_by_the_environment_is_reported_ignored_rather_than_silently_accepted(owner):
    body = owner.patch("/api/settings", json={"language": "en"}).json()
    assert "language" in body["written"]
    assert body["restartRequired"] is True
    # owner_passphrase comes from the environment in this test process.
    ignored = owner.patch("/api/settings", json={"owner_passphrase": "nope"}).json()
    assert "owner_passphrase" in ignored["ignored"]


def test_unknown_settings_keys_are_refused_with_the_valid_list(owner):
    response = owner.patch("/api/settings", json={"turso_sync_url": "libsql://nope"})
    assert response.status_code == 400
    assert "valid" in response.json()


def test_only_the_api_token_can_be_revealed_or_regenerated(owner):
    assert owner.get("/api/settings/reveal/language").status_code == 400
    assert owner.get("/api/settings/reveal/api_token").json() == {"key": "api_token", "value": ""}
    regenerated = owner.post("/api/settings/regenerate/api_token").json()
    assert regenerated["restartRequired"] is True and len(regenerated["value"]) > 20
    assert owner.post("/api/settings/regenerate/language").status_code == 400


def test_search_reports_which_mode_actually_ran(owner):
    create_memory({"content": "a searchable memory"})
    body = owner.post("/api/search", json={"query": "searchable"}).json()
    assert body["effectiveMode"] == "keyword"
    assert body["fallback"]["used"] is True  # no embedder configured, and it says so


def test_an_explicit_semantic_search_without_embeddings_is_a_503(owner):
    assert owner.post("/api/search", json={"query": "x", "mode": "semantic"}).status_code == 503


def test_merge_refuses_a_facet_it_does_not_have(owner):
    assert owner.post("/api/merge", json={"facet": "colour", "from": "a", "to": "b"}).status_code == 400


def test_the_workspace_page_refuses_an_empty_name_rather_than_serving_the_whole_corpus(owner):
    create_memory({"content": "unfiled"})
    assert owner.get("/api/workspaces/%20").status_code == 400


# ── the MCP transport ──────────────────────────────────────────────────────────


def mcp(client, body, headers=None):
    return client.post("/mcp", json=body, headers=headers or {})


def test_the_mcp_endpoint_is_closed_without_a_credential(client):
    response = mcp(client, {"jsonrpc": "2.0", "id": 1, "method": "initialize"})
    assert response.status_code == 401
    assert "www-authenticate" in response.headers


def test_get_and_delete_on_mcp_are_an_honest_405_not_the_react_page(owner):
    """A client probing for the stream must not be handed index.html with a 200."""
    assert owner.get("/mcp").status_code == 405
    assert owner.delete("/mcp").status_code == 405
    assert owner.get("/mcp").headers["allow"] == "POST"


def test_an_sse_accept_header_is_honoured_because_claude_ai_needs_it(owner):
    """Given plain JSON, claude.ai reports connected and then surfaces no tools."""
    response = mcp(
        owner,
        {"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2025-11-25"}},
        {"accept": "application/json, text/event-stream"},
    )
    assert response.headers["content-type"].startswith("text/event-stream")
    assert response.text.startswith("event: message\ndata: ")
    assert json.loads(response.text.split("data: ", 1)[1])["result"]["protocolVersion"] == "2025-11-25"


def test_a_notification_gets_202_and_an_empty_body(owner):
    response = mcp(owner, {"jsonrpc": "2.0", "method": "notifications/initialized"})
    assert response.status_code == 202
    assert response.content == b""


def test_a_preflight_is_answered_before_the_spa_catch_all_can_see_it(client):
    response = client.options("/mcp", headers={"origin": "https://claude.ai"})
    assert response.status_code == 204
    assert "mcp-session-id" in response.headers["access-control-allow-headers"]


def test_unparseable_json_is_a_parse_error_not_a_crash(owner):
    response = owner.post("/mcp", content=b"{not json", headers={"content-type": "application/json"})
    assert response.status_code == 400
    assert response.json()["error"]["code"] == -32700


def test_the_mcp_log_records_what_a_remote_client_actually_sent_without_its_credential(owner):
    mcp(owner, {"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"clientInfo": {"name": "claude-ai"}}})
    entries = owner.get("/api/debug/mcp-log").json()["entries"]
    assert entries[0]["method"] == "initialize"
    assert entries[0]["clientInfo"] == {"name": "claude-ai"}
    assert "authorization" not in json.dumps(entries).lower()


# ── OAuth: the flow a claude.ai connector walks ────────────────────────────────


def pkce() -> tuple[str, str]:
    verifier = "a" * 64
    challenge = base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).decode().rstrip("=")
    return verifier, challenge


def test_discovery_advertises_s256_only(client):
    metadata = client.get("/.well-known/oauth-authorization-server").json()
    assert metadata["code_challenge_methods_supported"] == ["S256"]
    assert metadata["issuer"] == metadata["authorization_endpoint"].removesuffix("/authorize")
    resource = client.get("/.well-known/oauth-protected-resource/mcp").json()
    assert resource["resource"].endswith("/mcp")


def test_a_client_registers_itself_and_walks_the_whole_flow_to_a_working_token(client):
    verifier, challenge = pkce()
    registered = client.post("/oauth/register", json={"client_name": "Claude", "redirect_uris": ["https://claude.ai/cb"]})
    assert registered.status_code == 201
    client_id = registered.json()["client_id"]
    assert "client_secret" not in registered.json()  # a public client cannot keep one

    params = {
        "client_id": client_id,
        "redirect_uri": "https://claude.ai/cb",
        "state": "xyz",
        "code_challenge": challenge,
        "code_challenge_method": "S256",
        "scope": "memory:read memory:write",
    }
    assert "Owner passphrase" in client.get("/authorize", params=params).text

    approved = client.post("/authorize", data={**params, "passphrase": PASSPHRASE}, follow_redirects=False)
    assert approved.status_code == 302
    location = approved.headers["location"]
    assert location.startswith("https://claude.ai/cb?") and "state=xyz" in location
    code = location.split("code=")[1].split("&")[0]

    token = client.post(
        "/oauth/token",
        data={"grant_type": "authorization_code", "code": code, "client_id": client_id, "redirect_uri": "https://claude.ai/cb", "code_verifier": verifier},
    ).json()
    assert token["token_type"] == "Bearer"

    authorized = {"Authorization": f"Bearer {token['access_token']}"}
    assert client.get("/api/memories", headers=authorized).status_code == 200
    listed = mcp(client, {"jsonrpc": "2.0", "id": 1, "method": "tools/list"}, authorized).json()
    assert "remember" in {t["name"] for t in listed["result"]["tools"]}

    # A code is single-use: replaying it must find nothing.
    replay = client.post(
        "/oauth/token",
        data={"grant_type": "authorization_code", "code": code, "client_id": client_id, "redirect_uri": "https://claude.ai/cb", "code_verifier": verifier},
    )
    assert replay.status_code == 400


def test_the_wrong_passphrase_does_not_issue_a_code(client):
    _, challenge = pkce()
    client_id = client.post("/oauth/register", json={"redirect_uris": ["https://claude.ai/cb"]}).json()["client_id"]
    response = client.post(
        "/authorize",
        data={
            "client_id": client_id,
            "redirect_uri": "https://claude.ai/cb",
            "code_challenge": challenge,
            "code_challenge_method": "S256",
            "scope": "memory:read",
            "passphrase": "wrong",
        },
        follow_redirects=False,
    )
    assert response.status_code == 401
    assert "does not match" in response.text


def test_an_unregistered_redirect_fails_on_our_own_page_never_by_redirecting(client):
    """Prefix matching here is the classic OAuth open redirect."""
    _, challenge = pkce()
    client_id = client.post("/oauth/register", json={"redirect_uris": ["https://claude.ai/cb"]}).json()["client_id"]
    for evil in ("https://claude.ai/cb.attacker.net", "https://attacker.example/cb"):
        response = client.get("/authorize", params={"client_id": client_id, "redirect_uri": evil, "code_challenge": challenge, "code_challenge_method": "S256"})
        assert response.status_code == 400
        assert response.headers.get("location") is None


def test_registration_without_a_redirect_uri_is_refused(client):
    assert client.post("/oauth/register", json={"client_name": "no redirects"}).status_code == 400


def test_a_wrong_verifier_cannot_redeem_a_code(client):
    _, challenge = pkce()
    client_id = client.post("/oauth/register", json={"redirect_uris": ["https://claude.ai/cb"]}).json()["client_id"]
    params = {"client_id": client_id, "redirect_uri": "https://claude.ai/cb", "code_challenge": challenge, "code_challenge_method": "S256", "scope": "memory:read"}
    location = client.post("/authorize", data={**params, "passphrase": PASSPHRASE}, follow_redirects=False).headers["location"]
    code = location.split("code=")[1].split("&")[0]
    response = client.post(
        "/oauth/token",
        data={"grant_type": "authorization_code", "code": code, "client_id": client_id, "redirect_uri": "https://claude.ai/cb", "code_verifier": "b" * 64},
    )
    assert response.status_code == 400
    assert response.json() == {"error": "invalid_grant"}  # one opaque error for every failure mode


def test_revoking_a_client_kills_its_tokens_on_the_next_request(client):
    verifier, challenge = pkce()
    client_id = client.post("/oauth/register", json={"client_name": "Claude", "redirect_uris": ["https://claude.ai/cb"]}).json()["client_id"]
    params = {"client_id": client_id, "redirect_uri": "https://claude.ai/cb", "code_challenge": challenge, "code_challenge_method": "S256", "scope": "memory:read"}
    location = client.post("/authorize", data={**params, "passphrase": PASSPHRASE}, follow_redirects=False).headers["location"]
    code = location.split("code=")[1].split("&")[0]
    token = client.post(
        "/oauth/token",
        data={"grant_type": "authorization_code", "code": code, "client_id": client_id, "redirect_uri": "https://claude.ai/cb", "code_verifier": verifier},
    ).json()["access_token"]

    client.post("/api/session", json={"passphrase": PASSPHRASE})
    clients = client.get("/api/access/clients").json()["clients"]
    assert clients[0]["activeTokens"] == 1
    client.delete(f"/api/access/clients/{client_id}")
    assert client.get("/api/memories", headers={"Authorization": f"Bearer {token}"}).status_code == 401
    # The registration row survives as the record of the connection.
    assert client.get("/api/access/clients").json()["clients"][0]["activeTokens"] == 0


# ── the UI shell ───────────────────────────────────────────────────────────────


def test_the_shell_is_served_for_any_unknown_path_and_stamps_its_assets(client):
    response = client.get("/some/deep/spa/route")
    assert response.status_code == 200
    assert "main.js?v=" in response.text
    assert "app.css?v=" in response.text
    assert response.headers["cache-control"] == "no-store, must-revalidate"


def test_the_built_bundle_is_served_with_a_long_cache(client):
    response = client.get("/main.js")
    assert response.status_code == 200
    assert "immutable" in response.headers["cache-control"]

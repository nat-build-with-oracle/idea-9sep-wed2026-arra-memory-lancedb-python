"""
The MCP surface: protocol negotiation, the live tool list, and dispatch.

The negotiation tests are the ones that matter most — replying with a version
the client cannot speak is a silent, total failure: the client completes the
handshake, reports itself connected, and never calls tools/list.
"""

from __future__ import annotations

import pytest

from arra_memory import config
from arra_memory.mcp import PROJECT_TOOL_PREFIX, build_tool_list, handle_mcp, negotiate_protocol
from arra_memory.memory import create_memory


def call(name: str, args: dict | None = None) -> dict:
    response = handle_mcp({"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": name, "arguments": args or {}}})
    return response["result"]


def test_the_clients_version_is_echoed_when_we_can_speak_it():
    assert negotiate_protocol("2025-11-25") == "2025-11-25"  # what claude.ai actually sends
    assert negotiate_protocol("2025-06-18") == "2025-06-18"
    assert negotiate_protocol("2030-01-01") == "2030-01-01"  # any well-formed revision
    assert negotiate_protocol("nonsense") == "2026-07-28"
    assert negotiate_protocol(None) == "2026-07-28"


def test_initialize_reports_the_instance_name_and_a_live_tool_list(monkeypatch):
    monkeypatch.setenv("INSTANCE_NAME", "thor-memory")
    config.reload()
    result = handle_mcp({"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2025-11-25"}})["result"]
    assert result["protocolVersion"] == "2025-11-25"
    assert result["serverInfo"]["name"] == "thor-memory"
    assert result["capabilities"]["tools"]["listChanged"] is True


def test_a_notification_is_never_answered():
    """Returning a response to a notification is a protocol violation."""
    assert handle_mcp({"jsonrpc": "2.0", "method": "notifications/initialized"}) is None
    assert handle_mcp({"jsonrpc": "2.0", "method": "notifications/cancelled"}) is None


def test_an_unknown_method_is_a_json_rpc_error():
    response = handle_mcp({"jsonrpc": "2.0", "id": 7, "method": "resources/list"})
    assert response["error"]["code"] == -32601


def test_a_tool_failure_is_reported_inside_a_successful_result_so_the_model_can_reason_about_it():
    response = handle_mcp({"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {"name": "remember", "arguments": {}}})
    assert "error" not in response
    assert response["result"]["isError"] is True


def test_fleet_tools_are_not_offered_when_no_broker_is_configured():
    """An unusable tool still costs every client context on every request."""
    names = {t["name"] for t in build_tool_list()["tools"]}
    assert "list_fleet" not in names
    assert "remember" in names


def test_fleet_tools_appear_once_a_broker_is_configured(monkeypatch):
    monkeypatch.setenv("MQTT_URL", "mqtt://127.0.0.1:1883")
    config.reload()
    names = {t["name"] for t in build_tool_list()["tools"]}
    assert {"list_fleet", "send_to_oracle", "oracle_replies"} <= names


def test_generated_tools_are_off_by_default_and_the_corpus_shapes_them_when_on(monkeypatch):
    create_memory({"content": "a", "project": "github.com/owner/repo"})
    assert not any(t["name"].startswith(PROJECT_TOOL_PREFIX) for t in build_tool_list()["tools"])

    monkeypatch.setenv("GENERATED_TOOLS", "true")
    config.reload()
    names = {t["name"] for t in build_tool_list()["tools"]}
    assert f"{PROJECT_TOOL_PREFIX}github_com_owner_repo" in names
    assert "search_today" in names


def test_a_generated_project_tool_recalls_with_its_project_pre_bound(monkeypatch):
    monkeypatch.setenv("GENERATED_TOOLS", "true")
    config.reload()
    wanted = create_memory({"content": "inside the project", "project": "github.com/owner/repo"})
    create_memory({"content": "outside the project"})
    result = call(f"{PROJECT_TOOL_PREFIX}github_com_owner_repo", {})
    assert [m["id"] for m in result["structuredContent"]["memories"]] == [wanted["id"]]


def test_remember_recall_read_revise_forget_round_trip():
    remembered = call("remember", {"content": "the corpus remembers", "tags": ["mcp"], "importance": 4})
    memory = remembered["structuredContent"]["memory"]
    assert memory["source"] == "claude" and memory["createdBy"] == "claude"

    recalled = call("recall_memories", {"query": "corpus"})
    assert memory["id"] in [m["id"] for m in recalled["structuredContent"]["memories"]]
    assert recalled["structuredContent"]["matchMode"] == "keyword"

    assert call("read_memory", {"id": memory["id"]})["structuredContent"]["memory"]["id"] == memory["id"]
    revised = call("revise_memory", {"id": memory["id"], "importance": 1})
    assert revised["structuredContent"]["memory"]["importance"] == 1
    assert call("forget_memory", {"id": memory["id"]})["structuredContent"]["deleted"] is True
    assert call("read_memory", {"id": memory["id"]})["isError"] is True


def test_revise_with_no_fields_is_refused_rather_than_silently_doing_nothing():
    memory = call("remember", {"content": "x"})["structuredContent"]["memory"]
    assert call("revise_memory", {"id": memory["id"]})["isError"] is True


def test_an_empty_keyword_result_says_a_search_by_meaning_may_still_find_something():
    create_memory({"content": "something else entirely"})
    result = call("recall_memories", {"query": "nothing here matches this"})
    assert "keyword only" in result["content"][0]["text"]


def test_search_memories_between_treats_a_bare_date_as_the_whole_day():
    """Left at midnight, from == to is a zero-width range that matches nothing."""
    memory = create_memory({"content": "written today"})
    today = memory["createdAt"][:10]
    result = call("search_memories_between", {"from": today, "to": today})
    assert [m["id"] for m in result["structuredContent"]["memories"]] == [memory["id"]]


def test_search_memories_between_refuses_a_backwards_or_unparseable_range():
    assert call("search_memories_between", {"from": "2026-02-01", "to": "2026-01-01"})["isError"] is True
    assert call("search_memories_between", {"from": "not-a-date", "to": "2026-01-01"})["isError"] is True


def test_digest_returns_a_document_grouped_by_kind():
    create_memory({"content": "what changed", "kind": "retro", "title": "The retro"})
    create_memory({"content": "what I now know", "kind": "learn", "title": "The lesson"})
    result = call("digest", {"window": "today"})
    markdown = result["content"][0]["text"]
    assert "# Memory digest — today" in markdown
    assert markdown.index("## learn") < markdown.index("## retro")  # most-reflective first
    assert result["structuredContent"]["byKind"] == {"retro": 1, "learn": 1}


def test_digest_refuses_an_unknown_window_and_names_the_valid_ones():
    result = call("digest", {"window": "last_fortnight"})
    assert result["isError"] is True
    assert "last_7days" in result["content"][0]["text"]


def test_an_empty_digest_says_so_without_implying_inactivity_elsewhere():
    markdown = call("digest", {"window": "2001_01"})["content"][0]["text"]
    assert "a fact about the window" in markdown


def test_list_tools_and_toggle_tool_are_the_owners_switchboard():
    assert call("toggle_tool", {"name": "remember", "enabled": False})["structuredContent"]["enabled"] is False
    assert "remember" not in {t["name"] for t in build_tool_list()["tools"]}
    # A client with a cached list must not be able to call it anyway.
    response = handle_mcp({"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "remember", "arguments": {"content": "x"}}})
    assert response["result"]["isError"] is True
    assert call("toggle_tool", {"name": "remember"})["structuredContent"]["enabled"] is True  # omitting flips it


def test_the_discovery_tools_can_never_be_switched_off():
    """Hiding these turns a narrowed tool list into a dead end."""
    assert call("toggle_tool", {"name": "list_projects", "enabled": False})["isError"] is True
    assert call("toggle_tool", {"name": "not_a_tool", "enabled": False})["isError"] is True


def test_the_search_log_is_off_by_default_and_says_so_rather_than_returning_nothing():
    result = call("list_search_log", {})
    assert result["structuredContent"]["enabled"] is False
    assert "switched off" in result["content"][0]["text"]


def test_forget_search_log_demands_exactly_one_mode(monkeypatch):
    monkeypatch.setenv("SEARCH_LOG", "true")
    config.reload()
    create_memory({"content": "searchable"})
    call("recall_memories", {"query": "searchable"})

    assert call("forget_search_log", {})["isError"] is True
    assert call("forget_search_log", {"all": True, "olderThanDays": 30})["isError"] is True
    entries = call("list_search_log", {})["structuredContent"]["entries"]
    assert entries and entries[0]["query"] == "searchable"
    assert call("forget_search_log", {"all": True})["structuredContent"]["deleted"] >= 1


def test_list_workspaces_states_the_unfiled_count_out_loud():
    create_memory({"content": "filed", "workspace": "ws"})
    create_memory({"content": "unfiled"})
    result = call("list_workspaces", {})
    assert result["structuredContent"]["unassigned"] == 1
    assert "(no workspace)" in result["content"][0]["text"]


def test_the_fleet_tools_report_that_they_cannot_see_rather_than_that_it_is_empty(monkeypatch):
    monkeypatch.setenv("MQTT_URL", "mqtt://127.0.0.1:1")
    config.reload()
    text = call("list_fleet", {})["content"][0]["text"]
    assert "Cannot see the fleet" in text

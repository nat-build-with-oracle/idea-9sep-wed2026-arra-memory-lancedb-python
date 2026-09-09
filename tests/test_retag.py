"""
Curating tags, and the history that makes the curation answerable.

`PATCH` with the whole list is a replace, and replace is the wrong shape here: to
drop one stale tag a client sends all the others back, so it silently reverts
anything added since it last read the memory. These tests hold the add/remove
contract and the per-node record of it.
"""

from __future__ import annotations

import json

import pytest

from arra_memory import trace
from arra_memory.mcp import handle_mcp
from arra_memory.memory import (
    create_memory,
    get_memory,
    memory_history,
    normalize_match,
    retag_memory,
    search_memories,
)


def call(name: str, args: dict | None = None) -> dict:
    return handle_mcp(
        {"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": name, "arguments": args or {}}}
    )["result"]


# ── add and remove ────────────────────────────────────────────────────────────


def test_a_rename_is_one_call_and_cannot_lose_the_new_value():
    """Removals apply before additions, so add+remove of overlapping sets is safe."""
    memory = create_memory({"content": "the runbook", "tags": ["turso", "kvm"]})
    updated = retag_memory(memory["id"], add=["lancedb"], remove=["turso"])
    assert updated["tags"] == ["kvm", "lancedb"]
    assert get_memory(memory["id"])["tags"] == ["kvm", "lancedb"]


def test_removing_a_tag_that_is_not_there_is_the_state_the_caller_asked_for():
    memory = create_memory({"content": "x", "tags": ["kvm"]})
    assert retag_memory(memory["id"], remove=["never-had-it"])["tags"] == ["kvm"]


def test_a_change_that_changes_nothing_writes_no_history():
    memory = create_memory({"content": "x", "tags": ["kvm"]})
    retag_memory(memory["id"], add=["kvm"])  # already present
    assert memory_history(memory["id"]) == []


def test_curation_obeys_the_same_rules_as_the_write_path():
    memory = create_memory({"content": "x", "tags": ["Turso"]})
    # Deduped case-insensitively, keeping the first spelling, and capped at ten.
    assert retag_memory(memory["id"], add=["turso", "TURSO"])["tags"] == ["Turso"]
    capped = retag_memory(memory["id"], add=[f"t{i}" for i in range(20)])
    assert len(capped["tags"]) == 10


def test_retagging_keeps_the_memory_findable_by_its_new_tag_and_not_its_old_one():
    memory = create_memory({"content": "the runbook", "tags": ["turso"]})
    retag_memory(memory["id"], add=["lancedb"], remove=["turso"])
    assert [m["id"] for m in search_memories({"tag": "lancedb"})] == [memory["id"]]
    assert search_memories({"tag": "turso"}) == []


def test_retagging_a_memory_that_is_not_there_reports_that():
    assert retag_memory("no-such-id", add=["x"]) is None


# ── the per-node history ──────────────────────────────────────────────────────


def test_every_change_is_filed_against_the_memory_with_before_and_after():
    memory = create_memory({"content": "the runbook", "tags": ["turso"]})
    retag_memory(memory["id"], add=["lancedb"], remove=["turso"])
    retag_memory(memory["id"], add=["oauth"])

    history = memory_history(memory["id"])
    assert len(history) == 2
    newest, oldest = history  # newest first
    assert json.loads(newest["input"])["add"] == ["oauth"]
    assert json.loads(oldest["result"]) == {
        "before": ["turso"],
        "after": ["lancedb"],
        "title": "the runbook",
    }
    assert all(e["subject"] == memory["id"] and e["subjectKind"] == "item" for e in history)


def test_the_history_is_the_memorys_own_and_nobody_elses():
    a = create_memory({"content": "a", "tags": ["x"]})
    b = create_memory({"content": "b", "tags": ["x"]})
    retag_memory(a["id"], add=["only-a"])
    assert len(memory_history(a["id"])) == 1
    assert memory_history(b["id"]) == []


def test_an_id_subject_is_not_mangled_by_keyword_normalisation():
    """A uuid survives lowercasing, but a trailing-* strip would corrupt one."""
    memory = create_memory({"content": "x", "tags": ["a"]})
    retag_memory(memory["id"], add=["b"])
    assert memory_history(memory["id"])[0]["subject"] == memory["id"]


def test_a_tag_edit_is_recorded_once_not_twice_over_mcp():
    """retag_memory files its own richer row; the generic tracer must not add a second."""
    memory = create_memory({"content": "x", "tags": ["turso"]})
    call("retag_memory", {"id": memory["id"], "add": ["lancedb"], "remove": ["turso"]})
    history = memory_history(memory["id"])
    assert len(history) == 1
    assert history[0]["tool"] == "retag"


def test_the_history_cannot_fail_the_edit_it_records(monkeypatch):
    memory = create_memory({"content": "x", "tags": ["a"]})

    def explode(**_kwargs):
        raise RuntimeError("the log is gone")

    monkeypatch.setattr(trace, "record_trace", explode)
    # The edit still lands — an audit trail that can fail the thing it audits is
    # worse than no audit trail.
    assert retag_memory(memory["id"], add=["b"])["tags"] == ["a", "b"]


# ── search: all four shapes ───────────────────────────────────────────────────


@pytest.fixture
def tagged():
    return {
        "both": create_memory({"content": "both", "tags": ["lancedb", "oauth"]}),
        "one": create_memory({"content": "just lancedb", "tags": ["lancedb"]}),
        "other": create_memory({"content": "just oauth", "tags": ["oauth"]}),
        "neither": create_memory({"content": "neither", "tags": ["fts"]}),
    }


def test_several_tags_default_to_any(tagged):
    found = {m["content"] for m in search_memories({"tag": ["lancedb", "oauth"]})}
    assert found == {"both", "just lancedb", "just oauth"}


def test_several_tags_with_all_means_every_one_of_them(tagged):
    """The ask that makes tags worth expanding: the memory carrying BOTH."""
    found = [m["content"] for m in search_memories({"tag": ["lancedb", "oauth"], "match": "all"})]
    assert found == ["both"]


def test_a_keyword_and_tags_narrow_together(tagged):
    found = [m["content"] for m in search_memories({"query": "just", "tag": ["lancedb"]})]
    assert found == ["just lancedb"]


def test_tags_named_but_none_resolved_returns_nothing_never_everything(tagged):
    """Dropping an unresolvable filter and answering with the whole corpus is the
    failure mode that looks like success."""
    assert search_memories({"tag": ["nope"], "match": "all"}) == []
    assert search_memories({"tag": ["nope", "alsonope"]}) == []


def test_an_unrecognised_match_does_not_silently_narrow():
    assert normalize_match(None) == "any"
    assert normalize_match("ALL") == "all"
    assert normalize_match("both") == "any"


def test_the_effective_match_is_echoed_so_a_caller_can_tell_which_rule_ran(tagged):
    from arra_memory.memory import recall_memories

    assert recall_memories({"query": "", "tag": ["lancedb"], "match": "all"})["match"] == "all"
    assert recall_memories({"query": "", "tag": ["lancedb"]})["match"] == "any"


def test_recall_over_mcp_accepts_a_tag_list_and_a_match(tagged):
    any_hit = call("recall_memories", {"tag": ["lancedb", "oauth"], "match": "any"})
    all_hit = call("recall_memories", {"tag": ["lancedb", "oauth"], "match": "all"})
    assert len(any_hit["structuredContent"]["memories"]) == 3
    assert [m["content"] for m in all_hit["structuredContent"]["memories"]] == ["both"]

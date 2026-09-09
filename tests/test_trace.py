"""
The corpus's memory of being used.

The properties here are the ones the two source projects paid for: the log must
record the call that FAILED, it must not observe itself, it must never be able to
fail the thing it audits, and it must clip at write time rather than store a
100KB blob forever.
"""

from __future__ import annotations

import pytest

from arra_memory import config, trace
from arra_memory.db import db
from arra_memory.mcp import handle_mcp
from arra_memory.memory import create_memory


def call(name: str, args: dict | None = None) -> dict:
    return handle_mcp(
        {"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": name, "arguments": args or {}}}
    )["result"]


def test_a_tool_call_is_recorded_with_what_came_back():
    create_memory({"content": "the kubernetes runbook", "tags": ["kvm"]})
    call("recall_memories", {"query": "kubernetes"})

    entry = trace.list_traces()[0]
    assert entry["tool"] == "recall_memories"
    assert entry["surface"] == "mcp"
    assert entry["subject"] == "kubernetes"
    assert entry["outcome"] == "ok"
    assert entry["hits"] == 1
    assert entry["mode"] == "keyword"


def test_the_call_that_failed_is_the_one_most_worth_keeping():
    call("read_memory", {"id": "no-such-memory"})
    entry = trace.list_traces()[0]
    assert entry["tool"] == "read_memory"
    assert entry["outcome"] == "error"
    assert "not found" in entry["error"]


def test_a_search_that_found_nothing_is_marked_empty_not_ok():
    """A zero-result search is the interesting one; it must be findable as such."""
    create_memory({"content": "something unrelated"})
    call("recall_memories", {"query": "a phrase that appears nowhere"})
    assert trace.list_traces()[0]["outcome"] == "empty"
    assert [e["subject"] for e in trace.list_traces(outcome="empty")] == ["a phrase that appears nowhere"]


def test_the_trace_layer_does_not_observe_itself():
    """Left traced, trace_search would find its own last call every time."""
    create_memory({"content": "x"})
    call("trace_search", {})
    call("trace_search", {})
    assert all(e["tool"] != "trace_search" for e in trace.list_traces())


def test_a_subject_is_normalised_so_it_can_be_found_and_forgotten_under_one_key():
    call("recall_memories", {"query": "  KUBERNETES*  "})
    assert trace.list_traces()[0]["subject"] == "kubernetes"
    assert trace.subject_report("Kubernetes")["count"] == 1


def test_clipping_happens_at_write_time_and_says_how_much_was_lost():
    trace.record_trace(kind="mcp", surface="mcp", tool="x", result="y" * 9000)
    stored = trace.list_traces()[0]["result"]
    assert len(stored) < 9000
    assert stored.endswith("…[9000 chars]")


def test_the_writer_never_raises_even_when_the_store_is_broken(monkeypatch):
    """An audit trail that can take down the thing it audits is worse than none."""

    def explode(*_args, **_kwargs):
        raise RuntimeError("the store is gone")

    monkeypatch.setattr(db().traces, "insert", explode)
    trace.record_trace(kind="mcp", surface="mcp", tool="remember")  # must not raise


def test_rows_written_in_the_same_millisecond_still_have_a_defined_order():
    """LanceDB has no rowid; both source projects had a real ordering bug without this."""
    for i in range(6):
        trace.record_trace(kind="mcp", surface="mcp", tool=f"t{i}")
    seqs = [e["seq"] for e in trace.list_traces()]
    assert seqs == sorted(seqs, reverse=True)
    assert len(set(seqs)) == len(seqs)


def test_filters_narrow_the_log_the_way_the_tool_advertises():
    create_memory({"content": "findable"})
    call("recall_memories", {"query": "findable"})
    call("read_memory", {"id": "nope"})

    assert all(e["outcome"] == "error" for e in trace.list_traces(outcome="error"))
    assert all(e["tool"] == "recall_memories" for e in trace.list_traces(tool="recall_memories"))
    assert trace.list_traces(surface="web") == []
    assert [e["tool"] for e in trace.list_traces(query="findable")] == ["recall_memories"]


def test_forgetting_a_keyword_drops_its_rows_and_files_the_forget_itself():
    call("recall_memories", {"query": "secret topic"})
    call("recall_memories", {"query": "secret topic"})
    assert trace.subject_report("secret topic")["count"] == 2

    removed = trace.forget_keyword("Secret Topic")
    assert removed == 2
    # Gone, and STAYS gone: filing the forget under the forgotten keyword would
    # write the word straight back into the log the delete just cleared.
    assert trace.subject_report("secret topic")["count"] == 0
    assert all("secret topic" not in (e["subject"] + e["input"] + e["result"]) for e in trace.list_traces())
    assert trace.list_traces(query="secret topic") == []
    # The deletion is still auditable — that it happened, when, and how many rows.
    forget = next(e for e in trace.list_traces() if e["tool"] == "trace_forget")
    assert forget["hits"] == 2
    assert forget["subject"] == ""


def test_forgetting_demands_a_keyword():
    with pytest.raises(ValueError):
        trace.forget_keyword("   ")


def test_the_log_can_be_switched_off_entirely(monkeypatch):
    monkeypatch.setenv("TRACE_LOG", "false")
    config.reload()
    call("recall_memories", {"query": "not recorded"})
    assert trace.list_traces() == []


def test_the_timeline_counts_what_was_written_and_what_was_asked():
    created = create_memory({"content": "written today", "kind": "retro"})
    call("recall_memories", {"query": "written"})

    result = trace.timeline(3)
    today = created["createdAt"][:10]
    day = next(d for d in result["days"] if d["day"] == today)
    assert day["written"] == 1
    assert day["traced"] >= 1
    assert day["kinds"] == {"retro": 1}
    assert result["totals"]["busiest"] == today


def test_the_timeline_reports_quiet_days_rather_than_omitting_them():
    """A gap is the interesting part of a timeline; a sparse array hides it."""
    result = trace.timeline(7)
    assert len(result["days"]) == 7
    assert all(set(d) == {"day", "written", "traced", "kinds"} for d in result["days"])
    assert result["totals"] == {"written": 0, "traced": 0, "busiest": result["days"][0]["day"]}

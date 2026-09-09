"""
The corpus behaves the same before and after LanceDB folds writes into its
indices — which the rest of the suite never checked, and which is where the
worst bug in this port lived.

Rows sit in an unindexed tail until `optimize()` runs, and searches over that
tail are exact flat scans. Every other test wrote a handful of memories and
searched immediately, so the suite only ever exercised the tail. The moment the
n-gram index takes over, its own matching semantics apply — and they are far
looser than the substring match the original ran. These tests call `optimize()`
explicitly so that path is covered.
"""

from __future__ import annotations

import pytest

from arra_memory.db import db
from arra_memory.memory import contains_query, create_memory, search_memories


@pytest.fixture
def indexed_corpus():
    made = {}
    for title, content in [
        ("Cluster notes", "the kubernetes cluster is healthy"),
        ("November plan", "remember the november deadline"),
        ("Internet", "the internet connection dropped"),
        ("Testing", "tests are green today"),
        ("Coffee", "I drank coffee"),
        ("Thai", "ระบบความจำสำหรับผู้ช่วยเอไอ"),
    ]:
        made[title] = create_memory({"title": title, "content": content})
    db().optimize_now()
    return made


def test_an_indexed_search_returns_only_memories_that_contain_the_query(indexed_corpus):
    """
    The n-gram index matches on shared 3-character sequences, so once these rows
    are indexed a bare index query for "kubernetes" also returns "november"
    ("ber"), "internet" ("net") and "tests" ("tes"). Every one of those looks like
    a result to a caller. The index narrows; the substring test decides.
    """
    found = [m["title"] for m in search_memories({"query": "kubernetes"})]
    assert found == ["Cluster notes"]


def test_thai_still_works_once_indexed(indexed_corpus):
    found = [m["title"] for m in search_memories({"query": "ความจำ"})]
    assert found == ["Thai"]


def test_a_query_matching_nothing_still_returns_nothing_once_indexed(indexed_corpus):
    assert search_memories({"query": "postgres"}) == []


def test_every_hit_contains_the_query_across_a_larger_indexed_corpus():
    for i in range(120):
        create_memory({"title": f"Note {i}", "content": f"assorted content number {i} about various things"})
    create_memory({"title": "The needle", "content": "this one mentions kubernetes exactly once"})
    db().optimize_now()

    hits = search_memories({"query": "kubernetes", "limit": 100})
    assert [m["title"] for m in hits] == ["The needle"]
    assert all(contains_query({"title": m["title"], "content": m["content"], "tags": ""}, "kubernetes") for m in hits)


def test_a_title_match_outranks_bodies_even_when_the_bodies_are_many():
    """
    Weighting is applied across the whole match set, then the limit cuts. Applying
    it to a truncated fetch window instead let a memory whose TITLE is the query
    fall outside the window and never reach the ranking that would have put it
    first — 300 chattering bodies were enough to hide it.
    """
    for i in range(300):
        create_memory({"title": f"Chatter {i}", "content": "kubernetes kubernetes kubernetes note"})
    target = create_memory({"title": "kubernetes runbook", "content": "a long body mentioning it once: kubernetes"})
    db().optimize_now()

    top = search_memories({"query": "kubernetes", "limit": 10})
    assert top[0]["id"] == target["id"]


def test_an_id_prefix_opens_the_memory_whatever_chips_are_ticked():
    """
    An id is unique and belongs to no facet, so the original looks it up with no
    scope filter at all. Narrowing it meant that pasting an id while any chip was
    active — or into a generated recall_project_* tool, which pins a project —
    answered that the memory does not exist.
    """
    memory = create_memory({"content": "filed elsewhere", "project": "projB", "workspace": "wsB"})
    create_memory({"content": "somewhere else entirely", "project": "projA"})
    db().optimize_now()

    assert [m["id"] for m in search_memories({"query": memory["id"][:8], "project": "projA"})] == [memory["id"]]
    assert [m["id"] for m in search_memories({"query": memory["id"], "workspace": "wsA"})] == [memory["id"]]


def test_the_search_log_is_compacted_by_its_own_writes(monkeypatch):
    """A read-mostly instance performs searches and no memory writes; without a
    schedule of its own the log is compacted only by accident, forever."""
    from arra_memory import config, searchlog

    monkeypatch.setenv("SEARCH_LOG", "true")
    config.reload()
    create_memory({"content": "something to find"})

    scheduled = []
    monkeypatch.setattr(db(), "schedule_optimize", lambda: scheduled.append(1))
    searchlog.record_search(result_ids=["x"], duration_ms=1.0, query="something")
    assert scheduled, "record_search must schedule compaction like every other write site"


def test_compaction_cannot_be_starved_by_a_steady_write_cadence():
    """
    A pure debounce never fires while writes keep arriving, which is exactly the
    bulk-import case it exists for. The deadline caps the wait however busy it is.
    """
    import time

    from arra_memory import db as db_module

    database = db()
    monkeyed = []
    database.optimize_now = lambda: monkeyed.append(time.monotonic())  # type: ignore[method-assign]
    try:
        database._optimize_deadline = None
        database.schedule_optimize()
        first_deadline = database._optimize_deadline
        assert first_deadline is not None
        for _ in range(5):
            database.schedule_optimize()
        # Rescheduling never pushes the deadline out — that is what starved before.
        assert database._optimize_deadline == first_deadline
        assert database._optimize_deadline - time.monotonic() <= db_module.OPTIMIZE_MAX_WAIT_SECONDS
    finally:
        database.close()

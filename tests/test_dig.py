"""
The dig and the chain.

Both answer questions no single search can, and both have one property worth
protecting above the rest: they must be able to say **"asked for, and stored
nowhere"**. An empty result that looks the same as "nobody wanted this" is the
failure mode — the whole point is telling those two apart.
"""

from __future__ import annotations

import pytest

from arra_memory.dig import CONFIDENT_FLOOR, chain, dig
from arra_memory.memory import create_memory, retag_memory
from arra_memory.trace import record_trace


def asked(subject: str, hits: int = 0) -> None:
    """A read arriving through a surface, which is where tracing lives."""
    record_trace(
        kind="read",
        surface="web",
        tool="search",
        subject=subject,
        subject_kind="keyword",
        outcome="empty" if not hits else "ok",
        hits=hits,
    )


# ── the dig ───────────────────────────────────────────────────────────────────


def test_every_item_says_why_it_is_in_the_answer():
    memory = create_memory({"title": "The kubernetes runbook", "content": "how we run it", "tags": ["kubernetes"]})
    found = dig("kubernetes")
    assert {i["source"] for i in found["items"]} >= {"tag", "keyword"}
    assert all(i["why"] for i in found["items"])
    assert all(i["id"] and i["label"] for i in found["items"])
    assert found["items"][0]["source"] == "tag"  # the strongest claim first
    assert found["items"][0]["id"] == memory["id"]


def test_scores_are_tiers_and_a_tag_outranks_a_body_hit():
    create_memory({"title": "Tagged", "content": "nothing relevant in the words", "tags": ["kubernetes"]})
    create_memory({"title": "Untagged", "content": "mentions kubernetes only in the body"})
    found = dig("kubernetes")
    by_source = {i["source"]: i["score"] for i in found["items"]}
    assert by_source["tag"] > by_source["keyword"]


def test_weak_items_are_returned_rather_than_hidden():
    """A low score is a signal, not a failure."""
    memory = create_memory({"title": "The runbook", "content": "how we run it", "tags": ["kvm"]})
    retag_memory(memory["id"], add=["kubernetes"])
    found = dig("kubernetes")
    assert any(i["source"] == "retagged" for i in found["items"] + found["weak"])
    assert all(i["score"] < CONFIDENT_FLOOR for i in found["weak"])
    assert all(i["score"] >= CONFIDENT_FLOOR for i in found["items"])


def test_a_subject_asked_for_and_stored_nowhere_is_named_as_exactly_that():
    """The most useful thing a dig can report, and it must not be inferred."""
    asked("postgres")
    asked("postgres")
    found = dig("postgres")
    assert found["verdict"] == "asked-never-answered"
    assert found["items"] == []
    assert found["asked"]["count"] == 2


def test_a_subject_nobody_has_ever_wanted_is_a_different_answer():
    assert dig("nobody-ever-asked")["verdict"] == "unknown"


def test_both_empty_verdicts_survive_embeddings_being_switched_on(embedder):
    """
    A vector index always returns its k nearest neighbours, however far away.

    So on an instance with embeddings, every dig used to collect `limit` items
    at the full semantic tier, `strong` was never empty, and the verdict could
    only ever be "found" — the two verdicts this module exists to distinguish
    became unreachable the moment someone configured Ollama.

    The far neighbour is still RETURNED, under `weak`: a low score is a signal,
    not a failure.
    """
    # The stored vector is embedded from "title\n\ncontent", so that exact
    # string is what has to carry a meaning here.
    embedder({"postgres": 1, "Unrelated\n\na memory about something else entirely": 2})
    create_memory({"title": "Unrelated", "content": "a memory about something else entirely"})
    asked("postgres")

    found = dig("postgres")
    assert found["verdict"] == "asked-never-answered"
    assert found["items"] == []
    far = [i for i in found["weak"] if i["source"] == "meaning"]
    assert far, "the distant neighbour should be reported as weak, not dropped"
    assert "far" in far[0]["why"]
    # The number is a DISTANCE. Calling it a cosine inverts what it means: 0.9
    # read as a similarity looks like the best hit on the page, not the worst.
    assert far[0]["why"].startswith("distance ")


def test_a_near_neighbour_still_counts_as_an_answer(embedder):
    """The gate must not cost the dig the thing semantic search is for."""
    embedder({"postgres": 3, "Production database\n\nthe database we run in production": 3})
    create_memory({"title": "Production database", "content": "the database we run in production"})

    found = dig("postgres")
    assert found["verdict"] == "found"
    assert any(i["source"] == "meaning" for i in found["items"])


def test_the_subject_is_normalised_so_one_word_is_one_dig():
    create_memory({"content": "x", "tags": ["kubernetes"]})
    assert dig("  Kubernetes*  ")["subject"] == "kubernetes"
    assert dig("KUBERNETES")["items"]


def test_a_dig_needs_a_subject():
    with pytest.raises(ValueError):
        dig("   ")


def test_the_dig_files_itself_but_not_its_own_sub_queries():
    """A read that writes — and one row, not one per source it consulted."""
    from arra_memory.trace import list_traces

    create_memory({"content": "x", "tags": ["kubernetes"]})
    dig("kubernetes")
    rows = list_traces()
    assert [r["tool"] for r in rows] == ["dig"]
    assert rows[0]["outcome"] == "ok"


def test_an_empty_dig_is_filed_as_empty():
    from arra_memory.trace import list_traces

    dig("nothing-here")
    assert list_traces()[0]["outcome"] == "empty"


# ── the chain ─────────────────────────────────────────────────────────────────


def test_the_chain_reads_the_log_in_order_and_links_cause_to_effect():
    memory = create_memory({"title": "The runbook", "content": "how we run it", "tags": ["kvm"]})
    asked("kubernetes")                      # nothing
    retag_memory(memory["id"], add=["kubernetes"])   # the fix
    asked("kubernetes", hits=1)              # found

    story = chain("kubernetes")
    assert story["resolved"] is True
    assert story["emptyAsks"] == 1
    assert [l["hits"] for l in story["links"]] == [0, 1]
    # The retag lands between the two asks, so it is what the first ask led to.
    assert story["links"][0]["led_to"], "the change that followed the failed ask should be linked to it"
    assert "kubernetes" in story["links"][0]["led_to"][0]["change"]


def test_a_chain_that_never_closed_says_so():
    asked("postgres")
    asked("postgres")
    story = chain("postgres")
    assert story["resolved"] is False
    assert "never answered" in story["summary"]


def test_a_subject_never_asked_for_has_no_chain():
    story = chain("untouched")
    assert story["links"] == []
    assert story["summary"] == "Never asked for."


def test_a_chain_answered_every_time_does_not_claim_a_struggle():
    asked("kvm", hits=2)
    asked("kvm", hits=3)
    assert "answered every time" in chain("kvm")["summary"]


def test_a_short_gap_is_reported_in_seconds_rather_than_rounded_up():
    """Rounding a nine-second gap to "1m later" is a small lie, and a log that
    rounds is a log you have to go behind."""
    from arra_memory.dig import _gap

    assert _gap("2026-09-09T10:00:00.000Z", "2026-09-09T10:00:09.000Z") == ", 9s later"
    assert _gap("2026-09-09T10:00:00.000Z", "2026-09-09T10:02:00.000Z") == ", 2m later"
    assert _gap("2026-09-09T10:00:00.000Z", "2026-09-09T13:00:00.000Z") == ", 3h later"
    assert _gap("2026-09-09T10:00:00.000Z", "2026-09-11T10:00:00.000Z") == ", 2d later"
    assert _gap("2026-09-09T10:00:00.000Z", "2026-09-09T10:00:00.000Z") == ""


def test_reading_the_chain_does_not_add_to_it():
    asked("kubernetes")
    before = len(chain("kubernetes")["links"])
    chain("kubernetes")
    chain("kubernetes")
    assert len(chain("kubernetes")["links"]) == before

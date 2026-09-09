"""
Recall searches by meaning, not only by literal words — on every surface.

These exist because the capability was real in the lineage this is ported from
and one caller could not reach it: the fusion lived in the HTTP route, so
`recall_memories` over MCP ran a literal keyword scan and answered "No memories
matched" for questions the corpus could answer. An empty result is
indistinguishable from a true one, so nothing ever reported it.
"""

from __future__ import annotations

import pytest

from arra_memory.memory import (
    backfill_embeddings,
    create_memory,
    embedding_coverage,
    recall_memories,
    update_memory,
    wait_for_indexing,
)

GUEST = "Provisioning a guest\n\nvirt-install with a preseed file"
QUESTION = "standing up a fresh box from nothing"
MEANING = {GUEST: 1, QUESTION: 1}


@pytest.fixture
def corpus(embedder):
    fake = embedder(MEANING)
    guest = create_memory({"title": "Provisioning a guest", "content": "virt-install with a preseed file"})
    # A decoy that DOES share words with the question, so a hybrid hit cannot be
    # explained away as keyword luck.
    create_memory({"title": "Unrelated", "content": "a fresh coat of paint on the standing desk"})
    wait_for_indexing()
    return fake, guest


def test_keyword_mode_cannot_find_a_memory_phrased_differently(corpus):
    _, guest = corpus
    result = recall_memories({"query": QUESTION, "mode": "keyword"})
    assert result["effectiveMode"] == "keyword"
    assert guest["id"] not in [m["id"] for m in result["memories"]]


def test_hybrid_finds_it_anyway_by_meaning(corpus):
    _, guest = corpus
    result = recall_memories({"query": QUESTION, "mode": "hybrid"})
    assert result["effectiveMode"] == "hybrid"
    assert result["fallback"] is None
    assert guest["id"] in [m["id"] for m in result["memories"]]


def test_hybrid_is_the_default_an_omitted_mode_must_not_silently_be_keyword(corpus):
    _, guest = corpus
    result = recall_memories({"query": QUESTION})
    assert result["requestedMode"] == "hybrid"
    assert guest["id"] in [m["id"] for m in result["memories"]]


def test_with_the_embedder_down_hybrid_degrades_to_keyword_and_says_why(corpus):
    fake, _ = corpus
    fake.down = True
    result = recall_memories({"query": QUESTION, "mode": "hybrid"})
    assert result["effectiveMode"] == "keyword"
    assert result["fallback"]["used"] is True
    assert result["fallback"]["reason"]


def test_explicit_semantic_fails_rather_than_quietly_degrading(corpus):
    fake, _ = corpus
    fake.down = True
    with pytest.raises(RuntimeError):
        recall_memories({"query": QUESTION, "mode": "semantic"})


def test_an_empty_query_does_not_pay_for_an_embed(corpus):
    fake, _ = corpus
    fake.calls = 0
    result = recall_memories({"query": ""})
    assert result["effectiveMode"] == "keyword"
    assert fake.calls == 0


def test_semantic_recall_respects_the_scope_it_was_given(corpus):
    fake, guest = corpus
    update_memory(guest["id"], {"workspace": "vm"})
    wait_for_indexing()
    inside = recall_memories({"query": QUESTION, "mode": "semantic", "workspace": "vm"})
    assert [m["id"] for m in inside["memories"]] == [guest["id"]]
    outside = recall_memories({"query": QUESTION, "mode": "semantic", "workspace": "elsewhere"})
    assert outside["memories"] == []


def test_a_memory_with_no_vector_is_excluded_rather_than_ranked_last(embedder):
    """"Not indexed yet" is not the same as "unrelated" — letting it score would be a quiet lie."""
    fake = embedder(MEANING)
    fake.down = True
    unembedded = create_memory({"content": "written while the embedder was down"})
    wait_for_indexing()
    fake.down = False
    result = recall_memories({"query": QUESTION, "mode": "semantic"})
    assert unembedded["id"] not in [m["id"] for m in result["memories"]]


def test_backfill_embeds_what_the_outage_missed(embedder):
    fake = embedder(MEANING)
    fake.down = True
    create_memory({"content": "written while the embedder was down"})
    wait_for_indexing()
    fake.down = False

    assert embedding_coverage()["embedded"] == 0
    assert backfill_embeddings() == 1
    coverage = embedding_coverage()
    assert coverage == {"total": 1, "embedded": 1, "model": "test-model", "enabled": True}


def test_coverage_reports_zero_embedded_when_embeddings_are_off():
    create_memory({"content": "no embedder configured"})
    coverage = embedding_coverage()
    assert coverage["enabled"] is False
    assert coverage["embedded"] == 0
    assert coverage["total"] == 1

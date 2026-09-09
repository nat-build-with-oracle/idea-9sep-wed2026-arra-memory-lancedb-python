"""
Every write path embeds what it writes.

Both failures below were live in the lineage this is ported from and neither
announced itself: MCP `remember` wrote without a vector because indexing lived
at the call site, and revising a memory left the OLD vector in place — which
could not heal, because backfill only looks for NULL or wrong-model rows.

These assert on the DATABASE, not on the return value: both bugs returned a
perfectly correct object.
"""

from __future__ import annotations

from arra_memory.db import db
from arra_memory.memory import create_memory, update_memory, wait_for_indexing
from arra_memory.models import Q


def stored(memory_id: str) -> dict:
    row = db().memories.rows(Q.eq("id", memory_id), ["id", "vector", "embedding_model"])[0]
    return {"embedded": row["vector"] is not None, "model": row["embedding_model"]}


def test_a_created_memory_is_embedded_without_the_caller_asking(embedder):
    fake = embedder()
    memory = create_memory({"title": "the clean room", "content": "thor proves the add-on installs from nothing"})
    wait_for_indexing()

    assert stored(memory["id"]) == {"embedded": True, "model": "test-model"}
    # Title and content together: a title carries meaning the body assumes.
    assert fake.last[0] == "the clean room\n\nthor proves the add-on installs from nothing"


def test_revising_the_content_re_embeds_it_so_the_vector_cannot_go_stale(embedder):
    fake = embedder()
    memory = create_memory({"title": "before", "content": "the original text"})
    wait_for_indexing()

    fake.calls = 0
    update_memory(memory["id"], {"content": "completely different text"})
    wait_for_indexing()

    assert fake.calls == 1
    assert fake.last[0] == "before\n\ncompletely different text"


def test_revising_only_metadata_does_not_pay_for_an_embed(embedder):
    fake = embedder()
    memory = create_memory({"title": "steady", "content": "unchanged body"})
    wait_for_indexing()

    fake.calls = 0
    update_memory(memory["id"], {"tags": ["thor"], "importance": 5, "project": "haos-oracle"})
    wait_for_indexing()

    assert fake.calls == 0


def test_a_dead_embedder_never_costs_the_corpus_a_memory(embedder):
    fake = embedder()
    fake.down = True
    memory = create_memory({"content": "written while the embedder was down"})
    wait_for_indexing()

    assert stored(memory["id"])["embedded"] is False
    assert memory["content"] == "written while the embedder was down"  # the row is durable regardless


def test_a_dimension_mismatch_is_refused_at_embed_time_not_query_time(embedder):
    """A wrong-width vector would corrupt the index and surface later as bad results."""
    fake = embedder(dimensions=32)
    fake.dimensions = 8  # the provider now returns 8-wide vectors into a 32-wide column
    memory = create_memory({"content": "mismatched"})
    wait_for_indexing()
    assert stored(memory["id"])["embedded"] is False

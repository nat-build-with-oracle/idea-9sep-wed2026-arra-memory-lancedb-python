"""
The corpus as geometry. The properties that matter are the honest ones: a
memory with no vector is absent rather than placed at the origin, the
projection reports how much variance it actually captured, and a written
[[link]] outranks an inferred similarity for the same pair.
"""

from __future__ import annotations

from arra_memory.graph import build_graph
from arra_memory.memory import create_memory, wait_for_indexing


def corpus(embedder, n: int = 6):
    fake = embedder(dimensions=32)
    made = []
    for i in range(n):
        # Distinct meanings, so the axes are orthogonal and the geometry is controlled.
        fake.meaning[f"m{i}\n\nbody {i}"] = i
        made.append(create_memory({"title": f"m{i}", "content": f"body {i}"}))
    wait_for_indexing()
    return fake, made


def test_an_empty_corpus_draws_nothing_rather_than_failing():
    graph = build_graph({})
    assert graph == {
        "nodes": [],
        "edges": [],
        "unembedded": 0,
        "explained": 0.0,
        "k": 0,
        "links": 0,
        "density": 0.0,
        "distance": None,
    }


def test_memories_without_a_vector_are_counted_not_placed(embedder):
    fake, _ = corpus(embedder, 2)
    fake.down = True
    create_memory({"content": "written while the embedder was down"})
    wait_for_indexing()

    graph = build_graph({})
    assert len(graph["nodes"]) == 2
    assert graph["unembedded"] == 1


def test_the_projection_is_deterministic_and_reports_what_it_captured(embedder):
    corpus(embedder, 6)
    first = build_graph({})
    second = build_graph({})
    assert [(n["x"], n["y"], n["z"]) for n in first["nodes"]] == [(n["x"], n["y"], n["z"]) for n in second["nodes"]]
    assert 0.0 < first["explained"] <= 1.0
    assert all(-1.000001 <= n[axis] <= 1.000001 for n in first["nodes"] for axis in ("x", "y", "z"))


def test_k_is_chosen_from_n_so_a_small_corpus_is_not_a_complete_graph(embedder):
    corpus(embedder, 6)
    graph = build_graph({})
    assert graph["k"] == 3  # ceil(sqrt(6)), not a flat 10-15
    assert graph["density"] < 1.0


def test_no_memory_is_ever_an_island(embedder):
    """Mutual kNN strips enough edges to disconnect the graph; the MST puts it back."""
    _, made = corpus(embedder, 6)
    graph = build_graph({})
    touched = {i for edge in graph["edges"] for i in (edge["source"], edge["target"])}
    assert touched == set(range(len(graph["nodes"])))
    assert any(edge["kind"] == "bridge" for edge in graph["edges"])


def test_a_written_link_becomes_an_edge_and_outranks_the_inferred_one(embedder):
    fake = embedder(dimensions=32)
    target = create_memory({"title": "The runbook", "content": "how to build a guest"})
    fake.meaning["The runbook\n\nhow to build a guest"] = 1
    source = create_memory({"title": "The retro", "content": "we followed [[The runbook]] and it worked"})
    fake.meaning["The retro\n\nwe followed [[The runbook]] and it worked"] = 2
    create_memory({"title": "Third", "content": "unrelated"})
    wait_for_indexing()

    graph = build_graph({})
    assert graph["links"] == 1
    by_id = {n["id"]: i for i, n in enumerate(graph["nodes"])}
    pair = {by_id[source["id"]], by_id[target["id"]]}
    matching = [e for e in graph["edges"] if {e["source"], e["target"]} == pair]
    assert len(matching) == 1  # never drawn twice
    assert matching[0]["kind"] == "link"


def test_a_dangling_reference_is_dropped_rather_than_drawn_to_nowhere(embedder):
    embedder(dimensions=32)
    create_memory({"title": "One", "content": "see [[a memory not saved yet]]"})
    create_memory({"title": "Two", "content": "body"})
    wait_for_indexing()
    assert build_graph({})["links"] == 0


def test_the_graph_honours_the_scope_it_was_given(embedder):
    fake = embedder(dimensions=32)
    for i in range(4):
        fake.meaning[f"m{i}\n\nbody {i}"] = i
        create_memory({"title": f"m{i}", "content": f"body {i}", "workspace": "alpha" if i < 2 else "beta"})
    wait_for_indexing()

    graph = build_graph({"workspace": "alpha"})
    assert {n["workspace"] for n in graph["nodes"]} == {"alpha"}
    assert len(graph["nodes"]) == 2

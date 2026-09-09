"""CRUD, normalisation, facets, and the search paths that back every surface."""

from __future__ import annotations

import pytest

from arra_memory.memory import (
    create_memory,
    delete_memory,
    get_memory,
    get_memory_stats,
    list_agents,
    list_facets,
    list_kinds,
    list_months,
    list_projects,
    list_tags,
    list_workspaces,
    merge_facet,
    search_in_range,
    search_memories,
    update_memory,
)
from arra_memory.timerange import resolve_range


def test_a_memory_round_trips_with_its_defaults():
    memory = create_memory({"content": "# The forge\nthor proves the add-on installs from nothing"})
    assert memory["title"] == "The forge"  # inferred from the first line, heading marks stripped
    assert memory["kind"] == "learn"
    assert memory["importance"] == 3
    assert memory["source"] == "web"
    assert get_memory(memory["id"]) == memory


def test_tags_are_deduplicated_case_insensitively_and_capped_at_ten():
    memory = create_memory({"content": "tagged", "tags": ["Turso", "turso", *[f"t{i}" for i in range(12)]]})
    assert memory["tags"][0] == "Turso"  # first spelling wins
    assert len(memory["tags"]) == 10


def test_importance_outside_one_to_five_is_refused():
    with pytest.raises(ValueError):
        create_memory({"content": "x", "importance": 9})


def test_a_javascript_url_is_refused_because_the_ui_renders_it_as_a_link():
    with pytest.raises(ValueError):
        create_memory({"content": "x", "url": "javascript:alert(1)"})


def test_a_partial_update_never_blanks_a_column_the_caller_did_not_mention():
    memory = create_memory(
        {"content": "body", "title": "kept", "tags": ["a"], "workspace": "ws", "project": "p", "importance": 5}
    )
    updated = update_memory(memory["id"], {"content": "new body"})
    assert updated["title"] == "kept"
    assert updated["tags"] == ["a"]
    assert updated["workspace"] == "ws"
    assert updated["importance"] == 5
    assert updated["createdAt"] == memory["createdAt"]  # a revision is the same memory
    assert updated["updatedAt"] >= memory["updatedAt"]


def test_deleting_reports_whether_anything_was_there():
    memory = create_memory({"content": "temporary"})
    assert delete_memory(memory["id"]) is True
    assert delete_memory(memory["id"]) is False
    assert get_memory(memory["id"]) is None


def test_thai_is_searchable_by_a_word_inside_a_sentence():
    """The whole reason the index is n-gram: Thai writes without spaces."""
    memory = create_memory({"title": "ระบบความจำ", "content": "ระบบความจำสำหรับผู้ช่วยเอไอ"})
    create_memory({"title": "unrelated", "content": "a fresh coat of paint"})
    found = search_memories({"query": "ความจำ"})
    assert memory["id"] in [m["id"] for m in found]


def test_the_full_text_path_still_gets_a_relevance_score():
    """
    LanceDB warns that scoring auto-projection is going away. If `_score` stopped
    arriving, every hit would rank equal — relevance would flatten silently rather
    than fail, so the column is asked for by name and checked here.
    """
    from arra_memory.memory import FTS_COLUMNS, _fts_hits

    create_memory({"title": "needle", "content": "a body worth ranking"})
    assert "_score" in FTS_COLUMNS
    hits = _fts_hits("needle", "", 10)
    assert hits and all(isinstance(h.get("_score"), float) for h in hits)


def test_keyword_search_does_not_find_things_by_coincidence():
    """
    A phrase, not a bag of words. This is the signal a caller uses to decide
    whether a search by meaning is still worth trying, so a permissive fallback
    that "finds something" would erase the difference between "keyword found
    nothing" and "nothing is here".
    """
    create_memory({"title": "system notes", "content": "a memory of something else entirely"})
    assert search_memories({"query": "nothing matches this at all"}) == []


def test_search_matches_title_content_and_tags():
    a = create_memory({"title": "needle in the title", "content": "body"})
    b = create_memory({"title": "other", "content": "the needle is in the body"})
    c = create_memory({"title": "third", "content": "body", "tags": ["needle"]})
    found = {m["id"] for m in search_memories({"query": "needle"})}
    assert {a["id"], b["id"], c["id"]} <= found


def test_an_id_or_the_front_of_one_is_answered_directly():
    """Search covers title, content and tags — an id is in none of them."""
    memory = create_memory({"content": "the atlas opens this one"})
    assert [m["id"] for m in search_memories({"query": memory["id"]})] == [memory["id"]]
    assert [m["id"] for m in search_memories({"query": memory["id"][:8]})] == [memory["id"]]


def test_an_empty_query_lists_the_corpus_newest_first():
    first = create_memory({"content": "older"})
    second = create_memory({"content": "newer"})
    listed = [m["id"] for m in search_memories({})]
    assert listed.index(second["id"]) < listed.index(first["id"])


def test_scope_filters_narrow_within_a_facet_as_or_and_across_facets_as_and():
    create_memory({"content": "one", "workspace": "alpha", "project": "x", "createdBy": "ann"})
    create_memory({"content": "two", "workspace": "beta", "project": "y", "createdBy": "bob"})
    create_memory({"content": "three", "workspace": "alpha", "project": "y", "createdBy": "bob"})

    either = search_memories({"workspace": ["alpha", "beta"]})
    assert len(either) == 3
    both = search_memories({"workspace": "alpha", "createdBy": "bob"})
    assert [m["content"] for m in both] == ["three"]
    assert len(search_memories({"workspace": []})) == 3  # an empty facet does not narrow


def test_a_tag_filter_quotes_the_needle_so_ha_does_not_match_haos():
    create_memory({"content": "one", "tags": ["haos"]})
    tagged = create_memory({"content": "two", "tags": ["ha"]})
    found = search_memories({"tag": "ha"})
    assert [m["id"] for m in found] == [tagged["id"]]


def test_the_limit_is_honoured_and_clamped():
    for i in range(5):
        create_memory({"content": f"memory {i}"})
    assert len(search_memories({"limit": 2})) == 2
    assert len(search_memories({"limit": 10_000})) == 5  # clamped to 100, corpus is smaller


def test_facets_are_derived_from_the_memories_themselves():
    create_memory({"content": "a", "workspace": "ws", "project": "p", "createdBy": "ann", "tags": ["t"], "kind": "retro"})
    create_memory({"content": "b", "workspace": "ws", "project": "q", "createdBy": "bob", "tags": ["t", "u"]})
    create_memory({"content": "c"})  # unfiled

    facets = list_facets()
    assert facets["total"] == 3
    assert facets["unassigned"] == 1
    workspace = next(w for w in facets["workspaces"] if w["workspace"] == "ws")
    assert (workspace["count"], workspace["projects"], workspace["agents"]) == (2, 2, 2)
    assert {t["tag"]: t["count"] for t in facets["tags"]} == {"t": 2, "u": 1}
    assert {k["kind"] for k in facets["kinds"]} == {"retro", "learn"}

    assert [p["project"] for p in list_projects()] == ["p", "q"]
    assert [a["agent"] for a in list_agents()] == ["ann", "bob"]
    assert [t["tag"] for t in list_tags()] == ["t", "u"]
    assert list_workspaces()["unassigned"] == 1
    assert {k["kind"] for k in list_kinds()} == {"retro", "learn"}
    assert list_months()[0]["count"] == 3


def test_stats_summarise_the_corpus():
    create_memory({"content": "a", "kind": "retro", "tags": ["x"]})
    create_memory({"content": "b", "kind": "retro", "tags": ["x", "y"]})
    stats = get_memory_stats()
    assert stats["total"] == 2
    assert stats["kinds"] == {"retro": 2}
    assert stats["topTags"][0] == {"tag": "x", "count": 2}
    assert stats["latestUpdatedAt"] is not None


def test_merging_a_facet_renames_rather_than_deletes_and_is_reversible():
    a = create_memory({"content": "a", "kind": "retros"})
    create_memory({"content": "b", "kind": "retro"})
    result = merge_facet("kind", "retros", "retro")
    assert result["merged"] == 1
    assert get_memory_stats()["kinds"] == {"retro": 2}
    merge_facet("kind", "retro", "retros")  # merging back undoes it
    assert get_memory(a["id"])["kind"] == "retros"


def test_merging_a_tag_rewrites_inside_the_json_array_and_dedupes():
    memory = create_memory({"content": "a", "tags": ["turso", "lancedb"]})
    merge_facet("tag", "turso", "lancedb")
    assert get_memory(memory["id"])["tags"] == ["lancedb"]
    assert [t["tag"] for t in list_tags()] == ["lancedb"]


def test_merging_a_tag_keeps_it_searchable():
    """The FTS text column carries the tags, so a merge has to rewrite it too."""
    memory = create_memory({"content": "body about nothing", "tags": ["turso"]})
    merge_facet("tag", "turso", "lancedb")
    assert memory["id"] in [m["id"] for m in search_memories({"query": "lancedb"})]


def test_merging_refuses_a_no_op_or_a_blank():
    create_memory({"content": "a", "kind": "retro", "workspace": "ws"})
    with pytest.raises(ValueError):
        merge_facet("kind", "retro", "retro")
    # Blank is only expressible where the normaliser has no default of its own:
    # an empty kind becomes "learn", an empty workspace stays empty (= unset).
    with pytest.raises(ValueError):
        merge_facet("workspace", "", "ws")


def test_a_time_range_is_inclusive_of_both_ends():
    memory = create_memory({"content": "today's work"})
    window = resolve_range("today")
    found = search_in_range({"fromIso": window.fromIso, "toIso": window.toIso, "label": "today"})
    assert [m["id"] for m in found] == [memory["id"]]

    empty = search_in_range({"fromIso": "1999-01-01T00:00:00.000Z", "toIso": "1999-12-31T23:59:59.999Z"})
    assert empty == []

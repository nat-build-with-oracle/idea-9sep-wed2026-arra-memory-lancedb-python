"""
The second cloud: what has been ASKED for.

The archive's cloud says what the corpus is made OF; this one says what people
keep coming to it FOR. The pair is the point — a subject that is large here and
absent from the tag cloud is a question the corpus has never been able to
answer, and neither picture shows that alone.
"""

from __future__ import annotations

from arra_memory.cloud import MIN_PX, asked_cloud, tag_cloud
from arra_memory.mcp import handle_mcp
from arra_memory.memory import create_memory


def call(name: str, args: dict | None = None) -> dict:
    return handle_mcp(
        {"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": name, "arguments": args or {}}}
    )["result"]


def test_the_asked_cloud_counts_what_was_searched_not_what_is_stored():
    create_memory({"content": "lancedb notes", "tags": ["lancedb"]})
    for _ in range(4):
        call("recall_memories", {"query": "lancedb"})
    call("recall_memories", {"query": "mcp"})

    cloud = asked_cloud()
    counts = {i["subject"]: i["count"] for i in cloud["items"]}
    assert counts == {"lancedb": 4, "mcp": 1}
    assert cloud["items"][0]["subject"] == "lancedb"  # busiest first
    assert cloud["items"][0]["size"] > cloud["items"][1]["size"]


def test_the_two_clouds_together_name_what_the_corpus_cannot_answer():
    create_memory({"content": "lancedb notes", "tags": ["lancedb"]})
    call("recall_memories", {"query": "lancedb"})
    call("recall_memories", {"query": "kubernetes"})  # asked for, never stored

    stored = {i["tag"] for i in tag_cloud()["items"]}
    asked = {i["subject"] for i in asked_cloud()["items"]}
    assert asked - stored == {"kubernetes"}


def test_a_call_with_no_subject_is_not_an_empty_word_in_the_cloud():
    """memory_stats is a real trace row but nobody asked ABOUT anything."""
    create_memory({"content": "x"})
    call("memory_stats")
    call("list_tags")
    assert asked_cloud()["items"] == []


def test_subjects_are_counted_under_their_normalised_form():
    create_memory({"content": "x"})
    call("recall_memories", {"query": "Kubernetes"})
    call("recall_memories", {"query": "  kubernetes  "})
    call("recall_memories", {"query": "kubernetes*"})
    assert [(i["subject"], i["count"]) for i in asked_cloud()["items"]] == [("kubernetes", 3)]


def test_the_asked_cloud_obeys_the_same_law_as_the_tag_cloud():
    create_memory({"content": "x"})
    for _ in range(3):
        call("recall_memories", {"query": "same"})
    for _ in range(3):
        call("recall_memories", {"query": "equal"})

    cloud = asked_cloud()
    # Equal counts: no relation to show, so none is drawn larger — exactly as the
    # tag cloud behaves on a uniform corpus.
    assert cloud["uniform"] is True
    assert {i["size"] for i in cloud["items"]} == {MIN_PX}
    assert cloud["scale"]["law"] == "log1p"


def test_an_empty_log_is_an_empty_cloud():
    assert asked_cloud() == {
        "items": [],
        "max": 0,
        "total": 0,
        "distinct": 0,
        "uniform": False,
        # `shown` counts what survived the limit, so a reader can tell a small
        # log from a truncated view of a big one.
        "shown": 0,
        "scale": {"min": 11.0, "max": 20.0, "law": "log1p"},
        "days": 0,
    }


def test_the_mcp_tool_serves_both_clouds_from_one_name():
    create_memory({"content": "lancedb notes", "tags": ["lancedb"]})
    call("recall_memories", {"query": "kubernetes"})

    tags = call("tag_cloud")["structuredContent"]
    asked = call("tag_cloud", {"by": "asked"})["structuredContent"]
    assert [i["tag"] for i in tags["items"]] == ["lancedb"]
    assert [i["subject"] for i in asked["items"]] == ["kubernetes"]
    assert "subjects asked" in call("tag_cloud", {"by": "asked"})["content"][0]["text"]


def test_the_cloud_is_words_people_asked_for_and_not_ids_or_writes():
    """
    The asked cloud answers one question: what do people keep coming here for.

    Memory ids and writes were crowding out the answer. An id is a subject of
    kind "item" and reads as noise among words; `remember` and `forget_memory`
    are things done TO the corpus, not things asked OF it. A cloud of uuids
    answers nothing.
    """
    memory = create_memory({"content": "lancedb notes", "tags": ["lancedb"]})
    call("read_memory", {"id": memory["id"]})
    call("remember", {"content": "written, not asked", "title": "Write"})
    call("recall_memories", {"query": "lancedb"})
    call("recall_memories", {"query": "lancedb"})

    cloud = asked_cloud()
    subjects = [i["subject"] for i in cloud["items"]]
    assert "lancedb" in subjects
    assert memory["id"] not in subjects, "a memory id is not a word anyone asked for"
    assert all("-" not in s or s == "lancedb" for s in subjects), f"unexpected id-shaped subject in {subjects}"

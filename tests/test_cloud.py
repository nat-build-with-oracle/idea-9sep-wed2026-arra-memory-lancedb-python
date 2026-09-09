"""
The tag cloud's law, and the two edge cases that break the obvious version of it.

The fleet's prior art (digger-node, trace-node) states the rule in words: sizes
run 11px→20px on a log scale, and a zero-usage term still appears. Implemented
the obvious way — min-max normalisation over logs — both of those requirements
raise: log(0) is a domain error, and an all-equal corpus divides by zero.
"""

from __future__ import annotations

import pytest

from arra_memory.cloud import MAX_PX, MIN_PX, size_for, tag_cloud
from arra_memory.memory import create_memory


def test_size_encodes_usage_on_a_log_scale():
    assert size_for(40, 40) == MAX_PX
    assert size_for(1, 40) < size_for(4, 40) < size_for(20, 40) < size_for(40, 40)
    # Log, not linear: 1-of-40 must not collapse onto the floor the way it does
    # under a linear map, or the cloud stops carrying information.
    assert size_for(1, 40) > MIN_PX + 1


def test_a_zero_usage_tag_renders_at_the_floor_rather_than_raising():
    """digger-node's LEFT JOIN rule, in arithmetic: it must still appear."""
    assert size_for(0, 20) == MIN_PX


def test_a_corpus_with_no_usage_at_all_does_not_divide_by_zero():
    assert size_for(0, 0) == MIN_PX
    assert size_for(5, 0) == MIN_PX


def test_the_cloud_sizes_real_tags_by_how_often_they_are_used():
    create_memory({"content": "a", "tags": ["kvm", "runbook"]})
    create_memory({"content": "b", "tags": ["kvm"]})
    create_memory({"content": "c", "tags": ["kvm", "fts"]})

    cloud = tag_cloud()
    sizes = {i["tag"]: i["size"] for i in cloud["items"]}
    assert sizes["kvm"] == MAX_PX
    assert sizes["runbook"] < sizes["kvm"]
    assert cloud["max"] == 3
    assert cloud["distinct"] == 3
    assert cloud["total"] == 5
    assert cloud["uniform"] is False
    assert cloud["scale"] == {"min": MIN_PX, "max": MAX_PX, "law": "log1p"}


def test_tags_come_back_ordered_by_usage():
    create_memory({"content": "a", "tags": ["rare"]})
    for i in range(3):
        create_memory({"content": f"b{i}", "tags": ["common"]})
    assert [i["tag"] for i in tag_cloud()["items"]] == ["common", "rare"]


def test_a_corpus_where_every_tag_is_used_equally_draws_none_of_them_larger():
    """
    The cloud's whole claim is relative. Normalising against the max would draw
    every tag at maximum and claim each one dominant, when what is true is that
    there is no relation to show.
    """
    for tag in ("a", "b", "c"):
        create_memory({"content": f"one {tag}", "tags": [tag]})

    cloud = tag_cloud()
    assert cloud["uniform"] is True
    assert {i["size"] for i in cloud["items"]} == {MIN_PX}


def test_an_empty_corpus_is_an_empty_cloud_not_a_failure():
    cloud = tag_cloud()
    assert cloud["items"] == []
    assert cloud["max"] == 0
    assert cloud["uniform"] is False


def test_the_cloud_can_be_scoped_to_one_workspace():
    create_memory({"content": "a", "tags": ["inside"], "workspace": "ws"})
    create_memory({"content": "b", "tags": ["outside"]})
    assert [i["tag"] for i in tag_cloud(50, "ws")["items"]] == ["inside"]
    assert tag_cloud(50, "ws")["workspace"] == "ws"


def test_every_size_stays_inside_the_declared_scale():
    for i in range(12):
        create_memory({"content": f"m{i}", "tags": ["t"] * 0 + [f"tag{i % 4}"]})
    assert all(MIN_PX <= i["size"] <= MAX_PX for i in tag_cloud()["items"])

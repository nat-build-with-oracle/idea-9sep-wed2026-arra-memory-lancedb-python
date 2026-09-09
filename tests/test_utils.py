"""
The pure normalisers, held to the original's behaviour.

Every expectation here was produced by running the TypeScript in
`arra-memory-haos/arra-memory/src/utils.ts` on the same input under Bun and
recording what it returned — not by reading the code and guessing. Where the two
languages disagreed, the TypeScript was taken as correct and the Python changed:
`new URL().toString()` normalises a URL the way a browser does, and a UI that
renders a memory's `url` as a link is entitled to that.
"""

from __future__ import annotations

import pytest

from arra_memory.utils import (
    clamp_limit,
    make_memory_title,
    normalize_created_by,
    normalize_importance,
    normalize_kind,
    normalize_project,
    normalize_source,
    normalize_tags,
    normalize_url,
    normalize_workspace,
    parse_tags,
    slugify,
)


@pytest.mark.parametrize(
    "raw,expected",
    [
        # A bare origin gains the path a browser gives it.
        ("https://x.com", "https://x.com/"),
        # A space in a path belongs percent-encoded, not raw inside an href.
        ("https://x.com/a b", "https://x.com/a%20b"),
        # An escape that is already there is not escaped a second time.
        ("https://x.com/a%20b", "https://x.com/a%20b"),
        ("HTTPS://X.COM/Path", "https://x.com/Path"),
        ("https://x.com:443/a", "https://x.com/a"),
        ("http://x.com:80/", "http://x.com/"),
        ("http://a.b/c?d=1#e", "http://a.b/c?d=1#e"),
        ("  https://y.com/p  ", "https://y.com/p"),
        ("https://user:pw@x.com/p?q=a b#frag ment", "https://user:pw@x.com/p?q=a%20b#frag%20ment"),
        ("https://x.com/ก ข", "https://x.com/%E0%B8%81%20%E0%B8%82"),
        ("", ""),
    ],
)
def test_a_url_is_normalised_the_way_a_browser_would_leave_it(raw, expected):
    assert normalize_url(raw) == expected


@pytest.mark.parametrize("raw", ["ftp://x.com/a", "javascript:alert(1)", "not a url", "https://x.com:notaport/"])
def test_anything_that_is_not_http_or_https_is_refused(raw):
    """A memory's url is rendered as a link; `javascript:` there is a scripting hole."""
    with pytest.raises(ValueError):
        normalize_url(raw)


def test_a_url_longer_than_the_column_is_refused():
    with pytest.raises(ValueError):
        normalize_url("https://x.com/" + "a" * 2100)


@pytest.mark.parametrize(
    "raw,expected",
    [
        (["Turso", "turso", "  spaced   out  ", ""], ["Turso", "spaced out"]),
        ([chr(97 + i) for i in range(12)], [chr(97 + i) for i in range(10)]),
        ([], []),
        (["x" * 50], ["x" * 40]),
        (["  ", "\t"], []),
    ],
)
def test_tags_dedupe_case_insensitively_keeping_the_first_spelling(raw, expected):
    assert normalize_tags(raw) == expected


@pytest.mark.parametrize(
    "raw,expected",
    [
        ("# Heading here\nbody", "Heading here"),
        ("   \n\nsecond line", "Untitled memory"),
        ("", "Untitled memory"),
        ("a" * 120, "a" * 77 + "…"),
        ("one   two\tthree", "one two three"),
        ("## ห้อง\nเนื้อหา", "ห้อง"),
    ],
)
def test_a_title_is_the_first_meaningful_line(raw, expected):
    assert make_memory_title(raw) == expected


@pytest.mark.parametrize(
    "raw,expected",
    [("Retro", "retro"), ("  RETRO  ", "retro"), ("", "learn"), ("a" * 60, "a" * 40), ("  multi   word  ", "multi word")],
)
def test_kind_is_lowercased_and_never_throws(raw, expected):
    """Used on read as well as write — a stored row must never fail to load."""
    assert normalize_kind(raw) == expected


@pytest.mark.parametrize(
    "raw,expected",
    [
        ("github.com/Owner/Repo", "github_com_owner_repo"),
        ("a--b__c", "a_b_c"),
        ("  ", ""),
        ("ราชการ", ""),
        ("A.B-C", "a_b_c"),
        ("___lead", "lead"),
        ("x" * 60, "x" * 40),
    ],
)
def test_slugify_matches_the_original_including_the_lossy_cases(raw, expected):
    """It is not invertible, which is why a generated tool carries its project string."""
    assert slugify(raw) == expected


@pytest.mark.parametrize("raw,expected", [(None, 30), (0, 1), (1, 1), (50, 50), (1000, 100), (-5, 1)])
def test_a_limit_is_clamped_rather_than_refused(raw, expected):
    assert clamp_limit(raw) == expected


@pytest.mark.parametrize(
    "raw,expected", [('["a","b"]', ["a", "b"]), ("not json", []), ('[1,2,"c"]', ["c"]), ("[]", []), ("null", [])]
)
def test_a_corrupt_tags_column_degrades_to_no_tags(raw, expected):
    assert parse_tags(raw) == expected


def test_the_remaining_field_normalisers_trim_collapse_and_cap():
    assert normalize_source("  mcp  ") == "mcp"
    assert normalize_source("") == "web"
    with pytest.raises(ValueError):
        normalize_source("s" * 65)
    assert normalize_project("  github.com/a/b  ") == "github.com/a/b"
    assert normalize_project("a  b") == "a b"
    assert len(normalize_project("x" * 200)) == 120
    assert normalize_workspace("a   b") == "a b"
    assert normalize_workspace("") == ""  # unset, not a workspace named "none"
    assert normalize_created_by("  claude  ") == "claude"
    assert len(normalize_created_by("x" * 100)) == 64


@pytest.mark.parametrize("raw", [0, 6, 2.5, "3", True, None])
def test_importance_takes_only_an_integer_from_one_to_five(raw):
    if raw is None:
        assert normalize_importance(None) == 3
        return
    with pytest.raises(ValueError):
        normalize_importance(raw)

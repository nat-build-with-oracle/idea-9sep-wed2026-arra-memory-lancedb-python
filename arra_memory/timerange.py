"""
Time ranges, and the tool names that describe them: search_today,
search_last_7days, search_2026_08, search_2026_07_to_2026_08.

Every range resolves to a pair of ISO-8601 strings; created_at sorts
lexicographically, so a range is a plain string comparison.
"""

from __future__ import annotations

import calendar
import re
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

from .utils import to_iso

FOREVER = "9999-12-31T23:59:59.999Z"


@dataclass
class TimeRange:
    fromIso: str
    toIso: str
    label: str


def _days_ago(days: int) -> str:
    return to_iso(datetime.now(timezone.utc) - timedelta(days=days))


def _start_of_today() -> str:
    now = datetime.now(timezone.utc)
    return to_iso(datetime(now.year, now.month, now.day, tzinfo=timezone.utc))


RELATIVE_RANGES: dict[str, tuple[str, object]] = {
    "today": ("today", _start_of_today),
    "yesterday": ("since yesterday", lambda: _days_ago(2)),
    "last_7days": ("the last 7 days", lambda: _days_ago(7)),
    "last_2weeks": ("the last 2 weeks", lambda: _days_ago(14)),
    "last_3weeks": ("the last 3 weeks", lambda: _days_ago(21)),
    "last_1month": ("the last month", lambda: _days_ago(30)),
    "last_3months": ("the last 3 months", lambda: _days_ago(90)),
    "last_6months": ("the last 6 months", lambda: _days_ago(182)),
    "last_1year": ("the last year", lambda: _days_ago(365)),
}


def resolve_relative(key: str) -> TimeRange | None:
    entry = RELATIVE_RANGES.get(key)
    if not entry:
        return None
    label, start = entry
    return TimeRange(fromIso=start(), toIso=FOREVER, label=label)


def resolve_month(token: str) -> TimeRange | None:
    match = re.fullmatch(r"(\d{4})[-_](\d{2})", token)
    if not match:
        return None
    year, month = int(match.group(1)), int(match.group(2))
    if month < 1 or month > 12:
        return None
    start = datetime(year, month, 1, tzinfo=timezone.utc)
    last_day = calendar.monthrange(year, month)[1]
    end = datetime(year, month, last_day, 23, 59, 59, 999000, tzinfo=timezone.utc)
    return TimeRange(fromIso=to_iso(start), toIso=to_iso(end), label=start.strftime("%B %Y"))


def resolve_month_span(token: str) -> TimeRange | None:
    match = re.fullmatch(r"(\d{4}[-_]\d{2})_to_(\d{4}[-_]\d{2})", token)
    if not match:
        return None
    start = resolve_month(match.group(1))
    end = resolve_month(match.group(2))
    if not start or not end or start.fromIso > end.toIso:
        return None
    return TimeRange(fromIso=start.fromIso, toIso=end.toIso, label=f"{start.label} to {end.label}")


def resolve_range(token: str) -> TimeRange | None:
    return resolve_relative(token) or resolve_month_span(token) or resolve_month(token)

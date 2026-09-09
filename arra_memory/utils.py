"""Shared helpers. No database access, no HTTP — pure enough to test without a server."""

from __future__ import annotations

import base64
import hashlib
import hmac
import html
import json
import re
import secrets
import time
from datetime import datetime, timezone
from urllib.parse import quote, urlsplit, urlunsplit

# ── time ──────────────────────────────────────────────────────────────────────


def now_seconds() -> int:
    return int(time.time())


def now_iso() -> str:
    """ISO-8601 UTC with millisecond precision and a Z suffix — sorts lexicographically."""
    return to_iso(datetime.now(timezone.utc))


def to_iso(dt: datetime) -> str:
    dt = dt.astimezone(timezone.utc)
    return dt.strftime("%Y-%m-%dT%H:%M:%S.") + f"{dt.microsecond // 1000:03d}Z"


def parse_iso(value: str) -> datetime | None:
    raw = (value or "").strip()
    if not raw:
        return None
    try:
        if re.fullmatch(r"\d{4}-\d{2}-\d{2}", raw):
            return datetime.strptime(raw, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        if raw.endswith("Z"):
            raw = raw[:-1] + "+00:00"
        parsed = datetime.fromisoformat(raw)
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed
    except ValueError:
        return None


# ── memory field normalisation ────────────────────────────────────────────────

SUGGESTED_KINDS: tuple[str, ...] = ("learn", "enlighten", "retro", "artifact")

_WS = re.compile(r"\s+")


def normalize_tags(tags: list[str] | None) -> list[str]:
    if not tags:
        return []
    unique: dict[str, str] = {}
    for raw in tags:
        if not isinstance(raw, str):
            continue
        tag = _WS.sub(" ", raw.strip())[:40]
        if not tag:
            continue
        key = tag.lower()
        if key not in unique:
            unique[key] = tag
        if len(unique) == 10:
            break
    return list(unique.values())


def make_memory_title(content: str) -> str:
    first = content.split("\n", 1)[0].rstrip("\r")
    first = re.sub(r"^#+\s*", "", first)
    first = _WS.sub(" ", first).strip()
    if not first:
        return "Untitled memory"
    return f"{first[:77]}…" if len(first) > 80 else first


def normalize_text(value: str | None, name: str, maximum: int) -> str:
    text = (value or "").strip()
    if not text:
        raise ValueError(f"{name} is required")
    if len(text) > maximum:
        raise ValueError(f"{name} must be {maximum} characters or fewer")
    return text


def normalize_kind(value: str | None) -> str:
    kind = _WS.sub(" ", (value or "").strip()).lower()[:40]
    return kind or "learn"


read_kind = normalize_kind


def normalize_importance(value) -> int:
    if value is None:
        return 3
    if isinstance(value, bool) or not isinstance(value, (int, float)) or int(value) != value:
        raise ValueError("importance must be an integer from 1 to 5")
    importance = int(value)
    if importance < 1 or importance > 5:
        raise ValueError("importance must be an integer from 1 to 5")
    return importance


def normalize_source(value: str | None) -> str:
    source = (value or "").strip() or "web"
    if len(source) > 64:
        raise ValueError("source must be 64 characters or fewer")
    return source


def normalize_project(value: str | None) -> str:
    return _WS.sub(" ", (value or "").strip())[:120]


def normalize_workspace(value: str | None) -> str:
    return _WS.sub(" ", (value or "").strip())[:120]


def normalize_url(value: str | None) -> str:
    """
    A reference URL. Only http(s) is accepted — a memory is stored data that a UI
    renders as a link, and `javascript:` there is a scripting hole.

    The result is normalised the way a browser's URL parser would leave it, because
    that is what the original stored and what any client comparing two URLs will
    expect: lowercased scheme and host, a default port dropped, an empty path
    written as "/", and a space in the path percent-encoded rather than left to sit
    raw inside an href. Existing escapes survive — "%" is safe, so "%20" is not
    re-encoded into "%2520".
    """
    raw = (value or "").strip()
    if not raw:
        return ""
    if len(raw) > 2048:
        raise ValueError("url must be 2048 characters or fewer")
    parts = urlsplit(raw)
    scheme = parts.scheme.lower()
    if not scheme or not parts.netloc:
        raise ValueError("url must be a valid absolute URL")
    if scheme not in ("http", "https"):
        raise ValueError("url must use http or https")

    netloc = parts.netloc
    try:
        port = parts.port
    except ValueError as error:  # a non-numeric port never reaches a browser either
        raise ValueError("url must be a valid absolute URL") from error
    host = (parts.hostname or "").lower()
    if not host:
        raise ValueError("url must be a valid absolute URL")
    userinfo = netloc.rsplit("@", 1)[0] + "@" if "@" in netloc else ""
    netloc = userinfo + host
    if port is not None and port != (443 if scheme == "https" else 80):
        netloc += f":{port}"

    _SAFE = "/%:@!$&'()*+,;=~-._"
    path = quote(parts.path, safe=_SAFE) or "/"
    query = quote(parts.query, safe=_SAFE + "?")
    fragment = quote(parts.fragment, safe=_SAFE + "?")
    return urlunsplit((scheme, netloc, path, query, fragment))


def normalize_created_by(value: str | None) -> str:
    return (value or "").strip()[:64]


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", value.lower())
    return slug.strip("_")[:40]


def clamp_limit(value, fallback: int = 30) -> int:
    if value is None or isinstance(value, bool):
        return fallback
    try:
        number = int(value)
    except (TypeError, ValueError):
        return fallback
    return max(1, min(100, number))


def parse_tags(value: str | None) -> list[str]:
    try:
        parsed = json.loads(value or "[]")
        return [t for t in parsed if isinstance(t, str)] if isinstance(parsed, list) else []
    except ValueError:
        return []


# ── encoding ──────────────────────────────────────────────────────────────────


def base64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode("ascii").rstrip("=")


def base64url_decode(value: str) -> bytes:
    padding = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(value + padding)


def escape_html(value: str) -> str:
    return html.escape(value, quote=True)


# ── secrets ───────────────────────────────────────────────────────────────────


def timing_safe_equal(a: str, b: str) -> bool:
    """Compares digests of equal length — no early exit, no length leak."""
    da = hashlib.sha256(a.encode("utf-8")).digest()
    db = hashlib.sha256(b.encode("utf-8")).digest()
    return hmac.compare_digest(da, db)


def random_token(nbytes: int = 32) -> str:
    return base64url_encode(secrets.token_bytes(nbytes))


def sha256_base64url(value: str) -> str:
    return base64url_encode(hashlib.sha256(value.encode("utf-8")).digest())


# ── cookies ───────────────────────────────────────────────────────────────────


def read_cookie(header: str | None, name: str) -> str | None:
    if not header:
        return None
    for part in header.split(";"):
        key, _, rest = part.strip().partition("=")
        if key == name:
            return rest or None
    return None

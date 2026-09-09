"""
The owner's browser session.

A signed token, not a JWT:  <issuedAtSeconds>.<sessionId>.<HMAC-SHA256>
The signature proves it was minted here; the KV row proves it has not been
revoked since. Logout deletes the row and the still-valid signature stops working.
"""

from __future__ import annotations

import hashlib
import hmac

from .kv import kv_delete, kv_get, kv_put
from .utils import base64url_encode, now_seconds, random_token, timing_safe_equal

COOKIE_NAME = "arra_memory_session"
MAX_AGE_SECONDS = 12 * 60 * 60
CLOCK_SKEW_SECONDS = 60
MESSAGE_PREFIX = "arra-memory-owner-session-v2"


def _key(session_id: str) -> str:
    return f"owner-session:{session_id}"


def _sign(secret: str, message: str) -> str:
    return base64url_encode(hmac.new(secret.encode("utf-8"), message.encode("utf-8"), hashlib.sha256).digest())


def issue_session(secret: str) -> str:
    issued_at = now_seconds()
    session_id = random_token(18)
    signature = _sign(secret, f"{MESSAGE_PREFIX}:{issued_at}:{session_id}")
    kv_put(_key(session_id), str(issued_at), expiration_ttl=MAX_AGE_SECONDS + CLOCK_SKEW_SECONDS)
    return f"{issued_at}.{session_id}.{signature}"


def verify_session(secret: str, token: str | None) -> bool:
    if not token:
        return False
    parts = token.split(".")
    if len(parts) != 3:
        return False
    issued_raw, session_id, signature = parts
    try:
        issued_at = int(issued_raw)
    except ValueError:
        return False
    age = now_seconds() - issued_at
    if age < -CLOCK_SKEW_SECONDS or age > MAX_AGE_SECONDS:
        return False
    expected = _sign(secret, f"{MESSAGE_PREFIX}:{issued_at}:{session_id}")
    if not timing_safe_equal(signature, expected):
        return False
    return kv_get(_key(session_id)) is not None


def revoke_session(token: str | None) -> None:
    if not token:
        return
    parts = token.split(".")
    if len(parts) >= 2 and parts[1]:
        kv_delete(_key(parts[1]))


def session_cookie(value: str, secure: bool) -> str:
    flags = [f"{COOKIE_NAME}={value}", "Path=/", "HttpOnly", "SameSite=Lax", f"Max-Age={MAX_AGE_SECONDS}"]
    if secure:
        flags.append("Secure")
    return "; ".join(flags)


def clear_session_cookie(secure: bool) -> str:
    flags = [f"{COOKIE_NAME}=", "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"]
    if secure:
        flags.append("Secure")
    return "; ".join(flags)

"""
The key/value store: get, put-with-TTL, delete. Expiry is enforced in the read
query, so an expired row is invisible the instant it lapses whether or not
anything has swept it.
"""

from __future__ import annotations

from .db import db
from .models import KVRow, Q
from .utils import now_seconds


def _live(now: int) -> str:
    return Q.or_(Q.is_null("expires_at"), f"expires_at > {now}")


def kv_get(key: str) -> str | None:
    row = db().kv.first(Q.and_(Q.eq("key", key), _live(now_seconds())))
    return row.value if row else None


def kv_put(key: str, value: str, expiration_ttl: int | None = None) -> None:
    expires_at = now_seconds() + expiration_ttl if expiration_ttl else None
    db().kv.upsert(KVRow(key=key, value=value, expires_at=expires_at))


def kv_delete(key: str) -> None:
    db().kv.delete(Q.eq("key", key))


def kv_sweep() -> int:
    return db().kv.delete(Q.and_(Q.not_null("expires_at"), f"expires_at <= {now_seconds()}"))

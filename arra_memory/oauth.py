"""
A minimal OAuth 2.1 authorization server — enough for an MCP client, no more.

Dynamic Client Registration (RFC 7591), Authorization Code + PKCE S256 only
(RFC 7636), discovery at /.well-known/oauth-authorization-server (RFC 8414).
Deliberately absent: refresh tokens, client secrets, multi-user accounts.
"""

from __future__ import annotations

import json
from dataclasses import dataclass

from .db import db
from .models import OAuthClientRow, OAuthCodeRow, OAuthTokenRow, Q
from .utils import now_iso, now_seconds, random_token, sha256_base64url

CODE_TTL_SECONDS = 10 * 60
TOKEN_TTL_SECONDS = 30 * 24 * 60 * 60


@dataclass
class RegisteredClient:
    client_id: str
    client_name: str | None
    redirect_uris: list[str]


@dataclass
class TokenInfo:
    token: str
    client_id: str
    scope: str


def authorization_server_metadata(origin: str) -> dict:
    return {
        "issuer": origin,
        "authorization_endpoint": f"{origin}/authorize",
        "token_endpoint": f"{origin}/oauth/token",
        "registration_endpoint": f"{origin}/oauth/register",
        "response_types_supported": ["code"],
        "grant_types_supported": ["authorization_code"],
        "code_challenge_methods_supported": ["S256"],
        "token_endpoint_auth_methods_supported": ["none"],
        "scopes_supported": ["memory:read", "memory:write"],
    }


def register_client(body: dict) -> RegisteredClient:
    raw = body.get("redirect_uris") if isinstance(body, dict) else None
    redirect_uris = [u for u in (raw or []) if isinstance(u, str) and u]
    if not redirect_uris:
        raise ValueError("redirect_uris is required")
    name = body.get("client_name")
    client_name = str(name)[:120] if isinstance(name, str) and name else None
    client_id = random_token(16)
    db().oauth_clients.insert(
        OAuthClientRow(
            client_id=client_id,
            client_name=client_name,
            redirect_uris=json.dumps(redirect_uris),
            created_at=now_iso(),
        )
    )
    return RegisteredClient(client_id, client_name, redirect_uris)


def get_client(client_id: str) -> RegisteredClient | None:
    if not client_id:
        return None
    row = db().oauth_clients.get(client_id)
    if not row:
        return None
    try:
        parsed = json.loads(row.redirect_uris)
        uris = [u for u in parsed if isinstance(u, str)] if isinstance(parsed, list) else []
    except ValueError:
        uris = []
    return RegisteredClient(row.client_id, row.client_name, uris)


def is_registered_redirect(client: RegisteredClient, redirect_uri: str) -> bool:
    """Exact match only — prefix matching is the classic OAuth open redirect."""
    return redirect_uri in client.redirect_uris


def issue_code(*, client_id: str, redirect_uri: str, code_challenge: str, code_challenge_method: str, scope: str) -> str:
    if code_challenge_method != "S256":
        raise ValueError("code_challenge_method must be S256")
    if not code_challenge:
        raise ValueError("code_challenge is required")
    code = random_token(32)
    db().oauth_codes.insert(
        OAuthCodeRow(
            code=code,
            client_id=client_id,
            redirect_uri=redirect_uri,
            code_challenge=code_challenge,
            code_challenge_method=code_challenge_method,
            scope=scope,
            expires_at=now_seconds() + CODE_TTL_SECONDS,
        )
    )
    return code


def exchange_code(*, code: str, client_id: str, redirect_uri: str, code_verifier: str) -> dict:
    """The code is burned before anything is checked: single-use, whatever the outcome."""
    row = db().oauth_codes.first(Q.and_(Q.eq("code", code), f"expires_at > {now_seconds()}")) if code else None
    if not row:
        raise ValueError("invalid_grant")
    db().oauth_codes.delete(Q.eq("code", code))
    if row.client_id != client_id or row.redirect_uri != redirect_uri:
        raise ValueError("invalid_grant")
    if sha256_base64url(code_verifier) != row.code_challenge:
        raise ValueError("invalid_grant")
    access_token = random_token(32)
    db().oauth_tokens.insert(
        OAuthTokenRow(
            token=access_token,
            client_id=row.client_id,
            scope=row.scope,
            created_at=now_iso(),
            expires_at=now_seconds() + TOKEN_TTL_SECONDS,
        )
    )
    return {"accessToken": access_token, "scope": row.scope, "expiresIn": TOKEN_TTL_SECONDS}


def verify_bearer(header: str | None) -> TokenInfo | None:
    if not header or not header.startswith("Bearer "):
        return None
    token = header[7:].strip()
    if not token:
        return None
    row = db().oauth_tokens.first(
        Q.and_(Q.eq("token", token), Q.or_(Q.is_null("expires_at"), f"expires_at > {now_seconds()}"))
    )
    return TokenInfo(row.token, row.client_id, row.scope) if row else None


def revoke_token(token: str) -> None:
    db().oauth_tokens.delete(Q.eq("token", token))


def sweep_expired() -> None:
    now = now_seconds()
    db().oauth_codes.delete(f"expires_at <= {now}")
    db().oauth_tokens.delete(Q.and_(Q.not_null("expires_at"), f"expires_at <= {now}"))


def list_clients() -> list[dict]:
    """Every registered client with its live-token count — the "who has access" view."""
    now = now_seconds()
    tokens = db().oauth_tokens.rows(Q.or_(Q.is_null("expires_at"), f"expires_at > {now}"))
    by_client: dict[str, list[dict]] = {}
    for t in tokens:
        by_client.setdefault(t["client_id"], []).append(t)
    clients = sorted(db().oauth_clients.rows(), key=lambda c: c["created_at"], reverse=True)
    out = []
    for c in clients:
        mine = by_client.get(c["client_id"], [])
        out.append(
            {
                "clientId": c["client_id"],
                "clientName": c["client_name"] or None,
                "createdAt": c["created_at"],
                "activeTokens": len(mine),
                "lastTokenAt": max((t["created_at"] for t in mine), default=None),
                "scope": max((t["scope"] for t in mine), default=None) or None,
            }
        )
    return out


def revoke_client(client_id: str) -> None:
    """Tokens and pending codes die; the registration row stays as the record."""
    db().oauth_tokens.delete(Q.eq("client_id", client_id))
    db().oauth_codes.delete(Q.eq("client_id", client_id))

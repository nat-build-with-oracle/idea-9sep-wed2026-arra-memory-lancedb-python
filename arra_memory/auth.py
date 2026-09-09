"""
One gate, three keys: owner-session (cookie), api-token (static bearer), oauth
(bearer minted by the flow in oauth.py). All three land on the same corpus with
the same rights.
"""

from __future__ import annotations

from dataclasses import dataclass

from .oauth import verify_bearer
from .session import COOKIE_NAME, verify_session
from .utils import read_cookie, timing_safe_equal


@dataclass
class AuthResult:
    ok: bool
    method: str | None = None
    client_id: str | None = None
    scope: str | None = None


@dataclass
class AuthConfig:
    owner_passphrase: str
    api_token: str | None = None


DENIED = AuthResult(ok=False)


def authenticate(headers, config: AuthConfig) -> AuthResult:
    """`headers` is any mapping with case-insensitive `.get` (Starlette's Headers)."""
    authorization = headers.get("authorization")
    if authorization and authorization.startswith("Bearer "):
        presented = authorization[7:].strip()
        if config.api_token and timing_safe_equal(presented, config.api_token):
            return AuthResult(ok=True, method="api-token")
        token = verify_bearer(authorization)
        if token:
            return AuthResult(ok=True, method="oauth", client_id=token.client_id, scope=token.scope)
        return DENIED
    cookie = read_cookie(headers.get("cookie"), COOKIE_NAME)
    if verify_session(config.owner_passphrase, cookie):
        return AuthResult(ok=True, method="owner-session")
    return DENIED


def unauthorized_headers(origin: str) -> dict[str, str]:
    return {
        "www-authenticate": (
            'Bearer realm="OAuth", '
            f'resource_metadata="{origin}/.well-known/oauth-protected-resource/mcp", '
            'error="invalid_token", '
            'error_description="Missing or invalid access token"'
        ),
        "access-control-allow-origin": "*",
        "access-control-expose-headers": "www-authenticate",
    }

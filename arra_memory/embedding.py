"""
Semantic search, via an Ollama server you already run.

Embeddings are OPTIONAL and always best-effort: no server, or an unreachable
one, and the memory is still written and search still works by keyword. bge-m3
is the default because it is genuinely multilingual — an English query finds a
Thai memory.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol

import httpx

from . import config


class EmbeddingError(Exception):
    def __init__(self, message: str, reason: str):
        super().__init__(message)
        self.reason = reason


class EmbeddingProvider(Protocol):
    model: str
    dimensions: int

    def embed(self, texts: list[str]) -> list[list[float]]: ...


@dataclass
class OllamaProvider:
    base_url: str
    model: str
    dimensions: int
    timeout_seconds: float = 60.0

    def embed(self, texts: list[str]) -> list[list[float]]:
        if not texts:
            return []
        base = self.base_url.rstrip("/")
        try:
            response = httpx.post(
                f"{base}/api/embed",
                json={"model": self.model, "input": texts},
                timeout=self.timeout_seconds,
            )
        except httpx.HTTPError as error:
            raise EmbeddingError(f"embedding provider unreachable: {error}", "provider-unreachable") from error
        if response.status_code >= 400:
            raise EmbeddingError(f"embedding provider returned {response.status_code}", "provider-error")
        try:
            body = response.json()
        except ValueError as error:
            raise EmbeddingError("embedding provider returned an unusable shape", "bad-response") from error
        embeddings = body.get("embeddings") if isinstance(body, dict) else None
        if not isinstance(embeddings, list) or len(embeddings) != len(texts):
            raise EmbeddingError("embedding provider returned an unusable shape", "bad-response")
        for vector in embeddings:
            if not isinstance(vector, list) or len(vector) != self.dimensions:
                got = len(vector) if isinstance(vector, list) else None
                raise EmbeddingError(f"expected {self.dimensions}-dimension vectors, got {got}", "dimension-mismatch")
        return [[float(x) if x == x and abs(x) != float("inf") else 0.0 for x in vector] for vector in embeddings]


def provider_from_settings() -> EmbeddingProvider | None:
    """A blank URL is the off switch, not an error."""
    base_url = config.setting("ollama_url")
    if not base_url:
        return None
    try:
        dimensions = int(config.setting("embedding_dimensions") or 1024)
    except ValueError:
        dimensions = 1024
    return OllamaProvider(
        base_url=base_url,
        model=config.setting("embedding_model") or "bge-m3",
        dimensions=dimensions,
    )

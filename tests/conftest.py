"""
Every test gets its own DATA_DIR and its own LanceDB directory.

The module-level singletons (`db()`, the embedding provider, the settings file)
are reset between tests rather than shared: the TypeScript lineage this is
ported from was bitten by exactly that — two test files in one process sharing
one database no matter what their env said.
"""

from __future__ import annotations

import json
import os

import pytest


@pytest.fixture(autouse=True)
def isolated_data_dir(tmp_path, monkeypatch):
    from arra_memory import config, db as db_module, memory

    monkeypatch.setenv("DATA_DIR", str(tmp_path / "data"))
    monkeypatch.delenv("SETTINGS_PATH", raising=False)
    monkeypatch.delenv("LANCEDB_DIR", raising=False)
    monkeypatch.delenv("MANAGED_BY", raising=False)
    for key in config.SETTING_KEYS:
        monkeypatch.delenv(key.upper(), raising=False)
    monkeypatch.setenv("OWNER_PASSPHRASE", "test-owner-passphrase")

    config.reload()
    db_module.reset()
    memory.reset_provider()
    yield
    db_module.reset()
    memory.reset_provider()


@pytest.fixture
def settings_file(monkeypatch, tmp_path):
    def write(values: dict):
        from arra_memory import config

        path = tmp_path / "settings.json"
        path.write_text(json.dumps(values), "utf-8")
        monkeypatch.setenv("SETTINGS_PATH", str(path))
        config.reload()
        return path

    return write


class FakeEmbedder:
    """
    Deliberately NOT semantic: it maps exact strings to hand-placed unit vectors,
    so a test can assert that a query sharing ZERO words with a memory still
    finds it — the property that distinguishes recall by meaning from by keyword.
    """

    def __init__(self, dimensions: int = 32, meaning: dict[str, int] | None = None):
        self.model = "test-model"
        self.dimensions = dimensions
        self.meaning = meaning or {}
        self.calls = 0
        self.last: list[str] = []
        self.down = False

    def axis(self, n: int) -> list[float]:
        vector = [0.0] * self.dimensions
        vector[n % self.dimensions] = 1.0
        return vector

    def embed(self, texts: list[str]) -> list[list[float]]:
        from arra_memory.embedding import EmbeddingError

        if self.down:
            raise EmbeddingError("embedding provider unreachable: test", "provider-unreachable")
        self.calls += 1
        self.last = list(texts)
        return [self.axis(self.meaning.get(t, 7)) for t in texts]


@pytest.fixture
def embedder(monkeypatch):
    def install(meaning: dict[str, int] | None = None, dimensions: int = 32) -> FakeEmbedder:
        from arra_memory import config, db as db_module, memory

        monkeypatch.setenv("EMBEDDING_DIMENSIONS", str(dimensions))
        monkeypatch.setenv("EMBEDDING_MODEL", "test-model")
        monkeypatch.setenv("OLLAMA_URL", "http://embedder.invalid")
        config.reload()
        db_module.reset()
        fake = FakeEmbedder(dimensions=dimensions, meaning=meaning)
        memory.set_provider(fake)
        return fake

    return install

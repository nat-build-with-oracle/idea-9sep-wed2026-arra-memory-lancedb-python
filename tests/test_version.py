"""
One version, in three files that must agree.

`pyproject.toml` is what pip installs, `arra_memory/__init__.py` is the fallback
when running from a checkout, and `arra-memory-lancedb/config.yaml` is what
Supervisor compares to decide an update exists. They drifted the first time it
mattered: the add-on was updated to 0.2.0 on a live machine and `/api/health`
went on reporting 0.1.0 — which is the number someone reads to confirm the deploy
landed, so the honest update looked like a failed one.
"""

from __future__ import annotations

import pathlib
import re
import tomllib

REPO = pathlib.Path(__file__).resolve().parent.parent


def test_the_three_declared_versions_agree():
    pyproject = tomllib.loads((REPO / "pyproject.toml").read_text())["project"]["version"]

    source = (REPO / "arra_memory" / "__init__.py").read_text()
    fallback = re.search(r'VERSION = "([^"]+)"', source).group(1)

    config = (REPO / "arra-memory-lancedb" / "config.yaml").read_text()
    addon = re.search(r'^version:\s*"([^"]+)"', config, re.MULTILINE).group(1)

    assert pyproject == fallback == addon, (
        f"versions disagree — pyproject={pyproject}, arra_memory/__init__.py={fallback}, "
        f"config.yaml={addon}. Supervisor compares config.yaml to decide an update exists, "
        f"and /api/health reports the package version to confirm one landed."
    )

"""
Every file must parse on the OLDEST Python this package claims to support.

`pyproject.toml` declares `requires-python = ">=3.11"`, and the Home Assistant
Debian base the add-on runs on ships exactly 3.11 — so the floor is not
theoretical, it is the deployment target.

This exists because of a real failure. Three f-strings nested the same quote
inside the expression:

    f'No memories matched{f" ...{args['query']}" if args.get("query") else ""}'

which is PEP 701 and legal only from 3.12. The development venv is 3.12, so
every test passed and the whole suite was green; the add-on image then failed at
IMPORT time on 3.11 with `SyntaxError: f-string: unmatched '['`. A syntax error
cannot be caught by a test that has already imported the module — the file has
to be compiled by an interpreter that old.

`ast.parse(..., feature_version=(3, 11))` does NOT catch it, checked: the
tokenizer changed in 3.12 and feature_version does not downgrade the tokenizer.
Only a real 3.11 interpreter will, so this finds one and skips LOUDLY when there
is none, rather than passing on a machine that never ran the interesting half.
"""

from __future__ import annotations

import pathlib
import shutil
import subprocess
import sys
import tomllib

import pytest

REPO = pathlib.Path(__file__).resolve().parent.parent


def declared_floor() -> tuple[int, int]:
    data = tomllib.loads((REPO / "pyproject.toml").read_text())
    spec = data["project"]["requires-python"]
    major, _, minor = spec.removeprefix(">=").strip().partition(".")
    return int(major), int(minor)


def find_interpreter(version: tuple[int, int]) -> str | None:
    label = f"{version[0]}.{version[1]}"
    if sys.version_info[:2] == version:
        return sys.executable
    found = shutil.which(f"python{label}")
    if found:
        return found
    if shutil.which("uv"):
        probe = subprocess.run(["uv", "python", "find", label], capture_output=True, text=True)
        if probe.returncode == 0 and probe.stdout.strip():
            return probe.stdout.strip()
    return None


FLOOR = declared_floor()
INTERPRETER = find_interpreter(FLOOR)


@pytest.mark.skipif(
    INTERPRETER is None,
    reason=f"no Python {FLOOR[0]}.{FLOOR[1]} available — install it (uv python install {FLOOR[0]}.{FLOOR[1]}) "
    "or this check does NOT run",
)
def test_every_source_file_parses_on_the_declared_python_floor():
    sources = [
        p
        for p in REPO.rglob("*.py")
        if not any(part in {".venv", "dist", "node_modules", "build", ".git"} for part in p.parts)
    ]
    assert sources, "found no Python files to check"

    script = (
        "import sys\n"
        "bad = []\n"
        "for path in sys.argv[1:]:\n"
        "    try:\n"
        "        compile(open(path, encoding='utf-8').read(), path, 'exec')\n"
        "    except SyntaxError as e:\n"
        "        bad.append(f'{path}:{e.lineno}: {e.msg}')\n"
        "print('\\n'.join(bad))\n"
        "sys.exit(1 if bad else 0)\n"
    )
    result = subprocess.run(
        [INTERPRETER, "-c", script, *[str(p) for p in sources]], capture_output=True, text=True
    )
    assert result.returncode == 0, (
        f"these files do not parse on Python {FLOOR[0]}.{FLOOR[1]}, which pyproject declares as the "
        f"floor and which the add-on's base image ships:\n{result.stdout}"
    )

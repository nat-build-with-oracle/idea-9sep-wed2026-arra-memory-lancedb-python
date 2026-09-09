#!/usr/bin/env bash
# Assemble the self-contained add-on folder Home Assistant will build.
#
# Supervisor builds an add-on with the ADD-ON DIRECTORY as the Docker context,
# not the repository root — so the Python package has to sit inside it. This
# script is the only place that layout is defined, and the local verification
# build uses its output rather than a repo-root build, so what is tested here is
# byte-for-byte what HA builds there.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
repo="$(cd "$here/.." && pwd)"
out="${1:-$repo/dist/arra-memory-lancedb}"

rm -rf "$out"
mkdir -p "$out"
cp "$here/config.yaml" "$here/build.yaml" "$here/Dockerfile" "$here/run.sh" "$out/"
cp "$repo/pyproject.toml" "$repo/README.md" "$out/"
# The package, INCLUDING arra_memory/static — the built UI must ship in the
# image, or the add-on is a working API behind a blank page.
rsync -a --exclude '__pycache__' --exclude '*.pyc' "$repo/arra_memory" "$out/"

test -s "$out/arra_memory/static/main.js" || { echo "✗ arra_memory/static/main.js missing — run 'cd ui && bun run build' first" >&2; exit 1; }
test -s "$out/arra_memory/static/app.css" || { echo "✗ arra_memory/static/app.css missing" >&2; exit 1; }
chmod 0755 "$out/run.sh"
echo "packaged → $out"

# arra-memory-lancedb — a durable memory corpus on LanceDB
# `just` with no arguments lists everything.

default:
    @just --list

# Create the venv and install the package with its test extras.
install:
    uv venv
    uv pip install -e ".[dev]"

# Serve the UI, the REST API, and /mcp. OWNER_PASSPHRASE must be set.
dev port="8099":
    .venv/bin/python -m arra_memory --port {{port}}

# The full suite. Fleet tests need mosquitto and skip loudly without it.
test *ARGS:
    .venv/bin/python -m pytest tests/ -q {{ARGS}}

# Rebuild the React bundle into arra_memory/static. Needs bun; only after editing ui/.
ui:
    cd ui && bun install && bun run build

# Typecheck the UI against the API shapes it expects.
ui-check:
    cd ui && bun run typecheck

# Is it alive, and which build is it?
health host="127.0.0.1:8099":
    curl -fsS http://{{host}}/api/health | python3 -m json.tool

# What a remote MCP client actually sent, minus its credential. Needs a session or a token.
mcp-log host="127.0.0.1:8099" token="":
    curl -fsS -H "Authorization: Bearer {{token}}" http://{{host}}/api/debug/mcp-log | python3 -m json.tool

# Embed whatever is missing a vector — after switching models, or after an Ollama outage.
backfill host="127.0.0.1:8099" token="" limit="100":
    curl -fsS -X POST -H "Authorization: Bearer {{token}}" -H 'content-type: application/json' \
      -d '{"limit": {{limit}}}' http://{{host}}/api/index/backfill

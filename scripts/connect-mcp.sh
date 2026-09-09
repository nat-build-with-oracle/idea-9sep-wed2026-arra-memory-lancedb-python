#!/usr/bin/env sh
set -eu

usage() {
  cat <<'USAGE'
Usage: scripts/connect-mcp.sh <codex|claude> <https://your-host/mcp> [name]

Registers a remote Arra Memory MCP server, then starts OAuth where supported.
The URL is public; never pass an owner passphrase or an API token here.
USAGE
}

if [ "${1:-}" = "--help" ] || [ "$#" -lt 2 ] || [ "$#" -gt 3 ]; then
  usage
  [ "${1:-}" = "--help" ] && exit 0
  exit 64
fi

client=$1
url=$2
name=${3:-arra-memory}

case "$url" in
  https://*/mcp) ;;
  # http is allowed only on the loopback address: OAuth over plain http anywhere
  # else would put the code and the token on the wire in clear.
  http://127.0.0.1:*/mcp | http://localhost:*/mcp) ;;
  *) echo "MCP URL must end in /mcp, and use https unless it is on 127.0.0.1" >&2; exit 64 ;;
esac

case "$client" in
  codex)
    codex mcp add "$name" --url "$url"
    codex mcp login "$name"
    ;;
  claude)
    claude mcp add --transport http --scope user "$name" "$url"
    printf '\nOpen Claude Code, run /mcp, select %s, and complete OAuth in your browser.\n' "$name"
    ;;
  *) usage; exit 64 ;;
esac

# Claude Code configuration

Replace `memory.example.com` with wherever you are serving this.

```bash
claude mcp add --transport http --scope user arra-memory \
  https://memory.example.com/mcp
```

Then start Claude Code and run:

```text
/mcp
```

Select `arra-memory` and complete the browser OAuth approval — the page asks for your owner
passphrase, and that is the whole authorization decision. Verify it is configured:

```bash
claude mcp get arra-memory
claude mcp list
```

`--scope user` makes this connection available in every local project. Use `--scope project` only
when you deliberately want a shared `.mcp.json`; do not commit a personal deployment URL into a
public repository.

## The static-token alternative

Claude Code *can* send a static header, so it does not have to use OAuth. Set `API_TOKEN` on the
server and skip the browser entirely:

```bash
claude mcp add --transport http --scope user arra-memory \
  https://memory.example.com/mcp \
  --header "Authorization: Bearer YOUR_API_TOKEN"
```

This is the one credential the settings page will show you again, because pasting it into a config
file is its whole purpose. Regenerating it there invalidates the old one at the next restart.
claude.ai connectors cannot do this — a browser connector has no way to send a static header, which
is why the OAuth flow exists at all.

## Running against a local server

The connect script accepts a loopback URL, so a server you started on this machine is one command
away:

```bash
scripts/connect-mcp.sh claude http://127.0.0.1:8099/mcp arra-memory-local
```

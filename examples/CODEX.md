# Codex configuration

Replace `memory.example.com` with wherever you are serving this.

```bash
codex mcp add arra-memory \
  --url https://memory.example.com/mcp

codex mcp login arra-memory
```

The second command starts the OAuth authorization flow. Complete it in the browser — the approval
page asks for your owner passphrase — then verify:

```bash
codex mcp get arra-memory
codex mcp list
```

Codex stores the remote server configuration in the current user's Codex settings. No owner
passphrase belongs in that file: OAuth mints a token scoped to this client, and revoking it from
the settings page kills it on the client's next request.

## Verifying the connection actually works

A successful registration proves authorization only. Prove the corpus is shared by writing in one
client and reading in the other:

```text
codex:  remember "the connection is real" with tag proof
claude: recall_memories "the connection is real"
```

If `tools/list` comes back empty while the connector reports itself connected, the cause is almost
always protocol negotiation — check `GET /api/debug/mcp-log` on the server, which records what the
client actually sent, minus its credential.

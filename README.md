# Arra Memory — LanceDB, in Python

A private, durable memory corpus that a browser and Claude share. One process serves the web UI,
a REST API, and a remote **MCP** endpoint that claude.ai can authorize over OAuth. Everything
lives in one **LanceDB** directory on your disk: the memories and their vectors, the key/value
store, the OAuth tables, and the search log.

This is a port of [`arra-memory-cloudflare-template`](https://github.com/Soul-Brews-Studio/arra-memory-cloudflare-template)
(Cloudflare Workers + Turso) and its Home Assistant descendant `arra-memory-haos` — the deployment
you may know as **thor-memory**. Same interface, same MCP tool surface, same UI, different engine
and a different language: **Python, with a small Pydantic ORM over LanceDB**.

```text
browser owner session ──┐
                        ├── one Python process ── LanceDB directory
Claude via OAuth + MCP ─┘         │                (memories + vectors + kv + oauth + search log)
                                  └── Ollama, optional, for embeddings
```

## Run it

```bash
uv venv && uv pip install -e ".[dev]"

# The passphrase is the only thing standing between your memories and anyone who reaches the URL.
export OWNER_PASSPHRASE="$(openssl rand -base64 32)"

# Optional: semantic search. Point at any Ollama you already run — it need not be this machine.
export OLLAMA_URL=http://127.0.0.1:11434
export EMBEDDING_MODEL=bge-m3
export EMBEDDING_DIMENSIONS=1024

arra-memory --port 8099            # or: python -m arra_memory --port 8099
```

Open <http://127.0.0.1:8099>, enter the passphrase, write a memory. The corpus is at
`./data/lancedb` (`DATA_DIR` moves it).

Rebuilding the UI needs [Bun](https://bun.sh), and only when you change `ui/`:

```bash
cd ui && bun install && bun run build      # → arra_memory/static/{main.js,app.css,index.html}
```

## Connect Claude

```bash
scripts/connect-mcp.sh claude https://memory.example.com/mcp   # then /mcp in Claude Code
scripts/connect-mcp.sh codex  https://memory.example.com/mcp
```

For claude.ai, add `https://your-host/mcp` under **Settings → Connectors** and complete the
approval page. Full reference: [`examples/CLAUDE_CODE.md`](examples/CLAUDE_CODE.md),
[`examples/CODEX.md`](examples/CODEX.md).

Three doors, all onto the same corpus with the same rights — they differ only in how a caller
proves it is the owner:

| Door | Who uses it | Why it exists |
| --- | --- | --- |
| owner session (cookie) | the web UI | a browser has one and cannot be trusted to hold a bearer token in script |
| static bearer (`API_TOKEN`) | curl, cron, Claude Code, Codex | clients that read a config file can send a static header |
| OAuth 2.1 + PKCE | claude.ai connectors | they **cannot** send a static header at all — this is their only door |

Publishing beyond your LAN is your own business: a reverse proxy or a tunnel that dials outward.
Set `PUBLIC_URL` when you do, or OAuth clients get callback URLs pointing at an address only you
can reach.

## Configuration

Every option is an environment variable, or a key in `<DATA_DIR>/settings.json` that the settings
page writes. **Environment wins**, so whatever pins a value stays authoritative; the file fills in
the rest. Set `MANAGED_BY=supervisor` and the settings page goes honestly read-only.

| Key | Default | What it does |
| --- | --- | --- |
| `OWNER_PASSPHRASE` | — | **Required.** Unlocks the UI and approves MCP clients. Blank refuses to start. |
| `API_TOKEN` | — | Optional static bearer for scripts. Blank disables that path entirely. |
| `PUBLIC_URL` | — | Absolute origin for OAuth URLs. Blank derives every URL from the request. |
| `INSTANCE_NAME` | `Arra Memory` | What this instance calls itself. Identity, never schema. |
| `OLLAMA_URL` | — | Blank = keyword search only. Set it and search also works by meaning. |
| `EMBEDDING_MODEL` | `bge-m3` | Multilingual on purpose — see below. |
| `EMBEDDING_DIMENSIONS` | `1024` | Must match the model. Fixed once the table exists. |
| `SEARCH_LOG` | `false` | Record every query and what it returned. Off by default, deliberately. |
| `GENERATED_TOOLS` | `false` | Turn each project and month into its own MCP tool. |
| `LANGUAGE` / `THEME` | `th` / `slate` | What a first visit looks like, not what anyone is stuck with. |
| `MQTT_URL`, `MQTT_USERNAME`, `MQTT_PASSWORD`, `MQTT_PREFIX` | — | The oracle fleet. Blank hides the three fleet tools rather than offering ones that always fail. |
| `DATA_DIR` | `./data` | The corpus, the settings file, everything durable. |

## What it does, and why it does it that way

**Search is hybrid, and it tells you which half actually ran.** `recall_memories` fuses a keyword
pass and a semantic pass with reciprocal rank fusion (k=60) — ranks, not raw scores, because BM25
and cosine distance are not on comparable scales. If embeddings are unavailable, `hybrid` degrades
to keyword **and says so** in `matchMode` and `fallback`; an explicit `semantic` request *fails*
instead, because someone who asked for meaning deserves to know it did not happen. An empty result
that came from a keyword scan is a much weaker signal than an empty hybrid one, and a model cannot
tell them apart unless the server says which it was.

**The full-text index is n-gram (trigram), not word-boundary.** Thai writes without spaces between
words, so a word-boundary tokenizer swallows an entire Thai sentence as one token and searching for
a word inside it returns nothing. Measured on this port: `ความจำ` inside
`ระบบความจำสำหรับผู้ช่วยเอไอ` returns the memory under n-gram, and would return nothing under the
default. The cost is honest — a bigger index, and queries under 3 characters cannot use it.

**`bge-m3` is the default embedding model because it is genuinely multilingual.** Measured on this
fleet's corpus, a Thai sentence scores 0.84 cosine against its own English translation and 0.32
against unrelated Thai — so an English question finds a Thai memory. Verified again here: *"how
does memory search work for a language with no spaces"* returns the Thai memory first. An
English-first model cannot do that.

**Embeddings are optional and always best-effort.** No server, unreachable, or a bad response, and
the memory is still written and search still works. A memory system that refuses to remember
because a side-car is down has its priorities backwards. Every write path embeds what it writes —
indexing lives inside `create_memory`/`update_memory`, not at the call sites, because in the
original a call site forgot and every memory written over MCP went in unvectorised with nothing
reporting a fault. Revising the title or body re-embeds; revising a tag does not.

**A vector-less memory is excluded from semantic results, never ranked last.** "Not indexed yet"
and "unrelated" are different facts, and conflating them would be a quiet lie.

**Workspace, project, agent, tag and kind are filters, not boundaries.** They are plain columns
with no registry beside them: a workspace exists the moment a memory names it and vanishes when
the last one leaves. Empty means *unset* and matches every filter, so nothing written before a
column existed becomes invisible. The vocabulary is open, so it drifts — `merge` is the repair,
and it renames rather than deletes, which makes it reversible by merging back.

**The MCP endpoint answers `Accept: text/event-stream` with SSE, and `GET /mcp` with 405.** Both
sound like trivia and neither is: given a plain JSON reply, claude.ai reports itself *connected*
and then surfaces no tools; and without the 405 the SPA catch-all hands a probing client an HTML
page with a 200. `initialize` echoes the client's `protocolVersion` when it can speak it — replying
with a version the client does not know is a silent, total failure.

**The search log is off by default**, and that is not timidity: what someone looked for is often
more revealing than what they wrote down. It stores result *ids*, never result *content* — the
memories are in the table next door, and copying their text would double the blast radius of a
leak for no added recall.

**The map is PCA, and it admits how lossy it is.** Points come from projecting the embeddings to
three dimensions; edges are mutual k-nearest-neighbours (k = √N, clamped) unioned with a maximum
spanning tree so no memory is ever an island. A `[[wiki link]]` someone actually wrote outranks an
inferred similarity for the same pair. The projection reports the fraction of variance it captured,
because two points sitting together might be far apart in the space this is a shadow of.

## The ORM

`arra_memory/models.py` is the whole data layer: one `LanceModel` per table, a typed `Table`
repository (`insert` / `upsert` / `update` / `delete` / `rows` / `find` / `count`), and `Q`, which
builds every filter string. `Q` is the only place a literal is ever quoted, and nothing else in the
codebase interpolates a value into a filter — the same discipline the original kept by putting
every SQL statement in one file.

```python
db().memories.rows(Q.and_(Q.in_("workspace", ["infra"]), Q.not_null("vector")), COLUMNS)
db().memories.update(Q.eq("id", memory_id), {"vector": vector, "embedding_model": model})
```

## Tests

```bash
.venv/bin/python -m pytest tests/ -q
```

Every test gets its own `DATA_DIR` and resets the module singletons, because the lineage this is
ported from was bitten by exactly that: two test files in one process sharing one database no
matter what their environment said. The fleet tests spawn a **real mosquitto** broker and skip
loudly when it is absent — a fake MQTT client would only prove our own mock behaves as we wrote it.
The interesting cases are the ones that were live bugs once: a memory found by meaning when it
shares no words with the query, a revision that re-embeds, a wrong PKCE verifier that cannot redeem
a code, an unregistered `redirect_uri` that fails on our own page instead of redirecting.

## Layout

```text
arra_memory/
  models.py     LanceModel schemas, the typed Table repository, and Q — the only quoting
  db.py         the LanceDB directory, the n-gram FTS index, background optimize
  memory.py     CRUD, search, facets, merge, embeddings, hybrid recall
  server.py     FastAPI: UI, REST, OAuth pages, /mcp
  mcp.py        the JSON-RPC tool surface, static and corpus-generated
  oauth.py      OAuth 2.1 + PKCE S256, DCR, no refresh tokens by design
  auth.py session.py kv.py tools.py searchlog.py digest.py timerange.py graph.py fleet.py
  static/       the built UI (generated — do not edit)
ui/             the React source, copied verbatim from arra-memory-haos
tests/
```

## Limits

- One owner, one passphrase, one corpus. No accounts, no sharing, no refresh tokens.
- LanceDB is a directory of files: back up `DATA_DIR`, and do not point two processes at it.
- Search is exact (brute-force) over the vectors. That is correct and fast at personal scale;
  a corpus in the millions wants an ANN index this does not build yet.
- Nothing here is published to the internet for you.

Licensed MIT. AI-generated per fleet Rule 6: assembled by an oracle, commissioned by Nat Weerawan.

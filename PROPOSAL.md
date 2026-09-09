# Proposal — arra-memory-lancedb-python

born 16:04 +07 from nat-build-with-oracle/9sep-wed2026-oracle · status: **built, same day**

## The idea

Take `arra-memory` — the Turso-backed memory corpus that serves a web UI and an MCP endpoint to
claude.ai, the one running on thor as `thor-memory` — and rebuild its engine on **LanceDB**, in
**Python**, with an ORM instead of hand-written SQL. Keep the interface exactly: same MCP tool
surface, same REST contract, and the same React UI, reused verbatim rather than rewritten.

## Why now

The fleet already had four versions of this idea — the Cloudflare template, the HAOS add-on, the
D1/Drizzle lab, and the Swift one — and every one of them stores vectors *beside* a relational
store rather than in a database that was built for vectors. LanceDB inverts that: the vector column
is native, the full-text index sits next to it, and there is no second system to keep in step. The
question worth answering in a day was whether the whole product survives that swap without the
interface moving at all.

Python because the ORM is the point. `sql.ts` is 707 lines of hand-written statements, and its own
header says keeping them in one file is what makes the surface auditable. A typed model layer makes
that structural instead of disciplinary.

## What it would take

- [x] Read the original end to end — `memory.ts`, `sql.ts`, `mcp.ts`, `server.ts`, `oauth.ts`, and the rest
- [x] Establish what LanceDB can and cannot do: n-gram FTS over Thai, filter expressions, null vectors, index freshness
- [x] An ORM layer — `LanceModel` schemas, a typed `Table` repository, and `Q` as the only place a literal is quoted
- [x] Port the corpus: CRUD, facets, merge, the search paths, hybrid recall with RRF
- [x] Port the doors: owner session, static bearer, OAuth 2.1 + PKCE, and the MCP JSON-RPC surface
- [x] Reuse the UI verbatim, built into `arra_memory/static`
- [x] Port graph, digest, search log, tool toggles, and the MQTT fleet layer
- [x] Tests, including a real mosquitto broker and the bugs the original paid for
- [x] Prove it live: real Ollama `bge-m3`, a real browser, a real OAuth+MCP client
- [x] Adversarially review the port against the original, and fix what survived refutation

## Done when

**Done.** The observable state, all of it measured on 2026-09-09 rather than assumed:

- A word searched *inside* a spaceless Thai sentence finds it — `ความจำ` inside
  `ระบบความจำสำหรับผู้ช่วยเอไอ`, through the UI and through MCP.
- An **English** question retrieves a **Thai** memory: *"how does memory search work for a language
  with no spaces"* → the Thai memory first, over real `bge-m3`.
- The exact query the original's own retro recorded — *"how do I build a brand new virtual machine
  from scratch"* — returns the runbook first at cosine distance 0.5095, with zero words in common.
- A claude.ai-shaped client walks register → approve → token → `initialize` (negotiating
  `2025-11-25`, answered as SSE) → `tools/list` (16 tools) → `recall_memories` on a Thai query →
  `remember`, and the memory it wrote appears in the browser.
- The copied UI runs unmodified against the Python API: archive, chip rows with live counts, the
  three.js atlas (7 nodes, k=3, 61% variance explained, a written `[[link]]` drawn as its own edge),
  the search log distinguishing `web` from `mcp` calls, and the settings page.
- The full suite passes, including the fleet tests against a real broker.

## What the review found

Six reviewers read the port against the TypeScript; each finding then went to three agents told to
refute it. Twenty-three were raised, ten were refuted and dropped, thirteen were fixed. Two mattered
more than the rest, and both were invisible to a passing test suite:

**Keyword search returned memories that do not contain the query.** LanceDB's n-gram tokenizer
splits document and query into 3-character sequences, and once rows are folded into the index —
automatically, seconds after any write — `PhraseQuery` stops requiring those sequences to be
adjacent. "kubernetes" matched "remember the november deadline" on `ber`, "the internet connection
dropped" on `net`, "tests are green today" on `tes`. Every test passed because no test had ever
called `optimize()`, so the suite only exercised the exact, unindexed path. The index is now a
candidate generator and the substring test the original ran in SQL decides what matches.

**Two overlapping settings writes corrupted `settings.json`.** An unsynchronised read-modify-write
on a threadpool, reachable from one browser tab because Regenerate does not disable Save. Of 200
such pairs: 152 silently discarded the API token already shown to the owner, 24 left the file
invalid — which `reload()` swallows into an empty dict, losing `owner_passphrase`, after which the
server refuses to start.

The lesson generalises past this repo: **a test suite that never triggers the background maintenance
its storage engine performs is testing a different system than the one that runs.**

## Notes

The name confusion is worth recording, because it cost a dig: **thor-memory is not a repo.** It is
`arra-memory-haos` running under a second `instance_name` — one codebase, two deployments, and
`cd2339cc_arra_memory` is that add-on's Home Assistant ingress slug. The three `thor*-oracle` repos
on this machine are Discord-persona oracles, unrelated by name coincidence alone.

What the port deliberately drops: Turso embedded-replica sync (LanceDB has no equivalent — the
durability answer here is backing up `DATA_DIR`) and the HAOS add-on packaging. What it deliberately
keeps, down to the sentence: the degradation reporting, the "not indexed yet ≠ unrelated" exclusion,
the 405 on `GET /mcp`, the SSE answer, and the empty-window digest that refuses to imply inactivity.

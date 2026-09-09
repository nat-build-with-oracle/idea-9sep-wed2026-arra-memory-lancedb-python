# arra-memory บน LanceDB สูตรโกง

> ทุกคำสั่งที่ใช้จริงตอน port arra-memory (Turso/Workers) → Python + LanceDB, ใส่ tag cloud + trace log, แล้วเปิดบน m5 mesh — 9 ก.ย. 2026

---

## 🔧 ติดตั้งครั้งเดียว

```bash
cd /opt/Code/github.com/nat-build-with-oracle/idea-9sep-wed2026-arra-memory-lancedb-python
uv venv && uv pip install -e ".[dev]"

# UI ใช้ bun — ทำเฉพาะตอนแก้ ui/ เท่านั้น
cd ui && bun install && bun run build     # → arra_memory/static/{main.js,app.css,index.html}
```

`just` มีให้แล้ว: `just install` · `just dev` · `just test` · `just ui` · `just health`

## 🚀 รัน

```bash
# loopback — สำหรับ dev/ตรวจเอง
OWNER_PASSPHRASE="$(openssl rand -base64 32)" \
  .venv/bin/python -m arra_memory --port 8099

# บน m5 mesh — ผูกกับ NetBird IP อย่างเดียว ไม่ใช่ 0.0.0.0 (LAN จะเห็นด้วย)
OWNER_PASSPHRASE='live-demo-passphrase' DATA_DIR=/tmp/arra-live \
OLLAMA_URL='http://127.0.0.1:11434' EMBEDDING_MODEL=bge-m3 EMBEDDING_DIMENSIONS=1024 \
SEARCH_LOG=true TRACE_LOG=true INSTANCE_NAME='Arra Memory (LanceDB)' \
PUBLIC_URL='http://m5.oracle.netbird:8199' \
nohup .venv/bin/python -m arra_memory --host 100.97.192.167 --port 8199 \
  > /tmp/arra-live/server.log 2>&1 &
```

หา mesh address ของเครื่อง: `netbird status | rg 'FQDN|NetBird IP'` → `m5.oracle.netbird` / `100.97.192.167`

## 🔍 ค้น + ตรวจว่าค้นถูกจริง

```bash
# Thai อยู่กลางประโยคที่ไม่มีช่องว่าง — นี่คือเหตุผลที่ต้องใช้ ngram ไม่ใช่ word-boundary
curl -sS 'http://127.0.0.1:8099/api/memories?q=ความจำ' -b cookie.txt

# ถามอังกฤษ ได้ความจำภาษาไทย (bge-m3 ทำได้จริง, English-first model ทำไม่ได้)
curl -sS -X POST http://127.0.0.1:8099/api/search -b cookie.txt \
  -H 'content-type: application/json' \
  -d '{"query":"how does memory search work for a language with no spaces","mode":"semantic"}'
```

**สำคัญ** — ต้องทดสอบหลัง `optimize()` ด้วย ไม่งั้นเทสต์ผ่านแต่ของจริงพัง:

```python
from arra_memory.db import db
db().optimize_now()          # บังคับให้ index กิน row ที่เพิ่งเขียน
# แล้วค่อย assert ผลค้นหา — ดู tests/test_indexed.py
```

## 🏷️ tag cloud

```bash
curl -sS http://127.0.0.1:8099/api/cloud -b cookie.txt | python3 -m json.tool
# size มาจาก server แล้ว (arra_memory/cloud.py) — UI ไม่คำนวณเอง จะได้ไม่มีสองสูตร
```

กฎ (มาจาก digger-node + trace-node): **11px → 20px, log scale, tag ที่ count=0 ต้องยังโผล่**

```python
from arra_memory.cloud import size_for
size_for(40, 40)   # 20.0
size_for(0, 20)    # 11.0  ← min-max จะ ValueError ตรงนี้
size_for(5, 0)     # 11.0  ← ทั้ง corpus ยังไม่มี tag
```

## 📋 trace log + timeline

```bash
curl -sS 'http://127.0.0.1:8099/api/traces?limit=20' -b cookie.txt | python3 -m json.tool
curl -sS 'http://127.0.0.1:8099/api/traces?outcome=empty' -b cookie.txt   # ค้นแล้วไม่เจอ — แถวที่น่าสนใจสุด
curl -sS 'http://127.0.0.1:8099/api/traces?outcome=error' -b cookie.txt
curl -sS 'http://127.0.0.1:8099/api/timeline?days=30' -b cookie.txt | python3 -m json.tool

# ลืม keyword หนึ่งคำ (เก็บ query text ไว้ตลอด จึงต้องมีทางลบ)
curl -sS -X DELETE 'http://127.0.0.1:8099/api/traces?keyword=passphrase' -b cookie.txt
```

ปิดการบันทึก: `TRACE_LOG=false` · `/api/debug/mcp-log` ยังอยู่ (ดู raw headers ตอน connector เงียบ ๆ พัง)

## 🌐 ต่อ MCP

```bash
scripts/connect-mcp.sh claude http://127.0.0.1:8099/mcp arra-local
scripts/connect-mcp.sh codex  https://memory.example.com/mcp

# ทดสอบเองแบบ claude.ai ทำ — ต้องตอบ SSE ไม่ใช่ JSON เปล่า
curl -sS -X POST http://127.0.0.1:8099/mcp \
  -H 'authorization: Bearer TOKEN' \
  -H 'accept: application/json, text/event-stream' \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25"}}'

curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8099/mcp    # ต้อง 405 ไม่ใช่ 200+HTML
```

## 🧪 เทสต์ + ตรวจ parity

```bash
.venv/bin/python -m pytest tests/ -q                      # 206 ตัว
.venv/bin/python -m pytest tests/test_indexed.py -q       # เส้นทางหลัง optimize()
cd ui && bun run typecheck

# differential test เทียบ TypeScript ต้นฉบับ — เจอ bug ที่อ่านโค้ดเปล่า ๆ ไม่เจอ
bun run.ts > ts.json && .venv/bin/python run.py > py.json && diff <(jq -S . ts.json) <(jq -S . py.json)
```

## 🐳 container

```bash
docker build -t arra-memory-lancedb:test .
docker run --rm arra-memory-lancedb:test                  # ต้องปฏิเสธ: ไม่มี OWNER_PASSPHRASE
docker run -d --name arra -e OWNER_PASSPHRASE=x -p 127.0.0.1:8232:8099 arra-memory-lancedb:test
docker inspect --format '{{.State.Health.Status}}' arra   # healthy

echo "OWNER_PASSPHRASE=$(openssl rand -base64 32)" > .env && docker compose up -d --build
```

## 📨 issue + PR

```bash
gh issue create --title "..." --body "$(cat <<'EOF'
...
EOF
)"
git checkout -b feat/tag-cloud-and-trace-log
git push -u origin feat/tag-cloud-and-trace-log
gh pr create --base main --title "..." --body "$(cat <<'EOF'
...
EOF
)"
```

session นี้ → [issue #1](https://github.com/nat-build-with-oracle/idea-9sep-wed2026-arra-memory-lancedb-python/issues/1) · [PR #2](https://github.com/nat-build-with-oracle/idea-9sep-wed2026-arra-memory-lancedb-python/pull/2)

## 🔎 หา prior art ในฟลีต

```bash
ghq list | rg -i arra                                     # หา repo
rg -il 'tag[- ]?cloud' "$(ghq root)/github.com/Soul-Brews-Studio" -g '!node_modules'
python3 ~/.claude/skills/wf-peek/scripts/peek.py          # workflow ยังวิ่งอยู่ไหม
```

## ⚡ ลัด

| ทำอะไร | คำสั่ง |
|--------|--------|
| รัน dev | `just dev` |
| เทสต์ทั้งหมด | `.venv/bin/python -m pytest tests/ -q` |
| build UI | `cd ui && bun run build` |
| มันมีชีวิตไหม | `curl -fsS http://127.0.0.1:8099/api/health \| python3 -m json.tool` |
| ค้นแล้วไม่เจออะไรบ้าง | `curl -sS '.../api/traces?outcome=empty' -b cookie.txt` |
| ฝัง vector ที่ค้าง | `curl -sS -X POST .../api/index/backfill -d '{"limit":100}'` |
| mesh address | `netbird status \| rg 'FQDN\|NetBird IP'` |
| server ตายไหม | `lsof -nP -iTCP:8199 -sTCP:LISTEN` |

## ⚠️ trap ที่เจอจริง

| trap | วิธีเลี่ยง |
|------|-----------|
| **LanceDB ngram FTS ไม่ใช่ exact match** — พอ `optimize()` กิน row แล้ว `PhraseQuery` เลิกบังคับ adjacency ค้น "kubernetes" ได้ "november"/"internet"/"tests" (trigram ตรงกันแค่ "ber"/"net"/"tes") | ใช้ index เป็น *candidate generator* แล้วกรอง substring ใน Python อีกชั้น · เทสต์ต้องเรียก `optimize_now()` ก่อน assert |
| เทสต์ผ่านหมดแต่ prod พัง เพราะไม่มีเทสต์ไหนเรียก `optimize()` เลย | `tests/test_indexed.py` — แยกไฟล์สำหรับเส้นทางหลัง compaction โดยเฉพาะ |
| min-max normalise บน log → `ValueError: math domain error` ตอน count=0 และหารศูนย์ตอนทุก tag เท่ากัน | ใช้ `log1p(n)/log1p(max)` · ทุก tag เท่ากัน → floor ไม่ใช่ ceiling |
| `0 == False` ใน Python — `v not in (None, False)` ทำให้ `olderThanDays=0` หายไป แล้ว `{olderThanDays:0, all:true}` ลบ log ทั้งก้อนผ่าน guard ที่มีไว้กันเรื่องนี้พอดี | ใช้ `v is not None and v is not False` |
| ลืม keyword แล้วเขียน log ว่า "ลืม <keyword>" — คำนั้นกลับเข้า log ทันที | แถว forget เก็บแค่จำนวน ไม่เก็บคำ |
| settings.json พังตอนกด Regenerate แล้วกด Save ทับ (200 ครั้ง → 24 ครั้งไฟล์เสีย, ทำ server ไม่ start) | lock + เขียน temp 0600 แล้ว `os.replace` |
| Dockerfile install จาก stub tree (แค่ pyproject + `__init__.py` เพื่อ cache layer) → `No module named arra_memory.__main__` แต่ `/app` มีโค้ดครบ | copy ทั้ง package ก่อน `pip install .` แล้วปิดท้ายด้วย `python -c "import arra_memory.__main__"` |
| `curl` ไป NetBird IP ของเครื่องตัวเอง = timeout (hairpin) — server ทำงานปกติ peer อื่นเข้าได้ | ตรวจจาก log ว่ามี request จาก peer อื่น หรือรัน copy บน loopback คนละ port |
| background process ตายพร้อม shell ของ Bash tool | ใส่ `nohup ... &` เสมอ |
| colima VM เต็ม → `No space left on device` กลางการ build | ลบเฉพาะ image ของตัวเอง + `docker builder prune` · **อย่า** prune image ของ Nat |
| FastAPI `{name}` จับ `/` ไม่ได้ — workspace ชื่อ `Soul-Brews/arra` ตกไปที่ SPA แล้วตอบ 200 HTML | ใช้ `{name:path}` |
| `_score` ของ LanceDB จะเลิก auto-project | ใส่ `"_score"` ใน `.select()` เอง |
| `bun run build:js` เขียนไป `../arra_memory/static` — ใน Docker stage ไม่มี checkout layout | ระบุ `--outdir /static` ตรง ๆ ใน Dockerfile |

---

🤖 AI-generated per fleet Rule 6 — assembled by an oracle, commissioned by Nat Weerawan

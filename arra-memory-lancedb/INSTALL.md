# Installing beside the original

The point of this add-on is that it does **not** replace `arra-memory`. It takes
its own sidebar panel, its own `/data`, and its own host port, so both engines
run on one machine and can be asked the same questions.

| | original | this one |
|---|---|---|
| slug | `arra_memory` | `arra_memory_lancedb` |
| slug on thor | `cd2339cc_arra_memory` | `03926c4d_arra_memory_lancedb` |
| store | libSQL / SQLite | LanceDB |
| sidebar | **Memory** | **Memory · Lance** |
| host port | 8099 | **8101** |
| `/data` | its own | its own |

The port matters, and 8100 is not free either — `arra_studio` publishes it on
thor. Two add-ons mapping one host port install cleanly and then fail at
**start** with `Cannot start app ... because port 8100 is already in use`, which
is easy to read as a crash. Check first:

```bash
node install-remote.mjs --host https://thor.buildwithoracle.com \
  --user thor --pass-file /tmp/thor-pass.txt ports
```

## Before it can be installed

Two things are true and neither is a code problem:

1. **Supervisor must be able to clone the repository.** A private repo fails
   with a clone error rather than an access-denied message. This one is public.
2. **Both images must be public and anonymously pullable** before `image:` in
   `config.yaml` is trusted. `.github/workflows/builder.yml` publishes
   `ghcr.io/nat-build-with-oracle/{arch}-addon-arra_memory_lancedb` on every push
   that touches the add-on; packages default to private, so the first publish
   needs them flipped to public once.

Pointing at a tag that does not exist breaks the **install**, not the update —
which is why the image line was commented out until CI had run.

## Install

Everything below goes through the same Supervisor API the UI calls — no SSH into
the guest, which is the standing rule for HAOS boxes here.

`install-remote.mjs` exists because thor's `:8123` is filtered on the LAN (only
`:8099`, `:8101` and the observer on `:4357` answer), so `kvm-oracle`'s
`addons.ts`, which builds `ws://<ip>:8123`, cannot reach it. This speaks the
identical protocol over `wss://` to the tunnel hostname. Credentials come from a
FILE, never argv.

```bash
cd arra-memory-lancedb
HOST=https://thor.buildwithoracle.com
umask 077
pass show thor/hassos-pass > /tmp/thor-pass.txt     # user `thor`
HA="node install-remote.mjs --host $HOST --user thor --pass-file /tmp/thor-pass.txt"

$HA add-repo https://github.com/nat-build-with-oracle/idea-9sep-wed2026-arra-memory-lancedb-python
$HA store lancedb        # read the slug back — it is prefixed with a hash of the repo URL
$HA install 03926c4d_arra_memory_lancedb
```

`store` is not optional politeness: Supervisor prefixes the slug with a hash of
the repository URL, the way `cd2339cc_arra_memory` is, and that hash cannot be
derived from `config.yaml`.

## Configure

`ollama_url` **must be a LAN IP**. An add-on container has no route to the
NetBird mesh even when the host is a fully connected peer, and the failure is a
silent `{"indexed":0}` rather than an error. Copy the value the working
neighbour already uses — `config` prints options with the secrets redacted:

```bash
$HA config cd2339cc_arra_memory
```

Options **replace wholesale**, so every field is restated in one call, and the
JSON arrives on **stdin** so no secret is ever an argument.

```bash
umask 077
openssl rand -base64 32 | tr -d '\n' > /tmp/lance-pass.txt
openssl rand -hex 24   | tr -d '\n' > /tmp/lance-token.txt

python3 - > /tmp/lance-options.json <<'EOF'
import json, pathlib
print(json.dumps({
    "owner_passphrase": pathlib.Path("/tmp/lance-pass.txt").read_text(),
    "api_token": pathlib.Path("/tmp/lance-token.txt").read_text(),
    "public_url": "",
    "instance_name": "thor-memory-lance",
    "ollama_url": "http://192.168.1.164:11434",
    "embedding_model": "bge-m3",
    "embedding_dimensions": 1024,
    "search_log": True, "trace_log": True, "generated_tools": False,
    "language": "th", "theme": "slate",
    "mqtt_url": "", "mqtt_username": "", "mqtt_password": "", "mqtt_prefix": "oracle",
}))
EOF

$HA options 03926c4d_arra_memory_lancedb - < /tmp/lance-options.json
$HA port    03926c4d_arra_memory_lancedb 8099/tcp 8101
$HA sidebar 03926c4d_arra_memory_lancedb on
$HA start   03926c4d_arra_memory_lancedb
```

`sidebar` is a real step, not a formality. `ingress_panel` is a per-**install**
setting that `config.yaml` can only propose: this add-on came up with
`sidebar=false` on thor and ran perfectly while being invisible in the sidebar —
which is the entire thing that was asked for.

Set `public_url` only when it is published through its own tunnel: the OAuth
issuer and callback origin derive from it, and blank means clients are told to
call back on whatever host the request arrived on — wrong through a tunnel, and
invisible until claude.ai tries. Ingress needs nothing here.

## Prove it, rather than trusting `state: started`

An add-on that reports started while serving nothing looks identical to one that
works. This fleet has been wrong about that four separate times.

```bash
curl -sS http://192.168.1.106:8099/api/health          # the original, still up
curl -sS http://192.168.1.106:8101/api/health          # the new one
```

Both answer, with different `name` and `version`, and only the second reports
`"engine":"lancedb"`. Then in the sidebar: **Memory** and **Memory · Lance**,
side by side, at

- `https://thor.buildwithoracle.com/cd2339cc_arra_memory`
- `https://thor.buildwithoracle.com/03926c4d_arra_memory_lancedb`

The one check worth doing by hand, because it is the reason this port exists —
search a Thai word that only appears *inside* a spaceless Thai sentence, and
confirm it is found on both.

## When it will not start

`start` reports Supervisor's own message; take it literally.

```bash
$HA logs 03926c4d_arra_memory_lancedb
```

Logs come over REST rather than the WebSocket, because they are plain text and
the `supervisor/api` proxy is a JSON channel that returns an empty result for
them instead of an error. An empty log usually means the container never got as
far as running: a port conflict or an options-validation failure both look like
that.

# Installing beside the original

The point of this add-on is that it does **not** replace `arra-memory`. It takes
its own sidebar panel, its own `/data`, and its own host port, so both engines
run on one machine and can be asked the same questions.

| | original | this one |
|---|---|---|
| slug | `arra_memory` | `arra_memory_lancedb` |
| store | libSQL / SQLite | LanceDB |
| sidebar | **Memory** | **Memory · Lance** |
| host port | 8099 | **8100** |
| `/data` | its own | its own |

The port matters: two add-ons mapping the same host port means the second one
fails to start with a conflict that reads like a crash.

## Before it can be installed

Two things are true and neither is a code problem:

1. **Supervisor must be able to clone the repository.** It is private today, and
   a private repo fails with a clone error rather than an access-denied message.
   Either publish it, or add this add-on folder to a repository the instance
   already has.
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

```bash
KVM=/opt/Code/github.com/laris-co/kvm-oracle
SKILL="$KVM/.claude/skills/create-haos-vm"
IP=192.168.1.106            # thor
PASSFILE=/tmp/thor-pass.txt # the HA login for user `thor`

cd "$SKILL"
bun scripts/addons.ts --ip $IP --user thor --pass-file $PASSFILE \
  add-repo https://github.com/nat-build-with-oracle/idea-9sep-wed2026-arra-memory-lancedb-python
bun scripts/addons.ts --ip $IP --user thor --pass-file $PASSFILE install arra_memory_lancedb
```

The slug Supervisor shows is prefixed with a hash of the repository URL, the way
`cd2339cc_arra_memory` is — read it back from `list` rather than assuming it.

## Configure

`ollama_url` **must be a LAN IP**. An add-on container has no route to the
NetBird mesh even when the host is a fully connected peer, and the failure is a
silent `{"indexed":0}` rather than an error.

Options **replace wholesale**, so every field is restated in one call.

```bash
umask 077
openssl rand -base64 32 | tr -d '\n' > /tmp/lance-pass.txt
openssl rand -hex 24   | tr -d '\n' > /tmp/lance-token.txt

bun scripts/addons.ts --ip $IP --user thor --pass-file $PASSFILE \
  options arra_memory_lancedb "$(printf '{"owner_passphrase":"%s","api_token":"%s","instance_name":"thor-memory-lance","ollama_url":"http://192.168.1.164:11434","embedding_model":"bge-m3","embedding_dimensions":1024,"search_log":true,"trace_log":true,"language":"th","theme":"slate"}' \
    "$(cat /tmp/lance-pass.txt)" "$(cat /tmp/lance-token.txt)")"

bun scripts/addons.ts --ip $IP --user thor --pass-file $PASSFILE start arra_memory_lancedb
```

Set `public_url` only when it is published through a tunnel: the OAuth issuer and
callback origin derive from it, and blank means clients are told to call back on
whatever host the request arrived on — wrong through a tunnel, and invisible
until claude.ai tries.

## Prove it, rather than trusting `state: started`

An add-on that reports started while serving nothing looks identical to one that
works. This fleet has been wrong about that four separate times.

```bash
curl -sS http://192.168.1.106:8100/api/health          # the new one
curl -sS http://192.168.1.106:8099/api/health          # the original, still up
```

Both should answer, with different `name` and `version`. Then in the sidebar:
**Memory** and **Memory · Lance**, side by side.

The one check worth doing by hand, because it is the reason this port exists —
search a Thai word that only appears *inside* a spaceless Thai sentence, and
confirm it is found on both.

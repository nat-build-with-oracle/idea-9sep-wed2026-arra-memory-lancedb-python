#!/usr/bin/env node
/**
 * Install this add-on onto a Home Assistant instance reachable only through a
 * tunnel.
 *
 * WHY THIS EXISTS RATHER THAN kvm-oracle's addons.ts
 * That script is the right tool and does the same job, but it builds
 * `ws://<ip>:8123/api/websocket` — a LAN address. thor does not accept
 * connections on 8123 from the LAN at all (measured: 8099 and the observer on
 * 4357 are open, 8123 and 22 are filtered), so the only door is the public
 * tunnel at https://thor.buildwithoracle.com. This speaks the identical
 * protocol over wss:// to a hostname.
 *
 * WHY THE WEBSOCKET AND NOT REST
 * `GET /api/hassio/addons` with a bearer returns 401 with an empty body on
 * current HA even for the owner: the generic supervisor HTTP proxy is closed.
 * The frontend does not use it either — it sends
 * `{"type":"supervisor/api", endpoint, method}` over the authenticated
 * WebSocket. This is the UI's own path with a different client, which is what
 * keeps it inside the standing rule: install add-ons, never SSH into the guest.
 *
 * AUTH
 * A long-lived access token, created in the HA UI under
 * Profile → Security → Long-lived access tokens. Passed by FILE, never argv —
 * a token in a command line lands in shell history and in transcripts.
 *
 *   node install-remote.mjs --host https://thor.buildwithoracle.com \
 *     --token-file /tmp/thor-ha-token.txt <command> [args]
 *
 * commands:
 *   list                       every installed add-on, slug and state
 *   add-repo <url>             add an add-on repository
 *   install <slug>             install (the slug is repo-hash-prefixed; read it from `list`)
 *   options <slug> <json|->    set options; `-` reads the JSON from stdin
 *   start|restart|stop <slug>
 *   info <slug>
 */

import { readFileSync } from "node:fs";

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? undefined : argv[i + 1];
};
const die = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

const host = (flag("host") ?? die("--host https://your-ha is required")).replace(/\/+$/, "");
const tokenFile = flag("token-file");
const token = tokenFile
  ? readFileSync(tokenFile, "utf8").trim() || die(`--token-file ${tokenFile} is empty`)
  : die("--token-file is required (never pass a token in argv)");

const positional = argv.filter((a, i) => !a.startsWith("--") && !argv[i - 1]?.startsWith("--"));
const [command, ...rest] = positional;
if (!command) die("a command is required — list, add-repo, install, options, start, restart, stop, info");

const wsUrl = host.replace(/^http/, "ws") + "/api/websocket";

/** One authenticated WebSocket, one command, then close. */
async function connect() {
  const socket = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();

  await new Promise((resolve, reject) => {
    socket.addEventListener("error", () => reject(new Error(`cannot reach ${wsUrl}`)));
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "auth_required") {
        socket.send(JSON.stringify({ type: "auth", access_token: token }));
        return;
      }
      if (message.type === "auth_invalid") {
        // The single most likely failure, and worth naming precisely: a token
        // that was valid for a DIFFERENT instance fails exactly like an expired
        // one, and both read as "wrong password".
        reject(new Error(`the token was refused by ${host} — ${message.message ?? "auth_invalid"}`));
        return;
      }
      if (message.type === "auth_ok") {
        resolve();
        return;
      }
      const waiting = pending.get(message.id);
      if (waiting) {
        pending.delete(message.id);
        message.success === false
          ? waiting.reject(new Error(message.error?.message ?? "request failed"))
          : waiting.resolve(message.result);
      }
    });
  });

  const send = (payload) =>
    new Promise((resolve, reject) => {
      const messageId = ++id;
      pending.set(messageId, { resolve, reject });
      socket.send(JSON.stringify({ ...payload, id: messageId }));
    });

  /** The supervisor proxy the frontend itself uses. */
  const supervisor = (endpoint, method = "get", data) =>
    send({ type: "supervisor/api", endpoint, method, timeout: 300, ...(data ? { data } : {}) });

  return { supervisor, close: () => socket.close() };
}

let supervisor, close;
try {
  ({ supervisor, close } = await connect());
} catch (error) {
  // A stack trace here is noise: every failure at this point is one of two
  // things, and both are actionable in one line.
  console.error(`✗ ${error.message}`);
  console.error("  Create a long-lived token in the HA UI: Profile → Security →");
  console.error("  Long-lived access tokens → Create token, then put it in the file.");
  process.exit(1);
}

try {
  if (command === "list") {
    const result = await supervisor("/addons");
    for (const addon of result.addons.sort((a, b) => a.slug.localeCompare(b.slug))) {
      console.log(`  ${addon.slug.padEnd(34)} ${String(addon.version).padEnd(10)} ${addon.state}`);
    }
  } else if (command === "add-repo") {
    const url = rest[0] ?? die("add-repo needs a repository URL");
    const store = await supervisor("/store");
    const existing = (store.repositories ?? []).map((r) => r.source ?? r.slug);
    if (existing.includes(url)) {
      console.log(`  already added: ${url}`);
    } else {
      await supervisor("/store/repositories", "post", { repository: url });
      console.log(`  added: ${url}`);
    }
    await supervisor("/store/reload", "post");
    console.log("  store reloaded");
  } else if (command === "install") {
    const slug = rest[0] ?? die("install needs a slug");
    await supervisor(`/store/addons/${slug}/install`, "post");
    console.log(`  installed: ${slug}`);
  } else if (command === "options") {
    const slug = rest[0] ?? die("options needs a slug");
    const raw = rest[1] ?? die("options needs JSON, or - to read stdin");
    const body = raw === "-" ? readFileSync(0, "utf8") : raw;
    await supervisor(`/addons/${slug}/options`, "post", { options: JSON.parse(body) });
    console.log(`  options set on ${slug}`);
  } else if (["start", "restart", "stop"].includes(command)) {
    const slug = rest[0] ?? die(`${command} needs a slug`);
    await supervisor(`/addons/${slug}/${command}`, "post");
    console.log(`  ${command}: ${slug}`);
  } else if (command === "info") {
    const slug = rest[0] ?? die("info needs a slug");
    const info = await supervisor(`/addons/${slug}/info`);
    console.log(
      `  ${info.name} ${info.version} · ${info.state} · boot=${info.boot} · sidebar=${info.ingress_panel}`,
    );
  } else {
    die(`unknown command: ${command}`);
  }
} finally {
  close();
}

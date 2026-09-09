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
 * AUTH — two ways, both by FILE and never by argv, because a secret in a
 * command line lands in shell history and in transcripts.
 *
 *   --user <name> --pass-file <path>   the account password; this runs the same
 *                                      /auth/login_flow the login page runs and
 *                                      trades the resulting code for a token
 *   --token-file <path>                a long-lived token, if you have one
 *                                      (HA UI: Profile → Security)
 *
 * The password path is preferred: a long-lived token is minted by hand, is
 * indistinguishable from an expired one when it fails, and outlives the reason
 * it was created. A password already exists and is already rotated with the
 * account.
 *
 *   node install-remote.mjs --host https://thor.buildwithoracle.com \
 *     --user thor --pass-file /tmp/thor-pass.txt <command> [args]
 *
 * commands:
 *   list                       every installed add-on, slug and state
 *   ports                      every published host port, so collisions are visible
 *   add-repo <url>             add an add-on repository
 *   store [needle]             what the store offers — the ONLY way to learn the
 *                              installable slug, which is repo-hash-prefixed
 *   install <slug>             install
 *   update <slug>              pull the version the store now offers
 *   options <slug> <json|->    set options; `-` reads the JSON from stdin
 *   port <slug> <ctr> <host>   republish a container port on a different host port
 *   sidebar <slug> [on|off]    show or hide the ingress panel
 *   config <slug>              current options, secrets redacted
 *   logs <slug>                the add-on's own log
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

const read = (path, what) => readFileSync(path, "utf8").trim() || die(`${what} ${path} is empty`);
const tokenFile = flag("token-file");
const passFile = flag("pass-file");
const user = flag("user");

/**
 * Log in the way the login page does: start a flow, answer its username/password
 * step, then trade the returned code for an access token.
 *
 * `client_id` must be an absolute URL and must share an origin with
 * `redirect_uri` — HA rejects the flow otherwise, and the message it gives back
 * ("Invalid client id") reads like a bug in the caller rather than a rule.
 */
async function login() {
  const clientId = host + "/";
  const post = async (path, body) => {
    const response = await fetch(host + path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`${path} answered ${response.status}`);
    return response.json();
  };

  const flow = await post("/auth/login_flow", {
    client_id: clientId,
    handler: ["homeassistant", null],
    redirect_uri: clientId,
  });
  const step = await post(`/auth/login_flow/${flow.flow_id}`, {
    username: user,
    password: read(passFile, "--pass-file"),
    client_id: clientId,
  });
  if (!step.result) {
    // A wrong password comes back 200 with a re-rendered form, not an error
    // status — so this has to be checked, not assumed from response.ok.
    throw new Error(
      `${host} refused the login for "${user}" — ${JSON.stringify(step.errors ?? step.type)}`,
    );
  }

  const exchange = await fetch(host + "/auth/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: step.result,
      client_id: clientId,
    }),
  });
  if (!exchange.ok) throw new Error(`/auth/token answered ${exchange.status}`);
  return (await exchange.json()).access_token;
}

if (!tokenFile && !(user && passFile)) {
  die("authentication is required: --user <name> --pass-file <path>, or --token-file <path>");
}

const positional = argv.filter((a, i) => !a.startsWith("--") && !argv[i - 1]?.startsWith("--"));
const [command, ...rest] = positional;
if (!command) {
  die(
    "a command is required — list, ports, add-repo, store, install, options, port, " +
      "sidebar, config, logs, start, restart, stop, info",
  );
}

const wsUrl = host.replace(/^http/, "ws") + "/api/websocket";

/** One authenticated WebSocket, one command, then close. */
async function connect(token) {
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
        // Worth naming precisely: a token that was valid for a DIFFERENT
        // instance fails exactly like an expired one, and both read as "wrong
        // password".
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

let supervisor, close, bearer;
try {
  bearer = tokenFile ? read(tokenFile, "--token-file") : await login();
  ({ supervisor, close } = await connect(bearer));
} catch (error) {
  // A stack trace here is noise: everything that fails at this point is a
  // credential or a network path, and both are actionable in one line.
  console.error(`✗ ${error.message}`);
  console.error(`  Check the password for --user, or mint a token in the HA UI at ${host}`);
  console.error("  under Profile → Security → Long-lived access tokens.");
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
  } else if (command === "store") {
    // The slug Supervisor assigns is prefixed with a hash of the repository
    // URL, so it cannot be predicted from config.yaml — it has to be read back.
    const needle = rest[0];
    const store = await supervisor("/store");
    const matches = (store.addons ?? []).filter((a) => !needle || a.slug.includes(needle));
    for (const addon of matches) {
      // `version` is what is INSTALLED and `version_latest` is what the store
      // offers; printing only the first makes a pending update invisible, which
      // is the exact question this command gets asked.
      const latest = addon.version_latest ?? addon.version;
      const state = addon.installed
        ? latest && latest !== addon.version
          ? `installed ${addon.version}, update to ${latest}`
          : `installed ${addon.version}`
        : `available ${latest}`;
      console.log(`  ${addon.slug.padEnd(34)} ${state}`);
    }
    if (!matches.length) console.log(`  nothing in the store matches ${needle}`);
  } else if (command === "update") {
    const slug = rest[0] ?? die("update needs a slug");
    await supervisor(`/store/addons/${slug}/update`, "post");
    console.log(`  updated: ${slug}`);
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
  } else if (command === "ports") {
    // config.yaml can only PROPOSE a host port; what an install actually
    // publishes lives in its `network` and can be changed per machine. Worth
    // being able to see, because the failure when two add-ons want one port is
    // "Cannot start app ... because port N is already in use" at START time —
    // long after the install looked fine.
    const { addons } = await supervisor("/addons");
    for (const addon of addons) {
      const info = await supervisor(`/addons/${addon.slug}/info`);
      const mapped = Object.entries(info.network ?? {}).filter(([, host]) => host);
      if (mapped.length) {
        console.log(`  ${addon.slug.padEnd(34)} ${mapped.map(([c, h]) => `${c}→${h}`).join(" ")}`);
      }
    }
  } else if (command === "port") {
    const slug = rest[0] ?? die("port needs a slug");
    const container = rest[1] ?? die("port needs a container port, e.g. 8099/tcp");
    const hostPort = rest[2] ?? die("port needs a host port");
    await supervisor(`/addons/${slug}/options`, "post", {
      network: { [container]: Number(hostPort) },
    });
    console.log(`  ${slug}: ${container} published on ${hostPort}`);
  } else if (command === "logs") {
    // The one thing worth having when `start` answers "an unknown error
    // occurred, check the Supervisor logs".
    //
    // Over REST and not the WebSocket, unlike every other command here: logs
    // are plain text, and the `supervisor/api` proxy is a JSON channel that
    // hands back an empty result for them rather than an error. The frontend
    // fetches them exactly this way. Note this path DOES work with a session
    // token even though `GET /api/hassio/addons` returns 401 — the block is on
    // the generic listing, not on every hassio route.
    const slug = rest[0] ?? die("logs needs a slug");
    const response = await fetch(`${host}/api/hassio/addons/${slug}/logs`, {
      headers: { authorization: `Bearer ${bearer}` },
    });
    if (!response.ok) throw new Error(`logs answered ${response.status}`);
    console.log(await response.text());
  } else if (command === "sidebar") {
    // `ingress_panel` is a per-INSTALL setting, not something config.yaml can
    // decide: a fresh install of an ingress add-on can land with the panel off,
    // and then the add-on runs perfectly while being invisible in the sidebar.
    const slug = rest[0] ?? die("sidebar needs a slug");
    const on = (rest[1] ?? "on") !== "off";
    await supervisor(`/addons/${slug}/options`, "post", { ingress_panel: on });
    console.log(`  sidebar panel ${on ? "on" : "off"}: ${slug}`);
  } else if (command === "config") {
    const slug = rest[0] ?? die("config needs a slug");
    const info = await supervisor(`/addons/${slug}/info`);
    // Secrets are printed as a length, never a value. The point of this command
    // is to copy a working neighbour's settings — which needs the ollama URL
    // and the model, never the passphrase.
    //
    // The rule is the KEY NAME and deliberately not the add-on's own schema:
    // `/addons/<slug>/info` does not reliably carry `schema` alongside
    // `options`, so a schema-driven check silently degrades to printing
    // everything in the clear — which is exactly how thor's live passphrase,
    // API token and MQTT password ended up in a terminal here once.
    const secret = /pass|token|secret|key|credential/i;
    for (const [key, value] of Object.entries(info.options ?? {})) {
      const shown = secret.test(key) && value ? `<redacted, ${String(value).length} chars>` : JSON.stringify(value);
      console.log(`  ${key.padEnd(22)} ${shown}`);
    }
  } else if (command === "info") {
    const slug = rest[0] ?? die("info needs a slug");
    const info = await supervisor(`/addons/${slug}/info`);
    console.log(
      `  ${info.name} ${info.version} · ${info.state} · boot=${info.boot} · sidebar=${info.ingress_panel}`,
    );
  } else {
    die(`unknown command: ${command}`);
  }
} catch (error) {
  // Supervisor's own message is the useful half; the JS stack under it is not.
  console.error(`✗ ${error.message}`);
  process.exitCode = 1;
} finally {
  close();
}

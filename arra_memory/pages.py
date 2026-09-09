"""
Server-rendered pages. Only the OAuth approval page lives here: it is loaded by a
redirect from a client we do not control, posts a passphrase, and must render
before any bundle could load. Every value is escaped.
"""

from __future__ import annotations

from .utils import escape_html

STYLES = """
  :root {
    color-scheme: dark;
    --ink: #f4f1ea; --dim: #a8a091; --ground: #14120f;
    --panel: #1c1915; --line: #332e26; --ember: #d8853a;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 1.5rem;
    background: var(--ground); color: var(--ink);
    font: 400 16px/1.55 ui-sans-serif, system-ui, -apple-system, sans-serif;
  }
  .card {
    width: 100%; max-width: 26rem; background: var(--panel);
    border: 1px solid var(--line); border-radius: 14px; padding: 2rem;
  }
  .mark {
    font: 600 0.68rem/1 ui-monospace, monospace; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--ember); margin-bottom: 1.25rem;
  }
  h1 { font-size: 1.3rem; margin: 0 0 0.5rem; letter-spacing: -0.01em; }
  p { margin: 0 0 1.25rem; color: var(--dim); font-size: 0.93rem; }
  strong { color: var(--ink); font-weight: 600; }
  label {
    display: block; font: 400 0.72rem/1 ui-monospace, monospace;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--dim); margin-bottom: 0.5rem;
  }
  input[type=password] {
    width: 100%; padding: 0.7rem 0.85rem; background: var(--ground); color: var(--ink);
    border: 1px solid var(--line); border-radius: 8px; font: inherit;
  }
  input[type=password]:focus-visible {
    outline: 2px solid var(--ember); outline-offset: 1px; border-color: transparent;
  }
  button {
    width: 100%; margin-top: 1.25rem; padding: 0.75rem 1rem;
    background: var(--ember); color: #17130e; border: 0; border-radius: 8px;
    font: 600 0.95rem/1 inherit; cursor: pointer;
  }
  button:hover { filter: brightness(1.08); }
  button:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
  .error { color: #f0928f; font-size: 0.87rem; margin: 0 0 1rem; }
  .scope {
    margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--line);
    font: 400 0.75rem/1.5 ui-monospace, monospace; color: var(--dim); margin-bottom: 0;
  }
"""


def approval_page(*, client_name: str, params: dict[str, str], error: str | None = None) -> str:
    name = escape_html(client_name)
    hidden = "\n".join(
        f'<input type="hidden" name="{escape_html(k)}" value="{escape_html(str(v))}" />' for k, v in params.items()
    )
    error_html = f'<p class="error" role="alert">{escape_html(error)}</p>' if error else ""
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Connect to Arra Memory</title>
    <style>{STYLES}</style>
  </head>
  <body>
    <main class="card">
      <div class="mark">Arra Memory</div>
      <h1>Connect {name}?</h1>
      <p><strong>{name}</strong> is asking to read and write your memories. Enter your owner passphrase to allow it.</p>
      {error_html}
      <form method="post" action="/authorize">
        {hidden}
        <label for="passphrase">Owner passphrase</label>
        <input id="passphrase" name="passphrase" type="password" autocomplete="current-password" autofocus required />
        <button type="submit">Allow access</button>
      </form>
      <p class="scope">scope: {escape_html(params.get("scope", ""))}</p>
    </main>
  </body>
</html>"""

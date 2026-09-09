import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import { t } from "./i18n";
import type { SettingsInfo, SettingField } from "./types";

/**
 * The add-on's options, editable where editing them is honest.
 *
 * On Home Assistant OS this deliberately renders READ-ONLY and points at the
 * Configuration tab. Supervisor rewrites its own options on every change, so an
 * edit made here would appear to save and then vanish the next time anyone
 * touched that tab. A form that loses your work is worse than one that declines
 * it, so the server refuses the write and this explains why rather than hiding
 * the fields.
 *
 * Everywhere else — plain Docker, a VPS, a compose stack — this IS the
 * configuration surface, because there is no Supervisor to provide one.
 *
 * Three things are shown that Supervisor's own form does not show, and each
 * exists because its absence caused a real confusion:
 *
 *   · WHERE a value came from. A field showing the right value for the wrong
 *     reason is indistinguishable from a correct one until you change it and
 *     nothing happens.
 *   · WHETHER it is pinned by the environment. Those cannot be changed here,
 *     so they are disabled rather than accepted and silently ignored.
 *   · That a change needs a RESTART. Options take effect at start; implying
 *     otherwise invites "I changed it and it did nothing".
 */
export function ServerOptions() {
  const [info, setInfo] = useState<SettingsInfo | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [revealValues, setRevealValues] = useState<Record<string, string>>({});
  const [clients, setClients] = useState<
    Array<{ clientId: string; clientName: string | null; createdAt: string;
      activeTokens: number; lastTokenAt: string | null; scope: string | null }> | null
  >(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      setInfo(await api.settings.get());
      setDraft({});
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load settings.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    void api.access.clients().then((r) => setClients(r.clients)).catch(() => setClients([]));
  }, []);

  async function toggleReveal(key: string) {
    const opening = !reveal[key];
    // Fetched at the moment of asking, never sooner: the secret is not in the
    // page, the props, or the state until the owner clicks.
    if (opening && !(key in revealValues)) {
      try {
        const r = await api.settings.reveal(key);
        setRevealValues((v) => ({ ...v, [key]: r.value }));
      } catch { return; }
    }
    setReveal((r) => ({ ...r, [key]: opening }));
  }

  async function regenerate() {
    if (!confirm(t("settings.regen.confirm"))) return;
    try {
      const r = await api.settings.regenerate("api_token");
      setRevealValues((v) => ({ ...v, api_token: r.value }));
      setReveal((x) => ({ ...x, api_token: true }));
      setNote(t("settings.regen.title"));
      setInfo(await api.settings.get());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not regenerate.");
    }
  }

  async function revoke(id: string) {
    if (!confirm(t("access.revoke.confirm"))) return;
    await api.access.revoke(id).catch(() => {});
    const r = await api.access.clients().catch(() => ({ clients: [] }));
    setClients(r.clients);
  }

  const dirty = Object.keys(draft).length > 0;

  async function save() {
    if (!dirty) return;
    setBusy(true);
    setNote(null);
    try {
      const r = await api.settings.patch(draft);
      setInfo(r);
      setDraft({});
      // Report the ignored keys rather than letting the field sit there showing
      // a value the server will never use.
      const parts: string[] = [];
      if (r.written?.length) parts.push(`Saved ${r.written.length}.`);
      if (r.ignored?.length) parts.push(`Ignored ${r.ignored.join(", ")} — ${r.ignoredReason}.`);
      if (r.restartRequired) parts.push("Restart the add-on for this to take effect.");
      setNote(parts.join(" ") || "Nothing changed.");
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <details className="server-options">
      {/* Collapsed by default, and that is the point. On a supervised install
          these are read-only, and even where they are editable they are set
          once — so they must not push the things you actually use down the
          page. The summary carries enough to answer "is anything unset?"
          without opening it. */}
      <summary>
        <span>{t("settings.options.title")}</span>
        <span className="meta">
          {info ? `${info.settings.filter((f) => f.value !== "").length}/${info.settings.length}` : "…"}
          {info && !info.writable ? ` · ${t("settings.readonly")}` : ""}
        </span>
      </summary>

      <p className="meta mb-1">{t("settings.options.subtitle")}</p>

      {error && <p className="error">{error}</p>}
      {note && <p className="note">{note}</p>}
      {info && !info.writable && <p className="note warn">{info.reason}</p>}

      {info?.writable && (
        <div className="row gap-1 mb-1">
          <button className="act" disabled={!dirty || busy} onClick={() => void save()}>
            {busy ? "…" : t("settings.save")}
          </button>
          {dirty && (
            <button className="act" disabled={busy} onClick={() => setDraft({})}>
              {t("settings.revert")}
            </button>
          )}
        </div>
      )}

      <div className="access-block">
        <h4>{t("access.title")}</h4>
        <p className="meta">{t("access.subtitle")}</p>
        {clients === null ? null : clients.length === 0 ? (
          <p className="meta">{t("access.none")}</p>
        ) : (
          <ul className="access-list">
            {clients.map((c) => {
              const name = c.clientName || "";
              // The client TOLD us its type at registration; surface it instead
              // of making the reader parse it out of a name.
              const kind = /claude code/i.test(name) ? "Claude Code"
                : /codex/i.test(name) ? "Codex"
                : /^claude$/i.test(name.trim()) ? "claude.ai"
                : "other";
              return (
              <li key={c.clientId} className={c.activeTokens === 0 ? "inactive" : undefined}>
                <span className="kind">{kind}</span>
                <span className="mono">{name || c.clientId.slice(0, 12) + "…"}</span>
                <span className="meta num">{c.activeTokens} {t("access.tokens")}</span>
                <span className="meta">{c.scope ?? "—"} · {c.createdAt.slice(0, 10)}</span>
                <button className="act-danger" onClick={() => void revoke(c.clientId)}>
                  {t("access.revoke")}
                </button>
              </li>
            );})}
          </ul>
        )}
      </div>

      <div className="settings-form">
        {info?.settings.map((f) => (
          <Field
            key={f.key}
            field={f}
            editable={Boolean(info.writable) && !f.pinnedByEnv}
            value={draft[f.key] ?? (f.secret ? "" : f.value)}
            revealed={Boolean(reveal[f.key])}
            revealedValue={revealValues[f.key]}
            onReveal={() => void toggleReveal(f.key)}
            onChange={(v) => setDraft((d) => ({ ...d, [f.key]: v }))}
            onRegenerate={f.key === "api_token" && info.writable && !f.pinnedByEnv ? regenerate : undefined}
            dirty={f.key in draft}
          />
        ))}
      </div>
    </details>
  );
}

function Field({
  field, editable, value, revealed, revealedValue, onReveal, onChange, onRegenerate, dirty,
}: {
  field: SettingField;
  editable: boolean;
  value: string;
  revealed: boolean;
  /** The actual secret, fetched on demand — only ever present after reveal. */
  revealedValue?: string;
  onReveal: () => void;
  onChange: (v: string) => void;
  onRegenerate?: () => void;
  dirty: boolean;
}) {
  const set = field.value !== "";
  return (
    <label className={`setting${editable ? "" : " locked"}${dirty ? " dirty" : ""}`}>
      <span className="setting-key">
        {field.key}
        {field.pinnedByEnv && (
          // The single most useful thing on this page: it explains why editing
          // would do nothing, instead of letting you find out by trying.
          <em className="pin" title={t("settings.pinned.title")}>{t("settings.pinned")}</em>
        )}
      </span>

      <span className="setting-input">
        <input
          type={field.secret && !revealed ? "password" : "text"}
          value={field.secret && revealed && !dirty ? (revealedValue ?? "") : value}
          disabled={!editable}
          spellCheck={false}
          autoComplete="off"
          // A secret is never sent to the browser, so the box starts empty and
          // its placeholder says whether one is set and how long it is.
          placeholder={field.secret ? (set ? field.value : t("settings.unset")) : t("settings.unset")}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        {field.secret && (
          // Reveal fetches the stored value from the server on demand — the
          // secret is never in the page until the owner asks for it. Shown for
          // read-only installs too: reading the token back is the whole reason
          // to open this row.
          <button type="button" className="act" onClick={onReveal}>
            {revealed ? t("settings.hide") : t("settings.show")}
          </button>
        )}
        {onRegenerate && (
          <button type="button" className="act" onClick={onRegenerate}
                  title={t("settings.regen.title")}>
            {t("settings.regen")}
          </button>
        )}
      </span>

      <span className="setting-meta">
        {t(`settings.source.${field.source}`)}
        {field.restartRequired && <> · {t("settings.restart")}</>}
      </span>
    </label>
  );
}

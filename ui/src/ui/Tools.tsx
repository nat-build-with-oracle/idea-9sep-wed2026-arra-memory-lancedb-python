import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import { Appearance } from "./Appearance";
import { ServerOptions } from "./Settings";
import { Panel } from "./Menu";
import { t } from "./i18n";
import type { ToolInfo } from "./types";

/**
 * The MCP tool surface, as the owner can see and shape it.
 *
 * Most of these tools do not exist in the source — they are generated from the
 * corpus, one per project and one per time window, so the list here changes as
 * the archive does. Showing that is half the point: it is otherwise invisible
 * unless you read a client's tool picker.
 *
 * Switching one off hides it from `tools/list` and refuses it if called
 * anyway. Nothing is deleted; re-enable and it returns.
 */
export function Tools({ onClose, nav }: { onClose: () => void; nav?: React.ReactNode }) {
  const [tools, setTools] = useState<ToolInfo[]>([]);
  const [locked, setLocked] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const r = await api.tools.list();
      setTools(r.tools);
      setLocked(r.locked);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load the tool list.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // Escape is handled by <Panel>, which yields while a dialog is open.
  // This page used to register its own copy without that guard, so one
  // Escape dismissed the compose form AND navigated the page out from
  // under it — two window listeners for one key, and the unguarded one won.

  const toggle = async (tool: ToolInfo) => {
    // Optimistic, and reverted on failure — the server refuses some of these
    // and the UI must not keep claiming otherwise.
    const previous = tools;
    setTools((list) =>
      list.map((t) => (t.name === tool.name ? { ...t, disabled: !t.disabled } : t)),
    );
    try {
      await api.tools.setDisabled(tool.name, !tool.disabled);
    } catch (e) {
      setTools(previous);
      setError(e instanceof Error ? e.message : "That tool could not be changed.");
    }
  };

  const fixed = tools.filter((t) => !t.generated);
  const generated = tools.filter((t) => t.generated);
  const offCount = tools.filter((t) => t.disabled).length;

  return (
    <Panel
      eyebrow={t("nav.settings")}
      title={`${tools.length} tools${offCount ? `, ${offCount} off` : ""}`}
      subtitle="A tool that is off is hidden from clients and refused if called anyway. Nothing is deleted — switch it back on and it returns."
      onClose={onClose}
      nav={nav}
      actions={
        offCount > 0 ? (
          <button
            type="button"
            disabled={busy}
            onClick={async () => {
              await api.tools.enableAll();
              await load();
            }}
            className="meta rounded border border-line px-2 py-1 transition-colors hover:border-ember hover:text-ember"
          >
            turn everything back on
          </button>
        ) : undefined
      }
    >
      <Appearance />
      <ServerOptions />
      <>


          {error && (
            <p role="alert" className="mb-3 rounded-lg border border-[#5c2320] bg-[#2a1614] px-3 py-2 text-sm text-[#f0928f]">
              {error}
            </p>
          )}

          <Section
            title="Built in"
            note="Defined in the source. The same on every install."
            tools={fixed}
            locked={locked}
            onToggle={toggle}
          />
          <Section
            title="Generated from the corpus"
            note="One per project that has memories, plus the time windows. These appear and disappear as the archive changes."
            tools={generated}
            locked={locked}
            onToggle={toggle}
          />
      </>
    </Panel>
  );
}

function Section({
  title,
  note,
  tools,
  locked,
  onToggle,
}: {
  title: string;
  note: string;
  tools: ToolInfo[];
  locked: string[];
  onToggle: (t: ToolInfo) => void;
}) {
  if (tools.length === 0) return null;
  return (
    <section className="mb-6">
      <h3 className="eyebrow mb-1">
        {title} <span className="opacity-60">{tools.length}</span>
      </h3>
      <p className="mb-3 text-xs text-faint">{note}</p>
      <ul className="flex flex-col gap-1.5">
        {tools.map((t) => {
          const isLocked = locked.includes(t.name);
          return (
            <li
              key={t.name}
              className="flex items-start gap-3 rounded-lg border border-line px-3 py-2.5"
              style={{ opacity: t.disabled ? 0.45 : 1 }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <code className="font-mono text-[0.82rem] text-ink">{t.name}</code>
                  {t.destructive && (
                    <span className="rounded bg-[#3a1d1b] px-1.5 py-0.5 font-mono text-[0.62rem] text-[#f0928f]">
                      destructive
                    </span>
                  )}
                  {t.project && (
                    <span className="meta truncate">{t.project}</span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-dim">{t.description}</p>
              </div>

              {isLocked ? (
                <span className="meta shrink-0 pt-1" title="Needed to discover the corpus">
                  always on
                </span>
              ) : (
                <button
                  type="button"
                  role="switch"
                  aria-checked={!t.disabled}
                  aria-label={`${t.disabled ? "Enable" : "Disable"} ${t.name}`}
                  onClick={() => onToggle(t)}
                  className="mt-0.5 h-5 w-9 shrink-0 rounded-full border transition-colors"
                  style={{
                    borderColor: t.disabled ? "var(--color-line)" : "var(--color-ember)",
                    background: t.disabled ? "transparent" : "var(--color-ember-soft)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="block size-3.5 rounded-full transition-transform"
                    style={{
                      background: t.disabled ? "var(--color-line-bright)" : "var(--color-ember)",
                      transform: t.disabled ? "translateX(3px)" : "translateX(17px)",
                    }}
                  />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
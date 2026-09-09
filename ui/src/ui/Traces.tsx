import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import { timeAgo } from "./components";
import { t } from "./i18n";
import { Panel } from "./Menu";
import type { AskedCloud, Timeline, TraceEntry, TraceStats } from "./types";

/**
 * The station log: what was asked of this corpus, and what came back.
 *
 * A different question from the search log next door. That one records what was
 * looked FOR; this records every call that arrived — including the ones that
 * failed and the ones that found nothing, which are the two a person actually
 * comes here to find.
 *
 * The timeline sits at the top rather than on its own page because the two
 * answer one question between them: the strip says WHEN it was busy, the table
 * says WHAT happened, and splitting them would mean reading a date here and
 * scrolling for it there.
 *
 * Reading this page writes nothing. Its routes are untraced on the server, so a
 * panel left open cannot fill the log with its own polling.
 */

const OUTCOME_TONE: Record<string, string> = {
  // A zero-result search and a failure are the interesting rows; everything
  // else is noise until you need it.
  error: "text-[#f0928f]",
  empty: "text-[#f0928f]",
};

function Sparkline({ timeline }: { timeline: Timeline }) {
  const peak = Math.max(1, ...timeline.days.map((d) => d.written + d.traced));
  return (
    <div className="mb-4">
      <div className="flex items-end gap-[2px]" style={{ height: "2.5rem" }}>
        {timeline.days.map((d) => {
          const total = d.written + d.traced;
          // Two stacked bars, not one: "written" and "asked" are different
          // events and a merged bar would hide which kind of day it was.
          return (
            <div
              key={d.day}
              className="flex flex-1 flex-col justify-end"
              title={`${d.day} — ${d.written} ${t("trace.written")}, ${d.traced} ${t("trace.asked")}`}
              style={{ minWidth: "3px" }}
            >
              <div style={{ height: `${(d.traced / peak) * 100}%`, background: "var(--color-line-bright)" }} />
              <div style={{ height: `${(d.written / peak) * 100}%`, background: "var(--color-ember)" }} />
            </div>
          );
        })}
      </div>
      <p className="meta mt-1.5 flex flex-wrap items-center gap-x-3">
        <span>{timeline.from}</span>
        <span className="flex-1" />
        <span style={{ color: "var(--color-ember)" }}>
          {timeline.totals.written} {t("trace.written")}
        </span>
        <span>
          {timeline.totals.traced} {t("trace.asked")}
        </span>
        <span>{timeline.to}</span>
      </p>
    </div>
  );
}

/**
 * The second cloud: what has been ASKED for.
 *
 * The archive's cloud says what the corpus is made of; this one says what people
 * keep coming to it for, and they are worth reading side by side. A subject that
 * is large here and missing from the tag cloud is a question this corpus has
 * never been able to answer — which is the most useful thing either picture
 * gives you, and neither can show it alone.
 *
 * Same law, same 11–20px, computed by the same function on the server.
 */
function AskedCloudRow({ cloud, onPick }: { cloud: AskedCloud; onPick: (subject: string) => void }) {
  if (!cloud.items.length) return null;
  return (
    <div className="facet-row mb-4">
      <span className="eyebrow">{t("trace.asked")}</span>
      <div className="flex flex-wrap items-baseline gap-1.5">
        {cloud.items.map((i) => (
          <button
            key={i.subject}
            type="button"
            className="chip chip-cloud"
            style={{ fontSize: `${i.size}px` }}
            aria-label={`${i.subject}, ${i.count}`}
            title={`${i.subject} — ${i.count}`}
            onClick={() => onPick(i.subject)}
          >
            <span>{i.subject}</span>
            <span className="sr-only">{i.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Traces({ onClose, nav }: { onClose: () => void; nav?: React.ReactNode }) {
  const [entries, setEntries] = useState<TraceEntry[]>([]);
  const [stats, setStats] = useState<TraceStats | null>(null);
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [asked, setAsked] = useState<AskedCloud | null>(null);
  const [filter, setFilter] = useState("");
  const [outcome, setOutcome] = useState<string>("");
  const [surface, setSurface] = useState<string>("");
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<"all" | null>(null);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const [log, line, cloud] = await Promise.all([
        api.traces.list({
          limit: 200,
          q: filter || undefined,
          outcome: outcome || undefined,
          surface: surface || undefined,
        }),
        api.timeline(30),
        api.traces.cloud(),
      ]);
      setEntries(log.entries);
      setStats(log.stats);
      setTimeline(line);
      setAsked(cloud);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load the trace log.");
    } finally {
      setBusy(false);
    }
  }, [filter, outcome, surface]);

  useEffect(() => {
    const timer = setTimeout(load, filter ? 180 : 0);
    return () => clearTimeout(timer);
  }, [load, filter]);

  const act = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    try {
      await fn();
      setConfirming(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That did not work.");
      setBusy(false);
    }
  };

  const toggle = (set: (v: string) => void, current: string, value: string) =>
    set(current === value ? "" : value);

  return (
    <Panel
      eyebrow={t("trace.eyebrow")}
      title={t("trace.title")}
      subtitle={stats && !stats.enabled ? t("trace.off") : undefined}
      onClose={onClose}
      nav={nav}
      actions={
        <>
          <p className="meta mb-2">{t("trace.blurb")}</p>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={t("trace.search")}
            className="w-full rounded-lg border border-line bg-ground px-3 py-2 text-sm text-ink placeholder:text-faint"
          />
          <div className="meta mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            {/* The two filters worth having as one click: the failures, and the
                searches that found nothing. Everything else is the text box. */}
            <button
              type="button"
              className="chip"
              aria-pressed={outcome === "empty"}
              onClick={() => toggle(setOutcome, outcome, "empty")}
            >
              {t("trace.emptyOnly")}
            </button>
            <button
              type="button"
              className="chip"
              aria-pressed={outcome === "error"}
              onClick={() => toggle(setOutcome, outcome, "error")}
            >
              {t("trace.errorsOnly")}
            </button>
            <button
              type="button"
              className="chip"
              aria-pressed={surface === "mcp"}
              onClick={() => toggle(setSurface, surface, "mcp")}
            >
              mcp
            </button>
            <button
              type="button"
              className="chip"
              aria-pressed={surface === "web"}
              onClick={() => toggle(setSurface, surface, "web")}
            >
              web
            </button>
            <span className="flex-1" />
            <span>
              {entries.length} {t("archive.shown")}
              {stats ? ` · ${stats.total} ${t("trace.recorded")}` : ""}
            </span>
            {stats?.enabled && stats.total > 0 && (
              <>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => act(() => api.traces.prune(30))}
                  className="rounded border border-line px-2 py-1 transition-colors hover:border-ember hover:text-ember disabled:opacity-40"
                >
                  {t("trace.prune")}
                </button>
                {confirming === "all" ? (
                  <span className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => act(() => api.traces.clear())}
                      className="rounded bg-[#5c2320] px-2 py-1 text-[#f0928f]"
                    >
                      {t("trace.clearConfirm").replace("{n}", String(stats.total))}
                    </button>
                    <button type="button" onClick={() => setConfirming(null)} className="rounded px-2 py-1 text-dim hover:text-ink">
                      {t("compose.cancel")}
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setConfirming("all")}
                    className="rounded border border-line px-2 py-1 transition-colors hover:border-[#f0928f] hover:text-[#f0928f] disabled:opacity-40"
                  >
                    {t("trace.clear")}
                  </button>
                )}
              </>
            )}
          </div>
        </>
      }
    >
      {error && (
        <p role="alert" className="mb-3 rounded-lg border border-[#5c2320] bg-[#2a1614] px-3 py-2 text-sm text-[#f0928f]">
          {error}
        </p>
      )}

      {timeline && <Sparkline timeline={timeline} />}
      {/* Clicking a subject filters the log to it — the cloud is a read control,
          the same way every tag chip in the archive is. */}
      {asked && <AskedCloudRow cloud={asked} onPick={(s) => setFilter(s)} />}

      {!entries.length ? (
        <p className="py-14 text-center text-sm text-dim">{t("trace.empty")}</p>
      ) : (
        // A dense table inside its own scroller: the log is wide by nature and
        // the page must not scroll sideways because of it.
        <div className="overflow-x-auto">
          <ul className="flex flex-col gap-1">
            {entries.map((e) => (
              <li key={e.id} className="rounded-lg border border-line px-3 py-2 transition-colors hover:border-line-bright">
                <button
                  type="button"
                  onClick={() => setOpen(open === e.id ? null : e.id)}
                  className="meta flex w-full flex-wrap items-baseline gap-x-2.5 gap-y-1 text-left"
                  aria-expanded={open === e.id}
                >
                  <span className="tabular-nums text-faint">{timeAgo(e.at)}</span>
                  <span className="text-faint">
                    {e.surface}/{e.kind}
                  </span>
                  <span className="text-ink">{e.tool}</span>
                  {e.subject && <span className="text-ember">“{e.subject}”</span>}
                  <span className="flex-1" />
                  {e.mode && <span>{e.mode}</span>}
                  {/* A zero-hit result is the row someone came here to find, so
                      it is coloured rather than left to be counted. */}
                  <span className={`tabular-nums ${e.hits === 0 ? OUTCOME_TONE.empty : ""}`}>
                    {e.hits} {t("trace.hits")}
                  </span>
                  <span className="tabular-nums">{e.durationMs}ms</span>
                </button>
                {e.outcome === "error" && e.error && (
                  <p className={`meta mt-1 ${OUTCOME_TONE.error}`}>{e.error}</p>
                )}
                {open === e.id && (
                  <div className="meta mt-2 flex flex-col gap-1.5 border-t border-line pt-2">
                    {e.input && (
                      <pre className="overflow-x-auto whitespace-pre-wrap break-all text-faint">{e.input}</pre>
                    )}
                    {e.result && (
                      <pre className="overflow-x-auto whitespace-pre-wrap break-all text-faint">{e.result}</pre>
                    )}
                    {e.subject && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => act(() => api.traces.forget(e.subject))}
                        className="self-start rounded border border-line px-2 py-1 transition-colors hover:border-[#f0928f] hover:text-[#f0928f]"
                      >
                        {t("trace.forget").replace("{k}", e.subject)}
                      </button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Panel>
  );
}

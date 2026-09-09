import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiError, api } from "./api";
import { MemoryCard, useSlashFocus } from "./components";
import { Chips, kindColor } from "./Chips";
import { Atlas } from "./Atlas";
import { SearchLog } from "./SearchLog";
import { Tools } from "./Tools";
import { Workspaces } from "./Workspaces";
import { NavBar, Panel } from "./Menu";
import { EMPTY_ROUTE, useRoute, type View } from "./route";
import { applyServerDefaultLang, instanceName, setInstanceName, t, useLang } from "./i18n";
import { applyServerDefaultTheme, THEMES, useTheme } from "./theme";
import {
  EMPTY_SCOPE,
  SUGGESTED_KINDS,
  type Facets,
  type Health,
  type Memory,
  type MemoryStats,
  type Scope,
} from "./types";

type Phase = "checking" | "locked" | "ready";

export default function App() {
  const [phase, setPhase] = useState<Phase>("checking");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [stats, setStats] = useState<MemoryStats | null>(null);
  // The address bar is the source of truth for what is on screen: which view,
  // what was searched, and what it was scoped to. Reloading, sharing a link and
  // the back button all work because there is nowhere else for that state to
  // hide.
  const [route, navigate] = useRoute();
  const { view, query } = route;
  // The value and setter, not just the re-render: the switch is in the nav now.
  const [lang, setLang] = useLang();
  const [theme, setTheme] = useTheme();
  const scope: Scope = {
    kind: route.kind,
    workspace: route.workspace,
    project: route.project,
    createdBy: route.createdBy,
  };
  /**
   * Changing view drops the archive's own state.
   *
   * Carrying `q` and the scope onto Settings put them in the URL of a page that
   * ignores them — and worse, it meant the query never *changed*: replaying
   * "Trigram" from the search log navigated to a query the route was already
   * holding, so the load effect never refired, no search ran, and nothing was
   * recorded. A filter that survives leaving the thing it filters is not state,
   * it is a leak. Back still returns to the filtered list.
   */
  const setView = (next: View) =>
    navigate(next === "memory" ? { ...route, view: next } : { ...EMPTY_ROUTE, view: next });
  const setQuery = (next: string) => navigate({ ...route, query: next });
  const setFilters = (next: { scope: Scope; tags: string[] }) =>
    navigate({ ...route, ...next.scope, tag: next.tags });
  // Every chip row, from one request. Refreshed with the list so a chip can
  // never name a value the corpus no longer has.
  const [facets, setFacets] = useState<Facets>({
    kinds: [], workspaces: [], unassigned: 0, projects: [], agents: [], tags: [], total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const [health, setHealth] = useState<Health | null>(null);

  const searchRef = useSlashFocus();

  // Public endpoint, so this runs before unlocking — the footer can state the
  // build and what is switched on even at the lock screen.
  useEffect(() => {
    api.health()
      .then((h) => {
        setHealth(h);
        // The owner's configured defaults, applied only if this browser has
        // never chosen. Deliberately after the first paint rather than blocking
        // it: a slow health call must not leave the page blank, and someone who
        // has already picked a language sees no flicker because nothing changes.
        applyServerDefaultLang(h.defaults?.language);
        applyServerDefaultTheme(h.defaults?.theme);
        // The instance's own name, into the chrome that renders before/without
        // prop access: the browser tab, and the archive eyebrow via i18n.
        if (h.name) {
          document.title = h.name;
          setInstanceName(h.name);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    api.session
      .check()
      .then((r) => setPhase(r.authenticated ? "ready" : "locked"))
      .catch(() => setPhase("locked"));
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [found, corpus, allFacets] = await Promise.all([
        api.memories.search({ q: query, ...scope, tag: route.tag, limit: 100 }),
        api.stats(),
        api.facets(),
      ]);
      setMemories(found.memories);
      setStats(corpus.stats);
      setFacets(allFacets);
      setError(null);
    } catch (err) {
      // A 401 mid-session means the cookie lapsed or was revoked elsewhere.
      // That is a lock screen, not an error banner.
      if (err instanceof ApiError && err.status === 401) {
        setPhase("locked");
        return;
      }
      setError(err instanceof Error ? err.message : t("error.load"));
    } finally {
      setLoading(false);
    }
  }, [query, route.kind, route.workspace, route.project, route.createdBy, route.tag]);

  // Debounced: the corpus is searched on every keystroke, and a local libSQL
  // file is fast enough that 180ms is about perception, not about load.
  useEffect(() => {
    if (phase !== "ready") return;
    const timer = setTimeout(load, query ? 180 : 0);
    return () => clearTimeout(timer);
  }, [phase, load, query]);

  /**
   * Catch up when the tab comes back.
   *
   * The corpus has more than one writer. Claude writes over MCP, another browser
   * writes, a merge runs from a script — and this page only reloaded when the
   * query or a filter changed, so none of that reached it. A chip row would keep
   * offering `decision 1` after the last decision had been merged away, and
   * clicking it returned nothing: the UI confidently describing a corpus that no
   * longer existed.
   *
   * Refetching on focus rather than polling, because the case is always the
   * same shape — you did something elsewhere and came back. A timer would spend
   * requests on a tab nobody is looking at to fix a problem that only matters
   * the moment someone looks.
   */
  useEffect(() => {
    if (phase !== "ready") return;
    const onFocus = () => {
      if (document.visibilityState === "visible") void load();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [phase, load]);

  if (phase === "checking") return <Splash />;
  if (phase === "locked") return <Lock onOpen={() => setPhase("ready")} />;

  // One nav, built once, rendered by one component in one position on every
  // page — including the primary action. Dropping "Remember" on the other pages
  // made the bar change width and the buttons shift under the cursor between
  // views, which reads as a different menu rather than the same one. Writing a
  // memory is what this app is for; it is not an archive-only errand.
  const nav = (
    <NavBar
      // Remember moved onto the Memory page itself — writing a memory is
      // something you do while looking at your memories, not a nav destination.
      themes={{
        current: theme,
        options: THEMES,
        onSelect: setTheme,
      }}
      lang={{
        label: lang === "th" ? "EN" : "ไทย",
        title: t("lang.label"),
        onSelect: () => setLang(lang === "th" ? "en" : "th"),
      }}
      items={[
        // Weights, not array order — see NavItem. Gaps of 10 leave room to
        // add a destination between two existing ones without renumbering.
        {
          label: t("nav.archive"),
          weight: 10,
          active: view === "memory",
          onSelect: () => setView("memory"),
        },
        // Workspaces is deliberately NOT a nav destination.
        //
        // It was one, briefly. A workspace answers "which subset of what I am
        // looking at", which makes it a filter — and a filter promoted to a
        // destination costs a click on every use and splits one question across
        // two screens: the page showed structure, the archive showed memories,
        // and neither showed both. The scope bar above the list does the job in
        // one click, and `#/workspaces` still resolves for anything that linked
        // to it.
        {
          label: t("nav.atlas"),
          title: t("nav.atlas.title"),
          weight: 20,
          active: view === "atlas",
          onSelect: () => setView("atlas"),
        },
        ...(health?.features.searchLog
          ? [{
              label: t("nav.searchLog"),
              title: t("nav.searchLog.title"),
              weight: 30,
              active: view === "log",
              onSelect: () => setView("log"),
            }]
          : []),
        // Configuration lives at the end, where configuration belongs — you
        // pass the things you use daily to reach the thing you set once.
        {
          label: t("nav.settings"),
          title: t("nav.settings.title"),
          weight: 50,
          active: view === "settings" || view === "tools",
          onSelect: () => setView("settings"),
        },
      ]}
      // Not a destination — it ends the session, so it sits with the other
      // session controls at the end of the bar rather than among the places
      // you can go.
      session={{
        label: t("nav.lock"),
        title: t("nav.lock.title"),
        danger: true,
        onSelect: () =>
          void api.session.close().finally(() => {
            setPhase("locked");
            setMemories([]);
          }),
      }}
    />
  );

  // Every view is a <Panel> with the same header, the same nav, in the same
  // place. The archive used to build its own header, which is how its menu
  // drifted from the rest.
  const body =
    view === "atlas" ? (
      <Atlas
        onClose={() => setView("memory")}
        nav={nav}
        // The drawing shows what the archive is showing — the chips filter both.
        scope={scope}
        onOpenMemory={(id) => {
          // Clicking a point searches for that memory's id, which is the one
          // query guaranteed to return exactly it and nothing else.
          navigate({ ...EMPTY_ROUTE, view: "memory", query: id });
        }}
      />
    ) : view === "workspaces" ? (
      <Workspaces
        onClose={() => setView("memory")}
        nav={nav}
        // Picking a workspace, project, or agent here IS the navigation: it
        // scopes the archive and takes you there, rather than showing a second
        // list of memories that would then have to stay in step with the real one.
        onFilter={(next) => {
          // Arrays, because every facet is a set now — a drill-down is simply a
          // one-element selection.
          navigate({
            ...EMPTY_ROUTE,
            view: "memory",
            workspace: next.workspace ? [next.workspace] : [],
            project: next.project ? [next.project] : [],
            createdBy: next.createdBy ? [next.createdBy] : [],
          });
        }}
      />
    ) : view === "settings" || view === "tools" ? (
      <Tools onClose={() => setView("memory")} nav={nav} />
    ) : view === "log" ? (
      <SearchLog
        onClose={() => setView("memory")}
        nav={nav}
        // Replaying puts you in the archive with the logged query AND its scope
        // restored, which runs a real search through the same path everything
        // else uses — so it is recorded, and the log grows an entry for the
        // replay. That is correct: it genuinely was a search.
        onReplay={(entry) => {
          // One navigate, not four setters: each would be a separate route
          // write, and the first three would be clobbered by the last since
          // they all derive `next` from the same stale route.
          navigate({
            ...EMPTY_ROUTE,
            view: "memory",
            query: entry.query,
            kind: entry.kind ? [entry.kind] : [],
            workspace: entry.workspace ? [entry.workspace] : [],
            project: entry.project ? [entry.project] : [],
          });
        }}
      />
    ) : (
      <Archive
        nav={nav}
        query={query}
        onQuery={setQuery}
        searchRef={searchRef}
        scope={scope}
        tags={route.tag}
        onFilters={setFilters}
        facets={facets}
        stats={stats}
        memories={memories}
        loading={loading}
        error={error}
        onCompose={() => setComposing(true)}
        // Following a [[reference]] searches for its title — the same resolution
        // the graph's link edges use, so clicking a link in the text and
        // clicking the matching edge in the atlas land in the same place.
        onFollow={(title) => navigate({ ...EMPTY_ROUTE, view: "memory", query: title })}
        onForget={async (id) => {
          // Optimistic: the row disappears immediately, and a failure puts it
          // back rather than leaving the UI lying.
          const previous = memories;
          setMemories((list) => list.filter((m) => m.id !== id));
          try {
            await api.memories.remove(id);
            void load();
          } catch {
            setMemories(previous);
            setError(t("error.forget"));
          }
        }}
      />
    );

  return (
    <div className="min-h-screen">
      {body}

      {/* Outside the view switch, so Remember works from every page rather than
          silently doing nothing on three of them. */}
      {composing && (
        <Compose
          // Pre-filled from what you are currently looking at. Writing a memory
          // while scoped to a workspace and having it land outside that workspace
          // is the mistake this prevents; both fields stay editable.
          scope={scope}
          onClose={() => setComposing(false)}
          onSaved={() => {
            setComposing(false);
            void load();
          }}
        />
      )}

      <Footer health={health} />
    </div>
  );
}

/**
 * The archive — the same <Panel> every other view uses.
 *
 * It used to hand-roll its own header, which is how its menu drifted from the
 * rest. The search box and the chip bar go through Panel's `actions` slot, which
 * is exactly what that slot is for.
 */
function Archive({
  nav,
  query,
  onQuery,
  searchRef,
  scope,
  tags,
  onFilters,
  facets,
  stats,
  memories,
  loading,
  error,
  onCompose,
  onForget,
  onFollow,
}: {
  nav: React.ReactNode;
  query: string;
  onQuery: (value: string) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  scope: Scope;
  tags: string[];
  onFilters: (next: { scope: Scope; tags: string[] }) => void;
  facets: Facets;
  stats: MemoryStats | null;
  memories: Memory[];
  loading: boolean;
  error: string | null;
  onCompose: () => void;
  onForget: (id: string) => void;
  onFollow: (title: string) => void;
}) {
  const scoped =
    tags.length > 0 ||
    scope.kind.length > 0 ||
    scope.workspace.length > 0 ||
    scope.project.length > 0 ||
    scope.createdBy.length > 0;
  const clear = () => onFilters({ scope: EMPTY_SCOPE, tags: [] });

  return (
    <Panel
      eyebrow={instanceName().toUpperCase()}
      title={t("archive.title")}
      nav={nav}
      // Archive is the home view, so there is nowhere to close to — Escape and
      // the nav's own Archive button both already land here.
      onClose={() => {}}
      actions={
        <>
          <label className="sr-only" htmlFor="search">
            {t("archive.searchLabel")}
          </label>
          {/* Writing a memory belongs beside the memories, not in the nav. It is
              something you do while looking at what you already have — usually
              BECAUSE of what you are looking at — so it sits next to the search
              box on this page rather than following you onto Settings. */}
          <div className="flex items-stretch gap-2">
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
                width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                id="search"
                ref={searchRef}
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder={t("archive.search")}
                className="w-full rounded-lg border border-line bg-panel py-2.5 pl-10 pr-16 text-ink placeholder:text-faint focus:border-transparent"
              />
              <kbd className="meta pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-line px-1.5 py-0.5">
                /
              </kbd>
            </div>
            <button
              type="button"
              onClick={onCompose}
              className="shrink-0 rounded-lg bg-ember px-4 text-sm font-semibold text-[#17130e] transition hover:brightness-110"
            >
              + {t("nav.remember")}
            </button>
          </div>

          <Chips
            facets={facets}
            scope={scope}
            tags={tags}
            onChange={onFilters}
            onClear={clear}
          />

          <p className="meta mt-3">
            {loading
              ? t("archive.searching")
              : `${memories.length} ${t("archive.shown")}${
                  stats ? ` · ${stats.total} ${t("archive.inCorpus")}` : ""
                }`}
          </p>
        </>
      }
    >
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-[#5c2320] bg-[#2a1614] px-3 py-2 text-sm text-[#f0928f]"
        >
          {error}
        </p>
      )}

      {memories.length === 0 && !loading ? (
        <Empty
          filtered={Boolean(query) || scoped}
          scoped={scoped}
          onClearScope={clear}
          onCompose={onCompose}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {memories.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              query={query}
              onDelete={onForget}
              onFollow={onFollow}
            />
          ))}
        </div>
      )}
    </Panel>
  );
}

function Footer({ health }: { health: Health | null }) {
  if (!health) return null;
  return (
    <footer className="mx-auto max-w-4xl px-5 pb-8">
      <p className="meta border-t border-line pt-3">
        {health.name ?? "Arra Memory"} v{health.version}
        {health.features.semantic && ` · semantic (${health.features.embeddingModel})`}
        {health.features.replica && " · replicated"}
        {health.features.searchLog && " · logging searches"}
      </p>
    </footer>
  );
}

function Splash() {
  return (
    <div className="grid min-h-screen place-items-center">
      <p className="eyebrow">{t("lock.splash")}</p>
    </div>
  );
}

function Lock({ onOpen }: { onOpen: () => void }) {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <div className="lamp grid min-h-screen place-items-center px-5">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setError(null);
          try {
            await api.session.open(passphrase);
            onOpen();
          } catch (err) {
            // Only a 401 means the passphrase is wrong. Everything else — the
            // server unreachable, a cookie the browser refused, a 500 — used to
            // be reported as "wrong passphrase" too, which is a specific and
            // confident lie: it sends someone to check the one thing that was
            // never the problem. Verified today with a passphrase the API
            // accepted with a 200 while this screen insisted it did not match.
            const status = err instanceof ApiError ? err.status : 0;
            setError(
              status === 401
                ? t("lock.wrong")
                : `${t("lock.failed")} (${status || "network"})`,
            );
          } finally {
            setBusy(false);
          }
        }}
        className="w-full max-w-sm rounded-2xl border border-line bg-panel p-8"
      >
        <p className="eyebrow mb-4" style={{ color: "var(--color-ember)" }}>
          {instanceName()}
        </p>
        <h1 className="mb-2 text-xl font-semibold tracking-tight">{t("lock.title")}</h1>
        <p className="mb-6 text-sm text-dim">{t("lock.hint")}</p>

        <label htmlFor="passphrase" className="eyebrow mb-2 block">
          {t("lock.field")}
        </label>
        <input
          id="passphrase"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          className="w-full rounded-lg border border-line bg-ground px-3 py-2.5 text-ink"
        />

        {error && (
          <p role="alert" className="mt-3 text-sm text-[#f0928f]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full rounded-lg bg-ember py-2.5 font-semibold text-[#17130e] transition hover:brightness-110 disabled:opacity-60"
        >
          {busy ? t("lock.opening") : t("lock.submit")}
        </button>
      </form>
    </div>
  );
}

function Empty({
  filtered,
  scoped,
  onClearScope,
  onCompose,
}: {
  filtered: boolean;
  scoped: boolean;
  onClearScope: () => void;
  onCompose: () => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-line py-16 text-center">
      <p className="mb-1.5 text-ink">
        {filtered ? t("empty.nothing") : t("empty.archive")}
      </p>
      <p className="mx-auto mb-5 max-w-sm text-sm text-dim">
        {filtered ? t("empty.filteredHint") : t("empty.emptyHint")}
      </p>
      {/* An empty scoped view is ambiguous — "the corpus has nothing" and "this
          filter has nothing" look identical — so offer the way out. */}
      {scoped && (
        <button
          type="button"
          onClick={onClearScope}
          className="rounded-lg border border-line px-3 py-1.5 text-sm text-dim transition hover:border-ember hover:text-ember"
        >
          {t("empty.searchAll")}
        </button>
      )}
      {!filtered && (
        <button
          type="button"
          onClick={onCompose}
          className="rounded-lg border border-line px-3 py-1.5 text-sm text-dim transition hover:border-ember hover:text-ember"
        >
          {t("empty.writeFirst")}
        </button>
      )}
    </div>
  );
}

function Compose({
  scope,
  onClose,
  onSaved,
}: {
  scope: Scope;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<string>(SUGGESTED_KINDS[0]);
  const [tags, setTags] = useState("");
  // Pre-filled from a single ticked chip. With several ticked there is no one
  // right answer, so it stays blank rather than guessing which one you meant.
  const [workspace, setWorkspace] = useState(scope.workspace.length === 1 ? scope.workspace[0]! : "");
  const [project, setProject] = useState(scope.project.length === 1 ? scope.project[0]! : "");
  const [importance, setImportance] = useState(3);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Escape closes. A modal that traps you is a modal people resent.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const parsedTags = useMemo(
    () => tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 10),
    [tags],
  );

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label={t("compose.title")}
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setError(null);
          try {
            await api.memories.create({
              content,
              title: title.trim() || undefined,
              kind,
              tags: parsedTags,
              importance,
              workspace: workspace.trim() || undefined,
              project: project.trim() || undefined,
            });
            onSaved();
          } catch (err) {
            setError(err instanceof Error ? err.message : t("compose.saveFailed"));
          } finally {
            setBusy(false);
          }
        }}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-line bg-panel p-6"
      >
        <h2 className="mb-5 text-lg font-semibold tracking-tight">{t("compose.title")}</h2>

        <label htmlFor="content" className="eyebrow mb-2 block">
          {t("compose.content")}
        </label>
        <textarea
          id="content"
          required
          autoFocus
          rows={7}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("compose.contentHint")}
          className="prose-memory w-full resize-y rounded-lg border border-line bg-ground px-3 py-2.5 placeholder:text-faint"
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="eyebrow mb-2 block">
              {t("compose.titleField")}{" "}
              <span className="normal-case tracking-normal">{t("compose.optional")}</span>
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("compose.titleHint")}
              className="w-full rounded-lg border border-line bg-ground px-3 py-2 text-sm text-ink placeholder:text-faint"
            />
          </div>

          <div>
            <label htmlFor="kind" className="eyebrow mb-2 block">
              {t("compose.kind")}
            </label>
            {/* Chips plus free text — the same idiom as the filter bar.
                This was a datalist, which is a <select> in disguise: it renders
                a native dropdown that covers whatever field comes next, and it
                hides its options until you interact. Both are the things the
                chip bar exists to avoid. The four suggestions are visible and
                one click each; the input beside them accepts anything, so
                writing "resonance" today still needs nobody's permission. */}
            <div className="flex flex-wrap items-center gap-1.5">
              {SUGGESTED_KINDS.map((k) => (
                <button
                  key={k}
                  type="button"
                  className="chip"
                  aria-pressed={kind === k}
                  onClick={() => setKind(k)}
                  style={kind === k ? undefined : { color: kindColor(k) }}
                >
                  {k}
                </button>
              ))}
              <input
                id="kind"
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                aria-label={t("compose.kind")}
                className="min-w-[6rem] flex-1 rounded-lg border border-line bg-ground px-2.5 py-1 text-sm text-ink placeholder:text-faint"
                placeholder={t("compose.kindOther")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="eyebrow mb-2 block">
              {t("compose.tags")}{" "}
              <span className="normal-case tracking-normal">{t("compose.tagsHint")}</span>
            </label>
            <input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="turso, haos"
              className="w-full rounded-lg border border-line bg-ground px-3 py-2 text-sm text-ink placeholder:text-faint"
            />
          </div>

          <div>
            <label htmlFor="workspace" className="eyebrow mb-2 block">
              Workspace <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id="workspace"
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              placeholder="arra-memory-haos"
              className="w-full rounded-lg border border-line bg-ground px-3 py-2 text-sm text-ink placeholder:text-faint"
            />
          </div>

          <div>
            <label htmlFor="project" className="eyebrow mb-2 block">
              Project <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id="project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="oauth"
              className="w-full rounded-lg border border-line bg-ground px-3 py-2 text-sm text-ink placeholder:text-faint"
            />
          </div>

          <div>
            <label htmlFor="importance" className="eyebrow mb-2 block">
              {t("compose.importance")} — {importance}
            </label>
            <input
              id="importance"
              type="range"
              min={1}
              max={5}
              value={importance}
              onChange={(e) => setImportance(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--color-ember)]"
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-[#f0928f]">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line px-3 py-2 text-sm text-dim transition hover:text-ink"
          >
            {t("compose.cancel")}
          </button>
          <button
            type="submit"
            disabled={busy || !content.trim()}
            className="rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-[#17130e] transition hover:brightness-110 disabled:opacity-50"
          >
            {busy ? t("compose.saving") : t("compose.save")}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useEffect, useState } from "react";
import { api } from "./api";
import { Panel } from "./Menu";
import type { AgentFacet, Memory, ProjectFacet, WorkspaceFacet } from "./types";

/**
 * How the corpus is divided, and who divided it.
 *
 * A workspace is the tier above project: one workspace holds many projects, and
 * many agents write into it. Neither tier has a table — both are a GROUP BY over
 * the memories themselves, so this page shows exactly what has been written and
 * can never disagree with the archive.
 *
 * Two levels, one page. The list answers "how is this archive divided"; opening
 * a row answers "what is inside this one" without losing the list.
 */

export function Workspaces({
  onClose,
  nav,
  onFilter,
}: {
  onClose: () => void;
  nav?: React.ReactNode;
  /** Hand a scope back to the archive and switch to it — the point of the page. */
  onFilter: (scope: { workspace?: string; project?: string; createdBy?: string }) => void;
}) {
  const [workspaces, setWorkspaces] = useState<WorkspaceFacet[]>([]);
  const [unassigned, setUnassigned] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.workspaces
      .list()
      .then((r) => {
        setWorkspaces(r.workspaces);
        setUnassigned(r.unassigned);
        setError(null);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load workspaces."))
      .finally(() => setLoading(false));
  }, []);

  const total =
    workspaces.reduce((sum, w) => sum + w.count, 0) + unassigned;

  return (
    <Panel
      eyebrow="Arra Memory"
      title="Workspaces"
      subtitle="A workspace is the tier above project — one workspace holds many projects and many agents. Nothing here is configured: a workspace exists because a memory names it, and disappears when its last memory does."
      onClose={onClose}
      nav={nav}
    >
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-[#5c2320] bg-[#2a1614] px-3 py-2 text-sm text-[#f0928f]"
        >
          {error}
        </p>
      )}

      {loading ? (
        <p className="meta">reading the archive…</p>
      ) : workspaces.length === 0 && unassigned === 0 ? (
        <Empty />
      ) : (
        <>
          <p className="meta mb-4">
            {workspaces.length} workspace{workspaces.length === 1 ? "" : "s"} ·{" "}
            <span className="tabular-nums">{total}</span> memories
          </p>

          <div className="flex flex-col gap-2">
            {workspaces.map((w) => (
              <WorkspaceRow
                key={w.workspace}
                facet={w}
                open={open === w.workspace}
                onToggle={() => setOpen(open === w.workspace ? null : w.workspace)}
                onFilter={onFilter}
              />
            ))}
          </div>

          {/* Stated, never hidden. A page that lists workspaces and quietly
              omits everything filed under none accounts for less than the whole
              corpus while looking complete. */}
          {unassigned > 0 && (
            <div className="mt-4 rounded-xl border border-dashed border-line px-4 py-3">
              <p className="text-sm text-dim">
                <span className="tabular-nums text-ink">{unassigned}</span> memor
                {unassigned === 1 ? "y is" : "ies are"} filed under no workspace — everything
                written before workspaces existed, plus anything saved without one.
              </p>
              <p className="meta mt-1.5">
                They are not a workspace and have no page of their own. Clear the workspace
                filter in the archive to see them alongside everything else.
              </p>
            </div>
          )}
        </>
      )}
    </Panel>
  );
}

function WorkspaceRow({
  facet,
  open,
  onToggle,
  onFilter,
}: {
  facet: WorkspaceFacet;
  open: boolean;
  onToggle: () => void;
  onFilter: (scope: { workspace?: string; project?: string; createdBy?: string }) => void;
}) {
  return (
    <article className="rounded-xl border border-line bg-panel transition-colors hover:border-line-bright">
      <div className="flex items-start gap-3 p-4">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="min-w-0 flex-1 text-left"
        >
          <h3 className="truncate text-[0.98rem] font-semibold leading-snug text-ink">
            {facet.workspace}
          </h3>
          <p className="meta mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="tabular-nums">{facet.count} memories</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{facet.projects} project{facet.projects === 1 ? "" : "s"}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{facet.agents} agent{facet.agents === 1 ? "" : "s"}</span>
            <span aria-hidden="true">·</span>
            <span title={facet.latest}>last {facet.latest.slice(0, 10)}</span>
          </p>
        </button>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => onFilter({ workspace: facet.workspace })}
            className="rounded-lg border border-line px-2.5 py-1 font-mono text-[0.68rem] text-dim transition-colors hover:border-ember hover:text-ember"
          >
            open in archive
          </button>
          <button
            type="button"
            onClick={onToggle}
            aria-label={open ? "Collapse" : "Expand"}
            className="rounded p-1.5 text-faint transition-colors hover:text-ink"
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"
              style={{ transform: open ? "rotate(180deg)" : undefined }}
            >
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && <Inside workspace={facet.workspace} onFilter={onFilter} />}
    </article>
  );
}

/**
 * What is inside one workspace.
 *
 * Fetched when opened rather than with the list: the list is one query, and
 * eagerly loading every workspace's contents would be one query per row to
 * render something most of which is never looked at.
 */
function Inside({
  workspace,
  onFilter,
}: {
  workspace: string;
  onFilter: (scope: { workspace?: string; project?: string; createdBy?: string }) => void;
}) {
  const [data, setData] = useState<{
    projects: ProjectFacet[];
    agents: AgentFacet[];
    tags: Array<{ tag: string; count: number }>;
    memories: Memory[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    api.workspaces
      .get(workspace)
      .then((r) => live && setData(r))
      .catch((e) => live && setError(e instanceof Error ? e.message : "Could not open that workspace."));
    // Guards against a row being collapsed, or another opened, before the
    // request lands — otherwise a slow response overwrites a newer one.
    return () => {
      live = false;
    };
  }, [workspace]);

  if (error) {
    return (
      <p role="alert" className="border-t border-line px-4 py-3 text-sm text-[#f0928f]">
        {error}
      </p>
    );
  }
  if (!data) {
    return <p className="meta border-t border-line px-4 py-3">opening…</p>;
  }

  return (
    <div className="grid gap-5 border-t border-line px-4 py-4 sm:grid-cols-2">
      <Facet
        label="Projects"
        empty="No memories here carry a project."
        items={data.projects.map((p) => ({
          key: p.project,
          label: p.project,
          count: p.count,
          onSelect: () => onFilter({ workspace, project: p.project }),
        }))}
      />
      <Facet
        label="Agents"
        empty="Nothing here records who wrote it."
        items={data.agents.map((a) => ({
          key: a.agent,
          label: a.agent,
          count: a.count,
          onSelect: () => onFilter({ workspace, createdBy: a.agent }),
        }))}
      />

      {data.tags.length > 0 && (
        <div className="sm:col-span-2">
          <p className="eyebrow mb-2">Tags used here</p>
          <ul className="flex flex-wrap gap-1.5">
            {data.tags.slice(0, 24).map((t) => (
              <li
                key={t.tag}
                className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.68rem] text-dim"
              >
                {t.tag}
                <span className="ml-1 opacity-50 tabular-nums">{t.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** One column of a workspace's contents, each entry a filter you can apply. */
function Facet({
  label,
  empty,
  items,
}: {
  label: string;
  empty: string;
  items: Array<{ key: string; label: string; count: number; onSelect: () => void }>;
}) {
  return (
    <div>
      <p className="eyebrow mb-2">{label}</p>
      {items.length === 0 ? (
        <p className="text-sm text-faint">{empty}</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li key={item.key}>
              <button
                type="button"
                onClick={item.onSelect}
                className="flex w-full items-baseline justify-between gap-3 rounded px-1.5 py-1 text-left text-sm text-dim transition-colors hover:bg-ember-soft hover:text-ember"
              >
                <span className="truncate">{item.label}</span>
                <span className="shrink-0 font-mono text-[0.68rem] tabular-nums opacity-60">
                  {item.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-xl border border-dashed border-line py-16 text-center">
      <p className="mb-1.5 text-ink">No memories yet.</p>
      <p className="mx-auto max-w-md text-sm text-dim">
        Workspaces appear on their own. Save a memory with a workspace — from here, or by
        passing <code className="font-mono text-ember">workspace</code> to{" "}
        <code className="font-mono text-ember">remember</code> over MCP — and it will be
        listed here.
      </p>
    </div>
  );
}

import { useState } from "react";
import { t } from "./i18n";
import type { Graph } from "./types";

/**
 * How the drawing above was arrived at, with this corpus's own numbers in it.
 *
 * A visualisation makes a claim — "these two memories are near each other" —
 * and a claim you cannot check is decoration. Every figure below is read from
 * the same response that positioned the points, so this cannot drift from the
 * picture the way a written description would: if the projection captures 41%
 * of the variance today, it says 41% today.
 *
 * It is collapsed by default. Someone who just wants to look at their memories
 * should not have to scroll past a methods section to reach them; someone who
 * wants to know whether to believe it should not have to read the source.
 */
export function Method({ graph }: { graph: Graph }) {
  const [open, setOpen] = useState(false);

  const n = graph.nodes.length;
  const pairs = (n * (n - 1)) / 2;
  const byKind = graph.edges.reduce<Record<string, number>>((acc, e) => {
    acc[e.kind] = (acc[e.kind] ?? 0) + 1;
    return acc;
  }, {});
  const pct = (x: number) => `${Math.round(x * 100)}%`;
  const d = graph.distance;

  return (
    <section className="mt-4 rounded-xl border border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="eyebrow">{t("method.title")}</span>
        <span className="meta">{open ? t("method.hide") : t("method.show")}</span>
      </button>

      {open && (
        <div className="flex flex-col gap-5 border-t border-line px-4 py-4">
          <Step
            title={t("method.posTitle")}
            body={
              <>
                Every memory carries a <Num>1024</Num>-dimension vector from{" "}
                <Code>bge-m3</Code>, the same one semantic search uses. Three numbers
                are needed to place a point, so the cloud is projected down by{" "}
                <strong className="text-ink">PCA</strong> — power iteration, deflating
                between components, seeded so the same corpus lays out identically on
                every load.
                <br />
                <br />
                Those three axes capture <Num>{pct(graph.explained)}</Num> of the
                variance in <Num>{n}</Num> vectors. The rest is lost. Two points
                sitting together here may be further apart than they look — the
                drawing is a shadow of a 1024-dimension object, and{" "}
                <Num>{pct(1 - graph.explained)}</Num> of it is the part you cannot
                see.
                {graph.unembedded > 0 && (
                  <>
                    <br />
                    <br />
                    <Num>{graph.unembedded}</Num>{" "}
                    {graph.unembedded === 1 ? "memory carries" : "memories carry"} no
                    vector and {graph.unembedded === 1 ? "is" : "are"} absent from the
                    drawing entirely.
                  </>
                )}
              </>
            }
          />

          <Step
            title={t("method.edgeTitle")}
            body={
              <>
                Not a similarity threshold. In high dimensions similarities
                concentrate — across these {pairs} pairs, cosine distance runs from{" "}
                <Num>{d ? d.min.toFixed(3) : "—"}</Num> to{" "}
                <Num>{d ? d.max.toFixed(3) : "—"}</Num> with a median of{" "}
                <Num>{d ? d.median.toFixed(3) : "—"}</Num>. One cutoff in that band
                takes almost everything or almost nothing. bge-m3 makes it worse: its
                own documentation puts an <em>unrelated</em> pair near 0.35 similarity,
                so a threshold anchored at zero calls unrelated text related.
                <br />
                <br />
                Instead: <strong className="text-ink">mutual k-nearest-neighbours</strong>{" "}
                at <Code>k = ⌈√N⌉ = {graph.k}</Code>. An edge exists only if each
                memory is in the other's top {graph.k} — reciprocity caps how many
                connections any one memory can dominate. That disconnects the graph, so
                it is unioned with a{" "}
                <strong className="text-ink">maximum spanning tree</strong>; those
                repair edges are marked and drawn faintest, because they carry almost
                nothing.
                <br />
                <br />
                Result: <Num>{graph.edges.length}</Num> edges out of <Num>{pairs}</Num>{" "}
                possible — <Num>{pct(graph.density)}</Num> density.
                <ul className="mt-3 flex flex-col gap-1">
                  <Legend
                    swatch="var(--color-ember)"
                    n={byKind.link ?? 0}
                    label="link — written as [[a reference]]. Someone said these belong together; it outranks an inferred edge for the same pair."
                  />
                  <Legend
                    swatch="rgb(168,194,219)"
                    n={byKind.similar ?? 0}
                    label="similar — mutual kNN. Brightness is 1 − distance, so a nearer pair draws stronger."
                  />
                  <Legend
                    swatch="rgba(140,150,160,0.45)"
                    n={byKind.bridge ?? 0}
                    label="bridge — spanning-tree repair. Exists only so nothing is stranded."
                  />
                </ul>
              </>
            }
          />

          <Step
            title={t("method.honestTitle")}
            body={
              <>
                A node-link graph stops being readable past a few hundred memories —
                Obsidian's is a hairball past roughly 200, Roam's layout gives up
                around 600. No layout algorithm fixes that; it is what node-link
                diagrams do. At{" "}
                <Num>{pct(graph.density)}</Num> density{" "}
                {graph.density > 0.4
                  ? "this corpus is small enough that most pairs qualify as neighbours, so the web shows less structure than it appears to."
                  : "the web is showing real structure rather than a complete graph."}
                <br />
                <br />
                The <strong className="text-ink">map</strong> has no such ceiling: it
                draws no edges, so nothing occludes anything, and proximity carries the
                same information the filaments do.
                <br />
                <br />
                Distances are cosine, computed from the vectors directly, not from
                anything shown on screen. Nothing here is illustrative.
              </>
            }
          />
        </div>
      )}
    </section>
  );
}

function Step({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-2">{title}</p>
      <div className="max-w-2xl text-sm leading-relaxed text-dim">{body}</div>
    </div>
  );
}

/** A figure read from the live response, so it is never a stale example. */
function Num({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono tabular-nums" style={{ color: "var(--color-ember)" }}>
      {children}
    </span>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-[0.85em] text-ink">{children}</code>;
}

function Legend({ swatch, n, label }: { swatch: string; n: number; label: string }) {
  return (
    <li className="flex items-baseline gap-2">
      <span
        aria-hidden="true"
        className="mt-1.5 inline-block h-0.5 w-6 shrink-0 rounded"
        style={{ background: swatch }}
      />
      <span className="text-sm text-dim">
        <span className="font-mono tabular-nums text-ink">{n}</span> {label}
      </span>
    </li>
  );
}

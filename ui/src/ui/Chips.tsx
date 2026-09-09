import { useState } from "react";
import { t } from "./i18n";
import type { Facets, Scope } from "./types";

/**
 * The filter bar. One idiom, everything visible, nothing to open.
 *
 * This replaced three idioms sharing one header — a text input, two-to-three
 * `<select>` dropdowns that hid their options until clicked and materialised a
 * third only after you picked a workspace, and a row of seven pills for kind.
 * Three ways to say "narrow this", in 295px of a 911px viewport, before a single
 * memory was visible. That inconsistency was the whole of why the page felt
 * wrong.
 *
 * The rules, and each one is a rule the old bar broke:
 *
 *   FLAT       — every row is present at once. Project chips do not wait for a
 *                workspace to be chosen; a control that appears in response to
 *                another control is a nested choice.
 *                AMENDED 2026-08-29: flat stopped scaling. On a 19,687-memory
 *                corpus the project row alone was ~40 chips over 15 lines and
 *                the filter bar displaced the content it filters. A wide row
 *                now shows its TOP values inline — facets are sorted by count,
 *                so the head of the list is the part worth seeing without a
 *                click — and folds only the tail behind "+N", which expands to
 *                one value per line, counts right-aligned. A TICKED value in
 *                the tail is promoted into the visible head: collapsing must
 *                never hide active filter state.
 *   NO CHOICES — nothing opens. A chip is its own option and its own state.
 *   MARKS      — chips toggle. Within a row it is OR ("either workspace"),
 *                across rows it is AND, which is what ticking boxes means.
 *   REDUNDANT  — a memory matching three chips shows under all three. Nothing is
 *                deduplicated into a hierarchy.
 *   ZERO MARKS — means everything, and that is the default.
 *
 * Counts are corpus-wide and deliberately do NOT track the current selection.
 * Chips that shrink and vanish as you tick them make the bar jump under the
 * cursor and hide the chip you need to untick.
 */

type FacetKey = "kind" | "workspace" | "project" | "createdBy" | "tag";

/**
 * A row wider than this folds — per facet, because chip WIDTH varies more than
 * chip count. Ten tags fit one line; ten projects are ten full repo URLs and
 * take four. The unit that matters is lines consumed, and count is only a
 * proxy for it, so the proxy is tuned per key.
 */
const FACETS: Record<FacetKey, { top: number; layout: "inline" | "table" }> = {
  kind: { top: 10, layout: "inline" },
  workspace: { top: 8, layout: "inline" },
  // Repo URLs: the only values wide enough that one per line reads better than
  // a wrapped flow. Four of them already fill two lines.
  project: { top: 4, layout: "table" },
  createdBy: { top: 8, layout: "inline" },
  tag: { top: 10, layout: "inline" },
};

interface Row {
  key: FacetKey;
  label: string;
  values: Array<{ value: string; count: number }>;
}

export function Chips({
  facets,
  scope,
  tags,
  onChange,
  onClear,
}: {
  facets: Facets;
  scope: Scope;
  /** Selected tags, kept beside scope because tags are not a scope column. */
  tags: string[];
  onChange: (next: { scope: Scope; tags: string[] }) => void;
  onClear: () => void;
}) {
  const rows: Row[] = ([
    {
      key: "kind",
      label: t("facet.kind"),
      values: facets.kinds.map((k) => ({ value: k.kind, count: k.count })),
    },
    {
      key: "workspace",
      label: t("facet.workspace"),
      values: facets.workspaces.map((w) => ({ value: w.workspace, count: w.count })),
    },
    {
      key: "project",
      label: t("facet.project"),
      values: facets.projects.map((p) => ({ value: p.project, count: p.count })),
    },
    {
      key: "createdBy",
      label: t("facet.agent"),
      values: facets.agents.map((a) => ({ value: a.agent, count: a.count })),
    },
    {
      key: "tag",
      label: t("facet.tag"),
      values: facets.tags.map((x) => ({ value: x.tag, count: x.count })),
    },
  ] satisfies Row[]).filter((r) => r.values.length > 0);

  const selected = (key: FacetKey): string[] =>
    key === "tag" ? tags : (scope[key] ?? []);

  const toggle = (key: FacetKey, value: string) => {
    const on = selected(key);
    const next = on.includes(value) ? on.filter((v) => v !== value) : [...on, value];
    if (key === "tag") onChange({ scope, tags: next });
    else onChange({ scope: { ...scope, [key]: next }, tags });
  };

  const anySelected =
    tags.length > 0 ||
    scope.kind.length > 0 ||
    scope.workspace.length > 0 ||
    scope.project.length > 0 ||
    scope.createdBy.length > 0;

  // Nothing to divide by and nothing ticked: an empty corpus does not need a
  // filter bar explaining that it is empty.
  if (!rows.length && !anySelected) return null;

  return (
    <div className="mt-3 flex flex-col gap-1.5">
      {rows.map((row) => {
        const chip = (v: { value: string; count: number }, cls = "chip") => {
          const on = selected(row.key).includes(v.value);
          return (
            <button
              key={v.value}
              type="button"
              className={cls}
              aria-pressed={on}
              onClick={() => toggle(row.key, v.value)}
              // The kind row is the one place colour carries meaning rather
              // than state, so an unticked kind chip keeps its hue.
              style={row.key === "kind" && !on ? { color: kindColor(v.value) } : undefined}
            >
              <span>{v.value}</span>
              <span className="chip-count">{v.count}</span>
            </button>
          );
        };

        const { top, layout } = FACETS[row.key];
        return (
          <FacetRow
            key={row.key}
            label={row.label}
            values={row.values}
            top={top}
            layout={layout}
            isTicked={(v) => selected(row.key).includes(v)}
            chip={chip}
          />
        );
      })}

      {anySelected && (
        <div className="facet-row">
          <span className="eyebrow" />
          <div>
            <button
              type="button"
              onClick={onClear}
              className="chip"
              style={{ color: "var(--color-faint)" }}
            >
              {t("archive.clear")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * One facet row: the top values, then the rest behind a toggle.
 *
 * Facets arrive sorted by count, so the head of the list is exactly the part
 * worth seeing without a click — folding a whole row put its BEST values
 * behind one too, which inverted the point. Only the tail folds, and a TICKED
 * value in the tail is promoted into the visible head: active filter state
 * must never be invisible.
 *
 * ── layout follows VALUE WIDTH, and nothing else ─────────────────────────────
 *
 * `table` gives each value its own line with the count right-aligned. It reads
 * well for repo URLs, where a wrapped flow buries the count somewhere in the
 * middle of a line. It reads badly for anything short: a full-width row for
 * `thor 13` spends an entire line on two words, and ten tags that way is a
 * column of mostly empty space where one wrapped line would do.
 *
 * So `inline` is the default and `table` is the exception, granted per facet
 * in FACETS. The head and the tail always share ONE layout — expanding must
 * continue the list, never change the shape of what is already on screen.
 */
function FacetRow({
  label, values, top, layout, isTicked, chip,
}: {
  label: string;
  values: Array<{ value: string; count: number }>;
  top: number;
  layout: "inline" | "table";
  isTicked: (value: string) => boolean;
  chip: (v: { value: string; count: number }, cls?: string) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const head = values.slice(0, top);
  const promoted = values.slice(top).filter((v) => isTicked(v.value));
  const tail = values.slice(top).filter((v) => !isTicked(v.value));
  const hidden = tail.reduce((n, v) => n + v.count, 0);

  const table = layout === "table";
  const chipClass = table ? "chip chip-line" : "chip";

  return (
    // A GRID, not a wrapping flex row. With label and values inline, an
    // overflowing row wrapped to the container's left edge — under the LABEL —
    // so multi-line rows lost the alignment the fixed-width label existed to
    // provide. Two columns: the label owns the first, the values the second.
    <div className="facet-row">
      <span className="eyebrow">{label}</span>
      <div className={table ? "facet-fold-list" : "flex flex-wrap items-baseline gap-1.5"}>
        {head.map((v) => chip(v, chipClass))}
        {promoted.map((v) => chip(v, chipClass))}
        {open && tail.map((v) => chip(v, chipClass))}
        {tail.length > 0 && (
          // Shaped exactly like the values it sits among — same element, same
          // two spans — so the toggle reads as the end of the list rather than
          // a control bolted beside it. The right span carries the hidden
          // COUNT, so what folding costs you is legible without opening it.
          <button
            type="button"
            className={`${chipClass} facet-more`}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span>
              <span className="facet-more-marker">▸</span>
              {open ? t("facet.less") : t("facet.more").replace("{n}", String(tail.length))}
            </span>
            <span className="chip-count">{open ? "" : hidden}</span>
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * A colour for a kind.
 *
 * Four kinds have a declared token; anything else gets a hue derived from the
 * word itself. Kind is free text now, so a fixed map would leave every kind
 * someone invents rendered in the same grey — and the point of colouring kinds
 * is that the corpus is scannable by shape of thought. Deterministic, so a kind
 * keeps its colour across sessions and machines.
 */
export function kindColor(kind: string): string {
  const known: Record<string, string> = {
    learn: "var(--color-kind-learn)",
    enlighten: "var(--color-kind-enlighten)",
    retro: "var(--color-kind-retro)",
    artifact: "var(--color-kind-artifact)",
  };
  if (known[kind]) return known[kind]!;

  let hash = 0;
  for (let i = 0; i < kind.length; i++) hash = (hash * 31 + kind.charCodeAt(i)) | 0;
  // Saturation and lightness fixed so a generated hue sits with the declared
  // ones rather than shouting past them.
  return `hsl(${Math.abs(hash) % 360} 42% 68%)`;
}

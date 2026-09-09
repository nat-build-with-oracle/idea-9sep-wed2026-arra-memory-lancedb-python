import { useEffect, useRef, useState } from "react";
import { kindColor } from "./Chips";
import type { Memory, MemoryKind } from "./types";

/** A memory's kind, as a colour-coded label. Colour is never the only signal. */
export function KindChip({ kind }: { kind: MemoryKind }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 font-mono text-[0.68rem] tracking-wide"
      style={{
        color: kindColor(kind),
        background: `color-mix(in oklab, ${kindColor(kind)} 14%, transparent)`,
      }}
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full"
        style={{ background: kindColor(kind) }}
      />
      {kind}
    </span>
  );
}

/**
 * Importance, 1–5, as filled marks.
 *
 * A bar chart would imply a measurement; these are five discrete steps someone
 * chose. The number is still announced for anyone not reading the marks.
 */
export function Importance({ value }: { value: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      title={`importance ${value} of 5`}
      aria-label={`importance ${value} of 5`}
    >
      {[1, 2, 3, 4, 5].map((step) => (
        <span
          key={step}
          aria-hidden="true"
          className="h-2.5 w-[3px] rounded-full transition-colors"
          style={{
            background:
              step <= value ? "var(--color-ember)" : "var(--color-line-bright)",
          }}
        />
      ))}
    </span>
  );
}

/** Relative for the recent past, absolute once "3 weeks ago" stops being useful. */
export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return iso;

  const seconds = Math.floor((Date.now() - then) / 1000);
  if (seconds < 45) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 86400 * 14) return `${Math.floor(seconds / 86400)}d ago`;

  return new Date(then).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * One memory in the list.
 *
 * Collapsed by default to a title plus the first lines, because the primary job
 * here is scanning a corpus, not reading one entry. Expanding is what makes it
 * a document.
 */
export function MemoryCard({
  memory,
  query,
  onDelete,
  onFollow,
}: {
  memory: Memory;
  query: string;
  onDelete: (id: string) => void;
  /** Follow a [[reference]] in the body. Omit and links render as plain text. */
  onFollow?: (title: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  // A pending "really delete?" must not survive the card being scrolled away
  // from and reused for another memory.
  useEffect(() => setConfirming(false), [memory.id]);

  const long = memory.content.length > 280;

  return (
    <article className="group rounded-xl border border-line bg-panel transition-colors hover:border-line-bright">
      <div className="flex items-start gap-3 p-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <KindChip kind={memory.kind} />
            <Importance value={memory.importance} />
            {/* Where this memory lives, on the card rather than behind a click.
                A shared corpus where you cannot tell whose memory you are
                reading is the problem workspaces exist to fix; hiding the answer
                one level down would have solved it only in the database. */}
            {memory.workspace && (
              <Provenance label={memory.workspace} title="Workspace" accent />
            )}
            {memory.project && <Provenance label={memory.project} title="Project" />}
          </div>

          <h3 className="mb-2 text-[0.98rem] font-semibold leading-snug text-ink">
            <Highlight text={memory.title} query={query} />
          </h3>

          <div
            className={`prose-memory ${open || !long ? "" : "line-clamp-3"}`}
            id={`memory-body-${memory.id}`}
          >
            <Linked text={memory.content} onFollow={onFollow} />
          </div>

          {long && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={`memory-body-${memory.id}`}
              className="mt-2 font-mono text-[0.7rem] tracking-wide text-ember hover:underline"
            >
              {open ? "show less" : "read all"}
            </button>
          )}

          {memory.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {memory.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.68rem] text-dim"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="meta mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span title={memory.updatedAt}>{timeAgo(memory.updatedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{memory.source}</span>
            {memory.createdBy && (
              <>
                <span aria-hidden="true">·</span>
                <span title="Written by">by {memory.createdBy}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="truncate opacity-60">{memory.id.slice(0, 8)}</span>
          </div>
        </div>

        {/* Destructive control stays out of the way until hover or focus, and
            asks once. Nothing here deletes on a single stray click. */}
        <div className="shrink-0">
          {confirming ? (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onDelete(memory.id)}
                className="rounded bg-[#5c2320] px-2 py-1 font-mono text-[0.68rem] text-[#f0928f] hover:brightness-125"
              >
                delete
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded px-2 py-1 font-mono text-[0.68rem] text-dim hover:text-ink"
              >
                keep
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              aria-label={`Forget “${memory.title}”`}
              className="rounded p-1.5 text-faint opacity-0 transition-opacity hover:text-[#f0928f] focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * A workspace or project name on a card.
 *
 * Deliberately quieter than the kind chip and quieter still than the title: it
 * answers "where is this from" at a glance without competing with what the
 * memory actually says.
 */
function Provenance({
  label,
  title,
  accent,
}: {
  label: string;
  title: string;
  accent?: boolean;
}) {
  return (
    <span
      title={title}
      className="max-w-[12rem] truncate rounded border px-1.5 py-0.5 font-mono text-[0.68rem]"
      style={{
        borderColor: accent ? "var(--color-ember)" : "var(--color-line)",
        color: accent ? "var(--color-ember)" : "var(--color-dim)",
      }}
    >
      {label}
    </span>
  );
}

/**
 * Renders `[[a reference]]` as something you can click.
 *
 * The notation is the vault's, unchanged — every learning in ψ/ already links
 * this way, so a memory imported from a file arrives with working links and
 * nothing had to be converted. Following one searches for that title, which is
 * the same path the graph's link edges take, so the two views agree about what
 * a link means.
 *
 * A link to a memory that does not exist still renders as a link. That is not
 * an oversight: writing the reference before the memory is how a corpus grows,
 * and greying out the ones that "do not resolve yet" would punish exactly the
 * habit worth having. Clicking a dangling one searches and finds nothing, which
 * is the honest answer.
 */
function Linked({ text, onFollow }: { text: string; onFollow?: (title: string) => void }) {
  if (!onFollow || !text.includes("[[")) return <>{text}</>;

  const parts: React.ReactNode[] = [];
  const pattern = /\[\[([^\]|]{1,160})(?:\|([^\]]*))?\]\]/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const target = match[1]!.trim();
    const label = (match[2] ?? match[1]!).trim();
    parts.push(
      <button
        key={`link-${key++}`}
        type="button"
        onClick={(e) => {
          // The card body is inside an expandable region; a link click must not
          // also toggle whatever it is nested in.
          e.stopPropagation();
          onFollow(target);
        }}
        className="underline decoration-dotted underline-offset-2 transition-colors hover:decoration-solid"
        style={{ color: "var(--color-ember)" }}
        title={target}
      >
        {label}
      </button>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Marks the searched substring so a hit is visibly a hit. */
function Highlight({ text, query }: { text: string; query: string }) {
  const needle = query.trim();
  if (!needle) return <>{text}</>;

  const index = text.toLocaleLowerCase().indexOf(needle.toLocaleLowerCase());
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded bg-ember-soft px-0.5 text-ember">
        {text.slice(index, index + needle.length)}
      </mark>
      {text.slice(index + needle.length)}
    </>
  );
}

function FilterPill({
  active,
  color,
  onClick,
  children,
}: {
  active: boolean;
  color?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-md border px-2 py-1 font-mono text-[0.72rem] transition-colors"
      style={{
        borderColor: active ? (color ?? "var(--color-ember)") : "var(--color-line)",
        color: active ? (color ?? "var(--color-ember)") : "var(--color-dim)",
        background: active
          ? `color-mix(in oklab, ${color ?? "var(--color-ember)"} 12%, transparent)`
          : "transparent",
      }}
    >
      {children}
    </button>
  );
}

/** Focuses the search field on "/" the way every archive worth using does. */
export function useSlashFocus() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (event.key === "/" && !typing) {
        event.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return ref;
}

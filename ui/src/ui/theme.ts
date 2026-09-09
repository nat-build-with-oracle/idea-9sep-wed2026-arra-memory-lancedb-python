import { useEffect, useState } from "react";

/**
 * The palette, switchable.
 *
 * Every colour in the app resolves through a CSS variable declared in app.css,
 * which is what makes a theme an override block rather than a rewrite — and why
 * switching one cannot miss a corner. This module does nothing but decide which
 * block is active and remember the answer.
 *
 * `slate` is the default rather than `ember` because the warm orange read as
 * over-committed to one person's taste on every screen. `ember` is kept, not
 * retired: it was the identity for eleven versions, and taste is allowed to
 * change back.
 */

export interface Theme {
  id: string;
  /** What it is called in the picker. Chrome, so it goes through i18n's rules. */
  label: string;
  /** One line on why it exists — the picker shows it, so the choice is informed. */
  note: string;
  /** Two swatches for the preview: the ground and the accent. */
  swatch: [string, string];
  dark: boolean;
}

export const THEMES: Theme[] = [
  {
    id: "slate",
    label: "Slate",
    note: "Cool and quiet. No warm cast.",
    swatch: ["#101418", "#5eb0c9"],
    dark: true,
  },
  {
    id: "ember",
    label: "Ember",
    note: "The original — warm charcoal, lamplit.",
    swatch: ["#14120f", "#d8853a"],
    dark: true,
  },
  {
    id: "moss",
    label: "Moss",
    note: "Green-black. Terminal lineage, no glare.",
    swatch: ["#0f1411", "#7fc98d"],
    dark: true,
  },
  {
    id: "iris",
    label: "Iris",
    note: "Near-black and violet.",
    swatch: ["#121016", "#a98ae0"],
    dark: true,
  },
  {
    id: "mono",
    label: "Mono",
    note: "No hue at all. Contrast does the work.",
    swatch: ["#111111", "#e8e8e8"],
    dark: true,
  },
  {
    id: "paper",
    label: "Paper",
    note: "The light one. Warm ground, ink on it.",
    swatch: ["#f6f3ec", "#a2591f"],
    dark: false,
  },
];

export const DEFAULT_THEME = "slate";

const STORAGE_KEY = "arra-memory-theme";

function isKnown(id: string | null): id is string {
  return Boolean(id) && THEMES.some((t) => t.id === id);
}

/** URL first so a theme is linkable, then this browser's choice, then the default. */
export function initialTheme(): string {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("theme");
    if (isKnown(fromUrl)) return fromUrl;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isKnown(stored)) return stored;
  } catch {
    // Storage blocked. The default still renders.
  }
  return serverDefault;
}

/**
 * The add-on owner's default palette, from `theme` in the add-on configuration.
 *
 * Same rule as language: it decides what a first visit looks like and never
 * overrules a browser that has already chosen.
 */
let serverDefault = DEFAULT_THEME;

export function applyServerDefaultTheme(id: string | undefined): void {
  if (!isKnown(id ?? null)) return;
  serverDefault = id!;
  let chosen = false;
  try {
    chosen = isKnown(window.localStorage.getItem(STORAGE_KEY)) ||
      new URLSearchParams(window.location.search).has("theme");
  } catch {
    /* storage blocked; treat as unchosen */
  }
  if (!chosen && current !== id) setTheme(id!);
}

let current = typeof window === "undefined" ? DEFAULT_THEME : initialTheme();
const listeners = new Set<(id: string) => void>();

export function getTheme(): string {
  return current;
}

/**
 * Apply a theme.
 *
 * The attribute goes on `<html>`, not `<body>`, because `color-scheme` has to be
 * set on the root for the browser to paint form controls, scrollbars and the
 * canvas behind the page correctly — a light theme applied to body alone leaves
 * dark scrollbars on a cream page.
 */
export function setTheme(id: string): void {
  const theme = THEMES.find((t) => t.id === id) ?? THEMES[0]!;
  current = theme.id;
  try {
    document.documentElement.setAttribute("data-theme", theme.id);
    window.localStorage.setItem(STORAGE_KEY, theme.id);
  } catch {
    // Not persisted; the session still switches.
  }
  for (const fn of listeners) fn(theme.id);
}

/** Called once at startup, before React paints, so there is no flash. */
export function applyStoredTheme(): void {
  try {
    document.documentElement.setAttribute("data-theme", initialTheme());
  } catch {
    /* ignore */
  }
}

export function useTheme(): [string, (id: string) => void] {
  const [theme, set] = useState(current);
  useEffect(() => {
    listeners.add(set);
    return () => {
      listeners.delete(set);
    };
  }, []);
  return [theme, setTheme];
}

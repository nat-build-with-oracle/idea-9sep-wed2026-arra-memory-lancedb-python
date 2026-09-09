import { useEffect, useState } from "react";

/**
 * The URL is the state.
 *
 * Before this, every view lived only in React state: the address bar said the
 * same thing on all four pages, reloading always landed on the archive, and the
 * browser's back button left the app entirely. A page you cannot link to or
 * reload is not really a page.
 *
 * ── why the hash, and not real paths
 *
 * This add-on is served three ways: through Home Assistant's ingress at
 * `/api/hassio_ingress/<opaque-token>/`, directly on port 8099, and through a
 * Cloudflare tunnel. Only the first has a path prefix, it is generated per
 * session, and the app is not told what it is. A pushState route like
 * `/workspaces` would therefore be wrong under ingress, and a deep link would
 * ask the server for a path it has no reason to map to the SPA.
 *
 * Everything after `#` is never sent to the server and needs no prefix, so one
 * encoding works under all three. The cost — no server-side rendering of a deep
 * link — is not a cost for an app that is a single bundle behind a passphrase.
 */

export type View = "memory" | "atlas" | "workspaces" | "settings" | "tools" | "log";

const VIEWS: View[] = ["memory", "atlas", "workspaces", "settings", "tools", "log"];

/**
 * Renamed destinations, old name → new.
 *
 * `#/tools` used to be aliased here, from when the tool surface lived under
 * Settings. It is a real view again in 0.24.0 — Settings now holds the add-on's
 * OPTIONS — so the alias is gone and the old URL resolves natively. Anyone who
 * bookmarked it still lands on the tool list, which is what they meant.
 */
const ALIASES: Record<string, View> = {
  // `#/archive` was the home view's URL for five versions and is the one most
  // likely to have been bookmarked. Renaming a page must not break the link
  // someone kept to it.
  archive: "memory",
};

export interface Route {
  view: View;
  query: string;
  /**
   * Every facet is a SET, because every chip row is multi-select. Repeated
   * params in the URL — `?kind=learn&kind=retro` — which is both how the server
   * reads them and how a browser serialises a multi-value field, so the link is
   * the query with nothing invented in between.
   */
  kind: string[];
  workspace: string[];
  project: string[];
  createdBy: string[];
  tag: string[];
}

export const EMPTY_ROUTE: Route = {
  view: "memory",
  query: "",
  kind: [],
  workspace: [],
  project: [],
  createdBy: [],
  tag: [],
};

/** `#/workspaces` or `#/archive?workspace=x&q=y` → a Route. */
export function parseRoute(hash: string): Route {
  // Tolerant on purpose: a hand-edited or truncated hash should land on the
  // archive rather than render nothing. There is no such thing as a 404 here.
  const raw = hash.replace(/^#\/?/, "");
  const [path, search] = raw.split("?");
  const params = new URLSearchParams(search ?? "");
  const view = VIEWS.includes(path as View)
    ? (path as View)
    : (ALIASES[path ?? ""] ?? "memory");

  return {
    view,
    query: params.get("q") ?? "",
    kind: params.getAll("kind"),
    workspace: params.getAll("workspace"),
    project: params.getAll("project"),
    createdBy: params.getAll("agent"),
    tag: params.getAll("tag"),
  };
}

/** A Route → the hash it should be shown at. Only non-defaults are written. */
export function formatRoute(route: Route): string {
  const params = new URLSearchParams();
  // Scope belongs in the URL, not just the view: a filtered archive is the
  // thing worth sending to someone, and "reload the same page" has to mean the
  // same results, not merely the same tab.
  if (route.query) params.set("q", route.query);
  // append, not set: several ticked chips are several params of the same name.
  for (const v of route.kind) params.append("kind", v);
  for (const v of route.workspace) params.append("workspace", v);
  for (const v of route.project) params.append("project", v);
  for (const v of route.createdBy) params.append("agent", v);
  for (const v of route.tag) params.append("tag", v);
  const search = params.toString();
  return `#/${route.view}${search ? `?${search}` : ""}`;
}

/**
 * Two-way binding between the address bar and the app's route.
 *
 * Writes go through `replaceState` while only the query or filters change, and
 * `assign` when the view changes. Typing into the search box pushing one
 * history entry per keystroke would make the back button useless; switching
 * pages should be a real back-navigable step.
 */
export function useRoute(): [Route, (next: Route) => void] {
  const [route, setRoute] = useState<Route>(() =>
    parseRoute(typeof window === "undefined" ? "" : window.location.hash),
  );

  // Back/forward, and any hand-edited URL.
  useEffect(() => {
    const onHash = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Stamp the initial hash so the very first load is already linkable.
  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", formatRoute(route));
    }
    // Once, on mount. The effect below keeps it in step from then on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = (next: Route) => {
    const target = formatRoute(next);
    if (target !== formatRoute(route)) {
      const viewChanged = next.view !== route.view;
      if (viewChanged) {
        // A real history entry: back should return to the previous page.
        window.history.pushState(null, "", target);
      } else {
        // Filters and typing replace, so back does not have to walk every
        // keystroke to escape the app.
        window.history.replaceState(null, "", target);
      }
    }
    setRoute(next);
  };

  return [route, navigate];
}

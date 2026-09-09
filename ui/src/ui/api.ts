import type {
  AgentFacet,
  SettingsInfo,
  EmbeddingCoverage,
  Facets,
  Graph,
  Health,
  Memory,
  MemoryKind,
  MemoryStats,
  SearchLogEntry,
  SearchLogStats,
  ProjectFacet,
  ToolInfo,
  WorkspaceFacet,
} from "./types";

/**
 * The browser's view of the API.
 *
 * Every call sends the session cookie and nothing else — the UI never holds a
 * bearer token. `credentials: "same-origin"` is required rather than incidental:
 * the add-on is served through Home Assistant's ingress path, and without it the
 * cookie is dropped on exactly the requests that need it.
 */

class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`.${path}`, {
    ...init,
    credentials: "same-origin",
    headers: {
      ...(init.body ? { "content-type": "application/json" } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    // A 401 is not an error the UI reports — it means "show the lock screen",
    // and App treats it that way. Anything else is worth a message.
    const body = await response.json().catch(() => ({}) as any);
    throw new ApiError(body.message ?? body.error ?? response.statusText, response.status);
  }

  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}

export { ApiError };

export const api = {
  session: {
    check: () =>
      call<{ authenticated: boolean; method: string | null }>("/api/session"),
    open: (passphrase: string) =>
      call<{ ok: true }>("/api/session", {
        method: "POST",
        body: JSON.stringify({ passphrase }),
      }),
    close: () => call<{ ok: true }>("/api/session", { method: "DELETE" }),
  },

  memories: {
    search: (params: {
      q?: string;
      kind?: string[];
      workspace?: string[];
      project?: string[];
      createdBy?: string[];
      tag?: string[];
      limit?: number;
    }) => {
      const search = new URLSearchParams();
      if (params.q) search.set("q", params.q);
      // Repeated params, not comma-joined: a workspace may legitimately contain
      // a comma, and `getAll` on the server is the exact inverse of `append`.
      for (const [key, values] of [
        ["kind", params.kind],
        ["workspace", params.workspace],
        ["project", params.project],
        ["createdBy", params.createdBy],
        ["tag", params.tag],
      ] as const) {
        for (const v of values ?? []) if (v) search.append(key, v);
      }
      if (params.limit) search.set("limit", String(params.limit));
      const qs = search.toString();
      return call<{ memories: Memory[]; count: number }>(
        `/api/memories${qs ? `?${qs}` : ""}`,
      );
    },

    create: (input: {
      content: string;
      title?: string;
      kind?: string;
      tags?: string[];
      importance?: number;
      workspace?: string;
      project?: string;
    }) =>
      call<{ memory: Memory }>("/api/memories", {
        method: "POST",
        body: JSON.stringify(input),
      }),

    /** One memory, by id — what the atlas opens when you click a soma. */
    get: (id: string) => call<{ memory: Memory }>(`/api/memories/${encodeURIComponent(id)}`),

    update: (id: string, input: Partial<Memory>) =>
      call<{ memory: Memory }>(`/api/memories/${id}`, {
        method: "PATCH",
        body: JSON.stringify(input),
      }),

    remove: (id: string) =>
      call<{ id: string; deleted: boolean }>(`/api/memories/${id}`, {
        method: "DELETE",
      }),
  },

  /** The corpus as geometry — points from embeddings, edges from mutual kNN. */
  graph: (scope: { kind?: string[]; workspace?: string[]; project?: string[]; createdBy?: string[] }) => {
    const q = new URLSearchParams();
    for (const [key, values] of [
      ["kind", scope.kind], ["workspace", scope.workspace],
      ["project", scope.project], ["createdBy", scope.createdBy],
    ] as const) for (const v of values ?? []) if (v) q.append(key, v);
    const qs = q.toString();
    return call<Graph>(`/api/graph${qs ? `?${qs}` : ""}`);
  },

  /** Every chip row, in one request. */
  facets: () => call<Facets>("/api/facets"),

  /** Rename one facet value to another, everywhere. */
  merge: (facet: string, from: string, to: string) =>
    call<{ facet: string; from: string; to: string; merged: number }>("/api/merge", {
      method: "POST",
      body: JSON.stringify({ facet, from, to }),
    }),

  /**
   * How the corpus is divided. Two calls because there are two levels: the
   * workspaces, and what is inside one of them.
   */
  workspaces: {
    list: () =>
      call<{
        workspaces: WorkspaceFacet[];
        /** Memories filed under no workspace. Shown, never hidden. */
        unassigned: number;
        agents: AgentFacet[];
      }>("/api/workspaces"),

    get: (name: string) =>
      call<{
        workspace: string;
        projects: ProjectFacet[];
        agents: AgentFacet[];
        tags: Array<{ tag: string; count: number }>;
        memories: Memory[];
      }>(`/api/workspaces/${encodeURIComponent(name)}`),
  },

  stats: () => call<{ stats: MemoryStats; embeddings: EmbeddingCoverage }>("/api/stats"),

  health: () => call<Health>("/api/health"),

  access: {
    clients: () =>
      call<{ clients: Array<{ clientId: string; clientName: string | null; createdAt: string;
        activeTokens: number; lastTokenAt: string | null; scope: string | null }> }>("/api/access/clients"),
    revoke: (id: string) =>
      call<{ revoked: string }>(`/api/access/clients/${encodeURIComponent(id)}`, { method: "DELETE" }),
  },

  settings: {
    get: () => call<SettingsInfo>("/api/settings"),
    patch: (patch: Record<string, string>) =>
      call<SettingsInfo>("/api/settings", { method: "PATCH", body: JSON.stringify(patch) }),
    reveal: (key: string) =>
      call<{ key: string; value: string }>(`/api/settings/reveal/${encodeURIComponent(key)}`),
    regenerate: (key: string) =>
      call<{ key: string; value: string; restartRequired: boolean }>(
        `/api/settings/regenerate/${encodeURIComponent(key)}`, { method: "POST" }),
  },

  tools: {
    list: () => call<{ tools: ToolInfo[]; locked: string[] }>("/api/tools"),
    setDisabled: (name: string, disabled: boolean) =>
      call<{ name: string; disabled: boolean }>(`/api/tools/${encodeURIComponent(name)}`, {
        method: "PATCH",
        body: JSON.stringify({ disabled }),
      }),
    enableAll: () => call<{ ok: true }>("/api/tools/enable-all", { method: "POST" }),
  },

  searchLog: {
    list: (params: { limit?: number; q?: string } = {}) => {
      const s = new URLSearchParams();
      if (params.limit) s.set("limit", String(params.limit));
      if (params.q) s.set("q", params.q);
      const qs = s.toString();
      return call<{ entries: SearchLogEntry[]; stats: SearchLogStats }>(
        `/api/search-log${qs ? `?${qs}` : ""}`,
      );
    },
    remove: (id: string) =>
      call<{ id: string; deleted: boolean }>(`/api/search-log/${id}`, { method: "DELETE" }),
    prune: (olderThanDays: number) =>
      call<{ deleted: number; cutoff: string }>(
        `/api/search-log?olderThanDays=${olderThanDays}`,
        { method: "DELETE" },
      ),
    clear: () =>
      call<{ deleted: number }>("/api/search-log?all=true", { method: "DELETE" }),
  },
};

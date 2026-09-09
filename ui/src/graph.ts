export interface GraphNode {
  id: string;
  title: string;
  kind: string;
  workspace: string;
  project: string;
  createdBy: string;
  importance: number;
  createdAt: string;
  /** Position in the projection, each axis normalised to roughly [-1, 1]. */
  x: number;
  y: number;
  z: number;
}

export type EdgeKind = "link" | "similar" | "bridge";

export interface GraphEdge {
  /** Indices into `nodes`, not ids — the renderer wants offsets. */
  source: number;
  target: number;
  /** Cosine distance. 0 identical, 1 orthogonal. Meaningless for a link. */
  distance: number;
  kind: EdgeKind;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  /** How many memories carry no vector and are therefore absent. */
  unembedded: number;
  /** Fraction of variance the three axes actually capture, 0–1. */
  explained: number;
  /** The k used for the neighbour graph, chosen from N. */
  k: number;
  /** Edges that came from a written [[reference]] rather than from similarity. */
  links: number;
  /**
   * Edges as a fraction of all possible pairs, 0–1.
   *
   * The honest signal for whether a node-link view is worth drawing. Near 1 the
   * graph is complete and every layout is a hairball regardless of algorithm;
   * the map view carries the same information without the occlusion.
   */
  density: number;
  /** Cosine distance stats across all pairs — the honest scale for a threshold. */
  distance: { min: number; max: number; median: number } | null;
}

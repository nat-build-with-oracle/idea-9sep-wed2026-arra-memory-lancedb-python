"""
The corpus as geometry: points from a PCA projection of the embeddings, edges
from mutual k-nearest-neighbours unioned with a maximum spanning tree, plus the
edges someone actually wrote as [[references]].
"""

from __future__ import annotations

import math
import re

import numpy as np

from .memory import _scope_set, embedded_rows, scope_filter
from .utils import normalize_created_by, normalize_kind, normalize_project, normalize_workspace

_LINK = re.compile(r"\[\[([^\]|]{1,160})(?:\|[^\]]*)?\]\]")


def _project(vectors: np.ndarray, dims: int = 3) -> tuple[np.ndarray, float]:
    """Deterministic PCA via SVD; each axis normalised to [-1, 1] independently."""
    n = vectors.shape[0]
    centred = vectors - vectors.mean(axis=0, keepdims=True)
    total = float((centred * centred).sum())
    if total <= 0:
        return np.zeros((n, dims)), 0.0
    _, s, vt = np.linalg.svd(centred, full_matrices=False)
    components = vt[:dims]
    coords = centred @ components.T
    if coords.shape[1] < dims:
        coords = np.hstack([coords, np.zeros((n, dims - coords.shape[1]))])
    explained = float((s[:dims] ** 2).sum() / (s**2).sum()) if s.size else 0.0
    for axis in range(dims):
        lo, hi = coords[:, axis].min(), coords[:, axis].max()
        span = (hi - lo) or 1.0
        coords[:, axis] = (coords[:, axis] - lo) / span * 2 - 1
    return coords, explained


def _neighbour_edges(sim: np.ndarray, k: int) -> list[dict]:
    n = sim.shape[0]
    masked = sim.copy()
    np.fill_diagonal(masked, -np.inf)
    top = [set(np.argsort(-masked[i])[:k].tolist()) for i in range(n)]
    edges: list[dict] = []
    seen: set[tuple[int, int]] = set()
    for i in range(n):
        for j in top[i]:
            if i not in top[j]:
                continue
            key = (i, j) if i < j else (j, i)
            if key in seen:
                continue
            seen.add(key)
            edges.append({"source": i, "target": j, "distance": float(1 - sim[i, j]), "kind": "similar"})

    # Maximum spanning tree (Prim) so no memory is ever an island.
    in_tree = np.zeros(n, dtype=bool)
    in_tree[0] = True
    best_sim = masked[0].copy()
    best_from = np.zeros(n, dtype=int)
    for _ in range(1, n):
        candidates = np.where(in_tree, -np.inf, best_sim)
        j = int(np.argmax(candidates))
        if not np.isfinite(candidates[j]):
            break
        i = int(best_from[j])
        in_tree[j] = True
        key = (i, j) if i < j else (j, i)
        if key not in seen:
            seen.add(key)
            edges.append({"source": i, "target": j, "distance": float(1 - sim[i, j]), "kind": "bridge"})
        improved = masked[j] > best_sim
        best_sim = np.where(improved, masked[j], best_sim)
        best_from = np.where(improved, j, best_from)
    return edges


def _link_edges(nodes: list[dict], contents: list[str]) -> list[dict]:
    by_title = {re.sub(r"\s+", " ", n["title"].strip().lower()): i for i, n in enumerate(nodes)}
    edges: list[dict] = []
    seen: set[tuple[int, int]] = set()
    for src, text in enumerate(contents):
        for match in _LINK.finditer(text):
            raw = match.group(1).strip()
            needle = re.sub(r"\s+", " ", raw.lower())
            to = by_title.get(needle)
            if to is None and len(raw) >= 8:
                to = next((i for i, n in enumerate(nodes) if n["id"].startswith(raw)), None)
            if to is None or to == src:
                continue
            key = (src, to) if src < to else (to, src)
            if key in seen:
                continue
            seen.add(key)
            edges.append({"source": src, "target": to, "distance": 0.0, "kind": "link"})
    return edges


def build_graph(scope: dict) -> dict:
    limit = max(1, min(2000, int(scope.get("limit") or 500)))
    where = scope_filter(scope)
    rows, total = embedded_rows(limit if not where else 2000)
    if where:
        rows = [r for r in rows if _in_scope(r, scope)][:limit]

    vectors: list[np.ndarray] = []
    nodes: list[dict] = []
    contents: list[str] = []
    for r in rows:
        vec = r.get("vector")
        if vec is None or len(vec) == 0:
            continue
        vectors.append(np.asarray(vec, dtype=np.float32))
        contents.append(str(r.get("content") or ""))
        nodes.append(
            {
                "id": r["id"],
                "title": r["title"],
                "kind": normalize_kind(r.get("kind")),
                "workspace": r.get("workspace") or "",
                "project": r.get("project") or "",
                "createdBy": r.get("created_by") or "",
                "importance": int(r.get("importance") or 0),
                "createdAt": r["created_at"],
            }
        )

    unembedded = max(0, total - len(vectors))
    if len(vectors) < 2:
        return {
            "nodes": [{**n, "x": 0.0, "y": 0.0, "z": 0.0} for n in nodes],
            "edges": [],
            "unembedded": unembedded,
            "explained": 0.0,
            "k": 0,
            "links": 0,
            "density": 0.0,
            "distance": None,
        }

    matrix = np.vstack(vectors)
    coords, explained = _project(matrix)
    sim = matrix @ matrix.T
    n = matrix.shape[0]
    upper = sim[np.triu_indices(n, k=1)]
    flat = np.sort(1 - upper)
    k = max(2, min(12, math.ceil(math.sqrt(n))))

    written = _link_edges(nodes, contents)
    inferred = _neighbour_edges(sim, k)
    claimed = {(min(e["source"], e["target"]), max(e["source"], e["target"])) for e in written}
    edges = written + [
        e for e in inferred if (min(e["source"], e["target"]), max(e["source"], e["target"])) not in claimed
    ]
    possible = n * (n - 1) / 2

    return {
        "nodes": [
            {**node, "x": float(coords[i, 0]), "y": float(coords[i, 1]), "z": float(coords[i, 2])}
            for i, node in enumerate(nodes)
        ],
        "edges": edges,
        "unembedded": unembedded,
        "explained": explained,
        "k": k,
        "density": edges.__len__() / possible if possible > 0 else 0.0,
        "links": len(written),
        "distance": {
            "min": float(flat[0]),
            "max": float(flat[-1]),
            "median": float(flat[len(flat) // 2]),
        },
    }


def _in_scope(row: dict, scope: dict) -> bool:
    checks = (
        ("kind", scope.get("kind"), normalize_kind),
        ("workspace", scope.get("workspace"), normalize_workspace),
        ("project", scope.get("project"), normalize_project),
        ("created_by", scope.get("createdBy"), normalize_created_by),
    )
    for column, value, normalize in checks:
        wanted = _scope_set(value, normalize)
        if wanted and (row.get(column) or "") not in wanted:
            return False
    return True

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { api } from "./api";
import { kindColor } from "./Chips";
import { Panel } from "./Menu";
import { Method } from "./Method";
import { t } from "./i18n";
import type { Graph, GraphNode, Memory, Scope } from "./types";

/**
 * The corpus, drawn.
 *
 * Two modes, and the difference between them is the whole point:
 *
 *   MAP — points only, positioned by projecting each memory's embedding to three
 *         dimensions. Proximity IS similarity. No edges, so nothing occludes
 *         anything and it stays readable at any size.
 *
 *   WEB — the same points plus edges to near neighbours. More striking, and
 *         legible only while the corpus is small. Obsidian's graph is unreadable
 *         past ~200 notes; Roam's layout gives up around 600. That is not a
 *         layout problem with a layout fix — it is what node-link diagrams do.
 *
 * The header states the density, which is the honest signal for which mode to
 * trust: near 100% every pair is an edge and the web is a hairball whatever it
 * looks like. It also states the variance the projection captured, because three
 * axes out of 1024 is a shadow and a viewer is owed that.
 *
 * ── rendering
 *
 * One `Points` for every node and one `LineSegments` for every edge — two draw
 * calls total, regardless of corpus size. The obvious alternative (a Mesh per
 * node, a Line per edge) is what the popular graph libraries do and it puts the
 * draw-call count in the thousands, where CPU command submission, not the GPU,
 * becomes the limit at around 500.
 */

type Mode = "map" | "web";

/** How many names can share a panel this size before it is a list, not a map. */
const LABEL_CAP = 20;

export function Atlas({
  onClose,
  nav,
  scope,
  onOpenMemory,
}: {
  onClose: () => void;
  nav?: React.ReactNode;
  /** The chip filters, so the drawing shows what the archive is showing. */
  scope: Scope;
  onOpenMemory: (id: string) => void;
}) {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [mode, setMode] = useState<Mode>("map");
  const [hovered, setHovered] = useState<GraphNode | null>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [detail, setDetail] = useState<Memory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mount = useRef<HTMLDivElement>(null);
  // Positioned by the render loop directly, not by React: the card is glued to
  // a node that moves every frame, and re-rendering the tree sixty times a
  // second to move one box would be absurd.
  const hoverBox = useRef<HTMLDivElement>(null);
  const cardBox = useRef<HTMLDivElement>(null);

  /**
   * Show every name at once, as if hovering all of them.
   *
   * Capped, because labels are the one thing in this scene that cannot overlap
   * gracefully: two glows on top of each other are brighter, two names on top
   * of each other are unreadable. Twenty is about where a panel this size stops
   * being a picture and starts being a list.
   */
  /**
   * On by default in MAP, off in WEB.
   *
   * The map draws no edges — it is points only — so without names it is a
   * constellation: you can see there is structure and not what any of it is.
   * The web has filaments doing that job, and twenty labels over them is
   * clutter. So the default follows the mode.
   *
   * Until you touch it. Once the toggle has been used it is your decision and
   * the mode stops overriding it, because a control that silently resets itself
   * when you change something else is not a control.
   */
  const [showNames, setShowNames] = useState(true);
  const namesTouched = useRef(false);
  const namesOn = useRef(true);
  namesOn.current = showNames;

  useEffect(() => {
    if (namesTouched.current) return;
    setShowNames(mode === "map");
  }, [mode]);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);

  // The clicked memory's full text. The graph carries titles only — sending
  // every body with the geometry would multiply the payload for content that
  // is usually not read.
  const [detailState, setDetailState] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (!selected) { setDetail(null); setDetailState("idle"); return; }
    let live = true;
    setDetail(null);
    setDetailState("loading");
    api.memories.get(selected.id)
      .then((r) => { if (live) { setDetail(r.memory); setDetailState("idle"); } })
      // An unexplained "…" is worse than an error: it looks like content that
      // is about to arrive and never does, so nobody reports it as broken.
      .catch(() => live && setDetailState("error"));
    return () => { live = false; };
  }, [selected]);

  const scopeKey = useMemo(
    () => JSON.stringify([scope.kind, scope.workspace, scope.project, scope.createdBy]),
    [scope],
  );

  const reload = useCallback(() => {
    let live = true;
    api.graph(scope)
      .then((g) => live && (setGraph(g), setError(null)))
      .catch((e) => live && setError(e instanceof Error ? e.message : "Could not build the graph."));
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopeKey]);

  useEffect(() => reload(), [reload]);

  /**
   * Rebuild when the tab comes back.
   *
   * The same reason the memory list does it: the corpus has more than one
   * writer, and a drawing of a corpus that has since changed is worse than a
   * stale list — a list at least looks like text you might reread, while this
   * looks like a measurement.
   */
  useEffect(() => {
    const onFocus = () => {
      if (document.visibilityState === "visible") reload();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [reload]);

  useEffect(() => {
    const host = mount.current;
    if (!host || !graph || graph.nodes.length === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    // ── nodes: one Points, one draw call
    const positions = new Float32Array(graph.nodes.length * 3);
    const colors = new Float32Array(graph.nodes.length * 3);
    const sizes = new Float32Array(graph.nodes.length);
    const probe = document.createElement("span");
    host.appendChild(probe);
    graph.nodes.forEach((node, i) => {
      positions[i * 3] = node.x * 1.6;
      positions[i * 3 + 1] = node.y * 1.6;
      positions[i * 3 + 2] = node.z * 1.6;
      // kindColor returns a CSS variable for known kinds, so it has to be
      // resolved against the document rather than parsed as a hex string —
      // otherwise every node renders black under a theme it cannot read.
      probe.style.color = kindColor(node.kind);
      const rgb = getComputedStyle(probe).color;
      const c = new THREE.Color(rgb);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      // WORLD units, not pixels — the shader multiplies by a projection scale
      // and divides by depth, so a pixel value here becomes a point thousands
      // of pixels across at any sane camera distance. Importance is the one
      // property worth encoding in size: it is the only field a human chose.
      sizes[i] = 0.062 + node.importance * 0.020;
    });
    host.removeChild(probe);

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    nodeGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    // gl_VertexID needs WebGL2/GLSL3; an explicit attribute works everywhere
    // and costs one float per node.
    const indices = new Float32Array(graph.nodes.length);
    for (let i = 0; i < indices.length; i++) indices[i] = i;
    nodeGeo.setAttribute("index", new THREE.BufferAttribute(indices, 1));

    const nodeMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      // Additive: overlapping glows accumulate into brightness instead of
      // occluding each other. This is the single change that stops a scatter of
      // flat discs reading as a chart and starts it reading as something lit.
      blending: THREE.AdditiveBlending,
      uniforms: { uScale: { value: 1 }, uTime: { value: 0 }, uActive: { value: -1 } },
      vertexShader: `
        attribute float size;
        attribute float index;
        varying vec3 vColor;
        varying float vDepth;
        varying float vSeed;
        varying float vActive;
        uniform float uScale;
        uniform float uTime;
        uniform float uActive;
        void main() {
          vColor = color;
          // The open memory has to be findable in the cloud while its document
          // is on screen — otherwise "which one did I click" is unanswerable
          // the moment the page scrolls. It swells and pulses harder.
          vActive = abs(index - uActive) < 0.5 ? 1.0 : 0.0;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          // Depth, normalised over the range the camera actually travels. Fed
          // to the fragment shader so far somas dim — the cheapest and most
          // convincing depth cue there is, and the thing whose absence made
          // this look like a plane.
          vDepth = clamp((-mv.z - 1.0) / 9.0, 0.0, 1.0);
          // A per-point phase so they do not all breathe in unison, which would
          // read as one blinking object rather than many living ones.
          vSeed = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453);
          float breathe = 0.88 + 0.12 * sin(uTime * 1.4 + vSeed * 6.283);
          float lift = 1.0 + vActive * (0.85 + 0.35 * sin(uTime * 3.4));
          gl_PointSize = size * breathe * lift * uScale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vColor;
        varying float vDepth;
        varying float vActive;
        void main() {
          vec2 d = gl_PointCoord - vec2(0.5);
          float r = length(d) * 2.0;
          if (r > 1.0) discard;
          // A soma, not a disc: a hot near-white core inside a wide falloff
          // halo. The pow() is what separates the two — a linear falloff gives
          // a flat blob, and the whole difference between "dot" and "cell body"
          // is in that curve.
          float halo = pow(1.0 - r, 1.9);
          float core = pow(max(0.0, 1.0 - r * 2.6), 2.0);
          // The core is pushed past 1.0 deliberately: with additive blending an
          // over-bright centre blooms into its own halo, which is what a real
          // point of light does to a lens and what makes this read as emitting
          // rather than as a coloured circle.
          vec3 lit = vColor * halo * 1.25 + vec3(1.0) * core * 1.35;
          // Distance dims, and the far side of the cloud recedes instead of
          // sitting on the same plane as the near side.
          // The active soma ignores distance fade — it stays the brightest thing
          // on screen wherever the cloud has turned to.
          float fade = mix(mix(1.0, 0.22, vDepth), 1.0, vActive);
          gl_FragColor = vec4(lit * fade * (1.0 + vActive * 0.5), (halo * 0.9 + core) * fade);
        }`,
      vertexColors: true,
    });
    const points = new THREE.Points(nodeGeo, nodeMat);
    scene.add(points);

    // ── dendrites: curved filaments, one LineSegments, one draw call
    //
    // Straight segments between points read as a wire diagram. A dendrite does
    // not travel in a straight line, so each edge is a quadratic bezier bowed
    // away from the origin and sampled into short segments — still one buffer
    // and one draw call, but the eye reads growth instead of engineering.
    //
    // Drawn in BOTH modes now. Map mode had no edges at all, which is most of
    // why it looked like a scatter plot on a plane: with nothing connecting
    // them, seven dots have no volume to sit inside. In map mode they are
    // faint structure; in web mode they are the subject.
    const SEG = 14;
    let lines: THREE.LineSegments | null = null;
    let pulses: THREE.Points | null = null;
    let pulseGeo: THREE.BufferGeometry | null = null;
    const curves: THREE.QuadraticBezierCurve3[] = [];

    if (graph.edges.length) {
      const accentProbe = document.createElement("span");
      accentProbe.style.color = "var(--color-ember)";
      host.appendChild(accentProbe);
      const accent = new THREE.Color(getComputedStyle(accentProbe).color);
      host.removeChild(accentProbe);

      const faint = mode === "map" ? 0.45 : 1;
      const segs = graph.edges.length * SEG;
      const linePos = new Float32Array(segs * 6);
      const lineCol = new Float32Array(segs * 6);

      graph.edges.forEach((edge, e) => {
        const a = graph.nodes[edge.source]!;
        const b = graph.nodes[edge.target]!;
        const from = new THREE.Vector3(a.x * 1.6, a.y * 1.6, a.z * 1.6);
        const to = new THREE.Vector3(b.x * 1.6, b.y * 1.6, b.z * 1.6);
        // Bow the control point away from the centre, by an amount proportional
        // to the span — long connections arc more, which is what stops a dense
        // region turning into a solid mat of overlapping straight lines.
        const mid = from.clone().add(to).multiplyScalar(0.5);
        const bow = mid.clone().normalize().multiplyScalar(from.distanceTo(to) * 0.22);
        const control = mid.add(bow);
        const curve = new THREE.QuadraticBezierCurve3(from, control, to);
        curves.push(curve);

        // Three kinds, three treatments, because they are three different
        // claims. A written [[link]] is someone saying these belong together —
        // accent-coloured and full strength. An inferred neighbour is a
        // statistic, grey and brighter the nearer the pair. A bridge exists only
        // so the graph stays connected and is faintest, so it cannot be mistaken
        // for a closeness it does not carry.
        const base =
          edge.kind === "link"
            ? { r: accent.r * 1.6, g: accent.g * 1.6, b: accent.b * 1.6, s: 1 }
            : edge.kind === "bridge"
              ? { r: 0.55, g: 0.6, b: 0.66, s: 0.3 }
              : { r: 0.66, g: 0.76, b: 0.86, s: Math.max(0.22, 1 - edge.distance) * 1.15 };

        for (let i = 0; i < SEG; i++) {
          const p0 = curve.getPoint(i / SEG);
          const p1 = curve.getPoint((i + 1) / SEG);
          const o = (e * SEG + i) * 6;
          linePos.set([p0.x, p0.y, p0.z, p1.x, p1.y, p1.z], o);
          // Taper: brightest at the ends where a filament meets a soma, thinnest
          // in the middle. An untapered line looks drawn; a tapered one looks
          // grown, and it also stops the middle of a dense bundle blowing out.
          for (let v = 0; v < 2; v++) {
            const t = (i + v) / SEG;
            const taper = 0.35 + 0.65 * Math.pow(Math.abs(t - 0.5) * 2, 1.6);
            const k = base.s * taper * faint;
            lineCol.set([base.r * k, base.g * k, base.b * k], o + v * 3);
          }
        }
      });

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
      lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 3));
      lines = new THREE.LineSegments(
        lineGeo,
        new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          // Additive again, so crossing filaments brighten where they meet
          // rather than punching holes in each other.
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      scene.add(lines);

      // ── signals: one travelling spark per filament
      //
      // The thing that makes it read as alive rather than as a sculpture.
      // One Points buffer, positions rewritten each frame along the curves —
      // still one draw call, and at this scale the CPU cost is nothing.
      const pulsePos = new Float32Array(graph.edges.length * 3);
      const pulseCol = new Float32Array(graph.edges.length * 3);
      graph.edges.forEach((edge, i) => {
        const lit = edge.kind === "link" ? [accent.r, accent.g, accent.b] : [0.55, 0.72, 0.8];
        pulseCol.set(lit, i * 3);
      });
      pulseGeo = new THREE.BufferGeometry();
      pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
      pulseGeo.setAttribute("color", new THREE.BufferAttribute(pulseCol, 3));
      pulses = new THREE.Points(
        pulseGeo,
        new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexColors: true,
          uniforms: { uScale: { value: 1 } },
          vertexShader: `
            varying vec3 vColor;
            uniform float uScale;
            void main() {
              vColor = color;
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = 0.03 * uScale / -mv.z;
              gl_Position = projectionMatrix * mv;
            }`,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              float r = length(gl_PointCoord - vec2(0.5)) * 2.0;
              if (r > 1.0) discard;
              float a = pow(1.0 - r, 2.0);
              gl_FragColor = vec4(vColor * 1.4 + vec3(1.0) * pow(max(0.0, 1.0 - r * 2.4), 2.0), a);
            }`,
        }),
      );
      scene.add(pulses);
    }

    // ── the volume the cloud sits in
    //
    // A few hundred faint motes, filling a sphere well outside the data. They
    // carry no information whatsoever and that is the point: with nothing but
    // seven points against black there is no parallax, so rotating tells you
    // nothing and the scene reads flat. Motes at varying depths make the
    // rotation legible, which is what turns a diagram into somewhere.
    const DUST = 420;
    const dustPos = new Float32Array(DUST * 3);
    let dseed = 7;
    const drand = () => {
      dseed = (dseed * 1103515245 + 12345) & 0x7fffffff;
      return dseed / 0x7fffffff;
    };
    for (let i = 0; i < DUST; i++) {
      // Rejection-free spherical sampling, radius biased outward so the motes
      // sit around the data rather than through it.
      const theta = drand() * Math.PI * 2;
      const phi = Math.acos(2 * drand() - 1);
      const rad = 2.6 + drand() * 4.2;
      dustPos.set(
        [
          rad * Math.sin(phi) * Math.cos(theta),
          rad * Math.sin(phi) * Math.sin(theta),
          rad * Math.cos(phi),
        ],
        i * 3,
      );
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        size: 0.016,
        sizeAttenuation: true,
        color: 0x9fb8c8,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(dust);

    // ── interaction: drag to rotate, wheel to zoom, hover to identify
    //
    // Picking is done in SCREEN space, not with a Raycaster.
    //
    // The raycaster tests against a world-space `threshold` radius, but these
    // points are drawn at a size that shrinks with depth — so one fixed radius
    // is simultaneously too generous for a near soma and too mean for a far
    // one, and the hit region stops matching what you can see. That is exactly
    // the "mouse position is not correct" symptom: the tooltip fires while the
    // cursor is nowhere near the glow.
    //
    // Projecting each node to the screen and comparing against its ACTUAL
    // rendered pixel radius is exact by construction — the same numbers the
    // vertex shader uses — and at this corpus size the loop is free.
    const projected = new Float32Array(graph.nodes.length * 3); // x, y, radius
    const pointer = new THREE.Vector2(-10, -10);
    const pointerPx = { x: -1, y: -1 };

    /** Screen positions and pixel radii for every node, in CSS pixels. */
    const project = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      const scale = h / (2 * Math.tan((camera.fov * Math.PI) / 360));
      const v = new THREE.Vector3();
      for (let i = 0; i < graph.nodes.length; i++) {
        v.set(positions[i * 3]!, positions[i * 3 + 1]!, positions[i * 3 + 2]!);
        v.applyMatrix4(camera.matrixWorldInverse);
        const depth = -v.z;
        v.applyMatrix4(camera.projectionMatrix);
        projected[i * 3] = (v.x * 0.5 + 0.5) * w;
        projected[i * 3 + 1] = (-v.y * 0.5 + 0.5) * h;
        // Half of gl_PointSize, in CSS px — the visible radius of the glow.
        projected[i * 3 + 2] = depth > 0 ? (sizes[i]! * scale) / depth / 2 : -1;
      }
    };

    /** The node under the cursor, or -1. Nearest wins when glows overlap. */
    const pick = (): number => {
      if (pointerPx.x < 0) return -1;
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < graph.nodes.length; i++) {
        const r = projected[i * 3 + 2]!;
        if (r <= 0) continue;
        const dx = projected[i * 3]! - pointerPx.x;
        const dy = projected[i * 3 + 1]! - pointerPx.y;
        const d = Math.hypot(dx, dy);
        // Generous on purpose: the glow is a soft halo with no hard edge, so a
        // hit region the size of the bright core would feel broken to anyone
        // aiming at what they can see. Two and a bit times the radius, with an
        // 18px floor so a distant soma stays a real target rather than a
        // sub-pixel one. Safe to be generous because the NEAREST match wins —
        // overlapping regions resolve to the node you are closest to.
        if (d <= Math.max(r * 2.4, 18) && d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return best;
    };
    const rot = { x: 0.2, y: 0.5 };
    let drag: { x: number; y: number } | null = null;
    let dist = 4;
    let spin = true;
    let selectedIndex = -1;

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      // The buffer is sized in JS; the DISPLAY size is pinned in CSS below, once.
      //
      // Not left to three's updateStyle: measured here, the canvas came back
      // with `display: block; touch-action: none` and no width or height at all,
      // so it fell back to rendering at its intrinsic buffer size — 1708 CSS px
      // inside an 854px container, cropped to a corner by overflow-hidden. Every
      // point then looked enormous because we were seeing a fraction of a frame,
      // not because anything was sized wrong. Pinning width/height to 100% makes
      // the display size the container's business and the buffer size ours,
      // which is the split that cannot drift.
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // The perspective scale that converts a world-space radius to pixels:
      // viewportHeight / (2 · tan(fov/2)). Deriving it from the camera rather
      // than guessing is what keeps a point the same apparent size when the
      // panel is resized.
      // gl_PointSize is in DEVICE pixels, so the pixel ratio belongs in the
      // scale — without it every point renders at half size on a retina panel
      // and the map reads as empty.
      const scale =
        (h * renderer.getPixelRatio()) / (2 * Math.tan((camera.fov * Math.PI) / 360));
      nodeMat.uniforms.uScale!.value = scale;
      if (pulses) (pulses.material as THREE.ShaderMaterial).uniforms.uScale!.value = scale;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const onDown = (e: PointerEvent) => { drag = { x: e.clientX, y: e.clientY }; spin = false; };
    const onUp = () => { drag = null; };
    const onMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerPx.x = e.clientX - rect.left;
      pointerPx.y = e.clientY - rect.top;
      if (!drag) return;
      rot.y += (e.clientX - drag.x) * 0.006;
      rot.x += (e.clientY - drag.y) * 0.006;
      rot.x = Math.max(-1.4, Math.min(1.4, rot.x));
      drag = { x: e.clientX, y: e.clientY };
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      dist = Math.max(1.4, Math.min(12, dist + e.deltaY * 0.003));
    };
    const onClick = () => {
      // Clicking a soma opens it HERE rather than navigating away. Being thrown
      // to a filtered archive loses the thing you clicked from — the shape you
      // were reading — and you have to find your way back to it.
      const idx = pick();
      setSelected(idx >= 0 ? graph.nodes[idx]! : null);
      selectedIndex = idx;
    };

    // Leaving the canvas must clear the hover, or the last tooltip sticks
    // forever while the cursor is somewhere else entirely.
    const onLeave = () => {
      pointerPx.x = -1;
      pointerPx.y = -1;
    };

    const el = renderer.domElement;
    el.style.touchAction = "none";
    el.style.width = "100%";
    el.style.height = "100%";
    el.style.display = "block";
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("click", onClick);
    el.addEventListener("pointerleave", onLeave);

    // Kept in step with React state so dismissing the card with ✕ also stops
    // the loop pinning it to a node — two sources of truth for one selection is
    // how a closed panel comes back on the next frame.
    selectedIndex = selected ? graph.nodes.findIndex((n) => n.id === selected.id) : -1;

    let raf = 0;
    let lastHover = -1;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const time = reduce ? 0 : (performance.now() - started) / 1000;
      nodeMat.uniforms.uTime!.value = time;
      nodeMat.uniforms.uActive!.value = selectedIndex;

      // Signals travel. Each filament carries one, offset by its index so they
      // do not all fire together, and a link — a connection someone actually
      // wrote — fires faster than an inferred one.
      if (pulses && pulseGeo && !reduce) {
        const arr = pulseGeo.getAttribute("position") as THREE.BufferAttribute;
        const buf = arr.array as Float32Array;
        curves.forEach((curve, i) => {
          const speed = graph.edges[i]!.kind === "link" ? 0.42 : 0.24;
          const t = (time * speed + i * 0.37) % 1;
          const at = curve.getPoint(t);
          buf[i * 3] = at.x;
          buf[i * 3 + 1] = at.y;
          buf[i * 3 + 2] = at.z;
        });
        arr.needsUpdate = true;
      }

      // A slow drift until the first interaction, so the shape reads as
      // three-dimensional without anyone having to discover that it turns.
      if (spin && !reduce) rot.y += 0.0016;
      // The volume counter-rotates, very slightly. Parallax against a still
      // field is what tells the eye the cloud has depth; without it a rotating
      // scatter still reads as a spinning plane.
      dust.rotation.y -= 0.0004;
      camera.position.set(
        Math.sin(rot.y) * Math.cos(rot.x) * dist,
        Math.sin(rot.x) * dist,
        Math.cos(rot.y) * Math.cos(rot.x) * dist,
      );
      camera.lookAt(0, 0, 0);

      camera.updateMatrixWorld();
      // The inverse is normally refreshed by renderer.render(), which runs at
      // the END of this function — so projecting first would use the previous
      // frame's camera, and on the very first frame an identity matrix. Close
      // enough to look plausible while being wrong, which is the worst kind.
      camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
      project();

      const idx = pick();
      if (idx !== lastHover) {
        lastHover = idx;
        setHovered(idx >= 0 ? graph.nodes[idx]! : null);
      }
      // Set every frame, not only when the hovered node changes. Setting it on
      // change alone leaves it stuck: start a drag over a soma and the cursor
      // stays a hand for as long as you keep dragging, because the index never
      // changed. It is one string assignment; the browser ignores a no-op.
      el.style.cursor = drag ? "grabbing" : idx >= 0 ? "pointer" : "grab";

      // Glue the tooltip and the detail card to their nodes. Written straight
      // to style rather than through state, and clamped inside the panel so a
      // node near an edge does not push its card out of view.
      const place = (box: HTMLDivElement | null, i: number, dy: number) => {
        if (!box || i < 0) return;
        const w = host.clientWidth;
        const h = host.clientHeight;
        const bw = box.offsetWidth || 260;
        const bh = box.offsetHeight || 90;
        const x = Math.min(Math.max(projected[i * 3]! + 14, 8), Math.max(8, w - bw - 8));
        const y = Math.min(Math.max(projected[i * 3 + 1]! + dy, 8), Math.max(8, h - bh - 8));
        box.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
        // Behind the camera, or off screen: hide rather than pin it to an edge
        // where it would point at nothing.
        box.style.opacity = projected[i * 3 + 2]! > 0 ? "1" : "0";
      };

      // Labels ride the same projection as the picking, so a name is always
      // over the soma it belongs to — no second source of truth for position.
      if (namesOn.current) {
        for (let i = 0; i < labelRefs.current.length; i++) {
          const box = labelRefs.current[i];
          if (!box) continue;
          const li = Number(box.dataset.node);
          const r = projected[li * 3 + 2]!;
          if (r <= 0) { box.style.opacity = "0"; continue; }
          const x = projected[li * 3]!;
          const y = projected[li * 3 + 1]!;
          box.style.transform = `translate(${Math.round(x + r + 6)}px, ${Math.round(y - 8)}px)`;
          // The name you are pointing at, or reading, comes fully forward; the
          // rest sit back so twenty labels read as context rather than as
          // twenty competing claims on your attention.
          box.style.opacity = li === selectedIndex || li === idx ? "1" : "0.55";
        }
      }

      place(hoverBox.current, idx === selectedIndex ? -1 : idx, -10);

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("click", onClick);
      el.removeEventListener("pointerleave", onLeave);
      // WebGL contexts are a finite browser resource — a few dozen leaked and
      // the page stops being able to make new ones.
      nodeGeo.dispose();
      nodeMat.dispose();
      lines?.geometry.dispose();
      (lines?.material as THREE.Material | undefined)?.dispose();
      pulseGeo?.dispose();
      (pulses?.material as THREE.Material | undefined)?.dispose();
      dustGeo.dispose();
      (dust.material as THREE.Material).dispose();
      renderer.dispose();
      if (el.parentNode === host) host.removeChild(el);
    };
  }, [graph, mode, onOpenMemory, selected]);

  const dense = (graph?.density ?? 0) > 0.5;

  // Importance-ordered, then capped. The index is carried alongside because the
  // render loop looks positions up by node index, not by label slot.
  const labelled = (graph?.nodes ?? [])
    .map((node, i) => ({ node, i }))
    .sort((a, b) => b.node.importance - a.node.importance)
    .slice(0, LABEL_CAP);

  return (
    <Panel
      eyebrow={t("nav.atlas")}
      title={t("atlas.title")}
      subtitle={t("atlas.subtitle")}
      onClose={onClose}
      nav={nav}
      actions={
        <div className="flex flex-wrap items-center gap-1.5">
          {(["map", "web"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              className="chip"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
            >
              {t(m === "map" ? "atlas.map" : "atlas.web")}
            </button>
          ))}
          <button
            type="button"
            className="chip"
            aria-pressed={showNames}
            onClick={() => {
              namesTouched.current = true;
              setShowNames((v) => !v);
            }}
            title={t("atlas.namesTitle")}
          >
            {t("atlas.names")}
            {graph && graph.nodes.length > LABEL_CAP && (
              <span className="chip-count">{LABEL_CAP}</span>
            )}
          </button>
          {graph && (
            <span className="meta ml-2">
              {graph.nodes.length} · {graph.k ? `k=${graph.k}` : "—"} ·{" "}
              {t("atlas.explained")} {Math.round(graph.explained * 100)}%
              {mode === "web" && ` · ${t("atlas.density")} ${Math.round(graph.density * 100)}%`}
              {graph.unembedded > 0 && ` · ${graph.unembedded} ${t("atlas.unembedded")}`}
            </span>
          )}
        </div>
      }
    >
      {error && (
        <p role="alert" className="mb-3 rounded-lg border border-line px-3 py-2 text-sm text-[#f0928f]">
          {error}
        </p>
      )}

      {/* Said out loud rather than left for the viewer to misread as structure.
          A complete graph looks like a rich network and means the opposite. */}
      {mode === "web" && dense && (
        <p className="meta mb-3 rounded-lg border border-dashed border-line px-3 py-2">
          {t("atlas.denseWarning")}
        </p>
      )}

      {graph && graph.nodes.length === 0 ? (
        <p className="py-16 text-center text-sm text-dim">{t("atlas.empty")}</p>
      ) : (
        <div className="relative">
          {/* Fixed aspect rather than a viewport height: this sits inside a Home
              Assistant ingress iframe whose height is not ours to assume. */}
          <div
            ref={mount}
            className="w-full overflow-hidden rounded-xl border border-line bg-panel"
            style={{ aspectRatio: "16 / 10" }}
          />
          {/* Every name at once — the hover tooltip, for all of them.
              Positioned by the render loop, not by React: they follow somas that
              move every frame. Capped and ordered by importance, so if the
              corpus outgrows the cap it is the memories someone marked as
              mattering that keep their labels. */}
          {showNames &&
            graph &&
            labelled.map(({ node, i }, slot) => (
              <div
                key={node.id}
                ref={(el) => { labelRefs.current[slot] = el; }}
                data-node={i}
                className="pointer-events-none absolute left-0 top-0 max-w-[13rem] truncate rounded px-1 font-mono text-[0.68rem] leading-tight"
                style={{ background: "color-mix(in oklab, var(--color-ground) 72%, transparent)", color: "var(--color-dim)" }}
              >
                {node.title}
              </div>
            ))}

          {/* Hover: a name, next to the thing you are pointing at. It used to
              live in a fixed corner, which meant reading it required looking
              away from the node it described. */}
          <div
            ref={hoverBox}
            className="pointer-events-none absolute left-0 top-0 max-w-xs rounded-lg border border-line bg-ground/95 px-3 py-2 transition-opacity"
            style={{ opacity: hovered && hovered.id !== selected?.id ? 1 : 0 }}
          >
            <p className="text-sm text-ink">{hovered?.title}</p>
            <p className="meta mt-1">
              {[hovered?.kind, hovered?.workspace, hovered?.project, hovered?.createdBy]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>

        </div>
      )}

      {/* The document opens BELOW the shape, in normal page flow — not over it.
          A panel on top covers the thing you clicked FROM, so you lose your
          place in the cloud at the moment you most want to keep it. Here the
          atlas stays on screen, the memory unrolls underneath, and the page
          keeps its single scrollbar because nothing nests. */}
      {selected && (
        <section
          className="mt-4 rounded-xl border"
          style={{ borderColor: "var(--color-ember)", background: "var(--color-panel)" }}
        >
          <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
            <div className="min-w-0">
              <h2 className="text-base font-semibold leading-snug text-ink">{selected.title}</h2>
              <p className="meta mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span style={{ color: kindColor(selected.kind) }}>{selected.kind}</span>
                {selected.workspace && <span>· {selected.workspace}</span>}
                {selected.project && <span>· {selected.project}</span>}
                {selected.createdBy && <span>· {selected.createdBy}</span>}
                <span>· {selected.createdAt.slice(0, 10)}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label={t("atlas.close")}
              className="shrink-0 rounded px-1.5 py-0.5 text-faint transition-colors hover:text-ink"
            >
              ✕
            </button>
          </div>

          {/* No max-height and no overflow: the section is as tall as the memory
              is long and the PAGE scrolls, which is the whole reason to put it
              here instead of in a box on top. */}
          <div className="px-4 py-4">
            {detailState === "loading" && <p className="meta">{t("atlas.loading")}</p>}
            {detailState === "error" && (
              <p className="text-sm text-[#f0928f]">{t("atlas.loadFailed")}</p>
            )}
            {detail && (
              <>
                <div className="prose-memory">{detail.content}</div>
                {detail.tags.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {detail.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.68rem] text-dim"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-line px-4 py-2.5">
            <span className="meta">{selected.id.slice(0, 8)}</span>
            <button
              type="button"
              onClick={() => onOpenMemory(selected.id)}
              className="rounded-lg border border-line px-3 py-1.5 text-xs text-dim transition-colors hover:border-ember hover:text-ember"
            >
              {t("atlas.openInArchive")}
            </button>
          </div>
        </section>
      )}

      {/* The working, under the drawing it explains. A visualisation makes a
          claim — "these two are near each other" — and a claim nobody can check
          is decoration. Every figure in there is read from the same response
          that positioned the points, so it cannot drift from the picture. */}
      {graph && graph.nodes.length > 0 && <Method graph={graph} />}
    </Panel>
  );
}

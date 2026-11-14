/**
 * Geometry for the Platform hero's architecture model.
 *
 * The model is built in world units (z up) and projected once, at build
 * time, through a perspective camera, so every face, edge, and label anchor
 * comes from the same 3D scene:
 *
 *   plinth + foundation  the organization: the broad base everything stands on
 *   core + three plates  the Connected Operating Record, layered on the core
 *   four modules         the Workstations, on the foundation, each joined to
 *                        the core by a conduit along the floor
 *
 * Output is plain SVG point strings and percentages; nothing here runs in
 * the browser.
 */

type V3 = readonly [number, number, number];
type V2 = readonly [number, number];

const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: V3): V3 => {
  const l = Math.hypot(a[0], a[1], a[2]);
  return [a[0] / l, a[1] / l, a[2] / l];
};

// Camera: elevated three-quarter view, turned off the diagonal so the model
// reads as architecture rather than an isometric icon.
const TARGET: V3 = [0, 0, 36];
const YAW = (34 * Math.PI) / 180;
const PITCH = (21 * Math.PI) / 180;
const DIST = 470;
const FOCAL = 1000;
const EYE: V3 = [
  TARGET[0] + DIST * Math.cos(PITCH) * Math.cos(YAW),
  TARGET[1] + DIST * Math.cos(PITCH) * Math.sin(YAW),
  TARGET[2] + DIST * Math.sin(PITCH),
];
const FWD = norm(sub(TARGET, EYE));
const RIGHT = norm(cross(FWD, [0, 0, 1]));
const UP = cross(RIGHT, FWD);

const project = (p: V3): V2 => {
  const v = sub(p, EYE);
  const z = dot(v, FWD);
  return [(FOCAL * dot(v, RIGHT)) / z, (-FOCAL * dot(v, UP)) / z];
};
/** Distance along the view axis, for back-to-front ordering. */
const depth = (p: V3) => dot(sub(p, EYE), FWD);

const pts = (ps: V3[]) => ps.map(project);

// ── Boxes ────────────────────────────────────────────────────────────────

export type FaceKind = "top" | "left" | "right";

export interface Face {
  kind: FaceKind;
  points: string;
}

export interface Box {
  faces: Face[];
  /** Outline of the top face, for edge strokes. */
  top: string;
  /** The vertical edge nearest the camera. */
  nearEdge: [V2, V2];
}

/** Axis-aligned box centred on (cx, cy), from z0 to z1. Only faces turned
 *  toward the camera are emitted, top first, so they paint correctly. */
function box(cx: number, cy: number, hx: number, hy: number, z0: number, z1: number): Box {
  const x0 = cx - hx, x1 = cx + hx, y0 = cy - hy, y1 = cy + hy;
  const sides: { n: V3; q: V3[] }[] = [
    { n: [1, 0, 0], q: [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]] },
    { n: [-1, 0, 0], q: [[x0, y1, z0], [x0, y0, z0], [x0, y0, z1], [x0, y1, z1]] },
    { n: [0, 1, 0], q: [[x1, y1, z0], [x0, y1, z0], [x0, y1, z1], [x1, y1, z1]] },
    { n: [0, -1, 0], q: [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]] },
  ];
  const visible = sides.filter((s) => {
    const c = s.q.reduce<V3>((a, p) => [a[0] + p[0] / 4, a[1] + p[1] / 4, a[2] + p[2] / 4], [0, 0, 0]);
    return dot(s.n, sub(EYE, c)) > 0;
  });
  // Of the two visible sides, the one further left on screen is "left".
  const sx = (s: { q: V3[] }) => project(s.q[0])[0] + project(s.q[1])[0];
  visible.sort((a, b) => sx(a) - sx(b));
  const topQ: V3[] = [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
  const corners: V3[] = [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
  const near = corners.reduce((a, b) => (depth(b) < depth(a) ? b : a));
  return {
    faces: [
      ...visible.map((s, i) => ({ kind: (i === 0 ? "left" : "right") as FaceKind, points: str(pts(s.q)) })),
      { kind: "top", points: str(pts(topQ)) },
    ],
    top: str(pts(topQ)),
    nearEdge: [project([near[0], near[1], z0]), project(near)],
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const str = (ps: readonly V2[]) => ps.map(([x, y]) => `${r1(x)},${r1(y)}`).join(" ");
const line = (a: V3, b: V3) => {
  const [p, q] = [project(a), project(b)];
  return { x1: r1(p[0]), y1: r1(p[1]), x2: r1(q[0]), y2: r1(q[1]) };
};
const path = (ps: V3[]) => "M" + pts(ps).map(([x, y]) => `${r1(x)} ${r1(y)}`).join(" L");

// ── The model ────────────────────────────────────────────────────────────

const FOUND = 86; // foundation half-size
const FOUND_Z = -12;
const PLINTH = 95;
const PLINTH_Z = -24;
const CORE = 6.5;
const PLATE = 31;
// Record plates: [bottom, top] in z.
const PLATES: [number, number][] = [
  [30, 37],
  [52, 59],
  [74, 81],
];
const CORE_TOP = 88;
const MOD = 15; // module half-size
const MOD_H = 14;
const MOD_R = 63; // module distance from the centre

// Where each Workstation's conduit goes. Event, Inventory, and Marketing work
// from event information, so they feed the record. Signage belongs to the
// organization (its screens are the organization's, not an event's), so its
// conduit runs to the organization's boundary inlay instead.
export const WORKSTATION_SLOTS = [
  { slug: "event", at: [MOD_R, 0], to: "record" },
  { slug: "inventory", at: [0, MOD_R], to: "record" },
  { slug: "marketing", at: [-MOD_R, 0], to: "record" },
  { slug: "signage", at: [0, -MOD_R], to: "organization" },
] as const;

const plinth = box(0, 0, PLINTH, PLINTH, PLINTH_Z, FOUND_Z - 2);
const foundation = box(0, 0, FOUND, FOUND, FOUND_Z, 0);

// Plot grid etched into the foundation top.
const grid: ReturnType<typeof line>[] = [];
for (let g = -FOUND + 20; g < FOUND; g += 20) {
  grid.push(line([g, -FOUND, 0], [g, FOUND, 0]));
  grid.push(line([-FOUND, g, 0], [FOUND, g, 0]));
}

// Orange inlay: the organization's boundary, inset from the edge.
const INSET = FOUND - 7;
const inlay = str(pts([[-INSET, -INSET, 0], [INSET, -INSET, 0], [INSET, INSET, 0], [-INSET, INSET, 0]]));

// Environment floor around the model, below the plinth. It reaches back
// under the other organizations so they stand on the same ground.
const floor: ReturnType<typeof line>[] = [];
for (let g = -840; g <= 300; g += 30) {
  if (g <= 230) floor.push(line([g, -840, PLINTH_Z], [g, 230, PLINTH_Z]));
  floor.push(line([-840, g, PLINTH_Z], [230, g, PLINTH_Z]));
}

// Contact shadows on the foundation (footprints, drawn blurred).
const footprint = (cx: number, cy: number, h: number, z = 0.05) =>
  str(pts([[cx - h, cy - h, z], [cx + h, cy - h, z], [cx + h, cy + h, z], [cx - h, cy + h, z]]));

// The record: core segments between plates, then each plate, bottom up.
const recordParts: ({ kind: "core"; box: Box } | { kind: "plate"; box: Box; index: number })[] = [];
let z = 0;
PLATES.forEach(([b, t], index) => {
  recordParts.push({ kind: "core", box: box(0, 0, CORE, CORE, z, b) });
  recordParts.push({ kind: "plate", box: box(0, 0, PLATE, PLATE, b, t), index });
  z = t;
});
recordParts.push({ kind: "core", box: box(0, 0, CORE, CORE, z, CORE_TOP) });

// Strata etched on each plate's top: the parts of the record.
const strata = PLATES.map(([, t]) => {
  const out: ReturnType<typeof line>[] = [];
  for (let s = -PLATE + 10; s <= PLATE - 10; s += 8) out.push(line([s, -PLATE + 6, t], [s, PLATE - 6, t]));
  return out;
});

// Workstations, conduits, and junctions.
const modules = WORKSTATION_SLOTS.map(({ slug, at: [mx, my], to }) => {
  const out: V3 = [Math.sign(mx), Math.sign(my), 0];
  let start: V3, end: V3, dir: V3;
  if (to === "record") {
    // Along the floor, under the plates, into the record's core.
    dir = [-out[0], -out[1], 0];
    start = [mx - out[0] * MOD, my - out[1] * MOD, 0.1];
    end = [out[0] * (CORE + 1.5), out[1] * (CORE + 1.5), 0.1];
  } else {
    // Away from the record, to the boundary inlay. The module stands on the
    // inlay's back edge, so the conduit runs along its camera-facing foot,
    // outward (away from the record), and meets the inlay where it emerges
    // at the module's back corner.
    dir = [out[0], out[1], 0];
    start = [mx + MOD + 3, my + MOD - 4, 0.1];
    end = [mx + MOD + 3, -INSET, 0.1];
  }
  // Twin conduit, offset sideways (for record conduits, on the same side as
  // before the Signage reroute).
  const across = to === "record" ? out : dir;
  const side: V3 = [-across[1] * 3.5, across[0] * 3.5, 0];
  const d = depth([mx, my, MOD_H / 2]);
  return {
    slug,
    to,
    depth: d,
    front: depth(end) <= depth([0, 0, 0]),
    box: box(mx, my, MOD, MOD, 0, MOD_H),
    panel: footprint(mx, my, MOD - 4, MOD_H + 0.05),
    shadow: footprint(mx + 3, my - 2, MOD + 3),
    conduit: path([start, end]),
    twin: path([
      [start[0] + side[0], start[1] + side[1], 0.1],
      [end[0] + side[0], end[1] + side[1], 0.1],
    ]),
    junction: project(end),
    // Labels sit outboard of each module, on the side away from the record,
    // anchored at the module's outermost corner: at the top, except for a
    // module behind the record on the right, whose label sits at its base to
    // keep clear of the record's layer labels in that column.
    ...(() => {
      const side: "left" | "right" = project([mx, my, 0])[0] < project([0, 0, 0])[0] ? "left" : "right";
      // On phones the layer labels are hidden, so every label can use the top.
      const outer = (lz: number) => {
        const cs: V3[] = [[mx - MOD, my - MOD, lz], [mx + MOD, my - MOD, lz], [mx + MOD, my + MOD, lz], [mx - MOD, my + MOD, lz]];
        return project(cs.reduce((a, b) => ((project(b)[0] < project(a)[0]) === (side === "left") ? b : a)));
      };
      const behind = d > depth([0, 0, MOD_H / 2]);
      return { side, label: outer(behind && side === "right" ? 0 : MOD_H), labelCompact: outer(MOD_H) };
    })(),
  };
});
const recordDepth = depth([0, 0, 30]);

// ── Other organizations ──────────────────────────────────────────────────
//
// Three smaller organizations in a loose arc around the upper left of this
// one, from about 9 o'clock to 11 (the right side is the label column, and a
// link from 12 o'clock would have to cross the record or the Signage label).
// Each is a scaled copy of an organization (plinth, foundation, core, and a
// two-layer record) so it reads as its own organization, never as a
// Workstation. Distance shows through perspective, scale, and opacity: the
// 9 o'clock one is nearest; the 11 o'clock one is furthest and smallest. A
// faint link runs from each to a point on this organization's foundation
// that is always in view. Positions are in camera terms: how far back from
// this organization, and how far across the screen (negative is left).

const BACK = norm([FWD[0], FWD[1], 0]);
const ACROSS = norm([RIGHT[0], RIGHT[1], 0]);

// Where the links meet this foundation: its left corner, and a point along
// its left edge just in front of it. Both are clear of the modules and record.
const CORNER: V3 = [FOUND, -FOUND, 0];
const LEFT_EDGE: V3 = [FOUND, -FOUND + 20, 0];

function otherOrganization(back: number, across: number, k: number, to: V3) {
  const cx = BACK[0] * back + ACROSS[0] * across;
  const cy = BACK[1] * back + ACROSS[1] * across;
  // Scaled about the floor, so it stands on the same ground plane.
  const zs = (zz: number) => PLINTH_Z + (zz - PLINTH_Z) * k;
  const b = (h: number, z0: number, z1: number) => box(cx, cy, h * k, h * k, zs(z0), zs(z1));
  const parts: { kind: "plinth" | "foundation" | "core" | "plate"; box: Box }[] = [
    { kind: "plinth", box: b(PLINTH, PLINTH_Z, FOUND_Z - 2) },
    { kind: "foundation", box: b(FOUND, FOUND_Z, 0) },
    { kind: "core", box: b(CORE, 0, PLATES[0][0]) },
    { kind: "plate", box: b(PLATE, PLATES[0][0], PLATES[0][1]) },
    { kind: "core", box: b(CORE, PLATES[0][1], PLATES[1][0]) },
    { kind: "plate", box: b(PLATE, PLATES[1][0], PLATES[1][1]) },
    { kind: "core", box: b(CORE, PLATES[1][1], PLATES[1][1] + 7) },
  ];
  // Link: from this organization's foundation edge, facing ours, to a point
  // on our foundation that is always in view (the edges facing these
  // organizations sit behind the Signage module and the record, and a link
  // meeting them would show through the record's glass).
  const d = norm([to[0] - cx, to[1] - cy, 0]);
  const m = Math.max(Math.abs(d[0]), Math.abs(d[1]));
  const from: V3 = [cx + (d[0] / m) * FOUND * k, cy + (d[1] / m) * FOUND * k, zs(0)];
  // Ground contact: a soft shadow on the floor under it.
  const g = PLINTH * k * 1.25;
  const shadow = str(pts([[cx - g, cy - g, PLINTH_Z], [cx + g, cy - g, PLINTH_Z], [cx + g, cy + g, PLINTH_Z], [cx - g, cy + g, PLINTH_Z]]));
  return { parts, shadow, link: path([from, to]), point: project(to), ground: project([cx, cy, PLINTH_Z]) };
}

// Positions were chosen by measuring clock position, copy, label, and edge
// clearance, mutual spacing, and link routing (no link crosses a label, a
// Workstation, the record, or another organization).
const otherOrganizations = {
  nine: otherOrganization(180, -260, 0.34, LEFT_EDGE),
  ten: otherOrganization(440, -280, 0.26, CORNER),
  eleven: otherOrganization(800, -270, 0.24, CORNER),
};

// Label anchors: the organization at the foundation's front corner, the
// record above its top plate, each layer at its plate's right corner.
const frontCorner: V3 = [FOUND, FOUND, FOUND_Z];
const plateRight = (t: number) => {
  const cs: V3[] = [[PLATE, -PLATE, t], [PLATE, PLATE, t], [-PLATE, PLATE, t], [-PLATE, -PLATE, t]];
  return cs.reduce((a, b) => (project(b)[0] > project(a)[0] ? b : a));
};

// ── View box ─────────────────────────────────────────────────────────────

const bounds = [...pts([
  [-PLINTH, -PLINTH, PLINTH_Z], [PLINTH, -PLINTH, PLINTH_Z], [PLINTH, PLINTH, PLINTH_Z], [-PLINTH, PLINTH, PLINTH_Z],
  [-PLATE, -PLATE, CORE_TOP], [PLATE, PLATE, CORE_TOP], [PLATE, -PLATE, CORE_TOP], [-PLATE, PLATE, CORE_TOP],
])];
const PAD_X = 30, PAD_TOP = 46, PAD_BOTTOM = 40;
const minX = Math.min(...bounds.map((p) => p[0])) - PAD_X;
const maxX = Math.max(...bounds.map((p) => p[0])) + PAD_X;
const minY = Math.min(...bounds.map((p) => p[1])) - PAD_TOP;
const maxY = Math.max(...bounds.map((p) => p[1])) + PAD_BOTTOM;
const W = maxX - minX, H = maxY - minY;

/** A projected point as percentages of the view box, for HTML labels. */
const pct = ([x, y]: V2) => ({ left: `${r1(((x - minX) / W) * 100)}%`, top: `${r1(((y - minY) / H) * 100)}%` });

export const MODEL = {
  viewBox: `${r1(minX)} ${r1(minY)} ${r1(W)} ${r1(H)}`,
  /** The view box's left edge: the copy column ends just beyond it. */
  left: r1(minX),
  aspect: `${r1(W)} / ${r1(H)}`,
  floor,
  plinth,
  foundation,
  grid,
  inlay,
  recordShadow: footprint(6, -4, PLATE + 6),
  recordParts,
  strata,
  // Painted back to front.
  modulesBehind: modules.filter((m) => m.depth > recordDepth).sort((a, b) => b.depth - a.depth),
  modulesFront: modules.filter((m) => m.depth <= recordDepth).sort((a, b) => b.depth - a.depth),
  modules,
  otherOrganizations,
  light: project([0, 0, 40]),
  ground: project([0, 0, 0]),
  labels: {
    organization: pct(project(frontCorner)),
    record: pct(project([0, 0, CORE_TOP + 4])),
    layers: PLATES.map(([b, t]) => pct(project(plateRight((b + t) / 2)))),
    modules: modules.map((m) => {
      const wide = pct(m.label), compact = pct(m.labelCompact);
      return { slug: m.slug, side: m.side, wide, compact };
    }),
  },
};

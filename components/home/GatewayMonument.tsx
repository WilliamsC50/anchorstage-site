import fs from "node:fs";
import path from "node:path";
import { ANCHOR_BACKING_D } from "./anchorBacking";
import { SignalWave } from "./SoundGeometry";

/**
 * Scene 6 backdrop: the AnchorStage Ops anchor as a dark-metal monument in
 * a vast, lit architectural space.
 *
 * The monument is the brand artwork itself, not a redrawing: the anchor's
 * paths are read at build time from public/logos/aso-picture-logo.svg (the
 * authoritative asset, also used by the header), keeping every shape and
 * proportion. Only the materials change: the logo's three tones and its
 * white map to four tones of dark metal, so the brand's own shading becomes
 * the monument's facets. ANCHOR_BACKING_D fills the logo's interior white so
 * it reads as one solid object.
 *
 * The logo's white is its negative space, and inside the shank it forms a
 * hidden figure: a torso under the stock and two legs whose feet run along
 * the seam above the arms. It renders as the brightest, coolest metal over
 * its whole height, so the legs stay distinct from the plates beside them.
 *
 * Lighting: one broad electric-blue light behind and right of the monument
 * reveals its edges, the gateway architecture, and the haze; a small warm
 * light low on the horizon to the left is answered by an orange reflection
 * on the lower left of the crown only. Depth: offset copies form the
 * monument's thickness, each plate is edge-lit and casts onto the layer
 * beneath, and a faint reflection grounds it on the horizon.
 *
 * Layers, back to front: sky, architecture (gateway slabs, converging
 * structural lines, light shafts), far ridge, ground and reflection, horizon
 * contours, far and mid light traces, the monument, base haze, near light
 * traces. The architecture and its traces share one box sized from the
 * monument, so the composition holds at every viewport. The monument is
 * static; the traces and contours move with transform and opacity only and
 * stop under reduced motion. Server-rendered, decorative, and never takes
 * the pointer.
 */

interface LogoPath {
  tone: "dark" | "mid" | "light";
  d: string;
}

const TONE: Record<string, LogoPath["tone"]> = { "cls-3": "dark", "cls-1": "mid", "cls-2": "light" };

/** The anchor group of the brand SVG (the second <g>; the first is the waves). */
function readAnchor(): LogoPath[] {
  const svg = fs.readFileSync(path.join(process.cwd(), "public/logos/aso-picture-logo.svg"), "utf8");
  const groups = [...svg.matchAll(/<g>([\s\S]*?)<\/g>/g)].map((m) => m[1]);
  const anchor = groups[1] ?? "";
  const paths = [...anchor.matchAll(/<path class="(cls-\d)" d="([^"]+)"\s*\/>/g)].map((m) => ({
    tone: TONE[m[1]],
    d: m[2],
  }));
  if (groups.length !== 2 || paths.length === 0 || paths.some((p) => !p.tone)) {
    throw new Error("aso-picture-logo.svg no longer has the expected structure (waves group, anchor group).");
  }
  return paths;
}

const join = (paths: LogoPath[], tone: LogoPath["tone"]) =>
  paths
    .filter((p) => p.tone === tone)
    .map((p) => p.d)
    .join("");

/** Thickness: copies of the silhouette stepping back to the lower left. */
const DEPTH = Array.from({ length: 9 }, (_, i) => 9 - i);

/* ── Architecture ─────────────────────────────────────────────────────────
   One coordinate space, 2200 x 1000, for the architecture SVG and its light
   traces: the vanishing point is the monument's base (1100, 1000) on the
   horizon, and the monument fills x 835-1365, y 375-1000 of it. */
type Pt = readonly [number, number];
const VP: Pt = [1100, 1000];
const LIGHT: Pt = [1180, 640];

/** Gateway slabs flanking the monument, leaning inward toward the top as
 *  tall structures do seen from below; each passes partly behind the
 *  anchor's arms, for depth. Inner edges catch the backlight. The left side
 *  stays light: the copy is there on desktop. */
const SLABS: { face: string; inner: [Pt, Pt]; strength: number }[] = [
  { face: "760,1000 860,1000 960,0 870,0", inner: [[860, 1000], [960, 0]], strength: 0.42 },
  { face: "1400,1000 1520,1000 1420,0 1300,0", inner: [[1400, 1000], [1300, 0]], strength: 0.95 },
];
const FAR_SLABS = ["1640,1000 1700,1000 1640,0 1580,0", "1880,1000 1950,1000 1930,0 1860,0"];

/** Structural lines converging on the monument's base, from the right. */
const LINES: Pt[] = [[2080, 0], [2200, 360], [2200, 700]];

/** Light shafts from the backlight, up through the haze. */
const RAYS = ["820,0 980,0", "1300,0 1440,0", "1620,0 1780,0"];

/** Slab cross-members: short structural edges across each slab. */
const slabEdgeAt = (face: string, y: number) => {
  const p = face.split(" ").map((s) => s.split(",").map(Number));
  const t = 1 - y / 1000;
  const left = p[0][0] + (p[3][0] - p[0][0]) * t;
  const right = p[1][0] + (p[2][0] - p[1][0]) * t;
  return `M${left.toFixed(1)} ${y}H${right.toFixed(1)}`;
};

/** A light trace riding a straight rail, in architecture units. */
const rail = (from: Pt, to: Pt) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  return {
    left: `${((from[0] / 2200) * 100).toFixed(3)}%`,
    top: `${((from[1] / 1000) * 100).toFixed(3)}%`,
    width: `${((Math.hypot(dx, dy) / 2200) * 100).toFixed(3)}%`,
    transform: `rotate(${((Math.atan2(dy, dx) * 180) / Math.PI).toFixed(2)}deg)`,
  };
};

const TRACES: { id: string; from: Pt; to: Pt }[] = [
  // Far: along the converging lines toward the monument.
  { id: "f1", from: [2200, 360], to: [1420, 814] },
  { id: "f2", from: [1727, 360], to: [1430, 663] },
  // Mid: rising along the lit inner edges of the gateway slabs.
  { id: "m1", from: [1400, 1000], to: [1300, 0] },
  { id: "m2", from: [860, 1000], to: [960, 0] },
];

export default function GatewayMonument() {
  const anchor = readAnchor();
  const dark = join(anchor, "dark");
  const mid = join(anchor, "mid");
  const light = join(anchor, "light");

  return (
    <div aria-hidden="true" className="gw-env">
      <div className="gw-sky" />

      {/* Architecture: the gateway around the monument, lit from behind it. */}
      <svg className="gw-arch" viewBox="0 0 2200 1000" preserveAspectRatio="xMidYMax meet" focusable="false">
        <defs>
          <radialGradient id="gw-backlight" gradientUnits="userSpaceOnUse" cx={LIGHT[0]} cy={LIGHT[1]} r="760">
            <stop offset="0" stopColor="#4ea8ff" stopOpacity="0.34" />
            <stop offset="0.32" stopColor="#4ea8ff" stopOpacity="0.14" />
            <stop offset="0.7" stopColor="#4ea8ff" stopOpacity="0.03" />
            <stop offset="1" stopColor="#4ea8ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gw-ray" gradientUnits="userSpaceOnUse" x1="0" y1={LIGHT[1]} x2="0" y2="0">
            <stop offset="0" stopColor="#96d7ff" stopOpacity="0.06" />
            <stop offset="1" stopColor="#96d7ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gw-face" gradientUnits="userSpaceOnUse" x1="0" y1="1000" x2="0" y2="0">
            <stop offset="0" stopColor="#123158" stopOpacity="0.7" />
            <stop offset="0.45" stopColor="#0a1d33" stopOpacity="0.45" />
            <stop offset="1" stopColor="#071425" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gw-edge" gradientUnits="userSpaceOnUse" x1="0" y1="1000" x2="0" y2="0">
            <stop offset="0" stopColor="#4ea8ff" stopOpacity="0.85" />
            <stop offset="0.45" stopColor="#4ea8ff" stopOpacity="0.32" />
            <stop offset="1" stopColor="#4ea8ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gw-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1000">
            <stop offset="0" stopColor="#7fd3f4" stopOpacity="0.05" />
            <stop offset="1" stopColor="#7fd3f4" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <ellipse cx={LIGHT[0]} cy={LIGHT[1]} rx="900" ry="640" fill="url(#gw-backlight)" />
        {RAYS.map((r) => (
          <polygon key={r} points={`${LIGHT[0]},${LIGHT[1]} ${r}`} fill="url(#gw-ray)" />
        ))}
        <g fill="none" stroke="url(#gw-line)" strokeWidth="1.4">
          {LINES.map(([x, y]) => (
            <path key={`${x}-${y}`} d={`M${x} ${y}L${VP[0]} ${VP[1]}`} />
          ))}
        </g>
        {FAR_SLABS.map((f) => (
          <polygon key={f} points={f} fill="url(#gw-face)" opacity="0.5" />
        ))}
        {SLABS.map((s) => (
          <g key={s.face}>
            <polygon points={s.face} fill="url(#gw-face)" />
            <path
              d={[260, 520, 760].map((y) => slabEdgeAt(s.face, y)).join("")}
              stroke="#7fd3f4"
              strokeOpacity="0.08"
              strokeWidth="1.4"
            />
            <path
              d={`M${s.inner[0][0]} ${s.inner[0][1]}L${s.inner[1][0]} ${s.inner[1][1]}`}
              stroke="url(#gw-edge)"
              strokeWidth="2.2"
              opacity={s.strength}
            />
          </g>
        ))}
      </svg>

      {/* Far and mid light traces: on the architecture's own rails. */}
      <div className="gw-trace-box">
        {TRACES.map((t) => (
          <span key={t.id} className={`gw-trace gw-trace-${t.id}`} style={rail(t.from, t.to)}>
            <span className="gw-run">
              <i />
            </span>
          </span>
        ))}
      </div>

      {/* A low, distant ridge with a few far lights. */}
      <svg className="gw-far" viewBox="0 0 1600 40" preserveAspectRatio="none" focusable="false">
        <path
          d="M0 40V30L120 26L260 31L380 22L520 27L640 24L760 30L900 21L1040 26L1180 23L1300 29L1440 24L1600 28V40Z"
          fill="#030a14"
        />
        {[
          [214, 30, "#ffb070"],
          [468, 26, "#9fd6ff"],
          [602, 25, "#ffb070"],
          [1012, 25, "#ffb070"],
          [1236, 25, "#9fd6ff"],
          [1388, 26, "#ffb070"],
        ].map(([x, y, c]) => (
          <circle key={x} cx={x} cy={y} r="1.6" fill={c as string} opacity="0.55" />
        ))}
      </svg>
      <div className="gw-ground" />

      {/* The monument's faint reflection on the ground below the horizon. */}
      <svg className="gw-reflect" viewBox="160 36 450 530" preserveAspectRatio="xMidYMax meet" focusable="false">
        <defs>
          <linearGradient id="gw-reflect-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a1d33" />
            <stop offset="1" stopColor="#1a4a80" />
          </linearGradient>
        </defs>
        <use href="#gw-solid" fill="url(#gw-reflect-g)" />
      </svg>

      {/* Horizon contours: the scene seam's signal traces, drifting slowly. */}
      <div className="gw-contours">
        <SignalWave seed={613} traces={2} amplitude={0.34} className="home-wave-drift gw-drift" />
        <SignalWave seed={641} traces={1} amplitude={0.5} className="home-wave-drift gw-drift-slow" />
      </div>

      <div className="gw-monument">
        <svg viewBox="160 36 450 530" preserveAspectRatio="xMidYMax meet" focusable="false">
          <defs>
            {/* The logo's own colours as painted metal, each lit toward the
                backlight (upper right) and shaded away from it (lower left)
                around the brand value at its middle stop:
                  cls-3 #06264c dark navy    -> gw-iron  (structure, shadow)
                  cls-1 #275a87 medium blue  -> gw-steel
                  cls-2 #5fa9c8 light blue   -> gw-plate
                  white (negative space)     -> gw-polish, cool white
                so the logo's three-tone hierarchy and its bright hidden
                figure read through the lighting. */}
            <linearGradient id="gw-iron" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#09305e" />
              <stop offset="0.4" stopColor="#06264c" />
              <stop offset="1" stopColor="#02132b" />
            </linearGradient>
            <linearGradient id="gw-steel" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3271a6" />
              <stop offset="0.45" stopColor="#275a87" />
              <stop offset="1" stopColor="#1c4569" />
            </linearGradient>
            <linearGradient id="gw-plate" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7cc3df" />
              <stop offset="0.45" stopColor="#5fa9c8" />
              <stop offset="1" stopColor="#4689a9" />
            </linearGradient>
            <linearGradient id="gw-polish" gradientUnits="userSpaceOnUse" x1="470" y1="120" x2="300" y2="480">
              <stop offset="0" stopColor="#f0f7fc" />
              <stop offset="0.5" stopColor="#d6e7f2" />
              <stop offset="1" stopColor="#b5cde0" />
            </linearGradient>
            {/* Light across the metal: the backlight's pool on the upper
                right, a soft directional band, blue bounce from the horizon,
                deeper shadow low in the crown, and the warm horizon light's
                tint on the lower left. */}
            <radialGradient id="gw-pool" gradientUnits="userSpaceOnUse" cx="540" cy="190" r="270">
              <stop offset="0" stopColor="#4ea8ff" stopOpacity="0.2" />
              <stop offset="1" stopColor="#4ea8ff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="gw-sheen" gradientUnits="userSpaceOnUse" x1="560" y1="60" x2="250" y2="520">
              <stop offset="0.2" stopColor="#d6ecff" stopOpacity="0" />
              <stop offset="0.36" stopColor="#d6ecff" stopOpacity="0.12" />
              <stop offset="0.44" stopColor="#d6ecff" stopOpacity="0.035" />
              <stop offset="0.6" stopColor="#d6ecff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gw-bounce" gradientUnits="userSpaceOnUse" x1="0" y1="560" x2="0" y2="330">
              <stop offset="0" stopColor="#4ea8ff" stopOpacity="0.22" />
              <stop offset="1" stopColor="#4ea8ff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="gw-occlude" gradientUnits="userSpaceOnUse" cx="420" cy="560" r="170">
              <stop offset="0" stopColor="#02060d" stopOpacity="0.32" />
              <stop offset="1" stopColor="#02060d" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gw-warm-tint" gradientUnits="userSpaceOnUse" cx="235" cy="470" r="150">
              <stop offset="0" stopColor="#ff7a1a" stopOpacity="0.14" />
              <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gw-warm-zone-g" gradientUnits="userSpaceOnUse" cx="235" cy="470" r="175">
              <stop offset="0" stopColor="#fff" />
              <stop offset="0.55" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="gw-warm-zone" maskUnits="userSpaceOnUse" x="160" y="36" width="450" height="530">
              <rect x="160" y="36" width="450" height="530" fill="url(#gw-warm-zone-g)" />
            </mask>
            <clipPath id="gw-clip">
              <use href="#gw-back" />
              <use href="#gw-dark" />
              <use href="#gw-mid" />
              <use href="#gw-light" />
            </clipPath>
            {/* Each plate: a cool lit upper-right edge, blue reflected
                light on its lower-left edge, and a short shadow cast onto
                the layer beneath, so the pieces separate structurally. */}
            <filter id="gw-bevel" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="sblur" />
              <feOffset in="sblur" dx="-1.3" dy="1.6" result="soff" />
              <feFlood floodColor="#01040a" floodOpacity="0.62" />
              <feComposite in2="soff" operator="in" result="shadow" />
              <feOffset in="SourceAlpha" dx="-0.9" dy="0.9" result="lshift" />
              <feComposite in="SourceAlpha" in2="lshift" operator="out" result="ledge" />
              <feFlood floodColor="#d6ecff" floodOpacity="0.34" />
              <feComposite in2="ledge" operator="in" result="lit" />
              <feOffset in="SourceAlpha" dx="0.9" dy="-0.9" result="bshift" />
              <feComposite in="SourceAlpha" in2="bshift" operator="out" result="bedge" />
              <feFlood floodColor="#4ea8ff" floodOpacity="0.3" />
              <feComposite in2="bedge" operator="in" result="bounce" />
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="lit" />
                <feMergeNode in="bounce" />
              </feMerge>
            </filter>
            {/* Warm edge: the silhouette's lower-left edges in ASO orange,
                shown only inside the warm zone (lower left of the crown). */}
            <filter id="gw-warm-edge" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
              <feOffset in="SourceAlpha" dx="1.5" dy="-1.1" result="wshift" />
              <feComposite in="SourceAlpha" in2="wshift" operator="out" result="wedge" />
              <feFlood floodColor="#ff7a1a" floodOpacity="0.85" />
              <feComposite in2="wedge" operator="in" result="warm" />
              <feGaussianBlur in="warm" stdDeviation="2" result="wglow" />
              <feComponentTransfer in="wglow" result="wglowSoft">
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="wglowSoft" />
                <feMergeNode in="warm" />
              </feMerge>
            </filter>
            {/* The base dissolves into the horizon haze, below the figure's
                feet so the legs keep their full contrast. */}
            <linearGradient id="gw-fade-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" />
              <stop offset="0.82" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.3" />
            </linearGradient>
            <mask id="gw-fade" maskUnits="userSpaceOnUse" x="160" y="36" width="450" height="530">
              <rect x="160" y="36" width="450" height="530" fill="url(#gw-fade-g)" />
            </mask>
            {/* Rim light from the backlight, upper right: a hard electric
                blue key edge, its falloff into the form, a faint bloom, and
                a deep blue fill edge on the left. Selective by direction:
                only the edges facing the light are lit. */}
            <filter id="gw-rim" x="-8%" y="-6%" width="116%" height="112%" colorInterpolationFilters="sRGB">
              <feOffset in="SourceAlpha" dx="-1.6" dy="1.2" result="kshift" />
              <feComposite in="SourceAlpha" in2="kshift" operator="out" result="kedge" />
              <feFlood floodColor="#6cbcff" floodOpacity="0.92" />
              <feComposite in2="kedge" operator="in" result="key" />
              <feGaussianBlur in="key" stdDeviation="2.4" result="bloom" />
              <feComponentTransfer in="bloom" result="bloomSoft">
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feGaussianBlur in="key" stdDeviation="9" result="kspread" />
              <feComposite in="kspread" in2="SourceAlpha" operator="in" result="kinner" />
              <feComponentTransfer in="kinner" result="form">
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feOffset in="SourceAlpha" dx="1.2" dy="0" result="fshift" />
              <feComposite in="SourceAlpha" in2="fshift" operator="out" result="fedge" />
              <feFlood floodColor="#1d4f8f" floodOpacity="0.5" />
              <feComposite in2="fedge" operator="in" result="fill" />
              <feMerge>
                <feMergeNode in="bloomSoft" />
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="form" />
                <feMergeNode in="fill" />
                <feMergeNode in="key" />
              </feMerge>
            </filter>
            {/* Geometry, inlined once: the backing and the logo's three
                tones. Thickness, face, reflection, and warm edge reuse it. */}
            <path id="gw-back" d={ANCHOR_BACKING_D} />
            <path id="gw-dark" d={dark} />
            <path id="gw-mid" d={mid} />
            <path id="gw-light" d={light} />
            <g id="gw-solid">
              <use href="#gw-back" />
              <use href="#gw-dark" />
              <use href="#gw-mid" />
              <use href="#gw-light" />
            </g>
          </defs>

          <g mask="url(#gw-fade)">
            <g filter="url(#gw-rim)">
              {/* Body thickness, darkening as it steps back. */}
              {DEPTH.map((i) => (
                <use
                  key={i}
                  href="#gw-solid"
                  transform={`translate(${(-0.95 * i).toFixed(2)} ${(0.55 * i).toFixed(2)})`}
                  fill={i > 6 ? "#020c1c" : i > 3 ? "#03122a" : "#051a38"}
                />
              ))}
              {/* Face: the brand artwork in metal. The logo's white first
                  (the backing, including the hidden figure), then its tones
                  in their own order, each plate lit and casting onto the
                  layer beneath. */}
              <use href="#gw-back" fill="url(#gw-polish)" />
              <use href="#gw-dark" fill="url(#gw-iron)" filter="url(#gw-bevel)" />
              <use href="#gw-mid" fill="url(#gw-steel)" filter="url(#gw-bevel)" />
              <use href="#gw-light" fill="url(#gw-plate)" filter="url(#gw-bevel)" />
              <g clipPath="url(#gw-clip)">
                <rect x="160" y="36" width="450" height="530" fill="url(#gw-pool)" />
                <rect x="160" y="36" width="450" height="530" fill="url(#gw-sheen)" />
                <rect x="160" y="36" width="450" height="530" fill="url(#gw-bounce)" />
                <rect x="160" y="36" width="450" height="530" fill="url(#gw-occlude)" />
                <rect x="160" y="36" width="450" height="530" fill="url(#gw-warm-tint)" />
              </g>
            </g>
            <g mask="url(#gw-warm-zone)">
              <use href="#gw-solid" fill="#000" filter="url(#gw-warm-edge)" />
            </g>
          </g>
        </svg>
      </div>

      <div className="gw-haze" />

      {/* Near light traces: across the ground in front, faster and brighter
          than the far ones (parallax); one is warm. */}
      <div className="gw-near">
        <span className="gw-trace gw-trace-n1">
          <span className="gw-run">
            <i />
          </span>
        </span>
        <span className="gw-trace gw-trace-n2">
          <span className="gw-run">
            <i />
          </span>
        </span>
      </div>
    </div>
  );
}

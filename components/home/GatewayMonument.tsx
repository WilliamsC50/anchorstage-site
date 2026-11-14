import fs from "node:fs";
import path from "node:path";
import { ANCHOR_BACKING_D } from "./anchorBacking";

/**
 * Scene 6 backdrop: the AnchorStage Ops anchor as a dark-metal monument
 * rising from a hazy horizon.
 *
 * The monument is the brand artwork itself, not a redrawing: the anchor's
 * paths are read at build time from public/logos/aso-picture-logo.svg (the
 * authoritative asset, also used by the header), keeping every shape and
 * proportion. Only the materials change: the logo's three tones and its
 * white highlights map to four tones of dark metal, so the brand's own
 * shading becomes the monument's facets and reflections. ANCHOR_BACKING_D
 * fills the logo's interior white regions so it reads as one solid object.
 *
 * Depth: stacked offset copies of the silhouette form its thickness, an SVG
 * filter adds a restrained blue rim from the upper right, and the base fades
 * into the horizon haze. Everything is static (no animation, no pointer
 * tracking), server-rendered, decorative, and never takes the pointer.
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

export default function GatewayMonument() {
  const anchor = readAnchor();
  const dark = join(anchor, "dark");
  const mid = join(anchor, "mid");
  const light = join(anchor, "light");

  return (
    <div aria-hidden="true" className="gw-env">
      <div className="gw-sky" />
      {/* A low, distant ridge with a few far lights: scale for the
          monument and the scene's one warm accent. */}
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

      <div className="gw-monument">
        <svg viewBox="160 36 450 530" preserveAspectRatio="xMidYMax meet" focusable="false">
          <defs>
            {/* Dark metal: the logo's tones, darkest to brightest. */}
            <linearGradient id="gw-iron" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0b1522" />
              <stop offset="1" stopColor="#04080e" />
            </linearGradient>
            <linearGradient id="gw-steel" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1f3550" />
              <stop offset="1" stopColor="#0c1622" />
            </linearGradient>
            <linearGradient id="gw-plate" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2e4b6c" />
              <stop offset="0.6" stopColor="#1a2c42" />
              <stop offset="1" stopColor="#101c2b" />
            </linearGradient>
            <linearGradient id="gw-polish" x1="1" y1="0" x2="0.2" y2="1">
              <stop offset="0" stopColor="#4d7499" />
              <stop offset="0.45" stopColor="#253c56" />
              <stop offset="1" stopColor="#0f1a28" />
            </linearGradient>
            {/* The base dissolves into the horizon haze. */}
            <linearGradient id="gw-fade-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" />
              <stop offset="0.72" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.28" />
            </linearGradient>
            <mask id="gw-fade" maskUnits="userSpaceOnUse" x="160" y="36" width="450" height="530">
              <rect x="160" y="36" width="450" height="530" fill="url(#gw-fade-g)" />
            </mask>
            {/* Rim light from the upper right: a hard key edge, its falloff
                into the form, a faint bloom, and a cool fill edge on the
                left. Offsets are in logo units (about 2 px on screen). */}
            <filter id="gw-rim" x="-8%" y="-6%" width="116%" height="112%" colorInterpolationFilters="sRGB">
              <feOffset in="SourceAlpha" dx="-1.6" dy="1.2" result="kshift" />
              <feComposite in="SourceAlpha" in2="kshift" operator="out" result="kedge" />
              <feFlood floodColor="#9fd6ff" floodOpacity="0.85" />
              <feComposite in2="kedge" operator="in" result="key" />
              <feGaussianBlur in="key" stdDeviation="2.4" result="bloom" />
              <feComponentTransfer in="bloom" result="bloomSoft">
                <feFuncA type="linear" slope="0.55" />
              </feComponentTransfer>
              <feGaussianBlur in="key" stdDeviation="9" result="kspread" />
              <feComposite in="kspread" in2="SourceAlpha" operator="in" result="kinner" />
              <feComponentTransfer in="kinner" result="form">
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feOffset in="SourceAlpha" dx="1.2" dy="0" result="fshift" />
              <feComposite in="SourceAlpha" in2="fshift" operator="out" result="fedge" />
              <feFlood floodColor="#2f6aa3" floodOpacity="0.45" />
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
                tones. The thickness copies and the face both reuse it. */}
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
                  fill={i > 6 ? "#020509" : i > 3 ? "#04080e" : "#060c15"}
                />
              ))}
              {/* Face: the brand artwork in metal. White highlights first
                  (the backing), then the logo's tones in their own order. */}
              <use href="#gw-back" fill="url(#gw-polish)" />
              <use href="#gw-dark" fill="url(#gw-iron)" />
              <use href="#gw-mid" fill="url(#gw-steel)" />
              <use href="#gw-light" fill="url(#gw-plate)" />
            </g>
          </g>
        </svg>
      </div>

      <div className="gw-haze" />
    </div>
  );
}

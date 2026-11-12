/**
 * Procedural sound and signal geometry for the homepage scenes.
 *
 * Shapes are generated from a seeded PRNG at render time on the server, so
 * markup is deterministic (no hydration drift) and each scene can carry its
 * own variation without shipping image assets. Everything here is decorative
 * and rendered aria-hidden by its callers.
 */

import type { CSSProperties } from "react";

/** mulberry32: small, fast, deterministic. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (v: number) => Math.round(v * 10) / 10;

interface Ring {
  r: number;
  dash: string;
  offset: number;
  opacity: number;
  width: number;
}

interface Tick {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  major: boolean;
}

const RING_VIEW = 1000;
const RING_C = RING_VIEW / 2;

/**
 * Ring and scale geometry for one seed, in a 1000-unit view box centred on
 * its middle. Shared by SoundRings (static) and SignalRings (animated), so a
 * scene keeps the same rings whichever it uses.
 */
function ringGeometry(seed: number) {
  const rand = seeded(seed);
  const c = RING_C;

  const rings: Ring[] = [];
  for (let r = 70; r < c; r += 26 + Math.floor(rand() * 22)) {
    const style = rand();
    const dash =
      style < 0.35
        ? `${1 + Math.floor(rand() * 2)} ${5 + Math.floor(rand() * 6)}`
        : style < 0.7
          ? `${10 + Math.floor(rand() * 30)} ${6 + Math.floor(rand() * 14)}`
          : "none";
    rings.push({
      r,
      dash,
      offset: Math.floor(rand() * 60),
      opacity: round(0.5 * (1 - r / c) + 0.06),
      width: style >= 0.7 ? 1 : 1.25,
    });
  }

  // Scale ticks across the visible quadrant (pointing down-left from the
  // source): long every 30 degrees, short every 5.
  const ticks: Tick[] = [];
  const tickR = 300;
  for (let deg = 90; deg <= 180; deg += 5) {
    const major = deg % 30 === 0;
    const a = (deg * Math.PI) / 180;
    const r2 = tickR + (major ? 26 : 10);
    ticks.push({
      x1: round(c + Math.cos(a) * tickR),
      y1: round(c + Math.sin(a) * tickR),
      x2: round(c + Math.cos(a) * r2),
      y2: round(c + Math.sin(a) * r2),
      major,
    });
  }

  return { rings, ticks };
}

const ringCircle = (ring: Ring, opacityScale = 1) => (
  <circle
    key={ring.r}
    cx={RING_C}
    cy={RING_C}
    r={ring.r}
    strokeWidth={ring.width}
    strokeOpacity={opacityScale === 1 ? ring.opacity : Math.min(1, Math.round(ring.opacity * opacityScale * 100) / 100)}
    strokeDasharray={ring.dash === "none" ? undefined : ring.dash}
    strokeDashoffset={ring.offset}
  />
);

const tickLine = (t: Tick) => (
  <line
    key={`${t.x1}-${t.y1}`}
    x1={t.x1}
    y1={t.y1}
    x2={t.x2}
    y2={t.y2}
    strokeWidth={t.major ? 1.5 : 1}
    strokeOpacity={t.major ? 0.55 : 0.28}
  />
);

// The source itself: a lit point at the centre.
const ringSource = (
  <>
    <circle cx={RING_C} cy={RING_C} r="5" fill="rgb(150, 215, 255)" fillOpacity="0.8" />
    <circle cx={RING_C} cy={RING_C} r="16" stroke="rgb(150, 215, 255)" strokeOpacity="0.4" />
  </>
);

/**
 * Concentric dispersion rings with a protractor scale, centred on the SVG's
 * middle. Callers place that centre on a scene's upper-right corner, so the
 * visible quadrant fans down and to the left like sound leaving a source.
 */
export function SoundRings({ seed, className = "" }: { seed: number; className?: string }) {
  const { rings, ticks } = ringGeometry(seed);
  return (
    <svg viewBox={`0 0 ${RING_VIEW} ${RING_VIEW}`} fill="none" className={className}>
      <g stroke="rgb(127, 211, 244)">
        {rings.map((ring) => ringCircle(ring))}
        {ticks.map(tickLine)}
      </g>
      {ringSource}
    </svg>
  );
}

// Signal rings: the same rings split across three independently rotating
// layers, each in its own blue, with one brighter arc that sweeps with it.
const LAYER_TONES = ["rgb(150, 215, 255)", "rgb(78, 168, 255)", "rgb(127, 211, 244)"];
const LAYER_ARC_DEG = [38, 52, 30];

// Pulses: target radius (view units, snapped to the nearest ring), direction,
// orbit and fade periods (s, chosen not to divide one another so passes never
// line up the same way twice), phase delay (s), and the resting angle shown
// when motion is reduced (inside the visible quadrant, 90-180 deg).
const PULSES = [
  { target: 190, dir: 1, spin: 23, fade: 37, delay: -3, rest: 122 },
  { target: 290, dir: -1, spin: 31, fade: 43, delay: -17, rest: 151 },
  { target: 370, dir: 1, spin: 41, fade: 29, delay: -9, rest: 104 },
  { target: 440, dir: -1, spin: 53, fade: 47, delay: -26, rest: 166 },
];

/**
 * Animated version of SoundRings for a featured scene. Layers, back to front:
 *
 *   ring layers   three SVGs, each holding every third ring plus a highlight
 *                 arc; they rotate independently in alternating directions
 *   scale         ticks and the source point, fixed as the frame of reference
 *   pulses        small comets (head plus a fading tail of dots) orbiting
 *                 chosen rings; each is visible only while it crosses the
 *                 visible quadrant, and fades on its own period
 *
 * Motion is CSS only (home.css, .home-signal-rings): transforms and opacity,
 * so it runs on the compositor. Each pulse is a zero-size rotating element,
 * so its layer is only as large as its few dots. With reduced motion the
 * composition is static: the rings rest as generated and each pulse rests
 * inside the visible quadrant.
 */
export function SignalRings({ seed }: { seed: number }) {
  const { rings, ticks } = ringGeometry(seed);
  const layers = [0, 1, 2].map((k) => rings.filter((_, i) => i % 3 === k));
  const pulses = PULSES.map((p) => {
    const ring = rings.reduce((best, r) => (Math.abs(r.r - p.target) < Math.abs(best.r - p.target) ? r : best));
    return { ...p, radius: ring.r / RING_VIEW };
  });

  return (
    <>
      {layers.map((layer, k) => {
        // Highlight arc on the layer's middle ring.
        const lit = layer[Math.floor(layer.length / 2)];
        const circumference = 2 * Math.PI * lit.r;
        const arc = (circumference * LAYER_ARC_DEG[k]) / 360;
        return (
          <svg
            key={k}
            viewBox={`0 0 ${RING_VIEW} ${RING_VIEW}`}
            fill="none"
            className={`sr-layer sr-layer-${k}`}
          >
            <g stroke={LAYER_TONES[k]}>
              {layer.map((ring) => ringCircle(ring, 1.35))}
              <circle
                cx={RING_C}
                cy={RING_C}
                r={lit.r}
                strokeWidth={2}
                strokeOpacity={0.5}
                strokeLinecap="round"
                strokeDasharray={`${round(arc)} ${round(circumference - arc)}`}
                strokeDashoffset={round(-circumference * (0.3 + k * 0.08))}
              />
            </g>
          </svg>
        );
      })}
      <svg viewBox={`0 0 ${RING_VIEW} ${RING_VIEW}`} fill="none" className="sr-scale">
        <g stroke="rgb(127, 211, 244)">{ticks.map(tickLine)}</g>
        {ringSource}
      </svg>
      {pulses.map((p, i) => (
        <div
          key={i}
          className={`sr-pulse sr-pulse-${i}`}
          style={
            {
              "--r": p.radius,
              "--dir": p.dir,
              "--rest": `${p.rest}deg`,
              "--spin": `${p.spin}s`,
              "--fade": `${p.fade}s`,
              "--delay": `${p.delay}s`,
            } as CSSProperties
          }
        >
          {[0, 1, 2, 3, 4].map((k) => (
            <span key={k} className="sr-dot" style={{ "--k": k } as CSSProperties} />
          ))}
        </div>
      ))}
    </>
  );
}

/**
 * Layered signal traces. Each trace is a sum of sines with whole-number cycle
 * counts across one period, drawn over two periods so a -50% translate loops
 * seamlessly. The SVG stretches to its box (preserveAspectRatio none).
 */
export function SignalWave({
  seed,
  traces = 3,
  amplitude = 0.36,
  className = "",
  stroke = "rgb(127, 211, 244)",
}: {
  seed: number;
  traces?: number;
  amplitude?: number;
  className?: string;
  stroke?: string;
}) {
  const rand = seeded(seed);
  const period = 720;
  const height = 100;
  const mid = height / 2;
  const step = 6;

  const paths: { d: string; opacity: number; width: number }[] = [];
  for (let t = 0; t < traces; t++) {
    const parts = Array.from({ length: 3 }, (_, k) => ({
      cycles: 1 + Math.floor(rand() * (3 + k * 3)),
      phase: rand() * Math.PI * 2,
      amp: (0.55 / (k + 1)) * (0.6 + rand() * 0.6),
    }));
    const norm = parts.reduce((sum, p) => sum + p.amp, 0);
    let d = "";
    for (let x = 0; x <= period * 2; x += step) {
      const u = (x / period) * Math.PI * 2;
      const v = parts.reduce((sum, p) => sum + p.amp * Math.sin(u * p.cycles + p.phase), 0) / norm;
      d += `${x === 0 ? "M" : "L"}${x} ${round(mid + v * mid * amplitude * (1 + t * 0.55))}`;
    }
    paths.push({ d, opacity: round(0.62 - t * 0.16), width: t === 0 ? 1.5 : 1 });
  }

  return (
    <svg
      viewBox={`0 0 ${period * 2} ${height}`}
      preserveAspectRatio="none"
      fill="none"
      className={className}
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke={stroke}
          strokeOpacity={p.opacity}
          strokeWidth={p.width}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

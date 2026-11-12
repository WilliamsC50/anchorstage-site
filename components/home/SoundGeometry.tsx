/**
 * Procedural sound and signal geometry for the homepage scenes.
 *
 * Shapes are generated from a seeded PRNG at render time on the server, so
 * markup is deterministic (no hydration drift) and each scene can carry its
 * own variation without shipping image assets. Everything here is decorative
 * and rendered aria-hidden by its callers.
 */

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

/**
 * Concentric dispersion rings with a protractor scale, centred on the SVG's
 * middle. Callers place that centre on a scene's upper-right corner, so the
 * visible quadrant fans down and to the left like sound leaving a source.
 */
export function SoundRings({ seed, className = "" }: { seed: number; className?: string }) {
  const rand = seeded(seed);
  const size = 1000;
  const c = size / 2;

  const rings: { r: number; dash: string; offset: number; opacity: number; width: number }[] = [];
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
  const ticks: { x1: number; y1: number; x2: number; y2: number; major: boolean }[] = [];
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

  return (
    <svg viewBox={`0 0 ${size} ${size}`} fill="none" className={className}>
      <g stroke="rgb(127, 211, 244)">
        {rings.map((ring) => (
          <circle
            key={ring.r}
            cx={c}
            cy={c}
            r={ring.r}
            strokeWidth={ring.width}
            strokeOpacity={ring.opacity}
            strokeDasharray={ring.dash === "none" ? undefined : ring.dash}
            strokeDashoffset={ring.offset}
          />
        ))}
        {ticks.map((t) => (
          <line
            key={`${t.x1}-${t.y1}`}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            strokeWidth={t.major ? 1.5 : 1}
            strokeOpacity={t.major ? 0.55 : 0.28}
          />
        ))}
      </g>
      {/* The source itself: a lit point at the centre. */}
      <circle cx={c} cy={c} r="5" fill="rgb(150, 215, 255)" fillOpacity="0.8" />
      <circle cx={c} cy={c} r="16" stroke="rgb(150, 215, 255)" strokeOpacity="0.4" />
    </svg>
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

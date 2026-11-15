/**
 * Who It's For: the Freelancer / Technician stage diorama (DESIGN-15A.2,
 * visual proof of concept).
 *
 * A front-facing miniature stage at a front-of-house mixing position: a FOH
 * engineer beside a digital console, road cases and cable runs around them,
 * and a distant concert stage behind. Hand-authored vector artwork, drawn in
 * one shared 960 x 600 space and split into layers so each can be moved
 * independently by the showcase's transitions:
 *
 *   1. background  distant stage, truss, beams, crowd, back wall
 *   2. midstage    floor, console, road cases, rack, cable runs
 *   3. character   the technician (with the moving fader cap they touch)
 *   4. foreground  stage lip with orange LED edge, floor cable coil
 *   (5. lighting   CSS gradients in the showcase, not here)
 *
 * PROOF OF CONCEPT ARTWORK: built by hand in SVG to prove composition,
 * layering, lighting, and motion. Final production art is expected to be
 * commissioned or painted in the same layer structure.
 *
 * All layers are decorative (aria-hidden); the showcase supplies the text.
 * Idle motion is CSS in app/(site)/who-its-for/who.css, off under reduced
 * motion.
 */

/* Framed on the technician: the full 960 x 600 scene, cropped to the stage. */
const VB = "60 75 840 525";

/* ── Helpers ─────────────────────────────────────────────────────────────── */

const r1 = (v: number) => Math.round(v * 10) / 10;

/** Interpolate along a straight edge. */
const lerp = (a: [number, number], b: [number, number], t: number): [number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];

/** A coiled cable between two points, as a wavy polyline. */
const coil = (from: [number, number], to: [number, number], turns: number, amp: number) => {
  const pts: string[] = [];
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const steps = turns * 8;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const off = Math.sin(t * turns * Math.PI * 2) * amp;
    pts.push(`${r1(from[0] + dx * t + nx * off)},${r1(from[1] + dy * t + ny * off)}`);
  }
  return pts.join(" ");
};

/* Console surface: back edge and front edge (perspective quad). */
const CB: [[number, number], [number, number]] = [
  [150, 366],
  [438, 356],
];
const CF: [[number, number], [number, number]] = [
  [134, 414],
  [454, 400],
];

/* ── Layer 1: background ─────────────────────────────────────────────────── */

export function SceneBackground() {
  const beams = [
    { x: 168, to: [120, 312], tw: 70, c: "wf-beam-blue" },
    { x: 236, to: [236, 312], tw: 60, c: "wf-beam-orange" },
    { x: 330, to: [360, 312], tw: 74, c: "wf-beam-blue" },
    { x: 420, to: [420, 312], tw: 60, c: "wf-beam-orange" },
    { x: 500, to: [548, 312], tw: 70, c: "wf-beam-blue" },
  ];
  const heads = Array.from({ length: 34 }, (_, i) => {
    const x = 70 + i * 17 + ((i * 37) % 7);
    const y = 334 + ((i * 53) % 9);
    return { x, y, r: 7 + ((i * 29) % 4) };
  });
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className="ws-layer ws-layer-bg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wf-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#040a15" />
          <stop offset="0.55" stopColor="#0a1a2e" />
          <stop offset="1" stopColor="#0c2038" />
        </linearGradient>
        <radialGradient id="wf-stage-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#4ea8d1" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#1d4f7a" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0a1a2e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wf-beam-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fd8ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#4ea8d1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wf-beam-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc08a" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="960" height="600" fill="url(#wf-wall)" />
      {/* The distant stage: its glow, deck, truss, fixtures, and beams. */}
      <ellipse cx="340" cy="262" rx="300" ry="120" fill="url(#wf-stage-glow)" />
      <rect x="96" y="304" width="488" height="14" rx="2" fill="#0d2136" />
      <rect x="96" y="304" width="488" height="2" fill="#2a5277" opacity="0.8" />
      <g opacity="0.85">
        <rect x="120" y="192" width="440" height="6" fill="#16314d" />
        <path d="M120 192 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6 l8 6 l8-6" fill="none" stroke="#1f4266" strokeWidth="1" />
        <rect x="120" y="198" width="440" height="2" fill="#16314d" />
      </g>
      {beams.map((b, i) => (
        <g key={i}>
          <polygon
            points={`${b.x - 5},202 ${b.x + 5},202 ${b.to[0] + b.tw / 2},${b.to[1]} ${b.to[0] - b.tw / 2},${b.to[1]}`}
            fill={`url(#${b.c})`}
            className="ws-beam"
            style={{ animationDelay: `${-i * 1.3}s` }}
          />
          <rect x={b.x - 6} y="198" width="12" height="8" rx="2" fill="#0b1726" />
          <circle cx={b.x} cy="205" r="2.4" fill={b.c === "wf-beam-orange" ? "#ffb27a" : "#a8dcff"} />
        </g>
      ))}
      {/* Hanging line arrays either side. */}
      {[78, 598].map((x) => (
        <g key={x} fill="#08121f">
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x={x - 2 * i * 0.6} y={200 + i * 15} width={26 + i * 1.2} height="13" rx="2" />
          ))}
        </g>
      ))}
      {/* The crowd, in silhouette. */}
      <g fill="#050b15">
        {heads.map((h, i) => (
          <g key={i}>
            <circle cx={h.x} cy={h.y} r={h.r} />
            <rect x={h.x - h.r - 3} y={h.y + h.r - 2} width={h.r * 2 + 6} height="30" rx="6" />
          </g>
        ))}
        <rect x="40" y="356" width="620" height="40" />
      </g>
      {/* Back of house, right: dim wall and a work light. */}
      <rect x="660" y="120" width="300" height="300" fill="#081628" opacity="0.7" />
      <circle cx="900" cy="150" r="60" fill="#4ea8d1" opacity="0.06" />
    </svg>
  );
}

/* ── Layer 2: midstage ───────────────────────────────────────────────────── */

export function SceneMidstage() {
  // Faders along the console's front edge; knob rows behind them.
  const faders = Array.from({ length: 16 }, (_, i) => {
    const t = 0.06 + i * 0.054 + (i >= 8 ? 0.02 : 0);
    const front = lerp(CF[0], CF[1], t);
    const back = lerp(CB[0], CB[1], t);
    const a = lerp(front, back, 0.12);
    const b = lerp(front, back, 0.42);
    const cap = lerp(a, b, 0.25 + ((i * 7) % 5) * 0.12);
    return { a, b, cap, i };
  });
  const knobs = (row: number) =>
    Array.from({ length: 16 }, (_, i) => {
      const t = 0.06 + i * 0.054 + (i >= 8 ? 0.02 : 0);
      const front = lerp(CF[0], CF[1], t);
      const back = lerp(CB[0], CB[1], t);
      return lerp(front, back, 0.52 + row * 0.1);
    });
  const meters = Array.from({ length: 14 }, (_, i) => ({ x: 240 + i * 7.4, h: 6 + ((i * 41) % 11) }));

  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className="ws-layer ws-layer-mid" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wf-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1d30" />
          <stop offset="1" stopColor="#14283f" />
        </linearGradient>
        <linearGradient id="wf-console" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3442" />
          <stop offset="1" stopColor="#1a222d" />
        </linearGradient>
        <linearGradient id="wf-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f4a75" />
          <stop offset="1" stopColor="#0a2c48" />
        </linearGradient>
        <linearGradient id="wf-case" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1f2c3b" />
          <stop offset="0.7" stopColor="#2c3c4f" />
          <stop offset="1" stopColor="#3a4c61" />
        </linearGradient>
      </defs>

      {/* Floor plane with deck seams. */}
      <path d="M0 440 L960 440 L960 566 L0 566 Z" fill="url(#wf-floor)" />
      {[468, 500, 536].map((y) => (
        <line key={y} x1="0" y1={y} x2="960" y2={y} stroke="#1c3550" strokeWidth="1" opacity="0.6" />
      ))}
      <ellipse cx="500" cy="562" rx="210" ry="18" fill="#000" opacity="0.35" />

      {/* Cable runs across the deck. */}
      <g fill="none" strokeLinecap="round">
        <path d="M300 470 C 360 520, 520 500, 620 532 S 800 520, 900 548" stroke="#070d16" strokeWidth="5" />
        <path d="M300 470 C 360 520, 520 500, 620 532 S 800 520, 900 548" stroke="#2c4560" strokeWidth="1.2" opacity="0.7" />
        <path d="M250 480 C 230 520, 160 530, 60 552" stroke="#070d16" strokeWidth="4" />
        <path d="M250 480 C 230 520, 160 530, 60 552" stroke="#2c4560" strokeWidth="1" opacity="0.6" />
        <path d="M420 470 C 470 470, 560 440, 640 452" stroke="#070d16" strokeWidth="3.5" />
      </g>

      {/* FOH desk: a draped table under the console. */}
      <path d="M140 434 L452 420 L452 470 L140 482 Z" fill="#0b131d" />
      <path d="M140 434 L452 420 L452 424 L140 438 Z" fill="#1d2a38" />
      <rect x="150" y="470" width="8" height="90" fill="#0b131d" />
      <rect x="438" y="462" width="8" height="96" fill="#0b131d" />

      {/* The digital console: surface, front face, screen, faders, knobs. */}
      <path d={`M${CB[0][0]} ${CB[0][1]} L${CB[1][0]} ${CB[1][1]} L${CF[1][0]} ${CF[1][1]} L${CF[0][0]} ${CF[0][1]} Z`} fill="url(#wf-console)" />
      <path d={`M${CF[0][0]} ${CF[0][1]} L${CF[1][0]} ${CF[1][1]} L${CF[1][0]} ${CF[1][1] + 18} L${CF[0][0]} ${CF[0][1] + 20} Z`} fill="#121922" />
      <path d={`M${CF[0][0]} ${CF[0][1]} L${CF[1][0]} ${CF[1][1]}`} stroke="#4b5b6e" strokeWidth="1.2" />
      {/* Overbridge with the touch screen. */}
      <path d="M216 346 L364 340 L368 368 L212 374 Z" fill="#18212c" />
      <path d="M224 349 L356 344 L359 364 L221 369 Z" fill="url(#wf-screen)" />
      <g opacity="0.95">
        {meters.map((m, i) => (
          <rect key={i} x={m.x} y={364 - m.h - 2} width="4" height={m.h} fill={i % 5 === 4 ? "#ffb27a" : "#7fd3f4"} opacity="0.9" />
        ))}
        <path d="M326 357 q4-6 8 0 t8 0 t8 0" fill="none" stroke="#a8dcff" strokeWidth="1" />
      </g>
      {/* Knob rows and LEDs. */}
      {[0, 1, 2].map((row) =>
        knobs(row).map(([x, y], i) => (
          <circle key={`${row}-${i}`} cx={x} cy={y} r={2.1} fill={row === 2 && i % 4 === 0 ? "#ffb27a" : "#7d8a99"} />
        )),
      )}
      {faders.map((f) => (
        <g key={f.i}>
          <line x1={f.a[0]} y1={f.a[1]} x2={f.b[0]} y2={f.b[1]} stroke="#05090e" strokeWidth="2" />
          {f.i !== 15 && <rect x={f.cap[0] - 4} y={f.cap[1] - 2.5} width="8" height="5" rx="1" fill={f.i === 7 ? "#ff7a1a" : "#c9d3de"} />}
          <circle cx={f.a[0]} cy={f.a[1] + 5} r="1.2" fill={f.i % 3 === 0 ? "#3ddc84" : "#4ea8d1"} />
        </g>
      ))}

      {/* Road cases, stage right. */}
      <g>
        <rect x="602" y="430" width="62" height="92" rx="4" fill="#18222e" />
        <rect x="650" y="404" width="152" height="118" rx="5" fill="url(#wf-case)" />
        <rect x="650" y="404" width="152" height="118" rx="5" fill="none" stroke="#8b97a3" strokeWidth="2" opacity="0.6" />
        <line x1="650" y1="452" x2="802" y2="452" stroke="#8b97a3" strokeWidth="2" opacity="0.55" />
        {[
          [650, 404],
          [794, 404],
          [650, 514],
          [794, 514],
        ].map(([x, y], i) => (
          <rect key={i} x={x - 2} y={y - 2} width="12" height="12" rx="2" fill="#aab4bf" />
        ))}
        <rect x="690" y="444" width="16" height="12" rx="2" fill="#aab4bf" />
        <rect x="746" y="444" width="16" height="12" rx="2" fill="#aab4bf" />
        <ellipse cx="726" cy="484" rx="22" ry="9" fill="#141d27" />
        <rect x="712" y="482" width="28" height="4" rx="2" fill="#8b97a3" />
        <rect x="662" y="412" width="30" height="8" rx="1" fill="#ff7a1a" opacity="0.85" />
        <circle cx="664" cy="526" r="5" fill="#0a0f15" />
        <circle cx="788" cy="526" r="5" fill="#0a0f15" />
        {/* Smaller case on top. */}
        <rect x="676" y="346" width="104" height="58" rx="4" fill="url(#wf-case)" />
        <rect x="676" y="346" width="104" height="58" rx="4" fill="none" stroke="#8b97a3" strokeWidth="1.6" opacity="0.6" />
        <rect x="716" y="368" width="24" height="5" rx="2" fill="#8b97a3" />
      </g>

      {/* Amp rack with status LEDs. */}
      <g>
        <rect x="820" y="372" width="74" height="150" rx="4" fill="#111a24" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="826" y={380 + i * 27} width="62" height="22" rx="2" fill="#1b2633" />
            <circle cx="834" cy={391 + i * 27} r="1.8" fill={i === 1 ? "#ffb27a" : "#3ddc84"} />
            <rect x="842" y={389 + i * 27} width="38" height="3" rx="1" fill="#2c3b4c" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── Layer 3: the technician ─────────────────────────────────────────────── */

const CABLE = coil([531, 222], [550, 392], 16, 3.2);

export function SceneCharacter() {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className="ws-layer ws-layer-char" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wf-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7d5039" />
          <stop offset="0.55" stopColor="#a8714f" />
          <stop offset="1" stopColor="#c68d66" />
        </linearGradient>
        <linearGradient id="wf-shirt" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#161d29" />
          <stop offset="0.5" stopColor="#252f3f" />
          <stop offset="1" stopColor="#36435a" />
        </linearGradient>
        <linearGradient id="wf-pants" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1d241f" />
          <stop offset="0.55" stopColor="#2f3a31" />
          <stop offset="1" stopColor="#43503f" />
        </linearGradient>
        <linearGradient id="wf-boot" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#101318" />
          <stop offset="1" stopColor="#2a2f38" />
        </linearGradient>
        <linearGradient id="wf-leather" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2c1f17" />
          <stop offset="1" stopColor="#4d3727" />
        </linearGradient>
      </defs>

      {/* Contact shadow. */}
      <ellipse cx="502" cy="561" rx="64" ry="7" fill="#000" opacity="0.5" />

      {/* Boots. */}
      <path d="M461 538 h32 l3 14 q1 9 -8 9 h-34 q-7 0 -4 -9 z" fill="url(#wf-boot)" />
      <path d="M508 537 h31 l6 15 q1 9 -8 9 h-31 q-7 0 -3 -9 z" fill="url(#wf-boot)" />
      <rect x="455" y="556" width="42" height="5" rx="2" fill="#3a404b" />
      <rect x="505" y="556" width="42" height="5" rx="2" fill="#3a404b" />

      {/* Cargo pants. */}
      <path d="M465 396 L502 396 L498 470 L496 540 L463 540 L467 470 Z" fill="url(#wf-pants)" />
      <path d="M500 396 L538 396 L537 470 L540 540 L507 540 L503 470 Z" fill="url(#wf-pants)" />
      <path d="M496 400 L506 400 L503 452 L499 452 Z" fill="#1a201c" />
      <rect x="464" y="444" width="22" height="28" rx="3" fill="#2a332c" />
      <rect x="464" y="444" width="22" height="7" rx="2" fill="#232b25" />
      <rect x="516" y="446" width="22" height="28" rx="3" fill="#3a4637" />
      <rect x="516" y="446" width="22" height="7" rx="2" fill="#323d30" />
      <path d="M467 488 h28 M506 490 h31" stroke="#1a201c" strokeWidth="1.5" opacity="0.6" />
      {/* Leg volume: creases, knee light, rim light (cool left, warm right). */}
      <path d="M482 402 L478 538 M522 402 L523 538" stroke="#161c18" strokeWidth="1.2" opacity="0.55" />
      <ellipse cx="521" cy="490" rx="9" ry="3.2" fill="#5b6a54" opacity="0.5" />
      <ellipse cx="481" cy="490" rx="8" ry="3" fill="#3c4838" opacity="0.5" />
      <path d="M465 400 L463 540" stroke="#7fb8e6" strokeWidth="1.2" opacity="0.3" />
      <path d="M538 400 L540 540" stroke="#ffcf9e" strokeWidth="1.4" opacity="0.3" />
      <path d="M526 541 q8 -2 13 2" stroke="#4a515c" strokeWidth="1.5" fill="none" opacity="0.8" />

      {/* Upper body: breathes as one group. */}
      <g className="ws-breathe">
        {/* Shirt and torso. */}
        <path d="M472 246 Q500 238 528 246 L556 262 Q563 300 553 332 L549 398 L455 398 L451 332 Q439 300 446 262 Z" fill="url(#wf-shirt)" />
        <path d="M500 250 L500 396" stroke="#111720" strokeWidth="1.4" />
        <path d="M484 246 L500 268 L516 246" fill="#111720" />
        <rect x="516" y="290" width="22" height="22" rx="2" fill="#2f3a4d" />
        <path d="M516 296 h22" stroke="#232c3b" strokeWidth="1.5" />
        <path d="M446 262 Q440 300 451 332" fill="none" stroke="#7fb8e6" strokeWidth="1.2" opacity="0.4" />
        {/* Shirt volume: shadow side, folds, bunching at the belt, warm rim. */}
        <path d="M451 262 Q444 300 455 332 L457 398 L474 398 L470 330 Q466 296 470 262 Z" fill="#0b1018" opacity="0.4" />
        <path d="M459 300 q8 6 6 17 M540 300 q-8 6 -6 17 M470 360 q6 10 2 24 M532 362 q-6 9 -2 22" stroke="#0f141c" strokeWidth="1.3" fill="none" opacity="0.7" />
        <path d="M460 389 q9 -4 18 0 t18 0 t18 0 t18 0 t14 0" stroke="#0f141c" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M556 262 Q563 300 553 332 L549 396" stroke="#ffcf9e" strokeWidth="1.4" fill="none" opacity="0.35" />

        {/* Lanyard and laminate. */}
        <path d="M489 248 L483 322 M511 248 L489 322" stroke="#ff7a1a" strokeWidth="2" fill="none" />
        <rect x="474" y="322" width="26" height="34" rx="2" fill="#e8edf3" />
        <rect x="474" y="322" width="26" height="8" rx="2" fill="#ff7a1a" />
        <rect x="479" y="334" width="9" height="10" rx="1" fill="#2a3442" />
        <path d="M491 336 h6 M491 340 h6 M479 349 h16" stroke="#8a97a6" strokeWidth="1.4" />

        {/* Neck and head. */}
        <path d="M489 222 L511 222 L512 252 L488 252 Z" fill="url(#wf-skin)" />
        <path d="M489 230 Q500 238 511 230 L511 236 Q500 244 489 236 Z" fill="#5d3a28" opacity="0.5" />
        <g className="ws-head">
          <ellipse cx="475" cy="204" rx="4.5" ry="7.5" fill="#94603f" />
          <path d="M476 196 Q476 229 500 233 Q524 229 524 196 Q524 166 500 166 Q476 166 476 196 Z" fill="url(#wf-skin)" />
          <path d="M478 206 Q480 231 500 235 Q520 231 522 206 Q512 223 500 223 Q488 223 478 206 Z" fill="#2a1d16" opacity="0.6" />
          <path d="M473 194 Q470 164 496 158 Q522 154 529 177 Q531 188 526 194 Q516 177 495 179 Q481 181 473 194 Z" fill="#1c1511" />
          <path d="M476 192 Q476 184 482 181" stroke="#3b2e25" strokeWidth="3" fill="none" opacity="0.7" />
          <path d="M484 189 L495 187.5 M505 187.5 L516 189" stroke="#1a1310" strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="490" cy="197.5" rx="2.6" ry="2.2" fill="#140f0c" />
          <ellipse cx="510" cy="197.5" rx="2.6" ry="2.2" fill="#140f0c" />
          <circle cx="491" cy="196.6" r="0.8" fill="#fff" opacity="0.8" />
          <circle cx="511" cy="196.6" r="0.8" fill="#fff" opacity="0.8" />
          <path d="M501 201 L504 212 L498 213" stroke="#6b4129" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M493 220 Q501 223.5 508 218.5" stroke="#4d2a1c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* Face volume: shadowed cheek, lit brow and nose, hair sheen, rim. */}
          <path d="M478 199 Q480 222 494 231 Q484 215 483 197 Z" fill="#5a3522" opacity="0.38" />
          <ellipse cx="511" cy="181" rx="9" ry="3.6" fill="#e2ab84" opacity="0.35" />
          <path d="M502.5 202 L503.5 208" stroke="#dca27c" strokeWidth="1.2" opacity="0.55" strokeLinecap="round" />
          <path d="M485 171 Q501 160 519 168" stroke="#4a3a2f" strokeWidth="2" fill="none" opacity="0.65" strokeLinecap="round" />
          <path d="M524 190 Q524 222 507 232" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.4" />
          {/* Comms headset: band, ear cup, boom mic. */}
          <path d="M476 196 Q477 154 500 152 Q526 152 529 196" fill="none" stroke="#0f1319" strokeWidth="4.5" />
          <ellipse cx="473" cy="201" rx="4" ry="6" fill="#0f1319" />
          <ellipse cx="529" cy="205" rx="9.5" ry="12.5" fill="#0f1319" />
          <ellipse cx="531" cy="204" rx="5" ry="8" fill="#252c36" />
          <path d="M527 215 Q526 227 512 225" fill="none" stroke="#0f1319" strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="510.5" cy="225" rx="3.4" ry="2.8" fill="#2a3240" />
        </g>

        {/* Coiled cable from the headset to the radio. */}
        <polyline points={CABLE} fill="none" stroke="#0f1319" strokeWidth="1.6" />

        {/* Right arm (viewer's right): hand on hip by the radio. */}
        <path d="M548 258 Q566 266 574 292 L582 318 L566 324 L556 300 Z" fill="url(#wf-shirt)" />
        <rect x="564" y="312" width="22" height="10" rx="3" transform="rotate(-18 575 317)" fill="#3a4760" />
        <path d="M570 322 L580 324 L566 382 L556 380 Z" fill="url(#wf-skin)" />
        <ellipse cx="558" cy="386" rx="8" ry="9" fill="#b07a55" />

        {/* Left arm (viewer's left): reaching to the console. */}
        <path d="M452 262 Q436 272 434 300 L432 318 L452 320 L456 296 Z" fill="url(#wf-shirt)" />
        <rect x="430" y="312" width="24" height="10" rx="3" transform="rotate(6 442 317)" fill="#2a3446" />
        <path d="M434 318 L452 320 L442 392 L428 390 Z" fill="url(#wf-skin)" />
        <path d="M434 300 L432 318" stroke="#7fb8e6" strokeWidth="1.2" opacity="0.4" />
      </g>

      {/* The hand on the fader, and the fader cap it moves (gesture). */}
      <g className="ws-fader">
        <rect x="425" y="396" width="9" height="5" rx="1" fill="#e6edf4" />
        <path d="M425 386 Q422 398 430 402 Q440 404 444 396 Q446 388 440 384 Z" fill="#a46e4d" />
        <path d="M428 398 Q434 401 440 397" stroke="#6b4129" strokeWidth="1" fill="none" />
      </g>

      {/* Tool belt with pouch, gaffer tape, flashlight, and radio. */}
      <rect x="453" y="390" width="98" height="16" rx="3" fill="url(#wf-leather)" />
      <rect x="494" y="391" width="13" height="14" rx="2" fill="none" stroke="#a9b3be" strokeWidth="2" />
      <path d="M445 398 h26 v42 q0 6 -6 6 h-14 q-6 0 -6 -6 z" fill="url(#wf-leather)" />
      <path d="M445 398 h26 v12 h-26 z" fill="#3b2a1f" />
      <path d="M451 392 l3 -14 M457 392 l1 -15" stroke="#7a2e1a" strokeWidth="3" strokeLinecap="round" />
      <path d="M478 405 v8" stroke="#a9b3be" strokeWidth="2" />
      <circle cx="479" cy="425" r="12" fill="#ff7a1a" />
      <circle cx="479" cy="425" r="12" fill="none" stroke="#c2500f" strokeWidth="1.5" />
      <circle cx="479" cy="425" r="5.5" fill="#0b1626" />
      <rect x="520" y="404" width="8" height="36" rx="3" fill="#121821" />
      <rect x="519" y="436" width="10" height="7" rx="2" fill="#8b97a3" />
      <rect x="539" y="394" width="23" height="44" rx="4" fill="#0e1218" />
      <path d="M543 404 h15 M543 409 h15 M543 414 h15" stroke="#2a313b" strokeWidth="1.5" />
      <rect x="555" y="368" width="4" height="27" rx="2" fill="#0e1218" />
      <circle cx="545" cy="397" r="1.6" fill="#ff7a1a" />
    </svg>
  );
}

/* ── Layer 4: foreground ─────────────────────────────────────────────────── */

export function SceneForeground() {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className="ws-layer ws-layer-fg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wf-lip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#172b42" />
          <stop offset="1" stopColor="#071222" />
        </linearGradient>
      </defs>
      {/* Coiled XLR on the deck, front left. */}
      <g fill="none" stroke="#070d16" strokeWidth="4">
        <ellipse cx="96" cy="548" rx="44" ry="10" />
        <ellipse cx="98" cy="546" rx="36" ry="8" />
        <ellipse cx="100" cy="544" rx="28" ry="6" />
      </g>
      <ellipse cx="100" cy="544" rx="40" ry="9" fill="none" stroke="#2c4560" strokeWidth="1" opacity="0.6" />
      {/* Stage lip with the orange LED edge. */}
      <rect x="0" y="566" width="960" height="34" fill="url(#wf-lip)" />
      <rect x="0" y="565" width="960" height="2" fill="#ff7a1a" className="ws-led" />
      <rect x="0" y="565" width="960" height="8" fill="#ff7a1a" opacity="0.12" />
    </svg>
  );
}

/* ── Placeholder stage for scenes still in development ──────────────────── */

/** An empty, lit stage with a gaffer-tape mark: honest about unfinished scenes. */
export function SceneEmpty() {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className="ws-layer ws-layer-bg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="we-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#040a15" />
          <stop offset="1" stopColor="#0b1d33" />
        </linearGradient>
        <linearGradient id="we-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8dcff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#a8dcff" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <rect width="960" height="600" fill="url(#we-wall)" />
      <path d="M0 440 L960 440 L960 566 L0 566 Z" fill="#0d1d30" />
      <polygon points="462,60 498,60 600,540 360,540" fill="url(#we-cone)" />
      <ellipse cx="480" cy="540" rx="128" ry="16" fill="#a8dcff" opacity="0.08" />
      <path d="M466 532 l28 14 M494 532 l-28 14" stroke="#ff7a1a" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      <rect x="0" y="566" width="960" height="34" fill="#0a1626" />
      <rect x="0" y="565" width="960" height="2" fill="#ff7a1a" opacity="0.6" />
    </svg>
  );
}

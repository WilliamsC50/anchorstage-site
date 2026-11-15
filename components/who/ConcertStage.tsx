/**
 * Who It's For: the permanent concert stage (DESIGN-15A.3).
 *
 * One concert stage, six professional perspectives. This background never
 * changes between professions: a front-facing stage in a 1600 x 900 space
 * with truss, moving-head fixtures and their slowly sweeping beams, an LED
 * wall, the band's backline in silhouette, hanging line arrays, the crowd,
 * drifting haze, and a FOH riser across the front with an orange LED edge.
 * Professions change the character and foreground layers in front of it.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG, in the layer structure the
 * final painted art should follow. Decorative (aria-hidden). Motion is CSS in
 * app/(site)/who-its-for/who.css and stops under reduced motion.
 */

export const STAGE_VB = "0 0 1600 900";

const FIXTURES = [300, 440, 580, 720, 880, 1020, 1160, 1300];

const CROWD = Array.from({ length: 70 }, (_, i) => {
  const row = i % 2;
  const x = 10 + i * 23 + ((i * 37) % 11);
  const y = 640 + row * 22 + ((i * 53) % 9);
  return { x, y, r: 12 + ((i * 29) % 5), hand: i % 9 === 4 };
});

export function StageBackground() {
  return (
    <svg viewBox={STAGE_VB} preserveAspectRatio="xMidYMax slice" className="wv-layer wv-layer-bg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="cs-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#020712" />
          <stop offset="0.6" stopColor="#081a2e" />
          <stop offset="1" stopColor="#0b2038" />
        </linearGradient>
        <linearGradient id="cs-led" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0c2c4a" />
          <stop offset="0.5" stopColor="#123f66" />
          <stop offset="1" stopColor="#0a2440" />
        </linearGradient>
        <radialGradient id="cs-led-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7fd3f4" stopOpacity="0.45" />
          <stop offset="1" stopColor="#7fd3f4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cs-led-warm" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff9a4a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cs-beam-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe6ff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#4ea8d1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cs-beam-o" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd0a6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cs-haze" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7fb8e6" stopOpacity="0.16" />
          <stop offset="1" stopColor="#7fb8e6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cs-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#081626" />
          <stop offset="1" stopColor="#0d2238" />
        </linearGradient>
        <linearGradient id="cs-riser" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14283f" />
          <stop offset="1" stopColor="#081424" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#cs-wall)" />

      {/* LED wall with a slow, soft image. */}
      <rect x="520" y="210" width="560" height="270" rx="4" fill="url(#cs-led)" />
      <g className="cs-led-image">
        <ellipse cx="700" cy="330" rx="200" ry="120" fill="url(#cs-led-glow)" />
        <ellipse cx="930" cy="380" rx="160" ry="100" fill="url(#cs-led-warm)" />
      </g>
      <path
        d={Array.from({ length: 28 }, (_, i) => `M${540 + i * 20} 210 V480`).join(" ") + " " + Array.from({ length: 13 }, (_, i) => `M520 ${226 + i * 20} H1080`).join(" ")}
        stroke="#05101d"
        strokeWidth="1.4"
        opacity="0.55"
      />

      {/* Stage deck and the band's backline, in silhouette. */}
      <rect x="200" y="548" width="1200" height="14" fill="#10253c" />
      <rect x="200" y="548" width="1200" height="2" fill="#3a6a94" opacity="0.7" />
      <rect x="200" y="562" width="1200" height="40" fill="#060f1b" />
      <g fill="#040b16">
        <rect x="560" y="470" width="70" height="78" rx="3" />
        <rect x="566" y="430" width="58" height="40" rx="3" />
        <rect x="970" y="474" width="74" height="74" rx="3" />
        <rect x="740" y="512" width="120" height="36" rx="3" />
        <ellipse cx="770" cy="498" rx="22" ry="8" />
        <ellipse cx="830" cy="496" rx="24" ry="9" />
        <circle cx="800" cy="486" r="18" />
        <path d="M748 470 l-6 -24 M852 470 l6 -26" stroke="#040b16" strokeWidth="3" />
        {/* Two performers. */}
        <path d="M676 548 l4 -44 q-6 -22 6 -32 q-8 -16 6 -22 q14 6 6 22 q12 10 6 32 l4 44 z" />
        <path d="M914 548 l4 -46 q-6 -20 6 -30 q-8 -16 6 -22 q14 6 6 22 q12 10 6 30 l4 46 z" />
      </g>
      <path d="M690 472 q6 -8 12 0 M928 474 q6 -8 12 0" stroke="#7fd3f4" strokeWidth="1.2" fill="none" opacity="0.4" />

      {/* Truss: header and towers, with lacing. */}
      <g fill="none" stroke="#1d3f60" strokeWidth="2">
        <path d="M200 128 H1400 M200 150 H1400" />
        <path d={Array.from({ length: 60 }, (_, i) => `M${200 + i * 20} 128 L${210 + i * 20} 150 L${220 + i * 20} 128`).join(" ")} strokeWidth="1" opacity="0.8" />
        <path d="M200 150 V560 M222 150 V560 M1378 150 V560 M1400 150 V560" />
        <path d={Array.from({ length: 20 }, (_, i) => `M200 ${150 + i * 20} L222 ${160 + i * 20} M1378 ${150 + i * 20} L1400 ${160 + i * 20}`).join(" ")} strokeWidth="1" opacity="0.8" />
      </g>

      {/* Moving heads and their beams (each sweeps slowly from its fixture). */}
      {FIXTURES.map((x, i) => (
        <g key={x}>
          <polygon
            className="cs-beam"
            style={{ animationDelay: `${-i * 1.7}s`, animationDuration: `${11 + (i % 3) * 2}s` }}
            points={`${x - 6},158 ${x + 6},158 ${x + 70},560 ${x - 70},560`}
            fill={`url(#${i % 3 === 1 ? "cs-beam-o" : "cs-beam-b"})`}
          />
          <rect x={x - 11} y="150" width="22" height="14" rx="3" fill="#0a1626" />
          <circle cx={x} cy="162" r="4" fill={i % 3 === 1 ? "#ffd0a6" : "#cdeeff"} />
        </g>
      ))}

      {/* Hanging line arrays. */}
      {[150, 1450].map((x) => (
        <g key={x} fill="#06101c">
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={x - 26 - i * 0.8} y={170 + i * 26} width={52 + i * 1.6} height="23" rx="3" />
          ))}
        </g>
      ))}

      {/* Haze drifting across the stage. */}
      <g className="cs-haze">
        <ellipse cx="560" cy="430" rx="520" ry="160" fill="url(#cs-haze)" />
        <ellipse cx="1120" cy="470" rx="460" ry="140" fill="url(#cs-haze)" />
      </g>

      {/* The crowd between the stage and FOH. */}
      <rect x="0" y="600" width="1600" height="300" fill="url(#cs-floor)" />
      <g fill="#030912">
        {CROWD.map((h, i) => (
          <g key={i}>
            <circle cx={h.x} cy={h.y} r={h.r} />
            <rect x={h.x - h.r - 6} y={h.y + h.r - 3} width={h.r * 2 + 12} height="60" rx="10" />
            {h.hand && <path d={`M${h.x + 10} ${h.y + 4} l14 -42`} stroke="#030912" strokeWidth="7" strokeLinecap="round" />}
          </g>
        ))}
        <rect x="0" y="700" width="1600" height="120" />
      </g>
      {[180, 470, 1240, 1500].map((x, i) => (
        <circle key={x} cx={x + 14} cy={636 - (i % 2) * 8} r="2.2" fill="#cdeeff" opacity="0.7" className="cs-phone" style={{ animationDelay: `${-i * 1.1}s` }} />
      ))}

      {/* The FOH riser across the front, with its orange LED edge. */}
      <rect x="0" y="836" width="1600" height="64" fill="url(#cs-riser)" />
      <rect x="0" y="834" width="1600" height="3" fill="#2f5374" opacity="0.8" />
      <rect x="0" y="893" width="1600" height="3" fill="#ff7a1a" />
      <rect x="0" y="880" width="1600" height="14" fill="#ff7a1a" opacity="0.1" />
    </svg>
  );
}

/** Placeholder foreground for professions still in development: an empty,
 *  lit FOH mark. Honest about unfinished scenes; no invented artwork. */
export function StageEmptyMark() {
  return (
    <svg viewBox={STAGE_VB} preserveAspectRatio="xMidYMax slice" className="wv-layer wv-layer-fg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="cs-spot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cdeeff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#cdeeff" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points="1056,0 1084,0 1200,860 940,860" fill="url(#cs-spot)" />
      <ellipse cx="1070" cy="862" rx="150" ry="16" fill="#cdeeff" opacity="0.08" />
      <path d="M1050 850 l40 16 M1090 850 l-40 16" stroke="#ff7a1a" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

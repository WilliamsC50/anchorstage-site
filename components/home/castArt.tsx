import type { ReactNode } from "react";
import type { PersonaSlug } from "@/lib/content-types";

/**
 * Scene 5 artwork: six live-production character silhouettes, the persistent
 * stage environment behind them, and the stage light they stand in.
 *
 * INTERIM ARTWORK. The figures are hand-authored vector silhouettes, built
 * from a pose skeleton (tapered limbs and joints unioned into one dark
 * shape) and lit by an SVG rim-light filter. They establish the composition,
 * scale, lighting, and each role's props, and are meant to be replaced by
 * commissioned character art. To swap one in, replace that role's art in
 * FIGURES (or point the featured layer at an image); the selector,
 * thumbnails, and environment do not change.
 *
 * Coordinate space per figure: 400 x 800, ground line at y = 776, figure
 * turned three-quarters toward the key light (upper right).
 * Server-rendered and static; every layer here is decorative.
 */

type P = readonly [number, number];

const r1 = (v: number) => Math.round(v * 10) / 10;

/** A circle as a path, so joints union with limbs in one fill. */
const dot = ([x, y]: P, r: number) =>
  `M${r1(x - r)} ${r1(y)}a${r1(r)} ${r1(r)} 0 1 0 ${r1(2 * r)} 0a${r1(r)} ${r1(r)} 0 1 0 ${r1(-2 * r)} 0Z`;

const oval = ([x, y]: P, rx: number, ry: number) =>
  `M${r1(x - rx)} ${r1(y)}a${r1(rx)} ${r1(ry)} 0 1 0 ${r1(2 * rx)} 0a${r1(rx)} ${r1(ry)} 0 1 0 ${r1(-2 * rx)} 0Z`;

/** A tapered segment with rounded ends: width wa at a, wb at b. */
const seg = (a: P, b: P, wa: number, wb: number) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const q = [
    [a[0] + (nx * wa) / 2, a[1] + (ny * wa) / 2],
    [b[0] + (nx * wb) / 2, b[1] + (ny * wb) / 2],
    [b[0] - (nx * wb) / 2, b[1] - (ny * wb) / 2],
    [a[0] - (nx * wa) / 2, a[1] - (ny * wa) / 2],
  ];
  return `M${q.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L")}Z${dot(a, wa / 2)}${dot(b, wb / 2)}`;
};

/** A limb through joints [point, width]. */
const limb = (...joints: [P, number][]) =>
  joints
    .slice(1)
    .map(([p, w], i) => seg(joints[i][0], p, joints[i][1], w))
    .join("");

/** A rotated rounded rectangle (gear: tablets, cases, binders). */
const box = ([cx, cy]: P, w: number, h: number, deg = 0, rad = 3) => {
  const t = (deg * Math.PI) / 180;
  const c = Math.cos(t);
  const s = Math.sin(t);
  const pt = (x: number, y: number) => `${r1(cx + x * c - y * s)} ${r1(cy + x * s + y * c)}`;
  const hw = w / 2;
  const hh = h / 2;
  const k = Math.min(rad, hw, hh);
  return (
    `M${pt(-hw + k, -hh)}L${pt(hw - k, -hh)}Q${pt(hw, -hh)} ${pt(hw, -hh + k)}L${pt(hw, hh - k)}` +
    `Q${pt(hw, hh)} ${pt(hw - k, hh)}L${pt(-hw + k, hh)}Q${pt(-hw, hh)} ${pt(-hw, hh - k)}` +
    `L${pt(-hw, -hh + k)}Q${pt(-hw, -hh)} ${pt(-hw + k, -hh)}Z`
  );
};

/* ── Anatomy ────────────────────────────────────────────────────────────── */

/** Head turned toward the light: cranium, jaw, and neck. */
const head = (dx = 0) =>
  oval([198 + dx, 126], 32, 36) +
  seg([202 + dx, 140], [215 + dx, 166], 44, 26) +
  seg([201 + dx, 158], [200 + dx, 200], 40, 56);

/** Work jacket: trapezius line, chest, waist, and a hem at `hem`. */
const jacket = (dx = 0, hem = 470) => {
  const x = (v: number) => r1(v + dx);
  return (
    `M${x(110)} 212C${x(102)} 244 ${x(112)} 304 ${x(140)} 374L${x(132)} ${hem}` +
    `Q${x(200)} ${hem + 10} ${x(268)} ${hem}L${x(260)} 374C${x(290)} 304 ${x(298)} 244 ${x(290)} 212` +
    `C${x(258)} 194 ${x(234)} 190 ${x(200)} 190C${x(166)} 190 ${x(142)} 194 ${x(110)} 212Z` +
    dot([x(128), 228], 23) +
    dot([x(272), 228], 23)
  );
};

/** A sleeved arm from the shoulder: upper arm, forearm, cuff, hand. */
const arm = (shoulder: P, elbow: P, wrist: P, hand: P = wrist, handR = 15) =>
  limb([shoulder, 46], [elbow, 39], [wrist, 31]) + dot(hand, handR);

const SHOULDER_L: P = [130, 234];
const SHOULDER_R: P = [270, 234];

/** Trousers and work boots. "contra": weight on the left leg, right leg
 *  relaxed; "wide": a performer's stance; "square": planted. */
const stance = (kind: "contra" | "wide" | "square", dx = 0) => {
  const x = (v: number) => v + dx;
  const leg = (hip: P, knee: P, ankle: P, toe: P) =>
    limb([[x(hip[0]), hip[1]], 74], [[x(knee[0]), knee[1]], 50], [[x(ankle[0]), ankle[1]], 36]) +
    seg([x(ankle[0]), ankle[1]], [x(toe[0]), toe[1]], 38, 26) +
    seg([x(ankle[0]) + (toe[0] > ankle[0] ? -8 : 8), 772], [x(toe[0]), 774], 14, 12);
  if (kind === "wide")
    return leg([172, 462], [148, 620], [128, 750], [96, 770]) + leg([228, 462], [256, 620], [278, 750], [312, 770]);
  if (kind === "square")
    return leg([172, 462], [166, 622], [164, 752], [134, 772]) + leg([228, 462], [238, 622], [246, 752], [278, 772]);
  return leg([174, 462], [178, 624], [184, 752], [150, 772]) + leg([228, 462], [252, 614], [266, 744], [302, 768]);
};

const BODY = "url(#cast-body)";
const GEAR = "url(#cast-gear)";
const ORANGE = "#ff7a1a";
const TAPE = "#b3551a";
const LINES = { fill: "none", stroke: "#8ccaf2", strokeOpacity: 0.2, strokeWidth: 2 } as const;

/** A small orange status light with its glow. */
const Led = ({ at, r = 2.6 }: { at: P; r?: number }) => (
  <>
    <circle cx={at[0]} cy={at[1]} r={r * 5} fill="url(#cast-led-glow)" />
    <circle cx={at[0]} cy={at[1]} r={r} fill={ORANGE} />
  </>
);

/* ── The six figures ───────────────────────────────────────────────────── */

const FIGURES: Record<PersonaSlug, { crop: string; art: ReactNode }> = {
  // FOH / backstage technician: headphones half on, checking a tablet,
  // a coiled cable in hand; tape and a beltpack on the belt.
  freelancers: {
    crop: "82 66 246 164",
    art: (
      <>
        <path
          fill={BODY}
          d={
            stance("contra") +
            jacket(0, 474) +
            head() +
            arm(SHOULDER_L, [118, 342], [180, 352], [188, 349]) +
            arm(SHOULDER_R, [292, 342], [298, 438], [300, 452]) +
            box([252, 458], 30, 42, 0, 5) +
            box([140, 610], 24, 54, 2, 4)
          }
        />
        {/* Over-under coil hanging from the hand, tail to the deck. */}
        <g fill="none" stroke={BODY} strokeWidth="5.5">
          <ellipse cx="302" cy="506" rx="34" ry="56" transform="rotate(-6 302 506)" />
          <ellipse cx="306" cy="512" rx="30" ry="52" transform="rotate(4 306 512)" />
          <ellipse cx="298" cy="502" rx="38" ry="58" transform="rotate(-12 298 502)" />
          <path d="M318 560C326 620 300 680 336 778" strokeWidth="4.5" />
        </g>
        {/* Headphones: one cup on the ear, one lifted off. */}
        <path d="M168 118C164 74 228 70 236 100" fill="none" stroke={BODY} strokeWidth="8" />
        <path fill={BODY} d={oval([168, 128], 13, 19) + oval([238, 104], 11, 17)} />
        {/* Tablet, its light on the operator. */}
        <path fill={GEAR} d={box([206, 336], 80, 54, -10, 5)} />
        <path fill="url(#cast-screen)" d={box([206, 335], 70, 44, -10, 3)} />
        <ellipse cx="214" cy="170" rx="22" ry="14" fill="#4ea8ff" opacity="0.12" />
        {/* Gaffer tape and a beltpack. */}
        <circle cx="154" cy="454" r="16" fill="none" stroke={GEAR} strokeWidth="10" />
        <path fill={GEAR} d={box([224, 450], 24, 32, 0, 3)} />
        <Led at={[224, 441]} />
      </>
    ),
  },

  // Production lead: comms headset with boom mic, directing the room,
  // run sheet on a clipboard, radio on the belt, pass on a lanyard.
  "production-companies": {
    crop: "92 60 312 208",
    art: (
      <>
        <path
          fill={BODY}
          d={
            stance("square") +
            jacket(0, 496) +
            head() +
            arm(SHOULDER_R, [330, 290], [376, 268], [380, 266], 14) +
            seg([380, 266], [402, 258], 22, 10) +
            arm(SHOULDER_L, [114, 344], [150, 410], [154, 412]) +
            seg([158, 448], [158, 416], 5, 4) +
            box([158, 468], 22, 42, 0, 3)
          }
        />
        <path d="M169 120C166 74 230 72 232 112" fill="none" stroke={BODY} strokeWidth="7" />
        <path fill={BODY} d={oval([168, 128], 12, 17)} />
        <path d="M176 138C186 160 206 164 220 156" fill="none" stroke={GEAR} strokeWidth="4" />
        <circle cx="222" cy="155" r="4.5" fill={GEAR} />
        {/* Clipboard with run sheet. */}
        <path fill={GEAR} d={box([134, 424], 62, 86, 10, 4)} />
        <path fill="#13243a" d={box([134, 428], 52, 70, 10, 2)} />
        <path fill={GEAR} d={box([140, 382], 24, 9, 10, 2)} />
        <path {...LINES} d="M118 412l28 5M116 425l32 5.6M114 438l24 4.2" />
        {/* Lanyard and pass. */}
        <path d="M186 196L200 300L214 196" fill="none" stroke="#1b3350" strokeWidth="3" />
        <path fill={TAPE} d={box([200, 316], 22, 30, 0, 3)} />
        <Led at={[158, 448]} r={2} />
      </>
    ),
  },

  // Venue technical director: cap, hand on hip, torch angled at the deck,
  // earpiece wire, keys on the belt.
  venues: {
    crop: "84 58 246 164",
    art: (
      <>
        <path fill="url(#cast-torch)" d="M330 452L342 444L404 776Q334 792 266 778Z" opacity="0.95" />
        <path
          fill={BODY}
          d={
            stance("contra") +
            jacket(0, 480) +
            head() +
            oval([198, 100], 35, 22) +
            seg([216, 106], [264, 114], 12, 6) +
            seg([200, 188], [200, 212], 72, 66) +
            arm(SHOULDER_R, [294, 340], [308, 424], [310, 432]) +
            arm(SHOULDER_L, [86, 334], [144, 414], [148, 416])
          }
        />
        <path fill={GEAR} d={seg([304, 428], [336, 456], 15, 19)} />
        <circle cx="338" cy="457" r="7" fill="#d9f0ff" opacity="0.9" />
        <path d="M228 134C238 146 228 160 238 172S232 192 240 206" fill="none" stroke="#1b3350" strokeWidth="2" />
        <g fill="none" stroke={GEAR} strokeWidth="3">
          <circle cx="242" cy="480" r="7" />
          <path d="M240 487l-4 16M246 486l4 14" />
        </g>
        <path fill={TAPE} d={box([214, 472], 11, 17, 4, 2)} />
      </>
    ),
  },

  // Event producer: phone to the ear, the production binder held close,
  // hair up.
  "event-organizers": {
    crop: "84 56 252 168",
    art: (
      <>
        <path
          fill={BODY}
          d={
            stance("contra") +
            jacket(0, 468) +
            head() +
            dot([172, 94], 19) +
            oval([196, 116], 33, 34) +
            arm(SHOULDER_L, [98, 274], [158, 168], [164, 156]) +
            arm(SHOULDER_R, [288, 340], [230, 332], [224, 328])
          }
        />
        <path fill={GEAR} d={box([174, 140], 14, 48, -18, 3)} />
        {/* Production binder with sheets and an orange tab. */}
        <path fill={GEAR} d={box([230, 306], 70, 94, -14, 4)} />
        <path {...LINES} d="M202 272l54 -13.5M204 283l54 -13.5M206 294l54 -13.5" />
        <path fill={TAPE} d={box([263, 276], 9, 18, -14, 1.5)} />
        <path {...LINES} strokeOpacity="0.1" d="M168 220L160 468M232 220L240 468" />
      </>
    ),
  },

  // Performing artist: acoustic guitar on a strap, held across the body
  // and played right-handed: strumming hand over the sound hole, fretting
  // hand on the neck, which rises to the player's left.
  musicians: {
    crop: "-50 108 500 333",
    art: (
      <>
        <path fill={BODY} d={stance("wide") + jacket(0, 462) + head()} />
        {/* Strap from the neck heel over the left shoulder. */}
        <path d="M228 360C244 300 260 254 276 214" fill="none" stroke="#132740" strokeWidth="9" />
        {/* Acoustic guitar, drawn along its own axis (neck toward +x):
            lower bout, waist, upper bout, sound hole and rosette, bridge,
            strings, neck, and a headstock with tuning pegs. */}
        <g transform="translate(160 404) rotate(-30) scale(0.86)">
          <path
            fill={GEAR}
            stroke={ORANGE}
            strokeOpacity="0.5"
            strokeWidth="1.8"
            d="M-108 0C-108 -42 -80 -68 -40 -68C-14 -68 -8 -45 6 -45C18 -45 22 -53 46 -53C78 -53 98 -36 98 0C98 36 78 53 46 53C22 53 18 45 6 45C-8 45 -14 68 -40 68C-80 68 -108 42 -108 0Z"
          />
          <path fill={GEAR} d="M92 -10L262 -8L262 8L92 10ZM260 -11L302 -14Q310 -14 310 -7L310 7Q310 14 302 14L260 11Z" />
          <path fill={GEAR} d={dot([272, -15], 3.5) + dot([286, -16], 3.5) + dot([300, -17], 3.5) + dot([272, 15], 3.5) + dot([286, 16], 3.5) + dot([300, 17], 3.5)} />
          <circle cx="34" cy="0" r="22" fill="none" stroke="#8ccaf2" strokeOpacity="0.28" strokeWidth="2.5" />
          <circle cx="34" cy="0" r="16" fill="#02060c" />
          <path fill="#0b1726" stroke="#8ccaf2" strokeOpacity="0.2" d={box([-56, 0], 10, 38, 0, 2)} />
          <path d="M-56 -6H262M-56 -2H262M-56 2H262M-56 6H262M260 -9V9" fill="none" stroke="#8ccaf2" strokeOpacity="0.2" strokeWidth="0.9" />
        </g>
        {/* Arms over the guitar: fretting hand under the neck, strumming
            forearm resting on the upper edge of the lower bout. */}
        <path
          fill={BODY}
          d={
            arm(SHOULDER_R, [316, 334], [296, 342], [289, 339], 14) +
            arm(SHOULDER_L, [92, 360], [158, 400], [166, 401])
          }
        />
      </>
    ),
  },

  // AV warehouse technician: gloved hand on a road case, scanning its
  // label; cap backwards.
  "rental-providers": {
    crop: "0 72 384 256",
    art: (
      <>
        <path fill={GEAR} d={box([100, 620], 172, 268, 0, 6)} />
        <g fill="none" stroke="#2a4a6c" strokeWidth="4">
          <path d="M18 508V490H36M182 508V490H164M18 732V750H36M182 732V750H164" />
          <path d="M14 548H186" strokeWidth="3" />
        </g>
        <path fill="#0e1e33" d={box([62, 546], 20, 13, 0, 2) + box([138, 546], 20, 13, 0, 2)} />
        <path fill={TAPE} opacity="0.75" d={box([100, 616], 80, 18, 0, 2)} />
        <path fill={BODY} d={dot([40, 766], 12) + dot([160, 766], 12) + box([40, 754], 22, 14, 0, 2) + box([160, 754], 22, 14, 0, 2)} />
        <path
          fill={BODY}
          d={
            stance("square", 40) +
            jacket(40, 474) +
            head(40) +
            oval([238, 104], 35, 22) +
            seg([220, 108], [186, 116], 11, 6) +
            arm([170, 234], [144, 352], [148, 470], [150, 486], 17) +
            arm([310, 234], [336, 342], [302, 388], [296, 390], 16)
          }
        />
        <path fill={GEAR} d={seg([296, 380], [254, 396], 19, 15) + seg([292, 390], [300, 414], 13, 11)} />
        <path d="M250 398L130 610" stroke={ORANGE} strokeOpacity="0.6" strokeWidth="1.6" />
        <circle cx="130" cy="610" r="10" fill="url(#cast-led-glow)" />
      </>
    ),
  },
};

export const FIGURE_SLUGS = Object.keys(FIGURES) as PersonaSlug[];
export const figureCrop = (slug: PersonaSlug) => FIGURES[slug].crop;
export const figureId = (slug: PersonaSlug) => `cast-fig-${slug}`;

/** Shared definitions: materials, rim light, and every figure (drawn by
 *  <use> in the featured layer and the thumbnails). Must not be
 *  display:none, or Chrome drops the gradients and filters. */
export function CastDefs() {
  return (
    <svg aria-hidden="true" focusable="false" className="cast-defs" width="0" height="0">
      <defs>
        {/* Dark body, a touch of lift toward the lit (right) side. */}
        <linearGradient id="cast-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a1422" />
          <stop offset="0.5" stopColor="#04080f" />
          <stop offset="1" stopColor="#0c1b2e" />
        </linearGradient>
        <linearGradient id="cast-gear" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#11203a" />
          <stop offset="1" stopColor="#070e19" />
        </linearGradient>
        <linearGradient id="cast-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4ea8ff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#1b4f86" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="cast-torch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfeaff" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#7fc4f0" stopOpacity="0.12" />
          <stop offset="1" stopColor="#7fc4f0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cast-led-glow">
          <stop offset="0" stopColor="#ff7a1a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
        </radialGradient>

        {/* Rim light. Key: a hard edge from the upper right (the shape
            minus itself shifted down-left), its bloom outside the shape,
            and its falloff inside it, which turns the flat silhouette into
            lit form. Fill: a faint cool edge from the left. */}
        <filter id="cast-rim" x="-15%" y="-8%" width="130%" height="116%" colorInterpolationFilters="sRGB">
          <feOffset in="SourceAlpha" dx="-3.5" dy="2.5" result="kshift" />
          <feComposite in="SourceAlpha" in2="kshift" operator="out" result="kedge" />
          <feFlood floodColor="#a9ddff" />
          <feComposite in2="kedge" operator="in" result="key" />
          <feGaussianBlur in="key" stdDeviation="7" result="bloom" />
          <feGaussianBlur in="key" stdDeviation="16" result="kspread" />
          <feComposite in="kspread" in2="SourceAlpha" operator="in" result="kinner" />
          <feComponentTransfer in="kinner" result="form">
            <feFuncA type="linear" slope="0.9" />
          </feComponentTransfer>
          <feOffset in="SourceAlpha" dx="2.5" dy="0" result="fshift" />
          <feComposite in="SourceAlpha" in2="fshift" operator="out" result="fedge" />
          <feFlood floodColor="#3d7fbf" floodOpacity="0.6" />
          <feComposite in2="fedge" operator="in" result="fill" />
          <feMerge>
            <feMergeNode in="bloom" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="form" />
            <feMergeNode in="fill" />
            <feMergeNode in="key" />
          </feMerge>
        </filter>

        {FIGURE_SLUGS.map((slug) => (
          <g key={slug} id={figureId(slug)} filter="url(#cast-rim)">
            {FIGURES[slug].art}
          </g>
        ))}
      </defs>
    </svg>
  );
}

/** The persistent environment behind the whole scene: haze, a box truss
 *  with dark fixtures, and a stage deck in perspective. Static. */
export function CastEnvironment() {
  const fixtures = [140, 420, 700, 980, 1260, 1540];
  return (
    <div aria-hidden="true" className="cast-env">
      <div className="cast-env-haze" />
      <svg className="cast-env-truss" viewBox="0 0 1680 110" preserveAspectRatio="xMidYMin slice">
        <g fill="none" stroke="#7fc4f0" strokeOpacity="0.16" strokeWidth="1.5">
          <path d="M0 26H1680M0 56H1680" />
          <path d={Array.from({ length: 56 }, (_, i) => `M${i * 30} 26L${i * 30 + 30} 56`).join("")} />
        </g>
        {fixtures.map((x) => (
          <g key={x}>
            <path d={`M${x - 3} 56V68`} stroke="#7fc4f0" strokeOpacity="0.2" strokeWidth="2" />
            <path d={`M${x - 16} 68H${x + 10}L${x + 6} 96H${x - 12}Z`} fill="#0a1626" stroke="#7fc4f0" strokeOpacity="0.18" />
            <ellipse cx={x - 3} cy="97" rx="7" ry="2.2" fill="#bfe3ff" opacity="0.5" />
          </g>
        ))}
        <circle cx="983" cy="74" r="1.8" fill="#ff7a1a" opacity="0.8" />
      </svg>
      <svg className="cast-env-floor" viewBox="0 0 2000 400" preserveAspectRatio="none">
        <g fill="none" stroke="#7fc4f0" strokeOpacity="0.14">
          {Array.from({ length: 25 }, (_, i) => (
            <path key={`r${i}`} d={`M1000 0L${(i - 12) * 170 + 1000} 400`} vectorEffect="non-scaling-stroke" />
          ))}
          {[10, 26, 48, 78, 118, 170, 236, 318].map((y) => (
            <path key={`h${y}`} d={`M0 ${y}H2000`} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
    </div>
  );
}

/** The light the featured character stands in: back glow, two soft
 *  beams from the rig, and a marked position on the deck. It belongs to
 *  the stage, not the character, so it never changes on selection. */
export function CastLight() {
  return (
    <div aria-hidden="true" className="cast-light">
      <span className="cast-beam cast-beam-l">
        <i />
      </span>
      <span className="cast-beam cast-beam-r">
        <i />
      </span>
      <span className="cast-glow" />
      <svg className="cast-mark" viewBox="0 0 400 80" preserveAspectRatio="xMidYMax meet">
        <ellipse cx="200" cy="52" rx="170" ry="22" fill="url(#cast-pool)" />
        <ellipse cx="200" cy="52" rx="122" ry="15" fill="none" stroke="#a9ddff" strokeOpacity="0.32" />
        <ellipse cx="200" cy="52" rx="160" ry="20.5" fill="none" stroke="#7fc4f0" strokeOpacity="0.14" strokeDasharray="2 7" />
        {/* Spike marks: orange tape on the deck. */}
        <path d="M74 50h14M81 44v12M312 50h14M319 44v12" stroke="#ff7a1a" strokeOpacity="0.7" strokeWidth="2.5" />
        <defs>
          <radialGradient id="cast-pool">
            <stop offset="0" stopColor="#4ea8ff" stopOpacity="0.3" />
            <stop offset="0.6" stopColor="#4ea8ff" stopOpacity="0.08" />
            <stop offset="1" stopColor="#4ea8ff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <span className="cast-scale" />
    </div>
  );
}

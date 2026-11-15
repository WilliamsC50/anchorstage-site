/**
 * Who It's For: the Freelancer / Technician figure (DESIGN-15A.2 artwork,
 * reused by DESIGN-15A.3).
 *
 * A front-of-house engineer: comms headset with a coiled cable to the belt
 * radio, laminate on a lanyard, rolled-sleeve crew shirt, cargo trousers, and
 * a tool belt with a pliers pouch, flashlight, and orange gaffer tape. Drawn
 * in its own 960 x 600 space (feet at y = 562, the left hand resting at about
 * x = 432, y = 398) and placed into the stage with a transform, so the same
 * artwork can be repositioned or rescaled per composition.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG. Final production art is
 * expected to be commissioned or painted in the same layer structure.
 * Decorative: the stage supplies all text.
 */

const r1 = (v: number) => Math.round(v * 10) / 10;

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

const CABLE = coil([531, 222], [550, 392], 16, 3.2);

/** The figure, placed by translate and uniform scale. */
export default function TechnicianFigure({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="ws-figure">
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

      {/* The hand resting on the console (settles now and then). */}
      <g className="ws-hand">
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
    </g>
  );
}

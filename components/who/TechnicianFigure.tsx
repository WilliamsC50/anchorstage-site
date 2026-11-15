/**
 * Who It's For: the Freelancer / Technician figure (DESIGN-15A.2 artwork,
 * reused by DESIGN-15A.3, dressed for corporate AV in DESIGN-15A.4).
 *
 * A front-of-house engineer on a corporate production, in all-black work
 * attire: short-sleeve polo tucked into black work pants, black belt, black
 * work shoes, black comms headset with a coiled cable to the belt radio, a
 * credential on a black lanyard, and a small flashlight on the belt. Drawn in
 * its own 960 x 600 space (feet at y = 562, the left hand resting at about
 * x = 432, y = 398) and placed into the stage with a transform, so the same
 * artwork can be repositioned or rescaled per composition.
 *
 * Black on a dark stage: the clothing is built from charcoal values with
 * cool (left) and warm (right) rim light so the silhouette still reads.
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
        {/* Black polo: charcoal with a lifted lit side so the form reads. */}
        <linearGradient id="wf-shirt" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0c0f14" />
          <stop offset="0.55" stopColor="#1a1f27" />
          <stop offset="1" stopColor="#2a303a" />
        </linearGradient>
        <linearGradient id="wf-pants" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a0c10" />
          <stop offset="0.55" stopColor="#161a20" />
          <stop offset="1" stopColor="#232830" />
        </linearGradient>
        <linearGradient id="wf-shoe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#07090c" />
          <stop offset="1" stopColor="#1f242c" />
        </linearGradient>
      </defs>

      {/* Contact shadow. */}
      <ellipse cx="502" cy="561" rx="64" ry="7" fill="#000" opacity="0.5" />

      {/* Black work shoes: low profile, rubber sole, a little toe shine. */}
      <path d="M462 544 h31 l2 8 q1 9 -8 9 h-37 q-7 0 -3 -8 z" fill="url(#wf-shoe)" />
      <path d="M509 544 h31 l6 8 q2 9 -7 9 h-34 q-6 0 -3 -8 z" fill="url(#wf-shoe)" />
      <rect x="452" y="557" width="44" height="4.5" rx="2" fill="#2c323b" />
      <rect x="505" y="557" width="44" height="4.5" rx="2" fill="#2c323b" />
      <path d="M455 553 q6 -3 12 -1 M532 552 q6 -2 11 1" stroke="#5d6672" strokeWidth="1.3" fill="none" opacity="0.7" strokeLinecap="round" />

      {/* Black work pants: straight leg, side seams, soft knee light. */}
      <path d="M465 398 L502 398 L498 470 L496 546 L463 546 L467 470 Z" fill="url(#wf-pants)" />
      <path d="M500 398 L538 398 L537 470 L540 546 L507 546 L503 470 Z" fill="url(#wf-pants)" />
      <path d="M496 402 L506 402 L503 448 L499 448 Z" fill="#07090c" />
      <path d="M470 410 L468 544 M533 410 L536 544" stroke="#05070a" strokeWidth="1.2" opacity="0.7" />
      <path d="M482 404 L478 544 M522 404 L523 544" stroke="#05070a" strokeWidth="1" opacity="0.5" />
      <ellipse cx="521" cy="490" rx="9" ry="3.2" fill="#3a414c" opacity="0.45" />
      <ellipse cx="481" cy="490" rx="8" ry="3" fill="#252a32" opacity="0.45" />
      <path d="M465 402 L463 546" stroke="#7fb8e6" strokeWidth="1.3" opacity="0.4" />
      <path d="M538 402 L540 546" stroke="#ffcf9e" strokeWidth="1.5" opacity="0.4" />

      {/* Upper body: breathes as one group. */}
      <g className="ws-breathe">
        {/* Polo body, tucked in at the belt. */}
        <path d="M472 246 Q500 238 528 246 L556 262 Q563 300 553 332 L549 396 L455 396 L451 332 Q439 300 446 262 Z" fill="url(#wf-shirt)" />
        <path d="M451 262 Q444 300 455 332 L457 396 L474 396 L470 330 Q466 296 470 262 Z" fill="#05070a" opacity="0.45" />
        {/* Tuck: a little blousing over the belt. */}
        <path d="M458 391 q10 -5 21 -1 t21 0 t21 0 t26 1" stroke="#05070a" strokeWidth="1.4" fill="none" opacity="0.8" />
        <path d="M459 300 q8 6 6 17 M540 300 q-8 6 -6 17 M470 360 q6 10 2 24 M532 362 q-6 9 -2 22" stroke="#05070a" strokeWidth="1.3" fill="none" opacity="0.75" />
        {/* Placket with buttons, and a turned-down collar. */}
        <path d="M496 250 L504 250 L504 290 L496 290 Z" fill="#11151b" />
        <path d="M496 250 L496 290 M504 250 L504 290" stroke="#05070a" strokeWidth="1" />
        <circle cx="500" cy="262" r="1.6" fill="#2f3640" />
        <circle cx="500" cy="276" r="1.6" fill="#2f3640" />
        <path d="M486 242 L500 252 L493 266 L478 252 Z" fill="#1d232c" />
        <path d="M514 242 L500 252 L507 266 L522 252 Z" fill="#262c36" />
        <path d="M478 252 L493 266 M522 252 L507 266" stroke="#05070a" strokeWidth="1" />
        {/* Rim light: cool left, warm right. */}
        <path d="M446 262 Q440 300 451 332" fill="none" stroke="#7fb8e6" strokeWidth="1.4" opacity="0.5" />
        <path d="M556 262 Q563 300 553 332 L549 394" stroke="#ffcf9e" strokeWidth="1.6" fill="none" opacity="0.45" />
        <path d="M478 246 Q500 240 522 246" stroke="#4a5462" strokeWidth="1.2" fill="none" opacity="0.6" />

        {/* Black lanyard and credential. */}
        <path d="M488 250 L483 322 M512 250 L489 322" stroke="#05070a" strokeWidth="2.4" fill="none" />
        <path d="M488 250 L483 322" stroke="#3a424e" strokeWidth="0.8" fill="none" opacity="0.8" />
        <rect x="474" y="322" width="26" height="34" rx="2" fill="#e8edf3" />
        <rect x="474" y="322" width="26" height="8" rx="2" fill="#ff7a1a" />
        <rect x="479" y="334" width="9" height="10" rx="1" fill="#2a3442" />
        <path d="M491 336 h6 M491 340 h6 M479 349 h16" stroke="#8a97a6" strokeWidth="1.4" />

        {/* Neck and head. */}
        <path d="M489 222 L511 222 L512 250 L488 250 Z" fill="url(#wf-skin)" />
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
          {/* Black comms headset: band, ear cups, boom mic. */}
          <path d="M476 196 Q477 154 500 152 Q526 152 529 196" fill="none" stroke="#07090c" strokeWidth="4.5" />
          <path d="M480 172 Q490 156 506 155" fill="none" stroke="#3a424e" strokeWidth="1" opacity="0.8" />
          <ellipse cx="473" cy="201" rx="4" ry="6" fill="#07090c" />
          <ellipse cx="529" cy="205" rx="9.5" ry="12.5" fill="#07090c" />
          <ellipse cx="531" cy="204" rx="5" ry="8" fill="#1a1f27" />
          <path d="M527 215 Q526 227 512 225" fill="none" stroke="#07090c" strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="510.5" cy="225" rx="3.4" ry="2.8" fill="#1a1f27" />
        </g>

        {/* Coiled cable from the headset to the radio. */}
        <polyline points={CABLE} fill="none" stroke="#07090c" strokeWidth="1.6" />

        {/* Right arm (viewer's right): short black sleeve, hand on hip by the radio. */}
        <path d="M559 304 L577 300 L582 318 L566 382 L556 380 Z" fill="url(#wf-skin)" />
        <path d="M548 258 Q566 266 573 290 L578 304 L558 310 L554 294 Z" fill="url(#wf-shirt)" />
        <path d="M558 309 L578 303" stroke="#05070a" strokeWidth="2" />
        <path d="M566 266 Q574 282 578 302" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.45" />
        <ellipse cx="558" cy="386" rx="8" ry="9" fill="#b07a55" />

        {/* Left arm (viewer's left): short black sleeve, reaching to the console. */}
        <path d="M435 302 L453 306 L442 392 L428 390 Z" fill="url(#wf-skin)" />
        <path d="M452 262 Q437 272 435 294 L433 306 L454 309 L456 290 Z" fill="url(#wf-shirt)" />
        <path d="M433 306 L454 309" stroke="#05070a" strokeWidth="2" />
        <path d="M437 274 Q434 290 433 304" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />
      </g>

      {/* The hand resting on the console (settles now and then). */}
      <g className="ws-hand">
        <path d="M425 386 Q422 398 430 402 Q440 404 444 396 Q446 388 440 384 Z" fill="#a46e4d" />
        <path d="M428 398 Q434 401 440 397" stroke="#6b4129" strokeWidth="1" fill="none" />
      </g>

      {/* Black belt with a plain buckle, a small flashlight, and the radio. */}
      <rect x="455" y="388" width="94" height="13" rx="2" fill="#07090c" />
      <path d="M455 389 h94" stroke="#2f3640" strokeWidth="1" opacity="0.8" />
      <rect x="494" y="388.5" width="13" height="12" rx="2" fill="none" stroke="#a9b3be" strokeWidth="2" />
      <rect x="471" y="398" width="8" height="28" rx="3" fill="#0c0f14" />
      <rect x="470.5" y="423" width="9" height="6" rx="2" fill="#3a424d" />
      <rect x="539" y="394" width="23" height="44" rx="4" fill="#0a0d11" />
      <path d="M543 404 h15 M543 409 h15 M543 414 h15" stroke="#232932" strokeWidth="1.5" />
      <rect x="555" y="368" width="4" height="27" rx="2" fill="#0a0d11" />
      <circle cx="545" cy="397" r="1.6" fill="#3ddc84" />
      <path d="M562 398 L562 436" stroke="#ffcf9e" strokeWidth="1" opacity="0.35" />
    </g>
  );
}

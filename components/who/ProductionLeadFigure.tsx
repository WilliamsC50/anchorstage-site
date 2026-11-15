import type { ReactNode } from "react";

/**
 * Who It's For: the Production Company lead (DESIGN-15A.5).
 *
 * The production manager running the build: black long-sleeve crew shirt
 * with the sleeves pushed up, black work pants and boots, a comms earpiece
 * with its tube down to the radio on the belt, a credential on a black
 * lanyard, and a tablet held in both hands with the show checklist. Hair up
 * in a bun; slimmer build and a different face from the Freelancer
 * technician. Idle: reads the tablet, glances up toward the crew on stage,
 * returns to the schedule (CSS, off under reduced motion).
 *
 * Drawn in its own 960 x 600 space like TechnicianFigure (feet at y = 562,
 * the tablet centred at about x = 500, y = 352) and placed with a transform.
 * The tablet itself is passed in as `tablet` (local coordinates) so the
 * scene can make it interactive; it is drawn between the body and the hands.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */
export default function ProductionLeadFigure({ x, y, scale, tablet }: { x: number; y: number; scale: number; tablet: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="pl-figure">
      <defs>
        <linearGradient id="pl-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b5815f" />
          <stop offset="0.55" stopColor="#d6a483" />
          <stop offset="1" stopColor="#e7bd9b" />
        </linearGradient>
        <linearGradient id="pl-shirt" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0b0e13" />
          <stop offset="0.55" stopColor="#181d25" />
          <stop offset="1" stopColor="#272d37" />
        </linearGradient>
        <linearGradient id="pl-pants" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#090b0f" />
          <stop offset="0.55" stopColor="#14181e" />
          <stop offset="1" stopColor="#21262e" />
        </linearGradient>
        <linearGradient id="pl-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a1a12" />
          <stop offset="1" stopColor="#4a2f20" />
        </linearGradient>
      </defs>

      {/* Contact shadow. */}
      <ellipse cx="500" cy="561" rx="56" ry="6.5" fill="#000" opacity="0.5" />

      {/* Boots: weight on the viewer's-left leg, the other foot turned out. */}
      <path d="M466 540 h28 l2 10 q1 10 -8 10 h-32 q-6 0 -3 -9 z" fill="#0a0c10" />
      <path d="M509 538 h26 l9 10 q3 10 -6 11 h-30 q-6 0 -3 -9 z" fill="#0a0c10" />
      <rect x="456" y="556" width="40" height="4.5" rx="2" fill="#2c323b" />
      <rect x="503" y="555" width="42" height="4.5" rx="2" fill="#2c323b" />

      {/* Work pants. */}
      <path d="M468 398 L501 398 L497 470 L495 542 L466 542 L470 470 Z" fill="url(#pl-pants)" />
      <path d="M499 398 L533 398 L533 468 L537 540 L509 540 L503 468 Z" fill="url(#pl-pants)" />
      <path d="M495 402 L505 402 L502 446 L498 446 Z" fill="#06080b" />
      <path d="M484 404 L481 540 M519 404 L522 540" stroke="#05070a" strokeWidth="1" opacity="0.55" />
      <path d="M468 402 L466 542" stroke="#7fb8e6" strokeWidth="1.3" opacity="0.4" />
      <path d="M533 402 L537 540" stroke="#ffcf9e" strokeWidth="1.5" opacity="0.4" />

      {/* Belt, radio on the right hip, its earpiece tube. */}
      <rect x="464" y="388" width="72" height="11" rx="2" fill="#07090c" />
      <rect x="494" y="388.5" width="11" height="10" rx="2" fill="none" stroke="#9aa5b1" strokeWidth="1.8" />
      <rect x="533" y="390" width="20" height="38" rx="4" fill="#0a0d11" />
      <rect x="546" y="368" width="3.5" height="24" rx="1.75" fill="#0a0d11" />
      <circle cx="538" cy="394" r="1.4" fill="#3ddc84" />

      {/* Upper body: breathes as one group. */}
      <g className="ws-breathe">
        {/* Long-sleeve crew shirt. */}
        <path d="M476 248 Q500 241 524 248 L548 262 Q556 300 546 334 L540 396 L460 396 L454 334 Q444 300 452 262 Z" fill="url(#pl-shirt)" />
        <path d="M454 262 Q448 300 458 334 L462 396 L476 396 L472 330 Q469 296 472 262 Z" fill="#05070a" opacity="0.45" />
        <path d="M488 247 Q500 256 512 247" stroke="#2c333d" strokeWidth="2.2" fill="none" />
        <path d="M452 262 Q446 300 456 334" stroke="#7fb8e6" strokeWidth="1.4" fill="none" opacity="0.5" />
        <path d="M548 262 Q556 300 546 334 L540 394" stroke="#ffcf9e" strokeWidth="1.6" fill="none" opacity="0.45" />

        {/* Lanyard and credential (partly behind the tablet). */}
        <path d="M490 250 L487 312 M510 250 L493 312" stroke="#05070a" strokeWidth="2.2" fill="none" />
        <rect x="479" y="310" width="22" height="16" rx="2" fill="#e8edf3" />
        <rect x="479" y="310" width="22" height="6" rx="2" fill="#4ea8d1" />

        {/* Neck. */}
        <path d="M490 222 L510 222 L511 250 L489 250 Z" fill="url(#pl-skin)" />
        <path d="M490 230 Q500 238 510 230 L510 236 Q500 243 490 236 Z" fill="#8a5a3e" opacity="0.45" />

        {/* Head: glances between the tablet and the crew. */}
        <g className="pl-head">
          <path d="M478 192 Q478 228 500 232 Q522 228 522 192 Q522 164 500 164 Q478 164 478 192 Z" fill="url(#pl-skin)" />
          <path d="M480 204 Q484 226 498 231 Q486 216 485 200 Z" fill="#8a5a3e" opacity="0.35" />
          {/* Hair: swept back into a high bun, loose strands at the temple. */}
          <circle cx="507" cy="150" r="13" fill="url(#pl-hair)" />
          <path d="M476 196 Q472 160 500 156 Q528 156 525 196 Q520 176 506 172 Q490 170 482 180 Q478 188 476 196 Z" fill="url(#pl-hair)" />
          <path d="M478 190 Q480 202 478 212" stroke="#2a1a12" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path d="M488 164 Q502 158 516 166" stroke="#6b4a36" strokeWidth="1.6" fill="none" opacity="0.7" strokeLinecap="round" />
          <path d="M500 140 Q510 138 516 146" stroke="#6b4a36" strokeWidth="1.4" fill="none" opacity="0.6" strokeLinecap="round" />
          {/* Brows, eyes looking down at the tablet (pupils move on glance). */}
          <path d="M485 186 Q490 183.5 495 185 M505 185 Q510 183.5 515 186" stroke="#2a1a12" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M485 194 Q490 197 495 194 M505 194 Q510 197 515 194" stroke="#3a2418" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <g className="pl-eyes">
            <ellipse cx="490" cy="196.2" rx="2.2" ry="1.7" fill="#1a110c" />
            <ellipse cx="510" cy="196.2" rx="2.2" ry="1.7" fill="#1a110c" />
          </g>
          <path d="M501 200 L503 210 L498 211" stroke="#9a6a4c" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M494 219 Q500 221.5 507 218.5" stroke="#8a4a3a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <ellipse cx="510" cy="180" rx="8" ry="3" fill="#f2cdb0" opacity="0.35" />
          <path d="M522 190 Q522 222 506 231" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.45" />
          {/* Comms earpiece (viewer's right ear) and its clear tube. */}
          <ellipse cx="523" cy="200" rx="3.6" ry="6" fill="#c98f6c" />
          <circle cx="523" cy="201" r="2.6" fill="#0a0d11" />
        </g>
        <path d="M524 204 Q530 226 528 250 Q526 300 546 368" stroke="#c9d4de" strokeWidth="1.1" fill="none" opacity="0.55" />

        {/* Upper arms and pushed-up sleeves, elbows bent toward the tablet. */}
        <path d="M454 262 Q440 274 440 300 L442 330 L462 332 L464 300 Z" fill="url(#pl-shirt)" />
        <path d="M546 262 Q560 274 560 300 L558 330 L538 332 L536 300 Z" fill="url(#pl-shirt)" />
        <path d="M441 326 Q452 332 463 328" stroke="#05070a" strokeWidth="2.2" fill="none" />
        <path d="M537 328 Q548 332 559 326" stroke="#05070a" strokeWidth="2.2" fill="none" />
        <path d="M440 280 Q438 300 441 322" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />
        <path d="M560 280 Q562 300 559 322" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.45" />
        {/* Forearms reaching in to hold the tablet. */}
        <path d="M443 328 L462 332 L474 364 L460 372 Z" fill="url(#pl-skin)" />
        <path d="M538 332 L557 328 L540 372 L526 364 Z" fill="url(#pl-skin)" />
      </g>

      {/* The tablet (from the scene), then the hands over its edges. */}
      <g className="ws-breathe">
        {tablet}
        <path d="M455 360 Q452 374 462 378 Q470 380 472 370 L470 360 Z" fill="#cf9b78" />
        <path d="M545 360 Q548 374 538 378 Q530 380 528 370 L530 360 Z" fill="#dcab89" />
        <path d="M466 364 l7 -3 M534 364 l-7 -3" stroke="#a87455" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </g>
  );
}

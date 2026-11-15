/**
 * Who It's For: the Rental Warehouses & Providers scene's prep technician
 * (DESIGN-15A.12).
 *
 * A rental prep tech checking out an order on the stage at load-in: a
 * heather-grey sweatshirt with the sleeves pushed up under a navy softshell
 * work vest with orange reflective piping, charcoal cargo work pants with
 * knee seams, brown work boots, a roll of gaffer tape clipped at the hip,
 * a marker in the vest pocket, the printed pick list in one hand and a
 * pistol-grip asset scanner in the other. Short black undercut with the top
 * swept over, small studs. Distinct from the other five protagonists.
 *
 * The scanning arm (.rn-arm) rests slightly lowered and comes up to aim
 * when the visitor scans (RentalScene adds .is-scanned above); the
 * scanner's window flashes red during the scan (CSS; off under reduced
 * motion). Idle: a slow breath, a glance between the case and the pick
 * list.
 *
 * Drawn in its own 960 x 600 space like the other figures (feet at y = 562)
 * and placed with a transform. Decorative.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */
export default function RentalTechFigure({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="rn-figure">
      <defs>
        <linearGradient id="rn-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b6855d" />
          <stop offset="0.55" stopColor="#d2a17a" />
          <stop offset="1" stopColor="#e2b791" />
        </linearGradient>
        <linearGradient id="rn-vest" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#121a26" />
          <stop offset="0.55" stopColor="#1e2b3e" />
          <stop offset="1" stopColor="#2b3c55" />
        </linearGradient>
        <linearGradient id="rn-sweat" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6e747d" />
          <stop offset="0.55" stopColor="#8d939b" />
          <stop offset="1" stopColor="#a7adb5" />
        </linearGradient>
        <linearGradient id="rn-pants" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#16191e" />
          <stop offset="0.55" stopColor="#23272e" />
          <stop offset="1" stopColor="#31363e" />
        </linearGradient>
        <linearGradient id="rn-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d0b0a" />
          <stop offset="1" stopColor="#2a221d" />
        </linearGradient>
      </defs>

      {/* Contact shadow. */}
      <ellipse cx="500" cy="561" rx="60" ry="6.5" fill="#000" opacity="0.5" />

      {/* Brown work boots, orange laces. */}
      <path d="M461 536 h31 l2 15 q0 10 -9 10 h-31 q-6 0 -4 -10 z" fill="#3a2a1e" />
      <path d="M510 536 h31 l8 13 q2 12 -7 12 h-32 q-5 0 -3 -10 z" fill="#3a2a1e" />
      <path d="M455 557 h38 M507 557 h42" stroke="#15100b" strokeWidth="4" />
      <path d="M470 541 l12 0 M471 545 l11 0 M519 541 l12 0 M520 545 l11 0" stroke="#ff7a1a" strokeWidth="1.3" />
      <path d="M458 550 q8 -3 18 -1 M512 550 q9 -3 20 -1" stroke="#6b4a36" strokeWidth="1.1" fill="none" opacity="0.7" />

      {/* Charcoal cargo work pants: thigh pockets, knee seams. */}
      <path d="M465 398 L500 398 L496 470 L492 538 L460 538 L465 470 Z" fill="url(#rn-pants)" />
      <path d="M500 398 L535 398 L538 470 L542 538 L510 538 L505 470 Z" fill="url(#rn-pants)" />
      <path d="M466 434 h22 l-1 24 h-21 z M512 434 h22 l1 24 h-22 z" fill="#1b1f25" stroke="#3a3f47" strokeWidth="0.8" />
      <path d="M466 434 h22 M512 434 h22" stroke="#3a3f47" strokeWidth="2" />
      <path d="M463 480 q14 4 28 0 M509 480 q14 4 29 0" stroke="#3a3f47" strokeWidth="1.1" fill="none" />
      <path d="M465 402 L460 536" stroke="#7fb8e6" strokeWidth="1.2" opacity="0.35" />
      <path d="M535 402 L542 536" stroke="#ffcf9e" strokeWidth="1.4" opacity="0.38" />

      <g className="ws-breathe">
        {/* Sweatshirt under the vest (hem, collar). */}
        <path d="M454 300 L546 300 L548 404 L452 404 Z" fill="url(#rn-sweat)" />
        <path d="M452 396 h96 v8 h-96 z" fill="#7a8089" />
        <path d="M480 244 Q500 252 520 244 L522 256 Q500 264 478 256 Z" fill="#8d939b" />

        {/* Navy softshell work vest: zip, chest pockets, orange piping. */}
        <path d="M478 246 Q462 250 454 260 Q450 300 452 340 L452 396 L548 396 L548 340 Q550 300 546 260 Q538 250 522 246 Q510 258 500 258 Q490 258 478 246 Z" fill="url(#rn-vest)" />
        <path d="M454 260 Q450 300 452 340 L452 396 L466 396 L466 340 Q464 300 468 262 Z" fill="#05080d" opacity="0.38" />
        <path d="M500 258 V396" stroke="#0b1018" strokeWidth="1.6" />
        <path d="M500 262 V392" stroke="#5d6b80" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
        <rect x="498" y="276" width="4" height="6" rx="1" fill="#9aa5b1" />
        <path d="M466 292 h24 v18 h-24 z M510 292 h24 v18 h-24 z" fill="#18222f" stroke="#2c3a4e" strokeWidth="0.8" />
        <path d="M472 252 Q466 300 468 396 M528 252 Q534 300 532 396" stroke="#ff7a1a" strokeWidth="1.6" fill="none" opacity="0.9" />
        {/* Marker in the chest pocket. */}
        <rect x="517" y="283" width="3.2" height="12" rx="1" fill="#e8edf3" />
        <rect x="517" y="283" width="3.2" height="3.5" rx="1" fill="#15181d" />
        <path d="M454 260 Q450 300 452 340" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />
        <path d="M546 260 Q550 300 548 340 L548 394" stroke="#ffcf9e" strokeWidth="1.5" fill="none" opacity="0.42" />

        {/* Belt, and a roll of gaffer tape clipped at the right hip. */}
        <rect x="452" y="398" width="96" height="7" fill="#0c0e11" />
        <rect x="496" y="398" width="9" height="7" rx="1" fill="none" stroke="#8a96a3" strokeWidth="1.3" />
        <path d="M542 404 q4 6 0 11" stroke="#aab4bf" strokeWidth="1.6" fill="none" />
        <circle cx="546" cy="424" r="9.5" fill="#15181d" />
        <circle cx="546" cy="424" r="9.5" fill="none" stroke="#3a3f47" strokeWidth="1.2" />
        <circle cx="546" cy="424" r="4.6" fill="#b8a27a" />
        <circle cx="546" cy="424" r="3" fill="#20252c" />

        {/* Neck. */}
        <path d="M490 222 L510 222 L511 250 L489 250 Z" fill="url(#rn-skin)" />
        <path d="M490 230 Q500 238 510 230 L510 236 Q500 242 490 236 Z" fill="#7e5638" opacity="0.4" />

        {/* Head: glances between the case and the pick list. */}
        <g className="rn-head">
          <ellipse cx="478" cy="201" rx="3.2" ry="5.8" fill="#c08f68" />
          <ellipse cx="522" cy="201" rx="3.2" ry="5.8" fill="#d6a67f" />
          <circle cx="478" cy="206" r="1.2" fill="#e6c46a" />
          <circle cx="522" cy="206" r="1.2" fill="#e6c46a" />
          <path d="M478 194 Q478 227 500 233 Q522 227 522 194 Q522 166 500 166 Q478 166 478 194 Z" fill="url(#rn-skin)" />
          <path d="M480 204 Q484 226 498 232 Q486 216 485 200 Z" fill="#7e5638" opacity="0.3" />
          {/* Undercut: faded left side, the top swept over to the right. */}
          <path d="M477 196 Q475 176 482 168 L485 182 Q481 188 479 196 Z" fill="#3a332e" />
          <path d="M481 178 Q478 154 500 150 Q524 150 528 172 Q529 184 524 194 Q522 178 512 172 Q500 168 490 174 Q484 178 481 178 Z" fill="url(#rn-hair)" />
          <path d="M486 164 Q500 154 518 160 M490 170 Q504 162 520 168" stroke="#4a3d33" strokeWidth="1.1" fill="none" opacity="0.8" strokeLinecap="round" />
          {/* Brows; eyes down toward the case. */}
          <path d="M485 187 Q490 185 495 186.5 M505 186.5 Q510 185 515 187" stroke="#16110d" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="490" cy="195.6" rx="3.1" ry="1.9" fill="#f3e9df" />
          <ellipse cx="510" cy="195.6" rx="3.1" ry="1.9" fill="#f3e9df" />
          <g className="rn-eyes">
            <circle cx="488.6" cy="196.4" r="1.55" fill="#1d140e" />
            <circle cx="508.6" cy="196.4" r="1.55" fill="#1d140e" />
          </g>
          <path d="M486.6 194.3 Q490 192.5 493.4 194.3 M506.6 194.3 Q510 192.5 513.4 194.3" stroke="#1d140e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M501 199 L502.5 208 L498 209" stroke="#8e6040" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M495 219.5 Q500 220.8 505 219.2" stroke="#8a4a3a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <ellipse cx="510" cy="181" rx="7" ry="2.4" fill="#ecc9a6" opacity="0.35" />
          <path d="M522 192 Q522 222 507 231" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.4" />
        </g>

        {/* Pick-list arm (viewer's right): sleeve pushed up, the printed
            order list in hand. */}
        <path d="M546 260 Q560 272 562 302 L566 334 L548 338 L544 304 Z" fill="url(#rn-vest)" />
        <path d="M549 330 L566 326 L568 342 L551 346 Z" fill="#8d939b" />
        <path d="M551 344 L567 340 L566 392 L553 394 Z" fill="url(#rn-skin)" />
        <g transform="rotate(6 562 410)">
          <rect x="551" y="396" width="22" height="34" rx="1" fill="#f2efe7" />
          <path d="M555 403 h14 M555 408 h12 M555 413 h14 M555 418 h10 M555 423 h13" stroke="#8a97a6" strokeWidth="1.1" />
          <path d="M553.5 402.5 l1 1 l2 -2 M553.5 407.5 l1 1 l2 -2" stroke="#2f9e5f" strokeWidth="0.9" fill="none" />
        </g>
        <path d="M553 390 Q550 401 557 405 Q566 407 568 398 L566 390 Z" fill="#c99872" />

        {/* Scanning arm (viewer's left): comes up to aim when scanning. */}
        <g className="rn-arm">
          <path d="M454 260 Q440 274 438 304 L436 334 L456 338 L459 304 Z" fill="url(#rn-vest)" />
          <path d="M435 330 L455 334 L455 346 L434 343 Z" fill="#8d939b" />
          <path d="M436 342 L455 345 L444 396 L429 391 Z" fill="url(#rn-skin)" />
          <path d="M440 282 Q437 308 437 330" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />
          {/* Pistol-grip asset scanner, its window toward the case's tag. */}
          <g transform="translate(436 398) rotate(138)">
            <rect x="-3" y="1" width="10" height="18" rx="3" fill="#1b1f25" />
            <rect x="-6" y="-7" width="32" height="13" rx="4.5" fill="#2c323b" />
            <rect x="2" y="-7" width="13" height="2.6" rx="1" fill="#ff9a3c" />
            <rect x="23.5" y="-5.6" width="3" height="10.2" rx="1" fill="#3a1410" />
            <rect className="rn-window" x="23.5" y="-5.6" width="3" height="10.2" rx="1" fill="#ff3b2a" />
            <rect x="6" y="-4" width="10" height="5" rx="1" fill="#0f2233" />
          </g>
          <circle cx="436" cy="398" r="6.4" fill="#c99872" />
          <path d="M432 396 q4 -2 8 0" stroke="#8e6040" strokeWidth="0.9" fill="none" />
        </g>
      </g>
    </g>
  );
}

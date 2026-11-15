/**
 * Who It's For: the Musicians & Touring Acts scene's touring artist
 * (DESIGN-15A.8).
 *
 * A working guitarist at soundcheck: an oxblood button-up with the sleeves
 * rolled, black jeans, worn leather boots, a leather strap, and a sunburst
 * single-cut electric guitar. In-ear monitors with their cable, a wireless
 * in-ear pack on the belt. Shoulder-length auburn hair, fair skin, light
 * stubble; tilted toward the headstock, tuning by ear. Distinct from the
 * other four protagonists (polo, crew blacks, suit, utility jacket).
 *
 * Idle: a slow breath, a small tilt while listening, the tuning hand turning
 * the peg (CSS, off under reduced motion). When the rig is live
 * (MusicianScene adds .is-live above), the in-ear pack's light and the
 * clip-on tuner turn green.
 *
 * Drawn in its own 960 x 600 space like the other figures (feet at y = 562)
 * and placed with a transform. Decorative.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */
export default function MusicianFigure({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="mu-figure">
      <defs>
        <linearGradient id="mu-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c08f75" />
          <stop offset="0.55" stopColor="#dcae92" />
          <stop offset="1" stopColor="#ebc3a8" />
        </linearGradient>
        <linearGradient id="mu-shirt" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a1419" />
          <stop offset="0.55" stopColor="#5e2029" />
          <stop offset="1" stopColor="#772c36" />
        </linearGradient>
        <linearGradient id="mu-jeans" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0e1014" />
          <stop offset="0.55" stopColor="#1a1d23" />
          <stop offset="1" stopColor="#272b33" />
        </linearGradient>
        <linearGradient id="mu-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a2414" />
          <stop offset="1" stopColor="#7a3c20" />
        </linearGradient>
        <radialGradient id="mu-burst" cx="0.45" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#f0b25a" />
          <stop offset="0.55" stopColor="#c0611f" />
          <stop offset="1" stopColor="#3a140c" />
        </radialGradient>
      </defs>

      {/* Contact shadow. */}
      <ellipse cx="500" cy="561" rx="62" ry="6.5" fill="#000" opacity="0.5" />

      {/* Worn leather boots, a slightly wider stance. */}
      <path d="M458 540 h30 l2 12 q0 9 -8 9 h-30 q-6 0 -4 -9 z" fill="#3a2418" />
      <path d="M512 540 h30 l9 11 q2 10 -6 10 h-32 q-5 0 -3 -9 z" fill="#3a2418" />
      <path d="M452 558 h38 M509 558 h40" stroke="#1c120c" strokeWidth="3" />
      <path d="M463 546 q8 -2 18 0 M518 546 q9 -2 19 0" stroke="#6b4a36" strokeWidth="1.2" fill="none" opacity="0.7" />

      {/* Black jeans. */}
      <path d="M464 404 L500 404 L494 476 L489 542 L460 542 L465 476 Z" fill="url(#mu-jeans)" />
      <path d="M500 404 L536 404 L539 476 L543 542 L513 542 L506 476 Z" fill="url(#mu-jeans)" />
      <path d="M478 470 q6 4 12 0 M514 470 q6 4 12 0" stroke="#3a3f48" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M464 408 L460 540" stroke="#7fb8e6" strokeWidth="1.2" opacity="0.35" />
      <path d="M536 408 L543 540" stroke="#ffcf9e" strokeWidth="1.4" opacity="0.38" />

      <g className="ws-breathe">
        {/* Button-up shirt, untucked over the belt, collar open. */}
        <path d="M476 246 Q500 240 524 246 L550 260 Q558 300 550 340 L548 410 L452 410 L450 340 Q442 300 450 260 Z" fill="url(#mu-shirt)" />
        <path d="M450 260 Q442 300 450 340 L452 410 L466 410 L464 340 Q460 300 466 262 Z" fill="#14060a" opacity="0.4" />
        <path d="M488 246 L500 268 L512 246 Z" fill="url(#mu-skin)" />
        <path d="M486 245 L500 268 L493 274 L480 252 Z M514 245 L500 268 L507 274 L520 252 Z" fill="#4e1a22" />
        <path d="M500 268 L500 408" stroke="#2a0c11" strokeWidth="1.3" />
        {[290, 316, 342, 368].map((by) => (
          <circle key={by} cx="502.5" cy={by} r="1.3" fill="#c9a98f" />
        ))}
        <path d="M466 300 Q480 312 470 330 M534 300 Q522 316 530 334" stroke="#2a0c11" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M450 260 Q442 300 450 340" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />
        <path d="M550 260 Q558 300 550 340 L548 408" stroke="#ffcf9e" strokeWidth="1.5" fill="none" opacity="0.42" />

        {/* Belt (glimpsed at the side) and the wireless in-ear pack. */}
        <rect x="532" y="396" width="20" height="9" fill="#0c0d10" />
        <rect x="538" y="384" width="17" height="27" rx="3" fill="#15171c" />
        <rect x="550" y="374" width="2.5" height="11" rx="1" fill="#15171c" />
        <circle className="mu-pack-led" cx="546.5" cy="390" r="1.6" fill="#ff9a3c" />
        <path d="M540 398 h12 M540 402 h12" stroke="#2c323b" strokeWidth="1" />

        {/* Neck. */}
        <path d="M489 222 L511 222 L512 250 L488 250 Z" fill="url(#mu-skin)" />
        <path d="M489 230 Q500 238 511 230 L511 236 Q500 243 489 236 Z" fill="#8a5a46" opacity="0.4" />
        {/* In-ear cable from the right ear into the collar, then to the pack. */}
        <path d="M522 206 Q526 228 515 248" stroke="#d9e2ea" strokeWidth="1.1" fill="none" opacity="0.7" />

        {/* Head: tilted toward the headstock, listening. */}
        <g className="mu-head">
          {/* Hair behind, to the shoulders. */}
          <path d="M473 192 Q470 158 500 153 Q531 158 527 192 L532 240 Q524 247 517 238 L521 204 Q511 180 500 180 Q489 180 479 204 L483 238 Q476 247 468 240 Z" fill="url(#mu-hair)" />
          <path d="M477 194 Q477 228 500 234 Q523 228 523 194 Q523 166 500 166 Q477 166 477 194 Z" fill="url(#mu-skin)" />
          <path d="M479 204 Q483 226 498 233 Q486 216 485 200 Z" fill="#8a5a46" opacity="0.3" />
          {/* Light stubble along the jaw. */}
          <path d="M480 206 Q484 228 500 234 Q516 228 520 206 Q516 224 500 227 Q484 224 480 206 Z" fill="#7a4a34" opacity="0.28" />
          {/* Front hair, swept back from the forehead. */}
          <path d="M476 192 Q474 164 498 160 Q522 158 525 186 Q516 172 503 172 Q489 172 482 184 Q478 188 476 192 Z" fill="url(#mu-hair)" />
          <path d="M486 168 Q500 162 516 170 M482 182 Q492 174 504 174" stroke="#a0582f" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
          {/* Ears with in-ear monitors. */}
          <ellipse cx="477" cy="202" rx="3.2" ry="5.8" fill="#c99a80" />
          <ellipse cx="523" cy="202" rx="3.2" ry="5.8" fill="#dcae92" />
          <circle cx="477.5" cy="202" r="2" fill="#cfe3ee" opacity="0.85" />
          <circle cx="522.5" cy="202" r="2" fill="#cfe3ee" opacity="0.85" />
          {/* Brows; eyes down toward the headstock. */}
          <path d="M484.5 186.5 Q490 184 495.5 186 M504.5 186 Q510 184 515.5 186.5" stroke="#4a2414" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="490" cy="195.5" rx="3.2" ry="2" fill="#f3e9df" />
          <ellipse cx="510" cy="195.5" rx="3.2" ry="2" fill="#f3e9df" />
          <circle cx="491.4" cy="196.2" r="1.6" fill="#2b3a2e" />
          <circle cx="511.4" cy="196.2" r="1.6" fill="#2b3a2e" />
          <path d="M486.5 194 Q490 192.2 493.5 194 M506.5 194 Q510 192.2 513.5 194" stroke="#3a2418" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M501 199 L502.5 208.5 L498 209.5" stroke="#9a6a54" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M494.5 219 Q500 220.5 506 218.5" stroke="#8a4a3e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <ellipse cx="510" cy="180" rx="8" ry="2.8" fill="#f6d8c2" opacity="0.35" />
          <path d="M523 190 Q523 222 507 232" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.4" />
        </g>

        {/* Leather strap over the left shoulder to the guitar's tail. */}
        <path d="M546 256 Q520 300 480 360 L444 414" stroke="#4a2c1c" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M546 256 Q520 300 480 360 L444 414" stroke="#7a4e34" strokeWidth="1.2" fill="none" opacity="0.6" transform="translate(-2 -1)" />

        {/* Upper arms (rolled sleeves). */}
        <path d="M452 262 Q438 276 437 306 L436 336 L456 340 L460 306 Z" fill="url(#mu-shirt)" />
        <path d="M548 262 Q562 276 566 304 L578 326 L560 336 L546 306 Z" fill="url(#mu-shirt)" />
        <path d="M436 330 L457 334 L456 342 L435 338 Z M560 333 L578 323 L582 330 L564 340 Z" fill="#4e1a22" />
        <path d="M439 284 Q436 310 437 330" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />

        {/* The guitar: sunburst single-cut, neck up toward the left hand. */}
        <g transform="translate(470 398) rotate(-28)">
          <path
            d="M-42 0 C-42 -27 -19 -31 -3 -23 C7 -18 13 -25 25 -23 C35 -21 36 -9 30 -7 L30 7 C38 11 36 27 22 29 C6 31 -6 27 -14 29 C-33 33 -42 19 -42 0 Z"
            fill="url(#mu-burst)"
            stroke="#efe2c8"
            strokeWidth="1.2"
          />
          <rect x="-12" y="-9" width="8" height="18" rx="1.5" fill="#15110e" stroke="#c9b48a" strokeWidth="0.8" />
          <rect x="4" y="-9" width="8" height="18" rx="1.5" fill="#15110e" stroke="#c9b48a" strokeWidth="0.8" />
          <rect x="-24" y="-7" width="3" height="14" rx="1" fill="#c9d2dc" />
          <rect x="-32" y="-8" width="4" height="16" rx="1.2" fill="#9aa5b1" />
          {[
            [-22, 16],
            [-12, 20],
            [-24, 24],
            [-14, 27],
          ].map(([kx, ky]) => (
            <circle key={`${kx}-${ky}`} cx={kx} cy={ky} r="2.4" fill="#e6c46a" />
          ))}
          <circle cx="20" cy="-15" r="1.6" fill="#e6c46a" />
          {/* Neck, frets, inlays, headstock and tuners. */}
          <path d="M28 -4.4 L128 -3.6 L128 3.6 L28 4.4 Z" fill="#3a2418" />
          {[40, 52, 63, 73, 82, 90, 98, 105, 112, 118, 124].map((fx) => (
            <path key={fx} d={`M${fx} -4 v8`} stroke="#c9d2dc" strokeWidth="0.6" opacity="0.7" />
          ))}
          {[46, 68, 86, 101].map((ix) => (
            <rect key={ix} x={ix - 1.6} y="-1.4" width="3.2" height="2.8" fill="#efe2c8" opacity="0.8" />
          ))}
          <path d="M-28 -2.6 L128 -2.2 M-28 -0.9 L128 -0.7 M-28 0.9 L128 0.7 M-28 2.6 L128 2.2" stroke="#e8edf3" strokeWidth="0.45" opacity="0.7" />
          <path d="M128 -5 L152 -7.5 L155 0 L152 7.5 L128 5 Z" fill="#15110e" />
          {[134, 141, 148].map((tx) => (
            <g key={tx}>
              <circle cx={tx} cy="-9.5" r="2" fill="#c9d2dc" />
              <circle cx={tx} cy="9.5" r="2" fill="#c9d2dc" />
            </g>
          ))}
          {/* Clip-on tuner on the headstock: grey, green once the rig is live. */}
          <rect x="155" y="-5.5" width="13" height="11" rx="2" fill="#0b0e13" />
          <rect className="mu-tuner" x="157" y="-3.5" width="9" height="7" rx="1" fill="#2a313b" />
        </g>

        {/* Picking forearm resting on the body; hand by the pickups. */}
        <path d="M436 334 L457 340 L470 382 L452 388 Z" fill="url(#mu-skin)" />
        <path d="M450 380 Q446 394 458 398 Q470 400 474 390 L470 378 Z" fill="#dcae92" />
        <path d="M460 386 l8 -2" stroke="#9a6a54" strokeWidth="1.1" strokeLinecap="round" />

        {/* Fretting arm: forearm up to the headstock, turning a tuner. */}
        <g className="mu-tune">
          <path d="M562 336 L580 326 L596 322 L590 336 Z" fill="url(#mu-skin)" />
          <path d="M589 316 Q584 326 592 334 Q602 338 606 330 L604 318 Q598 312 589 316 Z" fill="#e3b79c" />
          <path d="M594 318 q4 -4 9 -1" stroke="#9a6a54" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}

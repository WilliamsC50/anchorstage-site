/**
 * Who It's For: the Musicians & Touring Acts scene's touring artist
 * (DESIGN-15A.8; redrawn in DESIGN-15A.9).
 *
 * A working guitarist playing through soundcheck. Contemporary stagewear: a
 * black bomber jacket with a rust lining and ribbed collar, cuffs, and hem
 * over a cream tee, a thin silver chain, black slim trousers, black Chelsea
 * boots. A dark textured quiff with faded sides and a short boxed beard.
 * Touring kit: custom in-ear monitors with coiled cables, a wireless in-ear
 * pack clipped at the hip, a woven strap, a guitar cable down to the
 * pedalboard. Distinct from the other four protagonists.
 *
 * The guitar (redrawn in DESIGN-15A.11) is a sunburst single-cut electric
 * at the figure's own scale: a 17.25" body with its single cutaway on the
 * treble side, a bound board to the 22nd fret on a 24.75" scale, two
 * humbuckers, bridge and stopbar, gold knobs, a cream guard, an open-book
 * headstock with cream tuner buttons. Slung at the hip, neck at 22 degrees;
 * the fretting hand holds a chord around the fifth fret, the picking hand
 * is over the strings between the pickups; the strap runs from the upper
 * horn over the left shoulder and from the tail around the hip, and the
 * cable leaves the jack on the lower bout for the pedalboard.
 *
 * Idle: a slow breath, a small nod while listening, the picking hand moving
 * (CSS, off under reduced motion). When the rig is live (MusicianScene adds
 * .is-live above), the in-ear pack's light turns green.
 *
 * Drawn in its own 960 x 600 space like the other figures (feet at y = 562)
 * and placed with a transform. Decorative.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */

// Guitar frame (DESIGN-15A.11): x along the strings, y across (bass side
// negative), drawn at the figure's own scale (about 6 units to the inch;
// the figure is about 70" tall). A single-cut solid body: body 17.25" long
// (tail at x -55) and 13" across the lower bout; 24.75" scale with the
// saddles 5.75" from the tail, so the nut sits at x 128, the body's neck end
// at about the 14th fret and the cutaway horn at the 16th; the board runs
// to the 22nd fret; headstock about 7". Hardware is kept to what reads at
// normal viewing size.
const SADDLE = -20.5;
const NUT = 128;
const SCALE = NUT - SADDLE;
const fretX = (n: number) => NUT - SCALE * (1 - Math.pow(2, -n / 12));
const BOARD_END = 20;
// Board half-width: about 2.2" at the body end, 1.69" at the nut.
const halfW = (x: number) => 6.6 - ((x - BOARD_END) / (NUT - BOARD_END)) * 1.5;
const FRETS = Array.from({ length: 22 }, (_, i) => fretX(i + 1));
const INLAYS = [3, 5, 7, 9, 12, 15, 17, 19, 21].map((n) => (fretX(n - 1) + fretX(n)) / 2);
// Strings: about 2.05" apart at the bridge, 1.4" at the nut (low E first).
const STRINGS = [-6.15, -3.69, -1.23, 1.23, 3.69, 6.15].map((b) => ({ b, n: b * 0.683 }));
// Tuner posts: low E, A, D on the bass side; high E, B, G on the treble side.
const POSTS = [140, 148, 156];
const EDGE = [6.9, 8.2, 9.6];
const postX = (i: number) => POSTS[i < 3 ? i : 5 - i];
const postY = (i: number) => (i < 3 ? -(5.2 + i * 0.8) : 5.2 + (5 - i) * 0.8);
const BODY =
  "M-55 0 C-55 -24 -42 -39 -22 -39 C-8 -39 -3 -28 5 -27.5 C15 -27 22 -31 32 -30 C43 -29 50 -20 49 -10 L47 -6 L47 6 L42 7.5 C39 9 35 13.5 32.5 18 C30.5 22 30 28 19 30.5 C10 31.5 6 26.5 0 27.5 C-6 28.5 -9 39 -24 39 C-42 39 -55 26 -55 0 Z";

/** The guitarist's single-cut electric, to scale. Decorative. */
function Guitar() {
  return (
    <g transform="translate(470 412) rotate(-22)">
      <defs>
        <radialGradient id="mu-burst" cx="0.36" cy="0.55" r="0.66">
          <stop offset="0" stopColor="#f7cb78" />
          <stop offset="0.4" stopColor="#e0923a" />
          <stop offset="0.74" stopColor="#8a3414" />
          <stop offset="1" stopColor="#2a0d07" />
        </radialGradient>
        <linearGradient id="mu-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef2f6" />
          <stop offset="0.55" stopColor="#9aa5b1" />
          <stop offset="1" stopColor="#d7dee6" />
        </linearGradient>
      </defs>
      {/* Body: side for depth, then the carved, bound top. */}
      <path d={BODY} fill="#3a1408" transform="translate(1.6 2.8)" />
      <path d={BODY} fill="url(#mu-burst)" stroke="#f1e6cc" strokeWidth="1.6" />
      <path d="M-49 -10 C-44 -30 -24 -35 -8 -32 C2 -30 8 -25 16 -25" stroke="#fff4de" strokeWidth="2.6" fill="none" opacity="0.3" strokeLinecap="round" />
      <path d="M-50 12 C-46 30 -28 36 -12 35" stroke="#160602" strokeWidth="3" fill="none" opacity="0.3" strokeLinecap="round" />
      {/* Raised cream pickguard on the treble side. */}
      <path d="M8 9.5 L30.5 10 Q33.5 13.5 31.5 19 Q27.5 26.5 18 27.5 Q9.5 27 8.5 19 Z" fill="#ecdfc4" opacity="0.94" />
      {/* Two humbuckers in cream surrounds. */}
      {[-12, 14.5].map((cx) => (
        <g key={cx}>
          <rect x={cx - 6} y="-9.9" width="12" height="19.8" rx="2" fill="#efe2c8" />
          <rect x={cx - 4.5} y="-8.25" width="9" height="16.5" rx="1.4" fill="#16110d" />
          <path d={`M${cx} -8.25 v16.5`} stroke="#3a3029" strokeWidth="0.7" />
        </g>
      ))}
      {/* Bridge and stopbar tailpiece. */}
      <rect x="-22" y="-8.6" width="3.2" height="17.2" rx="1" fill="url(#mu-chrome)" />
      <rect x="-33" y="-9.6" width="5" height="19.2" rx="2.2" fill="url(#mu-chrome)" />
      {/* Volume and tone knobs, selector switch, output jack, strap buttons. */}
      {[
        [-38, 16],
        [-25, 19],
        [-41, 27.5],
        [-28, 30.5],
      ].map(([kx, ky]) => (
        <g key={`${kx}-${ky}`}>
          <circle cx={kx} cy={ky} r="3.7" fill="#b8892f" />
          <circle cx={kx} cy={ky} r="2.4" fill="#e6c46a" />
        </g>
      ))}
      <circle cx="23" cy="-22" r="3" fill="#efe2c8" />
      <path d="M23 -22 l2.8 -4.4" stroke="#d7dee6" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="-30" cy="37.6" r="2" fill="#c9d2dc" />
      <circle cx="-55" cy="0" r="1.8" fill="#c9d2dc" />
      <circle cx="44" cy="-22" r="1.8" fill="#c9d2dc" />

      {/* Neck: bound rosewood board, frets on the scale, trapezoid inlays. */}
      <path d={`M${BOARD_END} ${-halfW(BOARD_END)} L${NUT} ${-halfW(NUT)} L${NUT} ${halfW(NUT)} L${BOARD_END} ${halfW(BOARD_END)} Z`} fill="#2b1a10" />
      <path d={`M${BOARD_END} ${-halfW(BOARD_END)} L${NUT} ${-halfW(NUT)} M${BOARD_END} ${halfW(BOARD_END)} L${NUT} ${halfW(NUT)}`} stroke="#efe2c8" strokeWidth="0.9" />
      {FRETS.map((fx) => (
        <path key={fx} d={`M${fx} ${-halfW(fx) + 0.4} V${halfW(fx) - 0.4}`} stroke="#c9d2dc" strokeWidth="0.6" opacity="0.85" />
      ))}
      {INLAYS.map((ix) => {
        const h = halfW(ix) - 1.8;
        return <path key={ix} d={`M${ix - 2.2} ${-h + 0.5} L${ix + 2.2} ${-h} L${ix + 2.2} ${h} L${ix - 2.2} ${h - 0.5} Z`} fill="#efe6d2" opacity="0.9" />;
      })}
      <rect x={NUT - 0.4} y={-halfW(NUT)} width="2" height={halfW(NUT) * 2} fill="#f3ead6" />
      {/* Open-book headstock, truss-rod cover, tuners. */}
      <path d={`M${NUT + 1.6} -5.1 L160 -10.2 Q165 -10.8 167 -8.2 L170.5 -3 L168.4 0 L170.5 3 L167 8.2 Q165 10.8 160 10.2 L${NUT + 1.6} 5.1 Z`} fill="#15110e" />
      <path d={`M${NUT + 3} -2.4 Q${NUT + 6.5} -3.8 ${NUT + 10} -3 L${NUT + 10} 3 Q${NUT + 6.5} 3.8 ${NUT + 3} 2.4 Z`} fill="#ece2cc" />
      {POSTS.map((px, k) => (
        <g key={px}>
          <path d={`M${px} ${-EDGE[k]} v-1.6 M${px} ${EDGE[k]} v1.6`} stroke="#aab4bf" strokeWidth="1.1" />
          <ellipse cx={px} cy={-EDGE[k] - 3.4} rx="2.1" ry="2.8" fill="#efe6d2" />
          <ellipse cx={px} cy={EDGE[k] + 3.4} rx="2.1" ry="2.8" fill="#efe6d2" />
          <circle cx={px} cy={-(5.2 + k * 0.8)} r="1.2" fill="#d7dee6" />
          <circle cx={px} cy={5.2 + k * 0.8} r="1.2" fill="#d7dee6" />
        </g>
      ))}
      {/* Strings: stopbar, over the bridge and nut, to the posts. */}
      {STRINGS.map(({ b, n }, i) => (
        <path key={b} d={`M-30.5 ${b * 1.05} L${SADDLE} ${b} L${NUT} ${n} L${postX(i)} ${postY(i)}`} stroke="#eef2f6" strokeWidth={i < 3 ? 0.6 : 0.42} fill="none" opacity="0.85" />
      ))}
    </g>
  );
}

export default function MusicianFigure({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="mu-figure">
      <defs>
        <linearGradient id="mu-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c4967a" />
          <stop offset="0.55" stopColor="#e0b396" />
          <stop offset="1" stopColor="#edc6aa" />
        </linearGradient>
        <linearGradient id="mu-jacket" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0b0c0f" />
          <stop offset="0.55" stopColor="#1b1d22" />
          <stop offset="1" stopColor="#2c2f36" />
        </linearGradient>
        <linearGradient id="mu-pants" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0c0d10" />
          <stop offset="0.55" stopColor="#17191e" />
          <stop offset="1" stopColor="#24272d" />
        </linearGradient>
        <linearGradient id="mu-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#120e0b" />
          <stop offset="1" stopColor="#3b2c22" />
        </linearGradient>
        <linearGradient id="mu-boot" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#08090b" />
          <stop offset="1" stopColor="#262a30" />
        </linearGradient>
      </defs>

      {/* Contact shadow. */}
      <ellipse cx="500" cy="561" rx="64" ry="6.5" fill="#000" opacity="0.5" />

      {/* Black Chelsea boots: elastic side panels, stacked heels, shine. */}
      <path d="M458 538 h31 l2 13 q0 10 -9 10 h-30 q-6 0 -4 -10 z" fill="url(#mu-boot)" />
      <path d="M512 538 h31 l9 12 q2 11 -7 11 h-32 q-5 0 -3 -10 z" fill="url(#mu-boot)" />
      <path d="M466 540 q4 6 0 12 M521 540 q4 6 0 12" stroke="#3a3f47" strokeWidth="2.4" fill="none" opacity="0.8" />
      <path d="M452 558 h12 M543 558 h10" stroke="#05060a" strokeWidth="3.4" />
      <path d="M470 549 q8 -2 16 0 M526 548 q9 -2 18 0" stroke="#8a96a3" strokeWidth="1.1" fill="none" opacity="0.55" />

      {/* Strap from the tail button around the hip (behind the body). */}
      <path d="M419 433 Q432 424 452 418" stroke="#1d2f4a" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M419 433 Q432 424 452 418" stroke="#ff7a1a" strokeWidth="1.2" strokeDasharray="5 4" fill="none" opacity="0.85" />

      {/* Black slim trousers with soft knee folds. */}
      <path d="M465 400 L500 400 L495 474 L490 540 L460 540 L465 474 Z" fill="url(#mu-pants)" />
      <path d="M500 400 L535 400 L539 474 L543 540 L513 540 L506 474 Z" fill="url(#mu-pants)" />
      <path d="M472 468 q8 5 16 0 M512 468 q9 5 18 0 M478 500 q5 3 10 0" stroke="#353a43" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M465 404 L460 538" stroke="#7fb8e6" strokeWidth="1.2" opacity="0.35" />
      <path d="M535 404 L543 538" stroke="#ffcf9e" strokeWidth="1.4" opacity="0.38" />

      <g className="ws-breathe">
        {/* Cream tee and a thin silver chain. */}
        <path d="M482 246 L518 246 L516 402 L484 402 Z" fill="#e6dfd1" />
        <path d="M484 320 L516 320 L516 402 L484 402 Z" fill="#cbc3b4" opacity="0.4" />
        <path d="M489 250 Q500 270 511 250" stroke="#c9d2dc" strokeWidth="0.9" fill="none" />

        {/* Black bomber, open: rust lining at the edges, ribbed collar and hem. */}
        <path d="M478 244 Q462 248 451 260 Q443 300 449 340 L447 398 L490 400 L488 330 L486 250 Z" fill="url(#mu-jacket)" />
        <path d="M522 244 Q538 248 549 260 Q557 300 551 340 L553 398 L510 400 L512 330 L514 250 Z" fill="url(#mu-jacket)" />
        <path d="M486 252 L488 330 L490 398 M514 252 L512 330 L510 398" stroke="#b5561f" strokeWidth="2.2" fill="none" />
        <path d="M451 260 Q443 300 449 340 L447 398 L461 399 L461 340 Q457 300 463 262 Z" fill="#000" opacity="0.35" />
        <path d="M479 242 Q500 251 521 242" stroke="#22252b" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <path d="M447 392 L490 394 L490 404 L446 402 Z M510 394 L553 392 L554 402 L510 404 Z" fill="#17191d" />
        <path
          d="M452 395 v8 M458 395 v8 M464 395 v8 M470 395 v8 M476 395 v8 M482 395 v8 M516 395 v8 M522 395 v8 M528 395 v8 M534 395 v8 M540 395 v8 M546 395 v8"
          stroke="#2c2f36"
          strokeWidth="0.9"
        />
        <path d="M451 260 Q443 300 449 340" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />
        <path d="M549 260 Q557 300 551 340 L553 396" stroke="#ffcf9e" strokeWidth="1.5" fill="none" opacity="0.42" />
        <path d="M470 290 Q478 300 474 318 M530 290 Q522 302 527 320" stroke="#33363d" strokeWidth="1.1" fill="none" opacity="0.8" />

        {/* Wireless in-ear pack clipped at the hip. */}
        <rect x="536" y="396" width="17" height="26" rx="3" fill="#15171c" />
        <rect x="548" y="386" width="2.5" height="11" rx="1" fill="#15171c" />
        <circle className="mu-pack-led" cx="544.5" cy="402" r="1.6" fill="#ff9a3c" />
        <path d="M539 410 h11 M539 414 h11" stroke="#2c323b" strokeWidth="1" />

        {/* Neck; coiled in-ear cable from the right ear into the collar. */}
        <path d="M489 222 L511 222 L512 250 L488 250 Z" fill="url(#mu-skin)" />
        <path d="M489 230 Q500 238 511 230 L511 236 Q500 243 489 236 Z" fill="#8a5a46" opacity="0.4" />
        <path d="M523 208 q4 5 0 9 q-4 4 0 8 q4 4 0 8 Q519 244 514 250" stroke="#dfe8ef" strokeWidth="1.1" fill="none" opacity="0.75" />

        {/* Head: nods slightly, listening to the mix. */}
        <g className="mu-head">
          <ellipse cx="477" cy="201" rx="3.3" ry="6" fill="#c4967a" />
          <ellipse cx="523" cy="201" rx="3.3" ry="6" fill="#e0b396" />
          <path d="M477 194 Q477 226 491 234 Q500 238 509 234 Q523 226 523 194 Q523 165 500 165 Q477 165 477 194 Z" fill="url(#mu-skin)" />
          <path d="M479 204 Q483 226 497 233 Q486 216 485 200 Z" fill="#8a5a46" opacity="0.3" />
          {/* Custom in-ear molds. */}
          <circle cx="477.6" cy="201.5" r="2.5" fill="#d6e6f0" />
          <circle cx="522.4" cy="201.5" r="2.5" fill="#d6e6f0" />
          <circle cx="522.4" cy="201.5" r="0.9" fill="#4ea8d1" />
          {/* Short boxed beard and moustache. */}
          <path d="M478 204 Q479 230 500 239 Q521 230 522 204 Q518 224 509 226 Q500 221 491 226 Q482 224 478 204 Z" fill="#241c17" opacity="0.92" />
          <path d="M490 213 Q500 209 510 213 Q500 216.5 490 213 Z" fill="#241c17" />
          <path d="M494.5 220.5 Q500 222.8 505.5 220.5" stroke="#9a5a4a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          {/* Textured quiff: faded sides, volume swept up and over. */}
          <path d="M477 196 Q475 176 481 168 L484 182 Q480 188 479 196 Z M523 196 Q525 176 519 168 L516 182 Q520 188 521 196 Z" fill="#3a332e" />
          <path d="M480 176 Q476 151 494 143 Q513 137 527 150 Q533 161 524 177 Q520 166 506 164 Q492 164 484 174 Z" fill="url(#mu-hair)" />
          <path d="M488 152 Q500 141 517 146 M484 165 Q496 151 513 151 M494 160 Q507 150 522 157" stroke="#5c4636" strokeWidth="1.1" fill="none" opacity="0.75" strokeLinecap="round" />
          {/* Brows; eyes down on the fretboard. */}
          <path d="M484 186 Q490 183 496 185 M504 185 Q510 183 516 186" stroke="#1c1714" strokeWidth="2.3" fill="none" strokeLinecap="round" />
          <ellipse cx="490" cy="195.6" rx="3.2" ry="1.9" fill="#f3e9df" />
          <ellipse cx="510" cy="195.6" rx="3.2" ry="1.9" fill="#f3e9df" />
          <circle cx="491.6" cy="196.4" r="1.55" fill="#3a2a1e" />
          <circle cx="511.6" cy="196.4" r="1.55" fill="#3a2a1e" />
          <path d="M486.4 194.3 Q490 192.4 493.6 194.3 M506.4 194.3 Q510 192.4 513.6 194.3" stroke="#2a1e16" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M501 199 L502.8 208.5 L498 209.5" stroke="#9a6a54" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <ellipse cx="510" cy="180" rx="8" ry="2.6" fill="#f6d8c2" opacity="0.35" />
          <path d="M523 190 Q523 222 507 232" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.4" />
        </g>

        {/* Upper sleeves. */}
        <path d="M451 260 Q436 274 435 304 L432 338 L453 343 L458 306 Z" fill="url(#mu-jacket)" />
        <path d="M549 260 Q563 274 566 304 L572 336 L552 342 L546 306 Z" fill="url(#mu-jacket)" />
        <path d="M437 284 Q434 310 433 334" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />
        <rect x="553" y="290" width="9" height="11" rx="1.5" fill="#2a2d33" transform="rotate(8 557 295)" />

        {/* Woven strap over the left shoulder to the upper horn. */}
        <path d="M547 256 Q530 302 503 376" stroke="#1d2f4a" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M547 256 Q530 302 503 376" stroke="#ff7a1a" strokeWidth="1.2" strokeDasharray="5 4" fill="none" opacity="0.85" />

        <Guitar />

        {/* Guitar cable from the output jack down to the pedalboard. */}
        <path d="M456 458 Q446 490 452 520 Q458 552 470 566" stroke="#0b0d10" strokeWidth="2.2" fill="none" strokeLinecap="round" />

        {/* Fretting arm: sleeve to the wrist, the hand holding a chord. */}
        <path d="M552 338 L572 332 L575 362 L558 368 Z" fill="url(#mu-jacket)" />
        <path d="M557 364 L575 358 L576 366 L559 372 Z" fill="#17191d" />
        <path d="M549 364 Q543 375 549 384 Q557 389 565 383 Q570 374 566 366 Z" fill="url(#mu-skin)" />
        <path d="M551 368 Q548 362 553 360 Q557 361 556 367" fill="#d8a98c" />
        <path d="M551 376 l9 -3 M552 381 l9 -3" stroke="#9a6a54" strokeWidth="1" strokeLinecap="round" />

        {/* Picking arm over the body; the hand over the bridge pickup. */}
        <path d="M431 334 L452 340 L472 390 L456 397 Z" fill="url(#mu-jacket)" />
        <path d="M456 393 L472 387 L475 395 L459 401 Z" fill="#17191d" />
        <g className="mu-strum">
          <path d="M459 398 Q454 410 462 417 Q472 422 480 414 Q484 404 476 397 Z" fill="url(#mu-skin)" />
          <path d="M465 408 l9 -2 M466 413 l8 -2" stroke="#9a6a54" strokeWidth="1" strokeLinecap="round" />
          <path d="M477 414 l4 3 l-4 2 z" fill="#efe2c8" />
          <circle cx="473" cy="404" r="1.1" fill="#c9d2dc" />
        </g>
      </g>
    </g>
  );
}

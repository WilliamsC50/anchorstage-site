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
 * The guitar is a sunburst single-cut electric drawn to proportion (body
 * about 94 x 72, neck and headstock to scale in the figure's space): carved
 * top with binding, two humbuckers with pole pieces, a tune-o-matic bridge
 * and stopbar, four top-hat knobs, a raised pickguard, the selector switch,
 * a bound rosewood board with frets on a real fret scale and trapezoid
 * inlays, six strings from the stopbar to the tuners, an open-book headstock
 * with keystone tuners, and a clip-on tuner. Slung at the hip, neck angled
 * up; the fretting hand holds a chord around the fifth fret, the picking
 * hand rests over the bridge pickup.
 *
 * Idle: a slow breath, a small nod while listening, the picking hand moving
 * (CSS, off under reduced motion). When the rig is live (MusicianScene adds
 * .is-live above), the in-ear pack's light and the clip-on tuner turn green.
 *
 * Drawn in its own 960 x 600 space like the other figures (feet at y = 562)
 * and placed with a transform. Decorative.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */

// Guitar frame: x along the strings (tail -48 to headstock tip 166), y
// across (bass side negative). Nut at x 133, bridge saddles at x -10.5.
const NUT = 133;
const SCALE = NUT + 10.5;
const fretX = (n: number) => NUT - SCALE * (1 - Math.pow(2, -n / 12));
const FRETS = Array.from({ length: 19 }, (_, i) => fretX(i + 1));
const INLAYS = [3, 5, 7, 9, 12, 15].map((n) => (fretX(n - 1) + fretX(n)) / 2);
// String y at the bridge and at the nut, bass (low E) first.
const STRINGS = [-3.6, -2.2, -0.75, 0.75, 2.2, 3.6].map((b) => ({ b, n: b * 0.86 }));

function Guitar() {
  return (
    <g transform="translate(472 410) rotate(-24)">
      <defs>
        <radialGradient id="mu-burst" cx="0.42" cy="0.55" r="0.62">
          <stop offset="0" stopColor="#f3c06a" />
          <stop offset="0.45" stopColor="#d4802e" />
          <stop offset="0.8" stopColor="#7a2c12" />
          <stop offset="1" stopColor="#2a0d07" />
        </radialGradient>
      </defs>
      {/* Body: single cutaway on the treble side, binding, carved-top light. */}
      <path
        d="M-48 0 C-48 -28 -31 -37 -13 -34 C-1 -32 6 -26 15 -27 C30 -29 42 -21 41 -9 L38 -5 L38 5 C30 7 23 11 21 16 C19 22 22 28 16 32 C6 39 -8 39 -20 37 C-39 34 -48 21 -48 0 Z"
        fill="url(#mu-burst)"
        stroke="#efe2c8"
        strokeWidth="1.3"
      />
      <path d="M-40 -14 C-34 -28 -16 -31 -4 -26" stroke="#fff3dc" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M-44 10 C-40 26 -24 33 -8 33" stroke="#1a0804" strokeWidth="2.4" fill="none" opacity="0.35" strokeLinecap="round" />
      {/* Raised pickguard (treble side, by the neck pickup). */}
      <path d="M8 7 Q18 5 28 9 Q31 17 24 24 Q12 27 6 19 Z" fill="#eadcc0" opacity="0.92" />
      {/* Humbuckers with cream bezels and pole pieces. */}
      {[19, -2].map((px) => (
        <g key={px}>
          <rect x={px - 1} y="-10" width="11" height="20" rx="1.6" fill="#efe2c8" />
          <rect x={px} y="-9" width="9" height="18" rx="1.2" fill="#14100d" />
          {[-6.2, -3.7, -1.2, 1.2, 3.7, 6.2].map((py) => (
            <circle key={py} cx={px + 2.6} cy={py} r="0.75" fill="#aab4bf" />
          ))}
        </g>
      ))}
      {/* Tune-o-matic bridge and stopbar tailpiece. */}
      <rect x="-12.2" y="-8.6" width="3.4" height="17.2" rx="1" fill="#c9d2dc" />
      <path d="M-11.3 -6 v12" stroke="#7b8693" strokeWidth="0.5" />
      <rect x="-22" y="-9.6" width="4.6" height="19.2" rx="2" fill="#aab4bf" />
      <path d="M-21 -8.5 v17" stroke="#eef2f6" strokeWidth="0.7" opacity="0.7" />
      {/* Top-hat knobs and the selector switch. */}
      {[
        [-29, 14],
        [-18, 18],
        [-31, 25],
        [-20, 29],
      ].map(([kx, ky]) => (
        <g key={`${kx}-${ky}`}>
          <circle cx={kx} cy={ky} r="3.3" fill="#c79a3c" />
          <circle cx={kx} cy={ky} r="2" fill="#e6c46a" />
        </g>
      ))}
      <circle cx="22" cy="-21" r="2.2" fill="#efe2c8" />
      <path d="M22 -21 l2.4 -4" stroke="#c9d2dc" strokeWidth="1" strokeLinecap="round" />
      <circle cx="-48" cy="0" r="1.6" fill="#c9d2dc" />
      <circle cx="40" cy="-17" r="1.5" fill="#c9d2dc" />

      {/* Bound rosewood neck, frets on a real scale, trapezoid inlays. */}
      <path d={`M37 -4.8 L${NUT} -4.2 L${NUT} 4.2 L37 4.8 Z`} fill="#2e1c12" />
      <path d={`M37 -4.8 L${NUT} -4.2 M37 4.8 L${NUT} 4.2`} stroke="#efe2c8" strokeWidth="0.7" />
      {FRETS.filter((fx) => fx > 38).map((fx) => (
        <path key={fx} d={`M${fx} -4.4 v8.8`} stroke="#d7dee6" strokeWidth="0.55" />
      ))}
      {INLAYS.map((ix) => (
        <path key={ix} d={`M${ix - 1.8} -2.6 L${ix + 1.8} -3 L${ix + 1.8} 3 L${ix - 1.8} 2.6 Z`} fill="#efe6d2" opacity="0.9" />
      ))}
      <rect x={NUT - 0.6} y="-4.4" width="1.6" height="8.8" fill="#efe2c8" />
      {/* Open-book headstock, truss-rod cover, keystone tuners. */}
      <path d={`M${NUT + 1} -5 L158 -8.6 Q163 -9.2 164.5 -6 L166 -2 L164 0 L166 2 L164.5 6 Q163 9.2 158 8.6 L${NUT + 1} 5 Z`} fill="#15110e" />
      <path d={`M${NUT + 3} -2 L${NUT + 9} -3.2 L${NUT + 9} 3.2 L${NUT + 3} 2 Z`} fill="#e9dcc2" />
      {[143, 150.5, 158].map((tx, i) => (
        <g key={tx}>
          <circle cx={tx} cy={-5.2 + i * -0.5} r="0.9" fill="#c9d2dc" />
          <circle cx={tx} cy={5.2 + i * 0.5} r="0.9" fill="#c9d2dc" />
          <rect x={tx - 2} y={-13.5 - i * 0.5} width="4" height="4.2" rx="1.6" fill="#efe2c8" />
          <rect x={tx - 2} y={9.3 + i * 0.5} width="4" height="4.2" rx="1.6" fill="#efe2c8" />
          <path d={`M${tx} ${-9.4 - i * 0.5} v3 M${tx} ${9.4 + i * 0.5} v-3`} stroke="#aab4bf" strokeWidth="1" />
        </g>
      ))}
      {/* Strings: stopbar, over the saddles, to the nut, then to the posts. */}
      {STRINGS.map(({ b, n }, i) => {
        const post = [143, 150.5, 158][i < 3 ? 2 - i : i - 3];
        const py = i < 3 ? -5.2 - (2 - i) * 0.5 : 5.2 + (i - 3) * 0.5;
        return <path key={b} d={`M-19.5 ${b * 1.05} L-10.5 ${b} L${NUT} ${n} L${post} ${py}`} stroke="#eef2f6" strokeWidth={i < 3 ? 0.55 : 0.38} fill="none" opacity="0.85" />;
      })}
      {/* Clip-on tuner on the bass edge of the headstock: grey, green once live. */}
      <path d="M150 -9 v-4" stroke="#2a2f37" strokeWidth="2" />
      <rect x="144" y="-24" width="13" height="11" rx="2" fill="#0b0e13" />
      <rect className="mu-tuner" x="146" y="-22" width="9" height="7" rx="1" fill="#2a313b" />
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
        <path d="M462 452 Q450 482 456 512 Q463 548 484 566" stroke="#0b0d10" strokeWidth="2.2" fill="none" strokeLinecap="round" />

        {/* Fretting arm: sleeve to the wrist, the hand holding a chord. */}
        <path d="M552 338 L572 332 L575 362 L558 368 Z" fill="url(#mu-jacket)" />
        <path d="M557 364 L575 358 L576 366 L559 372 Z" fill="#17191d" />
        <path d="M549 364 Q543 375 549 384 Q557 389 565 383 Q570 374 566 366 Z" fill="url(#mu-skin)" />
        <path d="M551 368 Q548 362 553 360 Q557 361 556 367" fill="#d8a98c" />
        <path d="M551 376 l9 -3 M552 381 l9 -3" stroke="#9a6a54" strokeWidth="1" strokeLinecap="round" />

        {/* Picking arm over the body; the hand over the bridge pickup. */}
        <path d="M431 334 L452 340 L462 392 L446 398 Z" fill="url(#mu-jacket)" />
        <path d="M446 394 L462 388 L465 396 L449 402 Z" fill="#17191d" />
        <g className="mu-strum">
          <path d="M449 400 Q444 412 452 419 Q462 424 470 416 Q474 406 466 399 Z" fill="url(#mu-skin)" />
          <path d="M455 410 l9 -2 M456 415 l8 -2" stroke="#9a6a54" strokeWidth="1" strokeLinecap="round" />
          <path d="M467 416 l4 3 l-4 2 z" fill="#efe2c8" />
          <circle cx="463" cy="406" r="1.1" fill="#c9d2dc" />
        </g>
      </g>
    </g>
  );
}

/**
 * Who It's For: the Event Organizers & Producers scene's event producer
 * (DESIGN-15A.7).
 *
 * The producer running the event on the day, mid-call: a radio raised to
 * speak, the run of show on a clipboard at her side, looking across at
 * guest check-in. Practical event-day clothes: a teal utility jacket over a
 * cream top, black trousers, white sneakers, a crossbody bag, an orange
 * staff lanyard. Natural curly hair, small gold hoops. Distinct from the
 * technician (black polo), the production lead (crew blacks, tablet), and
 * the banquet director (suit, tablet).
 *
 * Idle: talks on the radio (the hand and its LED), small nods (CSS, off
 * under reduced motion). When doors are called (OrganizerScene adds
 * .is-open above), the radio LED turns green.
 *
 * Drawn in its own 960 x 600 space like the other figures (feet at y = 562)
 * and placed with a transform. Decorative.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */
export default function ProducerFigure({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="pr-figure">
      <defs>
        <linearGradient id="pr-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4f3022" />
          <stop offset="0.55" stopColor="#6e4630" />
          <stop offset="1" stopColor="#87593c" />
        </linearGradient>
        <linearGradient id="pr-jacket" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1d3a3d" />
          <stop offset="0.55" stopColor="#2c5458" />
          <stop offset="1" stopColor="#3b6b6f" />
        </linearGradient>
        <linearGradient id="pr-pants" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0b0d11" />
          <stop offset="0.55" stopColor="#171a20" />
          <stop offset="1" stopColor="#24282f" />
        </linearGradient>
        <radialGradient id="pr-hair" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#3a2a1f" />
          <stop offset="1" stopColor="#140d09" />
        </radialGradient>
      </defs>

      {/* Contact shadow. */}
      <ellipse cx="500" cy="561" rx="58" ry="6.5" fill="#000" opacity="0.5" />

      {/* White sneakers. */}
      <path d="M464 546 h28 l2 8 q0 7 -7 7 h-27 q-6 0 -4 -7 z" fill="#e3e8ee" />
      <path d="M508 546 h28 l8 7 q2 8 -6 8 h-30 q-5 0 -3 -7 z" fill="#e3e8ee" />
      <path d="M458 558 h34 M507 558 h36" stroke="#8a96a3" strokeWidth="2.6" />

      {/* Black trousers. */}
      <path d="M468 404 L500 404 L497 474 L492 548 L466 548 L469 474 Z" fill="url(#pr-pants)" />
      <path d="M500 404 L532 404 L533 474 L536 548 L509 548 L503 474 Z" fill="url(#pr-pants)" />
      <path d="M468 408 L466 546" stroke="#7fb8e6" strokeWidth="1.2" opacity="0.35" />
      <path d="M532 408 L536 546" stroke="#ffcf9e" strokeWidth="1.4" opacity="0.38" />

      <g className="ws-breathe">
        {/* Cream top, then the open utility jacket. */}
        <path d="M484 246 L516 246 L515 406 L485 406 Z" fill="#e8dfcf" />
        <path d="M485 300 L515 300 L515 406 L485 406 Z" fill="#cfc4b2" opacity="0.45" />
        <path d="M478 244 Q462 248 452 260 Q444 300 450 340 L448 412 L491 414 L489 330 L487 252 Z" fill="url(#pr-jacket)" />
        <path d="M522 244 Q538 248 548 260 Q556 300 550 340 L552 412 L509 414 L511 330 L513 252 Z" fill="url(#pr-jacket)" />
        <path d="M452 260 Q444 300 450 340 L448 412 L462 413 L462 340 Q458 300 464 262 Z" fill="#05080a" opacity="0.35" />
        {/* Stand collar, zip edges, chest pockets, hem band. */}
        <path d="M478 244 L489 241 L491 254 L482 258 Z M522 244 L511 241 L509 254 L518 258 Z" fill="#244649" />
        <path d="M488 252 L490 412 M512 252 L510 412" stroke="#7fa9ab" strokeWidth="1" opacity="0.7" />
        <path d="M458 286 h22 v19 h-22 z M520 286 h22 v19 h-22 z" fill="#25494c" />
        <path d="M457 284 h24 v6 h-24 z M519 284 h24 v6 h-24 z" fill="#1d3b3e" />
        <path d="M448 402 L491 404 M509 404 L552 402" stroke="#1a3335" strokeWidth="5" />
        <path d="M548 260 Q556 300 550 340 L552 410" stroke="#ffcf9e" strokeWidth="1.4" fill="none" opacity="0.4" />
        <path d="M452 260 Q444 300 450 340" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />

        {/* Orange staff lanyard and credential. */}
        <path d="M492 248 L497 316 M508 248 L503 316" stroke="#ff7a1a" strokeWidth="2.2" fill="none" />
        <rect x="489" y="314" width="22" height="28" rx="2" fill="#f4f7fa" />
        <rect x="489" y="314" width="22" height="7" rx="2" fill="#ff7a1a" />
        <path d="M493 327 h14 M493 332 h10" stroke="#8a97a6" strokeWidth="1.3" />

        {/* Crossbody strap and bag. */}
        <path d="M462 258 L546 388" stroke="#14171c" strokeWidth="4.5" strokeLinecap="round" />
        <rect x="534" y="382" width="28" height="26" rx="5" fill="#15181d" />
        <path d="M538 390 h20" stroke="#4a525d" strokeWidth="1.2" />

        {/* Neck. */}
        <path d="M490 222 L510 222 L511 248 L489 248 Z" fill="url(#pr-skin)" />
        <path d="M490 230 Q500 237 510 230 L510 236 Q500 242 490 236 Z" fill="#3a2016" opacity="0.45" />

        {/* Head: looks across at check-in, talking. */}
        <g className="pr-head">
          <path d="M478 194 Q478 228 500 233 Q522 228 522 194 Q522 166 500 166 Q478 166 478 194 Z" fill="url(#pr-skin)" />
          <path d="M480 204 Q484 226 498 232 Q486 216 485 200 Z" fill="#3a2016" opacity="0.35" />
          {/* Natural curls, tapered at the sides. */}
          {[
            [480, 182, 11],
            [488, 167, 12.5],
            [500, 161, 13.5],
            [512, 167, 12.5],
            [520, 182, 11],
            [477, 195, 6.5],
            [523, 195, 6.5],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="url(#pr-hair)" />
          ))}
          {[
            [486, 160],
            [497, 154],
            [508, 158],
            [516, 172],
            [480, 176],
          ].map(([cx, cy]) => (
            <circle key={`h${cx}`} cx={cx} cy={cy} r="2" fill="#4e3a2c" opacity="0.7" />
          ))}
          <circle cx="478" cy="207" r="3" fill="none" stroke="#e6c46a" strokeWidth="1.1" />
          <circle cx="522" cy="207" r="3" fill="none" stroke="#e6c46a" strokeWidth="1.1" />
          {/* Brows; eyes turned toward check-in (viewer's left). */}
          <path d="M485 187 Q490 184.5 495 186 M505 186 Q510 184.5 515 187" stroke="#140d09" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="490" cy="195" rx="3.3" ry="2.2" fill="#f1e6da" />
          <ellipse cx="510" cy="195" rx="3.3" ry="2.2" fill="#f1e6da" />
          <g className="pr-eyes">
            <circle cx="488.4" cy="195.2" r="1.7" fill="#140b06" />
            <circle cx="508.4" cy="195.2" r="1.7" fill="#140b06" />
          </g>
          <path d="M486.5 193.4 Q490 191.6 493.5 193.4 M506.5 193.4 Q510 191.6 513.5 193.4" stroke="#140d09" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <path d="M500 199 L501.5 208 L497 209" stroke="#3e2418" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          {/* Mouth open mid-sentence. */}
          <ellipse cx="500" cy="219" rx="3.2" ry="1.9" fill="#3c1a14" />
          <path d="M495.5 217.8 Q500 216.2 504.5 217.8" stroke="#5e3020" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <ellipse cx="510" cy="181" rx="7" ry="2.6" fill="#a87a5a" opacity="0.35" />
          <path d="M522 192 Q522 222 507 231" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.4" />
        </g>

        {/* Clipboard arm (viewer's left): the run of show at her side. */}
        <path d="M452 260 Q438 274 438 304 L437 334 L457 338 L460 306 Z" fill="url(#pr-jacket)" />
        <path d="M439 282 Q436 310 437 332" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />
        <path d="M437 330 L457 336 L461 372 L441 376 Z" fill="url(#pr-jacket)" />
        <path d="M441 371 L461 367 L462 375 L442 379 Z" fill="#1a3335" />
        {/* Hand behind the board; only the thumb shows over its edge. */}
        <path d="M444 372 Q436 379 440 389 Q448 395 457 388 L460 377 Z" fill="url(#pr-skin)" />
        <g transform="translate(17 2) rotate(-8 444 384)">
          <rect x="416" y="352" width="52" height="68" rx="3" fill="#3a3f47" />
          <rect x="433" y="347" width="18" height="7" rx="1.5" fill="#9aa5b1" />
          <rect x="419" y="358" width="46" height="59" fill="#f4f7fa" />
          <text x="422" y="366" fontSize="4.4" fontWeight="700" fill="#13263b" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.3">
            RUN OF SHOW
          </text>
          <rect x="420.5" y="380.5" width="43" height="7" fill="#ffe3cc" />
          {[376, 384, 392, 400, 408].map((ly) => (
            <path key={ly} d={`M423 ${ly} h7 M433 ${ly} h${ly === 384 ? 26 : 22}`} stroke={ly === 384 ? "#c2571a" : "#9aa5b1"} strokeWidth="1.4" />
          ))}
        </g>
        <path d="M431 377 Q437 373 441 378 Q443 385 438 389 Q432 390 430 385 Z" fill="#7a4e35" />

        {/* Radio arm (viewer's right): raised, talking. */}
        <path d="M548 260 Q562 272 564 300 L569 326 L550 333 L540 304 Z" fill="url(#pr-jacket)" />
        <path d="M562 284 Q566 304 568 324" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.4" />
        <g className="pr-talk">
          <path d="M551 331 L570 323 L541 240 L526 247 Z" fill="url(#pr-jacket)" />
          <path d="M526 247 L541 240 L538 232 L523 239 Z" fill="#1a3335" />
          {/* Handheld radio. */}
          <rect x="523" y="172" width="3" height="20" rx="1.5" fill="#15181d" />
          <rect x="519" y="189" width="14" height="36" rx="2.6" fill="#121418" />
          <rect x="529" y="183" width="4" height="7" rx="1" fill="#1c2026" />
          <path d="M522 200 h8 M522 204 h8 M522 208 h8" stroke="#2c323b" strokeWidth="1.2" />
          <circle className="pr-led" cx="526" cy="194.5" r="1.5" fill="#ffb27a" />
          <path d="M519 192 L519 222" stroke="#ffcf9e" strokeWidth="0.8" opacity="0.4" />
          <path d="M518 213 Q514 227 523 235 Q533 239 538 229 L536 214 Z" fill="url(#pr-skin)" />
          <path d="M521 220 q6 2 12 0 M522 226 q5 2 10 0" stroke="#3a2016" strokeWidth="0.9" fill="none" opacity="0.6" />
        </g>
      </g>
    </g>
  );
}

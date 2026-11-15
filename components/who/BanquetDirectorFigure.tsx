import type { ReactNode } from "react";

/**
 * Who It's For: the Venue scene's banquet director (DESIGN-15A.6).
 *
 * A hotel banquet director in their forties walking the room before a
 * corporate event: a tailored navy suit, white dress shirt, a copper tie, a
 * small gold hotel name badge on the lapel side (no name on it), polished
 * oxfords. Salt-and-pepper hair with a side part, a trimmed grey-flecked
 * beard, thin glasses. Stands upright and composed: one arm relaxed at the
 * side, the other holding the event-prep tablet at chest height, screen
 * toward the viewer. Idle: reads the tablet, looks out across the room setup
 * (toward the tables), returns to the tablet (CSS, off under reduced motion).
 *
 * No headset, tool belt, lanyard, or crew blacks: this is hospitality
 * management, not production.
 *
 * Drawn in its own 960 x 600 space like the other figures (feet at y = 562)
 * and placed with a transform. The tablet is passed in as `tablet` (local
 * coordinates, about x 420-490, y 310-402) so the scene can make it
 * interactive; it is drawn between the holding sleeve and the hand.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */
export default function BanquetDirectorFigure({ x, y, scale, tablet }: { x: number; y: number; scale: number; tablet: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="vd-figure">
      <defs>
        <linearGradient id="vd-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#94704f" />
          <stop offset="0.55" stopColor="#b88f6a" />
          <stop offset="1" stopColor="#cfa781" />
        </linearGradient>
        <linearGradient id="vd-suit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#111a28" />
          <stop offset="0.55" stopColor="#1c2a3f" />
          <stop offset="1" stopColor="#2a3c56" />
        </linearGradient>
        <linearGradient id="vd-trouser" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0e1622" />
          <stop offset="0.55" stopColor="#172336" />
          <stop offset="1" stopColor="#22324a" />
        </linearGradient>
        <linearGradient id="vd-shirt" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#bcc7d3" />
          <stop offset="1" stopColor="#eef2f6" />
        </linearGradient>
        <linearGradient id="vd-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a3836" />
          <stop offset="0.6" stopColor="#6b6966" />
          <stop offset="1" stopColor="#9a9894" />
        </linearGradient>
        <linearGradient id="vd-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b8954f" />
          <stop offset="0.5" stopColor="#e6cf95" />
          <stop offset="1" stopColor="#a9853f" />
        </linearGradient>
      </defs>

      {/* Contact shadow. */}
      <ellipse cx="500" cy="561" rx="58" ry="6.5" fill="#000" opacity="0.5" />

      {/* Polished oxfords, feet together, the right turned slightly out. */}
      <path d="M463 547 h30 l1 7 q0 7 -8 7 h-29 q-6 0 -3 -7 z" fill="#0a0b0e" />
      <path d="M508 547 h30 l7 6 q2 8 -6 8 h-30 q-5 0 -3 -7 z" fill="#0a0b0e" />
      <path d="M458 554 q10 -3 22 -2 M513 553 q11 -3 24 -1" stroke="#6a7480" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />

      {/* Suit trousers, pressed crease. */}
      <path d="M467 410 L501 410 L498 476 L494 549 L465 549 L469 476 Z" fill="url(#vd-trouser)" />
      <path d="M499 410 L533 410 L533 476 L537 549 L508 549 L502 476 Z" fill="url(#vd-trouser)" />
      <path d="M483 414 L480 547 M518 414 L521 547" stroke="#3a4c68" strokeWidth="1" opacity="0.55" />
      <path d="M467 414 L465 547" stroke="#7fb8e6" strokeWidth="1.2" opacity="0.35" />
      <path d="M533 414 L537 547" stroke="#ffcf9e" strokeWidth="1.4" opacity="0.38" />

      {/* Upper body: breathes as one group. */}
      <g className="ws-breathe">
        {/* Shirt front, collar, tie (under the jacket). */}
        <path d="M484 244 L516 244 L508 330 L500 338 L492 330 Z" fill="url(#vd-shirt)" />
        <path d="M495 250 L505 250 L503 258 L497 258 Z" fill="#7d3d1a" />
        <path d="M497 258 L503 258 L507 318 L500 330 L493 318 Z" fill="#b4612d" />
        <path d="M500 260 L500 326" stroke="#8e4720" strokeWidth="1" opacity="0.6" />
        <path d="M485 243 L497 254 L491 262 Z M515 243 L503 254 L509 262 Z" fill="#f4f7fa" />

        {/* Tailored jacket: shoulders, waist suppression, hem at the hip. */}
        <path
          d="M476 244 Q500 238 524 244 L552 258 Q561 298 553 340 L556 424 Q528 432 500 430 Q472 432 444 424 L447 340 Q439 298 448 258 Z M484 244 L492 330 L500 338 L508 330 L516 244 Z"
          fill="url(#vd-suit)"
          fillRule="evenodd"
        />
        <path d="M448 258 Q440 298 447 340 L444 424 L462 428 L460 340 Q456 300 463 260 Z" fill="#05080d" opacity="0.4" />
        {/* Notched lapels down to the single button. */}
        <path d="M484 243 L465 262 L472 276 L465 284 L497 338 L492 330 Z" fill="#141e2d" />
        <path d="M516 243 L535 262 L528 276 L535 284 L503 338 L508 330 Z" fill="#1b2838" />
        <path d="M484 243 L465 262 L472 276 L465 284 L497 338 M516 243 L535 262 L528 276 L535 284 L503 338" stroke="#4a5f80" strokeWidth="1.1" fill="none" opacity="0.8" strokeLinejoin="round" />
        <circle cx="500" cy="352" r="2.6" fill="#0b1119" stroke="#56688a" strokeWidth="0.9" />
        <path d="M500 356 L491 428 M500 356 L509 428" stroke="#0a0f17" strokeWidth="1.3" fill="none" />
        {/* Hip pocket flaps. */}
        <path d="M456 386 h28 l-1 6 h-27 z M516 386 h28 l1 6 h-28 z" fill="#0f1724" />
        {/* Hotel name badge: small, gold, no name. */}
        <rect x="517" y="290" width="25" height="9" rx="1.6" fill="url(#vd-badge)" />
        <path d="M521 293.4 h12 M521 296 h17" stroke="#5b4520" strokeWidth="0.9" opacity="0.8" />
        {/* Rim light: cool on the viewer's left, warm on the right. */}
        <path d="M448 258 Q440 298 447 340" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />
        <path d="M552 258 Q561 298 553 340 L556 422" stroke="#ffcf9e" strokeWidth="1.5" fill="none" opacity="0.42" />

        {/* Neck. */}
        <path d="M490 220 L510 220 L511 246 L489 246 Z" fill="url(#vd-skin)" />
        <path d="M490 228 Q500 236 510 228 L510 234 Q500 241 490 234 Z" fill="#6e4f36" opacity="0.45" />

        {/* Head: reads the tablet, looks out over the room, returns. */}
        <g className="vd-head">
          <ellipse cx="476" cy="200" rx="3.4" ry="6.2" fill="#a47c58" />
          <ellipse cx="524" cy="200" rx="3.4" ry="6.2" fill="#c09670" />
          <path d="M476 193 Q476 224 491 232 Q500 236 509 232 Q524 224 524 193 Q524 163 500 163 Q476 163 476 193 Z" fill="url(#vd-skin)" />
          <path d="M478 202 Q482 224 496 232 Q484 214 484 198 Z" fill="#6e4f36" opacity="0.32" />
          {/* Trimmed beard, grey-flecked. */}
          <path d="M477 203 Q479 228 500 237 Q521 228 523 203 Q519 222 509 224 Q500 219 491 224 Q481 222 477 203 Z" fill="#55524f" opacity="0.88" />
          <path d="M484 220 q4 4 8 4 M508 224 q5 -1 8 -5" stroke="#a9a6a1" strokeWidth="0.9" fill="none" opacity="0.6" strokeLinecap="round" />
          <path d="M490 213.5 Q500 209.5 510 213.5 Q500 216.5 490 213.5 Z" fill="#45423f" />
          <path d="M494 220 Q500 222.5 506 220" stroke="#5e3a2a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          {/* Short hair, side part, grey at the temples. */}
          <path d="M474 196 Q469 160 500 155 Q531 157 526 196 Q524 177 516 171 Q501 166 487 171 Q478 179 474 196 Z" fill="url(#vd-hair)" />
          <path d="M488 158 Q484 166 483 175" stroke="#26241f" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M477 186 q1 -9 5 -13 M523 186 q-1 -9 -5 -13" stroke="#c9cbce" strokeWidth="1.3" fill="none" opacity="0.75" strokeLinecap="round" />
          <path d="M492 161 Q506 157 518 164" stroke="#a6a4a0" strokeWidth="1.3" fill="none" opacity="0.6" strokeLinecap="round" />
          {/* Brows, eyes (open, looking down at the tablet), thin glasses. */}
          <path d="M484.5 185.5 Q490 183 495.5 185 M504.5 185 Q510 183 515.5 185.5" stroke="#34312e" strokeWidth="2.1" fill="none" strokeLinecap="round" />
          <ellipse cx="490" cy="194.6" rx="3.4" ry="2.3" fill="#f1e7dc" />
          <ellipse cx="510" cy="194.6" rx="3.4" ry="2.3" fill="#f1e7dc" />
          <g className="vd-eyes">
            <circle cx="489.2" cy="195.3" r="1.7" fill="#2a1a10" />
            <circle cx="509.2" cy="195.3" r="1.7" fill="#2a1a10" />
          </g>
          <path d="M486.4 193.2 Q490 191.6 493.6 193.2 M506.4 193.2 Q510 191.6 513.6 193.2" stroke="#3a2a20" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <rect x="483" y="189.5" width="14" height="10.5" rx="3.6" fill="none" stroke="#1e242c" strokeWidth="1.1" />
          <rect x="503" y="189.5" width="14" height="10.5" rx="3.6" fill="none" stroke="#1e242c" strokeWidth="1.1" />
          <path d="M497 193 Q500 191.5 503 193 M483 192 L477 190 M517 192 L523 190" stroke="#1e242c" strokeWidth="1" fill="none" />
          <path d="M501 199 L503 208.5 L498 209.5" stroke="#7d5a3e" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <ellipse cx="510" cy="179" rx="8" ry="3" fill="#e4c4a4" opacity="0.32" />
          <path d="M524 190 Q524 220 509 231" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.42" />
        </g>

        {/* Relaxed arm at the side (viewer's right), white cuff. */}
        <path d="M548 260 Q563 274 563 304 L567 380 L550 384 L540 306 Z" fill="url(#vd-suit)" />
        <path d="M563 284 Q566 330 567 378" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.4" />
        <path d="M550 381 L567 377.5 L568 385 L551 388.5 Z" fill="#e8edf3" />
        <path d="M551 387 Q548 401 556 407 Q566 409 569 398 L568 385 Z" fill="url(#vd-skin)" />
        <path d="M557 404 q5 1 8 -3" stroke="#7d5a3e" strokeWidth="1" fill="none" opacity="0.7" />

        {/* Holding arm (viewer's left): upper arm, then the forearm toward
            the tablet's lower corner. */}
        <path d="M452 260 Q437 274 437 304 L435 342 L456 346 L461 306 Z" fill="url(#vd-suit)" />
        <path d="M439 282 Q436 310 436 338" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />
        <path d="M436 336 L457 342 L451 398 L430 395 Z" fill="url(#vd-suit)" />
        <path d="M430 392 L451 395 L450 403 L429 400 Z" fill="#e8edf3" />
      </g>

      {/* The tablet (from the scene), then the hand cradling its lower
          corner (clear of the screen's items). */}
      <g className="ws-breathe">
        {tablet}
        <path d="M428 398 Q419 403 422 413 Q428 420 440 415 L452 405 L449 397 Z" fill="url(#vd-skin)" />
        <path d="M425 404 Q424 397 429 394 Q433 394 432 400 Z" fill="#c09670" />
        <path d="M427 411 q7 2 13 -2" stroke="#7d5a3e" strokeWidth="1" fill="none" opacity="0.7" />
      </g>
    </g>
  );
}

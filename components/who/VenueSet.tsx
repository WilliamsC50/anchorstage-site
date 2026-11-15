/**
 * Who It's For: the Venue scene's ballroom set (DESIGN-15A.6). Decorative;
 * drawn in the stage's 1600 x 900 space, in front of the permanent stage.
 *
 * VenueLighting  the same room set for a corporate event: a patterned hotel
 *                carpet across the floor (where the concert crowd stands in
 *                other scenes), warm house light pooled on the tables, and
 *                the show rig dimmed slightly. The background is unchanged.
 * BanquetRoom    the room setup: three far banquet rounds, and the near
 *                round with floor-length linens, banquet chairs, place
 *                settings, and a low centrepiece with a candle. A banquet
 *                server stands behind it in a white shirt, black vest, bow
 *                tie, and bistro apron, a tray of glasses on one hand,
 *                setting the last glass with the other.
 * WelcomeSign    a chrome pedestal sign holder with a printed welcome sign
 *                (generic text; no invented event or venue names).
 *
 * Idle motion (CSS, off under reduced motion): the server's placing arm
 * sets the glass and lifts away; the candle flickers.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */

export function VenueLighting() {
  return (
    <g>
      <defs>
        <linearGradient id="vn-carpet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1525" />
          <stop offset="1" stopColor="#14283f" />
        </linearGradient>
        <linearGradient id="vn-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#020712" stopOpacity="0.7" />
          <stop offset="0.45" stopColor="#020712" stopOpacity="0" />
        </linearGradient>
        <pattern id="vn-carpet-pat" width="56" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 3 L53 14 L28 25 L3 14 Z" fill="none" stroke="#c49a5a" strokeWidth="0.9" />
          <circle cx="28" cy="14" r="2" fill="#c49a5a" />
          {[
            [0, 0],
            [56, 0],
            [0, 28],
            [56, 28],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill="#4ea8d1" />
          ))}
        </pattern>
        <radialGradient id="vn-warm" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffcf9e" stopOpacity="0.2" />
          <stop offset="1" stopColor="#ffcf9e" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* The show rig dimmed a little: the room is lit for an event, not a concert. */}
      <rect x="-160" y="0" width="1920" height="600" fill="#020712" opacity="0.2" />
      {/* Hotel carpet across the floor. */}
      <rect x="-160" y="598" width="1920" height="238" fill="url(#vn-carpet)" />
      <rect x="-160" y="598" width="1920" height="238" fill="url(#vn-carpet-pat)" opacity="0.26" />
      <rect x="-160" y="598" width="1920" height="238" fill="url(#vn-depth)" />
      {/* Warm house light on the tables and the director. */}
      <ellipse cx="660" cy="700" rx="300" ry="130" fill="url(#vn-warm)" />
      <ellipse cx="1010" cy="640" rx="320" ry="70" fill="url(#vn-warm)" opacity="0.7" />
      <ellipse cx="1000" cy="836" rx="240" ry="70" fill="url(#vn-warm)" />
    </g>
  );
}

/** A banquet chair seen from the front (behind a table, facing the viewer).
 *  Local origin: the front of its legs on the floor. */
function ChairFront({ x, floor, s }: { x: number; floor: number; s: number }) {
  return (
    <g transform={`translate(${x} ${floor}) scale(${s})`}>
      <path d="M-19 -84 L-21 0 M19 -84 L21 0" stroke="#8a7a54" strokeWidth="2.6" />
      <rect x="-23" y="-90" width="46" height="8" rx="2" fill="#18283f" />
      <rect x="-21" y="-166" width="42" height="78" rx="10" fill="#1f3350" stroke="#a89466" strokeWidth="2" />
      <path d="M-12 -150 h24 M-12 -136 h24 M-12 -122 h24" stroke="#2c4566" strokeWidth="1.4" />
    </g>
  );
}

/** A banquet chair seen from behind (in front of a table, its back to the
 *  viewer). Local origin: the front of its legs on the floor. */
function ChairBack({ x, floor, s }: { x: number; floor: number; s: number }) {
  return (
    <g transform={`translate(${x} ${floor}) scale(${s})`}>
      <ellipse cx="0" cy="1" rx="30" ry="4" fill="#000" opacity="0.4" />
      <path d="M-15 -80 L-16 -12 M15 -80 L16 -12" stroke="#6e6244" strokeWidth="2.2" />
      <path d="M-20 -80 L-22 0 M20 -80 L22 0" stroke="#a89466" strokeWidth="2.6" />
      <rect x="-23" y="-86" width="46" height="8" rx="2" fill="#142238" />
      <rect x="-21" y="-166" width="42" height="82" rx="10" fill="#18293f" stroke="#a89466" strokeWidth="2.2" />
      <path d="M-21 -150 Q0 -156 21 -150" stroke="#7fb8e6" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M20 -160 L20 -92" stroke="#ffcf9e" strokeWidth="1.2" opacity="0.35" />
    </g>
  );
}

/** A banquet round with floor-length linen, place settings, a centrepiece,
 *  and chairs behind it. Local origin: the front of the skirt on the floor;
 *  drawn at the near table's size and scaled for the far ones. */
function RoundTable({ x, floor, s, id }: { x: number; floor: number; s: number; id: string }) {
  const plates: [number, number][] = [
    [-80, -137],
    [0, -127],
    [80, -137],
    [-46, -149],
    [46, -149],
  ];
  return (
    <g transform={`translate(${x} ${floor}) scale(${s})`}>
      <defs>
        <linearGradient id={`vn-linen-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8f9caa" />
          <stop offset="0.5" stopColor="#c9d2dc" />
          <stop offset="1" stopColor="#dbcbb8" />
        </linearGradient>
        <radialGradient id={`vn-candle-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffcf7a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffcf7a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="0" cy="2" rx="138" ry="9" fill="#000" opacity="0.45" />
      {/* Linen skirt to the floor, with soft folds. */}
      <path d="M-118 -138 Q-121 -70 -125 -6 Q0 12 125 -6 Q121 -70 118 -138 Z" fill={`url(#vn-linen-${id})`} />
      <path
        d="M-86 -126 Q-90 -64 -92 -2 M-44 -122 Q-46 -60 -47 4 M0 -120 L0 6 M44 -122 Q46 -60 47 4 M86 -126 Q90 -64 92 -2"
        stroke="#7d8b9a"
        strokeWidth="1.3"
        fill="none"
        opacity="0.4"
      />
      <path d="M-118 -136 Q0 -108 118 -136" stroke="#7d8b9a" strokeWidth="2" fill="none" opacity="0.45" />
      {/* Table top. */}
      <ellipse cx="0" cy="-138" rx="118" ry="20" fill="#e6ebf0" />
      <ellipse cx="0" cy="-138" rx="118" ry="20" fill="none" stroke="#b7c2ce" strokeWidth="1.2" />
      {/* Place settings: plate, folded napkin, glass. */}
      {plates.map(([px, py]) => (
        <g key={`${px}-${py}`}>
          <ellipse cx={px} cy={py} rx="11" ry="3.4" fill="#fbfcfd" stroke="#c3ccd6" strokeWidth="0.6" />
          <path d={`M${px - 4.5} ${py - 0.8} L${px} ${py - 7} L${px + 4.5} ${py - 0.8} Z`} fill="#24466c" />
          <path
            d={`M${px + 11} ${py - 11} q1.8 5 3.6 0 M${px + 12.8} ${py - 6.5} v5 M${px + 11} ${py - 1.4} h3.6`}
            stroke="#e9f2f9"
            strokeWidth="0.9"
            fill="none"
            opacity="0.85"
          />
        </g>
      ))}
      {/* Low centrepiece with a candle. */}
      <circle cx="0" cy="-170" r="16" fill={`url(#vn-candle-${id})`} />
      <ellipse cx="0" cy="-146" rx="10" ry="3" fill="#9fb8cc" opacity="0.6" />
      {[
        [-9, -153, 5.5],
        [9, -153, 5.5],
        [0, -157, 6.5],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}`} cx={cx} cy={cy} r={r} fill="#2c5546" />
      ))}
      {[
        [-7, -156],
        [5, -159],
        [10, -151],
        [-2, -151],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill="#f1ebe2" />
      ))}
      <rect x="-1.6" y="-171" width="3.2" height="10" rx="0.8" fill="#efe6d6" />
      <ellipse className="vn-flame" cx="0" cy="-174" rx="1.6" ry="3" fill="#ffcf7a" />
    </g>
  );
}

/** The banquet server: body (drawn behind the near table) and the placing
 *  arm (drawn over the table top). */
function ServerBody() {
  return (
    <g>
      {/* Low bun peeking behind the head (head turned to the table). */}
      <circle cx="642" cy="493" r="5.5" fill="#17110d" />
      {/* Apron and vest over a white shirt. */}
      <path d="M610 600 L650 600 L653 664 L607 664 Z" fill="#0b0d10" />
      <path d="M612 514 Q630 507 648 514 L651 560 L649 604 L611 604 L609 560 Z" fill="#e4e9ef" />
      <path d="M616 516 L626 512 L630 534 L634 512 L644 516 L648 560 L647 604 L613 604 L612 560 Z" fill="#14171c" />
      <path d="M624 510 L636 510 L630 530 Z" fill="#eef2f6" />
      <path d="M623.5 512.5 L630 516 L623.5 519.5 Z M636.5 512.5 L630 516 L636.5 519.5 Z" fill="#0a0b0d" />
      <circle cx="630" cy="516" r="1.4" fill="#0a0b0d" />
      {[542, 556, 570].map((y) => (
        <circle key={y} cx="630.5" cy={y} r="1.1" fill="#7b8693" />
      ))}
      <path d="M612 520 Q609 560 611 602" stroke="#7fb8e6" strokeWidth="1" fill="none" opacity="0.45" />
      <path d="M610 600 h40" stroke="#2b3038" strokeWidth="2" />
      {/* Neck and head, tipped toward the table. */}
      <rect x="625.5" y="498" width="9" height="14" fill="#8c5e41" />
      <g transform="rotate(9 630 500)">
        <ellipse cx="630" cy="488" rx="12.5" ry="14.5" fill="#a36f4d" />
        <path d="M618 488 Q616 470 630 469 Q645 470 643 487 Q640 477 630 476 Q621 477 618 488 Z" fill="#17110d" />
        <path d="M622 491 q3 1.5 6 0 M633 491 q3 1.5 6 0" stroke="#2a1a10" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <path d="M631 493 L632.5 498.5 L629.5 499" stroke="#734a32" strokeWidth="0.9" fill="none" />
        <path d="M626.5 503 Q630.5 504.5 634 502.5" stroke="#5e3426" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M642.5 484 Q643 496 637 501" stroke="#ffcf9e" strokeWidth="0.9" fill="none" opacity="0.5" />
      </g>
      {/* Tray arm: a tray of glasses carried at shoulder height. */}
      <path d="M614 520 L598 550 L590 530" stroke="#dfe5ec" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="589" cy="527" r="3.6" fill="#a36f4d" />
      <ellipse cx="585" cy="522" rx="25" ry="4.2" fill="#9aa5b1" />
      <ellipse cx="585" cy="521" rx="23" ry="3" fill="#d2d9e1" />
      {[571, 583, 595].map((gx) => (
        <path key={gx} d={`M${gx - 3} 505 q3 9 6 0 M${gx} 511 v8 M${gx - 3} 519.5 h6`} stroke="#eef5fb" strokeWidth="1.1" fill="none" opacity="0.9" />
      ))}
    </g>
  );
}

function ServerPlacingArm() {
  return (
    <g className="vn-place">
      <path d="M646 519 L663 562 L668 627" stroke="#dfe5ec" strokeWidth="7.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M646 519 L663 562" stroke="#ffcf9e" strokeWidth="1" fill="none" opacity="0.3" transform="translate(3 0)" />
      <path d="M666 620 q4 10 8 0 M670 626 v12 M666 638.5 h8" stroke="#eef5fb" strokeWidth="1.2" fill="none" />
      <circle cx="669" cy="630" r="3.4" fill="#a36f4d" />
    </g>
  );
}

export function BanquetRoom() {
  return (
    <g>
      {/* Far rounds across the room. */}
      {[
        [330, "a"],
        [858, "b"],
        [1180, "c"],
      ].map(([x, id]) => (
        <g key={id}>
          <ChairFront x={Number(x) - 54} floor={664} s={0.58} />
          <ChairFront x={Number(x)} floor={662} s={0.58} />
          <ChairFront x={Number(x) + 54} floor={664} s={0.58} />
          <RoundTable x={Number(x)} floor={676} s={0.6} id={String(id)} />
        </g>
      ))}

      {/* The near round: chairs behind, the server, the table, then the
          server's placing arm and the chairs in front. */}
      <ChairFront x={548} floor={772} s={0.96} />
      <ChairFront x={734} floor={772} s={0.96} />
      <ServerBody />
      <RoundTable x={640} floor={790} s={1} id="near" />
      <ServerPlacingArm />
      <ChairBack x={572} floor={814} s={1} />
      <ChairBack x={712} floor={814} s={1} />
    </g>
  );
}

/** A chrome pedestal sign holder with a printed welcome sign. */
export function WelcomeSign() {
  return (
    <g>
      <defs>
        <linearGradient id="vn-chrome" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5d6773" />
          <stop offset="0.45" stopColor="#c9d2dc" />
          <stop offset="1" stopColor="#7b8693" />
        </linearGradient>
      </defs>
      <ellipse cx="1330" cy="856" rx="34" ry="5" fill="#000" opacity="0.5" />
      <ellipse cx="1330" cy="851" rx="26" ry="5.5" fill="url(#vn-chrome)" />
      <rect x="1327.5" y="676" width="5" height="176" fill="url(#vn-chrome)" />
      {/* Frame and poster. */}
      <rect x="1286" y="562" width="88" height="118" rx="2" fill="url(#vn-chrome)" />
      <rect x="1290" y="566" width="80" height="110" fill="#10243c" />
      <rect x="1298" y="575" width="18" height="2" fill="#ff7a1a" />
      <text x="1298" y="596" fontSize="11" fontWeight="700" fill="#fff" letterSpacing="1.2" fontFamily="ui-sans-serif, system-ui, sans-serif">
        WELCOME
      </text>
      <text x="1298" y="612" fontSize="8" fontWeight="500" fill="#e8edf3" fontFamily="ui-sans-serif, system-ui, sans-serif">
        Annual Meeting
      </text>
      <path d="M1298 622 h62" stroke="#2c4a6c" strokeWidth="1" />
      <text x="1298" y="636" fontSize="6.5" fill="#a8dcff" fontFamily="ui-sans-serif, system-ui, sans-serif">
        Reception
      </text>
      <text x="1298" y="648" fontSize="7.5" fontWeight="700" fill="#ffb27a" fontFamily="ui-sans-serif, system-ui, sans-serif">
        6:00 PM
      </text>
      <text x="1298" y="666" fontSize="6.5" fill="#e8edf3" fontFamily="ui-sans-serif, system-ui, sans-serif">
        Ballroom →
      </text>
      <path d="M1290 566 L1316 566 L1290 600 Z" fill="#fff" opacity="0.05" />
    </g>
  );
}

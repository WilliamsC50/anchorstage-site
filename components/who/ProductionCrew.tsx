/**
 * Who It's For: the Production Company scene's supporting artwork
 * (DESIGN-15A.5). Decorative; drawn in the stage's 1600 x 900 space.
 *
 * ProductionLighting  house lights down over the floor and a warm work
 *                     light on the deck: the same stage, before doors.
 *                     The permanent background itself is not changed.
 * StageTech           a stage technician kneeling on the deck at a
 *                     downstage monitor wedge, plugging in its cable
 *                     (ground-level work; stocky, backwards cap, hoodie).
 * CaseTech            an equipment technician on the floor checking a
 *                     stacked pair of labelled flight cases against the
 *                     packing list on a clipboard (taller, slim, short
 *                     twists, T-shirt).
 * RollingRack         a rolling rack case with its front cover off: power,
 *                     two amplifiers, a patch panel with cables, a network
 *                     switch, a drawer, on casters.
 * CableCoil           a neat over-under coil on the floor.
 *
 * Idle motion (CSS, off under reduced motion): the stage tech's reaching
 * arm works the connector; the case tech's pen hand ticks the list.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */

export function ProductionLighting() {
  return (
    <g>
      <defs>
        <linearGradient id="pc-house" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#020712" stopOpacity="0" />
          <stop offset="0.16" stopColor="#020712" stopOpacity="0.74" />
          <stop offset="0.82" stopColor="#030a16" stopOpacity="0.78" />
          <stop offset="1" stopColor="#030a16" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="pc-work" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd9b0" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ffd9b0" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* House lights down over the floor. */}
      <rect x="0" y="592" width="1600" height="250" fill="url(#pc-house)" />
      {/* Work light across the deck, and a pool on the floor by the cases. */}
      <ellipse cx="640" cy="528" rx="380" ry="64" fill="url(#pc-work)" />
      <ellipse cx="1262" cy="760" rx="170" ry="60" fill="url(#pc-work)" />
    </g>
  );
}

/** B: kneeling at a monitor wedge on the deck, plugging its cable. */
export function StageTech() {
  return (
    <g>
      {/* Monitor wedge (seen from the house: its back and slanted top). */}
      <path d="M478 548 L532 548 L532 535 L490 527 L478 531 Z" fill="#0a0f16" />
      <path d="M478 531 L490 527 L532 535" stroke="#3a6a94" strokeWidth="1.2" fill="none" opacity="0.8" />
      <rect x="512" y="538" width="11" height="6" rx="1" fill="#1d2733" />
      {/* Cable from the wedge over the deck edge. */}
      <path d="M514 542 Q500 549 484 549 Q468 550 465 563 Q462 582 470 600" stroke="#05080c" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* Kneeling figure, facing the wedge. */}
      <g strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Back leg: knee down, shin along the deck. */}
        <path d="M439 545 L455 546 L452 522" stroke="#14181e" strokeWidth="7.5" />
        {/* Front leg: foot planted, knee up. */}
        <path d="M455 522 L473 527 L474 545" stroke="#181c23" strokeWidth="7.5" />
      </g>
      <ellipse cx="436" cy="545" rx="5" ry="3" fill="#07090c" />
      <ellipse cx="478" cy="546" rx="6" ry="3" fill="#07090c" />
      {/* Hoodie torso leaning in. */}
      <path d="M446 527 L463 524 L474 501 L470 495 L456 494 L449 504 Z" fill="#1b2029" />
      <ellipse cx="455" cy="498" rx="6" ry="4.5" fill="#12161d" />
      <path d="M456 494 L470 495 L474 501" stroke="#7fb8e6" strokeWidth="1" fill="none" opacity="0.55" />
      {/* Resting arm on the knee. */}
      <path d="M462 503 L466 518 L471 524" stroke="#1b2029" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Head, backwards cap. */}
      <circle cx="469" cy="487" r="7" fill="#8d5b3f" />
      <path d="M462 486 Q462 478 469 478 Q476 478 476.5 485 Z" fill="#0c0e12" />
      <path d="M462 484 L453 486.5 L462 488 Z" fill="#0c0e12" />
      <circle cx="474" cy="488" r="0.9" fill="#1a110c" />
      {/* Reaching arm, working the connector. */}
      <g className="pc-plug">
        <path d="M468 502 L485 518 L504 537" stroke="#1b2029" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="506" cy="538.5" r="2.8" fill="#8d5b3f" />
        <rect x="507" y="537" width="7" height="3.6" rx="1" fill="#6d7884" />
      </g>
    </g>
  );
}

/** C: checking stacked flight cases against the packing list. */
export function CaseTech() {
  return (
    <g>
      <ellipse cx="1262" cy="785" rx="120" ry="6" fill="#000" opacity="0.5" />
      {/* Lower case. */}
      <path d="M1210 728 L1356 728 L1364 721 L1218 721 Z" fill="#323b47" />
      <rect x="1210" y="728" width="146" height="48" fill="#232a34" />
      <path d="M1356 728 L1364 721 L1364 769 L1356 776 Z" fill="#141a21" />
      <rect x="1210" y="727" width="146" height="3.5" fill="#7b8693" />
      <rect x="1210" y="773" width="146" height="3.5" fill="#6c7682" />
      <rect x="1210" y="749" width="146" height="3" fill="#6c7682" />
      <rect x="1210" y="728" width="3" height="48" fill="#6c7682" />
      <rect x="1353" y="728" width="3" height="48" fill="#6c7682" />
      {[1236, 1330].map((x) => (
        <rect key={x} x={x - 7} y="745.5" width="14" height="10" rx="2" fill="#0a0e13" stroke="#6c7682" strokeWidth="1" />
      ))}
      {[1224, 1342].map((x) => (
        <g key={x}>
          <circle cx={x} cy="782" r="6" fill="#0a0c10" stroke="#2f3640" strokeWidth="1.5" />
          <circle cx={x} cy="782" r="2" fill="#6d7884" />
        </g>
      ))}
      {/* Upper case, with its packing label. */}
      <path d="M1222 686 L1344 686 L1351 680 L1229 680 Z" fill="#3a4452" />
      <rect x="1222" y="686" width="122" height="42" fill="#29313c" />
      <path d="M1344 686 L1351 680 L1351 722 L1344 728 Z" fill="#161c24" />
      <rect x="1222" y="685" width="122" height="3" fill="#8f9aa6" />
      <rect x="1222" y="725" width="122" height="3" fill="#6c7682" />
      <rect x="1222" y="686" width="3" height="42" fill="#6c7682" />
      <rect x="1341" y="686" width="3" height="42" fill="#6c7682" />
      {[
        [1224, 687],
        [1342, 687],
        [1212, 729],
        [1354, 729],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.6" fill="#a7b1bc" />
      ))}
      <rect x="1262" y="696" width="44" height="20" rx="1.5" fill="#e8edf3" />
      <text x="1284" y="706" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#1a2533" fontFamily="ui-monospace, monospace">
        AUDIO 2
      </text>
      <path d="M1268 711 h32" stroke="#8a97a6" strokeWidth="1.2" />

      {/* The technician. */}
      <g strokeLinecap="round" fill="none">
        <path d="M1167 700 L1163 777" stroke="#121519" strokeWidth="13" />
        <path d="M1183 700 L1187 775" stroke="#171b21" strokeWidth="13" />
      </g>
      <ellipse cx="1160" cy="781" rx="10" ry="4" fill="#07090c" />
      <ellipse cx="1192" cy="779" rx="10" ry="4" fill="#07090c" />
      <path d="M1156 702 L1194 702 L1197 642 Q1196 626 1187 621 L1163 621 Q1153 626 1153 642 Z" fill="#1a1e25" />
      <path d="M1153 642 Q1153 626 1163 621" stroke="#7fb8e6" strokeWidth="1.3" fill="none" opacity="0.5" />
      <path d="M1197 642 Q1196 626 1187 621" stroke="#ffcf9e" strokeWidth="1.3" fill="none" opacity="0.45" />
      <rect x="1171" y="606" width="9" height="16" fill="#6b4430" />
      {/* Head turned toward the cases; short twists. */}
      <ellipse cx="1177" cy="594" rx="11" ry="13" fill="#6b4430" />
      {[
        [1167, 586, 5.5],
        [1173, 581, 6],
        [1181, 580, 6],
        [1188, 585, 5],
        [1166, 593, 4],
      ].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#1a120d" />
      ))}
      <circle cx="1184" cy="595" r="1.1" fill="#120c08" />
      <path d="M1186 602 Q1183 604 1180 603" stroke="#3a2418" strokeWidth="1" fill="none" />
      {/* Near arm holding the clipboard against the body. */}
      <path d="M1157 628 L1154 656 L1170 664" stroke="#1a1e25" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1164 641 L1191 637 L1195 673 L1168 677 Z" fill="#3a3f47" />
      <path d="M1167 644 L1188 641 L1192 671 L1171 674 Z" fill="#e8edf3" />
      <rect x="1173" y="636" width="10" height="4" rx="1" fill="#9aa5b1" />
      <path d="M1172 650 l14 -2 M1172.5 656 l14 -2 M1173 662 l14 -2" stroke="#8a97a6" strokeWidth="1.2" />
      <path d="M1171 650 l1.5 2 l3 -4 M1171.5 656 l1.5 2 l3 -4" stroke="#2f9e5f" strokeWidth="1.1" fill="none" />
      <circle cx="1170" cy="664" r="3.2" fill="#6b4430" />
      {/* Far arm with the pen, ticking items off against the label. */}
      <g className="pc-pen">
        <path d="M1194 628 L1208 652 L1226 664" stroke="#1a1e25" strokeWidth="7.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="1228" cy="665" r="3" fill="#6b4430" />
        <path d="M1229 666 L1239 674" stroke="#d9dee4" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** A rolling rack case, front cover off, on casters. */
export function RollingRack() {
  const units: { y: number; h: number; kind: "power" | "amp" | "patch" | "switch" | "drawer" | "blank" }[] = [
    { y: 618, h: 15, kind: "power" },
    { y: 637, h: 30, kind: "amp" },
    { y: 671, h: 30, kind: "amp" },
    { y: 707, h: 15, kind: "patch" },
    { y: 726, h: 15, kind: "switch" },
    { y: 748, h: 30, kind: "drawer" },
    { y: 784, h: 30, kind: "blank" },
    { y: 818, h: 30, kind: "blank" },
  ];
  return (
    <g>
      <defs>
        <linearGradient id="pc-rack-lam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c3541" />
          <stop offset="1" stopColor="#1a2028" />
        </linearGradient>
      </defs>
      <ellipse cx="640" cy="890" rx="110" ry="7" fill="#000" opacity="0.55" />
      {[570, 700].map((x) => (
        <g key={x}>
          <rect x={x - 9} y="864" width="18" height="10" rx="2" fill="#2a313b" />
          <circle cx={x} cy="882" r="11" fill="#0a0c10" stroke="#2f3640" strokeWidth="2" />
          <circle cx={x} cy="882" r="3.5" fill="#6d7884" />
        </g>
      ))}
      {/* Shell: top, right side, front frame. */}
      <path d="M548 604 L716 604 L728 592 L560 592 Z" fill="#3a4452" />
      <path d="M716 604 L728 592 L728 854 L716 866 Z" fill="#141a21" />
      <rect x="548" y="604" width="168" height="262" fill="url(#pc-rack-lam)" />
      <rect x="560" y="614" width="144" height="242" fill="#06090d" />
      {/* Extrusions and corners. */}
      <rect x="548" y="603" width="168" height="5" fill="#8f9aa6" />
      <rect x="548" y="861" width="168" height="5" fill="#6c7682" />
      <rect x="548" y="604" width="5" height="262" fill="#6c7682" />
      <rect x="711" y="604" width="5" height="262" fill="#6c7682" />
      <path d="M560 592 L728 592" stroke="#7b8693" strokeWidth="2" />
      {[
        [551, 606],
        [713, 606],
        [551, 863],
        [713, 863],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#a7b1bc" />
      ))}
      {/* Rack rails. */}
      <rect x="562" y="614" width="6" height="242" fill="#2a313b" />
      <rect x="696" y="614" width="6" height="242" fill="#2a313b" />

      {units.map((u, i) => (
        <g key={i}>
          <rect x="566" y={u.y} width="132" height={u.h} rx="1" fill={u.kind === "blank" ? "#11161d" : "#1c232d"} />
          {u.kind === "power" && (
            <>
              {Array.from({ length: 6 }, (_, j) => (
                <circle key={j} cx={584 + j * 9} cy={u.y + 7.5} r="1.8" fill="#3ddc84" />
              ))}
              <rect x="664" y={u.y + 4} width="22" height="7" rx="1" fill="#0a0e13" stroke="#ff7a1a" strokeWidth="0.8" />
            </>
          )}
          {u.kind === "amp" && (
            <>
              <rect x="572" y={u.y + 4} width="5" height={u.h - 8} rx="1.5" fill="#6d7884" />
              <rect x="687" y={u.y + 4} width="5" height={u.h - 8} rx="1.5" fill="#6d7884" />
              <rect x="586" y={u.y + 9} width="30" height="12" rx="1" fill="#0d3f66" />
              {Array.from({ length: 5 }, (_, j) => (
                <rect key={j} x={626 + j * 6} y={u.y + 12} width="4" height="6" rx="0.8" fill={j < 3 ? "#3ddc84" : j < 4 ? "#ffb27a" : "#20384d"} />
              ))}
              <path d={`M660 ${u.y + 8} h20 M660 ${u.y + 13} h20 M660 ${u.y + 18} h20 M660 ${u.y + 23} h20`} stroke="#0a0e13" strokeWidth="2" />
            </>
          )}
          {u.kind === "patch" &&
            Array.from({ length: 12 }, (_, j) => <circle key={j} cx={578 + j * 10} cy={u.y + 7.5} r="3" fill="#0a0e13" stroke="#59636f" strokeWidth="0.8" />)}
          {u.kind === "switch" && (
            <>
              {Array.from({ length: 10 }, (_, j) => (
                <rect key={j} x={576 + j * 9} y={u.y + 4} width="6" height="6" rx="0.8" fill="#0a0e13" stroke="#4d5763" strokeWidth="0.6" />
              ))}
              <circle cx="676" cy={u.y + 7.5} r="1.8" fill="#4ea8d1" className="fc-blink" />
              <circle cx="684" cy={u.y + 7.5} r="1.8" fill="#3ddc84" />
            </>
          )}
          {u.kind === "drawer" && <rect x="616" y={u.y + 12} width="32" height="5" rx="2.5" fill="#6d7884" />}
        </g>
      ))}
      {/* Patch cables looping out of the panel. */}
      <path d="M598 714 Q604 760 588 800 Q578 830 600 846" stroke="#ff7a1a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M618 714 Q626 752 640 770" stroke="#0b0d10" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M638 714 Q646 744 676 760" stroke="#2b5f86" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** A neat over-under cable coil on the floor. */
export function CableCoil() {
  return (
    <g fill="none" strokeLinecap="round" transform="translate(-26 0)">
      <ellipse cx="800" cy="874" rx="40" ry="11" stroke="#05080c" strokeWidth="4.5" />
      <ellipse cx="801" cy="872" rx="35" ry="9" stroke="#0b0f15" strokeWidth="4" />
      <ellipse cx="799" cy="870" rx="30" ry="8" stroke="#05080c" strokeWidth="4" />
      <ellipse cx="800" cy="872" rx="38" ry="10" stroke="#3a4a5c" strokeWidth="0.8" opacity="0.7" />
      <path d="M838 874 Q856 880 872 878" stroke="#05080c" strokeWidth="4" />
      <rect x="868" y="874" width="12" height="7" rx="2" fill="#6d7884" />
    </g>
  );
}

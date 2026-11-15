/**
 * Who It's For: the Musicians & Touring Acts scene's set (DESIGN-15A.8;
 * polished in DESIGN-15A.9). Decorative; drawn in the stage's 1600 x 900
 * space, in front of the permanent stage.
 *
 * TouringLighting  the same room at soundcheck, seen from the stage: black
 *                  stage decking with spike tape (where the crowd stands in
 *                  other scenes), the show rig dimmed slightly, and a warm
 *                  spot that comes up on the guitarist when the rig is live.
 * GuitarTech       stage left: a guitar stand with two spare guitars (a blue
 *                  offset electric and a dreadnought acoustic), the guitar
 *                  tech kneeling by an open accessory case with a string
 *                  winder; once the rig is live the tech raises an open hand
 *                  ("good to go").
 * GuitarAmp        a combo amp with a mic on a short stand at its grille;
 *                  the pilot light and the tubes glow when it is live.
 * VocalMic         the vocal mic stand, beside the guitarist.
 * Pedalboard       right in front of the guitarist's feet (foreground):
 *                  tuner, overdrive, delay, and boost pedals; the tuner and
 *                  two pedal LEDs light when the rig is live. Cable run to
 *                  the amp.
 * WedgeAndSetlist  a monitor wedge labelled on gaffer tape, and the set list
 *                  taped to the deck beside it (generic; no song titles).
 *
 * Placement (DESIGN-15A.9): everything on the floor sits on the stage deck,
 * above art y 836 (the deck's front edge). At 1920 x 1080 the raised
 * selected profession card reaches art y ~874, and lower on smaller
 * desktops, so the pedalboard and set list stay fully clear of the cards.
 *
 * State: MusicianScene puts .is-live on parent groups; the changes are CSS
 * (who.css, .mu-*), instant under reduced motion.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */

const SANS = "ui-sans-serif, system-ui, sans-serif";

export function TouringLighting() {
  return (
    <g>
      <defs>
        <linearGradient id="mu-deck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#080b11" />
          <stop offset="1" stopColor="#141922" />
        </linearGradient>
        <linearGradient id="mu-spot-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe2bd" stopOpacity="0.26" />
          <stop offset="1" stopColor="#ffd09a" stopOpacity="0.07" />
        </linearGradient>
        <radialGradient id="mu-pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffcf9e" stopOpacity="0.32" />
          <stop offset="1" stopColor="#ffcf9e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mu-work" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7fd3f4" stopOpacity="0.12" />
          <stop offset="1" stopColor="#7fd3f4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="-160" y="0" width="1920" height="600" fill="#020712" opacity="0.18" />
      {/* Black stage decking with spike tape. */}
      <rect x="-160" y="598" width="1920" height="238" fill="url(#mu-deck)" />
      <path d="M-160 626 H1760 M-160 660 H1760 M-160 700 H1760 M-160 746 H1760 M-160 798 H1760" stroke="#2a3240" strokeWidth="1" opacity="0.4" />
      {[
        [700, 812, "#ff7a1a"],
        [744, 826, "#4ea8d1"],
        [1086, 776, "#ff7a1a"],
        [612, 798, "#4ea8d1"],
      ].map(([x, y, c]) => (
        <path key={`${x}-${y}`} d={`M${Number(x) - 5} ${y} h10 M${x} ${Number(y) - 3} v6`} stroke={String(c)} strokeWidth="2.4" opacity="0.8" />
      ))}
      <ellipse cx="560" cy="790" rx="200" ry="50" fill="url(#mu-work)" />
      {/* The spot on the guitarist (up when the rig is live). */}
      <g className="mu-spot">
        <polygon points="922,110 998,110 1140,834 780,834" fill="url(#mu-spot-g)" />
        <ellipse cx="960" cy="826" rx="180" ry="20" fill="url(#mu-pool)" />
      </g>
    </g>
  );
}

/** A blue offset electric, standing (spare). */
function SpareElectric() {
  return (
    <g>
      {/* Rosewood board on a maple neck, frets, dots. */}
      <rect x="437.6" y="690" width="4.8" height="48" fill="#d2a76a" />
      <rect x="438.3" y="690" width="3.4" height="48" fill="#2e1c12" />
      {[694, 699, 704, 708.5, 713, 717, 721, 725, 728.5, 732].map((fy) => (
        <path key={fy} d={`M438.3 ${fy} h3.4`} stroke="#c9d2dc" strokeWidth="0.45" />
      ))}
      {[701.5, 710.8, 719, 730].map((dy) => (
        <circle key={dy} cx="440" cy={dy} r="0.65" fill="#efe6d2" />
      ))}
      {/* Offset headstock with six tuners in a line. */}
      <path d="M437.6 690 L437 670 Q437 664 442 664 Q447 665 446.5 670 Q444 676 443 682 L442.4 690 Z" fill="#3f6f9e" />
      {[668, 671.5, 675, 678.5, 682, 685.5].map((ty) => (
        <ellipse key={ty} cx="434.8" cy={ty} rx="1.6" ry="1.1" fill="#c9d2dc" />
      ))}
      {/* Offset body, guard, two soapbars, bridge, vibrato, knobs. */}
      <path
        d="M424 742 Q428 733 438 736 Q446 739 452 733 Q461 730 462 742 Q463 750 457 756 Q464 764 461 774 Q456 785 440 784 Q423 784 420 773 Q418 763 424 756 Q419 750 424 742 Z"
        fill="#3f6f9e"
        stroke="#9fc0de"
        strokeWidth="0.7"
      />
      <path d="M426 742 Q432 737 438 739" stroke="#cfe2f2" strokeWidth="1.4" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M427 748 Q440 742 453 747 L456 768 Q448 776 434 774 Q426 770 427 760 Z" fill="#efe9df" opacity="0.92" />
      <rect x="433" y="749" width="14" height="4.2" rx="1.6" fill="#e8e0cc" stroke="#bdb39c" strokeWidth="0.4" />
      <rect x="433" y="758" width="14" height="4.2" rx="1.6" fill="#e8e0cc" stroke="#bdb39c" strokeWidth="0.4" />
      <rect x="434.5" y="767" width="11" height="1.8" rx="0.6" fill="#c9d2dc" />
      <rect x="435.5" y="772" width="9" height="3.4" rx="1" fill="#aab4bf" />
      <path d="M445 773 Q452 770 455 764" stroke="#c9d2dc" strokeWidth="0.8" fill="none" />
      <circle cx="452.5" cy="773" r="1.6" fill="#d7dee6" />
      <circle cx="456" cy="767.5" r="1.6" fill="#d7dee6" />
      <path d="M438.8 690 V772 M440 690 V772 M441.2 690 V772" stroke="#eef2f6" strokeWidth="0.3" opacity="0.7" />
    </g>
  );
}

/** A dreadnought acoustic, standing (spare). */
function SpareAcoustic() {
  return (
    <g>
      <rect x="490" y="690" width="4.4" height="40" fill="#2e1c12" />
      {[694, 698.5, 703, 707, 711, 714.5, 718, 721.5, 724.5, 727.5].map((fy) => (
        <path key={fy} d={`M490 ${fy} h4.4`} stroke="#c9d2dc" strokeWidth="0.45" />
      ))}
      {[700.8, 709, 716.2, 723].map((dy) => (
        <circle key={dy} cx="492.2" cy={dy} r="0.65" fill="#efe6d2" />
      ))}
      {/* Headstock with three tuners a side. */}
      <path d="M489.6 690 L488.6 671 Q492.2 667 495.8 671 L494.8 690 Z" fill="#2a1a10" />
      {[674, 679, 684].map((ty) => (
        <g key={ty}>
          <ellipse cx="486.4" cy={ty} rx="1.7" ry="1.1" fill="#c9d2dc" />
          <ellipse cx="498" cy={ty} rx="1.7" ry="1.1" fill="#c9d2dc" />
        </g>
      ))}
      {/* Dreadnought body: square shoulders, wide lower bout, binding. */}
      <path
        d="M479 734 Q478 727 492.2 727 Q506.4 727 505.4 734 Q506 745 502 751 Q513 758 514 769 Q514 785 492.2 785 Q470.4 785 470.4 769 Q471.4 758 482.4 751 Q478.4 745 479 734 Z"
        fill="#d9b37a"
        stroke="#3a2418"
        strokeWidth="0.9"
      />
      <path d="M481 736 Q482 731 490 730" stroke="#f3dcae" strokeWidth="1.4" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M472 770 Q474 782 488 784" stroke="#9a7240" strokeWidth="2" fill="none" opacity="0.5" />
      <circle cx="492.2" cy="745" r="6.8" fill="none" stroke="#8a6a3e" strokeWidth="1" />
      <circle cx="492.2" cy="745" r="5.2" fill="#1c120b" />
      <path d="M497.5 748 Q504 750 503 758 Q498.5 760 495.5 753 Z" fill="#4a2a18" />
      <rect x="485.2" y="769" width="14" height="3.4" rx="1.2" fill="#2a1a10" />
      {[487.5, 489.8, 492.1, 494.4, 496.7].map((bx) => (
        <circle key={bx} cx={bx} cy="770.7" r="0.5" fill="#efe2c8" />
      ))}
      <path d="M491 690 V770 M492.2 690 V770 M493.4 690 V770" stroke="#eef2f6" strokeWidth="0.3" opacity="0.7" />
    </g>
  );
}

/** A guitar stand with two spare guitars, and the guitar tech. */
export function GuitarTech() {
  return (
    <g>
      <ellipse cx="520" cy="790" rx="150" ry="6" fill="#000" opacity="0.45" />
      {/* Stand: base, uprights, and the neck yoke. */}
      <path d="M414 784 h104 M424 784 L430 704 M508 784 L502 704 M420 702 h92" stroke="#2a2f37" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M436 700 q4 4 8 0 M488 700 q4 4 8 0" stroke="#3a3f47" strokeWidth="2" fill="none" />
      <SpareElectric />
      <SpareAcoustic />

      {/* Open accessory case: foam, string packs, a winder. */}
      <path d="M596 758 L644 758 L648 744 L600 744 Z" fill="#20252c" />
      <rect x="594" y="770" width="54" height="22" rx="3" fill="#15181d" />
      <rect x="598" y="764" width="46" height="9" fill="#2a2f37" />
      {[602, 612, 622].map((sx, i) => (
        <rect key={sx} x={sx} y="762" width="8" height="6" rx="1" fill={["#ff7a1a", "#4ea8d1", "#e8edf3"][i]} />
      ))}
      <path d="M632 764 l8 -4" stroke="#c9d2dc" strokeWidth="2" strokeLinecap="round" />

      {/* The tech, kneeling: one knee up, one down; black tee and work pants. */}
      <g strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M572 742 L578 786" stroke="#1f232a" strokeWidth="11" />
        <path d="M556 742 L548 760 L548 788" stroke="#252a32" strokeWidth="11" />
      </g>
      <ellipse cx="547" cy="790" rx="8" ry="3" fill="#0a0c10" />
      <ellipse cx="583" cy="789" rx="9" ry="3" fill="#0a0c10" />
      <path d="M552 700 Q568 694 584 700 L582 746 L554 746 Z" fill="#1b1e24" />
      <path d="M552 702 Q549 724 554 744" stroke="#7fb8e6" strokeWidth="1" fill="none" opacity="0.45" />
      <path d="M584 702 Q586 724 582 744" stroke="#ffcf9e" strokeWidth="1" fill="none" opacity="0.4" />
      {/* Resting arm on the raised knee. */}
      <path d="M553 704 L545 730 L550 752" stroke="#1b1e24" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="550" cy="754" r="3.4" fill="#c99a7a" />
      {/* Head: short dark bob, turned toward the guitarist. */}
      <rect x="564" y="686" width="8" height="10" fill="#b8866a" />
      <ellipse cx="568" cy="679" rx="10" ry="12" fill="#c99a7a" />
      <path d="M557 684 Q554 664 568 663 Q583 664 580 684 L578 686 Q578 672 569 671 Q561 672 559 686 Z" fill="#1a1410" />
      <circle cx="571" cy="680" r="1.1" fill="#1a110c" />
      <circle cx="577" cy="680" r="1.1" fill="#1a110c" />
      <path d="M570 687 Q573.5 689 577 687" stroke="#6b3a2a" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Working arm: a string winder in hand; once live, a raised open
          hand toward the guitarist ("good to go"). */}
      <g className="mu-ack-down">
        <path d="M583 704 L594 728 L590 752" stroke="#1b1e24" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="590" cy="754" r="3.4" fill="#c99a7a" />
        <path d="M592 756 l7 3" stroke="#c9d2dc" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <g className="mu-ack-up">
        <path d="M583 704 L602 716 L607 694" stroke="#1b1e24" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Open palm facing out: four fingers together, thumb out. */}
        <path d="M601.5 693 L601 681 Q601 677.5 603.6 677.5 L611.4 677.5 Q614 677.5 614 681 L613.5 693 Q613 697 607.5 697 Q602 697 601.5 693 Z" fill="#c99a7a" />
        <path d="M604.6 678 V685 M607.6 677.6 V685 M610.6 678 V685" stroke="#8e6248" strokeWidth="0.7" />
        <path d="M601.6 688 Q597 685 596.4 681.4 Q596.4 679.6 598.4 680.2 Q600.6 682.6 602 685" fill="#c99a7a" stroke="#8e6248" strokeWidth="0.5" />
      </g>
    </g>
  );
}

/** A combo amp with a mic at its grille. */
export function GuitarAmp() {
  return (
    <g>
      <ellipse cx="726" cy="802" rx="90" ry="6" fill="#000" opacity="0.5" />
      <ellipse className="mu-amp-glow" cx="726" cy="694" rx="78" ry="16" fill="#ff9a4a" />
      <rect x="652" y="690" width="148" height="110" rx="6" fill="#16181d" />
      <path d="M652 696 V794 M800 696 V794" stroke="#2c323b" strokeWidth="2" />
      {[
        [655, 693],
        [797, 693],
        [655, 797],
        [797, 797],
      ].map(([cx, cy]) => (
        <rect key={`${cx}-${cy}`} x={cx - 4} y={cy - 4} width="8" height="8" rx="2" fill="#8a96a3" />
      ))}
      {/* Control panel: knobs and the pilot jewel. */}
      <rect x="662" y="697" width="128" height="15" rx="2" fill="#c9b48a" />
      {[676, 688, 700, 712, 724, 736, 748].map((kx) => (
        <circle key={kx} cx={kx} cy="704.5" r="3.1" fill="#15110e" />
      ))}
      <rect x="760" y="700" width="3" height="9" rx="1" fill="#3a3f47" />
      <circle className="mu-pilot-glow" cx="778" cy="704.5" r="9" fill="#ff3b2a" />
      <circle className="mu-pilot" cx="778" cy="704.5" r="3.4" fill="#4a1410" />
      {/* Grille cloth and a blank badge. */}
      <rect x="662" y="716" width="128" height="78" rx="3" fill="#2a2a30" />
      <path
        d={Array.from({ length: 16 }, (_, i) => `M${664 + i * 8} 718 l10 74`).join(" ")}
        stroke="#38383f"
        strokeWidth="1"
        opacity="0.6"
      />
      <rect x="672" y="722" width="22" height="7" rx="1.5" fill="#c9b48a" />
      {/* Mic on a short stand at the grille, its cable along the deck. */}
      <ellipse cx="716" cy="812" rx="13" ry="3" fill="#2a2f37" />
      <path d="M716 812 V780 L728 770" stroke="#3a3f47" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g transform="translate(728 770) rotate(-32)">
        <rect x="0" y="-3.2" width="16" height="6.4" rx="2.6" fill="#2e333b" />
        <rect x="14" y="-3.6" width="6" height="7.2" rx="2" fill="#9aa5b1" />
      </g>
      <path d="M716 812 Q690 818 664 812" stroke="#0b0d10" strokeWidth="2.2" fill="none" />
    </g>
  );
}

/** The vocal mic stand, beside the guitarist. */
export function VocalMic() {
  return (
    <g>
      <ellipse cx="770" cy="824" rx="30" ry="4" fill="#000" opacity="0.45" />
      <path d="M770 802 L746 822 M770 802 L794 822 M770 802 L772 826" stroke="#2a2f37" strokeWidth="3.2" strokeLinecap="round" />
      <rect x="768.5" y="520" width="3" height="284" fill="#3a3f47" />
      <path d="M769.5 520 V802" stroke="#8a96a3" strokeWidth="0.8" opacity="0.6" />
      <rect x="766" y="630" width="8" height="10" rx="1.5" fill="#2a2f37" />
      <path d="M770 522 L816 488" stroke="#3a3f47" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(816 488) rotate(-38)">
        <rect x="0" y="-3" width="20" height="6" rx="2" fill="#1a1d22" />
        <circle cx="25" cy="0" r="6" fill="#9aa5b1" />
        <path d="M21 -3 L29 3 M21 3 L29 -3" stroke="#5d6773" strokeWidth="0.7" />
      </g>
    </g>
  );
}

/** The pedalboard right in front of the guitarist's feet (foreground). */
export function Pedalboard() {
  const pedals: { x: number; c: string; kind: "tuner" | "drive" | "delay" | "boost" }[] = [
    { x: 890, c: "#2a2f37", kind: "tuner" },
    { x: 922, c: "#d0702a", kind: "drive" },
    { x: 954, c: "#2f6f9e", kind: "delay" },
    { x: 986, c: "#aab4bf", kind: "boost" },
  ];
  return (
    <g className="mu-board">
      <ellipse cx="950" cy="836" rx="84" ry="5" fill="#000" opacity="0.55" />
      {/* Cable run from the board to the amp. */}
      <path d="M884 826 Q850 830 826 816 Q806 806 798 798" stroke="#0b0d10" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M878 834 L1022 834 L1014 808 L886 808 Z" fill="#1a1d22" />
      <rect x="878" y="830" width="144" height="6" rx="1" fill="#0e1014" />
      {pedals.map(({ x, c, kind }) => (
        <g key={kind}>
          <rect x={x} y="806" width="26" height="22" rx="2.5" fill={c} />
          <path d={`M${x + 1} 807 h24`} stroke="#fff" strokeWidth="0.8" opacity="0.25" />
          {kind === "tuner" ? (
            <rect className="mu-tune-screen" x={x + 4} y="809" width="18" height="6.5" rx="1" fill="#11161d" />
          ) : (
            <>
              <circle cx={x + 7.5} cy="811" r="2.1" fill="#15110e" />
              <circle cx={x + 18.5} cy="811" r="2.1" fill="#15110e" />
              <circle className={kind === "drive" ? "mu-led" : kind === "delay" ? "mu-led-b" : undefined} cx={x + 13} cy="817" r="1.7" fill="#3a1410" />
            </>
          )}
          <circle cx={x + 13} cy="823" r="3.4" fill="#c9d2dc" stroke="#6c7682" strokeWidth="0.8" />
        </g>
      ))}
      <path d="M916 810 q3 -4 6 0 M948 810 q3 -4 6 0 M980 810 q3 -4 6 0" stroke="#0b0d10" strokeWidth="1.6" fill="none" />
    </g>
  );
}

/** A monitor wedge (seen from behind, labelled on gaffer tape) and the set
 *  list taped to the deck beside it. */
export function WedgeAndSetlist() {
  return (
    <g transform="translate(-16 0)">
      <ellipse cx="1110" cy="836" rx="72" ry="5" fill="#000" opacity="0.55" />
      <path d="M1046 834 L1172 834 L1166 790 L1062 776 Z" fill="#11151b" />
      <path d="M1062 776 L1166 790" stroke="#3a6a94" strokeWidth="1.4" opacity="0.8" />
      <rect x="1088" y="802" width="44" height="12" rx="1" fill="#e9e4d8" transform="rotate(4 1110 808)" />
      <text x="1110" y="811" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1a2533" fontFamily={SANS} transform="rotate(4 1110 808)">
        MON 3
      </text>
      <path d="M1172 828 Q1190 832 1216 830" stroke="#0b0d10" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* Set list taped to the deck: header, numbered lines; no song titles. */}
      <g className="mu-setlist" transform="translate(-10 0) rotate(-5 1206 808)">
        <ellipse cx="1206" cy="834" rx="26" ry="3" fill="#000" opacity="0.35" />
        <rect x="1184" y="782" width="44" height="50" fill="#f2efe7" />
        <rect x="1180" y="779" width="11" height="6" fill="#4ea8d1" opacity="0.9" />
        <rect x="1221" y="779" width="11" height="6" fill="#4ea8d1" opacity="0.9" />
        <text x="1189" y="794" fontSize="7.5" fontWeight="800" fill="#1a2533" letterSpacing="0.6" fontFamily={SANS}>
          SET
        </text>
        {[801, 808, 815, 822, 828].map((ly, i) => (
          <path key={ly} d={`M1189 ${ly} h3.5 M1196 ${ly} h${20 + ((i * 7) % 10)}`} stroke="#3a4452" strokeWidth="1.4" />
        ))}
      </g>
    </g>
  );
}

/**
 * Who It's For: the Musicians & Touring Acts scene's set (DESIGN-15A.8).
 * Decorative; drawn in the stage's 1600 x 900 space, in front of the
 * permanent stage.
 *
 * TouringLighting  the same room at soundcheck, seen from the stage: black
 *                  stage decking with spike tape (where the crowd stands in
 *                  other scenes), the show rig dimmed slightly, and a warm
 *                  spot that comes up on the guitarist when the rig is live.
 * GuitarTech       stage left: a guitar stand with two spare guitars, the
 *                  guitar tech kneeling by an open accessory case (strings,
 *                  a winder); gives a thumbs-up once the rig is live.
 * GuitarAmp        a combo amp with a mic on a short stand at its grille;
 *                  the pilot light and the tubes glow when it is live.
 * VocalMic         the vocal mic stand the guitarist stepped back from.
 * Pedalboard       at the guitarist's feet (foreground): tuner, overdrive,
 *                  delay, and boost pedals; the tuner and two pedal LEDs
 *                  light when the rig is live. Cable run to the amp.
 * Wedge, Setlist   a monitor wedge labelled on gaffer tape, and the set
 *                  list taped to the deck (generic; no song titles).
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
        [772, 868, "#4ea8d1"],
        [1086, 832, "#ff7a1a"],
        [612, 798, "#4ea8d1"],
      ].map(([x, y, c]) => (
        <path key={`${x}-${y}`} d={`M${Number(x) - 5} ${y} h10 M${x} ${Number(y) - 3} v6`} stroke={String(c)} strokeWidth="2.4" opacity="0.8" />
      ))}
      <ellipse cx="560" cy="790" rx="200" ry="50" fill="url(#mu-work)" />
      {/* The spot on the guitarist (up when the rig is live). */}
      <g className="mu-spot">
        <polygon points="928,120 1004,120 1150,880 780,880" fill="url(#mu-spot-g)" />
        <ellipse cx="962" cy="872" rx="190" ry="22" fill="url(#mu-pool)" />
      </g>
    </g>
  );
}

/** A guitar stand with two spare guitars, and the guitar tech. */
export function GuitarTech() {
  return (
    <g>
      <ellipse cx="520" cy="790" rx="150" ry="6" fill="#000" opacity="0.45" />
      {/* Stand: base and neck rest. */}
      <path d="M414 782 h104 M424 782 L430 700 M508 782 L502 700 M420 696 h92" stroke="#2a2f37" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      {/* Spare 1: a blue offset electric. */}
      <rect x="437.5" y="652" width="5" height="96" fill="#6b4a2e" />
      <path d="M436 640 L444 640 L446 654 L434 654 Z" fill="#2f5f8c" />
      <path d="M422 760 Q420 740 432 738 Q440 742 448 736 Q462 738 460 758 Q462 780 440 782 Q420 782 422 760 Z" fill="#3f6f9e" stroke="#e8edf3" strokeWidth="0.8" />
      <rect x="432" y="752" width="16" height="10" rx="2" fill="#e8edf3" opacity="0.85" />
      {/* Spare 2: a natural acoustic. */}
      <rect x="485.5" y="650" width="5" height="92" fill="#6b4a2e" />
      <path d="M484 636 L492 636 L494 652 L482 652 Z" fill="#3a2418" />
      <ellipse cx="488" cy="748" rx="16" ry="13" fill="#d9b37a" />
      <ellipse cx="488" cy="768" rx="21" ry="15" fill="#d9b37a" stroke="#8a6a3e" strokeWidth="0.8" />
      <circle cx="488" cy="752" r="5" fill="#2a1a10" />
      <rect x="480" y="772" width="16" height="3" rx="1" fill="#3a2418" />

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
      {/* Working arm: a string winder in hand, or a thumbs-up when live. */}
      <g className="mu-thumb-down">
        <path d="M583 704 L594 728 L590 752" stroke="#1b1e24" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="590" cy="754" r="3.4" fill="#c99a7a" />
        <path d="M592 756 l7 3" stroke="#c9d2dc" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <g className="mu-thumb-up">
        <path d="M583 704 L600 716 L604 694" stroke="#1b1e24" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="600" y="684" width="8" height="9" rx="2.5" fill="#c99a7a" />
        <rect x="602.5" y="677" width="3" height="8" rx="1.5" fill="#c99a7a" />
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

/** The vocal mic stand, the guitarist stepped back from it to tune. */
export function VocalMic() {
  return (
    <g>
      <ellipse cx="790" cy="870" rx="30" ry="4" fill="#000" opacity="0.45" />
      <path d="M790 846 L766 868 M790 846 L814 868 M790 846 L792 872" stroke="#2a2f37" strokeWidth="3.2" strokeLinecap="round" />
      <rect x="788.5" y="540" width="3" height="308" fill="#3a3f47" />
      <path d="M789.5 540 V846" stroke="#8a96a3" strokeWidth="0.8" opacity="0.6" />
      <rect x="786" y="640" width="8" height="10" rx="1.5" fill="#2a2f37" />
      <path d="M790 542 L834 508" stroke="#3a3f47" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(834 508) rotate(-38)">
        <rect x="0" y="-3" width="20" height="6" rx="2" fill="#1a1d22" />
        <circle cx="25" cy="0" r="6" fill="#9aa5b1" />
        <path d="M21 -3 L29 3 M21 3 L29 -3" stroke="#5d6773" strokeWidth="0.7" />
      </g>
    </g>
  );
}

/** The pedalboard at the guitarist's feet (foreground). */
export function Pedalboard() {
  const pedals: { x: number; c: string; kind: "tuner" | "drive" | "delay" | "boost" }[] = [
    { x: 878, c: "#2a2f37", kind: "tuner" },
    { x: 908, c: "#d0702a", kind: "drive" },
    { x: 938, c: "#2f6f9e", kind: "delay" },
    { x: 968, c: "#aab4bf", kind: "boost" },
  ];
  return (
    <g>
      <ellipse cx="936" cy="896" rx="80" ry="5" fill="#000" opacity="0.55" />
      {/* Cable run from the board to the amp. */}
      <path d="M874 884 Q838 886 812 862 Q796 846 790 812" stroke="#0b0d10" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M866 893 L1006 893 L998 868 L874 868 Z" fill="#1a1d22" />
      <rect x="866" y="889" width="140" height="6" rx="1" fill="#0e1014" />
      {pedals.map(({ x, c, kind }) => (
        <g key={kind}>
          <rect x={x} y="866" width="24" height="21" rx="2.5" fill={c} />
          {kind === "tuner" ? (
            <rect className="mu-tune-screen" x={x + 4} y="869" width="16" height="6" rx="1" fill="#11161d" />
          ) : (
            <>
              <circle cx={x + 7} cy="871" r="2" fill="#15110e" />
              <circle cx={x + 17} cy="871" r="2" fill="#15110e" />
              <circle className={kind === "drive" ? "mu-led" : kind === "delay" ? "mu-led-b" : undefined} cx={x + 12} cy="877" r="1.6" fill="#3a1410" />
            </>
          )}
          <circle cx={x + 12} cy="882.5" r="3.2" fill="#c9d2dc" stroke="#6c7682" strokeWidth="0.8" />
        </g>
      ))}
      <path d="M902 870 q3 -4 6 0 M932 870 q3 -4 6 0 M962 870 q3 -4 6 0" stroke="#0b0d10" strokeWidth="1.6" fill="none" />
    </g>
  );
}

/** A monitor wedge (seen from behind, labelled on gaffer tape) and the set
 *  list taped to the deck. */
export function WedgeAndSetlist() {
  return (
    <g>
      <ellipse cx="1112" cy="892" rx="72" ry="5" fill="#000" opacity="0.55" />
      <path d="M1046 890 L1176 890 L1170 846 L1064 832 Z" fill="#11151b" />
      <path d="M1064 832 L1170 846" stroke="#3a6a94" strokeWidth="1.4" opacity="0.8" />
      <rect x="1090" y="858" width="44" height="12" rx="1" fill="#e9e4d8" transform="rotate(4 1112 864)" />
      <text x="1112" y="867" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1a2533" fontFamily={SANS} transform="rotate(4 1112 864)">
        MON 3
      </text>
      <path d="M1176 884 Q1196 892 1230 888" stroke="#0b0d10" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* Set list: header, numbered lines; no song titles. */}
      <g transform="rotate(-6 1212 876)">
        <rect x="1192" y="852" width="40" height="44" fill="#f2efe7" />
        <rect x="1188" y="850" width="10" height="5" fill="#4ea8d1" opacity="0.85" />
        <rect x="1226" y="850" width="10" height="5" fill="#4ea8d1" opacity="0.85" />
        <text x="1196" y="862" fontSize="6.5" fontWeight="800" fill="#1a2533" fontFamily={SANS}>
          SET
        </text>
        {[868, 874, 880, 886, 892].map((ly, i) => (
          <path key={ly} d={`M1196 ${ly} h3 M1202 ${ly} h${18 + ((i * 7) % 9)}`} stroke="#3a4452" strokeWidth="1.3" />
        ))}
      </g>
    </g>
  );
}

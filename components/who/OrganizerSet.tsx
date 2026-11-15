import type { CSSProperties, ReactNode } from "react";

/**
 * Who It's For: the Event Organizers & Producers scene's set (DESIGN-15A.7;
 * staffer and wayfinding sign refined in DESIGN-15A.8). Decorative; drawn in the stage's 1600 x 900 space, in front of the
 * permanent stage.
 *
 * OrganizerLighting  the same room before doors: an empty, polished event
 *                    floor (where the crowd stands in other scenes), work
 *                    light at registration and a cool pool at the entrance;
 *                    the show rig dimmed slightly. Background unchanged.
 * CheckInDesk        guest registration: a skirted desk ("Registration",
 *                    "Check-in"), badge trays, a check-in staffer in an
 *                    event polo with a STAFF credential, and the desk's run-of-show screen showing the
 *                    "Doors" cue (Standby, or Open once doors are called).
 *                    When doors open the staffer holds out a badge.
 * Guests             three guests waiting at the rope line (one with a
 *                    ticket on her phone); when doors open they step up to
 *                    registration, one after another.
 * RopeLine           chrome stanchions and a velvet rope; when doors open
 *                    the rope is unhooked and hangs from the near post.
 * WayfindingSign     a freestanding conference wayfinding sign: a wide
 *                    framed panel on two posts (Registration, Main Hall,
 *                    Sessions; generic, no invented names).
 *
 * State: OrganizerScene puts .is-open on a parent group; the changes are
 * CSS (who.css, .og-*), instant under reduced motion. `open` is passed only
 * where the text itself changes (the desk screen).
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */

const SANS = "ui-sans-serif, system-ui, sans-serif";

export function OrganizerLighting() {
  return (
    <g>
      <defs>
        <linearGradient id="og-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#060e1a" />
          <stop offset="1" stopColor="#10203a" />
        </linearGradient>
        <radialGradient id="og-warm" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffcf9e" stopOpacity="0.2" />
          <stop offset="1" stopColor="#ffcf9e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="og-cool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7fd3f4" stopOpacity="0.16" />
          <stop offset="1" stopColor="#7fd3f4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="-160" y="0" width="1920" height="600" fill="#020712" opacity="0.22" />
      {/* Empty, polished floor with soft reflections. */}
      <rect x="-160" y="598" width="1920" height="238" fill="url(#og-floor)" />
      <path d="M-160 640 H1760 M-160 700 H1760 M-160 772 H1760" stroke="#2f5374" strokeWidth="1" opacity="0.18" />
      <ellipse cx="760" cy="606" rx="420" ry="10" fill="#7fb8e6" opacity="0.06" />
      <ellipse cx="565" cy="770" rx="250" ry="70" fill="url(#og-warm)" />
      <ellipse cx="810" cy="800" rx="150" ry="44" fill="url(#og-cool)" />
      <ellipse cx="1020" cy="850" rx="230" ry="60" fill="url(#og-warm)" />
    </g>
  );
}

/** The check-in staffer (a supporting character, drawn with less detail
 *  than the producer): body behind the desk. An event polo, a navy lanyard
 *  with a STAFF credential, short curls faded at the sides; leaning in with
 *  one forearm on the desk, looking toward the guests. */
function StafferBody() {
  return (
    <g>
      <defs>
        <linearGradient id="og-polo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a24c1c" />
          <stop offset="0.55" stopColor="#c95f26" />
          <stop offset="1" stopColor="#da7434" />
        </linearGradient>
        <linearGradient id="og-staff-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8e5c3d" />
          <stop offset="0.55" stopColor="#ab7550" />
          <stop offset="1" stopColor="#bf8a63" />
        </linearGradient>
      </defs>
      {/* Resting arm: short sleeve, forearm along the desk to the trays. */}
      <path d="M512 610 L522 613 L517 640 L506 636 Z" fill="url(#og-staff-skin)" />
      <path d="M506 632 L517 637 L501 662 L490 659 Z" fill="url(#og-staff-skin)" />
      <path d="M488 655 Q481 659 485 665 L498 665 Q503 662 499 657 Z" fill="#a06c48" />
      <path d="M519 602 L509 611 L505 630 L516 634 L521 616 Z" fill="url(#og-polo)" />
      {/* Event polo: collar, placket, folds, rim light. */}
      <path d="M519 602 Q528 595 540 594 Q552 595 561 602 L566 616 L563 666 L517 666 L514 616 Z" fill="url(#og-polo)" />
      <path d="M538.5 600 h3.2 v15 h-3.2 z" fill="#9e4719" />
      <circle cx="540.1" cy="605" r="0.8" fill="#f4e3d6" />
      <circle cx="540.1" cy="610.5" r="0.8" fill="#f4e3d6" />
      <path d="M531 596 L540 601 L535 608 Z M549 596 L540 601 L545 608 Z" fill="#b8561f" stroke="#8e3f15" strokeWidth="0.6" />
      <path d="M524 628 Q531 637 527 654 M557 626 Q550 640 555 657 M530 618 Q540 623 550 618" stroke="#8e3f15" strokeWidth="1" fill="none" opacity="0.55" />
      <path d="M514 616 L517 664" stroke="#7fb8e6" strokeWidth="1" opacity="0.4" />
      <path d="M566 616 L563 664" stroke="#ffcf9e" strokeWidth="1" opacity="0.4" />
      {/* Lanyard and STAFF credential. */}
      <path d="M534 598 L541 637 M546 598 L543 637" stroke="#12304d" strokeWidth="1.8" fill="none" />
      <rect x="534" y="635" width="17" height="22" rx="1.6" fill="#f4f7fa" />
      <rect x="534" y="635" width="17" height="7" rx="1.6" fill="#12304d" />
      <text x="542.5" y="640.6" textAnchor="middle" fontSize="4" fontWeight="800" fill="#fff" letterSpacing="0.3" fontFamily={SANS}>
        STAFF
      </text>
      <rect x="536.5" y="644.5" width="5" height="6" fill="#b6c3d1" />
      <path d="M543.5 646 h5 M543.5 649 h4" stroke="#8a97a6" strokeWidth="1" />
      {/* Neck and head. */}
      <path d="M535 583 L545 583 L546 597 L534 597 Z" fill="url(#og-staff-skin)" />
      <path d="M535 589 Q540 593 545 589 L545 592 Q540 596 535 592 Z" fill="#5e3a26" opacity="0.4" />
      <ellipse cx="527.6" cy="574" rx="2.1" ry="3.5" fill="#9a6644" />
      <ellipse cx="552.4" cy="574" rx="2.1" ry="3.5" fill="#b58059" />
      <path d="M527.5 572 Q527.5 588 540 590.5 Q552.5 588 552.5 572 Q552.5 557 540 557 Q527.5 557 527.5 572 Z" fill="url(#og-staff-skin)" />
      <path d="M529 577 Q531 587 539 590 Q533 583 532.5 575 Z" fill="#5e3a26" opacity="0.3" />
      {/* Short curls on top, faded at the sides. */}
      <path d="M527.4 571 Q525 553 540 551.5 Q555 553 552.6 571 Q551 562 545 560.2 Q540 559.4 535 560.2 Q529 562 527.4 571 Z" fill="#1e140e" />
      {[
        [531, 557],
        [536, 553.6],
        [541.5, 552.6],
        [547, 554],
        [551, 558],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="2.6" fill="#1e140e" />
      ))}
      <path d="M533 555 q2 -1.5 4 0 M541 553.5 q2 -1.5 4 0" stroke="#4a3528" strokeWidth="0.8" fill="none" />
      <path d="M528 566 L528.6 572 M552 566 L551.4 572" stroke="#3a2a1f" strokeWidth="1.6" opacity="0.5" />
      {/* Face, looking toward the guests. */}
      <path d="M532 567.8 Q535 566.2 538 567.2 M542 567.2 Q545 566.2 548 567.8" stroke="#1e140e" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <ellipse cx="535.2" cy="572.3" rx="2.1" ry="1.45" fill="#f1e6da" />
      <ellipse cx="545.2" cy="572.3" rx="2.1" ry="1.45" fill="#f1e6da" />
      <circle cx="536" cy="572.4" r="1.05" fill="#1a110c" />
      <circle cx="546" cy="572.4" r="1.05" fill="#1a110c" />
      <path d="M540.6 574 L541.8 579 L539.2 579.6" stroke="#6e4630" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M535.8 583 Q540.6 586.4 545.4 583" stroke="#5e3020" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <ellipse cx="546" cy="565" rx="4" ry="1.4" fill="#d8a882" opacity="0.35" />
      <path d="M552.5 570 Q552 584 544 589" stroke="#ffcf9e" strokeWidth="0.9" fill="none" opacity="0.45" />
    </g>
  );
}

/** The staffer's badge arm, over the desk: rests, then holds out a badge
 *  (rotates about the shoulder, see .og-badge-arm in who.css). */
export function StafferBadgeArm() {
  return (
    <g className="og-badge-arm">
      <path d="M561 627 L571 624 L578 638 L568 643 Z" fill="url(#og-staff-skin)" />
      <path d="M568 640 L577 635 L593 646 L588 654 Z" fill="url(#og-staff-skin)" />
      <path d="M556 600 L566 606 L571 627 L561 631 L556 612 Z" fill="url(#og-polo)" />
      <path d="M566 607 L571 626" stroke="#ffcf9e" strokeWidth="0.9" opacity="0.4" />
      <g className="og-badge">
        <path d="M596 640 L594 652" stroke="#ff7a1a" strokeWidth="1.4" />
        <rect x="594" y="648" width="13" height="17" rx="1.5" fill="#f4f7fa" />
        <rect x="594" y="648" width="13" height="4.5" rx="1.5" fill="#4ea8d1" />
      </g>
      <path d="M587 646 Q595 642 599 648 Q601 655 594 657 Q587 657 586.5 651 Z" fill="#b8835e" />
      <path d="M592 648.5 q3.5 -0.5 5 2" stroke="#8e5c3d" strokeWidth="0.8" fill="none" />
    </g>
  );
}

export function CheckInDesk({ open }: { open: boolean }) {
  return (
    <g>
      <defs>
        <linearGradient id="og-drape" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0d1e33" />
          <stop offset="0.6" stopColor="#163150" />
          <stop offset="1" stopColor="#1d3d62" />
        </linearGradient>
      </defs>
      <StafferBody />
      <ellipse cx="565" cy="784" rx="160" ry="7" fill="#000" opacity="0.5" />
      {/* Desk top and its skirted front. */}
      <path d="M424 676 L706 676 L700 664 L432 664 Z" fill="#2c3846" />
      <rect x="424" y="676" width="282" height="106" fill="url(#og-drape)" />
      <path d="M454 680 L452 780 M494 680 L493 780 M636 680 L637 780 M676 680 L678 780" stroke="#081424" strokeWidth="1.4" opacity="0.6" />
      <rect x="424" y="688" width="282" height="4" fill="#ff7a1a" />
      <text x="565" y="728" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" letterSpacing="3" fontFamily={SANS}>
        REGISTRATION
      </text>
      <text x="565" y="746" textAnchor="middle" fontSize="8.5" fill="#a8dcff" letterSpacing="1.2" fontFamily={SANS}>
        Guest check-in
      </text>
      <path d="M424 676 L424 782" stroke="#7fb8e6" strokeWidth="1.2" opacity="0.4" />
      <path d="M706 676 L706 782" stroke="#ffcf9e" strokeWidth="1.4" opacity="0.35" />
      {/* Badge trays: rows of printed badges. */}
      {[446, 482].map((tx) => (
        <g key={tx}>
          <path d={`M${tx} 668 L${tx + 32} 668 L${tx + 30} 658 L${tx + 2} 658 Z`} fill="#3d4a5a" />
          {[0, 1, 2, 3].map((j) => (
            <rect key={j} x={tx + 3 + j * 7} y="652" width="5.5" height="8" rx="0.8" fill="#eef2f6" />
          ))}
          {[0, 1, 2, 3].map((j) => (
            <rect key={`b${j}`} x={tx + 3 + j * 7} y="652" width="5.5" height="2.2" fill="#4ea8d1" />
          ))}
        </g>
      ))}
      {/* The desk's run-of-show screen: the Doors cue. */}
      {/* Raised on its stand so the staffer's badge hand passes below it. */}
      <rect x="645" y="634" width="6" height="28" fill="#2a313b" />
      <ellipse cx="648" cy="664" rx="14" ry="2.6" fill="#2a313b" />
      <g transform="translate(0 -16)">
      <rect x="598" y="584" width="100" height="68" rx="3" fill="#0b0e13" />
      <rect x="602" y="588" width="92" height="60" fill="#0a2238" />
      <rect className="og-glow" x="602" y="588" width="92" height="60" fill="#3ddc84" opacity="0" />
      <text x="607" y="598" fontSize="5.5" fontWeight="700" fill="#a8dcff" letterSpacing="0.5" fontFamily={SANS}>
        RUN OF SHOW · NOW
      </text>
      <text x="607" y="616" fontSize="12" fontWeight="800" fill="#fff" fontFamily={SANS}>
        Doors
      </text>
      <text x="689" y="616" textAnchor="end" fontSize="6.5" fill="#a8dcff" fontFamily={SANS}>
        6:00 PM
      </text>
      <rect x="607" y="622" width={open ? 30 : 40} height="9" rx="4.5" fill={open ? "#1f6b45" : "#5a3415"} />
      <circle cx="612" cy="626.5" r="1.8" fill={open ? "#3ddc84" : "#ffb27a"} />
      <text x="616" y="628.7" fontSize="5.8" fontWeight="800" fill={open ? "#c8f5da" : "#ffd2ad"} letterSpacing="0.4" fontFamily={SANS}>
        {open ? "OPEN" : "STANDBY"}
      </text>
      <text x="607" y="642" fontSize="5.4" fill="#cfd8e2" fontFamily={SANS}>
        Next · Welcome 6:30 PM
      </text>
      </g>
    </g>
  );
}

/** One guest, standing (stroke-built like the other supporting figures). */
function Guest({ x, floor, top, legs, skin, hair, phone, i }: { x: number; floor: number; top: string; legs: string; skin: string; hair: ReactNode; phone?: boolean; i: number }) {
  return (
    <g className="og-guest" style={{ "--og-i": i } as CSSProperties}>
      <ellipse cx={x} cy={floor + 2} rx="20" ry="3.5" fill="#000" opacity="0.45" />
      <g strokeLinecap="round" fill="none">
        <path d={`M${x - 6} ${floor - 92} L${x - 7} ${floor - 3}`} stroke={legs} strokeWidth="9.5" />
        <path d={`M${x + 6} ${floor - 92} L${x + 7} ${floor - 3}`} stroke={legs} strokeWidth="9.5" />
      </g>
      <ellipse cx={x - 8} cy={floor} rx="6.5" ry="2.8" fill="#0a0c10" />
      <ellipse cx={x + 8} cy={floor} rx="6.5" ry="2.8" fill="#0a0c10" />
      <path d={`M${x - 15} ${floor - 168} Q${x} ${floor - 174} ${x + 15} ${floor - 168} L${x + 14} ${floor - 92} L${x - 14} ${floor - 92} Z`} fill={top} />
      <path d={`M${x - 15} ${floor - 168} L${x - 18} ${floor - 112}`} stroke={top} strokeWidth="7" strokeLinecap="round" />
      {phone ? (
        <>
          <path d={`M${x + 15} ${floor - 168} L${x + 20} ${floor - 136} L${x + 8} ${floor - 126}`} stroke={top} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x={x + 1} y={floor - 136} width="7" height="11" rx="1.2" fill="#0b0e13" />
          <rect x={x + 2} y={floor - 135} width="5" height="8" fill="#bfe6ff" />
          <circle cx={x + 7} cy={floor - 126} r="2.8" fill={skin} />
        </>
      ) : (
        <path d={`M${x + 15} ${floor - 168} L${x + 18} ${floor - 112}`} stroke={top} strokeWidth="7" strokeLinecap="round" />
      )}
      <rect x={x - 3.5} y={floor - 181} width="7" height="10" fill={skin} />
      <ellipse cx={x} cy={floor - 189} rx="9" ry="11" fill={skin} />
      {hair}
      <path d={`M${x - 15} ${floor - 166} L${x - 14} ${floor - 94}`} stroke="#7fb8e6" strokeWidth="1" opacity="0.4" />
    </g>
  );
}

export function Guests() {
  const f = 762;
  return (
    <g>
      <Guest
        i={0}
        x={772}
        floor={f}
        top="#5b3a5e"
        legs="#16181d"
        skin="#d7a685"
        phone
        hair={<path d={`M763 ${f - 190} Q762 ${f - 204} 772 ${f - 204} Q783 ${f - 204} 781 ${f - 188} L782 ${f - 176} L777 ${f - 178} Q779 ${f - 192} 772 ${f - 195} Q766 ${f - 192} 767 ${f - 178} L762 ${f - 176} Z`} fill="#1d1410" />}
      />
      <Guest
        i={1}
        x={814}
        floor={f - 4}
        top="#7fa6c8"
        legs="#6e6450"
        skin="#8d5b3f"
        hair={<path d={`M805 ${f - 196} Q805 ${f - 207} 814 ${f - 207} Q823 ${f - 207} 823 ${f - 196} Q818 ${f - 201} 814 ${f - 201} Q810 ${f - 201} 805 ${f - 196} Z`} fill="#120c08" />}
      />
      <Guest
        i={2}
        x={856}
        floor={f - 2}
        top="#a5532e"
        legs="#1d2a40"
        skin="#e2b897"
        hair={
          <>
            <circle cx="856" cy={f - 205} r="5" fill="#6b4a2e" />
            <path d={`M847 ${f - 191} Q846 ${f - 203} 856 ${f - 203} Q866 ${f - 203} 865 ${f - 191} Q861 ${f - 198} 856 ${f - 198} Q851 ${f - 198} 847 ${f - 191} Z`} fill="#6b4a2e" />
          </>
        }
      />
    </g>
  );
}

/** Stanchions and a velvet rope: hooked across, or unhooked and hanging. */
export function RopeLine() {
  const post = (x: number) => (
    <g key={x}>
      <ellipse cx={x} cy="806" rx="15" ry="4" fill="#9aa5b1" />
      <ellipse cx={x} cy="805" rx="12" ry="2.6" fill="#c9d2dc" />
      <rect x={x - 2.6} y="722" width="5.2" height="83" fill="#b5bfca" />
      <path d={`M${x - 1} 722 V805`} stroke="#eef2f6" strokeWidth="1" opacity="0.7" />
      <circle cx={x} cy="719" r="4.6" fill="#d7dee6" />
    </g>
  );
  return (
    <g>
      <ellipse cx="812" cy="808" rx="90" ry="5" fill="#000" opacity="0.35" />
      {post(744)}
      {post(880)}
      <g className="og-rope-closed">
        <path d="M747 726 Q812 768 877 726" stroke="#6b2433" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <path d="M750 726 Q812 763 874 726" stroke="#a8455a" strokeWidth="1.2" fill="none" opacity="0.6" />
        <circle cx="877" cy="726" r="2.6" fill="#d7dee6" />
      </g>
      <g className="og-rope-open">
        <path d="M747 726 Q754 768 750 796 Q749 806 766 806 L800 806" stroke="#6b2433" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M750 728 Q756 768 752 796" stroke="#a8455a" strokeWidth="1.2" fill="none" opacity="0.6" />
        <circle cx="800" cy="806" r="2.6" fill="#d7dee6" />
      </g>
      <circle cx="747" cy="726" r="2.6" fill="#d7dee6" />
    </g>
  );
}

/** A freestanding conference wayfinding sign: a wide framed panel on two
 *  posts and a weighted base. Generic labels; no invented names. */
export function WayfindingSign() {
  const rows: { dir: "left" | "right" | "up"; label: string; sub: string; y: number; tone: string }[] = [
    { dir: "left", label: "Registration", sub: "Check-in & badges", y: 676, tone: "#ff7a1a" },
    { dir: "right", label: "Main Hall", sub: "Welcome 6:30 PM", y: 712, tone: "#3a8fc0" },
    { dir: "up", label: "Sessions", sub: "Rooms A–D", y: 748, tone: "#3a8fc0" },
  ];
  const arrow = (dir: string, x: number, y: number) =>
    dir === "left"
      ? `M${x + 15} ${y + 10} h-10 m4.2 -4.2 l-4.2 4.2 l4.2 4.2`
      : dir === "right"
        ? `M${x + 5} ${y + 10} h10 m-4.2 -4.2 l4.2 4.2 l-4.2 4.2`
        : `M${x + 10} ${y + 15} v-10 m-4.2 4.2 l4.2 -4.2 l4.2 4.2`;
  return (
    <g>
      <defs>
        <linearGradient id="og-alu" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6c7682" />
          <stop offset="0.45" stopColor="#c9d2dc" />
          <stop offset="1" stopColor="#7b8693" />
        </linearGradient>
        <linearGradient id="og-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12294a" />
          <stop offset="1" stopColor="#0c1c33" />
        </linearGradient>
      </defs>
      <ellipse cx="1310" cy="866" rx="92" ry="6" fill="#000" opacity="0.5" />
      {/* Weighted base and two posts. */}
      {[1252, 1368].map((px) => (
        <g key={px}>
          <rect x={px - 3} y="780" width="6" height="80" fill="url(#og-alu)" />
          <rect x={px - 18} y="857" width="36" height="7" rx="3" fill="url(#og-alu)" />
        </g>
      ))}
      {/* Framed panel. */}
      <rect x="1234" y="644" width="152" height="140" rx="4" fill="url(#og-alu)" />
      <rect x="1239" y="649" width="142" height="130" fill="url(#og-panel)" />
      <rect x="1239" y="649" width="142" height="20" fill="#0a1628" />
      <rect x="1239" y="669" width="142" height="2.5" fill="#ff7a1a" />
      <text x="1248" y="663" fontSize="9.5" fontWeight="800" fill="#fff" letterSpacing="2" fontFamily={SANS}>
        WELCOME
      </text>
      <text x="1372" y="663" textAnchor="end" fontSize="7" fill="#a8dcff" fontFamily={SANS}>
        Level 1
      </text>
      {rows.map(({ dir, label, sub, y, tone }, i) => (
        <g key={label}>
          <rect x="1247" y={y + 2} width="20" height="20" rx="4" fill={tone} />
          <path d={arrow(dir, 1247, y + 2)} stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="1275" y={y + 12} fontSize="10.5" fontWeight="700" fill="#fff" fontFamily={SANS}>
            {label}
          </text>
          <text x="1275" y={y + 21} fontSize="6.5" fill="#a8dcff" fontFamily={SANS}>
            {sub}
          </text>
          {i < rows.length - 1 && <path d={`M1247 ${y + 30} h126`} stroke="#25476b" strokeWidth="1" />}
        </g>
      ))}
      <path d="M1234 645 h152" stroke="#eef2f6" strokeWidth="1.2" opacity="0.6" />
      <path d="M1386 650 V780" stroke="#ffcf9e" strokeWidth="1" opacity="0.3" />
    </g>
  );
}

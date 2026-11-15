import type { CSSProperties, ReactNode } from "react";

/**
 * Who It's For: the Event Organizers & Producers scene's set (DESIGN-15A.7).
 * Decorative; drawn in the stage's 1600 x 900 space, in front of the
 * permanent stage.
 *
 * OrganizerLighting  the same room before doors: an empty, polished event
 *                    floor (where the crowd stands in other scenes), work
 *                    light at registration and a cool pool at the entrance;
 *                    the show rig dimmed slightly. Background unchanged.
 * CheckInDesk        guest registration: a skirted desk ("Registration",
 *                    "Check-in"), badge trays, a check-in staffer in an
 *                    event tee, and the desk's run-of-show screen showing the
 *                    "Doors" cue (Standby, or Open once doors are called).
 *                    When doors open the staffer holds out a badge.
 * Guests             three guests waiting at the rope line (one with a
 *                    ticket on her phone); when doors open they step up to
 *                    registration, one after another.
 * RopeLine           chrome stanchions and a velvet rope; when doors open
 *                    the rope is unhooked and hangs from the near post.
 * WayfindingSign     an A-frame floor sign: Registration, Main Hall,
 *                    Sessions (generic; no invented names).
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

/** The check-in staffer: body behind the desk. */
function StafferBody() {
  return (
    <g>
      {/* Event tee. */}
      <path d="M520 600 Q540 592 560 600 L566 640 L562 680 L518 680 L514 640 Z" fill="#c9622a" />
      <path d="M520 600 Q512 620 514 640" stroke="#7fb8e6" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M533 598 Q540 604 547 598" stroke="#9c4a1d" strokeWidth="2" fill="none" />
      <text x="540" y="626" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#fff" letterSpacing="0.8" fontFamily={SANS}>
        STAFF
      </text>
      {/* Resting arm on the desk. */}
      <path d="M520 606 L508 640 L520 664" stroke="#c9622a" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M512 634 L520 664" stroke="#b07a55" strokeWidth="6.5" fill="none" strokeLinecap="round" />
      {/* Neck and head: short curls, glasses-free, friendly. */}
      <rect x="535.5" y="584" width="9" height="14" fill="#a26f4c" />
      <ellipse cx="540" cy="573" rx="12.5" ry="14.5" fill="#b8835e" />
      <path d="M527 572 Q526 556 540 555 Q554 556 553 572 Q548 562 540 562 Q531 562 527 572 Z" fill="#2a1b12" />
      {[
        [530, 561],
        [536, 556],
        [544, 556],
        [550, 561],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="3.4" fill="#2a1b12" />
      ))}
      <circle cx="536" cy="575" r="1.2" fill="#1a110c" />
      <circle cx="546" cy="575" r="1.2" fill="#1a110c" />
      <path d="M536 582 Q541 585 546 582" stroke="#6b3a2a" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** The staffer's badge arm, over the desk: rests, then holds out a badge. */
export function StafferBadgeArm() {
  return (
    <g className="og-badge-arm">
      <path d="M560 606 L574 636 L592 652" stroke="#c9622a" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M571 630 L592 652" stroke="#b07a55" strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <circle cx="594" cy="653" r="3.6" fill="#b8835e" />
      <g className="og-badge">
        <path d="M596 640 L594 652" stroke="#ff7a1a" strokeWidth="1.4" />
        <rect x="594" y="648" width="13" height="17" rx="1.5" fill="#f4f7fa" />
        <rect x="594" y="648" width="13" height="4.5" rx="1.5" fill="#4ea8d1" />
      </g>
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

/** An A-frame wayfinding sign on the floor. */
export function WayfindingSign() {
  const rows: [string, string, number][] = [
    ["←", "Registration", 726],
    ["→", "Main Hall", 756],
    ["↑", "Sessions", 786],
  ];
  return (
    <g>
      <ellipse cx="1310" cy="864" rx="66" ry="6" fill="#000" opacity="0.5" />
      {/* Back leg, then the front panel. */}
      <path d="M1286 690 L1270 862 L1278 862 L1292 694 Z" fill="#3a4452" />
      <path d="M1264 862 L1276 682 L1344 682 L1356 862 Z" fill="#c9d2dc" />
      <path d="M1268 856 L1279 688 L1341 688 L1352 856 Z" fill="#10243c" />
      <rect x="1284" y="698" width="20" height="2.5" fill="#ff7a1a" />
      {rows.map(([arrow, label, y]) => (
        <g key={label}>
          <text x="1284" y={y} fontSize="11" fontWeight="700" fill="#ffb27a" fontFamily={SANS}>
            {arrow}
          </text>
          <text x="1298" y={y - 1} fontSize="7.5" fontWeight="600" fill="#fff" fontFamily={SANS}>
            {label}
          </text>
          <path d={`M1284 ${y + 9} h56`} stroke="#2c4a6c" strokeWidth="1" />
        </g>
      ))}
      <text x="1284" y="826" fontSize="6.5" fill="#a8dcff" fontFamily={SANS}>
        Doors 6:00 PM
      </text>
      <path d="M1276 682 L1344 682" stroke="#eef2f6" strokeWidth="1.5" opacity="0.6" />
    </g>
  );
}

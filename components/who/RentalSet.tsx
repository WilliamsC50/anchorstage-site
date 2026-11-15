/**
 * Who It's For: the Rental Warehouses & Providers scene's equipment
 * (DESIGN-15A.12). Decorative except where RentalScene adds the one control;
 * drawn in the stage's 1600 x 900 space, in front of the permanent stage.
 *
 * The same stage at load-in, from the rental provider's side: an order is
 * being checked out on the deck before it goes up. Organized production
 * chaos: real touring flight cases (laminate panels, aluminium extrusions,
 * ball corners, butterfly latches, casters, tape labels; generic department
 * labels only, no invented company names).
 *
 * RentalLighting   house dimmed further for load-in; a concrete-grey floor
 *                  over the crowd area with cool work-light pools.
 * TruckPack        two closed cases stacked for the truck (AUDIO, VIDEO).
 * LedCart          LED video panels standing on a cart, pixel face forward.
 * MovingHeads      two moving-head fixtures unpacked on their case.
 * InspectionCase   the case being checked, full size beside the technician
 *                  (about 24" x 30" at her scale): a moving-head case with
 *                  an asset tag on its front. Awaiting
 *                  inspection: lid shut, latches closed, the tag's status
 *                  band amber (HOLD). Inspected (.is-scanned above): the tag
 *                  turns green (READY) with a brief confirmation ring, the
 *                  latches open and the lid swings up to show the fixture
 *                  standing in its foam.
 * CableTrunk       an open trunk of coiled cable.
 * WirelessRack     a rack case of wireless mic receivers, front cover off,
 *                  with the handheld mics in an open case on top.
 *
 * Depth: the inspected case and the cable trunk stand at the technician's
 * depth, at full size; the truck pack, LED cart, moving heads, and wireless
 * rack form a midground cluster further back (RentalScene places them).
 *
 * Placement: the floor pieces sit at or above art y 842 (the deck's front
 * edge), clear of the raised profession cards at every desktop size; the
 * tall pieces on the right stay below the side panel.
 *
 * State and motion: who.css (.rn-*), instant under reduced motion.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 */

const SANS = "ui-sans-serif, system-ui, sans-serif";

export function RentalLighting() {
  return (
    <g>
      <defs>
        <linearGradient id="rn-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b0f15" />
          <stop offset="1" stopColor="#171c24" />
        </linearGradient>
        <radialGradient id="rn-work" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#dce8ff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#dce8ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Show rig down: work lights only. */}
      <rect x="-160" y="0" width="1920" height="600" fill="#020712" opacity="0.3" />
      <rect x="-160" y="598" width="1920" height="238" fill="url(#rn-floor)" />
      <path d="M-160 640 H1760 M-160 704 H1760 M-160 780 H1760 M300 598 L240 836 M820 598 L800 836 M1340 598 L1380 836" stroke="#2a313c" strokeWidth="1" opacity="0.45" />
      <ellipse cx="560" cy="800" rx="260" ry="54" fill="url(#rn-work)" />
      <ellipse cx="960" cy="820" rx="230" ry="46" fill="url(#rn-work)" />
      <ellipse cx="1240" cy="806" rx="170" ry="40" fill="url(#rn-work)" />
    </g>
  );
}

/** A closed touring flight case seen from the front, slightly from above. */
function RoadCase({ x, y, w, h, top = 9, label, tone = "#1d232b", casters = true }: { x: number; y: number; w: number; h: number; top?: number; label?: string; tone?: string; casters?: boolean }) {
  const lid = Math.round(h * 0.28);
  return (
    <g>
      {casters &&
        [x + 12, x + w - 12].map((cx) => (
          <g key={cx}>
            <rect x={cx - 5} y={y + h} width="10" height="4" fill="#2a313b" />
            <circle cx={cx} cy={y + h + 8} r="5" fill="#0a0c10" stroke="#2f3640" strokeWidth="1.2" />
          </g>
        ))}
      {/* Top face, then the laminate front. */}
      <path d={`M${x + 4} ${y - top} L${x + w + 4} ${y - top} L${x + w} ${y} L${x} ${y} Z`} fill="#2a323d" />
      <rect x={x} y={y} width={w} height={h} fill={tone} />
      <path d={`M${x} ${y + h * 0.5} H${x + w}`} stroke="#000" strokeWidth={h * 0.9} opacity="0.12" />
      {/* Aluminium extrusions: edges and the lid seam. */}
      <rect x={x} y={y - 1} width={w} height="3" fill="#8f9aa6" />
      <rect x={x} y={y + h - 3} width={w} height="3" fill="#6c7682" />
      <rect x={x} y={y + lid} width={w} height="3" fill="#7b8693" />
      <rect x={x} y={y} width="3" height={h} fill="#6c7682" />
      <rect x={x + w - 3} y={y} width="3" height={h} fill="#6c7682" />
      {/* Ball corners and butterfly latches on the seam. */}
      {[
        [x + 2, y + 1],
        [x + w - 2, y + 1],
        [x + 2, y + h - 1],
        [x + w - 2, y + h - 1],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.4" fill="#c9d2dc" />
      ))}
      {[x + w * 0.22, x + w * 0.78].map((lx) => (
        <g key={lx}>
          <rect x={lx - 5} y={y + lid - 3} width="10" height="9" rx="1.5" fill="#aab4bf" />
          <circle cx={lx} cy={y + lid + 1.5} r="2" fill="#5d6773" />
        </g>
      ))}
      {label && (
        <g>
          <rect x={x + w / 2 - 22} y={y + lid + 10} width="44" height="13" rx="1" fill="#ece7da" />
          <text x={x + w / 2} y={y + lid + 19.3} textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#1a2533" fontFamily={SANS}>
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

/** Two closed cases stacked for the truck. */
export function TruckPack() {
  return (
    <g>
      <ellipse cx="428" cy="838" rx="70" ry="5" fill="#000" opacity="0.5" />
      <RoadCase x={374} y={744} w={108} h={78} label="AUDIO 12" />
      <RoadCase x={380} y={682} w={98} h={60} label="VIDEO 03" tone="#222a34" casters={false} />
    </g>
  );
}

/** LED video panels standing on a cart. */
export function LedCart() {
  return (
    <g>
      <defs>
        <pattern id="rn-pixels" width="5" height="5" patternUnits="userSpaceOnUse">
          <rect width="5" height="5" fill="#0b0e13" />
          <circle cx="2.5" cy="2.5" r="1" fill="#25313f" />
        </pattern>
      </defs>
      <ellipse cx="548" cy="838" rx="62" ry="5" fill="#000" opacity="0.5" />
      {/* Cart frame and casters. */}
      <rect x="494" y="814" width="108" height="8" rx="2" fill="#3a3f47" />
      {[504, 592].map((cx) => (
        <circle key={cx} cx={cx} cy="828" r="5" fill="#0a0c10" stroke="#2f3640" strokeWidth="1.2" />
      ))}
      <path d="M500 814 V690 M596 814 V690" stroke="#4a525d" strokeWidth="3" />
      {/* Panels, the front one pixel-face forward. */}
      <rect x="506" y="700" width="86" height="110" rx="2" fill="#1a1f26" transform="translate(-6 -6)" />
      <rect x="506" y="700" width="86" height="110" rx="2" fill="#1a1f26" transform="translate(-3 -3)" />
      <rect x="506" y="700" width="86" height="110" rx="2" fill="#20262e" />
      <rect x="510" y="704" width="78" height="102" fill="url(#rn-pixels)" />
      <path d="M549 704 V806 M510 755 H588" stroke="#3a4452" strokeWidth="1" />
      <rect x="538" y="696" width="22" height="5" rx="2" fill="#6c7682" />
      <rect x="520" y="812" width="56" height="10" rx="1" fill="#ece7da" />
      <text x="548" y="819.6" textAnchor="middle" fontSize="6.6" fontWeight="800" fill="#1a2533" fontFamily={SANS}>
        VIDEO 02
      </text>
    </g>
  );
}

/** One moving-head fixture standing on its base; cx at the centre line,
 *  floor at the base's foot. */
function MovingHead({ cx, floor, s = 1 }: { cx: number; floor: number; s?: number }) {
  return (
    <g transform={`translate(${cx} ${floor}) scale(${s})`}>
      <rect x="-18" y="-15" width="36" height="15" rx="3" fill="#1a1e24" />
      <rect x="-10" y="-11" width="12" height="5" rx="1" fill="#0f2233" />
      <circle cx="9" cy="-8" r="1.3" fill="#3ddc84" opacity="0.7" />
      {/* Yoke. */}
      <path d="M-16 -15 V-52 Q-16 -56 -12 -56 M16 -15 V-52 Q16 -56 12 -56" stroke="#262b33" strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="-19" y="-17" width="38" height="4" rx="2" fill="#2c323b" />
      {/* Head and lens. */}
      <rect x="-13" y="-58" width="26" height="30" rx="9" fill="#1d2229" />
      <circle cx="-16" cy="-43" r="2.4" fill="#4a525d" />
      <circle cx="16" cy="-43" r="2.4" fill="#4a525d" />
      <circle cx="0" cy="-43" r="9.5" fill="#0b1018" />
      <circle cx="0" cy="-43" r="7.6" fill="url(#rn-lens)" />
      <ellipse cx="-2.6" cy="-46" rx="2.6" ry="1.6" fill="#fff" opacity="0.55" />
    </g>
  );
}

/** Two moving heads unpacked on their case. */
export function MovingHeads() {
  return (
    <g>
      <defs>
        <radialGradient id="rn-lens" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#cfeeff" />
          <stop offset="0.5" stopColor="#4ea8d1" />
          <stop offset="1" stopColor="#123a5c" />
        </radialGradient>
      </defs>
      <ellipse cx="676" cy="838" rx="72" ry="5" fill="#000" opacity="0.5" />
      <RoadCase x={614} y={770} w={124} h={54} top={8} label="LIGHTING 07" />
      <MovingHead cx={648} floor={765} />
      <MovingHead cx={706} floor={765} />
    </g>
  );
}

/** The case being inspected (the scene's control target): a moving-head
 *  case beside the technician, its asset tag on the front. */
export function InspectionCase() {
  // At the technician's depth and full size (about 24" x 30" at her scale):
  // front x 715-885, y 656-826; top face back edge at y 620; casters to 842.
  return (
    <g>
      <ellipse cx="804" cy="842" rx="100" ry="7" fill="#000" opacity="0.5" />
      {[737, 863].map((cx) => (
        <g key={cx}>
          <rect x={cx - 8} y="826" width="16" height="6" fill="#2a313b" />
          <circle cx={cx} cy="836" r="7.5" fill="#0a0c10" stroke="#2f3640" strokeWidth="1.6" />
          <circle cx={cx} cy="836" r="2.6" fill="#6d7884" />
        </g>
      ))}

      {/* Open: the lid swung up on its back hinge (foam lining facing us),
          the well of the case, and the moving head standing in it. */}
      <g className="rn-case-open">
        <g className="rn-lid-open">
          <path d="M721 620 L891 620 L899 548 L729 548 Z" fill="#222a34" />
          <path d="M728 615 L884 615 L891 554 L735 554 Z" fill="#3a414b" />
          <path
            d={Array.from({ length: 13 }, (_, i) => `M${742 + i * 12} 556 l-1.4 57`).join(" ") + " " + Array.from({ length: 6 }, (_, i) => `M733 ${563 + i * 9.5} H888`).join(" ")}
            stroke="#2c323b"
            strokeWidth="1.4"
          />
          <path d="M729 548 L899 548" stroke="#8f9aa6" strokeWidth="3" />
        </g>
        <path d="M721 620 L891 620 L885 656 L715 656 Z" fill="#0b0e13" />
        <path d="M727 624 L885 624" stroke="#1d232b" strokeWidth="2" />
        <g className="rn-fixture">
          <path d="M763 660 V596 Q763 588 771 588 M843 660 V596 Q843 588 835 588" stroke="#262b33" strokeWidth="11" fill="none" strokeLinecap="round" />
          <rect x="769" y="572" width="68" height="68" rx="22" fill="#1d2229" />
          <path d="M775 584 Q790 574 812 576" stroke="#3a414b" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <circle cx="763" cy="606" r="5" fill="#4a525d" />
          <circle cx="843" cy="606" r="5" fill="#4a525d" />
          <circle cx="803" cy="606" r="24" fill="#0b1018" />
          <circle cx="803" cy="606" r="19" fill="url(#rn-lens)" />
          <circle cx="803" cy="606" r="19" fill="none" stroke="#1d2a38" strokeWidth="2" />
          <ellipse cx="796" cy="597" rx="6.5" ry="4" fill="#fff" opacity="0.55" />
        </g>
      </g>

      {/* Front: laminate, extrusions, ball corners, label (always drawn; it
          hides the fixture's lower half). */}
      <rect x="715" y="656" width="170" height="170" fill="#1d232b" />
      <path d="M715 741 H885" stroke="#000" strokeWidth="150" opacity="0.1" />
      <rect x="715" y="655" width="170" height="4" fill="#8f9aa6" />
      <rect x="715" y="822" width="170" height="4" fill="#6c7682" />
      <rect x="715" y="656" width="4" height="170" fill="#6c7682" />
      <rect x="881" y="656" width="4" height="170" fill="#6c7682" />
      <path d="M719 659 V822" stroke="#7fb8e6" strokeWidth="1" opacity="0.35" />
      {[
        [718, 658],
        [882, 658],
        [718, 823],
        [882, 823],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="#c9d2dc" />
      ))}
      <rect x="739" y="782" width="66" height="18" rx="1.5" fill="#ece7da" />
      <text x="772" y="794.6" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1a2533" fontFamily={SANS}>
        LIGHTING 08
      </text>
      {/* Recessed side-style handle on the front. */}
      <rect x="744" y="742" width="54" height="14" rx="7" fill="#11151a" />
      <rect x="750" y="747" width="42" height="4" rx="2" fill="#6c7682" />

      {/* Closed: lid on (top face with its handle and lip), latches shut. */}
      <g className="rn-case-closed">
        <path d="M721 620 L891 620 L885 656 L715 656 Z" fill="#2a323d" />
        <path d="M723 621 L889 621" stroke="#8f9aa6" strokeWidth="2.6" />
        <rect x="776" y="630" width="54" height="11" rx="5.5" fill="#15191f" />
        <rect x="782" y="634" width="42" height="3" rx="1.5" fill="#6c7682" />
        <rect x="715" y="656" width="170" height="12" fill="#232a33" />
        <rect x="715" y="667" width="170" height="3" fill="#7b8693" />
        {[748, 800].map((lx) => (
          <g key={lx}>
            <rect x={lx - 8} y="660" width="16" height="13" rx="2" fill="#aab4bf" />
            <circle cx={lx} cy="666.5" r="3" fill="#5d6773" />
          </g>
        ))}
      </g>
      {/* Open latches: flipped down off their keepers. */}
      <g className="rn-case-open">
        {[748, 800].map((lx) => (
          <g key={lx}>
            <rect x={lx - 8} y="662" width="16" height="6" rx="2" fill="#aab4bf" />
            <rect x={lx - 5} y="668" width="10" height="11" rx="2" fill="#8f9aa6" />
          </g>
        ))}
      </g>

      {/* Asset tag: status band (HOLD amber, READY green), barcode, number. */}
      <g>
        <rect x="822" y="680" width="54" height="50" rx="2" fill="#f4f2ec" />
        <g className="rn-status-hold">
          <rect x="822" y="680" width="54" height="15" rx="2" fill="#f59e0b" />
          <text x="849" y="691.6" textAnchor="middle" fontSize="10" fontWeight="800" fill="#3a2006" fontFamily={SANS} letterSpacing="0.5">
            HOLD
          </text>
        </g>
        <g className="rn-status-ok">
          <rect x="822" y="680" width="54" height="15" rx="2" fill="#22a35a" />
          <text x="849" y="691.6" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" fontFamily={SANS} letterSpacing="0.5">
            READY
          </text>
        </g>
        <path
          d={[0, 2, 3.4, 6.2, 7.4, 10.2, 12.6, 13.8, 16.4, 19.4, 20.6, 23.2, 26, 27.8, 30.6, 31.8, 34.6, 37, 38.4, 41.2].map((dx) => `M${828 + dx} 699 v19`).join(" ")}
          stroke="#1a2533"
          strokeWidth="1.2"
        />
        <text x="849" y="727" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a2533" fontFamily={SANS} letterSpacing="0.4">
          #0417
        </text>
        <circle className="rn-confirm" cx="849" cy="705" r="30" fill="none" stroke="#3ddc84" strokeWidth="3" />
      </g>
    </g>
  );
}

/** An open cable trunk, coils showing over the rim. */
export function CableTrunk() {
  return (
    <g>
      <ellipse cx="1146" cy="838" rx="64" ry="5" fill="#000" opacity="0.5" />
      {/* Coils standing in the trunk. */}
      <g fill="none" strokeWidth="4" strokeLinecap="round">
        <ellipse cx="1112" cy="790" rx="18" ry="16" stroke="#ff7a1a" />
        <ellipse cx="1114" cy="788" rx="14" ry="12" stroke="#d0621a" />
        <ellipse cx="1146" cy="786" rx="20" ry="18" stroke="#0e1116" />
        <ellipse cx="1148" cy="784" rx="16" ry="14" stroke="#1d2229" />
        <ellipse cx="1180" cy="792" rx="16" ry="14" stroke="#2f6f9e" />
        <ellipse cx="1182" cy="790" rx="12" ry="10" stroke="#3a8fc0" />
      </g>
      <path d="M1094 796 L1204 796 L1208 788 L1098 788 Z" fill="#2a323d" />
      <rect x="1094" y="796" width="110" height="34" fill="#1f2630" />
      <rect x="1094" y="795" width="110" height="3" fill="#8f9aa6" />
      <rect x="1094" y="827" width="110" height="3" fill="#6c7682" />
      <rect x="1094" y="796" width="3" height="34" fill="#6c7682" />
      <rect x="1201" y="796" width="3" height="34" fill="#6c7682" />
      <rect x="1127" y="804" width="40" height="12" rx="1" fill="#ece7da" />
      <text x="1147" y="812.6" textAnchor="middle" fontSize="6.8" fontWeight="800" fill="#1a2533" fontFamily={SANS}>
        CABLE
      </text>
    </g>
  );
}

/** Wireless mic receivers in a rack case (front cover off), the handheld
 *  mics in an open case on top. */
export function WirelessRack() {
  return (
    <g>
      <ellipse cx="1262" cy="838" rx="58" ry="5" fill="#000" opacity="0.5" />
      {[1226, 1298].map((cx) => (
        <circle key={cx} cx={cx} cy="830" r="5" fill="#0a0c10" stroke="#2f3640" strokeWidth="1.2" />
      ))}
      <path d="M1218 714 L1310 714 L1314 708 L1222 708 Z" fill="#2a323d" />
      <rect x="1214" y="714" width="96" height="110" fill="#1d232b" />
      <rect x="1214" y="713" width="96" height="3" fill="#8f9aa6" />
      <rect x="1214" y="821" width="96" height="3" fill="#6c7682" />
      <rect x="1214" y="714" width="3" height="110" fill="#6c7682" />
      <rect x="1307" y="714" width="3" height="110" fill="#6c7682" />
      <rect x="1222" y="722" width="80" height="94" fill="#07090c" />
      {/* Receivers: blue displays, RF meters, antennas. */}
      {[726, 754, 782].map((ry) => (
        <g key={ry}>
          <rect x="1224" y={ry} width="76" height="24" rx="1.5" fill="#22282f" />
          <rect x="1230" y={ry + 6} width="24" height="10" rx="1" fill="#0d3f66" />
          <path d={`M1233 ${ry + 11} h12`} stroke="#7fd3f4" strokeWidth="1.2" opacity="0.8" />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={1260 + k * 5} y={ry + 8} width="3" height="8" rx="0.6" fill={k < 3 ? "#3ddc84" : "#20384d"} />
          ))}
          <circle cx="1288" cy={ry + 12} r="3" fill="#15181d" stroke="#4a525d" strokeWidth="0.8" />
          <path d={`M1296 ${ry + 4} l4 -6`} stroke="#3a3f47" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      ))}
      <rect x="1264" y="811" width="36" height="9" rx="1" fill="#ece7da" />
      <text x="1282" y="817.8" textAnchor="middle" fontSize="5.8" fontWeight="800" fill="#1a2533" fontFamily={SANS}>
        RF 05
      </text>
      {/* Open mic case on top: two handhelds in their foam. */}
      <path d="M1220 708 L1308 708 L1312 684 L1224 684 Z" fill="#0b0e13" />
      <path d="M1224 684 L1312 684 L1316 662 L1228 662 Z" fill="#222a34" />
      <path d="M1228 682 L1308 682 L1311 666 L1231 666 Z" fill="#3a414b" />
      {[694, 702].map((my, k) => (
        <g key={my}>
          <rect x={1236 + k * 4} y={my - 2.6} width="34" height="5.2" rx="2.4" fill="#15181d" />
          <circle cx={1274 + k * 4} cy={my} r="5.2" fill="#aab4bf" />
          <path d={`M${1271 + k * 4} ${my - 3.5} l6 7 M${1277 + k * 4} ${my - 3.5} l-6 7`} stroke="#6c7682" strokeWidth="0.7" />
        </g>
      ))}
      <rect x="1220" y="707" width="92" height="3" fill="#8f9aa6" />
    </g>
  );
}

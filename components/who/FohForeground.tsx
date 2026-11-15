"use client";

import { useState, type KeyboardEvent } from "react";
import { STAGE_VB } from "./ConcertStage";

/**
 * Who It's For: the Freelancer / Technician foreground (DESIGN-15A.3,
 * refined in DESIGN-15A.4).
 *
 * A digital FOH console on its desk (left of the technician, whose hand rests
 * by its master section), a flight case with a radio in its charger, gaffer
 * tape, and a flashlight on the lid (right), and a cable run between them.
 * Drawn in the stage's 1600 x 900 space so it lines up with the permanent
 * background.
 *
 * Console layout, back to front: a meter bridge (one row of channel meters,
 * then the touch screen below it, never overlapping), then twenty identical
 * input strips (two knobs, a select key, a fader), a divider, and the master
 * strip on the far right.
 *
 * ONE INTERACTIVE ELEMENT: the MASTER fader. It is a real control (role
 * button, aria-pressed, keyboard: Enter or Space; mouse and touch: click or
 * tap) that raises or lowers the illustrated master fader; raised, the master
 * meters run high, lowered, they drop low. The screen does not change. It is a
 * demonstration only: no audio, and nothing connected; its accessible name
 * says so, and a polite live region announces the change. Everything else is
 * decorative.
 *
 * PROOF OF CONCEPT ARTWORK: hand-authored SVG.
 * Styling and motion: app/(site)/who-its-for/who.css (.fc-*), off under
 * reduced motion.
 */

type Pt = [number, number];

const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const r1 = (v: number) => Math.round(v * 10) / 10;

// Console surface: back edge and front edge, in perspective.
const B0: Pt = [380, 612];
const B1: Pt = [910, 598];
const F0: Pt = [340, 700];
const F1: Pt = [950, 684];
// Top edge of the meter bridge (rises 14 units left to right, like the surface).
const BRIDGE_TOP = 548;
const bridgeY = (t: number) => BRIDGE_TOP - 14 * t;

const INPUTS = 20;
const DIVIDER_T = 0.885;
const MASTER_T = 0.935;

/** One strip across the surface at position t (0 = left end, 1 = right end). */
const strip = (t: number) => {
  const front = lerp(F0, F1, t);
  const back = lerp(B0, B1, t);
  const at = (v: number) => lerp(front, back, v);
  return { t, front, back, at, slotA: at(0.1), slotB: at(0.46), meterX: lerp([B0[0], 0], [B1[0], 0], t)[0] };
};

const INPUT_STRIPS = Array.from({ length: INPUTS }, (_, i) => strip(0.035 + (i / (INPUTS - 1)) * 0.8));
const MASTER = strip(MASTER_T);
const CAP_LOW = lerp(MASTER.slotA, MASTER.slotB, 0.22);
const CAP_HIGH = lerp(MASTER.slotA, MASTER.slotB, 0.82);
const CAP_SHIFT: Pt = [r1(CAP_HIGH[0] - CAP_LOW[0]), r1(CAP_HIGH[1] - CAP_LOW[1])];

/** Input fader caps sit near unity, a little varied. */
const capFor = (i: number) => lerp(INPUT_STRIPS[i].slotA, INPUT_STRIPS[i].slotB, 0.5 + ((i * 7) % 5) * 0.06);

/** A quadrilateral around the master fader slot, padded by w across and h along. */
const slotBox = (w: number, front: number, back: number) =>
  [
    [MASTER.slotA[0] - w, MASTER.slotA[1] + front],
    [MASTER.slotA[0] + w, MASTER.slotA[1] + front],
    [MASTER.slotB[0] + w, MASTER.slotB[1] - back],
    [MASTER.slotB[0] - w, MASTER.slotB[1] - back],
  ]
    .map(([x, y]) => `${r1(x)},${r1(y)}`)
    .join(" ");

// Touch screen in the bridge, under the meter row.
const SCREEN = { x0: 548, x1: 756 };
const screenPts = (inset: number) => {
  const tl = (SCREEN.x0 - B0[0]) / (B1[0] - B0[0]);
  const tr = (SCREEN.x1 - B0[0]) / (B1[0] - B0[0]);
  const top = (t: number) => bridgeY(t) + 25;
  const bottom = (t: number) => B0[1] - 14 * t - 5;
  return [
    [SCREEN.x0 + inset, top(tl) + inset],
    [SCREEN.x1 - inset, top(tr) + inset],
    [SCREEN.x1 - inset, bottom(tr) - inset],
    [SCREEN.x0 + inset, bottom(tl) - inset],
  ]
    .map(([x, y]) => `${r1(x)},${r1(y)}`)
    .join(" ");
};

export default function FohForeground() {
  const [raised, setRaised] = useState(false);
  // Announced only after the visitor moves the fader (silent on load).
  const [announcement, setAnnouncement] = useState("");
  const toggle = () => {
    const next = !raised;
    setRaised(next);
    setAnnouncement(`MASTER fader ${next ? "raised, meters up" : "lowered, meters down"}. Illustration only.`);
  };
  const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <>
      <svg viewBox={STAGE_VB} preserveAspectRatio="xMidYMax slice" className="wv-layer wv-layer-fg" focusable="false" role="group" aria-label="Mixing console illustration">
        <defs>
          <linearGradient id="fc-surface" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b3747" />
            <stop offset="1" stopColor="#1a232f" />
          </linearGradient>
          <linearGradient id="fc-bridge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1d2733" />
            <stop offset="1" stopColor="#111821" />
          </linearGradient>
          <linearGradient id="fc-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0d3f66" />
            <stop offset="1" stopColor="#08263f" />
          </linearGradient>
          <linearGradient id="fc-lam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#323b47" />
            <stop offset="0.5" stopColor="#252d37" />
            <stop offset="1" stopColor="#1a2028" />
          </linearGradient>
          <linearGradient id="fc-lam-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2c3541" />
            <stop offset="1" stopColor="#3a4452" />
          </linearGradient>
          <linearGradient id="fc-alu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#aeb8c2" />
            <stop offset="0.5" stopColor="#7b8693" />
            <stop offset="1" stopColor="#505a66" />
          </linearGradient>
          <linearGradient id="fc-alu-v" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#59636f" />
            <stop offset="0.5" stopColor="#9aa4af" />
            <stop offset="1" stopColor="#59636f" />
          </linearGradient>
          <radialGradient id="fc-ball" cx="0.35" cy="0.3" r="0.75">
            <stop offset="0" stopColor="#dde3e9" />
            <stop offset="0.45" stopColor="#8a95a1" />
            <stop offset="1" stopColor="#3b4450" />
          </radialGradient>
        </defs>

        {/* The whole set sits 60 units right of the stage centre line. */}
        <g transform="translate(60 0)">
          <g aria-hidden="true">
            {/* Cable run from the desk to the case. */}
            <path d="M600 840 C 760 900, 960 860, 1160 872" stroke="#04080e" strokeWidth="9" fill="none" />
            <path d="M600 840 C 760 900, 960 860, 1160 872" stroke="#2c4560" strokeWidth="1.6" fill="none" opacity="0.7" />

            {/* The desk under the console. */}
            <path d={`M${F0[0] - 6} ${F0[1] + 28} L${F1[0] + 6} ${F1[1] + 28} L${F1[0]} 900 L${F0[0]} 900 Z`} fill="#070d15" />
            <path d={`M${F0[0] - 6} ${F0[1] + 28} L${F1[0] + 6} ${F1[1] + 28} L${F1[0] + 6} ${F1[1] + 34} L${F0[0] - 6} ${F0[1] + 34} Z`} fill="#1b2836" />

            {/* Meter bridge. */}
            <path d={`M${B0[0]} ${B0[1]} L${B1[0]} ${B1[1]} L${B1[0]} ${bridgeY(1)} L${B0[0]} ${bridgeY(0)} Z`} fill="url(#fc-bridge)" />
            <path d={`M${B0[0]} ${bridgeY(0)} L${B1[0]} ${bridgeY(1)}`} stroke="#3c4a5b" strokeWidth="1.2" />

            {/* Meter row: one meter per input channel, all above the screen. */}
            {INPUT_STRIPS.map((s, i) => {
              const top = bridgeY(s.t) + 5;
              const level = 6 + ((i * 37) % 9);
              return (
                <g key={i}>
                  <rect x={s.meterX - 2} y={top} width="4" height="15" fill="#05080c" />
                  <rect
                    x={s.meterX - 2}
                    y={top + 15 - level}
                    width="4"
                    height={level}
                    fill="#3ddc84"
                    className="fc-meter"
                    style={{ animationDelay: `${-((i * 13) % 17) / 10}s` }}
                  />
                </g>
              );
            })}

            {/* Touch screen: its own bezel and a static mixer view. */}
            <polygon points={screenPts(-3)} fill="#05080c" />
            <polygon points={screenPts(-3)} fill="none" stroke="#3c4a5b" strokeWidth="1" />
            <polygon points={screenPts(0)} fill="url(#fc-screen)" />
            <g opacity="0.9">
              <path d="M556 574.5 L748 569" stroke="#2f6d99" strokeWidth="3" />
              {Array.from({ length: 8 }, (_, i) => (
                <rect key={i} x={558 + i * 12} y={580 - i * 0.33} width="9" height="14" rx="1" fill="#16507e" />
              ))}
              <path d="M660 594 C 672 594, 676 580, 690 582 S 712 594, 724 586 S 740 578, 746 580" stroke="#7fd3f4" strokeWidth="1.4" fill="none" />
              <path d="M660 588.5 L746 586" stroke="#2f6d99" strokeWidth="0.8" />
            </g>

            {/* Console surface and front face. */}
            <path d={`M${B0[0]} ${B0[1]} L${B1[0]} ${B1[1]} L${F1[0]} ${F1[1]} L${F0[0]} ${F0[1]} Z`} fill="url(#fc-surface)" />
            <path d={`M${F0[0]} ${F0[1]} L${F1[0]} ${F1[1]} L${F1[0]} ${F1[1] + 28} L${F0[0]} ${F0[1] + 28} Z`} fill="#10171f" />
            <path d={`M${F0[0]} ${F0[1]} L${F1[0]} ${F1[1]}`} stroke="#5b6c80" strokeWidth="1.6" />
            <path d={`M${B0[0]} ${B0[1]} L${B1[0]} ${B1[1]}`} stroke="#3c4a5b" strokeWidth="1.2" />

            {/* Input strips: two knobs, a select key, a fader. */}
            {INPUT_STRIPS.map((s, i) => {
              const cap = capFor(i);
              const key = s.at(0.54);
              return (
                <g key={i}>
                  {[0.68, 0.84].map((v) => {
                    const [x, y] = s.at(v);
                    return <circle key={v} cx={x} cy={y} r="2.9" fill="#7d8a99" stroke="#141b24" strokeWidth="0.8" />;
                  })}
                  <rect x={key[0] - 4.5} y={key[1] - 1.8} width="9" height="3.6" rx="1" fill="#3a4757" />
                  <line x1={s.slotA[0]} y1={s.slotA[1]} x2={s.slotB[0]} y2={s.slotB[1]} stroke="#04070b" strokeWidth="2.6" />
                  <rect x={cap[0] - 5.5} y={cap[1] - 3.2} width="11" height="6.4" rx="1.4" fill="#c9d3de" />
                </g>
              );
            })}

            {/* Divider before the master section. */}
            <path d={`M${lerp(F0, F1, DIVIDER_T)[0]} ${lerp(F0, F1, DIVIDER_T)[1]} L${lerp(B0, B1, DIVIDER_T)[0]} ${lerp(B0, B1, DIVIDER_T)[1]}`} stroke="#4a5a6d" strokeWidth="1.4" />

            {/* Master strip: its slot and the stereo meters above it, driven by the fader. */}
            <line x1={MASTER.slotA[0]} y1={MASTER.slotA[1]} x2={MASTER.slotB[0]} y2={MASTER.slotB[1]} stroke="#04070b" strokeWidth="3.2" />
            {[-3.2, 3.2].map((dx) => (
              <g key={dx}>
                <rect x={MASTER.meterX + dx - 2} y={bridgeY(MASTER_T) + 3} width="4" height="19" fill="#05080c" />
                <rect
                  x={MASTER.meterX + dx - 2}
                  y={bridgeY(MASTER_T) + 3}
                  width="4"
                  height="19"
                  fill="#3ddc84"
                  className={`fc-master-meter ${raised ? "is-up" : ""}`}
                  style={{ animationDelay: dx < 0 ? "0s" : "-0.35s" }}
                />
              </g>
            ))}
            {/* Scribble-strip tape: MASTER. */}
            <rect x={MASTER.front[0] - 22} y={MASTER.front[1] + 6} width="44" height="12" rx="1" fill="#e8edf3" />
            <text x={MASTER.front[0]} y={MASTER.front[1] + 15} textAnchor="middle" fontSize="8.4" fontWeight="700" fill="#1a2533" fontFamily="ui-monospace, monospace" letterSpacing="0.4">
              MASTER
            </text>
          </g>

          {/* The interactive MASTER fader. */}
          <g
            role="button"
            tabIndex={0}
            aria-pressed={raised}
            aria-label={`MASTER fader on the illustrated console, ${raised ? "raised" : "lowered"}. Demonstration only: no audio, not connected to a device.`}
            className={`fc-ctl ${raised ? "is-up" : ""}`}
            onClick={toggle}
            onKeyDown={onKeyDown}
          >
            {/* Invisible hit area, wider than the ring so it stays a usable
                touch target on phones. */}
            <polygon className="fc-hit" points={slotBox(30, 26, 16)} />
            <polygon className="fc-ring" points={slotBox(17, 14, 8)} />
            <g className="fc-cap" style={{ ["--fc-shift" as string]: `${CAP_SHIFT[0]}px, ${CAP_SHIFT[1]}px` }}>
              <rect x={CAP_LOW[0] - 8} y={CAP_LOW[1] - 5} width="16" height="10" rx="2" fill="#ff7a1a" />
              <rect x={CAP_LOW[0] - 8} y={CAP_LOW[1] - 1} width="16" height="2" fill="#7a2e08" />
            </g>
          </g>

          {/* Scaled to 90% from its base so it sits beside the technician and
              stays in frame on narrower desktops. */}
          <g aria-hidden="true" transform="translate(1307 890) scale(0.9) translate(-1307 -890)">
            {/* Flight case on casters: laminated panels, aluminium extrusions,
                ball corners, butterfly latches, a recessed handle. */}
            <ellipse cx="1310" cy="890" rx="170" ry="9" fill="#000" opacity="0.55" />
            {[1196, 1434].map((x) => (
              <g key={x}>
                <rect x={x - 11} y="854" width="22" height="12" rx="2" fill="#2a313b" />
                <circle cx={x} cy="875" r="13" fill="#0a0c10" stroke="#2f3640" strokeWidth="2" />
                <circle cx={x} cy="875" r="4" fill="#6d7884" />
              </g>
            ))}
            {/* Left side (receding) and lid top. */}
            <path d="M1152 704 L1168 728 L1168 856 L1152 832 Z" fill="#0d1117" />
            <path d="M1152 704 L1446 704 L1462 728 L1168 728 Z" fill="url(#fc-lam-top)" />
            <path d="M1152 704 L1446 704" stroke="#6c7682" strokeWidth="3" />
            <path d="M1152 704 L1168 728 M1446 704 L1462 728" stroke="#7b8693" strokeWidth="2.5" />
            <path d="M1152 704 L1152 832" stroke="#59636f" strokeWidth="2.5" />
            {/* Front panel: laminate with a soft sheen. */}
            <rect x="1168" y="728" width="294" height="128" fill="url(#fc-lam)" />
            <path d="M1190 736 L1236 736 L1196 846 L1180 846 Z" fill="#fff" opacity="0.04" />
            {/* Extrusions: top, bottom, sides, and the lid seam. */}
            <rect x="1168" y="727" width="294" height="6" fill="url(#fc-alu)" />
            <rect x="1168" y="850" width="294" height="6" fill="url(#fc-alu)" />
            <rect x="1168" y="728" width="6" height="128" fill="url(#fc-alu-v)" />
            <rect x="1456" y="728" width="6" height="128" fill="url(#fc-alu-v)" />
            <rect x="1168" y="769" width="294" height="7" fill="url(#fc-alu)" />
            <path d="M1174 772.5 H1456" stroke="#3b4450" strokeWidth="1" />
            {/* Ball corners. */}
            {[
              [1156, 706, 6],
              [1448, 706, 6],
              [1171, 731, 8.5],
              [1459, 731, 8.5],
              [1171, 853, 8.5],
              [1459, 853, 8.5],
            ].map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="url(#fc-ball)" />
            ))}
            {/* Butterfly latches on the seam. */}
            {[1236, 1394].map((x) => (
              <g key={x}>
                <rect x={x - 17} y="761" width="34" height="23" rx="4" fill="#0a0e13" stroke="#6c7682" strokeWidth="1.6" />
                <path d={`M${x - 11} 772.5 Q${x - 6} 764 ${x} 772.5 Q${x + 6} 764 ${x + 11} 772.5 Q${x + 6} 781 ${x} 772.5 Q${x - 6} 781 ${x - 11} 772.5 Z`} fill="url(#fc-ball)" />
                <circle cx={x} cy="772.5" r="2" fill="#3a434e" />
              </g>
            ))}
            {/* Recessed handle. */}
            <rect x="1280" y="798" width="70" height="30" rx="8" fill="#090c11" stroke="#59636f" strokeWidth="2" />
            <rect x="1291" y="805" width="48" height="7" rx="3.5" fill="url(#fc-alu)" />
            {/* Plain ID plate on the lid. */}
            <rect x="1292" y="744" width="46" height="13" rx="1.5" fill="#cfd6dd" opacity="0.8" />

            {/* On the lid: radio in its charger, gaffer tape, a flashlight. */}
            <rect x="1196" y="696" width="80" height="22" rx="5" fill="#0d1218" />
            <circle cx="1208" cy="708" r="3" fill="#3ddc84" className="fc-blink" />
            <rect x="1220" y="624" width="40" height="80" rx="6" fill="#10151c" />
            <rect x="1244" y="580" width="6" height="48" rx="3" fill="#10151c" />
            <path d="M1227 640 h26 M1227 648 h26 M1227 656 h26" stroke="#2a313b" strokeWidth="2.4" />
            <rect x="1228" y="668" width="24" height="14" rx="2" fill="#1d3b55" />
            <circle cx="1226" cy="630" r="2.4" fill="#ff7a1a" />
            <circle cx="1372" cy="694" r="22" fill="#0d1015" stroke="#2f3640" strokeWidth="2" />
            <circle cx="1372" cy="694" r="10" fill="#b9a585" />
            <circle cx="1372" cy="694" r="6" fill="#0b1626" />
            <rect x="1404" y="706" width="54" height="11" rx="5" fill="#0d1015" stroke="#2f3640" strokeWidth="1" />
            <rect x="1452" y="704" width="12" height="15" rx="3" fill="#6d7884" />
          </g>
        </g>
      </svg>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}

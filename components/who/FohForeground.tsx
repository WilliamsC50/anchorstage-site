"use client";

import { useState, type KeyboardEvent } from "react";
import { STAGE_VB } from "./ConcertStage";

/**
 * Who It's For: the Freelancer / Technician foreground (DESIGN-15A.3).
 *
 * A digital FOH console on its desk (left of the technician, whose hand rests
 * on its right end), road cases with a radio in its charger, gaffer tape, and
 * a flashlight (right), and a cable run between them. Drawn in the stage's
 * 1600 x 900 space so it lines up with the permanent background.
 *
 * ONE INTERACTIVE ELEMENT: the lead vocal fader. It is a real control (role
 * button, aria-pressed, keyboard: Enter or Space; mouse and touch: click or
 * tap) that raises or lowers the illustrated fader and changes that
 * channel's meter, ON light, and screen readout. It is a demonstration only:
 * no audio, and nothing connected; its accessible name says so, and a polite
 * live region announces the change. The rest of the artwork is decorative.
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

const CHANNELS = 24;
const VOX = 13;

const strip = (i: number) => {
  const t = 0.05 + (i / (CHANNELS - 1)) * 0.9;
  const front = lerp(F0, F1, t);
  const back = lerp(B0, B1, t);
  return { t, front, back, slotA: lerp(front, back, 0.12), slotB: lerp(front, back, 0.48) };
};

const STRIPS = Array.from({ length: CHANNELS }, (_, i) => strip(i));
const VOX_STRIP = STRIPS[VOX];
const CAP_LOW = lerp(VOX_STRIP.slotA, VOX_STRIP.slotB, 0.18);
const CAP_HIGH = lerp(VOX_STRIP.slotA, VOX_STRIP.slotB, 0.86);
const CAP_SHIFT: Pt = [r1(CAP_HIGH[0] - CAP_LOW[0]), r1(CAP_HIGH[1] - CAP_LOW[1])];

/** A cap position for decorative channels (varied, fixed). */
const capFor = (i: number) => lerp(STRIPS[i].slotA, STRIPS[i].slotB, 0.25 + ((i * 7) % 6) * 0.1);

export default function FohForeground() {
  const [raised, setRaised] = useState(false);
  // Announced only after the visitor moves the fader (silent on load).
  const [announcement, setAnnouncement] = useState("");
  const toggle = () => {
    const next = !raised;
    setRaised(next);
    setAnnouncement(`Lead vocal fader ${next ? "raised" : "lowered"}. Illustration only.`);
  };
  const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  const meterTop = 552; // meter bridge
  const voxMeterX = lerp([B0[0], meterTop], [B1[0], meterTop - 14], VOX_STRIP.t)[0];

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
            <stop offset="0" stopColor="#0f4d7a" />
            <stop offset="1" stopColor="#09304f" />
          </linearGradient>
          <linearGradient id="fc-case" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1c2836" />
            <stop offset="0.7" stopColor="#2b3b4e" />
            <stop offset="1" stopColor="#3b4d63" />
          </linearGradient>
        </defs>

        {/* The whole set sits 60 units right of the stage centre line. */}
        <g transform="translate(60 0)">
        <g aria-hidden="true">
          {/* Cable run from the desk to the cases. */}
          <path d="M600 840 C 760 900, 980 860, 1220 880" stroke="#04080e" strokeWidth="9" fill="none" />
          <path d="M600 840 C 760 900, 980 860, 1220 880" stroke="#2c4560" strokeWidth="1.6" fill="none" opacity="0.7" />

          {/* The desk under the console. */}
          <path d={`M${F0[0] - 6} ${F0[1] + 28} L${F1[0] + 6} ${F1[1] + 28} L${F1[0]} 900 L${F0[0]} 900 Z`} fill="#070d15" />
          <path d={`M${F0[0] - 6} ${F0[1] + 28} L${F1[0] + 6} ${F1[1] + 28} L${F1[0] + 6} ${F1[1] + 34} L${F0[0] - 6} ${F0[1] + 34} Z`} fill="#1b2836" />

          {/* Meter bridge and touch screen. */}
          <path d={`M${B0[0]} ${B0[1]} L${B1[0]} ${B1[1]} L${B1[0]} ${meterTop - 14} L${B0[0]} ${meterTop} Z`} fill="url(#fc-bridge)" />
          <path d="M560 570 L748 565 L752 598 L557 604 Z" fill="#0b121b" />
          <path d="M568 574 L740 569 L743 594 L565 599 Z" fill="url(#fc-screen)" />
          {Array.from({ length: 18 }, (_, i) => (
            <rect key={i} x={580 + i * 8.6} y={588 - ((i * 41) % 13)} width="5" height={4 + ((i * 41) % 13)} fill={i % 6 === 5 ? "#ffb27a" : "#7fd3f4"} opacity="0.9" />
          ))}
        </g>

        {/* Screen readout for the lead vocal channel (changes with the fader). */}
        <g aria-hidden="true" className="fc-readout">
          <rect x="684" y="572" width="52" height="11" rx="2" fill={raised ? "#ff7a1a" : "#10324f"} />
          <text x="710" y="580.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={raised ? "#071425" : "#a8dcff"} fontFamily="ui-monospace, monospace">
            VOX {raised ? "-3 dB" : "-24 dB"}
          </text>
        </g>

        <g aria-hidden="true">
          {/* Console surface and front face. */}
          <path d={`M${B0[0]} ${B0[1]} L${B1[0]} ${B1[1]} L${F1[0]} ${F1[1]} L${F0[0]} ${F0[1]} Z`} fill="url(#fc-surface)" />
          <path d={`M${F0[0]} ${F0[1]} L${F1[0]} ${F1[1]} L${F1[0]} ${F1[1] + 28} L${F0[0]} ${F0[1] + 28} Z`} fill="#10171f" />
          <path d={`M${F0[0]} ${F0[1]} L${F1[0]} ${F1[1]}`} stroke="#5b6c80" strokeWidth="1.6" />
          <path d={`M${B0[0]} ${B0[1]} L${B1[0]} ${B1[1]}`} stroke="#3c4a5b" strokeWidth="1.2" />

          {/* Channel strips: meters on the bridge, knobs, faders, LEDs. */}
          {STRIPS.map((s, i) => {
            const meter = lerp([B0[0], meterTop], [B1[0], meterTop - 14], s.t);
            const k = [0.58, 0.69, 0.8].map((v) => lerp(s.front, s.back, v));
            const cap = capFor(i);
            const level = 8 + ((i * 37) % 22);
            return (
              <g key={i}>
                {i !== VOX && (
                  <>
                    <rect x={meter[0] - 2} y={meter[1] + 6} width="4" height="34" fill="#06090d" />
                    <rect
                      x={meter[0] - 2}
                      y={meter[1] + 40 - level}
                      width="4"
                      height={level}
                      fill={i % 8 === 7 ? "#ffb27a" : "#3ddc84"}
                      className="fc-meter"
                      style={{ animationDelay: `${-((i * 13) % 17) / 10}s` }}
                    />
                  </>
                )}
                {k.map(([x, y], j) => (
                  <circle key={j} cx={x} cy={y} r="3.2" fill={j === 2 && i % 4 === 0 ? "#ffb27a" : "#7d8a99"} />
                ))}
                {i !== VOX && (
                  <>
                    <line x1={s.slotA[0]} y1={s.slotA[1]} x2={s.slotB[0]} y2={s.slotB[1]} stroke="#04070b" strokeWidth="3" />
                    <rect x={cap[0] - 6} y={cap[1] - 3.5} width="12" height="7" rx="1.5" fill={i === 23 ? "#ff7a1a" : "#c9d3de"} />
                    <circle cx={s.slotA[0]} cy={s.slotA[1] + 8} r="1.8" fill={i % 3 === 0 ? "#3ddc84" : "#2b5f86"} />
                  </>
                )}
              </g>
            );
          })}

          {/* The lead vocal channel's meter and ON light (driven by the fader). */}
          <rect x={voxMeterX - 2} y={meterTop - 8 + 6} width="4" height="34" fill="#06090d" />
          <rect
            x={voxMeterX - 2}
            y={meterTop - 8 + 6}
            width="4"
            height="34"
            fill="#3ddc84"
            className={`fc-vox-meter ${raised ? "is-up" : ""}`}
          />
          <circle cx={VOX_STRIP.slotA[0]} cy={VOX_STRIP.slotA[1] + 8} r="2.2" fill={raised ? "#3ddc84" : "#20384d"} />
          {/* Scribble-strip tape under the channel. */}
          <rect x={VOX_STRIP.front[0] - 13} y={VOX_STRIP.front[1] + 6} width="26" height="10" rx="1" fill="#e8edf3" />
          <text x={VOX_STRIP.front[0]} y={VOX_STRIP.front[1] + 13.6} textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a2533" fontFamily="ui-monospace, monospace">
            VOX
          </text>
        </g>

        {/* The interactive lead vocal fader. */}
        <g
          role="button"
          tabIndex={0}
          aria-pressed={raised}
          aria-label={`Lead vocal fader on the illustrated console, ${raised ? "raised" : "lowered"}. Demonstration only: no audio, not connected to a device.`}
          className={`fc-ctl ${raised ? "is-up" : ""}`}
          onClick={toggle}
          onKeyDown={onKeyDown}
        >
          {/* Invisible hit area, wider than the ring so it stays a usable
              touch target on phones (about 28 x 60 CSS px at 390px wide). */}
          <polygon
            className="fc-hit"
            points={`${r1(VOX_STRIP.slotA[0] - 30)},${r1(VOX_STRIP.slotA[1] + 26)} ${r1(VOX_STRIP.slotA[0] + 30)},${r1(VOX_STRIP.slotA[1] + 26)} ${r1(VOX_STRIP.slotB[0] + 30)},${r1(VOX_STRIP.slotB[1] - 16)} ${r1(VOX_STRIP.slotB[0] - 30)},${r1(VOX_STRIP.slotB[1] - 16)}`}
          />
          <polygon
            className="fc-ring"
            points={`${r1(VOX_STRIP.slotA[0] - 19)},${r1(VOX_STRIP.slotA[1] + 15)} ${r1(VOX_STRIP.slotA[0] + 19)},${r1(VOX_STRIP.slotA[1] + 15)} ${r1(VOX_STRIP.slotB[0] + 19)},${r1(VOX_STRIP.slotB[1] - 8)} ${r1(VOX_STRIP.slotB[0] - 19)},${r1(VOX_STRIP.slotB[1] - 8)}`}
          />
          <line x1={VOX_STRIP.slotA[0]} y1={VOX_STRIP.slotA[1]} x2={VOX_STRIP.slotB[0]} y2={VOX_STRIP.slotB[1]} stroke="#04070b" strokeWidth="3" />
          <g className="fc-cap" style={{ ["--fc-shift" as string]: `${CAP_SHIFT[0]}px, ${CAP_SHIFT[1]}px` }}>
            <rect x={CAP_LOW[0] - 8} y={CAP_LOW[1] - 5} width="16" height="10" rx="2" fill="#ff7a1a" />
            <rect x={CAP_LOW[0] - 8} y={CAP_LOW[1] - 1} width="16" height="2" fill="#7a2e08" />
          </g>
        </g>

        <g aria-hidden="true">
          {/* Road cases, the radio in its charger, gaffer tape, flashlight. */}
          <rect x="1196" y="700" width="330" height="200" rx="8" fill="url(#fc-case)" />
          <rect x="1196" y="700" width="330" height="200" rx="8" fill="none" stroke="#8b97a3" strokeWidth="3" opacity="0.55" />
          <line x1="1196" y1="760" x2="1526" y2="760" stroke="#8b97a3" strokeWidth="3" opacity="0.5" />
          {[
            [1196, 700],
            [1508, 700],
          ].map(([x, y], i) => (
            <rect key={i} x={x - 3} y={y - 3} width="22" height="22" rx="3" fill="#aab4bf" />
          ))}
          <rect x="1270" y="750" width="26" height="18" rx="3" fill="#aab4bf" />
          <rect x="1420" y="750" width="26" height="18" rx="3" fill="#aab4bf" />
          <ellipse cx="1360" cy="815" rx="44" ry="16" fill="#121a24" />
          <rect x="1332" y="811" width="56" height="7" rx="3" fill="#8b97a3" />
          <rect x="1214" y="712" width="56" height="13" rx="2" fill="#ff7a1a" opacity="0.85" />
          {/* Charger with a radio. */}
          <rect x="1240" y="676" width="80" height="26" rx="5" fill="#0d1218" />
          <circle cx="1252" cy="690" r="3" fill="#3ddc84" className="fc-blink" />
          <rect x="1264" y="604" width="40" height="80" rx="6" fill="#10151c" />
          <rect x="1288" y="560" width="6" height="48" rx="3" fill="#10151c" />
          <path d="M1271 620 h26 M1271 628 h26 M1271 636 h26" stroke="#2a313b" strokeWidth="2.4" />
          <rect x="1272" y="648" width="24" height="14" rx="2" fill="#1d3b55" />
          <circle cx="1270" cy="610" r="2.4" fill="#ff7a1a" />
          {/* Gaffer tape and flashlight on the lid. */}
          <circle cx="1400" cy="676" r="24" fill="#ff7a1a" />
          <circle cx="1400" cy="676" r="24" fill="none" stroke="#c2500f" strokeWidth="2.5" />
          <circle cx="1400" cy="676" r="11" fill="#0b1626" />
          <rect x="1440" y="688" width="66" height="12" rx="5" fill="#121821" />
          <rect x="1498" y="686" width="14" height="16" rx="3" fill="#8b97a3" />
        </g>
        </g>
      </svg>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}

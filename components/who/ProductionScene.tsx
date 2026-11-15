"use client";

import { useState, type KeyboardEvent } from "react";
import { STAGE_VB } from "./ConcertStage";
import { CableCoil, CaseTech, ProductionLighting, RollingRack, StageTech } from "./ProductionCrew";
import ProductionLeadFigure from "./ProductionLeadFigure";

/**
 * Who It's For: the Production Company scene (DESIGN-15A.5).
 *
 * Same permanent stage, seen from the production company's side: the house
 * lights are down and a work light is on the deck. Three people:
 *   the production lead (foreground, dominant) with the show checklist on a
 *   tablet; a stage technician kneeling at a monitor wedge on the deck; an
 *   equipment technician checking flight cases against a packing list.
 * Foreground equipment: a rolling rack and a cable coil.
 *
 * Layers: character (lighting, crew, the lead and her tablet) and
 * foreground (rack, coil), matching the Freelancer scene's structure.
 *
 * ONE INTERACTIVE ELEMENT: the lead's tablet. It is a real control (role
 * button, aria-pressed; Enter or Space, click, or tap) that marks the last
 * checklist item, "Comms check", complete or pending again (repeatable). The
 * item's check fills in, the progress bar completes, and the counter reads
 * 3/3. Visual demonstration only: no data is saved or sent; the accessible
 * name says so, and a polite live region announces the change.
 *
 * Styling and motion: app/(site)/who-its-for/who.css (.pc-*, .pl-*), off
 * under reduced motion.
 */

// Tablet in the lead's local space (see ProductionLeadFigure).
const TAB = { tl: [462, 322], tr: [538, 322], br: [544, 382], bl: [456, 382] } as const;
const pad = (d: number) =>
  `${TAB.tl[0] - d},${TAB.tl[1] - d} ${TAB.tr[0] + d},${TAB.tr[1] - d} ${TAB.br[0] + d},${TAB.br[1] + d} ${TAB.bl[0] - d},${TAB.bl[1] + d}`;

const ROWS = ["Load-in", "Line check", "Comms check"];

export default function ProductionScene() {
  const [done, setDone] = useState(false);
  // Announced only after the visitor uses the tablet (silent on load).
  const [announcement, setAnnouncement] = useState("");
  const toggle = () => {
    const next = !done;
    setDone(next);
    setAnnouncement(next ? "Comms check marked complete. Checklist 3 of 3. Illustration only." : "Comms check back to pending. Checklist 2 of 3. Illustration only.");
  };
  const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  const tablet = (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={done}
      aria-label={`Show checklist on the illustrated tablet: Comms check ${done ? "complete" : "pending"}. Demonstration only: nothing is saved or sent.`}
      className={`fc-ctl pc-ctl ${done ? "is-done" : ""}`}
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      {/* Invisible hit area, padded for touch. */}
      <polygon className="fc-hit" points={pad(14)} />
      <polygon className="fc-ring" points={pad(5)} />
      <g aria-hidden="true">
        {/* Tablet body and screen. */}
        <polygon points={pad(0)} fill="#0b0e13" />
        <polygon points="466,326 534,326 539,377 461,377" fill="#0a2238" />
        <polygon className="pc-glow" points="466,326 534,326 539,377 461,377" fill="#3ddc84" opacity="0" />
        <text x="469" y="334" fontSize="5" fontWeight="700" fill="#a8dcff" fontFamily="ui-monospace, monospace" letterSpacing="0.3">
          SHOW CHECKLIST
        </text>
        <text x="532" y="334" textAnchor="end" fontSize="5.5" fontWeight="700" fill={done ? "#3ddc84" : "#ffb27a"} fontFamily="ui-monospace, monospace">
          {done ? "3/3" : "2/3"}
        </text>
        <rect x="468" y="337.5" width="64" height="2.2" rx="1.1" fill="#123a5c" />
        <rect className="pc-progress" x="468" y="337.5" width="64" height="2.2" rx="1.1" fill={done ? "#3ddc84" : "#ffb27a"} />
        {ROWS.map((label, i) => {
          const y = 349 + i * 10;
          const tick = <path d={`M478.4 ${y - 2} l1.2 1.3 l2.2 -2.6`} stroke="#fff" strokeWidth="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
          return (
            <g key={label}>
              <circle cx="480" cy={y - 2} r="3" fill={i < 2 ? "#2f9e5f" : "none"} stroke={i < 2 ? "none" : "#ffb27a"} strokeWidth="1" />
              {i < 2 ? (
                tick
              ) : (
                <g className="pc-check">
                  <circle cx="480" cy={y - 2} r="3" fill="#2f9e5f" />
                  {tick}
                </g>
              )}
              <text x="486" y={y} fontSize="6" fontWeight={i === 2 ? 700 : 500} fill={i === 2 && !done ? "#ffd2ad" : "#e8edf3"} fontFamily="ui-sans-serif, system-ui, sans-serif">
                {label}
              </text>
            </g>
          );
        })}
      </g>
    </g>
  );

  return (
    <>
      <svg viewBox={STAGE_VB} preserveAspectRatio="xMidYMax slice" className="wv-layer wv-layer-char" focusable="false" role="group" aria-label="Production crew illustration">
        <g aria-hidden="true">
          <ProductionLighting />
          <StageTech />
          <CaseTech />
        </g>
        <ProductionLeadFigure x={290} y={152.6} scale={1.28} tablet={tablet} />
      </svg>
      <svg viewBox={STAGE_VB} preserveAspectRatio="xMidYMax slice" className="wv-layer wv-layer-fg" aria-hidden="true" focusable="false">
        <RollingRack />
        <CableCoil />
      </svg>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}

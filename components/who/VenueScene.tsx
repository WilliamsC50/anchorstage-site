"use client";

import { useState, type KeyboardEvent } from "react";
import BanquetDirectorFigure from "./BanquetDirectorFigure";
import { STAGE_VB } from "./ConcertStage";
import { BanquetRoom, VenueLighting, WelcomeSign } from "./VenueSet";

/**
 * Who It's For: the Venue scene (DESIGN-15A.6).
 *
 * Same permanent stage, seen from the venue's side: the room is set for a
 * corporate event. A hotel carpet runs across the floor, banquet rounds are
 * laid, a server sets the last glasses, and a welcome sign stands at the
 * front. The banquet director (foreground, dominant) walks the room with the
 * event-prep schedule on a tablet.
 *
 * Layers: character (lighting and carpet, the room setup and server, the
 * director and the tablet) and foreground (the welcome sign), matching the
 * other scenes' structure.
 *
 * ONE INTERACTIVE ELEMENT: the director's tablet. It is a real control (role
 * button, aria-pressed; Enter or Space, click, or tap) that marks the last
 * prep item, "Final walkthrough", complete or pending again (repeatable).
 * The item's check fills in and the status chip changes from "2 of 3 ready"
 * to "Room ready". Visual demonstration only: no data is saved or sent; the
 * accessible name says so, and a polite live region announces the change.
 *
 * Styling and motion: app/(site)/who-its-for/who.css (.vn-*, .vd-*), off
 * under reduced motion.
 */

// Tablet in the director's local space (see BanquetDirectorFigure), held
// at a slight tilt.
const TILT = "rotate(-4 455 356)";
const BODY = { x: 420, y: 310, w: 70, h: 92 };
const padRect = (d: number, rx: number) => ({ x: BODY.x - d, y: BODY.y - d, width: BODY.w + d * 2, height: BODY.h + d * 2, rx });

const ROWS = ["Room setup", "AV coordination", "Final walkthrough"];
const SANS = "ui-sans-serif, system-ui, sans-serif";

export default function VenueScene() {
  const [done, setDone] = useState(false);
  // Announced only after the visitor uses the tablet (silent on load).
  const [announcement, setAnnouncement] = useState("");
  const toggle = () => {
    const next = !done;
    setDone(next);
    setAnnouncement(next ? "Final walkthrough marked complete. Room ready, 3 of 3. Illustration only." : "Final walkthrough back to pending. 2 of 3 ready. Illustration only.");
  };
  const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  const tick = (cx: number, cy: number) => (
    <path d={`M${cx - 1.6} ${cy} l1.1 1.2 l2.1 -2.5`} stroke="#fff" strokeWidth="0.85" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  );

  const tablet = (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={done}
      aria-label={`Event prep schedule on the illustrated tablet: Final walkthrough ${done ? "complete" : "pending"}. Demonstration only: nothing is saved or sent.`}
      className={`fc-ctl vn-ctl ${done ? "is-done" : ""}`}
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      <g transform={TILT}>
        {/* Invisible hit area, padded for touch. */}
        <rect className="fc-hit" {...padRect(14, 10)} />
        <rect className="fc-ring" {...padRect(5, 8)} />
        <g aria-hidden="true">
          {/* Tablet body and a light screen. */}
          <rect {...padRect(0, 5)} fill="#0b0e13" />
          <rect x="423.5" y="313.5" width="63" height="85" rx="2.5" fill="#e9eff5" />
          <rect className="vn-glow" x="423.5" y="313.5" width="63" height="85" rx="2.5" fill="#3ddc84" opacity="0" />
          {/* Header: what and where. */}
          <path d="M423.5 328.5 V316 a2.5 2.5 0 0 1 2.5 -2.5 h58 a2.5 2.5 0 0 1 2.5 2.5 V328.5 Z" fill="#12304d" />
          <text x="427" y="320.6" fontSize="5" fontWeight="700" fill="#fff" letterSpacing="0.35" fontFamily={SANS}>
            EVENT PREP
          </text>
          <text x="427" y="326.2" fontSize="3.8" fill="#a8dcff" fontFamily={SANS}>
            Ballroom · 6:00 PM
          </text>
          {/* Status chip. */}
          <rect x="427" y="332" width="37" height="8" rx="4" fill={done ? "#cdeedb" : "#ffe3cc"} />
          <circle cx="431" cy="336" r="1.6" fill={done ? "#1f9a55" : "#e2761f"} />
          <text x="434.4" y="337.6" fontSize="4.3" fontWeight="700" fill={done ? "#11603a" : "#8a3d0a"} fontFamily={SANS}>
            {done ? "Room ready" : "2 of 3 ready"}
          </text>
          {/* Prep items. */}
          {ROWS.map((label, i) => {
            const y = 352 + i * 11.5;
            const cy = y - 1.8;
            return (
              <g key={label}>
                <circle cx="429.5" cy={cy} r="3" fill={i < 2 ? "#1f9a55" : "#e9eff5"} stroke={i < 2 ? "none" : "#e2761f"} strokeWidth="1" />
                {i < 2 ? (
                  tick(429.5, cy)
                ) : (
                  <g className="vn-check">
                    <circle cx="429.5" cy={cy} r="3" fill="#1f9a55" />
                    {tick(429.5, cy)}
                  </g>
                )}
                <text x="435.5" y={y} fontSize="5" fontWeight={i === 2 ? 700 : 500} fill={i === 2 && !done ? "#8a3d0a" : "#13263b"} fontFamily={SANS}>
                  {label}
                </text>
              </g>
            );
          })}
          {/* Mini floor plan: the stage and the rounds. */}
          <path d="M427 380 h56" stroke="#c4cfdb" strokeWidth="0.6" />
          <rect x="444" y="383" width="22" height="2.6" rx="0.6" fill="#12304d" />
          {[389.5, 395].map((cy, r) =>
            [433, 441, 449, 457, 465, 473].map((cx) => <circle key={`${cx}-${cy}`} cx={cx + (r ? 4 : 0)} cy={cy} r="1.9" fill={done ? "#9fd9b8" : "#b6c3d1"} />),
          )}
        </g>
      </g>
    </g>
  );

  return (
    <>
      {/* Overflow visible: the carpet runs past the art's edges so the
          desktop shift (--wv-shift) never uncovers the floor beside it; the
          stage viewport still clips at its own edge. */}
      <svg
        viewBox={STAGE_VB}
        preserveAspectRatio="xMidYMax slice"
        className="wv-layer wv-layer-char"
        style={{ overflow: "visible" }}
        focusable="false"
        role="group"
        aria-label="Hotel ballroom illustration"
      >
        <g aria-hidden="true">
          <VenueLighting />
          <BanquetRoom />
        </g>
        <BanquetDirectorFigure x={360} y={152.6} scale={1.28} tablet={tablet} />
      </svg>
      <svg viewBox={STAGE_VB} preserveAspectRatio="xMidYMax slice" className="wv-layer wv-layer-fg" aria-hidden="true" focusable="false">
        <WelcomeSign />
      </svg>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}

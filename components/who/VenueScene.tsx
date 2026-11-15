"use client";

import { useState, type KeyboardEvent } from "react";
import BanquetDirectorFigure from "./BanquetDirectorFigure";
import { STAGE_VB } from "./ConcertStage";
import { BanquetRoom, VenueLighting, WelcomeSign } from "./VenueSet";

/**
 * Who It's For: the Venue scene (DESIGN-15A.6; dinner service DESIGN-15A.7).
 *
 * Same permanent stage, seen from the venue's side: the room is set for a
 * corporate event. A hotel carpet runs across the floor, banquet rounds are
 * laid, a server stands ready with covered plates, and a welcome sign stands
 * at the front. The banquet director (foreground, dominant) walks the room
 * with the event-prep status on a tablet.
 *
 * Layers: character (lighting and carpet, the room setup and server, the
 * director and the tablet) and foreground (the welcome sign), matching the
 * other scenes' structure.
 *
 * ONE INTERACTIVE ELEMENT: the banquet server. It is a real control (role
 * button, aria-pressed; Enter or Space, click, or tap) that serves dinner or
 * clears it again (repeatable). Serving: the server dips to serve, the
 * covers leave the tray, plated meals appear table by table, and the
 * director's tablet (a status display, not a control) updates "Serve Dinner"
 * to complete and its progress to 3/3. Visual demonstration only: nothing is
 * saved or sent; the accessible name says so, and a polite live region
 * announces the change.
 *
 * Styling and motion: app/(site)/who-its-for/who.css (.vn-*, .vd-*), off
 * under reduced motion.
 */

const ROWS = ["Room setup", "AV coordination", "Serve Dinner"];
const SANS = "ui-sans-serif, system-ui, sans-serif";

// The server's hit area and focus ring, in the stage's 1600 x 900 space
// (the server stands behind the near table at about x 560-680).
const HIT = { x: 548, y: 452, width: 142, height: 210, rx: 16 };
const RING = { x: 556, y: 460, width: 126, height: 182, rx: 12 };

/** The director's tablet: a read-only status display. */
function PrepTablet({ served }: { served: boolean }) {
  const tick = (cx: number, cy: number) => (
    <path d={`M${cx - 1.6} ${cy} l1.1 1.2 l2.1 -2.5`} stroke="#fff" strokeWidth="0.85" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  );
  return (
    <g transform="rotate(-4 455 356)" className={`vn-status ${served ? "is-done" : ""}`}>
      {/* Tablet body and a light screen. */}
      <rect x="420" y="310" width="70" height="92" rx="5" fill="#0b0e13" />
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
      {/* Progress chip. */}
      <rect x="427" y="332" width="37" height="8" rx="4" fill={served ? "#cdeedb" : "#ffe3cc"} />
      <circle cx="431" cy="336" r="1.6" fill={served ? "#1f9a55" : "#e2761f"} />
      <text x="434.4" y="337.6" fontSize="4.3" fontWeight="700" fill={served ? "#11603a" : "#8a3d0a"} fontFamily={SANS}>
        {served ? "3/3 Complete" : "2/3 Complete"}
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
            <text x="435.5" y={y} fontSize="5" fontWeight={i === 2 ? 700 : 500} fill={i === 2 && !served ? "#8a3d0a" : "#13263b"} fontFamily={SANS}>
              {label}
            </text>
          </g>
        );
      })}
      {/* Mini floor plan: the stage and the rounds. */}
      <path d="M427 380 h56" stroke="#c4cfdb" strokeWidth="0.6" />
      <rect x="444" y="383" width="22" height="2.6" rx="0.6" fill="#12304d" />
      {[389.5, 395].map((cy, r) =>
        [433, 441, 449, 457, 465, 473].map((cx) => <circle key={`${cx}-${cy}`} cx={cx + (r ? 4 : 0)} cy={cy} r="1.9" fill={served ? "#9fd9b8" : "#b6c3d1"} />),
      )}
    </g>
  );
}

export default function VenueScene() {
  const [served, setServed] = useState(false);
  // Each activation replays the serving motion (0: none yet, on load).
  const [acted, setActed] = useState(0);
  // Announced only after the visitor serves (silent on load).
  const [announcement, setAnnouncement] = useState("");
  const toggle = () => {
    const next = !served;
    setServed(next);
    setActed((n) => n + 1);
    setAnnouncement(next ? "Dinner served. Event prep 3 of 3 complete. Illustration only." : "Plates cleared. Serve Dinner back to pending, 2 of 3 complete. Illustration only.");
  };
  const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

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
          <BanquetRoom served={served} acted={acted} />
        </g>
        {/* The server: the scene's one control (hit area and focus ring over
            the artwork above). */}
        <g
          role="button"
          tabIndex={0}
          aria-pressed={served}
          aria-label={`Banquet server: ${served ? "dinner served" : "dinner ready to serve"}. Demonstration only: nothing is saved or sent.`}
          className={`fc-ctl vn-serve-ctl ${served ? "is-done" : ""}`}
          onClick={toggle}
          onKeyDown={onKeyDown}
        >
          <rect className="fc-hit" {...HIT} />
          <rect className="fc-ring" {...RING} />
        </g>
        <g aria-hidden="true">
          <BanquetDirectorFigure x={360} y={152.6} scale={1.28} tablet={<PrepTablet served={served} />} />
        </g>
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

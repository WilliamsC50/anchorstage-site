"use client";

import { useState, type KeyboardEvent } from "react";
import { STAGE_VB } from "./ConcertStage";
import { CheckInDesk, Guests, OrganizerLighting, RopeLine, StafferBadgeArm, WayfindingSign } from "./OrganizerSet";
import ProducerFigure from "./ProducerFigure";

/**
 * Who It's For: the Event Organizers & Producers scene (DESIGN-15A.7).
 *
 * Same permanent stage, seen from the organizer's side, minutes before
 * doors: guest registration is staffed, guests wait at the rope line, a
 * wayfinding sign is out, and the event producer (foreground, dominant) is
 * on the radio with the run of show in hand, watching check-in.
 *
 * Layers: character (lighting and floor, registration, guests, the rope
 * line, the producer) and foreground (the wayfinding sign), matching the
 * other scenes' structure.
 *
 * ONE INTERACTIVE ELEMENT: the rope line at check-in. It is a real control
 * (role button, aria-pressed; Enter or Space, click, or tap) that opens
 * doors or closes the line again (repeatable). Opening: the rope is
 * unhooked, the guests step up to registration one after another, the
 * staffer holds out a badge, the producer's radio shows green, and the
 * desk's run-of-show screen changes the Doors cue from Standby to Open.
 * Visual demonstration only: nothing is saved or sent; the accessible name
 * says so, and a polite live region announces the change.
 *
 * Styling and motion: app/(site)/who-its-for/who.css (.og-*, .pr-*), off
 * under reduced motion.
 */

// The rope line's hit area and focus ring (the stanchions, the rope, and
// the guests waiting behind it), in the stage's 1600 x 900 space.
const HIT = { x: 724, y: 546, width: 172, height: 274, rx: 16 };
const RING = { x: 732, y: 552, width: 156, height: 262, rx: 12 };

export default function OrganizerScene() {
  const [open, setOpen] = useState(false);
  // Announced only after the visitor uses the rope line (silent on load).
  const [announcement, setAnnouncement] = useState("");
  const toggle = () => {
    const next = !open;
    setOpen(next);
    setAnnouncement(next ? "Doors open. Guests move up to registration; the run of show shows Doors open. Illustration only." : "Rope line closed. Doors back on standby. Illustration only.");
  };
  const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <>
      {/* Overflow visible: the floor runs past the art's edges so the
          desktop shift (--wv-shift) never uncovers the floor beside it. */}
      <svg
        viewBox={STAGE_VB}
        preserveAspectRatio="xMidYMax slice"
        className="wv-layer wv-layer-char"
        style={{ overflow: "visible" }}
        focusable="false"
        role="group"
        aria-label="Event check-in illustration"
      >
        <g className={open ? "is-open" : ""}>
          <g aria-hidden="true">
            <OrganizerLighting />
            <CheckInDesk open={open} />
            <StafferBadgeArm />
            <Guests />
            <RopeLine />
          </g>
          {/* The rope line: the scene's one control. */}
          <g
            role="button"
            tabIndex={0}
            aria-pressed={open}
            aria-label={`Rope line at guest check-in: doors ${open ? "open" : "on standby"}. Demonstration only: nothing is saved or sent.`}
            className="fc-ctl og-ctl"
            onClick={toggle}
            onKeyDown={onKeyDown}
          >
            <rect className="fc-hit" {...HIT} />
            <rect className="fc-ring" {...RING} />
          </g>
          <g aria-hidden="true">
            <ProducerFigure x={380} y={152.6} scale={1.28} />
          </g>
        </g>
      </svg>
      <svg viewBox={STAGE_VB} preserveAspectRatio="xMidYMax slice" className="wv-layer wv-layer-fg" aria-hidden="true" focusable="false">
        <WayfindingSign />
      </svg>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}

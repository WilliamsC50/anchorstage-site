"use client";

import { useState, type KeyboardEvent } from "react";
import { STAGE_VB } from "./ConcertStage";
import MusicianFigure from "./MusicianFigure";
import { GuitarAmp, GuitarTech, Pedalboard, TouringLighting, VocalMic, WedgeAndSetlist } from "./TouringSet";

/**
 * Who It's For: the Musicians & Touring Acts scene (DESIGN-15A.8).
 *
 * Same permanent stage, seen from the stage itself at soundcheck: black
 * decking with spike tape, a miked combo amp, the vocal mic, a guitar tech
 * with the spare guitars, and the touring guitarist (foreground, dominant)
 * tuning by ear with in-ear monitors in, pedalboard at his feet.
 *
 * Layers: character (lighting and decking, the tech and spares, the amp,
 * the mic stand, the guitarist) and foreground (pedalboard, wedge, set
 * list), matching the other scenes' structure.
 *
 * ONE INTERACTIVE ELEMENT: the pedalboard. It is a real control (role
 * button, aria-pressed; Enter or Space, click, or tap) that takes the rig
 * live for soundcheck or back to standby (repeatable). Live: the amp's
 * pilot light and tubes glow, the tuner and two pedal LEDs light, the
 * clip-on tuner and in-ear pack show green, a warm spot comes up on the
 * guitarist, and the guitar tech gives a thumbs-up. Visual demonstration
 * only: no sound plays, nothing is saved or sent; the accessible name says
 * so, and a polite live region announces the change.
 *
 * Styling and motion: app/(site)/who-its-for/who.css (.mu-*), off under
 * reduced motion.
 */

// The pedalboard's hit area (padded upward for touch) and focus ring, in the
// stage's 1600 x 900 space.
const HIT = { x: 852, y: 798, width: 168, height: 102, rx: 14 };
const RING = { x: 860, y: 858, width: 152, height: 40, rx: 8 };

export default function MusicianScene() {
  const [live, setLive] = useState(false);
  // Announced only after the visitor uses the pedalboard (silent on load).
  const [announcement, setAnnouncement] = useState("");
  const toggle = () => {
    const next = !live;
    setLive(next);
    setAnnouncement(
      next
        ? "Soundcheck: the amp comes off standby, the pedals light up, and the stage light comes up on the guitarist. No sound plays. Illustration only."
        : "Amp back on standby and the stage light down. Illustration only.",
    );
  };
  const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };
  const state = live ? "is-live" : "";

  return (
    <>
      {/* Overflow visible: the decking runs past the art's edges so the
          desktop shift (--wv-shift) never uncovers the floor beside it. */}
      <svg
        viewBox={STAGE_VB}
        preserveAspectRatio="xMidYMax slice"
        className="wv-layer wv-layer-char"
        style={{ overflow: "visible" }}
        aria-hidden="true"
        focusable="false"
      >
        <g className={state}>
          <TouringLighting />
          <GuitarTech />
          <GuitarAmp />
          <VocalMic />
          <MusicianFigure x={320} y={152.6} scale={1.28} />
        </g>
      </svg>
      <svg viewBox={STAGE_VB} preserveAspectRatio="xMidYMax slice" className="wv-layer wv-layer-fg" focusable="false" role="group" aria-label="Soundcheck illustration">
        <g className={state}>
          <g aria-hidden="true">
            <WedgeAndSetlist />
            <Pedalboard />
          </g>
          {/* The pedalboard: the scene's one control. */}
          <g
            role="button"
            tabIndex={0}
            aria-pressed={live}
            aria-label={`Pedalboard at the guitarist's feet: ${live ? "rig live for soundcheck" : "amp on standby"}. Demonstration only: no sound plays and nothing is saved.`}
            className="fc-ctl mu-ctl"
            onClick={toggle}
            onKeyDown={onKeyDown}
          >
            <rect className="fc-hit" {...HIT} />
            <rect className="fc-ring" {...RING} />
          </g>
        </g>
      </svg>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}

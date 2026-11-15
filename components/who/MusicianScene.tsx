"use client";

import { useState, type KeyboardEvent } from "react";
import { STAGE_VB } from "./ConcertStage";
import MusicianFigure from "./MusicianFigure";
import { GuitarAmp, GuitarTech, Pedalboard, TouringLighting, VocalMic, WedgeAndSetlist } from "./TouringSet";

/**
 * Who It's For: the Musicians & Touring Acts scene (DESIGN-15A.8; polished
 * in DESIGN-15A.9 to 15A.11).
 *
 * Same permanent stage, seen from the stage itself at soundcheck: black
 * decking with spike tape, a miked combo amp, the vocal mic, a guitar tech
 * with the spare guitars, and the touring guitarist (foreground, dominant)
 * playing through soundcheck with in-ear monitors in, pedalboard at his
 * feet.
 *
 * Layers: character (lighting and decking, the amp, the tech and spares,
 * the mic stand, the guitarist) and foreground (pedalboard, wedge, set
 * list), matching the other scenes' structure.
 *
 * ONE INTERACTIVE ELEMENT: the pedalboard. It is a real control (role
 * button, aria-pressed; Enter or Space, click, or tap) that starts or stops
 * soundcheck (repeatable). Starting: the guitar tech, kneeling beside the
 * amp with the pedalboard's unplugged output cable, reaches over and plugs
 * it into the amp's input jack; once it is in, the rig comes live: the
 * amp's pilot light and tubes glow, the tuner pedal and two pedal LEDs
 * light, the in-ear pack shows green, and a warm spot comes up on the
 * guitarist (DESIGN-15A.11). Stopping: the tech unplugs the cable and
 * everything returns to standby. Under reduced motion the two states switch
 * instantly. Visual demonstration only: no sound plays, nothing is saved or
 * sent; the accessible name says so, and a polite live region announces
 * the change.
 *
 * Styling and motion: app/(site)/who-its-for/who.css (.mu-*), off under
 * reduced motion.
 */

// The pedalboard's hit area (padded upward over the guitarist's boots for
// touch) and focus ring, in the stage's 1600 x 900 space, aligned with the
// board (x 878-1022, y 806-836; see TouringSet). Both stay above art y 842,
// clear of the raised profession card at every desktop size (DESIGN-15A.9).
const HIT = { x: 866, y: 744, width: 168, height: 98, rx: 14 };
const RING = { x: 872, y: 800, width: 156, height: 40, rx: 8 };

export default function MusicianScene() {
  const [live, setLive] = useState(false);
  // Announced only after the visitor uses the pedalboard (silent on load).
  const [announcement, setAnnouncement] = useState("");
  const toggle = () => {
    const next = !live;
    setLive(next);
    setAnnouncement(
      next
        ? "Soundcheck: the guitar tech plugs the cable into the amp, then the amp comes off standby, the pedals light up, and the stage light comes up on the guitarist. No sound plays. Illustration only."
        : "The guitar tech unplugs the cable: the amp is back on standby and the stage light is down. Illustration only.",
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
          {/* The amp first: the tech's arm and plug pass in front of it. */}
          <GuitarAmp />
          <GuitarTech />
          <VocalMic />
          {/* Slightly upstage of the other protagonists (feet at art y 822)
              so the pedalboard in front of him sits on the deck. */}
          <MusicianFigure x={340} y={125.1} scale={1.24} />
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
            aria-label={`Pedalboard at the guitarist's feet: ${live ? "cable plugged into the amp, rig live for soundcheck" : "cable unplugged, amp on standby"}. Starts or stops soundcheck: the guitar tech plugs in or unplugs the amp. Demonstration only: no sound plays and nothing is saved.`}
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

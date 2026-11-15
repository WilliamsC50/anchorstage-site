"use client";

import { useState, type KeyboardEvent } from "react";
import { STAGE_VB } from "./ConcertStage";
import { AudioCase, CableTrunk, InspectionCase, LedCart, MovingHeads, RentalLighting, VideoCase, WirelessRack } from "./RentalSet";
import RentalTechFigure from "./RentalTechFigure";

/**
 * Who It's For: the Rental Warehouses & Providers scene (DESIGN-15A.12).
 *
 * Same permanent stage at load-in, from the rental provider's side: work
 * lights only, and an order being checked out on the deck: audio and video
 * cases, LED panels on a cart, moving heads unpacked on their case, a
 * cable trunk, wireless mic receivers, and the rental prep technician
 * (foreground, dominant) with a pistol-grip asset scanner and the printed
 * pick list.
 *
 * Layers: character (lighting and floor; the LED cart and moving heads in a
 * back row, the wireless rack and audio case on the right, the video case
 * front left; the case being inspected, the technician, the scan beam) and
 * foreground (the cable trunk). The cases were spread out across the floor
 * in DESIGN-15A.13 (they had been stacked).
 *
 * ONE INTERACTIVE ELEMENT: the case being inspected and the scanner aimed
 * at it. It is a real control (role button, aria-pressed; Enter or Space,
 * click, or tap) that scans the case's asset tag or resets it (repeatable).
 * Scanning: the technician brings the scanner up to aim, a red scan line
 * hits the tag, the tag's status band turns from amber HOLD to green READY
 * with a brief confirmation ring, the latches flip, and the lid swings up
 * to show the moving-head fixture in its foam. Under reduced motion the two
 * states switch instantly (no scan line). Visual demonstration only: it is
 * not connected to any inventory and nothing is saved or sent; the
 * accessible name says so, and a polite live region announces the change.
 *
 * Styling and motion: app/(site)/who-its-for/who.css (.rn-*), off under
 * reduced motion.
 */

// The control's hit area (the case, its open lid, the tag, and the scanner
// hand) and focus ring (around the inspected case), in the stage's
// 1600 x 900 space.
const HIT = { x: 704, y: 540, width: 232, height: 304, rx: 16 };
const RING = { x: 708, y: 612, width: 190, height: 226, rx: 12 };

export default function RentalScene() {
  const [scanned, setScanned] = useState(false);
  // Announced only after the visitor scans (silent on load).
  const [announcement, setAnnouncement] = useState("");
  const toggle = () => {
    const next = !scanned;
    setScanned(next);
    setAnnouncement(
      next
        ? "Asset tag scanned: the moving-head case is marked ready and opens to show the fixture. Illustration only, not connected to any inventory."
        : "Case closed again and back to awaiting inspection. Illustration only.",
    );
  };
  const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };
  const state = scanned ? "is-scanned" : "";

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
        aria-label="Rental equipment check illustration"
      >
        <g className={state}>
          <g aria-hidden="true">
            <RentalLighting />
            {/* Spread across the floor (DESIGN-15A.13; no stacks). Back row:
                the LED cart and the moving heads on their case. Right lane:
                the wireless rack and the audio case. Front left: the video
                case, a little larger for its nearer depth. */}
            <g transform="translate(-14 -66)">
              <LedCart />
            </g>
            <g transform="translate(-24 -66)">
              <MovingHeads />
            </g>
            <g transform="translate(22 -6)">
              <WirelessRack />
            </g>
            <g transform="translate(966 -44)">
              <AudioCase />
            </g>
            <g transform="translate(446 842) scale(1.2) translate(-429 -773)">
              <VideoCase />
            </g>
            {/* At the technician's depth: the case she is inspecting. */}
            <InspectionCase />
            <RentalTechFigure x={370} y={155.1} scale={1.24} />
            {/* The scan line, from the scanner's window to the tag. */}
            {/* Scanner window at about (882, 664) with the scanner turned to
                152 degrees; the barcode's centre at (800, 708.5). */}
            <g className="rn-laser">
              <path d="M882 664 L800 708.5" stroke="#ff3b2a" strokeWidth="5" opacity="0.25" strokeLinecap="round" />
              <path d="M882 664 L800 708.5" stroke="#ff5a4a" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M786 708.5 h28" stroke="#ff5a4a" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          </g>
          {/* The case and scanner: the scene's one control. */}
          <g
            role="button"
            tabIndex={0}
            aria-pressed={scanned}
            aria-label={`Asset scanner and moving-head case: ${scanned ? "tag scanned, case inspected and open" : "case awaiting inspection"}. Scans the case's asset tag. Demonstration only: not connected to any inventory, nothing is saved.`}
            className="fc-ctl rn-ctl"
            onClick={toggle}
            onKeyDown={onKeyDown}
          >
            <rect className="fc-hit" {...HIT} />
            <rect className="fc-ring" {...RING} />
          </g>
        </g>
      </svg>
      <svg viewBox={STAGE_VB} preserveAspectRatio="xMidYMax slice" className="wv-layer wv-layer-fg" aria-hidden="true" focusable="false">
        {/* The cable trunk, full size at the technician's depth. */}
        <g transform="translate(1160 842) scale(1.5) translate(-1149 -838)">
          <CableTrunk />
        </g>
      </svg>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}

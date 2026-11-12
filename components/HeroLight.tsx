"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Homepage hero stage light.
 *
 * An electric-blue fixture just inside the upper-right corner of the hero,
 * built from three layers:
 *
 *   bloom  a bright, tight glow at the source itself
 *   beam   a soft cone thrown down and across the hero, fading with distance
 *   wash   a broad ambient spill that tints the air around the beam
 *
 * On a fine pointer (mouse or pen) the scene responds: the beam swings part of
 * the way toward the pointer, the wash drifts with it, and the rig brightens.
 * Everything eases on long time constants, so it reads as the environment
 * reacting rather than a spotlight pinned to the cursor. On touch devices, or
 * with reduced motion requested, the server-rendered static light is kept.
 *
 * The layer sits above the hero photograph and below the copy, and adds light
 * with a `screen` blend. A static mask keeps the left copy column to a faint
 * spill so text contrast holds; the light builds toward the photo side.
 * Motion is transform and opacity only, so gradients are painted once and
 * moved by the compositor. Purely decorative.
 */

// Light source, as a fraction of the hero box.
const SOURCE_X = 0.94;
const SOURCE_Y = -0.06;

// Beam response: fraction of the pointer's angular offset the beam follows,
// capped so it never swings far off its resting aim.
const AIM_GAIN = 0.6;
const MAX_SWING_DEG = 14;

// Wash response: fraction of the source-to-pointer vector the wash drifts,
// capped in px so it stays within the layer's overhang.
const WASH_PULL = 0.2;
const WASH_MAX_X = 180;
const WASH_MAX_Y = 100;

// Rig intensity at rest and while the pointer is in the hero.
const REST_GLOW = 0.82;
const ACTIVE_GLOW = 1;

// Easing time constants in ms. Long enough that the light trails the pointer.
const MOVE_TAU = 380;
const GLOW_TAU = 520;

// The wash overhangs the hero on every side so drifting never exposes an edge.
const OVERHANG = 0.2;
const SPAN = 1 + OVERHANG * 2;
const pct = (v: number) => `${(v * 100).toFixed(3)}%`;

// Bloom size comes from CSS (--bloom-w / --bloom-h) so it can shrink below lg.
const BLOOM =
  `radial-gradient(ellipse var(--bloom-w) var(--bloom-h) at ${pct(SOURCE_X)} ${pct(SOURCE_Y)},` +
  " rgba(170, 225, 255, 0.7) 0%, rgba(90, 180, 255, 0.28) 30%," +
  " rgba(60, 140, 255, 0.07) 58%, transparent 76%)";

// Two cones from the beam's origin (its left-centre), pointing along +x before
// rotation: a narrow bright core inside a wider soft spread.
const BEAM =
  "conic-gradient(from 90deg at 0% 50%," +
  " rgba(150, 215, 255, 0.5) 0deg, rgba(110, 190, 255, 0.17) 5deg, transparent 11deg," +
  " transparent 349deg, rgba(110, 190, 255, 0.17) 355deg, rgba(150, 215, 255, 0.5) 360deg)," +
  " conic-gradient(from 90deg at 0% 50%," +
  " rgba(70, 160, 255, 0.32) 0deg, rgba(50, 130, 240, 0.12) 14deg, transparent 26deg," +
  " transparent 334deg, rgba(50, 130, 240, 0.12) 346deg, rgba(70, 160, 255, 0.32) 360deg)";

// Falloff along the beam's length. Clear at the apex, where the bloom sits.
const BEAM_FALLOFF =
  "linear-gradient(to right, transparent 0%, #000 6%, rgba(0, 0, 0, 0.6) 34%," +
  " rgba(0, 0, 0, 0.25) 64%, transparent 92%)";

const WASH =
  `radial-gradient(ellipse 1100px 760px at ${pct((SOURCE_X + OVERHANG) / SPAN)} ${pct((SOURCE_Y + OVERHANG) / SPAN)},` +
  " rgba(60, 150, 255, 0.3) 0%, rgba(40, 115, 230, 0.16) 38%," +
  " rgba(30, 90, 200, 0.06) 62%, transparent 80%)";

// Directional falloff across the hero, and the copy guard: a faint spill over
// the copy, building to full strength beyond it. Each ramp starts past the
// right edge of that layout's copy: about 56% of the hero at lg and up, where
// the copy is a left column, and about 80% below lg, where it runs nearly the
// full width.
const SCENE_MASK_LG =
  "linear-gradient(to right, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.1) 57%," +
  " rgba(0, 0, 0, 0.6) 68%, #000 80%)";
const SCENE_MASK_SM =
  "linear-gradient(to right, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.1) 80%," +
  " rgba(0, 0, 0, 0.6) 92%, #000 100%)";

const SCENE_STYLE = {
  "--scene-mask-sm": SCENE_MASK_SM,
  "--scene-mask-lg": SCENE_MASK_LG,
  maskImage: "var(--scene-mask)",
  WebkitMaskImage: "var(--scene-mask)",
} as CSSProperties;

const BEAM_STYLE: CSSProperties = {
  left: pct(SOURCE_X),
  top: pct(SOURCE_Y),
  width: "125%",
  aspectRatio: "10 / 9",
  transformOrigin: "0 50%",
  transform: "translateY(-50%) rotate(calc(var(--beam-rest) + var(--beam-aim, 0deg)))",
  background: BEAM,
  maskImage: BEAM_FALLOFF,
  WebkitMaskImage: BEAM_FALLOFF,
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
// Signed angular difference folded into -180..180.
const angleDelta = (a: number, b: number) => ((a - b + 540) % 360) - 180;

export default function HeroLight() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rig = rigRef.current;
    const wash = washRef.current;
    const beam = beamRef.current;
    // The hero section receives the pointer; the light itself never does.
    const host = sceneRef.current?.parentElement;
    if (!rig || !wash || !beam || !host) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let enabled = false;
    let frame = 0;
    let last = 0;
    // Resting beam aim in degrees, read from CSS (it varies by breakpoint).
    let rest = 0;
    // Current and target: beam swing (deg), wash drift (px), rig glow.
    let aim = 0, taim = 0;
    let wx = 0, wy = 0, twx = 0, twy = 0;
    let glow = REST_GLOW, tglow = REST_GLOW;

    const readRest = () => {
      rest = parseFloat(getComputedStyle(beam).getPropertyValue("--beam-rest")) || 0;
    };

    const render = () => {
      beam.style.setProperty("--beam-aim", `${aim.toFixed(3)}deg`);
      wash.style.transform = `translate3d(${wx.toFixed(2)}px, ${wy.toFixed(2)}px, 0)`;
      rig.style.opacity = glow.toFixed(3);
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16;
      last = now;
      const kMove = 1 - Math.exp(-dt / MOVE_TAU);
      const kGlow = 1 - Math.exp(-dt / GLOW_TAU);
      aim += (taim - aim) * kMove;
      wx += (twx - wx) * kMove;
      wy += (twy - wy) * kMove;
      glow += (tglow - glow) * kGlow;
      render();

      const settled =
        Math.abs(taim - aim) < 0.02 &&
        Math.abs(twx - wx) < 0.1 &&
        Math.abs(twy - wy) < 0.1 &&
        Math.abs(tglow - glow) < 0.002;
      if (settled) {
        frame = 0;
        last = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      const dx = event.clientX - rect.left - SOURCE_X * rect.width;
      const dy = event.clientY - rect.top - SOURCE_Y * rect.height;
      const toPointer = (Math.atan2(dy, dx) * 180) / Math.PI;
      taim = clamp(angleDelta(toPointer, rest) * AIM_GAIN, -MAX_SWING_DEG, MAX_SWING_DEG);
      twx = clamp(dx * WASH_PULL, -WASH_MAX_X, WASH_MAX_X);
      twy = clamp(dy * WASH_PULL, -WASH_MAX_Y, WASH_MAX_Y);
      tglow = ACTIVE_GLOW;
      schedule();
    };

    const onLeave = () => {
      taim = 0;
      twx = 0;
      twy = 0;
      tglow = REST_GLOW;
      schedule();
    };

    const enable = () => {
      enabled = true;
      readRest();
      wash.style.willChange = "transform";
      beam.style.willChange = "transform";
      rig.style.willChange = "opacity";
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
      window.addEventListener("resize", readRest, { passive: true });
    };

    const disable = () => {
      enabled = false;
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", readRest);
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      aim = taim = wx = wy = twx = twy = 0;
      glow = tglow = REST_GLOW;
      // Back to the server-rendered static light.
      beam.style.removeProperty("--beam-aim");
      beam.style.removeProperty("will-change");
      wash.style.removeProperty("transform");
      wash.style.removeProperty("will-change");
      rig.style.removeProperty("will-change");
      rig.style.opacity = String(REST_GLOW);
    };

    const sync = () => {
      const want = finePointer.matches && !reducedMotion.matches;
      if (want && !enabled) enable();
      else if (!want && enabled) disable();
    };

    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
      if (enabled) disable();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      data-hero-light=""
      aria-hidden="true"
      // Below lg the copy runs nearly the full width under the source, so the
      // rig runs dimmer there, with a tighter bloom and a wider copy guard.
      className="absolute inset-0 z-[2] pointer-events-none overflow-hidden mix-blend-screen opacity-60 [--bloom-w:280px] [--bloom-h:170px] [--scene-mask:var(--scene-mask-sm)] lg:opacity-100 lg:[--bloom-w:520px] lg:[--bloom-h:340px] lg:[--scene-mask:var(--scene-mask-lg)]"
      style={SCENE_STYLE}
    >
      <div ref={rigRef} className="absolute inset-0" style={{ opacity: REST_GLOW }}>
        <div
          ref={washRef}
          className="absolute"
          style={{ inset: `${-OVERHANG * 100}%`, background: WASH }}
        />
        <div
          ref={beamRef}
          // Resting aim: from the source toward the lower-left of the hero,
          // which sits at a different angle as the hero's proportions change.
          className="absolute [--beam-rest:118deg] md:[--beam-rest:130deg] lg:[--beam-rest:146deg]"
          style={BEAM_STYLE}
        />
        <div className="absolute inset-0" style={{ background: BLOOM }} />
      </div>
    </div>
  );
}

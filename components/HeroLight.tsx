"use client";

import { useEffect, useRef } from "react";

/**
 * Homepage hero stage light.
 *
 * A soft blue wash anchored above the upper-right of the hero, like a lighting
 * rig just out of frame. On a fine pointer (mouse or pen) it leans a short way
 * toward the pointer and brightens slightly, easing slowly so it reads as
 * atmosphere rather than a spotlight tracking the cursor. On touch devices, or
 * with reduced motion requested, it stays static at its anchor: the server
 * markup below is that static state, so nothing changes until the effect opts
 * in on the client.
 *
 * It sits above the hero photograph and below the copy, and adds light with a
 * `screen` blend so the photo gains haze instead of being covered. Motion is
 * transform and opacity only, so the gradient is painted once and moved by the
 * compositor. Purely decorative.
 */

// Anchor, as a fraction of the hero box. Matches the light it replaced.
const ANCHOR_X = 0.78;
const ANCHOR_Y = -0.12;

// How far the light leans toward the pointer, as a fraction of the distance
// between the anchor and the pointer. Small on purpose.
const PULL_X = 0.12;
const PULL_Y = 0.1;

// Resting and engaged opacity of the light layer.
const REST_OPACITY = 0.8;
const ACTIVE_OPACITY = 1;

// Easing time constants in ms. Long enough that the light trails the pointer.
const MOVE_TAU = 450;
const GLOW_TAU = 650;

// The light layer overhangs the hero by this fraction on every side, so
// leaning it never exposes an edge inside the clipped hero.
const OVERHANG = 0.2;
const SPAN = 1 + OVERHANG * 2;

// The anchor re-expressed in the overhanging layer's own coordinates.
const LAYER_X = `${(((ANCHOR_X + OVERHANG) / SPAN) * 100).toFixed(3)}%`;
const LAYER_Y = `${(((ANCHOR_Y + OVERHANG) / SPAN) * 100).toFixed(3)}%`;

// Peak colour stops; REST_OPACITY brings the resting light to roughly the
// 0.20 / 0.10 strength of the original static glow.
const LIGHT = `radial-gradient(ellipse 820px 560px at ${LAYER_X} ${LAYER_Y}, rgba(145, 205, 255, 0.25) 0%, rgba(70, 135, 200, 0.125) 32%, transparent 72%)`;

export default function HeroLight() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    // The hero section receives the pointer; the light itself never does.
    const host = light?.parentElement?.parentElement;
    if (!light || !host) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let enabled = false;
    let frame = 0;
    let last = 0;
    let width = 0;
    let height = 0;
    // Current and target offset in px, and current and target opacity.
    let x = 0, y = 0, tx = 0, ty = 0;
    let glow = REST_OPACITY, tglow = REST_OPACITY;

    const render = () => {
      light.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      light.style.opacity = glow.toFixed(3);
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16;
      last = now;
      const kMove = 1 - Math.exp(-dt / MOVE_TAU);
      const kGlow = 1 - Math.exp(-dt / GLOW_TAU);
      x += (tx - x) * kMove;
      y += (ty - y) * kMove;
      glow += (tglow - glow) * kGlow;
      render();

      const settled =
        Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1 && Math.abs(tglow - glow) < 0.002;
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

    const measure = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const px = (event.clientX - rect.left) / width;
      const py = (event.clientY - rect.top) / height;
      tx = (px - ANCHOR_X) * PULL_X * width;
      ty = (py - ANCHOR_Y) * PULL_Y * height;
      tglow = ACTIVE_OPACITY;
      schedule();
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      tglow = REST_OPACITY;
      schedule();
    };

    const enable = () => {
      enabled = true;
      measure();
      light.style.willChange = "transform, opacity";
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
      window.addEventListener("resize", measure, { passive: true });
    };

    const disable = () => {
      enabled = false;
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      x = y = tx = ty = 0;
      glow = tglow = REST_OPACITY;
      // Back to the server-rendered static light.
      light.style.removeProperty("transform");
      light.style.removeProperty("will-change");
      light.style.opacity = String(REST_OPACITY);
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
      aria-hidden="true"
      // Half strength below lg, where the photo is full-bleed behind the copy,
      // so the light never eats into text contrast there.
      className="absolute inset-0 z-[2] pointer-events-none overflow-hidden mix-blend-screen opacity-50 lg:opacity-100"
    >
      <div
        ref={lightRef}
        className="absolute"
        style={{
          inset: `${-OVERHANG * 100}%`,
          background: LIGHT,
          opacity: REST_OPACITY,
        }}
      />
    </div>
  );
}

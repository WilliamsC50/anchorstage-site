"use client";

import { useEffect } from "react";

/**
 * Pointer lighting and tilt for homepage HUD panels.
 *
 * One delegated listener on the homepage root. While a fine pointer moves
 * over a `.hud-panel`, the panel receives:
 *
 *   --mx / --my   pointer position in px, which moves the panel's inner light
 *   --rx / --ry   a small tilt toward the pointer (at most MAX_TILT degrees)
 *
 * Updates are batched to one per animation frame. Leaving a panel clears its
 * values, so CSS returns it to the resting upper-right light. Touch devices
 * and reduced motion get no tracking: the static light is the design there.
 * Renders nothing.
 */

const MAX_TILT = 3;
const PROPS = ["--mx", "--my", "--rx", "--ry"] as const;

export default function HudPointer() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".aso-home");
    if (!root) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let enabled = false;
    let frame = 0;
    let pending: PointerEvent | null = null;
    let active: HTMLElement | null = null;

    const clear = (panel: HTMLElement | null) => {
      if (!panel) return;
      for (const prop of PROPS) panel.style.removeProperty(prop);
    };

    const apply = () => {
      frame = 0;
      const event = pending;
      pending = null;
      if (!event) return;

      const target = event.target instanceof Element ? event.target : null;
      const panel = target?.closest<HTMLElement>(".hud-panel") ?? null;
      if (panel !== active) {
        clear(active);
        active = panel;
      }
      if (!panel) return;

      const rect = panel.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const nx = rect.width ? x / rect.width - 0.5 : 0;
      const ny = rect.height ? y / rect.height - 0.5 : 0;
      panel.style.setProperty("--mx", `${x.toFixed(1)}px`);
      panel.style.setProperty("--my", `${y.toFixed(1)}px`);
      panel.style.setProperty("--rx", `${(-ny * MAX_TILT * 2).toFixed(2)}deg`);
      panel.style.setProperty("--ry", `${(nx * MAX_TILT * 2).toFixed(2)}deg`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pending = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      pending = null;
      clear(active);
      active = null;
    };

    const enable = () => {
      enabled = true;
      root.addEventListener("pointermove", onMove, { passive: true });
      root.addEventListener("pointerleave", onLeave);
    };

    const disable = () => {
      enabled = false;
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      frame = 0;
      onLeave();
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

  return null;
}

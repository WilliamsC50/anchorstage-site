"use client";

import { useEffect } from "react";

/**
 * Homepage scene stacking.
 *
 * Every `.home-stack` section inside `.aso-home` becomes position: sticky, so
 * each scene scrolls up and over the one before it, which stays pinned behind
 * it. The overlap is real layout, so it reverses exactly when scrolling back
 * up, and scrolling itself is untouched: no snapping, no scroll hijacking.
 *
 * Each scene pins at min(nav height, viewport - scene height). A scene
 * shorter than the viewport pins under the nav; a taller one keeps scrolling
 * until its last line is on screen and pins there, so no content is ever
 * covered before it has been seen.
 *
 * On top of the layout, a per-frame pass (one rAF per scroll, arithmetic
 * only, no layout reads) gives each scene depth:
 *   incoming  starts slightly scaled down with rounded top corners and
 *             settles flat and full-width as it reaches the nav
 *   outgoing  recedes as it is covered: scales back, tilts away, darkens
 *
 * Keyboard focus: if focus lands on something a later scene is covering,
 * the page scrolls to where that scene is uncovered.
 *
 * Off under prefers-reduced-motion and without JS: the page is then the
 * normal flowing layout. Renders nothing.
 */

const NAV = 64;
const PERSPECTIVE = 1400;
// Veil opacity above which a focused element counts as obscured.
const FOCUS_MAX_VEIL = 0.02;

interface Depth {
  inScale: number;
  radius: number;
  outScale: number;
  outTilt: number;
  outLift: number;
  veil: number;
}

const DESKTOP: Depth = { inScale: 0.08, radius: 28, outScale: 0.06, outTilt: 7, outLift: 28, veil: 0.7 };
const MOBILE: Depth = { inScale: 0.05, radius: 20, outScale: 0.05, outTilt: 5, outLift: 16, veil: 0.65 };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t: number) => t * t * (3 - 2 * t);

interface Scene {
  el: HTMLElement;
  veil: HTMLElement | null;
  top: number; // natural document top
  h: number;
  w: number;
  stick: number; // sticky top, viewport px
  last: string;
}

export default function SceneStack() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".aso-home");
    if (!main) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let scenes: Scene[] = [];
    let mainEnd = 0;
    let vh = 0;
    let depth = DESKTOP;
    let frame = 0;
    let observer: ResizeObserver | null = null;

    const measure = () => {
      vh = window.innerHeight;
      depth = window.innerWidth < 768 ? MOBILE : DESKTOP;
      // main is never sticky or transformed, so its rect is its layout box.
      let y = main.getBoundingClientRect().top + window.scrollY;
      for (const s of scenes) {
        s.top = y;
        s.h = s.el.offsetHeight;
        s.w = s.el.offsetWidth;
        s.stick = Math.min(NAV, vh - s.h);
        s.el.style.top = `${s.stick}px`;
        y += s.h;
      }
      mainEnd = y;
    };

    const render = () => {
      frame = 0;
      const sy = window.scrollY;
      const n = scenes.length;
      const tops = scenes.map((s) => Math.min(Math.max(s.top - sy, s.stick), mainEnd - sy - s.h));

      for (let i = 0; i < n; i++) {
        const s = scenes[i];
        const top = tops[i];
        const bottom = top + s.h;

        // Incoming: 0 as the scene's top enters the viewport, 1 at the nav.
        const enter = i === 0 ? 1 : smooth(clamp01((vh - top) / (vh - NAV)));

        // Outgoing: share of this scene's visible area the next one covers.
        let cover = 0;
        if (i < n - 1) {
          const visTop = Math.max(top, NAV);
          const visBottom = Math.min(bottom, vh);
          const visible = visBottom - visTop;
          cover = visible > 1 ? clamp01((visBottom - tops[i + 1]) / visible) : 1;
          cover = smooth(cover);
        }

        let css = "";
        if (enter < 0.999 || cover > 0.001) {
          const cx = s.w / 2;
          // Recede about the centre of what is still visible of this scene.
          const oy = Math.min(Math.max((Math.max(top, NAV) + Math.min(bottom, vh)) / 2 - top, 0), s.h);
          const sIn = 1 - depth.inScale * (1 - enter);
          const sOut = 1 - depth.outScale * cover;
          // Outgoing scale and tilt pivot on (cx, oy); incoming scale pivots
          // on the top edge so the panel's leading edge rises unbroken.
          css =
            `translate3d(${cx}px, ${(oy - depth.outLift * cover).toFixed(2)}px, 0) ` +
            `perspective(${PERSPECTIVE}px) rotateX(${(depth.outTilt * cover).toFixed(3)}deg) ` +
            `scale(${sOut.toFixed(4)}) translateY(${(-oy).toFixed(2)}px) ` +
            `scale(${sIn.toFixed(4)}) translateX(${-cx}px)`;
        }
        const r = i === 0 ? 0 : Math.round(depth.radius * (1 - enter));
        const veil = (depth.veil * cover).toFixed(3);
        const key = `${css}|${r}|${veil}`;
        if (key === s.last) continue;
        s.last = key;
        s.el.style.transform = css;
        s.el.style.borderTopLeftRadius = s.el.style.borderTopRightRadius = r ? `${r}px` : "";
        if (s.veil) s.veil.style.opacity = veil === "0.000" ? "" : veil;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const relayout = () => {
      measure();
      schedule();
    };

    // Focus that lands under a covering scene: scroll to where its own scene
    // is in natural flow (not pinned, so nothing overlaps it), with the
    // focused element as close to centre as that allows.
    const onFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      requestAnimationFrame(() => {
        const index = scenes.findIndex((s) => s.el.contains(target));
        if (index < 0) return;
        const s = scenes[index];
        // Bring the depth pass up to date with any scroll focus just caused.
        render();
        const rect = target.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const hit = cy >= NAV && cy <= vh ? document.elementFromPoint(cx, cy) : null;
        // Dimmed more than slightly counts as obscured too.
        const dimmed = Number(s.veil?.style.opacity || 0) > FOCUS_MAX_VEIL;
        if (hit && target.contains(hit) && !dimmed) return;

        let offset = 0;
        let node: HTMLElement | null = target;
        while (node && node !== s.el) {
          offset += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        if (!node) return;
        const centred = s.top + offset - (vh - target.offsetHeight) / 2;
        const unpinned = s.top - s.stick;
        window.scrollTo({ top: Math.max(0, Math.min(centred, unpinned)), behavior: "instant" });
      });
    };

    const enable = () => {
      scenes = Array.from(main.querySelectorAll<HTMLElement>(":scope > .home-stack")).map((el) => ({
        el,
        veil: el.querySelector<HTMLElement>(":scope > .home-stack-veil"),
        top: 0,
        h: 0,
        w: 0,
        stick: 0,
        last: "",
      }));
      if (scenes.length < 2) return;
      main.classList.add("is-stacked");
      measure();
      render();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", relayout);
      main.addEventListener("focusin", onFocus);
      observer = new ResizeObserver(relayout);
      for (const s of scenes) observer.observe(s.el);
    };

    const disable = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", relayout);
      main.removeEventListener("focusin", onFocus);
      observer?.disconnect();
      observer = null;
      main.classList.remove("is-stacked");
      for (const s of scenes) {
        s.el.style.top = "";
        s.el.style.transform = "";
        s.el.style.borderTopLeftRadius = s.el.style.borderTopRightRadius = "";
        if (s.veil) s.veil.style.opacity = "";
      }
      scenes = [];
    };

    const sync = () => {
      disable();
      if (!reduce.matches) enable();
    };

    sync();
    reduce.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      disable();
    };
  }, []);

  return null;
}

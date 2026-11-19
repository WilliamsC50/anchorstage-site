"use client";

import { useEffect } from "react";

/**
 * Homepage scene stacking.
 *
 * Every `.home-stack` section inside `.aso-home` is a full-frame panel: at
 * least the viewport below the nav (home.css), content centred. This makes
 * them position: sticky, so each panel scrolls up over the one before it,
 * which stays pinned behind it until fully replaced. The overlap is real
 * layout, so it reverses exactly when scrolling back up, and scrolling itself
 * is untouched: no snapping, no scroll hijacking.
 *
 * Each panel pins at min(nav height, viewport - panel height). A one-frame
 * panel pins under the nav; a taller one keeps scrolling until its last line
 * is on screen and pins there, so no content is covered before it is seen.
 * Either way the pinned panel fills the frame exactly, so every transition
 * is the same: the next panel travels one frame, from the bottom of the
 * viewport to the nav, over a full-frame panel.
 *
 * One progress value p per transition (eased, 0 to 1) drives both panels:
 *   incoming  scales up from slightly small, pivoting on its top edge, with
 *             rounded top corners (.is-entering) that square off once it
 *             reaches the nav
 *   outgoing  recedes, hinged at the frame's top edge (under the nav): it
 *             scales back, leans away, and darkens under its veil until the
 *             incoming panel has replaced it
 * Hinging the outgoing panel at the nav line keeps everything above the
 * frame above it, so a tall panel never reveals off-frame content as it
 * recedes.
 *
 * Keyboard focus: if focus lands on something a later panel is covering,
 * the page scrolls to where that panel is uncovered.
 *
 * Panels that cannot be seen (still below the viewport, or fully covered by
 * the next one) get data-motion="paused" so their decorative animations hold;
 * covered panels also get .is-covered, which stops their decorative layers
 * drawing. Content is never hidden, so focus and tab order are unchanged.
 *
 * Only transforms and the veil's opacity change per frame. Classes and data
 * attributes change only when a panel's state does, never per frame: a
 * per-frame paint property (such as an easing corner radius) would repaint
 * and re-rasterise the whole panel on every frame of every transition.
 *   .is-entering   while a panel travels toward the nav (rounded corners)
 *   data-entered   set once, the first time a panel is at least halfway
 *                  into the frame, and never removed: scenes start one-time
 *                  intros from it (the gateway's light traces), so an intro
 *                  never plays unseen below the fold or replays on scroll
 *
 * Off under prefers-reduced-motion and without JS: the page then flows.
 * Renders nothing.
 */

const NAV = 64;
const PERSPECTIVE = 1600;
// Veil opacity above which a focused element counts as obscured.
const FOCUS_MAX_VEIL = 0.02;

interface Depth {
  /** Incoming panel's scale deficit at the start of a transition. */
  inScale: number;
  /** Outgoing panel's scale deficit once replaced. */
  outScale: number;
  /** Outgoing panel's lean-back once replaced, deg. */
  outTilt: number;
  /** Outgoing panel's veil opacity once replaced. */
  veil: number;
}

// One motion language at every size; small screens get proportionally less
// scale so the side reveal stays a similar width in px. The incoming panel's
// corner radius is in home.css (.is-entering).
const DESKTOP: Depth = { inScale: 0.06, outScale: 0.08, outTilt: 6, veil: 0.85 };
const MOBILE: Depth = { inScale: 0.06, outScale: 0.08, outTilt: 6, veil: 0.85 };
// Transition progress at which a panel counts as entered (data-entered).
const ENTERED = 0.5;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t: number) => t * t * (3 - 2 * t);

interface Scene {
  el: HTMLElement;
  veil: HTMLElement | null;
  top: number; // natural document top
  h: number;
  w: number;
  stick: number; // sticky top, viewport px
  last: string;
  motion: "" | "pending" | "covered";
  entering: boolean;
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
      const span = vh - NAV;
      // Screen top of each panel, as sticky positioning places it.
      const tops = scenes.map((s) => Math.min(Math.max(s.top - sy, s.stick), mainEnd - sy - s.h));
      // Transition progress of each panel: 0 as its top enters the viewport,
      // 1 when it reaches the nav and has replaced the panel before it.
      const progress = tops.map((top, i) => (i === 0 ? 1 : ease(clamp01((vh - top) / span))));

      for (let i = 0; i < n; i++) {
        const s = scenes[i];
        const top = tops[i];
        const enter = progress[i];
        // A panel is pinned and filling the frame whenever the next one is
        // in view, so the next panel's progress is this one's exit.
        const cover = i < n - 1 ? progress[i + 1] : 0;

        // Nothing of this panel shows while it is still below the viewport
        // (pending) or once the next panel has reached the nav (covered: that
        // panel fills the frame, and the receding stack behind it only ever
        // shrinks within it). Its decorative motion then pauses, and when
        // covered its decorative layers stop drawing (home.css).
        const motion = i < n - 1 && tops[i + 1] <= NAV ? "covered" : top >= vh ? "pending" : "";
        if (motion !== s.motion) {
          s.motion = motion;
          if (motion) s.el.dataset.motion = "paused";
          else delete s.el.dataset.motion;
          s.el.classList.toggle("is-covered", motion === "covered");
        }

        // Rounded top corners while travelling toward the nav, square once
        // landed: a class flip at each end of the transition, not a radius
        // eased per frame.
        const entering = i > 0 && enter < 0.999;
        if (entering !== s.entering) {
          s.entering = entering;
          s.el.classList.toggle("is-entering", entering);
        }
        if (!motion && enter >= ENTERED && !("entered" in s.el.dataset)) s.el.dataset.entered = "";

        let css = "";
        if (enter < 0.999 || cover > 0.001) {
          const cx = s.w / 2;
          // Outgoing hinge: the frame's top edge, in the panel's own space.
          const hinge = NAV - top;
          const sIn = 1 - depth.inScale * (1 - enter);
          const sOut = 1 - depth.outScale * cover;
          // Outgoing scale and lean pivot on (cx, hinge); incoming scale
          // pivots on (cx, 0), the panel's leading edge.
          css =
            `translate3d(${cx}px, ${hinge.toFixed(2)}px, 0) ` +
            `perspective(${PERSPECTIVE}px) rotateX(${(-depth.outTilt * cover).toFixed(3)}deg) ` +
            `scale(${sOut.toFixed(4)}) translateY(${(-hinge).toFixed(2)}px) ` +
            `scale(${sIn.toFixed(4)}) translateX(${-cx}px)`;
        }
        const veil = (depth.veil * cover).toFixed(3);
        const key = `${css}|${veil}`;
        if (key === s.last) continue;
        s.last = key;
        s.el.style.transform = css;
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

    // Focus that lands under a covering panel: scroll to where its own panel
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
        motion: "",
        entering: false,
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
        if (s.veil) s.veil.style.opacity = "";
        delete s.el.dataset.motion;
        s.el.classList.remove("is-covered", "is-entering");
        // data-entered stays: an intro that has played does not replay.
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

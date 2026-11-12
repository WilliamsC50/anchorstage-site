"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Homepage hero side light and dimensional headline.
 *
 * An electric-blue fixture at the left of the hero, raking across the
 * headline from the side, built from three layers:
 *
 *   bloom  a bright, tight glow at the source itself
 *   beam   a soft cone thrown from the source toward the headline
 *   wash   a broad ambient spill around the source
 *
 * The light is shuttered like a profile spot: over the copy column it only
 * reaches a horizontal band around the headline, measured so it stops short
 * of the eyebrow above (which sits close to the AA limit), and held below full
 * strength there. The bright source (bloom) shows only left of the copy
 * column, where there is no text. A faint spill covers everything else.
 *
 * The headline (`[data-hero-title]`, styled in home.css) reacts to the same
 * light position. Its projected shadow is the lettering scaled about the
 * light point, which is how a point light projects a shape onto a parallel
 * wall: letters farther from the source throw longer shadows, so direction,
 * length, and softness all follow the light. A lit rim marks the letter
 * edges that face it.
 *
 * On a fine pointer (mouse or pen) the light follows: pointer height raises
 * or lowers it, and pointer distance across the hero moves it nearer to or
 * farther from the headline. Everything eases on long time constants. On
 * touch devices, or with reduced motion requested, the light holds its
 * resting position. The rig is purely decorative and never takes the pointer.
 */

// Resting light, relative to the headline: this far left of the copy column
// (px, at least off the hero's left edge when the column is near it), and
// raised by this share of the headline's height above its centre.
const REST_INSET = 80;
const REST_LIFT = 0.55;

// Pointer response. Horizontal: the source travels between these offsets left
// of the copy column. Vertical: it follows the pointer by this gain, capped
// at this many headline heights from the headline's centre.
const NEAR_INSET = 96;
const FAR_INSET = 320;
const LIFT_GAIN = 0.9;
const LIFT_MAX = 2.2;

// Shadow model. Projection scale: wall distance relative to the light's, so
// a letter's shadow offset is (letter - light) * (SCALE - 1). Softness grows
// with the projected length, from a base in px.
const SHADOW_SCALE = 1.04;
const SOFT_BASE = 0.07; // x font size
const SOFT_PER_PX = 0.4;
const RIM_PX = 1.2;

// Rig intensity at rest and while the pointer is in the hero.
const REST_GLOW = 0.85;
const ACTIVE_GLOW = 1;

// Easing time constants in ms. Long enough that the light trails the pointer.
const MOVE_TAU = 380;
const GLOW_TAU = 520;

// Light layer sizes, px.
const WASH_W = 1500;
const WASH_H = 900;

const BLOOM =
  "radial-gradient(ellipse closest-side, rgba(170, 225, 255, 0.75) 0%, rgba(90, 180, 255, 0.3) 32%," +
  " rgba(60, 140, 255, 0.08) 62%, transparent 100%)";

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
  "linear-gradient(to right, transparent 0%, #000 5%, rgba(0, 0, 0, 0.6) 34%," +
  " rgba(0, 0, 0, 0.25) 64%, transparent 92%)";

const WASH =
  "radial-gradient(ellipse closest-side, rgba(60, 150, 255, 0.34) 0%, rgba(40, 115, 230, 0.16) 38%," +
  " rgba(30, 90, 200, 0.06) 62%, transparent 100%)";

// Open margin left of the copy column, where the source itself shows.
const MARGIN =
  "linear-gradient(to right, #000 0, #000 calc(var(--copy-left, 0px) - 56px), transparent calc(var(--copy-left, 0px) - 12px))";

// Shutter for the beam and wash: the open margin, the band around the
// headline (held below full strength so white lettering keeps its contrast
// against the lit wall), and a faint spill. Positions come from measurement
// (px); before it runs, the defaults leave only the spill.
const SHUTTER =
  MARGIN +
  ", linear-gradient(to bottom, transparent var(--band-top, 0px), rgba(0, 0, 0, 0.72) calc(var(--band-top, 0px) + 16px)," +
  " rgba(0, 0, 0, 0.72) calc(var(--band-bottom, 0px) - 22px), transparent var(--band-bottom, 0px))," +
  " linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08))";

const SHUTTER_STYLE: CSSProperties = { maskImage: SHUTTER, WebkitMaskImage: SHUTTER };
// The bloom is the bright source itself: margin only, never behind text.
const MARGIN_STYLE: CSSProperties = { maskImage: MARGIN, WebkitMaskImage: MARGIN };

const BEAM_STYLE: CSSProperties = {
  left: 0,
  top: 0,
  width: "125%",
  aspectRatio: "10 / 9",
  transformOrigin: "0 0",
  background: BEAM,
  maskImage: BEAM_FALLOFF,
  WebkitMaskImage: BEAM_FALLOFF,
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Offset of `el` within `host`, through the offsetParent chain: layout
// position, unaffected by the transforms scene stacking applies to the hero.
const offsetWithin = (el: HTMLElement, host: HTMLElement) => {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== host) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
};

export default function HeroLight() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const rig = rigRef.current;
    const wash = washRef.current;
    const beam = beamRef.current;
    const bloom = bloomRef.current;
    // The hero section receives the pointer; the light itself never does.
    const host = scene?.parentElement;
    const title = host?.querySelector<HTMLElement>("[data-hero-title]");
    if (!scene || !rig || !wash || !beam || !bloom || !host || !title) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let tracking = false;
    let frame = 0;
    let last = 0;
    // Layout, in hero px: copy column left edge, headline box, font size.
    let copyLeft = 0;
    let tx = 0, ty = 0, tw = 0, th = 0, font = 48;
    // Light position (current and target, hero px) and rig glow.
    let lx = 0, ly = 0, tlx = 0, tly = 0;
    let glow = REST_GLOW, tglow = REST_GLOW;

    const restX = () => Math.min(copyLeft - REST_INSET, -40);
    const restY = () => ty + th / 2 - th * REST_LIFT;

    const measure = () => {
      const t = offsetWithin(title, host);
      tx = t.x;
      ty = t.y;
      th = title.offsetHeight;
      // Width of the lettering itself (the heading box spans the column). The
      // ratio of two rects cancels any transform scene stacking applies.
      const range = document.createRange();
      range.selectNodeContents(title);
      const textRect = range.getBoundingClientRect();
      const boxRect = title.getBoundingClientRect();
      tw = boxRect.width ? Math.min(title.offsetWidth, (textRect.width / boxRect.width) * title.offsetWidth) : title.offsetWidth;
      font = parseFloat(getComputedStyle(title).fontSize) || 48;
      copyLeft = tx;
      // Band: from just below the eyebrow block to under the headline.
      const above = title.previousElementSibling as HTMLElement | null;
      const aboveBottom = above ? offsetWithin(above, host).y + above.offsetHeight : ty - font;
      const top = Math.max(aboveBottom + 6, ty - font * 0.2);
      const bottom = ty + th + font * 0.45;
      scene.style.setProperty("--copy-left", `${copyLeft}px`);
      scene.style.setProperty("--band-top", `${top.toFixed(1)}px`);
      scene.style.setProperty("--band-bottom", `${bottom.toFixed(1)}px`);
    };

    const render = () => {
      // Rig: every layer centred on, or aimed from, the light.
      const cx = tx + tw / 2;
      const cy = ty + th / 2;
      const aim = (Math.atan2(cy - ly, cx - lx) * 180) / Math.PI;
      wash.style.transform = `translate3d(${(lx - WASH_W / 2).toFixed(1)}px, ${(ly - WASH_H / 2).toFixed(1)}px, 0)`;
      bloom.style.transform = `translate3d(${(lx - bloom.offsetWidth / 2).toFixed(1)}px, ${(ly - bloom.offsetHeight / 2).toFixed(1)}px, 0)`;
      beam.style.transform = `translate3d(${lx.toFixed(1)}px, ${ly.toFixed(1)}px, 0) rotate(${aim.toFixed(2)}deg) translateY(-50%)`;
      rig.style.opacity = glow.toFixed(3);

      // Headline: light point in the headline's own box, projection scale,
      // softness from the projected length at the headline's centre, and a
      // rim on the edges facing the light.
      const dx = cx - lx;
      const dy = cy - ly;
      const dist = Math.hypot(dx, dy) || 1;
      const projected = dist * (SHADOW_SCALE - 1);
      title.style.setProperty("--lox", `${(lx - tx).toFixed(1)}px`);
      title.style.setProperty("--loy", `${(ly - ty).toFixed(1)}px`);
      title.style.setProperty("--ss", String(SHADOW_SCALE));
      title.style.setProperty("--sb", `${(font * SOFT_BASE + projected * SOFT_PER_PX).toFixed(2)}px`);
      title.style.setProperty("--rimx", `${((-dx / dist) * RIM_PX).toFixed(2)}px`);
      title.style.setProperty("--rimy", `${((-dy / dist) * RIM_PX).toFixed(2)}px`);
      title.style.setProperty("--sop", (0.75 + 0.25 * glow).toFixed(3));
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16;
      last = now;
      const kMove = 1 - Math.exp(-dt / MOVE_TAU);
      const kGlow = 1 - Math.exp(-dt / GLOW_TAU);
      lx += (tlx - lx) * kMove;
      ly += (tly - ly) * kMove;
      glow += (tglow - glow) * kGlow;
      render();
      const settled = Math.abs(tlx - lx) < 0.1 && Math.abs(tly - ly) < 0.1 && Math.abs(tglow - glow) < 0.002;
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

    const rest = () => {
      tlx = restX();
      tly = restY();
      tglow = REST_GLOW;
    };

    const relayout = () => {
      measure();
      if (!tracking) {
        rest();
        lx = tlx;
        ly = tly;
        glow = tglow;
        render();
      } else {
        schedule();
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      const px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const py = event.clientY - rect.top;
      const cy = ty + th / 2;
      tlx = Math.min(copyLeft - FAR_INSET + (FAR_INSET - NEAR_INSET) * px, copyLeft - NEAR_INSET);
      tly = cy + clamp((py - cy) * LIFT_GAIN, -th * LIFT_MAX, th * LIFT_MAX);
      tglow = ACTIVE_GLOW;
      schedule();
    };

    const onLeave = () => {
      rest();
      schedule();
    };

    const observer = new ResizeObserver(relayout);
    observer.observe(host);
    observer.observe(title);

    const startTracking = () => {
      tracking = true;
      wash.style.willChange = bloom.style.willChange = beam.style.willChange = "transform";
      rig.style.willChange = "opacity";
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
    };

    const stopTracking = () => {
      tracking = false;
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      wash.style.willChange = bloom.style.willChange = beam.style.willChange = rig.style.willChange = "";
      relayout();
    };

    const sync = () => {
      const want = finePointer.matches && !reducedMotion.matches;
      if (want && !tracking) startTracking();
      else if (!want && tracking) stopTracking();
    };

    relayout();
    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
      observer.disconnect();
      if (tracking) stopTracking();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      data-hero-light=""
      aria-hidden="true"
      // Below lg the copy runs nearly the full width, so the rig runs dimmer
      // there with a tighter bloom.
      className="absolute inset-0 z-[2] pointer-events-none overflow-hidden mix-blend-screen opacity-70 lg:opacity-100"
    >
      <div ref={rigRef} className="absolute inset-0" style={{ opacity: REST_GLOW }}>
        <div className="absolute inset-0" style={SHUTTER_STYLE}>
          <div
            ref={washRef}
            className="absolute left-0 top-0"
            style={{ width: WASH_W, height: WASH_H, background: WASH }}
          />
          <div ref={beamRef} className="absolute" style={BEAM_STYLE} />
        </div>
        <div className="absolute inset-0" style={MARGIN_STYLE}>
          <div
            ref={bloomRef}
            className="absolute left-0 top-0 h-[180px] w-[280px] lg:h-[340px] lg:w-[460px]"
            style={{ background: BLOOM }}
          />
        </div>
      </div>
    </div>
  );
}

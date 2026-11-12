import type { ReactNode } from "react";
import { SignalWave, SoundRings } from "./SoundGeometry";

interface HomeSceneProps {
  children: ReactNode;
  /** Alternates the two homepage grounds so scenes keep their rhythm. */
  tone?: "deep" | "navy";
  /** Seed for this scene's procedural geometry. */
  seed: number;
  /** Draw the dispersion rings in the upper-right corner. */
  rings?: boolean;
  /** Blend the top edge up into the hero's navy when scenes flow unstacked. */
  fromHero?: boolean;
  /** Extra decorative layer rendered behind the content. */
  backdrop?: ReactNode;
  className?: string;
}

/**
 * A homepage "scene": one full-width panel on the unified dark ground. Scenes
 * stack as the page scrolls: each one rises over the scene before it (see
 * SceneStack, which drives the .home-stack sections). Layers, back to front:
 *
 *   grid     the stage-plot ground used across ASO, at low contrast
 *   rings    procedural dispersion rings in the upper-right corner;
 *            scroll-linked rotation
 *   seam     a signal trace along the top edge, the panel's lit leading edge
 *   veil     darkens the scene as the next one covers it
 *
 * All layers are decorative (aria-hidden). Without JS or with reduced motion
 * the scenes simply flow one after another. Homepage only: styles live in
 * home.css under .aso-home.
 */
export default function HomeScene({
  children,
  tone = "deep",
  seed,
  rings = true,
  fromHero = false,
  backdrop,
  className = "",
}: HomeSceneProps) {
  return (
    <section
      className={`home-stack home-scene ${tone === "navy" ? "home-scene-navy" : ""} ${
        fromHero ? "home-scene-from-hero" : ""
      } py-20 md:py-28 ${className}`}
    >
      <div aria-hidden="true" className="home-scene-grid" />
      {rings && (
        <div aria-hidden="true" className="home-scene-rings">
          <SoundRings seed={seed} className="h-full w-full" />
        </div>
      )}
      <div aria-hidden="true" className="home-scene-seam">
        <SignalWave seed={seed * 7 + 3} traces={3} amplitude={0.5} className="home-wave-drift" />
      </div>
      {backdrop}
      <div className="home-frame-content relative max-w-6xl mx-auto px-6">{children}</div>
      <div aria-hidden="true" className="home-stack-veil" />
    </section>
  );
}

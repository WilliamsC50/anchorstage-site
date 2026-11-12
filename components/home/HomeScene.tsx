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
  /** Blend the top edge up into the hero's navy. Used by the first scene. */
  fromHero?: boolean;
  /** Extra decorative layer rendered behind the content. */
  backdrop?: ReactNode;
  className?: string;
}

/**
 * A homepage "scene": one full-width section on the unified dark ground,
 * lit from the upper-right like the hero. Layers, back to front:
 *
 *   light    the signature upper-right blue wash; scroll-linked so it rises
 *            as the scene arrives and settles as it leaves
 *   grid     the stage-plot ground used across ASO, at low contrast
 *   rings    procedural dispersion rings fanning from the light source;
 *            scroll-linked rotation
 *   seam     a signal trace along the top edge marking the scene change
 *
 * All layers are decorative (aria-hidden). Motion is CSS-only and switches
 * off under prefers-reduced-motion or where scroll timelines are unsupported;
 * the static scene is the fallback. Homepage only: styles live in home.css
 * under .aso-home.
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
      className={`home-scene ${tone === "navy" ? "home-scene-navy" : ""} ${
        fromHero ? "home-scene-from-hero" : ""
      } py-20 md:py-28 ${className}`}
    >
      <div aria-hidden="true" className="home-scene-light" />
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
      <div className="relative max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { homeHero } from "@/lib/images";

interface HeroMediaProps {
  /** Artwork to render. Omit to use the default hero image. */
  children?: ReactNode;
  /** Position and size come from the page, so this stays layout agnostic.
   *  The component fills whatever box the className describes. */
  className?: string;
  /** Blend the left edge into the surrounding navy so the media reads as
   *  part of the background instead of a panel sitting on top of it. */
  fadeLeft?: boolean;
  /** Focal point for the cover crop, e.g. "62% 50%". */
  objectPosition?: CSSProperties["objectPosition"];
  /** Rendered-width hint for the optimizer. */
  sizes?: string;
}

/**
 * Hero artwork layer.
 *
 * The component owns the media and its blend, never the layout. A page places
 * it by passing a className, which is what lets the same component be a
 * full-height edge-aligned band on one page and a contained block on another.
 *
 * Anything passed as children replaces the image and fills the same box:
 *
 *   photography          <Image fill className="object-cover" ... />
 *   branded illustration <SomeSvg className="absolute inset-0 h-full w-full" />
 *   subtle motion        any absolutely positioned layer, ideally honouring
 *                        prefers-reduced-motion
 *   floating cards       absolutely positioned siblings
 *
 * No border radius is applied here. Rounding, if ever wanted, belongs in the
 * className the page supplies.
 */

/** Left-to-right ramp from solid navy to clear, in --aso-navy (15, 47, 79).
 *  Wide and multi-stop so the blend has no perceptible edge. */
const FADE_LEFT =
  "linear-gradient(to right," +
  " rgb(15,47,79) 0%," +
  " rgb(15,47,79) 22%," +
  " rgba(15,47,79,0.88) 40%," +
  " rgba(15,47,79,0.55) 60%," +
  " rgba(15,47,79,0.22) 80%," +
  " rgba(15,47,79,0) 100%)";

export default function HeroMedia({
  children,
  className = "",
  fadeLeft = false,
  objectPosition = "center",
  sizes = "(min-width: 1024px) 55vw, 100vw",
}: HeroMediaProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children ?? (
        <Image
          src={homeHero.src}
          alt={homeHero.alt}
          fill
          priority
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      )}

      {fadeLeft && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: FADE_LEFT }}
        />
      )}
    </div>
  );
}

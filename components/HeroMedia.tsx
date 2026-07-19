import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { homeHero } from "@/lib/images";

interface HeroMediaProps {
  /** Artwork to render. Omit to use the default hero image. */
  children?: ReactNode;
  /** The page owns position and size. This class lands on the outer element,
   *  which is the ONLY thing that sets `position` — the component never does,
   *  so a page can make it absolute without a class collision. */
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
 * The component owns the media and its blend, never the layout or the
 * position. The page places the outer element (typically
 * `absolute inset-y-0 right-0 w-[52%]`); an inner `relative h-full w-full`
 * box then gives `next/image fill` a sized positioning context.
 *
 * The two are kept on separate elements on purpose. If the component also set
 * `position` on the outer element, it would collide with the page's own
 * position class, and Tailwind's cascade would silently pick one — which is
 * exactly the bug this structure removes.
 *
 * Anything passed as children replaces the image and fills the same inner box.
 * No border radius is applied here; rounding belongs in the page's className.
 */

/** Left-to-right ramp from solid navy to clear, in --aso-navy (15, 47, 79).
 *  Solid through the copy side, fully clear across the far right so the
 *  right quarter of the photograph shows at full strength. */
const FADE_LEFT =
  "linear-gradient(to right," +
  " rgb(15,47,79) 0%," +
  " rgb(15,47,79) 25%," +
  " rgba(15,47,79,0.55) 50%," +
  " rgba(15,47,79,0.12) 78%," +
  " rgba(15,47,79,0) 100%)";

export default function HeroMedia({
  children,
  className = "",
  fadeLeft = false,
  objectPosition = "center",
  sizes = "(min-width: 1024px) 55vw, 100vw",
}: HeroMediaProps) {
  return (
    <div className={className}>
      {/* Sized positioning context for the fill image. h-full/w-full inherit
          the outer element's box, so this is nonzero whenever the page has
          given the outer element a height and width. */}
      <div className="relative h-full w-full overflow-hidden">
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
    </div>
  );
}

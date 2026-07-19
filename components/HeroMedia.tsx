import type { CSSProperties } from "react";
import Image from "next/image";
import { homeHero, type ImageAsset } from "@/lib/images";

interface HeroMediaProps {
  /** The photograph to render. Defaults to the home hero. */
  image?: ImageAsset;
  /** Page-supplied responsive position. The established pattern is a
   *  full-bleed layer below lg that becomes a right-edge band at lg:
   *  `absolute inset-0 z-[1] lg:left-auto lg:w-[56%] ...`. */
  className?: string;
  /** Blend the left edge into the navy on desktop, under the copy. */
  fadeLeft?: boolean;
  /** cover fills the band (photography); contain keeps the whole image in
   *  frame without cropping (the transparent device shot). */
  fit?: "cover" | "contain";
  /** Focal point for the cover crop, e.g. "42% 50%". */
  objectPosition?: CSSProperties["objectPosition"];
  /** Rendered-width hint for the optimizer. Should end with 100vw for the
   *  full-bleed mobile layer. */
  sizes?: string;
}

/**
 * Hero artwork layer, shared by all five page heroes.
 *
 * One image is positioned by the page's className: full-bleed below lg,
 * a flush-right band at lg and up. Two overlays keep the copy readable in
 * each range — a navy scrim below lg (the image sits behind the full-width
 * copy) and the desktop left fade at lg and up (the image sits to the side
 * of the copy). The component owns the media and its overlays; the page owns
 * position and size.
 */

/** Desktop: navy to clear, left to right, in --aso-navy (15, 47, 79). Solid
 *  through the copy side, clear across the far right so the stage/subject
 *  keeps full strength. */
const FADE_LEFT =
  "linear-gradient(to right," +
  " rgb(15,47,79) 0%," +
  " rgb(15,47,79) 4%," +
  " rgba(15,47,79,0.85) 16%," +
  " rgba(15,47,79,0.6) 30%," +
  " rgba(15,47,79,0.34) 42%," +
  " rgba(15,47,79,0.14) 54%," +
  " rgba(15,47,79,0.03) 66%," +
  " rgba(15,47,79,0) 74%," +
  " rgba(15,47,79,0) 100%)";

/** Mobile/tablet: top-weighted navy veil over the full-bleed image. Strong
 *  where the copy sits (top), easing lower so the imagery stays identifiable
 *  and, on Platform, the devices are not buried. */
const MOBILE_SCRIM =
  "linear-gradient(180deg," +
  " rgba(15,47,79,0.86) 0%," +
  " rgba(15,47,79,0.72) 30%," +
  " rgba(15,47,79,0.55) 62%," +
  " rgba(15,47,79,0.66) 100%)";

export default function HeroMedia({
  image = homeHero,
  className = "",
  fadeLeft = false,
  fit = "cover",
  objectPosition = "center",
  sizes = "(min-width: 1024px) 55vw, 100vw",
}: HeroMediaProps) {
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className={className}>
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes={sizes}
          className={fitClass}
          style={{ objectPosition }}
        />

        {/* Mobile/tablet scrim: image is behind the full-width copy. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{ background: MOBILE_SCRIM }}
        />

        {/* Desktop left fade: image is beside the copy. */}
        {fadeLeft && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{ background: FADE_LEFT }}
          />
        )}
      </div>
    </div>
  );
}

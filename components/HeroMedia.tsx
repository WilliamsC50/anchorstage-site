import type { ReactNode } from "react";
import Image from "next/image";
import { homeHero } from "@/lib/images";

interface HeroMediaProps {
  /** Artwork to render in the frame. Omit to use the default hero image. */
  children?: ReactNode;
  className?: string;
}

/**
 * The hero's media column.
 *
 * This is the seam for hero artwork. The hero page owns none of the media
 * decisions, so changing the artwork is a change to this component alone,
 * with no layout work in the page.
 *
 * The frame is a fixed-ratio positioning context, so anything passed as
 * children fills it predictably:
 *
 *   photography          <Image fill className="object-cover" ... />
 *   branded illustration <SomeSvg className="absolute inset-0 h-full w-full" />
 *   subtle motion        any absolutely positioned layer, ideally honouring
 *                        prefers-reduced-motion
 *   floating cards       absolutely positioned siblings, e.g.
 *                        "absolute -left-6 bottom-10" over a base layer
 *
 * The frame is 4:3 while the source photograph is 16:9, so the sides are
 * trimmed to give the column presence against the headline. The stage, LED
 * walls, crowd, and console all sit inside the kept area. A purpose-cut
 * asset can replace this and drop the crop entirely.
 */
export default function HeroMedia({ children, className = "" }: HeroMediaProps) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      <div className="relative aspect-[4/3] w-full">
        {children ?? (
          <Image
            src={homeHero.src}
            alt={homeHero.alt}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-center"
          />
        )}
      </div>
    </div>
  );
}

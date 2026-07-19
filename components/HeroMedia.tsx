import type { ReactNode } from "react";
import SignalFlow from "./SignalFlow";

interface HeroMediaProps {
  /** Artwork to render in the frame. Omit to fall back to the placeholder. */
  children?: ReactNode;
  className?: string;
}

/**
 * The hero's media column.
 *
 * This is the seam for future hero artwork. The hero itself owns none of the
 * media decisions, so swapping the artwork is a change to this component
 * alone, with no layout work in the page.
 *
 * The frame is a fixed-ratio positioning context, so anything dropped inside
 * fills it predictably:
 *
 *   photography          <Image fill className="object-cover" ... />
 *   branded illustration <SomeSvg className="absolute inset-0 h-full w-full" />
 *   subtle animation     any absolutely positioned layer, ideally honouring
 *                        prefers-reduced-motion
 *   floating cards       absolutely positioned siblings, e.g.
 *                        "absolute -left-6 bottom-10" over a base layer
 *
 * The frame clips to a rounded rectangle, which is intentional for
 * photography and harmless for the transparent placeholder. It carries no
 * background of its own, so artwork decides its own ground.
 */
export default function HeroMedia({ children, className = "" }: HeroMediaProps) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      {/* Ratio matches the placeholder motif so the column keeps its balance
          with the text until real artwork sets its own. */}
      <div className="relative aspect-[8/7] w-full">
        {children ?? <SignalFlow className="absolute inset-0 h-full w-full" />}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

interface HeroMediaProps {
  /** Artwork to render in the frame. */
  children?: ReactNode;
  className?: string;
}

/**
 * The hero's media column.
 *
 * This is the seam for future hero artwork. The hero itself owns none of the
 * media decisions, so adding the artwork is a change to this component alone,
 * with no layout work in the page.
 *
 * The frame currently holds no artwork on purpose. It reserves the space and
 * keeps the hero's proportions while branded artwork is produced. It is
 * deliberately empty rather than filled with a stand-in graphic.
 *
 * The frame is a fixed-ratio positioning context, so anything dropped inside
 * fills it predictably:
 *
 *   photography          <Image fill className="object-cover" ... />
 *   branded illustration <SomeSvg className="absolute inset-0 h-full w-full" />
 *   subtle motion        any absolutely positioned layer, ideally honouring
 *                        prefers-reduced-motion
 *   floating cards       absolutely positioned siblings, e.g.
 *                        "absolute -left-6 bottom-10" over a base layer
 *
 * The frame clips to a rounded rectangle, which is intentional for
 * photography and harmless for transparent artwork. It carries no background
 * of its own, so the artwork decides its own ground.
 */
export default function HeroMedia({ children, className = "" }: HeroMediaProps) {
  return (
    <div
      aria-hidden={children ? undefined : "true"}
      className={`relative w-full overflow-hidden rounded-2xl ${className}`}
    >
      {/* Ratio reserves the column's footprint. Real artwork may set its own. */}
      <div className="relative aspect-[8/7] w-full">{children}</div>
    </div>
  );
}

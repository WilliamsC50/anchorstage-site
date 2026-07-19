import type { ReactNode } from "react";

type SectionBackground = "white" | "bg" | "navy";

interface SectionProps {
  children: ReactNode;
  background?: SectionBackground;
  /** Lay the stage-plot ground under the section. Dark sections get the
   *  light-on-dark grid, light sections the navy-on-light one. */
  plot?: boolean;
  /** Optional full-section media layer (e.g. a HeroMedia band). It is placed
   *  behind the content and self-positions through its own classes. When
   *  present, the content is lifted above it. Sections without media render
   *  exactly as before. */
  media?: ReactNode;
  className?: string;
}

const BG_CLASSES: Record<SectionBackground, string> = {
  white: "bg-white",
  bg: "bg-aso-bg",
  navy: "bg-aso-navy",
};

// Top-right stage-light wash, kept for dark sections only.
const NAVY_GLOW =
  "radial-gradient(ellipse 760px 540px at 82% -8%, rgba(145, 205, 255, 0.16) 0%, rgba(70, 135, 200, 0.09) 30%, transparent 72%)";

export default function Section({
  children,
  background = "white",
  plot = false,
  media,
  className = "",
}: SectionProps) {
  const isNavy = background === "navy";

  return (
    <section
      className={`relative overflow-hidden py-20 md:py-28 ${BG_CLASSES[background]} ${className}`}
    >
      {plot && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none ${
            isNavy ? "aso-plot-grid" : "aso-plot-grid-light"
          }`}
        />
      )}
      {isNavy && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: NAVY_GLOW }}
        />
      )}
      {media}
      <div
        className={
          media
            ? "relative z-10 max-w-6xl mx-auto px-6"
            : "relative max-w-6xl mx-auto px-6"
        }
      >
        {children}
      </div>
    </section>
  );
}

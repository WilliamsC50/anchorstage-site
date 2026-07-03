import type { ReactNode } from "react";

type SectionBackground = "white" | "bg" | "gray" | "navy";

interface SectionProps {
  children: ReactNode;
  background?: SectionBackground;
  className?: string;
}

const BG_CLASSES: Record<SectionBackground, string> = {
  white: "bg-white",
  bg: "bg-aso-bg",
  gray: "bg-gray-50",
  navy: "bg-aso-navy",
};

// Same top-right glow recipe already used on the dark Hero variant, so every
// navy section on the site shares one consistent "depth" treatment.
const NAVY_GLOW =
  "radial-gradient(ellipse 720px 520px at 82% -8%, rgba(145, 205, 255, 0.20) 0%, rgba(70, 135, 200, 0.12) 28%, transparent 70%)";

export default function Section({ children, background = "white", className = "" }: SectionProps) {
  const isNavy = background === "navy";

  return (
    <section className={`relative overflow-hidden py-20 ${BG_CLASSES[background]} ${className}`}>
      {isNavy && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: NAVY_GLOW }}
        />
      )}
      <div className="relative z-10 max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}

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

export default function Section({ children, background = "white", className = "" }: SectionProps) {
  return (
    <section className={`py-20 ${BG_CLASSES[background]} ${className}`}>
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}

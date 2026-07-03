import type { ReactNode } from "react";

type CardTone = "light" | "tinted";

interface CardProps {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  comingSoon?: boolean;
  /** Center icon/title/body instead of the default left-aligned layout. */
  centered?: boolean;
  /** "tinted" reads as a blue glass card for use on navy sections. */
  tone?: CardTone;
  className?: string;
}

const TONE_STYLES: Record<CardTone, { card: string; title: string; body: string }> = {
  light: {
    card: "bg-white border border-gray-100 shadow-sm hover:shadow-md",
    title: "text-aso-navy",
    body: "text-gray-500",
  },
  tinted: {
    card: "bg-white/10 border border-white/15 shadow-sm hover:bg-white/[0.14] backdrop-blur-sm",
    title: "text-white",
    body: "text-white/70",
  },
};

export default function Card({
  icon,
  title,
  children,
  footer,
  comingSoon,
  centered = false,
  tone = "light",
  className = "",
}: CardProps) {
  const styles = TONE_STYLES[tone];

  return (
    <div
      className={`rounded-xl p-7 transition-shadow flex flex-col gap-4 ${styles.card} ${
        centered ? "items-center text-center" : ""
      } ${comingSoon ? "opacity-60" : ""} ${className}`}
    >
      {icon}

      <div className="flex-1">
        <div className={`flex items-center gap-2 mb-1 ${centered ? "justify-center" : ""}`}>
          <h3 className={`font-semibold text-base leading-snug ${styles.title}`}>{title}</h3>
          {comingSoon && (
            <span className="text-[10px] uppercase tracking-wide font-semibold text-aso-blue bg-aso-bg px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          )}
        </div>
        <div className={`text-sm leading-relaxed ${styles.body}`}>{children}</div>
      </div>

      {footer}
    </div>
  );
}

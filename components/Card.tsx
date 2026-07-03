import type { ReactNode } from "react";

interface CardProps {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  comingSoon?: boolean;
  /** Center icon/title/body instead of the default left-aligned layout. */
  centered?: boolean;
}

export default function Card({ icon, title, children, footer, comingSoon, centered = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 ${
        centered ? "items-center text-center" : ""
      } ${comingSoon ? "opacity-60" : ""}`}
    >
      {icon}

      <div className="flex-1">
        <div className={`flex items-center gap-2 mb-1 ${centered ? "justify-center" : ""}`}>
          <h3 className="font-semibold text-base leading-snug text-aso-navy">{title}</h3>
          {comingSoon && (
            <span className="text-[10px] uppercase tracking-wide font-semibold text-aso-blue bg-aso-bg px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 leading-relaxed">{children}</div>
      </div>

      {footer}
    </div>
  );
}

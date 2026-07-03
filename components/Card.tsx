import Image from "next/image";
import type { ReactNode } from "react";

interface CardProps {
  icon?: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  comingSoon?: boolean;
}

export default function Card({ icon, title, children, footer, comingSoon }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 ${
        comingSoon ? "opacity-60" : ""
      }`}
    >
      {icon && <Image src={icon} alt="" width={68} height={68} style={{ objectFit: "contain" }} />}

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
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

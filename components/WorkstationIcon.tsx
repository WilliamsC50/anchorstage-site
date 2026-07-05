import type { SVGProps } from "react";
import type { WorkstationSlug } from "@/lib/content-types";

interface WorkstationIconProps {
  slug: WorkstationSlug;
  className?: string;
}

const STROKE_PROPS: Omit<SVGProps<SVGSVGElement>, "className"> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export default function WorkstationIcon({ slug, className = "w-6 h-6" }: WorkstationIconProps) {
  switch (slug) {
    case "event":
      // Run-sheet calendar — a day marked and scheduled.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <rect x="4" y="5" width="16" height="15" rx="1.5" />
          <line x1="4" y1="9" x2="20" y2="9" />
          <line x1="8" y1="3" x2="8" y2="6" />
          <line x1="16" y1="3" x2="16" y2="6" />
          <circle cx="9" cy="13.5" r="1" />
          <line x1="12.5" y1="13.5" x2="17" y2="13.5" />
        </svg>
      );

    case "inventory":
      // Stacked gear cases.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <rect x="5" y="4" width="14" height="6.5" rx="1" />
          <rect x="5" y="13.5" width="14" height="6.5" rx="1" />
          <line x1="8" y1="4" x2="8" y2="10.5" />
          <line x1="16" y1="4" x2="16" y2="10.5" />
        </svg>
      );

    case "marketing":
      // Broadcast signal — reach radiating outward.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <circle cx="6" cy="18" r="1.3" />
          <path d="M9.5 14.5a6 6 0 0 1 0 7" />
          <path d="M12.5 11.5a10 10 0 0 1 0 13" />
        </svg>
      );

    case "signage":
      // Display screen on a stand — venue and event signage.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <rect x="4" y="4" width="16" height="11" rx="1.5" />
          <line x1="7.5" y1="8" x2="16.5" y2="8" />
          <line x1="7.5" y1="11" x2="13" y2="11" />
          <line x1="12" y1="15" x2="12" y2="19" />
          <line x1="8.5" y1="19" x2="15.5" y2="19" />
        </svg>
      );

    default:
      return null;
  }
}

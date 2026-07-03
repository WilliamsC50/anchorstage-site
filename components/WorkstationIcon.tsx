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

    case "crew":
      // Roster hierarchy — one lead branching to collaborators.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <circle cx="12" cy="5.5" r="2" />
          <circle cx="6" cy="17" r="2" />
          <circle cx="18" cy="17" r="2" />
          <path d="M12 7.5v3M12 10.5 6 15M12 10.5l6 4.5" />
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

    case "financial":
      // Invoice sheet with a settled line item.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <path d="M6 3h9l3 3v15H6z" />
          <path d="M15 3v3h3" />
          <line x1="9" y1="10" x2="15" y2="10" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <path d="M9 17l1.5 1.5L14 15" />
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

    case "practice":
      // Target — a safe space to aim before it counts.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.2" />
        </svg>
      );

    default:
      return null;
  }
}

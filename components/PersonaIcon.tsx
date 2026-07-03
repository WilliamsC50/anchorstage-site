import type { SVGProps } from "react";
import type { PersonaSlug } from "@/lib/content-types";

interface PersonaIconProps {
  slug: PersonaSlug;
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

export default function PersonaIcon({ slug, className = "w-6 h-6" }: PersonaIconProps) {
  switch (slug) {
    case "freelancers":
      // Crew badge on a lanyard — an individual operator's all-access credential.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <circle cx="12" cy="4" r="1.4" />
          <path d="M12 5.4V7" />
          <rect x="6.5" y="7" width="11" height="14" rx="2" />
          <rect x="9" y="10" width="6" height="4" rx="0.5" />
          <line x1="9" y1="17" x2="15" y2="17" />
          <line x1="9" y1="19" x2="12.5" y2="19" />
        </svg>
      );

    case "production-companies":
      // Box-truss cross-bracing — the structural backbone of a production.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <rect x="3.5" y="4" width="17" height="16" rx="1" />
          <line x1="3.5" y1="4" x2="20.5" y2="20" />
          <line x1="20.5" y1="4" x2="3.5" y2="20" />
        </svg>
      );

    case "musicians":
      // Beamed notes — performance and stage presence.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <path d="M9 18V5l11-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="17" cy="16" r="3" />
        </svg>
      );

    case "venues":
      // Proscenium frame on a stage floor.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <path d="M4.5 20V8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v12" />
          <line x1="3" y1="20" x2="21" y2="20" />
          <line x1="4.5" y1="8" x2="19.5" y2="8" />
        </svg>
      );

    case "rental-providers":
      // Flight case with corner bumpers — road-ready equipment.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <rect x="4" y="6" width="16" height="13" rx="1" />
          <path d="M9 6V4.5h6V6" />
          <line x1="4" y1="12.3" x2="20" y2="12.3" />
          <rect x="4.5" y="6.5" width="2" height="2" />
          <rect x="17.5" y="6.5" width="2" height="2" />
          <rect x="4.5" y="16.5" width="2" height="2" />
          <rect x="17.5" y="16.5" width="2" height="2" />
        </svg>
      );

    case "event-organizers":
      // Megaphone — directing and coordinating the whole show.
      return (
        <svg className={className} {...STROKE_PROPS} aria-hidden="true">
          <path d="M3 9.5v5h3l8 4v-13l-8 4H3z" />
          <path d="M14 8.5a5 5 0 0 1 0 7" />
          <path d="M17 6.3a8 8 0 0 1 0 11.4" />
        </svg>
      );

    default:
      return null;
  }
}

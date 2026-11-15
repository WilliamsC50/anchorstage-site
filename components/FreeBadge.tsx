import { SHOW_FREE_BADGE } from "@/lib/registration";

interface FreeBadgeProps {
  /** "orange": navy badge for orange buttons. "dark": orange badge for navy surfaces. */
  tone?: "orange" | "dark";
}

/**
 * Compact FREE badge placed after a registration label, inside the same link.
 * Controlled by SHOW_FREE_BADGE in lib/registration.ts; when that is false
 * this renders nothing and the button is exactly its label.
 *
 * Screen readers hear the label followed by ", free". The visible badge is
 * hidden from them because its uppercase styling would otherwise leak into
 * the link's accessible name.
 */
export default function FreeBadge({ tone = "orange" }: FreeBadgeProps) {
  if (!SHOW_FREE_BADGE) return null;
  return (
    <>
      <span className="sr-only">, free</span>
      <span aria-hidden="true" className={`free-badge free-badge--${tone}`}>
        Free
      </span>
    </>
  );
}

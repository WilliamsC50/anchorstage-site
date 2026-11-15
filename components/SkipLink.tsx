/** Target id for SkipLink. The element carrying it should sit just below the header. */
export const MAIN_CONTENT_ID = "main-content";

/**
 * First focusable element on every page: hidden until focused, then shown
 * above the sticky header. Jumps past the navigation to the page content.
 */
export default function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-aso-navy focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-aso-orange focus:ring-offset-2"
    >
      Skip to content
    </a>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Site-wide 404. Renders for any unmatched URL and for notFound() calls,
// including the signage catch-all when a slug names no active screen. It sits
// in the root layout, outside the (site) group, so it brings its own header
// and footer.
const PAGE_TITLE = "Page not found | AnchorStage Ops";

// Next adds a noindex robots tag to 404 responses on its own.
export const metadata: Metadata = {
  title: PAGE_TITLE,
};

const PAGES = [
  { href: "/platform", label: "Platform" },
  { href: "/network", label: "Network" },
  { href: "/who-its-for", label: "Who It's For" },
  { href: "/about", label: "About" },
];

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* A notFound() from a dynamic route (the signage catch-all) renders this
          page in the browser, where the metadata title above is not applied.
          React hoists this into <head> so the tab title is right either way. */}
      <title>{PAGE_TITLE}</title>
      <Nav />
      <main id="main" className="flex-1 relative bg-aso-bg overflow-hidden">
        <div aria-hidden="true" className="aso-plot-grid-light absolute inset-0" />
        <section className="relative max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-aso-orange-ink">
            Error 404
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-aso-navy">
            We couldn&apos;t find that page.
          </h1>
          <p className="mt-5 text-base md:text-lg text-aso-navy/75 max-w-xl mx-auto">
            The address may be mistyped, or the page may have moved. Here are
            a few places to pick up from.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-block rounded-lg px-8 py-3.5 text-base font-semibold text-aso-navy bg-aso-orange shadow-[0_6px_20px_-8px_rgba(255,122,26,0.75)] transition hover:shadow-[0_10px_26px_-8px_rgba(255,122,26,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-navy focus-visible:ring-offset-2"
            >
              Back to Home
            </Link>
            <Link
              href="/about#contact"
              className="inline-block rounded-lg px-8 py-3.5 text-base font-medium text-aso-navy bg-white border border-aso-blue/30 transition hover:border-aso-blue/60 hover:bg-aso-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-blue/50 focus-visible:ring-offset-2"
            >
              Contact Us
            </Link>
          </div>

          <nav aria-label="Main pages" className="mt-12">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="inline-block py-2 text-aso-navy underline decoration-aso-blue/40 underline-offset-4 hover:decoration-aso-orange"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  );
}

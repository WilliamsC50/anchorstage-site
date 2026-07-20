import Link from "next/link";
import { PRIMARY_NAV, AUTH_NAV } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="relative bg-aso-navy">
      {/* Hairline orange edge: the site closes on the same accent it opens with */}
      <div aria-hidden="true" className="h-px w-full bg-aso-orange/40" />

      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">

        <div>
          <p className="font-semibold text-white">AnchorStage Operations</p>
          <p className="mt-3 text-sm leading-relaxed text-aso-blue-light/70 max-w-xs">
            A professional network and connected operations platform built for the
            live event industry.
          </p>
          <p className="mt-4 text-xs text-aso-blue-light/50">
            Insured for live event operations.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue-light/50 mb-4">
            Site
          </p>
          <nav className="flex flex-col gap-3 text-sm text-aso-blue-light">
            <Link href="/" className="opacity-70 hover:opacity-100 transition">
              Home
            </Link>
            {PRIMARY_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="opacity-70 hover:opacity-100 transition">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue-light/50 mb-4">
            Get started
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <a href={AUTH_NAV.join.href} className="font-medium text-aso-orange transition hover:opacity-90">
              {AUTH_NAV.join.label}
            </a>
            <a
              href={AUTH_NAV.login.href}
              className="text-aso-blue-light opacity-70 hover:opacity-100 transition"
            >
              {AUTH_NAV.login.label}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-aso-blue-light/15">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-aso-blue-light/50 text-center">
          <p>&copy; {new Date().getFullYear()} AnchorStage Operations LLC</p>
          <nav className="flex gap-5">
            <Link href="/terms" className="hover:text-aso-blue-light transition">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-aso-blue-light transition">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

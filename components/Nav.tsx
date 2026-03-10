import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-gray-200"
      style={{ borderColor: "rgba(79, 168, 209, 0.2)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">

        {/* LOGO + WORDMARK */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/anchorstage-logo.png"
            alt="AnchorStage Operations"
            width={38}
            height={38}
            className="object-contain"
          />
          <span
            className="text-base font-semibold tracking-tight hidden sm:block"
            style={{ color: "var(--aso-navy)" }}
          >
            AnchorStage Operations
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: "var(--aso-navy)" }}>
          <Link href="/" className="opacity-70 hover:opacity-100 transition">Home</Link>
          <Link href="/services" className="opacity-70 hover:opacity-100 transition">Services</Link>
          <Link href="/photos" className="opacity-70 hover:opacity-100 transition">Photos</Link>
          <Link href="/contact" className="opacity-70 hover:opacity-100 transition">Contact</Link>
        </nav>

        {/* PRIMARY CTA */}
        <a
          href="https://intake.anchorstageops.com"
          className="shrink-0 text-white text-sm font-medium px-5 py-2 rounded-lg transition hover:opacity-90"
          style={{ backgroundColor: "var(--aso-orange)" }}
        >
          Start Event
        </a>

      </div>
    </header>
  );
}

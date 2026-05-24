import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--aso-navy)" }}>
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* Column 1: Brand */}
        <div>
          <p className="font-semibold text-white">AnchorStage Operations LLC</p>
          <p className="text-xs mt-1" style={{ color: "var(--aso-blue-light)", opacity: 0.6 }}>
            Orlando, Florida
          </p>
          <p className="text-sm mt-4 leading-relaxed" style={{ color: "var(--aso-blue-light)", opacity: 0.7 }}>
            Live sound and event production across Central Florida.
          </p>
        </div>

        {/* Column 2: Navigate */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--aso-blue-light)", opacity: 0.45 }}
          >
            Navigate
          </p>
          <nav className="flex flex-col gap-2.5 text-sm" style={{ color: "var(--aso-blue-light)" }}>
            <Link href="/services" className="opacity-70 hover:opacity-100 transition">Services</Link>
            <Link href="/photos" className="opacity-70 hover:opacity-100 transition">Photos</Link>
            <Link href="/team" className="opacity-70 hover:opacity-100 transition">Team</Link>
            <Link href="/contact" className="opacity-70 hover:opacity-100 transition">Contact</Link>
          </nav>
        </div>

        {/* Column 3: Start Here */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--aso-blue-light)", opacity: 0.45 }}
          >
            Start Here
          </p>
          <div className="flex flex-col gap-2.5 text-sm">
            <a
              href="https://intake.anchorstageops.com"
              className="font-medium transition hover:opacity-90"
              style={{ color: "var(--aso-orange)" }}
            >
              Start an Event →
            </a>
            <a
              href="https://intake.anchorstageops.com/login"
              className="opacity-70 hover:opacity-100 transition"
              style={{ color: "var(--aso-blue-light)" }}
            >
              Log In
            </a>
            <a
              href="https://intake.anchorstageops.com/register"
              className="opacity-70 hover:opacity-100 transition"
              style={{ color: "var(--aso-blue-light)" }}
            >
              Create Account
            </a>
          </div>
        </div>

      </div>

      <div
        className="border-t text-center text-xs py-4"
        style={{ borderColor: "rgba(127, 211, 244, 0.15)", color: "rgba(127, 211, 244, 0.5)" }}
      >
        &copy; {new Date().getFullYear()} AnchorStage Operations LLC
      </div>
    </footer>
  );
}

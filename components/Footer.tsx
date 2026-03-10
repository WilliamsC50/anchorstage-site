import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--aso-navy)" }}>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">

        <div>
          <p className="font-semibold text-white">AnchorStage Operations</p>
          <p className="text-sm mt-1" style={{ color: "var(--aso-blue-light)", opacity: 0.8 }}>
            From Intake to Invoice.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm" style={{ color: "var(--aso-blue-light)" }}>
          <Link href="/services" className="opacity-70 hover:opacity-100 transition">Services</Link>
          <Link href="/photos" className="opacity-70 hover:opacity-100 transition">Photos</Link>
          <Link href="/contact" className="opacity-70 hover:opacity-100 transition">Contact</Link>
        </nav>

        <div>
          <a
            href="https://intake.anchorstageops.com"
            className="inline-block text-white text-sm font-medium px-5 py-2.5 rounded-lg transition hover:opacity-90"
            style={{ backgroundColor: "var(--aso-orange)" }}
          >
            Start an Event
          </a>
        </div>

      </div>

      <div
        className="border-t text-center text-xs py-4"
        style={{ borderColor: "rgba(127, 211, 244, 0.15)", color: "rgba(127, 211, 244, 0.5)" }}
      >
        &copy; {new Date().getFullYear()} AnchorStage Operations
      </div>
    </footer>
  );
}

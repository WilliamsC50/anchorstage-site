import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">

        <div>
          <p className="font-semibold text-gray-900">AnchorStage Operations</p>
          <p className="text-sm text-gray-500 mt-1">From Intake to Invoice.</p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-gray-600">
          <Link href="/services" className="hover:text-gray-900 transition">Services</Link>
          <Link href="/photos" className="hover:text-gray-900 transition">Photos</Link>
          <Link href="/contact" className="hover:text-gray-900 transition">Contact</Link>
        </nav>

        <div>
          <a
            href="https://intake.anchorstageops.com"
            className="inline-block bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Start an Event
          </a>
        </div>

      </div>

      <div className="border-t border-gray-100 text-center text-xs text-gray-400 py-4">
        &copy; {new Date().getFullYear()} AnchorStage Operations
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" className="text-lg font-semibold tracking-tight text-gray-900">
          AnchorStage Operations
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <Link href="/services" className="hover:text-gray-900 transition">Services</Link>
          <Link href="/photos" className="hover:text-gray-900 transition">Photos</Link>
          <Link href="/contact" className="hover:text-gray-900 transition">Contact</Link>
        </nav>

        <a
          href="https://intake.anchorstageops.com"
          className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Start Event
        </a>

      </div>
    </header>
  );
}

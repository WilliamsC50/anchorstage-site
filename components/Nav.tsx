"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LOGIN_URL = "https://intake.anchorstageops.com/login";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-gray-200"
      style={{ borderColor: "rgba(79, 168, 209, 0.2)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">

        {/* LOGO + WORDMARK */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logos/aso-picture-logo.svg"
            alt="AnchorStage Operations mark"
            width={40}
            height={40}
            className="h-8 w-auto md:h-10 object-contain"
          />
          <span
            className="text-base font-semibold tracking-tight hidden sm:block"
            style={{ color: "var(--aso-navy)" }}
          >
            AnchorStage Operations
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: "var(--aso-navy)" }}>
          <Link href="/" className="opacity-70 hover:opacity-100 transition">Home</Link>
          <Link href="/services" className="opacity-70 hover:opacity-100 transition">Services</Link>
          <Link href="/photos" className="opacity-70 hover:opacity-100 transition">Photos</Link>
          <Link href="/team" className="opacity-70 hover:opacity-100 transition">Team</Link>
          <Link href="/contact" className="opacity-70 hover:opacity-100 transition">Contact</Link>
          <a href={LOGIN_URL} className="opacity-70 hover:opacity-100 transition">Log In</a>
        </nav>

        {/* RIGHT: CTA + mobile hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://intake.anchorstageops.com"
            className="text-white text-sm font-medium px-5 py-2 rounded-lg transition hover:opacity-90"
            style={{ backgroundColor: "var(--aso-orange)" }}
          >
            Start Event
          </a>

          {/* HAMBURGER — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200 ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <nav
          className="md:hidden border-t bg-white px-6 py-4 flex flex-col gap-1 text-sm"
          style={{ borderColor: "rgba(79, 168, 209, 0.2)", color: "var(--aso-navy)" }}
        >
          <Link href="/" className="opacity-70 hover:opacity-100 transition py-2" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/services" className="opacity-70 hover:opacity-100 transition py-2" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/photos" className="opacity-70 hover:opacity-100 transition py-2" onClick={() => setOpen(false)}>Photos</Link>
          <Link href="/team" className="opacity-70 hover:opacity-100 transition py-2" onClick={() => setOpen(false)}>Team</Link>
          <Link href="/contact" className="opacity-70 hover:opacity-100 transition py-2" onClick={() => setOpen(false)}>Contact</Link>
          <a href={LOGIN_URL} className="opacity-70 hover:opacity-100 transition py-2" onClick={() => setOpen(false)}>Log In</a>
          <a
            href="https://intake.anchorstageops.com"
            className="mt-2 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition hover:opacity-90 text-center"
            style={{ backgroundColor: "var(--aso-orange)" }}
            onClick={() => setOpen(false)}
          >
            Start Event
          </a>
        </nav>
      )}
    </header>
  );
}

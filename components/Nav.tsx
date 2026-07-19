"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRIMARY_NAV, AUTH_NAV } from "@/lib/nav";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-aso-blue/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo returns Home */}
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logos/aso-picture-logo.svg"
            alt="AnchorStage Operations"
            width={40}
            height={40}
            className="h-8 w-auto md:h-10 object-contain"
          />
          <span className="text-base font-bold tracking-tight hidden sm:block text-aso-navy">
            AnchorStage Operations
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-aso-navy">
          {PRIMARY_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="opacity-70 hover:opacity-100 transition">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-5">
            <a
              href={AUTH_NAV.login.href}
              className="text-sm font-medium text-aso-navy opacity-70 hover:opacity-100 transition"
            >
              {AUTH_NAV.login.label}
            </a>
            <a
              href={AUTH_NAV.join.href}
              className="bg-aso-orange text-white text-sm font-medium px-5 py-2 rounded-lg transition hover:opacity-90"
            >
              {AUTH_NAV.join.label}
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-aso-navy transition-transform duration-200 ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-aso-navy transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-aso-navy transition-transform duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t border-aso-blue/20 bg-white px-6 py-3 flex flex-col text-aso-navy"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-3 text-base font-medium opacity-80 hover:opacity-100 transition"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={AUTH_NAV.login.href}
            className="py-3 text-base font-medium opacity-80 hover:opacity-100 transition"
            onClick={() => setOpen(false)}
          >
            {AUTH_NAV.login.label}
          </a>
          <a
            href={AUTH_NAV.join.href}
            className="mt-3 mb-2 bg-aso-orange text-white text-base font-medium px-5 py-3 rounded-lg text-center transition hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            {AUTH_NAV.join.label}
          </a>
        </nav>
      )}
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoWordmarkSvg } from "@/lib/images";
import { PRIMARY_NAV, AUTH_NAV } from "@/lib/nav";
import FreeBadge from "@/components/FreeBadge";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // While the mobile menu is open: Escape closes it and returns focus to the
  // toggle; a click or tap anywhere outside the header closes it and leaves
  // focus where the visitor put it. No scroll lock.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white border-b border-aso-blue/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo returns Home. The link carries the name once; the mark is
            decorative and the wordmark text is hidden below sm. */}
        <Link
          href="/"
          aria-label="AnchorStage Ops home"
          className="flex items-center gap-3 shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src={logoWordmarkSvg}
            alt=""
            width={40}
            height={40}
            className="h-8 w-auto md:h-10 object-contain"
          />
          <span className="text-base font-bold tracking-tight hidden sm:block text-aso-navy">
            AnchorStage Ops
          </span>
        </Link>

        {/* Desktop links. Active route carries an orange underline. */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-sm font-medium text-aso-navy h-full">
          {PRIMARY_NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative h-16 flex items-center transition ${
                  active ? "opacity-100" : "opacity-65 hover:opacity-100"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-aso-orange transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            <a
              href={AUTH_NAV.login.href}
              className="text-sm font-medium text-aso-navy opacity-70 hover:opacity-100 transition"
            >
              {AUTH_NAV.login.label}
            </a>
            {/* Navy on orange (5.3:1); white on this orange is 2.6:1. Hover
                lightens the orange as the old 90% opacity did, but on the
                background only, so the label keeps its contrast. */}
            <a
              href={AUTH_NAV.join.href}
              className="bg-aso-orange text-aso-navy text-sm font-semibold px-4 lg:px-5 py-2 rounded-lg whitespace-nowrap transition hover:bg-[#ff8731]"
            >
              {AUTH_NAV.join.label}
              <FreeBadge />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
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
          {PRIMARY_NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 py-3 text-base font-medium transition ${
                  active ? "opacity-100" : "opacity-75 hover:opacity-100"
                }`}
                onClick={() => setOpen(false)}
              >
                <span
                  aria-hidden="true"
                  className={`h-4 w-0.5 rounded-full bg-aso-orange transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
          <a
            href={AUTH_NAV.login.href}
            className="py-3 text-base font-medium opacity-80 hover:opacity-100 transition"
            onClick={() => setOpen(false)}
          >
            {AUTH_NAV.login.label}
          </a>
          <a
            href={AUTH_NAV.join.href}
            className="mt-3 mb-2 bg-aso-orange text-aso-navy text-base font-semibold px-5 py-3 rounded-lg text-center transition hover:bg-[#ff8731]"
            onClick={() => setOpen(false)}
          >
            {AUTH_NAV.join.label}
            <FreeBadge />
          </a>
        </nav>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRIMARY_NAV, AUTH_NAV, FOR_MEMBERS_HREF } from "@/lib/nav";
import { PERSONAS } from "@/lib/personas";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const [mobileMembersOpen, setMobileMembersOpen] = useState(false);

  function closeAll() {
    setOpen(false);
    setMobileMembersOpen(false);
  }

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-gray-200"
      style={{ borderColor: "rgba(79, 168, 209, 0.2)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO + WORDMARK */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logos/aso-picture-logo.svg"
            alt="AnchorStage Operations mark"
            width={40}
            height={40}
            className="h-8 w-auto md:h-11 object-contain"
          />
          <span className="text-base font-bold tracking-tight hidden sm:block text-aso-navy">
            AnchorStage Operations
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-aso-navy">
          {PRIMARY_NAV.map((item) =>
            item.href === FOR_MEMBERS_HREF ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setMembersOpen(true)}
                onMouseLeave={() => setMembersOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 opacity-70 hover:opacity-100 transition"
                  aria-haspopup="true"
                  aria-expanded={membersOpen}
                  onClick={() => setMembersOpen((v) => !v)}
                >
                  {item.label}
                  <Chevron open={membersOpen} />
                </button>

                {membersOpen && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="w-56 rounded-lg border border-gray-100 bg-white shadow-lg py-2">
                      {PERSONAS.map((persona) => (
                        <Link
                          key={persona.slug}
                          href={`${FOR_MEMBERS_HREF}/${persona.slug}`}
                          className="block px-4 py-2 text-sm opacity-70 hover:opacity-100 hover:bg-aso-bg transition"
                          onClick={() => setMembersOpen(false)}
                        >
                          {persona.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="opacity-70 hover:opacity-100 transition">
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* RIGHT: auth links + mobile hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-4">
            <a
              href={AUTH_NAV.login.href}
              className="text-sm font-medium opacity-70 hover:opacity-100 transition text-aso-navy"
            >
              {AUTH_NAV.login.label}
            </a>
            <a
              href={AUTH_NAV.join.href}
              className="text-white text-sm font-medium px-5 py-2 rounded-lg transition hover:opacity-90 bg-aso-orange"
            >
              {AUTH_NAV.join.label}
            </a>
          </div>

          {/* HAMBURGER, mobile only */}
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
          className="md:hidden border-t bg-white px-6 py-4 flex flex-col gap-1 text-sm text-aso-navy"
          style={{ borderColor: "rgba(79, 168, 209, 0.2)" }}
        >
          {PRIMARY_NAV.map((item) =>
            item.href === FOR_MEMBERS_HREF ? (
              <div key={item.href}>
                <button
                  type="button"
                  className="w-full flex items-center justify-between opacity-70 hover:opacity-100 transition py-2.5"
                  aria-expanded={mobileMembersOpen}
                  onClick={() => setMobileMembersOpen((v) => !v)}
                >
                  {item.label}
                  <Chevron open={mobileMembersOpen} />
                </button>

                {mobileMembersOpen && (
                  <div className="pl-4 flex flex-col gap-1 pb-2">
                    {PERSONAS.map((persona) => (
                      <Link
                        key={persona.slug}
                        href={`${FOR_MEMBERS_HREF}/${persona.slug}`}
                        className="opacity-60 hover:opacity-100 transition py-2 text-sm"
                        onClick={closeAll}
                      >
                        {persona.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="opacity-70 hover:opacity-100 transition py-2.5"
                onClick={closeAll}
              >
                {item.label}
              </Link>
            )
          )}
          <a
            href={AUTH_NAV.login.href}
            className="opacity-70 hover:opacity-100 transition py-2.5"
            onClick={closeAll}
          >
            {AUTH_NAV.login.label}
          </a>
          <a
            href={AUTH_NAV.join.href}
            className="mt-2 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition hover:opacity-90 text-center bg-aso-orange"
            onClick={closeAll}
          >
            {AUTH_NAV.join.label}
          </a>
        </nav>
      )}
    </header>
  );
}

"use client";

import { useRef } from "react";
import { CONTACT_EMAIL, FACEBOOK_URL } from "@/lib/constants";

// Matches the light-surface secondary Button variant (variant + base + lg
// size), so the trigger sits beside the primary Button identically.
const TRIGGER_CLASSES =
  "inline-block rounded-lg font-medium text-center transition px-8 py-3.5 text-base " +
  "border border-aso-blue/30 text-aso-navy bg-white hover:border-aso-blue/60 hover:bg-aso-bg " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-blue/50 focus-visible:ring-offset-2";

/**
 * "Contact Us" action with the contact details in a dialog. A native <dialog>
 * gives modal focus trapping, Escape-to-close, and a backdrop with no library.
 * Centring and the scroll lock are in app/globals.css (.contact-dialog).
 * On close (button, backdrop, or Escape) focus returns to the trigger.
 * Client component because showModal()/close() are DOM calls.
 *
 * `triggerClassName` replaces the trigger's default light-surface secondary
 * styling where a page needs a different button (the About contact section
 * uses its lit orange primary). The dialog itself is the same everywhere.
 */
export default function ContactCta({ triggerClassName }: { triggerClassName?: string } = {}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button ref={triggerRef} type="button" onClick={open} className={triggerClassName ?? TRIGGER_CLASSES}>
        Contact Us
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="contact-dialog-heading"
        className="contact-dialog w-[calc(100%-2rem)] max-w-md rounded-xl border border-aso-blue/15 bg-white p-0 text-left shadow-2xl"
        onClose={() => triggerRef.current?.focus()}
        // Clicking the backdrop (the dialog element itself, outside its content) closes it.
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="p-6 sm:p-7">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2
              id="contact-dialog-heading"
              className="text-xl font-bold tracking-tight text-aso-navy"
            >
              Contact ASO
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-aso-bg hover:text-aso-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-blue/50"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-gray-500">
            For questions about ASO, partnerships, live event work, or getting your
            organization set up.
          </p>

          <div className="space-y-5">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Contact
              </p>
              <p className="font-medium text-aso-navy">Cody Williams</p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Email
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="break-words font-medium text-aso-blue underline decoration-aso-blue/30 underline-offset-2 transition hover:decoration-aso-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-blue/50 focus-visible:ring-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Follow
              </p>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-aso-blue underline decoration-aso-blue/30 underline-offset-2 transition hover:decoration-aso-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aso-blue/50 focus-visible:ring-offset-2"
              >
                AnchorStage Ops on Facebook
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

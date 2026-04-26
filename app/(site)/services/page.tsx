import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Services — AnchorStage Operations",
  description:
    "Live audio, stage, lighting, videography, and production execution for events of all sizes.",
};

// ─── Service definitions ──────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: "/Icons/Audio.png",
    title: "Audio Services",
    body: "Full PA systems, mixing, and live sound operation. We can bring the system or run yours — whatever the event needs.",
  },
  {
    icon: "/Icons/Staging.png",
    title: "Stage & PA Setup",
    body: "Clean, professional stage setups for bands, speakers, and events. Fast setup, clean cabling, and efficient teardown.",
  },
  {
    icon: "/Icons/Lighting.png",
    title: "Lighting",
    body: "Simple, effective lighting that makes your event look right. Stage wash, truss, and show lighting without overcomplicating it.",
  },
  {
    icon: "/Icons/Production.png",
    title: "Production & Show Execution",
    body: "We run the show. From load-in to strike, we keep everything organized, on time, and working.",
  },
  {
    icon: "/Icons/Event Videography.png",
    title: "Event Videography",
    body: "Clean, reliable video capture for performances and events. Deliverables vary by scope — typically clean recordings or edited footage — coordinated before the event so you know what to expect.",
  },
  {
    icon: "/Icons/Mobile Podcast Setup.png",
    title: "Podcast & Content Setups",
    body: "Mobile podcast and recording rigs set up on-site for events. Works well for live interviews, panel discussions, and recorded sessions built into your event day.",
  },
  {
    icon: "/Icons/Mobile Podcast Setup.png",
    title: "Home Studio Installation & Troubleshooting",
    body: "Already have the gear — just need it working? We help musicians, podcasters, streamers, and small creators get their home studio properly connected and dialed in. Audio interfaces, microphones, monitors, mixers, cameras, basic lighting, OBS and streaming setups, DAW input/output routing, cable cleanup, and signal-flow troubleshooting.",
  },
  {
    icon: "/Icons/Production.png",
    title: "Minor Gear Repairs & Parts Replacement",
    body: "Practical fixes for non-working AV gear where repair makes sense. Connector replacement, cable repair, knobs, faders, buttons, lamps, fans, rack cleanup, and basic diagnosis. We don't do warranty service, board-level electronics repair, or manufacturer-authorized work — anything in that territory gets referred to the right shop.",
  },
] as const;

// ─── Bundle selection ─────────────────────────────────────────────────────────

const INTAKE_URL =
  process.env.NEXT_PUBLIC_INTAKE_URL ?? "https://intake.anchorstageops.com";

const BUNDLES = [
  {
    slug: "open-mic",
    name: "Open Mic",
    desc: "A recurring or one-off open mic event with house sound and performer support.",
  },
  {
    slug: "stage-only",
    name: "Stage Only",
    desc: "A staging-focused event where the primary need is a clean stage setup.",
  },
  {
    slug: "full-production",
    name: "Full Production",
    desc: "A full event production starting point for stage, audio, lighting, and support.",
  },
  {
    slug: "house-party",
    name: "House Party",
    desc: "A small social event starting point for sound and simple event support.",
  },
] as const;

// ─── How it works ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    step: "01",
    title: "Tell us about your event",
    desc: "Submit your event details — date, location, type, and any technical needs. Takes a few minutes.",
  },
  {
    step: "02",
    title: "We scope what's needed and confirm details",
    desc: "We review your event and follow up with a clear picture of what we'll bring, how it'll run, and what it costs.",
  },
  {
    step: "03",
    title: "We show up and execute cleanly",
    desc: "On the day, we handle setup, direction, and strike. Your event runs clean — that's the job.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main className="bg-white text-gray-900">

      {/* ── HERO — split layout: copy left / video right ───────────────────── */}
      <section className="bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left: copy + CTA */}
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-5"
                style={{ color: "var(--aso-blue-light)", opacity: 0.80 }}
              >
                Live Event Production
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-white">
                Anchored in execution. Built for live events.
              </h1>

              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                Audio, staging, lighting, production, and event support — delivered cleanly from setup to strike.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://intake.anchorstageops.com"
                  className="inline-block text-white px-8 py-3.5 rounded-lg font-medium transition hover:opacity-90"
                  style={{ backgroundColor: "var(--aso-orange)" }}
                >
                  Start Your Event
                </a>
                <a
                  href="/contact"
                  className="inline-block border border-white/40 text-white px-8 py-3.5 rounded-lg font-medium transition hover:bg-white/10"
                >
                  Get in Touch
                </a>
              </div>
            </div>

            {/* Right: video panel */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "16 / 9", backgroundColor: "var(--aso-navy)" }}
            >
              <video
                src="/Videos/Services_Short.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "var(--aso-bg)" }}>
        <div className="max-w-6xl mx-auto px-6">

          <div className="mb-12">
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: "var(--aso-navy)" }}
            >
              What we offer
            </h2>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              We can bring gear, run existing gear, and execute cleanly using the
              right equipment and people for the job.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="bg-white rounded-xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
              >
                <Image
                  src={svc.icon}
                  alt={svc.title}
                  width={68}
                  height={68}
                  style={{ objectFit: "contain" }}
                />

                <div>
                  <h3
                    className="font-semibold text-base mb-2 leading-snug"
                    style={{ color: "var(--aso-navy)" }}
                  >
                    {svc.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{svc.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <h2
            className="text-2xl font-semibold mb-12"
            style={{ color: "var(--aso-navy)" }}
          >
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map(({ step, title, desc }) => (
              <div key={step}>
                <p
                  className="text-3xl font-bold mb-4"
                  style={{ color: "var(--aso-blue)" }}
                >
                  {step}
                </p>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: "var(--aso-navy)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── BUNDLE SELECTION ──────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "var(--aso-bg)" }}>
        <div className="max-w-6xl mx-auto px-6">

          <div className="mb-12">
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: "var(--aso-navy)" }}
            >
              What kind of event are you planning?
            </h2>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              Choose a starting point — we&apos;ll confirm the details.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUNDLES.map((bundle) => (
              <div
                key={bundle.slug}
                className="bg-white rounded-xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5"
              >
                <div
                  className="w-8 h-1 rounded-full"
                  style={{ backgroundColor: "var(--aso-blue)" }}
                />

                <div className="flex-1">
                  <h3
                    className="font-semibold text-base mb-2 leading-snug"
                    style={{ color: "var(--aso-navy)" }}
                  >
                    {bundle.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {bundle.desc}
                  </p>
                </div>

                <a
                  href={`${INTAKE_URL}?bundle=${bundle.slug}`}
                  className="inline-block text-white text-sm px-5 py-2.5 rounded-lg font-medium transition hover:opacity-90 text-center"
                  style={{ backgroundColor: "var(--aso-orange)" }}
                >
                  Book This Event
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-400">
              Not sure?{" "}
              <a
                href={INTAKE_URL}
                className="underline hover:text-gray-600 transition-colors"
              >
                Start with the general request form.
              </a>
            </p>
          </div>

        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "var(--aso-navy)" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-2xl font-semibold text-white mb-3">
            Not sure what you need yet?
          </h2>
          <p
            className="text-sm mb-8 max-w-md mx-auto leading-relaxed"
            style={{ color: "var(--aso-blue-light)", opacity: 0.85 }}
          >
            Tell us about your event — we&apos;ll help figure out the details.
          </p>

          <a
            href={INTAKE_URL}
            className="inline-block text-white px-8 py-3.5 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--aso-orange)" }}
          >
            Start General Request
          </a>

        </div>
      </section>

    </main>
  );
}

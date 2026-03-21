import Image from "next/image";

export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section
        className="relative min-h-[80vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-stage.jpg')" }}
      >
        {/* GRADIENT OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.58) 50%, rgba(0,0,0,0.42) 100%)",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 text-center">

            <div className="flex justify-center mb-6">
              <Image
                src="/anchorstage-logo.png"
                alt="AnchorStage Operations"
                width={96}
                height={96}
                className="w-9 h-9 md:w-12 md:h-12 object-contain opacity-90"
              />
            </div>

            <p className="text-xs font-semibold tracking-widest uppercase mb-5 text-white/60">
              Live Event Production
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white max-w-3xl mx-auto">
              We handle the stage.<br className="hidden md:block" /> You handle everything else.
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Professional sound, lighting, and production for live events —
              from full outdoor stages to compact venue setups.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://intake.anchorstageops.com"
                className="inline-block text-white px-8 py-3.5 rounded-lg text-base font-medium transition hover:opacity-90"
                style={{ backgroundColor: "var(--aso-orange)" }}
              >
                Start Your Event
              </a>
              <a
                href="/contact"
                className="inline-block border border-white/50 text-white px-8 py-3.5 rounded-lg text-base font-medium transition hover:bg-white/10"
              >
                Get in Touch
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-300">
        {[
          { src: "/images/proof-1.jpg", alt: "Live event production" },
          { src: "/images/proof-2.jpg", alt: "Stage and lighting setup" },
          { src: "/images/proof-3.jpg", alt: "Concert production" },
        ].map(({ src, alt }) => (
          <div key={src} className="relative aspect-video bg-gray-900">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
          </div>
        ))}
      </section>

      {/* WHAT WE HANDLE */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="mb-10">
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: "var(--aso-navy)" }}
            >
              What we handle
            </h2>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              Every event is different. We work across the full range — headliner
              stages, club shows, outdoor festivals, and everything in between.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div
              className="rounded-xl overflow-hidden border border-gray-100"
              style={{ backgroundColor: "var(--aso-bg)" }}
            >
              <div className="relative aspect-video bg-gray-900">
                <Image
                  src="/images/card-compact.jpg"
                  alt="Compact venue live music event"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-8">
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: "var(--aso-navy)" }}
                >
                  Compact &amp; Venue Events
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  Bar shows, private events, live music nights, and smaller
                  gatherings. The same professional approach, scaled to what
                  you actually need.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5">
                  <li>— Bar &amp; venue live music</li>
                  <li>— Private parties &amp; celebrations</li>
                  <li>— Backyard &amp; compact setups</li>
                  <li>— Small weddings &amp; receptions</li>
                </ul>
              </div>
            </div>

            <div
              className="rounded-xl overflow-hidden border border-gray-100"
              style={{ backgroundColor: "var(--aso-bg)" }}
            >
              <div className="relative aspect-video bg-gray-900">
                <Image
                  src="/images/card-full.jpg"
                  alt="Full outdoor stage production"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-8">
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: "var(--aso-navy)" }}
                >
                  Full Production
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  Stage builds, outdoor concerts, festivals, and corporate events.
                  We bring the crew, the gear, and the direction to make large-scale
                  shows run cleanly.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5">
                  <li>— Festival &amp; outdoor stages</li>
                  <li>— Concert production</li>
                  <li>— Corporate &amp; branded events</li>
                  <li>— Technical direction &amp; crew management</li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          <h2
            className="text-2xl font-semibold mb-12"
            style={{ color: "var(--aso-navy)" }}
          >
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Tell us about your event",
                desc: "Submit your event details — date, location, type, and any technical needs. Takes a few minutes.",
              },
              {
                step: "02",
                title: "We scope and confirm",
                desc: "We review your event and follow up with a clear picture of what we'll bring, how it'll run, and what it costs.",
              },
              {
                step: "03",
                title: "We show up and execute",
                desc: "On the day, we handle setup, direction, and strike. Your event runs clean — that's the job.",
              },
            ].map(({ step, title, desc }) => (
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

          <div className="mt-12">
            <a
              href="https://intake.anchorstageops.com"
              className="inline-block text-white px-7 py-3.5 rounded-lg text-sm font-medium transition hover:opacity-90"
              style={{ backgroundColor: "var(--aso-orange)" }}
            >
              Start Your Event
            </a>
          </div>

        </div>
      </section>

      {/* WHAT WE BRING */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <h2
            className="text-2xl font-semibold mb-12"
            style={{ color: "var(--aso-navy)" }}
          >
            What we bring to every event
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div
              className="rounded-xl p-8 shadow-sm border border-gray-100 border-l-[3px] hover:shadow-md transition-shadow"
              style={{ borderLeftColor: "var(--aso-blue)" }}
            >
              <h3
                className="text-base font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Audio Services
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We mix and operate live sound on your production regardless of
                what gear is already on site. If you have a PA and need someone
                to run it, we can do that too.
              </p>
            </div>

            <div
              className="rounded-xl p-8 shadow-sm border border-gray-100 border-l-[3px] hover:shadow-md transition-shadow"
              style={{ borderLeftColor: "var(--aso-blue)" }}
            >
              <h3
                className="text-base font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Stage / PA
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Scalable PA support for live music and events. From small venue
                setups to outdoor stages, we size the system to the room and
                get it sounding right before doors open.
              </p>
            </div>

            <div
              className="rounded-xl p-8 shadow-sm border border-gray-100 border-l-[3px] hover:shadow-md transition-shadow"
              style={{ borderLeftColor: "var(--aso-blue)" }}
            >
              <h3
                className="text-base font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Lighting / Rigging
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Wash and work lighting for stages and events. Clean, practical
                light that reads well on stage and supports the show without
                overcomplicating the rig.
              </p>
            </div>

            <div
              className="rounded-xl p-8 shadow-sm border border-gray-100 border-l-[3px] hover:shadow-md transition-shadow"
              style={{ borderLeftColor: "var(--aso-blue)" }}
            >
              <h3
                className="text-base font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Direction &amp; Execution
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                One person who owns show flow and keeps everything moving.
                Load-in, soundcheck, show, strike — we stay on it start to
                finish so nothing falls through.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--aso-navy)" }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-2xl font-semibold text-white mb-3">
            Ready to plan your event?
          </h2>
          <p
            className="text-sm mb-8 max-w-md mx-auto leading-relaxed"
            style={{ color: "var(--aso-blue-light)", opacity: 0.85 }}
          >
            Start with the intake form — it takes a few minutes and gives us
            everything we need to follow up with a clear plan.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="https://intake.anchorstageops.com"
              className="inline-block text-white px-8 py-3.5 rounded-lg font-medium transition hover:opacity-90"
              style={{ backgroundColor: "var(--aso-orange)" }}
            >
              Start Your Event
            </a>
            <a
              href="/contact"
              className="inline-block border border-white/30 text-white px-8 py-3.5 rounded-lg font-medium transition hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>

          <p
            className="text-xs"
            style={{ color: "var(--aso-blue-light)", opacity: 0.70 }}
          >
            Or reach us directly at contact@anchorstageops.com
          </p>

        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--aso-navy)" }}>
                Veteran-Owned &amp; Operated
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Founded and run by a veteran with years of hands-on live event experience.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--aso-navy)" }}>
                Central Florida Based
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Local crew, local knowledge. Available for events throughout the region.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--aso-navy)" }}>
                Built on Real Event Work
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                From bar shows to outdoor stages — every event handled with the same professional approach.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

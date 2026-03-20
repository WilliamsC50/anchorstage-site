export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section
        className="relative min-h-[80vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-live-performance.jpg')" }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/65" />

        {/* CONTENT */}
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6 py-24 text-center">

            <p className="text-xs font-semibold tracking-widest uppercase mb-5 text-white/60">
              Live Event Production
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white max-w-3xl mx-auto">
              We handle the stage.<br className="hidden md:block" /> You handle everything else.
            </h1>

            <p className="text-lg md:text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">
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
              className="rounded-xl p-8 border border-gray-100"
              style={{ backgroundColor: "var(--aso-bg)" }}
            >
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

            <div
              className="rounded-xl p-8 border border-gray-100"
              style={{ backgroundColor: "var(--aso-bg)" }}
            >
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

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20" style={{ backgroundColor: "var(--aso-bg)" }}>
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

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div
                className="w-1.5 h-8 rounded-full mb-6"
                style={{ backgroundColor: "var(--aso-blue)" }}
              />
              <h3
                className="text-base font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Sound &amp; Audio
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Professional PA systems, monitors, and live mixing — sized to your
                room or stage and dialed in before anyone walks through the door.
              </p>
            </div>

            <div className="rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div
                className="w-1.5 h-8 rounded-full mb-6"
                style={{ backgroundColor: "var(--aso-blue)" }}
              />
              <h3
                className="text-base font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Lighting &amp; Stage
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Stage wash, moving fixtures, and event-appropriate lighting design.
                We handle setup, programming, and operation so you can focus on
                the event.
              </p>
            </div>

            <div className="rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div
                className="w-1.5 h-8 rounded-full mb-6"
                style={{ backgroundColor: "var(--aso-blue)" }}
              />
              <h3
                className="text-base font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Direction &amp; Execution
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                One person who knows the plan and keeps things moving. Load-in,
                soundcheck, show, strike — covered start to finish.
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
            style={{ color: "var(--aso-blue-light)", opacity: 0.45 }}
          >
            Or reach us directly at contact@anchorstageops.com
          </p>

        </div>
      </section>

    </main>
  );
}

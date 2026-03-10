export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section
        className="relative min-h-[75vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-live-performance.jpg')" }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* CONTENT */}
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6 py-24 text-center">

            <p className="text-xs font-semibold tracking-widest uppercase mb-6 text-white/70">
              Production Operations
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white max-w-3xl mx-auto">
              Operations infrastructure for live events
            </h1>

            <p className="text-lg md:text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">
              AnchorStage handles production planning, technical direction, and crew
              coordination — from intake through final invoice.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://intake.anchorstageops.com"
                className="inline-block text-white px-7 py-3.5 rounded-lg text-base font-medium transition hover:opacity-90"
                style={{ backgroundColor: "var(--aso-orange)" }}
              >
                Start Event
              </a>
              <a
                href="/services"
                className="inline-block border border-white/50 text-white px-7 py-3.5 rounded-lg text-base font-medium transition hover:bg-white/10"
              >
                View Services
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* PROOF SECTION */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="mb-10 max-w-2xl">
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: "var(--aso-navy)" }}
            >
              Built on live event experience.
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Corporate conferences, concert productions, touring shows, and multi-day festivals.
              Every event runs through the same structured planning and operational process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Corporate Conference",
              "Concert Production",
              "Festival Operations",
            ].map((label) => (
              <div
                key={label}
                className="aspect-video rounded-xl overflow-hidden relative flex items-end"
                style={{ backgroundColor: "#111c27" }}
              >
                <span
                  className="absolute bottom-0 left-0 right-0 px-5 py-4 text-xs font-medium uppercase tracking-widest"
                  style={{ color: "var(--aso-blue-light)", opacity: 0.6 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="py-24" style={{ backgroundColor: "var(--aso-bg)" }}>
        <div className="max-w-6xl mx-auto px-6">

          <h2
            className="text-2xl font-semibold mb-12"
            style={{ color: "var(--aso-navy)" }}
          >
            What we do
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div
                className="w-10 h-10 rounded-lg mb-6 flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: "var(--aso-blue)" }}
              >
                P
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Production Planning
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Structured planning and logistics for professional live events.
                Timelines, vendor coordination, and technical riders handled systematically.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div
                className="w-10 h-10 rounded-lg mb-6 flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: "var(--aso-blue)" }}
              >
                T
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Technical Direction
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Coordination of audio, video, lighting, and staging teams.
                Single point of accountability for technical execution.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div
                className="w-10 h-10 rounded-lg mb-6 flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: "var(--aso-blue)" }}
              >
                E
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Execution Support
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                On-site operational support to keep events on schedule.
                Active crew direction and problem resolution during live execution.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: "var(--aso-navy)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Start your event request
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--aso-blue-light)" }}>
            Submit event details through our intake system.
          </p>
          <a
            href="https://intake.anchorstageops.com"
            className="inline-block text-white px-8 py-3.5 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--aso-orange)" }}
          >
            Begin Intake
          </a>
        </div>
      </section>

    </main>
  );
}

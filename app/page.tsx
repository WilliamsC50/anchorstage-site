export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section style={{ backgroundColor: "var(--aso-blue-light)" }}>
        <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">

          <p
            className="text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ color: "var(--aso-navy)" }}
          >
            Production Operations
          </p>

          <h1
            className="text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl"
            style={{ color: "var(--aso-navy)" }}
          >
            Operations infrastructure for live events.
          </h1>

          <p className="text-xl mb-10 max-w-2xl leading-relaxed" style={{ color: "var(--aso-navy)", opacity: 0.75 }}>
            AnchorStage handles production planning, technical direction, and crew
            coordination — from initial intake through final invoice.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://intake.anchorstageops.com"
              className="inline-block text-white px-7 py-3.5 rounded-lg text-base font-medium transition hover:opacity-90"
              style={{ backgroundColor: "var(--aso-orange)" }}
            >
              Start Event
            </a>
            <a
              href="/services"
              className="inline-block px-7 py-3.5 rounded-lg text-base font-medium transition hover:bg-white/60"
              style={{ border: "1.5px solid var(--aso-navy)", color: "var(--aso-navy)", opacity: 0.8 }}
            >
              View Services
            </a>
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

export default function Home() {
  return (
    <main className="text-gray-900">

      {/* HERO */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">

          <p className="text-sm font-medium tracking-widest uppercase mb-6" style={{ color: "var(--aso-blue)" }}>
            Production Operations
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl" style={{ color: "var(--aso-text)" }}>
            Operations infrastructure for live events.
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
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
              className="inline-block border border-gray-300 text-gray-700 px-7 py-3.5 rounded-lg text-base font-medium transition hover:border-gray-500 hover:text-gray-900"
            >
              View Services
            </a>
          </div>

        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-20" style={{ backgroundColor: "var(--aso-blue-light)" }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="text-xl font-semibold mb-2">Production Planning</h3>
            <p className="text-gray-600">
              Structured planning and logistics for professional live events.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Technical Direction</h3>
            <p className="text-gray-600">
              Coordination of audio, video, lighting and staging teams.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Execution Support</h3>
            <p className="text-gray-600">
              On-site operational support to ensure events run smoothly.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Start your event request
        </h2>

        <a
          href="https://intake.anchorstageops.com"
          className="inline-block text-white px-6 py-3 rounded-lg transition hover:opacity-90"
          style={{ backgroundColor: "var(--aso-orange)" }}
        >
          Begin Intake
        </a>
      </section>

    </main>
  );
}
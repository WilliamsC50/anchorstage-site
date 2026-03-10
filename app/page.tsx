export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-6">
          AnchorStage Operations
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          From Intake to Invoice. Production systems for live events.
        </p>

        <a
          href="https://intake.anchorstageops.com"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
        >
          Start an Event
        </a>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-gray-50 py-20">
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
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Begin Intake
        </a>
      </section>

    </main>
  );
}
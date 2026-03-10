export default function Services() {
  return (
    <main className="bg-white text-gray-900">

      {/* PAGE HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-4">Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          AnchorStage provides structured production operations for live events.
          From planning through execution, we handle the operational work so your
          event runs on schedule and on spec.
        </p>
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div>
            <h2 className="text-xl font-semibold mb-2">Production Planning</h2>
            <p className="text-gray-600">
              Structured event intake, logistics planning, and timeline development
              for corporate events, concerts, and touring productions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Technical Direction</h2>
            <p className="text-gray-600">
              Coordination and oversight of audio, video, lighting, and staging
              vendors. Single point of accountability for technical execution.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Crew Coordination</h2>
            <p className="text-gray-600">
              Scheduling, communication, and management of production crew across
              departments. Labor coordination from load-in through strike.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">On-Site Operations</h2>
            <p className="text-gray-600">
              Day-of operational support to keep events on schedule. Active
              problem-solving and crew direction during live execution.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">AV &amp; Staging Coordination</h2>
            <p className="text-gray-600">
              Vendor procurement, specification review, and site coordination for
              audio, video, lighting, and staging systems.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Operations Platform</h2>
            <p className="text-gray-600">
              The AnchorStage system handles event intake, task tracking, crew
              scheduling, and production logistics in one structured workflow.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-8">
          Submit your event details through our intake system and we&apos;ll follow up
          to discuss your production needs.
        </p>
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

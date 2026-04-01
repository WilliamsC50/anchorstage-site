export default function Contact() {
  return (
    <main className="bg-white text-gray-900">

      {/* PAGE HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: "var(--aso-navy)" }}
        >
          Let&apos;s talk about your event
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Tell us what you need, and we&apos;ll take it from there.
        </p>
      </section>

      {/* DIRECT IDENTITY + INTAKE CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-16">

        {/* Direct contact identity */}
        <div>
          <h2
            className="text-xl font-semibold mb-6"
            style={{ color: "var(--aso-navy)" }}
          >
            Direct contact
          </h2>
          <div className="mb-5">
            <p className="text-base font-semibold" style={{ color: "var(--aso-navy)" }}>
              Cody Williams
            </p>
            <p className="text-sm text-gray-500">Founder / Production Lead</p>
            <p className="text-sm text-gray-500">AnchorStage Operations</p>
          </div>
          <div className="space-y-3 text-sm text-gray-500 leading-relaxed">
            <p>
              <span className="font-medium" style={{ color: "var(--aso-navy)" }}>Phone</span>
              <br />
              {/* TODO: add final business number */}
              (placeholder — number coming soon)
            </p>
            <p>
              <span className="font-medium" style={{ color: "var(--aso-navy)" }}>Email</span>
              <br />
              contact@anchorstageops.com
            </p>
          </div>
        </div>

        {/* Intake CTA */}
        <div>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--aso-navy)" }}
          >
            Start your event request
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Our intake form helps us get the details we need to scope your event
            quickly and accurately.
          </p>
          <a
            href="https://intake.anchorstageops.com"
            className="inline-block text-white px-8 py-3.5 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--aso-orange)" }}
          >
            Fill out the intake form
          </a>
        </div>

      </section>

      {/* SCALING / LARGER PRODUCTION */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

          <div>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "var(--aso-navy)" }}
            >
              Need a larger setup?
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              AnchorStage handles compact and mid-size events directly — sound,
              lighting, stage, and direction. For shows that need additional scale
              or expanded production capacity, we work with Central Florida AV
              Solutions (CFAV), a trusted local production partner.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Submit through the intake form and we&apos;ll coordinate the right
              setup from there — or reach out to CFAV directly if you already
              know you need a larger rig.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: "var(--aso-navy)" }}
            >
              Central Florida AV Solutions
            </p>
            <p className="text-sm text-gray-500 mb-5">
              Full-scale production support for larger shows and events.
            </p>
            <a
              href="https://cfav.solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border text-sm font-medium px-6 py-3 rounded-lg transition hover:bg-gray-100 self-start"
              style={{ borderColor: "var(--aso-blue)", color: "var(--aso-blue)" }}
            >
              Visit cfav.solutions
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}

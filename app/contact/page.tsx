export default function Contact() {
  return (
    <main className="bg-white text-gray-900">

      {/* PAGE HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: "var(--aso-navy)" }}
        >
          Contact
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          The best way to get started is through the intake form — it takes a few
          minutes and gives us what we need to follow up with a clear plan.
        </p>
      </section>

      {/* CONTACT INFO + INTAKE CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-16">

        <div>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--aso-navy)" }}
          >
            Start with the intake form
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Tell us about your event — date, location, type, and any technical
            needs. We&apos;ll review it and follow up directly with a plan.
          </p>
          <a
            href="https://intake.anchorstageops.com"
            className="inline-block text-white px-8 py-3.5 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--aso-orange)" }}
          >
            Start Your Event
          </a>
        </div>

        <div>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--aso-navy)" }}
          >
            Direct contact
          </h2>
          <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
            <p>
              <span className="font-medium" style={{ color: "var(--aso-navy)" }}>
                Email
              </span>
              <br />
              contact@anchorstageops.com
            </p>
            <p>
              We check email regularly and respond directly. Submitting the
              intake form helps us get back to you faster with the right details.
            </p>
          </div>
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

export default function Contact() {
  return (
    <main className="bg-white text-gray-900">

      {/* PAGE HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          The best way to start a conversation is through our event intake system.
          Submit your event details and we&apos;ll follow up directly.
        </p>
      </section>

      {/* CONTACT INFO + INTAKE CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-16">

        <div>
          <h2 className="text-xl font-semibold mb-4">Start with Intake</h2>
          <p className="text-gray-600 mb-6">
            Our intake system collects the details we need to scope your event and
            get you a response quickly. It covers event type, dates, location,
            technical requirements, and budget range.
          </p>
          <a
            href="https://intake.anchorstageops.com"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Begin Intake
          </a>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Direct Contact</h2>
          <div className="space-y-3 text-gray-600">
            <p>
              <span className="font-medium text-gray-900">Email</span><br />
              contact@anchorstageops.com
            </p>
            <p className="text-sm text-gray-400">
              We respond to all inquiries through our operations system.
              Submitting intake ensures your request is logged and tracked.
            </p>
          </div>
        </div>

      </section>

    </main>
  );
}

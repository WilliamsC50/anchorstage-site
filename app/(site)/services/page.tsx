import Image from "next/image";

export default function Services() {
  return (
    <main className="bg-white text-gray-900">

      {/* PAGE HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: "var(--aso-navy)" }}
        >
          Services
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Professional sound, lighting, and production direction for live events —
          from compact venue shows to full outdoor stages.
        </p>
      </section>

      {/* PAGE IMAGE */}
      <section className="relative h-56 md:h-72 bg-gray-900">
        <Image
          src="/images/card-full.jpg"
          alt="Live event production"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-8">

            <div
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 border-l-[3px] hover:shadow-md transition-shadow"
              style={{ borderLeftColor: "var(--aso-blue)" }}
            >
              <h2
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Audio Services
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                We can step into your event and run live sound regardless of what
                gear is already on site. If you have a PA and just need an operator,
                we can fill that role. If you need us to bring a system, we do that too.
              </p>
            </div>

            <div
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 border-l-[3px] hover:shadow-md transition-shadow"
              style={{ borderLeftColor: "var(--aso-blue)" }}
            >
              <h2
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Stage / PA
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                PA support scaled to your event — from small indoor venues to outdoor
                stages. We size the system to the room, handle setup, and make sure
                it&apos;s dialed before the first act.
              </p>
            </div>

            <div
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 border-l-[3px] hover:shadow-md transition-shadow"
              style={{ borderLeftColor: "var(--aso-blue)" }}
            >
              <h2
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Lighting / Rigging
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Wash and work lighting for stages and events. We keep it practical —
                clean light that reads well on stage and supports the show without
                overcomplicating the rig.
              </p>
            </div>

            <div
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 border-l-[3px] hover:shadow-md transition-shadow"
              style={{ borderLeftColor: "var(--aso-blue)" }}
            >
              <h2
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--aso-navy)" }}
              >
                Direction &amp; Execution
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                One person who owns the show flow and keeps everything on track.
                We coordinate load-in, run soundcheck, manage the show, and stay
                through strike — so you&apos;re not the one chasing details.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2
            className="text-2xl font-semibold mb-3"
            style={{ color: "var(--aso-navy)" }}
          >
            Common events we support
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mb-10 leading-relaxed">
            If you&apos;re not sure whether we&apos;re the right fit, here&apos;s a quick look at the kinds of events we handle regularly.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              "Bars & venue shows",
              "Outdoor concerts",
              "Community events",
              "Festivals",
              "Private parties",
              "Small weddings",
              "Branded & promotional events",
              "Corporate gatherings",
            ].map((type) => (
              <div
                key={type}
                className="rounded-lg px-4 py-3 text-sm font-medium border border-gray-100"
                style={{ backgroundColor: "var(--aso-bg)", color: "var(--aso-navy)" }}
              >
                {type}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2
          className="text-2xl font-semibold mb-3"
          style={{ color: "var(--aso-navy)" }}
        >
          Ready to get started?
        </h2>
        <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
          Submit your event details and we&apos;ll follow up with a clear plan.
        </p>
        <a
          href="https://intake.anchorstageops.com"
          className="inline-block text-white px-8 py-3.5 rounded-lg font-medium transition hover:opacity-90"
          style={{ backgroundColor: "var(--aso-orange)" }}
        >
          Start Your Event
        </a>
      </section>

    </main>
  );
}

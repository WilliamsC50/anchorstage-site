import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team — AnchorStage Operations",
  description:
    "Meet the operators behind AnchorStage Operations — focused on clean execution and reliable live event production.",
};

export default function TeamPage() {
  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: "var(--aso-navy)" }}
        >
          Meet the team behind AnchorStage
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Real operators focused on clean execution and reliable shows.
        </p>
      </section>

      {/* MAIN PROFILE */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div
          className="rounded-xl p-8 border border-gray-100"
          style={{ backgroundColor: "var(--aso-bg)" }}
        >
          <p
            className="text-xl font-bold mb-1"
            style={{ color: "var(--aso-navy)" }}
          >
            Cody Williams
          </p>
          <p className="text-sm text-gray-500 mb-6">Founder / Production Lead</p>
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
            Cody leads production and event execution for AnchorStage Operations,
            focusing on clean audio, efficient setups, and shows that run right
            from load-in to strike. With hands-on experience across live music,
            open mic events, and small-to-mid scale productions, the priority is
            simple: make the show run right, every time.
          </p>
        </div>
      </section>

      {/* TRUSTED PARTNERS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-base font-semibold mb-2"
            style={{ color: "var(--aso-navy)" }}
          >
            Built with trusted partners
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
            For larger productions that need additional scale, AnchorStage works
            with{" "}
            <a
              href="https://cfav.solutions"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--aso-blue)" }}
              className="hover:underline"
            >
              Central Florida AV Solutions
            </a>
            {" "}— a trusted local production partner with full-scale event capability.
          </p>
        </div>
      </section>

    </main>
  );
}

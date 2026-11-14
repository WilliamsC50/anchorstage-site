import PlatformArchitecture from "./PlatformArchitecture";

/**
 * Platform page hero. The copy holds its own column and the architecture
 * model its own space beside it (below lg, beneath it), so text never sits
 * over artwork at any size. Styling: app/(site)/platform/platform.css.
 */
export default function PlatformHero() {
  return (
    <section className="platform-hero relative overflow-hidden" aria-labelledby="platform-hero-title">
      <div aria-hidden="true" className="platform-hero-env" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none aso-plot-grid" />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-14 md:pt-24 md:pb-20 lg:py-24 grid items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[minmax(0,27rem)_minmax(0,1fr)]">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span aria-hidden="true" className="h-px w-8 bg-aso-orange" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aso-orange">Platform</p>
          </div>
          <h1 id="platform-hero-title" className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            One operational foundation for your organization
          </h1>
          <p className="text-lg platform-hero-lead leading-relaxed">
            AnchorStage Ops is a connected operations platform for live event work. Your organization gets one place where its events, records, and day to day operations live together.
          </p>
        </div>

        <div className="platform-hero-stage">
          <PlatformArchitecture />
        </div>
      </div>
    </section>
  );
}

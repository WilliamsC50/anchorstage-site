import Section from "./Section";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead: string;
}

/** Navy page header for the four inner pages. The orange rule above the
 *  eyebrow is the site's recurring attention mark. */
export default function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <Section background="navy" plot>
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-5">
          <span aria-hidden="true" className="h-px w-8 bg-aso-orange" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aso-orange">
            {eyebrow}
          </p>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          {title}
        </h1>
        <p className="text-lg text-white/70 leading-relaxed">{lead}</p>
      </div>
    </Section>
  );
}

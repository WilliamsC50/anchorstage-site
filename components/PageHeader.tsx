import Section from "./Section";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead: string;
}

/** Navy page header used by the four inner marketing pages. */
export default function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <Section background="navy">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-aso-blue-light mb-4">
          {eyebrow}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
        <p className="text-lg text-white/70 leading-relaxed">{lead}</p>
      </div>
    </Section>
  );
}

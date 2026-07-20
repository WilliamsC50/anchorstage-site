import type { ReactNode } from "react";
import Section from "./Section";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead: string;
  /** Optional hero media band (a HeroMedia). When present the header renders
   *  as an integrated image hero like Home: the band fills the section and the
   *  copy narrows to clear it. Omit it and the header is unchanged. */
  media?: ReactNode;
  /** Optional node rendered just below the lead, inside the copy column (e.g.
   *  a founder attribution). Omit it and the header is unchanged. */
  footer?: ReactNode;
}

/** Navy page header for the four inner pages. The orange rule above the
 *  eyebrow is the site's recurring attention mark. */
export default function PageHeader({ eyebrow, title, lead, media, footer }: PageHeaderProps) {
  return (
    <Section background="navy" plot media={media}>
      <div className={media ? "max-w-2xl" : "max-w-3xl"}>
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
        {footer}
      </div>
    </Section>
  );
}

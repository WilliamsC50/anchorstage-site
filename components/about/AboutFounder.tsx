import Image from "next/image";
import { founderHeadshot } from "@/lib/images";

/**
 * About, scene 2: the person and the purpose (DESIGN-16A.2; simplified in
 * DESIGN-16A.3 to three beats beside the portrait: the founder, what drives
 * ASO, and where it is going).
 *
 * An editorial layout: the colour portrait at 4:5 beside the copy. On
 * desktop the portrait stays in view (sticky) while the column beside it is
 * read; on phones it leads the scene.
 *
 * The signature transition: scene 1's photograph is black and white; this
 * portrait arrives in black and white too and comes into full colour as it
 * scrolls into view (CSS scroll-driven animation in about.css). Browsers
 * without scroll-driven animations, and visitors who prefer reduced motion,
 * see it in full colour throughout.
 *
 * Copy: the approved About content, tightened. Not claimed: that every
 * workflow has been tested on actual jobs; the longer-term network is stated
 * as still in development (see the Network page notes).
 *
 * The portrait is the original asset (lib/images founderHeadshot), shown
 * with object-fit cover at 4:5; the file is not modified.
 *
 * Styling: app/(site)/about/about.css under .about-founder.
 */

const PRINCIPLES = [
  { title: "Multiply professionals.", body: "Give experienced people more room for the decisions only they can make." },
  { title: "One source of truth.", body: "Critical event information should be there when and where it is needed." },
  { title: "Built alongside the industry.", body: "Features start as real operational problems before they become part of the platform." },
];

export default function AboutFounder() {
  return (
    <section className="about-founder" aria-labelledby="af-name">
      <div className="af-wrap">
        <div className="af-photo-col">
          <figure className="af-figure">
            <div className="af-portrait">
              <Image
                src={founderHeadshot.src}
                alt={founderHeadshot.alt}
                fill
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 24rem, 90vw"
                className="af-img"
              />
            </div>
          </figure>
        </div>

        <div className="af-copy">
          <p className="af-kicker">The person and the purpose</p>
          <h2 id="af-name" className="af-name">
            Cody Williams
          </h2>
          <p className="af-role">Founder &amp; Live Event Operator</p>
          <p className="af-intro">
            Cody still works live events while building ASO, and that is the point. The platform grows alongside real
            production work, so what gets built reflects how the job actually runs.
          </p>

          <div className="af-beat">
            <h3 className="af-label">What drives ASO</h3>
            <p className="af-mission-text">
              Help live event professionals spend less time managing information and more time producing exceptional
              events.
            </p>
            <ul className="af-principle-list">
              {PRINCIPLES.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong> {p.body}
                </li>
              ))}
            </ul>
          </div>

          <div className="af-beat">
            <h3 className="af-label">Where we&apos;re going</h3>
            <p className="af-direction-text">
              Today the focus is depth: making the operations an organization runs every week faster and more reliable
              than the tools it replaces. Longer term, ASO is being built so organizations and professionals can find
              the right industry relationships through the network itself. That part is still in development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

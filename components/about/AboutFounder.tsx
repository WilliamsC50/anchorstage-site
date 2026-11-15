import Image from "next/image";
import { founderHeadshot } from "@/lib/images";

/**
 * About, scene 2: the person and the purpose (DESIGN-16A.2).
 *
 * Replaces the old Philosophy, Mission, "Where it is going", Founder, and
 * closing-statement sections. An editorial layout: the colour portrait at
 * 4:5 beside the founder's introduction, the mission, the three principles,
 * and the direction. On desktop the portrait stays in view (sticky) while the
 * column beside it is read; on phones it leads the scene.
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
  {
    title: "Multiply professionals",
    body: "Give experienced people more room for the decisions only they can make, with less of the administration around them.",
  },
  {
    title: "One source of truth",
    body: "Critical event information should be there when it is needed, whether someone is building marketing graphics, checking a schedule, sharing a stage plot, or requesting more equipment.",
  },
  {
    title: "Built alongside the industry",
    body: "Features start as real operational problems before they become part of the platform.",
  },
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
          <p className="af-kicker">
            <span aria-hidden="true">02</span> The person and the purpose
          </p>
          <h2 id="af-name" className="af-name">
            Cody Williams
          </h2>
          <p className="af-role">Founder &amp; Live Event Operator</p>
          <p className="af-intro">
            Cody still works live events while building ASO, and that is the point. The platform grows alongside real
            production work, so what gets built reflects how the job actually runs.
          </p>

          <div className="af-mission">
            <h3 className="af-label">Mission</h3>
            <p className="af-mission-text">
              Help live event professionals spend less time managing information and more time producing exceptional
              events.
            </p>
            <p className="af-mission-note">Everything on the platform is measured against that.</p>
          </div>

          <div className="af-principles">
            <h3 className="af-label">Philosophy</h3>
            <ol className="af-principle-list">
              {PRINCIPLES.map((p, i) => (
                <li key={p.title}>
                  <span aria-hidden="true" className="af-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="af-principle-title">{p.title}</h4>
                    <p className="af-principle-body">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="af-direction">
            <h3 className="af-label">Where it is going</h3>
            <p>
              The near-term work is depth: making the operations an organization runs every week faster and more
              reliable than the tools it replaces.
            </p>
            <p>
              Longer term, ASO is being built so organizations and professionals can find the right industry
              relationships through the network itself. That part is still in development, and the platform will keep
              developing alongside the professionals who use it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

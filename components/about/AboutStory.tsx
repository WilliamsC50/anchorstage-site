import Image from "next/image";
import { aboutHero } from "@/lib/images";

/**
 * About, scene 1: the work behind the show (DESIGN-16A.2).
 *
 * Replaces the old navy page header and the "The problem was time, not
 * talent" and "Built from the industry" sections. The black-and-white
 * working photograph is the hero: on desktop it fills the right of a near
 * full-height stage with the founder at work, fading into the dark under the
 * copy; on phones and tablets it is its own band above the copy, cropped on
 * him. The story continues below on the same dark: the problem, and the work
 * around the work that solving it became.
 *
 * Copy: the approved About story, consolidated (no change of substance).
 * "More than 10 years" is founder confirmed (DESIGN-16A.2). The production
 * operation is described, not named.
 *
 * The photograph is the original asset (lib/images aboutHero), shown with
 * object-fit cover and a focal point; the file is not modified. Its alt text
 * is given here because the subject is the founder.
 *
 * Styling: app/(site)/about/about.css under .about-story.
 */

const WORK_AROUND_THE_WORK = [
  "Organizing equipment",
  "Sharing stage plots",
  "Keeping event information current as it changed",
  "Handling last-minute support requests",
  "Producing marketing assets",
  "Coordinating between organizations working the same show",
];

export default function AboutStory() {
  return (
    <section className="about-story" aria-labelledby="about-title">
      <div className="as-hero">
        <div className="as-photo">
          <Image
            src={aboutHero.src}
            alt="Cody Williams, ASO's founder, working at a rack of amplifiers and audio gear at an outdoor event, in black and white."
            fill
            priority
            sizes="(min-width: 1024px) 72vw, 100vw"
            className="as-img"
          />
        </div>

        <div className="as-wrap as-hero-copy">
          <div className="as-eyebrow">
            <span aria-hidden="true" className="as-rule" />
            About
          </div>
          <h1 id="about-title" className="as-title">
            Built from the work behind the show.
          </h1>
          <p className="as-lead">
            AnchorStage Ops grew out of more than 10 years of hands-on live event production. Every part of it begins
            with the way professionals actually work.
          </p>
          <p className="as-byline">
            <span className="as-byline-name">Cody Williams</span>
            <span className="as-byline-role">Founder &amp; Live Event Operator</span>
          </p>
        </div>
      </div>

      <div className="as-wrap as-body">
        <div className="as-narrative">
          <p className="as-kicker">
            The story
          </p>
          <h2 className="as-h2">The problem was time, not talent.</h2>
          <p>
            ASO started inside a working production operation in Central Florida, running sound, staging, and lighting
            for venues, festivals, and private events.
          </p>
          <p>
            The professionals making the biggest decisions on an event were often the same people buried in phone
            calls, paperwork, document requests, graphics, and coordination. Talented people were constantly drowning
            in administrative work, making it harder to take on more without sacrificing the quality of what they
            already did.
          </p>
        </div>

        <div className="as-work" aria-labelledby="as-work-title">
          <h3 id="as-work-title" className="as-work-title">
            The work around the work
          </h3>
          <ul className="as-work-list">
            {WORK_AROUND_THE_WORK.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="as-work-close">
            None of these were show problems, but every event exposed another one, and they added up. One by one,
            solving them became the foundation of ASO.
          </p>
        </div>
      </div>
    </section>
  );
}

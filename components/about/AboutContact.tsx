import Image from "next/image";
import ContactCta from "@/components/ContactCta";
import { founderHeadshot } from "@/lib/images";

/**
 * About, scene 3: let's talk (DESIGN-16A.3). The page's closing, replacing
 * the shared "Join free" section: About ends with a conversation, not a
 * registration pitch, so there is no Join Free or Create Your Organization
 * action here.
 *
 * The section invites contact; the shared Contact Us popup
 * (components/ContactCta.tsx) holds the actual contact options (the company
 * email with its mailto link, the contact name, the Facebook page). The
 * button here opens that popup; it is not a mailto link. It is styled as the
 * lit orange primary of the pre-footers.
 *
 * Visual treatment: the white pre-footer used by Platform, Network, and Who
 * It's For (stage edge, rising light), reproduced in about.css under
 * .about-contact because those styles load only on their pages, made more
 * personal with a signature: a small crop of the founder's portrait (the
 * original file, not modified) and his name under the first-person copy.
 * The full title is not repeated here; it appears once, in scene 2.
 *
 * id="contact" is the stable target of the footer's Contact Us link.
 */
export default function AboutContact() {
  return (
    <section id="contact" className="about-contact" aria-labelledby="ac-title">
      <div aria-hidden="true" className="ac-light" />
      <div aria-hidden="true" className="ac-edge" />

      <div className="ac-inner">
        <span aria-hidden="true" className="ac-rule" />
        <h2 id="ac-title" className="ac-title">
          Let&apos;s talk.
        </h2>
        <p className="ac-body">
          Have a question, an idea, or something you&apos;d like to see AnchorStage Ops do better? I&apos;d like to
          hear it.
        </p>

        <div className="ac-signature">
          <span className="ac-avatar">
            <Image src={founderHeadshot.src} alt="" fill sizes="64px" className="ac-avatar-img" />
          </span>
          <span className="ac-sig-name">Cody Williams</span>
        </div>

        <div className="ac-actions">
          <ContactCta triggerClassName="ac-primary" />
        </div>
      </div>
    </section>
  );
}

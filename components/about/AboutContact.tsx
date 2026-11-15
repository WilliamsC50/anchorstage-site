import ContactCta from "@/components/ContactCta";
import { FACEBOOK_URL } from "@/lib/constants";

/**
 * About, scene 3: let's talk (DESIGN-16A.3; polished in DESIGN-16A.4). The
 * page's closing, replacing the shared "Join free" section: About ends with
 * a conversation, not a registration pitch, so there is no Join Free or
 * Create Your Organization action here.
 *
 * Two actions:
 *   Contact Us  the lit orange primary; opens the shared Contact Us popup
 *               (components/ContactCta.tsx), which holds the contact
 *               details: the company email with its mailto link, the
 *               contact name, and the Facebook page. Not a mailto link.
 *   Facebook    the white edge-lit secondary; the verified AnchorStage Ops
 *               Facebook page (lib/constants FACEBOOK_URL, the same link the
 *               popup uses), in a new tab.
 *
 * Visual treatment: the white pre-footer used by Platform, Network, and Who
 * It's For (stage edge, rising light, primary and secondary buttons),
 * reproduced in about.css under .about-contact because those styles load
 * only on their pages.
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

        <div className="ac-actions">
          <ContactCta triggerClassName="ac-primary" />
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="ac-secondary">
            Facebook
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ac-ext">
              <path d="M7 17L17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only"> (AnchorStage Ops on Facebook, opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

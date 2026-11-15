import { CONTACT_EMAIL, FACEBOOK_URL } from "@/lib/constants";

/**
 * About, scene 3: let's talk (DESIGN-16A.3). The page's closing, replacing
 * the shared "Join free" section: About ends with a conversation, not a
 * registration pitch, so there is no Join Free or Create Your Organization
 * action here.
 *
 * The contact details the Contact Us dialog exposed, shown directly: the
 * company email (lib/constants CONTACT_EMAIL) as the lit orange primary, the
 * Facebook page (FACEBOOK_URL) as the white edge-lit secondary, and the
 * founder's name as a signature under the first-person copy.
 *
 * Visual treatment: the white pre-footer used by Platform, Network, and Who
 * It's For (stage edge, rising light, button styles), reproduced in
 * about.css under .about-contact because those styles load only on their
 * pages. id="contact" is the target of the footer's Contact Us link.
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
        <p className="ac-signature">
          <span className="ac-sig-name">Cody Williams</span>
          <span className="ac-sig-role">Founder &amp; Live Event Operator</span>
        </p>

        <div className="ac-actions">
          <a href={`mailto:${CONTACT_EMAIL}`} className="ac-primary">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ac-icon">
              <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            <span>
              <span className="sr-only">Email </span>
              {CONTACT_EMAIL}
            </span>
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="ac-secondary">
            AnchorStage Ops on Facebook
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ac-icon-sm">
              <path d="M7 17L17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

import Button from "@/components/Button";
import { INTAKE_LOGIN_URL, INTAKE_REGISTER_URL } from "@/lib/constants";

/**
 * Network: closing call to action. "Bring your network together."
 *
 * Follows the approved Platform closing (components/platform/
 * PlatformClosingCta.tsx): centred on white, the homepage-matched lit orange
 * primary with navy text, the edge-lit secondary, a quiet log-in line, and a
 * stage edge below. Platform's styles load only on /platform, so the
 * treatment is reproduced under .network-cta rather than shared; Platform is
 * unchanged. The shared components/ClosingCta.tsx is no longer used here.
 *
 * Styling: app/(site)/network/network.css under .network-cta.
 */
export default function NetworkClosingCta() {
  return (
    <section className="network-cta relative overflow-hidden bg-white" aria-labelledby="ncta-title">
      <div aria-hidden="true" className="ncta-light" />
      <div aria-hidden="true" className="ncta-edge" />

      <div className="ncta-inner relative max-w-6xl mx-auto px-6">
        <h2 id="ncta-title" className="ncta-title">
          Bring your network together.
        </h2>
        <p className="ncta-body">
          Build your operation, connect with collaborators, and create stronger working relationships with
          AnchorStage Ops.
        </p>

        <div className="ncta-actions">
          <Button href={INTAKE_REGISTER_URL} variant="primary" className="ncta-primary">
            Create Your Organization — Free
          </Button>
          <Button href="/platform" variant="secondary" className="ncta-secondary">
            Explore the Platform
          </Button>
        </div>

        <p className="ncta-meta">
          Already have an account?{" "}
          <a href={INTAKE_LOGIN_URL} className="ncta-login">
            Log in
          </a>
        </p>
      </div>
    </section>
  );
}

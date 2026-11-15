import Button from "@/components/Button";
import FreeBadge from "@/components/FreeBadge";
import { INTAKE_LOGIN_URL } from "@/lib/constants";
import { REGISTER_LABEL, REGISTER_URL } from "@/lib/registration";

/**
 * Platform: the closing call to action (DESIGN-13H.2, 13H.3).
 *
 * The page's last beat, on white between the navy Organizations section and
 * the navy footer: a large centred headline, one sentence, the primary
 * registration button (lib/registration.ts) beside the secondary "Explore the
 * Network", and a quiet log-in line. Below it, a stage edge: a horizontal
 * line lit orange at its centre, with soft light rising from it.
 *
 * Buttons match the homepage's (app/(site)/home.css, scoped to .aso-home and
 * loaded only there, so the treatment is reproduced here): the primary is the
 * lit orange with navy text and a sheen on hover; the secondary keeps the
 * homepage's edge-lit border and orange-edge hover, on a light fill for this
 * white surface.
 *
 * Platform only. The shared components/ClosingCta.tsx still closes the About,
 * Network, and Who It's For pages and is unchanged.
 *
 * Destinations: registration and log-in on the intake app (the same URLs as
 * the navigation's Create Org and Log In), and /network.
 *
 * Styling: app/(site)/platform/platform.css under .platform-cta.
 */
export default function PlatformClosingCta() {
  return (
    <section className="platform-cta relative overflow-hidden bg-white" aria-labelledby="pc-title">
      <div aria-hidden="true" className="pc-light" />
      <div aria-hidden="true" className="pc-edge" />

      <div className="pc-inner relative max-w-6xl mx-auto px-6">
        <h2 id="pc-title" className="pc-title">
          Your operation starts here.
        </h2>
        <p className="pc-body">
          Create your organization on AnchorStage Ops and start bringing your events, resources, and people together.
          Work independently, build your team, and collaborate when the job calls for it.
        </p>

        <div className="pc-actions">
          <Button href={REGISTER_URL} variant="primary" className="pc-cta">
            {REGISTER_LABEL}
            <FreeBadge />
          </Button>
          <Button href="/network" variant="secondary" className="pc-ghost">
            Explore the Network
          </Button>
        </div>

        <p className="pc-meta">
          Already have an account?{" "}
          <a href={INTAKE_LOGIN_URL} className="pc-login">
            Log in
          </a>
        </p>
      </div>
    </section>
  );
}

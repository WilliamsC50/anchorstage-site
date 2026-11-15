import Button from "@/components/Button";
import { INTAKE_LOGIN_URL, INTAKE_REGISTER_URL } from "@/lib/constants";

/**
 * Platform: the closing call to action (DESIGN-13H.2).
 *
 * The page's last beat, on white between the navy Organizations section and
 * the navy footer: a large centred headline, one sentence, the orange
 * "Create Your Organization" button, and a quiet line with the free-to-start
 * reassurance and the log-in link. Below it, a stage edge: a horizontal line
 * lit orange at its centre, with soft light rising from it behind the
 * content. Static: no animation.
 *
 * Platform only. The shared components/ClosingCta.tsx still closes the About,
 * Network, and Who It's For pages and is unchanged.
 *
 * Destinations: registration and log-in on the intake app, from
 * lib/constants (the same URLs as the navigation's Join Free and Log In).
 * Registration gives every new account its own organization.
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
          <Button href={INTAKE_REGISTER_URL} variant="primary">
            Create Your Organization
          </Button>
        </div>

        <p className="pc-meta">
          <span>Free to get started</span>
          <span aria-hidden="true" className="pc-dot">
            ·
          </span>
          <span>
            Already have an account?{" "}
            <a href={INTAKE_LOGIN_URL} className="pc-login">
              Log in
            </a>
          </span>
        </p>
      </div>
    </section>
  );
}

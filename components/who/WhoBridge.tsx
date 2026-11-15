import Button from "@/components/Button";
import FreeBadge from "@/components/FreeBadge";
import { INTAKE_LOGIN_URL } from "@/lib/constants";
import { REGISTER_LABEL, REGISTER_URL } from "@/lib/registration";

/**
 * Who It's For: the page's one pre-footer (DESIGN-15B.2; consolidated with
 * the call to action in DESIGN-15B.3, which removed the separate white "Join
 * free" section).
 *
 * After the six profession scenes: the approved headline and sentence, then
 * the actions, as one composition. The treatment matches the Platform and
 * Network pre-footers exactly (components/platform/PlatformClosingCta.tsx,
 * components/network/NetworkClosingCta.tsx; corrected in DESIGN-15B.3, which
 * first shipped a dark variant): a white surface, a navy headline, grey body
 * and log-in line, the lit orange primary with navy text, the white
 * edge-lit secondary, and below them a stage edge (orange at its centre,
 * blue toward the sides) with soft light rising from it, before the navy
 * footer. Destinations are the shared ones: registration and log-in on the
 * intake app (as the navigation's Create Org and Log In) and
 * /platform. Platform's styles load only on /platform, so the treatment is
 * reproduced under .who-bridge, as Network does.
 *
 * No illustration, no controls beyond the links, no motion except the
 * primary's hover sheen (off under reduced motion). The headline's sentences
 * wrap as units.
 *
 * Copy is founder approved. It makes no feature claim beyond the organizing
 * role the page already establishes: jobs (events), people (crew roster,
 * crew calls), gear (inventory), and business operations (quotes, invoices,
 * recorded payments, marketing links) are all verified live; see the notes
 * beside the role data in app/(site)/who-its-for/page.tsx.
 *
 * Styling: app/(site)/who-its-for/who.css under .who-bridge.
 */
export default function WhoBridge() {
  return (
    <section className="who-bridge" aria-labelledby="who-bridge-title">
      <div aria-hidden="true" className="wb-light" />
      <div aria-hidden="true" className="wb-edge" />

      <div className="wb-inner">
        <span aria-hidden="true" className="wb-rule" />
        <h2 id="who-bridge-title" className="wb-title">
          <span className="wb-part">One hat. Many hats.</span> <span className="wb-part wb-part-strong">One place to run it all.</span>
        </h2>
        <p className="wb-body">
          Whatever your role in live events, AnchorStage Ops brings your jobs, people, gear, and business operations
          together so you can spend less time managing the details and more time doing the work.
        </p>

        <div className="wb-actions">
          <Button href={REGISTER_URL} variant="primary" className="wb-cta">
            {REGISTER_LABEL}
            <FreeBadge />
          </Button>
          <Button href="/platform" variant="secondary" className="wb-ghost">
            Explore the Platform
          </Button>
        </div>

        <p className="wb-meta">
          Already have an account?{" "}
          <a href={INTAKE_LOGIN_URL} className="wb-login">
            Log in
          </a>
        </p>
      </div>
    </section>
  );
}

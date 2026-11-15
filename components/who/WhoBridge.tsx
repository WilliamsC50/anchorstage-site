import Button from "@/components/Button";
import { INTAKE_LOGIN_URL, INTAKE_REGISTER_URL } from "@/lib/constants";

/**
 * Who It's For: the page's one pre-footer (DESIGN-15B.2; consolidated with
 * the call to action in DESIGN-15B.3, which removed the separate white "Join
 * free" section).
 *
 * After the six profession scenes: the approved headline and sentence, then
 * the actions, as one composition on the showcase's dark stage atmosphere. A
 * faint wash of stage light from above; below the actions a lit stage edge
 * (orange at its centre, cool blue toward the sides, light rising from it),
 * and the background deepening to the footer's navy so the page runs
 * straight into the footer.
 *
 * Actions follow the Platform pre-footer (components/platform/
 * PlatformClosingCta.tsx): the lit orange primary with navy text, the
 * edge-lit secondary (here on dark, as on the homepage), and a quiet log-in
 * line. Destinations are the shared ones: registration and log-in on the
 * intake app (lib/constants, as the navigation's Join Free and Log In) and
 * /platform. Platform's and the homepage's styles load only on those pages,
 * so the treatment is reproduced under .who-bridge (Network did the same).
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
          <Button href={INTAKE_REGISTER_URL} variant="primary" className="wb-cta">
            Create Your Organization
          </Button>
          <Button href="/platform" variant="outline" className="wb-ghost">
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

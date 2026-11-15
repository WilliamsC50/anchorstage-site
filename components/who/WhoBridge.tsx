/**
 * Who It's For: the bridge after the six profession scenes (DESIGN-15B.2).
 *
 * A short conclusion that brings the six stories together and leads to the
 * closing call to action. It replaces "What everyone shares". It continues
 * the showcase's dark stage atmosphere: a faint wash of stage light from
 * above, the headline centred, one sentence, and a lit stage edge along the
 * bottom (an orange line brightest at its centre, with soft light rising
 * from it) where the page turns to the closing section.
 *
 * Deliberately simple: no illustration, no controls, no feature list, no
 * motion. The headline's sentences wrap as units, so lines break between
 * sentences.
 *
 * Copy is founder approved (DESIGN-15B.2). It makes no feature claim beyond
 * the organizing role the page already establishes: jobs (events), people
 * (crew roster, crew calls), gear (inventory), and business operations
 * (quotes, invoices, recorded payments, marketing links) are all verified
 * live; see the notes beside the role data in app/(site)/who-its-for/page.tsx.
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
          together—so you can spend less time managing the details and more time doing the work.
        </p>
      </div>
    </section>
  );
}

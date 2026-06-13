import type { Metadata } from "next";
import PolicyPageLayout from "@/components/PolicyPageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions governing services provided by AnchorStage Operations LLC.",
};

export default function TermsPage() {
  return (
    <PolicyPageLayout title="Terms & Conditions" effectiveDate="June 2026">
      <h2>1. Acceptance</h2>
      <p>
        Acceptance of any quote, proposal, invoice, work order, or service provided by
        AnchorStage Operations LLC (&ldquo;ASO&rdquo;) constitutes acceptance of these
        Terms &amp; Conditions.
      </p>

      <h2>2. Services</h2>
      <p>
        ASO provides live audio production, sound engineering, event production support,
        corporate AV services, equipment rental coordination, stage rental coordination,
        and related event services.
      </p>
      <p>
        Services are limited to those specifically identified in the accepted quote or
        proposal.
      </p>

      <h2>3. Payment Terms</h2>
      <p>
        Payment is due no later than the conclusion of the event unless otherwise stated
        on the quote or invoice.
      </p>
      <p>Approved clients may be granted alternate payment terms in writing.</p>
      <p>
        Past due invoices may be subject to reasonable collection costs and legal fees
        where permitted by law.
      </p>

      <h2>4. Deposits</h2>
      <p>ASO may require deposits at its discretion.</p>
      <p>
        Any required deposit amount will be identified in the applicable quote or
        proposal.
      </p>

      <h2>5. Cancellation</h2>

      <h3>More than Seven (7) Days Before the Event</h3>
      <p>
        Client shall receive a full refund of any deposit, less documented
        non-recoverable expenses already incurred by ASO.
      </p>

      <h3>Between Twenty-Four (24) Hours and Seven (7) Days Before the Event</h3>
      <p>
        Client shall be responsible for documented non-recoverable expenses plus
        twenty-five percent (25%) of contracted services.
      </p>

      <h3>Less than Twenty-Four (24) Hours Before the Event</h3>
      <p>
        Client shall be responsible for documented non-recoverable expenses plus fifty
        percent (50%) of contracted services.
      </p>

      <p>
        Equipment, staging, transportation, labor, and third-party services secured
        specifically for an event may become non-recoverable once committed.
      </p>

      <h2>6. Client Responsibilities</h2>
      <p>Client is responsible for:</p>
      <ul>
        <li>Providing venue access</li>
        <li>Providing adequate electrical power</li>
        <li>Obtaining required permits and approvals</li>
        <li>Providing a reasonably safe working environment</li>
        <li>Providing reasonable load-in and load-out access</li>
        <li>Providing security when required by the nature of the event</li>
      </ul>

      <h2>7. Equipment Damage, Loss, and Theft</h2>
      <p>
        Client is responsible for loss, theft, destruction, or damage to equipment
        caused by Client, attendees, performers, venue personnel, contractors engaged by
        Client, or other parties under Client&apos;s control.
      </p>
      <p>
        This responsibility applies to equipment owned, leased, rented, borrowed, or
        otherwise provided by ASO as part of the event.
      </p>
      <p>
        Repair, replacement, rental replacement, transportation, labor, and related
        costs resulting from such loss or damage may be invoiced to Client.
      </p>
      <p>
        Client shall not be responsible for ordinary wear and tear or equipment failures
        resulting from normal operation.
      </p>

      <h2>8. Weather and Force Majeure</h2>
      <p>Outdoor events are subject to weather and conditions beyond ASO&apos;s control.</p>
      <p>
        ASO shall not be liable for delays, interruptions, cancellations, or performance
        impacts caused by weather, acts of God, government actions, utility failures,
        venue restrictions, labor disruptions, or other circumstances beyond ASO&apos;s
        reasonable control.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, ASO&apos;s total liability shall not
        exceed the amount paid by Client for the services giving rise to the claim.
      </p>
      <p>
        ASO shall not be liable for indirect, incidental, special, consequential, or
        lost-profit damages.
      </p>

      <h2>10. Event Performance</h2>
      <p>
        Client acknowledges that live events involve variables outside ASO&apos;s
        control, including venue conditions, performer conduct, audience behavior,
        weather, power quality, and other operational factors.
      </p>
      <p>
        ASO agrees to provide services in a professional manner but does not guarantee
        any specific event outcome.
      </p>

      <h2>11. Media and Promotional Use</h2>
      <p>
        Unless otherwise agreed in writing, ASO may photograph or record public portions
        of events and use such media for portfolio, promotional, marketing, and business
        purposes.
      </p>
      <p>Separate media releases may be required when applicable.</p>

      <h2>12. Governing Law</h2>
      <p>These Terms &amp; Conditions shall be governed by the laws of the State of Florida.</p>

      <h2>13. Modifications</h2>
      <p>
        ASO reserves the right to update these Terms &amp; Conditions. The version in
        effect on the date a quote or proposal is accepted shall govern that engagement.
      </p>
    </PolicyPageLayout>
  );
}

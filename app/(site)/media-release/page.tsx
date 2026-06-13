import type { Metadata } from "next";
import PolicyPageLayout from "@/components/PolicyPageLayout";

export const metadata: Metadata = {
  title: "Media Release, Recording Consent & Liability Agreement",
  description:
    "Media Release, Recording Consent & Liability Agreement for AnchorStage Operations LLC events.",
};

export default function MediaReleasePage() {
  return (
    <PolicyPageLayout title="Media Release, Recording Consent & Liability Agreement">
      <h2>1. Recording Consent</h2>
      <p>
        I hereby grant AnchorStage Operations (&ldquo;Company&rdquo;) permission to
        photograph, audio record, and video record me during events, performances,
        rehearsals, and related activities.
      </p>

      <h2>2. Grant of Rights</h2>
      <p>
        I grant the Company a perpetual, worldwide, irrevocable, royalty-free license to
        record, reproduce, edit, modify, distribute, and publicly display my image,
        likeness, voice, and performance for commercial, promotional, marketing, and
        business purposes.
      </p>

      <h2>3. Compensation</h2>
      <p>
        I understand that I will receive no compensation unless otherwise agreed in
        writing.
      </p>

      <h2>4. No Expectation of Privacy</h2>
      <p>
        I acknowledge that recording may occur in public or semi-public environments and
        waive any expectation of privacy.
      </p>

      <h2>5. Content Control</h2>
      <p>The Company retains full editorial control over all recordings.</p>

      <h2>6. Liability Waiver</h2>
      <p>I release AnchorStage Operations from any claims arising from use of recorded media.</p>

      <h2>7. Confidentiality</h2>
      <p>I agree not to disclose internal production methods or business-sensitive information.</p>

      <h2>8. Ownership</h2>
      <p>All recordings are the sole property of AnchorStage Operations.</p>

      <h2>9. Music Responsibility</h2>
      <p>I confirm I have rights to perform all material.</p>

      <h2>10. Age Confirmation</h2>
      <p>18+ / Under 18 guardian required.</p>
    </PolicyPageLayout>
  );
}

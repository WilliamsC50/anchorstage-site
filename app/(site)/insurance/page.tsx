import type { Metadata } from "next";
import PolicyPageLayout from "@/components/PolicyPageLayout";

export const metadata: Metadata = {
  title: "Insurance & Compliance",
  description:
    "Insurance coverage and compliance information for AnchorStage Operations LLC, including Certificate of Insurance.",
};

export default function InsurancePage() {
  return (
    <PolicyPageLayout title="Insurance & Compliance">
      <p>
        AnchorStage Operations LLC maintains active commercial general liability
        insurance coverage.
      </p>

      <h2>Coverage Limits</h2>
      <ul>
        <li>$1,000,000 Each Occurrence</li>
        <li>$2,000,000 General Aggregate</li>
        <li>$2,000,000 Products &amp; Completed Operations Aggregate</li>
        <li>$100,000 Damage to Rented Premises</li>
        <li>$15,000 Medical Expense Limit</li>
      </ul>

      <h2>Policy Effective</h2>
      <p>06/12/2026 – 06/12/2027</p>

      <p>
        Additional insured certificates and venue-specific Certificates of Insurance are
        available upon request.
      </p>

      <p>
        For insurance documentation requests:{" "}
        <a href="mailto:contact@anchorstageops.com">contact@anchorstageops.com</a>
      </p>

      <p>
        <a
          href="/Documents/ASO_COI.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-lg font-medium transition hover:opacity-90"
          style={{ backgroundColor: "var(--aso-orange)", color: "#fff", textDecoration: "none" }}
        >
          View Certificate of Insurance
        </a>
      </p>
    </PolicyPageLayout>
  );
}

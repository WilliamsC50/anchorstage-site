import type { Metadata } from "next";
import PolicyPageLayout from "@/components/PolicyPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy describing how AnchorStage Operations LLC collects, uses, and protects information.",
};

export default function PrivacyPage() {
  return (
    <PolicyPageLayout title="Privacy Policy" effectiveDate="June 2026">
      <h2>1. Introduction</h2>
      <p>
        AnchorStage Operations LLC (&ldquo;ASO&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;,
        or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the
        information you choose to share with us.
      </p>
      <p>
        This Privacy Policy explains what information we collect, how we use it, and the
        choices available to you.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect information that you voluntarily provide, including:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Company or organization name</li>
        <li>Event details</li>
        <li>Project requirements</li>
        <li>
          Information submitted through contact forms, intake forms, quote requests,
          event inquiries, or other communications
        </li>
      </ul>
      <p>
        We may also collect limited technical information such as browser type, device
        type, IP address, referral source, and website usage information through website
        analytics and hosting services.
      </p>

      <h2>3. How We Use Information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Respond to inquiries</li>
        <li>Prepare quotes and proposals</li>
        <li>Provide services</li>
        <li>Manage projects and events</li>
        <li>Issue invoices and collect payments</li>
        <li>Improve our website and services</li>
        <li>Communicate with clients and prospective clients</li>
        <li>Maintain business records</li>
      </ul>

      <h2>4. Information Sharing</h2>
      <p>ASO does not sell personal information.</p>
      <p>
        Information may be shared with trusted service providers when necessary to
        operate our business, including:
      </p>
      <ul>
        <li>Website hosting providers</li>
        <li>Email providers</li>
        <li>Analytics providers</li>
        <li>Payment processors</li>
        <li>Accounting and bookkeeping services</li>
        <li>Event-related vendors when required to fulfill a client&apos;s project</li>
      </ul>
      <p>
        Information is shared only as reasonably necessary to provide services, operate
        our business, or comply with legal obligations.
      </p>

      <h2>5. Information Storage</h2>
      <p>
        Information submitted through our website, intake forms, quote requests, event
        management systems, and related business tools may be stored electronically
        using third-party service providers utilized by ASO.
      </p>
      <p>
        ASO takes reasonable steps to ensure information is handled securely and only
        used for legitimate business purposes.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain information for as long as reasonably necessary to provide services,
        maintain business records, comply with legal obligations, resolve disputes, and
        enforce agreements.
      </p>

      <h2>7. Security</h2>
      <p>
        ASO takes reasonable measures to protect information from unauthorized access,
        disclosure, alteration, or destruction.
      </p>
      <p>
        However, no method of electronic storage or transmission can be guaranteed to be
        completely secure.
      </p>

      <h2>8. Cookies and Analytics</h2>
      <p>
        Our website may use cookies, Google Analytics, Vercel Analytics, and similar
        technologies to understand website traffic, improve performance, and better
        understand how visitors interact with our website.
      </p>
      <p>Users may manage cookie preferences through their browser settings.</p>

      <h2>9. Photography and Event Media</h2>
      <p>
        ASO may photograph, audio record, or video record public events, performances,
        rehearsals, and related activities as part of normal business operations.
      </p>
      <p>
        Such recordings may include attendees, performers, participants, vendors, and
        other individuals present in public or semi-public event spaces.
      </p>
      <p>
        Where practical, ASO will consider reasonable requests regarding the removal of
        specific images from future marketing materials, but cannot guarantee removal
        from all previously published content.
      </p>
      <p>Separate media release agreements may be used when appropriate.</p>

      <h2>10. Children&apos;s Privacy</h2>
      <p>
        ASO does not knowingly collect personal information from children through its
        website, contact forms, intake systems, or business operations.
      </p>
      <p>
        However, photographs and recordings captured during public events may
        incidentally include minors who are present as attendees, performers,
        participants, or spectators.
      </p>

      <h2>11. Third-Party Links</h2>
      <p>Our website may contain links to third-party websites or services.</p>
      <p>
        ASO is not responsible for the privacy practices, security, or content of
        third-party websites.
      </p>

      <h2>12. Your Rights</h2>
      <p>
        Depending on applicable laws, you may have the right to request access to,
        correction of, or deletion of personal information maintained by ASO.
      </p>
      <p>Requests may be submitted using the contact information below.</p>

      <h2>13. Changes to This Policy</h2>
      <p>ASO may update this Privacy Policy from time to time.</p>
      <p>The version published on this website shall be considered the current version.</p>

      <h2>14. Contact Information</h2>
      <p>Questions regarding this Privacy Policy may be directed to:</p>
      <p>AnchorStage Operations LLC</p>
      <p>
        Email: <a href="mailto:contact@anchorstageops.com">contact@anchorstageops.com</a>
      </p>
      <p>
        Website: <a href="https://anchorstageops.com">https://anchorstageops.com</a>
      </p>
    </PolicyPageLayout>
  );
}

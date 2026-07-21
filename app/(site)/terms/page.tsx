import type { Metadata } from "next";
import PolicyPageLayout from "@/components/PolicyPageLayout";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing use of the AnchorStage Operations platform and professional network for the live event industry.",
};

export default function TermsPage() {
  return (
    <PolicyPageLayout title="Terms of Service" effectiveDate="July 2026">
      <h2>1. Acceptance</h2>
      <p>
        These Terms of Service govern use of the AnchorStage Operations LLC
        (&ldquo;ASO&rdquo;) platform. By creating an account or using the platform, you
        accept these Terms. If you do not agree, do not use ASO.
      </p>

      <h2>2. The Platform</h2>
      <p>
        ASO is a software platform, a professional network, and an operations platform
        built for the live event industry. It gives organizations one place to run their
        operations and to connect that work to the organizations they do it with.
      </p>
      <p>
        ASO is not a production company, an equipment rental company, a staging company, an
        audio company, an engineering company, or an event contractor. ASO provides
        software. It does not produce events.
      </p>

      <h2>3. Accounts</h2>
      <p>
        Users are responsible for providing accurate account information, keeping their
        login credentials secure, and for the activity that takes place under their
        account. Notify ASO promptly if you believe your account has been used without your
        permission.
      </p>

      <h2>4. Organizations</h2>
      <p>
        Work on ASO is represented through an organization. An organization may be a single
        professional or a company with a full team. The organization owns the operational
        information it creates and keeps that information as members and events come and go.
      </p>

      <h2>5. Organization Administrators</h2>
      <p>
        Organization owners and administrators control membership, roles, and permissions
        for their organization. They decide who can access the organization&apos;s records
        and what the organization shares with others. Administrators are responsible for
        managing that access appropriately.
      </p>

      <h2>6. User Responsibilities</h2>
      <p>Users agree to:</p>
      <ul>
        <li>Provide accurate information and keep it current</li>
        <li>Use ASO in a lawful manner</li>
        <li>Respect the access and permissions set by their organization</li>
        <li>Only upload content they have the right to use</li>
      </ul>

      <h2>7. Connected Organizations</h2>
      <p>
        ASO lets organizations work together on shared events. Collaboration is optional.
        You control what your organization shares, and ASO does not expose your
        organization&apos;s information to other organizations on its own. When you choose
        to connect with another organization, you are responsible for what you share with
        them.
      </p>

      <h2>8. Acceptable Use</h2>
      <p>Users agree not to:</p>
      <ul>
        <li>Use ASO for any unlawful purpose</li>
        <li>Attempt to access accounts, organizations, or data without authorization</li>
        <li>Interfere with, disrupt, or attempt to compromise the platform</li>
        <li>Upload malicious code or content that infringes the rights of others</li>
        <li>Misuse information belonging to other Users or organizations</li>
      </ul>

      <h2>9. Platform Ownership</h2>
      <p>
        ASO owns the platform, including the software, branding, product design, and
        operational architecture. These Terms do not grant Users any ownership of the
        platform or its underlying technology.
      </p>

      <h2>10. User Content</h2>
      <p>
        Users and their organizations retain ownership of the operational information and
        files they create and upload. By using ASO, you grant ASO the limited rights needed
        to host, process, and display that content so the platform can operate for you and
        for the organizations you choose to work with.
      </p>

      <h2>11. Platform Maturity</h2>
      <p>
        ASO is an actively developed platform. Features may change, improve, or be replaced
        as the product grows. The goal is continual improvement while minimizing disruption
        to established workflows. Some capabilities described across the ASO website reflect
        direction rather than features that exist today.
      </p>

      <h2>12. Professional Responsibility</h2>
      <p>
        ASO provides tools to organize and manage operations. Users remain responsible for
        their events, their organizations, their staffing, their logistics, their
        compliance, their financial decisions, and their operational decisions. The
        platform assists with this work. It does not replace professional judgment.
      </p>

      <h2>13. Payments</h2>
      <p>ASO is free to use during active development.</p>
      <p>
        If paid services are introduced in the future, these Terms will be updated before
        those services become available.
      </p>

      <h2>14. Suspension</h2>
      <p>
        ASO may suspend access to an account or organization that violates these Terms or
        that puts the security or integrity of the platform at risk.
      </p>

      <h2>15. Termination</h2>
      <p>
        Users may stop using ASO and close their account at any time. ASO may terminate
        access for violations of these Terms. Requests regarding information after
        termination are handled as described in the Privacy Policy.
      </p>

      <h2>16. Disclaimers</h2>
      <p>
        ASO is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. ASO
        does not guarantee business outcomes, successful events, bookings, revenue, the
        performance of third parties, or operational success. ASO does not warrant that the
        platform will be uninterrupted or free of errors.
      </p>

      <h2>17. Limitation of Liability</h2>
      <p>
        ASO provides software. Organizations remain responsible for how they use the
        platform and for the decisions they make with it. To the maximum extent permitted
        by law, ASO is not liable for indirect, incidental, special, consequential, or
        lost-profit damages arising from the use of the platform.
      </p>

      <h2>18. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the State of Florida, where AnchorStage
        Operations LLC is based.
      </p>

      <h2>19. Changes</h2>
      <p>
        ASO may update these Terms from time to time. The version published on this website
        is considered the current version, and continued use of the platform means you
        accept the current Terms.
      </p>

      <h2>20. Contact</h2>
      <p>Questions regarding these Terms may be directed to:</p>
      <p>AnchorStage Operations LLC</p>
      <p>
        Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        Website: <a href="https://anchorstageops.com">https://anchorstageops.com</a>
      </p>
    </PolicyPageLayout>
  );
}

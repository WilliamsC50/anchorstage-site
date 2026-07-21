import type { Metadata } from "next";
import PolicyPageLayout from "@/components/PolicyPageLayout";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AnchorStage Operations collects, uses, and protects information on its operations platform and professional network for the live event industry.",
};

export default function PrivacyPage() {
  return (
    <PolicyPageLayout title="Privacy Policy" effectiveDate="July 2026">
      <h2>1. Introduction</h2>
      <p>
        AnchorStage Operations LLC (&ldquo;ASO&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;,
        or &ldquo;us&rdquo;) operates a software platform and professional network built
        for the live event industry. ASO gives organizations one place to run their
        operations and connect that work to the organizations they do it with.
      </p>
      <p>
        This Privacy Policy explains what information the platform uses, why it exists, and
        the choices available to the people and organizations who use ASO. Throughout this
        policy, the people who use the platform are referred to as Users.
      </p>

      <h2>2. Information the Platform Uses</h2>
      <p>
        ASO uses information so organizations can organize work, connect related records,
        and manage operations in one place. Each category below exists for a specific
        reason.
      </p>

      <h3>Account and profile information</h3>
      <p>
        The name, email address, and details a User provides when creating an account.
        This exists so Users can sign in, so their organization can identify them, and so
        ASO can reach them about their account and the service.
      </p>

      <h3>Organizations</h3>
      <p>
        The organization a User creates or joins, along with its name, members, and roles.
        Work on ASO is represented through an organization, so this information defines who
        a User works as and who can access shared records.
      </p>

      <h3>Operational records</h3>
      <p>
        The information organizations create to run their work, including events, clients,
        venues, equipment and inventory, quotes, invoices, tasks, and operational
        documents. This is the core of the platform. It exists so organizations can keep
        the details of their work connected and available instead of scattered across
        tools that do not know about each other.
      </p>

      <h3>Media and uploaded files</h3>
      <p>
        Images, documents, and other files uploaded to the platform. These exist so
        organizations can keep the materials an event needs, such as stage plots,
        marketing assets, and reference documents, with the records they belong to.
      </p>

      <h3>Communications generated through the platform</h3>
      <p>
        Messages, requests, and notifications created while using ASO. These exist so
        organizations can coordinate work and keep a record of what was requested and
        shared.
      </p>

      <h3>Technical logs</h3>
      <p>
        Limited technical information such as IP address, browser and device type, and
        records of actions taken on the platform. This information is required to operate
        ASO, keep accounts secure, diagnose problems, and prevent abuse.
      </p>

      <h2>3. How Information Is Used</h2>
      <p>ASO uses the information above to:</p>
      <ul>
        <li>Operate the platform and keep it available</li>
        <li>Let organizations organize their work and connect related records</li>
        <li>Enable collaboration between organizations that choose to work together</li>
        <li>Keep accounts and information secure</li>
        <li>Respond to questions and provide support</li>
        <li>Communicate with Users about their account and the service</li>
      </ul>

      <h2>4. Data Ownership</h2>
      <p>
        Organizations own the operational information they create inside ASO. This
        includes their events, clients, venues, inventory, documents, and similar records.
        That information belongs to the organization that created it.
      </p>
      <p>
        ASO owns the platform itself, including the software, branding, product design, and
        operational architecture. Using ASO does not transfer any ownership of these to a
        User or organization.
      </p>
      <p>
        ASO may use aggregated and de-identified information to improve the platform,
        understand usage patterns, develop new functionality, and produce general
        operational insights. Information used this way must not identify any individual
        User or organization.
      </p>

      <h2>5. Connected Organizations</h2>
      <p>
        ASO includes a professional network that lets organizations work together on shared
        events. Sharing is always a choice.
      </p>
      <ul>
        <li>Organizations choose what they share, and sharing is not automatic.</li>
        <li>
          Organization owners and administrators control permissions and decide what other
          organizations can see.
        </li>
        <li>ASO facilitates collaboration when organizations choose it.</li>
        <li>
          ASO does not expose an organization&apos;s information to other organizations on
          its own.
        </li>
      </ul>

      <h2>6. Information Sharing</h2>
      <p>ASO does not sell personal information.</p>
      <p>
        ASO relies on service providers, such as hosting and infrastructure providers, to
        operate the platform, and shares only the information necessary for them to perform
        that work. ASO may also disclose information when required to comply with the law or
        to protect the platform and the people who use it.
      </p>

      <h2>7. Cookies</h2>
      <p>
        ASO uses only the cookies and similar tokens necessary to keep Users signed in and
        to operate the platform. ASO does not use advertising cookies or cross-site
        tracking.
      </p>

      <h2>8. Data Retention</h2>
      <p>
        ASO keeps information for as long as a User&apos;s account and organization remain
        active, and as long as needed to operate the platform, meet legal obligations, and
        resolve disputes. Users may request deletion of information as described below.
      </p>

      <h2>9. Security</h2>
      <p>
        ASO takes reasonable measures to protect information from unauthorized access,
        disclosure, alteration, or destruction. No method of electronic storage or
        transmission can be guaranteed to be completely secure.
      </p>

      <h2>10. Your Choices</h2>
      <p>
        Depending on applicable laws, Users may have the right to request access to,
        correction of, or deletion of personal information maintained by ASO. Requests may
        be submitted using the contact information below.
      </p>

      <h2>11. Children&apos;s Privacy</h2>
      <p>
        ASO is built for live event professionals and is not directed to children. ASO does
        not knowingly collect personal information from children.
      </p>

      <h2>12. Payments</h2>
      <p>ASO is free to use during active development.</p>
      <p>
        If paid services are introduced in the future, this Privacy Policy will be updated
        before those services become available.
      </p>

      <h2>13. Changes to This Policy</h2>
      <p>ASO may update this Privacy Policy from time to time.</p>
      <p>The version published on this website is considered the current version.</p>

      <h2>14. Contact Information</h2>
      <p>Questions regarding this Privacy Policy may be directed to:</p>
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

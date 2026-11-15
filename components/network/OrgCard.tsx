/**
 * An illustrative organization card for the Network page.
 *
 * Only the founder-approved example names ("Your Organization", "Northstar
 * Production") appear as text. Any other example organization shows a
 * placeholder bar where its name would be, so nothing reads as a real
 * business. Category and region describe the kind of organization only.
 *
 * Styling: app/(site)/network/network.css under .nw-card.
 */

interface OrgCardProps {
  /** Shown as the name. Omit for an unnamed example organization. */
  name?: string;
  /** A single letter for the monogram; ignored when the name is omitted. */
  mono?: string;
  category: string;
  region?: string;
  services?: string[];
  /** Small status line, e.g. "Published profile". */
  status?: string;
  tone?: "navy" | "blue" | "slate" | "orange";
  className?: string;
}

export default function OrgCard({ name, mono, category, region, services, status, tone = "navy", className = "" }: OrgCardProps) {
  return (
    <div className={`nw-card ${className}`}>
      <div className="nw-card-head">
        <span aria-hidden="true" className={`nw-mono nw-mono-${tone}`}>
          {name ? mono ?? name.charAt(0) : ""}
        </span>
        {name ? (
          <p className="nw-card-name">{name}</p>
        ) : (
          <span className="nw-card-name nw-skel" aria-label="Example organization" role="img" />
        )}
      </div>
      <p className="nw-card-meta">
        <span>{category}</span>
        {region && (
          <>
            <span aria-hidden="true" className="nw-card-dot">
              ·
            </span>
            <span>{region}</span>
          </>
        )}
      </p>
      {services && services.length > 0 && (
        <ul className="nw-card-services" aria-label="Services">
          {services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )}
      {status && <p className="nw-card-status">{status}</p>}
    </div>
  );
}

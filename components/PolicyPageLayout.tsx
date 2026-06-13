import type { ReactNode } from "react";

interface PolicyPageLayoutProps {
  title: string;
  effectiveDate?: string;
  lastUpdated?: string;
  children: ReactNode;
}

export default function PolicyPageLayout({
  title,
  effectiveDate,
  lastUpdated,
  children,
}: PolicyPageLayoutProps) {
  return (
    <main className="legal-page">
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <h1 className="legal-title text-3xl md:text-4xl font-bold mb-3">
          {title}
        </h1>

        {(effectiveDate || lastUpdated) && (
          <div className="legal-meta flex flex-wrap gap-x-6 gap-y-1 text-sm mb-10 pb-6 border-b">
            {effectiveDate && (
              <p>
                <span className="font-medium">Effective Date:</span> {effectiveDate}
              </p>
            )}
            {lastUpdated && (
              <p>
                <span className="font-medium">Last Updated:</span> {lastUpdated}
              </p>
            )}
          </div>
        )}

        <div className="legal-content">{children}</div>
      </section>
    </main>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Retired public marketing routes. All permanent (308) so search engines
    // transfer the legacy URLs and only the five canonical pages stay indexable.
    //
    // Fragments are preserved by the browser: a URL fragment is never sent to
    // the server, and browsers reapply it when the Location header carries none
    // of its own.
    return [
      // Legacy Workstations documentation page.
      { source: "/workstations", destination: "/platform", permanent: true },

      // Audience pages collapsed onto the single Who It's For page.
      { source: "/for-members", destination: "/who-its-for", permanent: true },
      { source: "/for-members/:persona", destination: "/who-its-for", permanent: true },

      // Founder/company page folded into About.
      { source: "/team", destination: "/about", permanent: true },

      // Production-service marketing routes. ASO is not a production company,
      // so these have no canonical replacement in the five-page architecture.
      { source: "/services", destination: "/", permanent: true },
      { source: "/photos", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/insurance", destination: "/", permanent: true },
      { source: "/media-release", destination: "/", permanent: true },

      // No pricing page: membership is free and the CTA carries it.
      { source: "/pricing", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // /workstations moved to /platform as the canonical public route.
      // Permanent (308) so search engines transfer the legacy URL.
      //
      // Fragments are preserved by the browser, not the server: a URL
      // fragment is never sent in the HTTP request, and browsers reapply
      // the original fragment when the redirect's Location header carries
      // none of its own. So /workstations#event lands on /platform#event
      // without any fragment handling here. The page's anchor ids are
      // unchanged by the move (overview, operating-record, event,
      // inventory, marketing, signage, tools, how-it-connects).
      {
        source: "/workstations",
        destination: "/platform",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

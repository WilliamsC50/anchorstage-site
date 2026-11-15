import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SkipLink, { MAIN_CONTENT_ID } from "@/components/SkipLink";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <SkipLink />
      <Nav />
      {/* Skip-link target. scroll-margin clears the sticky header (64px + border). */}
      <div id={MAIN_CONTENT_ID} className="flex-1 scroll-mt-[65px]">
        {children}
      </div>
      <Footer />
    </div>
  );
}

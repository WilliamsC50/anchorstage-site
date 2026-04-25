import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anchorstageops.com"),
  title: "AnchorStage Operations | Live Event Production – Orlando, FL",
  description:
    "Professional live sound, staging, lighting, and event production in Orlando and Central Florida. AnchorStage Operations LLC — stage to strike.",
  openGraph: {
    type: "website",
    url: "https://anchorstageops.com",
    siteName: "AnchorStage Operations",
    title: "AnchorStage Operations | Live Event Production – Orlando, FL",
    description:
      "Professional live sound, staging, lighting, and event production in Orlando and Central Florida.",
    images: [
      {
        url: "/images/hero-stage.jpg",
        width: 1200,
        height: 630,
        alt: "AnchorStage Operations – Live Event Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnchorStage Operations | Live Event Production – Orlando, FL",
    description:
      "Professional live sound, staging, lighting, and event production in Orlando and Central Florida.",
    images: ["/images/hero-stage.jpg"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AnchorStage Operations LLC",
  url: "https://anchorstageops.com",
  telephone: "+1-360-720-8622",
  email: "contact@anchorstageops.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Orlando",
    addressRegion: "FL",
    addressCountry: "US",
  },
  areaServed: ["Orlando", "Central Florida"],
  description:
    "AnchorStage Operations LLC provides professional live sound, staging, lighting, and event production services in Orlando and Central Florida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Runs before paint — applies saved theme class before React hydrates to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}

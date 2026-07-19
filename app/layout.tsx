import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { logoWordmarkPng, ogDefault } from "@/lib/images";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: Regenerate app/favicon.ico from aso-picture-logo.svg as multi-size ICO (16, 32, 48).
export const metadata: Metadata = {
  metadataBase: new URL("https://anchorstageops.com"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: logoWordmarkPng,
  },
  title: "AnchorStage Operations | Connected Operations Platform for Live Events",
  description:
    "A professional network and connected operations platform built for the live event industry. Run your events, gear, documents, and financial records in one place.",
  openGraph: {
    type: "website",
    url: "https://anchorstageops.com",
    siteName: "AnchorStage Operations",
    title: "AnchorStage Operations | Connected Operations Platform for Live Events",
    description:
      "A professional network and connected operations platform built for the live event industry.",
    images: [
      {
        url: ogDefault.src,
        width: ogDefault.width,
        height: ogDefault.height,
        alt: ogDefault.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnchorStage Operations | Connected Operations Platform for Live Events",
    description:
      "A professional network and connected operations platform built for the live event industry.",
    images: [ogDefault.src],
  },
};

const applicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AnchorStage Operations",
  url: "https://anchorstageops.com",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "A professional network and connected operations platform for the live event industry. Organizations run their events, crew, inventory, documents, and financial records on one connected operating record.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "AnchorStage Operations LLC",
    url: "https://anchorstageops.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}

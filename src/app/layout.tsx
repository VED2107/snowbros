import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Nunito,
  Playfair_Display,
  Cormorant_Garamond,
  Press_Start_2P,
} from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { MobileCta } from "@/components/ui/mobile-cta";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Display serif — reserved for hero moments only (.display-serif). Instrument
// Serif is a single-weight high-contrast display face; airy at large sizes.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

/*
  Brand typefaces for client wordmarks in the trust bar — each client's site
  name is set in the client's own font (matched from their live site's CSS),
  not the studio's. Used nowhere else on the site.
*/
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
  style: ["italic"],
});

const pressStart2p = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Software Engineering Studio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder.name, url: site.url }],
  creator: site.founder.name,
  keywords: [
    "SNOWBROS",
    "Software Engineering Studio",
    "Full Stack Development",
    "Next.js",
    "React",
    "SaaS Development",
    "AI Applications",
    "Software Engineer",
    "Ved Chauhan",
    "Cloudflare",
    "Supabase",
    "TypeScript",
    "Developer Tools",
  ],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${site.url}/rss.xml` },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Software Engineering Studio`,
    description: site.description,
    images: [`${site.url}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Software Engineering Studio`,
    description: site.description,
    images: [`${site.url}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#eef2f1",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${nunito.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} ${pressStart2p.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-ink">
        <div className="page-atmosphere" aria-hidden />
        <div className="paper-grain" aria-hidden />
        <CursorGlow />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg focus:outline-2 focus:outline-accent-strong"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <SiteHeader />
          <main id="main" className="relative z-10 flex-1">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
        <MobileCta />
      </body>
    </html>
  );
}

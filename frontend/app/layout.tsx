import type { Metadata } from "next";
import { Caveat, Cormorant_Garamond, Dancing_Script, Great_Vibes, Inter, Satisfy } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import WelcomeIntro from "@/components/WelcomeIntro";
import PageTransition from "@/components/PageTransition";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import ErrorReporter from "@/components/ErrorReporter";
import { CurrencyProvider } from "@/lib/currency";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { mediaUrl } from "@/lib/api";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  subsets: ["latin"],
  weight: "400",
});

const DEFAULT_DESCRIPTION =
  "Kcopi Global: tailor-made Kenya and East Africa safaris across the Maasai Mara, Serengeti, Amboseli and Diani Beach.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kcopi Global Safaris",
    template: "%s | Kcopi Global Safaris",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Kcopi Global Safaris",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: mediaUrl("/static/img/hero-home.jpg"), width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kcopi Global Safaris",
    description: DEFAULT_DESCRIPTION,
    images: [mediaUrl("/static/img/hero-home.jpg")],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${inter.variable} ${caveat.variable} ${dancingScript.variable} ${satisfy.variable}`}
    >
      <body className="antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: SITE_NAME,
            url: SITE_URL,
            logo: mediaUrl("/static/img/logo-icon.png"),
            image: mediaUrl("/static/img/hero-home.jpg"),
            telephone: "+254712261111",
            email: "hello@kcopiglobal.co.ke",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Narok",
              addressCountry: "KE",
            },
            sameAs: [],
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-[var(--color-primary)] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <CurrencyProvider>
          <ScrollToTop />
          <WelcomeIntro />
          <Header />
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppButton />
          <CookieConsent />
          <Analytics />
          <ErrorReporter />
        </CurrencyProvider>
      </body>
    </html>
  );
}

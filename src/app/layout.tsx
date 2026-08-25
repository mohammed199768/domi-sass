import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Manrope,
  IBM_Plex_Sans_Arabic,
  Noto_Sans_Arabic,
} from "next/font/google";
import "@/styles/globals.css";
import "@/styles/app-shell.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import MobileNav from "@/components/MobileNav";
import FloatingActions from "@/components/FloatingActions";
import BrandPreloader from "@/components/BrandPreloader";
import DominaseCursor from "@/components/DominaseCursor";
import { LanguageProvider } from "@/context/LanguageContext";
import JsonLd from "@/components/JsonLd";
import { ConsultationProvider } from "@/components/consultation/ConsultationProvider";
import PwaRegister from "@/components/PwaRegister";
import {
  SITE_URL,
  BRAND,
  META_DEFAULTS,
  SOCIAL_LINKS,
  CONTACT,
} from "@/config/seo";

const bootClassScript = `
(() => {
  const themeStorageKey = "dominase-theme";
  try {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    const theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
  }

  try {
    if (
      window.matchMedia("(min-width: 761px)").matches &&
      window.sessionStorage.getItem("dominase-boot-shown") !== "1"
    ) {
      document.documentElement.classList.add("domi-booting");
    }
  } catch {
    document.documentElement.classList.add("domi-booting");
  }
})();
`;

/* ── Typography system ──────────────────────────────────────────────────────
 * English display  → Space Grotesk  (DOMINASE, headings, technical labels)
 * English body     → Manrope        (paragraphs, buttons, nav, supporting)
 * Arabic display   → IBM Plex Sans Arabic (Arabic headings / strong labels)
 * Arabic body      → Noto Sans Arabic     (Arabic paragraphs / readable text)
 *
 * Exposed as CSS variables; global rules in globals.css route them by
 * element type and text direction.
 */
const enDisplay = Space_Grotesk({
  variable: "--font-en-display",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  preload: false,
});

const enBody = Manrope({
  variable: "--font-en-body",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  preload: false,
});

const arDisplay = IBM_Plex_Sans_Arabic({
  variable: "--font-ar-display",
  subsets: ["arabic"],
  display: "optional",
  weight: "700",
  preload: false,
});

const arBody = Noto_Sans_Arabic({
  variable: "--font-ar-body",
  subsets: ["arabic"],
  // The large Arabic variable file is intentionally not a critical preload.
  // `optional` prioritizes the server-rendered fallback on constrained mobile
  // connections while still using Noto when it is available early or cached.
  display: "optional",
  weight: "variable",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  title: {
    default: META_DEFAULTS.title,
    template: META_DEFAULTS.titleTemplate,
  },
  description: META_DEFAULTS.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: META_DEFAULTS.title,
    description: META_DEFAULTS.description,
    url: SITE_URL,
    siteName: BRAND.siteName,
    type: "website",
    locale: BRAND.locale,
    alternateLocale: [BRAND.localeAlternate],
    images: [{ url: META_DEFAULTS.ogImage, width: 1200, height: 630, alt: "DOMINASE — Software & Digital Products" }],
  },
  twitter: {
    card: "summary_large_image",
    title: META_DEFAULTS.title,
    description: META_DEFAULTS.description,
    images: [META_DEFAULTS.ogImage],
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "DOMINASE",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020403",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootClassScript }} />
      </head>
      <body
        className={`${arDisplay.variable} ${arBody.variable} antialiased`}
      >
        <PwaRegister />
        {/* ── Site-wide structured data (JSON-LD) ── */}
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: BRAND.brandName,
              url: SITE_URL,
              description: META_DEFAULTS.description,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: CONTACT.phone,
                email: CONTACT.email,
                contactType: "customer service",
                availableLanguage: ["English", "Arabic"],
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Amman",
                addressCountry: "JO",
              },
              areaServed: [
                { "@type": "Country", name: "Jordan" },
                { "@type": "Country", name: "Saudi Arabia" },
              ],
              knowsAbout: [
                "Software development",
                "Web development",
                "Custom business systems",
                "Educational platforms",
                "Clinic websites and booking systems",
                "UX/UI design",
                "SEO",
                "CRM and customer journeys",
              ],
              sameAs: [
                SOCIAL_LINKS.github,
                SOCIAL_LINKS.linkedin,
                SOCIAL_LINKS.upwork,
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: BRAND.siteName,
              url: SITE_URL,
              publisher: { "@id": `${SITE_URL}/#organization` },
              inLanguage: BRAND.locale,
            },
          ]}
        />

        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
          storageKey="dominase-theme"
          disableTransitionOnChange
        >
          <LanguageProvider englishFontVariables={`${enDisplay.variable} ${enBody.variable}`}>
            <ConsultationProvider>
              <BrandPreloader />
              <SmoothScroll>
                {children}
                <MobileNav />
              </SmoothScroll>
              <FloatingActions />
              <DominaseCursor />
            </ConsultationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import {
  Space_Grotesk,
  Manrope,
  IBM_Plex_Sans_Arabic,
  Noto_Sans_Arabic,
} from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import MobileNav from "@/components/MobileNav";
import FloatingActions from "@/components/FloatingActions";
import BrandPreloader from "@/components/BrandPreloader";
import DominaseCursor from "@/components/DominaseCursor";
import { LanguageProvider } from "@/context/LanguageContext";
import JsonLd from "@/components/JsonLd";
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
    if (window.sessionStorage.getItem("dominase-boot-shown") !== "1") {
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
  weight: ["400", "500", "600", "700"],
});

const enBody = Manrope({
  variable: "--font-en-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const arDisplay = IBM_Plex_Sans_Arabic({
  variable: "--font-ar-display",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const arBody = Noto_Sans_Arabic({
  variable: "--font-ar-body",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  },
  twitter: {
    card: "summary_large_image",
    title: META_DEFAULTS.title,
    description: META_DEFAULTS.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${enDisplay.variable} ${enBody.variable} ${arDisplay.variable} ${arBody.variable} antialiased`}
      >
        {/* ── Site-wide structured data (JSON-LD) ── */}
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": `${SITE_URL}/#organization`,
              name: BRAND.brandName,
              url: SITE_URL,
              description: META_DEFAULTS.description,
              founder: {
                "@type": "Person",
                name: BRAND.founderName,
              },
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

        <script dangerouslySetInnerHTML={{ __html: bootClassScript }} />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
          storageKey="dominase-theme"
          disableTransitionOnChange
        >
          <LanguageProvider>
            <BrandPreloader />
            <SmoothScroll>
              {children}
              <MobileNav />
            </SmoothScroll>
            <FloatingActions />
            <DominaseCursor />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

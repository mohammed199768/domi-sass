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
import BrandPreloader from "@/components/BrandPreloader";
import { LanguageProvider } from "@/context/LanguageContext";

const bootClassScript = `
(() => {
  const themeStorageKey = "dominase-theme";
  const isHome = window.location.pathname === "/";

  try {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    const theme = isHome || (savedTheme !== "light" && savedTheme !== "dark")
      ? "dark"
      : savedTheme;
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
  metadataBase: new URL("https://www.dominase.art"),
  title: "DOMINASE — Cinematic Websites & Operational Digital Systems",
  description: "Dominase builds cinematic websites, SaaS interfaces, and operational digital systems for businesses that need more than a page.",
  openGraph: {
    title: "DOMINASE — Cinematic Websites & Operational Digital Systems",
    description: "Dominase builds cinematic websites, SaaS interfaces, and operational digital systems for businesses that need more than a page.",
    url: "https://www.dominase.art",
    siteName: "DOMINASE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOMINASE — Cinematic Websites & Operational Digital Systems",
    description: "Dominase builds cinematic websites, SaaS interfaces, and operational digital systems for businesses that need more than a page.",
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
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

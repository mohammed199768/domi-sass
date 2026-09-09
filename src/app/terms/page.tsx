import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { BRAND, SITE_URL } from "@/config/seo";
import LegalPageClient from "@/features/legal/LegalPageClient";
import "@/features/legal/legal.css";

const description =
  "شروط استخدام منصة DOMINASE للأعمال: الحسابات، الاستخدام المصرح، الذكاء الاصطناعي، التكاملات، البيانات، الأمان، والتزامات المستخدم.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | DOMINASE",
    description,
    url: `${SITE_URL}/terms`,
    siteName: BRAND.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | DOMINASE",
    description,
  },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service | DOMINASE",
          url: `${SITE_URL}/terms`,
          datePublished: "2026-09-09",
          dateModified: "2026-09-09",
          isPartOf: { "@id": `${SITE_URL}/#website` },
        }}
      />
      <LegalPageClient kind="terms" />
    </>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { BRAND, SITE_URL } from "@/config/seo";
import LegalPageClient from "@/features/legal/LegalPageClient";
import "@/features/legal/legal.css";

const description =
  "سياسة خصوصية DOMINASE: توضح معالجة بيانات الحساب والأعمال وWhatsApp ومسارات الذكاء الاصطناعي والأمان والاحتفاظ وحقوق الأفراد.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | DOMINASE",
    description,
    url: `${SITE_URL}/privacy`,
    siteName: BRAND.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | DOMINASE",
    description,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy | DOMINASE",
          url: `${SITE_URL}/privacy`,
          datePublished: "2026-09-09",
          dateModified: "2026-09-09",
          isPartOf: { "@id": `${SITE_URL}/#website` },
        }}
      />
      <LegalPageClient kind="privacy" />
    </>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { BRAND, SITE_URL } from "@/config/seo";
import LegalPageClient from "@/features/legal/LegalPageClient";
import "@/features/legal/legal.css";

const description =
  "طريقة طلب حذف المعلومات الشخصية المرتبطة بمنصة DOMINASE أو بوظائف WhatsApp المتصلة، مع توضيح التحقق والنطاق والاستثناءات.";

export const metadata: Metadata = {
  title: "Data Deletion",
  description,
  alternates: { canonical: "/data-deletion" },
  openGraph: {
    title: "Data Deletion | DOMINASE",
    description,
    url: `${SITE_URL}/data-deletion`,
    siteName: BRAND.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Deletion | DOMINASE",
    description,
  },
};

export default function DataDeletionPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Data Deletion | DOMINASE",
          url: `${SITE_URL}/data-deletion`,
          datePublished: "2026-09-09",
          dateModified: "2026-09-09",
          isPartOf: { "@id": `${SITE_URL}/#website` },
        }}
      />
      <LegalPageClient kind="data-deletion" />
    </>
  );
}

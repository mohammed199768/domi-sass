import type { Metadata } from "next";
import DiagnosisLanding from "@/features/diagnosis/components/DiagnosisLanding";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/config/seo";

export const metadata: Metadata = {
  title: "Growth Diagnosis",
  description:
    "A free strategic self-assessment for businesses — evaluate clarity, trust, conversion, follow-up, and digital readiness across clinic, venue, engineering, and general business domains.",
  alternates: {
    canonical: "/diagnosis",
  },
  openGraph: {
    title: "Growth Diagnosis — DOMINASE",
    description:
      "A free strategic self-assessment for businesses — evaluate clarity, trust, conversion, follow-up, and digital readiness.",
    url: `${SITE_URL}/diagnosis`,
    siteName: BRAND.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Diagnosis — DOMINASE",
    description:
      "A free strategic self-assessment for businesses — evaluate clarity, trust, conversion, follow-up, and digital readiness.",
  },
};

export default function DiagnosisPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "DOMINASE Growth Diagnosis",
          url: `${SITE_URL}/diagnosis`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "A free strategic self-assessment tool that evaluates businesses across clarity, trust, conversion, follow-up, and digital readiness.",
          creator: {
            "@type": "Organization",
            name: BRAND.brandName,
            url: SITE_URL,
          },
        }}
      />
      <DiagnosisLanding />
    </>
  );
}

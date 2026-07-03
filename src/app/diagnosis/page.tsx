import type { Metadata } from "next";
import DiagnosisLanding from "@/features/diagnosis/components/DiagnosisLanding";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/config/seo";

export const metadata: Metadata = {
  title: "Growth Diagnosis",
  description:
    "Before building a new website, find where the customer journey leaks. A short, private self-assessment across clarity, trust, conversion, follow-up, and digital readiness for clinics, venues, engineering firms, and other businesses. Runs on your device — no sign-up.",
  alternates: {
    canonical: "/diagnosis",
  },
  openGraph: {
    title: "Growth Diagnosis — DOMINASE",
    description:
      "Before building a new website, find where the customer journey leaks. A short, private self-assessment across clarity, trust, conversion, and follow-up.",
    url: `${SITE_URL}/diagnosis`,
    siteName: BRAND.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Diagnosis — DOMINASE",
    description:
      "Before building a new website, find where the customer journey leaks. A short, private self-assessment that runs locally on your device.",
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
            "A short, private self-assessment taken before building a website — it reveals where the customer journey leaks across clarity, trust, conversion, follow-up, and digital readiness. Runs locally on your device.",
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

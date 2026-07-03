import type { Metadata } from "next";
import WhyUsClient from "@/features/why-us/WhyUsClient";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/config/seo";

export const metadata: Metadata = {
  title: "Why Us?",
  description:
    "DOMINASE builds custom digital systems — not generic templates. A founder-led studio focused on credibility, speed, bilingual thinking, growth, and post-launch support.",
  alternates: {
    canonical: "/why-us",
  },
  openGraph: {
    title: "Why Us? — DOMINASE",
    description:
      "A founder-led digital product studio focused on credibility, speed, bilingual thinking, growth, and post-launch support.",
    url: `${SITE_URL}/why-us`,
    siteName: BRAND.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Us? — DOMINASE",
    description:
      "A founder-led digital product studio focused on credibility, speed, bilingual thinking, growth, and post-launch support.",
  },
};

export default function WhyUsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Why Us? — DOMINASE",
          url: `${SITE_URL}/why-us`,
          description:
            "Why DOMINASE builds custom digital systems, not generic templates. Founder-led, bilingual, with post-launch support.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Why Us?",
                item: `${SITE_URL}/why-us`,
              },
            ],
          },
        }}
      />
      <WhyUsClient />
    </>
  );
}

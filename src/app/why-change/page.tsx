import type { Metadata } from "next";
import WhyChangeClient from "@/features/why-change/WhyChangeClient";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/config/seo";

export const metadata: Metadata = {
  title: "Why Change?",
  description:
    "Standing still is not neutral — a strategic look at how static websites, scattered attention, unclear paths, and weak digital systems create silent loss before customers ever contact you.",
  alternates: {
    canonical: "/why-change",
  },
  openGraph: {
    title: "Why Change? — DOMINASE",
    description:
      "A strategic look at how static websites, scattered attention, and weak digital systems create silent loss before customers ever contact you.",
    url: `${SITE_URL}/why-change`,
    siteName: BRAND.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Change? — DOMINASE",
    description:
      "A strategic look at how static websites, scattered attention, and weak digital systems create silent loss before customers ever contact you.",
  },
};

export default function WhyChangePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Why Change? — DOMINASE",
          url: `${SITE_URL}/why-change`,
          description:
            "A strategic look at how standing still digitally costs clarity, trust, conversion, and follow-up opportunities.",
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
                name: "Why Change?",
                item: `${SITE_URL}/why-change`,
              },
            ],
          },
        }}
      />
      <WhyChangeClient />
    </>
  );
}

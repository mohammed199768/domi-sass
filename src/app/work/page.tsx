import type { Metadata } from "next";
import TransformationTreeClient from "@/features/work/TransformationTreeClient";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/config/seo";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Digital product case studies by DOMINASE — websites, dashboards, booking platforms, and operational systems built around real business friction.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Selected Work — DOMINASE",
    description:
      "Digital product case studies by DOMINASE — websites, dashboards, booking platforms, and operational systems built around real business friction.",
    url: `${SITE_URL}/work`,
    siteName: BRAND.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work — DOMINASE",
    description:
      "Digital product case studies by DOMINASE — websites, dashboards, booking platforms, and operational systems built around real business friction.",
  },
};

export default function WorkIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Selected Work — DOMINASE",
    "description": "Digital product case studies by DOMINASE — websites, dashboards, booking platforms, and operational systems built around real business friction.",
    "url": `${SITE_URL}/work`,
    "isPartOf": { "@id": `${SITE_URL}/#website` },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "url": `${SITE_URL}/work/manal-alhihi`,
          "name": "Manal Alhihi Educational Platform"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "url": `${SITE_URL}/work/qasr-alfarah`,
          "name": "Qasr Al-Farah"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "url": `${SITE_URL}/work/curevie`,
          "name": "Curevie"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "url": `${SITE_URL}/work/horvath-survey`,
          "name": "Horvath Survey"
        }
      ]
    }
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <TransformationTreeClient />
    </>
  );
}

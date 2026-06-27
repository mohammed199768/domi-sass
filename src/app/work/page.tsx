import type { Metadata } from "next";
import TransformationTreeClient from "@/features/work/TransformationTreeClient";

export const metadata: Metadata = {
  title: "Case Studies — DOMINASE",
  description: "A collection of DOMINASE digital product case studies showing how scattered workflows became clearer platforms, dashboards, and digital systems.",
};

export default function WorkIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Case Studies — DOMINASE",
    "description": "A collection of DOMINASE digital product case studies showing how scattered workflows became clearer platforms, dashboards, and digital systems.",
    "url": "https://www.dominase.art/work",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "url": "https://www.dominase.art/work/manal-alhihi",
          "name": "Manal Alhihi Educational Platform"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "url": "https://www.dominase.art/work/qasr-alfarah",
          "name": "Qasr Al-Farah"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "url": "https://www.dominase.art/work/curevie",
          "name": "Curevie"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "url": "https://www.dominase.art/work/horvath-survey",
          "name": "Horvath Survey"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TransformationTreeClient />
    </>
  );
}

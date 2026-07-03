import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { diagnosisRegistry } from "@/data/diagnosis/registry";
import type { DiagnosisSlug } from "@/features/diagnosis/lib/types";
import DiagnosisAssessmentClient from "@/features/diagnosis/components/DiagnosisAssessmentClient";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/config/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(diagnosisRegistry).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = diagnosisRegistry[slug as DiagnosisSlug];
  if (!entry) return {};

  const title = entry.title;
  const description = entry.description;
  const url = `${SITE_URL}/diagnosis/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/diagnosis/${slug}`,
    },
    openGraph: {
      title: `${title} — DOMINASE`,
      description,
      url,
      siteName: BRAND.siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — DOMINASE`,
      description,
    },
  };
}

export default async function DiagnosisSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = diagnosisRegistry[slug as DiagnosisSlug];
  if (!entry) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${entry.title} — DOMINASE`,
          url: `${SITE_URL}/diagnosis/${slug}`,
          description: entry.description,
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
                name: "Diagnosis",
                item: `${SITE_URL}/diagnosis`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: entry.title,
                item: `${SITE_URL}/diagnosis/${slug}`,
              },
            ],
          },
        }}
      />
      <DiagnosisAssessmentClient slug={entry.slug} assessment={entry.data} />
    </>
  );
}

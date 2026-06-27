import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/constants/caseStudies";
import CaseStudyHorizontalJourney from "@/features/case-studies/CaseStudyHorizontalJourney";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};

  return {
    title: study.seo.title,
    description: study.seo.description,
  };
}

export default async function WorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": study.content.en.title || study.content.en.eyebrow,
    "description": study.content.en.positioning,
    "url": `https://www.dominase.art/work/${slug}`,
    "creator": {
      "@type": "Organization",
      "name": "DOMINASE",
      "founder": {
        "@type": "Person",
        "name": "Mohammed Aldomi"
      }
    },
    "keywords": study.visualTheme.replace("-", " ")
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyHorizontalJourney study={study} />
    </>
  );
}

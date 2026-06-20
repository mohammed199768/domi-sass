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
  return <CaseStudyHorizontalJourney study={study} />;
}

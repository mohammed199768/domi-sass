import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { diagnosisRegistry } from "@/data/diagnosis/registry";
import type { DiagnosisSlug } from "@/features/diagnosis/lib/types";
import DiagnosisAssessmentClient from "@/features/diagnosis/components/DiagnosisAssessmentClient";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(diagnosisRegistry).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = diagnosisRegistry[slug as DiagnosisSlug];
  if (!entry) return {};

  return {
    title: `${entry.title} - DOMINASE`,
    description: entry.description,
  };
}

export default async function DiagnosisSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = diagnosisRegistry[slug as DiagnosisSlug];
  if (!entry) notFound();

  return <DiagnosisAssessmentClient slug={entry.slug} assessment={entry.data} />;
}

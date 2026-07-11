import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { diagnosisRegistry } from "@/data/diagnosis/registry";
import { diagnosisRegistryV2 } from "@/data/diagnosis/v2/registry";
import DiagnosisQaClient from "@/features/diagnosis/components/DiagnosisQaClient";
import { isDiagnosisQaEnabled } from "@/features/diagnosis/runtime/engineConfig";

export const metadata: Metadata = { title: "Diagnosis QA", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function DiagnosisQaPage() {
  if (!isDiagnosisQaEnabled()) notFound();
  const v1 = Object.fromEntries(Object.entries(diagnosisRegistry).map(([slug, entry]) => [slug, entry.data]));
  return <DiagnosisQaClient assessments={{ v1, v2: diagnosisRegistryV2 }} />;
}

import type { Metadata } from "next";
import DiagnosisLanding from "@/features/diagnosis/components/DiagnosisLanding";

export const metadata: Metadata = {
  title: "DOMINASE Growth Diagnosis",
  description:
    "A free strategic self-assessment for business clarity, trust, conversion, follow-up, and digital readiness.",
};

export default function DiagnosisPage() {
  return <DiagnosisLanding />;
}

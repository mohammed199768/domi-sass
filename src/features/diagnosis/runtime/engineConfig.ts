import type { DiagnosisDomainSlug, DiagnosisEngineVersion } from "./types";

const envKeys: Record<DiagnosisDomainSlug, string> = {
  clinic: "DIAGNOSIS_ENGINE_CLINIC",
  engineering: "DIAGNOSIS_ENGINE_ENGINEERING",
  "general-business": "DIAGNOSIS_ENGINE_GENERAL_BUSINESS",
  venue: "DIAGNOSIS_ENGINE_VENUE",
};

export function getDiagnosisEngineVersion(slug: DiagnosisDomainSlug, override?: string): DiagnosisEngineVersion {
  if (process.env.NODE_ENV !== "production" && (override === "v1" || override === "v2")) return override;
  const value = process.env[envKeys[slug]];
  if (value === "v1" || value === "v2") return value;
  if (value && process.env.NODE_ENV !== "production") console.warn(`[diagnosis] Invalid ${envKeys[slug]}=${value}; using v1.`);
  return "v1";
}

export function isDiagnosisQaEnabled(): boolean {
  return process.env.DIAGNOSIS_QA_ENABLED === "true";
}

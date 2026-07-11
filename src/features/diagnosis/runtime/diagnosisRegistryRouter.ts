import { diagnosisRegistry } from "@/data/diagnosis/registry";
import { diagnosisRegistryV2 } from "@/data/diagnosis/v2/registry";
import type { DiagnosisAssessment } from "../lib/types";
import type { DiagnosisDomainSlug, DiagnosisEngineVersion } from "./types";

function isValidAssessment(value: DiagnosisAssessment | undefined): value is DiagnosisAssessment {
  return Boolean(value?.meta?.id && value.dimensions?.length && value.scoring?.profiles?.length && value.recommendations?.length);
}

export function getDiagnosisAssessment(slug: DiagnosisDomainSlug, version: DiagnosisEngineVersion): DiagnosisAssessment {
  const v1 = diagnosisRegistry[slug].data;
  if (version === "v1") return v1;
  const v2 = diagnosisRegistryV2[slug];
  if (isValidAssessment(v2)) return v2;
  if (process.env.NODE_ENV !== "production") console.warn(`[diagnosis] Invalid or missing V2 assessment for ${slug}; using v1.`);
  return v1;
}

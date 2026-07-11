import clinic from "./clinic-diagnosis.json";
import engineering from "./engineering-diagnosis.json";
import generalBusiness from "./general-business-diagnosis.json";
import venue from "./venue-diagnosis.json";
import type { DiagnosisAssessment, DiagnosisSlug } from "@/features/diagnosis/lib/types";

export const diagnosisRegistryV2: Record<DiagnosisSlug, DiagnosisAssessment> = {
  clinic: clinic as DiagnosisAssessment,
  engineering: engineering as DiagnosisAssessment,
  "general-business": generalBusiness as DiagnosisAssessment,
  venue: venue as DiagnosisAssessment,
};

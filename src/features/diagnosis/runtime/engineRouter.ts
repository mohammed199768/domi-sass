import type { DiagnosisAnswerMap, DiagnosisAssessment, DiagnosisContextAnswers, DiagnosisResult } from "../lib/types";
import { buildDiagnosisResult } from "../lib/scoring";
import { buildNormalizedDiagnosisResultV2 } from "../v2/resultAdapter";
import type { DiagnosisEngineVersion } from "./types";

export function buildDiagnosisResultForVersion(assessment: DiagnosisAssessment, answers: DiagnosisAnswerMap, context: DiagnosisContextAnswers, version: DiagnosisEngineVersion): DiagnosisResult {
  const result = version === "v2" ? buildNormalizedDiagnosisResultV2(assessment, answers, context) : buildDiagnosisResult(assessment, answers);
  return version === "v1" ? { ...result, engineVersion: "v1" } : result;
}

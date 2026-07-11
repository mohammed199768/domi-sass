import type { DiagnosisAnswerMap, DiagnosisAssessment, DiagnosisContextAnswers, DiagnosisResult, MatchedDiagnosisRecommendation, ReportCategory } from "../lib/types";
import { normalizeSections, reportCategories } from "../lib/localization";
import { scoreAssessment } from "../lib/scoring";
import { buildDiagnosisResultV2 } from "./buildDiagnosisResult";
import type { ProfileV2, RecommendationV2 } from "./types";

const fallbackProfile: ProfileV2 = {
  id: "synthetic-balanced-opportunity",
  title: "Balanced Opportunity Map",
  titleAr: "خريطة فرص متوازنة",
  summary: "Several manageable opportunities are present without one authored pattern dominating.",
  summaryAr: "توجد عدة فرص قابلة للإدارة دون هيمنة نمط مؤلف واحد.",
  riskNote: "Sequence the clearest evidence first.",
  riskNoteAr: "ابدأ بالدليل الأكثر وضوحاً.",
};

function stableHash(value: unknown): string {
  const input = JSON.stringify(value);
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function buildNormalizedDiagnosisResultV2(
  assessment: DiagnosisAssessment,
  answers: DiagnosisAnswerMap,
  context: DiagnosisContextAnswers = {}
): DiagnosisResult {
  const completeAnswers = Object.fromEntries(Object.entries(answers).flatMap(([id, answer]) =>
    typeof answer.current === "number" && typeof answer.target === "number" ? [[id, { current: answer.current, target: answer.target }]] : []
  ));
  const decision = buildDiagnosisResultV2({
    dimensions: assessment.dimensions,
    profiles: assessment.scoring.profiles as unknown as ProfileV2[],
    recommendations: assessment.recommendations as unknown as RecommendationV2[],
    answers: completeAnswers,
    fallbackProfile,
    context,
  });
  const scores = scoreAssessment(assessment, answers);
  const recommendations = decision.selection.selected.map(({ recommendation, evidence }) => ({
    ...recommendation,
    matchedTopicIds: evidence.matchedTopicIds,
    matchedDimensionIds: evidence.matchedDimensionIds,
  })) as MatchedDiagnosisRecommendation[];
  const recommendationsByCategory = Object.fromEntries(reportCategories.map(category => [category, []])) as unknown as DiagnosisResult["recommendationsByCategory"];
  recommendations.forEach(recommendation => recommendationsByCategory[recommendation.category].push(recommendation));
  const projection = {
    profileId: decision.profile.selectedProfile.id,
    recommendationIds: recommendations.map(item => item.id),
    modes: decision.selection.selected.map(item => item.recommendation.mode),
    categories: decision.selection.selected.map(item => item.recommendation.category),
    suppressed: decision.selection.suppressed,
    visibleCategories: decision.selection.visibleCategories,
    scores: decision.scores,
  };
  return {
    assessment,
    profile: decision.profile.selectedProfile as unknown as DiagnosisResult["profile"],
    sections: normalizeSections(assessment.reportTemplates),
    recommendations,
    recommendationsByCategory,
    ...scores,
    engineVersion: "v2",
    debugMeta: {
      engineVersion: "v2",
      profileCandidates: decision.profile.candidates,
      selectedRecommendationIds: recommendations.map(item => item.id),
      suppressedRecommendations: decision.selection.suppressed,
      visibleCategories: decision.selection.visibleCategories as ReportCategory[],
      decisionHash: stableHash(projection),
      rankBreakdown: decision.ranked.map(item => ({ id: item.recommendation.id, rankScore: item.rankScore, scoreBreakdown: item.scoreBreakdown })),
    },
  };
}

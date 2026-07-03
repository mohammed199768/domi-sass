import type {
  DiagnosisAssessment,
  DiagnosisDimensionScore,
  DiagnosisRecommendationCondition,
  DiagnosisTopicScore,
  MatchedDiagnosisRecommendation,
} from "./types";

type ScoreBasis = {
  current: number;
  target: number;
  gap: number;
  topicIds: string[];
  dimensionIds: string[];
};

export function matchRecommendations(
  assessment: DiagnosisAssessment,
  scores: {
    topics: DiagnosisTopicScore[];
    dimensions: DiagnosisDimensionScore[];
  }
): MatchedDiagnosisRecommendation[] {
  return assessment.recommendations
    .map((recommendation) => {
      const basis = getConditionBasis(recommendation.conditions, scores);
      if (!basis || !passesThresholds(basis, recommendation.conditions)) return null;

      return {
        ...recommendation,
        matchedTopicIds: basis.topicIds,
        matchedDimensionIds: basis.dimensionIds,
      };
    })
    .filter((recommendation): recommendation is MatchedDiagnosisRecommendation => Boolean(recommendation))
    .sort((a, b) => b.priority - a.priority);
}

export function getConditionBasis(
  conditions: DiagnosisRecommendationCondition,
  scores: {
    topics: DiagnosisTopicScore[];
    dimensions: DiagnosisDimensionScore[];
  }
): ScoreBasis | null {
  if (conditions.topicId) {
    const topic = scores.topics.find((item) => item.topicId === conditions.topicId || item.topicKey === conditions.topicId);
    return topic ? topicBasis(topic) : null;
  }

  if (conditions.dimensionId) {
    const dimension = scores.dimensions.find(
      (item) => item.dimensionId === conditions.dimensionId || item.dimensionKey === conditions.dimensionId
    );
    return dimension
      ? {
          current: dimension.averageCurrent,
          target: dimension.averageTarget,
          gap: dimension.averageGap,
          topicIds: [],
          dimensionIds: [dimension.dimensionId],
        }
      : null;
  }

  if (conditions.tags?.length) {
    const topics = scores.topics.filter((topic) => conditions.tags?.some((tag) => topic.tags.includes(tag)));
    if (topics.length === 0) return null;

    // Tag rules use practical OR matching: any answered topic with at least
    // one requested tag can match, then thresholds evaluate the strongest gap.
    const strongest = topics.slice().sort((a, b) => b.gap - a.gap)[0];
    return {
      ...topicBasis(strongest),
      topicIds: topics.map((topic) => topic.topicId),
      dimensionIds: Array.from(new Set(topics.map((topic) => topic.dimensionId))),
    };
  }

  return null;
}

export function passesThresholds(basis: ScoreBasis, conditions: DiagnosisRecommendationCondition) {
  if (conditions.currentMin != null && basis.current < conditions.currentMin) return false;
  if (conditions.currentMax != null && basis.current > conditions.currentMax) return false;
  if (conditions.targetMin != null && basis.target < conditions.targetMin) return false;
  if (conditions.targetMax != null && basis.target > conditions.targetMax) return false;
  if (conditions.gapMin != null && basis.gap < conditions.gapMin) return false;
  if (conditions.gapMax != null && basis.gap > conditions.gapMax) return false;
  return true;
}

function topicBasis(topic: DiagnosisTopicScore): ScoreBasis {
  return {
    current: topic.current,
    target: topic.target,
    gap: topic.gap,
    topicIds: [topic.topicId],
    dimensionIds: [topic.dimensionId],
  };
}

import type {
  DiagnosisAnswer,
  DiagnosisAnswerMap,
  DiagnosisAssessment,
  DiagnosisDimensionScore,
  DiagnosisResult,
  DiagnosisTopicScore,
} from "./types";
import { matchProfile } from "./profileMatching";
import { matchRecommendations } from "./recommendationMatching";
import { normalizeSections, reportCategories } from "./localization";

const round1 = (value: number) => Math.round(value * 10) / 10;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function weightedAverage(items: Array<{ value: number; weight: number }>) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight <= 0) return 0;
  return round1(items.reduce((sum, item) => sum + item.value * item.weight, 0) / totalWeight);
}

export function getTopics(assessment: DiagnosisAssessment) {
  return assessment.dimensions
    .slice()
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .flatMap((dimension) =>
      dimension.topics
        .slice()
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((topic) => ({ dimension, topic }))
    );
}

export function scoreAssessment(assessment: DiagnosisAssessment, answers: DiagnosisAnswerMap) {
  const min = assessment.meta.scale.min;
  const max = assessment.meta.scale.max;
  const topicScores: DiagnosisTopicScore[] = [];

  const dimensions: DiagnosisDimensionScore[] = assessment.dimensions
    .slice()
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((dimension) => {
      const scoredTopics: DiagnosisTopicScore[] = dimension.topics
        .slice()
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((topic): DiagnosisTopicScore | null => {
          const answer = answers[topic.id];
          if (!isDiagnosisAnswerComplete(answer)) return null;
          const current = clamp(answer.current, min, max);
          const target = clamp(answer.target, min, max);
          const gap = round1(Math.max(0, target - current));
          const weightedGap = round1(gap * topic.weight);

          return {
            topicId: topic.id,
            topicKey: topic.topicKey,
            dimensionId: dimension.id,
            dimensionKey: dimension.dimensionKey,
            label: topic.label,
            labelAr: topic.labelAr,
            current,
            target,
            gap,
            weightedGap,
            priorityScore: weightedGap,
            tags: topic.tags,
          };
        })
        .filter((score): score is DiagnosisTopicScore => Boolean(score));

      topicScores.push(...scoredTopics);

      const averageCurrent = weightedAverage(scoredTopics.map((score) => ({ value: score.current, weight: findTopicWeight(assessment, score.topicId) })));
      const averageTarget = weightedAverage(scoredTopics.map((score) => ({ value: score.target, weight: findTopicWeight(assessment, score.topicId) })));
      const averageGap = weightedAverage(scoredTopics.map((score) => ({ value: score.gap, weight: findTopicWeight(assessment, score.topicId) })));

      return {
        dimensionId: dimension.id,
        dimensionKey: dimension.dimensionKey,
        title: dimension.title,
        titleAr: dimension.titleAr,
        averageCurrent,
        averageTarget,
        averageGap,
        priorityScore: round1(averageGap * dimension.weight),
        answeredCount: scoredTopics.length,
        totalCount: dimension.topics.length,
      };
    });

  const answeredDimensions = dimensions.filter((dimension) => dimension.answeredCount > 0);
  const averageCurrent = weightedAverage(
    answeredDimensions.map((dimension) => ({
      value: dimension.averageCurrent,
      weight: assessment.dimensions.find((item) => item.id === dimension.dimensionId)?.weight || 1,
    }))
  );
  const averageTarget = weightedAverage(
    answeredDimensions.map((dimension) => ({
      value: dimension.averageTarget,
      weight: assessment.dimensions.find((item) => item.id === dimension.dimensionId)?.weight || 1,
    }))
  );
  const averageGap = round1(Math.max(0, averageTarget - averageCurrent));

  return {
    dimensions,
    topics: topicScores.sort((a, b) => b.priorityScore - a.priorityScore),
    averageCurrent,
    averageTarget,
    averageGap,
    topPriorityDimensions: dimensions.slice().sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 3),
    topTopicGaps: topicScores.slice().sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 3),
  };
}

export function isDiagnosisAnswerComplete(
  answer: DiagnosisAnswerMap[string] | undefined
): answer is DiagnosisAnswer & { current: number; target: number; currentTouched: true; targetTouched: true } {
  return Boolean(
    answer &&
      answer.currentTouched &&
      answer.targetTouched &&
      typeof answer.current === "number" &&
      typeof answer.target === "number"
  );
}

export function buildDiagnosisResult(assessment: DiagnosisAssessment, answers: DiagnosisAnswerMap): DiagnosisResult {
  const scores = scoreAssessment(assessment, answers);
  const sections = normalizeSections(assessment.reportTemplates);
  const profile = matchProfile(assessment, scores);
  const recommendations = matchRecommendations(assessment, scores);
  const recommendationsByCategory = Object.fromEntries(reportCategories.map((category) => [category, []])) as unknown as DiagnosisResult["recommendationsByCategory"];

  recommendations.forEach((recommendation) => {
    recommendationsByCategory[recommendation.category].push(recommendation);
  });

  reportCategories.forEach((category) => {
    if (recommendationsByCategory[category].length > 0) return;
    const section = sections[category];
    recommendationsByCategory[category].push({
      id: `fallback-${category}`,
      title: section.title,
      titleAr: section.titleAr,
      category,
      conditions: {},
      priority: 0,
      why: section.fallback || section.purpose || "No urgent recommendation matched this area.",
      whyAr: section.fallbackAr || section.purposeAr,
      how: section.fallback || section.purpose || "Keep this area under review as your digital system matures.",
      howAr: section.fallbackAr || section.purposeAr,
      matchedTopicIds: [],
      matchedDimensionIds: [],
    });
  });

  return {
    assessment,
    profile,
    sections,
    recommendations,
    recommendationsByCategory,
    ...scores,
  };
}

function findTopicWeight(assessment: DiagnosisAssessment, topicId: string) {
  for (const dimension of assessment.dimensions) {
    const topic = dimension.topics.find((item) => item.id === topicId);
    if (topic) return topic.weight;
  }
  return 1;
}

import type {
  DiagnosisAssessment,
  DiagnosisDimensionScore,
  DiagnosisProfile,
  DiagnosisProfileCondition,
  DiagnosisTopicScore,
} from "./types";
import { getConditionBasis, passesThresholds } from "./recommendationMatching";

const fallbackProfile: DiagnosisProfile = {
  id: "balanced-opportunity-map",
  title: "Balanced Opportunity Map",
  titleAr: "خريطة فرص متوازنة",
  summary: "Your results point to several manageable opportunities rather than one single urgent problem.",
  summaryAr: "تشير نتيجتك إلى عدة فرص قابلة للإدارة بدلا من مشكلة واحدة طارئة.",
  conditions: {},
};

export function matchProfile(
  assessment: DiagnosisAssessment,
  scores: {
    topics: DiagnosisTopicScore[];
    dimensions: DiagnosisDimensionScore[];
  }
) {
  return assessment.scoring.profiles.find((profile) => matchesProfile(profile, scores)) || fallbackProfile;
}

function matchesProfile(
  profile: DiagnosisProfile,
  scores: {
    topics: DiagnosisTopicScore[];
    dimensions: DiagnosisDimensionScore[];
  }
) {
  const conditions = Array.isArray(profile.conditions) ? profile.conditions : [profile.conditions];
  if (conditions.length === 0) return false;
  return conditions.every((condition) => matchesCondition(condition, scores));
}

function matchesCondition(
  condition: DiagnosisProfileCondition,
  scores: {
    topics: DiagnosisTopicScore[];
    dimensions: DiagnosisDimensionScore[];
  }
) {
  if (!matchesMapConditions(condition, scores)) return false;

  const normalized = {
    ...condition,
    tags: condition.tags || (condition.tag ? [condition.tag] : undefined),
  };
  const hasDirectBasis = normalized.topicId || normalized.dimensionId || normalized.tags?.length;
  if (!hasDirectBasis) return true;

  const basis = getConditionBasis(normalized, scores);
  return Boolean(basis && passesThresholds(basis, normalized));
}

function matchesMapConditions(
  condition: DiagnosisProfileCondition,
  scores: {
    topics: DiagnosisTopicScore[];
    dimensions: DiagnosisDimensionScore[];
  }
) {
  for (const [dimensionRef, min] of Object.entries(condition.dimensionMin || {})) {
    const score = getDimension(scores.dimensions, dimensionRef)?.averageCurrent;
    if (score == null || score < min) return false;
  }

  for (const [dimensionRef, max] of Object.entries(condition.dimensionMax || {})) {
    const score = getDimension(scores.dimensions, dimensionRef)?.averageCurrent;
    if (score == null || score > max) return false;
  }

  for (const [topicRef, min] of Object.entries(condition.topicMin || {})) {
    const score = getTopic(scores.topics, topicRef)?.current;
    if (score == null || score < min) return false;
  }

  for (const [topicRef, max] of Object.entries(condition.topicMax || {})) {
    const score = getTopic(scores.topics, topicRef)?.current;
    if (score == null || score > max) return false;
  }

  for (const [tag, min] of Object.entries(condition.tagMin || {})) {
    const score = getTagAverage(scores.topics, tag);
    if (score == null || score < min) return false;
  }

  for (const [tag, max] of Object.entries(condition.tagMax || {})) {
    const score = getTagAverage(scores.topics, tag);
    if (score == null || score > max) return false;
  }

  return true;
}

function getDimension(dimensions: DiagnosisDimensionScore[], ref: string) {
  return dimensions.find((dimension) => dimension.dimensionId === ref || dimension.dimensionKey === ref);
}

function getTopic(topics: DiagnosisTopicScore[], ref: string) {
  return topics.find((topic) => topic.topicId === ref || topic.topicKey === ref);
}

function getTagAverage(topics: DiagnosisTopicScore[], tag: string) {
  const taggedTopics = topics.filter((topic) => topic.tags.includes(tag));
  if (taggedTopics.length === 0) return null;
  return Math.round((taggedTopics.reduce((sum, topic) => sum + topic.current, 0) / taggedTopics.length) * 10) / 10;
}

export type DiagnosisSlug = "clinic" | "venue" | "engineering" | "general-business";

export type ReportCategory =
  | "strategicDiagnosis"
  | "customerProfile"
  | "websiteStructure"
  | "conversionPath"
  | "contentAndTrust"
  | "salesFollowUp"
  | "quickWins"
  | "dominaseNextStep";

export type DiagnosisContextFieldType = "text" | "select" | "textarea";

export interface DiagnosisMeta {
  id: string;
  version: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr?: string;
  disclaimer: string;
  disclaimerAr?: string;
  scale: {
    min: number;
    max: number;
    step: number;
  };
  domain: string;
  domainAr?: string;
  estimatedMinutes?: number;
  sourceNote?: string;
  ethicsNote?: string;
}

export interface DiagnosisContextField {
  id: string;
  label: string;
  labelAr?: string;
  type: DiagnosisContextFieldType | string;
  required?: boolean;
  options?: string[];
  optionsAr?: string[];
  whyNeeded?: string;
  whyNeededAr?: string;
  reportUse?: string;
}

export interface DiagnosisContextForm {
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  fields: DiagnosisContextField[];
}

export interface DiagnosisTopic {
  id: string;
  topicKey: string;
  label: string;
  labelAr?: string;
  prompt: string;
  promptAr?: string;
  answerMode: "current-target";
  orderIndex: number;
  weight: number;
  tags: string[];
  levelAnchors: string[];
  levelAnchorsAr?: string[];
}

export interface DiagnosisDimension {
  id: string;
  dimensionKey: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  orderIndex: number;
  weight: number;
  topics: DiagnosisTopic[];
}

export interface DiagnosisRecommendationCondition {
  topicId?: string;
  dimensionId?: string;
  tags?: string[];
  currentMin?: number;
  currentMax?: number;
  targetMin?: number;
  targetMax?: number;
  gapMin?: number;
  gapMax?: number;
}

export interface DiagnosisRecommendation {
  id: string;
  title: string;
  titleAr?: string;
  category: ReportCategory;
  conditions: DiagnosisRecommendationCondition;
  priority: number;
  why: string;
  whyAr?: string;
  how: string | string[];
  howAr?: string | string[];
  evidenceTags?: string[];
  websiteImplication?: string;
  websiteImplicationAr?: string;
  systemImplication?: string;
  systemImplicationAr?: string;
  dominaseFit?: string;
  dominaseFitAr?: string;
  riskNotes?: string;
  riskNotesAr?: string;
}

export interface DiagnosisProfileCondition extends DiagnosisRecommendationCondition {
  tag?: string;
  dimensionMin?: Record<string, number>;
  dimensionMax?: Record<string, number>;
  topicMin?: Record<string, number>;
  topicMax?: Record<string, number>;
  tagMin?: Record<string, number>;
  tagMax?: Record<string, number>;
}

export interface DiagnosisProfile {
  id: string;
  title: string;
  titleAr?: string;
  summary: string;
  summaryAr?: string;
  conditions: DiagnosisProfileCondition | DiagnosisProfileCondition[];
  relatedDimensions?: string[];
  riskNote?: string;
  riskNoteAr?: string;
}

export interface DiagnosisReportSection {
  id: ReportCategory;
  category: ReportCategory;
  title: string;
  titleAr?: string;
  purpose?: string;
  purposeAr?: string;
  fallback?: string;
  fallbackAr?: string;
}

export interface DiagnosisReportTemplates {
  intro?: {
    title: string;
    titleAr?: string;
    fallback?: string;
    fallbackAr?: string;
  };
  sections: DiagnosisReportSection[] | Record<ReportCategory, DiagnosisReportSection>;
}

export interface DiagnosisAssessment {
  meta: DiagnosisMeta;
  contextForm: DiagnosisContextForm;
  dimensions: DiagnosisDimension[];
  scoring: {
    profiles: DiagnosisProfile[];
  };
  recommendations: DiagnosisRecommendation[];
  reportTemplates: DiagnosisReportTemplates;
}

export interface DiagnosisAnswer {
  current: number | null;
  target: number | null;
  currentTouched: boolean;
  targetTouched: boolean;
  answeredAt?: string;
}

export type DiagnosisAnswerMap = Record<string, DiagnosisAnswer>;
export type DiagnosisContextAnswers = Record<string, string>;

export interface DiagnosisTopicScore {
  topicId: string;
  topicKey: string;
  dimensionId: string;
  dimensionKey: string;
  label: string;
  labelAr?: string;
  current: number;
  target: number;
  gap: number;
  weightedGap: number;
  priorityScore: number;
  tags: string[];
}

export interface DiagnosisDimensionScore {
  dimensionId: string;
  dimensionKey: string;
  title: string;
  titleAr?: string;
  averageCurrent: number;
  averageTarget: number;
  averageGap: number;
  priorityScore: number;
  answeredCount: number;
  totalCount: number;
}

export interface MatchedDiagnosisRecommendation extends DiagnosisRecommendation {
  matchedTopicIds: string[];
  matchedDimensionIds: string[];
}

export type RecommendationGroups = Record<ReportCategory, MatchedDiagnosisRecommendation[]>;

export interface DiagnosisResult {
  assessment: DiagnosisAssessment;
  profile: DiagnosisProfile;
  averageCurrent: number;
  averageTarget: number;
  averageGap: number;
  dimensions: DiagnosisDimensionScore[];
  topics: DiagnosisTopicScore[];
  topPriorityDimensions: DiagnosisDimensionScore[];
  topTopicGaps: DiagnosisTopicScore[];
  recommendations: MatchedDiagnosisRecommendation[];
  recommendationsByCategory: RecommendationGroups;
  sections: Record<ReportCategory, DiagnosisReportSection>;
}

export interface PersistedDiagnosisState {
  storageVersion: 2;
  contextAnswers: DiagnosisContextAnswers;
  answers: DiagnosisAnswerMap;
  updatedAt: string;
}

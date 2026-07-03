"use client";

import type { DiagnosisReportSection as Section, MatchedDiagnosisRecommendation } from "../lib/types";
import { localized } from "../lib/localization";
import DiagnosisRecommendationCard from "./DiagnosisRecommendationCard";

export default function DiagnosisReportSection({
  section,
  recommendations,
  isArabic,
}: {
  section: Section;
  recommendations: MatchedDiagnosisRecommendation[];
  isArabic: boolean;
}) {
  return (
    <section className="border-t border-border py-8">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase text-primary-theme">{section.category}</p>
        <h3 className="mt-2 text-2xl font-black text-foreground">{localized(section.title, section.titleAr, isArabic)}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
          {localized(section.purpose || section.fallback, section.purposeAr || section.fallbackAr, isArabic)}
        </p>
      </div>
      <div className="grid gap-4">
        {recommendations.map((recommendation) => (
          <DiagnosisRecommendationCard key={recommendation.id} recommendation={recommendation} isArabic={isArabic} />
        ))}
      </div>
    </section>
  );
}

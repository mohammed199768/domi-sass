"use client";

import type { MatchedDiagnosisRecommendation } from "../lib/types";
import { localized, localizedList } from "../lib/localization";

export default function DiagnosisRecommendationCard({
  recommendation,
  isArabic,
}: {
  recommendation: MatchedDiagnosisRecommendation;
  isArabic: boolean;
}) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h4 className="max-w-2xl text-lg font-black text-foreground">
          {localized(recommendation.title, recommendation.titleAr, isArabic)}
        </h4>
        {recommendation.priority > 0 ? (
          <span className="rounded-full border border-border px-3 py-1 text-xs font-bold text-primary-theme">
            {isArabic ? "أولوية" : "Priority"} {recommendation.priority}
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-7 text-foreground/85">{localized(recommendation.why, recommendation.whyAr, isArabic)}</p>
      <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
        {localizedList(recommendation.how, recommendation.howAr, isArabic).map((item) => (
          <li key={item} className="border-s-2 border-primary-theme/35 ps-3">{item}</li>
        ))}
      </ul>
      <div className="mt-4 grid gap-2 text-sm leading-6 text-muted sm:grid-cols-2">
        <Detail label={isArabic ? "أثر الموقع" : "Website implication"} value={localized(recommendation.websiteImplication, recommendation.websiteImplicationAr, isArabic)} />
        <Detail label={isArabic ? "أثر النظام" : "System implication"} value={localized(recommendation.systemImplication, recommendation.systemImplicationAr, isArabic)} />
        <Detail label={isArabic ? "ملاءمة DOMINASE" : "DOMINASE fit"} value={localized(recommendation.dominaseFit, recommendation.dominaseFitAr, isArabic)} />
        <Detail label={isArabic ? "ملاحظة مخاطرة" : "Risk note"} value={localized(recommendation.riskNotes, recommendation.riskNotesAr, isArabic)} />
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <p>
      <span className="font-bold text-foreground">{label}: </span>
      {value}
    </p>
  );
}

"use client";

import type { DiagnosisDimensionScore } from "../lib/types";
import { localized } from "../lib/localization";

export default function DiagnosisScoreCard({ score, isArabic }: { score: DiagnosisDimensionScore; isArabic: boolean }) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-4">
      <h3 className="text-base font-black text-foreground">{localized(score.title, score.titleAr, isArabic)}</h3>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Metric label={isArabic ? "حالي" : "Current"} value={score.averageCurrent} />
        <Metric label={isArabic ? "مطلوب" : "Target"} value={score.averageTarget} />
        <Metric label={isArabic ? "الفجوة" : "Gap"} value={score.averageGap} accent />
      </div>
    </article>
  );
}

function Metric({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-surface-muted p-3">
      <p className="text-[11px] font-bold text-muted">{label}</p>
      <p className={`mt-1 font-display text-xl font-black ${accent ? "text-primary-theme" : "text-foreground"}`} dir="ltr">
        {value.toFixed(1)}
      </p>
    </div>
  );
}

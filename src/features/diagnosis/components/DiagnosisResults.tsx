"use client";

import Link from "next/link";
import { MessageCircle, RotateCcw } from "lucide-react";
import type { DiagnosisContextAnswers, DiagnosisResult } from "../lib/types";
import { localized, reportCategories } from "../lib/localization";
import DiagnosisScoreCard from "./DiagnosisScoreCard";
import DiagnosisReportSection from "./DiagnosisReportSection";

export default function DiagnosisResults({
  result,
  contextAnswers,
  onReset,
  isArabic,
}: {
  result: DiagnosisResult;
  contextAnswers: DiagnosisContextAnswers;
  onReset: () => void;
  isArabic: boolean;
}) {
  const institution = contextAnswers.institutionName;
  const summaryParts = [contextAnswers.cityOrArea, contextAnswers.mainService, contextAnswers.specialty, contextAnswers.businessType, contextAnswers.mainProjectType].filter(Boolean);
  const whatsappHref = buildWhatsAppHref(result, contextAnswers, isArabic);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[1.6rem] border border-border bg-surface p-5 shadow-[0_24px_70px_-52px_var(--cool-shadow)] sm:p-7">
        <p className="text-sm font-bold text-primary-theme">{isArabic ? "تقرير التشخيص" : "Diagnosis report"}</p>
        <h2 className="mt-3 text-3xl font-black leading-tight text-foreground sm:text-5xl">
          {localized(result.assessment.meta.title, result.assessment.meta.titleAr, isArabic)}
        </h2>
        {institution || summaryParts.length ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            {[institution, ...summaryParts].filter(Boolean).join(" · ")}
          </p>
        ) : null}

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-2xl border border-border bg-surface-muted p-4">
            <p className="text-sm font-bold text-primary-theme">{isArabic ? "النمط الأقرب" : "Matched profile"}</p>
            <h3 className="mt-2 text-2xl font-black text-foreground">{localized(result.profile.title, result.profile.titleAr, isArabic)}</h3>
            <p className="mt-2 text-sm leading-7 text-foreground/85">{localized(result.profile.summary, result.profile.summaryAr, isArabic)}</p>
            {localized(result.profile.riskNote, result.profile.riskNoteAr, isArabic) ? (
              <p className="mt-3 text-xs leading-6 text-muted">{localized(result.profile.riskNote, result.profile.riskNoteAr, isArabic)}</p>
            ) : null}
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-background p-4 text-center">
            <Metric label={isArabic ? "حالي" : "Current"} value={result.averageCurrent} />
            <Metric label={isArabic ? "مطلوب" : "Target"} value={result.averageTarget} />
            <Metric label={isArabic ? "الفجوة" : "Gap"} value={result.averageGap} accent />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <SummaryList
          title={isArabic ? "أعلى ٣ أبعاد أولوية" : "Top 3 priority dimensions"}
          items={result.topPriorityDimensions.map((dimension) => `${localized(dimension.title, dimension.titleAr, isArabic)} · ${dimension.averageGap.toFixed(1)}`)}
        />
        <SummaryList
          title={isArabic ? "أعلى ٣ فجوات في الأسئلة" : "Top 3 topic gaps"}
          items={result.topTopicGaps.map((topic) => `${localized(topic.label, topic.labelAr, isArabic)} · ${topic.gap.toFixed(1)}`)}
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.dimensions.map((dimension) => (
          <DiagnosisScoreCard key={dimension.dimensionId} score={dimension} isArabic={isArabic} />
        ))}
      </div>

      <div className="mt-10">
        {reportCategories.map((category) => (
          <DiagnosisReportSection
            key={category}
            section={result.sections[category]}
            recommendations={result.recommendationsByCategory[category]}
            isArabic={isArabic}
          />
        ))}
      </div>

      <div className="mt-8 rounded-[1.6rem] border border-border bg-surface-muted p-5 sm:p-7">
        <h3 className="text-2xl font-black text-foreground">{isArabic ? "الخطوة الهادئة التالية" : "A calm next step"}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/85">
          {isArabic
            ? "أرسل التشخيص إلى DOMINASE لمناقشة الخطوة المناسبة."
            : "Send this diagnosis to DOMINASE to discuss the right next step."}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={whatsappHref} target="_blank" rel="noreferrer" className="btn-primary min-h-12 gap-2 px-5 text-sm">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </Link>
          <button type="button" onClick={onReset} className="btn-secondary min-h-12 gap-2 px-5 text-sm">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {isArabic ? "إعادة التشخيص" : "Reset diagnosis"}
          </button>
        </div>
      </div>

      <p className="mt-8 text-xs leading-6 text-muted">
        {localized(result.assessment.meta.disclaimer, result.assessment.meta.disclaimerAr, isArabic)}
      </p>
    </section>
  );
}

function Metric({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div>
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className={`mt-2 font-display text-3xl font-black ${accent ? "text-primary-theme" : "text-foreground"}`} dir="ltr">
        {value.toFixed(1)}
      </p>
    </div>
  );
}

function SummaryList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4">
      <h3 className="text-lg font-black text-foreground">{title}</h3>
      <ol className="mt-3 space-y-2 text-sm leading-7 text-muted">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3">
            <span className="font-display text-primary-theme" dir="ltr">{index + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function buildWhatsAppHref(result: DiagnosisResult, contextAnswers: DiagnosisContextAnswers, isArabic: boolean) {
  const topGaps = result.topTopicGaps.map((topic) => localized(topic.label, topic.labelAr, isArabic)).join(", ");
  const lines = [
    localized(result.assessment.meta.title, result.assessment.meta.titleAr, isArabic),
    contextAnswers.institutionName ? `${isArabic ? "الاسم" : "Institution"}: ${contextAnswers.institutionName}` : "",
    `${isArabic ? "النمط" : "Profile"}: ${localized(result.profile.title, result.profile.titleAr, isArabic)}`,
    `${isArabic ? "أهم الفجوات" : "Top gaps"}: ${topGaps}`,
  ].filter(Boolean);

  return `https://wa.me/962779667168?text=${encodeURIComponent(lines.join("\n"))}`;
}

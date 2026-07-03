"use client";

import Link from "next/link";
import { MessageCircle, RotateCcw, Mail } from "lucide-react";
import type { DiagnosisContextAnswers, DiagnosisResult } from "../lib/types";
import { localized } from "../lib/localization";
import DiagnosisDimensionChart from "./DiagnosisDimensionChart";
import DiagnosisOpportunityMap from "./DiagnosisOpportunityMap";
import DiagnosisRecommendationAccordion from "./DiagnosisRecommendationAccordion";

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
  const summaryParts = [
    contextAnswers.cityOrArea,
    contextAnswers.mainService,
    contextAnswers.specialty,
    contextAnswers.businessType,
    contextAnswers.mainProjectType,
    contextAnswers.mainEventType,
  ].filter(Boolean);
  const whatsappHref = buildWhatsAppHref(result, contextAnswers, isArabic);
  const { min, max } = result.assessment.meta.scale;

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-20 pt-6 sm:px-6 lg:px-8">
      {/* ── 1. Executive summary + score card ── */}
      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="rounded-[1.6rem] border border-border bg-surface p-5 shadow-[0_28px_80px_-58px_var(--cool-shadow)] sm:p-8">
          <p className="font-display text-xs font-black uppercase tracking-[0.22em] text-primary-theme">
            {isArabic ? "تقرير التشخيص" : "Diagnosis report"}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-foreground sm:text-4xl">
            {localized(result.assessment.meta.title, result.assessment.meta.titleAr, isArabic)}
          </h2>
          {institution || summaryParts.length ? (
            <p className="mt-3 text-sm leading-7 text-muted">
              {[institution, ...summaryParts].filter(Boolean).join(" · ")}
            </p>
          ) : null}

          <div className="mt-6 rounded-2xl border border-border bg-surface-muted p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-primary-theme">
              {isArabic ? "النمط الأقرب" : "Matched profile"}
            </p>
            <h3 className="mt-2 text-xl font-black text-foreground sm:text-2xl">
              {localized(result.profile.title, result.profile.titleAr, isArabic)}
            </h3>
            <p className="mt-2 text-sm leading-7 text-foreground/85">
              {localized(result.profile.summary, result.profile.summaryAr, isArabic)}
            </p>
            {localized(result.profile.riskNote, result.profile.riskNoteAr, isArabic) ? (
              <p className="mt-3 text-xs leading-6 text-muted">
                {localized(result.profile.riskNote, result.profile.riskNoteAr, isArabic)}
              </p>
            ) : null}
          </div>

          <p className="mt-5 text-xs leading-6 text-muted">
            {localized(result.assessment.meta.disclaimer, result.assessment.meta.disclaimerAr, isArabic)}
          </p>
        </div>

        <ScoreCard result={result} min={min} max={max} isArabic={isArabic} />
      </div>

      {/* ── 2. Dimension comparison ── */}
      <div className="mt-6">
        <DiagnosisDimensionChart dimensions={result.dimensions} min={min} max={max} isArabic={isArabic} />
      </div>

      {/* ── 3. Opportunity map + top gaps ── */}
      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[1.2fr_1fr]">
        <DiagnosisOpportunityMap topics={result.topics} isArabic={isArabic} />
        <TopGaps result={result} isArabic={isArabic} />
      </div>

      {/* ── 4. Recommendations ── */}
      <div className="mt-12">
        <DiagnosisRecommendationAccordion result={result} isArabic={isArabic} />
      </div>

      {/* ── 5. DOMINASE next step ── */}
      <div className="mt-12 rounded-[1.8rem] border border-primary-theme/25 bg-surface p-6 shadow-[0_32px_90px_-60px_var(--cool-shadow)] sm:p-10">
        <p className="font-display text-xs font-black uppercase tracking-[0.22em] text-primary-theme">
          {isArabic ? "الخطوة التالية" : "Next step"}
        </p>
        <h3 className="mt-3 max-w-2xl text-2xl font-black leading-snug text-foreground sm:text-3xl">
          {isArabic ? "حوّل التشخيص إلى خطة تنفيذ" : "Turn the diagnosis into an execution plan"}
        </h3>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-muted">
          {isArabic
            ? "إذا كانت الفجوات الأعلى مرتبطة بالموقع، الحجز، المتابعة أو CRM، يمكن لـ DOMINASE تحويلها إلى نظام عملي واضح."
            : "If your highest gaps relate to the website, booking, follow-up, or CRM, DOMINASE can turn them into a clear working system."}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={whatsappHref} target="_blank" rel="noreferrer" className="btn-primary min-h-12 gap-2 px-6 text-sm">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {isArabic ? "ناقشها عبر واتساب" : "Discuss on WhatsApp"}
          </Link>
          <Link href="/contact" className="btn-secondary min-h-12 gap-2 px-5 text-sm">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {isArabic ? "صفحة التواصل" : "Contact page"}
          </Link>
          <button type="button" onClick={onReset} className="btn-secondary min-h-12 gap-2 px-5 text-sm">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {isArabic ? "إعادة التشخيص" : "Restart diagnosis"}
          </button>
        </div>
      </div>
    </section>
  );
}

/* Compact vertical score card with a dual-arc ring: current (emerald) and
 * target (cyan), both out of the 1–5 scale. No fake "out of 100". */
function ScoreCard({
  result,
  min,
  max,
  isArabic,
}: {
  result: DiagnosisResult;
  min: number;
  max: number;
  isArabic: boolean;
}) {
  const radiusOuter = 52;
  const radiusInner = 40;
  const circOuter = 2 * Math.PI * radiusOuter;
  const circInner = 2 * Math.PI * radiusInner;
  const fraction = (value: number) => Math.max(0, Math.min(1, (value - min) / (max - min)));

  return (
    <aside className="flex flex-col rounded-[1.6rem] border border-border bg-surface p-5 sm:p-6">
      <p className="font-display text-[11px] font-black uppercase tracking-[0.2em] text-muted">
        {isArabic ? "الدرجة الإجمالية" : "Overall score"}
      </p>

      <div className="mx-auto mt-4" dir="ltr">
        <svg viewBox="0 0 130 130" className="h-40 w-40" role="img" aria-label={isArabic ? "الدرجة الإجمالية" : "Overall score"}>
          <g transform="rotate(-90 65 65)">
            <circle cx="65" cy="65" r={radiusOuter} fill="none" stroke="var(--diag-track, var(--border))" strokeWidth="7" />
            <circle
              cx="65"
              cy="65"
              r={radiusOuter}
              fill="none"
              stroke="var(--diag-target)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circOuter}
              strokeDashoffset={circOuter * (1 - fraction(result.averageTarget))}
            />
            <circle cx="65" cy="65" r={radiusInner} fill="none" stroke="var(--diag-track, var(--border))" strokeWidth="7" />
            <circle
              cx="65"
              cy="65"
              r={radiusInner}
              fill="none"
              stroke="var(--diag-current)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circInner}
              strokeDashoffset={circInner * (1 - fraction(result.averageCurrent))}
            />
          </g>
          <text x="65" y="60" textAnchor="middle" fontSize="24" fontWeight="900" fill="var(--fg)">
            {result.averageCurrent.toFixed(1)}
          </text>
          <text x="65" y="78" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--muted)">
            / {max.toFixed(1)}
          </text>
        </svg>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <ScoreRow
          label={isArabic ? "الوضع الحالي" : "Current"}
          value={result.averageCurrent}
          color="var(--diag-current)"
        />
        <ScoreRow label={isArabic ? "المستوى المطلوب" : "Target"} value={result.averageTarget} color="var(--diag-target)" />
        <div className="border-t border-border pt-3">
          <ScoreRow label={isArabic ? "متوسط الفجوة" : "Average gap"} value={result.averageGap} color="var(--fg)" strong />
        </div>
      </dl>
    </aside>
  );
}

function ScoreRow({ label, value, color, strong }: { label: string; value: number; color: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className={`flex items-center gap-2 text-xs font-bold ${strong ? "text-foreground" : "text-muted"}`}>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
        {label}
      </dt>
      <dd className="font-display text-lg font-black text-foreground" dir="ltr">
        {value.toFixed(1)}
      </dd>
    </div>
  );
}

function TopGaps({ result, isArabic }: { result: DiagnosisResult; isArabic: boolean }) {
  return (
    <section className="rounded-[1.6rem] border border-border bg-surface p-5 sm:p-7">
      <h3 className="text-xl font-black text-foreground">{isArabic ? "أعلى ثلاث فجوات" : "Top three gaps"}</h3>
      <p className="mt-1 text-xs leading-6 text-muted">
        {isArabic
          ? "أقرب النقاط لتحويلها إلى تحسين في الموقع أو النظام."
          : "The closest points to convert into a website or system improvement."}
      </p>
      <ol className="mt-5 space-y-4">
        {result.topTopicGaps.map((topic, index) => (
          <li key={topic.topicId} className="rounded-2xl border border-border bg-surface-muted p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="flex items-baseline gap-2.5 text-sm font-black text-foreground">
                <span className="font-display text-primary-theme" dir="ltr">
                  {index + 1}
                </span>
                {localized(topic.label, topic.labelAr, isArabic)}
              </p>
              <span className="shrink-0 rounded-full border border-primary-theme/35 px-2.5 py-1 text-[11px] font-black text-primary-theme" dir="ltr">
                {topic.current.toFixed(1)} → {topic.target.toFixed(1)}
              </span>
            </div>
            <p className="mt-2 text-xs leading-6 text-muted">
              {isArabic
                ? "فجوة بين الواقع والمستوى المطلوب — غالبا ما تُعالج عبر وضوح أفضل في الموقع أو مسار تواصل ومتابعة أنظم."
                : "A gap between reality and your target — usually addressed through clearer website structure or a more organized contact and follow-up path."}
            </p>
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

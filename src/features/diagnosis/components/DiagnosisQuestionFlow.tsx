"use client";

import { useMemo, useState } from "react";
import type { DiagnosisAnswer, DiagnosisAnswerMap, DiagnosisAssessment } from "../lib/types";
import { getTopics, isDiagnosisAnswerComplete } from "../lib/scoring";
import { localized } from "../lib/localization";
import DiagnosisTopicMap from "./DiagnosisTopicMap";
import DiagnosisMaturityRail from "./DiagnosisMaturityRail";

const anchorPrefix = /^\s*\d+\s*[-–—]\s*/;

export default function DiagnosisQuestionFlow({
  assessment,
  answers,
  onAnswer,
  onComplete,
  onBackToContext,
  onReset,
  isArabic,
}: {
  assessment: DiagnosisAssessment;
  answers: DiagnosisAnswerMap;
  onAnswer: (topicId: string, answer: Partial<DiagnosisAnswer>) => void;
  onComplete: () => void;
  onBackToContext: () => void;
  onReset: () => void;
  isArabic: boolean;
}) {
  const items = useMemo(() => getTopics(assessment), [assessment]);
  const firstMissing = items.findIndex(({ topic }) => !isDiagnosisAnswerComplete(answers[topic.id]));
  const [index, setIndex] = useState(firstMissing === -1 ? 0 : Math.max(0, firstMissing));
  const item = items[index];
  const answer = answers[item.topic.id];
  const canContinue = isDiagnosisAnswerComplete(answer);
  const answeredCount = items.filter(({ topic }) => isDiagnosisAnswerComplete(answers[topic.id])).length;
  const percent = Math.round((answeredCount / items.length) * 100);
  const anchors = isArabic && item.topic.levelAnchorsAr?.length ? item.topic.levelAnchorsAr : item.topic.levelAnchors;
  const { min, max, step } = assessment.meta.scale;
  const activeAnchor = answer?.currentTouched && typeof answer.current === "number" ? Math.round(answer.current) : null;

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-10 sm:px-6 lg:px-8">
      {/* ── Sticky diagnostic shell ── */}
      <div className="sticky top-20 z-30">
        <div className="rounded-2xl border border-border bg-background shadow-[0_18px_50px_-40px_var(--cool-shadow)]">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 pt-3 sm:px-5">
            <p className="text-xs font-black text-foreground">
              {localized(assessment.meta.title, assessment.meta.titleAr, isArabic)}
            </p>
            <p className="flex items-center gap-3 text-[11px] font-bold text-muted">
              <span className="hidden sm:inline">{localized(item.dimension.title, item.dimension.titleAr, isArabic)}</span>
              <span dir="ltr">{index + 1} / {items.length}</span>
            </p>
          </div>
          <div className="px-4 pb-3 pt-2 sm:px-5">
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-primary-theme transition-[width] duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column diagnostic layout ── */}
      <div className="mt-4 grid items-start gap-5 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="hidden lg:sticky lg:top-36 lg:block">
          <DiagnosisTopicMap
            items={items}
            answers={answers}
            activeIndex={index}
            onNavigate={setIndex}
            isArabic={isArabic}
          />
        </aside>

        <div>
          {/* Question card */}
          <article className="rounded-[1.6rem] border border-border bg-surface p-4 shadow-[0_28px_80px_-58px_var(--cool-shadow)] sm:p-6">
            <p className="font-display text-[11px] font-black uppercase tracking-[0.2em] text-primary-theme">
              {localized(item.dimension.title, item.dimension.titleAr, isArabic)}
            </p>
            <h2 className="mt-2 text-[1.4rem] font-black leading-snug text-foreground sm:text-3xl lg:text-[2.125rem]">
              {localized(item.topic.label, item.topic.labelAr, isArabic)}
            </h2>
            <p className="mt-2 max-w-3xl text-base font-medium leading-8 text-foreground sm:text-[17px]">
              {localized(item.topic.prompt, item.topic.promptAr, isArabic)}
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-muted">
              {isArabic ? "قيّم الوضع الحالي ثم المستوى المطلوب." : "Rate the current state, then the target level."}
            </p>

            {/* Maturity anchors: numeric 1→5 order from data; visually mirrored in
                Arabic (dir=rtl) so anchor 1 sits on the right, 5 on the left. */}
            <div
              className="no-scrollbar mt-4 grid auto-cols-[minmax(10rem,1fr)] grid-flow-col gap-2 overflow-x-auto pb-1 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-5 sm:overflow-visible"
              dir={isArabic ? "rtl" : "ltr"}
            >
              {anchors.map((anchor, anchorIndex) => {
                const level = anchorIndex + 1;
                const active = activeAnchor === level;
                return (
                  <div
                    key={`${item.topic.id}-${level}`}
                    className={`rounded-xl border p-2.5 text-sm font-medium leading-6 transition-colors duration-200 ${
                      active
                        ? "border-primary-theme/60 bg-primary-theme/[0.07] text-foreground"
                        : "border-border bg-surface-muted text-foreground/85"
                    }`}
                    dir={isArabic ? "rtl" : "ltr"}
                  >
                    <span
                      className={`font-display text-sm font-black ${active ? "text-primary-theme" : "text-foreground"}`}
                      dir="ltr"
                    >
                      {level}
                    </span>
                    <span className="mt-1 block">{anchor.replace(anchorPrefix, "")}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 text-xs font-bold leading-6 text-muted" dir={isArabic ? "rtl" : "ltr"}>
              {isArabic
                ? "١ في اليمين = أقل جاهزية، ٥ في اليسار = أعلى جاهزية"
                : "1 = lowest maturity, 5 = highest maturity"}
            </p>

            {/* Current first, then Target — in both languages */}
            <div className="mt-5 grid gap-3">
              <DiagnosisMaturityRail
                label={isArabic ? "الوضع الحالي" : "Current"}
                hint={isArabic ? "أين تقف مؤسستك اليوم بصدق؟" : "Where does your organization honestly stand today?"}
                value={answer?.currentTouched && typeof answer.current === "number" ? answer.current : min}
                touched={answer?.currentTouched === true}
                accent="current"
                min={min}
                max={max}
                step={step}
                onChange={(value) => onAnswer(item.topic.id, { current: value, currentTouched: true })}
                isArabic={isArabic}
              />
              <DiagnosisMaturityRail
                label={isArabic ? "المستوى المطلوب" : "Target"}
                hint={isArabic ? "المستوى الواقعي الذي تريد الوصول إليه." : "The realistic level you want to reach."}
                value={answer?.targetTouched && typeof answer.target === "number" ? answer.target : min}
                touched={answer?.targetTouched === true}
                accent="target"
                min={min}
                max={max}
                step={step}
                onChange={(value) => onAnswer(item.topic.id, { target: value, targetTouched: true })}
                isArabic={isArabic}
              />
            </div>
          </article>

          {/* Navigation */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={index === 0 ? onBackToContext : () => setIndex(index - 1)}
              className="btn-secondary min-h-12 px-5 text-sm"
            >
              {isArabic ? "رجوع" : "Back"}
            </button>
            <button
              type="button"
              disabled={!canContinue}
              onClick={index === items.length - 1 ? onComplete : () => setIndex(index + 1)}
              className="btn-primary min-h-12 px-6 text-sm disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {index === items.length - 1
                ? isArabic
                  ? "إنهاء التشخيص"
                  : "Finish diagnosis"
                : isArabic
                  ? "التالي"
                  : "Next"}
            </button>
          </div>
          {!canContinue ? (
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">
              {isArabic
                ? "حدد الوضع الحالي والمستوى المطلوب معا للمتابعة."
                : "Set both the current state and the target level to continue."}
            </p>
          ) : null}

          <button
            type="button"
            onClick={onReset}
            className="mt-4 text-xs font-bold text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {isArabic ? "إعادة التشخيص من البداية" : "Restart the diagnosis"}
          </button>
        </div>
      </div>
    </section>
  );
}

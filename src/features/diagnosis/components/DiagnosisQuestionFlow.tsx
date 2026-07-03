"use client";

import { useMemo, useState } from "react";
import type { DiagnosisAnswer, DiagnosisAnswerMap, DiagnosisAssessment } from "../lib/types";
import { getTopics, isDiagnosisAnswerComplete } from "../lib/scoring";
import { localized } from "../lib/localization";
import DiagnosisProgress from "./DiagnosisProgress";

export default function DiagnosisQuestionFlow({
  assessment,
  answers,
  onAnswer,
  onComplete,
  onBackToContext,
  isArabic,
}: {
  assessment: DiagnosisAssessment;
  answers: DiagnosisAnswerMap;
  onAnswer: (topicId: string, answer: Partial<DiagnosisAnswer>) => void;
  onComplete: () => void;
  onBackToContext: () => void;
  isArabic: boolean;
}) {
  const items = useMemo(() => getTopics(assessment), [assessment]);
  const firstMissing = Math.max(0, items.findIndex(({ topic }) => !isDiagnosisAnswerComplete(answers[topic.id])));
  const [index, setIndex] = useState(firstMissing === -1 ? 0 : firstMissing);
  const item = items[index];
  const answer = answers[item.topic.id];
  const currentValue = answer?.current ?? 1;
  const targetValue = answer?.target ?? 1;
  const canContinue = isDiagnosisAnswerComplete(answer);
  const answeredCount = items.filter(({ topic }) => isDiagnosisAnswerComplete(answers[topic.id])).length;
  const anchors = isArabic && item.topic.levelAnchorsAr?.length ? item.topic.levelAnchorsAr : item.topic.levelAnchors;

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
      <DiagnosisProgress current={answeredCount} total={items.length} isArabic={isArabic} />

      <div className="mt-6 rounded-[1.6rem] border border-border bg-surface p-5 shadow-[0_24px_70px_-52px_var(--cool-shadow)] sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-primary-theme">
              {localized(item.dimension.title, item.dimension.titleAr, isArabic)}
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-foreground sm:text-3xl">
              {localized(item.topic.label, item.topic.labelAr, isArabic)}
            </h2>
          </div>
          <span className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted" dir="ltr">
            {index + 1} / {items.length}
          </span>
        </div>

        <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/85">
          {localized(item.topic.prompt, item.topic.promptAr, isArabic)}
        </p>

        <p className="mt-6 text-xs font-bold text-muted">
          {isArabic ? "1 = ضعيف / غير جاهز · 5 = قوي / جاهز" : "1 = weak / not ready · 5 = strong / ready"}
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-5" dir="ltr">
          {anchors.map((anchor, anchorIndex) => (
            <div
              key={`${item.topic.id}-${anchorIndex}`}
              className="rounded-2xl border border-border bg-surface-muted p-3 text-sm leading-6 text-muted"
              dir={isArabic ? "rtl" : "ltr"}
            >
              <span className="font-display font-black text-primary-theme" dir="ltr">
                {anchorIndex + 1}
              </span>
              <span className="mt-1 block">{anchor}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <ScoreRange
            label={isArabic ? "الوضع الحالي" : "Current state"}
            value={currentValue}
            touched={answer?.currentTouched === true}
            onChange={(value) => onAnswer(item.topic.id, { current: value, currentTouched: true })}
          />
          <ScoreRange
            label={isArabic ? "المستوى المطلوب" : "Target level"}
            value={targetValue}
            touched={answer?.targetTouched === true}
            onChange={(value) => onAnswer(item.topic.id, { target: value, targetTouched: true })}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={index === 0 ? onBackToContext : () => setIndex(index - 1)}
          className="btn-secondary min-h-12 px-5 text-sm"
        >
          {isArabic ? "رجوع" : "Back"}
        </button>
        {index === items.length - 1 ? (
          <button
            type="button"
            disabled={!canContinue}
            onClick={onComplete}
            className="btn-primary min-h-12 px-6 text-sm disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isArabic ? "عرض التقرير" : "View report"}
          </button>
        ) : (
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => setIndex(index + 1)}
            className="btn-primary min-h-12 px-6 text-sm disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isArabic ? "التالي" : "Next"}
          </button>
        )}
      </div>
    </section>
  );
}

function ScoreRange({
  label,
  value,
  touched,
  onChange,
}: {
  label: string;
  value: number;
  touched: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <label className="rounded-2xl border border-border bg-background p-4">
      <span className="flex items-center justify-between gap-4 text-sm font-bold text-foreground">
        {label}
        <span className="font-display text-xl text-primary-theme" dir="ltr">
          {touched ? value.toFixed(1) : "-"}
        </span>
      </span>
      <input
        type="range"
        dir="ltr"
        min={1}
        max={5}
        step={0.5}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-5 w-full accent-primary-theme"
      />
      <div className="mt-2 flex justify-between text-xs font-bold text-muted" dir="ltr">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </label>
  );
}

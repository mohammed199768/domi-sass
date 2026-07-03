"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import type { DiagnosisAnswer, DiagnosisAnswerMap, DiagnosisAssessment, DiagnosisContextAnswers } from "../lib/types";
import { buildDiagnosisResult, getTopics, isDiagnosisAnswerComplete } from "../lib/scoring";
import { clearDiagnosisState, loadDiagnosisState, saveDiagnosisState } from "../lib/storage";
import { localized } from "../lib/localization";
import DiagnosisContextIntake from "./DiagnosisContextIntake";
import DiagnosisQuestionFlow from "./DiagnosisQuestionFlow";
import DiagnosisCompletion from "./DiagnosisCompletion";
import DiagnosisResults from "./DiagnosisResults";
import DiagnosisThemeHint from "./DiagnosisThemeHint";
import DiagnosisThemeToggle from "./DiagnosisThemeToggle";

type Stage = "context" | "questions" | "completion" | "results";

export default function DiagnosisAssessmentClient({
  slug,
  assessment,
}: {
  slug: string;
  assessment: DiagnosisAssessment;
}) {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [stage, setStage] = useState<Stage>("context");
  const [contextAnswers, setContextAnswers] = useState<DiagnosisContextAnswers>({});
  const [answers, setAnswers] = useState<DiagnosisAnswerMap>({});
  const topics = useMemo(() => getTopics(assessment), [assessment]);
  const isComplete = topics.every(({ topic }) => isDiagnosisAnswerComplete(answers[topic.id]));

  useEffect(() => {
    const saved = loadDiagnosisState(slug);
    if (!saved) return;
    window.setTimeout(() => {
      setContextAnswers(saved.contextAnswers);
      setAnswers(saved.answers);
      setStage(
        Object.values(saved.answers).filter(isDiagnosisAnswerComplete).length >= topics.length
          ? "results"
          : "questions"
      );
    }, 0);
  }, [slug, topics.length]);

  useEffect(() => {
    if (Object.keys(contextAnswers).length === 0 && Object.keys(answers).length === 0) {
      clearDiagnosisState(slug);
      return;
    }
    saveDiagnosisState(slug, contextAnswers, answers);
  }, [slug, contextAnswers, answers]);

  const result = useMemo(() => buildDiagnosisResult(assessment, answers), [assessment, answers]);

  const reset = () => {
    clearDiagnosisState(slug);
    setContextAnswers({});
    setAnswers({});
    setStage("context");
    window.scrollTo({ top: 0 });
  };

  return (
    <main className="diagnosis-scope min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <DiagnosisThemeHint isArabic={isArabic} />

      {/* Diagnosis shell top bar — clears the fixed navbar and hosts the
          diagnosis-scoped theme toggle so light/dark is reachable on every
          stage without overlapping the site header. */}
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 pt-24 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-extrabold leading-6 text-foreground">
            {localized(assessment.meta.title, assessment.meta.titleAr, isArabic)}
          </p>
          <p className="text-xs font-semibold leading-5 text-muted">
            {stage === "questions"
              ? isArabic
                ? `${topics.filter(({ topic }) => isDiagnosisAnswerComplete(answers[topic.id])).length} / ${topics.length} مكتمل`
                : `${topics.filter(({ topic }) => isDiagnosisAnswerComplete(answers[topic.id])).length} / ${topics.length} complete`
              : isArabic
                ? "زر الثيم متاح طوال التشخيص"
                : "Theme control stays available throughout"}
          </p>
        </div>
        <DiagnosisThemeToggle isArabic={isArabic} />
      </div>

      {/* Compact assessment header — full version during intake; the question /
          completion / results stages render straight below the top bar so the
          sticky shell never collides with the site navbar. */}
      {stage === "context" ? (
        <section className="mx-auto w-full max-w-5xl px-5 pb-6 pt-4 sm:px-6 lg:px-8">
          <p className="font-display text-xs font-black uppercase tracking-[0.22em] text-primary-theme">
            DOMINASE Growth Diagnosis
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-foreground sm:text-5xl">
            {localized(assessment.meta.title, assessment.meta.titleAr, isArabic)}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            {localized(assessment.meta.description, assessment.meta.descriptionAr, isArabic)}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-bold text-muted">
            <span className="rounded-full border border-border px-3 py-1.5">
              {assessment.dimensions.length} {isArabic ? "أبعاد" : "dimensions"} · {topics.length}{" "}
              {isArabic ? "سؤالا" : "questions"}
            </span>
            <span className="rounded-full border border-border px-3 py-1.5">
              ~{assessment.meta.estimatedMinutes || 8} {isArabic ? "دقائق" : "min"}
            </span>
          </div>
        </section>
      ) : null}

      {stage === "context" ? (
        <DiagnosisContextIntake
          form={assessment.contextForm}
          values={contextAnswers}
          onChange={(fieldId, value) => setContextAnswers((current) => ({ ...current, [fieldId]: value }))}
          onContinue={() => {
            setStage("questions");
            window.scrollTo({ top: 0 });
          }}
          isArabic={isArabic}
        />
      ) : null}

      {stage === "questions" ? (
        <DiagnosisQuestionFlow
          assessment={assessment}
          answers={answers}
          onAnswer={(topicId, nextAnswer) =>
            setAnswers((currentAnswers) => ({
              ...currentAnswers,
              [topicId]: buildTouchedAnswer(currentAnswers[topicId], nextAnswer),
            }))
          }
          onBackToContext={() => setStage("context")}
          onComplete={() => {
            setStage("completion");
            window.scrollTo({ top: 0 });
          }}
          onReset={reset}
          isArabic={isArabic}
        />
      ) : null}

      {stage === "completion" ? (
        <DiagnosisCompletion
          onViewReport={() => {
            setStage("results");
            window.scrollTo({ top: 0 });
          }}
          onReviewAnswers={() => setStage("questions")}
          isArabic={isArabic}
        />
      ) : null}

      {stage === "results" && isComplete ? (
        <DiagnosisResults result={result} contextAnswers={contextAnswers} onReset={reset} isArabic={isArabic} />
      ) : null}

      {stage === "results" && !isComplete ? (
        <section className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
          <button type="button" onClick={() => setStage("questions")} className="btn-primary min-h-12 px-6 text-sm">
            {isArabic ? "أكمل الأسئلة" : "Complete questions"}
          </button>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}

function buildTouchedAnswer(previous: DiagnosisAnswer | undefined, next: Partial<DiagnosisAnswer>): DiagnosisAnswer {
  const currentTouched = next.currentTouched ?? previous?.currentTouched ?? false;
  const targetTouched = next.targetTouched ?? previous?.targetTouched ?? false;
  const current = next.currentTouched ? next.current ?? null : previous?.current ?? null;
  const target = next.targetTouched ? next.target ?? null : previous?.target ?? null;

  return {
    current,
    target,
    currentTouched,
    targetTouched,
    answeredAt: currentTouched && targetTouched ? new Date().toISOString() : undefined,
  };
}

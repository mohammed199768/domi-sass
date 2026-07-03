"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import type { DiagnosisAnswer, DiagnosisAnswerMap, DiagnosisAssessment, DiagnosisContextAnswers } from "../lib/types";
import { buildDiagnosisResult, getTopics, isDiagnosisAnswerComplete } from "../lib/scoring";
import { clearDiagnosisState, loadDiagnosisState, saveDiagnosisState } from "../lib/storage";
import { localized } from "../lib/localization";
import DiagnosisContextForm from "./DiagnosisContextForm";
import DiagnosisQuestionFlow from "./DiagnosisQuestionFlow";
import DiagnosisResults from "./DiagnosisResults";

type Stage = "intro" | "context" | "questions" | "results";

export default function DiagnosisAssessmentClient({
  slug,
  assessment,
}: {
  slug: string;
  assessment: DiagnosisAssessment;
}) {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [stage, setStage] = useState<Stage>("intro");
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
      setStage(Object.values(saved.answers).filter(isDiagnosisAnswerComplete).length >= topics.length ? "results" : "questions");
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
    setStage("intro");
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <section className="mx-auto w-full max-w-6xl px-5 pb-4 pt-32 sm:px-6 lg:px-8">
        <p className="font-display text-xs font-black uppercase text-primary-theme">DOMINASE Growth Diagnosis</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-foreground sm:text-6xl">
          {localized(assessment.meta.title, assessment.meta.titleAr, isArabic)}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted">
          {localized(assessment.meta.description, assessment.meta.descriptionAr, isArabic)}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span className="rounded-full border border-border px-3 py-1.5">
            {assessment.dimensions.length} {isArabic ? "أبعاد" : "dimensions"}
          </span>
          <span className="rounded-full border border-border px-3 py-1.5">
            {topics.length} {isArabic ? "سؤال" : "questions"}
          </span>
          <span className="rounded-full border border-border px-3 py-1.5">
            {assessment.meta.estimatedMinutes || 8} {isArabic ? "دقائق تقريبا" : "min approx."}
          </span>
        </div>
      </section>

      {stage === "intro" ? (
        <section className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="rounded-[1.6rem] border border-border bg-surface p-5 shadow-[0_24px_70px_-52px_var(--cool-shadow)] sm:p-7">
            <h2 className="text-2xl font-black text-foreground">
              {isArabic ? "تشخيص عملي بدون تهويل" : "A practical diagnosis without hype"}
            </h2>
            <p className="mt-4 text-sm leading-8 text-muted">
              {isArabic
                ? "ستقيّم الوضع الحالي والمستوى المطلوب لكل محور. التقرير يوضح فجوات الأولوية، توصيات عملية، ومتى يمكن أن يساعد موقع أو نظام أو CRM."
                : "You will rate the current state and target level for each topic. The report highlights priority gaps, practical recommendations, and where a website, system, or CRM may help."}
            </p>
            <button type="button" onClick={() => setStage("context")} className="btn-primary mt-6 min-h-12 px-6 text-sm">
              {isArabic ? "ابدأ" : "Begin"}
            </button>
          </div>
        </section>
      ) : null}

      {stage === "context" ? (
        <DiagnosisContextForm
          form={assessment.contextForm}
          values={contextAnswers}
          onChange={(fieldId, value) => setContextAnswers((current) => ({ ...current, [fieldId]: value }))}
          onContinue={() => setStage("questions")}
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
          onComplete={() => setStage("results")}
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

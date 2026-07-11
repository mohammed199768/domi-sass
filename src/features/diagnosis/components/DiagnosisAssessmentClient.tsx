"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import type { DiagnosisAnswer, DiagnosisAnswerMap, DiagnosisAssessment, DiagnosisContextAnswers } from "../lib/types";
import { getTopics, isDiagnosisAnswerComplete } from "../lib/scoring";
import { buildDiagnosisResultForVersion } from "../runtime/engineRouter";
import type { DiagnosisEngineVersion } from "../runtime/types";
import { clearDiagnosisState, loadDiagnosisState, saveDiagnosisState } from "../lib/storage";
import { localized } from "../lib/localization";
import DiagnosisContextIntake from "./DiagnosisContextIntake";
import DiagnosisQuestionFlow from "./DiagnosisQuestionFlow";
import DiagnosisCompletion from "./DiagnosisCompletion";
import DiagnosisResults from "./DiagnosisResults";
import DiagnosisThemeHint from "./DiagnosisThemeHint";

type Stage = "context" | "questions" | "completion" | "results";

export default function DiagnosisAssessmentClient({
  slug,
  assessment,
  engineVersion,
  qaEnabled,
}: {
  slug: string;
  assessment: DiagnosisAssessment;
  engineVersion: DiagnosisEngineVersion;
  qaEnabled?: boolean;
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

  const result = useMemo(() => buildDiagnosisResultForVersion(assessment, answers, contextAnswers, engineVersion), [assessment, answers, contextAnswers, engineVersion]);

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
      {process.env.NODE_ENV !== "production" ? (
        <div className="fixed bottom-3 right-3 z-50 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-primary-theme shadow-lg">
          Diagnosis Engine: {engineVersion.toUpperCase()}
        </div>
      ) : null}

      {/* Diagnosis shell top bar — clears the fixed navbar and hosts the
          diagnosis-scoped theme toggle so light/dark is reachable on every
          stage without overlapping the site header. */}
      {/* Compact assessment header — full version during intake; the question /
          completion / results stages render straight below the top bar so the
          sticky shell never collides with the site navbar. */}
      {stage === "context" ? (
        <section className="mx-auto w-full max-w-5xl px-5 pb-6 pt-32 sm:px-6 lg:px-8">
          <p className="font-display text-xs font-black uppercase tracking-[0.2em] text-primary-theme">
            DOMINASE Growth Diagnosis
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-foreground sm:text-5xl">
            {localized(assessment.meta.title, assessment.meta.titleAr, isArabic)}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            {localized(assessment.meta.description, assessment.meta.descriptionAr, isArabic)}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-bold text-muted">
            <span className="premium-surface rounded-full px-3 py-1.5">
              {assessment.dimensions.length} {isArabic ? "أبعاد" : "dimensions"} · {topics.length}{" "}
              {isArabic ? "سؤالا" : "questions"}
            </span>
            <span className="premium-surface rounded-full px-3 py-1.5">
              ~{assessment.meta.estimatedMinutes || 8} {isArabic ? "دقائق" : "min"}
            </span>
          </div>
        </section>
      ) : (
        <div className="pt-28" aria-hidden="true" />
      )}

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
        <>
          <DiagnosisResults result={result} contextAnswers={contextAnswers} onReset={reset} isArabic={isArabic} />
          {process.env.NODE_ENV !== "production" && qaEnabled && result.debugMeta ? <DiagnosisDebugPanel result={result} /> : null}
        </>
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

function DiagnosisDebugPanel({ result }: { result: ReturnType<typeof buildDiagnosisResultForVersion> }) {
  if (!result.debugMeta) return null;
  return (
    <details className="mx-auto mb-16 w-full max-w-6xl rounded-2xl border border-border bg-surface p-5 text-xs">
      <summary className="cursor-pointer font-black">V2 decision debug · {result.debugMeta.decisionHash}</summary>
      <pre className="mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap text-[11px] leading-5">{JSON.stringify({ profile: result.profile.id, ...result.debugMeta }, null, 2)}</pre>
    </details>
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

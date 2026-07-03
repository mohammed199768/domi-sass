"use client";

/* DOMINASE completion moment — a calm, premium confirmation stage
 * (not a modal): emerald mark, two clear next actions. */
export default function DiagnosisCompletion({
  onViewReport,
  onReviewAnswers,
  isArabic,
}: {
  onViewReport: () => void;
  onReviewAnswers: () => void;
  isArabic: boolean;
}) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="diag-reveal w-full rounded-[1.8rem] border border-border bg-surface p-8 text-center shadow-[0_32px_90px_-60px_var(--cool-shadow)] sm:p-12">
        {/* Emerald confirmation mark */}
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-primary-theme/40 bg-primary-theme/10">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
            <path
              d="M5 12.5 10 17.5 19 7"
              stroke="var(--primary)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <h2 className="mt-7 text-3xl font-black text-foreground sm:text-4xl">
          {isArabic ? "اكتمل التشخيص" : "Diagnosis complete"}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-8 text-muted">
          {isArabic
            ? "تم تسجيل إجاباتك. يمكنك الآن مشاهدة خريطة الفجوات والتوصيات الأولية."
            : "Your answers are recorded. You can now view the gap map and initial recommendations."}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={onViewReport} className="btn-primary min-h-12 px-7 text-sm">
            {isArabic ? "عرض التقرير" : "View report"}
          </button>
          <button type="button" onClick={onReviewAnswers} className="btn-secondary min-h-12 px-6 text-sm">
            {isArabic ? "مراجعة الإجابات" : "Review answers"}
          </button>
        </div>
      </div>
    </section>
  );
}

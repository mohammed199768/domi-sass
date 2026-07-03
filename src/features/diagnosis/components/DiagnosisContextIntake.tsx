"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { DiagnosisContextAnswers, DiagnosisContextField, DiagnosisContextForm } from "../lib/types";
import { localized } from "../lib/localization";

/* Field routing for the guided intake. Fields keep their JSON definitions; we
 * only decide which page each one appears on. Unknown ids fall into "focus". */
const identityIds = new Set(["institutionName", "cityOrArea"]);
const channelIds = new Set([
  "appointmentMethod",
  "currentMainChannel",
  "quoteMethod",
  "currentWebsiteStatus",
  "bookingSeasonality",
  "optionalNotes",
]);

interface IntakeStep {
  key: "identity" | "focus" | "channel";
  fields: DiagnosisContextField[];
}

const stepCopy = {
  identity: {
    en: { title: "Who you are", hint: "So the report addresses your institution by name and place." },
    ar: { title: "من أنتم", hint: "حتى يخاطب التقرير مؤسستك باسمها ومكانها." },
  },
  focus: {
    en: { title: "Your focus", hint: "So recommendations match what you actually offer." },
    ar: { title: "تركيزكم", hint: "حتى تتوافق التوصيات مع ما تقدمونه فعلا." },
  },
  channel: {
    en: { title: "How people reach you today", hint: "So we can read your current path against the gaps." },
    ar: { title: "كيف يصل الناس إليكم اليوم", hint: "حتى نقرأ مسارك الحالي مقابل الفجوات." },
  },
} as const;

export default function DiagnosisContextIntake({
  form,
  values,
  onChange,
  onContinue,
  isArabic,
}: {
  form: DiagnosisContextForm;
  values: DiagnosisContextAnswers;
  onChange: (fieldId: string, value: string) => void;
  onContinue: () => void;
  isArabic: boolean;
}) {
  const steps = useMemo<IntakeStep[]>(() => {
    const identity = form.fields.filter((field) => identityIds.has(field.id));
    const channel = form.fields.filter((field) => channelIds.has(field.id));
    const focus = form.fields.filter((field) => !identityIds.has(field.id) && !channelIds.has(field.id));
    return (
      [
        { key: "identity", fields: identity },
        { key: "focus", fields: focus },
        { key: "channel", fields: channel },
      ] as IntakeStep[]
    ).filter((step) => step.fields.length > 0);
  }, [form.fields]);

  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  const copy = isArabic ? stepCopy[step.key].ar : stepCopy[step.key].en;
  const isLast = stepIndex === steps.length - 1;

  const requiredFilled = step.fields
    .filter((field) => field.required)
    .every((field) => (values[field.id] || "").trim().length > 0);

  const goNext = () => {
    if (!requiredFilled) return;
    if (isLast) onContinue();
    else setStepIndex(stepIndex + 1);
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-5 pb-20 pt-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Main panel */}
        <div className="rounded-[1.6rem] border border-border bg-surface p-5 shadow-[0_28px_80px_-58px_var(--cool-shadow)] sm:p-8">
          {/* Step indicator */}
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-xs font-black uppercase tracking-[0.2em] text-primary-theme">
              {isArabic ? "قبل التقييم" : "Before the assessment"}
            </p>
            <span className="text-xs font-bold text-muted" dir="ltr">
              {stepIndex + 1} / {steps.length}
            </span>
          </div>
          <div className="mt-4 flex gap-1.5" aria-hidden="true">
            {steps.map((item, index) => (
              <span
                key={item.key}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  index <= stepIndex ? "bg-primary-theme" : "bg-surface-muted"
                }`}
              />
            ))}
          </div>

          <h2 className="mt-6 text-2xl font-black text-foreground sm:text-3xl">{copy.title}</h2>
          <p className="mt-2 text-base font-medium leading-8 text-foreground/80">{copy.hint}</p>

          <div className="mt-7 grid gap-5">
            {step.fields.map((field) => (
              <IntakeField key={field.id} field={field} value={values[field.id] || ""} onChange={onChange} isArabic={isArabic} />
            ))}
          </div>

          <p className="mt-7 rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm font-medium leading-7 text-muted">
            {isArabic
              ? "هذه المعلومات لا تدخل في حساب الدرجة. نستخدمها فقط لجعل التقرير أقرب لواقع مؤسستك."
              : "These details do not affect your score. They only help personalize the report."}
          </p>

          {/* Navigation */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            {stepIndex === 0 ? (
              <Link href="/diagnosis" className="btn-secondary min-h-12 gap-2 px-5 text-sm">
                <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                {isArabic ? "رجوع" : "Back"}
              </Link>
            ) : (
              <button type="button" onClick={() => setStepIndex(stepIndex - 1)} className="btn-secondary min-h-12 gap-2 px-5 text-sm">
                <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                {isArabic ? "رجوع" : "Back"}
              </button>
            )}
            <button
              type="button"
              disabled={!requiredFilled}
              onClick={goNext}
              className="btn-primary min-h-12 px-6 text-sm disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isLast ? (isArabic ? "بدء التقييم" : "Start assessment") : isArabic ? "متابعة" : "Continue"}
            </button>
          </div>
        </div>

        {/* Why-this-matters side panel (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-border bg-surface-muted p-5">
            <p className="font-display text-[11px] font-black uppercase tracking-[0.2em] text-muted">
              {isArabic ? "لماذا نسأل؟" : "Why we ask"}
            </p>
            <ul className="mt-4 space-y-4">
              {step.fields.map((field) => {
                const why = localized(field.whyNeeded, field.whyNeededAr, isArabic);
                if (!why) return null;
                return (
                  <li key={field.id} className="text-sm font-medium leading-7 text-muted">
                    <span className="block font-extrabold text-foreground">
                      {localized(field.label, field.labelAr, isArabic)}
                    </span>
                    {why}
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

function IntakeField({
  field,
  value,
  onChange,
  isArabic,
}: {
  field: DiagnosisContextField;
  value: string;
  onChange: (fieldId: string, value: string) => void;
  isArabic: boolean;
}) {
  const label = localized(field.label, field.labelAr, isArabic);
  const options = isArabic && field.optionsAr?.length ? field.optionsAr : field.options || [];
  const optional = !field.required;
  const inputClass =
    "mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/25" +
    (optional ? " border-dashed" : "");

  return (
    <label className="block">
      <span className={`text-sm font-extrabold ${optional ? "text-foreground/80" : "text-foreground"}`}>
        {label}
        {optional ? (
          <span className="ms-2 text-xs font-semibold text-muted">{isArabic ? "(اختياري)" : "(optional)"}</span>
        ) : null}
      </span>
      {field.type === "select" ? (
        <select value={value} onChange={(event) => onChange(field.id, event.target.value)} className={inputClass}>
          <option value="">{isArabic ? "اختر..." : "Choose..."}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(event) => onChange(field.id, event.target.value)}
          rows={3}
          className={inputClass}
        />
      ) : (
        <input value={value} onChange={(event) => onChange(field.id, event.target.value)} className={inputClass} />
      )}
      {localized(field.whyNeeded, field.whyNeededAr, isArabic) ? (
        <span className="mt-1.5 block text-sm font-medium leading-6 text-muted lg:hidden">
          {localized(field.whyNeeded, field.whyNeededAr, isArabic)}
        </span>
      ) : null}
    </label>
  );
}

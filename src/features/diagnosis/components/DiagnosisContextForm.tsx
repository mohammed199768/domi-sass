"use client";

import type { DiagnosisContextAnswers, DiagnosisContextForm as FormType } from "../lib/types";
import { localized } from "../lib/localization";

export default function DiagnosisContextForm({
  form,
  values,
  onChange,
  onContinue,
  isArabic,
}: {
  form: FormType;
  values: DiagnosisContextAnswers;
  onChange: (fieldId: string, value: string) => void;
  onContinue: () => void;
  isArabic: boolean;
}) {
  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-bold text-primary-theme">{isArabic ? "الخطوة ١" : "Step 1"}</p>
      <h2 className="mt-3 text-3xl font-black text-foreground">{localized(form.title, form.titleAr, isArabic)}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
        {localized(form.description, form.descriptionAr, isArabic)}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {form.fields.map((field) => {
          const label = localized(field.label, field.labelAr, isArabic);
          const options = isArabic && field.optionsAr?.length ? field.optionsAr : field.options || [];
          const commonClass =
            "mt-2 min-h-12 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-base text-foreground outline-none transition focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/25";

          return (
            <label key={field.id} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
              <span className="text-sm font-bold text-foreground">
                {label}
                {field.required ? <span className="text-primary-theme"> *</span> : null}
              </span>
              {field.type === "select" ? (
                <select
                  value={values[field.id] || ""}
                  onChange={(event) => onChange(field.id, event.target.value)}
                  className={commonClass}
                >
                  <option value="">{isArabic ? "اختر..." : "Choose..."}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  value={values[field.id] || ""}
                  onChange={(event) => onChange(field.id, event.target.value)}
                  rows={4}
                  className={commonClass}
                />
              ) : (
                <input
                  value={values[field.id] || ""}
                  onChange={(event) => onChange(field.id, event.target.value)}
                  className={commonClass}
                />
              )}
              <span className="mt-1 block text-xs leading-5 text-muted">
                {localized(field.whyNeeded, field.whyNeededAr, isArabic)}
              </span>
            </label>
          );
        })}
      </div>

      <button type="button" onClick={onContinue} className="btn-primary mt-8 min-h-12 px-6 text-sm">
        {isArabic ? "متابعة إلى الأسئلة" : "Continue to questions"}
      </button>
    </section>
  );
}

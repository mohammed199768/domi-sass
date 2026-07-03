"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FORMSPREE_ENDPOINT, FORMSPREE_ENDPOINT_MISSING } from "@/constants/contact";

type SubmitState = "idle" | "submitting" | "success" | "error";
type FieldErrors = { name?: boolean; phone?: boolean };

const inputClass =
  "w-full rounded-xl border border-border bg-surface-hover px-4 py-3.5 text-foreground outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/25 aria-[invalid=true]:border-red-500/70 aria-[invalid=true]:ring-red-500/20";

type ContactFormProps = {
  /** Optional submit-button label override (e.g. the /contact page). Defaults to the homepage portal copy. */
  submitLabel?: string;
};

export default function ContactForm({ submitLabel }: ContactFormProps = {}) {
  const { t } = useLanguage();
  const p = t.contact.portal;

  const [state, setState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const resetForm = () => {
    setState("idle");
    setErrors({});
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return; // prevent duplicate submissions

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — if filled, silently treat as success without sending.
    if ((data.get("company_url") as string)?.trim()) {
      setState("success");
      return;
    }

    const name = (data.get("name") as string)?.trim() ?? "";
    const phone = (data.get("phone") as string)?.trim() ?? "";
    const company = (data.get("company") as string)?.trim() ?? "";

    const nextErrors: FieldErrors = {};
    if (!name) nextErrors.name = true;
    if (!phone) nextErrors.phone = true;
    if (nextErrors.name || nextErrors.phone) {
      setErrors(nextErrors);
      setState("error");
      return;
    }
    setErrors({});

    if (FORMSPREE_ENDPOINT_MISSING) {
      // Development safety: never crash, surface a clear configuration error.
      setState("error");
      return;
    }

    setState("submitting");
    try {
      const payload = new FormData();
      payload.append("name", name);
      payload.append("phone", phone);
      if (company) payload.append("company", company);
      payload.append("_subject", "New DOMINASE project request");

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Formspree request failed");

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div
        data-contact-success
        aria-live="polite"
        className="motion-safe:animate-[contact-success-in_0.4s_ease-out] flex flex-col items-center gap-4 py-6 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-xl border border-secondary-theme/40 bg-secondary-theme/10 text-secondary-theme">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary-theme">{p.success.eyebrow}</p>
        <h3 className="text-2xl font-black text-foreground">{p.success.title}</h3>
        <p className="max-w-md text-base leading-7 text-muted">{p.success.body}</p>
        <button
          type="button"
          suppressHydrationWarning
          onClick={resetForm}
          className="rounded-xl border border-border bg-surface-hover px-6 py-3 text-sm font-bold text-foreground transition-colors duration-200 hover:border-secondary-theme/60 hover:text-secondary-theme focus-visible:border-secondary-theme focus-visible:ring-2 focus-visible:ring-secondary-theme/40 focus-visible:outline-none"
        >
          {p.success.button}
        </button>
      </div>
    );
  }

  const showConfigError = state === "error" && FORMSPREE_ENDPOINT_MISSING;
  const showSubmitError = state === "error" && !FORMSPREE_ENDPOINT_MISSING && !errors.name && !errors.phone;

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: visually hidden, off the a11y/tab tree. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="company_url">Leave this field empty</label>
        <input id="company_url" name="company_url" type="text" tabIndex={-1} autoComplete="off" suppressHydrationWarning />
      </div>

      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-bold text-muted">
          {p.fields.name.label}
        </label>
        <input
          id="contact-name"
          suppressHydrationWarning
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={p.fields.name.placeholder}
          aria-invalid={errors.name || undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={inputClass}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-2 text-sm font-semibold text-red-500 dark:text-red-300">
            {p.errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-phone" className="mb-2 block text-sm font-bold text-muted">
          {p.fields.phone.label}
        </label>
        <input
          id="contact-phone"
          suppressHydrationWarning
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder={p.fields.phone.placeholder}
          aria-invalid={errors.phone || undefined}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          className={inputClass}
        />
        {errors.phone && (
          <p id="contact-phone-error" className="mt-2 text-sm font-semibold text-red-500 dark:text-red-300">
            {p.errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-company" className="mb-2 block text-sm font-bold text-muted">
          {p.fields.company.label}
        </label>
        <input
          id="contact-company"
          suppressHydrationWarning
          name="company"
          type="text"
          autoComplete="organization"
          placeholder={p.fields.company.placeholder}
          className={inputClass}
        />
      </div>

      {(showSubmitError || showConfigError) && (
        <p role="alert" className="text-sm font-semibold text-red-500 dark:text-red-300">
          {showConfigError ? p.errors.config : p.errors.submit}
        </p>
      )}

      <button
        type="submit"
        suppressHydrationWarning
        disabled={state === "submitting"}
        className="btn-primary w-full rounded-xl px-6 py-4 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "submitting" ? p.submitting : submitLabel ?? p.submit}
      </button>
    </form>
  );
}

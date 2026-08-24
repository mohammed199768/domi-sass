"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FORMSPREE_ENDPOINT } from "@/constants/contact";
import { trackDominaseEvent } from "@/lib/analytics";

export type ConsultationService = "website" | "platform" | "system" | "education" | "clinic" | "ux" | "unsure";

type OpenOptions = { serviceInterest?: ConsultationService; ctaLocation: string; originType?: string };
type ConsultationContextValue = { openConsultation: (options: OpenOptions) => void };

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

const COPY = {
  ar: {
    title: "احجز استشارة",
    close: "إغلاق",
    steps: ["ما الذي تحتاجه؟", "ما الهدف الأساسي؟", "كيف نتواصل معك؟"],
    services: [
      ["website", "موقع"], ["platform", "منصة"], ["system", "نظام أعمال"],
      ["education", "منصة تعليمية"], ["clinic", "نظام عيادة / حجز"],
      ["ux", "UX / منتج رقمي"], ["unsure", "لست متأكداً بعد"],
    ],
    goals: {
      common: [["leads", "زيادة الحجوزات / العملاء"], ["sell", "بيع خدمة أو منتج"], ["improve", "تحسين تجربة موجودة"], ["launch", "إطلاق فكرة جديدة"], ["other", "شيء آخر"]],
      system: [["operations", "إدارة العمليات"], ["reporting", "توحيد البيانات والتقارير"], ["improve", "تحسين نظام موجود"], ["launch", "إطلاق نظام جديد"], ["other", "شيء آخر"]],
      education: [["platform", "بناء منصة تعليمية"], ["sell", "بيع الدورات والمحتوى"], ["operations", "إدارة الطلاب والتقدم"], ["improve", "تحسين منصة موجودة"], ["other", "شيء آخر"]],
      clinic: [["leads", "زيادة الحجوزات"], ["booking", "تنظيم الحجز والمتابعة"], ["operations", "إدارة رحلة المريض"], ["improve", "تحسين تجربة موجودة"], ["other", "شيء آخر"]],
    },
    name: "الاسم",
    contact: "واتساب أو الهاتف أو البريد الإلكتروني",
    note: "ملاحظة قصيرة (اختياري)",
    notePlaceholder: "أي سياق يساعدنا على فهم المطلوب بسرعة.",
    back: "رجوع",
    submit: "اطلب الاستشارة",
    sending: "جاري الإرسال...",
    required: "أكمل الحقول المطلوبة للمتابعة.",
    error: "تعذر إرسال الطلب. جرّب مرة أخرى أو استخدم واتساب.",
    successTitle: "وصلتنا التفاصيل.",
    successBody: "سنراجعها ونتواصل معك لترتيب الاستشارة.",
    done: "تم",
  },
  en: {
    title: "Book a consultation",
    close: "Close",
    steps: ["What do you need?", "What is the main goal?", "How should we contact you?"],
    services: [
      ["website", "Website"], ["platform", "Platform"], ["system", "Business system"],
      ["education", "Education platform"], ["clinic", "Clinic / booking system"],
      ["ux", "UX / digital product"], ["unsure", "Not sure yet"],
    ],
    goals: {
      common: [["leads", "Increase bookings / leads"], ["sell", "Sell a service or product"], ["improve", "Improve an existing experience"], ["launch", "Launch a new idea"], ["other", "Something else"]],
      system: [["operations", "Manage operations"], ["reporting", "Unify data and reporting"], ["improve", "Improve an existing system"], ["launch", "Launch a new system"], ["other", "Something else"]],
      education: [["platform", "Build an education platform"], ["sell", "Sell courses and content"], ["operations", "Manage students and progress"], ["improve", "Improve an existing platform"], ["other", "Something else"]],
      clinic: [["leads", "Increase bookings"], ["booking", "Organize booking and follow-up"], ["operations", "Manage the patient journey"], ["improve", "Improve an existing experience"], ["other", "Something else"]],
    },
    name: "Name",
    contact: "WhatsApp, phone, or email",
    note: "Short note (optional)",
    notePlaceholder: "Any context that helps us understand the need quickly.",
    back: "Back",
    submit: "Request consultation",
    sending: "Sending...",
    required: "Complete the required fields to continue.",
    error: "The request could not be sent. Try again or use WhatsApp.",
    successTitle: "We received the details.",
    successBody: "We will review them and contact you to arrange the consultation.",
    done: "Done",
  },
} as const;

function serviceFromPath(pathname: string): ConsultationService | undefined {
  if (pathname.includes("education") || pathname.includes("manal-alhihi")) return "education";
  if (pathname.includes("clinic") || pathname.includes("our-clinic") || pathname.includes("curevie")) return "clinic";
  if (pathname.includes("custom-systems") || pathname.includes("pulse-gym") || pathname.includes("horvath")) return "system";
  if (pathname.includes("web-development") || pathname.includes("sultan-shadi") || pathname.includes("qasr")) return "website";
  return undefined;
}

function pageType(pathname: string) {
  if (pathname === "/") return "home";
  return pathname.split("/").filter(Boolean)[0] || "page";
}

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const { language, dir } = useLanguage();
  const pathname = usePathname();
  const copy = COPY[language];
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ConsultationService | "">("");
  const [objective, setObjective] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [origin, setOrigin] = useState({ ctaLocation: "unknown", originType: "page" });
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const goals = useMemo(() => {
    if (service === "system") return copy.goals.system;
    if (service === "education") return copy.goals.education;
    if (service === "clinic") return copy.goals.clinic;
    return copy.goals.common;
  }, [copy.goals, service]);

  const openConsultation = (options: OpenOptions) => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    const initialService = options.serviceInterest ?? serviceFromPath(pathname) ?? "";
    setService(initialService);
    setObjective("");
    setStep(0);
    setStatus("idle");
    setOrigin({ ctaLocation: options.ctaLocation, originType: options.originType ?? pageType(pathname) });
    setOpen(true);
    const query = new URLSearchParams(window.location.search);
    trackDominaseEvent("consultation_open", {
      page_path: pathname,
      page_type: options.originType ?? pageType(pathname),
      language,
      service_interest: initialService || undefined,
      cta_location: options.ctaLocation,
      utm_source: query.get("utm_source") || undefined,
      utm_medium: query.get("utm_medium") || undefined,
      utm_campaign: query.get("utm_campaign") || undefined,
    });
  };

  const close = () => {
    setOpen(false);
    window.setTimeout(() => previousFocus.current?.focus(), 0);
  };

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("button:not([disabled]), input, textarea")?.focus();
    }, 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); return; }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const chooseService = (value: ConsultationService) => {
    setService(value);
    trackDominaseEvent("consultation_step_1_complete", { page_path: pathname, page_type: origin.originType, language, service_interest: value, cta_location: origin.ctaLocation });
    setStep(1);
  };

  const chooseObjective = (value: string) => {
    setObjective(value);
    trackDominaseEvent("consultation_step_2_complete", { page_path: pathname, page_type: origin.originType, language, service_interest: service, cta_location: origin.ctaLocation });
    setStep(2);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!service || !objective || status === "sending") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const query = new URLSearchParams(window.location.search);
    values.set("service_interest", service);
    values.set("objective", objective);
    values.set("language", language);
    values.set("origin_page", pathname);
    values.set("origin_type", origin.originType);
    values.set("cta_location", origin.ctaLocation);
    values.set("utm_source", query.get("utm_source") || "");
    values.set("utm_medium", query.get("utm_medium") || "");
    values.set("utm_campaign", query.get("utm_campaign") || "");
    values.set("referrer", document.referrer || "");
    values.set("_subject", `DOMINASE consultation — ${service}`);
    setStatus("sending");
    trackDominaseEvent("consultation_submit", { page_path: pathname, page_type: origin.originType, language, service_interest: service, cta_location: origin.ctaLocation });
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: values, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      trackDominaseEvent("consultation_success", { page_path: pathname, page_type: origin.originType, language, service_interest: service, cta_location: origin.ctaLocation });
    } catch {
      setStatus("error");
    }
  };

  return (
    <ConsultationContext.Provider value={{ openConsultation }}>
      {children}
      {open && (
        <div className="consultation-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div ref={dialogRef} className="consultation-dialog" role="dialog" aria-modal="true" aria-labelledby="consultation-title" dir={dir}>
            <header>
              <div><span>{step + 1} / 3</span><h2 id="consultation-title">{copy.title}</h2></div>
              <button type="button" onClick={close} aria-label={copy.close}><X aria-hidden="true" /></button>
            </header>
            <div className="consultation-progress" aria-hidden="true"><i style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>

            {status === "success" ? (
              <div className="consultation-success" aria-live="polite">
                <Check aria-hidden="true" /><h3>{copy.successTitle}</h3><p>{copy.successBody}</p>
                <button type="button" className="domi-action domi-action--primary" onClick={close}>{copy.done}</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <fieldset hidden={step !== 0}>
                  <legend>{copy.steps[0]}</legend>
                  <div className="consultation-options consultation-options--services">
                    {copy.services.map(([value, label]) => (
                      <button key={value} type="button" aria-pressed={service === value} onClick={() => chooseService(value as ConsultationService)}>{label}</button>
                    ))}
                  </div>
                </fieldset>
                <fieldset hidden={step !== 1}>
                  <legend>{copy.steps[1]}</legend>
                  <div className="consultation-options">
                    {goals.map(([value, label]) => <button key={value} type="button" aria-pressed={objective === value} onClick={() => chooseObjective(value)}>{label}</button>)}
                  </div>
                </fieldset>
                <fieldset hidden={step !== 2}>
                  <legend>{copy.steps[2]}</legend>
                  <label><span>{copy.name}</span><input name="name" required autoComplete="name" /></label>
                  <label><span>{copy.contact}</span><input name="contact" required autoComplete="tel" /></label>
                  <label><span>{copy.note}</span><textarea name="note" rows={3} placeholder={copy.notePlaceholder} /></label>
                </fieldset>
                <div className="consultation-errors" aria-live="assertive">{status === "error" ? copy.error : ""}</div>
                {step > 0 && (
                  <div className="consultation-actions">
                    <button type="button" className="domi-action domi-action--secondary" onClick={() => { setStatus("idle"); setStep((value) => value - 1); }}>
                      {dir === "rtl" ? <ArrowRight aria-hidden="true" /> : <ArrowLeft aria-hidden="true" />}{copy.back}
                    </button>
                    {step === 2 && <button type="submit" className="domi-action domi-action--primary" disabled={status === "sending"}>{status === "sending" ? copy.sending : copy.submit}</button>}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) throw new Error("useConsultation must be used inside ConsultationProvider");
  return context;
}

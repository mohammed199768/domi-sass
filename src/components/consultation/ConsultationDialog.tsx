"use client";

import "./consultation.css";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { trackDominaseEvent } from "@/lib/analytics";
import { createSubmissionId, getLeadContext, submitLead } from "@/lib/lead-capture";
import type { ConsultationService } from "./ConsultationProvider";

const COPY = {
  ar: {
    title: "احجز استشارة", close: "إغلاق", steps: ["ما الذي تحتاجه؟", "ما الهدف الأساسي؟", "كيف نتواصل معك؟"],
    services: [["website", "موقع"], ["platform", "منصة"], ["system", "نظام أعمال"], ["education", "منصة تعليمية"], ["clinic", "نظام عيادة / حجز"], ["ux", "UX / منتج رقمي"], ["unsure", "لست متأكداً بعد"]],
    goals: {
      common: [["leads", "زيادة الحجوزات / العملاء"], ["sell", "بيع خدمة أو منتج"], ["improve", "تحسين تجربة موجودة"], ["launch", "إطلاق فكرة جديدة"], ["other", "شيء آخر"]],
      system: [["operations", "إدارة العمليات"], ["reporting", "توحيد البيانات والتقارير"], ["improve", "تحسين نظام موجود"], ["launch", "إطلاق نظام جديد"], ["other", "شيء آخر"]],
      education: [["platform", "بناء منصة تعليمية"], ["sell", "بيع الدورات والمحتوى"], ["operations", "إدارة الطلاب والتقدم"], ["improve", "تحسين منصة موجودة"], ["other", "شيء آخر"]],
      clinic: [["leads", "زيادة الحجوزات"], ["booking", "تنظيم الحجز والمتابعة"], ["operations", "إدارة رحلة المريض"], ["improve", "تحسين تجربة موجودة"], ["other", "شيء آخر"]],
    },
    name: "الاسم", phone: "واتساب أو الهاتف", email: "البريد الإلكتروني", note: "ملاحظة قصيرة (اختياري)", notePlaceholder: "أي سياق يساعدنا على فهم المطلوب بسرعة.", back: "رجوع", submit: "اطلب الاستشارة", sending: "جاري الإرسال...", error: "تعذر إرسال الطلب. جرّب مرة أخرى أو استخدم واتساب.", successTitle: "وصلتنا التفاصيل.", successBody: "سنراجعها ونتواصل معك لترتيب الاستشارة.", done: "تم",
  },
  en: {
    title: "Book a consultation", close: "Close", steps: ["What do you need?", "What is the main goal?", "How should we contact you?"],
    services: [["website", "Website"], ["platform", "Platform"], ["system", "Business system"], ["education", "Education platform"], ["clinic", "Clinic / booking system"], ["ux", "UX / digital product"], ["unsure", "Not sure yet"]],
    goals: {
      common: [["leads", "Increase bookings / leads"], ["sell", "Sell a service or product"], ["improve", "Improve an existing experience"], ["launch", "Launch a new idea"], ["other", "Something else"]],
      system: [["operations", "Manage operations"], ["reporting", "Unify data and reporting"], ["improve", "Improve an existing system"], ["launch", "Launch a new system"], ["other", "Something else"]],
      education: [["platform", "Build an education platform"], ["sell", "Sell courses and content"], ["operations", "Manage students and progress"], ["improve", "Improve an existing platform"], ["other", "Something else"]],
      clinic: [["leads", "Increase bookings"], ["booking", "Organize booking and follow-up"], ["operations", "Manage the patient journey"], ["improve", "Improve an existing experience"], ["other", "Something else"]],
    },
    name: "Name", phone: "WhatsApp or phone", email: "Email", note: "Short note (optional)", notePlaceholder: "Any context that helps us understand the need quickly.", back: "Back", submit: "Request consultation", sending: "Sending...", error: "The request could not be sent. Try again or use WhatsApp.", successTitle: "We received the details.", successBody: "We will review them and contact you to arrange the consultation.", done: "Done",
  },
} as const;

export default function ConsultationDialog({ initialService, ctaLocation, originType, pathname, onClose }: { initialService: ConsultationService | ""; ctaLocation: string; originType: string; pathname: string; onClose: () => void }) {
  const { language, dir } = useLanguage();
  const copy = COPY[language];
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ConsultationService | "">(initialService);
  const [objective, setObjective] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const submissionId = useRef(createSubmissionId());
  const goals = useMemo(() => service === "system" ? copy.goals.system : service === "education" ? copy.goals.education : service === "clinic" ? copy.goals.clinic : copy.goals.common, [copy.goals, service]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("button:not([disabled]), input, textarea")?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]'));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { window.clearTimeout(timer); window.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previousOverflow; };
  }, [onClose]);

  const eventContext = { page_path: pathname, page_type: originType, language, service_interest: service || undefined, cta_location: ctaLocation };
  const chooseService = (value: ConsultationService) => { setService(value); trackDominaseEvent("consultation_step_1_complete", { ...eventContext, service_interest: value }); setStep(1); };
  const chooseObjective = (value: string) => { setObjective(value); trackDominaseEvent("consultation_step_2_complete", eventContext); setStep(2); };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!service || !objective || status === "sending") return;
    const values = new FormData(event.currentTarget);
    setStatus("sending"); trackDominaseEvent("consultation_submit", eventContext);
    try {
      await submitLead({
        kind:"consultation", submissionId:submissionId.current, name:String(values.get("name") || ""), phone:String(values.get("phone") || ""),
        email:String(values.get("email") || ""), company:"", service, objective, note:String(values.get("note") || ""), currentState:"",
        websiteUrl:String(values.get("website_url") || ""),
        context:getLeadContext({ originPath:pathname, originType, ctaLocation, language }),
      });
      setStatus("success"); trackDominaseEvent("consultation_success", eventContext);
    } catch { setStatus("error"); }
  };

  return <div className="consultation-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div ref={dialogRef} className="consultation-dialog" role="dialog" aria-modal="true" aria-labelledby="consultation-title" dir={dir}>
    <header><div><span>{step + 1} / 3</span><h2 id="consultation-title">{copy.title}</h2></div><button type="button" onClick={onClose} aria-label={copy.close}><X aria-hidden="true" /></button></header>
    <div className="consultation-progress" aria-hidden="true"><i style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
    {status === "success" ? <div className="consultation-success" aria-live="polite"><Check aria-hidden="true" /><h3>{copy.successTitle}</h3><p>{copy.successBody}</p><button type="button" className="domi-action domi-action--primary" onClick={onClose}>{copy.done}</button></div> : <form onSubmit={submit}>
      <fieldset hidden={step !== 0}><legend>{copy.steps[0]}</legend><div className="consultation-options consultation-options--services">{copy.services.map(([value, label]) => <button key={value} type="button" aria-pressed={service === value} onClick={() => chooseService(value as ConsultationService)}>{label}</button>)}</div></fieldset>
      <fieldset hidden={step !== 1}><legend>{copy.steps[1]}</legend><div className="consultation-options">{goals.map(([value, label]) => <button key={value} type="button" aria-pressed={objective === value} onClick={() => chooseObjective(value)}>{label}</button>)}</div></fieldset>
      <fieldset hidden={step !== 2}>
        <legend>{copy.steps[2]}</legend>
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden"><label>Website<input name="website_url" tabIndex={-1} autoComplete="off" /></label></div>
        <label><span>{copy.name}</span><input name="name" type="text" inputMode="text" required autoComplete="name" /></label>
        <label><span>{copy.phone}</span><input name="phone" type="tel" inputMode="tel" required autoComplete="tel" /></label>
        <label><span>{copy.email}</span><input name="email" type="email" inputMode="email" autoComplete="email" /></label>
        <label><span>{copy.note}</span><textarea name="note" rows={3} placeholder={copy.notePlaceholder} /></label>
      </fieldset>
      <div className="consultation-errors" aria-live="assertive">{status === "error" ? copy.error : ""}</div>
      {step > 0 ? <div className="consultation-actions"><button type="button" className="domi-action domi-action--secondary" onClick={() => { setStatus("idle"); setStep((value) => value - 1); }}>{dir === "rtl" ? <ArrowRight aria-hidden="true" /> : <ArrowLeft aria-hidden="true" />}{copy.back}</button>{step === 2 ? <button type="submit" className="domi-action domi-action--primary" disabled={status === "sending"}>{status === "sending" ? copy.sending : copy.submit}</button> : null}</div> : null}
    </form>}
  </div></div>;
}

"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_CHANNELS, GITHUB_URL, UPWORK_URL, FORMSPREE_ENDPOINT } from "@/constants/contact";
import { ArrowLeft, ArrowRight, CheckCircle2, Github, Mail, Phone, Send } from "lucide-react";
import WhatsAppMark from "@/components/icons/WhatsAppMark";

const COPY = {
  ar: {
    eyebrow: "احجز استشارة",
    title: "احكِ لنا أين تريد أن تصل. ونرتّب الطريق من هناك.",
    body: "النموذج هو أسرع طريقة لفهم المشروع جيداً. اختر نوع المشروع أولاً، ثم نطلب المعلومات التي تساعدنا على تقديم خطوة مفيدة من أول رد.",
    steps: ["نوع المشروع", "الهدف", "التواصل"],
    projectLabel: "ما الذي تريد بناءه؟",
    projectHelp: "اختيار واحد يكفي كبداية.",
    projects: [
      { id: "education", title: "منصة تعليمية", desc: "دورات، طلاب، اختبارات، بيع ومتابعة." },
      { id: "clinic", title: "موقع أو نظام عيادة", desc: "CTA، حجز، مرضى، متابعة وCRM." },
      { id: "system", title: "نظام أعمال مخصص", desc: "لوحات تحكم، عمليات، موظفين وتقارير." },
      { id: "website", title: "موقع شركة أو منتج", desc: "حضور أوضح، SEO ومسار تحويل أقوى." },
      { id: "other", title: "فكرة مختلفة", desc: "احكِ لنا عنها من دون حصرها في قالب جاهز." },
    ],
    goalLabel: "ما أهم نتيجة تريدها من المشروع؟",
    goalPlaceholder: "مثلاً: زيادة الحجوزات، بيع الدورات، تنظيم العمليات، تحسين الظهور على Google...",
    currentLabel: "ما الموجود حالياً؟",
    currentPlaceholder: "موقع قديم، واتساب فقط، Excel، منصة حالية... (اختياري)",
    name: "الاسم",
    phone: "رقم الهاتف",
    company: "الشركة / العيادة / الأكاديمية",
    email: "البريد الإلكتروني",
    back: "رجوع",
    next: "متابعة",
    submit: "اطلب الاستشارة",
    sending: "جاري الإرسال...",
    successTitle: "وصلت التفاصيل.",
    successBody: "سنراجع السياق ونتواصل معك بالخطوة التالية المناسبة بدلاً من رد عام.",
    again: "أرسل مشروعاً آخر",
    error: "تعذر إرسال النموذج. استخدم واتساب أو جرّب مرة ثانية.",
    sideTitle: "تفضّل طريقة مباشرة؟",
    whatsapp: "واتساب",
    call: "اتصال",
    emailDirect: "إيميل",
    github: "GitHub",
    upwork: "Upwork",
    privacy: "معلوماتك تستخدم فقط لمراجعة المشروع والتواصل معك.",
  },
  en: {
    eyebrow: "Book a consultation",
    title: "Tell us where you need to get. We will structure the path from there.",
    body: "The form is the fastest way for us to understand the project properly. Start with the project type, then we only ask for context that helps us make the first reply useful.",
    steps: ["Project type", "Goal", "Contact"],
    projectLabel: "What are you building?",
    projectHelp: "One choice is enough to start.",
    projects: [
      { id: "education", title: "Education platform", desc: "Courses, students, assessments, sales, and tracking." },
      { id: "clinic", title: "Clinic website or system", desc: "CTA, booking, patients, follow-up, and CRM." },
      { id: "system", title: "Custom business system", desc: "Dashboards, operations, teams, and reporting." },
      { id: "website", title: "Company or product website", desc: "Clearer presence, SEO, and stronger conversion paths." },
      { id: "other", title: "Something different", desc: "Tell us without forcing the idea into a template." },
    ],
    goalLabel: "What is the most important outcome?",
    goalPlaceholder: "For example: more bookings, sell courses, organize operations, improve Google visibility...",
    currentLabel: "What exists today?",
    currentPlaceholder: "Old website, WhatsApp only, spreadsheets, an existing platform... (optional)",
    name: "Name",
    phone: "Phone",
    company: "Company / clinic / academy",
    email: "Email",
    back: "Back",
    next: "Continue",
    submit: "Request consultation",
    sending: "Sending...",
    successTitle: "Context received.",
    successBody: "We will review it and reply with a useful next step rather than a generic response.",
    again: "Send another project",
    error: "The form could not be sent. Use WhatsApp or try again.",
    sideTitle: "Prefer a direct route?",
    whatsapp: "WhatsApp",
    call: "Call",
    emailDirect: "Email",
    github: "GitHub",
    upwork: "Upwork",
    privacy: "Your information is used only to review the project and contact you.",
  },
} as const;

type Status = "idle" | "sending" | "success" | "error";

export default function ContactOrbitClient() {
  const { language, dir } = useLanguage();
  const copy = COPY[language];
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState("website");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("path");
    if (requested && copy.projects.some((item) => item.id === requested)) setProjectType(requested);
  }, [copy.projects]);

  const ProgressArrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const selected = useMemo(() => copy.projects.find((item) => item.id === projectType) ?? copy.projects[0], [copy.projects, projectType]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const payload = new FormData();
      for (const [key, value] of data.entries()) payload.append(key, value);
      payload.set("project_type", projectType);
      payload.set("project_type_label", selected.title);
      payload.set("_subject", `DOMINASE project request — ${selected.title}`);
      const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: payload, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("send failed");
      form.reset();
      setGoal("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      <main className="contact-redesign">
        <section className="contact-redesign__hero" aria-labelledby="contact-title">
          <div className="contact-redesign__intro">
            <p>{copy.eyebrow}</p>
            <h1 id="contact-title">{copy.title}</h1>
            <span>{copy.body}</span>
          </div>

          <div className="contact-redesign__stage">
            <aside className="contact-redesign__channels contact-redesign__channels--start" aria-label={copy.sideTitle}>
              <a href={CONTACT_CHANNELS.whatsapp.href} target="_blank" rel="noopener noreferrer"><WhatsAppMark /><span>{copy.whatsapp}</span></a>
              <a href={CONTACT_CHANNELS.phone.href}><Phone /><span>{copy.call}</span></a>
              <a href={CONTACT_CHANNELS.email.href}><Mail /><span>{copy.emailDirect}</span></a>
            </aside>

            <div className="contact-redesign__form-card">
              <div className="contact-redesign__progress" aria-label="Form progress">
                {copy.steps.map((label, index) => (
                  <div key={label} data-active={index <= step ? "true" : "false"}>
                    <i>{index + 1}</i><span>{label}</span>
                  </div>
                ))}
              </div>

              {status === "success" ? (
                <div className="contact-redesign__success" aria-live="polite">
                  <CheckCircle2 aria-hidden="true" />
                  <h2>{copy.successTitle}</h2>
                  <p>{copy.successBody}</p>
                  <button type="button" onClick={() => { setStatus("idle"); setStep(0); }}>{copy.again}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="contact-redesign__panel" hidden={step !== 0} aria-hidden={step !== 0}>
                    <p className="contact-redesign__label">{copy.projectLabel}</p>
                    <span className="contact-redesign__help">{copy.projectHelp}</span>
                    <div className="contact-redesign__project-grid">
                      {copy.projects.map((item) => (
                        <button key={item.id} type="button" data-selected={projectType === item.id ? "true" : "false"} onClick={() => setProjectType(item.id)}>
                          <strong>{item.title}</strong><span>{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="contact-redesign__panel" hidden={step !== 1} aria-hidden={step !== 1}>
                    <label>
                      <span>{copy.goalLabel}</span>
                      <textarea name="goal" required rows={5} placeholder={copy.goalPlaceholder} value={goal} onChange={(event) => setGoal(event.target.value)} />
                    </label>
                    <label>
                      <span>{copy.currentLabel}</span>
                      <textarea name="current_state" rows={3} placeholder={copy.currentPlaceholder} />
                    </label>
                  </div>

                  <div className="contact-redesign__panel" hidden={step !== 2} aria-hidden={step !== 2}>
                    <div className="contact-redesign__fields">
                      <label><span>{copy.name}</span><input name="name" required autoComplete="name" /></label>
                      <label><span>{copy.phone}</span><input name="phone" required type="tel" autoComplete="tel" /></label>
                      <label><span>{copy.company}</span><input name="company" autoComplete="organization" /></label>
                      <label><span>{copy.email}</span><input name="email" type="email" autoComplete="email" /></label>
                    </div>
                    <input type="hidden" name="project_type" value={projectType} />
                    <p className="contact-redesign__privacy">{copy.privacy}</p>
                  </div>

                  {status === "error" ? <p className="contact-redesign__error" role="alert">{copy.error}</p> : null}

                  <div className="contact-redesign__form-actions">
                    {step > 0 ? <button type="button" className="contact-redesign__back" onClick={() => setStep((value) => value - 1)}>{copy.back}</button> : <span />}
                    {step < 2 ? (
                      <button type="button" className="contact-redesign__next" disabled={step === 1 && !goal.trim()} onClick={() => setStep((value) => value + 1)}>{copy.next}<ProgressArrow aria-hidden="true" /></button>
                    ) : (
                      <button type="submit" className="contact-redesign__next" disabled={status === "sending"}>{status === "sending" ? copy.sending : copy.submit}<Send aria-hidden="true" /></button>
                    )}
                  </div>
                </form>
              )}
            </div>

            <aside className="contact-redesign__channels contact-redesign__channels--end" aria-label={copy.sideTitle}>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><Github /><span>{copy.github}</span></a>
              <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer"><span className="contact-redesign__up">UP</span><span>{copy.upwork}</span></a>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

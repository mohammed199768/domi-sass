"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { diagnosisEntries } from "@/data/diagnosis/registry";
import { useLanguage } from "@/context/LanguageContext";
import DiagnosisDomainCard from "./DiagnosisDomainCard";
import DiagnosisThemeHint from "./DiagnosisThemeHint";

/* Compact trust row under the hero — small inline facts, shown once. */
const trustRow = [
  { en: "8 minutes", ar: "٨ دقائق" },
  { en: "13 questions", ar: "١٣ سؤالًا" },
  { en: "Instant report", ar: "تقرير فوري" },
  { en: "No sign-up", ar: "بدون تسجيل" },
];

/* "What the diagnosis reveals" — four compact gap cards. */
const gaps = [
  {
    en: { title: "Clarity gap", text: "Does the customer grasp your offer quickly?" },
    ar: { title: "فجوة الوضوح", text: "هل يفهم العميل عرضك بسرعة؟" },
  },
  {
    en: { title: "Trust gap", text: "Do they see enough proof before reaching out?" },
    ar: { title: "فجوة الثقة", text: "هل يرى دليلًا كافيًا قبل التواصل؟" },
  },
  {
    en: { title: "Conversion gap", text: "Do they know the next step to take?" },
    ar: { title: "فجوة التحويل", text: "هل يعرف الخطوة التالية؟" },
  },
  {
    en: { title: "Follow-up gap", text: "Are leads lost after the first interest?" },
    ar: { title: "فجوة المتابعة", text: "هل تضيع الطلبات بعد أول اهتمام؟" },
  },
];

export default function DiagnosisLanding() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <main className="diagnosis-scope min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <DiagnosisThemeHint isArabic={isArabic} />

      {/* ── 1 · Hero ── */}
      <section className="mx-auto flex w-full max-w-[900px] flex-col items-center px-5 pb-14 pt-28 text-center sm:px-6 sm:pt-32">
        <p className="font-display text-[11px] font-black uppercase tracking-[0.22em] text-primary-theme sm:text-xs">
          DOMINASE Growth Diagnosis
        </p>

        <h1 className="mt-6 text-[2rem] font-black leading-[1.2] text-foreground sm:text-5xl">
          {isArabic ? (
            <>
              قبل أن تبني موقعًا جديدًا…
              <br />
              <span className="text-primary-theme">اعرف أين يتسرب العميل.</span>
            </>
          ) : (
            <>
              Before building a new website…
              <br />
              <span className="text-primary-theme">find where the customer leaks.</span>
            </>
          )}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
          {isArabic
            ? "تشخيص قصير يكشف أين تتعطل رحلة العميل: في الوضوح، الثقة، الحجز، المتابعة، أو جاهزية النظام الرقمي."
            : "A short diagnosis that reveals where the journey breaks: clarity, trust, booking, follow-up, or digital readiness."}
        </p>

        {/* CTAs */}
        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href="#sectors"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-primary-theme px-7 text-sm font-black text-[color:var(--primary-contrast)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 sm:w-auto"
          >
            {isArabic ? "ابدأ التشخيص" : "Start diagnosis"}
          </a>
          <a
            href="#sectors"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-border px-7 text-sm font-black text-foreground transition-colors duration-300 hover:border-primary-theme/50 hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            {isArabic ? "اختر قطاعك" : "Choose your sector"}
          </a>
        </div>

        {/* Privacy line + compact trust row */}
        <p className="mt-7 text-xs font-bold text-muted sm:text-sm">
          {isArabic
            ? "يعمل على جهازك. لا تسجيل دخول. لا نجمع إجاباتك."
            : "Runs on your device. No login. We do not collect your answers."}
        </p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[11px] font-black text-foreground/70 sm:text-xs">
          {trustRow.map((fact, index) => (
            <li key={fact.en} className="flex items-center gap-2">
              {index > 0 && <span className="text-muted/50" aria-hidden="true">·</span>}
              <span>{isArabic ? fact.ar : fact.en}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 2 · What you get ── */}
      <section className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-6">
        <h2 className="text-center text-2xl font-black text-foreground sm:text-3xl">
          {isArabic ? "ماذا يكشف لك التشخيص؟" : "What the diagnosis reveals"}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gaps.map((gap, index) => {
            const copy = isArabic ? gap.ar : gap.en;
            return (
              <div
                key={copy.title}
                className="rounded-[1.25rem] border border-border bg-surface p-5"
              >
                <span
                  className="font-display text-xs font-black text-primary-theme"
                  dir="ltr"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-base font-black text-foreground">{copy.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{copy.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3 · Sector selector ── */}
      <section id="sectors" className="mx-auto w-full max-w-5xl scroll-mt-24 px-5 py-8 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-black text-foreground sm:text-3xl">
            {isArabic ? "اختر القطاع الأقرب لعملك" : "Choose the sector closest to your business"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
            {isArabic
              ? "كل مسار يستخدم نفس المنطق، لكن بأسئلة مصممة لطبيعة قرار العميل في قطاعك."
              : "Each path uses the same logic, with questions shaped to how customers decide in your sector."}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {diagnosisEntries.map((entry) => (
            <DiagnosisDomainCard key={entry.slug} entry={entry} isArabic={isArabic} />
          ))}
        </div>
      </section>

      {/* ── 4 · Trust note ── */}
      <section className="mx-auto w-full max-w-2xl px-5 pb-24 pt-6 text-center sm:px-6">
        <p className="text-sm leading-7 text-muted sm:text-base">
          {isArabic
            ? "هذا التشخيص ليس حكمًا على عملك. هو خريطة أولية تساعدك ترى أين تبدأ."
            : "This diagnosis is not a verdict on your business. It is an early map that helps you see where to start."}
        </p>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-muted/80 sm:text-xs">
          {isArabic ? "آمن · محلي · بدون تسجيل · قابل للإعادة" : "Private · Local · No sign-up · Repeatable"}
        </p>
      </section>

      <Footer />
    </main>
  );
}

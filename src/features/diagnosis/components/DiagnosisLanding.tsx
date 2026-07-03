"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { diagnosisEntries } from "@/data/diagnosis/registry";
import { useLanguage } from "@/context/LanguageContext";
import DiagnosisDomainCard from "./DiagnosisDomainCard";
import DiagnosisThemeHint from "./DiagnosisThemeHint";

const journeySteps = [
  {
    en: { title: "Context", text: "A few details so the report speaks your language — never scored." },
    ar: { title: "السياق", text: "تفاصيل قليلة تجعل التقرير أقرب لواقعك — لا تدخل في الدرجة." },
  },
  {
    en: { title: "Assessment", text: "13 focused questions. You rate where you are, and where you want to be." },
    ar: { title: "التقييم", text: "١٣ سؤالا مركزا. تقيّم أين أنت الآن، وأين تريد أن تصل." },
  },
  {
    en: { title: "Report", text: "A gap map, priorities, and practical recommendations — on your device." },
    ar: { title: "التقرير", text: "خريطة فجوات، أولويات، وتوصيات عملية — على جهازك مباشرة." },
  },
];

export default function DiagnosisLanding() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <main className="diagnosis-scope min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <DiagnosisThemeHint isArabic={isArabic} />

      {/* Diagnosis shell top bar — theme toggle, clears the fixed navbar. */}
      {/* ── Diagnostic Gateway hero ── */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-4 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="font-display text-xs font-black uppercase tracking-[0.22em] text-primary-theme">
            DOMINASE Growth Diagnosis
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight text-foreground sm:text-6xl">
            {isArabic
              ? "اكتشف أين تتسرب فرص النمو في مؤسستك"
              : "Discover where growth opportunities leak out of your organization"}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            A focused strategic self-assessment across clarity, trust, conversion, follow-up, and digital readiness.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            {isArabic
              ? "هذا تشخيص استراتيجي مجاني نقدمه كهدية، وليس أداة ذكاء اصطناعي استعراضية. يعمل محليا على جهازك ولا يرسل أي بيانات تلقائيا."
              : "A free strategic diagnostic gift — not an AI gimmick. It runs locally in your browser and sends no data automatically."}
          </p>
        </div>

        {/* Journey strip */}
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {journeySteps.map((step, index) => {
            const copy = isArabic ? step.ar : step.en;
            return (
              <div key={copy.title} className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full border border-primary-theme/40 font-display text-xs font-black text-primary-theme"
                    dir="ltr"
                  >
                    {index + 1}
                  </span>
                  <h2 className="text-sm font-black text-foreground">{copy.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">{copy.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Domain selector ── */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-24 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs font-black uppercase tracking-[0.22em] text-muted">
              {isArabic ? "اختر مجال مؤسستك" : "Choose your field"}
            </p>
            <h2 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
              {isArabic ? "أربعة تشخيصات متخصصة" : "Four specialized diagnostics"}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            {isArabic
              ? "كل تشخيص مبني على أسئلة خاصة بمجالك، وليس قالبا عاما واحدا."
              : "Each diagnosis is built on questions specific to your field — not one generic template."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {diagnosisEntries.map((entry) => (
            <DiagnosisDomainCard key={entry.slug} entry={entry} isArabic={isArabic} />
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-6 text-muted">
          {isArabic
            ? "النتائج إرشادية وتعتمد على تقييمك الذاتي، وليست وعدا بنتائج محددة."
            : "Results are advisory, based on your self-assessment, and never a promise of specific outcomes."}
        </p>
      </section>

      <Footer />
    </main>
  );
}

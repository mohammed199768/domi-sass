"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { diagnosisEntries } from "@/data/diagnosis/registry";
import { useLanguage } from "@/context/LanguageContext";
import DiagnosisDomainCard from "./DiagnosisDomainCard";

export default function DiagnosisLanding() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <section className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col justify-center px-5 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="font-display text-xs font-black uppercase text-primary-theme">
            DOMINASE Growth Diagnosis
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-6xl">
            {isArabic ? "تشخيص نمو مؤسستك من DOMINASE" : "A strategic diagnosis before you build."}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {isArabic
              ? "احصل على تشخيص استراتيجي مختصر يوضح أين تتسرب الفرص من موقعك، ثقتك، مسار الحجز، والمتابعة."
              : "A focused strategic self-assessment that maps your business gaps across clarity, trust, conversion, follow-up, and digital readiness."}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {diagnosisEntries.map((entry) => (
            <DiagnosisDomainCard key={entry.slug} entry={entry} isArabic={isArabic} />
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-7 text-muted">
          {isArabic
            ? "هذا التشخيص مجاني، محلي على جهازك، ولا يرسل أي بيانات تلقائيا. النتائج إرشادية وليست وعدا بنتائج محددة."
            : "This free diagnosis runs locally in your browser. It does not send data automatically, and its output is advisory rather than a promise of specific results."}
        </p>
      </section>
      <Footer />
    </main>
  );
}

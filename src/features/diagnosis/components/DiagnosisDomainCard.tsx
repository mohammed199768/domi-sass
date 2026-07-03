"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { diagnosisEntries } from "@/data/diagnosis/registry";
import type { DiagnosisSlug } from "../lib/types";

type Entry = (typeof diagnosisEntries)[number];

/* UI-only copy: the strategic promise line per domain (data files untouched). */
const promises: Record<DiagnosisSlug, { en: string; ar: string }> = {
  clinic: {
    en: "Where the booking path loses patients before they ever call.",
    ar: "أين يفقد مسار الحجز مرضى محتملين قبل أن يتواصلوا أصلا.",
  },
  venue: {
    en: "Where visual trust and package clarity decide the booking.",
    ar: "أين تحسم الثقة البصرية ووضوح الباقات قرار الحجز.",
  },
  engineering: {
    en: "Where portfolio proof and quote flow win or lose the project.",
    ar: "أين يكسب إثبات الأعمال ومسار العروض المشروع أو يخسره.",
  },
  "general-business": {
    en: "Where offer clarity and follow-up quietly shape your growth.",
    ar: "أين يشكّل وضوح العرض والمتابعة نموك بهدوء.",
  },
};

export default function DiagnosisDomainCard({ entry, isArabic }: { entry: Entry; isArabic: boolean }) {
  const promise = promises[entry.slug];
  const dimensionCount = entry.data.dimensions.length;
  const topicCount = entry.data.dimensions.reduce((sum, dimension) => sum + dimension.topics.length, 0);
  const minutes = entry.data.meta.estimatedMinutes || 8;

  return (
    <Link
      href={`/diagnosis/${entry.slug}`}
      className="group relative flex flex-col rounded-[1.4rem] border border-border bg-surface p-6 text-foreground shadow-[0_28px_80px_-58px_var(--cool-shadow)] transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-primary-theme/60 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme sm:p-7"
    >
      {/* Accent marker */}
      <span className="absolute start-0 top-7 h-10 w-[3px] rounded-e-full bg-primary-theme/70" aria-hidden="true" />

      <div className="flex items-start justify-between gap-4">
        <p className="font-display text-[11px] font-black uppercase tracking-[0.2em] text-primary-theme">
          {isArabic ? entry.data.meta.domainAr || entry.domain : entry.domain}
        </p>
        <ArrowUpRight
          className="h-5 w-5 shrink-0 text-foreground/70 transition-colors duration-300 group-hover:text-primary-theme rtl:-scale-x-100"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-4 text-2xl font-black leading-snug text-foreground">
        {isArabic ? entry.titleAr : entry.title}
      </h3>

      <p className="mt-3 text-sm font-bold leading-7 text-foreground/80">
        {isArabic ? promise.ar : promise.en}
      </p>

      <p className="mt-3 flex-1 text-sm font-medium leading-7 text-foreground/80">
        {isArabic ? entry.descriptionAr : entry.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-extrabold text-foreground/80">
        <span className="rounded-full border border-border px-3 py-1.5">
          {dimensionCount} {isArabic ? "أبعاد" : "dimensions"} · {topicCount} {isArabic ? "سؤالا" : "questions"}
        </span>
        <span className="rounded-full border border-border px-3 py-1.5">
          ~{minutes} {isArabic ? "دقائق" : "min"}
        </span>
      </div>

      <span className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-primary-theme/35 px-5 text-sm font-bold text-primary-theme transition-colors duration-300 group-hover:border-primary-theme">
        {isArabic ? "ابدأ التشخيص" : "Start diagnosis"}
      </span>
    </Link>
  );
}

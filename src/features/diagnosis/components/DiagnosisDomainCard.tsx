"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { diagnosisEntries } from "@/data/diagnosis/registry";
import type { DiagnosisSlug } from "../lib/types";

type Entry = (typeof diagnosisEntries)[number];

/* UI-only copy — the data/JSON files are never touched.
 * Each card stays short and scannable: sector label, one sharp question,
 * one line of context, a single meta line, and a clear CTA. */
type CardCopy = {
  label: { en: string; ar: string };
  question: { en: string; ar: string };
  description: { en: string; ar: string };
  cta: { en: string; ar: string };
};

const cardCopy: Record<DiagnosisSlug, CardCopy> = {
  clinic: {
    label: { en: "Clinics", ar: "العيادات" },
    question: {
      en: "They viewed your clinic, but did not book?",
      ar: "تصفّحوا عيادتك، ولم يحجزوا؟",
    },
    description: {
      en: "Find the trust and booking gaps before the patient reaches the appointment.",
      ar: "اكشف ثغرات الثقة ومسار الحجز قبل أن يصل المريض للموعد.",
    },
    cta: { en: "Diagnose your clinic", ar: "شخّص عيادتك" },
  },
  venue: {
    label: { en: "Wedding Venues", ar: "قاعات المناسبات" },
    question: {
      en: "Plenty of admiration… fewer bookings?",
      ar: "إعجاب كثير… وحجوزات أقل؟",
    },
    description: {
      en: "See whether your gallery, packages, and availability path turn interest into a booking.",
      ar: "اعرف هل معرضك، باقاتك، ومسار التوفر يحوّلون الاهتمام إلى حجز.",
    },
    cta: { en: "Get the venue report", ar: "استخرج تقرير القاعة" },
  },
  engineering: {
    label: { en: "Engineering Companies", ar: "الشركات الهندسية" },
    question: {
      en: "Strong work that does not show its value?",
      ar: "أعمال قوية لا تظهر بقيمتها؟",
    },
    description: {
      en: "Assess how clearly your expertise, project portfolio, and quote path come across.",
      ar: "قيّم وضوح خبرتك، معرض مشاريعك، ومسار طلب العرض.",
    },
    cta: { en: "Assess your company", ar: "قيّم شركتك" },
  },
  "general-business": {
    label: { en: "Other Businesses", ar: "أعمال أخرى" },
    question: {
      en: "Do customers slip away before they ask?",
      ar: "هل يضيع العميل قبل أن يطلب؟",
    },
    description: {
      en: "Find the friction point in the offer, trust, contact, or follow-up.",
      ar: "اكشف نقطة الاحتكاك في العرض، الثقة، التواصل، أو المتابعة.",
    },
    cta: { en: "Diagnose your business", ar: "شخّص عملك" },
  },
};

export default function DiagnosisDomainCard({
  entry,
  isArabic,
}: {
  entry: Entry;
  isArabic: boolean;
}) {
  const copy = cardCopy[entry.slug];
  const topicCount = entry.data.dimensions.reduce(
    (sum, dimension) => sum + dimension.topics.length,
    0,
  );
  const minutes = entry.data.meta.estimatedMinutes || 8;

  const label = isArabic ? copy.label.ar : copy.label.en;
  const cta = isArabic ? copy.cta.ar : copy.cta.en;
  const meta = isArabic
    ? `${topicCount} سؤال · ${minutes} دقائق`
    : `${topicCount} questions · ${minutes} min`;

  return (
    <Link
      href={`/diagnosis/${entry.slug}`}
      aria-label={cta}
      className="diagnosis-domain-card group relative flex flex-col rounded-[1.5rem] border border-border bg-surface p-5 text-foreground transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary-theme/45 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-[11px] font-black uppercase tracking-[0.16em] text-primary-theme">
          {label}
        </span>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-foreground/40 transition-colors duration-300 group-hover:text-primary-theme rtl:-scale-x-100"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-3 text-lg font-black leading-snug text-foreground sm:text-xl">
        {isArabic ? copy.question.ar : copy.question.en}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-7 text-muted">
        {isArabic ? copy.description.ar : copy.description.en}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold text-muted" dir={isArabic ? "rtl" : "ltr"}>
          {meta}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-black text-primary-theme">
          {cta}
          <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

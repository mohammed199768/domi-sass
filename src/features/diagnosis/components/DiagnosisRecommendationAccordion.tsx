"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DiagnosisResult, MatchedDiagnosisRecommendation, ReportCategory } from "../lib/types";
import { localized, localizedList, reportCategories } from "../lib/localization";

/* Grouped recommendation accordion. Continuous numbering across the eight
 * report categories; the single highest-priority recommendation opens by
 * default. Height animates via the grid-rows trick (see globals.css). */
export default function DiagnosisRecommendationAccordion({
  result,
  isArabic,
}: {
  result: DiagnosisResult;
  isArabic: boolean;
}) {
  const groups = useMemo(() => {
    let number = 0;
    return reportCategories.map((category) => ({
      category,
      section: result.sections[category],
      items: result.recommendationsByCategory[category].map((recommendation) => ({
        recommendation,
        number: ++number,
      })),
    }));
  }, [result]);

  const allIds = useMemo(
    () => groups.flatMap((group) => group.items.map(({ recommendation }) => recommendation.id)),
    [groups]
  );

  const defaultOpenId = useMemo(() => {
    const all = groups.flatMap((group) => group.items.map(({ recommendation }) => recommendation));
    return all.slice().sort((a, b) => b.priority - a.priority)[0]?.id;
  }, [groups]);

  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(defaultOpenId ? [defaultOpenId] : []));

  const toggle = (id: string) =>
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-xs font-black uppercase tracking-[0.2em] text-primary-theme">
            {isArabic ? "التوصيات" : "Recommendations"}
          </p>
          <h3 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
            {isArabic ? "خطة القراءة: من التشخيص إلى التنفيذ" : "From diagnosis to execution"}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpenIds(new Set(allIds))}
            className="btn-secondary min-h-10 px-4 text-xs"
          >
            {isArabic ? "توسيع الكل" : "Expand all"}
          </button>
          <button type="button" onClick={() => setOpenIds(new Set())} className="btn-secondary min-h-10 px-4 text-xs">
            {isArabic ? "طي الكل" : "Collapse all"}
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-8">
        {groups.map((group) => (
          <div key={group.category}>
            <div className="mb-3">
              <h4 className="text-lg font-black text-foreground">
                {localized(group.section.title, group.section.titleAr, isArabic)}
              </h4>
              {localized(group.section.purpose, group.section.purposeAr, isArabic) ? (
                <p className="mt-1 max-w-3xl text-xs leading-6 text-muted">
                  {localized(group.section.purpose, group.section.purposeAr, isArabic)}
                </p>
              ) : null}
            </div>
            <div className="space-y-2.5">
              {group.items.map(({ recommendation, number }) => (
                <AccordionItem
                  key={recommendation.id}
                  recommendation={recommendation}
                  number={number}
                  category={group.category}
                  open={openIds.has(recommendation.id)}
                  onToggle={() => toggle(recommendation.id)}
                  isArabic={isArabic}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AccordionItem({
  recommendation,
  number,
  category,
  open,
  onToggle,
  isArabic,
}: {
  recommendation: MatchedDiagnosisRecommendation;
  number: number;
  category: ReportCategory;
  open: boolean;
  onToggle: () => void;
  isArabic: boolean;
}) {
  const bodyId = `diag-rec-${recommendation.id}`;
  const how = localizedList(recommendation.how, recommendation.howAr, isArabic);

  return (
    <article className={`rounded-2xl border bg-surface transition-colors duration-200 ${open ? "border-primary-theme/40" : "border-border"}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={bodyId}
        className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme sm:px-5"
      >
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary-theme/40 bg-primary-theme/10 font-display text-xs font-black text-primary-theme"
          dir="ltr"
        >
          {number}
        </span>
        <span className="flex-1 text-sm font-black leading-snug text-foreground sm:text-base">
          {localized(recommendation.title, recommendation.titleAr, isArabic)}
        </span>
        {recommendation.priority > 0 ? (
          <span className="hidden shrink-0 rounded-full border border-border px-2.5 py-1 text-[11px] font-bold text-muted sm:inline" dir="ltr">
            {isArabic ? "أولوية" : "Priority"} {recommendation.priority}
          </span>
        ) : null}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div id={bodyId} className="diag-acc-body" data-open={open}>
        <div>
          <div className="border-t border-border px-4 py-4 sm:px-5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">{category}</p>
            <p className="mt-2 text-sm leading-7 text-foreground/85">
              {localized(recommendation.why, recommendation.whyAr, isArabic)}
            </p>
            {how.length ? (
              <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
                {how.map((item) => (
                  <li key={item} className="border-s-2 border-primary-theme/35 ps-3">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-4 grid gap-2 text-xs leading-6 text-muted sm:grid-cols-2">
              <Detail
                label={isArabic ? "أثر الموقع" : "Website implication"}
                value={localized(recommendation.websiteImplication, recommendation.websiteImplicationAr, isArabic)}
              />
              <Detail
                label={isArabic ? "أثر النظام" : "System implication"}
                value={localized(recommendation.systemImplication, recommendation.systemImplicationAr, isArabic)}
              />
              <Detail
                label={isArabic ? "ملاءمة DOMINASE" : "DOMINASE fit"}
                value={localized(recommendation.dominaseFit, recommendation.dominaseFitAr, isArabic)}
              />
              <Detail
                label={isArabic ? "ملاحظة مخاطرة" : "Risk note"}
                value={localized(recommendation.riskNotes, recommendation.riskNotesAr, isArabic)}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <p>
      <span className="font-bold text-foreground/80">{label}: </span>
      {value}
    </p>
  );
}

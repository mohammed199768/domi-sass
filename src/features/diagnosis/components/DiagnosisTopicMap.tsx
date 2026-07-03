"use client";

import { Check } from "lucide-react";
import type { DiagnosisAnswerMap, DiagnosisDimension, DiagnosisTopic } from "../lib/types";
import { isDiagnosisAnswerComplete } from "../lib/scoring";
import { localized } from "../lib/localization";

/* Desktop topic map: 6 dimensions grouped, 13 question nodes with
 * answered / current / pending states. Answered nodes navigate back. */
export default function DiagnosisTopicMap({
  items,
  answers,
  activeIndex,
  onNavigate,
  isArabic,
}: {
  items: Array<{ dimension: DiagnosisDimension; topic: DiagnosisTopic }>;
  answers: DiagnosisAnswerMap;
  activeIndex: number;
  onNavigate: (index: number) => void;
  isArabic: boolean;
}) {
  const firstIncomplete = items.findIndex(({ topic }) => !isDiagnosisAnswerComplete(answers[topic.id]));
  const reachable = firstIncomplete === -1 ? items.length - 1 : firstIncomplete;

  const groups: Array<{ dimension: DiagnosisDimension; entries: Array<{ topic: DiagnosisTopic; index: number }> }> = [];
  items.forEach(({ dimension, topic }, index) => {
    const group = groups[groups.length - 1];
    if (group && group.dimension.id === dimension.id) group.entries.push({ topic, index });
    else groups.push({ dimension, entries: [{ topic, index }] });
  });

  return (
    <nav
      className="rounded-2xl border border-border bg-surface p-4"
      aria-label={isArabic ? "خريطة المحاور" : "Topic map"}
    >
      <p className="font-display text-[11px] font-black uppercase tracking-[0.2em] text-muted">
        {isArabic ? "خريطة التشخيص" : "Diagnostic map"}
      </p>
      <ol className="mt-4 space-y-4">
        {groups.map((group) => {
          const answered = group.entries.filter(({ topic }) => isDiagnosisAnswerComplete(answers[topic.id])).length;
          return (
            <li key={group.dimension.id}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-xs font-bold leading-5 text-foreground/85">
                  {localized(group.dimension.title, group.dimension.titleAr, isArabic)}
                </p>
                <span className="shrink-0 text-[11px] font-bold text-muted" dir="ltr">
                  {answered}/{group.entries.length}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {group.entries.map(({ topic, index }) => {
                  const complete = isDiagnosisAnswerComplete(answers[topic.id]);
                  const active = index === activeIndex;
                  const enabled = complete || index <= reachable;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      disabled={!enabled}
                      onClick={() => onNavigate(index)}
                      aria-current={active ? "step" : undefined}
                      title={localized(topic.label, topic.labelAr, isArabic)}
                      className={`grid h-8 w-8 place-items-center rounded-full border text-[11px] font-black transition-[border-color,background-color,opacity] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme ${
                        active
                          ? "border-primary-theme bg-primary-theme/10 text-primary-theme ring-1 ring-primary-theme/40"
                          : complete
                            ? "border-primary-theme/45 bg-primary-theme/10 text-primary-theme"
                            : enabled
                              ? "border-border text-muted hover:border-primary-theme/40"
                              : "cursor-not-allowed border-border text-muted opacity-40"
                      }`}
                      dir="ltr"
                    >
                      {complete && !active ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : index + 1}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

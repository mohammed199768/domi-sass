"use client";

import type { CSSProperties } from "react";
import type { DiagnosisDimensionScore } from "../lib/types";
import { localized } from "../lib/localization";

/* CSS-only dimension comparison: current bar (emerald), target marker (cyan),
 * gap label per row. Bars are always LTR so 1→5 reads consistently. */
export default function DiagnosisDimensionChart({
  dimensions,
  min,
  max,
  isArabic,
}: {
  dimensions: DiagnosisDimensionScore[];
  min: number;
  max: number;
  isArabic: boolean;
}) {
  const toPercent = (value: number) => ((value - min) / (max - min)) * 100;

  return (
    <section className="rounded-[1.6rem] border border-border bg-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-xl font-black text-foreground">
          {isArabic ? "الأبعاد: الحالي مقابل المطلوب" : "Dimensions: current vs target"}
        </h3>
        <p className="flex items-center gap-4 text-xs font-extrabold text-foreground/85">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-4 rounded-full" style={{ background: "var(--diag-current)" }} aria-hidden="true" />
            {isArabic ? "الحالي" : "Current"}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-[3px] rounded-full" style={{ background: "var(--diag-target)" }} aria-hidden="true" />
            {isArabic ? "المطلوب" : "Target"}
          </span>
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {dimensions.map((dimension) => {
          const currentPercent = toPercent(dimension.averageCurrent);
          const targetPercent = toPercent(dimension.averageTarget);
          return (
            <div key={dimension.dimensionId}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-bold text-foreground/90">
                  {localized(dimension.title, dimension.titleAr, isArabic)}
                </p>
                <p className="shrink-0 text-xs font-extrabold text-foreground/80" dir="ltr">
                  {dimension.averageCurrent.toFixed(1)} → {dimension.averageTarget.toFixed(1)}
                  <span className="ms-2 text-primary-theme">
                    {isArabic ? "فجوة" : "gap"} {dimension.averageGap.toFixed(1)}
                  </span>
                </p>
              </div>
              <div className="relative mt-2 h-3 rounded-full bg-surface-muted" dir="ltr">
                <div
                  className="absolute inset-y-0 start-0 rounded-full"
                  style={{
                    width: `${currentPercent}%`,
                    background:
                      "linear-gradient(90deg, color-mix(in srgb, var(--diag-current) 55%, transparent), var(--diag-current))",
                  }}
                />
                <span
                  className="absolute top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full"
                  style={
                    {
                      left: `calc(${targetPercent}% - 1.5px)`,
                      background: "var(--diag-target)",
                    } as CSSProperties
                  }
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

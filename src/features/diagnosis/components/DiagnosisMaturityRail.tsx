"use client";

import type { CSSProperties } from "react";

/* Premium dual-accent maturity rail. One instance per value (current/target).
 * The input keeps dir="ltr" so 1→5 always reads left→right, even in RTL. */
export default function DiagnosisMaturityRail({
  label,
  hint,
  value,
  touched,
  accent,
  min,
  max,
  step,
  onChange,
  isArabic,
}: {
  label: string;
  hint: string;
  value: number;
  touched: boolean;
  accent: "current" | "target";
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  isArabic: boolean;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  const railStyle = { "--diag-fill": `${percent}%` } as CSSProperties;
  const accentClass = accent === "current" ? "diag-rail--current" : "diag-rail--target";
  const accentVar = accent === "current" ? "var(--diag-current)" : "var(--diag-target)";
  const ticks = Array.from({ length: max - min + 1 }, (_, index) => min + index);

  return (
    <div className="rounded-2xl border border-border bg-background p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-black text-foreground">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: accentVar }}
              aria-hidden="true"
            />
            {label}
          </p>
          <p className="mt-1 text-xs leading-5 text-muted">{hint}</p>
        </div>
        {touched ? (
          <span
            className="rounded-full border px-3 py-1 font-display text-lg font-black"
            style={{ color: accentVar, borderColor: `color-mix(in srgb, ${accentVar} 45%, transparent)` }}
            dir="ltr"
          >
            {formatValue(value)}
          </span>
        ) : (
          <span className="rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-bold text-muted">
            {isArabic ? "لم يتم التحديد بعد" : "Not selected yet"}
          </span>
        )}
      </div>

      <div className="mt-4" dir="ltr">
        <input
          type="range"
          dir="ltr"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={label}
          aria-valuetext={touched ? formatValue(value) : isArabic ? "لم يتم التحديد بعد" : "Not selected yet"}
          onChange={(event) => onChange(Number(event.target.value))}
          className={`diag-rail ${accentClass}${touched ? "" : " diag-rail--idle"}`}
          style={railStyle}
        />
        <div className="relative mt-1 flex justify-between text-[11px] font-bold text-muted">
          {ticks.map((tick) => (
            <span key={tick} className="flex w-4 flex-col items-center gap-0.5">
              <span className="h-1.5 w-px bg-border" aria-hidden="true" />
              {tick}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatValue(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

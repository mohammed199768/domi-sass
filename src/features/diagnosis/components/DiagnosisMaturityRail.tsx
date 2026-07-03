"use client";

import type { CSSProperties } from "react";

/* Premium dual-accent maturity rail. One instance per value (current/target).
 *
 * RTL direction is handled DETERMINISTICALLY, not by native input[dir]:
 *   - The <input> always keeps dir="ltr", so the value semantics are stable
 *     across browsers (drag/keyboard: higher value = physical right).
 *   - In Arabic we mirror the rail with a CSS `scaleX(-1)` transform. This is
 *     applied identically in every engine, so it never inverts unpredictably.
 *     The transform mirrors the thumb, the fill AND the click hit-testing
 *     together, so a click on the visual-left lands on the high value.
 *
 * Net visual result:
 *   English (LTR): 1 on the left,  5 on the right.
 *   Arabic  (RTL): 1 on the right, 5 on the left (right→left = more mature).
 *
 * Scoring is untouched — 5 is always higher than 1; only the visuals mirror. */
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
  // Physical-LTR fill percent; the RTL mirror flips it visually for us.
  const percent = ((value - min) / (max - min)) * 100;
  const railStyle = {
    "--diag-fill": `${percent}%`,
    ...(isArabic ? { transform: "scaleX(-1)" } : {}),
  } as CSSProperties;
  const accentClass = accent === "current" ? "diag-rail--current" : "diag-rail--target";
  const accentVar = accent === "current" ? "var(--diag-current)" : "var(--diag-target)";
  const ticks = Array.from({ length: max - min + 1 }, (_, index) => min + index);

  return (
    <div className="rounded-2xl border border-border bg-background p-3.5 sm:p-4">
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
          <p className="mt-0.5 text-sm font-medium leading-6 text-foreground/80">{hint}</p>
        </div>
        {touched ? (
          <span
            className="shrink-0 rounded-full border px-3 py-1 font-display text-lg font-black tabular-nums"
            style={{
              color: accentVar,
              borderColor: `color-mix(in srgb, ${accentVar} 45%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${accentVar} 8%, transparent)`,
            }}
            dir="ltr"
          >
            {formatValue(value)}
          </span>
        ) : (
          <span className="shrink-0 rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-extrabold text-foreground/85">
            {isArabic ? "لم يتم التحديد بعد" : "Not selected yet"}
          </span>
        )}
      </div>

      <div className="mt-3" dir="ltr">
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
        {/* Ticks mirror the rail: reversed in Arabic so 1 sits on the right. */}
        <div
          className={`relative mt-1 flex justify-between text-xs font-bold text-foreground/75 ${
            isArabic ? "flex-row-reverse" : ""
          }`}
          dir="ltr"
        >
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

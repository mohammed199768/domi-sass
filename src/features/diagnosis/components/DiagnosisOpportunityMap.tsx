"use client";

import type { DiagnosisTopicScore } from "../lib/types";
import { localized } from "../lib/localization";

/* SVG opportunity map. x = gap (urgency), y = topic weight (importance),
 * bubble size = weighted gap impact. Restrained DOMINASE palette only:
 * emerald family for standard gaps, cyan stroke for the top three. */
export default function DiagnosisOpportunityMap({
  topics,
  isArabic,
}: {
  topics: DiagnosisTopicScore[];
  isArabic: boolean;
}) {
  const points = topics.filter((topic) => topic.gap > 0).slice(0, 8);

  const width = 640;
  const height = 380;
  const pad = { top: 28, right: 30, bottom: 46, left: 46 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const maxGap = Math.max(1, ...points.map((point) => point.gap));
  const weights = points.map((point) => (point.gap > 0 ? point.weightedGap / point.gap : 1));
  const maxWeight = Math.max(1, ...weights);
  const maxImpact = Math.max(0.1, ...points.map((point) => point.weightedGap));

  const x = (gap: number) => pad.left + (gap / maxGap) * plotW;
  const y = (weight: number) => pad.top + plotH - (weight / maxWeight) * plotH;
  const r = (impact: number) => 12 + (impact / maxImpact) * 16;

  return (
    <section className="rounded-[1.6rem] border border-border bg-surface p-5 sm:p-7">
      <h3 className="text-xl font-black text-foreground">{isArabic ? "خريطة الفرص" : "Opportunity map"}</h3>
      <p className="mt-1 text-xs leading-6 text-muted">
        {isArabic ? "كل نقطة تمثل فجوة تشخيصية" : "Each point represents a diagnostic gap"}
      </p>

      {points.length === 0 ? (
        <p className="mt-6 rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm leading-7 text-muted">
          {isArabic
            ? "لا توجد فجوات مسجلة — المستوى المطلوب يساوي الحالي في كل المحاور."
            : "No gaps recorded — your target matches your current state across all topics."}
        </p>
      ) : (
        <>
          <div dir="ltr">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="mt-4 h-auto w-full"
              role="img"
              aria-label={isArabic ? "خريطة الفرص" : "Opportunity map"}
            >
              {/* Grid */}
              {[0.25, 0.5, 0.75].map((fraction) => (
                <g key={fraction} stroke="var(--border)" strokeDasharray="3 5">
                  <line
                    x1={pad.left}
                    x2={width - pad.right}
                    y1={pad.top + plotH * fraction}
                    y2={pad.top + plotH * fraction}
                  />
                  <line
                    y1={pad.top}
                    y2={pad.top + plotH}
                    x1={pad.left + plotW * fraction}
                    x2={pad.left + plotW * fraction}
                  />
                </g>
              ))}
              {/* Axes */}
              <line x1={pad.left} x2={width - pad.right} y1={pad.top + plotH} y2={pad.top + plotH} stroke="var(--border)" />
              <line x1={pad.left} x2={pad.left} y1={pad.top} y2={pad.top + plotH} stroke="var(--border)" />
              <text
                x={width / 2}
                y={height - 12}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--muted)"
              >
                {isArabic ? "الإلحاح (حجم الفجوة)" : "Urgency (gap size)"}
              </text>
              <text
                x={16}
                y={height / 2}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--muted)"
                transform={`rotate(-90 16 ${height / 2})`}
              >
                {isArabic ? "الأهمية (الوزن)" : "Importance (weight)"}
              </text>

              {/* Bubbles — drawn largest-first so small ones stay clickable/visible */}
              {points
                .map((point, index) => ({ point, index }))
                .sort((a, b) => b.point.weightedGap - a.point.weightedGap)
                .map(({ point, index }) => {
                  const weight = point.gap > 0 ? point.weightedGap / point.gap : 1;
                  const isTop = index < 3;
                  const accent = isTop ? "var(--diag-target)" : "var(--diag-current)";
                  return (
                    <g key={point.topicId}>
                      <circle
                        cx={x(point.gap)}
                        cy={y(weight)}
                        r={r(point.weightedGap)}
                        fill={accent}
                        fillOpacity="0.14"
                        stroke={accent}
                        strokeWidth="1.5"
                      />
                      <text
                        x={x(point.gap)}
                        y={y(weight)}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="13"
                        fontWeight="800"
                        fill="var(--fg)"
                      >
                        {index + 1}
                      </text>
                    </g>
                  );
                })}
            </svg>
          </div>

          {/* Legend */}
          <ol className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {points.map((point, index) => (
              <li key={point.topicId} className="flex items-baseline gap-2.5 text-xs leading-6 text-muted">
                <span
                  className="font-display font-black"
                  style={{ color: index < 3 ? "var(--diag-target)" : "var(--diag-current)" }}
                  dir="ltr"
                >
                  {index + 1}
                </span>
                <span>
                  {localized(point.label, point.labelAr, isArabic)}
                  <span className="ms-1 font-bold" dir="ltr">
                    ({isArabic ? "فجوة" : "gap"} {point.gap.toFixed(1)})
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
}

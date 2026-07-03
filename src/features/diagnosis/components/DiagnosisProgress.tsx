"use client";

export default function DiagnosisProgress({
  current,
  total,
  isArabic,
}: {
  current: number;
  total: number;
  isArabic: boolean;
}) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between gap-4 text-sm font-bold text-foreground">
        <span>{isArabic ? "التقدم" : "Progress"}</span>
        <span dir="ltr">{current} / {total}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted">
        <div className="h-full rounded-full bg-primary-theme" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

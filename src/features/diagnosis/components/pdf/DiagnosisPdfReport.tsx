"use client";

import { forwardRef, type ReactNode } from "react";
import type { DiagnosisContextAnswers, DiagnosisResult, MatchedDiagnosisRecommendation } from "../../lib/types";
import { localized, localizedList, reportCategories } from "../../lib/localization";

/**
 * Dedicated, print-optimized A4 report layout for the diagnosis PDF.
 *
 * This component is NOT part of the normal results UI. It is mounted offscreen
 * only while a PDF is being generated, then captured page-by-page by
 * `exportDiagnosisReportPdf`. Every color is a literal hex value and no themed
 * CSS variables are used, so html2canvas renders a clean, light, printable
 * document regardless of the visitor's light/dark theme.
 */

/* ── Light printable palette (DOMINASE accent, ink-friendly) ── */
const C = {
  ink: "#0f1a16",
  sub: "#3f4c47",
  muted: "#65746e",
  accent: "#0d8f65",
  accentDeep: "#0c2f26",
  cyan: "#0b8394",
  border: "#e3ebe8",
  soft: "#f4f8f6",
  softAccent: "#eaf5f0",
  white: "#ffffff",
} as const;

const PAGE_WIDTH = 794; // A4 width at 96dpi
const PAGE_MIN_HEIGHT = 1123; // A4 height at 96dpi

const DOMAIN_LABELS_EN: Record<string, string> = {
  clinic: "Clinics",
  venue: "Event venues",
  engineering: "Engineering companies",
  "general-business": "General business",
};

const QR_TARGET = "https://www.dominase.art";

export interface DiagnosisPdfReportProps {
  result: DiagnosisResult;
  contextAnswers: DiagnosisContextAnswers;
  isArabic: boolean;
  qrDataUrl: string | null;
  generatedDate?: Date;
}

const DiagnosisPdfReport = forwardRef<HTMLDivElement, DiagnosisPdfReportProps>(function DiagnosisPdfReport(
  { result, contextAnswers, isArabic, qrDataUrl, generatedDate },
  ref
) {
  const meta = result.assessment.meta;
  const date = generatedDate ?? new Date();
  const dir = isArabic ? "rtl" : "ltr";
  const end = isArabic ? "left" : "right";
  const isClinic = meta.domain === "clinic";
  const { min, max } = meta.scale;

  const institution =
    (contextAnswers.institutionName || "").trim() || (isArabic ? "مؤسستك" : "Your institution");

  const domainLabel = isArabic
    ? meta.domainAr || meta.domain
    : DOMAIN_LABELS_EN[meta.domain] || meta.domain;

  const dateLabel = formatDate(date, isArabic);

  const title = isArabic ? "تقرير تشخيص نمو مؤسستك" : "DOMINASE Growth Diagnosis Report";
  const subtitle = isArabic
    ? "تقرير استراتيجي مقدم من DOMINASE"
    : "A strategic report prepared by DOMINASE";
  const preparedFor = isArabic ? `مقدم إلى: ${institution}` : `Prepared for: ${institution}`;

  const privacyNote = isArabic
    ? "تم إنشاء هذا التقرير داخل المتصفح من إجاباتك، دون إرسال بياناتك إلى DOMINASE أو أي خادم."
    : "This report was generated in your browser from your answers, without sending your data to DOMINASE or any server.";

  const footerNote = isArabic ? `${dateLabel} · dominase.art` : `${dateLabel} · dominase.art`;

  /* Context fields, in form order, with a value present. */
  const contextRows = result.assessment.contextForm.fields
    .map((field) => {
      const raw = (contextAnswers[field.id] || "").trim();
      if (!raw) return null;
      const value = field.id === "optionalNotes" && raw.length > 220 ? `${raw.slice(0, 220)}…` : raw;
      return { label: localized(field.label, field.labelAr, isArabic), value };
    })
    .filter((row): row is { label: string; value: string } => Boolean(row));

  /* Flatten recommendations into paginated pages (keeps QR + footer per page). */
  const recPages = buildRecommendationPages(result, isArabic);

  const qr = qrDataUrl ? (
    <img
      src={qrDataUrl}
      alt="dominase.art"
      width={64}
      height={64}
      style={{ width: 64, height: 64, display: "block", borderRadius: 8 }}
    />
  ) : null;

  return (
    <div
      ref={ref}
      dir={dir}
      lang={isArabic ? "ar" : "en"}
      className={isArabic ? "font-arabic" : "font-sans"}
      style={{
        width: PAGE_WIDTH,
        background: C.white,
        color: C.ink,
        margin: 0,
        padding: 0,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── Page 1 — Cover ── */}
      <PageShell qr={qr} footerNote={footerNote} end={end}>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              background: C.accentDeep,
              color: C.white,
              borderRadius: 20,
              padding: "40px 36px",
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: 3, fontWeight: 800, color: "#8fe6c6", textTransform: "uppercase" }}>
              DOMINASE
            </div>
            <h1 style={{ margin: "18px 0 0", fontSize: 34, lineHeight: 1.25, fontWeight: 800 }}>{title}</h1>
            <p style={{ margin: "14px 0 0", fontSize: 15, color: "#cfe9df", lineHeight: 1.7 }}>{subtitle}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <CoverRow label={isArabic ? "الجهة" : "Prepared for"} value={preparedFor.replace(/^[^:]+:\s*/, "")} />
            <CoverRow label={isArabic ? "المجال" : "Domain"} value={domainLabel} />
            <CoverRow label={isArabic ? "تاريخ الإصدار" : "Generated"} value={dateLabel} />
            <CoverRow
              label={isArabic ? "النمط الأقرب" : "Matched profile"}
              value={localized(result.profile.title, result.profile.titleAr, isArabic)}
            />
          </div>

          <div
            style={{
              background: C.softAccent,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              padding: "16px 18px",
              fontSize: 12.5,
              lineHeight: 1.75,
              color: C.sub,
            }}
          >
            {privacyNote}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {qr}
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
              {isArabic ? "امسح الرمز لزيارة" : "Scan to visit"}
              <br />
              <span style={{ color: C.accent, fontWeight: 700 }}>{QR_TARGET.replace("https://", "")}</span>
            </div>
          </div>
        </div>
      </PageShell>

      {/* ── Page 2 — Executive diagnosis ── */}
      <PageShell qr={qr} footerNote={footerNote} end={end}>
        <SectionHeader
          kicker={isArabic ? "الملخص التنفيذي" : "Executive summary"}
          title={isArabic ? "تشخيص مؤسستك في لمحة" : "Your diagnosis at a glance"}
        />

        {contextRows.length ? (
          <Card>
            <CardTitle>{isArabic ? "سياق مؤسستك" : "Your context"}</CardTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", marginTop: 12 }}>
              {contextRows.map((row) => (
                <div key={row.label} style={{ fontSize: 12.5, lineHeight: 1.6 }}>
                  <span style={{ color: C.muted, fontWeight: 700 }}>{row.label}: </span>
                  <span style={{ color: C.ink }}>{row.value}</span>
                </div>
              ))}
            </div>
          </Card>
        ) : null}

        <Card>
          <CardTitle>{isArabic ? "النمط الأقرب" : "Matched profile"}</CardTitle>
          <h3 style={{ margin: "8px 0 0", fontSize: 18, fontWeight: 800, color: C.ink }}>
            {localized(result.profile.title, result.profile.titleAr, isArabic)}
          </h3>
          <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.75, color: C.sub }}>
            {localized(result.profile.summary, result.profile.summaryAr, isArabic)}
          </p>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <StatBlock label={isArabic ? "الوضع الحالي" : "Current"} value={result.averageCurrent} max={max} color={C.accent} />
          <StatBlock label={isArabic ? "المستوى المطلوب" : "Target"} value={result.averageTarget} max={max} color={C.cyan} />
          <StatBlock label={isArabic ? "متوسط الفجوة" : "Average gap"} value={result.averageGap} max={max - min} color={C.ink} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Card>
            <CardTitle>{isArabic ? "أعلى ثلاثة أبعاد أولوية" : "Top 3 priority dimensions"}</CardTitle>
            <ol style={{ margin: "10px 0 0", paddingInlineStart: 18, color: C.sub }}>
              {result.topPriorityDimensions.map((dim) => (
                <li key={dim.dimensionId} style={{ fontSize: 12.5, lineHeight: 1.9 }}>
                  <span style={{ fontWeight: 700, color: C.ink }}>
                    {localized(dim.title, dim.titleAr, isArabic)}
                  </span>{" "}
                  <span style={{ color: C.muted }} dir="ltr">
                    ({dim.averageCurrent.toFixed(1)} → {dim.averageTarget.toFixed(1)})
                  </span>
                </li>
              ))}
            </ol>
          </Card>
          <Card>
            <CardTitle>{isArabic ? "أعلى ثلاث فجوات" : "Top 3 topic gaps"}</CardTitle>
            <ol style={{ margin: "10px 0 0", paddingInlineStart: 18, color: C.sub }}>
              {result.topTopicGaps.map((topic) => (
                <li key={topic.topicId} style={{ fontSize: 12.5, lineHeight: 1.9 }}>
                  <span style={{ fontWeight: 700, color: C.ink }}>
                    {localized(topic.label, topic.labelAr, isArabic)}
                  </span>{" "}
                  <span style={{ color: C.muted }} dir="ltr">
                    ({topic.current.toFixed(1)} → {topic.target.toFixed(1)})
                  </span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </PageShell>

      {/* ── Page 3 — Detailed analysis (dimensions + gaps) ── */}
      <PageShell qr={qr} footerNote={footerNote} end={end}>
        <SectionHeader
          kicker={isArabic ? "التحليل التفصيلي" : "Detailed analysis"}
          title={isArabic ? "درجات الأبعاد والفجوات" : "Dimension scores & gaps"}
        />

        <Card>
          <CardTitle>{isArabic ? "درجات الأبعاد" : "Dimension scores"}</CardTitle>
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 64px 64px 64px",
                gap: 8,
                paddingBottom: 8,
                borderBottom: `2px solid ${C.border}`,
                fontSize: 11,
                fontWeight: 800,
                color: C.muted,
                textTransform: "uppercase",
                letterSpacing: 0.4,
              }}
            >
              <span>{isArabic ? "البعد" : "Dimension"}</span>
              <span style={{ textAlign: "center" }}>{isArabic ? "الحالي" : "Curr."}</span>
              <span style={{ textAlign: "center" }}>{isArabic ? "المطلوب" : "Target"}</span>
              <span style={{ textAlign: "center" }}>{isArabic ? "الفجوة" : "Gap"}</span>
            </div>
            {result.dimensions.map((dim) => (
              <div
                key={dim.dimensionId}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 64px 64px 64px",
                  gap: 8,
                  padding: "9px 0",
                  borderBottom: `1px solid ${C.border}`,
                  fontSize: 12.5,
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 700, color: C.ink }}>
                  {localized(dim.title, dim.titleAr, isArabic)}
                </span>
                <span style={{ textAlign: "center", color: C.accent, fontWeight: 700 }} dir="ltr">
                  {dim.averageCurrent.toFixed(1)}
                </span>
                <span style={{ textAlign: "center", color: C.cyan, fontWeight: 700 }} dir="ltr">
                  {dim.averageTarget.toFixed(1)}
                </span>
                <span style={{ textAlign: "center", color: C.ink, fontWeight: 800 }} dir="ltr">
                  {dim.averageGap.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>{isArabic ? "ملخص فجوات المواضيع" : "Topic gap summary"}</CardTitle>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {result.topics.map((topic) => (
              <div
                key={topic.topicId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  fontSize: 12.5,
                }}
              >
                <span style={{ color: C.sub, flex: 1 }}>{localized(topic.label, topic.labelAr, isArabic)}</span>
                <span
                  style={{
                    flexShrink: 0,
                    color: topic.gap > 0 ? C.accent : C.muted,
                    fontWeight: 700,
                    border: `1px solid ${C.border}`,
                    borderRadius: 999,
                    padding: "2px 10px",
                  }}
                  dir="ltr"
                >
                  {topic.current.toFixed(1)} → {topic.target.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </PageShell>

      {/* ── Pages 4+ — Recommendations ── */}
      {recPages.map((rows, pageIndex) => (
        <PageShell key={`rec-${pageIndex}`} qr={qr} footerNote={footerNote} end={end}>
          {pageIndex === 0 ? (
            <SectionHeader
              kicker={isArabic ? "التوصيات" : "Recommendations"}
              title={isArabic ? "من التشخيص إلى التنفيذ" : "From diagnosis to execution"}
            />
          ) : (
            <p style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 800, letterSpacing: 1, color: C.muted, textTransform: "uppercase" }}>
              {isArabic ? "التوصيات (تابع)" : "Recommendations (continued)"}
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rows.map((row) =>
              row.type === "header" ? (
                <h3
                  key={row.key}
                  style={{ margin: "6px 0 0", fontSize: 15, fontWeight: 800, color: C.accentDeep }}
                >
                  {row.title}
                </h3>
              ) : (
                <RecommendationCard key={row.rec.id} rec={row.rec} number={row.number} isArabic={isArabic} />
              )
            )}
          </div>
        </PageShell>
      ))}

      {/* ── Final page — Next step + disclaimer ── */}
      <PageShell qr={qr} footerNote={footerNote} end={end}>
        <SectionHeader
          kicker={isArabic ? "الخطوة التالية" : "Next step"}
          title={isArabic ? "حوّل التشخيص إلى خطة تنفيذ" : "Turn the diagnosis into an execution plan"}
        />
        <Card>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: C.sub }}>
            {isArabic
              ? "إذا كانت الفجوات الأعلى مرتبطة بالموقع، الحجز، المتابعة أو CRM، يمكن لـ DOMINASE تحويلها إلى نظام عملي واضح."
              : "If your highest gaps relate to the website, booking, follow-up, or CRM, DOMINASE can turn them into a clear working system."}
          </p>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8, fontSize: 12.5 }}>
            <ContactLine label={isArabic ? "واتساب" : "WhatsApp"} value="+962 7 7966 7168" />
            <ContactLine label={isArabic ? "الموقع" : "Website"} value="dominase.art" />
          </div>
        </Card>

        <Card>
          <CardTitle>{isArabic ? "تنويه" : "Disclaimer"}</CardTitle>
          <p style={{ margin: "10px 0 0", fontSize: 11.5, lineHeight: 1.8, color: C.muted }}>
            {isArabic
              ? "هذا التقرير أداة تشخيص استراتيجية أولية، وليس ضمانًا للنتائج أو بديلًا عن استشارة مهنية متخصصة."
              : "This report is an initial strategic self-assessment. It is not a guarantee of results or a substitute for specialized professional advice."}
          </p>
          {isClinic ? (
            <p style={{ margin: "8px 0 0", fontSize: 11.5, lineHeight: 1.8, color: C.muted }}>
              {isArabic
                ? "لا يقدم هذا التقرير نصيحة طبية أو تشخيصًا للمرضى."
                : "This report does not provide medical advice or patient diagnosis."}
            </p>
          ) : null}
          <p style={{ margin: "8px 0 0", fontSize: 11.5, lineHeight: 1.8, color: C.muted }}>{privacyNote}</p>
        </Card>
      </PageShell>
    </div>
  );
});

export default DiagnosisPdfReport;

/* ──────────────────────────── sub-components ──────────────────────────── */

function PageShell({
  children,
  qr,
  footerNote,
  end,
}: {
  children: ReactNode;
  qr: ReactNode;
  footerNote: string;
  end: "left" | "right";
}) {
  return (
    <section
      data-pdf-page
      style={{
        width: PAGE_WIDTH,
        minHeight: PAGE_MIN_HEIGHT,
        boxSizing: "border-box",
        background: C.white,
        padding: "40px 44px 32px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          paddingBottom: 14,
          marginBottom: 22,
          borderBottom: `2px solid ${C.border}`,
        }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: 1.5, color: C.accentDeep }}>DOMINASE</div>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, color: C.muted, textTransform: "uppercase" }}>
            Growth Diagnosis
          </div>
        </div>
        {qr ? <div style={{ opacity: 0.95 }}>{qr}</div> : null}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>

      <div
        style={{
          marginTop: 22,
          paddingTop: 12,
          borderTop: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 10.5,
          color: C.muted,
        }}
      >
        <span style={{ fontWeight: 700, color: C.accent }}>dominase.art</span>
        <span style={{ textAlign: end }}>{footerNote}</span>
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: C.accent, textTransform: "uppercase" }}>
        {kicker}
      </p>
      <h2 style={{ margin: "6px 0 0", fontSize: 24, fontWeight: 800, color: C.ink, lineHeight: 1.25 }}>{title}</h2>
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        background: C.soft,
        padding: "16px 18px",
      }}
    >
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: 0.8, color: C.muted, textTransform: "uppercase" }}>
      {children}
    </p>
  );
}

function CoverRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 12, fontSize: 14, lineHeight: 1.6 }}>
      <span style={{ minWidth: 150, color: C.muted, fontWeight: 700 }}>{label}</span>
      <span style={{ color: C.ink, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function StatBlock({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 14, background: C.white, padding: "16px 18px" }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>
        {label}
      </div>
      <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 4 }} dir="ltr">
        <span style={{ fontSize: 30, fontWeight: 800, color }}>{value.toFixed(1)}</span>
        <span style={{ fontSize: 12, color: C.muted, fontWeight: 700 }}>/ {max.toFixed(1)}</span>
      </div>
    </div>
  );
}

function ContactLine({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <span style={{ minWidth: 90, color: C.muted, fontWeight: 700 }}>{label}</span>
      <span style={{ color: C.ink, fontWeight: 600 }} dir="ltr">
        {value}
      </span>
    </div>
  );
}

function RecommendationCard({
  rec,
  number,
  isArabic,
}: {
  rec: MatchedDiagnosisRecommendation;
  number: number;
  isArabic: boolean;
}) {
  const how = localizedList(rec.how, rec.howAr, isArabic).filter(Boolean);
  const details: Array<{ label: string; value: string }> = [
    { label: isArabic ? "أثر الموقع" : "Website implication", value: localized(rec.websiteImplication, rec.websiteImplicationAr, isArabic) },
    { label: isArabic ? "أثر النظام" : "System implication", value: localized(rec.systemImplication, rec.systemImplicationAr, isArabic) },
    { label: isArabic ? "ملاءمة DOMINASE" : "DOMINASE fit", value: localized(rec.dominaseFit, rec.dominaseFitAr, isArabic) },
    { label: isArabic ? "ملاحظة مخاطرة" : "Risk note", value: localized(rec.riskNotes, rec.riskNotesAr, isArabic) },
  ].filter((d) => Boolean(d.value));

  return (
    <article
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        background: C.white,
        padding: "14px 16px",
        breakInside: "avoid",
        pageBreakInside: "avoid",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span
          style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            borderRadius: 999,
            background: C.softAccent,
            border: `1px solid ${C.accent}`,
            color: C.accent,
            fontSize: 12,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {number}
        </span>
        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: C.ink, lineHeight: 1.4 }}>
          {localized(rec.title, rec.titleAr, isArabic)}
        </h4>
      </div>

      <p style={{ margin: "10px 0 0", fontSize: 12, lineHeight: 1.7, color: C.sub }}>
        {localized(rec.why, rec.whyAr, isArabic)}
      </p>

      {how.length ? (
        <ul style={{ margin: "8px 0 0", paddingInlineStart: 18, color: C.muted }}>
          {how.map((item, i) => (
            <li key={i} style={{ fontSize: 12, lineHeight: 1.65 }}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {details.length ? (
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 18px" }}>
          {details.map((d) => (
            <p key={d.label} style={{ margin: 0, fontSize: 11, lineHeight: 1.6, color: C.muted }}>
              <span style={{ fontWeight: 700, color: C.sub }}>{d.label}: </span>
              {d.value}
            </p>
          ))}
        </div>
      ) : null}
    </article>
  );
}

/* ──────────────────────────── helpers ──────────────────────────── */

type RecRow =
  | { type: "header"; key: string; title: string }
  | { type: "item"; rec: MatchedDiagnosisRecommendation; number: number };

const ITEMS_PER_PAGE = 3;

/** Flatten grouped recommendations into fixed-size pages so each PDF page
 *  carries its own QR/footer and no page overflows badly. */
function buildRecommendationPages(result: DiagnosisResult, isArabic: boolean): RecRow[][] {
  const rows: RecRow[] = [];
  let number = 0;

  reportCategories.forEach((category) => {
    const items = result.recommendationsByCategory[category];
    if (!items || items.length === 0) return;
    const section = result.sections[category];
    rows.push({
      type: "header",
      key: `header-${category}`,
      title: localized(section.title, section.titleAr, isArabic),
    });
    items.forEach((rec) => {
      number += 1;
      rows.push({ type: "item", rec, number });
    });
  });

  const pages: RecRow[][] = [];
  let current: RecRow[] = [];
  let itemCount = 0;

  const flush = () => {
    if (current.length) pages.push(current);
    current = [];
    itemCount = 0;
  };

  rows.forEach((row) => {
    if (row.type === "item") {
      if (itemCount >= ITEMS_PER_PAGE) flush();
      current.push(row);
      itemCount += 1;
    } else {
      // Keep a category header with the items that follow it.
      if (itemCount >= ITEMS_PER_PAGE) flush();
      current.push(row);
    }
  });
  flush();

  // Guard against an orphan header ending a page with no items after it.
  return pages.filter((page) => page.some((row) => row.type === "item"));
}

function formatDate(date: Date, isArabic: boolean): string {
  try {
    return new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

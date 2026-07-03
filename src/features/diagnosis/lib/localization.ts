import type { DiagnosisReportSection, DiagnosisReportTemplates, ReportCategory } from "./types";

export const reportCategories: ReportCategory[] = [
  "strategicDiagnosis",
  "customerProfile",
  "websiteStructure",
  "conversionPath",
  "contentAndTrust",
  "salesFollowUp",
  "quickWins",
  "dominaseNextStep",
];

export function localized(value: string | undefined, valueAr: string | undefined, isArabic: boolean) {
  return isArabic && valueAr ? valueAr : value || valueAr || "";
}

export function localizedList(value: string | string[] | undefined, valueAr: string | string[] | undefined, isArabic: boolean) {
  const selected = isArabic && valueAr ? valueAr : value || valueAr || [];
  return Array.isArray(selected) ? selected : [selected];
}

export function normalizeSections(templates: DiagnosisReportTemplates) {
  const sections = templates.sections;
  const normalized = {} as Record<ReportCategory, DiagnosisReportSection>;

  if (Array.isArray(sections)) {
    sections.forEach((section) => {
      normalized[section.id || section.category] = section;
    });
  } else {
    Object.assign(normalized, sections);
  }

  reportCategories.forEach((category) => {
    normalized[category] ||= {
      id: category,
      category,
      title: splitCamel(category),
      fallback: "Keep this area steady while you complete the remaining diagnosis.",
    };
  });

  return normalized;
}

function splitCamel(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

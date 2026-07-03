import clinicData from "./clinic-diagnosis.json";
import venueData from "./venue-diagnosis.json";
import engineeringData from "./engineering-diagnosis.json";
import generalBusinessData from "./general-business-diagnosis.json";
import type { DiagnosisAssessment, DiagnosisSlug } from "@/features/diagnosis/lib/types";

export const diagnosisRegistry = {
  clinic: {
    slug: "clinic",
    title: "Clinic Growth Diagnosis",
    titleAr: "تشخيص نمو العيادة",
    description: "A strategic diagnosis for clinic clarity, patient trust, booking flow, follow-up, and digital readiness.",
    descriptionAr: "تشخيص استراتيجي لوضوح العيادة وثقة المريض ومسار الحجز والمتابعة والجاهزية الرقمية.",
    domain: "clinic",
    data: clinicData as DiagnosisAssessment,
  },
  venue: {
    slug: "venue",
    title: "Venue Growth Diagnosis",
    titleAr: "تشخيص نمو القاعة",
    description: "A strategic diagnosis for visual trust, package clarity, availability inquiries, lead follow-up, and digital readiness.",
    descriptionAr: "تشخيص استراتيجي للثقة البصرية ووضوح الباقات واستفسارات التوفر والمتابعة والجاهزية الرقمية.",
    domain: "venue",
    data: venueData as DiagnosisAssessment,
  },
  engineering: {
    slug: "engineering",
    title: "Engineering Company Growth Diagnosis",
    titleAr: "تشخيص نمو الشركة الهندسية",
    description: "A strategic diagnosis for project focus, portfolio proof, credentials, quote flow, follow-up, and digital readiness.",
    descriptionAr: "تشخيص استراتيجي لتركيز المشاريع وإثبات الأعمال والاعتمادات ومسار العروض والمتابعة والجاهزية الرقمية.",
    domain: "engineering",
    data: engineeringData as DiagnosisAssessment,
  },
  "general-business": {
    slug: "general-business",
    title: "General Business Growth Diagnosis",
    titleAr: "تشخيص نمو النشاط التجاري",
    description: "A strategic diagnosis for offer clarity, trust, conversion path, follow-up, content, and digital readiness.",
    descriptionAr: "تشخيص استراتيجي لوضوح العرض والثقة ومسار التحويل والمتابعة والمحتوى والجاهزية الرقمية.",
    domain: "general-business",
    data: generalBusinessData as DiagnosisAssessment,
  },
} satisfies Record<DiagnosisSlug, {
  slug: DiagnosisSlug;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  domain: string;
  data: DiagnosisAssessment;
}>;

export const diagnosisEntries = Object.values(diagnosisRegistry);

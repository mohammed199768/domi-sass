import type { Metadata } from "next";
import ManalCaseStudyLabPage from "@/features/case-study-lab/manal/ManalCaseStudyLabPage";

export const metadata: Metadata = {
  title: "منال الحيحي — مختبر دراسة حالة",
  robots: { index: false, follow: false },
  description: "تجربة حركية لتحويل دورات مبعثرة إلى منصة تدريب منظمة.",
};

export default function Page() {
  return <ManalCaseStudyLabPage />;
}

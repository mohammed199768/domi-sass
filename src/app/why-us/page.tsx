import type { Metadata } from "next";
import WhyUsClient from "@/features/why-us/WhyUsClient";

export const metadata: Metadata = {
  title: "Why Us? — DOMINASE",
  description:
    "Built like a system, not a template. The DOMINASE method: diagnose, architect, build, refine — cinematic, bilingual digital systems engineered around your customer's next step.",
};

export default function WhyUsPage() {
  return <WhyUsClient />;
}

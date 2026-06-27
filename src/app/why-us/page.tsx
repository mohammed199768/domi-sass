import type { Metadata } from "next";
import WhyUsPageClient from "@/features/why-us/WhyUsPageClient";

export const metadata: Metadata = {
  title: "Why Us? — DOMINASE",
  description: "A strategic page explaining how DOMINASE builds websites and digital systems around clarity, conversion, direct communication, and long-term support.",
};

export default function WhyUsPage() {
  return <WhyUsPageClient />;
}

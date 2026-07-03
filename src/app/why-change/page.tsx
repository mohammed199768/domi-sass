import type { Metadata } from "next";
import WhyChangeClient from "@/features/why-change/WhyChangeClient";

export const metadata: Metadata = {
  title: "Why Change? — DOMINASE",
  description:
    "Standing still is not neutral. A strategic diagnosis of how static websites, scattered attention, unclear paths, and weak digital systems create silent loss before customers ever contact you.",
};

export default function WhyChangePage() {
  return <WhyChangeClient />;
}

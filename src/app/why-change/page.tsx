import type { Metadata } from "next";
import WhyChangeClient from "@/features/why-change/WhyChangeClient";

export const metadata: Metadata = {
  title: "Why Change? — DOMINASE",
  description:
    "Standing still is not neutral. A strategic diagnosis of why static websites quietly lose attention, trust, and customers — and what a real digital system changes.",
};

export default function WhyChangePage() {
  return <WhyChangeClient />;
}

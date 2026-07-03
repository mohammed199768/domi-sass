import type { Metadata } from "next";
import WhyUsClient from "@/features/why-us/WhyUsClient";

export const metadata: Metadata = {
  title: "Why Us? — DOMINASE",
  description:
    "DOMINASE builds digital systems, websites, dashboards, and workspaces through a direct, founder-led process focused on credibility, speed, bilingual thinking, growth, and post-launch support.",
};

export default function WhyUsPage() {
  return <WhyUsClient />;
}

import type { Metadata } from "next";
import WhyChangeFilmClient from "@/features/why-change/WhyChangeFilmClient";

export const metadata: Metadata = {
  title: "Why Change? — DOMINASE",
  description: "A cinematic story explaining why attention from social media needs a clear digital conversion system to become trust, requests, and customers.",
};

export default function WhyChangePage() {
  return <WhyChangeFilmClient />;
}

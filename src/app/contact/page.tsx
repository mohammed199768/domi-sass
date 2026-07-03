import type { Metadata } from "next";
import ContactOrbitClient from "@/features/contact/ContactOrbitClient";

export const metadata: Metadata = {
  title: "Contact — DOMINASE",
  description:
    "Start a project conversation with DOMINASE through WhatsApp, phone, email, GitHub, Upwork, or the contact form.",
};

export default function ContactPage() {
  return <ContactOrbitClient />;
}

"use client";

import Header from "@/components/Header";
import {
  Hero,
  AboutSection,
  ServicesSection,
  PortfolioSection,
  TestimonialsSection,
  ContactPortalSection
} from "@/features/home";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Header />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactPortalSection />
      <Footer />
    </main>
  );
}

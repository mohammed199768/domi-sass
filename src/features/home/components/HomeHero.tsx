"use client";

import Image from "next/image";
import Link from "next/link";
import ConsultationTrigger from "@/components/consultation/ConsultationTrigger";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FadeIn, Magnet } from "./HomeMotionPrimitives";
import HeroFlowField from "./HeroFlowField";

const COPY = {
  ar: {
    headline: ["نحوّل أفكارك إلى", "منتجات رقمية."],
    subline: "نبني مواقع، منصات وأنظمة متكاملة حول طريقة عملك.",
    primary: "احجز استشارة",
    secondary: "شاهد الأعمال",
    previewAlt: "واجهة منتج رقمي من أعمال DOMINASE",
  },
  en: {
    headline: ["We turn ideas into", "digital products."],
    subline: "We build websites, platforms, and integrated systems around the way you work.",
    primary: "Book a consultation",
    secondary: "View the work",
    previewAlt: "A digital product interface built by DOMINASE",
  },
} as const;

export default function HomeHero() {
  const { language, dir } = useLanguage();
  const copy = COPY[language];

  return (
    <section
      id="home"
      className="signature-hero signature-hero--calm"
      aria-labelledby="signature-hero-title"
    >
      <HeroFlowField />

      {/* Content: in-flow, centered by the flex column parent */}
      <div className="signature-hero__message">
        <FadeIn delay={0.22} y={28}>
          <h1 id="signature-hero-title" className="signature-hero__headline">
            {copy.headline.map((line) => (
              <span className="signature-hero__headline-line" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="signature-hero__subline">{copy.subline}</p>
          <div className="signature-hero__actions signature-hero__actions--centered">
            <ConsultationTrigger ctaLocation="home_hero" originType="home" className="signature-pill signature-pill--primary">
              <span>{copy.primary}</span>
              <ArrowUpRight
                aria-hidden="true"
                className={dir === "rtl" ? "-scale-x-100" : ""}
              />
            </ConsultationTrigger>
            <Link href="#projects" className="signature-pill signature-pill--secondary">
              <span>{copy.secondary}</span>
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Product visual: in-flow below copy, soft-cropped by section overflow:hidden */}
      <div className="signature-hero__stage signature-hero__stage--single">
        <FadeIn delay={0.48} y={36}>
          <Magnet
            padding={150}
            strength={6}
            className="signature-hero__magnet signature-hero__magnet--single"
          >
            <figure className="signature-product-window">
              <Image
                src="/media/product-stories/our-clinic/public-home-wide.webp"
                alt={copy.previewAlt}
                fill
                priority
                sizes="(max-width: 760px) 92vw, 760px"
              />
            </figure>
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}

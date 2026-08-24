"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import ConsultationTrigger from "@/components/consultation/ConsultationTrigger";

export type MarketCopy = {
  ar: {
    eyebrow: string; title: string; lead: string; intro: string;
    needsTitle: string; needs: { title: string; body: string; href: string }[];
    approachTitle: string; approach: string[];
    seoTitle: string; seoBody: string;
    finalTitle: string; finalBody: string; finalCta: string;
  };
  en: {
    eyebrow: string; title: string; lead: string; intro: string;
    needsTitle: string; needs: { title: string; body: string; href: string }[];
    approachTitle: string; approach: string[];
    seoTitle: string; seoBody: string;
    finalTitle: string; finalBody: string; finalCta: string;
  };
};

export default function MarketPageClient({ copy }: { copy: MarketCopy }) {
  const { language, dir } = useLanguage();
  const c = copy[language];
  return <>
    <Header />
    <main className="market-page">
      <header className="market-page__hero">
        <p><MapPin aria-hidden="true" />{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <span>{c.lead}</span>
        <div className="market-page__hero-actions">
          <ConsultationTrigger ctaLocation="market_hero" originType="market" className="domi-action domi-action--primary">{language === "ar" ? "احجز استشارة" : "Book a consultation"}<ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""}/></ConsultationTrigger>
          <Link href="/work" className="domi-action domi-action--secondary">{language === "ar" ? "شاهد الأعمال" : "View work"}</Link>
        </div>
      </header>

      <section className="market-page__intro"><p>{c.intro}</p></section>

      <section className="market-page__services">
        <header><span>01</span><h2>{c.needsTitle}</h2></header>
        <div>{c.needs.map((item)=><article key={item.title}><h3>{item.title}</h3><p>{item.body}</p><Link href={item.href}>{language === "ar" ? "تفاصيل أكثر" : "Learn more"}<ArrowUpRight aria-hidden="true"/></Link></article>)}</div>
      </section>

      <section className="market-page__approach">
        <header><span>02</span><h2>{c.approachTitle}</h2></header>
        <ol>{c.approach.map((item,index)=><li key={item}><i>{String(index+1).padStart(2,"0")}</i><CheckCircle2 aria-hidden="true"/><span>{item}</span></li>)}</ol>
      </section>

      <section className="market-page__seo">
        <span>03 / Search & growth</span><h2>{c.seoTitle}</h2><p>{c.seoBody}</p>
        <div><Link href="/insights/seo-discoverability-2026">{language === "ar" ? "اقرأ دليل SEO" : "Read the SEO guide"}</Link><Link href="/insights/cta-that-matches-intent">{language === "ar" ? "كيف نختار CTA" : "How we choose CTAs"}</Link></div>
      </section>

      <section className="market-page__final"><div><h2>{c.finalTitle}</h2><p>{c.finalBody}</p></div><ConsultationTrigger ctaLocation="market_closing" originType="market" className="domi-action domi-action--primary">{language === "ar" ? "احجز استشارة" : "Book a consultation"}<ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""}/></ConsultationTrigger></section>
    </main>
    <Footer />
  </>;
}

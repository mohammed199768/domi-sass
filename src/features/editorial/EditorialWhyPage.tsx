"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationTrigger from "@/components/consultation/ConsultationTrigger";
import { useLanguage } from "@/context/LanguageContext";

export type EditorialSection = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  callout?: { label: string; text: string };
  cards?: { title: string; body: string }[];
  pairs?: { before: string; after: string }[];
  flow?: string[];
};

export type EditorialPageCopy = {
  breadcrumb: string;
  title: string;
  lead: string;
  readTime: string;
  topics: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  summaryLabel: string;
  summary: string;
  summaryPoints: string[];
  tocLabel: string;
  sections: EditorialSection[];
  final: { eyebrow: string; title: string; body: string; primary: string; secondary: string };
};

export default function EditorialWhyPage({ copy }: { copy: { ar: EditorialPageCopy; en: EditorialPageCopy } }) {
  const { language, dir } = useLanguage();
  const c = copy[language];

  return (
    <>
      <Header />
      <main className="editorial-page">
        <header className="editorial-hero">
          <span className="editorial-crumb">{c.breadcrumb}</span>
          <h1>{c.title}</h1>
          <p className="editorial-lead">{c.lead}</p>
          <div className="editorial-meta">
            <span>{c.readTime}</span>{c.topics.map((topic) => <span key={topic}>{topic}</span>)}
          </div>
          <div className="editorial-actions">
            <ConsultationTrigger ctaLocation="editorial_why_opening" originType="company" className="domi-action domi-action--primary">{language === "ar" ? "احجز استشارة" : "Book a consultation"}<ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""}/></ConsultationTrigger>
            <Link href={c.secondary.href} className="domi-action domi-action--secondary">{c.secondary.label}</Link>
          </div>
        </header>

        <section className="editorial-summary" aria-label={c.summaryLabel}>
          <div>
            <span>{c.summaryLabel}</span>
            <p>{c.summary}</p>
            <div className="editorial-summary__points">
              {c.summaryPoints.map((point) => <article key={point}><CheckCircle2 aria-hidden="true"/><p>{point}</p></article>)}
            </div>
          </div>
        </section>

        <div className="editorial-shell">
          <aside className="editorial-toc">
            <h2>{c.tocLabel}</h2>
            <nav>{c.sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span>{String(index + 1).padStart(2,"0")}</span>{section.title}</a>)}</nav>
          </aside>

          <article className="editorial-article">
            {c.sections.map((section) => (
              <section key={section.id} id={section.id} className="editorial-section">
                <span className="editorial-eyebrow">{section.eyebrow}</span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

                {section.callout ? <aside className="editorial-callout"><span>{section.callout.label}</span><p>{section.callout.text}</p></aside> : null}

                {section.cards ? <div className="editorial-card-list">{section.cards.map((card,index) => <article key={card.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{card.title}</h3><p>{card.body}</p></article>)}</div> : null}

                {section.pairs ? <div className="editorial-pairs">{section.pairs.map((pair) => <div key={pair.before}><article><small>{language === "ar" ? "قبل" : "Before"}</small><strong>{pair.before}</strong></article><article><small>{language === "ar" ? "بعد" : "After"}</small><strong>{pair.after}</strong></article></div>)}</div> : null}

                {section.flow ? <div className="editorial-flow" aria-label={section.title}>{section.flow.map((item,index) => <span key={item}>{item}{index < section.flow!.length - 1 ? <i>→</i> : null}</span>)}</div> : null}
              </section>
            ))}

            <section className="editorial-final">
              <span>{c.final.eyebrow}</span><h2>{c.final.title}</h2><p>{c.final.body}</p>
              <div><ConsultationTrigger ctaLocation="editorial_why_closing" originType="company" className="domi-action domi-action--primary">{language === "ar" ? "احجز استشارة" : "Book a consultation"}<ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""}/></ConsultationTrigger><Link href="/work" className="domi-action domi-action--secondary">{c.final.secondary}</Link></div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

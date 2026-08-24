"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import type { Insight } from "@/data/insights";
import RelatedPathways from "@/components/RelatedPathways";
import { insightRelationships } from "@/data/contentRelationships";
import { trackDominaseEvent } from "@/lib/analytics";

const UI = {
  ar: {
    back: "كل المقالات",
    contents: "في هذا المقال",
    byline: "بقلم DOMINASE",
    mediaAlt: "واجهة منتج رقمي من أعمال DOMINASE",
  },
  en: {
    back: "All insights",
    contents: "In this article",
    byline: "By DOMINASE",
    mediaAlt: "A digital product interface built by DOMINASE",
  },
} as const;

function Contents({ sections, label }: { sections: Insight["en"]["sections"]; label: string }) {
  return (
    <nav aria-label={label}>
      {sections.map((section, index) => (
        <a key={section.heading} href={`#section-${index + 1}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>{section.heading}
        </a>
      ))}
    </nav>
  );
}

export default function InsightArticleClient({ article }: { article: Insight }) {
  const { language, dir } = useLanguage();
  const content = article[language];
  const ui = UI[language];
  const showContents = content.sections.length >= 3;
  const inlineRelationship = insightRelationships[article.slug]?.find((item) => item.kind === "service");

  return (
    <>
      <Header />
      <main className="insight-article">
        <header className="insight-article__hero">
          <Link href="/insights" className="insight-article__back">
            <ArrowLeft aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} />{ui.back}
          </Link>
          <p>{content.kicker}</p>
          <h1>{content.title}</h1>
          <span>{content.excerpt}</span>
          <div className="insight-article__meta">
            <small>{ui.byline}</small>
            <small><time dateTime={article.published}>{article.published}</time></small>
            <small>{content.readTime}</small>
          </div>
          <figure className="insight-article__cover">
            <Image src={article.cover} alt={ui.mediaAlt} fill priority sizes="(max-width: 900px) 94vw, 960px" />
          </figure>
        </header>

        {showContents && (
          <details className="insight-article__mobile-toc">
            <summary>{ui.contents}</summary>
            <Contents sections={content.sections} label={ui.contents} />
          </details>
        )}

        <div className="insight-article__shell">
          {showContents && (
            <aside>
              <h2>{ui.contents}</h2>
              <Contents sections={content.sections} label={ui.contents} />
            </aside>
          )}
          <article className="insight-prose">
            {content.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading}>
                <span className="insight-article__index">{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
                {section.callout && <blockquote>{section.callout}</blockquote>}
                {index === 0 && inlineRelationship ? (
                  <Link
                    href={inlineRelationship.href}
                    className="insight-inline-link"
                    onClick={() => trackDominaseEvent("related_service_click", { page_path: window.location.pathname, language, cta_location: "article_inline", destination: inlineRelationship.href })}
                  >
                    <span>{inlineRelationship[language].category}</span>
                    <strong>{inlineRelationship[language].title}</strong>
                  </Link>
                ) : null}
              </section>
            ))}
          </article>
        </div>
        <RelatedPathways items={insightRelationships[article.slug] ?? []} ctaLocation={`article_${article.slug}`} />
      </main>
      <Footer />
    </>
  );
}

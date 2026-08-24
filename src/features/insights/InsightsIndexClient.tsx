"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { insights, type Insight } from "@/data/insights";
import ConsultationTrigger from "@/components/consultation/ConsultationTrigger";

const COPY = {
  ar: {
    eyebrow: "DOMINASE / المقالات",
    title: "ملاحظات عملية لبناء منتجات رقمية أوضح.",
    lead: "عن UX والأنظمة وSEO والتحويل—والقرارات التي تربط تجربة المستخدم بطريقة عمل المنتج.",
    featured: "المقال المميز",
    read: "اقرأ المقال",
    all: "الكل",
    browse: "تصفّح المقالات",
    empty: "لا توجد مقالات أخرى في هذا التصنيف حالياً.",
    footerTitle: "هل تواجه مشكلة مشابهة؟",
    footerBody: "حوّل الفكرة إلى قرار يناسب سياق منتجك.",
    footerCta: "احجز استشارة",
  },
  en: {
    eyebrow: "DOMINASE / Insights",
    title: "Practical notes for building clearer digital products.",
    lead: "UX, systems, SEO, and conversion—the decisions connecting user experience to how a product actually works.",
    featured: "Featured insight",
    read: "Read article",
    all: "All",
    browse: "Browse articles",
    empty: "There are no other articles in this category yet.",
    footerTitle: "Working through a similar problem?",
    footerBody: "Turn the idea into a decision shaped around your product context.",
    footerCta: "Book a consultation",
  },
} as const;

function categoryOf(article: Insight, language: "ar" | "en") {
  return article[language].kicker.split("/")[0].trim();
}

function ArticleCard({ article, language }: { article: Insight; language: "ar" | "en" }) {
  const content = article[language];
  return (
    <Link href={`/insights/${article.slug}`} className="insight-card">
      <article>
        <figure>
          <Image src={article.cover} alt="" fill sizes="(max-width: 760px) 94vw, 38vw" />
        </figure>
        <div>
          <p>{content.kicker}</p>
          <h2>{content.title}</h2>
          <span>{content.excerpt}</span>
          <small><time dateTime={article.published}>{article.published}</time> · {content.readTime}</small>
        </div>
      </article>
    </Link>
  );
}

export default function InsightsIndexClient() {
  const { language, dir } = useLanguage();
  const copy = COPY[language];
  const [activeCategory, setActiveCategory] = useState("all");
  const featured = insights[0];
  const featuredContent = featured[language];
  const categories = insights.map((article) => ({
    id: categoryOf(article, "en").toLowerCase(),
    label: categoryOf(article, language),
  })).filter((category, index, array) => array.findIndex((item) => item.id === category.id) === index);
  const visibleArticles = activeCategory === "all"
    ? insights.slice(1)
    : insights.filter((article) => categoryOf(article, "en").toLowerCase() === activeCategory);

  return (
    <>
      <Header />
      <main className="insights-index">
        <header className="insights-index__header">
          <p>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <span>{copy.lead}</span>
        </header>

        <section className="insights-featured" aria-labelledby="featured-insight-title">
          <figure>
            <Image
              src={featured.cover}
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 94vw, 58vw"
            />
          </figure>
          <div>
            <p>{copy.featured} · {featuredContent.kicker}</p>
            <h2 id="featured-insight-title">{featuredContent.title}</h2>
            <span>{featuredContent.excerpt}</span>
            <small><time dateTime={featured.published}>{featured.published}</time> · {featuredContent.readTime}</small>
            <Link href={`/insights/${featured.slug}`} className="domi-action domi-action--primary">
              {copy.read}<ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} />
            </Link>
          </div>
        </section>

        <section className="insights-library" aria-labelledby="insights-library-title">
          <div className="insights-library__heading">
            <h2 id="insights-library-title">{copy.browse}</h2>
            <div className="insights-filter" aria-label={copy.browse}>
              <button type="button" aria-pressed={activeCategory === "all"} onClick={() => setActiveCategory("all")}>{copy.all}</button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  aria-pressed={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          {visibleArticles.length > 0 ? (
            <div className="insights-library__grid">
              {visibleArticles.map((article) => <ArticleCard key={article.slug} article={article} language={language} />)}
            </div>
          ) : <p className="insights-library__empty">{copy.empty}</p>}
        </section>

        <section className="insights-index__cta">
          <div><h2>{copy.footerTitle}</h2><p>{copy.footerBody}</p></div>
          <ConsultationTrigger ctaLocation="insights_index_closing" originType="insights" className="domi-action domi-action--primary">
            {copy.footerCta}<ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} />
          </ConsultationTrigger>
        </section>
      </main>
      <Footer />
    </>
  );
}

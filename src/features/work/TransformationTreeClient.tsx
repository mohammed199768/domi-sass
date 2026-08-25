"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ConsultationTrigger from "@/components/consultation/ConsultationTrigger";
import InteractiveShowcase, {
  type InteractivePanelItem,
} from "@/components/InteractiveShowcase";
import { useLanguage } from "@/context/LanguageContext";
import { orderedProductStories } from "@/features/product-stories/productStories";

export default function TransformationTreeClient() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const items: InteractivePanelItem[] = orderedProductStories.map((story, index) => ({
    id: story.slug,
    label: story.title,
    title: story.title,
    description: story.opening[language],
    image: story.cover,
    imageAlt: `${story.title} — ${story.category[language]}`,
    eyebrow: story.category[language],
    meta: String(index + 1).padStart(2, "0"),
    href: `/work/${story.slug}`,
    accent: story.accent,
  }));

  return (
    <main
      className="work-index"
      lang={language}
      dir={dir}
    >
      <Header />

      <section className="work-index__hero" aria-labelledby="work-index-title">
        <div className="work-index__hero-card">
          <p>{isAr ? "DOMINASE / الأعمال" : "DOMINASE / Work"}</p>
          <h1 id="work-index-title">
            {isAr ? (
              <>
                منتجات ومنصات
                <br />
                وأنظمة مختارة.
              </>
            ) : (
              <>
                Selected digital products,
                <br />
                platforms and systems.
              </>
            )}
          </h1>
          <div className="work-index__hero-note">
            <span>
              {isAr
                ? "تصفّح سبع تجارب تربط ما يراه المستخدم بطريقة عمل المنتج خلف الشاشة."
                : "Browse seven projects that connect the visible experience to the product logic behind it."}
            </span>
            <small>{isAr ? "07 مشاريع" : "07 projects"}</small>
          </div>
        </div>
      </section>

      <InteractiveShowcase
        items={items}
        ariaLabel={isAr ? "تصفّح مشاريع DOMINASE" : "Browse DOMINASE projects"}
        ctaLabel={isAr ? "شاهد المشروع" : "View project"}
        dir={dir}
        variant="work"
      />

      <section className="work-index__close">
        <p>{isAr ? "عندك فكرة تستحق أن تصير حقيقة؟" : "Have something worth building?"}</p>
        <h2>
          {isAr ? "لنكتشف من أين نبدأ." : "Let's find where to begin."}
        </h2>
        <div className="work-index__close-actions">
          <ConsultationTrigger ctaLocation="work_close" originType="work" className="domi-action domi-action--primary">
            {isAr ? "احجز استشارة" : "Book a consultation"}<span aria-hidden="true">↗</span>
          </ConsultationTrigger>
          <Link className="domi-action domi-action--secondary" href="/diagnosis">
            {isAr ? "اكتشف خطوتك الأولى" : "Find your first move"}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

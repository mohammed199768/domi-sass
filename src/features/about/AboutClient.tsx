"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { orderedProductStories } from "@/features/product-stories/productStories";
import ConsultationTrigger from "@/components/consultation/ConsultationTrigger";

const COPY = {
  ar: {
    eyebrow: "DOMINASE / من نحن",
    title: "البرمجيات يجب أن تجعل العمل أبسط.",
    lead: "نبني مواقع ومنصات وأنظمة رقمية تحوّل التعقيد التشغيلي إلى تجربة واضحة للعميل والفريق.",
    whoLabel: "من نحن",
    whoTitle: "شركة برمجيات ومنتجات رقمية من عمّان.",
    who: [
      "نعمل مع الشركات والمشاريع التي تحتاج أكثر من واجهة جميلة: رحلة أوضح، عملية أسهل، ونظاماً يستطيع الفريق تشغيله بثقة.",
      "نبدأ من المشكلة كما تحدث فعلياً—أين يتردد العميل، أين تتكرر الخطوات، وأين تضيع المعلومة—ثم نحدد إن كان الحل موقعاً أو منصة أو نظاماً مترابطاً.",
      "التصميم والبرمجة والمحتوى ليست مراحل منفصلة عندنا. هي قرارات تعمل معاً حتى يقود المنتج إلى نتيجة مفهومة.",
    ],
    principlesLabel: "وجهة نظرنا",
    principlesTitle: "ثلاثة قرارات تضبط كل مشروع.",
    principles: [
      ["نفهم قبل أن نبني", "نرسم المشكلة والمستخدم والنتيجة المطلوبة قبل اختيار الواجهة أو التقنية."],
      ["نبسّط قبل أن نضيف", "كل خطوة وميزة ومعلومة يجب أن تبرر مكانها في الرحلة."],
      ["نبني حول النتيجة", "نقيس نجاح المنتج بما يسهّله للعميل والعمل، لا بعدد الشاشات."],
    ],
    processLabel: "كيف نعمل",
    processTitle: "مسار واضح من المشكلة إلى منتج يعمل.",
    process: [
      ["نفهم", "المستخدمون، القيود والنتيجة المطلوبة."],
      ["نحدّد", "النطاق، الأولويات وسير العمل."],
      ["نصمّم", "البنية، الرحلات والواجهة."],
      ["نبني", "المنتج والمنطق والبيانات."],
      ["نقيس", "الأداء، الاستخدام والنتائج."],
    ],
    capabilitiesLabel: "القدرات",
    capabilitiesTitle: "ما نساعدك على بنائه.",
    capabilities: ["مواقع الشركات والخدمات", "المنتجات والمنصات الرقمية", "الأنظمة ولوحات الإدارة", "المنصات التعليمية", "تجارب العيادات والحجز", "UX والمحتوى وSEO"],
    capabilitiesCta: "استكشف الخدمات",
    proofLabel: "أعمال مختارة",
    proofTitle: "المشكلة تختلف، لذلك يختلف المنتج.",
    proofBody: "نماذج حقيقية توضّح كيف يتحول السياق إلى تجربة ونظام مختلفين.",
    viewProject: "شاهد المشروع",
    allWork: "شاهد كل الأعمال",
    finalTitle: "لديك شيء تريد بناءه؟",
    finalBody: "ابدأ بالمشكلة الحالية والنتيجة التي تريدها. سنساعدك على تحديد الخطوة العملية التالية.",
    finalCta: "احجز استشارة",
  },
  en: {
    eyebrow: "DOMINASE / About",
    title: "Software should make the business simpler.",
    lead: "We build websites, platforms, and digital systems that turn operational complexity into a clear experience for customers and teams.",
    whoLabel: "Who we are",
    whoTitle: "A software and digital product company from Amman.",
    who: [
      "We work with businesses that need more than a polished interface: a clearer journey, an easier operation, and a system the team can run with confidence.",
      "We begin with the problem as it actually happens—where customers hesitate, steps repeat, or information disappears—then decide whether the answer is a website, platform, or connected system.",
      "Design, software, and content are not separate lanes here. They are decisions that work together to produce a clear result.",
    ],
    principlesLabel: "Our point of view",
    principlesTitle: "Three decisions guide every project.",
    principles: [
      ["Understand before building", "Map the problem, user, and required outcome before choosing an interface or technology."],
      ["Simplify before adding", "Every step, feature, and piece of information must earn its place in the journey."],
      ["Build around the outcome", "Judge the product by what it makes easier for customers and the business—not its screen count."],
    ],
    processLabel: "How we work",
    processTitle: "A clear path from problem to working product.",
    process: [
      ["Understand", "Users, constraints, and the required outcome."],
      ["Define", "Scope, priorities, and workflow."],
      ["Design", "Architecture, journeys, and interface."],
      ["Build", "Product, logic, and data."],
      ["Measure", "Performance, use, and outcomes."],
    ],
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "What we help you build.",
    capabilities: ["Company and service websites", "Digital products and platforms", "Business systems and dashboards", "Education platforms", "Clinic and booking journeys", "UX, content, and SEO"],
    capabilitiesCta: "Explore services",
    proofLabel: "Selected context",
    proofTitle: "Different problems produce different products.",
    proofBody: "Real examples of how context becomes a distinct experience and operating system.",
    viewProject: "View project",
    allWork: "View all work",
    finalTitle: "Have something you want to build?",
    finalBody: "Start with the current problem and the result you need. We will help identify the practical next move.",
    finalCta: "Book a consultation",
  },
} as const;

export default function AboutClient() {
  const { language, dir } = useLanguage();
  const copy = COPY[language];
  const selectedWork = orderedProductStories.slice(0, 3);

  return (
    <>
      <Header />
      <main className="about-page">
        <header className="about-opening">
          <p className="about-kicker">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="about-lead">{copy.lead}</p>
        </header>

        <section className="about-editorial about-who" aria-labelledby="about-who-title">
          <header>
            <p>{copy.whoLabel}</p>
            <h2 id="about-who-title">{copy.whoTitle}</h2>
          </header>
          <div className="about-who__copy">
            {copy.who.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="about-editorial about-principles" aria-labelledby="about-principles-title">
          <header>
            <p>{copy.principlesLabel}</p>
            <h2 id="about-principles-title">{copy.principlesTitle}</h2>
          </header>
          <ol>
            {copy.principles.map(([title, body], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-editorial about-process" aria-labelledby="about-process-title">
          <header>
            <p>{copy.processLabel}</p>
            <h2 id="about-process-title">{copy.processTitle}</h2>
          </header>
          <ol>
            {copy.process.map(([title, body], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-editorial about-capabilities" aria-labelledby="about-capabilities-title">
          <header>
            <p>{copy.capabilitiesLabel}</p>
            <h2 id="about-capabilities-title">{copy.capabilitiesTitle}</h2>
          </header>
          <div>
            <ul>{copy.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
            <Link href="/services" className="domi-action domi-action--secondary">
              {copy.capabilitiesCta}<ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="about-editorial about-proof" aria-labelledby="about-proof-title">
          <header>
            <p>{copy.proofLabel}</p>
            <h2 id="about-proof-title">{copy.proofTitle}</h2>
            <span>{copy.proofBody}</span>
          </header>
          <div className="about-proof__list">
            {selectedWork.map((story) => (
              <Link href={`/work/${story.slug}`} key={story.slug}>
                <span>{story.category[language]}</span>
                <strong>{story.title}</strong>
                <small>{copy.viewProject} ↗</small>
              </Link>
            ))}
          </div>
          <Link href="/work" className="domi-action domi-action--secondary">{copy.allWork}</Link>
        </section>

        <section className="about-closing">
          <h2>{copy.finalTitle}</h2>
          <p>{copy.finalBody}</p>
          <ConsultationTrigger ctaLocation="about_closing" originType="about" className="domi-action domi-action--primary">
            {copy.finalCta}<ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} />
          </ConsultationTrigger>
        </section>
      </main>
      <Footer />
    </>
  );
}

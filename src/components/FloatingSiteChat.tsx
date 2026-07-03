"use client";

/**
 * FloatingSiteChat — the "DOMINASE Guide".
 *
 * An honest, local, rule-based assistant. It answers ONLY from a curated
 * bilingual knowledge base built from the site's own content (services,
 * /why-change, /why-us, /contact, and src/constants/contact.ts). It never
 * claims to be connected to live AI, never invents prices, metrics, client
 * approvals, or guarantees, and calls no external service — there is no API
 * key anywhere in the client.
 *
 * Future-proofing: `answerQuestion` is the single seam. A real AI backend can
 * later replace it with a fetch to an internal server route (e.g.
 * POST /api/guide) without touching the UI; secrets would live server-side.
 *
 * Motion: opacity/transform transitions only; the global reduced-motion rule
 * collapses them. No backdrop-filter, no blur, no infinite animation.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { MessageSquare, Send, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_CHANNELS } from "@/constants/contact";

/* ── Types ────────────────────────────────────────────────────────────────── */

type ChatLink = { label: string; href: string; external?: boolean };
type ChatMessage = { id: number; role: "user" | "guide"; text: string; links?: ChatLink[] };
type Lang = "en" | "ar";

/* ── Curated knowledge base (site content only — no invented claims) ──────── */

type KbEntry = {
  id: string;
  keywords: { en: string[]; ar: string[] };
  answer: Record<Lang, string>;
  links?: (lang: Lang) => ChatLink[];
};

const contactLinks = (lang: Lang): ChatLink[] => [
  { label: lang === "ar" ? "صفحة التواصل" : "Contact page", href: "/contact" },
  { label: "WhatsApp", href: CONTACT_CHANNELS.whatsapp.href, external: true },
];

const KB: KbEntry[] = [
  {
    id: "what-we-build",
    keywords: {
      en: ["build", "services", "offer", "do you make", "what does", "website", "web app", "saas", "system"],
      ar: ["تبنون", "خدمات", "تقدمون", "ماذا", "موقع", "منصة", "نظام", "تصميم"],
    },
    answer: {
      en: "DOMINASE builds cinematic websites, SaaS interfaces, dashboards, and operational digital systems — not template pages. The focus is turning your business goals into a working digital system: structure, interface, performance, and the flows that move a visitor toward a decision.",
      ar: "DOMINASE يبني مواقع سينمائية، وواجهات SaaS، ولوحات تحكم، وأنظمة رقمية تشغيلية — وليس صفحات قوالب جاهزة. التركيز على تحويل أهداف عملك إلى نظام رقمي فعّال: هيكلة، وواجهة، وأداء، ومسارات تنقل الزائر نحو اتخاذ القرار.",
    },
    links: (lang) => [{ label: lang === "ar" ? "أعمالنا" : "Our work", href: "/work" }],
  },
  {
    id: "why-website",
    keywords: {
      en: ["social media", "instagram", "facebook", "why do i need", "already have", "page enough"],
      ar: ["سوشيال", "انستغرام", "فيسبوك", "لماذا أحتاج", "يكفي", "حسابات التواصل"],
    },
    answer: {
      en: "Social media rents you an audience; a website is infrastructure you own. On your own platform you control the journey, the credibility, the data, and the conversion path — none of which an algorithm can take away. The /why-change page walks through this argument in depth.",
      ar: "حسابات التواصل تستأجر لك جمهوراً؛ أما الموقع فهو بنية تحتية تملكها. على منصتك الخاصة تتحكم في الرحلة والمصداقية والبيانات ومسار التحويل — ولا يمكن لأي خوارزمية أن تسلبك ذلك. صفحة «لماذا التغيير؟» تشرح هذا بعمق.",
    },
    links: (lang) => [{ label: lang === "ar" ? "لماذا التغيير؟" : "Why Change?", href: "/why-change" }],
  },
  {
    id: "different",
    keywords: {
      en: ["different", "why you", "why dominase", "unique", "better", "special", "makes you"],
      ar: ["يميزكم", "لماذا أنتم", "لماذا دومينيس", "مختلف", "أفضل"],
    },
    answer: {
      en: "DOMINASE does not sell ready-made templates — it builds an engine for business growth. The method is founder-led and direct: diagnosis before code, trust architecture in planning, cinematic execution, and continuous improvement after launch. Bilingual (Arabic/English) thinking is built in from the start.",
      ar: "DOMINASE لا يبيع قوالب جاهزة — بل يبني محركاً لنمو عملك. المنهجية مباشرة وبقيادة المؤسس: تشخيص قبل الكود، وهندسة ثقة في التخطيط، وتنفيذ سينمائي، وتحسين مستمر بعد الإطلاق. التفكير ثنائي اللغة (عربي/إنجليزي) جزء أساسي من البناء.",
    },
    links: (lang) => [{ label: lang === "ar" ? "لماذا نحن؟" : "Why Us?", href: "/why-us" }],
  },
  {
    id: "process",
    keywords: {
      en: ["process", "how does it work", "workflow", "steps", "stages", "method", "start a project", "how do we begin"],
      ar: ["العملية", "كيف تعملون", "الخطوات", "المراحل", "المنهجية", "نبدأ"],
    },
    answer: {
      en: "The DOMINASE method has four stages: 1) Diagnosis — understanding your customer and the one action you want them to take, before any code. 2) Trust architecture — planning every page and button around a decision path. 3) Living build — a responsive, high-performance cinematic execution. 4) Continuous improvement — monitoring and refining after launch.",
      ar: "منهجية DOMINASE من أربع مراحل: 1) التشخيص — فهم عميلك والإجراء الذي تريده منه قبل كتابة أي كود. 2) هندسة الثقة — تخطيط كل صفحة وزر حول مسار القرار. 3) البناء الحي — تنفيذ سينمائي متجاوب وعالي الأداء. 4) التحسين المستمر — مراقبة وتطوير بعد الإطلاق.",
    },
    links: (lang) => [{ label: lang === "ar" ? "لماذا نحن؟" : "Why Us?", href: "/why-us" }],
  },
  {
    id: "dashboards",
    keywords: {
      en: ["dashboard", "booking", "appointment", "admin", "crm", "operations", "internal tool", "workspace"],
      ar: ["لوحة تحكم", "حجوزات", "مواعيد", "إدارة", "أدوات داخلية", "نظام تشغيلي"],
    },
    answer: {
      en: "Yes — operational systems are a core part of the studio's work: dashboards, booking and appointment management, project tracking, and workspaces that organize how a business actually runs. Recent client work includes exactly this kind of system. Share your use case and DOMINASE will map it to a concrete build.",
      ar: "نعم — الأنظمة التشغيلية جزء أساسي من عمل الاستوديو: لوحات تحكم، وإدارة حجوزات ومواعيد، وتتبع مشاريع، ومساحات عمل تنظّم سير العمل الفعلي. أعمال العملاء الأخيرة تتضمن هذا النوع من الأنظمة تحديداً. شارك حالتك وسيحوّلها DOMINASE إلى خطة بناء ملموسة.",
    },
    links: contactLinks,
  },
  {
    id: "contact",
    keywords: {
      en: ["contact", "reach", "call", "phone", "email", "whatsapp", "talk", "get in touch", "hire"],
      ar: ["تواصل", "اتصال", "هاتف", "بريد", "واتساب", "أتحدث", "توظيف"],
    },
    answer: {
      en: `You can reach DOMINASE directly: WhatsApp or phone at ${CONTACT_CHANNELS.phone.display}, email at ${CONTACT_CHANNELS.email.display}, or the contact page — it has every channel plus a project form.`,
      ar: `يمكنك الوصول إلى DOMINASE مباشرة: واتساب أو هاتف على ${CONTACT_CHANNELS.phone.display}، أو بريد إلكتروني على ${CONTACT_CHANNELS.email.display}، أو عبر صفحة التواصل — وفيها كل القنوات مع نموذج للمشروع.`,
    },
    links: contactLinks,
  },
  {
    id: "languages",
    keywords: {
      en: ["arabic", "english", "language", "bilingual", "rtl", "translate"],
      ar: ["عربي", "إنجليزي", "لغة", "ثنائي", "ترجمة"],
    },
    answer: {
      en: "Yes — Arabic and English are both first-class here. The studio designs bilingual experiences from the start (including proper RTL layouts and Arabic typography), and this site itself runs fully in both languages.",
      ar: "نعم — العربية والإنجليزية كلتاهما أساسيتان هنا. الاستوديو يصمم تجارب ثنائية اللغة من البداية (بما في ذلك تخطيطات RTL الصحيحة والخطوط العربية)، وهذا الموقع نفسه يعمل بالكامل باللغتين.",
    },
  },
  {
    id: "pricing",
    keywords: {
      en: ["price", "cost", "how much", "budget", "rate", "quote"],
      ar: ["سعر", "تكلفة", "كم", "ميزانية", "عرض"],
    },
    answer: {
      en: "Pricing depends on the scope of the system — there is no fixed menu here, and I would not want to guess a number for you. Share your project through the contact page or WhatsApp and DOMINASE will come back with a concrete next step.",
      ar: "التسعير يعتمد على نطاق النظام — لا توجد قائمة أسعار ثابتة هنا، ولا أريد تخمين رقم لك. شارك مشروعك عبر صفحة التواصل أو واتساب وسيعود إليك DOMINASE بالخطوة التالية الملموسة.",
    },
    links: contactLinks,
  },
];

const FALLBACK: Record<Lang, string> = {
  en: "That is a good question, and I would rather not guess — I only answer from what is on this site. DOMINASE can clarify it directly: send it through the contact page or WhatsApp and you will get a real answer.",
  ar: "سؤال وجيه، وأفضّل ألا أخمّن — فأنا أجيب فقط مما هو موجود في هذا الموقع. يمكن لـ DOMINASE توضيحه مباشرة: أرسله عبر صفحة التواصل أو واتساب وستحصل على إجابة حقيقية.",
};

const GREETING: Record<Lang, string> = {
  en: "Hi — I am the DOMINASE Guide. I answer from this site's content: services, process, pages, and how to reach the studio. What would you like to know?",
  ar: "أهلاً — أنا دليل DOMINASE. أجيب من محتوى هذا الموقع: الخدمات، والمنهجية، والصفحات، وطرق التواصل مع الاستوديو. ماذا تودّ أن تعرف؟",
};

const SUGGESTIONS: Record<Lang, { label: string; question: string }[]> = {
  en: [
    { label: "What does DOMINASE build?", question: "What does DOMINASE build?" },
    { label: "Why a website if I have social media?", question: "Why do I need a website if I have social media?" },
    { label: "What makes DOMINASE different?", question: "What makes DOMINASE different?" },
    { label: "How does your process work?", question: "How does your process work?" },
    { label: "Dashboards or booking systems?", question: "Can you build dashboards or booking systems?" },
    { label: "How can I contact you?", question: "How can I contact you?" },
    { label: "Arabic and English?", question: "Do you support Arabic and English?" },
  ],
  ar: [
    { label: "ماذا يبني DOMINASE؟", question: "ماذا يبني DOMINASE؟" },
    { label: "لماذا موقع ولدي سوشيال ميديا؟", question: "لماذا أحتاج موقعاً ولدي حسابات سوشيال ميديا؟" },
    { label: "ما الذي يميز DOMINASE؟", question: "ما الذي يميز DOMINASE؟" },
    { label: "كيف تعمل منهجيتكم؟", question: "كيف تعمل منهجيتكم؟" },
    { label: "لوحات تحكم أو أنظمة حجوزات؟", question: "هل تبنون لوحات تحكم أو أنظمة حجوزات؟" },
    { label: "كيف أتواصل معكم؟", question: "كيف أتواصل معكم؟" },
    { label: "هل تدعمون العربية والإنجليزية؟", question: "هل تدعمون العربية والإنجليزية؟" },
  ],
};

/* ── Local matching (the future server-route seam) ────────────────────────── */

function answerQuestion(raw: string, lang: Lang): { text: string; links?: ChatLink[] } {
  const q = raw.toLowerCase();
  let best: { entry: KbEntry; score: number } | null = null;

  for (const entry of KB) {
    const keywords = [...entry.keywords.en, ...entry.keywords.ar];
    let score = 0;
    for (const kw of keywords) {
      if (q.includes(kw.toLowerCase())) score += kw.length > 4 ? 2 : 1;
    }
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  }

  if (!best) {
    return { text: FALLBACK[lang], links: contactLinks(lang) };
  }
  return { text: best.entry.answer[lang], links: best.entry.links?.(lang) };
}

/* ── Component ────────────────────────────────────────────────────────────── */

let nextId = 1;

export default function FloatingSiteChat() {
  const { language, dir } = useLanguage();
  const lang: Lang = language;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<number | null>(null);

  // Escape closes; focus returns to the trigger.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, open]);

  // Clear any pending reply timer on unmount.
  useEffect(() => {
    return () => {
      if (replyTimer.current !== null) window.clearTimeout(replyTimer.current);
    };
  }, []);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    setInput("");
    setMessages((prev) => [...prev, { id: nextId++, role: "user", text: trimmed }]);
    // Small human-paced delay (one-shot timeout — not an animation loop).
    if (replyTimer.current !== null) window.clearTimeout(replyTimer.current);
    replyTimer.current = window.setTimeout(() => {
      const { text, links } = answerQuestion(trimmed, lang);
      setMessages((prev) => [...prev, { id: nextId++, role: "guide", text, links }]);
    }, 320);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(input);
  };

  const copy =
    lang === "ar"
      ? {
          open: "افتح دليل DOMINASE",
          close: "أغلق الدليل",
          title: "دليل DOMINASE",
          subtitle: "اسأل عن الخدمات، المنهجية، الصفحات، أو التواصل.",
          inputLabel: "اكتب سؤالك",
          placeholder: "اكتب سؤالك هنا…",
          send: "إرسال",
          suggested: "أسئلة مقترحة",
        }
      : {
          open: "Open the DOMINASE Guide",
          close: "Close the guide",
          title: "DOMINASE Guide",
          subtitle: "Ask about services, process, pages, or contact.",
          inputLabel: "Type your question",
          placeholder: "Type your question…",
          send: "Send",
          suggested: "Suggested questions",
        };

  return (
    <>
      {/* Chat panel — compact floating card, opposite side from WhatsApp. */}
      <section
        dir={dir}
        aria-label={copy.title}
        aria-hidden={!open}
        inert={!open}
        className={`premium-surface fixed left-4 z-[45] flex w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl transition-[opacity,transform] duration-300 ease-out ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 4.75rem)",
          maxHeight: "min(30rem, calc(100dvh - 8rem))",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border bg-surface-hover px-5 py-4">
          <div>
            <p className="font-display flex items-center gap-2 text-sm font-black tracking-wide text-foreground">
              {copy.title}
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary-theme" />
            </p>
            <p className="mt-1 text-xs leading-5 text-muted">{copy.subtitle}</p>
          </div>
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            aria-label={copy.close}
            tabIndex={open ? 0 : -1}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-primary-theme hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={logRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          <ChatBubble role="guide" text={GREETING[lang]} />
          {messages.map((message) => (
            <ChatBubble key={message.id} role={message.role} text={message.text} links={message.links} />
          ))}
        </div>

        {/* Suggested questions */}
        <div className="border-t border-border px-4 pb-2 pt-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">{copy.suggested}</p>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {SUGGESTIONS[lang].map((s) => (
              <button
                key={s.label}
                type="button"
                suppressHydrationWarning
                tabIndex={open ? 0 : -1}
                onClick={() => ask(s.question)}
                className="shrink-0 rounded-full border border-border bg-surface-hover px-3.5 py-1.5 text-xs font-semibold text-muted transition-colors duration-200 hover:border-primary-theme/60 hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border px-4 py-3">
          <input
            ref={inputRef}
            suppressHydrationWarning
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-label={copy.inputLabel}
            placeholder={copy.placeholder}
            tabIndex={open ? 0 : -1}
            className="min-w-0 flex-1 rounded-full border border-border bg-surface-hover px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/25"
          />
          <button
            type="submit"
            suppressHydrationWarning
            aria-label={copy.send}
            tabIndex={open ? 0 : -1}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--domi-accent)_35%,var(--domi-border-strong))] bg-surface text-primary-theme transition-colors duration-200 hover:border-primary-theme hover:text-secondary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </section>

      {/* Trigger — bottom-left, opposite the WhatsApp control. */}
      <button
        ref={triggerRef}
        type="button"
        suppressHydrationWarning
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? copy.close : copy.open}
        aria-expanded={open}
        title={copy.title}
        className="premium-surface fixed left-5 z-30 grid h-12 w-12 place-items-center rounded-full text-primary-theme transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-primary-theme hover:text-secondary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme active:translate-y-0 active:scale-[0.98]"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
      >
        <MessageSquare className="h-5 w-5" />
      </button>
    </>
  );
}

/* ── Message bubble ───────────────────────────────────────────────────────── */

function ChatBubble({ role, text, links }: { role: "user" | "guide"; text: string; links?: ChatLink[] }) {
  const isGuide = role === "guide";
  return (
    <div className={`flex ${isGuide ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl border px-4 py-3 text-sm leading-6 ${
          isGuide
            ? "border-border bg-surface-hover text-foreground"
            : "border-[color-mix(in_srgb,var(--domi-accent)_30%,var(--domi-border))] bg-[color-mix(in_srgb,var(--domi-accent)_12%,var(--domi-surface))] text-foreground"
        }`}
      >
        <p>{text}</p>
        {links && links.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-primary-theme transition-colors duration-200 hover:border-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-primary-theme transition-colors duration-200 hover:border-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

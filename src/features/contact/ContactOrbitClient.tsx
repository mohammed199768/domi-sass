"use client";

/**
 * /contact — the DOMINASE contact orbit.
 *
 * A slow technical signal ring: six contact actions rotating around the
 * DOMINASE hub. Pure CSS transform animation (see contact-orbit.module.css),
 * no JS animation loop, no per-frame state. Each icon counter-rotates so it
 * stays upright; hover/focus pauses the ring; reduced motion disables it.
 *
 * Contact destinations are the site's existing sources only:
 *   - WhatsApp / phone / email → CONTACT_CHANNELS (src/constants/contact.ts)
 *   - GitHub / Upwork          → GITHUB_URL / UPWORK_URL (same URLs as Footer)
 *   - Message                  → reveals the Formspree form below (same
 *     ContactForm + FORMSPREE_ENDPOINT as the homepage — no second endpoint).
 */

import { useEffect, useRef, useState } from "react";
import { Github, Mail, Phone, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppMark from "@/components/icons/WhatsAppMark";
import ContactForm from "@/features/home/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_CHANNELS, GITHUB_URL, UPWORK_URL } from "@/constants/contact";
import { scrollToSection } from "@/lib/motion/scrollToSection";
import styles from "./contact-orbit.module.css";

/* ── Bilingual page copy (local to this feature, like /why-us) ────────────── */

const COPY = {
  en: {
    eyebrow: "DOMINASE / Contact",
    title: "One ring. Every way to reach us.",
    subtitle:
      "Pick the channel that fits how you work — a direct call, a quick WhatsApp, a formal email, or a written brief through the form.",
    hubSubtitle: "Digital Product Studio",
    orbitLabel: "Contact channels orbit",
    items: {
      whatsapp: "WhatsApp",
      phone: "Call",
      github: "GitHub",
      upwork: "Upwork",
      email: "Email",
      message: "Message",
    },
    aria: {
      whatsapp: "Open WhatsApp chat with DOMINASE",
      phone: "Call DOMINASE by phone",
      github: "Open the DOMINASE GitHub profile",
      upwork: "Open the DOMINASE Upwork profile",
      email: "Send an email to DOMINASE",
      message: "Open the message form below",
    },
    message: {
      title: "Start the conversation with DOMINASE",
      subtitle:
        "Share the project idea, the current problem, or the digital path you want to improve. We will reply with the next useful step.",
      submit: "Send message",
    },
  },
  ar: {
    eyebrow: "DOMINASE / تواصل",
    title: "دائرة واحدة. كل طرق الوصول إلينا.",
    subtitle:
      "اختر القناة التي تناسب طريقة عملك — مكالمة مباشرة، رسالة واتساب سريعة، بريد رسمي، أو ملخص مكتوب عبر النموذج.",
    hubSubtitle: "استوديو منتجات رقمية",
    orbitLabel: "مدار قنوات التواصل",
    items: {
      whatsapp: "واتساب",
      phone: "اتصال",
      github: "GitHub",
      upwork: "Upwork",
      email: "البريد",
      message: "رسالة",
    },
    aria: {
      whatsapp: "افتح محادثة واتساب مع DOMINASE",
      phone: "اتصل بـ DOMINASE هاتفياً",
      github: "افتح حساب DOMINASE على GitHub",
      upwork: "افتح حساب DOMINASE على Upwork",
      email: "أرسل بريداً إلكترونياً إلى DOMINASE",
      message: "افتح نموذج الرسالة بالأسفل",
    },
    message: {
      title: "ابدأ المحادثة مع DOMINASE",
      subtitle:
        "اكتب فكرة المشروع، المشكلة الحالية، أو المسار الرقمي الذي تريد تحسينه. سنرد عليك بالخطوة التالية المناسبة.",
      submit: "أرسل الرسالة",
    },
  },
} as const;

/* ── Orbit geometry (static math, computed once at module load) ───────────── */

type OrbitItemId = "whatsapp" | "phone" | "github" | "upwork" | "email" | "message";

const ORBIT_ORDER: OrbitItemId[] = ["whatsapp", "phone", "github", "upwork", "email", "message"];

/** Physical top/left offsets on the ring; start at 12 o'clock, step 60°. */
const ORBIT_POSITIONS = ORBIT_ORDER.map((id, index) => {
  const angle = (Math.PI / 180) * (-90 + (360 / ORBIT_ORDER.length) * index);
  return { id, cos: Math.cos(angle), sin: Math.sin(angle) };
});

export default function ContactOrbitClient() {
  const { language } = useLanguage();
  const copy = COPY[language];

  const [messageOpen, setMessageOpen] = useState(false);
  const messageHeadingRef = useRef<HTMLHeadingElement>(null);
  const shouldScrollRef = useRef(false);

  // After the message section mounts, scroll to it and move focus to its
  // heading (keyboard users land where the action took them).
  useEffect(() => {
    if (!messageOpen || !shouldScrollRef.current) return;
    shouldScrollRef.current = false;
    scrollToSection("#contact-message", { updateHash: false });
    messageHeadingRef.current?.focus({ preventScroll: true });
  }, [messageOpen]);

  const openMessage = () => {
    shouldScrollRef.current = true;
    if (messageOpen) {
      // Already open — just scroll back to it.
      scrollToSection("#contact-message", { updateHash: false });
      shouldScrollRef.current = false;
      return;
    }
    setMessageOpen(true);
  };

  const externalProps = { target: "_blank", rel: "noopener noreferrer" } as const;

  const renderIcon = (id: OrbitItemId) => {
    switch (id) {
      case "whatsapp":
        return <WhatsAppMark className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "phone":
        return <Phone className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "github":
        return <Github className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "upwork":
        return (
          <span className={`font-display ${styles.upMark}`} aria-hidden="true">
            UP
          </span>
        );
      case "email":
        return <Mail className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "message":
        return <Send className="h-5 w-5 sm:h-6 sm:w-6" />;
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* ── Orbit hero ─────────────────────────────────────────────────── */}
        <section className="relative overflow-x-clip px-6 pb-16 pt-32 sm:pt-36 lg:pb-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-primary-theme">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary-theme" />
              {copy.eyebrow}
            </p>
            <h1 className="mb-5 max-w-3xl text-4xl font-black leading-tight md:text-5xl">{copy.title}</h1>
            <p className="mb-14 max-w-2xl text-lg leading-8 text-muted sm:mb-16">{copy.subtitle}</p>

            {/* The signal ring */}
            <div className={styles.orbitWrap} role="group" aria-label={copy.orbitLabel}>
              <div className={styles.rotor}>
                {ORBIT_POSITIONS.map(({ id, cos, sin }) => {
                  const shellStyle = {
                    top: `calc(50% + ${sin.toFixed(4)} * var(--orbit-r))`,
                    left: `calc(50% + ${cos.toFixed(4)} * var(--orbit-r))`,
                  };
                  const label = copy.items[id];
                  const ariaLabel = copy.aria[id];

                  if (id === "message") {
                    return (
                      <div key={id} className={styles.itemShell} style={shellStyle}>
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={openMessage}
                          aria-label={ariaLabel}
                          aria-expanded={messageOpen}
                          aria-controls="contact-message"
                          className={`${styles.itemAction} ${styles.counterSpin}`}
                        >
                          {renderIcon(id)}
                          <span className={`font-display ${styles.itemLabel}`}>{label}</span>
                        </button>
                      </div>
                    );
                  }

                  const href =
                    id === "github" ? GITHUB_URL : id === "upwork" ? UPWORK_URL : CONTACT_CHANNELS[id].href;
                  const isExternal =
                    id === "github" || id === "upwork" || CONTACT_CHANNELS[id].external;

                  return (
                    <div key={id} className={styles.itemShell} style={shellStyle}>
                      <a
                        href={href}
                        aria-label={ariaLabel}
                        {...(isExternal ? externalProps : {})}
                        className={`${styles.itemAction} ${styles.counterSpin}`}
                      >
                        {renderIcon(id)}
                        <span className={`font-display ${styles.itemLabel}`}>{label}</span>
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Static center hub */}
              <div className={styles.hub}>
                <div className={styles.hubDisc}>
                  <span className="font-display flex items-center gap-1.5 text-xl font-black tracking-wide text-primary-theme sm:text-2xl">
                    DOMINASE
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary-theme" />
                  </span>
                  <span className="font-display hidden text-[9px] font-bold uppercase tracking-[0.2em] text-muted min-[380px]:block sm:text-[10px]">
                    {copy.hubSubtitle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Message section (revealed by the orbit's Message action) ─────── */}
        {messageOpen && (
          <section
            id="contact-message"
            className="px-6 pb-32 min-[1025px]:pb-24"
            style={{ scrollMarginTop: "6rem" }}
          >
            <div className="mx-auto max-w-2xl">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-theme/35 to-transparent" />
                <h2
                  ref={messageHeadingRef}
                  tabIndex={-1}
                  className="mb-3 text-2xl font-black leading-snug text-foreground outline-none sm:text-3xl"
                >
                  {copy.message.title}
                </h2>
                <p className="mb-8 text-base leading-7 text-muted">{copy.message.subtitle}</p>
                <ContactForm submitLabel={copy.message.submit} />
              </div>
            </div>
          </section>
        )}

        {/* Bottom breathing room so MobileNav never covers the last control. */}
        {!messageOpen && <div className="pb-32 min-[1025px]:pb-16" aria-hidden="true" />}
      </main>
      <Footer />
    </>
  );
}

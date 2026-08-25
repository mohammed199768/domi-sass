"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, Ellipsis, Home, Lightbulb, PanelsTopLeft, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useConsultation } from "@/components/consultation/ConsultationProvider";

const DESTINATIONS = [
  { id: "home", href: "/", icon: Home, en: "Home", ar: "الرئيسية" },
  { id: "work", href: "/work", icon: BriefcaseBusiness, en: "Work", ar: "الأعمال" },
  { id: "services", href: "/services", icon: PanelsTopLeft, en: "Services", ar: "الخدمات" },
  { id: "insights", href: "/insights", icon: Lightbulb, en: "Insights", ar: "المقالات" },
] as const;

const MORE_LINKS = [
  { href: "/studio", en: "Studio", ar: "الاستوديو" },
  { href: "/about", en: "About", ar: "من نحن" },
  { href: "/diagnosis", en: "Digital diagnosis", ar: "التشخيص الرقمي" },
  { href: "/contact", en: "Contact", ar: "تواصل معنا" },
] as const;

export default function MobileNav() {
  const pathname = usePathname();
  return <MobileNavInner key={pathname} pathname={pathname} />;
}

function MobileNavInner({ pathname }: { pathname: string }) {
  const { language } = useLanguage();
  const { openConsultation } = useConsultation();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLButtonElement>(null);
  const isAr = language === "ar";

  useEffect(() => {
    if (!moreOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
        moreRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [moreOpen]);

  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const moreActive = MORE_LINKS.some(({ href }) => pathname.startsWith(href));
  const navLabel = isAr ? "التنقل الرئيسي" : "Primary navigation";
  const consultationLabel = isAr ? "احجز استشارة" : "Book a consultation";

  return (
    <div className="adaptive-shell" dir={isAr ? "rtl" : "ltr"}>
      <button
        type="button"
        className={`adaptive-shell__scrim ${moreOpen ? "is-open" : ""}`}
        aria-label={isAr ? "إغلاق القائمة" : "Close menu"}
        tabIndex={moreOpen ? 0 : -1}
        onClick={() => setMoreOpen(false)}
      />
      <div className={`adaptive-shell__more ${moreOpen ? "is-open" : ""}`} aria-hidden={!moreOpen} inert={!moreOpen}>
        <header>
          <span>{isAr ? "المزيد" : "More from DOMINASE"}</span>
          <button type="button" onClick={() => setMoreOpen(false)} aria-label={isAr ? "إغلاق" : "Close"}><X /></button>
        </header>
        {MORE_LINKS.map((item) => (
          <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}>
            <span>{isAr ? item.ar : item.en}</span>
          </Link>
        ))}
      </div>
      <button
        type="button"
        className="adaptive-shell__consultation"
        onClick={() => openConsultation({ ctaLocation: "adaptive_shell", originType: "global_navigation" })}
      >
        <span>{consultationLabel}</span>
      </button>
      <nav className="adaptive-shell__nav" aria-label={navLabel}>
        <Link href="/" className="adaptive-shell__brand" aria-label="DOMINASE home"><span>D</span><strong>DOMINASE</strong></Link>
        <div className="adaptive-shell__destinations">
          {DESTINATIONS.map((item) => {
            const Icon = item.icon;
            const selected = active(item.href);
            return (
              <Link key={item.id} href={item.href} aria-current={selected ? "page" : undefined} className={selected ? "is-active" : ""}>
                <Icon aria-hidden="true" /><span>{isAr ? item.ar : item.en}</span>
              </Link>
            );
          })}
          <button ref={moreRef} type="button" aria-expanded={moreOpen} className={moreActive ? "is-active" : ""} onClick={() => setMoreOpen((value) => !value)}>
            <Ellipsis aria-hidden="true" /><span>{isAr ? "المزيد" : "More"}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type Role = "center" | "left" | "right" | "back";

type SelectedWork = {
  key: string;
  title: string;
  image: string;
  href: string;
  palette: {
    primary: string;
    secondary: string;
    rail: string;
  };
};

const selectedWorks: SelectedWork[] = [
  {
    key: "curevie",
    title: "Curevie",
    image: "/assest/optimized/images/curevie-lab.webp",
    href: "/work/curevie",
    palette: {
      primary: "#1FA879",
      secondary: "#A8D8C4",
      rail: "rgba(31, 168, 121, 0.18)",
    },
  },
  {
    key: "horvath",
    title: "Horvath",
    image: "/assest/optimized/images/horvath-lab.webp",
    href: "/work/horvath-survey",
    palette: {
      primary: "#4EA8E8",
      secondary: "#D8F0FF",
      rail: "rgba(78, 168, 232, 0.16)",
    },
  },
  {
    key: "manal-alhihi",
    title: "Manal Alhihi",
    image: "/assest/optimized/images/manal-alhihi-lab.webp",
    href: "/work/manal-alhihi",
    palette: {
      primary: "#234A86",
      secondary: "#DDE7F7",
      rail: "rgba(35, 74, 134, 0.2)",
    },
  },
  {
    key: "qaser-al-farah",
    title: "Qaser Al Farah",
    image: "/assest/optimized/images/qaser-lab.webp",
    href: "/work/qasr-alfarah",
    palette: {
      primary: "#B58A3A",
      secondary: "#F3E3BD",
      rail: "rgba(181, 138, 58, 0.16)",
    },
  },
];

const transitionDuration = 0.74;
const stageStep = 1.32;

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function getRole(index: number, activeIndex: number): Role {
  if (index === activeIndex) return "center";
  if (index === (activeIndex + selectedWorks.length - 1) % selectedWorks.length) return "left";
  if (index === (activeIndex + 1) % selectedWorks.length) return "right";
  return "back";
}

function getRoleVars(role: Role, isDesktop: boolean): gsap.TweenVars {
  const desktop: Record<Role, gsap.TweenVars> = {
    center: { left: "50%", top: "52%", scale: 1.02, autoAlpha: 1, zIndex: 30 },
    left: { left: "22%", top: "56%", scale: 0.5, autoAlpha: 0.66, zIndex: 12 },
    right: { left: "78%", top: "56%", scale: 0.5, autoAlpha: 0.66, zIndex: 12 },
    back: { left: "50%", top: "39%", scale: 0.36, autoAlpha: 0.32, zIndex: 5 },
  };

  const tablet: Record<Role, gsap.TweenVars> = {
    center: { left: "50%", top: "53%", scale: 1, autoAlpha: 1, zIndex: 30 },
    left: { left: "17%", top: "57%", scale: 0.42, autoAlpha: 0.58, zIndex: 12 },
    right: { left: "83%", top: "57%", scale: 0.42, autoAlpha: 0.58, zIndex: 12 },
    back: { left: "50%", top: "40%", scale: 0.32, autoAlpha: 0.28, zIndex: 5 },
  };

  return {
    ...(isDesktop ? desktop[role] : tablet[role]),
    xPercent: -50,
    yPercent: -50,
    y: role === "center" ? 0 : role === "back" ? -10 : 8,
    rotate: 0,
    transformOrigin: "50% 50%",
  };
}

function WorkRevealGate() {
  const gateRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTabletUp = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    registerMotionPlugins();

    const gate = gateRef.current;
    const line = lineRef.current;
    const topPanel = topPanelRef.current;
    const bottomPanel = bottomPanelRef.current;
    if (!gate || !line || !topPanel || !bottomPanel) return;

    if (reducedMotion || !isTabletUp) {
      gsap.set(line, { strokeDashoffset: 0, opacity: 1 });
      gsap.set([topPanel, bottomPanel], { clearProps: "all" });
      return;
    }

    const length = line.getTotalLength();
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length, opacity: 0.92 });
    gsap.set([topPanel, bottomPanel], { yPercent: 0, opacity: 1 });

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: gate,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
        .to(line, { strokeDashoffset: 0, duration: 0.42, ease: "none" }, 0)
        .to(topPanel, { yPercent: -9, opacity: 0.3, duration: 0.52, ease: "power2.out" }, 0.34)
        .to(bottomPanel, { yPercent: 9, opacity: 0.3, duration: 0.52, ease: "power2.out" }, 0.34);
    }, gate);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [isTabletUp, reducedMotion]);

  return (
    <section
      ref={gateRef}
      className="relative isolate min-h-[78svh] overflow-hidden bg-background transition-colors duration-300 md:min-h-[118vh]"
      aria-hidden="true"
    >
      <div className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden">
        <div
          ref={topPanelRef}
          className="absolute inset-x-0 top-0 h-1/2 border-b"
          style={{
            borderColor: "color-mix(in srgb, var(--primary) 16%, var(--border))",
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--surface-muted) 44%, transparent), color-mix(in srgb, var(--bg) 96%, transparent))",
          }}
        />
        <div
          ref={bottomPanelRef}
          className="absolute inset-x-0 bottom-0 h-1/2 border-t"
          style={{
            borderColor: "color-mix(in srgb, var(--secondary) 14%, var(--border))",
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--surface-muted) 44%, transparent), color-mix(in srgb, var(--bg) 96%, transparent))",
          }}
        />
        <svg
          className="relative z-10 h-24 w-[min(86vw,940px)]"
          viewBox="0 0 940 96"
          fill="none"
          role="presentation"
        >
          <defs>
            <linearGradient id="workGateStroke" x1="8" y1="48" x2="932" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--primary)" stopOpacity="0.05" />
              <stop offset="0.48" stopColor="var(--primary)" />
              <stop offset="1" stopColor="var(--secondary)" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <path
            ref={lineRef}
            d="M8 48H324L366 29H574L616 48H932"
            stroke="url(#workGateStroke)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M398 48H542"
            stroke="var(--secondary)"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
        </svg>
      </div>
    </section>
  );
}

function SelectedWorkScrollGallery() {
  const { language, t, dir } = useLanguage();
  const isArabic = language === "ar";
  const isRtl = dir === "rtl";
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTabletUp = useMediaQuery("(min-width: 768px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeWork = selectedWorks[activeIndex];
  const sectionLabel = isArabic ? t.portfolio.title : "SELECTED WORK";
  const ctaLabel = isArabic ? "عرض دراسة الحالة" : "View Case Study";

  useEffect(() => {
    registerMotionPlugins();

    const section = sectionRef.current;
    if (!section) return;

    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const glows = glowRefs.current.filter(Boolean) as HTMLDivElement[];

    if (reducedMotion || !isTabletUp) {
      gsap.set([...items, ...glows], { clearProps: "all" });
      return;
    }

    items.forEach((item, index) => {
      gsap.set(item, getRoleVars(getRole(index, 0), isDesktop));
    });
    glows.forEach((glow, index) => {
      gsap.set(glow, { autoAlpha: index === 0 ? 1 : 0 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              selectedWorks.length - 1,
              Math.max(0, Math.round(self.progress * (selectedWorks.length - 1)))
            );
            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        },
      });

      for (let active = 0; active < selectedWorks.length - 1; active += 1) {
        const nextActive = active + 1;
        const at = active * stageStep + 0.42;

        items.forEach((item, index) => {
          tl.to(item, {
            ...getRoleVars(getRole(index, nextActive), isDesktop),
            duration: transitionDuration,
            ease: "power2.inOut",
          }, at);
        });

        tl.to(glows[active], { autoAlpha: 0, duration: transitionDuration * 0.85, ease: "power2.inOut" }, at);
        tl.to(glows[nextActive], { autoAlpha: 1, duration: transitionDuration * 0.85, ease: "power2.inOut" }, at + 0.08);
      }

      tl.to({}, { duration: 0.7 });
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [isDesktop, isTabletUp, reducedMotion]);

  if (reducedMotion || !isTabletUp) {
    return (
      <section
        id="portfolio"
        ref={sectionRef}
        className="relative isolate overflow-hidden bg-background transition-colors duration-300"
        aria-labelledby="selected-work-title"
      >
        <div className="mx-auto max-w-7xl px-5 pt-20">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary-theme">
            {sectionLabel}
          </p>
          <h2 id="selected-work-title" className="mt-3 text-3xl font-black text-foreground">
            {isArabic ? t.portfolio.title : "Selected Work"}
          </h2>
        </div>
        <div className="mx-auto grid max-w-lg gap-8 px-5 py-10">
          {selectedWorks.map((work, index) => {
            const previous = selectedWorks[(index + selectedWorks.length - 1) % selectedWorks.length];
            const next = selectedWorks[(index + 1) % selectedWorks.length];

            return (
              <article
                key={work.key}
                className="relative min-h-[86svh] overflow-hidden rounded-[1.6rem] border bg-background p-4"
                style={{ borderColor: "color-mix(in srgb, var(--primary) 14%, var(--border))" }}
              >
                <SidePresence work={work} visible />
                <div className="pointer-events-none absolute left-[-18%] top-[34%] z-0 aspect-[16/10] w-[54%] -translate-y-1/2 overflow-hidden rounded-2xl border bg-surface-muted opacity-35">
                  <Image src={previous.image} alt="" fill sizes="48vw" className="object-contain p-2" aria-hidden />
                </div>
                <div className="pointer-events-none absolute right-[-18%] top-[62%] z-0 aspect-[16/10] w-[54%] -translate-y-1/2 overflow-hidden rounded-2xl border bg-surface-muted opacity-35">
                  <Image src={next.image} alt="" fill sizes="48vw" className="object-contain p-2" aria-hidden />
                </div>
                <div className="relative z-10 flex h-full min-h-[calc(86svh-2rem)] flex-col justify-center gap-5">
                  <div className={`flex items-center justify-between gap-4 ${isRtl ? "flex-row-reverse text-end" : ""}`}>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-muted">
                      {padIndex(index)} / {padIndex(selectedWorks.length - 1)}
                    </p>
                    <Link
                      href={work.href}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border bg-surface px-4 py-2 text-xs font-black text-foreground transition hover:border-primary-theme hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
                    >
                      {ctaLabel}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <Link href={work.href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme">
                    <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-[1.35rem] border bg-surface shadow-[0_22px_58px_-42px_var(--cool-shadow)]">
                      <Image
                        src={work.image}
                        alt={`${work.title} project preview`}
                        fill
                        sizes="92vw"
                        className="object-contain p-2 transition duration-500 group-hover:scale-[1.015]"
                      />
                    </div>
                  </Link>
                  <p className={`text-lg font-black text-foreground ${isRtl ? "text-end" : ""}`}>
                    {work.title}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative isolate bg-background transition-colors duration-300"
      style={{ minHeight: `${selectedWorks.length * 118}vh` }}
      aria-labelledby="selected-work-title"
    >
      <div className="sticky top-0 min-h-screen overflow-hidden" style={{ contain: "layout paint" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 46%, color-mix(in srgb, var(--surface-muted) 38%, transparent), transparent 58%)",
          }}
          aria-hidden="true"
        />

        {selectedWorks.map((work, index) => (
          <div
            key={`${work.key}-presence`}
            ref={(element) => { glowRefs.current[index] = element; }}
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <SidePresence work={work} visible />
          </div>
        ))}

        <div className={`absolute left-8 top-24 z-40 ${isRtl ? "left-auto right-8 text-end" : ""}`}>
          <p className="text-xs font-black uppercase tracking-[0.32em] text-primary-theme">
            {sectionLabel}
          </p>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
            {isArabic ? "مرر للاستكشاف" : "Scroll to explore"}
          </p>
          <h2 id="selected-work-title" className="sr-only">
            {isArabic ? t.portfolio.title : "Selected Work"}
          </h2>
        </div>

        <div className="absolute inset-0 z-20">
          {selectedWorks.map((work, index) => (
            <Link
              key={work.key}
              ref={(element) => { itemRefs.current[index] = element; }}
              href={work.href}
              tabIndex={activeIndex === index ? 0 : -1}
              aria-hidden={activeIndex !== index}
              aria-label={`${ctaLabel}: ${work.title}`}
              className="group absolute block w-[clamp(420px,68vw,760px)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:w-[clamp(520px,62vw,980px)]"
              style={{ pointerEvents: activeIndex === index ? "auto" : "none" }}
            >
              <div
                className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] border bg-surface shadow-[0_26px_86px_-60px_var(--cool-shadow)] transition-shadow duration-300 group-hover:shadow-[0_32px_96px_-58px_var(--cool-shadow)]"
                style={{
                  borderColor: "color-mix(in srgb, var(--primary) 14%, var(--border))",
                }}
              >
                <Image
                  src={work.image}
                  alt={`${work.title} project preview`}
                  fill
                  sizes="(max-width: 1024px) 68vw, 62vw"
                  priority={index === 0}
                  className="object-contain p-4 lg:p-5"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className={`absolute bottom-10 left-8 z-40 w-[min(28rem,calc(100vw-4rem))] ${isRtl ? "left-auto right-8 text-end" : ""}`}>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-muted">
            {padIndex(activeIndex)} / {padIndex(selectedWorks.length - 1)}
          </p>
          <p className="mt-2 text-2xl font-black text-foreground">
            {activeWork.title}
          </p>
          <Link
            href={activeWork.href}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border bg-surface/90 px-4 py-2 text-xs font-black text-foreground transition hover:border-primary-theme hover:text-primary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme"
          >
            {ctaLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className={`absolute bottom-12 right-8 z-40 flex h-28 items-end gap-2 ${isRtl ? "left-8 right-auto" : ""}`} aria-hidden="true">
          {selectedWorks.map((work, index) => (
            <span
              key={`${work.key}-progress`}
              className="block w-1 origin-bottom rounded-full transition-all duration-300"
              style={{
                height: activeIndex === index ? "4rem" : "2rem",
                opacity: activeIndex === index ? 1 : 0.35,
                background: activeIndex === index ? work.palette.primary : "var(--border)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SidePresence({ work, visible }: { work: SelectedWork; visible?: boolean }) {
  return (
    <>
      <div
        className="absolute inset-y-[8%] left-0 w-[28vw]"
        style={{
          opacity: visible ? 0.62 : 0,
          background: `radial-gradient(76% 58% at 0% 50%, ${work.palette.rail}, transparent 76%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-[10%] right-0 w-[28vw]"
        style={{
          opacity: visible ? 0.52 : 0,
          background: `radial-gradient(76% 58% at 100% 50%, color-mix(in srgb, ${work.palette.secondary} 18%, transparent), transparent 76%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute left-0 top-[14%] h-[72%] w-px"
        style={{
          opacity: visible ? 0.72 : 0,
          background: `linear-gradient(to bottom, transparent, ${work.palette.primary}, transparent)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-[18%] h-[64%] w-px"
        style={{
          opacity: visible ? 0.52 : 0,
          background: `linear-gradient(to bottom, transparent, ${work.palette.secondary}, transparent)`,
        }}
        aria-hidden="true"
      />
    </>
  );
}

export default function SelectedWorkCarousel() {
  return (
    <>
      <WorkRevealGate />
      <SelectedWorkScrollGallery />
    </>
  );
}

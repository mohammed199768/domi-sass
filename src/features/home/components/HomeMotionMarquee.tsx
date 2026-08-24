"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const ROW_ONE = [
  "/media/product-stories/our-clinic/public-home-wide.webp",
  "/media/product-stories/pulse-gym/admin-overview-wide.webp",
  "/media/product-stories/manal-alhihi/learning-world-wide.webp",
  "/media/product-stories/qasr-alfarah/brand-entrance-wide.webp",
  "/media/product-stories/sultan-shadi/editorial-profile-wide.webp",
];

const ROW_TWO = [
  "/media/product-stories/curevie/care-world-wide.webp",
  "/media/product-stories/horvath-survey/assessment-world-wide.webp",
  "/media/product-stories/our-clinic/patient-mobile-wide.webp",
  "/media/product-stories/pulse-gym/member-progress-wide.webp",
  "/media/product-stories/manal-alhihi/course-structure-wide.webp",
];

const ROW_THREE = [
  "/media/product-stories/qasr-alfarah/guest-memory-wide.webp",
  "/media/product-stories/sultan-shadi/selected-work-wide.webp",
  "/media/product-stories/curevie/patient-journey-wide.webp",
  "/media/product-stories/horvath-survey/results-wide.webp",
];

function MarqueeRow({
  images,
  direction,
  speed,
}: {
  images: string[];
  direction: "left" | "right";
  speed: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tripled = useMemo(() => [...images, ...images, ...images], [images]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const section = track.closest(".motion-marquee") as HTMLElement | null;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * speed;
      const base = offset - 190;
      const signed = direction === "right" ? base : -base;
      track.style.transform = `translate3d(${signed}px,0,0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [direction, speed]);

  return (
    <div className="motion-marquee__viewport" aria-hidden="true">
      <div ref={trackRef} className="motion-marquee__track">
        {tripled.map((src, index) => (
          <figure className="motion-marquee__tile" key={`${src}-${index}`}>
            <Image src={src} alt="" fill sizes="420px" loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function HomeMotionMarquee() {
  const { language } = useLanguage();
  return (
    <section id="motion-marquee" className="motion-marquee" aria-label={language === "ar" ? "لقطات من منتجات DOMINASE" : "DOMINASE product motion reel"}>
      <div className="motion-marquee__label">
        <span>DOMINASE / PRODUCT WORLDS</span>
        <i />
        <span>{language === "ar" ? "منتجات حقيقية، واجهات تتحرك" : "REAL PRODUCTS, IN MOTION"}</span>
      </div>
      <MarqueeRow images={ROW_ONE} direction="right" speed={0.26} />
      <MarqueeRow images={ROW_TWO} direction="left" speed={0.33} />
      <MarqueeRow images={ROW_THREE} direction="right" speed={0.22} />
    </section>
  );
}

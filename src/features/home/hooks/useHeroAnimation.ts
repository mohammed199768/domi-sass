import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function useHeroAnimation() {
    const { dir } = useLanguage();
    const prefersReducedMotion = useReducedMotion();
    const componentRef = useRef<HTMLElement>(null);
    const wordmarkRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const root = componentRef.current;
        if (!root) return;

        registerMotionPlugins();

        const heroEyebrow = root.querySelector<HTMLElement>("[data-hero-eyebrow]");
        const heroWordmark = root.querySelector<HTMLElement>("[data-hero-wordmark]");
        const heroHeadline = root.querySelector<HTMLElement>("[data-hero-headline]");
        const heroSubheadline = root.querySelector<HTMLElement>("[data-hero-subheadline]");
        const heroCtas = root.querySelector<HTMLElement>("[data-hero-cta]");

        if (!heroEyebrow || !heroWordmark || !heroHeadline || !heroSubheadline || !heroCtas) return;

        const animatedElements = [heroEyebrow, heroWordmark, heroHeadline, heroSubheadline, heroCtas];

        if (prefersReducedMotion) {
            gsap.set(animatedElements, {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                clearProps: "willChange",
            });
            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                onComplete: () => {
                    gsap.set(animatedElements, { clearProps: "willChange" });
                },
            });

            gsap.set(animatedElements, {
                opacity: 0,
                y: 18,
                willChange: "transform, opacity",
            });
            gsap.set(heroWordmark, {
                y: 22,
                scale: 0.985,
                transformOrigin: "50% 50%",
            });

            tl.to(heroEyebrow, { opacity: 1, y: 0, duration: 0.42 })
                .to(heroWordmark, { opacity: 1, y: 0, scale: 1, duration: 0.72 }, "-=0.16")
                .to(heroHeadline, { opacity: 1, y: 0, duration: 0.46 }, "-=0.2")
                .to(heroSubheadline, { opacity: 1, y: 0, duration: 0.46 }, "-=0.18")
                .to(heroCtas, { opacity: 1, y: 0, duration: 0.44 }, "-=0.14");

            /* Cinematic opening-scene exit: as the visitor scrolls past the
               hero, supporting layers lift away while the DOMINASE wordmark
               stays dominant - it only drifts and gains a touch of scale,
               like a title card holding the frame. Transform + opacity only;
               HeroShaderBackground is untouched. Desktop-only: mobile keeps
               the hero simple and the CTA visible. */
            const mm = gsap.matchMedia();
            mm.add("(min-width: 768px)", () => {
                const heroAura = root.querySelector<HTMLElement>(".hero-aura");

                const exitTl = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: root,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });

                exitTl
                    .to(
                        [heroEyebrow, heroHeadline, heroSubheadline, heroCtas],
                        { autoAlpha: 0, y: -30, stagger: 0.05, duration: 0.55 },
                        0
                    )
                    .to(
                        heroWordmark,
                        { scale: 1.06, yPercent: -12, duration: 1 },
                        0
                    );

                if (heroAura) {
                    exitTl.to(heroAura, { autoAlpha: 0.35, duration: 1 }, 0);
                }
            });
        }, root);

        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, [dir, prefersReducedMotion]);

    return {
        componentRef,
        wordmarkRef,
    };
}

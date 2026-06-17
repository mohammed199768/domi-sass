import { useEffect, useRef } from "react";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function usePortfolioAnimation() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        registerMotionPlugins();

        if (prefersReducedMotion) {
            gsap.set([titleRef.current, cardsRef.current, orbRef.current], { clearProps: "all" });
            return;
        }

        const ctx = gsap.context(() => {
            // Section heading reveal
            gsap.from(titleRef.current?.children ?? [], {
                y: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.18,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 82%",
                },
            });

            // Soft ambient orb
            gsap.fromTo(
                orbRef.current,
                { scale: 0.45, opacity: 0.16 },
                {
                    scale: 1.22,
                    opacity: 0.38,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "top 20%",
                        scrub: 0.9,
                        invalidateOnRefresh: true,
                    },
                }
            );

            // Grid cards stagger reveal
            const cards = cardsRef.current?.children ?? [];
            gsap.from(cards, {
                y: 60,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "back.out(1.4)",
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 78%",
                },
            });
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const image = e.currentTarget.querySelector(".portfolio-img");
        const overlay = e.currentTarget.querySelector(".portfolio-overlay");
        if (image) gsap.to(image, { scale: 1.08, duration: 0.45, ease: "power2.out" });
        if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.25 });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const image = e.currentTarget.querySelector(".portfolio-img");
        const overlay = e.currentTarget.querySelector(".portfolio-overlay");
        if (image) gsap.to(image, { scale: 1, duration: 0.45, ease: "power2.out" });
        if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.25 });
    };

    return {
        sectionRef,
        titleRef,
        cardsRef,
        orbRef,
        handleMouseEnter,
        handleMouseLeave,
    };
}

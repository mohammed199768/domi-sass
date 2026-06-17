import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, registerMotionPlugins } from "@/lib/motion/gsapSetup";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function useHeroAnimation() {
    const { dir } = useLanguage();
    const prefersReducedMotion = useReducedMotion();
    const componentRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const haloRef = useRef<HTMLDivElement>(null);
    const evidenceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        registerMotionPlugins();

        const heroWords = headlineRef.current?.querySelectorAll("[data-hero-word]") || [];
        const evidenceItems = evidenceRef.current?.children || [];

        if (prefersReducedMotion) {
            gsap.set([textRef.current, imageRef.current, haloRef.current, ...heroWords, ...evidenceItems], {
                clearProps: "all",
                opacity: 1,
                y: 0,
                scale: 1,
            });
            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            gsap.set(heroWords, { opacity: 0, y: 42 });
            gsap.set(evidenceItems, { opacity: 0, y: 28, scale: 0.96 });

            // A short authored opening: ambient scale, word reveal, then evidence.
            tl.from(haloRef.current, {
                opacity: 0,
                scale: 0.28,
                duration: 0.9,
                ease: "power2.out",
            })
                .to(heroWords, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.055,
                    duration: 0.72,
                }, "-=0.45")
                .from(textRef.current?.querySelectorAll("[data-hero-support]") || [], {
                    y: 28,
                    opacity: 0,
                    stagger: 0.08,
                    duration: 0.72,
                }, "-=0.48")
                .from(imageRef.current, {
                opacity: 0,
                    scale: 1.08,
                    y: 58,
                    duration: 1,
                    ease: "expo.out"
                }, "-=0.68")
                .to(evidenceItems, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.08,
                    duration: 0.62,
                }, "-=0.52");

        }, componentRef);

        return () => ctx.revert();
    }, [dir, prefersReducedMotion]);

    return {
        componentRef,
        textRef,
        headlineRef,
        imageRef,
        haloRef,
        evidenceRef
    };
}

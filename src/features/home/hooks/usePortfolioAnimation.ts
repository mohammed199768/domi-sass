import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure plugin is registered. Note: Next.js HMR might warn about multiple registrations, which is fine.
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function usePortfolioAnimation() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(titleRef.current?.children || [], {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                }
            });

            // Cards Animation
            const cards = cardsRef.current?.children || [];
            gsap.from(cards, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 75%",
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const image = e.currentTarget.querySelector(".portfolio-img");
        const category = e.currentTarget.querySelector(".portfolio-cat");
        const overlay = e.currentTarget.querySelector(".portfolio-overlay");

        if (image) gsap.to(image, { scale: 1.1, duration: 0.5, ease: "power2.out" });
        if (category) gsap.to(category, { y: -5, opacity: 1, duration: 0.3 });
        if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const image = e.currentTarget.querySelector(".portfolio-img");
        const category = e.currentTarget.querySelector(".portfolio-cat");
        const overlay = e.currentTarget.querySelector(".portfolio-overlay");

        if (image) gsap.to(image, { scale: 1, duration: 0.5, ease: "power2.out" });
        if (category) gsap.to(category, { y: 0, opacity: 1, duration: 0.3 });
        if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    };

    return {
        sectionRef,
        titleRef,
        cardsRef,
        handleMouseEnter,
        handleMouseLeave
    };
}

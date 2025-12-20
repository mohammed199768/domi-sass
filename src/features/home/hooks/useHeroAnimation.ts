import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

export function useHeroAnimation() {
    const { dir } = useLanguage();
    const componentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Image Reveal with Parallax Scale
            tl.from(imageRef.current, {
                opacity: 0,
                scale: 1.2,
                y: 100,
                duration: 1.5,
                ease: "expo.out"
            })
                // Text Stagger
                .from(textRef.current?.children || [], {
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1,
                }, "-=1.2");

        }, componentRef);

        return () => ctx.revert();
    }, [dir]);

    return {
        componentRef,
        textRef,
        imageRef
    };
}

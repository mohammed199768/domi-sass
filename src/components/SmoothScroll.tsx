"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const tick = (time: number) => {
            lenis.raf(time * 1000);
        };

        const stopScroll = () => lenis.stop();
        const startScroll = () => lenis.start();

        gsap.ticker.add(tick);
        window.addEventListener("portfolio-modal:open", stopScroll);
        window.addEventListener("portfolio-modal:close", startScroll);

        gsap.ticker.lagSmoothing(0);

        return () => {
            window.removeEventListener("portfolio-modal:open", stopScroll);
            window.removeEventListener("portfolio-modal:close", startScroll);
            gsap.ticker.remove(tick);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}

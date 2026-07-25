"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { setActiveLenis } from "@/lib/motion/lenisStore";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        registerMotionPlugins();

        // Native scrolling for wheel, trackpad, and touch across the whole
        // site (no interception, no catch-up lag, and the scroll-scrubbed hero
        // responds 1:1 to the document scroll position). Lenis is retained only
        // for programmatic anchor navigation via lenis.scrollTo(), which still
        // uses this duration/easing.
        const lenis = new Lenis({
            duration: 0.9,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: false,
        });

        setActiveLenis(lenis);
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
            setActiveLenis(null);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}

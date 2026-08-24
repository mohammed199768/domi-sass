"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  age: number;
  life: number;
  speed: number;
  phase: number;
};

const FRAME_INTERVAL = 1000 / 27;

export default function HeroFlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    let firstPaintFrame = 0;
    let idleHandle = 0;
    let fallbackTimer = 0;
    let dispose: () => void = () => undefined;

    const initialize = () => {
    const canvas = canvasRef.current;
    if (!canvas || cancelled) return () => undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return () => undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let particles: Particle[] = [];
    let animationFrame = 0;
    let lastFrame = 0;
    let width = 0;
    let height = 0;
    let isIntersecting = true;
    let reducedMotion = motionQuery.matches;
    let colors = ["currentColor", "currentColor", "currentColor"];

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      colors = [
        styles.getPropertyValue("--domi-accent").trim() || colors[0],
        styles.getPropertyValue("--domi-accent-bright").trim() || colors[1],
        styles.getPropertyValue("--domi-accent-deep").trim() || colors[2],
      ];
    };

    const particleCount = (cssWidth: number) => {
      if (cssWidth < 640) return 48;
      if (cssWidth < 1024) return 78;
      return 128;
    };

    const resetParticle = (particle: Particle, randomAge = false) => {
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      particle.previousX = particle.x;
      particle.previousY = particle.y;
      particle.life = 90 + Math.random() * 150;
      particle.age = randomAge ? Math.random() * particle.life : 0;
      particle.speed = 0.28 + Math.random() * 0.5;
      particle.phase = Math.random() * Math.PI * 2;
    };

    const seedParticles = (count: number) => {
      particles = Array.from({ length: count }, () => {
        const particle: Particle = {
          x: 0,
          y: 0,
          previousX: 0,
          previousY: 0,
          age: 0,
          life: 120,
          speed: 0.5,
          phase: 0,
        };
        resetParticle(particle, true);
        return particle;
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const resolution = rect.width < 760 ? 0.55 : 0.64;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = Math.max(1, Math.round(rect.width * resolution * dpr));
      height = Math.max(1, Math.round(rect.height * resolution * dpr));
      canvas.width = width;
      canvas.height = height;
      context.clearRect(0, 0, width, height);
      seedParticles(particleCount(rect.width));
    };

    const isActive = () =>
      isIntersecting && !document.hidden && !reducedMotion && width > 1 && height > 1;

    const stop = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const draw = (time: number) => {
      animationFrame = 0;
      if (!isActive()) return;

      if (time - lastFrame < FRAME_INTERVAL) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;

      context.globalCompositeOperation = "destination-out";
      context.globalAlpha = 0.105;
      context.fillStyle = "black";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
      context.globalAlpha = 1;
      context.lineWidth = Math.max(0.45, width / 1900);

      const timeFlow = time * 0.00018;
      particles.forEach((particle, index) => {
        particle.previousX = particle.x;
        particle.previousY = particle.y;

        const angle =
          Math.sin(particle.x * 0.009 + timeFlow + particle.phase) * 1.22 +
          Math.cos(particle.y * 0.008 - timeFlow * 0.82) * 1.05 +
          Math.sin((particle.x + particle.y) * 0.0035 + timeFlow * 0.45) * 0.68;

        particle.x += Math.cos(angle) * particle.speed;
        particle.y += Math.sin(angle) * particle.speed;
        particle.age += 1;

        if (
          particle.age > particle.life ||
          particle.x < -8 ||
          particle.x > width + 8 ||
          particle.y < -8 ||
          particle.y > height + 8
        ) {
          resetParticle(particle);
          return;
        }

        const lifeFade = Math.sin((particle.age / particle.life) * Math.PI);
        context.globalAlpha = (0.035 + (index % 5) * 0.008) * lifeFade;
        context.strokeStyle = colors[index % colors.length];
        context.beginPath();
        context.moveTo(particle.previousX, particle.previousY);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      });

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      animationFrame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (isActive() && !animationFrame) animationFrame = requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      context.clearRect(0, 0, width, height);
      if (reducedMotion) stop();
      else start();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      start();
    });
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry?.isIntersecting ?? false;
        if (isIntersecting) start();
        else stop();
      },
      { rootMargin: "120px 0px" },
    );
    const themeObserver = new MutationObserver(readColors);

    readColors();
    resize();
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handleMotionChange);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
    };

    // The flow field is enhancement, not critical content. Let the browser
    // paint the server-rendered headline first, then initialize the canvas in
    // idle time with a bounded fallback so the visual still arrives promptly.
    firstPaintFrame = window.requestAnimationFrame(() => {
      const run = () => {
        if (!cancelled) dispose = initialize();
      };
      const idleApi = window as unknown as {
        requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      };

      if (idleApi.requestIdleCallback) {
        idleHandle = idleApi.requestIdleCallback(run, { timeout: 700 });
      } else {
        fallbackTimer = window.setTimeout(run, 120);
      }
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstPaintFrame);
      const idleApi = window as unknown as {
        cancelIdleCallback?: (handle: number) => void;
      };
      if (idleHandle && idleApi.cancelIdleCallback) {
        idleApi.cancelIdleCallback(idleHandle);
      }
      window.clearTimeout(fallbackTimer);
      dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-flow-field" aria-hidden="true" />;
}

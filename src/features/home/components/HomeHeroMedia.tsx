"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  clamp01,
  computeHeroProgress,
  HERO_FRAME_ANCHORS,
  HERO_FRAME_SEQUENCE_END,
} from "../motion/heroProgress";
import {
  useHeroWorkTransitionProgress,
  type HeroWorkTransitionProgress,
} from "../motion/useHeroWorkTransitionProgress";

const FRAME_COUNT = 49;
const PARTICLE_FILM_END = 0.83;
const FRAME_PRELOAD_BATCH = 6;
const DPR_CAP = 1.5;
const PARTICLE_DPR_CAP = 1.25;
const FILM_PARTICLE_COUNT = 60;
const WATER_PARTICLE_COUNT = 40;
const COMPACT_FILM_PARTICLE_COUNT = 28;
const COMPACT_WATER_PARTICLE_COUNT = 22;
const PARTICLE_MIN_DENSITY = 0.58;
const PARTICLE_SLOW_FRAME_MS = 28;
const PARTICLE_SLOW_FRAME_LIMIT = 24;

function framePath(index: number) {
  return `/assest/home/hero/frames/frame-${String(index + 1).padStart(2, "0")}.webp`;
}

function smoothRange(progress: number, start: number, end: number) {
  const local = clamp01((progress - start) / Math.max(0.001, end - start));
  return local * local * (3 - 2 * local);
}

type AtmosphereParticle = {
  x: number;
  y: number;
  depth: number;
  radius: number;
  aspect: number;
  rotation: number;
  baseOpacity: number;
  fallVelocity: number;
  waterVelocity: number;
  lateralVelocity: number;
  driftAmplitude: number;
  driftFrequency: number;
  driftPhase: number;
  turbulence: number;
  turbulenceFrequency: number;
  turbulencePhase: number;
  brightnessFrequency: number;
  brightnessPhase: number;
  reentrySeed: number;
  travelX: number;
  travelY: number;
  tier: ParticleTier;
};

type ParticleTier = "background" | "midground" | "foreground";

type ParticlePalette = {
  background: string;
  midground: string;
  foreground: string;
  waterBackground: string;
  waterMidground: string;
  waterForeground: string;
  halo: string;
  waterHalo: string;
};

type ParticleSpriteSet = Record<
  "film" | "water",
  Record<ParticleTier, HTMLCanvasElement>
>;

const PARTICLE_EMERALD_FALLBACK = { r: 116, g: 230, b: 201 };

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function createParticles(count: number, seed: number) {
  const random = seededRandom(seed);
  return Array.from({ length: count }, (): AtmosphereParticle => {
    const depth = random();
    const tierRoll = random();
    const tier =
      tierRoll > 0.9
        ? "foreground"
        : tierRoll > 0.56
          ? "midground"
          : "background";
    const radius =
      tier === "foreground"
        ? 2.5 + random()
        : tier === "midground"
          ? 1.5 + random() * 0.9
          : 1 + random() * 0.6;
    const horizontalZone = random();
    const x =
      horizontalZone < 0.56
        ? 0.58 + random() * 0.19
        : horizontalZone < 0.82
          ? 0.81 + random() * 0.15
          : 0.04 + random() * 0.4;
    const verticalZone = random();
    const y =
      verticalZone < 0.48
        ? 0.1 + random() * 0.3
        : verticalZone < 0.82
          ? 0.5 + random() * 0.25
          : 0.78 + random() * 0.14;
    const baseOpacity =
      tier === "foreground"
        ? 0.5 + random() * 0.14
        : tier === "midground"
          ? 0.29 + random() * 0.12
          : 0.13 + random() * 0.06;
    const fallVelocity =
      tier === "foreground"
        ? 6.5 + random() * 3.5
        : tier === "midground"
          ? 4 + random() * 3
          : 2.2 + random() * 1.8;
    const waterSpeed =
      tier === "foreground"
        ? 0.9 + random()
        : tier === "midground"
          ? 0.65 + random() * 0.8
          : 0.45 + random() * 0.5;
    const lateralRange =
      tier === "foreground" ? 0.38 : tier === "midground" ? 0.24 : 0.12;
    const driftAmplitude =
      tier === "foreground"
        ? 8 + random() * 6
        : tier === "midground"
          ? 5 + random() * 4.5
          : 2 + random() * 2.5;
    const driftFrequency =
      tier === "foreground"
        ? 0.26 + random() * 0.16
        : tier === "midground"
          ? 0.2 + random() * 0.14
          : 0.14 + random() * 0.1;
    const turbulence =
      tier === "foreground"
        ? 1 + random() * 1.2
        : tier === "midground"
          ? 0.65 + random() * 0.7
          : 0.35 + random() * 0.5;

    return {
      x,
      y,
      depth,
      radius,
      aspect: 0.45 + random() * 0.38,
      rotation: random() * Math.PI,
      baseOpacity,
      fallVelocity,
      waterVelocity: (random() > 0.48 ? 1 : -1) * waterSpeed,
      lateralVelocity: (random() * 2 - 1) * lateralRange,
      driftAmplitude,
      driftFrequency,
      driftPhase: random() * Math.PI * 2,
      turbulence,
      turbulenceFrequency: 0.55 + random() * 0.35,
      turbulencePhase: random() * Math.PI * 2,
      brightnessFrequency: 0.12 + random() * 0.12,
      brightnessPhase: random() * Math.PI * 2,
      reentrySeed: 0.35 + random() * 0.6,
      travelX: 0,
      travelY: 0,
      tier,
    };
  });
}

function parseCssColor(value: string) {
  const rgb = value.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i,
  );
  if (rgb) {
    return {
      r: Number(rgb[1]),
      g: Number(rgb[2]),
      b: Number(rgb[3]),
    };
  }

  const hex = value.trim().match(/^#([\da-f]{6})$/i);
  if (hex) {
    return {
      r: Number.parseInt(hex[1].slice(0, 2), 16),
      g: Number.parseInt(hex[1].slice(2, 4), 16),
      b: Number.parseInt(hex[1].slice(4, 6), 16),
    };
  }

  return PARTICLE_EMERALD_FALLBACK;
}

function rgbToHsl({ r, g, b }: { r: number; g: number; b: number }) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;
  const lightness = (maximum + minimum) / 2;
  const saturation =
    delta === 0
      ? 0
      : delta / (1 - Math.abs(2 * lightness - 1));
  let hue = 0;

  if (delta) {
    if (maximum === red) hue = ((green - blue) / delta) % 6;
    else if (maximum === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  return {
    h: hue,
    s: saturation * 100,
    l: lightness * 100,
  };
}

function createParticlePalette(source: string): ParticlePalette {
  const { h, s, l } = rgbToHsl(parseCssColor(source));
  const hsl = (
    saturation: number,
    lightness: number,
    alpha?: number,
  ) =>
    alpha === undefined
      ? `hsl(${h} ${saturation}% ${lightness}%)`
      : `hsl(${h} ${saturation}% ${lightness}% / ${alpha})`;

  return {
    background: hsl(Math.max(46, s * 0.72), Math.max(24, l * 0.42)),
    midground: hsl(Math.max(66, s * 0.94), Math.max(48, l * 0.78)),
    foreground: hsl(Math.max(72, s), Math.min(78, l + 5)),
    waterBackground: hsl(Math.max(40, s * 0.64), Math.max(20, l * 0.34)),
    waterMidground: hsl(Math.max(58, s * 0.84), Math.max(40, l * 0.67)),
    waterForeground: hsl(Math.max(66, s * 0.92), Math.max(53, l * 0.82)),
    halo: hsl(Math.max(72, s), Math.min(78, l + 5), 0.34),
    waterHalo: hsl(Math.max(62, s * 0.88), Math.max(50, l * 0.78), 0.22),
  };
}

function createParticleSprite(core: string, halo: string, glow: boolean) {
  const size = 32;
  const center = size / 2;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return canvas;

  const gradient = context.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    center,
  );
  gradient.addColorStop(0, core);
  gradient.addColorStop(glow ? 0.24 : 0.42, core);
  if (glow) gradient.addColorStop(0.62, halo);
  gradient.addColorStop(1, "transparent");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  return canvas;
}

function createParticleSprites(palette: ParticlePalette): ParticleSpriteSet {
  return {
    film: {
      background: createParticleSprite(
        palette.background,
        palette.background,
        false,
      ),
      midground: createParticleSprite(
        palette.midground,
        palette.midground,
        false,
      ),
      foreground: createParticleSprite(
        palette.foreground,
        palette.halo,
        true,
      ),
    },
    water: {
      background: createParticleSprite(
        palette.waterBackground,
        palette.waterBackground,
        false,
      ),
      midground: createParticleSprite(
        palette.waterMidground,
        palette.waterMidground,
        false,
      ),
      foreground: createParticleSprite(
        palette.waterForeground,
        palette.waterHalo,
        true,
      ),
    },
  };
}

class HeroFrameStore {
  private cache = new Map<number, HTMLImageElement>();
  private inflight = new Map<number, HTMLImageElement>();

  constructor(private onReady: (index: number) => void) {}

  request(index: number) {
    if (
      index < 0 ||
      index >= FRAME_COUNT ||
      this.cache.has(index) ||
      this.inflight.has(index)
    ) {
      return;
    }

    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => {
      const commit = () => {
        if (!this.inflight.has(index)) return;
        this.inflight.delete(index);
        this.cache.set(index, image);
        this.onReady(index);
      };

      if (typeof image.decode === "function") {
        void image.decode().catch(() => undefined).then(commit);
      } else {
        commit();
      }
    };
    image.onerror = () => this.inflight.delete(index);
    this.inflight.set(index, image);
    image.src = framePath(index);
  }

  nearest(target: number) {
    const exact = this.cache.get(target);
    if (exact) return { index: target, image: exact };

    let nearest: HTMLImageElement | null = null;
    let nearestIndex = -1;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const [index, image] of this.cache) {
      const distance = Math.abs(target - index);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
        nearest = image;
      }
    }
    return nearest ? { index: nearestIndex, image: nearest } : null;
  }

  dispose() {
    for (const image of this.cache.values()) image.src = "";
    for (const image of this.inflight.values()) {
      image.onload = null;
      image.onerror = null;
      image.src = "";
    }
    this.cache.clear();
    this.inflight.clear();
  }
}

type HomeHeroMediaProps = {
  sectionRef: RefObject<HTMLElement | null>;
  waterStageRef: RefObject<HTMLDivElement | null>;
  waterParticleCanvasRef: RefObject<HTMLCanvasElement | null>;
  staticWaterParticleCanvasRef: RefObject<HTMLCanvasElement | null>;
};

type HeroMediaEngine = {
  setProgress: (progress: HeroWorkTransitionProgress) => void;
  snap: () => void;
};

export default function HomeHeroMedia({
  sectionRef,
  waterStageRef,
  waterParticleCanvasRef,
  staticWaterParticleCanvasRef,
}: HomeHeroMediaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filmParticleCanvasRef = useRef<HTMLCanvasElement>(null);
  const sceneProgressRef = useRef<HeroWorkTransitionProgress>({
    hero: 0,
    transition: 0,
    snap: true,
  });
  const engineRef = useRef<HeroMediaEngine | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const canvasReadyRef = useRef(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const capability = window.matchMedia(
      "(min-width: 901px) and (min-height: 560px)",
    );
    const navigatorWithMemory = navigator as Navigator & {
      deviceMemory?: number;
    };

    const sync = () => {
      const enoughMemory =
        navigatorWithMemory.deviceMemory === undefined ||
        navigatorWithMemory.deviceMemory > 4;
      const enoughParticleMemory =
        navigatorWithMemory.deviceMemory === undefined ||
        navigatorWithMemory.deviceMemory > 2;
      if (motion.matches || !capability.matches || !enoughMemory) {
        engineRef.current?.snap();
      }
      setEnhanced(!motion.matches && capability.matches && enoughMemory);
      setParticlesEnabled(
        !motion.matches &&
          enoughParticleMemory &&
          (navigator.hardwareConcurrency || 8) > 2,
      );
    };

    sync();
    motion.addEventListener("change", sync);
    capability.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      capability.removeEventListener("change", sync);
    };
  }, []);

  const applyProgress = useCallback(
    (progress: HeroWorkTransitionProgress) => {
      sceneProgressRef.current = progress;
      engineRef.current?.setProgress(progress);
    },
    [],
  );

  // Native scroll is the immediate source for scene, copy, frame, and surface
  // progress. The hook's RAF only coalesces scroll events into one paint.
  useHeroWorkTransitionProgress(sectionRef, applyProgress, enhanced);

  useEffect(() => {
    const section = sectionRef.current;
    const filmCanvas = filmParticleCanvasRef.current;
    const transitionWaterCanvas = waterParticleCanvasRef.current;
    const staticWaterCanvas = staticWaterParticleCanvasRef.current;
    const waterCanvases = [transitionWaterCanvas, staticWaterCanvas].filter(
      (canvas): canvas is HTMLCanvasElement => Boolean(canvas),
    );
    if (!particlesEnabled || !section || !filmCanvas || !waterCanvases.length) {
      return;
    }

    const filmContext = filmCanvas.getContext("2d");
    const waterSurfaces = waterCanvases
      .map((canvas) => ({
        canvas,
        context: canvas.getContext("2d"),
        staticMode: canvas === staticWaterCanvas,
      }))
      .filter(
        (
          surface,
        ): surface is {
          canvas: HTMLCanvasElement;
          context: CanvasRenderingContext2D;
          staticMode: boolean;
        } => Boolean(surface.context),
    );
    if (!filmContext || !waterSurfaces.length) return;

    let particleSprites = createParticleSprites(
      createParticlePalette(getComputedStyle(filmCanvas).color),
    );
    const density = window.matchMedia(
      "(max-width: 900px), (max-height: 559px)",
    );
    let atmosphereParticles: AtmosphereParticle[] = [];
    let filmParticleCount = FILM_PARTICLE_COUNT;
    let waterParticleCount = WATER_PARTICLE_COUNT;
    let particleDensity = 1;
    let slowFrameScore = 0;
    const updateParticleCounts = () => {
      const compact = density.matches;
      const filmBase = compact
        ? COMPACT_FILM_PARTICLE_COUNT
        : FILM_PARTICLE_COUNT;
      const waterBase = compact
        ? COMPACT_WATER_PARTICLE_COUNT
        : WATER_PARTICLE_COUNT;
      filmParticleCount = Math.max(
        12,
        Math.round(filmBase * particleDensity),
      );
      waterParticleCount = Math.max(
        10,
        Math.round(waterBase * particleDensity),
      );
    };
    const createParticleFields = () => {
      particleDensity = 1;
      slowFrameScore = 0;
      updateParticleCounts();
      atmosphereParticles = createParticles(
        filmParticleCount,
        0x4d4f5645,
      );
    };
    createParticleFields();

    let direction =
      section.closest<HTMLElement>("[dir]")?.dir === "rtl" ? -1 : 1;
    const sizes = new Map<
      HTMLCanvasElement,
      { width: number; height: number; dpr: number }
    >();

    let disposed = false;
    const visibleCanvases = new Set<HTMLCanvasElement>();
    let atmosphereFrame = 0;
    let lastTick = performance.now();
    let lastPaint = 0;

    const measureCanvas = (canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      const size = {
        width: Math.max(1, Math.round(rect.width)),
        height: Math.max(1, Math.round(rect.height)),
        dpr: Math.min(window.devicePixelRatio || 1, PARTICLE_DPR_CAP),
      };
      canvas.width = Math.round(size.width * size.dpr);
      canvas.height = Math.round(size.height * size.dpr);
      sizes.set(canvas, size);
    };

    const wrap = (value: number, length: number) =>
      ((value % length) + length) % length;

    const updateParticleMotion = (delta: number, waterMix: number) => {
      const fullTurn = Math.PI * 2;

      for (const particle of atmosphereParticles) {
        const verticalVelocity =
          particle.fallVelocity +
          (particle.waterVelocity - particle.fallVelocity) * waterMix;
        particle.travelY += verticalVelocity * delta;
        particle.travelX +=
          particle.lateralVelocity * (1 - waterMix * 0.55) * delta;
        particle.driftPhase +=
          particle.driftFrequency * (1 - waterMix * 0.32) * delta;
        particle.turbulencePhase +=
          particle.turbulenceFrequency * (1 + waterMix * 0.18) * delta;
        particle.brightnessPhase += particle.brightnessFrequency * delta;

        if (particle.driftPhase >= fullTurn) {
          particle.driftPhase -= fullTurn;
        }
        if (particle.turbulencePhase >= fullTurn) {
          particle.turbulencePhase -= fullTurn;
        }
        if (particle.brightnessPhase >= fullTurn) {
          particle.brightnessPhase -= fullTurn;
        }
      }
    };

    const drawField = (
      context: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      particles: AtmosphereParticle[],
      particleCount: number,
      surface: "film" | "water",
      waterMix: number,
      scrollDepth: number,
      fieldOpacity: number,
    ) => {
      const size = sizes.get(canvas);
      if (!size) return;

      context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
      context.clearRect(0, 0, size.width, size.height);
      if (fieldOpacity <= 0.003) return;

      const surfaceSprites = particleSprites[surface];
      for (
        let particleIndex = 0;
        particleIndex < particleCount;
        particleIndex += 1
      ) {
        const particle = particles[particleIndex];
        const parallax =
          particle.tier === "foreground"
            ? 1.15
            : particle.tier === "midground"
              ? 0.82
              : 0.52;
        const horizontalDrift =
          Math.sin(particle.driftPhase) *
            particle.driftAmplitude *
            parallax *
            (1 + waterMix * 0.45) +
          Math.sin(particle.turbulencePhase) *
            particle.turbulence *
            parallax *
            (0.6 + waterMix * 0.55);
        const scrollParallaxX =
          scrollDepth * (particle.depth - 0.5) * 5 * parallax;
        const scrollParallaxY = scrollDepth * parallax * 8;
        const verticalSpan = size.height + 36;
        const rawY =
          particle.y * size.height +
          particle.travelY +
          scrollParallaxY +
          18;
        const verticalCycle = Math.floor(rawY / verticalSpan);
        const reentryNoise =
          Math.sin(
            (verticalCycle + 1) *
              particle.reentrySeed *
              12.9898,
          ) * 43758.5453;
        const reentryOffset =
          (reentryNoise - Math.floor(reentryNoise) - 0.5) *
          size.width *
          0.28;
        const baseX =
          (direction > 0 ? particle.x : 1 - particle.x) * size.width;
        const x = wrap(
          baseX +
            direction *
              (particle.travelX +
                horizontalDrift +
                scrollParallaxX +
                reentryOffset) +
            18,
          size.width + 36,
        ) - 18;
        const y = wrap(rawY, verticalSpan) - 18;

        const onCopySide =
          surface === "film" &&
          (direction > 0 ? x < size.width * 0.49 : x > size.width * 0.51) &&
          y > size.height * 0.14 &&
          y < size.height * 0.74;
        const lightBias =
          0.72 +
          0.28 * (direction > 0 ? x / size.width : 1 - x / size.width);
        const lightResponse =
          0.94 + Math.sin(particle.brightnessPhase) * 0.06;
        const waterAbsorption = surface === "water" ? 0.82 : 1;
        context.globalAlpha =
          fieldOpacity *
          particle.baseOpacity *
          lightBias *
          lightResponse *
          waterAbsorption *
          (onCopySide ? 0.22 : 1);

        const width = particle.radius;
        const height =
          width * particle.aspect * (surface === "water" ? 1.18 : 1);
        const glowScale =
          particle.tier === "foreground"
            ? surface === "water"
              ? 3
              : 3.4
            : 1.7;
        context.drawImage(
          surfaceSprites[particle.tier],
          x - width * glowScale,
          y - height * glowScale,
          width * glowScale * 2,
          height * glowScale * 2,
        );
      }

      context.globalAlpha = 1;
    };

    const paint = () => {
      direction =
        section.closest<HTMLElement>("[dir]")?.dir === "rtl" ? -1 : 1;
      const { hero, transition } = sceneProgressRef.current;
      const scrollDepth = clamp01(hero / PARTICLE_FILM_END);
      const waterMix = smoothRange(transition, 0, 0.2);
      const filmOpacity = 1 - smoothRange(transition, 0, 0.2);
      const waterOpacity =
        smoothRange(transition, 0.035, 0.2) *
        (1 - smoothRange(transition, 0.62, 0.86));
      if (visibleCanvases.has(filmCanvas)) {
        drawField(
          filmContext,
          filmCanvas,
          atmosphereParticles,
          filmParticleCount,
          "film",
          waterMix,
          scrollDepth,
          filmOpacity,
        );
      }
      waterSurfaces.forEach(({ canvas, context, staticMode }) => {
        if (!visibleCanvases.has(canvas)) return;
        drawField(
          context,
          canvas,
          atmosphereParticles,
          waterParticleCount,
          "water",
          staticMode ? 1 : waterMix,
          staticMode ? 1 : scrollDepth,
          staticMode ? 0.72 : waterOpacity,
        );
      });
    };

    const currentWaterMix = () => {
      if (
        staticWaterCanvas &&
        visibleCanvases.has(staticWaterCanvas)
      ) {
        return 1;
      }
      return smoothRange(sceneProgressRef.current.transition, 0, 0.2);
    };

    const tick = (time: number) => {
      atmosphereFrame = 0;
      if (disposed || !visibleCanvases.size || document.hidden) return;

      const elapsed = Math.min(50, Math.max(0, time - lastTick));
      const delta = elapsed / 1000;
      lastTick = time;
      if (elapsed > PARTICLE_SLOW_FRAME_MS) {
        slowFrameScore += 1;
      } else {
        slowFrameScore = Math.max(0, slowFrameScore - 0.25);
      }
      if (
        slowFrameScore >= PARTICLE_SLOW_FRAME_LIMIT &&
        particleDensity > PARTICLE_MIN_DENSITY
      ) {
        particleDensity = Math.max(
          PARTICLE_MIN_DENSITY,
          particleDensity * 0.78,
        );
        slowFrameScore = 0;
        updateParticleCounts();
      }
      updateParticleMotion(delta, currentWaterMix());
      if (time - lastPaint >= 32) {
        lastPaint = time;
        paint();
      }
      atmosphereFrame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (
        atmosphereFrame ||
        disposed ||
        !visibleCanvases.size ||
        document.hidden
      ) {
        return;
      }
      lastTick = performance.now();
      atmosphereFrame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (atmosphereFrame) cancelAnimationFrame(atmosphereFrame);
      atmosphereFrame = 0;
    };

    const measure = () => {
      measureCanvas(filmCanvas);
      waterSurfaces.forEach(({ canvas }) => measureCanvas(canvas));
      paint();
    };

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(filmCanvas);
    waterSurfaces.forEach(({ canvas }) => resize.observe(canvas));

    const intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const canvas = entry.target as HTMLCanvasElement;
          if (entry.isIntersecting) visibleCanvases.add(canvas);
          else visibleCanvases.delete(canvas);
        });
        if (visibleCanvases.size) {
          paint();
          start();
        } else {
          stop();
        }
      },
      { rootMargin: "12% 0px", threshold: 0 },
    );
    intersection.observe(filmCanvas);
    waterSurfaces.forEach(({ canvas }) => intersection.observe(canvas));

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const handleDensityChange = () => {
      createParticleFields();
      measure();
    };
    const themeObserver = new MutationObserver(() => {
      particleSprites = createParticleSprites(
        createParticlePalette(getComputedStyle(filmCanvas).color),
      );
      paint();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    document.addEventListener("visibilitychange", handleVisibility);
    density.addEventListener("change", handleDensityChange);

    return () => {
      disposed = true;
      stop();
      resize.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      density.removeEventListener("change", handleDensityChange);
      filmContext.setTransform(1, 0, 0, 1, 0, 0);
      filmContext.clearRect(0, 0, filmCanvas.width, filmCanvas.height);
      waterSurfaces.forEach(({ canvas, context }) => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
      });
    };
  }, [
    particlesEnabled,
    sectionRef,
    staticWaterParticleCanvasRef,
    waterParticleCanvasRef,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const waterStage = waterStageRef.current;
    const transitionRoot = section?.closest<HTMLElement>(
      ".home-hero-work-transition",
    );
    if (!enhanced || !canvas || !section || !waterStage || !transitionRoot) {
      engineRef.current = null;
      return;
    }

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let disposed = false;
    let currentIndex = 0;
    let currentFilmProgress = 0;
    let currentTransitionProgress = 0;
    let preloadHandle = 0;
    let preloadUsesIdleCallback = false;
    let signature = "";
    const size = { width: 1, height: 1, dpr: 1 };

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      size.width = Math.max(1, Math.round(rect.width));
      size.height = Math.max(1, Math.round(rect.height));
      size.dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width = Math.round(size.width * size.dpr);
      canvas.height = Math.round(size.height * size.dpr);
      signature = "";
    };

    const draw = (index: number) => {
      if (disposed) return;
      const resolved = store.nearest(index);
      if (!resolved) return;
      const { image, index: imageIndex } = resolved;
      if (!image.naturalWidth || !image.naturalHeight) return;

      const nextSignature = `${imageIndex}:${image.src}:${size.width}:${size.height}:${size.dpr}`;
      if (nextSignature === signature) return;
      signature = nextSignature;

      const scale = Math.max(
        size.width / image.naturalWidth,
        size.height / image.naturalHeight,
      );
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      const x = (size.width - width) / 2;
      const y = (size.height - height) / 2;

      context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
      context.drawImage(image, x, y, width, height);
      if (!canvasReadyRef.current) {
        canvasReadyRef.current = true;
        setCanvasReady(true);
      }
    };

    const store = new HeroFrameStore((index) => {
      if (index === currentIndex || !canvasReadyRef.current) {
        signature = "";
        draw(currentIndex);
      }
    });

    const ensurePerceptualSegment = (index: number, direction: number) => {
      store.request(index);
      const primaryDirection = direction || 1;
      for (let step = 1; step <= 4; step += 1) {
        store.request(index + primaryDirection * step);
      }
      for (let step = 1; step <= 2; step += 1) {
        store.request(index - primaryDirection * step);
      }
    };

    const renderCanvasSurface = () => {
      const descent = smoothRange(currentTransitionProgress, 0, 0.4);
      const canvasExit = smoothRange(currentTransitionProgress, 0.22, 0.4);

      canvas.style.transform =
        currentTransitionProgress > 0
          ? `translate3d(0, ${-1.4 - descent * 24}%, 0) scale(${1.05 + descent * 0.24})`
          : `translate3d(0, ${currentFilmProgress * -1.4}%, 0) scale(${1.008 + currentFilmProgress * 0.042})`;
      canvas.style.opacity = `${Math.max(0.12, 1 - canvasExit)}`;
    };

    const snapRenderer = () => {
      signature = "";
      draw(currentIndex);
      renderCanvasSurface();
    };

    const preloadOrder = [
      ...HERO_FRAME_ANCHORS,
      ...Array.from({ length: FRAME_COUNT }, (_, index) => index).filter(
        (index) => !HERO_FRAME_ANCHORS.some((anchor) => anchor === index),
      ),
    ];
    let preloadCursor = HERO_FRAME_ANCHORS.length;

    const schedulePreloadBatch = () => {
      if (disposed || preloadCursor >= preloadOrder.length) return;
      const requestIdle = Reflect.get(
        window,
        "requestIdleCallback",
      ) as typeof window.requestIdleCallback | undefined;
      if (requestIdle) {
        preloadUsesIdleCallback = true;
        preloadHandle = requestIdle(preloadBatch, {
          timeout: 350,
        });
      } else {
        preloadUsesIdleCallback = false;
        preloadHandle = window.setTimeout(preloadBatch, 16);
      }
    };

    function preloadBatch() {
      preloadHandle = 0;
      if (disposed) return;
      const end = Math.min(
        preloadCursor + FRAME_PRELOAD_BATCH,
        preloadOrder.length,
      );
      while (preloadCursor < end) {
        store.request(preloadOrder[preloadCursor]);
        preloadCursor += 1;
      }
      schedulePreloadBatch();
    }

    const applyBubbleProgress = (transitionProgress: number) => {
      waterStage
        .querySelectorAll<HTMLElement>("[data-water-bubble]")
        .forEach((bubble) => {
          const start = Number(bubble.dataset.waterStart ?? 0);
          const end = Number(bubble.dataset.waterEnd ?? 1);
          const depth = Number(bubble.dataset.waterDepth ?? 0.5);
          const layer = bubble.dataset.waterLayer ?? "background";
          const local = clamp01(
            (transitionProgress - start) / Math.max(0.001, end - start),
          );
          const enter = smoothRange(local, 0, layer === "word" ? 0.18 : 0.14);
          const leave =
            1 -
            smoothRange(
              local,
              layer === "word" ? 0.8 : layer === "foreground" ? 0.74 : 0.72,
              1,
            );
          const opacityScale =
            layer === "word" ? 1 : layer === "foreground" ? 0.66 : 0.38;
          const visibility = enter * leave * opacityScale;
          const drift = Number(bubble.dataset.waterDrift ?? 0);
          const startY =
            layer === "word" ? 24 : layer === "foreground" ? 29 : 33;
          const travel =
            layer === "word"
              ? 62 + depth * 10
              : layer === "foreground"
                ? 88 + depth * 10
                : 72 + depth * 8;
          const rise = local * (0.86 + local * 0.14);
          const y = startY - rise * travel;
          const x =
            Math.sin(local * Math.PI) * drift +
            Math.sin(local * Math.PI * 2) * drift * 0.12;
          const scale =
            layer === "word"
              ? 0.88 + depth * 0.08 + local * 0.035
              : 0.78 + depth * 0.13 + local * 0.04;
          if (layer === "word") {
            bubble.style.setProperty("--water-word-reveal", `${enter}`);
          }
          bubble.style.opacity = `${visibility}`;
          bubble.style.transform = `translate3d(${x}px, ${y}vh, 0) scale(${scale})`;
        });
    };

    engineRef.current = {
      setProgress({ hero, transition }) {
        const filmProgress = clamp01(hero / HERO_FRAME_SEQUENCE_END);
        const transitionProgress = transition;
        const state = computeHeroProgress(filmProgress, FRAME_COUNT);
        const frameDirection = Math.sign(state.frameIndex - currentIndex);
        currentFilmProgress = filmProgress;
        currentTransitionProgress = transitionProgress;
        currentIndex = state.frameIndex;

        let beat: string = "0";
        if (transitionProgress > 0) beat = "water";
        else if (filmProgress < 0.337) beat = "0";
        else if (filmProgress < 0.55) beat = "1";
        else if (filmProgress < 0.916) beat = "2";
        else beat = "3";

        const waterEase = smoothRange(transitionProgress, 0, 0.62);
        const workTakeover = smoothRange(transitionProgress, 0.46, 0.86);
        const waterStageOpacity =
          smoothRange(transitionProgress, 0, 0.08) *
          (1 - smoothRange(transitionProgress, 0.68, 0.94));
        const signalFade = 1 - smoothRange(transitionProgress, 0.12, 0.55);
        const headingOpacity =
          smoothRange(transitionProgress, 0.035, 0.14) *
          (1 - smoothRange(transitionProgress, 0.27, 0.4));
        const releaseOpacity =
          smoothRange(transitionProgress, 0.25, 0.38) *
          (1 - smoothRange(transitionProgress, 0.52, 0.68));
        const rodOpacity =
          smoothRange(transitionProgress, 0.16, 0.34) *
          (1 - smoothRange(transitionProgress, 0.64, 0.86));
        const workActivationProgress = smoothRange(
          transitionProgress,
          0.3,
          0.62,
        );

        section.dataset.beat = String(beat);
        section.dataset.scene = transitionProgress > 0 ? "depth" : "film";
        section.style.setProperty("--home-hero-progress", `${filmProgress}`);
        section.style.setProperty(
          "--home-hero-rule-progress",
          `${state.ruleProgress}`,
        );
        section.style.setProperty(
          "--water-progress",
          `${transitionProgress}`,
        );
        section.style.setProperty("--water-ease", `${waterEase}`);
        section.style.setProperty("--water-exit", `${workTakeover}`);
        section.style.setProperty("--water-signal", `${signalFade}`);
        section.style.setProperty(
          "--water-heading-opacity",
          `${headingOpacity}`,
        );
        section.style.setProperty(
          "--water-release-opacity",
          `${releaseOpacity}`,
        );

        transitionRoot.style.setProperty(
          "--home-transition-progress",
          `${transitionProgress}`,
        );
        transitionRoot.style.setProperty(
          "--water-stage-opacity",
          `${waterStageOpacity}`,
        );
        transitionRoot.style.setProperty(
          "--work-takeover",
          `${workTakeover}`,
        );
        transitionRoot.style.setProperty(
          "--work-activation-progress",
          `${workActivationProgress}`,
        );
        transitionRoot.style.setProperty(
          "--water-rod-opacity",
          `${rodOpacity}`,
        );

        applyBubbleProgress(transitionProgress);
        ensurePerceptualSegment(currentIndex, frameDirection);
        draw(currentIndex);
        renderCanvasSurface();
      },
      snap: snapRenderer,
    };

    measure();
    HERO_FRAME_ANCHORS.forEach((index) => store.request(index));
    schedulePreloadBatch();
    engineRef.current.setProgress({ hero: 0, transition: 0, snap: true });

    const resize = new ResizeObserver(() => {
      measure();
      snapRenderer();
    });
    resize.observe(canvas);

    return () => {
      disposed = true;
      canvasReadyRef.current = false;
      if (preloadHandle) {
        if (preloadUsesIdleCallback) {
          const cancelIdle = Reflect.get(
            window,
            "cancelIdleCallback",
          ) as typeof window.cancelIdleCallback | undefined;
          cancelIdle?.(preloadHandle);
        } else {
          window.clearTimeout(preloadHandle);
        }
      }
      resize.disconnect();
      store.dispose();
      engineRef.current = null;
      canvas.style.transform = "";
      canvas.style.filter = "";
      canvas.style.opacity = "";
      transitionRoot.style.removeProperty("--home-transition-progress");
      transitionRoot.style.removeProperty("--water-stage-opacity");
      transitionRoot.style.removeProperty("--work-takeover");
      transitionRoot.style.removeProperty("--work-activation-progress");
      transitionRoot.style.removeProperty("--water-rod-opacity");
      waterStage
        .querySelectorAll<HTMLElement>("[data-water-bubble]")
        .forEach((bubble) => {
          bubble.style.opacity = "";
          bubble.style.transform = "";
          bubble.style.removeProperty("--water-word-reveal");
        });
      setCanvasReady(false);
    };
  }, [enhanced, sectionRef, waterStageRef]);

  return (
    <div
      className="home-hero-media"
      data-enhanced={enhanced ? "true" : "false"}
      data-canvas-ready={canvasReady ? "true" : "false"}
      aria-hidden="true"
    >
      <Image
        src="/assest/home/hero/poster.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="home-hero-media__poster"
      />
      <canvas
        ref={canvasRef}
        className="home-hero-media__canvas"
        tabIndex={-1}
      />
      <canvas
        ref={filmParticleCanvasRef}
        className="home-hero-media__particles"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="home-hero-media__grade" />
      <div className="home-hero-media__grain" />
    </div>
  );
}

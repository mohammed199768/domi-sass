"use client";

/**
 * HeroShaderBackground — premium WebGL signal field for the DOMINASE Hero.
 *
 * Visual: calm plasma/signal lines flowing over an obsidian base, coloured
 * from the Hero's fixed dark CSS custom properties and passed as uniforms.
 * No grid, no particles, no neon clutter. Line energy
 * is attenuated in the centre of the viewport so the wordmark/copy stay
 * readable.
 *
 * Containment: rendered `absolute inset-0` INSIDE the Hero section only.
 * Never fixed, never global. The Hero's existing `--hero-gradient` CSS
 * background remains underneath as the no-WebGL / reduced-motion fallback.
 *
 * Performance contract:
 *  - IntersectionObserver: RAF fully cancelled while Hero is offscreen
 *  - Page Visibility API: paused while the tab is hidden
 *  - ~30fps timestamp throttle (frames skipped, not just idle RAF)
 *  - DPR capped at 1.5 (1.25 on small screens), sized to the Hero container
 *    via ResizeObserver — never window-sized
 *  - prefers-reduced-motion: WebGL never initialised; static CSS fallback
 *  - No React setState per frame; full GL + observer cleanup on unmount
 */

import { useEffect, useRef } from "react";

const VERTEX_SRC = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec3  uBgA;        /* obsidian base (top)    */
uniform vec3  uBgB;        /* obsidian surface (bottom) */
uniform vec3  uAccent;     /* emerald                */
uniform vec3  uAccentSoft; /* mint (bright accent)   */
uniform float uIntensity;  /* overall signal energy  */

const float SPEED      = 0.2;
const float SCALE      = 4.5;
const int   LINE_COUNT = 12;

/* Deterministic pseudo-random wave (sum of incommensurate cosines). */
float wave(float t) {
  return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
}

float plasmaY(float x, float fade, float offset) {
  return wave(x * 0.2 + uTime * SPEED) * fade + offset;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 space = (gl_FragCoord.xy - uResolution.xy * 0.5) / uResolution.x * 2.0 * SCALE;

  /* Energy concentrates mid-frame horizontally, fades at edges. */
  float horizontalFade = 1.0 - (cos(uv.x * 6.28318) * 0.5 + 0.5);
  float verticalFade   = 1.0 - (cos(uv.y * 6.28318) * 0.5 + 0.5);

  /* Slow atmospheric warp — cinematic drift, not chaos. */
  space.y += wave(space.x * 0.5 + uTime * SPEED * 0.2) * (0.4 + horizontalFade * 0.5);

  /* Readability mask: attenuate line energy behind the Hero copy. */
  float centerMask = smoothstep(0.16, 0.6, length((uv - vec2(0.5, 0.52)) * vec2(1.0, 1.35)));

  /* Obsidian base — vertical blend of the two fixed Hero background tokens. */
  vec3 col = mix(uBgA, uBgB, uv.y);
  col *= 0.72 + 0.28 * verticalFade;

  vec3 lines = vec3(0.0);
  for (int l = 0; l < LINE_COUNT; l++) {
    float i = float(l);
    float offsetTime = uTime * SPEED * 1.33;
    float offsetPos  = i + space.x * 0.5;
    float rand       = wave(offsetPos + offsetTime) * 0.5 + 0.5;
    float halfWidth  = mix(0.012, 0.14, rand * horizontalFade) * 0.5;
    float offset     = wave(offsetPos + offsetTime * (1.0 + i / float(LINE_COUNT)))
                       * mix(0.7, 2.1, horizontalFade);
    float linePos    = plasmaY(space.x, horizontalFade, offset);
    float d          = abs(linePos - space.y);

    /* Soft body + crisp core, no glow bloom. */
    float line = smoothstep(halfWidth, 0.0, d) * 0.45
               + smoothstep(halfWidth * 0.15 + 0.01, halfWidth * 0.15, d) * 0.8;

    lines += line * mix(uAccent, uAccentSoft, rand * 0.55) * rand;
  }

  col += lines * uIntensity * (0.3 + 0.7 * centerMask);
  gl_FragColor = vec4(col, 1.0);
}
`;

/* ── Colour helpers ─────────────────────────────────────────────────────── */

type Vec3 = [number, number, number];

function parseCssColor(raw: string, fallback: Vec3): Vec3 {
  const value = raw.trim();
  if (!value) return fallback;

  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255,
    ];
  }

  const rgb = value.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (rgb) {
    return [Number(rgb[1]) / 255, Number(rgb[2]) / 255, Number(rgb[3]) / 255];
  }

  return fallback;
}

/** Read the Hero's fixed dark tokens; fall back to the same fixed values. */
function readHeroColors(scope: Element) {
  const styles = getComputedStyle(scope);
  const token = (name: string, fallback: Vec3) =>
    parseCssColor(styles.getPropertyValue(name), fallback);

  return {
    bgA: token("--hero-bg", [0, 0, 0]),
    bgB: token("--hero-surface", [0.027, 0.035, 0.027]),
    accent: token("--hero-emerald", [0.133, 0.753, 0.478]),
    accentSoft: token("--hero-emerald-bright", [0.388, 1.0, 0.78]),
  };
}

/* ── GL helpers ─────────────────────────────────────────────────────────── */

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("HeroShaderBackground shader error:", gl.getShaderInfoLog(shader));
    }
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/* ── Component ──────────────────────────────────────────────────────────── */

const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const DPR_CAP = 1.5;
const DPR_CAP_SMALL = 1.25;
const SMALL_SCREEN_PX = 768;

export default function HeroShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Reduced motion: never initialise WebGL. The Hero's fixed static CSS
       gradient (var(--hero-gradient) + .hero-aura) is the fallback. */
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let teardownGL: (() => void) | null = null;

    const start = () => {
      if (disposed || teardownGL || motionQuery.matches) return;

      const gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      });
      if (!gl) return; // WebGL unavailable → CSS gradient fallback stays

      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("HeroShaderBackground link error:", gl.getProgramInfoLog(program));
        }
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return;
      }

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );

      const aPosition = gl.getAttribLocation(program, "aPosition");
      const u = {
        resolution: gl.getUniformLocation(program, "uResolution"),
        time: gl.getUniformLocation(program, "uTime"),
        bgA: gl.getUniformLocation(program, "uBgA"),
        bgB: gl.getUniformLocation(program, "uBgB"),
        accent: gl.getUniformLocation(program, "uAccent"),
        accentSoft: gl.getUniformLocation(program, "uAccentSoft"),
        intensity: gl.getUniformLocation(program, "uIntensity"),
      };

      gl.useProgram(program);
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      /* Colours come from the Hero wrapper, never from global theme tokens. */
      const colors = readHeroColors(canvas.parentElement ?? canvas);
      gl.uniform3fv(u.bgA, colors.bgA);
      gl.uniform3fv(u.bgB, colors.bgB);
      gl.uniform3fv(u.accent, colors.accent);
      gl.uniform3fv(u.accentSoft, colors.accentSoft);

      const isSmall = window.innerWidth < SMALL_SCREEN_PX;
      gl.uniform1f(u.intensity, isSmall ? 0.3 : 0.38);

      /* ── Sizing: follow the Hero container, capped DPR ── */
      const resize = () => {
        const dprCap = window.innerWidth < SMALL_SCREEN_PX ? DPR_CAP_SMALL : DPR_CAP;
        const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
        const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
        const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
      };
      resize();

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas.parentElement ?? canvas);

      /* ── Render loop: visible + tab-focused only, ~30fps throttle ── */
      let rafId = 0;
      let running = false;
      let inViewport = true;
      let contextLost = false;
      let lastFrame = 0;
      const startTime = performance.now();

      const frame = (now: number) => {
        rafId = requestAnimationFrame(frame);
        if (now - lastFrame < FRAME_INTERVAL) return; // ~30fps cap
        lastFrame = now - ((now - lastFrame) % FRAME_INTERVAL);

        gl.uniform2f(u.resolution, canvas.width, canvas.height);
        gl.uniform1f(u.time, (now - startTime) / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      const syncRunning = () => {
        const shouldRun = inViewport && !document.hidden && !contextLost;
        if (shouldRun && !running) {
          running = true;
          lastFrame = 0;
          rafId = requestAnimationFrame(frame);
        } else if (!shouldRun && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      };

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          inViewport = entry.isIntersecting;
          syncRunning();
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(canvas);

      const onVisibilityChange = () => syncRunning();
      document.addEventListener("visibilitychange", onVisibilityChange);

      const onContextLost = (e: Event) => {
        e.preventDefault();
        contextLost = true;
        syncRunning();
      };
      const onContextRestored = () => {
        contextLost = false;
        syncRunning();
      };
      canvas.addEventListener("webglcontextlost", onContextLost);
      canvas.addEventListener("webglcontextrestored", onContextRestored);

      syncRunning();

      teardownGL = () => {
        running = false;
        cancelAnimationFrame(rafId);
        intersectionObserver.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        canvas.removeEventListener("webglcontextlost", onContextLost);
        canvas.removeEventListener("webglcontextrestored", onContextRestored);
        if (!gl.isContextLost()) {
          gl.deleteBuffer(buffer);
          gl.deleteProgram(program);
          gl.deleteShader(vs);
          gl.deleteShader(fs);
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        }
        teardownGL = null;
      };
    };

    const onMotionChange = () => {
      if (motionQuery.matches) {
        teardownGL?.();
      } else {
        start();
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    start();

    return () => {
      disposed = true;
      motionQuery.removeEventListener("change", onMotionChange);
      teardownGL?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

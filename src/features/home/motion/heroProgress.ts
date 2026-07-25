export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export const HERO_FRAME_SEQUENCE_END = 0.92;
export const HERO_WATER_TRANSITION_START = 0.72;
export const HERO_FRAME_ANCHORS = [0, 26, 38] as const;

/**
 * Static authoring data derived offline from the 49 optimized WebP frames.
 *
 * Consecutive frames were reduced to 96x54 and scored with a weighted blend
 * of RGB absolute difference (68%) and luminance-edge absolute difference
 * (32%). Scroll intervals are proportional to that cumulative visual change,
 * with short authored holds on frames 1, 27, and 39.
 *
 * Values are frame-entry thresholds in normalized sequence progress. The
 * browser performs no image analysis and no frame interpolation.
 */
const PERCEPTUAL_FRAME_STARTS = [
  0, 0.027174, 0.033339, 0.039111, 0.044946, 0.050812, 0.057087,
  0.063441, 0.070078, 0.076715, 0.083336, 0.090429, 0.097978, 0.106298,
  0.115388, 0.125359, 0.136762, 0.149249, 0.163325, 0.17803, 0.193773,
  0.211482, 0.230355, 0.251555, 0.275398, 0.303361, 0.339329, 0.393689,
  0.414119, 0.435461, 0.460986, 0.489232, 0.521757, 0.562616, 0.617709,
  0.676387, 0.730411, 0.771774, 0.806547, 0.859681, 0.885521, 0.905605,
  0.92355, 0.940236, 0.955445, 0.968828, 0.980923, 0.991098, 1,
] as const;

function smoothstep(start: number, end: number, value: number) {
  const t = clamp01((value - start) / Math.max(0.0001, end - start));
  return t * t * (3 - 2 * t);
}

export type HeroProgressState = {
  frameIndex: number;
  mediaScale: number;
  ruleProgress: number;
};

/**
 * A perceptual cut map rather than a frame-number scrub. Near-duplicate early
 * frames are compressed, the high-change waterline sequence receives more
 * scroll, and the selected frame remains a direct reversible function of
 * native document progress.
 */
export function computeHeroProgress(
  progress: number,
  frameCount: number,
): HeroProgressState {
  const bounded = clamp01(progress);
  const lastFrame = Math.max(0, frameCount - 1);
  let frameIndex = 0;

  if (frameCount === PERCEPTUAL_FRAME_STARTS.length) {
    let low = 0;
    let high = lastFrame;
    while (low <= high) {
      const middle = (low + high) >> 1;
      if (PERCEPTUAL_FRAME_STARTS[middle] <= bounded) {
        frameIndex = middle;
        low = middle + 1;
      } else {
        high = middle - 1;
      }
    }
  } else {
    frameIndex = Math.round(bounded * lastFrame);
  }

  return {
    frameIndex,
    mediaScale: 1 + smoothstep(0.916, 1, bounded) * 0.016,
    ruleProgress: smoothstep(0.04, 0.92, bounded),
  };
}

import type { PanelLayoutMode } from "./CaseStudyPanels";

/**
 * Shared responsive class for the four transformation-visual SVGs.
 *
 * Height caps per layout mode (all in svh so browser chrome can't clip):
 * - horizontalFit: aggressively small so the visual shrinks before any text —
 *   `max-h-[34svh] md:max-h-[36svh] lg:max-h-[40svh]`.
 * - horizontal / roomy (wide & tall desktop): the original generous cap
 *   `max-h-[50svh] lg:max-h-[65vh]` (kept as `vh` at lg so the locked desktop
 *   and reduced-motion snapshots stay pixel-identical).
 * - mobileStacked: the original mobile cap (`max-h-[50svh]`).
 *
 * `extra` carries per-SVG additions (e.g. `object-contain`) so each visual keeps
 * its existing presentation.
 */
export function transformationSvgClass(mode: PanelLayoutMode, extra = "") {
  const cap =
    mode === "horizontalFit"
      ? "max-h-[34svh] md:max-h-[36svh] lg:max-h-[40svh]"
      : "max-h-[50svh] lg:max-h-[65vh]";
  return `mx-auto h-auto w-full max-w-3xl ${cap}${extra ? ` ${extra}` : ""}`;
}

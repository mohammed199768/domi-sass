import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { CaseStudy, CaseStudyContent, CaseStudyScreenshot } from "./contracts";
import type { CaseStudyThemeDefinition } from "./themeRegistry";
import FitToViewport from "./FitToViewport";

/**
 * Layout modes for a case-study chapter panel. The journey decides the mode in
 * JS (it owns the media-query hooks) and passes it down, so every class below is
 * static and reliably emitted by Tailwind — no fragile arbitrary media variants.
 *
 * - "horizontal"    — full cinematic density. The wide & tall desktop journey.
 *                     Reproduces the original desktop layout exactly.
 * - "horizontalFit" — STILL the horizontal side-scroll journey, but compact
 *                     density (smaller type, tighter gaps, smaller visuals) so a
 *                     whole panel fits inside one viewport. Used for tablets and
 *                     smaller/shorter desktops. No vertical panel scroll.
 * - "roomy"         — wide & tall desktop with reduced motion. Vertically centred
 *                     full-viewport flow (preserves the reduced-motion baseline).
 * - "mobileStacked" — phone widths (< 768px). Natural vertical document flow
 *                     (the original mobile layout, untouched).
 */
export type PanelLayoutMode = "horizontal" | "horizontalFit" | "roomy" | "mobileStacked";

/**
 * CaseStudyPanelShell — shared wrapper for every chapter.
 *
 * Journey modes ("horizontal" / "horizontalFit") render a full-viewport panel
 * (`h-svh w-screen`), content vertically centred, `overflow-hidden`. The fit
 * mode only tightens the panel padding; the content's own compact density
 * (passed via `mode` to each panel) is what makes it fit one viewport. There is
 * deliberately NO `overflow-y-auto` here — a journey panel must never become a
 * vertical scroller.
 *
 * "roomy" reproduces the reduced-motion desktop layout; "mobileStacked" is the
 * original natural mobile flow.
 */
function CaseStudyPanelShell({
  panel,
  mode,
  className = "",
  decoration,
  children,
}: {
  panel: string;
  mode: PanelLayoutMode;
  className?: string;
  /** Full-panel `absolute inset-0` background decoration; never scaled/fitted. */
  decoration?: ReactNode;
  children: ReactNode;
}) {
  const modeClass = clsx(
    "relative w-full shrink-0 border-border",
    // Phone: original natural vertical flow (unchanged → stable mobile snapshots).
    mode === "mobileStacked" && "border-b px-5 py-24",
    // Reduced-motion desktop: centred full-viewport flow (unchanged baseline).
    mode === "roomy" && "flex min-h-screen items-center border-b px-5 py-24 sm:px-8 lg:px-12",
    // Full cinematic journey panel. Reproduces the locked desktop baseline
    // exactly: full-viewport (min-h so a tall chapter can grow rather than clip
    // its centred content), w-screen, centred, generous px-12 py-24.
    mode === "horizontal" &&
      "flex min-h-svh w-screen items-center overflow-hidden border-e px-12 py-24",
    // Fit journey panel — STILL horizontal side-scroll, but a hard one-viewport
    // box (h-svh, overflow-hidden, never a scroller) with compact padding. The
    // content's own compact density (per-panel) makes it fit.
    mode === "horizontalFit" &&
      "flex h-svh w-screen items-center justify-center overflow-hidden border-e px-6 py-6 md:px-10 md:py-8",
  );

  return (
    <div data-panel={panel} data-mode={mode} className={`${modeClass} ${className}`}>
      {decoration}
      {mode === "horizontalFit" ? (
        // Compact density (per-panel) shrinks content first; the measured
        // FitToViewport wrapper guarantees the whole chapter fits one viewport
        // without ever turning the panel into a vertical scroller. Background
        // decoration stays outside so it always fills the full panel.
        <FitToViewport>{children}</FitToViewport>
      ) : (
        children
      )}
    </div>
  );
}

function ChapterLabel({ number, label }: { number: string; label: string }) {
  return <p className="text-xs font-black uppercase tracking-[0.22em] text-primary-theme/60">{number} / {label}</p>;
}

function AmbientLayer() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,color-mix(in_srgb,var(--primary)_10%,transparent),transparent_30%),radial-gradient(circle_at_82%_80%,color-mix(in_srgb,var(--secondary)_8%,transparent),transparent_28%)]" />;
}

export function CaseStudyIntroPanel({ study, content, isArabic, theme, mode }: { study: CaseStudy; content: CaseStudyContent; isArabic: boolean; theme: CaseStudyThemeDefinition; mode: PanelLayoutMode }) {
  const IntroVisual = theme.IntroVisual;
  const fit = mode === "horizontalFit";
  return (
    <CaseStudyPanelShell panel="intro" mode={mode} decoration={<AmbientLayer />}>
      <div className={clsx("mx-auto grid w-full max-w-7xl items-center lg:grid-cols-[1.12fr_.88fr]", fit ? "gap-7 md:grid-cols-[1.12fr_.88fr]" : "gap-12")}>
        <div className="max-w-4xl">
          <ChapterLabel number="01" label={content.chapters[0]} />
          <h1 className={clsx("text-balance font-black leading-[1.18] text-foreground", fit ? "mt-5 text-3xl md:text-4xl" : "mt-7 text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem]")}>{content.title}</h1>
          <p className={clsx("max-w-3xl leading-8 text-muted", fit ? "mt-5 text-base md:text-lg" : "mt-8 text-lg leading-9 sm:text-xl")}>{content.positioning}</p>
        </div>
        <IntroVisual study={study} />
      </div>
      <div className={`absolute bottom-8 hidden items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-muted/50 lg:flex ${isArabic ? "left-12" : "right-12"}`}>
        {isArabic ? "مرّر لاكتشاف القصة" : "Scroll to follow the story"}
        {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
      </div>
    </CaseStudyPanelShell>
  );
}

export function CaseStudyBeforePanel({ content, theme, mode }: { content: CaseStudyContent; theme: CaseStudyThemeDefinition; mode: PanelLayoutMode }) {
  const fit = mode === "horizontalFit";
  return (
    <CaseStudyPanelShell panel="before" mode={mode} className="bg-surface-hover/55">
      <div className={clsx("mx-auto grid w-full max-w-7xl lg:grid-cols-[.82fr_1.18fr] lg:items-center", fit ? "gap-7 md:grid-cols-[.82fr_1.18fr] md:items-center" : "gap-12")}>
        <div>
          <ChapterLabel number="02" label={content.chapters[1]} />
          <h2 className={clsx("font-black leading-tight", fit ? "mt-4 text-3xl md:text-4xl" : "mt-6 text-4xl sm:text-6xl")}>{content.before.title}</h2>
          <p className={clsx("max-w-xl text-muted", fit ? "mt-4 text-base leading-7" : "mt-6 text-lg leading-8")}>{content.before.intro}</p>
          {content.before.microcopy && <p className={clsx("border-s-2 border-secondary-theme ps-4 font-black text-foreground/70", fit ? "mt-4 text-xs leading-6" : "mt-7 text-sm leading-7")}>{content.before.microcopy}</p>}
        </div>
        <div className={clsx("relative overflow-hidden border border-border bg-background/75 shadow-xl shadow-foreground/5", fit ? "min-h-[18rem] p-5 md:min-h-[21rem]" : "min-h-[31rem] p-7 sm:p-10", theme.beforeFrameClassName)}>
          <ul className={clsx("relative grid sm:grid-cols-2", fit ? "gap-2" : "gap-3")}>
            {content.before.points.map((point, index) => <li key={point} className={clsx("flex items-center justify-between rounded-2xl border border-border bg-surface font-bold shadow-sm", fit ? "min-h-16 p-3 text-sm" : "min-h-24 p-5 text-base", index % 3 === 0 ? "sm:translate-y-5 sm:-rotate-2" : index % 3 === 1 ? "sm:-translate-y-2 sm:rotate-1" : "sm:translate-y-9 sm:-rotate-1")}><span>{point}</span><span className="text-xs text-muted/40">0{index + 1}</span></li>)}
          </ul>
        </div>
      </div>
    </CaseStudyPanelShell>
  );
}

export function CaseStudyTransformationPanel({ content, finalState, theme, mode }: { content: CaseStudyContent; finalState: boolean; theme: CaseStudyThemeDefinition; mode: PanelLayoutMode }) {
  const TransformationVisual = theme.TransformationVisual;
  const isSplit = theme.transformationLayout === "split";
  const fit = mode === "horizontalFit";

  return (
    <CaseStudyPanelShell panel="transformation" mode={mode} className="bg-background" decoration={<AmbientLayer />}>
      {isSplit ? (
        <div className={clsx("mx-auto grid w-full max-w-7xl lg:grid-cols-[.8fr_1.2fr] lg:items-center", fit ? "gap-6 md:grid-cols-[.8fr_1.2fr] md:items-center" : "gap-10")}>
          <div className={clsx("flex flex-col", fit ? "gap-4" : "gap-6")}>
            <div>
              <ChapterLabel number="03" label={content.chapters[2]} />
              <h2 className={clsx("font-black", fit ? "mt-4 text-3xl md:text-4xl" : "mt-5 text-4xl sm:text-6xl")}>{content.transformation.title}</h2>
            </div>
            <p className={clsx("max-w-md text-muted", fit ? "text-sm leading-7" : "text-base leading-8")}>{content.transformation.body}</p>
          </div>
          <div className={clsx("overflow-hidden border border-border bg-surface/70 shadow-2xl shadow-primary-theme/10", fit ? "p-2 md:p-4" : "p-3 sm:p-7", theme.transformationFrameClassName)}>
            <TransformationVisual key={finalState ? "final" : "animated"} finalState={finalState} mode={mode} />
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-7xl">
          <div className={clsx("flex flex-col justify-between md:flex-row md:items-end", fit ? "mb-5 gap-4" : "mb-8 gap-5")}>
            <div className="max-w-3xl"><ChapterLabel number="03" label={content.chapters[2]} /><h2 className={clsx("font-black", fit ? "mt-4 text-3xl md:text-4xl" : "mt-5 text-4xl sm:text-6xl")}>{content.transformation.title}</h2></div>
            <p className={clsx("max-w-md text-muted", fit ? "text-sm leading-7" : "text-base leading-8")}>{content.transformation.body}</p>
          </div>
          <div className={clsx("overflow-hidden border border-border bg-surface/70 shadow-2xl shadow-primary-theme/10", fit ? "p-2 md:p-4" : "p-3 sm:p-7", theme.transformationFrameClassName)}>
            <TransformationVisual key={finalState ? "final" : "animated"} finalState={finalState} mode={mode} />
          </div>
        </div>
      )}
    </CaseStudyPanelShell>
  );
}

export function CaseStudyAfterPanel({ content, mode }: { content: CaseStudyContent; mode: PanelLayoutMode }) {
  const fit = mode === "horizontalFit";
  return (
    <CaseStudyPanelShell panel="after" mode={mode} className="bg-primary-theme/[.035]">
      <div className={clsx("mx-auto grid w-full max-w-7xl lg:grid-cols-[.82fr_1.18fr] lg:items-center", fit ? "gap-7 md:grid-cols-[.82fr_1.18fr] md:items-center" : "gap-12")}>
        <div><ChapterLabel number="04" label={content.chapters[3]} /><h2 className={clsx("font-black leading-tight", fit ? "mt-4 text-3xl md:text-4xl" : "mt-6 text-4xl sm:text-6xl")}>{content.after.title}</h2><p className={clsx("max-w-xl text-muted", fit ? "mt-4 text-base leading-7" : "mt-6 text-lg leading-8")}>{content.after.intro}</p>{content.after.microcopy && <p className={clsx("border-s-2 border-secondary-theme ps-4 font-black text-foreground/70", fit ? "mt-4 text-xs leading-6" : "mt-7 text-sm leading-7")}>{content.after.microcopy}</p>}</div>
        <ol className="grid overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2">
          {content.after.points.map((point, index) => <li key={point} className={clsx("flex items-center bg-surface", fit ? "min-h-20 gap-3 p-4" : "min-h-36 gap-5 p-6 sm:p-8")}><span className={clsx("grid shrink-0 place-items-center rounded-full bg-primary-theme text-xs font-black text-background", fit ? "h-8 w-8" : "h-10 w-10")}>{String(index + 1).padStart(2, "0")}</span><span className={clsx("font-black text-foreground", fit ? "text-base" : "text-lg")}>{point}</span></li>)}
        </ol>
      </div>
    </CaseStudyPanelShell>
  );
}

function StoryboardVisual({ shot }: { shot: CaseStudyScreenshot }) {
  if (shot.presentation === "concept") {
    return <div role="img" aria-label={shot.alt} className="relative aspect-[4/3] overflow-hidden bg-surface-hover p-6"><div className="mx-auto h-full max-w-[75%] -rotate-2 rounded-xl border border-border bg-surface p-5 shadow-xl"><div className="flex items-center justify-between border-b border-border pb-3"><span className="h-3 w-20 rounded-full bg-primary-theme/25"/><span className="h-7 w-7 rounded-full border border-secondary-theme/40"/></div><div className="mt-4 grid grid-cols-3 gap-2">{Array.from({ length: 12 }, (_, i) => <span key={i} className={`aspect-square rounded-md border border-border ${i === 7 ? "bg-secondary-theme/30" : "bg-background"}`} />)}</div></div><span className="absolute end-5 top-9 grid h-14 w-14 place-items-center rounded-full border border-border bg-surface text-xl shadow-lg" aria-hidden="true">☎</span><span className="absolute bottom-8 start-4 rounded-xl border border-border bg-surface px-4 py-2 text-[10px] font-black text-muted shadow-lg" aria-hidden="true">BOOKING?</span></div>;
  }
  if (shot.presentation === "responsive") {
    return <div role="img" aria-label={shot.alt} className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a] p-4"><div className="absolute inset-x-[8%] top-[11%] h-[68%] overflow-hidden rounded-lg border-4 border-[#292929] bg-white"><Image src={shot.src} alt="" fill sizes="30vw" className="object-cover" /></div><div className="absolute bottom-[7%] start-[7%] h-[48%] w-[27%] overflow-hidden rounded-md border-4 border-[#292929] bg-white"><Image src={shot.src} alt="" fill sizes="12vw" className="object-cover" /></div><div className="absolute bottom-[6%] end-[9%] h-[55%] w-[18%] overflow-hidden rounded-[.65rem] border-4 border-[#292929] bg-white"><Image src={shot.src} alt="" fill sizes="8vw" className="object-cover" /></div></div>;
  }
  return <div className="relative aspect-[4/3] bg-[#080808]"><Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain" /></div>;
}

export function CaseStudyStoryboardPanel({ content, mode }: { content: CaseStudyContent; mode: PanelLayoutMode }) {
  const fit = mode === "horizontalFit";
  return (
    <CaseStudyPanelShell panel="storyboard" mode={mode} className="bg-surface-hover/50">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><ChapterLabel number="05" label={content.chapters[4]} /><h2 className={clsx("max-w-3xl font-black", fit ? "mt-4 text-3xl md:text-4xl" : "mt-5 text-4xl sm:text-6xl")}>{content.storyboard.title}</h2></div><p className={clsx("max-w-md text-muted", fit ? "text-sm leading-7" : "text-base leading-8")}>{content.storyboard.intro}</p></div>
        <div className={clsx("grid", fit ? "mt-5 gap-4" : "mt-10 gap-5", content.storyboard.screenshots.length === 2 ? "md:grid-cols-2 max-w-5xl mx-auto" : content.storyboard.screenshots.length > 3 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-3")}>
          {content.storyboard.screenshots.map((shot, index) => <figure key={`${shot.src}-${index}`} className={clsx("overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-xl shadow-foreground/5", !fit && content.storyboard.screenshots.length > 2 && index === 1 ? "xl:-translate-y-5" : "")}><StoryboardVisual shot={shot} /><figcaption className={clsx("flex items-start justify-between gap-3 font-bold leading-6", fit ? "min-h-0 px-4 py-3 text-xs" : "min-h-24 px-5 py-4 text-sm")}><span>{shot.caption}</span><span className="shrink-0 text-xs text-muted/40">0{index + 1}</span></figcaption></figure>)}
        </div>
      </div>
    </CaseStudyPanelShell>
  );
}

export function CaseStudyFeaturesPanel({ content, mode }: { content: CaseStudyContent; mode: PanelLayoutMode }) {
  const fit = mode === "horizontalFit";
  return (
    <CaseStudyPanelShell panel="features" mode={mode} className="bg-background">
      <div className={clsx("mx-auto grid w-full max-w-7xl lg:grid-cols-[.72fr_1.28fr] lg:items-center", fit ? "gap-6 md:grid-cols-[.72fr_1.28fr] md:items-center" : "gap-10")}>
        <div><ChapterLabel number="06" label={content.chapters[5]} /><h2 className={clsx("font-black", fit ? "mt-4 text-3xl md:text-4xl" : "mt-5 text-4xl sm:text-6xl")}>{content.featuresTitle}</h2><p className={clsx("text-muted", fit ? "mt-4 text-sm leading-7" : "mt-6 text-lg leading-8")}>{content.featuresIntro}</p></div>
        <div className="grid overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {content.features.map((feature, index) => <article key={feature.title} className={clsx("bg-surface", fit ? "min-h-0 p-4" : "min-h-56 p-6")}><div className="flex items-center justify-between"><span className="text-xs font-black text-muted/40">0{index + 1}</span><span className={`h-2.5 w-2.5 rounded-full ${index === 2 ? "bg-secondary-theme" : "bg-primary-theme"}`} /></div><h3 className={clsx("font-black", fit ? "mt-5 text-base md:text-lg" : "mt-14 text-xl")}>{feature.title}</h3><p className={clsx("text-muted", fit ? "mt-2 text-xs leading-6" : "mt-3 text-sm leading-7")}>{feature.description}</p></article>)}
        </div>
      </div>
    </CaseStudyPanelShell>
  );
}

export function CaseStudyResultPanel({ content, mode }: { content: CaseStudyContent; mode: PanelLayoutMode }) {
  const fit = mode === "horizontalFit";
  return (
    <CaseStudyPanelShell
      panel="result"
      mode={mode}
      className="bg-foreground text-background"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <ChapterLabel number="07" label={content.chapters[6]} />
        <h2 className={clsx("text-balance font-black leading-[1.3] !text-background", fit ? "mt-5 text-2xl md:text-3xl" : "mt-8 text-4xl leading-[1.35] sm:text-6xl lg:text-7xl")}>{content.result}</h2>

        {content.businessValue && (
          <div className={clsx("grid border-t border-background/20 md:grid-cols-2", fit ? "mt-6 gap-6 pt-6" : "mt-12 gap-10 pt-10")}>
            <div>
              <h3 className={clsx("font-bold text-primary-theme", fit ? "mb-2 text-base" : "mb-4 text-xl")}>{content.businessValue.platformOwner.title}</h3>
              <ul className={clsx("grid", fit ? "gap-2" : "gap-3")}>
                {content.businessValue.platformOwner.points.map((pt, i) => (
                  <li key={i} className={clsx("flex gap-3 text-background/80", fit ? "text-xs leading-5" : "text-sm")}><span className="text-primary-theme opacity-60">■</span>{pt}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={clsx("font-bold text-primary-theme", fit ? "mb-2 text-base" : "mb-4 text-xl")}>{content.businessValue.organization.title}</h3>
              <ul className={clsx("grid", fit ? "gap-2" : "gap-3")}>
                {content.businessValue.organization.points.map((pt, i) => (
                  <li key={i} className={clsx("flex gap-3 text-background/80", fit ? "text-xs leading-5" : "text-sm")}><span className="text-primary-theme opacity-60">■</span>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {content.technicalStory && (
          <div className={clsx("border-t border-background/20", fit ? "mt-5 pt-5" : "mt-10 pt-10")}>
            <h3 className={clsx("font-bold text-primary-theme", fit ? "mb-2 text-base" : "mb-3 text-xl")}>{content.technicalStory.title}</h3>
            <p className={clsx("max-w-4xl text-background/80", fit ? "text-xs leading-6" : "text-sm leading-relaxed")}>{content.technicalStory.body}</p>
          </div>
        )}

        <div className={clsx("flex flex-wrap", fit ? "mt-6 gap-3" : "mt-12 gap-4")}><Link href="/#contact" className={clsx("rounded-full bg-background font-black text-foreground transition hover:opacity-85", fit ? "px-5 py-2.5 text-sm" : "px-6 py-3 text-sm")}>{content.cta}</Link><Link href="/#portfolio" className={clsx("rounded-full border border-background/25 font-black text-background transition hover:bg-background/10", fit ? "px-5 py-2.5 text-sm" : "px-6 py-3 text-sm")}>{content.backHome}</Link></div>
      </div>
    </CaseStudyPanelShell>
  );
}

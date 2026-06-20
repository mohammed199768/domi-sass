import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CaseStudy, CaseStudyContent, CaseStudyScreenshot } from "./contracts";
import type { CaseStudyThemeDefinition } from "./themeRegistry";

const panelClass = "relative flex min-h-[auto] w-full shrink-0 items-center overflow-hidden border-b border-border px-5 py-24 sm:px-8 lg:min-h-screen lg:w-screen lg:border-b-0 lg:border-e lg:px-12 lg:py-24";

function ChapterLabel({ number, label }: { number: string; label: string }) {
  return <p className="text-xs font-black uppercase tracking-[0.22em] text-primary-theme/60">{number} / {label}</p>;
}

function AmbientLayer() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,color-mix(in_srgb,var(--primary)_10%,transparent),transparent_30%),radial-gradient(circle_at_82%_80%,color-mix(in_srgb,var(--secondary)_8%,transparent),transparent_28%)]" />;
}

export function CaseStudyIntroPanel({ study, content, isArabic, theme }: { study: CaseStudy; content: CaseStudyContent; isArabic: boolean; theme: CaseStudyThemeDefinition }) {
  const IntroVisual = theme.IntroVisual;
  return (
    <div className={panelClass} data-panel="intro">
      <AmbientLayer />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.12fr_.88fr]">
        <div className="max-w-4xl">
          <ChapterLabel number="01" label={content.chapters[0]} />
          <h1 className="mt-7 text-balance text-4xl font-black leading-[1.18] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.25rem]">{content.title}</h1>
          <p className="mt-8 max-w-3xl text-lg leading-9 text-muted sm:text-xl">{content.positioning}</p>
        </div>
        <IntroVisual study={study} />
      </div>
      <div className={`absolute bottom-8 hidden items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-muted/50 lg:flex ${isArabic ? "left-12" : "right-12"}`}>
        {isArabic ? "مرّر لاكتشاف القصة" : "Scroll to follow the story"}
        {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
      </div>
    </div>
  );
}

export function CaseStudyBeforePanel({ content, theme }: { content: CaseStudyContent; theme: CaseStudyThemeDefinition }) {
  return (
    <div className={`${panelClass} bg-surface-hover/55`} data-panel="before">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
        <div>
          <ChapterLabel number="02" label={content.chapters[1]} />
          <h2 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">{content.before.title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{content.before.intro}</p>
          {content.before.microcopy && <p className="mt-7 border-s-2 border-secondary-theme ps-4 text-sm font-black leading-7 text-foreground/70">{content.before.microcopy}</p>}
        </div>
        <div className={`relative min-h-[31rem] overflow-hidden border border-border bg-background/75 p-7 shadow-xl shadow-foreground/5 sm:p-10 ${theme.beforeFrameClassName}`}>
          <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px]" />
          <ul className="relative grid gap-3 sm:grid-cols-2">
            {content.before.points.map((point, index) => <li key={point} className={`flex min-h-24 items-center justify-between rounded-2xl border border-border bg-surface p-5 text-base font-bold shadow-sm ${index % 3 === 0 ? "sm:translate-y-5 sm:-rotate-2" : index % 3 === 1 ? "sm:-translate-y-2 sm:rotate-1" : "sm:translate-y-9 sm:-rotate-1"}`}><span>{point}</span><span className="text-xs text-muted/40">0{index + 1}</span></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function CaseStudyTransformationPanel({ content, finalState, theme }: { content: CaseStudyContent; finalState: boolean; theme: CaseStudyThemeDefinition }) {
  const TransformationVisual = theme.TransformationVisual;
  return (
    <div className={`${panelClass} bg-background`} data-panel="transformation">
      <AmbientLayer />
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl"><ChapterLabel number="03" label={content.chapters[2]} /><h2 className="mt-5 text-4xl font-black sm:text-6xl">{content.transformation.title}</h2></div>
          <p className="max-w-md text-base leading-8 text-muted">{content.transformation.body}</p>
        </div>
        <div className={`overflow-hidden border border-border bg-surface/70 p-3 shadow-2xl shadow-primary-theme/10 sm:p-7 ${theme.transformationFrameClassName}`}>
          <TransformationVisual key={finalState ? "final" : "animated"} finalState={finalState} />
        </div>
      </div>
    </div>
  );
}

export function CaseStudyAfterPanel({ content }: { content: CaseStudyContent }) {
  return (
    <div className={`${panelClass} bg-primary-theme/[.035]`} data-panel="after">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
        <div><ChapterLabel number="04" label={content.chapters[3]} /><h2 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">{content.after.title}</h2><p className="mt-6 max-w-xl text-lg leading-8 text-muted">{content.after.intro}</p>{content.after.microcopy && <p className="mt-7 border-s-2 border-secondary-theme ps-4 text-sm font-black leading-7 text-foreground/70">{content.after.microcopy}</p>}</div>
        <ol className="grid overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2">
          {content.after.points.map((point, index) => <li key={point} className="flex min-h-36 items-center gap-5 bg-surface p-6 sm:p-8"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-theme text-xs font-black text-background">{String(index + 1).padStart(2, "0")}</span><span className="text-lg font-black text-foreground">{point}</span></li>)}
        </ol>
      </div>
    </div>
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

export function CaseStudyStoryboardPanel({ content }: { content: CaseStudyContent }) {
  return (
    <div className={`${panelClass} bg-surface-hover/50`} data-panel="storyboard">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><ChapterLabel number="05" label={content.chapters[4]} /><h2 className="mt-5 max-w-3xl text-4xl font-black sm:text-6xl">{content.storyboard.title}</h2></div><p className="max-w-md text-base leading-8 text-muted">{content.storyboard.intro}</p></div>
        <div className={`mt-10 grid gap-5 md:grid-cols-2 ${content.storyboard.screenshots.length > 3 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
          {content.storyboard.screenshots.map((shot, index) => <figure key={`${shot.src}-${index}`} className={`overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-xl shadow-foreground/5 ${index === 1 ? "xl:-translate-y-5" : ""}`}><StoryboardVisual shot={shot} /><figcaption className="flex min-h-24 items-start justify-between gap-3 px-5 py-4 text-sm font-bold leading-6"><span>{shot.caption}</span><span className="shrink-0 text-xs text-muted/40">0{index + 1}</span></figcaption></figure>)}
        </div>
      </div>
    </div>
  );
}

export function CaseStudyFeaturesPanel({ content }: { content: CaseStudyContent }) {
  return (
    <div className={`${panelClass} bg-background`} data-panel="features">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
        <div><ChapterLabel number="06" label={content.chapters[5]} /><h2 className="mt-5 text-4xl font-black sm:text-6xl">{content.featuresTitle}</h2><p className="mt-6 text-lg leading-8 text-muted">{content.featuresIntro}</p></div>
        <div className="grid overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {content.features.map((feature, index) => <article key={feature.title} className="min-h-56 bg-surface p-6"><div className="flex items-center justify-between"><span className="text-xs font-black text-muted/40">0{index + 1}</span><span className={`h-2.5 w-2.5 rounded-full ${index === 2 ? "bg-secondary-theme" : "bg-primary-theme"}`} /></div><h3 className="mt-14 text-xl font-black">{feature.title}</h3><p className="mt-3 text-sm leading-7 text-muted">{feature.description}</p></article>)}
        </div>
      </div>
    </div>
  );
}

export function CaseStudyResultPanel({ content }: { content: CaseStudyContent }) {
  return (
    <div className={`${panelClass} bg-foreground text-background`} data-panel="result">
      <div aria-hidden="true" className="absolute inset-0 opacity-[.06] [background-image:linear-gradient(to_right,var(--bg)_1px,transparent_1px)] [background-size:12.5%_100%]" />
      <div className="relative mx-auto w-full max-w-6xl">
        <ChapterLabel number="07" label={content.chapters[6]} />
        <h2 className="mt-8 text-balance text-4xl font-black leading-[1.35] !text-background sm:text-6xl lg:text-7xl">{content.result}</h2>
        <div className="mt-12 flex flex-wrap gap-4"><Link href="/#contact" className="rounded-full bg-background px-6 py-3 text-sm font-black text-foreground transition hover:opacity-85">{content.cta}</Link><Link href="/#portfolio" className="rounded-full border border-background/25 px-6 py-3 text-sm font-black text-background transition hover:bg-background/10">{content.backHome}</Link></div>
      </div>
    </div>
  );
}

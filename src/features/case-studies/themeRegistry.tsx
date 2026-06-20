import Image from "next/image";
import type { ComponentType } from "react";
import type { CaseStudy, CaseStudyVisualTheme } from "./contracts";
import type { PanelLayoutMode } from "./CaseStudyPanels";
import TrainingPlatformSvg from "./TrainingPlatformSvg";
import WeddingBookingSvg from "./WeddingBookingSvg";
import HealthcareCoordinationSvg from "./HealthcareCoordinationSvg";
import AiReadinessIndexSvg from "./AiReadinessIndexSvg";

type IntroVisualProps = { study: CaseStudy };
type TransformationVisualProps = { finalState: boolean; mode: PanelLayoutMode };

export type CaseStudyThemeDefinition = {
  IntroVisual: ComponentType<IntroVisualProps>;
  TransformationVisual: ComponentType<TransformationVisualProps>;
  beforeFrameClassName: string;
  transformationFrameClassName: string;
  transformationLayout?: "stacked" | "split";
};

function TrainingPlatformIntroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[28rem]">
      <div className="absolute inset-[13%] rounded-[2rem] border border-border bg-surface/80 p-6 shadow-2xl shadow-primary-theme/10 backdrop-blur">
        <div className="h-10 rounded-xl bg-primary-theme" />
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="h-28 rounded-2xl bg-primary-theme/10" />
          <div className="h-28 rounded-2xl bg-secondary-theme/15" />
          <div className="col-span-2 h-16 rounded-2xl border border-border" />
        </div>
      </div>
      <span className="absolute start-0 top-[18%] h-14 w-14 rounded-2xl border border-border bg-surface shadow-xl" />
      <span className="absolute end-0 bottom-[19%] h-14 w-14 rounded-2xl border border-border bg-surface shadow-xl" />
      <span className="absolute bottom-[3%] start-[22%] h-3 w-3 rounded-full bg-secondary-theme" />
    </div>
  );
}

function WeddingBookingIntroVisual({ study }: IntroVisualProps) {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[4/5] w-full max-w-[29rem]">
      <div className="absolute inset-0 overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border border-border bg-surface shadow-2xl shadow-secondary-theme/10">
        <Image src={study.cover} alt="" fill priority sizes="(max-width: 1024px) 90vw, 35vw" className="object-cover" />
      </div>
      <div className="absolute -bottom-5 -start-8 w-[72%] rounded-[1.5rem] border border-border bg-surface/90 p-5 shadow-xl backdrop-blur">
        <div className="h-2 w-2/3 rounded-full bg-primary-theme/30" />
        <div className="mt-3 h-2 w-1/2 rounded-full bg-secondary-theme/50" />
      </div>
    </div>
  );
}

function HealthcareCoordinationIntroVisual({ study }: IntroVisualProps) {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <div className="absolute inset-[10%] overflow-hidden rounded-full border-4 border-surface bg-background shadow-2xl shadow-primary-theme/5">
        <Image src={study.cover} alt="" fill priority sizes="(max-width: 1024px) 80vw, 30vw" className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
      </div>
      <div className="absolute bottom-0 end-0 h-28 w-28 rounded-full border border-border bg-surface shadow-xl flex items-center justify-center">
        <div className="h-14 w-14 rounded-full bg-primary-theme/10 flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-secondary-theme" />
        </div>
      </div>
      <div className="absolute top-[10%] start-0 h-16 w-32 rounded-[1rem] border border-border bg-surface/80 shadow-lg backdrop-blur flex items-center px-4">
        <div className="h-2 w-16 rounded-full bg-primary-theme/40" />
      </div>
    </div>
  );
}

function AiReadinessIntroVisual({ study }: IntroVisualProps) {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[4/3] w-full max-w-[30rem] overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl">
      <div className="absolute inset-0">
        <Image src={study.cover} alt="" fill priority sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover opacity-90" />
      </div>
      <div className="absolute bottom-6 end-6 rounded-xl border border-border bg-surface/90 px-5 py-4 shadow-xl backdrop-blur flex items-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-secondary-theme flex items-center justify-center">
          <div className="text-xs font-black text-primary-theme">82</div>
        </div>
        <div>
          <div className="h-2 w-16 rounded-full bg-primary-theme/60 mb-2" />
          <div className="h-1.5 w-10 rounded-full bg-muted/30" />
        </div>
      </div>
    </div>
  );
}

export const caseStudyThemeRegistry = {
  "training-platform": {
    IntroVisual: TrainingPlatformIntroVisual,
    TransformationVisual: TrainingPlatformSvg,
    beforeFrameClassName: "rounded-[2rem]",
    transformationFrameClassName: "rounded-[2rem]",
  },
  "wedding-booking": {
    IntroVisual: WeddingBookingIntroVisual,
    TransformationVisual: WeddingBookingSvg,
    beforeFrameClassName: "rounded-t-[7rem] rounded-b-[2rem]",
    transformationFrameClassName: "rounded-t-[6rem] rounded-b-[2rem]",
    transformationLayout: "split",
  },
  "healthcare-coordination": {
    IntroVisual: HealthcareCoordinationIntroVisual,
    TransformationVisual: HealthcareCoordinationSvg,
    beforeFrameClassName: "rounded-[2.5rem]",
    transformationFrameClassName: "rounded-[2.5rem]",
    transformationLayout: "split",
  },
  "ai-readiness-index": {
    IntroVisual: AiReadinessIntroVisual,
    TransformationVisual: AiReadinessIndexSvg,
    beforeFrameClassName: "rounded-[1.5rem]",
    transformationFrameClassName: "rounded-2xl",
    transformationLayout: "split",
  },
} satisfies Record<CaseStudyVisualTheme, CaseStudyThemeDefinition>;

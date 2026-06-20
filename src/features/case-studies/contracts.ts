export type CaseStudyLocale = "en" | "ar";

export type CaseStudyVisualTheme = "training-platform" | "wedding-booking";

export type CaseStudyFeature = {
  title: string;
  description: string;
};

export type CaseStudyScreenshot = {
  src: string;
  alt: string;
  caption: string;
  presentation?: "image" | "concept" | "responsive";
};

export type CaseStudyContent = {
  eyebrow: string;
  title: string;
  positioning: string;
  before: { title: string; intro: string; points: string[]; microcopy?: string };
  transformation: { title: string; body: string };
  after: { title: string; intro: string; points: string[]; microcopy?: string };
  storyboard: { title: string; intro: string; screenshots: CaseStudyScreenshot[] };
  featuresTitle: string;
  featuresIntro: string;
  features: CaseStudyFeature[];
  result: string;
  cta: string;
  backHome: string;
  chapters: string[];
};

export type CaseStudy = {
  slug: string;
  visualTheme: CaseStudyVisualTheme;
  cover: string;
  seo: { title: string; description: string };
  content: Record<CaseStudyLocale, CaseStudyContent>;
};

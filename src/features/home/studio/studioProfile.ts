// DOMINASE Studio Archive — single media manifest for the homepage social
// profile. Every asset here is real (public/new-video → optimized derivatives
// in public/media/studio). No invented metrics, followers, likes, or views.

export type Localized = { en: string; ar: string };

export type StudioSlide = { src: string; alt: Localized };

export type StudioTab = "posts" | "films" | "projects";
export type StudioKind = "carousel" | "film" | "reel";
export type StudioAspect = "portrait" | "landscape" | "wide" | "reel";

export type StudioMedia = {
  id: string;
  kind: StudioKind;
  tab: StudioTab;
  aspect: StudioAspect;
  title: Localized;
  caption: Localized;
  thumb: string;
  /** carousel / story slides */
  slides?: StudioSlide[];
  /** film / reel playback */
  videoSrc?: string;
  poster?: string;
  duration?: string;
  /** real destination + identity, only when it exists on the site */
  route?: string;
  project?: string;
  featured?: boolean;
  /** stories that only open from a highlight (kept out of the grid) */
  inGrid?: boolean;
};

export type StudioHighlight = {
  id: string;
  label: Localized;
  cover: string;
  mediaId: string;
};

const P = "/media/studio";

// Optimized derivative for the one oversized source (68MB → 10.7MB).
const VIDEO = {
  studio: "/new-video/dominase-trailer.mp4",
  studioHome: "/new-video/dominase-trailer-home.mp4",
  dominaseReel1: "/new-video/dominase-trailler.mp4",
  dominaseReel2: "/new-video/dominase-trailler-91.6.mp4",
  vertical1: `${P}/video/reel-vertical-01.mp4`,
  vertical2:
    "/new-video/WhatsApp%20Video%202026-07-24%20at%2010.21.28%20PM.mp4",
  vertical3:
    "/new-video/WhatsApp%20Video%202026-07-24%20at%2010.21.59%20PM.mp4",
  archive1: "/new-video/old-dominase.mp4",
  archive2: "/new-video/old-dominase2.mp4",
  sultanHome: "/new-video/sultanshadi-project-home.mp4",
  sultan: "/new-video/sultanshadi-project.mp4",
  ourClinic: "/new-video/our-clinic-project.mp4",
  inkspire1: "/new-video/inkspire-projects.mp4",
  inkspire2: "/new-video/inkspire-project2.mp4",
} as const;

function slides(prefix: "brand" | "convert" | "work", alt: Localized): StudioSlide[] {
  return Array.from({ length: 6 }, (_, i) => ({
    src: `${P}/slides/${prefix}-${i + 1}.webp`,
    alt: { en: `${alt.en} — ${i + 1}/6`, ar: `${alt.ar} — ${i + 1}/٦` },
  }));
}

export const studioMedia: StudioMedia[] = [
  // ── Posts / Stories (real branded carousels) ──────────────────────────
  {
    id: "brand",
    kind: "carousel",
    tab: "posts",
    aspect: "portrait",
    title: { en: "What DOMINASE Means", ar: "ما معنى DOMINASE" },
    caption: {
      en: "Presence alone isn't enough — from domain to activation.",
      ar: "الوجود وحده لا يكفي — من النطاق إلى التفعيل.",
    },
    thumb: `${P}/thumbs/post-brand.webp`,
    slides: slides("brand", { en: "What DOMINASE means", ar: "ما معنى DOMINASE" }),
  },
  {
    id: "convert",
    kind: "carousel",
    tab: "posts",
    aspect: "portrait",
    title: { en: "What Makes a Site Convert", ar: "ما الذي يجلب العملاء" },
    caption: {
      en: "A clear message, trust, and an easy path to action.",
      ar: "رسالة واضحة، وثقة، ومسار سهل نحو الإجراء.",
    },
    thumb: `${P}/thumbs/post-convert.webp`,
    slides: slides("convert", {
      en: "What makes a site convert",
      ar: "ما الذي يجلب العملاء",
    }),
  },
  {
    id: "work",
    kind: "carousel",
    tab: "posts",
    aspect: "portrait",
    title: { en: "Selected Work", ar: "نماذج من أعمالنا" },
    caption: {
      en: "Real digital products, designed with clarity.",
      ar: "منتجات رقمية حقيقية، مصمّمة بوضوح.",
    },
    thumb: `${P}/thumbs/post-work.webp`,
    slides: slides("work", { en: "Selected work", ar: "نماذج من أعمالنا" }),
  },

  // ── Films / Reels ─────────────────────────────────────────────────────
  {
    id: "film-studio",
    kind: "film",
    tab: "films",
    aspect: "landscape",
    title: { en: "Studio Film", ar: "فيلم الاستوديو" },
    caption: { en: "The DOMINASE studio in motion.", ar: "استوديو DOMINASE في حركة." },
    thumb: `${P}/thumbs/film-studio.webp`,
    poster: `${P}/posters/film-studio.webp`,
    videoSrc: VIDEO.studio,
    duration: "0:23",
    featured: true,
  },
  {
    id: "film-studio-home",
    kind: "film",
    tab: "films",
    aspect: "landscape",
    title: { en: "Studio Reel", ar: "ريل الاستوديو" },
    caption: { en: "A short pass through the work.", ar: "مرور سريع على الأعمال." },
    thumb: `${P}/thumbs/film-studio-home.webp`,
    poster: `${P}/posters/film-studio-home.webp`,
    videoSrc: VIDEO.studioHome,
    duration: "0:23",
  },
  {
    id: "reel-dominase-01",
    kind: "reel",
    tab: "films",
    aspect: "reel",
    title: { en: "DOMINASE Reel", ar: "ريل DOMINASE" },
    caption: { en: "Vertical brand cut.", ar: "مقطع عمودي للعلامة." },
    thumb: `${P}/thumbs/reel-dominase-01.webp`,
    poster: `${P}/posters/reel-dominase-01.webp`,
    videoSrc: VIDEO.dominaseReel1,
    duration: "0:15",
  },
  {
    id: "reel-dominase-02",
    kind: "reel",
    tab: "films",
    aspect: "reel",
    title: { en: "DOMINASE Reel II", ar: "ريل DOMINASE ٢" },
    caption: { en: "Vertical brand cut.", ar: "مقطع عمودي للعلامة." },
    thumb: `${P}/thumbs/reel-dominase-02.webp`,
    poster: `${P}/posters/reel-dominase-02.webp`,
    videoSrc: VIDEO.dominaseReel2,
    duration: "0:15",
  },
  {
    id: "reel-vertical-01",
    kind: "reel",
    tab: "films",
    aspect: "reel",
    title: { en: "Vertical Film", ar: "فيلم عمودي" },
    caption: { en: "Full vertical piece.", ar: "قطعة عمودية كاملة." },
    thumb: `${P}/thumbs/reel-vertical-01.webp`,
    poster: `${P}/posters/reel-vertical-01.webp`,
    videoSrc: VIDEO.vertical1,
    duration: "0:29",
  },
  {
    id: "reel-vertical-02",
    kind: "reel",
    tab: "films",
    aspect: "reel",
    title: { en: "Studio Cut", ar: "مقطع الاستوديو" },
    caption: { en: "Short vertical cut.", ar: "مقطع عمودي قصير." },
    thumb: `${P}/thumbs/reel-vertical-02.webp`,
    poster: `${P}/posters/reel-vertical-02.webp`,
    videoSrc: VIDEO.vertical2,
    duration: "0:17",
  },
  {
    id: "reel-vertical-03",
    kind: "reel",
    tab: "films",
    aspect: "reel",
    title: { en: "Long Cut", ar: "مقطع طويل" },
    caption: { en: "Extended vertical piece.", ar: "قطعة عمودية ممتدة." },
    thumb: `${P}/thumbs/reel-vertical-03.webp`,
    poster: `${P}/posters/reel-vertical-03.webp`,
    videoSrc: VIDEO.vertical3,
    duration: "1:09",
  },
  {
    id: "film-archive-01",
    kind: "film",
    tab: "films",
    aspect: "wide",
    title: { en: "Archive Film", ar: "من الأرشيف" },
    caption: { en: "Early DOMINASE motion.", ar: "حركة DOMINASE المبكرة." },
    thumb: `${P}/thumbs/film-archive-01.webp`,
    poster: `${P}/posters/film-archive-01.webp`,
    videoSrc: VIDEO.archive1,
    duration: "0:05",
  },
  {
    id: "film-archive-02",
    kind: "film",
    tab: "films",
    aspect: "wide",
    title: { en: "Archive Film II", ar: "من الأرشيف ٢" },
    caption: { en: "Early DOMINASE motion.", ar: "حركة DOMINASE المبكرة." },
    thumb: `${P}/thumbs/film-archive-02.webp`,
    poster: `${P}/posters/film-archive-02.webp`,
    videoSrc: VIDEO.archive2,
    duration: "0:11",
  },

  // ── Projects (real project films; route only where the story exists) ──
  {
    id: "project-ourclinic",
    kind: "film",
    tab: "projects",
    aspect: "landscape",
    title: { en: "Our Clinic", ar: "عيادتنا" },
    caption: { en: "Healthcare product film.", ar: "فيلم منتج رعاية صحية." },
    thumb: `${P}/thumbs/project-ourclinic.webp`,
    poster: `${P}/posters/project-ourclinic.webp`,
    videoSrc: VIDEO.ourClinic,
    duration: "0:03",
    project: "Our Clinic",
    route: "/work/our-clinic",
  },
  {
    id: "project-sultanshadi",
    kind: "film",
    tab: "projects",
    aspect: "wide",
    title: { en: "Sultan Shadi", ar: "سلطان شادي" },
    caption: { en: "Editorial identity film.", ar: "فيلم هوية تحريري." },
    thumb: `${P}/thumbs/project-sultanshadi.webp`,
    poster: `${P}/posters/project-sultanshadi.webp`,
    videoSrc: VIDEO.sultan,
    duration: "0:11",
    project: "Sultan Shadi",
    route: "/work/sultan-shadi",
  },
  {
    id: "film-sultanshadi-home",
    kind: "film",
    tab: "projects",
    aspect: "wide",
    title: { en: "Sultan Shadi Reel", ar: "ريل سلطان شادي" },
    caption: { en: "Short identity pass.", ar: "مرور سريع على الهوية." },
    thumb: `${P}/thumbs/film-sultanshadi-home.webp`,
    poster: `${P}/posters/film-sultanshadi-home.webp`,
    videoSrc: VIDEO.sultanHome,
    duration: "0:11",
    project: "Sultan Shadi",
    route: "/work/sultan-shadi",
  },
  {
    id: "project-inkspire-01",
    kind: "film",
    tab: "projects",
    aspect: "landscape",
    title: { en: "Inkspire", ar: "إنكسباير" },
    caption: { en: "Project film.", ar: "فيلم مشروع." },
    thumb: `${P}/thumbs/project-inkspire-01.webp`,
    poster: `${P}/posters/project-inkspire-01.webp`,
    videoSrc: VIDEO.inkspire1,
    duration: "0:10",
    project: "Inkspire",
  },
  {
    id: "project-inkspire-02",
    kind: "film",
    tab: "projects",
    aspect: "landscape",
    title: { en: "Inkspire II", ar: "إنكسباير ٢" },
    caption: { en: "Project film.", ar: "فيلم مشروع." },
    thumb: `${P}/thumbs/project-inkspire-02.webp`,
    poster: `${P}/posters/project-inkspire-02.webp`,
    videoSrc: VIDEO.inkspire2,
    duration: "0:07",
    project: "Inkspire",
  },

  // ── Highlight-only stories (reuse real slides; kept out of the grid) ──
  {
    id: "method",
    kind: "carousel",
    tab: "posts",
    aspect: "portrait",
    inGrid: false,
    title: { en: "Method", ar: "المنهجية" },
    caption: {
      en: "Diagnose → Design → Build → Convert.",
      ar: "نشخّص ← نصمّم ← نبني ← نحوّل.",
    },
    thumb: `${P}/slides/brand-4.webp`,
    slides: [
      {
        src: `${P}/slides/brand-4.webp`,
        alt: { en: "How DOMINASE works", ar: "كيف نعمل" },
      },
      {
        src: `${P}/slides/brand-5.webp`,
        alt: { en: "What DOMINASE builds", ar: "ماذا نبني" },
      },
    ],
  },
  {
    id: "start",
    kind: "carousel",
    tab: "posts",
    aspect: "portrait",
    inGrid: false,
    title: { en: "Book a consultation", ar: "احجز استشارة" },
    caption: {
      en: "When presence becomes a working product.",
      ar: "حين يتحول الحضور إلى منتج يعمل.",
    },
    thumb: `${P}/slides/brand-6.webp`,
    route: "/contact",
    slides: [
      {
        src: `${P}/slides/brand-6.webp`,
        alt: { en: "What happens next", ar: "ماذا يحدث بعد ذلك" },
      },
    ],
  },
];

export const studioHighlights: StudioHighlight[] = [
  {
    id: "studio",
    label: { en: "Studio", ar: "الاستوديو" },
    cover: `${P}/thumbs/post-brand.webp`,
    mediaId: "brand",
  },
  {
    id: "build",
    label: { en: "What We Build", ar: "ماذا نبني" },
    cover: `${P}/thumbs/post-convert.webp`,
    mediaId: "convert",
  },
  {
    id: "method",
    label: { en: "Method", ar: "المنهجية" },
    cover: `${P}/slides/brand-4.webp`,
    mediaId: "method",
  },
  {
    id: "work",
    label: { en: "Work", ar: "الأعمال" },
    cover: `${P}/thumbs/post-work.webp`,
    mediaId: "work",
  },
  {
    id: "films",
    label: { en: "Films", ar: "أفلام" },
    cover: `${P}/thumbs/film-studio.webp`,
    mediaId: "film-studio",
  },
  {
    id: "start",
    label: { en: "Start", ar: "ابدأ" },
    cover: `${P}/slides/brand-6.webp`,
    mediaId: "start",
  },
];

const filmCount = studioMedia.filter(
  (m) => m.kind !== "carousel" && m.inGrid !== false,
).length;

export const studioProfile = {
  name: "DOMINASE",
  category: { en: "Digital Product Studio", ar: "استوديو منتجات رقمية" },
  bio: {
    en: "We turn unclear ideas into products people love to use.",
    ar: "نحوّل الأفكار الغامضة إلى منتجات يحبّها الناس.",
  },
  domain: "dominase.art",
  avatar: `${P}/avatar.webp`,
  actions: {
    primary: { label: { en: "Book a consultation", ar: "احجز استشارة" }, href: "/contact" },
    secondary: { label: { en: "Diagnosis", ar: "التشخيص" }, href: "/diagnosis" },
    editorial: { label: { en: "View Work", ar: "الأعمال" }, href: "/work" },
  },
  // Truthful studio categories — real counts, never fabricated engagement.
  stats: [
    { label: { en: "Products", ar: "منتجات" }, value: "7" },
    { label: { en: "Stories", ar: "قصص" }, value: "3" },
    { label: { en: "Films", ar: "أفلام" }, value: String(filmCount) },
  ],
  highlights: studioHighlights,
  media: studioMedia,
} as const;

export function getStudioMedia(id: string): StudioMedia | undefined {
  return studioMedia.find((m) => m.id === id);
}

export function studioGridItems(tab: StudioTab): StudioMedia[] {
  return studioMedia.filter((m) => m.tab === tab && m.inGrid !== false);
}

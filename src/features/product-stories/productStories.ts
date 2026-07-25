export type LocalizedText = {
  en: string;
  ar: string;
};

export type StoryMediaOverlay = {
  /** A related screen composed over the primary media (e.g. mobile over desktop). */
  src: string;
  alt: LocalizedText;
  variant?: "mobile" | "detail";
};

export type StoryMedia = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  layout: "landscape" | "portrait" | "panorama" | "editorial";
  fit?: "cover" | "contain";
  overlay?: StoryMediaOverlay;
  eyebrow: LocalizedText;
  title: LocalizedText;
  caption: LocalizedText;
  alt: LocalizedText;
};

export type HomepageProject = {
  layout:
    | "pulse"
    | "clinic"
    | "editorial"
    | "venue"
    | "system"
    | "learning"
    | "care";
  proof: LocalizedText;
  primary: string;
  secondary: string;
  tertiary: string;
  video?: string;
  videoPoster?: string;
};

export type ProductStory = {
  slug: string;
  title: string;
  category: LocalizedText;
  summary: LocalizedText;
  opening: LocalizedText;
  accent: string;
  accentSoft: string;
  backdrop: string;
  cover: string;
  seo: {
    title: string;
    description: string;
  };
  homepage: HomepageProject;
  media: StoryMedia[];
};

const storyAsset = (
  slug: string,
  name: string,
  role: "wide" | "card" = "wide",
) => `/media/product-stories/${slug}/${name}-${role}.webp`;

export const productStoryOrder = [
  "pulse-gym",
  "our-clinic",
  "sultan-shadi",
  "qasr-alfarah",
  "horvath-survey",
  "manal-alhihi",
  "curevie",
] as const;

export const productStories: Record<string, ProductStory> = {
  "pulse-gym": {
    slug: "pulse-gym",
    title: "PULSE Gym",
    category: {
      en: "Member experience + gym operations",
      ar: "تجربة العضو + تشغيل النادي",
    },
    summary: {
      en: "A connected gym-management product spanning training, nutrition, coaching, access, membership, and staff operations.",
      ar: "منتج مترابط لإدارة النادي يجمع التدريب والتغذية والتواصل مع المدرب والدخول والعضويات وتشغيل الفريق.",
    },
    opening: {
      en: "One product world for the people training and the people keeping the gym moving.",
      ar: "عالم منتج واحد للأعضاء الذين يتدربون وللفريق الذي يحافظ على سير النادي.",
    },
    accent: "#69e34a",
    accentSoft: "#c8f8bb",
    backdrop: "#071006",
    cover: storyAsset("pulse-gym", "admin-overview"),
    seo: {
      title: "PULSE Gym Product Story | DOMINASE",
      description:
        "Explore the member mobile experience and connected administration system behind the PULSE Gym management product.",
    },
    homepage: {
      layout: "pulse",
      proof: {
        en: "Member mobile product / Admin operating system",
        ar: "منتج العضو على الهاتف / نظام تشغيل الإدارة",
      },
      primary: storyAsset("pulse-gym", "admin-overview", "card"),
      secondary: storyAsset("pulse-gym", "member-device", "card"),
      tertiary: storyAsset("pulse-gym", "member-progress", "card"),
    },
    media: [
      {
        id: "member-entry",
        type: "image",
        src: storyAsset("pulse-gym", "member-device"),
        layout: "portrait",
        fit: "contain",
        eyebrow: { en: "Member entrance", ar: "مدخل العضو" },
        title: {
          en: "The member journey begins in a focused mobile product.",
          ar: "تبدأ رحلة العضو داخل منتج محمول واضح ومركّز.",
        },
        caption: {
          en: "Training, membership, and daily activity stay within one recognizable member environment.",
          ar: "يبقى التدريب والعضوية والنشاط اليومي داخل بيئة واحدة مألوفة للعضو.",
        },
        alt: {
          en: "PULSE Gym member mobile application",
          ar: "تطبيق العضو في PULSE Gym",
        },
      },
      {
        id: "training",
        type: "image",
        src: storyAsset("pulse-gym", "member-training"),
        layout: "portrait",
        fit: "contain",
        eyebrow: { en: "Training flow", ar: "مسار التدريب" },
        title: {
          en: "Workouts are presented as a usable daily path.",
          ar: "تظهر التمارين كمسار يومي قابل للاستخدام.",
        },
        caption: {
          en: "The interface keeps the next training action close instead of burying it inside a generic landing page.",
          ar: "تُبقي الواجهة خطوة التدريب التالية قريبة بدل دفنها داخل صفحة عامة.",
        },
        alt: {
          en: "PULSE Gym workout experience",
          ar: "تجربة التمارين في PULSE Gym",
        },
      },
      {
        id: "member-access",
        type: "image",
        src: storyAsset("pulse-gym", "member-access"),
        layout: "portrait",
        fit: "contain",
        eyebrow: { en: "Connected access", ar: "دخول مترابط" },
        title: {
          en: "The digital membership reaches the physical gym.",
          ar: "تمتد العضوية الرقمية إلى تجربة الدخول للنادي.",
        },
        caption: {
          en: "Member access and identity remain part of the same product journey.",
          ar: "يبقى دخول العضو وهويته جزءاً من رحلة المنتج نفسها.",
        },
        alt: {
          en: "PULSE Gym member access screen",
          ar: "شاشة دخول العضو في PULSE Gym",
        },
      },
      {
        id: "operations",
        type: "image",
        src: storyAsset("pulse-gym", "admin-overview"),
        layout: "landscape",
        fit: "contain",
        overlay: {
          src: storyAsset("pulse-gym", "member-device", "card"),
          alt: {
            en: "PULSE Gym member mobile app",
            ar: "تطبيق العضو في PULSE Gym",
          },
          variant: "mobile",
        },
        eyebrow: { en: "Operations", ar: "التشغيل" },
        title: {
          en: "The member experience connects to an operating system.",
          ar: "تتصل تجربة العضو بنظام تشغيل إداري.",
        },
        caption: {
          en: "One admin surface for members, plans, and staff attention.",
          ar: "لوحة إدارة واحدة للأعضاء والخطط واهتمام الفريق.",
        },
        alt: {
          en: "PULSE Gym administration dashboard",
          ar: "لوحة إدارة PULSE Gym",
        },
      },
      {
        id: "member-management",
        type: "image",
        src: storyAsset("pulse-gym", "member-management"),
        layout: "panorama",
        fit: "contain",
        eyebrow: { en: "Staff workflow", ar: "مسار الفريق" },
        title: {
          en: "Membership details stay visible and actionable.",
          ar: "تبقى تفاصيل العضوية مرئية وقابلة للإجراء.",
        },
        caption: {
          en: "Staff can move from overview to member-level work without leaving the operational product.",
          ar: "يمكن للفريق الانتقال من النظرة العامة إلى عمل العضو دون مغادرة المنتج التشغيلي.",
        },
        alt: {
          en: "PULSE Gym member management interface",
          ar: "واجهة إدارة أعضاء PULSE Gym",
        },
      },
      {
        id: "calendar",
        type: "image",
        src: storyAsset("pulse-gym", "operations-calendar"),
        layout: "landscape",
        fit: "contain",
        eyebrow: { en: "Daily coordination", ar: "التنسيق اليومي" },
        title: {
          en: "The operating day becomes easier to read.",
          ar: "يصبح يوم التشغيل أسهل في القراءة.",
        },
        caption: {
          en: "Scheduling and planned activity are given a structured place within the same management ecosystem.",
          ar: "تحصل الجداول والأنشطة المخططة على مكان منظم داخل منظومة الإدارة نفسها.",
        },
        alt: {
          en: "PULSE Gym operating calendar",
          ar: "تقويم تشغيل PULSE Gym",
        },
      },
    ],
  },
  "our-clinic": {
    slug: "our-clinic",
    title: "Our Clinic",
    category: {
      en: "Public care journey + clinical operations",
      ar: "رحلة الرعاية العامة + التشغيل السريري",
    },
    summary: {
      en: "A healthcare ecosystem connecting public guidance, booking, patient tools, clinical follow-up, reports, and daily administration.",
      ar: "منظومة رعاية صحية تربط الإرشاد العام والحجز وأدوات المريض والمتابعة السريرية والتقارير والإدارة اليومية.",
    },
    opening: {
      en: "A public healthcare experience and the operational system behind every visit.",
      ar: "تجربة رعاية صحية عامة ونظام التشغيل الذي يقف خلف كل زيارة.",
    },
    accent: "#83afff",
    accentSoft: "#d7e4ff",
    backdrop: "#08101e",
    cover: storyAsset("our-clinic", "public-home"),
    seo: {
      title: "Our Clinic Healthcare Ecosystem Story | DOMINASE",
      description:
        "Explore the public care journey, booking, patient tools, clinical follow-up, reports, and administration inside Our Clinic.",
    },
    homepage: {
      layout: "clinic",
      proof: {
        en: "Public experience / Booking / Patient journey / Operations",
        ar: "تجربة عامة / حجز / رحلة المريض / تشغيل",
      },
      primary: storyAsset("our-clinic", "public-home", "card"),
      secondary: storyAsset("our-clinic", "admin-overview", "card"),
      tertiary: storyAsset("our-clinic", "patient-mobile", "card"),
      video: "/new-video/our-clinic-project.mp4",
      videoPoster:
        "/media/product-stories/our-clinic/trailer-poster.webp",
    },
    media: [
      {
        id: "public-care",
        type: "image",
        src: storyAsset("our-clinic", "public-home"),
        layout: "panorama",
        fit: "contain",
        overlay: {
          src: storyAsset("our-clinic", "patient-mobile", "card"),
          alt: {
            en: "Our Clinic patient mobile app",
            ar: "تطبيق المريض في Our Clinic",
          },
          variant: "mobile",
        },
        eyebrow: { en: "Public care", ar: "الرعاية العامة" },
        title: {
          en: "The clinic begins by making care easier to approach.",
          ar: "تبدأ العيادة بجعل الوصول إلى الرعاية أكثر وضوحاً.",
        },
        caption: {
          en: "Reassurance, service discovery, and a direct path to booking.",
          ar: "طمأنينة واكتشاف للخدمات ومسار مباشر نحو الحجز.",
        },
        alt: {
          en: "Our Clinic public homepage",
          ar: "الصفحة العامة لمنصة Our Clinic",
        },
      },
      {
        id: "services",
        type: "image",
        src: storyAsset("our-clinic", "care-services"),
        layout: "landscape",
        fit: "contain",
        eyebrow: { en: "Care discovery", ar: "اكتشاف الرعاية" },
        title: {
          en: "Services are explained before the patient has to decide.",
          ar: "تُشرح الخدمات قبل أن يضطر المريض إلى اتخاذ القرار.",
        },
        caption: {
          en: "Educational structure supports a calmer, better prepared care journey.",
          ar: "تدعم البنية التوضيحية رحلة رعاية أهدأ وأكثر استعداداً.",
        },
        alt: {
          en: "Our Clinic healthcare services",
          ar: "خدمات الرعاية في Our Clinic",
        },
      },
      {
        id: "booking",
        type: "image",
        src: storyAsset("our-clinic", "booking-journey"),
        layout: "landscape",
        fit: "contain",
        eyebrow: { en: "Booking journey", ar: "رحلة الحجز" },
        title: {
          en: "Booking becomes a guided clinical handoff.",
          ar: "يتحول الحجز إلى تسليم سريري موجّه.",
        },
        caption: {
          en: "The booking sequence gathers the information needed to prepare the visit without overwhelming the patient.",
          ar: "يجمع مسار الحجز المعلومات اللازمة للاستعداد للزيارة دون إرباك المريض.",
        },
        alt: {
          en: "Our Clinic booking journey",
          ar: "رحلة الحجز في Our Clinic",
        },
      },
      {
        id: "patient-tools",
        type: "image",
        src: storyAsset("our-clinic", "patient-tools"),
        layout: "editorial",
        fit: "contain",
        eyebrow: { en: "Patient tools", ar: "أدوات المريض" },
        title: {
          en: "The product remains useful between visits.",
          ar: "يبقى المنتج مفيداً بين الزيارات.",
        },
        caption: {
          en: "Self-knowledge and preparation tools extend the care experience beyond appointment booking.",
          ar: "توسّع أدوات المعرفة الذاتية والاستعداد تجربة الرعاية إلى ما بعد الحجز.",
        },
        alt: {
          en: "Our Clinic patient-facing health tools",
          ar: "أدوات المريض الصحية في Our Clinic",
        },
      },
      {
        id: "guide",
        type: "image",
        src: storyAsset("our-clinic", "guide-bot"),
        layout: "portrait",
        fit: "contain",
        eyebrow: { en: "Guidance", ar: "الإرشاد" },
        title: {
          en: "A guide stays close when the next step is unclear.",
          ar: "يبقى الدليل قريباً عندما تكون الخطوة التالية غير واضحة.",
        },
        caption: {
          en: "The guidance interface helps patients locate useful information inside the wider healthcare ecosystem.",
          ar: "تساعد واجهة الإرشاد المرضى على الوصول للمعلومة المفيدة داخل منظومة الرعاية.",
        },
        alt: {
          en: "Our Clinic guidance assistant",
          ar: "مساعد الإرشاد في Our Clinic",
        },
      },
      {
        id: "clinic-film",
        type: "video",
        src: "/new-video/our-clinic-project.mp4",
        poster:
          "/media/product-stories/our-clinic/trailer-poster.webp",
        layout: "panorama",
        eyebrow: { en: "Product film", ar: "فيلم المنتج" },
        title: {
          en: "The public experience in motion.",
          ar: "التجربة العامة أثناء الحركة.",
        },
        caption: {
          en: "A focused walkthrough shows how care, language, information, and booking remain connected.",
          ar: "توضح الجولة كيف تبقى الرعاية واللغة والمعلومة والحجز مترابطة.",
        },
        alt: { en: "Our Clinic product film", ar: "فيلم منتج Our Clinic" },
      },
      {
        id: "operations",
        type: "image",
        src: storyAsset("our-clinic", "admin-overview"),
        layout: "landscape",
        fit: "contain",
        overlay: {
          src: storyAsset("our-clinic", "reports", "card"),
          alt: {
            en: "Our Clinic reporting detail",
            ar: "تفصيل تقارير Our Clinic",
          },
          variant: "detail",
        },
        eyebrow: { en: "Clinic operations", ar: "تشغيل العيادة" },
        title: {
          en: "Behind the public journey is a daily operating view.",
          ar: "خلف الرحلة العامة توجد رؤية تشغيلية يومية.",
        },
        caption: {
          en: "Appointments, patients, and reporting for the clinical team.",
          ar: "المواعيد والمرضى والتقارير للفريق السريري.",
        },
        alt: {
          en: "Our Clinic administration dashboard",
          ar: "لوحة إدارة Our Clinic",
        },
      },
      {
        id: "follow-up",
        type: "image",
        src: storyAsset("our-clinic", "clinical-follow-up"),
        layout: "landscape",
        fit: "contain",
        eyebrow: { en: "Follow-up", ar: "المتابعة" },
        title: {
          en: "The visit continues as a visible follow-up workflow.",
          ar: "تستمر الزيارة ضمن مسار متابعة مرئي.",
        },
        caption: {
          en: "Clinical follow-up becomes part of the operating record rather than a disconnected task.",
          ar: "تصبح المتابعة السريرية جزءاً من سجل التشغيل بدل أن تبقى مهمة منفصلة.",
        },
        alt: {
          en: "Our Clinic follow-up workflow",
          ar: "مسار المتابعة في Our Clinic",
        },
      },
      {
        id: "reports",
        type: "image",
        src: storyAsset("our-clinic", "reports"),
        layout: "panorama",
        fit: "contain",
        eyebrow: { en: "Reports and documents", ar: "التقارير والوثائق" },
        title: {
          en: "Clinical information resolves into usable records.",
          ar: "تتحول المعلومات السريرية إلى سجلات قابلة للاستخدام.",
        },
        caption: {
          en: "Reports and visit documents are supported as part of the complete patient and clinic workflow.",
          ar: "تُدعم التقارير ووثائق الزيارة كجزء من مسار المريض والعيادة المتكامل.",
        },
        alt: {
          en: "Our Clinic reports interface",
          ar: "واجهة التقارير في Our Clinic",
        },
      },
    ],
  },
  "sultan-shadi": {
    slug: "sultan-shadi",
    title: "Sultan Shadi",
    category: {
      en: "Professional identity + editorial portfolio",
      ar: "هوية مهنية + معرض أعمال تحريري",
    },
    summary: {
      en: "A premium personal identity shaped around marketing leadership, selected work, capability, and an editorial rhythm.",
      ar: "هوية شخصية مهنية تعرض القيادة التسويقية والأعمال والخبرات بإيقاع تحريري مستقل ومقصود.",
    },
    opening: {
      en: "A personal portfolio built to read like a point of view, not a résumé template.",
      ar: "ملف شخصي صُمم ليُقرأ كوجهة نظر، لا كقالب سيرة ذاتية.",
    },
    accent: "#e6c597",
    accentSoft: "#f4e1c5",
    backdrop: "#071020",
    cover: storyAsset("sultan-shadi", "identity-home"),
    seo: {
      title: "Sultan Shadi Editorial Portfolio Story | DOMINASE",
      description:
        "Explore the premium personal identity, selected work, capability narrative, and responsive portfolio created for Sultan Shadi.",
    },
    homepage: {
      layout: "editorial",
      proof: {
        en: "Personal brand / Case work / Professional presence",
        ar: "علامة شخصية / أعمال مختارة / حضور مهني",
      },
      primary: storyAsset("sultan-shadi", "identity-home", "card"),
      secondary: storyAsset("sultan-shadi", "capabilities", "card"),
      tertiary: storyAsset("sultan-shadi", "mobile-profile", "card"),
      video: "/new-video/sultanshadi-project-home.mp4",
      videoPoster:
        "/media/product-stories/sultan-shadi/trailer-poster.webp",
    },
    media: [
      {
        id: "identity",
        type: "image",
        src: storyAsset("sultan-shadi", "identity-home"),
        layout: "panorama",
        fit: "contain",
        overlay: {
          src: storyAsset("sultan-shadi", "mobile-profile", "card"),
          alt: {
            en: "Sultan Shadi identity on mobile",
            ar: "هوية سلطان شادي على الهاتف",
          },
          variant: "mobile",
        },
        eyebrow: { en: "Identity entrance", ar: "مدخل الهوية" },
        title: {
          en: "The opening behaves like a confident editorial cover.",
          ar: "تتصرف البداية كغلاف تحريري واثق.",
        },
        caption: {
          en: "Name, role, image, and invitation are given enough space to establish a clear personal presence.",
          ar: "يحصل الاسم والدور والصورة والدعوة على المساحة اللازمة لبناء حضور شخصي واضح.",
        },
        alt: {
          en: "Sultan Shadi portfolio homepage",
          ar: "الصفحة الرئيسية لملف سلطان شادي",
        },
      },
      {
        id: "work",
        type: "image",
        src: storyAsset("sultan-shadi", "selected-work"),
        layout: "editorial",
        fit: "contain",
        eyebrow: { en: "Selected work", ar: "أعمال مختارة" },
        title: {
          en: "Case work is treated as authored evidence.",
          ar: "تُعامل الأعمال كدليل مؤلف بعناية.",
        },
        caption: {
          en: "The portfolio rhythm lets projects carry personality without turning them into a dashboard grid.",
          ar: "يسمح إيقاع المعرض للمشاريع بحمل الشخصية دون تحويلها إلى شبكة لوحات.",
        },
        alt: {
          en: "Sultan Shadi selected work",
          ar: "الأعمال المختارة لسلطان شادي",
        },
      },
      {
        id: "capability",
        type: "image",
        src: storyAsset("sultan-shadi", "capabilities"),
        layout: "panorama",
        fit: "contain",
        overlay: {
          src: storyAsset("sultan-shadi", "editorial-profile", "card"),
          alt: {
            en: "Sultan Shadi editorial profile detail",
            ar: "تفصيل الملف التحريري لسلطان شادي",
          },
          variant: "detail",
        },
        eyebrow: { en: "Capability narrative", ar: "سرد الخبرات" },
        title: {
          en: "Capabilities become an operating point of view.",
          ar: "تتحول الخبرات إلى وجهة نظر تشغيلية.",
        },
        caption: {
          en: "Strategy, content, media, and execution are described as one connected system.",
          ar: "تُعرض الاستراتيجية والمحتوى والإعلام والتنفيذ كنظام واحد مترابط.",
        },
        alt: {
          en: "Sultan Shadi capabilities section",
          ar: "قسم خبرات سلطان شادي",
        },
      },
      {
        id: "profile",
        type: "image",
        src: storyAsset("sultan-shadi", "editorial-profile"),
        layout: "editorial",
        fit: "contain",
        eyebrow: { en: "Professional profile", ar: "الملف المهني" },
        title: {
          en: "The personality remains visible through the detail.",
          ar: "تبقى الشخصية حاضرة داخل التفاصيل.",
        },
        caption: {
          en: "Longer-form professional information keeps the same editorial confidence as the opening.",
          ar: "تحافظ المعلومات المهنية الأطول على الثقة التحريرية نفسها في البداية.",
        },
        alt: {
          en: "Sultan Shadi professional profile",
          ar: "الملف المهني لسلطان شادي",
        },
      },
      {
        id: "mobile",
        type: "image",
        src: storyAsset("sultan-shadi", "mobile-profile"),
        layout: "portrait",
        fit: "contain",
        eyebrow: { en: "Responsive identity", ar: "هوية متجاوبة" },
        title: {
          en: "The editorial identity survives the smaller canvas.",
          ar: "تحافظ الهوية التحريرية على حضورها في الشاشة الأصغر.",
        },
        caption: {
          en: "Mobile becomes a focused reading sequence rather than a compressed desktop page.",
          ar: "يتحول الهاتف إلى تسلسل قراءة مركز بدل نسخة مضغوطة من سطح المكتب.",
        },
        alt: {
          en: "Sultan Shadi mobile portfolio",
          ar: "ملف سلطان شادي على الهاتف",
        },
      },
      {
        id: "film",
        type: "video",
        src: "/new-video/sultanshadi-project-home.mp4",
        poster:
          "/media/product-stories/sultan-shadi/trailer-poster.webp",
        layout: "panorama",
        eyebrow: { en: "Portfolio film", ar: "فيلم المعرض" },
        title: {
          en: "The identity is best understood in motion.",
          ar: "تُفهم الهوية بصورة أفضل أثناء الحركة.",
        },
        caption: {
          en: "The film preserves the relationship between scale, typography, imagery, and editorial pacing.",
          ar: "يحافظ الفيلم على العلاقة بين الحجم والطباعة والصورة والإيقاع التحريري.",
        },
        alt: {
          en: "Sultan Shadi portfolio film",
          ar: "فيلم ملف سلطان شادي",
        },
      },
    ],
  },
  "qasr-alfarah": {
    slug: "qasr-alfarah",
    title: "Qasr Al-Farah",
    category: {
      en: "Venue presentation + booking + guest journey",
      ar: "عرض القاعة + الحجز + رحلة الضيف",
    },
    summary: {
      en: "A bilingual venue product connecting public presentation, booking intent, invitations, RSVP, and digital memory moments.",
      ar: "منتج ثنائي اللغة يربط عرض القاعة ونية الحجز والدعوات وتأكيد الحضور والذكريات الرقمية.",
    },
    opening: {
      en: "A paper-led venue process becomes a public, operational, and guest-facing digital journey.",
      ar: "تتحول عملية القاعة المعتمدة على الورق إلى رحلة رقمية عامة وتشغيلية وموجهة للضيوف.",
    },
    accent: "#d4ad72",
    accentSoft: "#ead4b0",
    backdrop: "#160d08",
    cover: storyAsset("qasr-alfarah", "brand-entrance"),
    seo: {
      title: "Qasr Al-Farah Product Story | DOMINASE",
      description:
        "Explore the venue presentation, booking path, administration, invitations, RSVP, and digital guest memory experience.",
    },
    homepage: {
      layout: "venue",
      proof: {
        en: "Public offer / Booking / Invitation / Memory",
        ar: "العرض العام / الحجز / الدعوة / الذكريات",
      },
      primary: storyAsset("qasr-alfarah", "brand-entrance", "card"),
      secondary: storyAsset("qasr-alfarah", "operations", "card"),
      tertiary: storyAsset("qasr-alfarah", "booking", "card"),
    },
    media: [
      {
        id: "entrance",
        type: "image",
        src: storyAsset("qasr-alfarah", "brand-entrance"),
        layout: "panorama",
        fit: "contain",
        overlay: {
          src: storyAsset("qasr-alfarah", "booking", "card"),
          alt: {
            en: "Qasr Al-Farah booking on mobile",
            ar: "حجز قصر الفرح على الهاتف",
          },
          variant: "mobile",
        },
        eyebrow: { en: "Brand entrance", ar: "مدخل العلامة" },
        title: {
          en: "The venue starts with atmosphere and trust.",
          ar: "تبدأ القاعة بالأجواء والثقة.",
        },
        caption: {
          en: "The public experience establishes value before asking the visitor to move toward booking.",
          ar: "تبني التجربة العامة القيمة قبل أن تطلب من الزائر التوجه للحجز.",
        },
        alt: {
          en: "Qasr Al-Farah venue presentation",
          ar: "عرض قصر الفرح",
        },
      },
      {
        id: "booking",
        type: "image",
        src: storyAsset("qasr-alfarah", "booking"),
        layout: "portrait",
        fit: "contain",
        eyebrow: { en: "Booking intent", ar: "نية الحجز" },
        title: {
          en: "Interest moves into a clearer booking path.",
          ar: "ينتقل الاهتمام إلى مسار حجز أوضح.",
        },
        caption: {
          en: "The responsive booking view makes the next action understandable without repeated phone coordination.",
          ar: "تجعل واجهة الحجز المتجاوبة الخطوة التالية مفهومة دون تنسيق هاتفي متكرر.",
        },
        alt: {
          en: "Qasr Al-Farah booking interface",
          ar: "واجهة حجز قصر الفرح",
        },
      },
      {
        id: "operations",
        type: "image",
        src: storyAsset("qasr-alfarah", "operations"),
        layout: "landscape",
        fit: "contain",
        overlay: {
          src: storyAsset("qasr-alfarah", "guest-memory", "card"),
          alt: {
            en: "Qasr Al-Farah guest memory detail",
            ar: "تفصيل ذكرى الضيف في قصر الفرح",
          },
          variant: "detail",
        },
        eyebrow: { en: "Venue operations", ar: "تشغيل القاعة" },
        title: {
          en: "Control sits behind the public experience.",
          ar: "يقف التحكم خلف التجربة العامة.",
        },
        caption: {
          en: "Administration organizes event data, requests, and operational detail inside one structured place.",
          ar: "تنظم الإدارة بيانات المناسبات والطلبات والتفاصيل التشغيلية داخل مكان واحد.",
        },
        alt: {
          en: "Qasr Al-Farah administration system",
          ar: "نظام إدارة قصر الفرح",
        },
      },
      {
        id: "guest-memory",
        type: "image",
        src: storyAsset("qasr-alfarah", "guest-memory"),
        layout: "panorama",
        fit: "contain",
        eyebrow: { en: "Guest layer", ar: "طبقة الضيوف" },
        title: {
          en: "The journey continues through invitation and memory.",
          ar: "تستمر الرحلة عبر الدعوة والذكريات.",
        },
        caption: {
          en: "Digital invitations, RSVP, and photo participation connect guests around the event.",
          ar: "تربط الدعوات الرقمية وتأكيد الحضور ومشاركة الصور الضيوف حول المناسبة.",
        },
        alt: {
          en: "Qasr Al-Farah guest memory experience",
          ar: "تجربة ذكريات ضيوف قصر الفرح",
        },
      },
    ],
  },
  "horvath-survey": {
    slug: "horvath-survey",
    title: "HORVÁTH Survey",
    category: {
      en: "Survey + business assessment system",
      ar: "استبيان + نظام تقييم للأعمال",
    },
    summary: {
      en: "A structured assessment product that turns focused inputs into a clearer view of organizational readiness.",
      ar: "منتج تقييم منظم يحول المدخلات المركزة إلى قراءة أوضح لجاهزية المؤسسة.",
    },
    opening: {
      en: "A focused assessment experience that gives every question and result a clear place.",
      ar: "تجربة تقييم مركزة تمنح كل سؤال ونتيجة مكاناً واضحاً.",
    },
    accent: "#55aee9",
    accentSoft: "#cce9fb",
    backdrop: "#07131b",
    cover: storyAsset("horvath-survey", "assessment-world"),
    seo: {
      title: "HORVÁTH Survey Product Story | DOMINASE",
      description:
        "Explore the structured survey flow and organizational readiness result experience created for HORVÁTH.",
    },
    homepage: {
      layout: "system",
      proof: {
        en: "Assessment flow / Structured inputs / Results",
        ar: "مسار تقييم / مدخلات منظمة / نتائج",
      },
      primary: storyAsset("horvath-survey", "assessment-world", "card"),
      secondary: storyAsset("horvath-survey", "survey-flow", "card"),
      tertiary: storyAsset("horvath-survey", "results", "card"),
    },
    media: [
      {
        id: "world",
        type: "image",
        src: storyAsset("horvath-survey", "assessment-world"),
        layout: "editorial",
        fit: "contain",
        eyebrow: { en: "Assessment world", ar: "عالم التقييم" },
        title: {
          en: "The product frames readiness as a structured journey.",
          ar: "يقدّم المنتج الجاهزية كرحلة منظمة.",
        },
        caption: {
          en: "The complete composition establishes assessment, progress, and result as parts of one system.",
          ar: "تجمع التكوين الكامل التقييم والتقدم والنتيجة كأجزاء من نظام واحد.",
        },
        alt: {
          en: "HORVÁTH assessment product composition",
          ar: "تكوين منتج تقييم HORVÁTH",
        },
      },
      {
        id: "survey",
        type: "image",
        src: storyAsset("horvath-survey", "survey-flow"),
        layout: "panorama",
        fit: "contain",
        overlay: {
          src: storyAsset("horvath-survey", "results", "card"),
          alt: {
            en: "HORVÁTH assessment results detail",
            ar: "تفصيل نتائج تقييم HORVÁTH",
          },
          variant: "detail",
        },
        eyebrow: { en: "Focused input", ar: "إدخال مركّز" },
        title: {
          en: "Questions remain readable and practical.",
          ar: "تبقى الأسئلة واضحة وعملية.",
        },
        caption: {
          en: "A clean survey structure helps participants complete the process with less hesitation.",
          ar: "تساعد بنية الاستبيان النظيفة المشاركين على إكمال العملية بتردد أقل.",
        },
        alt: {
          en: "HORVÁTH survey interface",
          ar: "واجهة استبيان HORVÁTH",
        },
      },
      {
        id: "results",
        type: "image",
        src: storyAsset("horvath-survey", "results"),
        layout: "panorama",
        fit: "contain",
        eyebrow: { en: "Readiness result", ar: "نتيجة الجاهزية" },
        title: {
          en: "Focused inputs resolve into a clearer organizational view.",
          ar: "تتحول المدخلات المركزة إلى رؤية تنظيمية أوضح.",
        },
        caption: {
          en: "The result gives the completed assessment a visible and useful conclusion.",
          ar: "تمنح النتيجة التقييم المكتمل خاتمة مرئية ومفيدة.",
        },
        alt: {
          en: "HORVÁTH assessment results",
          ar: "نتائج تقييم HORVÁTH",
        },
      },
    ],
  },
  "manal-alhihi": {
    slug: "manal-alhihi",
    title: "Manal Alhihi",
    category: {
      en: "Training platform + learning operations",
      ar: "منصة تدريب + تشغيل تجربة التعلم",
    },
    summary: {
      en: "A bilingual training platform organizing courses, student access, attendance, trailers, and learning content in one place.",
      ar: "منصة تدريب ثنائية اللغة تنظم الدورات ودخول الطلاب والحضور والمقاطع التعريفية والمحتوى التعليمي في مكان واحد.",
    },
    opening: {
      en: "Scattered courses, files, and manual follow-up become one ordered learning environment.",
      ar: "تتحول الدورات والملفات والمتابعة اليدوية المبعثرة إلى بيئة تعلم واحدة منظمة.",
    },
    accent: "#8b72ff",
    accentSoft: "#dcd5ff",
    backdrop: "#110b20",
    cover: storyAsset("manal-alhihi", "learning-world"),
    seo: {
      title: "Manal Alhihi Training Platform Story | DOMINASE",
      description:
        "Explore the bilingual learning paths, course structure, student experience, and administration of the Manal Alhihi platform.",
    },
    homepage: {
      layout: "learning",
      proof: {
        en: "Courses / Students / Attendance / Content",
        ar: "دورات / طلاب / حضور / محتوى",
      },
      primary: storyAsset("manal-alhihi", "learning-world", "card"),
      secondary: storyAsset("manal-alhihi", "course-structure", "card"),
      tertiary: storyAsset("manal-alhihi", "mobile-learning", "card"),
    },
    media: [
      {
        id: "world",
        type: "image",
        src: storyAsset("manal-alhihi", "learning-world"),
        layout: "editorial",
        fit: "contain",
        eyebrow: { en: "Learning world", ar: "عالم التعلم" },
        title: {
          en: "The complete platform is visible as one connected system.",
          ar: "تظهر المنصة الكاملة كنظام واحد مترابط.",
        },
        caption: {
          en: "Student access, courses, content, and administration share one visual and operational language.",
          ar: "يشترك دخول الطلاب والدورات والمحتوى والإدارة في لغة بصرية وتشغيلية واحدة.",
        },
        alt: {
          en: "Manal Alhihi learning platform composition",
          ar: "تكوين منصة منال الحيحي التعليمية",
        },
      },
      {
        id: "entrance",
        type: "image",
        src: storyAsset("manal-alhihi", "platform-entrance"),
        layout: "panorama",
        fit: "contain",
        overlay: {
          src: storyAsset("manal-alhihi", "mobile-learning", "card"),
          alt: {
            en: "Manal Alhihi learning on mobile",
            ar: "التعلّم مع منال الحيحي على الهاتف",
          },
          variant: "mobile",
        },
        eyebrow: { en: "Platform entrance", ar: "مدخل المنصة" },
        title: {
          en: "Students enter through a clear bilingual experience.",
          ar: "يدخل الطلاب عبر تجربة ثنائية اللغة وواضحة.",
        },
        caption: {
          en: "The opening organizes orientation and the next learning action before presenting content depth.",
          ar: "تنظم البداية التوجيه وخطوة التعلم التالية قبل عرض عمق المحتوى.",
        },
        alt: {
          en: "Manal Alhihi training platform entrance",
          ar: "مدخل منصة منال الحيحي التدريبية",
        },
      },
      {
        id: "courses",
        type: "image",
        src: storyAsset("manal-alhihi", "course-structure"),
        layout: "landscape",
        fit: "contain",
        overlay: {
          src: storyAsset("manal-alhihi", "student-experience", "card"),
          alt: {
            en: "Manal Alhihi student experience detail",
            ar: "تفصيل تجربة الطالب مع منال الحيحي",
          },
          variant: "detail",
        },
        eyebrow: { en: "Course structure", ar: "هيكل الدورات" },
        title: {
          en: "Learning content follows a deliberate order.",
          ar: "يتبع المحتوى التعليمي ترتيباً مقصوداً.",
        },
        caption: {
          en: "Course discovery and content detail reduce the need for scattered links and message-based direction.",
          ar: "يقلل اكتشاف الدورات وتفاصيل المحتوى الحاجة للروابط المتفرقة والتوجيه عبر الرسائل.",
        },
        alt: {
          en: "Manal Alhihi course structure",
          ar: "هيكل دورات منال الحيحي",
        },
      },
      {
        id: "student",
        type: "image",
        src: storyAsset("manal-alhihi", "student-experience"),
        layout: "panorama",
        fit: "contain",
        eyebrow: { en: "Student experience", ar: "تجربة الطالب" },
        title: {
          en: "The interface keeps attention on learning.",
          ar: "تبقي الواجهة الانتباه على التعلم.",
        },
        caption: {
          en: "Navigation and content hierarchy make the platform easier to follow and administer.",
          ar: "تجعل بنية التنقل والمحتوى المنصة أسهل في المتابعة والإدارة.",
        },
        alt: {
          en: "Manal Alhihi student interface",
          ar: "واجهة الطالب في منصة منال الحيحي",
        },
      },
      {
        id: "mobile",
        type: "image",
        src: storyAsset("manal-alhihi", "mobile-learning"),
        layout: "portrait",
        fit: "contain",
        eyebrow: { en: "Mobile learning", ar: "التعلم على الهاتف" },
        title: {
          en: "The learning path remains available on the smaller screen.",
          ar: "يبقى مسار التعلم متاحاً على الشاشة الأصغر.",
        },
        caption: {
          en: "Responsive presentation keeps course identity and essential actions readable.",
          ar: "يحافظ العرض المتجاوب على هوية الدورة والإجراءات الأساسية واضحة.",
        },
        alt: {
          en: "Manal Alhihi mobile learning experience",
          ar: "تجربة التعلم على الهاتف لمنال الحيحي",
        },
      },
    ],
  },
  curevie: {
    slug: "curevie",
    title: "Curevie",
    category: {
      en: "Healthcare digital experience",
      ar: "تجربة رقمية للرعاية الصحية",
    },
    summary: {
      en: "A healthcare product world built around calm service discovery, care requests, patient confidence, and operational depth.",
      ar: "عالم منتج صحي مبني حول اكتشاف الخدمات بهدوء وطلبات الرعاية وثقة المريض والعمق التشغيلي.",
    },
    opening: {
      en: "A healthcare experience where calm hierarchy and professional credibility support every care decision.",
      ar: "تجربة صحية يدعم فيها الهدوء والمصداقية المهنية كل قرار متعلق بالرعاية.",
    },
    accent: "#50c4a0",
    accentSoft: "#c5efe2",
    backdrop: "#061510",
    cover: storyAsset("curevie", "care-world"),
    seo: {
      title: "Curevie Healthcare Product Story | DOMINASE",
      description:
        "Explore Curevie's healthcare service discovery, care detail, patient journey, responsive interface, and connected product world.",
    },
    homepage: {
      layout: "care",
      proof: {
        en: "Care paths / Service detail / Patient experience",
        ar: "مسارات رعاية / تفاصيل الخدمات / تجربة المريض",
      },
      primary: storyAsset("curevie", "care-world", "card"),
      secondary: storyAsset("curevie", "medical-trust", "card"),
      tertiary: storyAsset("curevie", "mobile-care", "card"),
    },
    media: [
      {
        id: "world",
        type: "image",
        src: storyAsset("curevie", "care-world"),
        layout: "editorial",
        fit: "contain",
        eyebrow: { en: "Care world", ar: "عالم الرعاية" },
        title: {
          en: "The healthcare product reads as one calm system.",
          ar: "يظهر المنتج الصحي كنظام واحد هادئ.",
        },
        caption: {
          en: "Public presence, service detail, and responsive care paths share a consistent tone.",
          ar: "يشترك الحضور العام وتفاصيل الخدمة ومسارات الرعاية المتجاوبة في نبرة متسقة.",
        },
        alt: {
          en: "Curevie healthcare product composition",
          ar: "تكوين منتج Curevie الصحي",
        },
      },
      {
        id: "trust",
        type: "image",
        src: storyAsset("curevie", "medical-trust"),
        layout: "panorama",
        fit: "contain",
        overlay: {
          src: storyAsset("curevie", "service-detail", "card"),
          alt: {
            en: "Curevie service detail",
            ar: "تفصيل خدمة Curevie",
          },
          variant: "detail",
        },
        eyebrow: { en: "Medical trust", ar: "الثقة الطبية" },
        title: {
          en: "The public entrance is clean without feeling cold.",
          ar: "المدخل العام واضح دون أن يبدو بارداً.",
        },
        caption: {
          en: "Calm hierarchy and a human visual tone establish confidence before the care request.",
          ar: "يبني التسلسل الهادئ والنبرة الإنسانية الثقة قبل طلب الرعاية.",
        },
        alt: {
          en: "Curevie public healthcare experience",
          ar: "تجربة Curevie الصحية العامة",
        },
      },
      {
        id: "discovery",
        type: "image",
        src: storyAsset("curevie", "service-discovery"),
        layout: "landscape",
        fit: "contain",
        overlay: {
          src: storyAsset("curevie", "mobile-care", "card"),
          alt: {
            en: "Curevie care on mobile",
            ar: "رعاية Curevie على الهاتف",
          },
          variant: "mobile",
        },
        eyebrow: { en: "Service discovery", ar: "اكتشاف الخدمات" },
        title: {
          en: "Care options are organized for easier understanding.",
          ar: "تُنظم خيارات الرعاية لتصبح أسهل في الفهم.",
        },
        caption: {
          en: "Users can move from the wider healthcare offer toward the service that matches their need.",
          ar: "يمكن للمستخدم الانتقال من عرض الرعاية الأوسع إلى الخدمة التي تناسب حاجته.",
        },
        alt: {
          en: "Curevie service discovery",
          ar: "اكتشاف خدمات Curevie",
        },
      },
      {
        id: "detail",
        type: "image",
        src: storyAsset("curevie", "service-detail"),
        layout: "landscape",
        fit: "contain",
        eyebrow: { en: "Service detail", ar: "تفاصيل الخدمة" },
        title: {
          en: "Depth remains readable behind the clean surface.",
          ar: "يبقى العمق واضحاً خلف السطح النظيف.",
        },
        caption: {
          en: "Individual services carry the same clarity deeper into the patient decision.",
          ar: "تحمل الخدمات الفردية الوضوح نفسه إلى عمق قرار المريض.",
        },
        alt: {
          en: "Curevie service details",
          ar: "تفاصيل خدمات Curevie",
        },
      },
      {
        id: "patient",
        type: "image",
        src: storyAsset("curevie", "patient-journey"),
        layout: "portrait",
        fit: "contain",
        eyebrow: { en: "Patient journey", ar: "رحلة المريض" },
        title: {
          en: "The care path stays understandable at every step.",
          ar: "يبقى مسار الرعاية مفهوماً في كل خطوة.",
        },
        caption: {
          en: "Responsive steps and calm cues guide the patient without adding visual pressure.",
          ar: "ترشد الخطوات المتجاوبة والإشارات الهادئة المريض دون ضغط بصري.",
        },
        alt: {
          en: "Curevie patient journey",
          ar: "رحلة المريض في Curevie",
        },
      },
      {
        id: "mobile",
        type: "image",
        src: storyAsset("curevie", "mobile-care"),
        layout: "portrait",
        fit: "contain",
        eyebrow: { en: "Mobile care", ar: "الرعاية على الهاتف" },
        title: {
          en: "The healthcare tone remains intact on mobile.",
          ar: "تبقى نبرة الرعاية الصحية متماسكة على الهاتف.",
        },
        caption: {
          en: "Service information and the next care action remain close and legible.",
          ar: "تبقى معلومات الخدمة وخطوة الرعاية التالية قريبة وواضحة.",
        },
        alt: {
          en: "Curevie mobile healthcare experience",
          ar: "تجربة Curevie الصحية على الهاتف",
        },
      },
    ],
  },
};

export const orderedProductStories = productStoryOrder.map(
  (slug) => productStories[slug],
);

export function getNextProductStory(slug: string) {
  const index = productStoryOrder.indexOf(
    slug as (typeof productStoryOrder)[number],
  );
  const nextIndex = index < 0 ? 0 : (index + 1) % productStoryOrder.length;
  return productStories[productStoryOrder[nextIndex]];
}

export type LocalizedText = {
    en: string;
    ar: string;
};

export type ProjectCaseStudyPage = {
    image: string;
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
    layout?: "image-top" | "split";
};

export type ProjectCaseStudy = {
    slug: string;
    title: LocalizedText;
    category: LocalizedText;
    summary: LocalizedText;
    cover: string;
    pages: ProjectCaseStudyPage[];
};

export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
    "qasr-al-farah": {
        slug: "qasr-al-farah",
        title: {
            en: "Qasr Al-Farah",
            ar: "Qasr Al-Farah",
        },
        category: {
            en: "Wedding Hall Operating Platform",
            ar: "منصة تشغيل لقاعات الأفراح",
        },
        summary: {
            en: "A complete venue platform shaped as a premium public experience, booking flow, checkout, admin system, and guest memory layer.",
            ar: "منصة متكاملة للقاعات تجمع بين تجربة عامة فاخرة، مسار حجز، دفع، إدارة، وطبقة ذكريات للضيوف.",
        },
        cover: "/assest/hero-page2.png",
        pages: [
            {
                image: "/assest/hero-page2.png",
                eyebrow: {
                    en: "Brand Entrance",
                    ar: "مدخل العلامة",
                },
                title: {
                    en: "A premium first impression",
                    ar: "انطباع أول فاخر",
                },
                body: {
                    en: "A wedding-hall platform that starts with atmosphere, trust, and visual impact before moving the visitor toward action.",
                    ar: "منصة لقاعات الأفراح تبدأ بالأجواء والثقة والقيمة البصرية قبل دفع الزائر نحو الخطوة التالية.",
                },
            },
            {
                image: "/assest/booking-page.png",
                eyebrow: {
                    en: "Booking Flow",
                    ar: "مسار الحجز",
                },
                title: {
                    en: "From interest to booking intent",
                    ar: "من الاهتمام إلى نية الحجز",
                },
                body: {
                    en: "A clearer booking path that reduces hesitation and makes the next action easy to understand.",
                    ar: "تجربة حجز أوضح تقلل التردد وتجعل الخطوة التالية مفهومة وسهلة.",
                },
            },
            {
                image: "/assest/admin-dashboard-wedding-page.png",
                eyebrow: {
                    en: "Admin System",
                    ar: "لوحة الإدارة",
                },
                title: {
                    en: "Control behind the experience",
                    ar: "التحكم خلف التجربة",
                },
                body: {
                    en: "Admin screens help manage wedding data, requests, and operational details from one structured place.",
                    ar: "شاشات الإدارة تساعد على تنظيم بيانات الحفلات والطلبات والتفاصيل التشغيلية من مكان واحد.",
                },
            },
        ],
    },
    curevie: {
        slug: "curevie",
        title: {
            en: "Curevie",
            ar: "Curevie",
        },
        category: {
            en: "Healthcare Digital Experience",
            ar: "تجربة رقمية طبية",
        },
        summary: {
            en: "A health-focused digital presence built around calm hierarchy, human tone, and professional credibility.",
            ar: "حضور رقمي صحي مبني حول الهدوء والوضوح والنبرة الإنسانية والمصداقية المهنية.",
        },
        cover: "/assest/curevie3.jpeg",
        pages: [
            {
                image: "/assest/curevie3.jpeg",
                eyebrow: {
                    en: "Medical Trust",
                    ar: "ثقة طبية",
                },
                title: {
                    en: "Clean healthcare presence",
                    ar: "حضور صحي نظيف",
                },
                body: {
                    en: "A calm healthcare interface shaped around clarity, confidence, and professional presentation.",
                    ar: "واجهة صحية هادئة مبنية حول الوضوح والثقة والعرض الاحترافي.",
                },
            },
            {
                image: "/assest/curevie.jpeg",
                eyebrow: {
                    en: "Visual Tone",
                    ar: "النبرة البصرية",
                },
                title: {
                    en: "A softer medical identity",
                    ar: "هوية طبية أكثر إنسانية",
                },
                body: {
                    en: "Healthcare design can be human, readable, and credible without feeling cold.",
                    ar: "التصميم الصحي يمكن أن يكون إنسانيا وواضحا وموثوقا دون أن يبدو باردا.",
                },
            },
        ],
    },
    "horvath-survey": {
        slug: "horvath-survey",
        title: {
            en: "Horvath Survey",
            ar: "Horvath Survey",
        },
        category: {
            en: "Survey & Business Data Platform",
            ar: "منصة استبيانات وبيانات أعمال",
        },
        summary: {
            en: "A structured survey experience where clarity, input focus, and business usefulness lead the interface.",
            ar: "تجربة استبيان منظمة تقودها وضوح النماذج وتركيز الإدخال وقيمة البيانات للأعمال.",
        },
        cover: "/assest/horvath1.jpeg",
        pages: [
            {
                image: "/assest/horvath1.jpeg",
                eyebrow: {
                    en: "Survey Experience",
                    ar: "تجربة الاستبيان",
                },
                title: {
                    en: "Structured data capture",
                    ar: "جمع بيانات منظم",
                },
                body: {
                    en: "A survey interface focused on readable flow and practical input collection.",
                    ar: "واجهة استبيان تركز على وضوح التدفق وسهولة جمع المعلومات.",
                },
            },
            {
                image: "/assest/horvath.jpeg",
                eyebrow: {
                    en: "Business Clarity",
                    ar: "وضوح الأعمال",
                },
                title: {
                    en: "Forms that feel organized",
                    ar: "نماذج منظمة",
                },
                body: {
                    en: "A clean form structure helps users complete the process with less hesitation.",
                    ar: "هيكلة النماذج بشكل نظيف تساعد المستخدم على الإكمال بتردد أقل.",
                },
            },
        ],
    },
    "manal-alhihi": {
        slug: "manal-alhihi",
        title: {
            en: "Manal Alhihi Educational Platform",
            ar: "Manal Alhihi Educational Platform",
        },
        category: {
            en: "Educational Platform",
            ar: "منصة تعليمية",
        },
        summary: {
            en: "An education interface concept shaped around calm learning paths, organized content, and a polished student experience.",
            ar: "تصور لواجهة تعليمية مبنية حول مسارات تعلم هادئة ومحتوى منظم وتجربة طلابية مصقولة.",
        },
        cover: "/assest/t%20(4).png",
        pages: [
            {
                image: "/assest/t%20(4).png",
                eyebrow: {
                    en: "Learning Platform",
                    ar: "منصة تعليمية",
                },
                title: {
                    en: "A professional education interface",
                    ar: "واجهة تعليمية احترافية",
                },
                body: {
                    en: "An educational experience built around organized content and clear navigation.",
                    ar: "تجربة تعليمية مبنية حول تنظيم المحتوى ووضوح التنقل.",
                },
            },
            {
                image: "/assest/t.png",
                eyebrow: {
                    en: "Course Structure",
                    ar: "هيكلة المحتوى",
                },
                title: {
                    en: "Content that is easy to explore",
                    ar: "محتوى سهل الاستكشاف",
                },
                body: {
                    en: "The interface helps students focus on learning instead of figuring out where to go.",
                    ar: "الواجهة تساعد الطلاب على التركيز على التعلم بدلا من محاولة فهم أين يذهبون.",
                },
            },
        ],
    },
};

export type WhyUsLocale = { en: string; ar: string };

export type WhyUsStory = {
  id: string;
  number: string;
  title: WhyUsLocale;
  body: { en: string[]; ar: string[] };
  asset: string;
  assetLabel: WhyUsLocale;
};

export type WhyUsProcessStep = {
  title: WhyUsLocale;
  body: WhyUsLocale;
};

export const whyUsHero = {
  title: { en: "Why Us?", ar: "لماذا نحن؟" },
  opening: {
    en: "Because the website your business needs should not be just a beautiful interface.",
    ar: "لأن الموقع الذي تحتاجه شركتك لا يجب أن يكون مجرد واجهة جميلة.",
  },
  core: {
    en: "You are not looking for a page that only displays images and text. You need a digital system that understands your customer, explains your offer clearly, reduces hesitation, and makes contacting you or buying from you easier.",
    ar: "أنت لا تبحث عن صفحة تعرض صورًا ونصوصًا فقط. أنت تحتاج نظامًا رقميًا يفهم عميلك، يشرح عرضك بوضوح، يختصر التردد، ويجعل قرار التواصل أو الشراء أسهل.",
  },
} satisfies Record<string, WhyUsLocale>;

export const whyUsStories: WhyUsStory[] = [
  {
    id: "clearer-sale",
    number: "01",
    title: {
      en: "We do not just build a website. We build a clearer way to sell.",
      ar: "لا نبني موقعًا لك فقط… نبني معك طريقة أوضح للبيع",
    },
    body: {
      en: [
        "The starting point is not a template or a visual trend. It is the decision your customer is trying to make.",
        "We organize the message, proof, and next step around what that customer must understand first—so the website supports the conversation instead of decorating it.",
      ],
      ar: [
        "نقطة البداية ليست قالبًا جاهزًا أو موجة تصميم. البداية هي القرار الذي يحاول عميلك اتخاذه.",
        "نرتب الرسالة، والدليل، والخطوة التالية حول ما يجب أن يفهمه العميل أولًا، حتى يدعم الموقع عملية البيع بدل أن يكتفي بتزيينها.",
      ],
    },
    asset: "/assest/whyUs/undraw_ideas-flow_lwpa.svg",
    assetLabel: { en: "Clarity before decoration", ar: "الوضوح قبل الزينة" },
  },
  {
    id: "direct",
    number: "02",
    title: {
      en: "Direct communication, without unnecessary layers.",
      ar: "تواصل مباشر… بدون حواجز",
    },
    body: {
      en: [
        "You communicate directly with the person shaping the product. Questions are answered in context, decisions stay clear, and important details are less likely to disappear between layers.",
        "That direct line makes the work calmer, faster to understand, and easier to improve.",
      ],
      ar: [
        "تتواصل مباشرة مع الشخص الذي يبني التجربة ويصنع قراراتها. تُفهم الأسئلة ضمن سياقها، وتبقى القرارات واضحة، ولا تضيع التفاصيل المهمة بين طبقات التواصل.",
        "هذا الخط المباشر يجعل العمل أهدأ، وأسرع في الفهم، وأسهل في التحسين.",
      ],
    },
    asset: "/assest/whyUs/undraw_online-meetings_zutp.svg",
    assetLabel: { en: "One direct line", ar: "خط تواصل مباشر" },
  },
  {
    id: "support",
    number: "03",
    title: {
      en: "Support does not end at launch.",
      ar: "دعم لا ينتهي عند التسليم",
    },
    body: {
      en: [
        "Launch is the moment real use begins—not the moment responsibility disappears.",
        "We help you understand what was built, respond to agreed follow-up needs, and make informed improvements as the business learns from customers.",
      ],
      ar: [
        "الإطلاق هو اللحظة التي يبدأ فيها الاستخدام الحقيقي، وليس اللحظة التي تختفي فيها المسؤولية.",
        "نساعدك على فهم ما تم بناؤه، ونتابع الاحتياجات المتفق عليها، ونطوّر التجربة بقرارات واعية عندما يتعلم المشروع من عملائه.",
      ],
    },
    asset: "/assest/whyUs/undraw_active-support_v6g0.svg",
    assetLabel: { en: "Launch is a beginning", ar: "الإطلاق بداية" },
  },
  {
    id: "experience",
    number: "04",
    title: {
      en: "Experience across different digital systems.",
      ar: "خبرة في بناء تجارب مختلفة",
    },
    body: {
      en: [
        "Marketing sites, booking journeys, dashboards, education platforms, healthcare experiences, surveys, and operational flows all teach different lessons.",
        "We bring those lessons into the project without forcing your business into someone else’s solution.",
      ],
      ar: [
        "المواقع التسويقية، ومسارات الحجز، ولوحات التحكم، ومنصات التعليم، وتجارب الصحة، والاستبيانات، والأنظمة التشغيلية؛ لكل منها دروس مختلفة.",
        "ننقل هذه الخبرة إلى مشروعك دون أن نفرض على شركتك حلًا صُمم لشخص آخر.",
      ],
    },
    asset: "/assest/whyUs/undraw_mobile-web_eqrb.svg",
    assetLabel: { en: "Patterns, not templates", ar: "خبرة لا قوالب" },
  },
  {
    id: "consulting",
    number: "05",
    title: {
      en: "Consulting, not just execution.",
      ar: "استشارات مستمرة… لأنك لا تحتاج منفّذًا فقط",
    },
    body: {
      en: [
        "A good partner does not say yes to every requested feature. We ask what the feature should solve, what deserves priority, and what can wait.",
        "The goal is not to add more. It is to make the next decision clearer and the investment more deliberate.",
      ],
      ar: [
        "الشريك الجيد لا يوافق على كل ميزة مطلوبة دون سؤال. نسأل: ما المشكلة التي ستحلها؟ ما الأولوية؟ وما الذي يمكن تأجيله؟",
        "الهدف ليس إضافة المزيد، بل جعل القرار التالي أوضح والاستثمار أكثر وعيًا.",
      ],
    },
    asset: "/assest/whyUs/Consultative sales-amico.svg",
    assetLabel: { en: "Advice before addition", ar: "النصيحة قبل الإضافة" },
  },
  {
    id: "future",
    number: "06",
    title: {
      en: "Built with the future in mind.",
      ar: "نظرة مستقبلية من أول يوم",
    },
    body: {
      en: [
        "We plan structure, responsiveness, performance, and content growth before they become expensive problems.",
        "No system can predict every future need. But clear architecture and disciplined frontend work make change safer when the business is ready for it.",
      ],
      ar: [
        "نفكر في البنية، والتجاوب، والأداء، ونمو المحتوى قبل أن تتحول إلى مشكلات مكلفة.",
        "لا يوجد نظام يتنبأ بكل احتياج مستقبلي، لكن المعمارية الواضحة والتنفيذ المنضبط يجعلان التغيير أكثر أمانًا عندما يكون المشروع مستعدًا له.",
      ],
    },
    asset: "/assest/whyUs/Server-rafiki.svg",
    assetLabel: { en: "Room to evolve", ar: "مساحة للتطور" },
  },
  {
    id: "hesitation",
    number: "07",
    title: {
      en: "We understand the hesitation before the decision.",
      ar: "نحن نفهم القلق قبل القرار",
    },
    body: {
      en: [
        "A website project carries real questions: Will the message be understood? Will the process stay under control? Will the result still fit the business after launch?",
        "We reduce that uncertainty with clear scope, visible checkpoints, direct explanations, and a process where you always know what comes next.",
      ],
      ar: [
        "مشروع الموقع يحمل أسئلة حقيقية: هل ستُفهم الرسالة؟ هل ستبقى العملية تحت السيطرة؟ وهل سيظل الناتج مناسبًا للمشروع بعد الإطلاق؟",
        "نخفف هذا القلق بنطاق واضح، ونقاط مراجعة مرئية، وشرح مباشر، وعملية تعرف فيها دائمًا ما الخطوة التالية.",
      ],
    },
    asset: "/assest/whyUs/undraw_questions_52ic.svg",
    assetLabel: { en: "Clarity reduces risk", ar: "الوضوح يقلل القلق" },
  },
];

export const whyUsProcess: WhyUsProcessStep[] = [
  {
    title: { en: "Understand the project", ar: "نفهم المشروع" },
    body: { en: "Business, audience, constraints, and the decision the system must support.", ar: "نفهم المشروع، والعميل، والقيود، والقرار الذي يجب أن يدعمه النظام." },
  },
  {
    title: { en: "Map the path", ar: "نرسم المسار" },
    body: { en: "We define the visitor journey and remove unnecessary turns.", ar: "نحدد رحلة الزائر ونزيل المنعطفات غير الضرورية." },
  },
  {
    title: { en: "Shape the message", ar: "نبني الرسالة" },
    body: { en: "We organize the offer, proof, and next action in a clear hierarchy.", ar: "نرتب العرض، والدليل، والخطوة التالية ضمن تسلسل واضح." },
  },
  {
    title: { en: "Design the experience", ar: "نصمم التجربة" },
    body: { en: "Visual direction serves understanding, trust, and brand character.", ar: "نجعل الاتجاه البصري يخدم الفهم والثقة وشخصية العلامة." },
  },
  {
    title: { en: "Build and test", ar: "نطور ونختبر" },
    body: { en: "Responsive implementation, practical testing, and focused refinement.", ar: "تنفيذ متجاوب، واختبار عملي، وتحسين مركز." },
  },
  {
    title: { en: "Launch and support", ar: "نطلق وندعم" },
    body: { en: "We launch deliberately, explain the system, and support agreed next steps.", ar: "نطلق بوعي، ونشرح النظام، وندعم الخطوات التالية المتفق عليها." },
  },
];


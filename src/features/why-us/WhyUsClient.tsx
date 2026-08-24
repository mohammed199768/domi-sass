"use client";

import EditorialWhyPage, { type EditorialPageCopy } from "@/features/editorial/EditorialWhyPage";
import "@/features/editorial/editorial-page.css";

const ar: EditorialPageCopy = {
  breadcrumb: "DOMINASE / لماذا نحن؟",
  title: "لأننا لا نعامل الموقع كواجهة منفصلة عن شغلك.",
  lead: "نشتغل كفريق منتج وبرمجة: نفهم كيف يأتي العميل، ماذا يحتاج أن يرى، ما الإجراء المناسب، وماذا يجب أن يحدث داخل عملك بعد ذلك. التصميم، البرمجة والمحتوى عندنا أجزاء من نفس النظام.",
  readTime: "حوالي 5 دقائق",
  topics: ["طريقة العمل", "المنتج", "التطوير"],
  primary: { label: "احكِ لنا عن مشروعك", href: "/contact" },
  secondary: { label: "شاهد الأعمال", href: "/work" },
  summaryLabel: "لماذا DOMINASE؟",
  summary: "لأننا نحاول أن نحل المشكلة كاملة قدر الإمكان: ما يراه العميل، ما يفعله، وما يحتاجه فريقك بعد ذلك. الهدف منتج أبسط في الاستخدام وأوضح في الإدارة وقابل للتطوير لاحقاً.",
  summaryPoints: ["نفهم قبل أن نصمم.", "نبني حول رحلة حقيقية لا قالب جاهز.", "نربط الواجهة بالعمليات والقياس."],
  tocLabel: "كيف نختلف",
  sections: [
    {
      id: "diagnosis",
      eyebrow: "نبدأ من المشكلة",
      title: "أول سؤال عندنا ليس: أي تصميم يعجبك؟",
      paragraphs: [
        "نريد أن نعرف ماذا يحدث اليوم. كيف يأتي العميل؟ أين يسأل؟ أين يحجز؟ من يتابع معه؟ وأي جزء من هذه الرحلة يستهلك وقتاً أو يسبب تردداً. هذه الأسئلة تعطينا أساساً أقوى من البدء بلون أو style مرجعي.",
        "بعدها نحول المطلوب إلى أولويات. ليس كل شيء يجب أن يدخل النسخة الأولى، وليس كل فكرة تحتاج feature كاملة. نفضّل أن يكون القرار واضحاً والمشروع قابلاً للنمو بدل أن نكدّس مزايا لا يستخدمها أحد.",
      ],
      callout: { label: "طريقة التفكير", text: "المشكلة أولاً، ثم الرحلة، ثم الواجهة والتقنية المناسبة لها." },
    },
    {
      id: "product",
      eyebrow: "نفكر كمنتج",
      title: "كل شاشة يجب أن تجيب عن سؤال أو تحرّك خطوة.",
      paragraphs: ["نرتب المحتوى، الـCTA، الحالات، الصلاحيات والتفاعل كجزء واحد. إذا كانت الشاشة جميلة لكنها لا تساعد المستخدم أو الفريق، فهي لم تنتهِ بعد."],
      cards: [
        { title: "وضوح العرض", body: "العميل يفهم ماذا تقدم، لمن، ولماذا يختارك بدون فك شيفرة النص أو البحث بين الأقسام." },
        { title: "CTA حسب النية", body: "الحجز ليس مثل طلب عرض سعر، والمنصة التعليمية ليست مثل عيادة. الإجراء يتغير حسب السياق." },
        { title: "تشغيل خلف الواجهة", body: "لوحة الإدارة والصلاحيات والمتابعة ليست إضافات لاحقة؛ هي جزء من المنتج إذا كان العمل يحتاجها." },
        { title: "قابلية التطوير", body: "نبني المكونات والبيانات بحيث تستطيع إضافة مرحلة أو خدمة أو دور جديد لاحقاً بدون إعادة كل شيء من الصفر." },
      ],
    },
    {
      id: "build",
      eyebrow: "التصميم والبرمجة معاً",
      title: "لا نرمي التصميم للمطور ونأمل أن يخرج قريباً منه.",
      paragraphs: [
        "عندما تكون قرارات UX، الواجهة والتنفيذ قريبة من بعضها، تقل الفجوة بين الفكرة وما يصل للمستخدم. نختبر responsive behaviour، النص العربي، الحالات الفارغة، التحميل، الأخطاء والتفاعل كجزء من نفس عملية البناء.",
        "هذا مهم خصوصاً في المشاريع التي فيها لوحات تحكم، بيانات، فيديو، حجز أو flows متعددة. التفاصيل التي تبدو صغيرة في التصميم تتحول بسرعة إلى مشاكل حقيقية إذا لم تُفهم برمجياً من البداية.",
      ],
      pairs: [
        { before: "تصميم منفصل ثم تنفيذ تقريبي.", after: "قرارات تصميم قابلة للتنفيذ من البداية." },
        { before: "نسخة عربية تُقلب RTL في النهاية.", after: "العربي يُصمم ويُختبر كواجهة أصلية." },
        { before: "الـmobile نسخة مصغرة من desktop.", after: "الموبايل له أولويات وتفاعل يناسب الشاشة." },
      ],
    },
    {
      id: "measure",
      eyebrow: "ما بعد الإطلاق",
      title: "الإطلاق ليس نهاية المشروع إذا كان الموقع جزءاً من البيع أو التشغيل.",
      paragraphs: ["بعد الإطلاق نريد أن نعرف ماذا يعمل وماذا يحتاج تعديل. الأداء، أخطاء الاستخدام، مصدر الـleads، الـCTA الذي يتحول أكثر، والصفحات التي يخرج منها الناس كلها إشارات تساعد على تحسين المنتج."],
      flow: ["إطلاق", "قياس", "مراجعة", "تحسين", "توسّع"],
      callout: { label: "الفكرة", text: "بدل تحديث الموقع عندما يصبح قديماً جداً، نحافظ على نظام يتطور مع تغير العمل والسوق." },
    },
    {
      id: "fit",
      eyebrow: "متى نكون خياراً مناسباً؟",
      title: "لما تحتاج أكثر من تنفيذ طلب حرفي.",
      paragraphs: ["نحن مناسبون أكثر للمشروع الذي فيه مشكلة تحتاج فهم، أو رحلة تحتاج ترتيب، أو نظام يحتاج تبسيط. إذا كنت تريد جهة تناقش القرار معك، توضح البدائل، ثم تبني ما اتفقنا عليه، هنا تظهر قيمة طريقة عملنا."],
      cards: [
        { title: "منصات تعليمية", body: "تجربة الطالب مع إدارة المدرس أو الأكاديمية، المحتوى، الاختبارات والبيع." },
        { title: "عيادات ومراكز", body: "من الإعلان والبحث إلى الثقة، الحجز، البيانات والمتابعة." },
        { title: "أنظمة أعمال", body: "تحويل خطوات يدوية ومتفرقة إلى واجهة واضحة وصلاحيات وتقارير." },
        { title: "مواقع شركات ومنتجات", body: "حضور أقوى، SEO، سرد أوضح ومسارات تحويل يمكن قياسها." },
      ],
    },
  ],
  final: { eyebrow: "ابدأ من الواقع", title: "ابعث لنا المشكلة كما هي. لا تحتاج تجهّز Brief مثالي.", body: "احكِ لنا عن الشغل الحالي، أين تتعبون، وما النتيجة التي تريدون الوصول لها. من هناك نحدد أول خطوة منطقية.", primary: "احجز استشارة", secondary: "شاهد أعمالنا" },
};

const en: EditorialPageCopy = {
  breadcrumb: "DOMINASE / Why us?",
  title: "Because we do not treat the website as something separate from the business.",
  lead: "We work like a product and software team: understand how customers arrive, what they need to see, which action fits, and what should happen inside the business afterwards. Design, development, and content are parts of the same system.",
  readTime: "About 5 minutes", topics: ["Approach", "Product", "Development"],
  primary: { label: "Tell us about your project", href: "/contact" }, secondary: { label: "View the work", href: "/work" },
  summaryLabel: "Why DOMINASE?", summary: "Because we try to solve the whole problem: what the customer sees, what they do, and what your team needs afterwards. The goal is a product that is simpler to use, clearer to operate, and easier to evolve.",
  summaryPoints: ["Understand before designing.", "Build around a real journey, not a template.", "Connect the interface to operations and measurement."], tocLabel: "How we work",
  sections: [
    { id:"diagnosis", eyebrow:"Start with the problem", title:"Our first question is not: which design style do you like?", paragraphs:["We want to understand what happens today. How do customers arrive, ask, book, get followed up, and where does that journey consume time or create hesitation? Those questions give us a stronger foundation than starting from color or visual references.","Then we turn the brief into priorities. Not everything belongs in version one, and not every idea deserves a full feature. We prefer a clear decision and a product that can grow over a pile of features nobody uses."], callout:{label:"The thinking",text:"Problem first, then journey, then the interface and technology that fit it."}},
    { id:"product", eyebrow:"Think like a product", title:"Every screen should answer a question or move a step.", paragraphs:["We structure content, CTAs, states, permissions, and interaction as one system. If a screen looks good but does not help the user or the team, it is not finished."], cards:[{title:"Offer clarity",body:"Customers understand what you do, for whom, and why to choose you without decoding the page."},{title:"CTA by intent",body:"A booking is not a quote request, and an education platform is not a clinic. The action changes with context."},{title:"Operations behind the interface",body:"Admin tools, permissions, and follow-up are not afterthoughts when the business depends on them."},{title:"Room to evolve",body:"Components and data are shaped so new services, stages, or roles can be added without rebuilding everything."}]},
    { id:"build", eyebrow:"Design and development together", title:"We do not throw a design over the wall and hope the implementation looks close.", paragraphs:["When UX, interface, and implementation decisions stay close, the gap between the idea and the shipped product gets smaller. Responsive behavior, Arabic copy, empty states, loading, errors, and interaction are tested as part of the build.","This matters in products with dashboards, data, video, booking, or multiple flows. Small design details quickly become real usability problems when they are not understood technically from the beginning."], pairs:[{before:"Separate design followed by approximate implementation.",after:"Design decisions that are implementation-aware from the start."},{before:"Arabic flipped to RTL at the end.",after:"Arabic designed and tested as a first-class interface."},{before:"Mobile as a smaller desktop.",after:"Mobile priorities and interaction designed for the screen."}]},
    { id:"measure", eyebrow:"After launch", title:"Launch is not the end when the website is part of sales or operations.", paragraphs:["After launch we want to know what works and what needs adjustment. Performance, usability issues, lead source, CTA conversion, and exit pages are signals that help the product improve."], flow:["Launch","Measure","Review","Improve","Expand"], callout:{label:"The idea",text:"Instead of waiting until the site feels old, keep a system that evolves with the business and the market."}},
    { id:"fit", eyebrow:"Where do we fit?", title:"When you need more than literal execution.", paragraphs:["We fit best when there is a problem to understand, a journey to structure, or a system to simplify. If you want a partner that discusses the decision, explains tradeoffs, and then builds the agreed direction, that is where our process adds value."], cards:[{title:"Education platforms",body:"Student experience plus instructor or academy operations, content, assessments, and sales."},{title:"Clinics and medical centers",body:"From campaign and search to trust, booking, data, and follow-up."},{title:"Business systems",body:"Turn scattered manual steps into a clear interface with roles and reporting."},{title:"Company and product websites",body:"Stronger presence, SEO, clearer storytelling, and measurable conversion paths."}]},
  ],
  final:{eyebrow:"Start from reality",title:"Send us the problem as it is. You do not need a perfect brief.",body:"Tell us how the work happens today, where it is difficult, and what outcome you want. We can define the logical first step from there.",primary:"Book a consultation",secondary:"View our work"},
};

export default function WhyUsClient(){ return <EditorialWhyPage copy={{ ar, en }} />; }

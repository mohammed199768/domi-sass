export type InsightSection = { heading: string; paragraphs: string[]; bullets?: string[]; callout?: string };
export type LocalizedInsight = { title: string; excerpt: string; kicker: string; readTime: string; sections: InsightSection[] };
export type Insight = { slug: string; published: string; cover: string; ar: LocalizedInsight; en: LocalizedInsight };

export const insights: Insight[] = [
  {
    slug: "seo-discoverability-2026",
    published: "2026-08-22",
    cover: "/media/product-stories/sultan-shadi/identity-home-wide.webp",
    ar: {
      kicker: "SEO / الظهور الرقمي",
      title: "تحسين الظهور في البحث ليس حشواً للكلمات. بل بناء موقع يستحق أن يُفهم ويظهر.",
      excerpt: "كيف تغيّر البحث، ولماذا تحتاج صفحات خدمات واضحة، محتوى مفيد وبنية تقنية تساعد Google والناس على فهم شركتك بسرعة.",
      readTime: "8 دقائق",
      sections: [
        { heading: "البحث تغيّر، لكن الأساس لم يتغيّر", paragraphs: ["الناس ما زالت تبحث عن حل لمشكلة: شركة برمجة، تطوير موقع، منصة تعليمية، نظام عيادة، CRM أو تطبيق. الذي تغيّر هو كمية المنافسة وطريقة عرض النتائج وتوقع المستخدم أن يصل للإجابة بسرعة.", "لهذا لا نتعامل مع SEO كطبقة تضاف بعد انتهاء الموقع. عنوان الصفحة، الـH1، البنية الداخلية، الروابط، سرعة الموقع، جودة المحتوى وحتى وضوح الخدمة كلها أجزاء من قابلية الاكتشاف."], callout: "الهدف ليس أن نكرر كلمة «شركة برمجة» عشرين مرة. الهدف أن تصبح كل صفحة أفضل إجابة ممكنة لنية بحث محددة." },
        { heading: "كل نية بحث تحتاج مكاناً واضحاً", paragraphs: ["الصفحة الرئيسية لا تستطيع أن تشرح كل شيء بالتفصيل. الشخص الذي يبحث عن منصة تعليمية يحتاج محتوى مختلفاً عن مدير عيادة يبحث عن نظام حجز. عندما نضع كل الخدمات في صفحة واحدة قصيرة، نجعل محرك البحث والعميل يخمنان ما إذا كنا مناسبين.", "الحل هو بنية خدمات حقيقية: صفحة لتطوير المواقع، صفحة للأنظمة المخصصة، صفحة للمنصات التعليمية، وصفحة لمواقع وأنظمة العيادات. كل صفحة تشرح المشكلة، الحل، السيناريوهات، طريقة العمل والأسئلة التي يسألها العميل فعلياً."], bullets: ["عنوان فريد وواضح لكل صفحة", "H1 يطابق موضوع الصفحة", "محتوى أصلي وليس تبديل كلمات", "روابط داخلية بين الخدمات والأعمال والمقالات"] },
        { heading: "المحتوى يبني سلطة موضوعية", paragraphs: ["لو كنا نريد أن يعرف السوق أن DOMINASE تفهم الأنظمة والـCTA والحجز، لا يكفي أن نقول ذلك في صفحة الخدمات. نكتب ونشرح ونربط الشرح بأعمال حقيقية. مقال جيد عن CTA يمكن أن يقود إلى دراسة حالة، ومنها إلى صفحة خدمة أو نموذج مشروع.", "مع الوقت تتكون شبكة محتوى مترابطة تجعل الموقع مفهوماً حول مواضيع محددة: software development، UX، education platforms، clinic booking، CRM، conversion وSEO نفسه."], callout: "أفضل محتوى SEO هو الذي يساعد العميل حتى لو لم يشترِ منك اليوم." },
        { heading: "التقنية مهمة لأنها تمنع الموقع من إخفاء نفسه", paragraphs: ["الـmetadata، canonical URLs، sitemap، robots، structured data، alt text، semantic headings وCore Web Vitals ليست تفاصيل تجميلية. هي تجعل الزحف والفهم أسهل وتقلل المشاكل التي تمنع صفحات جيدة من أخذ فرصتها.", "في المواقع ثنائية اللغة يجب أيضاً الانتباه لما يراه محرك البحث فعلياً. تبديل اللغة داخل المتصفح وحده لا يصنع بالضرورة نسخة عربية قابلة للفهرسة مثل وجود بنية URL واضحة ومحتوى server-rendered. لذلك SEO الحقيقي يحتاج قراراً معمارياً، وليس زر لغة فقط."], bullets: ["فهرسة قابلة للتوقع", "سرعة على الهاتف", "بيانات منظمة مناسبة", "لا صفحات مكررة أو عناوين عامة"] },
        { heading: "كيف نقيس إذا الـSEO يتحسن؟", paragraphs: ["الترتيب لكلمة واحدة ليس مقياساً كافياً. نراقب impressions، clicks، queries، الصفحات التي بدأت تظهر، جودة الزيارات وما إذا كانت تتحول إلى خطوات مفيدة مثل مشاهدة الأعمال أو إرسال طلب.", "الهدف النهائي أن يصبح البحث قناة مستمرة تجلب أشخاصاً يبحثون فعلاً عن الخدمة، وليس رقماً كبيراً من الزيارات التي لا تفهم ماذا تقدم."], callout: "SEO الجيد يجلب النية الصحيحة، ثم UX الجيد يحوّل هذه النية إلى خطوة." },
      ],
    },
    en: {
      kicker: "SEO / Discoverability", title: "SEO is not keyword stuffing. It is building a site worth understanding and finding.", excerpt: "How search has evolved and why clear service pages, useful content, internal links, and technical fundamentals matter.", readTime: "7 min",
      sections: [
        { heading: "Search changed, the foundation did not", paragraphs: ["People still search for solutions: web development, a custom system, an education platform, clinic booking, CRM, or an app. Competition and result formats changed, but the job remains matching useful pages to real intent.", "SEO should therefore be part of information architecture, not a plugin installed after launch."] },
        { heading: "Give each search intent a clear destination", paragraphs: ["A homepage cannot deeply answer every service need. Dedicated pages let customers and search engines understand exactly what the business can solve."], bullets: ["Unique title and H1", "Original useful content", "Internal links", "Relevant proof and case studies"] },
        { heading: "Content builds topical authority", paragraphs: ["Explain the topics you want the market to associate with your company, then connect articles to services and real work. This creates a useful knowledge graph rather than disconnected posts."] },
        { heading: "Technical SEO prevents good content from hiding", paragraphs: ["Canonical URLs, sitemaps, robots, structured data, semantic headings, image text, performance, and language architecture help crawlers access and understand the pages correctly."] },
        { heading: "Measure more than one ranking", paragraphs: ["Track impressions, clicks, queries, landing pages, qualified actions, and conversion paths. The goal is relevant discovery that turns into useful business activity."] },
      ],
    },
  },
  {
    slug: "cta-that-matches-intent",
    published: "2026-08-22",
    cover: "/media/product-stories/qasr-alfarah/booking-wide.webp",
    ar: {
      kicker: "CTA / التحويل",
      title: "ليس كل زائر مستعداً للتواصل. يجب أن يتغيّر الإجراء حسب نيته.",
      excerpt: "لماذا زر واحد لكل المستخدمين يضيّع فرصاً، وكيف نبني CTA مرتبطاً بالحملة والمرحلة والقرار الذي يستطيع العميل أخذه الآن.", readTime: "7 دقائق",
      sections: [
        { heading: "زر التواصل ليس استراتيجية تحويل", paragraphs: ["شخص دخل من إعلان لدورة تعليمية ليس في نفس حالة شخص يبحث عن شركة برمجة، ولا مريض يريد موعداً عاجلاً مثل شخص يقارن أطباء. عندما نعطيهم جميعاً زر «تواصل معنا»، نحن ننقل مسؤولية فهم الخطوة للمستخدم.", "CTA الجيد يختصر القرار: احجز موعداً، شاهد المنهج، جرّب التشخيص، اختر الباقة، ابدأ منصتك، أو اطلب تقييم موقعك."], callout: "الـCTA هو الجسر بين ما فهمه العميل وما يستطيع فعله الآن." },
        { heading: "ابدأ من مصدر الزيارة", paragraphs: ["الحملة الإعلانية تعطيك سياقاً ثميناً. لو الإعلان عن خدمة محددة، من المنطقي أن يصل المستخدم إلى صفحة وCTA يكملان نفس الوعد. إذا دخل على homepage عامة واضطر يبحث من جديد، نحن نكسر استمرارية الرسالة.", "يمكن تتبع مصدر الحملة والـUTM واستخدامه في صياغة الصفحة أو حفظه مع الـlead حتى يعرف فريق المبيعات من أين جاء العميل وما الذي شاهده."], bullets: ["إعلان دورة → شاهد المنهج / اشترك", "إعلان عيادة → اختر الخدمة / احجز", "إعلان B2B → شخّص المشكلة / اطلب اجتماعاً"] },
        { heading: "قلّل حجم الالتزام في البداية", paragraphs: ["ليس كل عميل جاهزاً لمكالمة. أحياناً استبيان من ثلاث خطوات أو اختيار نوع المشروع يعطيه مساحة يفكر ويعطيك في المقابل معلومات تساعدك ترد بشكل أفضل.", "الـinteractive CTA مفيد عندما يحول السؤال الكبير «ماذا تريد؟» إلى اختيارات صغيرة وواضحة بدون تحويل الصفحة إلى اختبار طويل."], callout: "أفضل CTA لا يضغط على المستخدم؛ يسهّل عليه اتخاذ خطوة منطقية." },
        { heading: "بعد الضغط تبدأ نصف التجربة", paragraphs: ["إذا CTA ممتاز ثم النموذج فيه 14 خانة، أو الحجز لا يؤكد الموعد، أو واتساب يصل بدون أي سياق، ضاعت قيمة الجزء الأول. لذلك نرسم الـCTA والـpost-click flow معاً.", "في الأنظمة الأقوى نحفظ نوع الخدمة، المصدر، الحملة والبيانات الأساسية داخل CRM أو لوحة الإدارة حتى تبدأ المتابعة من معلومات وليس من الصفر."] },
      ],
    },
    en: { kicker:"CTA / Conversion", title:"Not every visitor wants “Contact us.” Match the CTA to intent.", excerpt:"Why one generic action loses opportunities and how campaign-aware CTAs reduce friction.", readTime:"6 min", sections:[
      {heading:"A contact button is not a conversion strategy",paragraphs:["Different visitors arrive with different levels of intent. A good CTA gives each one a concrete next step instead of asking them to interpret what to do."]},
      {heading:"Start from traffic source",paragraphs:["Campaign context should continue onto the landing experience. Preserve UTMs and lead context so the sales team understands what brought the customer in."]},
      {heading:"Reduce commitment",paragraphs:["A short guided choice can be easier than asking every visitor to book a call immediately. Interactive CTAs work when they make a large decision smaller and clearer."]},
      {heading:"The experience continues after the click",paragraphs:["Forms, booking confirmation, CRM capture, and follow-up determine whether a strong CTA becomes a real opportunity."]},
    ]},
  },
  {
    slug: "website-as-a-system",
    published: "2026-08-22",
    cover: "/media/product-stories/pulse-gym/admin-overview-wide.webp",
    ar: { kicker:"الأنظمة / المواقع", title:"الموقع ليس نهاية الرحلة. اجعله جزءاً من النظام الذي يشغّل عملك.", excerpt:"كيف يتحول الموقع من صفحات إلى مسار يربط الطلب والحجز والبيانات والمتابعة والتقارير.", readTime:"8 دقائق", sections:[
      {heading:"الواجهة جزء صغير من المنتج",paragraphs:["المستخدم يرى الصفحة والزر والنموذج. فريقك يحتاج ما وراء ذلك: من أرسل؟ ماذا اختار؟ هل تم الرد؟ هل حجز؟ هل تحولت الفرصة إلى عميل؟ إذا بقيت هذه المعلومات في رسائل متفرقة، الموقع لم يحل المشكلة كاملة.","هذا لا يعني بناء ERP لكل شركة. يعني فقط ربط الواجهة بالخطوة التشغيلية الطبيعية التي تأتي بعدها."]},
      {heading:"الحجز مثال واضح",paragraphs:["في عيادة، الحجز ليس زر WhatsApp فقط. يمكن أن يبدأ باختيار خدمة أو طبيب، ثم وقت مناسب، ثم بيانات مختصرة، ثم تأكيد. خلف ذلك يرى الفريق الموعد وحالته ومصدره ويستطيع المتابعة.","في قاعة أفراح أو خدمة مواعيد، المنطق يختلف لكن الفكرة نفسها: اجعل النظام يحفظ السياق بدل أن يطلب من الموظف إعادة بنائه يدوياً."],bullets:["Pending / confirmed / completed", "مصدر الحجز والحملة", "ملاحظات المتابعة", "تقارير بسيطة للطلب والتحويل"]},
      {heading:"الـCRM ليس فقط للشركات الكبيرة",paragraphs:["CRM بالمعنى العملي هو مكان يعرف فيه الفريق من هم العملاء المحتملون، ماذا طلبوا، من يتابع معهم وما الخطوة القادمة. ممكن يبدأ بسيطاً جداً ثم يتوسع حسب الحاجة.","الأهم أن بيانات الموقع لا تضيع في صندوق بريد أو جهاز شخص واحد. عندما تصبح مركزية، تستطيع قياس التسرب وتحسين العملية."],callout:"أحياناً أبسط CRM داخلي يوفر قيمة أكبر من عشر أدوات منفصلة."},
      {heading:"الموقع كنظام يغيّر طريقة التصميم",paragraphs:["عندما نعرف أن الضغط على CTA سيخلق lead أو booking، نصمم الحالات والرسائل والتأكيدات بعناية. نحتاج error states، loading، permissions، notifications وواجهات الإدارة. UX هنا يصبح جزءاً من التشغيل، لا مجرد تنسيق صفحة."]},
      {heading:"ابدأ من أصغر دورة قيمة",paragraphs:["لا تبنِ كل شيء مرة واحدة. اختر دورة واضحة: زيارة → طلب → متابعة، أو طالب → شراء → تعلم → اختبار. إذا اشتغلت هذه الدورة بثبات، أضف الأتمتة والتقارير والمزايا التي أثبتت الحاجة لها."]},
    ]}, en:{kicker:"Systems / Websites",title:"A website is not the end of the journey. Make it part of the system that runs the work.",excerpt:"Turn pages into lead capture, booking, CRM, follow-up, and reporting.",readTime:"7 min",sections:[
      {heading:"The interface is only one layer",paragraphs:["Customers see pages and forms. Teams need context, status, ownership, and follow-up behind them. Connect the interface to the next operational step instead of leaving data scattered."]},
      {heading:"Booking makes the pattern obvious",paragraphs:["A useful booking path includes service choice, availability, short data capture, confirmation, and an operational view for the team."]},
      {heading:"CRM can start small",paragraphs:["A practical CRM is simply a shared place to know who the lead is, what they asked for, who owns follow-up, and what happens next."]},
      {heading:"Systems change UX decisions",paragraphs:["Once a CTA creates a real record, states, validation, errors, notifications, permissions, and admin interfaces become part of product design."]},
      {heading:"Start with the smallest value loop",paragraphs:["Ship one reliable journey first, then expand automation and reporting when there is evidence they are needed."]},
    ]}},
  {
    slug: "customer-behavior-changed",
    published: "2026-08-22",
    cover: "/media/product-stories/our-clinic/patient-mobile-wide.webp",
    ar:{kicker:"السوق / السلوك",title:"تطورت التجارب الرقمية، وارتفعت معها توقعات العميل.",excerpt:"لماذا أصبحت السرعة والوضوح وتجربة الهاتف والثقة أساسيات لا تفاصيل إضافية.",readTime:"6 دقائق",sections:[
      {heading:"الهاتف صار الواجهة الأولى",paragraphs:["جزء كبير من الزيارات يبدأ من شاشة صغيرة وبانتباه مقسوم بين أكثر من تطبيق. التصميم الذي يعمل فقط على لابتوب واسع قد يفشل في أكثر لحظة مهمة: أول زيارة.","على الهاتف نحتاج ترتيباً أقسى للأولويات: ما الرسالة؟ ما الإثبات؟ ما الإجراء؟ وما الذي يمكن تأجيله لأسفل الصفحة؟"]},
      {heading:"المقارنة أسرع من قبل",paragraphs:["فتح ثلاث أو أربع خيارات لا يحتاج جهداً. لذلك اللغة العامة مثل «نقدم حلولاً مبتكرة» لا تعطي سبباً كافياً للبقاء. العميل يريد أن يرى بسرعة أنك تفهم نوع مشكلته وأن لديك طريقة واضحة للتعامل معها."],callout:"كلما زادت الخيارات، زادت قيمة الوضوح."},
      {heading:"الثقة موزعة على تفاصيل صغيرة",paragraphs:["الصور الحقيقية، الأعمال، لغة الكتابة، وضوح الأسعار أو طريقة التسعير، معلومات التواصل، سرعة الرد، الأخطاء في الصفحة وتناسق الهوية كلها إشارات. لا توجد لحظة واحدة اسمها «الثقة»؛ هي مجموع تجربة كاملة."]},
      {heading:"المستخدم تعوّد على تجارب أفضل",paragraphs:["الحجز الفوري، التتبع، الإشعارات، تسجيل الدخول السلس والدفع السريع أصبحت مألوفة في التطبيقات الكبيرة. هذا يرفع توقع الناس حتى من الشركات الصغيرة. لا تحتاج نسخ كل feature، لكن تحتاج إزالة الاحتكاك الواضح الذي أصبح الناس لا يتقبلونه."],bullets:["أقل خطوات", "ردود وتأكيدات واضحة", "تجربة موبايل ممتازة", "لا عناصر حركة تمنع المهمة"]},
    ]}, en:{kicker:"Market / Behavior",title:"Digital behavior evolved. Customer expectations evolved with it.",excerpt:"Why speed, clarity, mobile UX, and trust are now fundamentals.",readTime:"5 min",sections:[
      {heading:"Mobile is the first interface",paragraphs:["Many journeys start on a small screen with divided attention. Mobile requires stricter prioritization of message, proof, and action."]},
      {heading:"Comparison is faster",paragraphs:["Customers can open alternatives instantly, so generic language gives them little reason to stay. Clarity becomes a competitive advantage."]},
      {heading:"Trust is distributed",paragraphs:["Real imagery, work, copy, contact details, performance, responsiveness, and visual consistency all contribute to credibility."]},
      {heading:"Better products raised expectations",paragraphs:["Fast booking, clear confirmation, and smooth account flows are familiar. Smaller businesses do not need every feature, but obvious friction is less tolerated than before."]},
    ]}},
  {
    slug: "pixels-crm-and-the-path-after-ads",
    published: "2026-08-22",
    cover: "/media/product-stories/horvath-survey/results-wide.webp",
    ar:{kicker:"القياس / إدارة العملاء",title:"جلب الإعلان زيارة. ماذا حدث للعميل بعد ذلك؟",excerpt:"من مصدر الحملة إلى الإجراء والحجز والمتابعة: كيف تربط التسويق بما حدث فعلياً داخل الرحلة.",readTime:"7 دقائق",sections:[
      {heading:"الإعلان يعطيك بداية القصة فقط",paragraphs:["معرفة أن الحملة جلبت 1000 زيارة لا تخبرك وحدها إن كانت جيدة. نحتاج أن نعرف من ضغط CTA، من بدأ النموذج، من حجز، ومن وصل إلى نتيجة مفيدة للأعمال.","كل مرحلة لها event أو signal مناسب، لكن القياس يجب أن يخدم قراراً. تتبع عشرات الأحداث التي لن يراجعها أحد لا يصنع ذكاءً."],callout:"السؤال ليس كم شخص دخل. السؤال: ماذا فعل الأشخاص المناسبون بعد الدخول؟"},
      {heading:"UTM يحفظ السياق",paragraphs:["UTM parameters تساعدنا نعرف الحملة والمصدر والإعلان. إذا حفظنا هذه القيم مع الـlead أو booking، يستطيع فريق المبيعات لاحقاً رؤية أن هذا العميل جاء من حملة معينة أو خدمة معينة بدل أن يبدأ السؤال من الصفر."]},
      {heading:"Pixel أو analytics لا يعوض UX سيئاً",paragraphs:["القياس يكشف المشكلة، لكنه لا يصلحها. إذا المستخدم لا يفهم العرض أو زر الحجز بعيد أو الصفحة بطيئة، أفضل dashboard في العالم سيخبرك فقط أن الناس خرجت. لذلك analytics وUX يجب أن يتحركا معاً."],bullets:["حدد conversion واضح", "تتبع الخطوات المهمة فقط", "اربط المصدر بالـlead", "راجع نقاط التسرب دورياً"]},
      {heading:"CRM يغلق الدائرة",paragraphs:["بعد أن يتحول الزائر إلى lead، تبدأ مرحلة لا يراها الإعلان: الاتصال، العرض، الحجز، المتابعة، الإغلاق أو الرفض. عندما تكون هذه الحالات داخل CRM، تستطيع فهم جودة الحملات وليس فقط عدد الـleads.","قد تكتشف أن حملة أقل زيارات تجلب عملاء أفضل، أو أن خدمة معينة تحصل على leads كثيرة لكن المتابعة بطيئة. هنا يصبح التسويق والتشغيل على نفس الخريطة."]},
    ]}, en:{kicker:"Tracking / CRM",title:"The ad brought a visit. What happened to the customer after that?",excerpt:"Connect pixels, UTMs, CTAs, booking, and CRM so marketing can be measured against real outcomes.",readTime:"6 min",sections:[
      {heading:"Ads only show the beginning",paragraphs:["Traffic alone does not tell the whole story. Measure the meaningful steps from CTA to booking or qualified lead."]},
      {heading:"UTMs preserve context",paragraphs:["Store campaign and source context with the lead so sales does not start every conversation from zero."]},
      {heading:"Analytics does not fix bad UX",paragraphs:["Measurement can reveal where people leave, but the product still needs clearer content, faster performance, and better paths."]},
      {heading:"CRM closes the loop",paragraphs:["Once leads move through contacted, booked, won, or lost states, you can judge campaign quality against actual business outcomes rather than raw lead volume."]},
    ]}},
];

export const insightBySlug = Object.fromEntries(insights.map((item) => [item.slug, item])) as Record<string, Insight>;

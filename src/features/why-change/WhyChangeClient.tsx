"use client";

import EditorialWhyPage, { type EditorialPageCopy } from "@/features/editorial/EditorialWhyPage";
import "@/features/editorial/editorial-page.css";

const ar: EditorialPageCopy = {
  breadcrumb: "DOMINASE / لماذا التغيير؟",
  title: "موقعك ممكن يشتغل… ويضيّع فرص بنفس الوقت.",
  lead: "المشكلة ليست دائماً أن الموقع قديم أو معطّل. أحياناً يفتح بسرعة ويبدو مقبولاً، لكنه لا يشرحك بما يكفي، لا يبني الثقة بسرعة، ولا يقود العميل إلى الخطوة التي تريدها. ومع تغيّر السوق، هذه الفجوة تكبر بهدوء.",
  readTime: "حوالي 6 دقائق",
  topics: ["تجربة العميل", "التحويل", "النمو الرقمي"],
  primary: { label: "شخّص موقعك", href: "/diagnosis" },
  secondary: { label: "شاهد كيف نشتغل", href: "/why-us" },
  summaryLabel: "الفكرة باختصار",
  summary: "إذا بقي السوق يتطور وموقعك بقي يقدم نفس التجربة، فأنت لا تحافظ على مكانك فعلياً. المطلوب ليس إعادة تصميم كل سنة؛ المطلوب أن يظل حضورك الرقمي واضحاً، سريعاً، قابلاً للقياس ومتصلاً بما يحدث بعد الزيارة.",
  summaryPoints: ["العميل يفهمك من أول شاشة.", "يعرف ما الخطوة التالية بدون بحث.", "فريقك يعرف ماذا حدث بعد أن ضغط."],
  tocLabel: "في هذه الصفحة",
  sections: [
    {
      id: "market",
      eyebrow: "السوق تحرّك",
      title: "العميل اليوم لا يعطيك وقتاً طويلاً لتشرح نفسك.",
      paragraphs: [
        "العميل في الأردن أو السعودية غالباً يصل من هاتفه: إعلان، Google، Instagram، توصية أو رابط واتساب. وخلال ثوانٍ يبدأ يقارن بينك وبين خيارات أخرى. إذا احتاج أن يبحث عن السعر، الخدمة، طريقة الحجز أو سبب يثق فيك، فأنت تضع مجهوداً إضافياً بينه وبين القرار.",
        "الموقع لم يعد بروشوراً رقمياً. هو جزء من تجربة البيع والخدمة. طريقة ترتيب المعلومة، سرعة الصفحة، وضوح الزر، ونوعية الإثباتات الموجودة كلها تدخل في قرار العميل حتى قبل أن يتواصل معك.",
      ],
      callout: { label: "بكلمات أبسط", text: "وجود الموقع وحده لا يكفي. السؤال الحقيقي: هل يساعد العميل على أن يفهم، يثق ويتحرك؟" },
    },
    {
      id: "pressure",
      eyebrow: "أربع نقاط ضغط",
      title: "أين يبدأ الموقع بخسارة الزائر؟",
      paragraphs: ["الخسارة لا تحدث دائماً في لحظة واحدة. غالباً تبدأ من تفاصيل صغيرة تتجمع فوق بعضها حتى يصبح الخروج أسهل من الاستمرار."],
      cards: [
        { title: "الانتباه أقصر", body: "العنوان العام أو الشاشة المزدحمة تجعل العميل يستهلك أول ثوانيه في محاولة فهم ما تقدمه بدل أن يفهم قيمتك." },
        { title: "الثقة تبدأ بصرياً", body: "قبل أن يقرأ الشهادات أو التفاصيل، يأخذ انطباعاً من التنظيم، اللغة، الصور، السرعة ومدى اتساق الموقع مع مستوى عملك الحقيقي." },
        { title: "الخطوة التالية يجب أن تكون واضحة", body: "ليس كل زائر يريد واتساب. واحد يريد يحجز، آخر يريد يشوف الأعمال، وثالث يحتاج يحسب أو يختار قبل التواصل." },
        { title: "ما بعد الـCTA مهم", body: "إذا ضغط العميل ثم دخل في محادثة ضائعة أو نموذج طويل أو متابعة يدوية بدون تسجيل، المشكلة انتقلت من الموقع إلى التشغيل." },
      ],
    },
    {
      id: "invisible-loss",
      eyebrow: "الخسارة غير المرئية",
      title: "أنت ترى العملاء الذين وصلوا. لا ترى الذين كانوا قريبين ثم خرجوا.",
      paragraphs: [
        "تقارير المبيعات تخبرك بمن حجز ومن اتصل. لكنها لا تخبرك دائماً عن الشخص الذي دخل وهو مهتم، قرأ نصف الصفحة، لم يجد الإجابة أو الإجراء المناسب، ثم خرج. هذه الفرص لا تظهر كشكوى ولا كطلب ضائع؛ ببساطة تختفي.",
        "لهذا السبب لا نقيس نجاح الموقع فقط بعدد الزيارات. نريد أن نعرف من أين أتى المستخدم، ماذا شاهد، أي CTA ضغط، وأين توقف. هذه البيانات تحوّل التحسين من رأي شخصي إلى قرار عملي.",
      ],
      callout: { label: "المشكلة", text: "ليس كل شخص لم يراسلك غير مهتم. أحياناً المسار نفسه لم يعطه سبباً كافياً ليكمل." },
    },
    {
      id: "shift",
      eyebrow: "التحول المطلوب",
      title: "المطلوب ليس موقعاً أجمل فقط. المطلوب موقع يؤدي وظيفة.",
      paragraphs: ["التصميم مهم، لكن قيمته الحقيقية تظهر عندما يرتب القرار. نريد أن يعرف الزائر ماذا تقدم، لماذا يثق بك، وما الخطوة المناسبة له الآن — بدون أن يشعر أنه يقرأ عرضاً تقديمياً طويلاً."],
      pairs: [
        { before: "صفحات تعرض معلومات فقط.", after: "مسار يشرح ثم يقود إلى إجراء." },
        { before: "زر تواصل واحد لكل الزوار.", after: "CTA مختلف حسب نية المستخدم والحملة." },
        { before: "زيارات بدون فهم لما حدث.", after: "Tracking يوضح المصدر والسلوك والتحويل." },
        { before: "الحجز ينتهي برسالة.", after: "الحجز يدخل في متابعة أو CRM منظم." },
      ],
    },
    {
      id: "system",
      eyebrow: "من حضور إلى نظام",
      title: "أفضل موقع هو الذي يكمل شغلك بعد أن يخرج العميل من الصفحة.",
      paragraphs: [
        "إذا كان هدفك حجزاً، طلباً، بيع دورة أو جمع lead، فمنطقي أن يكون الموقع متصلاً بما بعد هذه الخطوة. الحجز يدخل في لوحة إدارة، الطلب يُسند، بيانات العميل تُحفظ، والفريق يعرف من يحتاج متابعة.",
        "هنا يتحول الموقع من مصروف تسويقي إلى جزء فعلي من طريقة التشغيل. وهذا لا يعني أن كل مشروع يحتاج نظاماً ضخماً؛ أحياناً أبسط تكامل صحيح يوفر ساعات من العمل اليدوي ويمنع فرصاً من الضياع.",
      ],
      flow: ["زيارة", "CTA مناسب", "حجز / طلب", "Tracking", "CRM / متابعة"],
    },
  ],
  final: { eyebrow: "الخطوة التالية", title: "قبل ما تعيد تصميم الموقع، اعرف وين فعلياً يضيع العميل.", body: "نراجع معك العرض، رحلة العميل، الـCTA، الحجز والمتابعة، ونحدد ما يحتاج تغييراً وما يمكن أن يبقى كما هو.", primary: "ابدأ التشخيص", secondary: "شاهد أعمالنا" },
};

const en: EditorialPageCopy = {
  breadcrumb: "DOMINASE / Why change?",
  title: "A website can work perfectly — and still lose opportunities.",
  lead: "The problem is not always an old or broken website. Sometimes it loads, looks acceptable, and still fails to explain the business, build trust quickly, or guide a customer to the right next step. As the market evolves, that gap quietly gets wider.",
  readTime: "About 6 minutes",
  topics: ["Customer experience", "Conversion", "Digital growth"],
  primary: { label: "Diagnose your website", href: "/diagnosis" },
  secondary: { label: "See how we work", href: "/why-us" },
  summaryLabel: "The idea in brief",
  summary: "If the market keeps evolving while your site keeps delivering the same experience, you are not really standing still. The goal is not constant redesign; it is a digital presence that stays clear, fast, measurable, and connected to what happens after the visit.",
  summaryPoints: ["Customers understand you from the first screen.", "They know the next step without searching.", "Your team knows what happened after the click."],
  tocLabel: "On this page",
  sections: [
    { id: "market", eyebrow: "The market moved", title: "Customers no longer give you much time to explain yourself.", paragraphs: ["Customers often arrive on mobile from an ad, Google, Instagram, a referral, or WhatsApp. Within seconds they compare you with alternatives. If they have to hunt for the offer, booking path, or reason to trust you, you are adding friction before the decision.", "A website is no longer a digital brochure. It is part of the sales and service experience. Hierarchy, speed, language, proof, and the action path all shape the decision before a conversation begins."], callout: { label: "In simpler terms", text: "Having a website is not enough. The question is whether it helps people understand, trust, and move." } },
    { id: "pressure", eyebrow: "Four pressure points", title: "Where does a website start losing the visitor?", paragraphs: ["Loss rarely happens in one dramatic moment. It usually comes from small points of friction stacking up until leaving is easier than continuing."], cards: [
      { title: "Attention is shorter", body: "A generic headline or crowded first screen makes people spend their first seconds decoding the business instead of seeing the value." },
      { title: "Trust starts visually", body: "Before details are read, people judge structure, language, imagery, speed, and whether the site feels consistent with the quality of the business." },
      { title: "The next step must be obvious", body: "Not every visitor wants WhatsApp. One wants to book, another wants proof, and another needs to choose or calculate before contact." },
      { title: "What happens after the CTA matters", body: "If the click leads to a lost conversation, a long form, or manual follow-up with no tracking, the friction simply moved from the website into operations." },
    ] },
    { id: "invisible-loss", eyebrow: "Invisible loss", title: "You see the customers who arrived. You rarely see the ones who almost did.", paragraphs: ["Sales reports show bookings and calls. They do not always show the person who arrived interested, read half the page, could not find the answer or action, and left. Those opportunities do not complain; they disappear.", "That is why we do not judge a site only by traffic. We want to know where users came from, what they viewed, which CTA they clicked, and where they stopped. Measurement turns improvement from opinion into a practical decision."], callout: { label: "The point", text: "Not everyone who did not contact you was uninterested. Sometimes the journey did not give them enough reason to continue." } },
    { id: "shift", eyebrow: "The required shift", title: "The goal is not a prettier website. It is a website with a job.", paragraphs: ["Design matters, but its real value is in structuring decisions. A visitor should understand what you offer, why to trust you, and which next step fits them now — without feeling like they are reading a long presentation."], pairs: [
      { before: "Pages that only display information.", after: "A path that explains and leads to action." },
      { before: "One contact button for everyone.", after: "Different CTAs by intent and campaign." },
      { before: "Visits with no useful context.", after: "Tracking that shows source, behavior, and conversion." },
      { before: "A booking ends as a message.", after: "The booking moves into structured follow-up or CRM." },
    ] },
    { id: "system", eyebrow: "From presence to system", title: "The best website keeps working after the customer leaves the page.", paragraphs: ["If the goal is a booking, request, course sale, or lead, the site should connect to what happens next. Bookings enter an admin view, requests are assigned, customer context is stored, and the team can see who needs follow-up.", "That is when a website becomes part of operations rather than a marketing expense. It does not mean every project needs a huge platform; sometimes one correct integration removes hours of manual work and prevents opportunities from disappearing."], flow: ["Visit", "Relevant CTA", "Booking / request", "Tracking", "CRM / follow-up"] },
  ],
  final: { eyebrow: "Next step", title: "Before redesigning the website, find where the customer is actually getting lost.", body: "We review the offer, journey, CTA, booking, and follow-up so you can see what genuinely needs to change — and what can stay.", primary: "Start the diagnosis", secondary: "View our work" },
};

export default function WhyChangeClient(){ return <EditorialWhyPage copy={{ ar, en }} />; }

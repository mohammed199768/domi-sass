export type LocaleCopy = { en: string; ar: string };

export type WhyChangeChartType =
  | "radial"
  | "orbit"
  | "split"
  | "flow"
  | "broken-path"
  | "hub"
  | "speed"
  | "funnel"
  | "ladder"
  | "compare"
  | "chain";

export type WhyChangeScene = {
  id: string;
  number: string;
  eyebrow: LocaleCopy;
  title: LocaleCopy;
  body: LocaleCopy;
  stat?: LocaleCopy;
  statDetail?: LocaleCopy;
  bullets?: LocaleCopy[];
  asset?: string;
  chart: WhyChangeChartType;
  layout: "opening" | "copy-left" | "visual-left" | "stat-led" | "chart-led";
};

export const whyChangeScenes: WhyChangeScene[] = [
  {
    id: "shift", number: "01",
    eyebrow: { en: "The shift", ar: "التحوّل" },
    title: { en: "The decision now starts on a screen.", ar: "القرار يبدأ الآن من شاشة." },
    body: {
      en: "Today, a customer rarely begins at the shop door. They begin with the screen in their hand.",
      ar: "اليوم، العميل لا يبدأ قراره من باب المحل. يبدأ من شاشة هاتفه.",
    },
    stat: { en: "6.04B internet users", ar: "6.04 مليار مستخدم للإنترنت" },
    statDetail: { en: "73.2% of the world population", ar: "73.2% من سكان العالم" },
    asset: "/assest/why/undraw_searching_pqji.svg", chart: "radial", layout: "opening",
  },
  {
    id: "social", number: "02",
    eyebrow: { en: "Discovery", ar: "الاكتشاف" },
    title: { en: "Social is no longer entertainment only.", ar: "السوشال ميديا لم تعد للتسلية فقط." },
    body: {
      en: "It is where people discover, compare, and begin a decision. Attention starts there—but it does not have to end there.",
      ar: "اليوم هي مكان اكتشاف، ومقارنة، وبداية قرار. الانتباه يبدأ هناك، لكنه لا يجب أن ينتهي هناك.",
    },
    stat: { en: "5.79B social media identities", ar: "5.79 مليار هوية على السوشال ميديا" },
    statDetail: { en: "94.7% of internet users use social monthly", ar: "94.7% من مستخدمي الإنترنت يستخدمونها شهريًا" },
    asset: "/assest/why/undraw_social-post_qn03.svg", chart: "orbit", layout: "copy-left",
  },
  {
    id: "generation", number: "03",
    eyebrow: { en: "New behavior", ar: "سلوك جديد" },
    title: { en: "The new generation does not wait.", ar: "الجيل الجديد لا ينتظر." },
    body: {
      en: "They search, watch, compare, and then decide—often before asking a single question.",
      ar: "هو يبحث، ويشاهد، ويقارن، ثم يقرر—غالبًا قبل أن يسأل أي سؤال.",
    },
    stat: { en: "97% of teens use the internet daily", ar: "97% من المراهقين يستخدمون الإنترنت يوميًا" },
    statDetail: { en: "4 in 10 are online almost constantly", ar: "4 من كل 10 متصلون تقريبًا باستمرار" },
    asset: "/assest/why/undraw_mobile-assistant_iifm.svg", chart: "split", layout: "visual-left",
  },
  {
    id: "social-role", number: "04",
    eyebrow: { en: "The real role", ar: "الدور الحقيقي" },
    title: { en: "Instagram and Facebook open the door.", ar: "إنستغرام وفيسبوك يفتحان الباب." },
    body: {
      en: "They matter. But their first job is often not the sale—it is moving someone from stranger to visitor.",
      ar: "هما مهمان. لكن غالبًا، دورهما الأول ليس البيع؛ بل نقل الشخص من غريب إلى زائر.",
    },
    asset: "/assest/why/undraw_share-everywhere_h2ep.svg", chart: "flow", layout: "chart-led",
  },
  {
    id: "decision", number: "05",
    eyebrow: { en: "The handoff", ar: "نقطة الانتقال" },
    title: { en: "After the click, where do they go?", ar: "بعد أن يضغط العميل على الإعلان… أين يذهب؟" },
    body: {
      en: "A click is only intent in motion. The landing place either protects that intent—or lets it leak away.",
      ar: "النقرة ليست بيعًا؛ إنها نية تتحرك. المكان الذي يصل إليه العميل إما أن يحمي هذه النية، أو يبددها.",
    },
    asset: "/assest/why/undraw_click-interaction_r772.svg", chart: "broken-path", layout: "visual-left",
  },
  {
    id: "center", number: "06",
    eyebrow: { en: "Conversion center", ar: "مركز التحويل" },
    title: { en: "A website is not a digital business card.", ar: "الموقع الإلكتروني ليس كرتًا تعريفيًا." },
    body: {
      en: "It is where the offer becomes clear, trust becomes possible, and the next step becomes easy.",
      ar: "الموقع هو مركز الثقة والتحويل: يوضح ما تقدمه، ولماذا يثق بك العميل، وما الخطوة التالية.",
    },
    asset: "/assest/why/undraw_ui-analysis_crhb.svg", chart: "hub", layout: "opening",
  },
  {
    id: "speed", number: "07",
    eyebrow: { en: "The three-second test", ar: "اختبار الثلاث ثوانٍ" },
    title: { en: "Speed kills—or sells.", ar: "السرعة قد تبيع… والبطء قد يطرد." },
    body: {
      en: "Even when someone is interested, a slow mobile experience may send them away before your message arrives.",
      ar: "حتى لو كان العميل مهتمًا، قد يطرده البطء قبل أن تصل إليه رسالتك.",
    },
    stat: { en: "53% may leave", ar: "قد يغادر 53%" },
    statDetail: { en: "when a mobile page takes over 3 seconds to load", ar: "عندما يستغرق تحميل صفحة الهاتف أكثر من 3 ثوانٍ" },
    asset: "/assest/why/undraw_progressive-web-app_c4uq.svg", chart: "speed", layout: "stat-led",
  },
  {
    id: "complexity", number: "08",
    eyebrow: { en: "Friction", ar: "الاحتكاك" },
    title: { en: "Complexity loses money.", ar: "التعقيد يخسر المال." },
    body: {
      en: "The problem is not always the product. Sometimes it is the path between interest and purchase.",
      ar: "المشكلة ليست دائمًا في المنتج. أحيانًا المشكلة في الطريق من الاهتمام إلى الشراء.",
    },
    stat: { en: "70.22% average cart abandonment", ar: "70.22% متوسط التخلي عن سلة الشراء" },
    statDetail: { en: "A benchmark, not a guarantee for every business", ar: "مؤشر مرجعي، وليس ضمانًا ينطبق على كل مشروع" },
    asset: "/assest/why/undraw_online-shopping_po8w.svg", chart: "funnel", layout: "visual-left",
  },
  {
    id: "strong-site", number: "09",
    eyebrow: { en: "A clear path", ar: "طريق واضح" },
    title: { en: "A strong website does not shout. It arranges the path.", ar: "الموقع القوي لا يصرخ. هو يرتب الطريق." },
    body: {
      en: "Conversion is not one loud button. It is a sequence of small, confident answers.",
      ar: "التحويل ليس زرًا صاخبًا. إنه سلسلة من الإجابات الواضحة التي تقلل التردد.",
    },
    bullets: [
      { en: "Understands the visitor", ar: "يفهم الزائر" },
      { en: "Builds trust", ar: "يبني الثقة" },
      { en: "Shows proof", ar: "يُظهر الدليل" },
      { en: "Reduces hesitation", ar: "يقلل التردد" },
      { en: "Makes the next step easy", ar: "يسهّل الخطوة التالية" },
    ],
    asset: "/assest/why/undraw_user-feedback_5fp8.svg", chart: "ladder", layout: "chart-led",
  },
  {
    id: "diagnostic", number: "10",
    eyebrow: { en: "The diagnostic", ar: "السؤال التشخيصي" },
    title: { en: "Before you spend more on ads, ask this.", ar: "قبل أن تصرف أكثر على الإعلانات، اسأل نفسك." },
    body: {
      en: "Can the place you send people actually turn their interest into trust, a request, and a customer?",
      ar: "هل المكان الذي ترسل إليه الناس قادر فعلًا على تحويل اهتمامهم إلى ثقة، ثم طلب، ثم عميل؟",
    },
    asset: "/assest/why/undraw_anonymous-feedback_gug3.svg", chart: "compare", layout: "copy-left",
  },
  {
    id: "final", number: "11",
    eyebrow: { en: "The system", ar: "النظام" },
    title: { en: "Attention is only the beginning.", ar: "الانتباه ليس إلا البداية." },
    body: {
      en: "Social media brings attention. A clear website turns attention into trust, trust into a request, and a request into a customer.",
      ar: "السوشال ميديا تجلب الانتباه. لكن الموقع يحوّل الانتباه إلى ثقة، والثقة إلى طلب، والطلب إلى عميل.",
    },
    chart: "chain", layout: "opening",
  },
];

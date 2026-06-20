import type { CaseStudy } from "@/features/case-studies/contracts";

export const caseStudies: Record<string, CaseStudy> = {
  "manal-alhihi": {
    slug: "manal-alhihi",
    visualTheme: "training-platform",
    cover: "/assest/resize/manal-alhihi3.png",
    seo: {
      title: "Manal Alhihi Training Platform Case Study | منصة منال الحيحي",
      description: "A bilingual case study about transforming scattered courses, files, and manual follow-up into an organized training platform.",
    },
    content: {
      en: {
        eyebrow: "Training platform case study",
        title: "Manal Alhihi: From scattered courses to an organized training platform",
        positioning: "Turning a training experience built around distributed links, files, and manual follow-up into one clear digital platform for students, courses, attendance, and content.",
        before: {
          title: "Training was spread across too many places.",
          intro: "The learning experience depended on disconnected tools and repeated manual coordination.",
          points: ["Scattered files", "Separate links", "Google Drive", "Manual follow-up", "Unclear attendance", "Message-dependent students", "Administrative burden"],
        },
        transformation: {
          title: "The scattered pieces became one system.",
          body: "Files, links, student records, and attendance signals were reorganized around a central training platform.",
        },
        after: {
          title: "One structured place for learning and administration.",
          intro: "The platform gives students a clearer path and gives administration a calmer operating view.",
          points: ["Student accounts", "Organized courses", "Attendance tracking", "Course trailers", "Ordered content", "Clearer administration"],
        },
        storyboard: {
          title: "A learning journey with visible structure.",
          intro: "The interface carries the same organization from the platform entrance into course discovery and content detail.",
          screenshots: [
            { src: "/assest/resize/manal-alhihi3.png", alt: "Manal Alhihi training platform landing interface", caption: "Platform entrance" },
            { src: "/assest/resize/manal-alhihi1.png", alt: "Organized course content in the Manal Alhihi platform", caption: "Course structure" },
            { src: "/assest/resize/manal-alhihi.png", alt: "Manal Alhihi platform interface overview", caption: "Student experience" },
          ],
        },
        featuresTitle: "Six modules, one training flow.",
        featuresIntro: "Each module solves a specific operational need while remaining connected to the complete learning journey.",
        features: [
          { title: "Student Accounts", description: "A clear personal entry point for every learner." },
          { title: "Course Management", description: "Courses gathered and managed in an ordered structure." },
          { title: "Attendance Tracking", description: "Attendance status visible without manual guesswork." },
          { title: "Course Trailers", description: "A focused preview before students enter a course." },
          { title: "Content Ordering", description: "Learning material presented in a deliberate sequence." },
          { title: "Admin Clarity", description: "A calmer view of students, courses, and follow-up." },
        ],
        result: "The result was not simply a better-looking interface, but a training experience that is clearer to use, manage, and follow.",
        cta: "Start a focused digital product",
        backHome: "Back to portfolio",
        chapters: ["Introduction", "Before", "Transformation", "After", "Storyboard", "System", "Result"],
      },
      ar: {
        eyebrow: "دراسة حالة لمنصة تدريب",
        title: "المدربة منال الحيحي: من دورات مبعثرة إلى منصة تدريب منظمة",
        positioning: "تحويل تجربة التدريب من روابط وملفات موزعة ومتابعة يدوية إلى منصة رقمية تجمع الطلاب، الدورات، الحضور، والمحتوى في مكان واحد واضح.",
        before: {
          title: "كانت تجربة التدريب موزعة بين أماكن كثيرة.",
          intro: "اعتمد مسار التعلم على أدوات منفصلة وتنسيق يدوي متكرر.",
          points: ["ملفات مبعثرة", "روابط متفرقة", "Google Drive", "متابعة يدوية", "حضور غير واضح", "اعتماد الطلاب على الرسائل", "عبء إداري"],
        },
        transformation: {
          title: "تحولت الأجزاء المبعثرة إلى نظام واحد.",
          body: "أعيد تنظيم الملفات والروابط وسجلات الطلاب وإشارات الحضور حول منصة تدريب مركزية.",
        },
        after: {
          title: "مكان منظم واحد للتعلم والإدارة.",
          intro: "تمنح المنصة الطلاب مسارًا أوضح، وتمنح الإدارة رؤية تشغيلية أكثر هدوءًا.",
          points: ["حسابات للطلاب", "دورات منظمة", "تتبع الحضور", "إعلانات تشويقية للدورات", "محتوى مرتب", "إدارة أكثر وضوحًا"],
        },
        storyboard: {
          title: "رحلة تعلم ببنية مرئية واضحة.",
          intro: "تحمل الواجهة التنظيم نفسه من مدخل المنصة إلى استكشاف الدورات وتفاصيل المحتوى.",
          screenshots: [
            { src: "/assest/resize/manal-alhihi3.png", alt: "واجهة الدخول إلى منصة تدريب منال الحيحي", caption: "مدخل المنصة" },
            { src: "/assest/resize/manal-alhihi1.png", alt: "محتوى دورات منظم داخل منصة منال الحيحي", caption: "هيكلة الدورات" },
            { src: "/assest/resize/manal-alhihi.png", alt: "نظرة عامة على واجهة منصة منال الحيحي", caption: "تجربة الطالب" },
          ],
        },
        featuresTitle: "ست وحدات ضمن مسار تدريب واحد.",
        featuresIntro: "تعالج كل وحدة حاجة تشغيلية محددة، وتبقى متصلة برحلة التعلم الكاملة.",
        features: [
          { title: "حسابات الطلاب", description: "مدخل شخصي واضح لكل طالب." },
          { title: "إدارة الدورات", description: "جمع الدورات وإدارتها ضمن هيكل مرتب." },
          { title: "تتبع الحضور", description: "حالة حضور واضحة دون تخمين يدوي." },
          { title: "إعلانات الدورات", description: "معاينة مركزة قبل دخول الطالب إلى الدورة." },
          { title: "ترتيب المحتوى", description: "عرض المواد التعليمية ضمن تسلسل مقصود." },
          { title: "وضوح الإدارة", description: "رؤية أهدأ للطلاب والدورات والمتابعة." },
        ],
        result: "النتيجة لم تكن مجرد واجهة أجمل، بل تجربة تدريب أوضح وأسهل في الإدارة والمتابعة.",
        cta: "ابدأ بناء منتج رقمي واضح",
        backHome: "العودة إلى معرض الأعمال",
        chapters: ["المقدمة", "قبل", "التحول", "بعد", "المشاهد", "النظام", "النتيجة"],
      },
    },
  },
  "qasr-alfarah": {
    slug: "qasr-alfarah",
    visualTheme: "wedding-booking",
    cover: "/assest/resize/qaser-alfarah.png",
    seo: {
      title: "Qasr Al-Farah Wedding Hall Booking Case Study | قصر الفرح",
      description: "A bilingual case study about transforming paper-based wedding hall bookings into an organized booking, invitation, RSVP, and digital memory experience.",
    },
    content: {
      en: {
        eyebrow: "Wedding hall booking case study",
        title: "Qasr Al-Farah: From a paper agenda to a digital booking and memory experience",
        positioning: "Transforming the wedding hall experience from manual follow-up and repeated phone calls into a digital system that organizes bookings, invitations, and guest interaction after the event.",
        before: {
          title: "Before the system: details were scattered and pressure was daily.",
          intro: "Booking relied on a paper agenda, phone calls, and manual follow-up. Every request demanded close attention, while a delayed response could confuse a client or let an opportunity slip away.",
          points: [
            "A paper agenda that was difficult to search quickly.",
            "Repeated calls to confirm the same details.",
            "A booking could be forgotten or an interested client answered too late.",
            "Bride, groom, and event details were difficult to track.",
            "A basic website did not explain the value of the experience.",
            "Visitors could see the hall but had no clear path to book it.",
          ],
          microcopy: "When every booking hangs between paper notes and phone calls.",
        },
        transformation: {
          title: "A booking request became a connected event journey.",
          body: "Calendar blocks, event details, invitation links, RSVP responses, and guest messages settle into one operational flow.",
        },
        after: {
          title: "After the system: a clearer journey from the first visit to the last memory.",
          intro: "Booking became part of an organized digital experience. Clients understand the next step and submit a request, while the team manages details in one place. After the event, guest interaction becomes a digital book of messages and memories.",
          points: [
            "A clear booking flow for receiving requests.",
            "Event data organized instead of scattered across paper and calls.",
            "A consistent experience across phone, tablet, and laptop.",
            "Personal invitation links for the bride and groom.",
            "Clearer RSVP and guest participation.",
            "A digital memory book for messages and moments.",
          ],
          microcopy: "From exhausting manual follow-up to a booking experience the team can manage with confidence.",
        },
        storyboard: {
          title: "The journey continues beyond the booking.",
          intro: "The system connects the operational booking path with the public hall experience, responsive access, and a lasting guest-memory layer.",
          screenshots: [
            { src: "/assest/resize/qaser-alfarah3.png", presentation: "concept", alt: "Paper agenda and phone calls for wedding hall bookings before the system.", caption: "Before the system: bookings scattered between paper and phone calls." },
            { src: "/assest/resize/qaser-alfarah3.png", alt: "Digital wedding hall booking system interface.", caption: "A booking interface that clarifies the request and gathers details from the start." },
            { src: "/assest/resize/qaser-alfarah2.png", presentation: "responsive", alt: "Qasr Al-Farah website displayed on phone, tablet, and laptop.", caption: "The same experience appears clearly across phone, tablet, and laptop." },
            { src: "/assest/resize/qaser-alfarah1.png", alt: "Digital wedding memory book with guest messages for bride and groom.", caption: "A digital book that preserves guest messages and event memories." },
          ],
        },
        featuresTitle: "From booking request to guest memory.",
        featuresIntro: "Six connected modules carry the experience from operational clarity into invitation and participation.",
        features: [
          { title: "Clear Booking System", description: "A direct path for submitting and understanding booking requests." },
          { title: "Booking Dashboard", description: "One organized view for requests and event details." },
          { title: "Custom Invitations", description: "Dedicated invitation pages for the bride and groom." },
          { title: "RSVP & Guest Posts", description: "A clearer way for guests to respond and participate." },
          { title: "Digital Memory Book", description: "A lasting home for guest messages and event memories." },
          { title: "Responsive Experience", description: "The same clear journey across phone, tablet, and laptop." },
        ],
        result: "The result was not simply a better-looking interface, but a clearer experience for booking and follow-up. Clients can understand the next step, while the team has a more organized path for requests, event details, and guest interaction.",
        cta: "See how the hall moved from manual follow-up to a usable digital experience",
        backHome: "Back to portfolio",
        chapters: ["Introduction", "Before", "Booking flow", "After", "Storyboard", "System", "Result"],
      },
      ar: {
        eyebrow: "دراسة حالة لنظام حجز قاعة أفراح",
        title: "قصر الفرح: من أجندة ورقية إلى تجربة حجز وذاكرة رقمية",
        positioning: "تحويل تجربة قاعة الأفراح من متابعة يدوية ومكالمات متكررة إلى نظام رقمي ينظّم الحجز، الدعوات، وتفاعل الضيوف بعد المناسبة.",
        before: {
          title: "قبل النظام: التفاصيل موزعة والضغط يومي",
          intro: "كانت تجربة الحجز تعتمد على الأجندة الورقية، المكالمات، والمتابعة اليدوية. كل حجز يحتاج انتباهًا عاليًا، وكل تأخير بالرد قد يربك العميل أو يفتح المجال لضياع فرصة.",
          points: [
            "أجندة ورقية يصعب الرجوع لها بسرعة.",
            "مكالمات متكررة لتأكيد نفس التفاصيل.",
            "احتمال نسيان حجز أو تأخير الرد على عميل مهتم.",
            "صعوبة متابعة بيانات العريس والعروس والمناسبة.",
            "موقع بسيط لا يشرح قيمة التجربة.",
            "الزائر يرى القاعة، لكن لا يجد مسارًا واضحًا للحجز.",
          ],
          microcopy: "عندما يصبح كل حجز معلّقًا بين الورق والمكالمات.",
        },
        transformation: {
          title: "تحول طلب الحجز إلى رحلة مناسبة مترابطة.",
          body: "تنتظم مواعيد التقويم، تفاصيل المناسبة، روابط الدعوة، ردود الحضور، ورسائل الضيوف ضمن مسار تشغيلي واحد.",
        },
        after: {
          title: "بعد النظام: رحلة أوضح من أول زيارة إلى آخر ذكرى",
          intro: "أصبح الحجز جزءًا من تجربة رقمية منظمة. العميل يفهم الخطوة التالية، يرسل طلبه، والإدارة تتابع التفاصيل من مكان واحد. وبعد المناسبة، يتحول التفاعل إلى دفتر رقمي يحفظ رسائل الضيوف وذكرياتهم.",
          points: [
            "مسار حجز واضح لاستقبال طلبات الحجز.",
            "تنظيم بيانات المناسبة بدل تشتتها بين الورق والمكالمات.",
            "تجربة متوافقة مع الهاتف، التابلت، واللابتوب.",
            "روابط دعوة مخصصة للعريس والعروس.",
            "تأكيد حضور ومشاركة ضيوف بطريقة أوضح.",
            "دفتر ذكريات رقمي للرسائل والذكريات.",
          ],
          microcopy: "من متابعة يدوية مرهقة إلى تجربة حجز يمكن إدارتها بثقة.",
        },
        storyboard: {
          title: "رحلة تستمر بعد اكتمال الحجز.",
          intro: "يربط النظام بين مسار الحجز التشغيلي، حضور القاعة الرقمي، الوصول المتجاوب، وطبقة ذكريات تبقى بعد المناسبة.",
          screenshots: [
            { src: "/assest/resize/qaser-alfarah3.png", presentation: "concept", alt: "أجندة ورقية ومكالمات لحجوزات قاعة أفراح قبل النظام.", caption: "قبل النظام: حجوزات موزعة بين الورق والمكالمات." },
            { src: "/assest/resize/qaser-alfarah3.png", alt: "واجهة نظام حجز قاعة أفراح رقمية.", caption: "واجهة حجز توضّح الطلب وتجمع التفاصيل من البداية." },
            { src: "/assest/resize/qaser-alfarah2.png", presentation: "responsive", alt: "موقع قصر الفرح معروض على هاتف وتابلت ولابتوب.", caption: "نفس التجربة تظهر بوضوح على الهاتف، التابلت، واللابتوب." },
            { src: "/assest/resize/qaser-alfarah1.png", alt: "دفتر ذكريات رقمي للعريس والعروس ورسائل الضيوف.", caption: "دفتر رقمي يحفظ رسائل الضيوف وذكريات المناسبة." },
          ],
        },
        featuresTitle: "من طلب الحجز إلى ذاكرة الضيوف.",
        featuresIntro: "ست وحدات مترابطة تنقل التجربة من وضوح التشغيل إلى الدعوة والمشاركة.",
        features: [
          { title: "نظام حجز واضح", description: "مسار مباشر لإرسال طلب الحجز وفهمه." },
          { title: "لوحة إدارة للحجوزات", description: "رؤية منظمة للطلبات وتفاصيل المناسبة." },
          { title: "صفحات دعوة مخصصة", description: "صفحات دعوة خاصة للعريس والعروس." },
          { title: "تأكيد ومشاركة الضيوف", description: "طريقة أوضح لرد الضيوف ومشاركتهم." },
          { title: "دفتر ذكريات رقمي", description: "مكان دائم لرسائل الضيوف وذكريات المناسبة." },
          { title: "تجربة متجاوبة", description: "رحلة واضحة نفسها على الهاتف والتابلت واللابتوب." },
        ],
        result: "النتيجة لم تكن مجرد واجهة أجمل، بل تجربة أوضح للحجز والمتابعة. أصبح بإمكان العميل فهم الخطوة التالية، وأصبح لدى الإدارة مسار أكثر تنظيمًا للتعامل مع الطلبات، بيانات المناسبة، وتفاعل الضيوف.",
        cta: "شاهد كيف تحولت القاعة من متابعة يدوية إلى تجربة رقمية قابلة للاستخدام",
        backHome: "العودة إلى معرض الأعمال",
        chapters: ["المقدمة", "قبل", "مسار الحجز", "بعد", "المشاهد", "النظام", "النتيجة"],
      },
    },
  },
  "curevie": {
    slug: "curevie",
    visualTheme: "healthcare-coordination",
    cover: "/assest/curevie3.jpeg",
    seo: {
      title: "Curevie Home Healthcare Case Study | كيورفي",
      description: "A case study transforming scattered home healthcare services into a clear, trustworthy, and coordinated digital experience.",
    },
    content: {
      en: {
        eyebrow: "Home healthcare case study",
        title: "Curevie: From unclear care requests to an organized home healthcare experience",
        positioning: "Transforming the home healthcare experience into a clear digital presence that helps the family understand services, choose the type of care, and communicate with greater confidence.",
        before: {
          title: "Before the platform: The family seeks care... but the path is unclear.",
          intro: "When a family member needs home care, it is not just a medical question. There is anxiety, research, comparison, and repeated communication to understand the appropriate service. Without a clear presentation of services and an organized communication path, the experience becomes exhausting for the family before care even begins.",
          points: [
            "Difficulty understanding the right service from the first visit.",
            "Information scattered across calls, messages, and repeated questions.",
            "The need to reassure the family before deciding to request care.",
            "Medical services presented in a dry or unclear way.",
            "No visual path explaining how care reaches the home.",
            "Difficulty building trust from the site alone if the experience is not clear."
          ],
          microcopy: "When the family looks for care, clarity becomes part of reassurance.",
        },
        transformation: {
          title: "The experience became a more organized digital presence.",
          body: "It explains home services in clear language, presents care in a professional and calm manner, and helps the family understand the next step without confusion.",
        },
        after: {
          title: "After the digital experience: Clearer services and a calmer care path.",
          intro: "The experience transformed into an organized digital presence. Services are explained simply, care is shown professionally, and the family is guided to the next step clearly and calmly.",
          points: [
            "Home healthcare services presented more clearly.",
            "A message organized around trust, comfort, and dignity.",
            "Clearer types of care like medical visits, nursing, and home care.",
            "A responsive experience across phone, tablet, and laptop.",
            "A calm medical visual language instead of random service displays.",
            "A clearer communication path for the family when support is needed."
          ],
          microcopy: "From confusion to a clear path toward home care.",
        },
        storyboard: {
          title: "A journey built on clarity and trust.",
          intro: "The interface reflects a professional healthcare experience from the first service exploration to the final request.",
          screenshots: [
            { src: "/assest/curevie3.jpeg", alt: "Curevie home healthcare service presentation", caption: "Clarity concept and service presentation" },
            { src: "/assest/curevie.jpeg", alt: "Visual tone and medical identity", caption: "A softer medical identity" },
            { src: "/assest/curevie2.jpeg", alt: "Service detail and care path", caption: "Service detail and care path" },
            { src: "/assest/curevie4.jpeg", alt: "Responsive device view for Curevie", caption: "A flow built around trust across devices" },
          ],
        },
        featuresTitle: "Six features, one clear goal.",
        featuresIntro: "Each feature is designed to reduce friction and build trust, guiding the family smoothly through the home healthcare process.",
        features: [
          { title: "Service Clarity", description: "Clear explanation of each home healthcare service." },
          { title: "Home Care Experience", description: "A focused journey around receiving care at home." },
          { title: "Calm Medical Presentation", description: "A soothing and professional visual tone." },
          { title: "Responsive Design", description: "Accessible on any device for family convenience." },
          { title: "Trust Building", description: "Reassuring language and professional design." },
          { title: "Clearer Communication Path", description: "A straightforward way to request and coordinate care." },
        ],
        result: "The result was not simply a better-looking website, but a digital experience that helps the family understand the service, feel confident, and take the step to communicate clearly when home care is needed.",
        cta: "See how home healthcare services became a clearer, more reassuring digital experience",
        backHome: "Back to portfolio",
        chapters: ["Introduction", "Before", "Transformation", "After", "Storyboard", "System", "Result"],
      },
      ar: {
        eyebrow: "دراسة حالة للرعاية الصحية المنزلية",
        title: "Curevie: من طلب رعاية غير واضح إلى تجربة صحية منزلية أكثر تنظيمًا",
        positioning: "تحويل تجربة الرعاية الصحية المنزلية إلى حضور رقمي واضح يساعد العائلة على فهم الخدمات، اختيار نوع الرعاية، والتواصل بثقة أكبر.",
        before: {
          title: "قبل المنصة: العائلة تبحث عن رعاية… لكن الطريق غير واضح.",
          intro: "عندما يحتاج أحد أفراد العائلة إلى رعاية في المنزل، لا يكون السؤال طبيًا فقط. هناك قلق، بحث، مقارنة، واتصال متكرر لفهم الخدمة المناسبة. بدون عرض واضح للخدمات ومسار تواصل منظم، تصبح التجربة مرهقة للعائلة قبل أن تبدأ الرعاية.",
          points: [
            "صعوبة فهم نوع الخدمة المناسبة من أول زيارة.",
            "تشتت المعلومات بين مكالمات ورسائل وأسئلة متكررة.",
            "الحاجة إلى طمأنة العائلة قبل اتخاذ قرار طلب الرعاية.",
            "عرض الخدمات الطبية بطريقة قد تبدو جافة أو غير واضحة.",
            "عدم وجود مسار بصري يشرح كيف تصل الرعاية إلى البيت.",
            "صعوبة بناء الثقة من الموقع وحده إذا لم تكن التجربة واضحة."
          ],
          microcopy: "حين تبحث العائلة عن رعاية، الوضوح يصبح جزءًا من الطمأنينة.",
        },
        transformation: {
          title: "التحول إلى حضور رقمي أكثر تنظيمًا.",
          body: "يشرح الخدمات المنزلية بلغة واضحة، يعرض الرعاية بطريقة مهنية وهادئة، ويساعد العائلة على فهم الخطوة التالية دون ارتباك.",
        },
        after: {
          title: "بعد التجربة الرقمية: خدمات أوضح ومسار رعاية أكثر هدوءًا.",
          intro: "تحولت التجربة إلى حضور رقمي أكثر تنظيمًا، يشرح الخدمات المنزلية بلغة واضحة، يعرض الرعاية بطريقة مهنية وهادئة، ويساعد العائلة على فهم الخطوة التالية دون ارتباك.",
          points: [
            "عرض الخدمات الصحية المنزلية بطريقة أوضح.",
            "تنظيم الرسالة حول الثقة، الراحة، والكرامة.",
            "توضيح أنواع الرعاية مثل الزيارات الطبية والتمريض والرعاية المنزلية.",
            "تجربة متجاوبة على الهاتف والتابلت واللابتوب.",
            "لغة بصرية طبية هادئة بدل العرض العشوائي للخدمات.",
            "مسار تواصل أوضح للعائلة عند الحاجة إلى الدعم."
          ],
          microcopy: "من الارتباك إلى مسار واضح للرعاية المنزلية.",
        },
        storyboard: {
          title: "رحلة مبنية على الوضوح والثقة.",
          intro: "تعكس الواجهة تجربة رعاية صحية مهنية من أول استكشاف للخدمة إلى الطلب النهائي.",
          screenshots: [
            { src: "/assest/curevie3.jpeg", alt: "عرض خدمات الرعاية الصحية المنزلية Curevie", caption: "مفهوم الوضوح وعرض الخدمة" },
            { src: "/assest/curevie.jpeg", alt: "النبرة البصرية والهوية الطبية", caption: "هوية طبية أكثر إنسانية" },
            { src: "/assest/curevie2.jpeg", alt: "تفاصيل الخدمة ومسار الرعاية", caption: "تفاصيل الخدمة ومسار الرعاية" },
            { src: "/assest/curevie4.jpeg", alt: "عرض متجاوب عبر الأجهزة لـ Curevie", caption: "مسار مبني حول الثقة عبر الأجهزة" },
          ],
        },
        featuresTitle: "ست مميزات، هدف واحد واضح.",
        featuresIntro: "صُممت كل ميزة لتقليل الاحتكاك وبناء الثقة، لتوجيه العائلة بسلاسة خلال عملية الرعاية الصحية المنزلية.",
        features: [
          { title: "وضوح الخدمات", description: "شرح واضح لكل خدمة من خدمات الرعاية المنزلية." },
          { title: "تجربة رعاية منزلية", description: "رحلة مركزة حول تلقي الرعاية في المنزل." },
          { title: "عرض طبي هادئ", description: "نبرة بصرية مهدئة واحترافية." },
          { title: "تصميم متجاوب", description: "متاح على أي جهاز لراحة العائلة." },
          { title: "بناء الثقة", description: "لغة مطمئنة وتصميم احترافي." },
          { title: "مسار تواصل أوضح", description: "طريقة مباشرة لطلب وتنسيق الرعاية." },
        ],
        result: "النتيجة لم تكن مجرد موقع أجمل، بل تجربة رقمية تساعد العائلة على فهم الخدمة، الشعور بالثقة، واتخاذ خطوة التواصل بشكل أوضح عند الحاجة إلى رعاية منزلية.",
        cta: "شاهد كيف تحولت خدمات الرعاية المنزلية إلى تجربة رقمية أوضح وأكثر طمأنينة",
        backHome: "العودة إلى معرض الأعمال",
        chapters: ["المقدمة", "قبل", "التحول", "بعد", "المشاهد", "النظام", "النتيجة"],
      },
    },
  },
  "horvath-survey": {
    slug: "horvath-survey",
    visualTheme: "ai-readiness-index",
    cover: "/assest/resize/horvath1.jpg",
    seo: {
      title: "HORVÁTH AI Readiness Index Case Study",
      description: "Transforming a broad AI readiness question into a structured digital assessment that captures lead data, measures current vs target maturity, calculates gaps, and produces strategic recommendations.",
    },
    content: {
      en: {
        eyebrow: "AI Readiness Assessment Platform",
        title: "HORVÁTH: From scattered AI readiness assessment to a clear measurement platform",
        positioning: "Building an AI Readiness Index platform that measures organizational readiness across strategic and operational dimensions, transforming answers into visual results and prioritized recommendations.",
        before: {
          title: "Before the system: AI readiness was a broad question that was hard to measure.",
          intro: "Before the system, AI readiness depended on general discussions, personal estimates, or disconnected questions. The problem was not lack of interest in AI, but difficulty turning that interest into a practical picture: where are we now, where do we want to go, and what gap should be addressed first?",
          points: [
            "Difficulty measuring AI readiness clearly.",
            "Lack of precise separation between current state and future target.",
            "Dimensions scattered across strategy, data, tech, governance, value, and capabilities.",
            "Difficulty knowing which aspect needs intervention first.",
            "Relying on impression instead of comparative indicators.",
            "Absence of a clear path moving from answer to result to recommendation.",
            "Difficulty turning assessment into organized lead generation without annoying the user."
          ],
        },
        transformation: {
          title: "The experience became an integrated digital assessment platform.",
          body: "The user starts with a lead-capture landing step, continues through structured dimensions using Current and Target values, and then sees visual results including readiness score, gaps, top topics, and strategic recommendations.",
        },
        after: {
          title: "After the system: A platform that measures, compares, and turns answers into clearer decisions.",
          intro: "The assessment transformed into a clear digital experience, broken into understandable dimensions, guiding the user to a concrete result.",
          points: [
            "Converting AI readiness assessment into a clear digital experience.",
            "Breaking assessment into understandable, measurable dimensions.",
            "Using a Double Slider system to measure current vs target state.",
            "Fixed sidebar clarifying user progress within the survey.",
            "Dynamic routing for each dimension instead of repeated pages.",
            "Saving user answers locally during navigation.",
            "Preventing access to results before assessment completion.",
            "Displaying results via Score, Charts, Top Topics, and Recommendations.",
            "Turning the platform into a lead generation tool, not just a survey."
          ],
        },
        storyboard: {
          title: "A journey moving from capture to assessment to strategy.",
          intro: "The visual interface supports the user through data entry to dynamic readiness dashboard.",
          screenshots: [
            { src: "/assest/resize/horvath1.jpg", alt: "HORVÁTH landing page and lead capture", caption: "Landing Page & Lead Capture" },
            { src: "/assest/resize/horvath.jpg", alt: "HORVÁTH survey experience and sidebar navigation", caption: "Survey Experience & Sidebar" },
          ],
        },
        featuresTitle: "A structured frontend system.",
        featuresIntro: "The application separates starting pages, survey routing, and results, driven entirely by robust state management and JSON content.",
        features: [
          { title: "Lead Capture", description: "Secures user contact before the assessment." },
          { title: "Dynamic Routing", description: "Efficiently navigates the survey without redundant pages." },
          { title: "Double Slider", description: "Captures both current and target values simultaneously." },
          { title: "State Persistence", description: "Maintains user progress throughout the multi-step journey." },
          { title: "Results Dashboard", description: "Visualizes gaps and calculates readiness scores." },
          { title: "Recommendations", description: "Generates strategic advice based on answers." },
        ],
        result: "The result was not just a survey page, but an integrated assessment system that transforms user answers into a clearer reading of the organization's AI readiness.",
        businessValue: {
          platformOwner: {
            title: "For the platform owner",
            points: [
              "Converting visitors to leads from the start.",
              "Providing an interactive tool that gives value before selling.",
              "Opening a commercial conversation based on a tangible result.",
              "Building an advisory impression instead of a standard marketing page."
            ]
          },
          organization: {
            title: "For the organization",
            points: [
              "Clearer understanding of their AI readiness level.",
              "Visualizing the gap between current state and ambition.",
              "Identifying which areas need intervention first.",
              "Receiving initial recommendations ready for consulting discussion."
            ]
          }
        },
        technicalStory: {
          title: "Technical Execution",
          body: "Built as a structured frontend system using Next.js App Router. Starting page, survey, results, and recommendations are separated. Questions, dimensions, narratives, and recommendations are data-driven via JSON. Calculations convert answers into averages, gaps, priority topics, and executive readings. Zustand preserves user progress during the multi-step experience."
        },
        assessmentDimensions: [
          { title: "Data", description: "Data foundations" },
          { title: "Capabilities", description: "Team skills" },
          { title: "Strategy", description: "AI alignment" },
          { title: "Governance", description: "Ethics and rules" },
          { title: "Value", description: "Business impact" },
          { title: "Technology", description: "Infrastructure" }
        ],
        cta: "Discover how AI readiness transforms into a clear assessment",
        backHome: "Back to portfolio",
        chapters: ["Introduction", "Before", "Transformation", "After", "Storyboard", "System", "Result"],
      },
      ar: {
        eyebrow: "منصة تقييم الجاهزية",
        title: "HORVÁTH: من تقييم مبعثر لجاهزية الذكاء الاصطناعي إلى منصة قياس واضحة",
        positioning: "بناء منصة AI Readiness Index تقيس جاهزية المؤسسة عبر محاور استراتيجية وتشغيلية، ثم تحول الإجابات إلى نتائج مرئية وتوصيات مرتبة حسب الأولوية.",
        before: {
          title: "قبل النظام: جاهزية الذكاء الاصطناعي كانت سؤالًا واسعًا يصعب قياسه",
          intro: "قبل النظام، اعتمدت جاهزية الذكاء الاصطناعي على النقاشات العامة، التقديرات الشخصية، أو أسئلة غير مترابطة. المشكلة لم تكن في قلة الاهتمام بالذكاء الاصطناعي، بل في صعوبة تحويل هذا الاهتمام إلى صورة عملية: أين نحن الآن، إلى أين نريد الوصول، وما هي الفجوة التي يجب معالجتها أولًا؟",
          points: [
            "صعوبة قياس جاهزية الذكاء الاصطناعي بطريقة واضحة.",
            "عدم وجود فصل دقيق بين الوضع الحالي والهدف المستقبلي.",
            "تشتت المحاور بين الاستراتيجية، البيانات، التقنية، الحوكمة، القيمة، والقدرات.",
            "صعوبة معرفة أي جانب يحتاج تدخلًا أولًا.",
            "الاعتماد على الانطباع بدل المؤشرات المقارنة.",
            "غياب مسار واضح ينتقل من الإجابة إلى النتيجة إلى التوصية.",
            "صعوبة تحويل التقييم إلى Lead Generation منظم دون إزعاج المستخدم."
          ],
        },
        transformation: {
          title: "منصة تقييم استراتيجية متكاملة.",
          body: "تحول التقييم إلى منصة متكاملة. يبدأ المستخدم بصفحة التقاط البيانات (Lead Capture)، يمر عبر محاور منظمة باستخدام أشرطة تمرير مزدوجة لقياس الوضع الحالي والهدف، ثم يصل لنتائج مرئية دقيقة.",
        },
        after: {
          title: "بعد النظام: منصة تقيس، تقارن، وتحوّل الإجابات إلى قرار أوضح",
          intro: "تحولت الفكرة إلى منصة تقييم رقمية متكاملة. يبدأ المستخدم بخطوة تسجيل البيانات، يكمل عبر محاور هيكلية، ويجيب عن كل سؤال باستخدام قيم (الحالي) و(الهدف)، ليحصل على نتائج وتوصيات.",
          points: [
            "تحويل تقييم AI Readiness إلى تجربة رقمية واضحة.",
            "تقسيم التقييم إلى محاور قابلة للفهم والقياس.",
            "استخدام نظام Double Slider لقياس الوضع الحالي مقابل الهدف.",
            "Sidebar ثابت يوضح تقدم المستخدم داخل الاستبيان.",
            "مسارات ديناميكية لكل محور بدل بناء صفحات مكررة.",
            "حفظ إجابات المستخدم محليًا أثناء التنقل.",
            "منع الوصول للنتائج قبل اكتمال التقييم.",
            "عرض النتائج من خلال Score، Charts، Top Topics، وتوصيات.",
            "تحويل المنصة إلى أداة جذب عملاء محتملين وليست مجرد استبيان."
          ],
        },
        storyboard: {
          title: "رحلة تنتقل من الإجابة إلى القرار.",
          intro: "تدعم الواجهة المرئية المستخدم من مرحلة تسجيل البيانات وحتى لوحة قياس الجاهزية الديناميكية.",
          screenshots: [
            { src: "/assest/resize/horvath1.jpg", alt: "صفحة هبوط HORVÁTH وجمع البيانات", caption: "صفحة الهبوط وجمع البيانات" },
            { src: "/assest/resize/horvath.jpg", alt: "تجربة الاستبيان من HORVÁTH والتنقل الجانبي", caption: "تجربة الاستبيان والتنقل" },
          ],
        },
        featuresTitle: "نظام واجهة أمامية مهيكل.",
        featuresIntro: "يفصل التطبيق بين صفحات البداية، مسار الاستبيان، والنتائج، ويعتمد بالكامل على إدارة الحالة ومحتوى JSON.",
        features: [
          { title: "تسجيل البيانات", description: "تأمين بيانات اتصال المستخدم قبل التقييم." },
          { title: "توجيه ديناميكي", description: "التنقل بكفاءة في الاستبيان دون صفحات مكررة." },
          { title: "شريط تمرير مزدوج", description: "التقاط القيم الحالية والمستهدفة في وقت واحد." },
          { title: "حفظ الحالة", description: "الاحتفاظ بتقدم المستخدم خلال التجربة." },
          { title: "لوحة النتائج", description: "تصور الفجوات وحساب درجات الجاهزية." },
          { title: "التوصيات", description: "توليد نصائح استراتيجية بناءً على الإجابات." },
        ],
        result: "النتيجة لم تكن مجرد صفحة استبيان، بل نظام تقييم متكامل يحوّل إجابات المستخدم إلى قراءة أوضح لجاهزية المؤسسة للذكاء الاصطناعي.",
        businessValue: {
          platformOwner: {
            title: "لمالك المنصة",
            points: [
              "تحويل الزائر إلى Lead من بداية التجربة.",
              "تقديم أداة تفاعلية تعطي قيمة قبل البيع.",
              "فتح محادثة تجارية بناءً على نتيجة ملموسة.",
              "بناء انطباع استشاري بدل صفحة تسويقية عادية."
            ]
          },
          organization: {
            title: "للمؤسسة",
            points: [
              "فهم أوضح لمستوى جاهزية الذكاء الاصطناعي.",
              "رؤية الفجوات بين الوضع الحالي والطموح.",
              "تحديد المجالات التي تحتاج تدخلًا أولًا.",
              "الحصول على توصيات أولية قابلة للنقاش مع فريق استشاري."
            ]
          }
        },
        technicalStory: {
          title: "القصة التقنية",
          body: "تم البناء كنظام واجهة أمامية مهيكل باستخدام Next.js App Router. تم فصل صفحة البداية، الاستبيان، النتائج، والتوصيات. الأسئلة، المحاور، النصوص، والتوصيات تعمل من خلال JSON. تقوم العمليات الحسابية بتحويل الإجابات إلى متوسطات، فجوات، مواضيع ذات أولوية، وقراءات تنفيذية. Zustand يحفظ تقدم المستخدم أثناء التجربة."
        },
        assessmentDimensions: [
          { title: "Data", description: "أساسيات البيانات" },
          { title: "Capabilities", description: "مهارات الفريق" },
          { title: "Strategy", description: "محاذاة الذكاء الاصطناعي" },
          { title: "Governance", description: "الأخلاقيات والقواعد" },
          { title: "Value", description: "التأثير على الأعمال" },
          { title: "Technology", description: "البنية التحتية" }
        ],
        cta: "اكتشف كيف تتحول الجاهزية إلى تقييم واضح",
        backHome: "العودة إلى معرض الأعمال",
        chapters: ["المقدمة", "قبل", "التحول", "بعد", "المشاهد", "النظام", "النتيجة"],
      },
    },
  },
};

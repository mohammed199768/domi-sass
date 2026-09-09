import { CONTACT_CHANNELS } from "@/constants/contact";
import type { Language, LegalCopy } from "@/features/legal/LegalPageClient";

export const TERMS_COPY: Record<Language, LegalCopy> = {
  ar: {
    eyebrow: "DOMINASE / شروط الاستخدام",
    title: "شروط الخدمة",
    lead:
      "تنظم هذه الشروط استخدام منصة DOMINASE، وهي منصة برمجيات أعمال تساعد الفرق على إدارة العمل وتشغيل مسارات مدعومة بالذكاء الاصطناعي.",
    documentLabel: "اتفاقية استخدام",
    effectiveLabel: "تاريخ السريان",
    effectiveDate: "9 سبتمبر 2026",
    updatedLabel: "آخر تحديث",
    updatedDate: "9 سبتمبر 2026",
    contentsLabel: "محتويات الشروط",
    sections: [
      {
        id: "acceptance",
        title: "1. قبول الشروط",
        paragraphs: [
          "باستخدام موقع DOMINASE أو منصتها أو خدماتها المتصلة، فإنك توافق على هذه الشروط. إذا كنت تستخدم الخدمة باسم شركة أو جهة أخرى، فأنت تقر بأن لديك الصلاحية لإلزامها بهذه الشروط. إذا لم توافق، فلا تستخدم الخدمة.",
          "قد تنطبق أيضاً اتفاقية مكتوبة أو عرض أو أمر خدمة خاص بحسابك. وعند وجود تعارض مباشر، تسري الوثيقة الخاصة على الجزء الذي تعالجه صراحة.",
        ],
      },
      {
        id: "service",
        title: "2. وصف الخدمة",
        paragraphs: [
          "DOMINASE منصة برمجيات أعمال مدعومة بالذكاء الاصطناعي. قد تساعد ميزاتها، بحسب إعداد الحساب وما هو متاح، في إدارة جهات الاتصال والمحادثات والمهام والتذكيرات والتقويمات والمحتوى ومسارات التواصل والعمل.",
          "قد تختلف الميزات والتكاملات وحدود الاستخدام بين الحسابات أو الخطط أو مراحل توفر الخدمة. لا يشكل وصف ميزة غير مفعلة لحسابك وعداً بتوفيرها.",
        ],
      },
      {
        id: "eligibility",
        title: "3. الأهلية والاستخدام التجاري",
        paragraphs: [
          "صُممت DOMINASE للاستخدام التجاري والمهني، وليست موجهة عمداً إلى الأطفال. يجب أن تكون قادراً قانوناً على قبول هذه الشروط، وأن تستخدم الخدمة لغرض مهني مشروع. إذا كنت تتصرف باسم جهة، فيجب أن تكون مخولاً بذلك.",
        ],
      },
      {
        id: "accounts",
        title: "4. الحسابات وأمنها",
        paragraphs: [
          "يجب تقديم معلومات حساب دقيقة والحفاظ على تحديثها. أنت مسؤول عن سرية بيانات الدخول وعن الأنشطة التي تتم من خلال حسابك أو مستخدميك المصرح لهم، ما لم تكن نتيجة إخلال تتحمل DOMINASE مسؤوليته قانوناً.",
          "أبلغ DOMINASE فوراً عند الاشتباه بوصول غير مصرح به، ولا تشارك كلمات المرور أو رموز التحقق أو مفاتيح التكامل مع أشخاص غير مخولين. يجوز لنا طلب خطوات تحقق معقولة لحماية الحساب.",
        ],
      },
      {
        id: "authorized-use",
        title: "5. الاستخدام المصرّح",
        paragraphs: [
          "يجوز لك استخدام الخدمة ضمن وظائفها المعلنة ولأعمال تملك صلاحية إدارتها. يجب أن تكون الاتصالات والإجراءات والبيانات التي تمر عبر حسابك مشروعة ومصرحاً بها ومتوافقة مع السياسات التي تنطبق عليك وعلى القنوات المتصلة.",
          "أنت مسؤول عن إعداد الصلاحيات الداخلية، ومراجعة الإجراءات المهمة قبل تنفيذها، والحفاظ على نسخ مناسبة من المعلومات التي يلزمك الاحتفاظ بها خارج الخدمة.",
        ],
      },
      {
        id: "prohibited-use",
        title: "6. الاستخدام المحظور",
        paragraphs: ["لا يجوز استخدام DOMINASE أو محاولة استخدامها من أجل:"],
        bullets: [
          "خرق القانون أو حقوق شخص آخر أو شروط قناة أو خدمة متصلة.",
          "إرسال رسائل مزعجة أو خادعة أو غير مصرح بها، أو انتحال هوية شخص أو جهة.",
          "رفع برمجيات ضارة أو محاولة الوصول غير المصرح به أو تعطيل الخدمة أو تجاوز حدودها الأمنية.",
          "جمع بيانات أو مراقبة أشخاص بطريقة غير قانونية أو من دون إشعار أو موافقة لازمة.",
          "استخدام المخرجات أو الأتمتة لاتخاذ قرار عالي الأثر دون المراجعة البشرية المناسبة.",
          "إجراء هندسة عكسية أو نسخ أو إعادة بيع أجزاء من الخدمة إلا إذا سمح القانون أو اتفاق مكتوب بذلك.",
          "استخدام الخدمة لبناء منتج منافس اعتماداً على وصول غير مصرح به أو لإساءة اختبار أنظمتها.",
        ],
      },
      {
        id: "ai",
        title: "7. الميزات المدعومة بالذكاء الاصطناعي",
        paragraphs: [
          "قد تستخدم DOMINASE أنظمة ذكاء اصطناعي لتفسير الطلبات أو إنشاء الردود أو تلخيص المحتوى أو اقتراح خطوات أو تنفيذ مسارات عمل يصرح بها المستخدم. المخرجات احتمالية وقد تكون غير دقيقة أو غير مكتملة أو غير مناسبة للسياق.",
          "يبقى المستخدم مسؤولاً عن مراجعة المخرجات والرسائل والإجراءات قبل الاعتماد عليها، ولا سيما عندما قد تؤثر في عميل أو عقد أو مال أو صحة أو حق قانوني أو قرار مهني مهم. لا تضمن DOMINASE أن تعمل ميزات الذكاء الاصطناعي بلا انقطاع أو خطأ أو أن تنتج النتيجة المطلوبة دائماً.",
        ],
      },
      {
        id: "integrations",
        title: "8. الاتصالات والتكاملات الخارجية",
        paragraphs: [
          "قد تتصل الخدمة، بحسب إعداد حسابك، بخدمات مثل WhatsApp Business والبريد الإلكتروني والتقويم والخرائط أو البحث والإشعارات وغيرها من أدوات الأطراف الثالثة. أنت تفوض DOMINASE بتنفيذ الطلبات اللازمة للتكامل الذي تختاره وضمن الصلاحيات التي تمنحها.",
          "تبقى خدمات الطرف الثالث خاضعة لشروطها وسياساتها وتوفرها وقيودها الخاصة. قد يؤثر تغيير تلك الخدمات أو تعليقها أو انقطاعها في وظائف DOMINASE. DOMINASE ليست مملوكة لشركة Meta ولا تدّعي اعتماداً أو انتساباً إليها لمجرد دعم WhatsApp أو خدمات Meta.",
        ],
      },
      {
        id: "user-content",
        title: "9. البيانات والمحتوى الذي يقدمه المستخدم",
        paragraphs: [
          "تحتفظ بحقوقك في المحتوى والملفات والتعليمات والبيانات التي تقدمها. تمنح DOMINASE الإذن المحدود اللازم لاستضافة هذا المحتوى ومعالجته ونقله وعرضه فقط لتشغيل الخدمة وحمايتها وتحسين موثوقيتها وتنفيذ طلباتك وفق هذه الشروط وسياسة الخصوصية.",
          "تقر بأن لديك الحقوق والأذونات اللازمة لتقديم المحتوى واستخدامه، وأنه لا ينتهك القانون أو حقوق الملكية أو الخصوصية أو السرية الخاصة بالآخرين. أنت مسؤول عن دقة المحتوى وعن قرار مشاركته عبر الخدمة.",
        ],
      },
      {
        id: "customer-data",
        title: "10. بيانات العملاء وجهات الاتصال",
        paragraphs: [
          "إذا أدخلت معلومات عملاء أو جهات اتصال أو عملاء محتملين أو موظفين، فأنت مسؤول عن وجود أساس مشروع لمعالجتها وعن تقديم الإشعارات والحصول على الموافقات المطلوبة. ويشمل ذلك احترام طلبات إلغاء الاشتراك وقواعد التسويق والمراسلة التي تنطبق على نشاطك.",
          "لا تستخدم DOMINASE للوصول إلى بيانات لا تملك صلاحية استخدامها. قد تعالج DOMINASE هذه البيانات لتقديم الوظائف التي تطلبها بصفتها مزود خدمة للجهة التي تدير الحساب.",
        ],
      },
      {
        id: "intellectual-property",
        title: "11. الملكية الفكرية",
        paragraphs: [
          "تعود حقوق الخدمة وبرمجياتها وتصميمها وعلامتها وموادها الأصلية إلى DOMINASE أو المرخصين لها، باستثناء محتوى المستخدم وحقوق الأطراف الثالثة. تمنحك هذه الشروط حقاً محدوداً وغير حصري وغير قابل للتحويل لاستخدام الخدمة أثناء سريان حسابك وللغرض المصرح به.",
          "لا تمنح هذه الشروط ملكية في منصة DOMINASE أو علاماتها. وإذا قدمت ملاحظات أو اقتراحات، يجوز لنا استخدامها لتحسين الخدمة من دون التزام بتحويل ملكية محتواك إلينا.",
        ],
      },
      {
        id: "availability",
        title: "12. توفر الخدمة والتغييرات",
        paragraphs: [
          "نسعى إلى تشغيل خدمة موثوقة، لكن قد تحدث صيانة أو أعطال أو تأخيرات أو قيود بسبب البنية التحتية أو التكاملات أو أحداث خارج السيطرة المعقولة. لا نضمن توفر الخدمة دائماً أو خلوها من الأخطاء.",
          "يجوز لنا إضافة الميزات أو تعديلها أو إيقافها لتحسين الخدمة أو أمنها أو استجابتها للمتطلبات التقنية والقانونية. سنحاول تقديم إشعار مناسب عندما يؤثر تغيير جوهري بصورة كبيرة في استخدام نشط، حيث يكون ذلك عملياً.",
        ],
      },
      {
        id: "security",
        title: "13. الأمان والاستخدام المسؤول",
        paragraphs: [
          "تطبق DOMINASE تدابير تقنية وتنظيمية معقولة لطبيعة الخدمة، لكن لا يمكن ضمان أمان مطلق. عليك استخدام أجهزة واتصالات موثوقة، وتحديد أقل الصلاحيات اللازمة، ومراجعة المستخدمين والتكاملات، والإبلاغ عن أي ثغرة أو إساءة استخدام بصورة مسؤولة.",
          "لا يجوز اختبار أمان الخدمة أو فحصها أو محاولة تجاوز ضوابطها من دون إذن مكتوب. قد نتخذ خطوات فورية للحد من نشاط يشكل خطراً على المستخدمين أو الأنظمة أو البيانات.",
        ],
      },
      {
        id: "termination",
        title: "14. التعليق والإنهاء",
        paragraphs: [
          "يجوز لك التوقف عن استخدام الخدمة أو طلب إغلاق حسابك وفق القنوات المتاحة. ويجوز لـ DOMINASE تعليق الوصول أو تقييده أو إنهاؤه عند خرق هذه الشروط، أو وجود خطر أمني أو قانوني، أو إساءة استخدام، أو عدم سداد مبلغ مستحق بموجب اتفاق منفصل، أو توقف الخدمة.",
          "سنراعي، متى كان ذلك مناسباً وعملياً، تقديم إشعار وفرصة لمعالجة المخالفة. قد يكون التعليق فورياً عندما يلزم لحماية الخدمة أو الآخرين. تبقى الأحكام التي تقتضي طبيعتها الاستمرار نافذة بعد الإنهاء، بما فيها الملكية والمسؤولية والالتزامات المتعلقة بالمحتوى.",
        ],
      },
      {
        id: "disclaimers",
        title: "15. إخلاء الضمانات",
        paragraphs: [
          "إلى الحد الذي يسمح به القانون، تقدم الخدمة على أساس «كما هي» و«حسب التوفر». لا تقدم DOMINASE ضماناً بأن الخدمة ستلائم كل غرض، أو تعمل بلا انقطاع أو أخطاء، أو أن كل مخرج أو اقتراح أو تكامل سيكون دقيقاً أو متاحاً.",
          "لا تمثل الخدمة ولا مخرجات الذكاء الاصطناعي استشارة قانونية أو مالية أو طبية أو مهنية متخصصة. لا يؤثر هذا القسم في أي ضمان لا يسمح القانون باستبعاده.",
        ],
      },
      {
        id: "liability",
        title: "16. تحديد المسؤولية",
        paragraphs: [
          "إلى أقصى حد يسمح به القانون، لا تكون DOMINASE مسؤولة عن أضرار غير مباشرة أو عرضية أو خاصة أو تبعية، أو عن فقد الأرباح أو الفرص أو السمعة أو البيانات، الناتج عن استخدام الخدمة أو تعذر استخدامها أو الاعتماد على مخرجاتها أو خدمات الطرف الثالث.",
          "لا تستبعد هذه الشروط مسؤولية لا يجوز استبعادها قانوناً. ويُراعى عند تقييم أي مسؤولية مباشرة دور المستخدم في المراجعة والنسخ الاحتياطي وإدارة الصلاحيات والامتثال للقواعد التي تنطبق على اتصالاته وبياناته.",
        ],
      },
      {
        id: "indemnity",
        title: "17. التعويض المعقول",
        paragraphs: [
          "بالقدر الذي يسمح به القانون، توافق على تعويض DOMINASE عن مطالبات طرف ثالث وتكاليف معقولة تنشأ مباشرة من محتوى قدمته من دون حق، أو استخدام غير قانوني أو غير مصرح به للخدمة، أو خرق جوهري لهذه الشروط. لا ينطبق ذلك بالقدر الذي تكون فيه المطالبة ناتجة عن فعل تتحمل DOMINASE مسؤوليته.",
        ],
      },
      {
        id: "privacy",
        title: "18. البيانات والخصوصية",
        paragraphs: [
          "تشرح سياسة الخصوصية أنواع المعلومات التي قد تعالجها DOMINASE، وأغراض المعالجة، ودور مزودي الخدمات، والاحتفاظ، والأمان، وحقوق الأفراد بحسب القانون المنطبق. تشكل السياسة مرجعاً مهماً عند استخدام الحساب والتكاملات.",
        ],
        links: [{ href: "/privacy", label: "اقرأ سياسة الخصوصية" }],
      },
      {
        id: "data-deletion",
        title: "19. حذف البيانات",
        paragraphs: [
          "يمكن طلب حذف معلومات شخصية تتحكم بها DOMINASE. قد نحتاج إلى التحقق من الهوية أو الصلاحية، وقد تنطبق استثناءات محدودة للأمن أو التدقيق أو الالتزامات القانونية. توضح صفحة حذف البيانات ما يجب إرساله من دون تقديم معلومات شخصية غير ضرورية.",
        ],
        links: [{ href: "/data-deletion", label: "راجع خطوات حذف البيانات" }],
      },
      {
        id: "changes",
        title: "20. تغييرات هذه الشروط",
        paragraphs: [
          "قد نحدّث هذه الشروط لتعكس تغييرات الخدمة أو المخاطر أو المتطلبات القانونية. سنغيّر تاريخ «آخر تحديث» أعلى الصفحة، وقد نقدم إشعاراً إضافياً عن التغييرات الجوهرية حيث يكون ذلك مناسباً أو مطلوباً. استمرار الاستخدام بعد سريان الشروط المحدثة يعني قبولها، بالقدر الذي يسمح به القانون.",
        ],
      },
      {
        id: "contact",
        title: "21. التواصل",
        paragraphs: [
          `للأسئلة عن هذه الشروط، تواصل مع DOMINASE عبر البريد الرسمي ${CONTACT_CHANNELS.email.display}.`,
        ],
      },
    ],
    relatedLabel: "البيانات والخصوصية",
    relatedTitle: "اعرف كيف تُعالج بياناتك وكيف تطلب حذفها.",
    relatedBody: "سياسة الخصوصية وصفحة حذف البيانات تكملان هذه الشروط وتوضحان خياراتك بصورة مباشرة.",
    relatedCta: "سياسة الخصوصية",
    relatedHref: "/privacy",
    relatedAltCta: "حذف البيانات",
    relatedAltHref: "/data-deletion",
  },
  en: {
    eyebrow: "DOMINASE / Terms",
    title: "Terms of Service",
    lead:
      "These Terms govern use of DOMINASE, a business software platform that helps teams manage work and operate AI-assisted workflows.",
    documentLabel: "Use agreement",
    effectiveLabel: "Effective date",
    effectiveDate: "September 9, 2026",
    updatedLabel: "Last updated",
    updatedDate: "September 9, 2026",
    contentsLabel: "Terms contents",
    sections: [
      {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        paragraphs: [
          "By using the DOMINASE website, platform, or connected services, you agree to these Terms. If you use the service for a business or other organization, you represent that you have authority to bind it to these Terms. If you do not agree, do not use the service.",
          "A written agreement, proposal, or service order specific to your account may also apply. If it directly conflicts with these Terms, the specific document controls only the subject it expressly addresses.",
        ],
      },
      {
        id: "service",
        title: "2. Description of the Service",
        paragraphs: [
          "DOMINASE is an AI-assisted business software platform. Depending on account configuration and availability, its features may help manage contacts, conversations, tasks, reminders, calendars, content, communications, and operating workflows.",
          "Features, integrations, and usage limits may differ by account, plan, or stage of availability. A description of a feature that is not enabled for your account is not a promise that it will be provided.",
        ],
      },
      {
        id: "eligibility",
        title: "3. Eligibility and professional use",
        paragraphs: [
          "DOMINASE is designed for business and professional use and is not intentionally directed to children. You must be legally able to accept these Terms and use the service for a lawful professional purpose. If you act for an organization, you must be authorized to do so.",
        ],
      },
      {
        id: "accounts",
        title: "4. Accounts and account security",
        paragraphs: [
          "You must provide accurate account information and keep it current. You are responsible for the confidentiality of credentials and for activity through your account or authorized users, except where an issue results from a breach for which DOMINASE is legally responsible.",
          "Notify DOMINASE promptly if you suspect unauthorized access. Do not share passwords, verification codes, or integration keys with unauthorized people. We may request reasonable verification steps to protect an account.",
        ],
      },
      {
        id: "authorized-use",
        title: "5. Authorized use",
        paragraphs: [
          "You may use the service within its intended functions for business activities you are authorized to manage. Communications, actions, and data sent through your account must be lawful, authorized, and consistent with policies that apply to you and connected channels.",
          "You are responsible for configuring internal permissions, reviewing consequential actions before they are performed, and maintaining appropriate independent copies of information you need to retain.",
        ],
      },
      {
        id: "prohibited-use",
        title: "6. Prohibited use",
        paragraphs: ["You must not use or attempt to use DOMINASE to:"],
        bullets: [
          "Break the law, infringe another person's rights, or violate the terms of a connected channel or service.",
          "Send spam, deceptive, or unauthorized communications, or impersonate a person or organization.",
          "Upload malware, obtain unauthorized access, disrupt the service, or bypass security limits.",
          "Collect data or monitor people unlawfully or without required notice or permission.",
          "Use outputs or automation for a high-impact decision without appropriate human review.",
          "Reverse engineer, copy, or resell parts of the service unless permitted by law or a written agreement.",
          "Use unauthorized access to build a competing product or to abuse security testing of the service.",
        ],
      },
      {
        id: "ai",
        title: "7. AI-assisted features",
        paragraphs: [
          "DOMINASE may use AI systems to interpret requests, generate responses, summarize content, suggest steps, or perform workflows authorized by a user. Outputs are probabilistic and may be inaccurate, incomplete, or unsuitable for the context.",
          "Users remain responsible for reviewing outputs, messages, and actions before relying on them, especially where they could affect a customer, contract, payment, health matter, legal right, or other consequential professional decision. DOMINASE does not guarantee uninterrupted or error-free AI behavior or that an AI feature will always produce the desired result.",
        ],
      },
      {
        id: "integrations",
        title: "8. Communications and integrations",
        paragraphs: [
          "Depending on your account setup, the service may connect with WhatsApp Business, email, calendar, maps or search, notifications, and other third-party tools. You authorize DOMINASE to make the requests needed for an integration you select, within the permissions you grant.",
          "Third-party services remain governed by their own terms, policies, availability, and limits. A change, suspension, or outage in those services may affect DOMINASE functions. DOMINASE is not owned by Meta and does not claim endorsement or affiliation merely because it supports WhatsApp or Meta services.",
        ],
      },
      {
        id: "user-content",
        title: "9. User-provided data and content",
        paragraphs: [
          "You retain your rights in content, files, instructions, and data you provide. You give DOMINASE the limited permission needed to host, process, transmit, and display that content only to operate and protect the service, improve its reliability, and carry out your requests under these Terms and the Privacy Policy.",
          "You represent that you have the rights and permissions needed to provide and use the content and that it does not violate law or another person's intellectual property, privacy, or confidentiality rights. You are responsible for content accuracy and for the decision to share it through the service.",
        ],
      },
      {
        id: "customer-data",
        title: "10. Customer and contact data",
        paragraphs: [
          "If you enter information about customers, contacts, leads, or team members, you are responsible for having a lawful basis to process it, providing required notices, and obtaining required permissions. This includes honoring opt-out requests and marketing or messaging rules that apply to your business.",
          "Do not use DOMINASE to access data you are not authorized to use. DOMINASE may process this data to provide requested functions as a service provider to the organization operating the account.",
        ],
      },
      {
        id: "intellectual-property",
        title: "11. Intellectual property",
        paragraphs: [
          "The service, software, design, brand, and original materials are owned by DOMINASE or its licensors, excluding user content and third-party rights. These Terms give you a limited, non-exclusive, non-transferable right to use the service while your account is active and for its authorized purpose.",
          "These Terms do not transfer ownership of the DOMINASE platform or marks. If you provide feedback or suggestions, we may use them to improve the service without requiring you to transfer ownership of your content.",
        ],
      },
      {
        id: "availability",
        title: "12. Service availability and changes",
        paragraphs: [
          "We work to provide a reliable service, but maintenance, failures, delays, or limits may occur because of infrastructure, integrations, or events outside reasonable control. We do not guarantee that the service will always be available or error-free.",
          "We may add, change, or discontinue features to improve the service, security, or response to technical and legal requirements. Where practical, we will try to give appropriate notice if a material change significantly affects active use.",
        ],
      },
      {
        id: "security",
        title: "13. Security and responsible use",
        paragraphs: [
          "DOMINASE applies reasonable technical and organizational measures appropriate to the service, but absolute security cannot be guaranteed. You should use trusted devices and connections, grant the minimum permissions needed, review users and integrations, and report suspected vulnerabilities or abuse responsibly.",
          "You may not scan, test, or attempt to bypass the service's security controls without written authorization. We may take immediate steps to limit activity that poses a risk to users, systems, or data.",
        ],
      },
      {
        id: "termination",
        title: "14. Suspension and termination",
        paragraphs: [
          "You may stop using the service or request account closure through available channels. DOMINASE may suspend, limit, or terminate access for a breach of these Terms, a security or legal risk, misuse, non-payment under a separate agreement, or discontinuation of the service.",
          "Where appropriate and practical, we will consider providing notice and an opportunity to address a breach. Suspension may be immediate when needed to protect the service or others. Terms that by their nature should continue—including ownership, liability, and content obligations—survive termination.",
        ],
      },
      {
        id: "disclaimers",
        title: "15. Disclaimers",
        paragraphs: [
          "To the extent permitted by law, the service is provided “as is” and “as available.” DOMINASE does not warrant that the service will fit every purpose, operate without interruption or errors, or that every output, suggestion, or integration will be accurate or available.",
          "The service and AI output are not legal, financial, medical, or other specialized professional advice. This section does not affect a warranty that applicable law does not allow to be excluded.",
        ],
      },
      {
        id: "liability",
        title: "16. Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, DOMINASE is not liable for indirect, incidental, special, or consequential damages, or for loss of profit, opportunity, reputation, or data, arising from use or inability to use the service, reliance on its output, or third-party services.",
          "These Terms do not exclude liability that cannot legally be excluded. Any assessment of direct responsibility must also account for the user's role in review, backup, permission management, and compliance with rules governing their communications and data.",
        ],
      },
      {
        id: "indemnity",
        title: "17. Reasonable indemnity",
        paragraphs: [
          "To the extent permitted by law, you agree to indemnify DOMINASE against third-party claims and reasonable costs arising directly from content you provided without the required rights, unlawful or unauthorized use of the service, or a material breach of these Terms. This does not apply to the extent a claim results from conduct for which DOMINASE is responsible.",
        ],
      },
      {
        id: "privacy",
        title: "18. Data and privacy",
        paragraphs: [
          "The Privacy Policy explains the information DOMINASE may process, processing purposes, the role of service providers, retention, security, and individual rights under applicable law. It is an important reference when using an account and integrations.",
        ],
        links: [{ href: "/privacy", label: "Read the Privacy Policy" }],
      },
      {
        id: "data-deletion",
        title: "19. Data deletion",
        paragraphs: [
          "You may request deletion of personal information DOMINASE controls. Identity or authority verification may be required, and limited security, audit, or legal-retention exceptions may apply. The Data Deletion page explains what to send without providing unnecessary personal information.",
        ],
        links: [{ href: "/data-deletion", label: "Review Data Deletion steps" }],
      },
      {
        id: "changes",
        title: "20. Changes to these Terms",
        paragraphs: [
          "We may update these Terms to reflect changes to the service, risks, or legal requirements. We will change the “Last updated” date above and may provide additional notice of material changes where appropriate or required. Continued use after updated Terms take effect means acceptance to the extent permitted by law.",
        ],
      },
      {
        id: "contact",
        title: "21. Contact",
        paragraphs: [
          `For questions about these Terms, contact DOMINASE at the official email ${CONTACT_CHANNELS.email.display}.`,
        ],
      },
    ],
    relatedLabel: "Data and privacy",
    relatedTitle: "Know how your information is handled and how to request deletion.",
    relatedBody: "The Privacy Policy and Data Deletion page complement these Terms and explain your options directly.",
    relatedCta: "Privacy Policy",
    relatedHref: "/privacy",
    relatedAltCta: "Data Deletion",
    relatedAltHref: "/data-deletion",
  },
};

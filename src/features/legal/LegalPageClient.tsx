"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CONTACT_CHANNELS } from "@/constants/contact";
import { useLanguage } from "@/context/LanguageContext";
import { TERMS_COPY } from "@/features/legal/termsCopy";

export type Language = "ar" | "en";
type LegalPageKind = "privacy" | "data-deletion" | "terms";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string;
  links?: { href: string; label: string }[];
};

export type LegalCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  documentLabel: string;
  effectiveLabel: string;
  effectiveDate: string;
  updatedLabel: string;
  updatedDate: string;
  contentsLabel: string;
  sections: LegalSection[];
  relatedLabel: string;
  relatedTitle: string;
  relatedBody: string;
  relatedCta: string;
  relatedHref: string;
  relatedAltCta?: string;
  relatedAltHref?: string;
  contactLabel?: string;
  contactTitle?: string;
  contactBody?: string;
  contactCta?: string;
};

const PRIVACY_COPY: Record<Language, LegalCopy> = {
  ar: {
    eyebrow: "DOMINASE / الخصوصية",
    title: "سياسة الخصوصية",
    lead:
      "توضح هذه السياسة كيف تعالج DOMINASE المعلومات عند استخدام موقعها ومنصة برمجيات الأعمال المدعومة بالذكاء الاصطناعي وخدماتها المتصلة.",
    documentLabel: "وثيقة عامة",
    effectiveLabel: "تاريخ السريان",
    effectiveDate: "9 سبتمبر 2026",
    updatedLabel: "آخر تحديث",
    updatedDate: "9 سبتمبر 2026",
    contentsLabel: "محتويات السياسة",
    sections: [
      {
        id: "scope",
        title: "1. نطاق هذه السياسة",
        paragraphs: [
          "تنطبق هذه السياسة على موقع DOMINASE العام ومنصة DOMINASE وخدماتها البرمجية المرتبطة. DOMINASE منصة برمجيات أعمال تساعد الفرق على إدارة معلومات العمل وتنفيذ مسارات عمل يساندها الذكاء الاصطناعي.",
          "عندما تُدخل شركة أو مستخدم مخوّل معلومات تخص عملاءها أو جهات اتصالها أو موظفيها، فقد تعالج DOMINASE تلك المعلومات نيابة عنها لتقديم الوظيفة المطلوبة. وتبقى الشركة مسؤولة عن امتلاك أساس مناسب لاستخدام المعلومات وعن تقديم الإشعارات اللازمة لأصحابها وفقاً للقانون المنطبق.",
        ],
      },
      {
        id: "information",
        title: "2. المعلومات التي قد نعالجها",
        paragraphs: ["تعتمد المعلومات الفعلية على الميزات التي يختار المستخدم أو الشركة تشغيلها، وقد تشمل:"],
        bullets: [
          "بيانات الحساب والملف الشخصي، مثل الاسم ورقم الهاتف والبريد الإلكتروني.",
          "بيانات العملاء وجهات الاتصال والعملاء المحتملين التي يُدخلها مستخدمون مخوّلون.",
          "المحادثات ومحتواها والبيانات الوصفية المرتبطة بالرسائل.",
          "محتوى رسائل WhatsApp Business ومعرّفات الهاتف أو واتساب وحالة التسليم عند ربط الشركة لواتساب.",
          "أحداث التقويم والتذكيرات والمهام.",
          "محتوى العمل والملفات والأصول المرفوعة عند استخدام ميزات تدعم ذلك.",
          "السجلات التقنية وسجلات الأمان وبيانات الجهاز أو المتصفح وبيانات استخدام الخدمة.",
          "مدخلات وتفاعلات الذكاء الاصطناعي اللازمة لفهم الطلب وتنفيذ الميزة أو الإجراء الذي يطلبه المستخدم.",
        ],
        note: "لا تطلب DOMINASE من المستخدم تقديم معلومات لا يحتاجها المسار الذي اختاره.",
      },
      {
        id: "purposes",
        title: "3. لماذا نعالج المعلومات",
        bullets: [
          "تقديم وظائف المنصة التي يطلبها المستخدم وتشغيل الحساب.",
          "إدارة جهات الاتصال والمحادثات وتنفيذ الاتصالات التي تعتمدها الشركة.",
          "دعم أحداث التقويم والتذكيرات والمهام ومسارات المتابعة.",
          "تشغيل مسارات العمل المدعومة بالذكاء الاصطناعي.",
          "حماية الخدمة ومنع الاحتيال وإساءة الاستخدام والتحقق من الأمان.",
          "تشخيص الأعطال وتحسين الموثوقية والأداء وتجربة الخدمة.",
          "الوفاء بالالتزامات القانونية وحماية الحقوق عند انطباق ذلك.",
        ],
      },
      {
        id: "whatsapp",
        title: "4. WhatsApp وMeta",
        paragraphs: [
          "عندما تربط شركة حساب WhatsApp Business بمنصة DOMINASE، قد تعالج DOMINASE محتوى الرسائل ومعرّفات الهاتف أو واتساب وبيانات التسليم والمعلومات المرتبطة بها، وذلك فقط بالقدر اللازم لتقديم وظائف المراسلة والأتمتة التي طلبتها الشركة وصرّحت بها.",
          "DOMINASE ليست مملوكة لشركة Meta ولا تدّعي اعتماداً أو شراكة أو انتساباً إليها لمجرد استخدام خدماتها. تخضع خدمات Meta وWhatsApp لشروطها وسياساتها المطبقة بصورة مستقلة.",
        ],
      },
      {
        id: "ai",
        title: "5. معالجة الذكاء الاصطناعي",
        paragraphs: [
          "قد تعالج أنظمة ذكاء اصطناعي المحتوى الذي يقدمه المستخدم لتفسير الطلبات أو إنشاء ردود أو تلخيص المعلومات أو تنفيذ مسار عمل مخوّل. وقد يتطلب ذلك إرسال الجزء اللازم من المحتوى إلى مزوّد خدمة ذكاء اصطناعي يعمل لدعم الوظيفة المطلوبة.",
          "يمكن أن تكون المخرجات غير مكتملة أو غير دقيقة. على المستخدم مراجعة المخرجات قبل الاعتماد عليها، وخصوصاً في القرارات المهنية أو القانونية أو المالية أو الصحية أو القرارات ذات الأثر المهم.",
        ],
      },
      {
        id: "sharing",
        title: "6. مشاركة المعلومات ومزوّدو الخدمة",
        paragraphs: [
          "قد تعالج المعلومات جهات تقدم خدمات ضرورية لتشغيل الوظائف المطلوبة، مثل البنية السحابية وقواعد البيانات ومزوّدي الذكاء الاصطناعي والمراسلة والبريد الإلكتروني والخرائط أو البحث والإشعارات. نشارك فقط ما يلزم لتقديم الخدمة أو حمايتها، وفق ترتيبات مناسبة لطبيعة المعالجة.",
          "قد نكشف معلومات إذا تطلب القانون ذلك، أو لحماية حقوق DOMINASE أو مستخدميها أو سلامتهم، أو في سياق إعادة تنظيم أو نقل مشروع مع اتخاذ الضمانات المناسبة. لا تبيع DOMINASE البيانات الشخصية.",
        ],
      },
      {
        id: "security",
        title: "7. الأمان",
        paragraphs: [
          "تستخدم DOMINASE تدابير تقنية وتنظيمية معقولة تتناسب مع طبيعة الخدمة والمعلومات، وقد تشمل ضوابط وصول ومراقبة تقنية وإجراءات لحماية الأنظمة ومعالجة الحوادث. لا توجد وسيلة نقل أو تخزين آمنة بصورة مطلقة، لذلك لا يمكن ضمان انعدام المخاطر.",
        ],
      },
      {
        id: "retention",
        title: "8. الاحتفاظ بالمعلومات",
        paragraphs: [
          "نحتفظ بالمعلومات للمدة المعقولة اللازمة لتقديم الخدمة وتنفيذ طلبات الشركة والوفاء بالالتزامات التجارية أو القانونية ودعم الأمان والتدقيق وحل النزاعات. بعد انتهاء الحاجة، قد تُحذف المعلومات أو تُجهّل هويتها حيث يكون ذلك مناسباً، مع مراعاة النسخ الاحتياطية والالتزامات النظامية.",
        ],
      },
      {
        id: "rights",
        title: "9. حقوق الأفراد وخياراتهم",
        paragraphs: [
          "بحسب مكان إقامة الشخص والقانون المنطبق، قد تكون له حقوق في الوصول إلى معلوماته أو تصحيحها أو حذفها أو الاعتراض على بعض أوجه معالجتها أو تقييدها. لا تمنح جميع الأنظمة القانونية الحقوق ذاتها، وقد نحتاج إلى التحقق من الهوية ونطاق الطلب قبل تنفيذه.",
          "إذا كانت المعلومات محفوظة لدى شركة تستخدم DOMINASE، فقد تكون تلك الشركة الجهة المناسبة لبدء الطلب. يمكن أيضاً التواصل مع DOMINASE بخصوص الخصوصية عبر البريد الرسمي المبين أدناه. وتوضح صفحة حذف البيانات طريقة إرسال طلب حذف مخصص.",
        ],
      },
      {
        id: "international",
        title: "10. المعالجة عبر الحدود",
        paragraphs: [
          "قد يعمل بعض مزوّدي الخدمات من دول مختلفة عن دولة المستخدم. وعند حدوث نقل دولي للمعلومات، نتخذ الخطوات المعقولة لحمايتها بما يتفق مع طبيعة الخدمة والمتطلبات المنطبقة.",
        ],
      },
      {
        id: "children",
        title: "11. الأطفال",
        paragraphs: [
          "صُممت DOMINASE للاستخدام التجاري والمهني وليست موجّهة عمداً إلى الأطفال. إذا تبيّن لنا أننا تلقينا معلومات طفل بطريقة لا يسمح بها القانون، فسنتخذ خطوات مناسبة لمعالجتها أو حذفها.",
        ],
      },
      {
        id: "changes",
        title: "12. التغييرات والتواصل",
        paragraphs: [
          "قد نحدّث هذه السياسة لتعكس تغييرات الخدمة أو الممارسات أو المتطلبات القانونية. عند التحديث سنغيّر تاريخ «آخر تحديث» أعلى الصفحة، وقد نقدم إشعاراً إضافياً إذا كان التغيير مهماً وحيث يلزم ذلك.",
          `للاستفسار عن الخصوصية، راسل DOMINASE على ${CONTACT_CHANNELS.email.display}.`,
        ],
      },
    ],
    relatedLabel: "حذف البيانات",
    relatedTitle: "تريد طلب حذف معلومات مرتبطة بـ DOMINASE؟",
    relatedBody: "توضح صفحة حذف البيانات المعلومات التي تساعدنا على تحديد السجلات، وكيف نتحقق من الطلب، والاستثناءات التي قد تنطبق.",
    relatedCta: "انتقل إلى صفحة حذف البيانات",
    relatedHref: "/data-deletion",
  },
  en: {
    eyebrow: "DOMINASE / Privacy",
    title: "Privacy Policy",
    lead:
      "This policy explains how DOMINASE processes information when you use its public website, AI-assisted business software platform, and connected services.",
    documentLabel: "Public document",
    effectiveLabel: "Effective date",
    effectiveDate: "September 9, 2026",
    updatedLabel: "Last updated",
    updatedDate: "September 9, 2026",
    contentsLabel: "Policy contents",
    sections: [
      {
        id: "scope",
        title: "1. Scope of this policy",
        paragraphs: [
          "This policy applies to the DOMINASE public website, the DOMINASE platform, and related software services. DOMINASE is a business software platform that helps teams manage business information and run AI-assisted workflows.",
          "When a business or its authorized user enters information about customers, contacts, or team members, DOMINASE may process that information on the business's behalf to provide the requested function. The business remains responsible for having an appropriate basis to use the information and for providing any notices required by applicable law.",
        ],
      },
      {
        id: "information",
        title: "2. Information we may process",
        paragraphs: ["The information involved depends on the features a user or business chooses to use and may include:"],
        bullets: [
          "Account and profile details, including names, phone numbers, and email addresses.",
          "Customer, contact, and lead information entered by authorized users.",
          "Conversations, message content, and related metadata.",
          "WhatsApp Business message content, phone or WhatsApp identifiers, and delivery status when a business connects WhatsApp.",
          "Calendar events, reminders, and tasks.",
          "Uploaded business content, files, and assets where a feature supports them.",
          "Technical and security logs, device or browser information, and service usage metadata.",
          "AI inputs and interaction data needed to understand a request and perform the feature or action requested by the user.",
        ],
        note: "DOMINASE does not ask users to provide information that is unnecessary for the workflow they choose.",
      },
      {
        id: "purposes",
        title: "3. Why we process information",
        bullets: [
          "Provide the platform functions a user requests and operate the account.",
          "Manage contacts and conversations and carry out communications authorized by the business.",
          "Support calendar events, reminders, tasks, and follow-up workflows.",
          "Operate AI-assisted workflows.",
          "Protect the service and prevent fraud, abuse, and security threats.",
          "Debug problems and improve reliability, performance, and the service experience.",
          "Meet legal obligations and protect rights where applicable.",
        ],
      },
      {
        id: "whatsapp",
        title: "4. WhatsApp and Meta",
        paragraphs: [
          "When a business connects WhatsApp Business to DOMINASE, DOMINASE may process message content, phone or WhatsApp identifiers, delivery metadata, and related information only as necessary to provide the messaging and automation functions the business requested and authorized.",
          "DOMINASE is not owned by Meta and does not claim endorsement, partnership, or affiliation merely because it uses Meta or WhatsApp services. Meta and WhatsApp services are governed independently by their own applicable terms and policies.",
        ],
      },
      {
        id: "ai",
        title: "5. AI processing",
        paragraphs: [
          "AI systems may process content a user provides to interpret requests, generate responses, summarize information, or perform an authorized workflow. This may require sending the necessary part of the content to an AI service provider that supports the requested function.",
          "AI output can be incomplete or inaccurate. Users should review output before relying on it, especially for professional, legal, financial, health, or other consequential decisions.",
        ],
      },
      {
        id: "sharing",
        title: "6. Sharing and service providers",
        paragraphs: [
          "Information may be processed by providers needed to operate requested functions, such as cloud infrastructure, databases, AI providers, messaging providers, email providers, maps or search providers, and notification services. We share only what is needed to provide or protect the service, under arrangements appropriate to the processing.",
          "We may disclose information when required by law, to protect the rights or safety of DOMINASE or its users, or in connection with a business reorganization or transfer with appropriate safeguards. DOMINASE does not sell personal information.",
        ],
      },
      {
        id: "security",
        title: "7. Security",
        paragraphs: [
          "DOMINASE uses reasonable technical and organizational safeguards appropriate to the service and information. These may include access controls, technical monitoring, system-protection practices, and incident handling. No method of transmission or storage is completely secure, so we cannot promise zero risk.",
        ],
      },
      {
        id: "retention",
        title: "8. Data retention",
        paragraphs: [
          "We retain information only for as long as reasonably necessary to provide the service, carry out business requests, meet business or legal obligations, support security and audit needs, and resolve disputes. When it is no longer needed, information may be deleted or anonymized where appropriate, subject to backups and legal requirements.",
        ],
      },
      {
        id: "rights",
        title: "9. Individual rights and choices",
        paragraphs: [
          "Depending on where a person lives and the applicable law, they may have rights to access, correct, or delete their information, or to object to or restrict certain processing. Not every jurisdiction provides identical rights, and we may need to verify identity and the scope of a request before acting on it.",
          "If the information is held by a business using DOMINASE, that business may be the appropriate place to begin the request. You can also contact DOMINASE about privacy at the official email below. The Data Deletion page explains how to make a dedicated deletion request.",
        ],
      },
      {
        id: "international",
        title: "10. International processing",
        paragraphs: [
          "Some service providers may operate in countries different from the user's country. Where information is transferred internationally, we take reasonable steps to protect it in line with the service and applicable requirements.",
        ],
      },
      {
        id: "children",
        title: "11. Children",
        paragraphs: [
          "DOMINASE is designed for business and professional use and is not intentionally directed to children. If we learn that we received a child's information in a way not permitted by law, we will take appropriate steps to address or delete it.",
        ],
      },
      {
        id: "changes",
        title: "12. Changes and contact",
        paragraphs: [
          "We may update this policy to reflect changes to the service, our practices, or legal requirements. When we do, we will change the “Last updated” date above and may provide additional notice if a change is material and notice is required.",
          `For privacy questions, contact DOMINASE at ${CONTACT_CHANNELS.email.display}.`,
        ],
      },
    ],
    relatedLabel: "Data deletion",
    relatedTitle: "Want to request deletion of information connected to DOMINASE?",
    relatedBody: "The Data Deletion page explains what helps us identify records, how requests are verified, and which limited exceptions may apply.",
    relatedCta: "Go to Data Deletion",
    relatedHref: "/data-deletion",
  },
};

const DELETION_COPY: Record<Language, LegalCopy> = {
  ar: {
    eyebrow: "DOMINASE / التحكم بالبيانات",
    title: "حذف البيانات",
    lead:
      "يمكنك طلب حذف معلومات شخصية مرتبطة بـ DOMINASE أو بوظائف WhatsApp المتصلة. نطلب فقط المعلومات اللازمة للعثور على السجلات والتحقق من الطلب.",
    documentLabel: "دليل الطلب",
    effectiveLabel: "متاح منذ",
    effectiveDate: "9 سبتمبر 2026",
    updatedLabel: "آخر تحديث",
    updatedDate: "9 سبتمبر 2026",
    contentsLabel: "خطوات الطلب",
    sections: [
      {
        id: "meaning",
        title: "1. ما هو طلب الحذف؟",
        paragraphs: [
          "طلب الحذف هو طلب لإزالة المعلومات الشخصية التي تتحكم بها DOMINASE ولا تعود هناك حاجة مشروعة للاحتفاظ بها. قد يشمل ذلك معلومات حساب أو تواصل أو سجلات مرتبطة بوظيفة استخدمتها عبر DOMINASE.",
        ],
      },
      {
        id: "submit",
        title: "2. كيف ترسل الطلب",
        paragraphs: [
          `أرسل رسالة من وسيلة تواصل يمكنك الوصول إليها إلى البريد الرسمي ${CONTACT_CHANNELS.email.display}، واكتب في الموضوع «طلب حذف بيانات DOMINASE».`,
          "اشرح باختصار ما تريد حذفه. لا ترسل كلمة مرور أو رموز دخول أو وثائق هوية أو معلومات شخصية إضافية ما لم نطلب جزءاً محدداً منها لاحقاً للتحقق.",
        ],
        bullets: [
          "اسمك كما يظهر في الحساب أو السجل المعني.",
          "البريد الإلكتروني أو رقم الهاتف أو معرّف WhatsApp المرتبط بالسجل.",
          "اسم الشركة أو مساحة العمل، إن كان ذلك يساعد على تحديد البيانات.",
          "وصف قصير للميزة أو المحادثة أو السجل المطلوب حذفه.",
          "طريقة مناسبة للرد عليك.",
        ],
        note: "أرسل أقل قدر كافٍ من المعلومات. لا نحتاج إلى تفاصيل لا تساعد على تحديد السجل.",
      },
      {
        id: "verification",
        title: "3. التحقق من الهوية والصلاحية",
        paragraphs: [
          "قد نحتاج إلى التحقق من أن مقدم الطلب هو صاحب المعلومات أو شخص مخوّل بالتصرف نيابة عنه. يعتمد التحقق على طبيعة السجل والمخاطر، وقد يتم عبر تأكيد الوصول إلى البريد أو الرقم المرتبط أو عبر معلومات محدودة أخرى. إذا تعذر التحقق بصورة معقولة، فقد نطلب توضيحاً أو نرفض حذف بيانات شخص آخر.",
        ],
      },
      {
        id: "control",
        title: "4. البيانات التي تتحكم بها DOMINASE",
        paragraphs: [
          "ينطبق الطلب على البيانات التي تتحكم بها DOMINASE أو تستطيع حذفها من أنظمتها. إذا أدخلت شركة تستخدم DOMINASE معلوماتك ضمن حسابها، فقد تكون الشركة هي المتحكم المسؤول عن الطلب؛ ابدأ بالتواصل معها، ويمكن لـ DOMINASE دعمها ضمن حدود دورها وصلاحياتها.",
          "لا يؤدي حذف بيانات من DOMINASE تلقائياً إلى حذف نسخ تتحكم بها جهات مستقلة، مثل شركة مستخدمة للمنصة أو Meta أو WhatsApp أو مزوّد خدمة آخر. تخضع بيانات تلك الجهات لإجراءاتها وسياساتها الخاصة.",
        ],
      },
      {
        id: "connected",
        title: "5. بيانات WhatsApp والوظائف المتصلة",
        paragraphs: [
          "اذكر في الطلب رقم الهاتف أو معرّف WhatsApp ذي الصلة واسم الشركة التي تم التواصل معها، إذا كان ذلك ضرورياً لتحديد السجل. سنراجع البيانات التي تعالجها DOMINASE لوظيفة المراسلة المتصلة ونحذف ما يمكن حذفه وفق نطاق الطلب والالتزامات المنطبقة.",
          "قد تحتاج أيضاً إلى التواصل مع الشركة التي راسلتها أو استخدام أدوات WhatsApp وMeta لطلب حذف البيانات التي تتحكم بها تلك الجهات.",
        ],
      },
      {
        id: "exceptions",
        title: "6. الاستثناءات والاحتفاظ المحدود",
        paragraphs: [
          "قد نحتفظ بجزء محدود من المعلومات عندما يكون ذلك لازماً لالتزام قانوني أو محاسبي، أو لأمن الخدمة ومنع الاحتيال، أو للتدقيق وإثبات تنفيذ الطلب، أو لحماية الحقوق وتسوية النزاعات. وقد تستمر نسخ احتياطية معزولة لفترة محدودة قبل استبدالها ضمن دورة النسخ المعتادة.",
          "إذا تعذر حذف جزء من البيانات، سنوضح السبب بالقدر الذي يسمح به القانون والأمان.",
        ],
      },
      {
        id: "response",
        title: "7. ماذا يحدث بعد الإرسال؟",
        paragraphs: [
          "سنراجع نطاق الطلب، ونطلب فقط أي معلومات إضافية لازمة للتحقق، ثم نعالج البيانات القابلة للحذف خلال مدة معقولة تتناسب مع حجم الطلب والمتطلبات القانونية. سنرسل رداً إلى وسيلة التواصل التي تم التحقق منها عند اكتمال المعالجة أو إذا احتجنا إلى خطوة أخرى.",
        ],
      },
    ],
    contactLabel: "ابدأ الطلب",
    contactTitle: "أرسل طلب حذف واضحاً ومختصراً.",
    contactBody: `استخدم البريد الرسمي لـ DOMINASE: ${CONTACT_CHANNELS.email.display}. لا ترسل كلمات مرور أو معلومات لا يحتاجها الطلب.`,
    contactCta: "أرسل طلب الحذف",
    relatedLabel: "السياسة الكاملة",
    relatedTitle: "راجع كيف تعالج DOMINASE المعلومات.",
    relatedBody: "تشرح سياسة الخصوصية أنواع المعلومات وأغراض المعالجة والمشاركة والأمان والاحتفاظ والحقوق.",
    relatedCta: "العودة إلى سياسة الخصوصية",
    relatedHref: "/privacy",
  },
  en: {
    eyebrow: "DOMINASE / Data control",
    title: "Data Deletion",
    lead:
      "You can request deletion of personal information associated with DOMINASE or connected WhatsApp functions. We ask only for what is needed to locate records and verify the request.",
    documentLabel: "Request guide",
    effectiveLabel: "Available since",
    effectiveDate: "September 9, 2026",
    updatedLabel: "Last updated",
    updatedDate: "September 9, 2026",
    contentsLabel: "Request steps",
    sections: [
      {
        id: "meaning",
        title: "1. What is a deletion request?",
        paragraphs: [
          "A deletion request asks DOMINASE to remove personal information it controls when there is no longer a legitimate need to retain it. This may include account or contact information or records connected to a function you used through DOMINASE.",
        ],
      },
      {
        id: "submit",
        title: "2. How to submit a request",
        paragraphs: [
          `Email the official DOMINASE address at ${CONTACT_CHANNELS.email.display} from a channel you can access, with “DOMINASE data deletion request” in the subject line.`,
          "Briefly explain what you want deleted. Do not send a password, access code, identity document, or extra personal information unless we later ask for a specific limited detail needed for verification.",
        ],
        bullets: [
          "Your name as it appears on the relevant account or record.",
          "The email address, phone number, or WhatsApp identifier connected to the record.",
          "The business or workspace name, if it helps identify the data.",
          "A short description of the feature, conversation, or record you want deleted.",
          "A suitable way for us to reply.",
        ],
        note: "Send the minimum information needed. We do not need details that do not help identify the record.",
      },
      {
        id: "verification",
        title: "3. Identity and authority verification",
        paragraphs: [
          "We may need to confirm that the requester is the person connected to the information or is authorized to act for them. Verification depends on the record and risk and may use access to the linked email or phone number or other limited information. If we cannot reasonably verify a request, we may ask for clarification or decline to delete another person's data.",
        ],
      },
      {
        id: "control",
        title: "4. Data DOMINASE controls",
        paragraphs: [
          "A request applies to data DOMINASE controls or can delete from its systems. If a business using DOMINASE entered your information into its account, that business may be the controller responsible for the request; contact it first, and DOMINASE can support it within the limits of our role and permissions.",
          "Deleting data from DOMINASE does not automatically delete copies controlled independently by another party, such as a business using the platform, Meta, WhatsApp, or another service provider. Those parties' own procedures and policies apply to their data.",
        ],
      },
      {
        id: "connected",
        title: "5. WhatsApp and connected-function data",
        paragraphs: [
          "If needed to identify the record, include the relevant phone or WhatsApp identifier and the name of the business you contacted. We will review information DOMINASE processes for the connected messaging function and delete what can be deleted within the request and applicable obligations.",
          "You may also need to contact the business you messaged or use WhatsApp and Meta tools to request deletion of information those parties control.",
        ],
      },
      {
        id: "exceptions",
        title: "6. Exceptions and limited retention",
        paragraphs: [
          "We may retain limited information when necessary for a legal or accounting obligation, service security and fraud prevention, audit purposes and proof that the request was completed, protection of rights, or dispute resolution. Isolated backups may also remain for a limited period until replaced through the ordinary backup cycle.",
          "If part of the information cannot be deleted, we will explain why to the extent permitted by law and security needs.",
        ],
      },
      {
        id: "response",
        title: "7. What happens after submission?",
        paragraphs: [
          "We will review the request's scope, ask only for any additional information needed for verification, and process eligible data within a reasonable period appropriate to the request and applicable law. We will reply through the verified contact channel when processing is complete or if another step is needed.",
        ],
      },
    ],
    contactLabel: "Start a request",
    contactTitle: "Send a clear, concise deletion request.",
    contactBody: `Use the official DOMINASE email: ${CONTACT_CHANNELS.email.display}. Do not send passwords or information the request does not need.`,
    contactCta: "Email a deletion request",
    relatedLabel: "Full policy",
    relatedTitle: "Review how DOMINASE processes information.",
    relatedBody: "The Privacy Policy covers information types, processing purposes, sharing, security, retention, and individual rights.",
    relatedCta: "Back to Privacy Policy",
    relatedHref: "/privacy",
  },
};

export default function LegalPageClient({ kind }: { kind: LegalPageKind }) {
  const { language, dir } = useLanguage();
  const copy = kind === "privacy"
    ? PRIVACY_COPY[language]
    : kind === "data-deletion"
      ? DELETION_COPY[language]
      : TERMS_COPY[language];
  const DirectionArrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const deletionSubject = language === "ar" ? "طلب حذف بيانات DOMINASE" : "DOMINASE data deletion request";
  const deletionHref = `${CONTACT_CHANNELS.email.href}?subject=${encodeURIComponent(deletionSubject)}`;

  return (
    <>
      <Header />
      <main className="legal-page" id="main-content">
        <header className="legal-hero">
          <div className="legal-hero__copy">
            <p className="legal-kicker">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="legal-lead">{copy.lead}</p>
          </div>

          <dl className="legal-ledger" aria-label={copy.documentLabel}>
            <div>
              <dt>{copy.documentLabel}</dt>
              <dd>DOMINASE</dd>
            </div>
            <div>
              <dt>{copy.effectiveLabel}</dt>
              <dd>{copy.effectiveDate}</dd>
            </div>
            <div>
              <dt>{copy.updatedLabel}</dt>
              <dd>{copy.updatedDate}</dd>
            </div>
          </dl>
        </header>

        <div className="legal-layout">
          <aside className="legal-toc" aria-label={copy.contentsLabel}>
            <p>{copy.contentsLabel}</p>
            <nav>
              {copy.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="legal-document">
            {copy.sections.map((section) => (
              <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : null}
                {section.note ? <p className="legal-note">{section.note}</p> : null}
                {section.links ? (
                  <div className="legal-inline-links">
                    {section.links.map((link) => (
                      <Link className="domi-action domi-action--secondary" href={link.href} key={link.href}>
                        {link.label}
                        <DirectionArrow aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </article>
        </div>

        {kind === "data-deletion" ? (
          <section className="legal-contact" aria-labelledby="legal-contact-title">
            <div>
              <p className="legal-kicker">{copy.contactLabel}</p>
              <h2 id="legal-contact-title">{copy.contactTitle}</h2>
              <p>{copy.contactBody}</p>
            </div>
            <a className="domi-action domi-action--primary" href={deletionHref}>
              <Mail aria-hidden="true" />
              {copy.contactCta}
            </a>
          </section>
        ) : null}

        <section className="legal-related" aria-labelledby="legal-related-title">
          <div>
            <p className="legal-kicker">{copy.relatedLabel}</p>
            <h2 id="legal-related-title">{copy.relatedTitle}</h2>
            <p>{copy.relatedBody}</p>
          </div>
          <div className="legal-related__actions">
            <Link className="domi-action domi-action--secondary" href={copy.relatedHref}>
              {copy.relatedCta}
              <DirectionArrow aria-hidden="true" />
            </Link>
            {copy.relatedAltHref && copy.relatedAltCta ? (
              <Link className="domi-action domi-action--secondary" href={copy.relatedAltHref}>
                {copy.relatedAltCta}
                <DirectionArrow aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </section>

        <div className="legal-contact-line">
          <Mail aria-hidden="true" />
          <span>{language === "ar" ? "البريد الرسمي" : "Official email"}</span>
          <a href={CONTACT_CHANNELS.email.href}>{CONTACT_CHANNELS.email.display}</a>
          <ArrowUpRight aria-hidden="true" />
        </div>
      </main>
      <Footer />
    </>
  );
}

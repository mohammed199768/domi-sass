import type { ConsultationService } from "@/components/consultation/ConsultationProvider";

export type RelatedKind = "service" | "work" | "insight";
export type RelatedPathway = {
  kind: RelatedKind;
  href: string;
  ar: { category: string; title: string; description: string };
  en: { category: string; title: string; description: string };
};

const service = (href: string, arTitle: string, enTitle: string, arDescription: string, enDescription: string): RelatedPathway => ({
  kind: "service", href,
  ar: { category: "خدمة مرتبطة", title: arTitle, description: arDescription },
  en: { category: "Related service", title: enTitle, description: enDescription },
});
const work = (href: string, title: string, arDescription: string, enDescription: string): RelatedPathway => ({
  kind: "work", href,
  ar: { category: "عمل مرتبط", title, description: arDescription },
  en: { category: "Related work", title, description: enDescription },
});
const insight = (href: string, arTitle: string, enTitle: string): RelatedPathway => ({
  kind: "insight", href,
  ar: { category: "فكرة مرتبطة", title: arTitle, description: "شرح عملي يساعدك على فهم القرار قبل تطبيقه." },
  en: { category: "Related insight", title: enTitle, description: "Practical thinking to understand the decision before applying it." },
});

export const serviceRelationships: Record<string, RelatedPathway[]> = {
  "web-development": [
    work("/work/sultan-shadi", "Sultan Shadi", "موقع يربط الهوية بالمحتوى والخدمة.", "A website connecting identity, content, and service."),
    insight("/insights/seo-discoverability-2026", "بناء موقع يستحق أن يظهر", "Build a site worth finding"),
  ],
  "custom-systems": [
    work("/work/pulse-gym", "PULSE Gym", "تجربة عضو وعمليات نادي في نظام مترابط.", "Member experience and gym operations in one system."),
    insight("/insights/website-as-a-system", "الموقع كجزء من نظام العمل", "The website as part of the operating system"),
  ],
  "education-platforms": [
    work("/work/manal-alhihi", "Manal Alhihi", "تجربة تعليمية تربط المحتوى بالطالب والإدارة.", "A learning experience connecting content, students, and operations."),
    insight("/insights/cta-that-matches-intent", "الإجراء المناسب لنية المستخدم", "Match the CTA to user intent"),
  ],
  "clinic-websites": [
    work("/work/our-clinic", "Our Clinic", "رحلة رقمية تربط المريض بالحجز والمتابعة.", "A digital journey connecting patients, booking, and follow-up."),
    insight("/insights/pixels-crm-and-the-path-after-ads", "من الإعلان إلى CRM والمتابعة", "From ad click to CRM and follow-up"),
  ],
};

export const insightRelationships: Record<string, RelatedPathway[]> = {
  "seo-discoverability-2026": [
    service("/services/web-development", "تطوير مواقع قابلة للظهور", "Web development built for discoverability", "بنية ومحتوى وأداء يساعد الناس ومحركات البحث على فهم الموقع.", "Structure, content, and performance that help people and search engines understand the site."),
    work("/work/sultan-shadi", "Sultan Shadi", "شاهد تطبيق الوضوح والبنية في مشروع حقيقي.", "See clarity and structure applied in a real project."),
  ],
  "cta-that-matches-intent": [
    service("/services/web-development", "مواقع تقود إلى الإجراء المناسب", "Websites with intent-matched actions", "نصمم المسار والإجراء حول قرار المستخدم.", "Journeys and actions designed around the user's decision."),
    work("/work/qasr-alfarah", "Qasr Al Farah", "حجز وتجربة ضيف ضمن رحلة مترابطة.", "Booking and guest experience in one connected journey."),
  ],
  "website-as-a-system": [
    service("/services/custom-systems", "أنظمة أعمال مخصصة", "Custom business systems", "اربط الطلبات والبيانات والمتابعة في سير عمل واضح.", "Connect requests, data, and follow-up in a clear workflow."),
    work("/work/pulse-gym", "PULSE Gym", "منتج يربط الواجهة العامة بالتشغيل الداخلي.", "A product connecting the public experience to internal operations."),
  ],
  "customer-behavior-changed": [
    service("/services/web-development", "تجربة موقع تناسب توقعات اليوم", "A website experience built for current expectations", "وضوح وسرعة وثقة وتجربة هاتف مريحة.", "Clarity, speed, trust, and a comfortable mobile journey."),
    work("/work/sultan-shadi", "Sultan Shadi", "تجربة محتوى وهوية تعمل بسلاسة على الهاتف.", "A content and identity experience shaped for mobile."),
  ],
  "pixels-crm-and-the-path-after-ads": [
    service("/services/custom-systems", "CRM وسير عمل مخصص", "Custom CRM and workflow", "احفظ مصدر العميل وحالته والمتابعة في مكان واحد.", "Keep lead source, state, and follow-up in one place."),
    work("/work/our-clinic", "Our Clinic", "رحلة تربط الوصول بالحجز وسياق المتابعة.", "A journey connecting acquisition, booking, and follow-up context."),
  ],
};

export const workRelationships: Record<string, { serviceInterest: ConsultationService; items: RelatedPathway[] }> = {
  "pulse-gym": { serviceInterest: "system", items: [service("/services/custom-systems", "الأنظمة المخصصة", "Custom systems", "حوّل العمليات المبعثرة إلى سير عمل واضح.", "Turn scattered operations into a clear workflow."), insight("/insights/website-as-a-system", "الموقع كجزء من النظام", "The website as part of the system")] },
  "our-clinic": { serviceInterest: "clinic", items: [service("/services/clinic-websites", "مواقع وأنظمة العيادات", "Clinic websites and systems", "اربط الثقة والحجز والمتابعة في رحلة واحدة.", "Connect trust, booking, and follow-up in one journey."), insight("/insights/pixels-crm-and-the-path-after-ads", "من الإعلان إلى CRM", "From ad click to CRM")] },
  "sultan-shadi": { serviceInterest: "website", items: [service("/services/web-development", "تطوير المواقع", "Web development", "مواقع واضحة وسريعة ومبنية حول الهدف.", "Clear, fast websites built around the goal."), insight("/insights/seo-discoverability-2026", "كيف يستحق الموقع أن يظهر", "How a site earns discoverability")] },
  "qasr-alfarah": { serviceInterest: "website", items: [service("/services/web-development", "مواقع وتجارب الحجز", "Websites and booking journeys", "اربط العرض بطلب واضح وتجربة منظمة.", "Connect the offer to a clear request and organized journey."), insight("/insights/cta-that-matches-intent", "CTA مرتبط بالنية", "CTA matched to intent")] },
  "horvath-survey": { serviceInterest: "system", items: [service("/services/custom-systems", "أنظمة مخصصة", "Custom systems", "بيانات وصلاحيات ونتائج ضمن منتج واحد.", "Data, permissions, and results in one product."), insight("/insights/website-as-a-system", "من الصفحات إلى النظام", "From pages to a system")] },
  "manal-alhihi": { serviceInterest: "education", items: [service("/services/education-platforms", "المنصات التعليمية", "Education platforms", "تجربة طالب وإدارة محتوى تحت علامتك.", "Student experience and content operations under your brand."), insight("/insights/cta-that-matches-intent", "الإجراء المناسب لكل مرحلة", "The right action for each stage")] },
  "curevie": { serviceInterest: "clinic", items: [service("/services/clinic-websites", "تجارب العيادات والحجز", "Clinic and booking experiences", "رحلة أوضح للمريض وسياق أفضل للفريق.", "A clearer patient journey and better context for the team."), insight("/insights/customer-behavior-changed", "توقعات العميل الرقمية", "Digital customer expectations")] },
};

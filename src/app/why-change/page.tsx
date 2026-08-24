import type { Metadata } from "next";
import WhyChangeClient from "@/features/why-change/WhyChangeClient";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/config/seo";

export const metadata: Metadata = {
  title: "لماذا تحتاج تطوير موقعك ونظامك الرقمي؟",
  description: "كيف يضيّع الموقع فرصاً حتى لو كان يعمل؟ دليل DOMINASE عن تجربة العميل، CTA، الحجز، tracking وCRM وتحويل الموقع من صفحات ثابتة إلى مسار يعمل.",
  alternates:{canonical:"/why-change"},
  openGraph:{title:"لماذا التغيير؟ — DOMINASE",description:"من موقع موجود إلى مسار رقمي يشرح، يحوّل ويتابع.",url:`${SITE_URL}/why-change`,siteName:BRAND.siteName,type:"article"}
};
export default function Page(){return <><JsonLd data={{"@context":"https://schema.org","@type":"WebPage",name:"لماذا تحتاج تطوير موقعك ونظامك الرقمي؟",url:`${SITE_URL}/why-change`,about:{"@id":`${SITE_URL}/#organization`},isPartOf:{"@id":`${SITE_URL}/#website`}}}/><WhyChangeClient/></>}

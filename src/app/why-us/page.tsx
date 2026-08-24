import type { Metadata } from "next";
import WhyUsClient from "@/features/why-us/WhyUsClient";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/config/seo";

export const metadata: Metadata = {
  title: "لماذا DOMINASE؟ | طريقة عمل شركة برمجة ومنتجات رقمية",
  description: "كيف تعمل DOMINASE من التشخيص واستراتيجية المنتج إلى UX/UI والبرمجة والقياس بعد الإطلاق لبناء مواقع ومنصات وأنظمة مخصصة في الأردن والسعودية.",
  alternates:{canonical:"/why-us"},
  openGraph:{title:"لماذا DOMINASE؟",description:"Product thinking, UX/UI, software development and measurable digital systems.",url:`${SITE_URL}/why-us`,siteName:BRAND.siteName,type:"article"}
};
export default function Page(){return <><JsonLd data={{"@context":"https://schema.org","@type":"AboutPage",name:"لماذا DOMINASE؟",url:`${SITE_URL}/why-us`,about:{"@id":`${SITE_URL}/#organization`},isPartOf:{"@id":`${SITE_URL}/#website`}}}/><WhyUsClient/></>}

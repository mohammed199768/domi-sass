import type { Metadata } from "next";
import AboutClient from "@/features/about/AboutClient";
import "@/features/about/about.css";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/config/seo";

export const metadata: Metadata = {
  title: "من نحن | شركة برمجة ومنتجات رقمية",
  description: "تعرف على DOMINASE: شركة برمجة ومنتجات رقمية من عمّان تعمل مع مشاريع في الأردن والسعودية لبناء المواقع، الأنظمة المخصصة، المنصات التعليمية وأنظمة العيادات.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About DOMINASE", description: "Software & digital products — Make it simple.", url: `${SITE_URL}/about`, siteName: BRAND.siteName, type: "website" },
};

export default function AboutPage(){
  return <><JsonLd data={{"@context":"https://schema.org","@type":"AboutPage",name:"About DOMINASE",url:`${SITE_URL}/about`,isPartOf:{"@id":`${SITE_URL}/#website`}}}/><AboutClient/></>;
}

import type { Metadata } from "next";
import InsightsIndexClient from "@/features/insights/InsightsIndexClient";
import "@/features/insights/insights.css";
import { SITE_URL, BRAND } from "@/config/seo";
export const metadata: Metadata = {title:"مقالات البرمجة وSEO وUX والأنظمة",description:"مقالات DOMINASE عن البرمجة، SEO، CTA، UX/UI، الأنظمة، CRM، المنصات التعليمية، مواقع العيادات والتحويل الرقمي.",alternates:{canonical:"/insights"},openGraph:{title:"DOMINASE Insights",description:"Practical articles on software, SEO, UX, CTA, systems and digital products.",url:`${SITE_URL}/insights`,siteName:BRAND.siteName,type:"website"}};
export default function Page(){return <InsightsIndexClient/>}

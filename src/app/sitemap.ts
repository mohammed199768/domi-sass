import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/seo";
import { productStoryOrder } from "@/features/product-stories/productStories";
import { services } from "@/data/services";
import { insights } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const releaseDate = "2026-08-25";

  const core: MetadataRoute.Sitemap = [
    ["", 1],
    ["/services", 0.95],
    ["/work", 0.9],
    ["/insights", 0.9],
    ["/about", 0.85],
    ["/markets/jordan", 0.86],
    ["/markets/saudi-arabia", 0.86],
    ["/contact", 0.9],
    ["/studio", 0.78],
    ["/diagnosis", 0.85],
    ["/why-change", 0.82],
    ["/why-us", 0.82],
    ["/diagnosis/clinic", 0.75],
    ["/diagnosis/venue", 0.75],
    ["/diagnosis/engineering", 0.75],
    ["/diagnosis/general-business", 0.75],
  ].map(([path, priority]) => ({
    url: `${SITE_URL}${path}`,
    lastModified: releaseDate,
    changeFrequency: "monthly" as const,
    priority: priority as number,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: releaseDate,
    changeFrequency: "monthly",
    priority: 0.88,
  }));

  const articlePages: MetadataRoute.Sitemap = insights.map((article) => ({
    url: `${SITE_URL}/insights/${article.slug}`,
    lastModified: article.published,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const stories: MetadataRoute.Sitemap = productStoryOrder.map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified: releaseDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...core, ...servicePages, ...articlePages, ...stories];
}

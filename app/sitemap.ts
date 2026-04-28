import type { MetadataRoute } from "next";
import { TOOL_PAGES } from "@/data/toolPages";
import { BLOG_POSTS } from "@/data/blogPosts";

const SITE_URL = "https://datetimecalchub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...TOOL_PAGES.map((tool) => ({
      url: `${SITE_URL}/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: tool.category === "countdown" ? 0.7 : 0.8,
    })),
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}

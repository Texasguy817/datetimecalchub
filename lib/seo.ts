import type { Metadata } from "next";
import type { ToolPageConfig } from "@/data/toolPages";

const SITE_URL = "https://timecalchub.com";
const SITE_NAME = "TimeCalcHub";

export function buildPageMetadata(config: ToolPageConfig): Metadata {
  return {
    title: config.title,
    description: config.description,
    alternates: { canonical: `${SITE_URL}/${config.slug}` },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `${SITE_URL}/${config.slug}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: config.title, description: config.description },
  };
}

export function buildFaqJsonLd(config: ToolPageConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

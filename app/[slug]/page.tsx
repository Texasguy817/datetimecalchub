import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { TOOL_PAGES, getToolBySlug } from "@/data/toolPages";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return TOOL_PAGES.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return buildPageMetadata(tool);
}

export default async function ToolRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  return <ToolPage config={tool} />;
}

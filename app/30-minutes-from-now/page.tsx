import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getToolBySlug } from "@/data/toolPages";
import { buildPageMetadata } from "@/lib/seo";

const SLUG = "30-minutes-from-now";

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug(SLUG);
  if (!tool) return {};
  return buildPageMetadata(tool);
}

export default function DirectToolPage() {
  const tool = getToolBySlug(SLUG);
  if (!tool) notFound();
  return <ToolPage config={tool} />;
}

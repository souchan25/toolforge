// app/tools/[slug]/page.tsx — Dynamic Tool Page
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS, getToolBySlug, getRelatedTools } from "@/lib/tools/registry";
import { ToolPageClient } from "./ToolPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };
  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} | ToolForge`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  const related = getRelatedTools(tool);
  return <ToolPageClient tool={tool} relatedTools={related} />;
}

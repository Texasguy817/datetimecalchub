import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import AdPlaceholder from "@/components/AdPlaceholder";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blogPosts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://timecalchub.com/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white text-slate-900">
        <article className="mx-auto max-w-4xl px-4 py-12 md:px-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{post.category}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{post.description}</p>

          <div className="mt-8">
            <AdPlaceholder label="Blog post ad placement" />
          </div>

          <div className="mt-10 space-y-5 text-slate-700">
            {post.content.map((paragraph, index) => (
              <p key={index} className="leading-8">{paragraph}</p>
            ))}
          </div>

          <section className="mt-12 rounded-3xl border border-slate-200 p-6">
            <h2 className="text-2xl font-bold">Related tools</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {post.relatedTools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">
                  {tool.title}
                </Link>
              ))}
            </div>
          </section>

          {relatedPosts.length > 0 ? (
            <section className="mt-12 rounded-3xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold">Related articles</h2>
              <div className="mt-4 space-y-3">
                {relatedPosts.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`} className="block rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
    </>
  );
}

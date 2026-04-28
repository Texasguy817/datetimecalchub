import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import AdPlaceholder from "@/components/AdPlaceholder";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function BlogIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white text-slate-900">
        <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Blog</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Simple Guides for Time, Date, Work, and Sleep Calculations
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            These guides explain common time and date questions in plain language and link directly to the tools that help visitors act on the answer.
          </p>

          <div className="mt-8">
            <AdPlaceholder label="Blog index ad placement" />
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{post.category}</p>
                <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
                <p className="mt-3 text-slate-600">{post.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

import type { ToolPageConfig } from "@/data/toolPages";
import { buildFaqJsonLd } from "@/lib/seo";
import { getBodyCopy } from "@/lib/content";
import RelatedTools from "@/components/RelatedTools";
import SiteHeader from "@/components/SiteHeader";
import AdPlaceholder from "@/components/AdPlaceholder";
import InteractiveTool from "@/components/InteractiveTool";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function ToolPage({ config }: { config: ToolPageConfig }) {
  const jsonLd = buildFaqJsonLd(config);
  const body = getBodyCopy(config);
  const relatedGuides = BLOG_POSTS.filter((post) => post.category === config.category || post.relatedTools.some((tool) => tool.href === `/${config.slug}`)).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white text-slate-900">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="mx-auto max-w-5xl px-4 py-10 md:px-6 lg:px-8">
          <div className="mb-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
              {config.category === "countdown" ? "Countdown Tool" : config.category === "date" ? "Date Calculator" : config.category === "utility" ? "Practical Time Tool" : "Time Calculator"}
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{config.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">{config.description}</p>
          </div>

          <div className="mb-8"><AdPlaceholder label="Top ad placement" /></div>

          <InteractiveTool config={config} />

          <section className="mb-10">
            <h2 className="text-2xl font-bold">How this tool helps</h2>
            <div className="mt-4 space-y-4 text-slate-700">
              <p>{body.intro}</p>
              <p>TimeCalcHub uses dedicated pages for specific search queries so people can get fast answers without digging through a cluttered site. That improves usability and gives the site stronger topical coverage for SEO.</p>
              <p>The page also includes related tools, examples, and FAQs so it feels more complete than a one-line AI answer.</p>
            </div>
          </section>

          <section className="mb-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold">Examples</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                {body.examples.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold">Common use cases</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                {body.uses.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>

          <div className="mb-10"><AdPlaceholder label="Middle ad placement" /></div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-4 space-y-4">
              {config.faq.map((item) => (
                <div key={item.question} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-slate-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <RelatedTools related={config.related} />


          {relatedGuides.length > 0 ? (
            <section className="mb-10 rounded-3xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold">Helpful guides</h2>
              <div className="mt-4 space-y-3">
                {relatedGuides.map((post) => (
                  <a key={post.slug} href={`/blog/${post.slug}`} className="block rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">
                    <p className="font-semibold">{post.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{post.description}</p>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mb-10"><AdPlaceholder label="Bottom ad placement" /></div>
        </section>
      </main>
    </>
  );
}

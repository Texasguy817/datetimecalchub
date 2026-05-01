import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import AdPlaceholder from "@/components/AdPlaceholder";
import { CATEGORY_COUNTS, FEATURED_SLUGS, TOOL_PAGES } from "@/data/toolPages";
import { BLOG_POSTS } from "@/data/blogPosts";

function pick(slug: string) {
  return TOOL_PAGES.find((item) => item.slug === slug)!;
}

export default function HomePage() {
  const featured = FEATURED_SLUGS.map(pick);
  const timePages = TOOL_PAGES.filter((item) => item.category === "time").slice(0, 6);
  const datePages = TOOL_PAGES.filter((item) => item.category === "date").slice(0, 6);
  const countdownPages = TOOL_PAGES.filter((item) => item.category === "countdown").slice(0, 6);
  const utilityPages = TOOL_PAGES.filter((item) => item.category === "utility").slice(0, 6);
  const blogPosts = BLOG_POSTS.slice(0, 6);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white text-slate-900">
        <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Complete V1 launch build</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">TimeCalcHub: Time, Date, Countdown, Work, and Sleep Tools</h1>
        <div style={{ textAlign: "center", margin: "20px auto", fontSize: "14px" }}>
  Need student tools? Try{" "}
  <a href="https://studentcalclab.com">StudentCalcLab</a>.
</div>  
          
          
          
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            This V1 site is structured to feel complete before launch. It includes broad time coverage, date tools, named countdowns, daily countdown pages, work-hour tools, and sleep planning tools.
          </p>

          <div className="mt-8"><AdPlaceholder label="Homepage ad placement" /></div>

          <section className="mt-12 grid gap-4 md:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 p-6"><p className="text-sm text-slate-500">Time pages</p><p className="mt-2 text-3xl font-bold">{CATEGORY_COUNTS.time}</p></div>
            <div className="rounded-3xl border border-slate-200 p-6"><p className="text-sm text-slate-500">Date pages</p><p className="mt-2 text-3xl font-bold">{CATEGORY_COUNTS.date}</p></div>
            <div className="rounded-3xl border border-slate-200 p-6"><p className="text-sm text-slate-500">Countdown pages</p><p className="mt-2 text-3xl font-bold">{CATEGORY_COUNTS.countdown}</p></div>
            <div className="rounded-3xl border border-slate-200 p-6"><p className="text-sm text-slate-500">Utility pages</p><p className="mt-2 text-3xl font-bold">{CATEGORY_COUNTS.utility}</p></div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-bold">Featured tools</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((tool) => (
                <Link key={tool.slug} href={`/${tool.slug}`} className="rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50">
                  <h3 className="text-lg font-semibold">{tool.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Time calculators</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {timePages.map((tool) => <Link key={tool.slug} href={`/${tool.slug}`} className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">{tool.title}</Link>)}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Date calculators</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {datePages.map((tool) => <Link key={tool.slug} href={`/${tool.slug}`} className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">{tool.title}</Link>)}
              </div>
            </div>
          </section>

          <section className="mt-14 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Countdown pages</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {countdownPages.map((tool) => <Link key={tool.slug} href={`/${tool.slug}`} className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">{tool.title}</Link>)}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Practical tools</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {utilityPages.map((tool) => <Link key={tool.slug} href={`/${tool.slug}`} className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">{tool.title}</Link>)}
              </div>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-bold">Helpful guides</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{post.category}</p>
                  <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{post.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-3xl border border-slate-200 p-6">
            <h2 className="text-2xl font-bold">What is included in this V1</h2>
            <div className="mt-4 space-y-3 text-slate-700">
              <p>Add time, subtract time, future and past time queries, date-shift tools, countdown pages for 2026 and 2027, conversion tools, a work hours calculator, a time duration calculator, and a sleep calculator.</p>
              <p>This upgraded structure now includes a blog layer, stronger tool coverage, deeper date math, broader time ranges, and more authority content around work hours, countdowns, and planning.</p>
            </div>
          </section>
        </section>
     <div style={{ textAlign: "center", margin: "40px auto", fontSize: "14px" }}>
  Need student tools? Try{" "}
  <a href="https://studentcalclab.com">StudentCalcLab</a>.
</div> 
      
      
      
      </main>
    </>
  );
<div style={{ textAlign: "center", margin: "40px auto", fontSize: "14px" }}>
  Need student tools? Try{" "}
  <a href="https://studentcalclab.com">StudentCalcLab</a>.
</div>



}

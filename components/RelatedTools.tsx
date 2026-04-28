import Link from "next/link";

type RelatedTool = { title: string; href: string };

export default function RelatedTools({ related }: { related: RelatedTool[] }) {
  if (!related.length) return null;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold">Related tools</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50">
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

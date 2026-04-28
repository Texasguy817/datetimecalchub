import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">TimeCalcHub</Link>
        <nav className="hidden gap-5 text-sm text-slate-600 md:flex">
          <Link href="/">Home</Link>
          <Link href="/add-8-hours-to-now">Add Time</Link>
          <Link href="/how-many-days-until-christmas-2026">Countdowns</Link>
          <Link href="/work-hours-calculator">Work Hours</Link>
          <Link href="/sleep-calculator">Sleep</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}

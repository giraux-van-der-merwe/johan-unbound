import Link from "next/link";

const adventures = [
  {
    title: "Into the Open",
    date: "Field note",
    summary:
      "A first dispatch for the places, people, and small turning points that shape the road ahead.",
    tag: "Journal",
  },
  {
    title: "Lessons From Motion",
    date: "Coming soon",
    summary:
      "Short reflections from new trails, working sessions, conversations, and days that refuse to stay ordinary.",
    tag: "Reflection",
  },
  {
    title: "What Stayed With Me",
    date: "Coming soon",
    summary:
      "A home for the moments worth keeping: practical insight, honest backstory, and the occasional hard-won map.",
    tag: "Story",
  },
];

export default function RecentAdventuresPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#1d2520]">
      <section className="relative isolate overflow-hidden bg-[#13231d] text-white">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-55"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=82')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-[#13231d]/55" />
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
          <Link className="text-sm font-semibold uppercase tracking-[0.24em]" href="/">
            Johan Unbound
          </Link>
          <Link
            className="rounded-full border border-white/35 px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-[#13231d]"
            href="/"
          >
            Home
          </Link>
        </nav>
        <div className="mx-auto flex min-h-[62vh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 sm:px-8 lg:pb-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#f4bf72]">
            Recent Adventures
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-none sm:text-7xl">
            Notes from the road, the work, and the wild edges between.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-12 sm:px-8 md:grid-cols-3 lg:py-20">
        {adventures.map((adventure) => (
          <article
            className="rounded-lg border border-[#d8cbb8] bg-white p-6 shadow-sm"
            key={adventure.title}
          >
            <div className="mb-8 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#9b5f35]">
              <span>{adventure.tag}</span>
              <span>{adventure.date}</span>
            </div>
            <h2 className="text-2xl font-semibold text-[#16231d]">{adventure.title}</h2>
            <p className="mt-4 text-base leading-7 text-[#59645d]">{adventure.summary}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

import Link from "next/link";
import { InstagramCarousel } from "@/components/instagram-carousel";
import { getInstagramPosts } from "@/lib/instagram";

export default async function Home() {
  const instagramFeed = await getInstagramPosts(30);

  return (
    <main className="bg-[#f7f3ea] text-[#1d2520]">
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-[#13231d] text-white">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-60"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=82')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-[#13231d]/58" />
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
          <a className="text-sm font-semibold uppercase tracking-[0.24em]" href="#top">
            Johan Unbound
          </a>
          <Link
            className="rounded-full border border-white/35 px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-[#13231d]"
            href="/recent-adventures"
          >
            Recent Adventures
          </Link>
        </nav>
        <div
          className="mx-auto flex min-h-[calc(92vh-88px)] max-w-6xl flex-col justify-end px-5 pb-12 sm:px-8 lg:pb-16"
          id="top"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#f4bf72]">
            Personal brand and contact
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-none sm:text-7xl lg:text-8xl">
            Johan Unbound
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">
            A compact home for Johan&apos;s backstory, current links, ways to
            connect, and the first trailhead into his Recent Adventures.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="rounded-full bg-[#f4bf72] px-5 py-3 text-sm font-bold text-[#13231d] transition hover:bg-white"
              href="mailto:hello@johanunbound.com"
            >
              Contact Johan
            </a>
            <Link
              className="rounded-full border border-white/35 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#13231d]"
              href="/recent-adventures"
            >
              Read Adventures
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1fr_1.2fr] lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5f35]">
            Backstory
          </p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#16231d] sm:text-5xl">
            Built for a life with fewer borders.
          </h2>
        </div>
        <div className="space-y-6 text-lg leading-8 text-[#4b5a51]">
          <p>
            Johan Unbound is a personal outpost for the story behind the work:
            the choices, questions, places, and people that keep widening the
            map. It is intentionally simple, direct, and easy to keep alive.
          </p>
          <p>
            The home page carries the evergreen essentials. Recent Adventures is
            where new stories can collect over time as a blog, field journal, or
            lightweight archive.
          </p>
        </div>
      </section>

      <section className="border-y border-[#d8cbb8] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3 lg:py-16">
          {[
            ["LinkedIn", "Professional updates and conversation."],
            ["Instagram", "Visual notes from places and projects."],
            ["Email", "The cleanest route for invitations and contact."],
          ].map(([title, text]) => (
            <div key={title}>
              <h3 className="text-xl font-semibold text-[#16231d]">{title}</h3>
              <p className="mt-3 text-base leading-7 text-[#59645d]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <InstagramCarousel
        error={instagramFeed.error}
        isLive={instagramFeed.isLive}
        posts={instagramFeed.posts}
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5f35]">
            Contact
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-[#16231d]">
            Open to good conversations, thoughtful work, and the next road.
          </h2>
        </div>
        <div className="rounded-lg border border-[#d8cbb8] bg-white p-6">
          <a
            className="block text-lg font-semibold text-[#16231d] underline decoration-[#f4bf72] decoration-4 underline-offset-4"
            href="mailto:hello@johanunbound.com"
          >
            hello@johanunbound.com
          </a>
          <p className="mt-4 text-base leading-7 text-[#59645d]">
            Replace this placeholder with Johan&apos;s preferred inbox and add
            live social URLs when they are ready.
          </p>
        </div>
      </section>
    </main>
  );
}

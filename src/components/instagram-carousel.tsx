/* eslint-disable @next/next/no-img-element */
import type { InstagramPost } from "@/lib/instagram";

type InstagramCarouselProps = {
  posts: InstagramPost[];
  isLive: boolean;
  error?: string;
};

export function InstagramCarousel({
  posts,
  isLive,
  error,
}: InstagramCarouselProps) {
  const feed = buildLoop(posts, 30);
  const midpoint = Math.ceil(feed.length / 2);
  const topRow = feed.slice(0, midpoint);
  const bottomRow = feed.slice(midpoint);

  return (
    <section className="overflow-hidden border-y border-[#d8cbb8] bg-[#16231d] py-14 text-white lg:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f4bf72]">
            Instagram
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            Recent posts, always moving through Johan&apos;s story.
          </h2>
        </div>
        <div className="max-w-sm text-sm leading-6 text-white/72">
          {isLive
            ? "Live feed connected through the Instagram API and cached server-side."
            : "Ready for the Instagram API. Showing placeholders until Johan's access token is added."}
          {error ? <span className="sr-only"> {error}</span> : null}
        </div>
      </div>

      <div className="instagram-wall mt-12" aria-label="Scrolling Instagram posts">
        <div className="instagram-wall-inner">
          <InstagramRow direction="left" posts={topRow} rowName="top" />
          <InstagramRow direction="right" posts={bottomRow} rowName="bottom" />
        </div>
      </div>
    </section>
  );
}

function InstagramRow({
  direction,
  posts,
  rowName,
}: {
  direction: "left" | "right";
  posts: InstagramPost[];
  rowName: string;
}) {
  const loop = [...posts, ...posts];

  return (
    <div className={`instagram-row instagram-row-${rowName}`}>
      <div className={`instagram-row-track instagram-row-track-${direction}`}>
        {loop.map((post, index) => (
          <a
            className="instagram-grid-card group"
            href={post.permalink}
            key={`${rowName}-${post.id}-${index}`}
            rel="noreferrer"
            target="_blank"
          >
            {post.mediaUrl || post.thumbnailUrl ? (
              <img
                alt={post.caption || "Instagram post from Johan"}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                src={post.thumbnailUrl || post.mediaUrl}
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm uppercase tracking-[0.2em] text-white/58">
                Instagram media
              </div>
            )}
            <p className="instagram-caption">{truncateCaption(post.caption)}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function buildLoop(posts: InstagramPost[], desiredCount: number) {
  if (posts.length === 0) {
    return [];
  }

  const loop: InstagramPost[] = [];

  while (loop.length < desiredCount) {
    loop.push(...posts);
  }

  return loop.slice(0, desiredCount);
}

function truncateCaption(caption?: string) {
  if (!caption) {
    return "View on Instagram";
  }

  return caption.length > 96 ? `${caption.slice(0, 93).trim()}...` : caption;
}

import Link from "next/link";
import { getInstagramPosts, type InstagramPost } from "@/lib/instagram";

const instagramUrl = "https://www.instagram.com/mr.supawesome_traveler/";
const linkedInUrl = "https://www.linkedin.com/in/johan-fourie-9459391ab/";

export default async function Home() {
  const instagramFeed = await getInstagramPosts(30);
  const heroCards = buildHeroCards(instagramFeed.posts);

  return (
    <main className="home-redesign bg-[#e9e2cf] text-[#19134c]">
      <section className="hero-shell">
        <div className="hero-panel">
          <nav className="hero-nav" aria-label="Primary navigation">
            <Link className="hero-brand" href="/">
              Johan Unbound
            </Link>
            <div className="hero-links">
              <a href={instagramUrl} rel="noreferrer" target="_blank">
                Instagram
              </a>
              <a href={linkedInUrl} rel="noreferrer" target="_blank">
                LinkedIn
              </a>
              <Link href="/recent-adventures">Blog</Link>
            </div>
          </nav>

          <div className="hero-stage">
            <h1>
              <span>TOTALLY</span> <span>UNBOUND</span>
            </h1>
            <div className="hero-bio">
              <p className="hero-kicker">Personal stories and travel</p>
              <p>
                Johan Fourie shares recent routes, practical notes, and a life
                shaped by curiosity beyond the obvious map.
              </p>
            </div>
            <div
              aria-label="Johan Unbound adventure hero image"
              className="hero-person"
              role="img"
            />
          </div>
        </div>
      </section>

      <section className="instagram-feature" aria-labelledby="instagram-title">
        <div className="instagram-feature-inner">
          <div className="instagram-feature-header">
            <p>Recent Instagram posts</p>
            <h2 id="instagram-title">Field notes from the road.</h2>
          </div>

          <div className="instagram-card-rail" aria-label="Recent Instagram posts">
            {heroCards.map((post, index) => (
              <a
                className="hero-post-card"
                href={post.permalink}
                key={`${post.id}-${index}`}
                rel="noreferrer"
                target="_blank"
              >
                <div
                  className="hero-post-image"
                  style={{
                    backgroundImage: `url("${post.thumbnailUrl || post.mediaUrl}")`,
                  }}
                />
                <span className="hero-card-icon" aria-hidden="true">
                  ○
                </span>
                <p>{truncateCaption(post.caption)}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <Link className="footer-brand" href="/">
            Johan Unbound
          </Link>
          <p>
            A personal field note for stories, contact, and recent adventures.
          </p>
        </div>
        <div className="footer-links">
          <a href="mailto:hello@johanunbound.com">hello@johanunbound.com</a>
          <a href={instagramUrl} rel="noreferrer" target="_blank">
            Instagram
          </a>
          <a href={linkedInUrl} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <Link href="/recent-adventures">Blog</Link>
        </div>
        <p className="footer-meta">
          © {new Date().getFullYear()} Johan Unbound. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

function buildHeroCards(posts: InstagramPost[]) {
  const mediaPosts = posts.filter((post) => post.mediaUrl || post.thumbnailUrl);

  if (mediaPosts.length >= 8) {
    return mediaPosts.slice(0, 8);
  }

  const loop: InstagramPost[] = [];

  while (loop.length < 8 && mediaPosts.length > 0) {
    loop.push(...mediaPosts);
  }

  return loop.slice(0, 8);
}

function truncateCaption(caption?: string) {
  if (!caption) {
    return "View on Instagram";
  }

  return caption.length > 68 ? `${caption.slice(0, 65).trim()}...` : caption;
}

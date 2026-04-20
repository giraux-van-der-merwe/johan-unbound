import { getInstagramPosts, isInstagramConfigured } from "@/lib/instagram";

export const revalidate = 3600;

export async function GET() {
  const feed = await getInstagramPosts(30);

  return Response.json({
    configured: isInstagramConfigured(),
    live: feed.isLive,
    error: feed.error,
    posts: feed.posts,
  });
}

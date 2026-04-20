export type InstagramPost = {
  id: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | "UNKNOWN";
  mediaUrl?: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp?: string;
  username?: string;
};

type InstagramApiPost = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  username?: string;
};

type InstagramApiResponse = {
  data?: InstagramApiPost[];
  error?: {
    message?: string;
    type?: string;
    code?: number;
  };
};

export const fallbackInstagramPosts: InstagramPost[] = [
  {
    id: "fallback-open-road",
    caption: "A note from the open road.",
    mediaType: "IMAGE",
    mediaUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=82",
    permalink: "https://www.instagram.com/",
    timestamp: "Coming soon",
  },
  {
    id: "fallback-field-note",
    caption: "Field notes, places, and small lessons worth keeping.",
    mediaType: "IMAGE",
    mediaUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=82",
    permalink: "https://www.instagram.com/",
    timestamp: "Coming soon",
  },
  {
    id: "fallback-quiet-work",
    caption: "Behind the scenes of the work and the wandering.",
    mediaType: "IMAGE",
    mediaUrl:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=82",
    permalink: "https://www.instagram.com/",
    timestamp: "Coming soon",
  },
  {
    id: "fallback-next-adventure",
    caption: "The next adventure will appear here automatically.",
    mediaType: "IMAGE",
    mediaUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=82",
    permalink: "https://www.instagram.com/",
    timestamp: "Coming soon",
  },
];

export function isInstagramConfigured() {
  return Boolean(process.env.INSTAGRAM_ACCESS_TOKEN);
}

export async function getInstagramPosts(limit = 8): Promise<{
  posts: InstagramPost[];
  isLive: boolean;
  error?: string;
}> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID || "me";
  const apiVersion = process.env.INSTAGRAM_API_VERSION || "v24.0";
  const graphBaseUrl =
    process.env.INSTAGRAM_GRAPH_BASE_URL || "https://graph.instagram.com";

  if (!accessToken) {
    return {
      posts: fallbackInstagramPosts,
      isLive: false,
      error: "Instagram access token is not configured.",
    };
  }

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
    "username",
  ].join(",");

  const url = new URL(`${graphBaseUrl.replace(/\/$/, "")}/${apiVersion}/${userId}/media`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 * 60 },
    });
    const payload = (await response.json()) as InstagramApiResponse;

    if (!response.ok || payload.error) {
      return {
        posts: fallbackInstagramPosts,
        isLive: false,
        error:
          payload.error?.message ||
          `Instagram request failed with status ${response.status}.`,
      };
    }

    const posts = (payload.data || [])
      .filter((post) => post.permalink)
      .map((post): InstagramPost => {
        const mediaType = normalizeMediaType(post.media_type);

        return {
          id: post.id,
          caption: post.caption,
          mediaType,
          mediaUrl: post.media_url,
          thumbnailUrl: post.thumbnail_url,
          permalink: post.permalink || "https://www.instagram.com/",
          timestamp: post.timestamp,
          username: post.username,
        };
      });

    return {
      posts: posts.length > 0 ? posts : fallbackInstagramPosts,
      isLive: posts.length > 0,
    };
  } catch (error) {
    return {
      posts: fallbackInstagramPosts,
      isLive: false,
      error:
        error instanceof Error
          ? error.message
          : "Instagram request failed for an unknown reason.",
    };
  }
}

function normalizeMediaType(mediaType?: string): InstagramPost["mediaType"] {
  if (
    mediaType === "IMAGE" ||
    mediaType === "VIDEO" ||
    mediaType === "CAROUSEL_ALBUM"
  ) {
    return mediaType;
  }

  return "UNKNOWN";
}

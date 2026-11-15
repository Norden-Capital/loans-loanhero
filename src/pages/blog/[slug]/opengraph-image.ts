import type { APIRoute } from "astro";

import { BLOG_SECTION, getAllPosts, getPost } from "@/lib/blog";
import { articleOgImage } from "@/lib/og";
import { SITE_NAME } from "@/lib/seo";

// /blog/<slug>/opengraph-image — the post's share image (PNG), made at build time.
export async function getStaticPaths() {
  return (await getAllPosts()).map((post) => ({ params: { slug: post.slug } }));
}

export const GET: APIRoute = async ({ params }) => {
  const post = await getPost(String(params.slug));
  return articleOgImage({
    title: post?.meta.title ?? `${SITE_NAME} ${BLOG_SECTION.label}`,
    eyebrow: post?.meta.category ?? BLOG_SECTION.label,
    path: BLOG_SECTION.path,
    size: { width: 1200, height: 630 },
  });
};

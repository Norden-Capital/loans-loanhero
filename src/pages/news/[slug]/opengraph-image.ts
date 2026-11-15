import type { APIRoute } from "astro";

import { NEWS_SECTION, getAllNews, getNews } from "@/lib/news";
import { articleOgImage } from "@/lib/og";
import { SITE_NAME } from "@/lib/seo";

// /news/<slug>/opengraph-image — the item's share image (PNG), made at build time.
export async function getStaticPaths() {
  return (await getAllNews()).map((item) => ({ params: { slug: item.slug } }));
}

export const GET: APIRoute = async ({ params }) => {
  const item = await getNews(String(params.slug));
  return articleOgImage({
    title: item?.meta.title ?? `${SITE_NAME} ${NEWS_SECTION.label}`,
    eyebrow: item?.meta.category ?? NEWS_SECTION.label,
    path: NEWS_SECTION.path,
    size: { width: 1200, height: 630 },
  });
};

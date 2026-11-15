import type { APIRoute } from "astro";

import { getAllNews, NEWS_DESCRIPTION, NEWS_SECTION } from "@/lib/news";
import { rssResponse } from "@/lib/rss";
import { SITE_NAME } from "@/lib/seo";

export const GET: APIRoute = async () =>
  rssResponse({
    title: `${SITE_NAME} ${NEWS_SECTION.label}`,
    description: NEWS_DESCRIPTION,
    path: NEWS_SECTION.path,
    posts: await getAllNews(),
  });

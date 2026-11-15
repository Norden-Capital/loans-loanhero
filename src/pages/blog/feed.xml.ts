import type { APIRoute } from "astro";

import { BLOG_DESCRIPTION, BLOG_SECTION, getAllPosts } from "@/lib/blog";
import { rssResponse } from "@/lib/rss";
import { SITE_NAME } from "@/lib/seo";

export const GET: APIRoute = async () =>
  rssResponse({
    title: `${SITE_NAME} ${BLOG_SECTION.label}`,
    description: BLOG_DESCRIPTION,
    path: BLOG_SECTION.path,
    posts: await getAllPosts(),
  });

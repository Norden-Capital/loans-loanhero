import type { APIRoute } from "astro";

import { toSitemapIndexXml } from "@/lib/sitemap";

// The sitemap index. Lists the section sitemaps in src/pages/sitemap/[section].ts.
// scripts/indexnow.mjs reads this file for --all.
export const GET: APIRoute = () =>
  new Response(toSitemapIndexXml(), {
    headers: { "Content-Type": "application/xml" },
  });

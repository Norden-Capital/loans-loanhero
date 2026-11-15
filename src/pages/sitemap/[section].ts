import type { APIRoute, GetStaticPaths } from "astro";

import { getSitemapEntries, sitemapSections, toUrlsetXml, type SitemapSection } from "@/lib/sitemap";

// /sitemap/pages.xml, /sitemap/loans.xml, /sitemap/resources.xml, /sitemap/blog.xml, /sitemap/news.xml
export const getStaticPaths = (() =>
  sitemapSections.map((section) => ({ params: { section: `${section}.xml` } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const name = String(params.section).replace(/\.xml$/, "") as SitemapSection;
  return new Response(toUrlsetXml(await getSitemapEntries(name)), {
    headers: { "Content-Type": "application/xml" },
  });
};

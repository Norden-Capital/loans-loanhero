import type { APIRoute } from "astro";

import { BASE_URL } from "@/lib/seo";

// Same output as the old app/robots.ts.
export const GET: APIRoute = () =>
  new Response(
    `User-Agent: *
Allow: /
Crawl-delay: 1

User-Agent: Googlebot
Allow: /

User-Agent: Bingbot
Allow: /

User-Agent: Slurp
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`,
    { headers: { "Content-Type": "text/plain" } },
  );

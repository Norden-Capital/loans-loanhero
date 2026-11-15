// @ts-check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Small additions to the Vercel build output (.vercel/output/config.json) so
 * files are served exactly as the old Next.js site served them:
 *
 * - /blog/<slug>/opengraph-image and /news/<slug>/opengraph-image have no file
 *   extension, so Vercel is told they are PNG images ("overrides").
 * - The RSS feeds keep their old content type and cache header.
 * - "…/index.html" URLs return the 404 page, as before.
 *
 * Runs after @astrojs/vercel has written the output.
 * @returns {import("astro").AstroIntegration}
 */
export default function vercelOutputTweaks() {
  return {
    name: "vercel-output-tweaks",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const out = path.resolve(".vercel/output");
        const configPath = path.join(out, "config.json");
        if (!fs.existsSync(configPath)) {
          logger.warn("no .vercel/output/config.json — skipped");
          return;
        }
        const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

        // 1. Content type for the extension-less share images.
        const overrides = (config.overrides ??= {});
        let images = 0;
        for (const section of ["blog", "news"]) {
          // The built pages (the adapter copies them to .vercel/output/static).
          const sectionDir = path.join(fileURLToPath(dir), section);
          if (!fs.existsSync(sectionDir)) continue;
          for (const slug of fs.readdirSync(sectionDir)) {
            const file = path.join(sectionDir, slug, "opengraph-image");
            if (fs.existsSync(file)) {
              overrides[`${section}/${slug}/opengraph-image`] = { contentType: "image/png" };
              images++;
            }
          }
        }

        // 2. RSS feeds: same headers as before.
        const feedRoute = {
          src: "^/(blog|news)/feed\\.xml$",
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
          continue: true,
        };
        // 3. Pages are stored as <page>/index.html. The old site had no such
        //    URLs, so "/index.html", "/services/index.html"… stay 404 pages.
        const indexRoute = { src: "^/(?:.*/)?index\\.html$", dest: "/404.html", status: 404 };

        /** @type {Array<{ src?: string, handle?: string }>} */
        const routes = config.routes ?? [];
        for (const route of [feedRoute, indexRoute]) {
          if (routes.some((r) => r.src === route.src)) continue;
          const fsIndex = routes.findIndex((r) => r.handle === "filesystem");
          routes.splice(fsIndex === -1 ? 0 : fsIndex, 0, route);
        }
        config.routes = routes;

        fs.writeFileSync(configPath, JSON.stringify(config, null, "\t"));
        logger.info(`${images} share images typed as PNG; feed headers added`);
      },
    },
  };
}

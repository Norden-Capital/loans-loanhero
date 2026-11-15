import fs from "node:fs";
import path from "node:path";

import { defineCollection } from "astro:content";
import type { Loader } from "astro/loaders";
import { z } from "astro/zod";
import matter from "gray-matter";

/**
 * Blog and news posts: one `.mdx` file in content/blog or content/news = one
 * page (see content/AUTHORING.md). The filename is the URL slug.
 *
 * Files are read with gray-matter, exactly as the old site did, and the body
 * is kept as raw Markdown + HTML. It is rendered by components/blog/article.tsx
 * (react-markdown), so posts look the same and may use plain HTML such as
 * <iframe style="aspect-ratio: 4/3">.
 */
function postsLoader(folder: string): Loader {
  return {
    name: `posts-${folder}`,
    load: async ({ store, parseData, generateDigest, watcher, logger }) => {
      const dir = path.join(process.cwd(), "content", folder);

      async function sync() {
        store.clear();
        if (!fs.existsSync(dir)) return;
        for (const file of fs.readdirSync(dir)) {
          if (!file.endsWith(".mdx")) continue;
          const slug = file.replace(/\.mdx$/, "");
          const raw = fs.readFileSync(path.join(dir, file), "utf8");
          const { data, content } = matter(raw);
          try {
            const parsed = await parseData({ id: slug, data });
            store.set({
              id: slug,
              data: parsed,
              body: content,
              filePath: `content/${folder}/${file}`,
              digest: generateDigest(raw),
            });
          } catch (error) {
            logger.error(`content/${folder}/${file}: ${(error as Error).message}`);
            throw error;
          }
        }
      }

      await sync();
      watcher?.add(dir);
      watcher?.on("all", (_event, changed) => {
        if (path.resolve(changed).startsWith(path.resolve(dir))) void sync();
      });
    },
  };
}

// Same fields as before. Everything is optional here: a post without a title
// is skipped (not published), like the old site did, instead of failing the build.
const postSchema = z.looseObject({
  title: z.unknown().optional(),
  description: z.unknown().optional(),
  date: z.unknown().optional(),
  updated: z.unknown().optional(),
  author: z.unknown().optional(),
  category: z.unknown().optional(),
  image: z.unknown().optional(),
  keywords: z.unknown().optional(),
  faqs: z.unknown().optional(),
  related: z.unknown().optional(),
  draft: z.unknown().optional(),
});

export const collections = {
  blog: defineCollection({ loader: postsLoader("blog"), schema: postSchema }),
  news: defineCollection({ loader: postsLoader("news"), schema: postSchema }),
};

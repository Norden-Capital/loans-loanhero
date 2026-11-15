import { getCollection } from "astro:content";

const WORDS_PER_MINUTE = 220;

export type FaqItem = { question: string; answer: string };
export type RelatedLink = { label: string; href: string };

/** Frontmatter every blog and news .mdx file can set (see content/AUTHORING.md). */
export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // published date, "YYYY-MM-DD"
  updated?: string; // last significant edit; falls back to `date`
  author?: string;
  category?: string;
  image?: string; // listing card + structured data image
  keywords?: string[];
  faqs?: FaqItem[];
  related?: RelatedLink[]; // internal "/…" links and external "http…" sources
  draft?: boolean;
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  category: string;
  image: string | null;
  keywords: string[];
  faqs: FaqItem[];
  related: RelatedLink[];
  readingTime: number; // minutes
  draft: boolean;
};

export type Post = { meta: PostMeta; content: string };

/**
 * How one collection's article pages are labelled and linked. Each site sets
 * BLOG_SECTION in lib/blog.ts and NEWS_SECTION in lib/news.ts.
 */
export type ArticleSection = {
  label: string; // listing name and breadcrumb, e.g. "Blog"
  path: string; // "/blog"
  schemaType: "BlogPosting" | "NewsArticle";
  dateLine: "updated" | "published"; // byline: last update only, or published (+ updated)
  backLabel: string; // link back to the listing page
  next: { label: string; href: string }; // second link under the article
};

/** gray-matter parses an unquoted `date: 2026-06-30` into a Date — normalise to "YYYY-MM-DD". */
function toISODate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim()) {
    const trimmed = value.trim();
    const date = new Date(trimmed);
    return Number.isNaN(date.getTime()) ? trimmed : date.toISOString().slice(0, 10);
  }
  return "";
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function normalizeMeta(
  slug: string,
  data: Record<string, unknown>,
  content: string,
  defaults: { author: string; category: string },
): PostMeta {
  const fm = data as PostFrontmatter;

  const faqs: FaqItem[] = Array.isArray(fm.faqs)
    ? fm.faqs
        .filter((faq) => faq && typeof faq === "object" && "question" in faq && "answer" in faq)
        .map((faq) => ({ question: String(faq.question), answer: String(faq.answer) }))
    : [];

  const related: RelatedLink[] = Array.isArray(fm.related)
    ? fm.related
        .filter((link) => link && typeof link === "object" && "label" in link && "href" in link)
        .map((link) => ({ label: String(link.label), href: String(link.href) }))
    : [];

  const date = toISODate(fm.date);

  return {
    slug,
    title: String(fm.title ?? ""),
    description: String(fm.description ?? ""),
    date,
    updated: fm.updated ? toISODate(fm.updated) : date,
    author: fm.author ? String(fm.author) : defaults.author,
    category: fm.category ? String(fm.category) : defaults.category,
    image: fm.image ? String(fm.image) : null,
    keywords: Array.isArray(fm.keywords) ? fm.keywords.map(String) : [],
    faqs,
    related,
    readingTime: readingTime(content),
    draft: fm.draft === true,
  };
}

/**
 * One content collection of .mdx files (content/blog or content/news, see
 * src/content.config.ts) — used by both the blog and news.
 */
export function createPostCollection({
  collection,
  defaultAuthor,
  defaultCategory,
}: {
  collection: "blog" | "news";
  defaultAuthor: string;
  defaultCategory: string;
}) {
  const defaults = { author: defaultAuthor, category: defaultCategory };

  async function readAll(): Promise<Post[]> {
    const entries = await getCollection(collection);
    return entries.map((entry) => {
      const content = entry.body ?? "";
      return { meta: normalizeMeta(entry.id, entry.data, content, defaults), content };
    });
  }

  /** Published (non-draft) entries, newest first. */
  async function getAll(): Promise<PostMeta[]> {
    return (await readAll())
      .map((post) => post.meta)
      .filter((meta) => !meta.draft && meta.title)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  async function get(slug: string): Promise<Post | null> {
    const post = (await readAll()).find((p) => p.meta.slug === slug);
    if (!post) return null;
    return post.meta.draft || !post.meta.title ? null : post;
  }

  return { getAll, get };
}

export function formatDate(day: string): string {
  const date = new Date(`${day}T00:00:00Z`);
  return Number.isNaN(date.getTime())
    ? day
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
}

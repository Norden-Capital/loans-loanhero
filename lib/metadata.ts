/**
 * Page metadata → <head> tags.
 *
 * Pages describe their metadata with the same object shape the old Next.js
 * site used (title, description, keywords, alternates, openGraph, twitter…).
 * `resolveHead` merges the page object over the site defaults exactly the way
 * Next.js did (a page key replaces the whole site key) and writes the same
 * tags in the same order, so search engines see no change.
 */

export type OgImage = { url: string; width?: number; height?: number; alt?: string; type?: string };

export type Metadata = {
  metadataBase?: URL;
  title?: string | { absolute: string };
  description?: string;
  keywords?: string[];
  authors?: { name: string }[];
  robots?:
    | string
    | {
        index?: boolean;
        follow?: boolean;
        "max-image-preview"?: string;
        "max-snippet"?: number;
        "max-video-preview"?: number;
      };
  alternates?: { canonical?: string; types?: Record<string, string> };
  openGraph?: {
    images?: OgImage[];
    type?: string;
    url?: string;
    title?: string;
    description?: string;
    locale?: string;
    siteName?: string;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: (string | OgImage)[];
  };
  manifest?: string;
  themeColor?: string; // ignored, as in Next.js 16 (no tag was written)
  other?: Record<string, string>;
};

export type SitemapEntry = {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

/** Social image made from a file next to the page (like Next's opengraph-image files). */
export type FileOgImage = Required<Pick<OgImage, "url" | "type" | "width" | "height" | "alt">>;

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

function absolute(url: string, base: URL): string {
  const resolved = new URL(url, base);
  // Next.js writes the site root without its trailing slash.
  if (resolved.pathname === "/" && !resolved.search && !resolved.hash) return resolved.origin;
  return resolved.href;
}

function robotsContent(robots: Metadata["robots"]): string | null {
  if (!robots) return null;
  if (typeof robots === "string") return robots;
  const parts: string[] = [];
  if (robots.index !== undefined) parts.push(robots.index ? "index" : "noindex");
  if (robots.follow !== undefined) parts.push(robots.follow ? "follow" : "nofollow");
  if (robots["max-video-preview"] !== undefined) parts.push(`max-video-preview:${robots["max-video-preview"]}`);
  if (robots["max-image-preview"] !== undefined) parts.push(`max-image-preview:${robots["max-image-preview"]}`);
  if (robots["max-snippet"] !== undefined) parts.push(`max-snippet:${robots["max-snippet"]}`);
  return parts.join(", ");
}

const meta = (name: string, content: string) => `<meta name="${esc(name)}" content="${esc(content)}"/>`;
const prop = (property: string, content: string) =>
  `<meta property="${esc(property)}" content="${esc(content)}"/>`;

/**
 * @param site     the site-wide defaults (old app/layout.tsx metadata)
 * @param page     this page's metadata
 * @param fileOgImage  a generated/file social image for this page; like Next, it
 *                 replaces the page's openGraph and twitter images
 * @param extraRobots  an extra robots tag written before the page's own (404 page)
 */
export function resolveHead(
  site: Metadata,
  page: Metadata,
  { fileOgImage, extraRobots }: { fileOgImage?: FileOgImage; extraRobots?: string } = {},
): { title: string; tags: string } {
  const m: Metadata = { ...site, ...page };
  const base = site.metadataBase ?? new URL("https://loanhero.ca");
  const out: string[] = [];

  const title = typeof m.title === "string" ? m.title : (m.title?.absolute ?? "");

  if (m.description) out.push(meta("description", m.description));
  for (const author of m.authors ?? []) out.push(meta("author", author.name));
  if (m.manifest) out.push(`<link rel="manifest" href="${esc(m.manifest)}"/>`);
  if (m.keywords?.length) out.push(meta("keywords", m.keywords.join(",")));
  if (extraRobots) out.push(meta("robots", extraRobots));
  const robots = robotsContent(m.robots);
  if (robots) out.push(meta("robots", robots));
  for (const [name, content] of Object.entries(m.other ?? {})) out.push(meta(name, content));

  if (m.alternates?.canonical) {
    out.push(`<link rel="canonical" href="${esc(absolute(m.alternates.canonical, base))}"/>`);
  }
  for (const [type, href] of Object.entries(m.alternates?.types ?? {})) {
    out.push(`<link rel="alternate" type="${esc(type)}" href="${esc(absolute(href, base))}"/>`);
  }

  const og = m.openGraph;
  const ogImages: OgImage[] = fileOgImage ? [fileOgImage] : (og?.images ?? []);
  if (og) {
    if (og.title) out.push(prop("og:title", og.title));
    if (og.description) out.push(prop("og:description", og.description));
    if (og.url) out.push(prop("og:url", absolute(og.url, base)));
    if (og.siteName) out.push(prop("og:site_name", og.siteName));
    if (og.locale) out.push(prop("og:locale", og.locale));
  }
  for (const image of ogImages) {
    out.push(prop("og:image", absolute(image.url, base)));
    if (image.type) out.push(prop("og:image:type", image.type));
    if (image.width !== undefined) out.push(prop("og:image:width", String(image.width)));
    if (image.height !== undefined) out.push(prop("og:image:height", String(image.height)));
    if (image.alt) out.push(prop("og:image:alt", image.alt));
  }
  if (og) {
    if (og.type) out.push(prop("og:type", og.type));
    if (og.publishedTime) out.push(prop("article:published_time", og.publishedTime));
    if (og.modifiedTime) out.push(prop("article:modified_time", og.modifiedTime));
    for (const author of og.authors ?? []) out.push(prop("article:author", author));
  }

  const tw = m.twitter;
  if (tw) {
    if (tw.card) out.push(meta("twitter:card", tw.card));
    if (tw.title) out.push(meta("twitter:title", tw.title));
    if (tw.description) out.push(meta("twitter:description", tw.description));
    // Without its own images, Twitter falls back to the Open Graph images.
    const images: OgImage[] = fileOgImage
      ? [fileOgImage]
      : tw.images
        ? tw.images.map((i) => (typeof i === "string" ? { url: i } : i))
        : ogImages;
    for (const image of images) {
      out.push(meta("twitter:image", absolute(image.url, base)));
      if (image.alt) out.push(meta("twitter:image:alt", image.alt));
      if (image.type) out.push(meta("twitter:image:type", image.type));
      if (image.width !== undefined) out.push(meta("twitter:image:width", String(image.width)));
      if (image.height !== undefined) out.push(meta("twitter:image:height", String(image.height)));
    }
  }

  return { title, tags: out.join("") };
}

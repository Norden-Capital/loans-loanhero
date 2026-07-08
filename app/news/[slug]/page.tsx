import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import { ArrowUpRight } from "lucide-react";
import CtaSection from "@/components/home/CtaSection";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { buildMetadata, BASE_URL } from "@/lib/seo";
import { getAllNews, getNews } from "@/lib/news";
import { extractToc } from "@/lib/toc";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNews().map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

function formatDate(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) return {};

  const base = buildMetadata({
    title: `${item.meta.title} | LoanHero`,
    description: item.meta.description,
    path: `/news/${slug}`,
    keywords: item.meta.keywords.length
      ? item.meta.keywords
      : [item.meta.title.toLowerCase(), "canada loan news", "loanhero"],
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: item.meta.date,
      modifiedTime: item.meta.updated,
      authors: [item.meta.author],
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) notFound();

  const { meta, content } = item;
  const toc = extractToc(content);
  const url = `${BASE_URL}/news/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated,
    ...(meta.image ? { image: meta.image } : {}),
    author: { "@type": "Organization", name: meta.author },
    publisher: {
      "@type": "Organization",
      name: "LoanHero",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.svg` },
    },
    mainEntityOfPage: url,
    url,
  };

  const faqJsonLd =
    meta.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: meta.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const internal = meta.related.filter((l) => !l.href.startsWith("http"));
  const sources = meta.related.filter((l) => l.href.startsWith("http"));

  return (
    <div className="relative overflow-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Page header */}
      <section className="relative pt-14 pb-10 lg:pt-20 lg:pb-14">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 800px 400px at center top, rgba(99, 102, 241, 0.10) 0%, rgba(99, 102, 241, 0.04) 40%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "News", href: "/news" },
                { label: meta.title },
              ]}
            />
          </div>
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--primary)] mb-4">
            {meta.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-[1.12] mb-5">
            {meta.title}
          </h1>
          <p className="text-base text-slate-500 max-w-xl leading-relaxed mb-5">
            {meta.description}
          </p>
          <p className="text-xs text-slate-400">
            By the {meta.author} · Published {formatDate(meta.date)}
            {meta.updated !== meta.date ? ` · Updated ${formatDate(meta.updated)}` : ""} · {meta.readingTime} min read
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 pb-16 lg:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12 lg:items-start">
          <article className="min-w-0 w-full max-w-3xl mx-auto lg:mx-0">
            <TableOfContents items={toc} variant="mobile" />
            <div className="blog-prose prose prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSlug]}>
                {content}
              </ReactMarkdown>
            </div>

            {/* Related reading + sources */}
            {(internal.length > 0 || sources.length > 0) && (
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {internal.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Related Reading</h2>
                    <ul className="flex flex-col gap-2.5">
                      {internal.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] hover:underline underline-offset-2"
                          >
                            {link.label}
                            <ArrowUpRight size={13} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {sources.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Sources</h2>
                    <ul className="flex flex-col gap-2.5">
                      {sources.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[var(--primary)] underline underline-offset-2 decoration-slate-300"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Back to hub */}
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-all"
              >
                <ArrowUpRight size={14} className="rotate-180" />
                All news
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-all"
              >
                Read the blog
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </article>

          <aside className="hidden lg:block sticky top-28 self-start">
            <TableOfContents items={toc} variant="sidebar" />
          </aside>
        </div>
      </section>

      {/* FAQ */}
      {meta.faqs.length > 0 && (
        <section className="bg-white pb-16 lg:pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-8 text-center">
              Frequently Asked <span className="text-[var(--primary)]">Questions</span>
            </h2>
            <div className="flex flex-col">
              {meta.faqs.map((f) => (
                <div key={f.question} className="border-b border-slate-200 last:border-b-0 py-5">
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{f.question}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </div>
  );
}

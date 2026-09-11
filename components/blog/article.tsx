import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ArrowUpRight } from "lucide-react";

import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostImage } from "@/components/blog/post-image";
import { TableOfContents } from "@/components/blog/table-of-contents";
import CtaSection from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/json-ld";
import { formatDate, type ArticleSection, type Post } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { extractToc } from "@/lib/toc";

/** Full article page, shared by blog posts and news items. */
export function Article({ post, section }: { post: Post; section: ArticleSection }) {
  const { meta, content } = post;
  const path = `${section.path}/${meta.slug}`;
  const toc = extractToc(content);
  const internal = meta.related.filter((link) => !link.href.startsWith("http"));
  const sources = meta.related.filter((link) => link.href.startsWith("http"));
  const faq = faqJsonLd(meta.faqs);

  const byline =
    section.dateLine === "published"
      ? `By the ${meta.author} · Published ${formatDate(meta.date)}${
          meta.updated !== meta.date ? ` · Updated ${formatDate(meta.updated)}` : ""
        } · ${meta.readingTime} min read`
      : `Reviewed by the ${meta.author} · Updated ${formatDate(meta.updated)} · ${meta.readingTime} min read`;

  return (
    <div className="relative overflow-x-clip bg-white">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: section.label, path: section.path },
            { name: meta.title, path },
          ]),
          articleJsonLd(meta, section),
          ...(faq ? [faq] : []),
        ]}
      />

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
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: section.label, href: section.path },
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
          <p className="text-xs text-slate-400">{byline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 pb-16 lg:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12 lg:items-start">
          <article className="min-w-0 w-full max-w-3xl mx-auto lg:mx-0">
            <TableOfContents items={toc} variant="mobile" />
            <div className="blog-prose prose prose-lg max-w-none">
              {/* rehype-raw lets posts embed HTML (figures, video, iframes);
                  rehype-slug gives headings the ids the table of contents uses. */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSlug]}
                components={{ img: PostImage }}
              >
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

            {/* Back to the listing */}
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
              <Link
                href={section.path}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-all"
              >
                <ArrowUpRight size={14} className="rotate-180" />
                {section.backLabel}
              </Link>
              <Link
                href={section.next.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-all"
              >
                {section.next.label}
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
              {meta.faqs.map((item) => (
                <div key={item.question} className="border-b border-slate-200 last:border-b-0 py-5">
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.question}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.answer}</p>
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

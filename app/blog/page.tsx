import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import CtaSection from "@/components/home/CtaSection";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { buildMetadata, BASE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

const base = buildMetadata({
  title: "Blog | LoanHero",
  description:
    "Practical insights on personal loans in Canada — rate context, borrowing tips, and plain-English guidance to help you borrow with confidence.",
  path: "/blog",
  keywords: [
    "personal loan blog canada",
    "loan tips canada",
    "borrowing advice canada",
    "loanhero blog",
  ],
});

export const metadata: Metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    types: {
      "application/rss+xml": `${BASE_URL}/blog/feed.xml`,
    },
  },
};

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

export default function BlogIndex() {
  const posts = getAllPosts();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${BASE_URL}/blog/${p.slug}`,
    })),
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Page header */}
      <section className="relative pt-14 pb-12 lg:pt-20 lg:pb-16">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 800px 400px at center top, rgba(99, 102, 241, 0.10) 0%, rgba(99, 102, 241, 0.04) 40%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="mb-6">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          </div>
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--primary)] mb-4">
            The LoanHero Blog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5">
            Borrow smarter, <span className="text-[var(--primary)]">not harder</span>
          </h1>
          <p className="text-base text-slate-500 max-w-xl leading-relaxed">
            Rate context, borrowing tips, and plain-English takes on the rules that shape
            personal lending in Canada.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="relative z-10 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="max-w-lg mx-auto text-center flex flex-col items-center py-8 lg:py-12">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
                <Newspaper size={26} className="text-[var(--primary)]" strokeWidth={1.75} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-3">
                New posts <span className="text-[var(--primary)]">coming soon</span>
              </h2>
              <p className="text-base text-slate-500 leading-relaxed mb-8">
                We&apos;re putting together fresh rate context, borrowing tips, and honest guides for
                Canadian borrowers. Check back shortly — new articles will be posted here soon.
              </p>
              <Link
                href="/resources/guides"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-all"
              >
                In the meantime, explore our loan guides
                <ArrowUpRight size={15} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 rounded-2xl overflow-hidden transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-indigo-50 to-transparent" />
                    )}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--primary)] px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h2 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-[var(--primary)] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-wide text-slate-400">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>·</span>
                      <span>{post.readingTime} min read</span>
                      <ArrowUpRight
                        size={13}
                        className="ml-auto text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </div>
  );
}

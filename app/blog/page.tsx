import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostGrid } from "@/components/blog/post-grid";
import CtaSection from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_DESCRIPTION, BLOG_SECTION, getAllPosts } from "@/lib/blog";
import { BASE_URL, breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

const base = buildMetadata({
  title: BLOG_SECTION.label,
  description: BLOG_DESCRIPTION,
  path: BLOG_SECTION.path,
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
    types: { "application/rss+xml": `${BASE_URL}${BLOG_SECTION.path}/feed.xml` },
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative overflow-hidden bg-white">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: BLOG_SECTION.label, path: BLOG_SECTION.path },
          ]),
          ...(posts.length > 0 ? [itemListJsonLd(BLOG_SECTION, posts)] : []),
        ]}
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
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: BLOG_SECTION.label }]} />
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
      <PostGrid
        posts={posts}
        section={BLOG_SECTION}
        empty={{
          title: (
            <>
              New posts <span className="text-[var(--primary)]">coming soon</span>
            </>
          ),
          text: "We're putting together fresh rate context, borrowing tips, and honest guides for Canadian borrowers. Check back shortly — new articles will be posted here soon.",
          link: { label: "In the meantime, explore our loan guides", href: "/resources/guides" },
        }}
      />

      <CtaSection />
    </div>
  );
}

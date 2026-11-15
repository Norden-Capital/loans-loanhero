import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { PostGrid } from "@/components/blog/post-grid";
import CtaSection from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/json-ld";
import { NEWS_DESCRIPTION, NEWS_SECTION } from "@/lib/news";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import type { PostMeta } from "@/lib/content";

/** The /news listing page (was app/news/page.tsx). */
export default function NewsListing({ news }: { news: PostMeta[] }) {
  return (
    <div className="relative overflow-hidden bg-white">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: NEWS_SECTION.label, path: NEWS_SECTION.path },
          ]),
          ...(news.length > 0 ? [itemListJsonLd(NEWS_SECTION, news)] : []),
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
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: NEWS_SECTION.label }]} />
          </div>
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--primary)] mb-4">
            LoanHero News
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5">
            Loan &amp; rate <span className="text-[var(--primary)]">news</span>
          </h1>
          <p className="text-base text-slate-500 max-w-xl leading-relaxed">
            Bank of Canada decisions, lending data, and rule changes that affect what you
            pay to borrow — reported in plain English.
          </p>
        </div>
      </section>

      {/* Items */}
      <PostGrid
        posts={news}
        section={NEWS_SECTION}
        empty={{
          title: (
            <>
              News <span className="text-[var(--primary)]">coming soon</span>
            </>
          ),
          text: "We're tracking Bank of Canada decisions, lending data, and rule changes that affect Canadian borrowers. Check back shortly — the latest updates will be posted here.",
          link: { label: "In the meantime, read the blog", href: "/blog" },
        }}
      />

      <CtaSection />
    </div>
  );
}

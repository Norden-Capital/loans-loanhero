import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";

import { formatDate, type ArticleSection, type PostMeta } from "@/lib/content";

/** Card grid for the blog and news listing pages, with an empty state. */
export function PostGrid({
  posts,
  section,
  empty,
}: {
  posts: PostMeta[];
  section: ArticleSection;
  empty: { title: ReactNode; text: string; link: { label: string; href: string } };
}) {
  return (
    <section className="relative z-10 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="max-w-lg mx-auto text-center flex flex-col items-center py-8 lg:py-12">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
              <Newspaper size={26} className="text-[var(--primary)]" strokeWidth={1.75} />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-3">
              {empty.title}
            </h2>
            <p className="text-base text-slate-500 leading-relaxed mb-8">{empty.text}</p>
            <Link
              href={empty.link.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-all"
            >
              {empty.link.label}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`${section.path}/${post.slug}`}
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
  );
}

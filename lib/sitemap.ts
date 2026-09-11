import { MetadataRoute } from 'next';
import { comparisons } from '@/lib/comparisons';
import { guides } from '@/lib/guides';
import { loanAmounts } from '@/lib/loan-amounts';
import { loanPurposes } from '@/lib/loan-purposes';
import { loanTypes } from '@/lib/loan-types';
import { creditScoreRanges } from '@/lib/credit-scores';
import { canadaLocations } from '@/lib/canada-locations';
import { getAllPosts } from '@/lib/blog';
import { getAllNews } from '@/lib/news';
import { BASE_URL } from '@/lib/seo';

// Each section is served at /sitemap/<section>.xml and listed by the index at /sitemap.xml
export const sitemapSections = ['pages', 'loans', 'resources', 'blog', 'news'] as const;

export type SitemapSection = (typeof sitemapSections)[number];

// Last real content change of each page group, taken from git history. A group
// covers its hub page and every sub-page built from the same route and data
// files. Update a date only when that group's visible content changes (text,
// data, FAQs, tables, body links, sections), not for design, metadata,
// tracking or code-only changes, so search engines can keep trusting these dates.
const pageLastModified = {
  home: '2026-05-28',
  services: '2026-05-28',
  loanApplication: '2026-08-07',
  contact: '2026-08-15',
  privacyPolicy: '2026-06-13',
  termsOfUse: '2026-06-13',
  loansHub: '2026-07-08',
  byAmount: '2026-07-08',
  byPurpose: '2026-07-08',
  byType: '2026-07-08',
  byCreditScore: '2026-07-08',
  byLocation: '2026-07-08',
  resourcesHub: '2026-07-08',
  tools: '2026-07-08',
  comparisons: '2026-07-08',
  guides: '2026-07-08',
  faq: '2026-07-08',
};

type PageGroup = keyof typeof pageLastModified;

type PageConfig = {
  path: string;
  group: PageGroup;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
};

function toDate(day: string): Date {
  return new Date(`${day}T00:00:00Z`);
}

// Listing pages change whenever their newest post does.
function newestDate(days: string[]): Date | undefined {
  if (days.length === 0) return undefined;
  return toDate(days.reduce((latest, day) => (day > latest ? day : latest)));
}

function toEntries(pages: PageConfig[]): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: toDate(pageLastModified[page.group]),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

const sitePages: PageConfig[] = [
  { path: '', group: 'home', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', group: 'services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/loan-application', group: 'loanApplication', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/contact', group: 'contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/privacy-policy', group: 'privacyPolicy', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/terms-of-use', group: 'termsOfUse', priority: 0.5, changeFrequency: 'yearly' },
];

// Loans hub + dynamic sub-pages
const loanPages: PageConfig[] = [
  { path: '/loans', group: 'loansHub', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/loans/by-amount', group: 'byAmount', priority: 0.6, changeFrequency: 'monthly' },
  ...loanAmounts.map((entry): PageConfig => ({
    path: `/loans/by-amount/${entry.slug}`,
    group: 'byAmount',
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/loans/by-purpose', group: 'byPurpose', priority: 0.6, changeFrequency: 'monthly' },
  ...loanPurposes.map((entry): PageConfig => ({
    path: `/loans/by-purpose/${entry.slug}`,
    group: 'byPurpose',
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/loans/by-type', group: 'byType', priority: 0.6, changeFrequency: 'monthly' },
  ...loanTypes.map((entry): PageConfig => ({
    path: `/loans/by-type/${entry.slug}`,
    group: 'byType',
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/loans/by-credit-score', group: 'byCreditScore', priority: 0.6, changeFrequency: 'monthly' },
  ...creditScoreRanges.map((entry): PageConfig => ({
    path: `/loans/by-credit-score/${entry.slug}`,
    group: 'byCreditScore',
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/loans/by-location', group: 'byLocation', priority: 0.6, changeFrequency: 'monthly' },
  ...canadaLocations.map((entry): PageConfig => ({
    path: `/loans/by-location/${entry.slug}`,
    group: 'byLocation',
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
];

// Resources hub + dynamic sub-pages
const resourcePages: PageConfig[] = [
  { path: '/resources', group: 'resourcesHub', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/resources/tools', group: 'tools', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/resources/comparisons', group: 'comparisons', priority: 0.6, changeFrequency: 'monthly' },
  ...comparisons.map((entry): PageConfig => ({
    path: `/resources/comparisons/${entry.slug}`,
    group: 'comparisons',
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/resources/guides', group: 'guides', priority: 0.6, changeFrequency: 'monthly' },
  ...guides.map((entry): PageConfig => ({
    path: `/resources/guides/${entry.slug}`,
    group: 'guides',
    priority: 0.5,
    changeFrequency: 'monthly',
  })),
  { path: '/resources/faq', group: 'faq', priority: 0.6, changeFrequency: 'monthly' },
];

export function isSitemapSection(value: string): value is SitemapSection {
  return (sitemapSections as readonly string[]).includes(value);
}

export function getSitemapEntries(section: SitemapSection): MetadataRoute.Sitemap {
  if (section === 'blog') {
    const posts = getAllPosts();
    const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: toDate(post.updated),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [
      {
        url: `${BASE_URL}/blog`,
        lastModified: newestDate(posts.map((post) => post.updated)),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      ...blogPosts,
    ];
  }

  if (section === 'news') {
    const news = getAllNews();
    const newsPosts: MetadataRoute.Sitemap = news.map((item) => ({
      url: `${BASE_URL}/news/${item.slug}`,
      lastModified: toDate(item.updated),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [
      {
        url: `${BASE_URL}/news`,
        lastModified: newestDate(news.map((item) => item.updated)),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      ...newsPosts,
    ];
  }

  if (section === 'loans') return toEntries(loanPages);
  if (section === 'resources') return toEntries(resourcePages);
  return toEntries(sitePages);
}

// Same markup Next.js generates for a built-in app/sitemap.ts, which can't be
// used here because it would take over /sitemap.xml from the index.
export function toUrlsetXml(entries: MetadataRoute.Sitemap): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const entry of entries) {
    xml += '<url>\n';
    xml += `<loc>${entry.url}</loc>\n`;
    if (entry.lastModified) {
      const lastModified =
        entry.lastModified instanceof Date ? entry.lastModified.toISOString() : entry.lastModified;
      xml += `<lastmod>${lastModified}</lastmod>\n`;
    }
    if (entry.changeFrequency) {
      xml += `<changefreq>${entry.changeFrequency}</changefreq>\n`;
    }
    if (typeof entry.priority === 'number') {
      xml += `<priority>${entry.priority}</priority>\n`;
    }
    xml += '</url>\n';
  }

  xml += '</urlset>\n';
  return xml;
}

export function toSitemapIndexXml(): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const section of sitemapSections) {
    xml += '<sitemap>\n';
    xml += `<loc>${BASE_URL}/sitemap/${section}.xml</loc>\n`;
    xml += '</sitemap>\n';
  }

  xml += '</sitemapindex>\n';
  return xml;
}

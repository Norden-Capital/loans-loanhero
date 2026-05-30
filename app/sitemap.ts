import { MetadataRoute } from 'next';

const host = 'https://loanhero.ca';

type PageConfig = {
  path: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
};

const pages: PageConfig[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/loan-application', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.5, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${host}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

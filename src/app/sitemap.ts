import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site.config';
import { services } from '@/content/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: siteConfig.url, changeFrequency: 'monthly', priority: 1 },
      { url: `${siteConfig.url}/about`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${siteConfig.url}/services`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${siteConfig.url}/portfolio`, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${siteConfig.url}/contact`, changeFrequency: 'yearly', priority: 0.7 },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified: now }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}

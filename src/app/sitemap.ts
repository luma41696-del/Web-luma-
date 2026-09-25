import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site.config';
import { services } from '@/content/services';
import { hasBlog, publishedPosts } from '@/content/blog';

/**
 * Built from the content files, so a new service or post appears in the
 * sitemap the moment it is added — nothing to remember to update by hand.
 *
 * `lastModified` uses each post's own date where one exists rather than the
 * build time: telling Google every URL changed on every deploy trains it to
 * ignore the field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: siteConfig.url, changeFrequency: 'monthly', priority: 1 },
      { url: `${siteConfig.url}/services`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${siteConfig.url}/about`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${siteConfig.url}/portfolio`, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${siteConfig.url}/contact`, changeFrequency: 'yearly', priority: 0.7 },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified: now }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Omitted entirely until the blog has real posts, so Google is never
  // pointed at an empty index.
  const blogRoutes: MetadataRoute.Sitemap = hasBlog
    ? [
        {
          url: `${siteConfig.url}/blog`,
          lastModified: new Date(publishedPosts[0].publishedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        },
        ...publishedPosts.map((post) => ({
          url: `${siteConfig.url}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt ?? post.publishedAt),
          changeFrequency: 'yearly' as const,
          priority: 0.6,
        })),
      ]
    : [];

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}

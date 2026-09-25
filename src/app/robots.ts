import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site.config';

/**
 * The site has no private areas, so nearly everything is crawlable. The
 * disallows below are Next.js internals and generated endpoints that waste
 * crawl budget and can surface as junk results if indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/static/chunks/', // build artefacts, never useful in an index
          '/*?*utm_', // tracking params create duplicate URLs
          '/*?*fbclid',
          '/*?*gclid',
        ],
      },
      {
        // The image optimiser can generate thousands of URL permutations of
        // the same picture; Googlebot-Image should read the real files.
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/logo/'],
        disallow: '/_next/image',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

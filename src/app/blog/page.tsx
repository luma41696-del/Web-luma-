import { notFound } from 'next/navigation';
import { hasBlog, publishedPosts } from '@/content/blog';
import { siteConfig } from '@/content/site.config';
import { breadcrumbSchema, jsonLd, pageMetadata, schemaIds } from '@/lib/seo';
import { BlogIndexContent } from './BlogIndexContent';

const description =
  'Practical writing on digital marketing, web development and AI automation for businesses in Jordan — from the team at LUMA Agency in Amman.';

export const metadata = pageMetadata({
  title: 'Blog — Digital Marketing & Technology Insights for Jordan',
  description,
  path: '/blog',
  keywords: [
    'digital marketing blog Jordan',
    'مدونة التسويق الرقمي الأردن',
    'نصائح تصميم المواقع',
  ],
});

const blogSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      '@id': `${siteConfig.url}/blog#blog`,
      url: `${siteConfig.url}/blog`,
      name: `${siteConfig.name.en} Blog`,
      description,
      inLanguage: ['en', 'ar'],
      isPartOf: { '@id': schemaIds.website },
      publisher: { '@id': schemaIds.organization },
      blogPost: publishedPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title.en,
        description: post.excerpt.en,
        datePublished: post.publishedAt,
        url: `${siteConfig.url}/blog/${post.slug}`,
      })),
    },
    breadcrumbSchema([{ name: 'Blog', path: '/blog' }]),
  ],
};

export default function BlogPage() {
  // Empty blog stays unreachable rather than shipping a thin page — see the
  // note at the top of src/content/blog.ts.
  if (!hasBlog) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blogSchema)} />
      <BlogIndexContent />
    </>
  );
}

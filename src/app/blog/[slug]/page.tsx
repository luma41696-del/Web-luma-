import { notFound } from 'next/navigation';
import { getPost, publishedPosts } from '@/content/blog';
import { team } from '@/content/team';
import { siteConfig } from '@/content/site.config';
import { breadcrumbSchema, jsonLd, pageMetadata, schemaIds } from '@/lib/seo';
import { BlogPostContent } from './BlogPostContent';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return { title: 'Post not found' };

  return {
    ...pageMetadata({
      title: post.title.en,
      description: post.excerpt.en,
      path: `/blog/${post.slug}`,
      keywords: post.keywords,
      image: post.image ? `/images/blog/${post.image}` : undefined,
    }),
    // An article is not a `website`, and getting this wrong costs the
    // published/modified dates in the social preview.
    openGraph: {
      type: 'article',
      title: post.title.en,
      description: post.excerpt.en,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      tags: post.keywords,
      images: [post.image ? `/images/blog/${post.image}` : `/blog/${post.slug}/opengraph-image`],
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const author = team.find((member) => member.name === post.author);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#post`,
        headline: post.title.en,
        alternativeHeadline: post.title.ar,
        description: post.excerpt.en,
        articleSection: post.category.en,
        keywords: post.keywords.join(', '),
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        inLanguage: ['en', 'ar'],
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        isPartOf: { '@id': `${siteConfig.url}/blog#blog` },
        publisher: { '@id': schemaIds.organization },
        author: {
          '@type': 'Person',
          name: post.author,
          ...(author ? { jobTitle: author.role.en } : {}),
          worksFor: { '@id': schemaIds.organization },
        },
        ...(post.image
          ? { image: `${siteConfig.url}/images/blog/${post.image}` }
          : {}),
      },
      breadcrumbSchema([
        { name: 'Blog', path: '/blog' },
        { name: post.title.en, path: `/blog/${post.slug}` },
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <BlogPostContent slug={post.slug} />
    </>
  );
}

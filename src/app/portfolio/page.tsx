import { PortfolioPageContent } from './PortfolioPageContent';
import { projects } from '@/content/projects';
import { siteConfig } from '@/content/site.config';
import { breadcrumbSchema, jsonLd, pageMetadata, schemaIds } from '@/lib/seo';

const description =
  'Selected LUMA Agency projects across digital marketing, business development, content production, and software development.';

export const metadata = pageMetadata({
  title: 'Portfolio — Our Work for Brands Across Jordan',
  description,
  path: '/portfolio',
  keywords: [
    'LUMA Agency portfolio',
    'marketing case studies Jordan',
    'أعمال شركة تسويق الأردن',
    'نماذج تصميم مواقع عمان',
  ],
});

/**
 * The eight projects were previously invisible to search engines — the page
 * carried metadata but no schema, so Google saw a page of text with no idea
 * it described a body of work. Each entry is a `CreativeWork` tied back to
 * the agency.
 */
const portfolioSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${siteConfig.url}/portfolio#page`,
      url: `${siteConfig.url}/portfolio`,
      name: 'LUMA Agency Portfolio',
      description,
      inLanguage: ['en', 'ar'],
      isPartOf: { '@id': schemaIds.website },
      about: { '@id': schemaIds.organization },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.title.en,
            description: project.description.en,
            genre: project.category.en,
            dateCreated: String(project.year),
            keywords: project.tags.en.join(', '),
            creator: { '@id': schemaIds.organization },
          },
        })),
      },
    },
    breadcrumbSchema([{ name: 'Portfolio', path: '/portfolio' }]),
  ],
};

export default function PortfolioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(portfolioSchema)} />
      <PortfolioPageContent />
    </>
  );
}

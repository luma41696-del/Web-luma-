import { ServicesPageContent } from './ServicesPageContent';
import { services } from '@/content/services';
import { siteConfig } from '@/content/site.config';
import { breadcrumbSchema, jsonLd, pageMetadata, schemaIds } from '@/lib/seo';

const description =
  'Digital marketing, business development, automation and AI, content creation and production, and IT and software development — delivered end to end from Amman, Jordan.';

export const metadata = pageMetadata({
  // Kept under ~60 characters so Google renders it whole.
  title: 'Services — Marketing, Development & Production | LUMA',
  description,
  path: '/services',
  keywords: [
    'digital marketing services Jordan',
    'web development services Amman',
    'خدمات التسويق الرقمي الأردن',
    'خدمات برمجة وتصميم مواقع',
  ],
});

/**
 * An ItemList of the five services. This is what lets Google show the
 * service set as a group rather than five unrelated pages, and each entry
 * points at the detail page that carries its own `Service` node.
 */
const servicesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${siteConfig.url}/services#page`,
      url: `${siteConfig.url}/services`,
      name: 'LUMA Agency Services',
      description,
      inLanguage: ['en', 'ar'],
      isPartOf: { '@id': schemaIds.website },
      about: { '@id': schemaIds.organization },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: service.title.en,
          url: `${siteConfig.url}/services/${service.slug}`,
        })),
      },
    },
    breadcrumbSchema([{ name: 'Services', path: '/services' }]),
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(servicesSchema)} />
      <ServicesPageContent />
    </>
  );
}

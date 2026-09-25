import { notFound } from 'next/navigation';
import { getService, services } from '@/content/services';
import { siteConfig } from '@/content/site.config';
import { breadcrumbSchema, jsonLd, pageMetadata, schemaIds } from '@/lib/seo';
import { ServiceDetailContent } from './ServiceDetailContent';

interface Params {
  params: Promise<{ slug: string }>;
}

/** Pre-render every service at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: 'Service not found' };

  return pageMetadata({
    // The city is in the title because "<service> Jordan" and
    // "<service> عمان" are how this market actually searches.
    title: `${service.title.en} in Jordan — LUMA Agency`,
    description: service.summary.en,
    path: `/services/${service.slug}`,
    keywords: [
      `${service.title.en} Jordan`,
      `${service.title.en} Amman`,
      service.title.ar,
      `${service.title.ar} الأردن`,
      ...service.features.en.slice(0, 3),
    ],
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const url = `${siteConfig.url}/services/${service.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title.en,
        alternateName: service.title.ar,
        description: service.overview.en,
        serviceType: service.category.en,
        url,
        provider: { '@id': schemaIds.organization },
        areaServed: [
          { '@type': 'Country', name: siteConfig.location.country.en },
          { '@type': 'City', name: siteConfig.location.city.en },
        ],
        availableLanguage: ['en', 'ar'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: service.title.en,
          itemListElement: service.features.en.map((feature) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: feature },
          })),
        },
      },
      // The benefits already render on the page as a list; phrasing them as
      // questions gives the same content a shot at an FAQ rich result
      // without inventing anything that is not on screen.
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `What does LUMA Agency's ${service.title.en} service include?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${service.overview.en} It covers ${service.features.en
                .join(', ')
                .toLowerCase()}.`,
            },
          },
          {
            '@type': 'Question',
            name: `How does LUMA Agency deliver ${service.title.en}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: service.process.en
                .map((step, index) => `${index + 1}. ${step}`)
                .join(' '),
            },
          },
          {
            '@type': 'Question',
            name: `What are the benefits of ${service.title.en} for my business?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: service.benefits.en.join('. ') + '.',
            },
          },
        ],
      },
      breadcrumbSchema([
        { name: 'Services', path: '/services' },
        { name: service.title.en, path: `/services/${service.slug}` },
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <ServiceDetailContent slug={service.slug} />
    </>
  );
}

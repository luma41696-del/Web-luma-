import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getService, services } from '@/content/services';
import { siteConfig } from '@/content/site.config';
import { ServiceDetailContent } from './ServiceDetailContent';

interface Params {
  params: Promise<{ slug: string }>;
}

/** Pre-render every service at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: 'Service not found' };

  return {
    title: service.title.en,
    description: service.summary.en,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title.en} | ${siteConfig.name.en}`,
      description: service.summary.en,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title.en,
    description: service.overview.en,
    serviceType: service.category.en,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: { '@id': `${siteConfig.url}/#organization` },
    areaServed: { '@type': 'Country', name: siteConfig.location.country.en },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title.en,
      itemListElement: service.features.en.map((feature) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: feature },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetailContent slug={service.slug} />
    </>
  );
}

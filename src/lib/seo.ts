import type { Metadata } from 'next';
import { siteConfig } from '@/content/site.config';
import { services } from '@/content/services';

/**
 * One place for everything search engines read.
 *
 * Page files used to each hand-roll their own metadata object, which meant
 * the canonical, the OG block and the Twitter block drifted apart page by
 * page. They now call `pageMetadata()` and get a consistent set.
 */

/* ─────────────────────────────── keywords ──────────────────────────────── */

/**
 * Jordan-market keywords, in both scripts.
 *
 * `keywords` carries almost no ranking weight with Google today — it is kept
 * because Bing and several regional crawlers still read it, and it costs
 * nothing. The terms that actually matter are the ones in the page's own
 * headings and body copy, which is why the Arabic service names and the city
 * appear in the visible content, not only here.
 */
export const baseKeywords = [
  // English — how the local market searches
  'digital marketing agency Jordan',
  'marketing agency Amman',
  'web development Jordan',
  'web design Amman',
  'SEO company Jordan',
  'social media management Jordan',
  'branding agency Amman',
  'AI solutions Jordan',
  'software development Amman',
  'creative agency Jordan',
  'video production Amman',
  // Arabic — the higher-intent half of the market
  'شركة تسويق رقمي في الأردن',
  'وكالة تسويق عمان',
  'تصميم مواقع عمان',
  'برمجة مواقع الأردن',
  'شركة SEO الأردن',
  'إدارة حسابات التواصل الاجتماعي الأردن',
  'تصميم هوية بصرية عمان',
  'حلول الذكاء الاصطناعي للشركات',
  'إنتاج فيديو عمان',
  'شركة تصميم مواقع الأردن',
];

/* ─────────────────────────────── metadata ──────────────────────────────── */

interface PageMetaInput {
  title: string;
  description: string;
  /** Route path with a leading slash, e.g. "/about". */
  path: string;
  keywords?: string[];
  /** Overrides the generated OG image for this route. */
  image?: string;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path === '/' ? '' : path}`;

  return {
    // `absolute` bypasses the root layout's "%s | LUMA Agency" template.
    // These titles already carry the brand where it earns its place, and
    // letting the template append it again produced
    // "… — LUMA Agency | LUMA Agency", burning characters out of the ~60
    // Google actually renders.
    title: { absolute: title },
    description,
    keywords: [...keywords, ...baseKeywords],
    alternates: {
      canonical: path,
      // Both languages are served from the same URL — the site switches
      // client-side — so every locale points at the same canonical, and
      // x-default names it as the entry point for everyone else. If the site
      // ever moves to /ar routes, this is the block that has to change.
      languages: {
        en: path,
        ar: path,
        'x-default': path,
      },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name.en,
      title,
      description,
      url,
      locale: 'en_US',
      alternateLocale: ['ar_JO'],
      images: [
        {
          url: image ?? `${path === '/' ? '' : path}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${title} — ${siteConfig.name.en}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image ?? `${path === '/' ? '' : path}/opengraph-image`],
    },
  };
}

/* ──────────────────────────── structured data ──────────────────────────── */

/** Renders a JSON-LD payload. Used by every page that ships schema. */
export function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

/**
 * Breadcrumbs. Google uses these to replace the raw URL in the result with a
 * readable path, and they help it understand how the pages nest.
 * Always pass the trail excluding Home — that is prepended here.
 */
export function breadcrumbSchema(
  trail: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map(
      (crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${siteConfig.url}${crumb.path === '/' ? '' : crumb.path}`,
      }),
    ),
  };
}

/** Shared identifiers so nodes across pages reference one another. */
export const schemaIds = {
  organization: `${siteConfig.url}/#organization`,
  localBusiness: `${siteConfig.url}/#localbusiness`,
  website: `${siteConfig.url}/#website`,
};

/**
 * The sitewide graph: who the company is, where it trades, and what site
 * this is. Emitted once, in the root layout; every other page's schema
 * points back at these `@id`s instead of repeating them.
 *
 * Deliberately absent: `aggregateRating` / `review`. LUMA's testimonials are
 * genuine, but Google's structured-data policy disallows self-serving review
 * markup — ratings a business publishes about itself — on Organization and
 * LocalBusiness. Marking them up risks a manual action rather than stars.
 * Reviews left on the Google Business Profile are the compliant route.
 */
export function organizationGraph() {
  const sameAs = [
    ...siteConfig.social.map((profile) => profile.url),
    ...(siteConfig.googleBusinessProfile
      ? [siteConfig.googleBusinessProfile]
      : []),
  ];

  const organization = {
    '@type': 'Organization',
    '@id': schemaIds.organization,
    name: siteConfig.name.en,
    legalName: siteConfig.legalName,
    alternateName: [siteConfig.name.ar, 'Luma Jo Agency', 'LUMA'],
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo/app-icon.png`,
      width: 1024,
      height: 1024,
    },
    image: `${siteConfig.url}/opengraph-image`,
    description: siteConfig.description.en,
    slogan: siteConfig.tagline.en,
    foundingDate: String(siteConfig.foundedYear),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneE164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city.en,
      addressRegion: siteConfig.location.city.en,
      addressCountry: siteConfig.location.countryCode,
    },
    areaServed: [
      { '@type': 'Country', name: siteConfig.location.country.en },
      { '@type': 'City', name: siteConfig.location.city.en },
    ],
    knowsLanguage: ['ar', 'en'],
    sameAs,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phoneE164,
        email: siteConfig.contact.email,
        contactType: 'customer service',
        areaServed: siteConfig.location.countryCode,
        availableLanguage: ['en', 'ar'],
      },
    ],
  };

  const localBusiness = {
    '@type': 'ProfessionalService',
    '@id': schemaIds.localBusiness,
    name: siteConfig.name.en,
    alternateName: siteConfig.name.ar,
    image: `${siteConfig.url}/opengraph-image`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    priceRange: '$$',
    currenciesAccepted: 'JOD',
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city.en,
      addressRegion: siteConfig.location.city.en,
      addressCountry: siteConfig.location.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.location.geo.lat,
      longitude: siteConfig.location.geo.lng,
    },
    areaServed: [
      { '@type': 'Country', name: siteConfig.location.country.en },
      { '@type': 'City', name: siteConfig.location.city.en },
    ],
    parentOrganization: { '@id': schemaIds.organization },
    sameAs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title.en,
          description: service.summary.en,
          url: `${siteConfig.url}/services/${service.slug}`,
        },
      })),
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': schemaIds.website,
    url: siteConfig.url,
    name: siteConfig.name.en,
    alternateName: siteConfig.name.ar,
    description: siteConfig.description.en,
    inLanguage: ['en', 'ar'],
    publisher: { '@id': schemaIds.organization },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, localBusiness, website],
  };
}

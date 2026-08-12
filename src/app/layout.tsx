import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

import { LanguageProvider } from '@/i18n/LanguageProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/layout/Preloader';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { siteConfig } from '@/content/site.config';
import { services } from '@/content/services';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name.en} — ${siteConfig.tagline.en}`,
    template: `%s | ${siteConfig.name.en}`,
  },
  description: siteConfig.description.en,
  keywords: [
    'digital marketing',
    'business development',
    'automation',
    'AI solutions',
    'content creation',
    'studio production',
    'IT solutions',
    'software development',
    'web development',
    'creative agency',
    'Amman',
    'Jordan',
    'وكالة إبداعية',
    'التسويق الرقمي',
    'عمان',
  ],
  authors: [{ name: siteConfig.name.en, url: siteConfig.url }],
  creator: siteConfig.name.en,
  publisher: siteConfig.legalName,
  applicationName: siteConfig.name.en,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name.en,
    title: `${siteConfig.name.en} — ${siteConfig.tagline.en}`,
    description: siteConfig.description.en,
    url: siteConfig.url,
    locale: 'en_US',
    alternateLocale: ['ar_JO'],
    images: [
      {
        url: '/logo/app-icon.png',
        width: 1024,
        height: 1024,
        alt: `${siteConfig.name.en} — ${siteConfig.tagline.en}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name.en} — ${siteConfig.tagline.en}`,
    description: siteConfig.tagline.en,
    images: ['/logo/app-icon.png'],
  },
  icons: {
    icon: [
      { url: '/logo/favicon.png', sizes: '64x64', type: 'image/png' },
      { url: '/logo/app-icon.png', sizes: '1024x1024', type: 'image/png' },
    ],
    apple: [{ url: '/logo/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'business',
};

export const viewport: Viewport = {
  themeColor: '#020E1A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/**
 * Applies the stored language to <html> before first paint, so an Arabic
 * visitor never sees a flash of left-to-right English. Kept deliberately tiny
 * and dependency-free.
 */
const LANG_BOOTSTRAP = `(function(){try{var l=localStorage.getItem('luma-language');if(l!=='en'&&l!=='ar')return;var d=document.documentElement;d.lang=l;d.dir=l==='ar'?'rtl':'ltr';}catch(e){}})();`;

/** Organization + LocalBusiness structured data, built from the config. */
function structuredData() {
  const organization = {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name.en,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.name.ar,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo/app-icon.png`,
      width: 1024,
      height: 1024,
    },
    description: siteConfig.description.en,
    slogan: siteConfig.tagline.en,
    foundingDate: String(siteConfig.foundedYear),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneE164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city.en,
      addressCountry: siteConfig.location.countryCode,
    },
    sameAs: siteConfig.social.map((profile) => profile.url),
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
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name.en,
    image: `${siteConfig.url}/logo/app-icon.png`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city.en,
      addressCountry: siteConfig.location.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.location.geo.lat,
      longitude: siteConfig.location.geo.lng,
    },
    areaServed: { '@type': 'Country', name: siteConfig.location.country.en },
    parentOrganization: { '@id': `${siteConfig.url}/#organization` },
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
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name.en,
    inLanguage: ['en', 'ar'],
    publisher: { '@id': `${siteConfig.url}/#organization` },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, localBusiness, website],
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOTSTRAP }} />
        <link
          rel="preload"
          href="/fonts/DINNextArabic-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/DINNextArabic-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Preloader />
          <CustomCursor />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

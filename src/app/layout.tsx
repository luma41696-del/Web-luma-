import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

import { LanguageProvider } from '@/i18n/LanguageProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/layout/Preloader';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { siteConfig } from '@/content/site.config';
import { baseKeywords, jsonLd, organizationGraph } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name.en} — ${siteConfig.tagline.en}`,
    template: `%s | ${siteConfig.name.en}`,
  },
  description: siteConfig.description.en,
  keywords: baseKeywords,
  authors: [{ name: siteConfig.name.en, url: siteConfig.url }],
  creator: siteConfig.name.en,
  publisher: siteConfig.legalName,
  applicationName: siteConfig.name.en,
  alternates: {
    canonical: '/',
    // Both languages share one URL (the switch is client-side), so every
    // locale resolves to the same canonical. If the site ever moves to /ar
    // routes, this is the block that changes.
    languages: { en: '/', ar: '/', 'x-default': '/' },
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
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name.en} — ${siteConfig.tagline.en}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name.en} — ${siteConfig.tagline.en}`,
    description: siteConfig.tagline.en,
    images: ['/opengraph-image'],
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

  // Emitted only once a token is set in site.config.ts, so the head never
  // carries an empty verification tag.
  ...(siteConfig.verification.google || siteConfig.verification.bing
    ? {
        verification: {
          ...(siteConfig.verification.google
            ? { google: siteConfig.verification.google }
            : {}),
          ...(siteConfig.verification.bing
            ? { other: { 'msvalidate.01': siteConfig.verification.bing } }
            : {}),
        },
      }
    : {}),
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
          dangerouslySetInnerHTML={jsonLd(organizationGraph())}
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

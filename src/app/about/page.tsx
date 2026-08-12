import type { Metadata } from 'next';
import { AboutPageContent } from './AboutPageContent';
import { siteConfig } from '@/content/site.config';
import { about } from '@/content/company';

export const metadata: Metadata = {
  title: 'About',
  description: about.whoWeAre.en,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About | ${siteConfig.name.en}`,
    description: about.whoWeAre.en,
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}

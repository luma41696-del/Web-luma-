import type { Metadata } from 'next';
import { PortfolioPageContent } from './PortfolioPageContent';
import { siteConfig } from '@/content/site.config';

const description =
  'Selected LUMA Agency projects across digital marketing, business development, content production, and software development.';

export const metadata: Metadata = {
  title: 'Portfolio',
  description,
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: `Portfolio | ${siteConfig.name.en}`,
    description,
    url: `${siteConfig.url}/portfolio`,
  },
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}

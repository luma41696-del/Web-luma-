import type { Metadata } from 'next';
import { ServicesPageContent } from './ServicesPageContent';
import { siteConfig } from '@/content/site.config';

const description =
  'Digital marketing, business development, automation and AI, content creation and production, and IT and software development — delivered end to end from Amman, Jordan.';

export const metadata: Metadata = {
  title: 'Services',
  description,
  alternates: { canonical: '/services' },
  openGraph: {
    title: `Services | ${siteConfig.name.en}`,
    description,
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}

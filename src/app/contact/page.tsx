import type { Metadata } from 'next';
import { ContactPageContent } from './ContactPageContent';
import { siteConfig } from '@/content/site.config';
import { faqs } from '@/content/company';

const description = `Talk to LUMA Agency in ${siteConfig.location.city.en}, ${siteConfig.location.country.en}. Phone ${siteConfig.contact.phoneDisplay}, email ${siteConfig.contact.email}, or message us on WhatsApp.`;

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact | ${siteConfig.name.en}`,
    description,
    url: `${siteConfig.url}/contact`,
  },
};

/** FAQ structured data, generated from the same source the page renders. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question.en,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer.en },
  })),
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactPageContent />
    </>
  );
}

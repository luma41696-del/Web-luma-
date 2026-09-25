import { ContactPageContent } from './ContactPageContent';
import { faqs } from '@/content/company';
import { siteConfig } from '@/content/site.config';
import { breadcrumbSchema, jsonLd, pageMetadata, schemaIds } from '@/lib/seo';

const description = `Talk to LUMA Agency in ${siteConfig.location.city.en}, ${siteConfig.location.country.en}. Phone ${siteConfig.contact.phoneDisplay}, email ${siteConfig.contact.email}, or message us on WhatsApp.`;

export const metadata = pageMetadata({
  title: 'Contact — LUMA Agency, Amman Jordan',
  description,
  path: '/contact',
  keywords: [
    'contact LUMA Agency',
    'marketing agency Amman contact',
    'تواصل مع شركة تسويق في عمان',
    'أرقام شركة تسويق الأردن',
  ],
});

/**
 * ContactPage + FAQPage, both built from the same source the page renders,
 * so the markup can never drift from what a visitor actually reads — which
 * is exactly what Google penalises FAQ markup for.
 */
const contactSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${siteConfig.url}/contact#page`,
      url: `${siteConfig.url}/contact`,
      name: 'Contact LUMA Agency',
      description,
      inLanguage: ['en', 'ar'],
      isPartOf: { '@id': schemaIds.website },
      about: { '@id': schemaIds.localBusiness },
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteConfig.url}/contact#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question.en,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer.en },
      })),
    },
    breadcrumbSchema([{ name: 'Contact', path: '/contact' }]),
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(contactSchema)} />
      <ContactPageContent />
    </>
  );
}

import { AboutPageContent } from './AboutPageContent';
import { about } from '@/content/company';
import { team } from '@/content/team';
import { siteConfig } from '@/content/site.config';
import { breadcrumbSchema, jsonLd, pageMetadata, schemaIds } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About LUMA Agency — Creative Agency in Amman, Jordan',
  description: about.whoWeAre.en,
  path: '/about',
  keywords: ['about LUMA Agency', 'creative agency Amman team', 'وكالة إبداعية عمان'],
});

/**
 * AboutPage schema plus the team roster. Naming employees gives Google an
 * entity trail from the company to real people, which is one of the signals
 * behind the knowledge panel for a local business.
 */
const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${siteConfig.url}/about#page`,
      url: `${siteConfig.url}/about`,
      name: 'About LUMA Agency',
      description: about.whoWeAre.en,
      inLanguage: ['en', 'ar'],
      isPartOf: { '@id': schemaIds.website },
      about: { '@id': schemaIds.organization },
      mainEntity: {
        '@id': schemaIds.organization,
        employee: team.map((member) => ({
          '@type': 'Person',
          name: member.name,
          jobTitle: member.role.en,
          worksFor: { '@id': schemaIds.organization },
        })),
      },
    },
    breadcrumbSchema([{ name: 'About', path: '/about' }]),
  ],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(aboutSchema)} />
      <AboutPageContent />
    </>
  );
}

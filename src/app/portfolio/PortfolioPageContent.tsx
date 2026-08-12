'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { PageHeader } from '@/components/sections/PageHeader';
import { PortfolioGrid } from '@/components/sections/Portfolio';
import { CallToAction } from '@/components/sections/CallToAction';

export function PortfolioPageContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow={t('sections.portfolioTitle')}
        title={t('sections.portfolioTitle')}
        subtitle={t('sections.portfolioSubtitle')}
      />

      <section className="section pt-0">
        <div className="shell">
          <PortfolioGrid />
        </div>
      </section>

      <CallToAction />
    </>
  );
}

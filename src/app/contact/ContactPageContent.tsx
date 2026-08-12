'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactSection } from '@/components/sections/Contact';

export function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow={t('nav.contact')}
        title={t('contact.ctaTitle')}
        subtitle={t('sections.contactSubtitle')}
      />
      <ContactSection />
    </>
  );
}

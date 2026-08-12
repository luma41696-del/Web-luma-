'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { services } from '@/content/services';
import { PageHeader } from '@/components/sections/PageHeader';
import { CallToAction } from '@/components/sections/CallToAction';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { TiltCard } from '@/components/ui/TiltCard';
import { ServiceIcon } from '@/components/ui/Icons';
import { Arrow } from '@/components/ui/Button';
import { StarGlyph } from '@/components/ui/Logo';

export function ServicesPageContent() {
  const { t, pick } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow={t('sections.servicesTitle')}
        title={t('sections.servicesTitle')}
        subtitle={t('sections.servicesSubtitle')}
      />

      <section className="section pt-0">
        <div className="shell">
          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <Reveal key={service.slug}>
                <TiltCard intensity={4} className="h-full">
                  <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition-colors duration-500 hover:border-gold/30">
                    {/* Service accent wash */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                      style={{ background: `hsl(${service.hue} 65% 50% / 0.22)` }}
                    />

                    <div className="relative flex items-start justify-between gap-4">
                      <span
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 ease-cosmic group-hover:scale-105"
                        style={{
                          background: `hsl(${service.hue} 60% 50% / 0.14)`,
                          color: `hsl(${service.hue} 82% 74%)`,
                        }}
                      >
                        <ServiceIcon name={service.icon} size={29} />
                      </span>

                      <span className="rounded-full border border-white/[0.08] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-steel-500">
                        {pick(service.category)}
                      </span>
                    </div>

                    <h2 className="relative mt-6 text-xl font-bold leading-snug text-starlight transition-colors duration-300 group-hover:text-gold-400">
                      {pick(service.title)}
                    </h2>

                    <p className="relative mt-3 text-[0.92rem] font-light leading-relaxed text-steel-300">
                      {pick(service.summary)}
                    </p>

                    <ul className="relative mt-6 flex flex-1 flex-col gap-2.5">
                      {pick(service.features).slice(0, 4).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-[0.85rem] font-light text-steel-400"
                        >
                          <StarGlyph
                            size={9}
                            className="mt-1.5 shrink-0 text-gold/70"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/services/${service.slug}`}
                      className="group/link relative mt-7 inline-flex items-center gap-2 text-[0.74rem] font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-400"
                    >
                      {t('common.learnMore')}
                      <Arrow />
                      {/* Full-card hit area, so the whole tile is clickable */}
                      <span className="absolute inset-0 -m-8" aria-hidden="true" />
                    </Link>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CallToAction />
    </>
  );
}

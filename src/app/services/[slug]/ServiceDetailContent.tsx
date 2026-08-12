'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { getService, services } from '@/content/services';
import { PageHeader } from '@/components/sections/PageHeader';
import { CallToAction } from '@/components/sections/CallToAction';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceIcon } from '@/components/ui/Icons';
import { StarGlyph } from '@/components/ui/Logo';
import { LinkButton, Arrow } from '@/components/ui/Button';

export function ServiceDetailContent({ slug }: { slug: string }) {
  const { t, pick } = useLanguage();
  const service = getService(slug);

  if (!service) return null;

  const others = services.filter((item) => item.slug !== slug);

  return (
    <>
      <PageHeader
        eyebrow={pick(service.category)}
        title={pick(service.title)}
        subtitle={pick(service.summary)}
      >
        <span
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl"
          style={{
            background: `hsl(${service.hue} 60% 50% / 0.14)`,
            color: `hsl(${service.hue} 82% 76%)`,
            boxShadow: `0 0 46px -10px hsl(${service.hue} 70% 55% / 0.6)`,
          }}
        >
          <ServiceIcon name={service.icon} size={38} />
        </span>
      </PageHeader>

      {/* Overview + features */}
      <section className="section pt-0">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal>
              <div>
                <h2 className="flex items-center gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold">
                  <StarGlyph size={10} />
                  {t('services.overview')}
                </h2>
                <p className="mt-5 text-[1.02rem] font-light leading-relaxed text-steel-300">
                  {pick(service.overview)}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-7">
                <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold">
                  {t('services.whatWeDo')}
                </h2>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {pick(service.features).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[0.92rem] font-light text-steel-300"
                    >
                      <StarGlyph size={10} className="mt-1.5 shrink-0 text-gold/75" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section pt-0">
        <div className="shell">
          <SectionHeading
            eyebrow={t('services.benefits')}
            title={t('services.benefitsSubtitle')}
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pick(service.benefits).map((benefit, index) => (
              <Reveal key={benefit}>
                <div className="glass h-full rounded-2xl p-6">
                  <span
                    aria-hidden="true"
                    className="text-[0.68rem] font-bold tabular-nums tracking-[0.2em]"
                    style={{ color: `hsl(${service.hue} 70% 66%)` }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-steel-300">
                    {benefit}
                  </p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process — a flight path */}
      <section className="section pt-0">
        <div className="shell">
          <SectionHeading
            eyebrow={t('services.process')}
            title={t('services.processSubtitle')}
          />

          <RevealGroup className="relative mt-14">
            {/* Trajectory line */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 start-[1.45rem] w-px bg-gradient-to-b from-gold/45 via-steel-600/30 to-transparent lg:start-1/2"
            />

            <ol className="flex flex-col gap-6">
              {pick(service.process).map((step, index) => (
                <Reveal key={step}>
                  <li
                    className={`relative flex items-start gap-5 lg:w-1/2 ${
                      index % 2 === 0
                        ? 'lg:ms-0 lg:flex-row-reverse lg:pe-10 lg:text-end'
                        : 'lg:ms-auto lg:ps-10'
                    }`}
                  >
                    <span
                      className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-space-800 text-[0.8rem] font-bold tabular-nums text-gold lg:absolute lg:top-0"
                      style={
                        index % 2 === 0
                          ? { insetInlineEnd: '-1.5rem' }
                          : { insetInlineStart: '-1.5rem' }
                      }
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="glass flex-1 rounded-2xl p-6">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-steel-500">
                        {t('services.step')} {index + 1}
                      </p>
                      <p className="mt-2 text-[0.98rem] font-light leading-relaxed text-starlight">
                        {step}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </RevealGroup>
        </div>
      </section>

      {/* Technologies */}
      <section className="section pt-0">
        <div className="shell">
          <SectionHeading
            eyebrow={t('services.technologies')}
            title={t('services.technologiesSubtitle')}
          />

          <RevealGroup className="mt-12 flex flex-wrap justify-center gap-3">
            {pick(service.technologies).map((technology) => (
              <Reveal key={technology}>
                <span className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[0.85rem] font-light text-steel-300 transition-colors duration-300 hover:border-gold/30 hover:text-starlight">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: `hsl(${service.hue} 75% 65%)` }}
                  />
                  {technology}
                </span>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Other services */}
      <section className="section pt-0">
        <div className="shell">
          <SectionHeading
            eyebrow={t('services.otherServices')}
            title={t('services.exploreMore')}
          />

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <Reveal key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="glass group flex h-full flex-col rounded-2xl p-6 transition-colors duration-400 hover:border-gold/30"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background: `hsl(${other.hue} 60% 50% / 0.13)`,
                      color: `hsl(${other.hue} 82% 74%)`,
                    }}
                  >
                    <ServiceIcon name={other.icon} size={22} />
                  </span>
                  <h3 className="mt-4 flex-1 text-[0.95rem] font-bold leading-snug text-starlight transition-colors group-hover:text-gold-400">
                    {pick(other.title)}
                  </h3>
                  <Arrow className="mt-3 text-gold" />
                </Link>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-10 flex justify-center">
            <LinkButton href="/services" variant="ghost">
              {t('services.allServices')}
              <Arrow />
            </LinkButton>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}

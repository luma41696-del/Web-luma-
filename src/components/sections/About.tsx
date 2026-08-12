'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { about, values } from '@/content/company';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { ValueIcon } from '@/components/ui/Icons';
import { LumaMark, StarGlyph } from '@/components/ui/Logo';
import { LinkButton, Arrow } from '@/components/ui/Button';

/**
 * "Who We Are" — framed as the view through a craft's observation window,
 * with the LUMA mark held in a set of thin orbital rings.
 */
export function AboutIntro({ withCta = true }: { withCta?: boolean }) {
  const { t, pick } = useLanguage();

  return (
    <section id="about" className="section scroll-mt-24">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Observation window */}
          <Reveal className="order-2 lg:order-1">
            <ObservationWindow />
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow={t('sections.whoWeAre')}
              title={t('sections.aboutTitle')}
              align="start"
              className="max-w-none"
              gradient
            />

            <Reveal delay={0.1}>
              <p className="mt-8 text-[1.02rem] font-light leading-relaxed text-steel-300">
                {pick(about.whoWeAre)}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <blockquote className="border-s-gold mt-7 ps-5">
                <p className="text-[0.98rem] font-light italic leading-relaxed text-steel-300">
                  {pick(about.story)}
                </p>
              </blockquote>
            </Reveal>

            <RevealGroup className="mt-9 grid gap-4 sm:grid-cols-2" delay={0.2}>
              <Reveal>
                <MissionCard
                  label={t('sections.ourMission')}
                  body={pick(about.mission)}
                />
              </Reveal>
              <Reveal>
                <MissionCard
                  label={t('sections.ourVision')}
                  body={pick(about.vision)}
                />
              </Reveal>
            </RevealGroup>

            {withCta && (
              <Reveal delay={0.3}>
                <div className="mt-9">
                  <LinkButton href="/about" variant="secondary">
                    {t('common.learnMore')}
                    <Arrow />
                  </LinkButton>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionCard({ label, body }: { label: string; body: string }) {
  return (
    <div className="glass h-full rounded-2xl p-6">
      <p className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold">
        <StarGlyph size={9} />
        {label}
      </p>
      <p className="mt-3.5 text-[0.88rem] font-light leading-relaxed text-steel-400">
        {body}
      </p>
    </div>
  );
}

/** The mark, held in slowly turning orbital rings. */
function ObservationWindow() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* Window frame */}
      <div
        className="absolute inset-0 rounded-full border border-white/[0.09]"
        style={{
          background:
            'radial-gradient(circle at 32% 26%, rgba(22,73,110,0.34), rgba(2,8,15,0.9) 70%)',
          boxShadow:
            'inset 0 0 90px rgba(2,8,15,0.9), inset 0 2px 0 rgba(245,247,250,0.07), 0 30px 90px -40px rgba(0,0,0,0.9)',
        }}
      />

      {/* Orbital rings */}
      <div
        aria-hidden="true"
        className={`absolute inset-[8%] rounded-full border border-dashed border-steel-500/20 ${
          reducedMotion ? '' : 'animate-orbit-slow'
        }`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-[18%] rounded-full border border-gold/[0.16]"
      />
      <div
        aria-hidden="true"
        className={`absolute inset-[18%] ${reducedMotion ? '' : 'animate-orbit'}`}
      >
        {/* A single bright body travelling the inner ring */}
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_14px_4px_rgba(232,185,92,0.6)]" />
      </div>

      {/* Scattered stars inside the window */}
      <div aria-hidden="true" className="absolute inset-[12%] overflow-hidden rounded-full">
        {[
          [22, 30],
          [70, 22],
          [58, 68],
          [33, 74],
          [82, 54],
          [46, 44],
        ].map(([left, top], index) => (
          <span
            key={index}
            className={`absolute h-1 w-1 rounded-full bg-starlight/70 ${
              reducedMotion ? '' : 'animate-twinkle'
            }`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${index * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* The mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="absolute h-32 w-32 rounded-full bg-gold/[0.12] blur-2xl" />
        <LumaMark variant="light" size={62} className="relative" />
      </div>

      {/* Glass highlight across the pane */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.09] via-transparent to-transparent"
      />
    </div>
  );
}

/** The five company values. */
export function Values() {
  const { t, pick } = useLanguage();

  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={t('sections.ourValues')}
          title={t('sections.valuesSubtitle')}
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <Reveal key={value.icon}>
              <div className="glass group h-full rounded-2xl p-7 transition-colors duration-500 hover:border-gold/30">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/[0.09] text-gold transition-transform duration-500 ease-cosmic group-hover:scale-105">
                  <ValueIcon name={value.icon} size={23} />
                </span>
                <h3 className="mt-5 text-base font-bold text-starlight">
                  {pick(value.title)}
                </h3>
                <p className="mt-2.5 text-[0.88rem] font-light leading-relaxed text-steel-400">
                  {pick(value.description)}
                </p>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

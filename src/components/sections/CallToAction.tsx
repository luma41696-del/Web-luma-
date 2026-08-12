'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { links } from '@/content/site.config';
import { Reveal, MaskReveal } from '@/components/ui/Reveal';
import { LinkButton, Arrow } from '@/components/ui/Button';
import { StarGlyph } from '@/components/ui/Logo';
import { UtilityIcon } from '@/components/ui/Icons';

/** Closing call to action — the launch prompt. */
export function CallToAction() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="section relative overflow-hidden">
      <div className="shell">
        <div className="glass-strong relative overflow-hidden rounded-3xl px-7 py-16 text-center sm:px-14 sm:py-20">
          {/* Ignition glow rising from the base */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
            style={{
              background:
                'radial-gradient(28rem 14rem at 50% 100%, rgba(232,185,92,0.2), transparent 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          />

          <div className="relative">
            <span
              className={`inline-flex text-gold ${reducedMotion ? '' : 'animate-halo'}`}
            >
              <StarGlyph size={26} />
            </span>

            <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(1.8rem,4.6vw,3rem)] font-bold leading-[1.13] text-starlight">
              <MaskReveal>{t('contact.ctaTitle')}</MaskReveal>
            </h2>

            <Reveal delay={0.12}>
              <p className="mx-auto mt-5 max-w-xl text-[1rem] font-light leading-relaxed text-steel-300">
                {t('contact.ctaSubtitle')}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                <LinkButton href="/contact" size="lg">
                  {t('nav.getStarted')}
                  <Arrow />
                </LinkButton>

                <LinkButton
                  href={links.whatsapp()}
                  external
                  variant="secondary"
                  size="lg"
                >
                  <UtilityIcon name="whatsapp" size={17} />
                  {t('contact.whatsapp')}
                </LinkButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

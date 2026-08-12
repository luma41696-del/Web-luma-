'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Starfield } from '@/components/space/Starfield';
import { LinkButton, Arrow } from '@/components/ui/Button';
import { LumaMark, StarGlyph } from '@/components/ui/Logo';

/** Lost in space — the 404. */
export default function NotFound() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden py-24">
      <Starfield density={34} parallax={30} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(40rem 28rem at 50% 40%, rgba(22,73,110,0.28), transparent 70%)',
        }}
      />

      <div className="shell relative text-center">
        {/* A mark adrift, tumbling very slowly */}
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-dashed border-steel-600/25"
          />
          <span
            aria-hidden="true"
            className="absolute h-24 w-24 rounded-full bg-gold/10 blur-2xl"
          />
          <div className={reducedMotion ? '' : 'animate-drift'}>
            <LumaMark variant="light" size={42} className="opacity-70" />
          </div>
        </div>

        <p className="mt-10 text-[clamp(4rem,16vw,9rem)] font-bold leading-none tabular-nums text-gradient-star">
          {t('notFound.code')}
        </p>

        <h1 className="mt-4 flex items-center justify-center gap-3 text-2xl font-bold text-starlight sm:text-3xl">
          <StarGlyph size={14} className="text-gold" />
          {t('notFound.title')}
        </h1>

        <p className="mx-auto mt-5 max-w-md text-[0.98rem] font-light leading-relaxed text-steel-300">
          {t('notFound.subtitle')}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <LinkButton href="/" size="lg">
            {t('notFound.home')}
            <Arrow />
          </LinkButton>
          <LinkButton href="/contact" variant="secondary" size="lg">
            {t('notFound.contact')}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

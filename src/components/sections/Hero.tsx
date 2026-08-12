'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Starfield } from '@/components/space/Starfield';
import { SpaceAsset } from '@/components/space/SpaceAsset';
import { CraftFallback } from '@/components/space/Fallbacks';
import { LinkButton, Arrow } from '@/components/ui/Button';
import { StarGlyph } from '@/components/ui/Logo';

/**
 * The opening scene: deep space, a craft rising out of it, and the promise.
 *
 * Depth is built from four layers that move at different rates — the star
 * field (pointer + scroll), a nebula wash, the craft (scroll-linked drift),
 * and the type, which stays put so it is always readable. That last point is
 * deliberate: the brief is explicit that legibility outranks effect.
 */
export function Hero() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-[var(--nav-h)]">
      {/* Layer 1 — stars */}
      <Starfield density={30} parallax={26} />

      {/* Layer 2 — nebula wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-1/4 top-[8%] h-[38rem] w-[38rem] rounded-full bg-luma-600/[0.16] blur-[130px]" />
        <div className="absolute -left-[15%] bottom-[4%] h-[30rem] w-[30rem] rounded-full bg-midnight-600/25 blur-[120px]" />
        <div className="absolute left-[62%] top-[26%] h-[20rem] w-[20rem] rounded-full bg-gold/[0.055] blur-[100px]" />
      </div>

      {/* Layer 3 — the craft.
          Sits behind the type on small screens, beside it from lg up. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 end-0 flex w-full items-center justify-end lg:w-[58%]"
      >
        <SpaceAsset
          src="/images/space/spaceship.webp"
          alt=""
          priority
          drift={70}
          tilt={18}
          className="w-[132%] max-w-none translate-y-4 opacity-40 sm:w-[110%] sm:opacity-55 lg:w-[118%] lg:translate-x-[8%] lg:translate-y-0 lg:opacity-100"
          imageClassName="h-auto w-full select-none drop-shadow-[0_50px_90px_rgba(0,0,0,0.75)]"
          fallback={
            <CraftFallback className="h-auto w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]" />
          }
        />
      </div>

      {/* Readability scrim behind the copy — a soft horizontal gradient so the
          craft never fights the headline for contrast. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-space-900 via-space-900/82 to-transparent rtl:bg-gradient-to-l"
      />

      {/* Layer 4 — the promise */}
      <div className="shell relative z-10">
        <div className="max-w-2xl">
          <motion.p
            className="eyebrow"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <StarGlyph size={11} />
            {t('hero.eyebrow')}
          </motion.p>

          <h1 className="mt-6 text-[clamp(2.4rem,7vw,4.6rem)] font-bold leading-[1.06] tracking-tight">
            {t('hero.title')
              .split(' ')
              .map((word, index, all) => (
                <span key={index} className="inline-block overflow-hidden pb-[0.1em]">
                  <motion.span
                    className={`inline-block ${
                      index >= all.length - 1
                        ? 'text-gradient-star'
                        : 'text-starlight'
                    }`}
                    initial={reducedMotion ? false : { y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      delay: 0.25 + index * 0.09,
                      duration: 0.95,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                    {index < all.length - 1 && ' '}
                  </motion.span>
                </span>
              ))}
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-[1rem] font-light leading-relaxed text-steel-300 sm:text-[1.1rem]"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.88, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <LinkButton href="/services" size="lg">
              {t('hero.explore')}
              <Arrow />
            </LinkButton>
            <LinkButton href="/portfolio" variant="secondary" size="lg">
              {t('hero.viewWork')}
            </LinkButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2.5"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.32em] text-steel-500">
          {t('hero.scroll')}
        </span>
        <span
          aria-hidden="true"
          className="relative h-10 w-px overflow-hidden bg-white/10"
        >
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent via-gold to-transparent"
            animate={reducedMotion ? undefined : { y: ['-100%', '340%'] }}
            transition={{ duration: 2.3, ease: 'easeInOut', repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}

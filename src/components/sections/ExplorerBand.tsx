'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { SpaceAsset } from '@/components/space/SpaceAsset';
import { ExplorerFallback } from '@/components/space/Fallbacks';
import { Reveal, MaskReveal } from '@/components/ui/Reveal';
import { StarGlyph } from '@/components/ui/Logo';
import { awards } from '@/content/awards';

/**
 * The transition between what LUMA does and what LUMA has been given credit
 * for. An explorer stands at the threshold, facing a constellation in which
 * every star is one of the shields in the section below.
 */
export function ExplorerBand() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-label={t('sections.recognitionTitle')}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(48rem 30rem at 26% 55%, rgba(22,73,110,0.24), transparent 66%)',
        }}
      />

      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* The explorer, adrift.
              No ground shadow here — the figure is weightless, so the light
              under it is a soft cosmic aura rather than a contact shadow. */}
          <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-luma-400/[0.13] blur-[70px]"
            />
            <SpaceAsset
              src="/images/space/astronaut-floating.webp"
              alt=""
              drift={52}
              tilt={14}
              className="relative"
              imageClassName="h-auto w-full select-none drop-shadow-[0_30px_70px_rgba(0,0,0,0.65)]"
              fallback={
                <ExplorerFallback className="mx-auto h-auto w-2/3 drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]" />
              }
            />
          </div>

          {/* The constellation of reached stars */}
          <div>
            <Reveal>
              <span className="eyebrow">
                <StarGlyph size={11} />
                {t('sections.recognitionTitle')}
              </span>
            </Reveal>

            <h2 className="mt-5 text-[clamp(1.7rem,4vw,2.7rem)] font-bold leading-[1.15] text-starlight">
              <MaskReveal>{t('sections.recognitionSubtitle')}</MaskReveal>
            </h2>

            {/* Each dot is one shield — the section below unpacks them */}
            <Reveal delay={0.18}>
              <div className="relative mt-10 h-44 sm:h-52">
                <svg
                  viewBox="0 0 400 180"
                  className="h-full w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M28 138 L74 92 L126 118 L172 58 L222 96 L268 44 L312 86 L358 40"
                    fill="none"
                    stroke="rgba(232,185,92,0.28)"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                  />
                  {[
                    [28, 138],
                    [74, 92],
                    [126, 118],
                    [172, 58],
                    [222, 96],
                    [268, 44],
                    [312, 86],
                    [358, 40],
                    [200, 150],
                    [96, 40],
                  ]
                    .slice(0, awards.length)
                    .map(([cx, cy], index) => (
                      <g key={index}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r="8"
                          fill="rgba(232,185,92,0.1)"
                          className={reducedMotion ? '' : 'animate-halo'}
                          style={{ animationDelay: `${index * 0.45}s` }}
                        />
                        <circle cx={cx} cy={cy} r="2.6" fill="#F2CE84" />
                      </g>
                    ))}
                </svg>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <a
                href="#recognition"
                className="group inline-flex items-center gap-2.5 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-400"
              >
                {t('common.viewAll')}
                <svg
                  viewBox="0 0 16 16"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

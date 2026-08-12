'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { stats, strengths } from '@/content/company';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Counter } from '@/components/ui/Counter';
import { StarGlyph } from '@/components/ui/Logo';

/**
 * Why LUMA — six qualitative strengths, followed by the figures the company
 * publishes on its own API. The numbers are reproduced as given.
 */
export function WhyLuma() {
  const { t, pick } = useLanguage();

  return (
    <section className="section relative">
      <div className="shell">
        <SectionHeading
          eyebrow={t('sections.whyTitle')}
          title={t('sections.whySubtitle')}
          gradient
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((strength, index) => (
            <Reveal key={strength.key}>
              <article className="group relative h-full bg-space-800/85 p-8 transition-colors duration-500 hover:bg-midnight-800/70">
                <span
                  aria-hidden="true"
                  className="text-[0.7rem] font-bold tabular-nums tracking-[0.2em] text-steel-600"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="mt-4 flex items-center gap-2.5 text-lg font-bold text-starlight">
                  <StarGlyph
                    size={11}
                    className="text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  {pick(strength.title)}
                </h3>

                <p className="mt-3 text-[0.9rem] font-light leading-relaxed text-steel-400">
                  {pick(strength.description)}
                </p>

                {/* Light sweeping in along the leading edge on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 start-0 w-px scale-y-0 bg-gradient-to-b from-transparent via-gold to-transparent transition-transform duration-500 ease-cosmic group-hover:scale-y-100"
                />
              </article>
            </Reveal>
          ))}
        </RevealGroup>

        {/* Figures */}
        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Reveal key={stat.key}>
              <div className="glass h-full rounded-2xl p-7 text-center">
                <p className="text-[clamp(2rem,4vw,2.9rem)] font-bold leading-none text-starlight">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-gold">
                  {pick(stat.label)}
                </p>
                <p className="mt-2.5 text-[0.8rem] font-light leading-relaxed text-steel-500">
                  {pick(stat.description)}
                </p>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

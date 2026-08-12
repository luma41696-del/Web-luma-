'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { testimonials } from '@/content/company';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

export function Testimonials() {
  const { t, pick } = useLanguage();

  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={t('sections.testimonialsTitle')}
          title={t('sections.testimonialsSubtitle')}
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Reveal key={`${testimonial.name}-${testimonial.company}`}>
              <figure className="glass flex h-full flex-col rounded-2xl p-7">
                {/* Rating */}
                <div
                  className="flex items-center gap-1"
                  role="img"
                  aria-label={`${testimonial.rating} / 5`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      viewBox="0 0 20 20"
                      width="14"
                      height="14"
                      aria-hidden="true"
                      className={
                        index < testimonial.rating
                          ? 'text-gold'
                          : 'text-steel-700'
                      }
                      fill="currentColor"
                    >
                      <path d="M10 1.6l2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.6-5 2.6 1-5.6-4.1-4 5.6-.8z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="mt-5 flex-1">
                  <p className="text-[0.95rem] font-light leading-relaxed text-steel-300">
                    {pick(testimonial.quote)}
                  </p>
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-white/[0.07] pt-5">
                  {/* Monogram — no stock avatars stand in for real people */}
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-luma-600/25 text-[0.8rem] font-bold text-gold-400 ring-1 ring-gold/20"
                  >
                    {testimonial.name
                      .split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-[0.9rem] font-bold text-starlight">
                      {testimonial.name}
                    </p>
                    <p className="truncate text-[0.78rem] text-steel-500">
                      {pick(testimonial.position)} · {testimonial.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

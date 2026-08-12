'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { awards, awardSrc } from '@/content/awards';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { Lightbox, type LightboxItem } from '@/components/ui/Lightbox';
import { StarGlyph } from '@/components/ui/Logo';
import { Starfield } from '@/components/space/Starfield';

/**
 * Hall of Recognition.
 *
 * Each shield is displayed in a lit glass vitrine on a glowing pedestal, the
 * way a physical award would be — and every plaque photograph is shown whole,
 * never cropped, so the awarding company's logo and the full Arabic citation
 * stay intact. The vitrine interior is deliberately light: these are white
 * studio photographs, and dropping them straight onto the night sky would
 * leave hard white rectangles floating in space.
 *
 * The rail scroll-snaps, is keyboard navigable, and opens a full-size
 * lightbox on click.
 */
export function Recognition() {
  const { t, pick } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const railRef = useRef<HTMLUListElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollOn, setCanScrollOn] = useState(true);

  const lightboxItems: LightboxItem[] = awards.map((award) => ({
    id: award.slug,
    src: awardSrc.full(award.image),
    avifSrc: awardSrc.fullAvif(award.image),
    alt: pick(award.alt),
    title: pick(award.title),
    caption: award.recipient ? pick(award.recipient) : undefined,
    meta: `${t('recognition.presentedBy')} ${pick(award.awardedBy)}`,
    width: award.width,
    height: award.height,
  }));

  const updateScrollState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    // `scrollLeft` is negative in RTL on most engines; compare on magnitude.
    const position = Math.abs(rail.scrollLeft);
    const maximum = rail.scrollWidth - rail.clientWidth;
    setCanScrollBack(position > 8);
    setCanScrollOn(position < maximum - 8);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    updateScrollState();
    rail.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      rail.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('li');
    const amount = card ? card.clientWidth + 24 : 340;
    rail.scrollBy({
      left: amount * direction * (document.documentElement.dir === 'rtl' ? -1 : 1),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="recognition"
      className="section relative overflow-hidden scroll-mt-24"
    >
      {/* A denser, slower field — this is the deepest point of the journey */}
      <Starfield density={20} parallax={14} className="opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow={t('sections.recognitionTitle')}
          title={t('sections.recognitionSubtitle')}
        />

        {/* Rail controls */}
        <div className="mt-12 flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-xs font-medium tabular-nums tracking-wide text-steel-500">
            <StarGlyph size={9} className="text-gold" />
            {awards.length}
          </p>

          <div className="flex items-center gap-2">
            <RailButton
              label={t('recognition.previous')}
              disabled={!canScrollBack}
              onClick={() => scrollByCard(-1)}
              direction="start"
            />
            <RailButton
              label={t('recognition.next')}
              disabled={!canScrollOn}
              onClick={() => scrollByCard(1)}
              direction="end"
            />
          </div>
        </div>
      </div>

      {/* The rail itself breaks out of the shell so cards can bleed to the edge */}
      <ul
        ref={railRef}
        className="no-scrollbar mask-fade-x mt-7 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-10 pt-4 sm:px-8 lg:px-12"
      >
        {awards.map((award, index) => (
          <li
            key={award.slug}
            className="w-[16.5rem] shrink-0 snap-center sm:w-[19rem]"
          >
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 34, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{
                delay: Math.min(index, 5) * 0.07,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <AwardCapsule
                index={index}
                onOpen={() => setLightboxIndex(index)}
              />
            </motion.div>
          </li>
        ))}
      </ul>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}

function AwardCapsule({
  index,
  onOpen,
}: {
  index: number;
  onOpen: () => void;
}) {
  const { t, pick } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const award = awards[index];

  return (
    <TiltCard intensity={6} sheen={false} className="group">
      {/* Very slow float, phase-shifted per card so the row never pulses in sync */}
      <div
        className={reducedMotion ? '' : 'animate-drift'}
        style={{ animationDelay: `${(index % 5) * 1.4}s`, animationDuration: '11s' }}
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={t('recognition.openLightbox', {
            name: pick(award.awardedBy),
          })}
          className="block w-full text-start"
        >
          {/* Vitrine */}
          <div className="glass relative overflow-hidden rounded-[1.4rem] p-3 transition-all duration-500 ease-cosmic group-hover:border-gold/45 group-hover:shadow-[0_0_50px_-14px_rgba(232,185,92,0.55)]">
            {/* Gold light raking the top edge of the glass */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#E8EDF3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={awardSrc.card(award.image)}
                alt={pick(award.alt)}
                width={award.width}
                height={award.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain transition-transform duration-700 ease-cosmic group-hover:scale-[1.035]"
              />

              {/* Glass reflection sweeping across the vitrine */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/55 via-transparent to-transparent opacity-45"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-y-8 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-all duration-[900ms] ease-cosmic group-hover:left-[110%] group-hover:opacity-100"
              />
            </div>

            {/* Plinth */}
            <div className="relative mt-3.5 px-2 pb-1.5">
              <p className="truncate text-[0.63rem] font-bold uppercase tracking-[0.18em] text-gold">
                {t('recognition.presentedBy')}
              </p>
              <h3 className="mt-1.5 text-[0.95rem] font-bold leading-snug text-starlight">
                {pick(award.awardedBy)}
              </h3>
              <p className="mt-1 text-[0.78rem] font-light text-steel-400">
                {pick(award.title)}
              </p>

              <span className="mt-3 inline-flex items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-steel-500 transition-colors duration-300 group-hover:text-gold">
                {t('recognition.viewFull')}
                <svg
                  viewBox="0 0 16 16"
                  width="11"
                  height="11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 2H2v4M10 14h4v-4M14 6V2h-4M2 10v4h4" />
                </svg>
              </span>
            </div>
          </div>

          {/* Pedestal glow beneath the capsule */}
          <span
            aria-hidden="true"
            className="mx-auto mt-2 block h-6 w-2/3 rounded-[50%] bg-gold/[0.13] blur-lg transition-all duration-500 group-hover:bg-gold/25 group-hover:blur-xl"
          />
        </button>
      </div>
    </TiltCard>
  );
}

function RailButton({
  label,
  onClick,
  disabled,
  direction,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  direction: 'start' | 'end';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="glass flex h-10 w-10 items-center justify-center rounded-full text-starlight transition-all duration-300 hover:border-gold/45 hover:text-gold disabled:pointer-events-none disabled:opacity-30"
    >
      <svg
        viewBox="0 0 24 24"
        width="17"
        height="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="rtl:-scale-x-100"
      >
        {direction === 'start' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );
}

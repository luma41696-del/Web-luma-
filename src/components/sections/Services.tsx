'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useMediaQuery, usePrefersReducedMotion } from '@/lib/hooks';
import { services } from '@/content/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { TiltCard } from '@/components/ui/TiltCard';
import { ServiceIcon } from '@/components/ui/Icons';
import { LumaMark } from '@/components/ui/Logo';
import { Arrow } from '@/components/ui/Button';

/**
 * Services, presented as the systems of the LUMA craft.
 *
 * From `lg` up the five services sit on an orbit around the mark, and
 * selecting one brings its detail into the centre. Below `lg` the same data
 * renders as a plain card stack — the orbit is a desktop affordance, not a
 * requirement for reading the content.
 */
export function Services() {
  const { t } = useLanguage();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <section id="services" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={t('sections.servicesTitle')}
          title={t('sections.servicesSubtitle')}
          gradient
        />

        <div className="mt-16 lg:mt-24">
          {isDesktop ? <ServiceOrbit /> : <ServiceCards />}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────── desktop orbit ───────────────────────────── */

function ServiceOrbit() {
  const { t, pick } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  const RADIUS = 250;

  return (
    <div className="relative mx-auto flex h-[38rem] max-w-4xl items-center justify-center">
      {/* Orbit rings */}
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <div className="orbit-ring absolute h-[500px] w-[500px]" />
        <div className="orbit-ring absolute h-[620px] w-[620px] opacity-60" />
        <div
          className={`absolute h-[500px] w-[500px] rounded-full border border-dashed border-gold/[0.14] ${
            reducedMotion ? '' : 'animate-orbit-slow'
          }`}
        />
      </div>

      {/* Centre: the mark, then the selected service's detail */}
      <div className="relative z-10 flex h-[290px] w-[290px] flex-col items-center justify-center rounded-full text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-space-900/85 backdrop-blur-md"
          style={{
            boxShadow:
              'inset 0 0 60px rgba(22,73,110,0.4), 0 0 80px -20px rgba(232,185,92,0.25)',
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            className="relative flex flex-col items-center px-9"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background: `hsl(${active.hue} 60% 50% / 0.14)`,
                color: `hsl(${active.hue} 82% 74%)`,
                boxShadow: `0 0 30px -8px hsl(${active.hue} 70% 55% / 0.55)`,
              }}
            >
              <ServiceIcon name={active.icon} size={28} />
            </span>

            <h3 className="mt-4 text-lg font-bold leading-snug text-starlight">
              {pick(active.title)}
            </h3>

            <p className="mt-2.5 text-[0.8rem] font-light leading-relaxed text-steel-400">
              {pick(active.summary)}
            </p>

            <Link
              href={`/services/${active.slug}`}
              className="group mt-4 inline-flex items-center gap-1.5 text-[0.74rem] font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-400"
            >
              {t('common.learnMore')}
              <Arrow />
            </Link>
          </motion.div>
        </AnimatePresence>

        <LumaMark
          variant="light"
          size={13}
          className="absolute bottom-7 opacity-25"
        />
      </div>

      {/* Orbiting service nodes */}
      {services.map((service, index) => {
        // Start at the top and distribute evenly clockwise.
        const angle = (index / services.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={service.slug}
            type="button"
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            aria-pressed={isActive}
            className="absolute z-20 flex w-32 flex-col items-center gap-2.5"
            // The orbit offset has to travel as Framer Motion's own `x`/`y`
            // values, not as an inline `transform`: animating `scale` rewrites
            // the whole transform property, which would wipe a hand-written
            // translate and collapse every node onto the centre.
            initial={
              reducedMotion ? { x, y } : { x, y, opacity: 0, scale: 0.7 }
            }
            whileInView={{ x, y, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.1 + index * 0.09,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-400 ease-cosmic"
              style={{
                borderColor: isActive
                  ? `hsl(${service.hue} 70% 60% / 0.55)`
                  : 'rgba(120,146,173,0.16)',
                background: isActive
                  ? `hsl(${service.hue} 60% 45% / 0.16)`
                  : 'rgba(6,27,45,0.72)',
                color: isActive
                  ? `hsl(${service.hue} 85% 76%)`
                  : '#7892AD',
                boxShadow: isActive
                  ? `0 0 34px -6px hsl(${service.hue} 72% 55% / 0.6)`
                  : 'none',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <ServiceIcon name={service.icon} size={28} />
            </span>

            <span
              className={`max-w-[9rem] text-center text-[0.68rem] font-bold uppercase leading-tight tracking-[0.1em] transition-colors duration-300 ${
                isActive ? 'text-starlight' : 'text-steel-500'
              }`}
            >
              {pick(service.title)}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────── mobile / tablet cards ──────────────────────── */

function ServiceCards() {
  const { t, pick } = useLanguage();

  return (
    <RevealGroup className="grid gap-5 sm:grid-cols-2">
      {services.map((service) => (
        <Reveal key={service.slug}>
          <TiltCard intensity={4} className="h-full">
            <Link
              href={`/services/${service.slug}`}
              className="glass group flex h-full flex-col rounded-2xl p-7 transition-colors duration-400 hover:border-gold/30"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-400 ease-cosmic group-hover:scale-105"
                style={{
                  background: `hsl(${service.hue} 60% 50% / 0.13)`,
                  color: `hsl(${service.hue} 82% 74%)`,
                }}
              >
                <ServiceIcon name={service.icon} size={28} />
              </span>

              <h3 className="mt-6 text-lg font-bold leading-snug text-starlight transition-colors group-hover:text-gold-400">
                {pick(service.title)}
              </h3>

              <p className="mt-3 flex-1 text-[0.9rem] font-light leading-relaxed text-steel-400">
                {pick(service.summary)}
              </p>

              <span className="mt-6 inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">
                {t('common.learnMore')}
                <Arrow />
              </span>
            </Link>
          </TiltCard>
        </Reveal>
      ))}
    </RevealGroup>
  );
}

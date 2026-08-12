'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Starfield } from '@/components/space/Starfield';
import { StarGlyph } from '@/components/ui/Logo';

/**
 * Shared masthead for the interior pages. Keeps the hero's cosmic register
 * without repeating its full staging.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <header className="relative overflow-hidden pb-16 pt-[calc(var(--nav-h)+4.5rem)] sm:pb-20 sm:pt-[calc(var(--nav-h)+6rem)]">
      <Starfield density={22} parallax={16} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(42rem 24rem at 50% -10%, rgba(22,73,110,0.3), transparent 68%)',
        }}
      />

      <div className="shell relative text-center">
        <motion.p
          className="eyebrow justify-center"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <StarGlyph size={11} />
          {eyebrow}
        </motion.p>

        <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(2.1rem,5.6vw,3.6rem)] font-bold leading-[1.1]">
          <span className="block overflow-hidden pb-[0.1em]">
            <motion.span
              className="block text-gradient-star"
              initial={reducedMotion ? false : { y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.span>
          </span>
        </h1>

        {subtitle && (
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-[1rem] font-light leading-relaxed text-steel-300"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle}
          </motion.p>
        )}

        {children && <div className="mt-10">{children}</div>}

        <span className="sr-only">{t('a11y.starfield')}</span>
      </div>
    </header>
  );
}

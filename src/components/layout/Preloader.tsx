'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { LumaMark, StarGlyph } from '@/components/ui/Logo';

const SESSION_KEY = 'luma-launched';

/**
 * Launch sequence.
 *
 * Shows once per browser session — a returning visitor navigating between
 * pages should not sit through it again. Skipped entirely for visitors who
 * prefer reduced motion, and self-limiting: it dismisses on `load`, or after
 * 2.2s regardless, so a slow asset can never trap anyone on a black screen.
 */
export function Preloader() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    if (reducedMotion) return;

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      /* private mode — treat as unseen, the timeout still bounds it */
    }
    if (seen) return;

    setVisible(true);
    document.body.style.overflow = 'hidden';

    const finish = () => {
      setVisible(false);
      document.body.style.overflow = '';
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* nothing to do */
      }
    };

    const minimum = window.setTimeout(finish, 2200);
    const onLoad = () => window.setTimeout(finish, 900);

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => {
      window.clearTimeout(minimum);
      window.removeEventListener('load', onLoad);
      document.body.style.overflow = '';
    };
  }, [reducedMotion]);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-space-900"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            // A quick cinematic push through the mark rather than a plain fade.
            scale: 1.06,
            filter: 'blur(6px)',
          }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          aria-hidden="true"
        >
          {/* Deep-space wash */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(38rem 30rem at 50% 42%, rgba(22,73,110,0.32), transparent 68%)',
            }}
          />

          <div className="relative flex flex-col items-center">
            {/* The star ignites first, then the mark resolves beneath it */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="absolute -inset-8 rounded-full bg-gold/25 blur-2xl"
                animate={{ opacity: [0.25, 0.75, 0.35], scale: [0.9, 1.15, 1] }}
                transition={{ duration: 2.1, ease: 'easeInOut' }}
              />
              <StarGlyph size={38} className="relative text-gold" />
            </motion.div>

            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <LumaMark variant="light" size={46} priority />
            </motion.div>

            <motion.p
              className="mt-9 text-[0.68rem] font-bold uppercase tracking-[0.42em] text-steel-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.7 }}
            >
              {t('preloader.preparing')}
            </motion.p>

            {/* Ignition bar */}
            <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-gold to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

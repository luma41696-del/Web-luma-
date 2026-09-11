'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { usePrefersReducedMotion } from '@/lib/hooks';

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up to `value` once the element scrolls into view.
 *
 * Numerals are formatted for the active locale, so Arabic renders Eastern
 * Arabic digits. Under `prefers-reduced-motion` the final figure is printed
 * immediately — the information matters, the animation does not.
 */
export function Counter({
  value,
  suffix = '',
  duration = 1900,
  className = '',
}: CounterProps) {
  const { formatNumber } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [current, setCurrent] = useState(reducedMotion ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setCurrent(value);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Owned by the effect, not by a ref: everything it starts is torn down in
    // its own cleanup. An earlier version guarded with a `hasRun` ref and
    // returned the cancel function from inside the observer callback — but a
    // callback's return value is discarded, so the frame loop outlived the
    // component, and the ref meant a re-run could leave the figure frozen
    // part-way instead of ever reaching `value`.
    let frame = 0;
    let cancelled = false;

    const countUp = () => {
      const start = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;
        const progress = Math.min((now - start) / duration, 1);
        // Ease-out cubic: fast at first, settling gently on the final figure.
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(eased * value));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        countUp();
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [value, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {/* The live figure is announced only once it settles. */}
      <span aria-hidden="true">{formatNumber(current)}</span>
      <span className="sr-only">{formatNumber(value)}</span>
      {suffix && <span className="text-gold">{suffix}</span>}
    </span>
  );
}

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useMounted, useScrollLock } from '@/lib/hooks';

export interface LightboxItem {
  id: string;
  src: string;
  avifSrc?: string;
  alt: string;
  title: string;
  caption?: string;
  meta?: string;
  width: number;
  height: number;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-size viewer for the award plaques.
 *
 * The plaques carry the awarding company's logo and a full Arabic citation,
 * so the priority here is legibility: the image is shown whole, uncropped, at
 * up to 88vh, with the caption sitting outside the artwork rather than over
 * it. Keyboard, swipe and click-outside all close it; focus is trapped while
 * open and returned to the trigger on exit.
 */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const { t, isRTL } = useLanguage();
  const mounted = useMounted();
  const isOpen = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const touchStart = useRef<number | null>(null);

  useScrollLock(isOpen);

  const item = index !== null ? items[index] : null;

  const goPrevious = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  // Remember what opened the dialog so focus can be restored on close.
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      // Wait for the panel to mount before moving focus into it.
      const id = window.setTimeout(() => closeRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }

    if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
        // In RTL the arrows follow reading order, not screen order.
        case 'ArrowRight':
          event.preventDefault();
          if (isRTL) goPrevious();
          else goNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          if (isRTL) goNext();
          else goPrevious();
          break;
        case 'Tab': {
          // Focus trap.
          const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], [tabindex]:not([tabindex="-1"])',
          );
          if (!focusables || focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, goNext, goPrevious, isRTL]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          ref={dialogRef}
        >
          {/* Scrim */}
          <div
            className="absolute inset-0 bg-space-900/94 backdrop-blur-xl"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Close */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="glass absolute end-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-starlight transition-colors hover:border-gold/50 hover:text-gold sm:end-8 sm:top-8"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {items.length > 1 && (
            <>
              <NavButton
                side="start"
                label={t('recognition.previous')}
                onClick={goPrevious}
              />
              <NavButton
                side="end"
                label={t('recognition.next')}
                onClick={goNext}
              />
            </>
          )}

          <motion.figure
            key={item.id}
            className="relative z-[1] flex max-h-full w-full max-w-4xl flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.965, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onTouchStart={(event) => {
              touchStart.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchStart.current === null) return;
              const delta = event.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(delta) > 55) {
                const forward = isRTL ? delta > 0 : delta < 0;
                if (forward) goNext();
                else goPrevious();
              }
              touchStart.current = null;
            }}
          >
            {/* The plaque itself: whole, uncropped, on a light stage so the
                engraved text keeps the contrast it was designed for. */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-starlight/[0.97] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ring-1 ring-gold/25">
              <picture>
                {item.avifSrc && <source srcSet={item.avifSrc} type="image/avif" />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="mx-auto block h-auto max-h-[68vh] w-auto max-w-full object-contain"
                />
              </picture>
            </div>

            <figcaption className="flex w-full flex-col items-center gap-1.5 text-center">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-gold">
                {item.meta}
              </p>
              <h3 className="text-lg font-bold text-starlight sm:text-xl">
                {item.title}
              </h3>
              {item.caption && (
                <p className="text-sm font-light text-steel-300">{item.caption}</p>
              )}
              {items.length > 1 && (
                <p className="mt-1 text-xs tabular-nums text-steel-500">
                  {t('recognition.counter', {
                    current: (index ?? 0) + 1,
                    total: items.length,
                  })}
                </p>
              )}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function NavButton({
  side,
  label,
  onClick,
}: {
  side: 'start' | 'end';
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`glass absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-starlight transition-colors hover:border-gold/50 hover:text-gold sm:flex ${
        side === 'start' ? 'start-4 sm:start-8' : 'end-4 sm:end-8'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={side === 'start' ? 'rtl:-scale-x-100' : 'rtl:-scale-x-100'}
      >
        {side === 'start' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );
}

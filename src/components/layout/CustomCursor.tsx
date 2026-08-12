'use client';

import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, usePrefersReducedMotion } from '@/lib/hooks';

/**
 * A light touch on the pointer: a small warm dot that trails the cursor and
 * swells over interactive elements.
 *
 * The native cursor is deliberately left visible — hiding it is a common
 * accessibility failure, and the brief calls for the effect to be subtle.
 * Fine pointers only, and never under `prefers-reduced-motion`.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const finePointer = useMediaQuery('(pointer: fine)');
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    const ring = ringRef.current;
    if (!ring) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;
    let visible = false;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!visible) {
        visible = true;
        ring.style.opacity = '1';
      }

      // Grow over anything the visitor can act on.
      const element = event.target as HTMLElement | null;
      setActive(
        Boolean(
          element?.closest(
            'a, button, [role="button"], input, textarea, select, [data-cursor="grow"]',
          ),
        ),
      );
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = '0';
    };

    const loop = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[150] opacity-0 transition-opacity duration-300 mix-blend-screen"
    >
      <div
        className={`rounded-full transition-all duration-300 ease-cosmic ${
          active
            ? 'h-11 w-11 border border-gold/60 bg-gold/[0.09]'
            : 'h-2 w-2 border border-gold/0 bg-gold/70'
        }`}
      />
    </div>
  );
}

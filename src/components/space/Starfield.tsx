'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

interface Star {
  x: number;
  y: number;
  radius: number;
  /** 0 = far, 1 = near. Drives size, brightness and parallax response. */
  depth: number;
  twinklePhase: number;
  twinkleSpeed: number;
  warm: boolean;
}

interface StarfieldProps {
  /** Stars per million device-independent pixels. */
  density?: number;
  /** How far the field slides against the pointer, in px at depth 1. */
  parallax?: number;
  className?: string;
}

/**
 * Canvas starfield.
 *
 * Chosen over a background video (which the brief rules out) and over
 * thousands of DOM nodes. Costs one canvas, one rAF loop, and roughly
 * 200–450 stars depending on viewport size.
 *
 * Three depth layers give the sky real parallax: distant stars barely move,
 * near ones track the pointer and the scroll. A small proportion are warm
 * gold rather than white, echoing the star in the LUMA mark.
 *
 * The loop pauses when the tab is hidden and when the section scrolls out of
 * view, and never starts at all under `prefers-reduced-motion` — in that case
 * the field is painted exactly once, so the sky is still there, just still.
 */
export function Starfield({
  density = 26,
  parallax = 22,
  className = '',
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = true;
    let visible = true;

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollOffset = 0;

    function build() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      // Cap DPR at 2: beyond that the extra pixels cost far more than they show.
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(((width * height) / 1_000_000) * density * 40);

      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          // Near stars are larger; the exponent keeps most of them small.
          radius: 0.35 + Math.pow(depth, 2.2) * 1.5,
          depth,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.4 + Math.random() * 1.1,
          // ~14% warm gold, the rest starlight white.
          warm: Math.random() < 0.14,
        };
      });
    }

    function paint(time: number) {
      context!.clearRect(0, 0, width, height);

      // Ease the pointer toward its target so motion feels weighted.
      pointer.x += (pointer.targetX - pointer.x) * 0.045;
      pointer.y += (pointer.targetY - pointer.y) * 0.045;

      for (const star of stars) {
        const shift = star.depth * parallax;
        const x = star.x + pointer.x * shift;
        const y = star.y + pointer.y * shift + scrollOffset * star.depth * 0.12;

        // Wrap vertically so scrolling never empties the field.
        const wrappedY = ((y % height) + height) % height;

        const twinkle = reducedMotion
          ? 0.75
          : 0.55 +
            0.45 *
              Math.sin(time * 0.001 * star.twinkleSpeed + star.twinklePhase);

        const alpha = (0.18 + star.depth * 0.62) * twinkle;

        context!.beginPath();
        context!.arc(x, wrappedY, star.radius, 0, Math.PI * 2);
        context!.fillStyle = star.warm
          ? `rgba(232, 185, 92, ${alpha})`
          : `rgba(232, 240, 250, ${alpha})`;
        context!.fill();

        // The nearest, brightest stars get a soft halo.
        if (star.depth > 0.82) {
          const halo = context!.createRadialGradient(
            x,
            wrappedY,
            0,
            x,
            wrappedY,
            star.radius * 7,
          );
          const haloAlpha = alpha * 0.22;
          halo.addColorStop(
            0,
            star.warm
              ? `rgba(242, 206, 132, ${haloAlpha})`
              : `rgba(200, 224, 250, ${haloAlpha})`,
          );
          halo.addColorStop(1, 'rgba(0,0,0,0)');
          context!.fillStyle = halo;
          context!.beginPath();
          context!.arc(x, wrappedY, star.radius * 7, 0, Math.PI * 2);
          context!.fill();
        }
      }
    }

    function loop(time: number) {
      if (!running) return;
      if (visible) paint(time);
      frame = requestAnimationFrame(loop);
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.targetY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      scrollOffset = window.scrollY;
    };

    const onResize = () => {
      build();
      if (reducedMotion) paint(0);
    };

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
    };

    build();

    if (reducedMotion) {
      // One static frame — the sky exists, it just does not move.
      paint(0);
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      frame = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', onResize);

    // Stop painting entirely once the field scrolls off screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && document.visibilityState === 'visible';
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density, parallax, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

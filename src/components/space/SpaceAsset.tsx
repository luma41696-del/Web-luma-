'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

type Status = 'probing' | 'ready' | 'missing';

interface SpaceAssetProps {
  /** Path under /public, e.g. "/images/space/spaceship.png". */
  src: string;
  alt: string;
  /** Rendered when `src` is absent, so the section is never left empty. */
  fallback: ReactNode;
  /** Parallax travel in px across the full scroll range of the element. */
  drift?: number;
  /** How far the asset leans toward the pointer, in px. */
  tilt?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

/**
 * Renders an optional decorative space asset with a designed fallback.
 *
 * The brand's spaceship and astronaut renders are supplied as loose PNGs and
 * are not part of the repository. Rather than ship a broken image or block
 * the section on a missing file, this component probes for the asset and
 * quietly renders `fallback` when it is not there. Drop the PNG into
 * /public/images/space/ (see the README in that folder) and it takes over on
 * the next load with no code change.
 *
 * Motion: a scroll-linked vertical drift plus a small pointer lean, both
 * driven from a single rAF loop writing to a CSS custom property. Under
 * `prefers-reduced-motion` the asset is placed statically.
 */
export function SpaceAsset({
  src,
  alt,
  fallback,
  drift = 60,
  tilt = 14,
  className = '',
  imageClassName = '',
  priority = false,
}: SpaceAssetProps) {
  const [status, setStatus] = useState<Status>('probing');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Probe the asset without rendering a broken <img> first.
  useEffect(() => {
    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => !cancelled && setStatus('ready');
    probe.onerror = () => !cancelled && setStatus('missing');
    probe.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || reducedMotion) return;

    let frame = 0;
    let active = false;
    const pointer = { x: 0, y: 0, currentX: 0, currentY: 0 };
    let progress = 0.5;
    let currentProgress = 0.5;

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const measure = () => {
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when the element's centre is at the bottom of the screen, 1 at the top.
      progress = 1 - (rect.top + rect.height / 2) / (viewport + rect.height);
    };

    const loop = () => {
      if (!active) return;
      currentProgress += (progress - currentProgress) * 0.06;
      pointer.currentX += (pointer.x - pointer.currentX) * 0.05;
      pointer.currentY += (pointer.y - pointer.currentY) * 0.05;

      const y = (currentProgress - 0.5) * drift * -2;
      const x = pointer.currentX * tilt;
      const rotate = pointer.currentX * 1.6;

      element.style.setProperty('--asset-x', `${x.toFixed(2)}px`);
      element.style.setProperty('--asset-y', `${y.toFixed(2)}px`);
      element.style.setProperty('--asset-rotate', `${rotate.toFixed(2)}deg`);

      frame = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true;
          frame = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && active) {
          active = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );

    observer.observe(element);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    measure();

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [drift, tilt, reducedMotion]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        transform:
          'translate3d(var(--asset-x, 0px), var(--asset-y, 0px), 0) rotate(var(--asset-rotate, 0deg))',
        willChange: 'transform',
      }}
    >
      {status === 'ready' ? (
        // Deliberately a plain <img>: the file is user-supplied at an unknown
        // size, and next/image would need static dimensions we cannot know.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={imageClassName}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
        />
      ) : status === 'missing' ? (
        fallback
      ) : null}
    </div>
  );
}

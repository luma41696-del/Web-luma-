'use client';

import { useRef, type ReactNode } from 'react';
import { useMediaQuery, usePrefersReducedMotion } from '@/lib/hooks';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  intensity?: number;
  /** Adds a light sheen that tracks the cursor across the surface. */
  sheen?: boolean;
}

/**
 * Restrained 3D tilt for cards and award capsules.
 *
 * Rotation is capped at a few degrees — enough to feel like a physical object
 * catching the light, not enough to distort the type inside. Disabled on
 * coarse pointers and under `prefers-reduced-motion`, where it renders as a
 * plain container with no listeners attached.
 */
export function TiltCard({
  children,
  className = '',
  intensity = 7,
  sheen = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useMediaQuery('(pointer: fine)');
  const enabled = !reducedMotion && finePointer;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element || !enabled) return;

    const rect = element.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    element.style.setProperty('--tilt-x', `${(0.5 - py) * intensity * 2}deg`);
    element.style.setProperty('--tilt-y', `${(px - 0.5) * intensity * 2}deg`);
    element.style.setProperty('--sheen-x', `${px * 100}%`);
    element.style.setProperty('--sheen-y', `${py * 100}%`);
    element.style.setProperty('--sheen-o', '1');
  };

  const handleLeave = () => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty('--tilt-x', '0deg');
    element.style.setProperty('--tilt-y', '0deg');
    element.style.setProperty('--sheen-o', '0');
  };

  return (
    <div
      ref={ref}
      onMouseMove={enabled ? handleMove : undefined}
      onMouseLeave={enabled ? handleLeave : undefined}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform:
          'perspective(1100px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
        transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {children}

      {sheen && enabled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--sheen-o,0)] transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(28rem 28rem at var(--sheen-x,50%) var(--sheen-y,50%), rgba(232,185,92,0.13), transparent 60%)',
          }}
        />
      )}
    </div>
  );
}

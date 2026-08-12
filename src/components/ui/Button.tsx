'use client';

import Link from 'next/link';
import {
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from 'react';
import { usePrefersReducedMotion, useMediaQuery } from '@/lib/hooks';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-bold ' +
  'transition-[color,background-color,border-color,box-shadow] duration-300 ease-cosmic ' +
  'disabled:cursor-not-allowed disabled:opacity-55 select-none';

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-[0.82rem] tracking-[0.1em]',
  lg: 'px-8 py-4 text-[0.88rem] tracking-[0.12em]',
};

const variants: Record<Variant, string> = {
  // Warm gold fill — the single loudest element on any given screen.
  primary:
    'bg-gold text-space-900 hover:bg-gold-400 hover:shadow-[0_0_34px_-6px_rgba(232,185,92,0.7)] ' +
    'active:bg-gold-600',
  // Glass outline, gains a gold rim on hover.
  secondary:
    'glass text-starlight hover:border-gold/45 hover:text-gold-400 ' +
    'hover:shadow-[0_0_30px_-10px_rgba(232,185,92,0.5)]',
  ghost:
    'text-steel-300 hover:text-gold-400 px-2 py-1 tracking-[0.1em]',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Disable the magnetic pull (e.g. inside a dense grid). */
  magnetic?: boolean;
}

/**
 * Attaches a subtle magnetic pull: the button leans toward the cursor within
 * its own bounds, then springs back. Pointer-fine devices only, and never
 * under `prefers-reduced-motion` — on touch it is an ordinary button.
 */
function useMagnetic(enabled: boolean) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useMediaQuery('(pointer: fine)');
  const active = enabled && !reducedMotion && finePointer;

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate3d(${x * 0.22}px, ${y * 0.3}px, 0)`;
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate3d(0,0,0)';
  };

  return {
    ref,
    onMouseMove,
    onMouseLeave,
    style: active ? { transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)' } : undefined,
  };
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  magnetic = true,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const magnet = useMagnetic(magnetic);

  return (
    <button
      ref={magnet.ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={magnet.onMouseMove}
      onMouseLeave={magnet.onMouseLeave}
      style={magnet.style}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps extends CommonProps {
  href: string;
  /** Set for outbound links; adds target and rel automatically. */
  external?: boolean;
  'aria-label'?: string;
}

export function LinkButton({
  href,
  external = false,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  magnetic = true,
  ...rest
}: LinkButtonProps) {
  const magnet = useMagnetic(magnetic);
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        ref={magnet.ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={magnet.onMouseMove}
        onMouseLeave={magnet.onMouseLeave}
        style={magnet.style}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={magnet.ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      onMouseMove={magnet.onMouseMove}
      onMouseLeave={magnet.onMouseLeave}
      style={magnet.style}
      className={classes}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Directional chevron that flips with the writing direction. */
export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
      className={`transition-transform duration-300 ease-cosmic group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

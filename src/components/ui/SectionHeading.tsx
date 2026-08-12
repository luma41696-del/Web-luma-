'use client';

import type { ReactNode } from 'react';
import { MaskReveal, Reveal } from './Reveal';
import { StarGlyph } from './Logo';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'start' | 'center';
  className?: string;
  /** Renders the title in the gold gradient rather than flat starlight. */
  gradient?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  gradient = false,
}: SectionHeadingProps) {
  const alignment =
    align === 'center'
      ? 'items-center text-center mx-auto'
      : 'items-start text-start';

  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <StarGlyph size={11} className="text-gold" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <h2
        className={`mt-5 text-[clamp(1.85rem,4.6vw,3.15rem)] font-bold leading-[1.12] ${
          gradient ? 'text-gradient-star' : 'text-starlight'
        }`}
      >
        <MaskReveal>{title}</MaskReveal>
      </h2>

      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-[0.98rem] font-light leading-relaxed text-steel-300 sm:text-[1.05rem]">
            {subtitle}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.2} className={align === 'center' ? 'mx-auto' : ''}>
        <span
          aria-hidden="true"
          className="mt-7 block h-px w-20 bg-gradient-to-r from-gold/70 to-transparent rtl:bg-gradient-to-l"
        />
      </Reveal>
    </div>
  );
}

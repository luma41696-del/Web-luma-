'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { fadeUp, safeVariants, stagger, viewport } from '@/lib/motion';

/**
 * Only these element types are needed as reveal wrappers. Resolving them from
 * a fixed map — rather than calling `motion(tag)` during render — keeps the
 * component identity stable across renders, which matters: a new identity on
 * every render would remount the subtree and restart the animation.
 */
const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  figure: motion.figure,
  ol: motion.ol,
} as const;

type MotionTag = keyof typeof MOTION_TAGS;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: MotionTag;
  id?: string;
}

/**
 * Scroll-triggered entrance. Fires once, and collapses to a plain render
 * when the visitor prefers reduced motion — content is never left hidden.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = 'div',
  id,
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = MOTION_TAGS[as];

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
      variants={safeVariants(variants, reducedMotion)}
    >
      {children}
    </Component>
  );
}

/** Parent wrapper that walks its <Reveal> children in sequence. */
export function RevealGroup({
  children,
  className,
  delay = 0,
  step = 0.08,
  as = 'div',
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  as?: MotionTag;
  id?: string;
}) {
  const Component = MOTION_TAGS[as];

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger(delay, step)}
    >
      {children}
    </Component>
  );
}

/**
 * A line of type that slides up from behind its own edge.
 * Each child should be a separate line for the effect to read correctly.
 */
export function MaskReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <span className={className}>{children}</span>;
  }

  // The observer is attached to the *clipping wrapper*, never to the sliding
  // child. The child starts translated fully outside the wrapper's
  // `overflow: hidden` box, which makes its visible rectangle empty — an
  // IntersectionObserver on the child would therefore never report it as
  // visible and the line would stay hidden forever.
  return (
    <motion.span
      className="block overflow-hidden pb-[0.12em]"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <motion.span
        className={`block ${className}`}
        variants={{
          hidden: { y: '110%' },
          show: {
            y: '0%',
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
          },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

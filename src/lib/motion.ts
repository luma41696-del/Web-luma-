import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion language.
 *
 * Everything eases on the same curve and lands within ~0.8s. Nothing
 * bounces, nothing overshoots — the brief asks for cinematic, not playful.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const transition = {
  base: { duration: 0.7, ease: EASE } satisfies Transition,
  quick: { duration: 0.35, ease: EASE } satisfies Transition,
  slow: { duration: 1.1, ease: EASE } satisfies Transition,
};

/** Fade up — the default entrance for headings, paragraphs and cards. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: transition.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transition.base },
};

/** Scales in from slightly back — used for the plaque capsules. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: transition.slow },
};

/** Parent that walks its children in one after another. */
export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

/**
 * Mask reveal — a line of type sliding up from behind its own edge.
 * Apply to a child of an `overflow-hidden` wrapper.
 */
export const maskReveal: Variants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Standard viewport trigger: fire once, a little before the element lands. */
export const viewport = { once: true, margin: '0px 0px -12% 0px' } as const;

/**
 * Returns variants that respect the visitor's motion preference: when motion
 * is reduced, elements simply appear rather than translating into place.
 */
export function safeVariants(variants: Variants, reduced: boolean): Variants {
  if (!reduced) return variants;
  return {
    hidden: { opacity: 1, y: 0, scale: 1 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
  };
}

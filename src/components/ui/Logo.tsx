import Image from 'next/image';
import Link from 'next/link';

/**
 * The LUMA lockup: the supplied mark artwork plus the wordmark set in
 * DIN Next Arabic with the brand's wide tracking.
 *
 * The mark PNGs are used exactly as delivered — never redrawn, recoloured or
 * re-proportioned. `luma-mark-light.png` is pure white and is therefore only
 * ever placed on the dark cosmos; `luma-mark-dark.png` exists for any light
 * surface (print exports, the OG image).
 */

interface MarkProps {
  variant?: 'light' | 'dark';
  className?: string;
  priority?: boolean;
  /** Rendered width in px; height follows the 216:604 artwork ratio. */
  size?: number;
}

const MARK_RATIO = 604 / 216;

export function LumaMark({
  variant = 'light',
  className = '',
  priority = false,
  size = 26,
}: MarkProps) {
  return (
    <Image
      src={`/logo/luma-mark-${variant}.png`}
      alt=""
      aria-hidden="true"
      width={216}
      height={604}
      priority={priority}
      className={className}
      style={{ width: size, height: size * MARK_RATIO }}
    />
  );
}

interface LogoProps {
  /** Accessible label — pass the localised "go to homepage" string. */
  label: string;
  className?: string;
  markSize?: number;
  /** Hide the wordmark and show the mark alone (used in tight spaces). */
  markOnly?: boolean;
  priority?: boolean;
}

export function Logo({
  label,
  className = '',
  markSize = 22,
  markOnly = false,
  priority = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={label}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="relative inline-flex items-center justify-center">
        {/* Warm halo that lifts on hover, echoing the star above the mark */}
        <span
          aria-hidden="true"
          className="absolute -inset-2 rounded-full bg-gold/0 blur-md transition-colors duration-500 group-hover:bg-gold/20"
        />
        <LumaMark variant="light" size={markSize} priority={priority} className="relative" />
      </span>

      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span
            className="text-[0.95rem] font-bold tracking-[0.34em] text-starlight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            LUMA
          </span>
          <span className="mt-1 text-[0.5rem] font-light tracking-[0.4em] text-steel-400">
            AGENCY
          </span>
        </span>
      )}
    </Link>
  );
}

/**
 * The four-point star from the top of the LUMA mark, isolated for use as a
 * recurring accent (section dividers, list bullets, the preloader).
 */
export function StarGlyph({
  className = '',
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 0c.5 6.2 5.3 11 11.5 11.5v1C17.3 13 12.5 17.8 12 24h-1C10.5 17.8 5.7 13 -.5 12.5v-1C5.7 11 10.5 6.2 11 0h1z" />
    </svg>
  );
}

import type { Service, Value } from '@/content/types';

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/**
 * Bespoke line icons — one per service, drawn on a common 32px grid with a
 * consistent 1.4 stroke so the set reads as a family rather than a mixed bag
 * of downloaded glyphs. Each one carries a small four-point star, tying it
 * back to the LUMA mark.
 */
export function ServiceIcon({
  name,
  className = '',
  size = 30,
}: {
  name: Service['icon'];
  className?: string;
  size?: number;
}) {
  const common = {
    viewBox: '0 0 32 32',
    width: size,
    height: size,
    className,
    'aria-hidden': true as const,
  };

  switch (name) {
    // Rising signal with an orbiting satellite — reach and amplification.
    case 'marketing':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <path d="M4 24l6-7 5 4 8-11" />
            <path d="M19 10h5v5" />
            <path d="M4 28h24" />
            <circle cx="10" cy="17" r="1.6" />
            <circle cx="15" cy="21" r="1.6" />
          </g>
          <path d="M26 3l.9 2.6L29.5 6.5l-2.6.9L26 10l-.9-2.6L22.5 6.5l2.6-.9z" fill="currentColor" opacity="0.85" />
        </svg>
      );

    // Interlocking paths converging on a shared node — partnership and growth.
    case 'business':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <circle cx="16" cy="16" r="4" />
            <path d="M16 4v8M16 20v8M4 16h8M20 16h8" />
            <circle cx="16" cy="4" r="2" />
            <circle cx="4" cy="16" r="2" />
            <circle cx="28" cy="16" r="2" />
            <path d="M16 28a12 12 0 0 0 12-12" opacity="0.45" />
          </g>
          <path d="M16 26.6l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" fill="currentColor" opacity="0.9" />
        </svg>
      );

    // Meshed gears with a pulse running through — automation and intelligence.
    case 'automation':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <circle cx="12" cy="12" r="5" />
            <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.7 6.7l1.4 1.4M15.9 15.9l1.4 1.4M17.3 6.7l-1.4 1.4M8.1 15.9l-1.4 1.4" />
            <circle cx="22" cy="22" r="4" />
            <path d="M22 16v1.6M22 26.4V28M16 22h1.6M26.4 22H28" />
          </g>
          <circle cx="12" cy="12" r="1.7" fill="currentColor" />
          <path d="M25.5 4l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" fill="currentColor" opacity="0.85" />
        </svg>
      );

    // Aperture blades — photography, video and design under one lens.
    case 'content':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <circle cx="16" cy="17" r="9.5" />
            <path d="M16 7.5l8.2 14.2M24.2 21.7L7.8 21.7M7.8 21.7L16 7.5" opacity="0.55" />
            <circle cx="16" cy="17" r="3.4" />
          </g>
          <path d="M27 3l.8 2.3 2.3.8-2.3.8L27 10l-.8-2.1-2.3-.8 2.3-.8z" fill="currentColor" opacity="0.85" />
        </svg>
      );

    // Code brackets around a stacked data core — software and systems.
    case 'development':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <path d="M10 10L4 16l6 6" />
            <path d="M22 10l6 6-6 6" />
            <ellipse cx="16" cy="12" rx="4.4" ry="1.9" />
            <path d="M11.6 12v5c0 1 2 1.9 4.4 1.9s4.4-.9 4.4-1.9v-5" />
          </g>
          <path d="M16 24.4l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" fill="currentColor" opacity="0.9" />
        </svg>
      );
  }
}

/** Icons for the five company values. */
export function ValueIcon({
  name,
  className = '',
  size = 24,
}: {
  name: Value['icon'];
  className?: string;
  size?: number;
}) {
  const common = {
    viewBox: '0 0 24 24',
    width: size,
    height: size,
    className,
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'collaboration':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <circle cx="8" cy="8.5" r="3" />
            <circle cx="16" cy="8.5" r="3" />
            <path d="M2.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
            <path d="M13.5 14.6c.8-.4 1.6-.6 2.5-.6 3 0 5.5 2 5.5 5" />
          </g>
        </svg>
      );
    case 'innovation':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3z" />
            <path d="M9.8 19h4.4M10.5 21.5h3" />
          </g>
        </svg>
      );
    case 'learning':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <path d="M3 6.5C5.5 5 8.5 5 12 6.5c3.5-1.5 6.5-1.5 9 0v12c-2.5-1.5-5.5-1.5-9 0-3.5-1.5-6.5-1.5-9 0z" />
            <path d="M12 6.5v12" />
          </g>
        </svg>
      );
    case 'creativity':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4.5 4.5 0 0 0 4.5-4.5C21.5 6.3 17.2 3 12 3z" />
            <circle cx="8" cy="10" r="1.1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
            <circle cx="16" cy="10" r="1.1" fill="currentColor" stroke="none" />
          </g>
        </svg>
      );
    case 'integrity':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <path d="M12 2.8l7.5 3v6c0 4.5-3.1 8.3-7.5 9.4-4.4-1.1-7.5-4.9-7.5-9.4v-6z" />
            <path d="M9 12.2l2.2 2.2 4-4.4" />
          </g>
        </svg>
      );
  }
}

/** Small utility icons used around the contact section and footer. */
export function UtilityIcon({
  name,
  className = '',
  size = 18,
}: {
  name:
    | 'phone'
    | 'mail'
    | 'whatsapp'
    | 'pin'
    | 'linkedin'
    | 'instagram'
    | 'chevron'
    | 'external';
  className?: string;
  size?: number;
}) {
  const common = {
    viewBox: '0 0 24 24',
    width: size,
    height: size,
    className,
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'phone':
      return (
        <svg {...common}>
          <path
            {...strokeProps}
            d="M6.3 3.5h3l1.5 3.8-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8A16.5 16.5 0 0 1 4.5 5.5a1.8 1.8 0 0 1 1.8-2z"
          />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
            <path d="M3.5 7l8.5 6 8.5-6" />
          </g>
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3.7 4c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.15-1.2-.05-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.15-.6.15l-.6.8c-.1.15-.3.2-.5.05-.3-.15-1.2-.45-2.3-1.4-.85-.75-1.4-1.7-1.6-2-.15-.3 0-.45.1-.6l.45-.5c.15-.2.2-.3.3-.5.1-.2 0-.4-.05-.55l-.8-1.9c-.2-.45-.4-.4-.55-.4z" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <path d="M12 21.5s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
            <circle cx="12" cy="10.2" r="2.6" />
          </g>
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common} fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9.2h4V21H3zM10 9.2h3.8v1.6h.06c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.5c0-1.31-.02-3-1.9-3-1.9 0-2.19 1.42-2.19 2.9V21h-4z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
          </g>
        </svg>
      );
    case 'chevron':
      return (
        <svg {...common}>
          <path {...strokeProps} d="M6 9l6 6 6-6" />
        </svg>
      );
    case 'external':
      return (
        <svg {...common}>
          <g {...strokeProps}>
            <path d="M14 4h6v6" />
            <path d="M20 4l-8 8" />
            <path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
          </g>
        </svg>
      );
  }
}

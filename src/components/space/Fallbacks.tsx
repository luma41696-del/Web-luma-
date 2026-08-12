/**
 * Designed stand-ins for the brand's photographic space renders.
 *
 * These are not placeholders in the "grey box" sense — they are finished
 * illustrations drawn in the LUMA palette, so the site reads as complete
 * whether or not the PNG renders are present. When the renders are dropped
 * into /public/images/space/ they replace these automatically.
 */

/** Sleek delta-wing craft, three-quarter view, engines lit warm gold. */
export function CraftFallback({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label="Illustration of the LUMA exploration craft"
      className={className}
    >
      <defs>
        <linearGradient id="craft-hull" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#2A76AE" />
          <stop offset="38%" stopColor="#16496E" />
          <stop offset="72%" stopColor="#0A2740" />
          <stop offset="100%" stopColor="#04121F" />
        </linearGradient>
        <linearGradient id="craft-wing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#123C5C" />
          <stop offset="100%" stopColor="#02080F" />
        </linearGradient>
        <linearGradient id="craft-spine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(245,247,250,0)" />
          <stop offset="45%" stopColor="rgba(245,247,250,0.55)" />
          <stop offset="100%" stopColor="rgba(245,247,250,0)" />
        </linearGradient>
        <radialGradient id="craft-thrust" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="28%" stopColor="#F2CE84" stopOpacity="0.85" />
          <stop offset="62%" stopColor="#E8B95C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E8B95C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="craft-aura" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#2A76AE" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2A76AE" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient bloom behind the craft */}
      <ellipse cx="330" cy="212" rx="285" ry="150" fill="url(#craft-aura)" />

      {/* Far wing */}
      <path
        d="M232 150 L96 96 L128 168 L242 186 Z"
        fill="url(#craft-wing)"
        opacity="0.85"
      />

      {/* Engine nacelles */}
      <g>
        <ellipse cx="150" cy="238" rx="46" ry="40" fill="#04121F" />
        <ellipse cx="150" cy="238" rx="32" ry="27" fill="url(#craft-thrust)" />
        <ellipse cx="150" cy="238" rx="46" ry="40" fill="none" stroke="#1D5C8B" strokeWidth="2.5" opacity="0.7" />
      </g>
      <g>
        <ellipse cx="236" cy="284" rx="58" ry="50" fill="#061B2D" />
        <ellipse cx="236" cy="284" rx="40" ry="34" fill="url(#craft-thrust)" />
        <ellipse cx="236" cy="284" rx="58" ry="50" fill="none" stroke="#2A76AE" strokeWidth="3" opacity="0.8" />
      </g>

      {/* Main hull */}
      <path
        d="M186 214
           C 214 150, 292 106, 400 96
           C 486 88, 566 108, 596 140
           C 612 158, 604 182, 574 196
           C 500 230, 386 258, 300 260
           C 236 262, 196 244, 186 214 Z"
        fill="url(#craft-hull)"
      />

      {/* Dorsal highlight */}
      <path
        d="M232 176 C 292 132, 392 112, 512 118"
        stroke="url(#craft-spine)"
        strokeWidth="3"
        fill="none"
      />

      {/* Panel seams */}
      <g stroke="#0A2740" strokeWidth="1.6" opacity="0.85" fill="none">
        <path d="M300 122 C 306 168, 306 214, 296 258" />
        <path d="M380 106 C 386 158, 384 212, 374 250" />
        <path d="M462 104 C 466 148, 464 194, 456 232" />
      </g>

      {/* Lit cabin windows */}
      <g fill="#F2CE84">
        <rect x="470" y="140" width="16" height="5" rx="2.5" opacity="0.9" />
        <rect x="496" y="136" width="16" height="5" rx="2.5" opacity="0.75" />
        <rect x="522" y="133" width="12" height="5" rx="2.5" opacity="0.6" />
      </g>
      <ellipse cx="352" cy="146" rx="30" ry="11" fill="#0A2740" />
      <ellipse cx="352" cy="145" rx="26" ry="8" fill="#2A76AE" opacity="0.5" />

      {/* Near wing */}
      <path
        d="M268 206 L188 316 L246 330 L318 250 Z"
        fill="url(#craft-wing)"
      />
      <path
        d="M456 232 L446 322 L500 300 L508 224 Z"
        fill="url(#craft-wing)"
        opacity="0.9"
      />

      {/* Nose light */}
      <circle cx="592" cy="140" r="4" fill="#E8B95C" opacity="0.95" />
    </svg>
  );
}

/**
 * Explorer visor — a helmet faceplate reflecting the cosmos, used as the
 * transitional figure between Services and Recognition.
 */
export function ExplorerFallback({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 520"
      role="img"
      aria-label="Illustration of an explorer's helmet reflecting the LUMA star"
      className={className}
    >
      <defs>
        <linearGradient id="suit-shell" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#E8EDF3" />
          <stop offset="42%" stopColor="#B8C6D6" />
          <stop offset="100%" stopColor="#5C748F" />
        </linearGradient>
        <linearGradient id="suit-shadow" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#42586F" />
          <stop offset="100%" stopColor="#0A2740" />
        </linearGradient>
        <radialGradient id="visor-glass" cx="0.38" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="#0E3352" />
          <stop offset="45%" stopColor="#061B2D" />
          <stop offset="100%" stopColor="#02080F" />
        </radialGradient>
        <linearGradient id="visor-sheen" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="rgba(245,247,250,0.4)" />
          <stop offset="38%" stopColor="rgba(245,247,250,0.06)" />
          <stop offset="100%" stopColor="rgba(245,247,250,0)" />
        </linearGradient>
        <radialGradient id="chest-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#E8B95C" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E8B95C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shoulders / torso */}
      <path
        d="M64 520 C 68 424, 108 372, 168 352 L 252 352 C 312 372, 352 424, 356 520 Z"
        fill="url(#suit-shell)"
      />
      <path
        d="M210 352 L252 352 C 312 372, 352 424, 356 520 L 210 520 Z"
        fill="url(#suit-shadow)"
        opacity="0.32"
      />

      {/* Shoulder pads */}
      <ellipse cx="104" cy="404" rx="44" ry="34" fill="#9FB3C8" />
      <ellipse cx="316" cy="404" rx="44" ry="34" fill="#7892AD" />

      {/* Chest panel carrying the LUMA star */}
      <ellipse cx="210" cy="452" rx="86" ry="66" fill="url(#chest-glow)" />
      <rect x="164" y="410" width="92" height="76" rx="12" fill="#02080F" />
      <rect
        x="164"
        y="410"
        width="92"
        height="76"
        rx="12"
        fill="none"
        stroke="#E8B95C"
        strokeWidth="1.5"
        opacity="0.55"
      />
      {/* Four-point star — the LUMA mark's signature */}
      <path
        d="M210 428 L216 444 L232 450 L216 456 L210 472 L204 456 L188 450 L204 444 Z"
        fill="#F2CE84"
      />
      <text
        x="210"
        y="482"
        textAnchor="middle"
        fill="#F5F7FA"
        fontSize="11"
        letterSpacing="3"
        fontFamily="var(--font-display)"
      >
        LUMA
      </text>

      {/* Neck ring */}
      <rect x="150" y="330" width="120" height="34" rx="17" fill="#9FB3C8" />
      <rect x="150" y="330" width="120" height="34" rx="17" fill="none" stroke="#5C748F" strokeWidth="2" />

      {/* Helmet shell */}
      <path
        d="M210 44
           C 300 44, 356 112, 356 194
           C 356 268, 300 340, 210 340
           C 120 340, 64 268, 64 194
           C 64 112, 120 44, 210 44 Z"
        fill="url(#suit-shell)"
      />

      {/* Visor */}
      <ellipse cx="210" cy="188" rx="116" ry="112" fill="#42586F" />
      <ellipse cx="210" cy="188" rx="108" ry="104" fill="url(#visor-glass)" />

      {/* Reflected constellation inside the visor */}
      <g fill="#F5F7FA">
        <circle cx="164" cy="150" r="2.2" opacity="0.9" />
        <circle cx="212" cy="126" r="1.6" opacity="0.7" />
        <circle cx="256" cy="164" r="2" opacity="0.8" />
        <circle cx="186" cy="212" r="1.4" opacity="0.6" />
        <circle cx="248" cy="228" r="1.8" opacity="0.75" />
        <circle cx="150" cy="240" r="1.3" opacity="0.5" />
      </g>
      <g stroke="rgba(232,185,92,0.32)" strokeWidth="1" fill="none">
        <path d="M164 150 L212 126 L256 164 L248 228 L186 212 Z" />
      </g>
      {/* The reflected LUMA star */}
      <path
        d="M212 108 L217 124 L233 129 L217 134 L212 150 L207 134 L191 129 L207 124 Z"
        fill="#F2CE84"
        opacity="0.95"
      />

      {/* Glass sheen */}
      <ellipse cx="210" cy="188" rx="108" ry="104" fill="url(#visor-sheen)" />
      <ellipse cx="210" cy="188" rx="108" ry="104" fill="none" stroke="rgba(245,247,250,0.28)" strokeWidth="2" />

      {/* Helmet hardware */}
      <rect x="186" y="46" width="48" height="14" rx="6" fill="#B8C6D6" />
      <circle cx="72" cy="188" r="14" fill="#7892AD" />
      <circle cx="348" cy="188" r="14" fill="#5C748F" />
    </svg>
  );
}

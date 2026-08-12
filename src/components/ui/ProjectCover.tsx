import { ServiceIcon } from './Icons';
import type { Service } from '@/content/types';

/**
 * Generated cover art for portfolio entries.
 *
 * The previous site's project photographs are no longer served (every
 * /projects/*.jpg URL 404s), and substituting stock imagery would
 * misrepresent work LUMA actually delivered. Instead each project gets a
 * deterministic constellation: the same slug always produces the same star
 * pattern, so covers are stable across builds and feel authored rather than
 * random, while never pretending to be a photograph.
 *
 * To switch a project to real photography, drop the file at
 * /public/images/projects/<slug>.jpg and render <img> in ProjectCard instead.
 */

const HUES: Record<string, { hue: number; icon: Service['icon'] }> = {
  'digital-marketing': { hue: 38, icon: 'marketing' },
  'business-development': { hue: 205, icon: 'business' },
  'content-production': { hue: 320, icon: 'content' },
  'it-software-development': { hue: 262, icon: 'development' },
};

/** Small deterministic hash → repeatable "randomness" per project. */
function seededPoints(seed: string, count: number) {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  const next = () => {
    hash ^= hash << 13;
    hash ^= hash >>> 17;
    hash ^= hash << 5;
    return ((hash >>> 0) % 10000) / 10000;
  };

  return Array.from({ length: count }, () => ({
    x: 12 + next() * 76,
    y: 14 + next() * 72,
    r: 0.7 + next() * 1.9,
  }));
}

export function ProjectCover({
  slug,
  categorySlug,
  className = '',
}: {
  slug: string;
  categorySlug: string;
  className?: string;
}) {
  const theme = HUES[categorySlug] ?? { hue: 205, icon: 'business' as const };
  const points = seededPoints(slug, 9);
  const gradientId = `cover-${slug}`;

  // Chain the points into a constellation path.
  const path = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`)
    .join(' ');

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(120% 90% at 78% 12%, hsl(${theme.hue} 62% 46% / 0.28), transparent 62%),
          radial-gradient(100% 80% at 12% 88%, hsl(${theme.hue + 20} 55% 32% / 0.30), transparent 60%),
          linear-gradient(155deg, #0A2740 0%, #061B2D 52%, #02080F 100%)
        `,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`hsl(${theme.hue} 78% 70%)`} stopOpacity="0.55" />
            <stop offset="100%" stopColor="#E8B95C" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        <path
          d={path}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="0.35"
          vectorEffect="non-scaling-stroke"
        />

        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={point.r * 0.42}
            fill={index % 4 === 0 ? '#E8B95C' : '#DCE7F2'}
            opacity={0.45 + (point.r / 2.6) * 0.5}
          />
        ))}
      </svg>

      {/* Category mark, sitting quietly in the corner */}
      <div className="absolute bottom-4 end-4 text-steel-400/45">
        <ServiceIcon name={theme.icon} size={40} />
      </div>

      {/* Horizon glow along the lower edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background: `linear-gradient(to top, hsl(${theme.hue} 60% 40% / 0.22), transparent)`,
        }}
      />
    </div>
  );
}

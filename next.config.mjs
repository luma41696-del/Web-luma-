/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Hides the floating Next.js dev-tools badge in the corner during `npm run
  // dev`. It never appears in a production build either way — this just keeps
  // the local preview clean while reviewing the design.
  devIndicators: false,

  images: {
    // Award/plaque art is served from /public as pre-optimised WebP
    // (see scripts/optimize-images.mjs), so remote loaders are not needed.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 200, 320, 420, 640],
  },

  async redirects() {
    // The previous Angular site addressed services by MongoDB ObjectId
    // (/services/69147e87a31c3aa4f67a4a14). Those URLs are kept alive and
    // forwarded to the new human-readable slugs so no SEO equity is lost.
    const legacyServiceIds = {
      '69147e87a31c3aa4f67a4a14': 'digital-marketing',
      '69147e9ba31c3aa4f67a4a15': 'business-development',
      '69147eb1a31c3aa4f67a4a16': 'content-production',
      '69147ec4a31c3aa4f67a4a17': 'it-software-development',
      '69147eeda31c3aa4f67a4a18': 'automation-ai',
    };

    return Object.entries(legacyServiceIds).map(([id, slug]) => ({
      source: `/services/${id}`,
      destination: `/services/${slug}`,
      permanent: true,
    }));
  },

  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Deliberately NOT `immutable`. These filenames are stable and not
        // content-hashed — `astronaut.webp` stays `astronaut.webp` when the
        // render behind it is replaced. Marking them immutable would pin a
        // year-old image in every returning visitor's cache with no way to
        // bust it. `stale-while-revalidate` keeps repeat views instant while
        // picking up replacements in the background.
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

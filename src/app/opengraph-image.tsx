import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { siteConfig } from '@/content/site.config';

/**
 * The social preview card.
 *
 * The site previously shared its 1024×1024 app icon, which every platform
 * crops to a letterbox — so the mark lost its top and bottom and the card
 * carried no words at all. This renders the real 1200×630 that Facebook,
 * LinkedIn, X and WhatsApp expect, in the site's own palette.
 *
 * Generated at build time, so it costs nothing at request time.
 */

export const alt = `${siteConfig.name.en} — ${siteConfig.tagline.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [mark, font] = await Promise.all([
    readFile(path.join(process.cwd(), 'public/logo/luma-mark-light.png')),
    readFile(path.join(process.cwd(), 'public/fonts/DINNextArabic-Bold.ttf')),
  ]);

  const markSrc = `data:image/png;base64,${mark.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          // Satori rejects a bare colour inside the `background` shorthand,
          // so the base colour and the gradients are set separately.
          backgroundColor: '#020E1A',
          backgroundImage:
            'radial-gradient(1100px 700px at 78% -10%, #0E3352 0%, rgba(2,14,26,0) 62%),' +
            'radial-gradient(900px 600px at 5% 110%, #123C5C 0%, rgba(2,14,26,0) 60%)',
          position: 'relative',
        }}
      >
        {/* The star's warm halo, top right */}
        <div
          style={{
            position: 'absolute',
            top: -150,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: 'rgba(232,185,92,0.13)',
            filter: 'blur(90px)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={54} height={151} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                letterSpacing: 16,
                color: '#F5F7FA',
                display: 'flex',
              }}
            >
              LUMA
            </div>
            <div
              style={{
                fontSize: 17,
                letterSpacing: 13,
                color: '#7892AD',
                marginTop: 6,
                display: 'flex',
              }}
            >
              AGENCY
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 66,
            fontWeight: 700,
            color: '#F5F7FA',
            lineHeight: 1.1,
            marginTop: 52,
            maxWidth: 900,
            display: 'flex',
          }}
        >
          {siteConfig.tagline.en}
        </div>

        <div
          style={{
            fontSize: 27,
            color: '#9FB3C8',
            marginTop: 26,
            display: 'flex',
          }}
        >
          Digital marketing · Technology · Production — Amman, Jordan
        </div>

        {/* Gold rule along the base */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 7,
            background: 'linear-gradient(90deg, #E8B95C, #16496E 70%, transparent)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'DIN Next Arabic', data: font, weight: 700, style: 'normal' }],
    },
  );
}

/**
 * Pre-generates responsive WebP + AVIF derivatives for the award plaques.
 *
 * The source PNGs are 1–4 MB each (24 MB in total). Serving them raw would
 * dominate page weight, so this script writes two sizes per plaque:
 *
 *   <name>-800.webp   card / carousel view
 *   <name>-1600.webp  lightbox view
 *   <name>-1600.avif  lightbox view, for browsers that prefer AVIF
 *
 * The originals are left untouched — nothing is cropped, recoloured or
 * retouched, so every logo and line of Arabic on the plaques stays exactly as
 * the awarding companies engraved it.
 *
 * Run with:  npm run optimize:images
 */

import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_ROOT = path.join(__dirname, '..', 'assets-src');
const OUT_ROOT = path.join(__dirname, '..', 'public', 'images');

/**
 * Masters live outside /public so they are never deployed — together they are
 * ~24 MB, against ~2.5 MB of derivatives that actually ship.
 *
 * `square: true` is used only for team portraits, which are cropped to a
 * consistent headshot. Award plaques are never cropped: each carries the
 * awarding company's logo and a full citation, and the site shows them whole.
 */
const GROUPS = [
  {
    label: 'award plaques',
    src: path.join(SRC_ROOT, 'awards'),
    out: path.join(OUT_ROOT, 'awards'),
    variants: [
      { width: 800, format: 'webp', quality: 82 },
      { width: 1600, format: 'webp', quality: 84 },
      { width: 1600, format: 'avif', quality: 62 },
    ],
  },
  {
    label: 'team portraits',
    src: path.join(SRC_ROOT, 'team'),
    out: path.join(OUT_ROOT, 'team'),
    square: true,
    variants: [
      { width: 320, format: 'webp', quality: 80 },
      { width: 640, format: 'webp', quality: 82 },
    ],
  },
];

const formatBytes = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function processGroup(group) {
  const outDir = group.out;
  await mkdir(outDir, { recursive: true });

  let entries;
  try {
    entries = await readdir(group.src);
  } catch {
    console.log(`\n${group.label}: no source folder at ${group.src}`);
    return { count: 0, source: 0, output: 0 };
  }

  const files = entries.filter((file) => /\.(png|jpe?g)$/i.test(file));

  if (files.length === 0) {
    console.log(`\n${group.label}: no source images in ${group.src}`);
    return { count: 0, source: 0, output: 0 };
  }

  console.log(`\n${group.label} (${files.length}):`);

  let source = 0;
  let output = 0;

  for (const file of files) {
    const sourcePath = path.join(group.src, file);
    const base = path.parse(file).name;
    source += (await stat(sourcePath)).size;

    for (const variant of group.variants) {
      const outName = `${base}-${variant.width}.${variant.format}`;
      const outPath = path.join(outDir, outName);

      const pipeline = sharp(sourcePath).resize(
        group.square
          ? {
              width: variant.width,
              height: variant.width,
              fit: 'cover',
              position: 'top',
            }
          : { width: variant.width, withoutEnlargement: true },
      );

      if (variant.format === 'webp') {
        pipeline.webp({ quality: variant.quality, effort: 5 });
      } else {
        pipeline.avif({ quality: variant.quality, effort: 4 });
      }

      const info = await pipeline.toFile(outPath);
      output += info.size;
      console.log(`  ${outName.padEnd(42)} ${formatBytes(info.size)}`);
    }
  }

  return { count: files.length, source, output };
}

async function main() {
  let source = 0;
  let output = 0;

  for (const group of GROUPS) {
    const result = await processGroup(group);
    source += result.source;
    output += result.output;
  }

  console.log(
    `\nDone.  Source: ${formatBytes(source)}  →  Output: ${formatBytes(output)}`,
  );
}

main().catch((error) => {
  console.error('Image optimisation failed:', error);
  process.exit(1);
});

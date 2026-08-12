/**
 * Converts the supplied DIN Next Arabic TTFs to WOFF2.
 *
 * The family ships with full Latin, Arabic and numeral coverage, so a single
 * typeface serves both site languages — no Google Fonts request, no second
 * family to keep in sync, and no flash of fallback text between scripts.
 *
 * Only the four weights the design actually uses are converted:
 *   Light 300 · Regular 400 · Bold 700 · Heavy 800
 *
 * Run with:  npm run build:fonts
 * The .ttf originals stay in /public/fonts as the archival source.
 */

import { readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compress } from 'wawoff2';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONT_DIR = path.join(__dirname, '..', 'public', 'fonts');

const WEIGHTS = ['Light', 'Regular', 'Bold', 'Heavy'];

const formatBytes = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function main() {
  let source = 0;
  let output = 0;

  for (const weight of WEIGHTS) {
    const inPath = path.join(FONT_DIR, `DINNextArabic-${weight}.ttf`);
    const outPath = path.join(FONT_DIR, `DINNextArabic-${weight}.woff2`);

    const ttf = await readFile(inPath);
    source += (await stat(inPath)).size;

    const woff2 = await compress(ttf);
    await writeFile(outPath, woff2);
    output += woff2.length;

    console.log(
      `  DINNextArabic-${weight}`.padEnd(30) +
        `${formatBytes(ttf.length)} → ${formatBytes(woff2.length)}`,
    );
  }

  console.log(
    `\nDone. ${WEIGHTS.length} weights.  ` +
      `${formatBytes(source)} → ${formatBytes(output)}`,
  );
}

main().catch((error) => {
  console.error('Font conversion failed:', error);
  process.exit(1);
});

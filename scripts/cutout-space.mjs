/**
 * Cuts the LUMA space renders out of their white studio background.
 *
 * The renders are delivered on a flat white sweep. Dropped straight onto the
 * night sky they would read as white rectangles, so the background has to go —
 * but a naive luminance key would also punch holes through the astronaut,
 * whose suit is nearly the same value as the backdrop.
 *
 * So instead of keying on brightness alone, this walks the background as a
 * *connected region*: a flood fill seeded from the image border that only
 * crosses pixels close in colour to the border itself. Bright highlights in
 * the middle of the subject are never reached, because the fill cannot get to
 * them without first crossing a darker edge.
 *
 * The alpha edge is then feathered by a sub-pixel blur so the cut-out does not
 * look laser-trimmed against the dark sky.
 *
 * Run with:  npm run cutout:space
 */

import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Source renders live outside /public: they are 2048² masters totalling ~16 MB
// and must never be deployed. Only the cut-out WebP results are published.
const SRC_DIR = path.join(__dirname, '..', 'assets-src', 'space');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'space');

/**
 * Per-file tuning. `tolerance` is the maximum per-channel colour distance from
 * the sampled border colour that still counts as background.
 *   – the ship is dark metal on white, so it takes a generous tolerance
 *   – the astronaut is a white suit on white, so it needs a tight one
 */
const JOBS = [
  {
    src: 'ship-side.png',
    out: 'spaceship',
    // Dark metal on white: the subject boundary is a huge contrast step,
    // so the fill can afford a loose local delta and a high brightness floor.
    localDelta: 10,
    minLuminance: 208,
    feather: 1.1,
    maxWidth: 1800,
  },
  {
    // Already delivered with a clean alpha channel, so there is nothing to
    // key — it is only resized and re-encoded. `passthrough` skips the fill.
    src: 'astronaut-floating.png',
    // Named for the pose, not just "astronaut". Earlier builds shipped a
    // different render at /images/space/astronaut.webp under a one-year
    // `immutable` cache header, so that URL is poisoned in any browser that
    // loaded it — a new filename is the only reliable way past it.
    out: 'astronaut-floating',
    passthrough: true,
    maxWidth: 1400,
  },
  {
    // Kept as an alternative pose. This one arrives on a white studio sweep:
    // a white suit against white, where every edge is a small step, so the
    // fill has to creep. The floor sits low enough to walk through the soft
    // shadow the backpack casts on the sweep — otherwise the fill is locked
    // out of the pockets behind the arms — while the tight delta stops it
    // climbing the suit's own shading.
    src: 'astronaut-back.png',
    out: 'astronaut-standing',
    localDelta: 7,
    minLuminance: 198,
    feather: 1.0,
    maxWidth: 1200,
  },
];

const luminance = (data, pixel) => {
  const offset = pixel * 4;
  return (
    0.2126 * data[offset] + 0.7152 * data[offset + 1] + 0.0722 * data[offset + 2]
  );
};

/**
 * Grows the background region inward from the border.
 *
 * Rather than comparing every pixel to one seed colour — which breaks as soon
 * as the studio sweep has a vignette or a soft shadow — each step compares a
 * candidate to the pixel it is being reached *from*. The region therefore
 * follows a gradient smoothly but still stops dead at the subject's edge,
 * where the value drops faster than `localDelta` in a single pixel.
 *
 * `minLuminance` is a hard floor that keeps the fill from ever creeping into
 * the subject through a chain of small steps.
 */
function buildAlphaMask(data, width, height, { localDelta, minLuminance }) {
  const count = width * height;
  const alpha = new Uint8Array(count).fill(255);
  const visited = new Uint8Array(count);
  const queue = new Int32Array(count);

  let head = 0;
  let tail = 0;

  const seed = (pixel) => {
    if (visited[pixel] || luminance(data, pixel) < minLuminance) return;
    visited[pixel] = 1;
    alpha[pixel] = 0;
    queue[tail++] = pixel;
  };

  const grow = (from, to) => {
    if (visited[to]) return;
    const value = luminance(data, to);
    if (value < minLuminance) return;
    if (Math.abs(value - luminance(data, from)) > localDelta) return;
    visited[to] = 1;
    alpha[to] = 0;
    queue[tail++] = to;
  };

  for (let x = 0; x < width; x += 1) {
    seed(x);
    seed((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    seed(y * width);
    seed(y * width + width - 1);
  }

  const drain = () => {
    while (head < tail) {
      const pixel = queue[head++];
      const x = pixel % width;
      const y = (pixel / width) | 0;

      if (x > 0) grow(pixel, pixel - 1);
      if (x < width - 1) grow(pixel, pixel + 1);
      if (y > 0) grow(pixel, pixel - width);
      if (y < height - 1) grow(pixel, pixel + width);
    }
  };

  drain();

  // ── Enclosed pockets ──────────────────────────────────────────────────────
  // Gaps fully surrounded by the subject — between the legs, under an arm,
  // inside the wing — are backdrop too, but the border fill can never reach
  // them. Find those islands and seed the fill inside them as well.
  //
  // A pocket only qualifies if it is large, as bright as the sweep, and flat:
  // the studio backdrop has almost no variation, whereas a white suit panel
  // carries shading, panel lines and rivets and so has a much higher spread.
  const backdrop = luminance(data, 0);
  const labelled = new Uint8Array(count);
  const island = [];

  for (let start = 0; start < count; start += 1) {
    if (labelled[start] || visited[start]) continue;
    if (luminance(data, start) < minLuminance - 8) continue;

    island.length = 0;
    labelled[start] = 1;
    island.push(start);

    let sum = 0;
    let sumSquares = 0;

    for (let index = 0; index < island.length; index += 1) {
      const pixel = island[index];
      const value = luminance(data, pixel);
      sum += value;
      sumSquares += value * value;

      const x = pixel % width;
      const y = (pixel / width) | 0;
      const neighbours = [
        x > 0 ? pixel - 1 : -1,
        x < width - 1 ? pixel + 1 : -1,
        y > 0 ? pixel - width : -1,
        y < height - 1 ? pixel + width : -1,
      ];

      for (const neighbour of neighbours) {
        if (neighbour < 0 || labelled[neighbour] || visited[neighbour]) continue;
        if (luminance(data, neighbour) < minLuminance - 8) continue;
        labelled[neighbour] = 1;
        island.push(neighbour);
      }
    }

    const size = island.length;
    if (size < 2000) continue;

    const mean = sum / size;
    const spread = Math.sqrt(Math.max(0, sumSquares / size - mean * mean));

    if (mean < backdrop - 26 || spread > 9) continue;

    for (const pixel of island) {
      visited[pixel] = 1;
      alpha[pixel] = 0;
      queue[tail++] = pixel;
    }
  }

  drain();

  // ── Halo cleanup ──────────────────────────────────────────────────────────
  // Where the subject is nearly the same value as the sweep — a white suit on
  // white — the fill stops a pixel or two early and leaves a bright rim that
  // reads as a glowing outline against the night sky.
  //
  // This erodes that rim: any pixel still opaque, effectively backdrop-white,
  // and touching transparency is itself backdrop. Interior highlights are
  // untouched because they are never adjacent to a cut-away pixel.
  const haloCeiling = backdrop - 12;

  for (let pass = 0; pass < 3; pass += 1) {
    const doomed = [];

    for (let pixel = 0; pixel < count; pixel += 1) {
      if (alpha[pixel] === 0) continue;
      if (luminance(data, pixel) < haloCeiling) continue;

      const x = pixel % width;
      const y = (pixel / width) | 0;

      const touchesCut =
        (x > 0 && alpha[pixel - 1] === 0) ||
        (x < width - 1 && alpha[pixel + 1] === 0) ||
        (y > 0 && alpha[pixel - width] === 0) ||
        (y < height - 1 && alpha[pixel + width] === 0);

      if (touchesCut) doomed.push(pixel);
    }

    if (doomed.length === 0) break;
    for (const pixel of doomed) alpha[pixel] = 0;
  }

  return alpha;
}

/** Bounding box of everything still opaque, so we can trim the empty sweep. */
function opaqueBounds(alpha, width, height) {
  let top = height;
  let left = width;
  let right = 0;
  let bottom = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (alpha[y * width + x] > 8) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }

  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

/** Source already has a usable alpha channel — just resize and re-encode. */
async function passthrough(job) {
  await mkdir(OUT_DIR, { recursive: true });

  const info = await sharp(path.join(SRC_DIR, job.src))
    .resize({ width: job.maxWidth, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 95, effort: 5 })
    .toFile(path.join(OUT_DIR, `${job.out}.webp`));

  console.log(
    `  ${job.out.padEnd(20)} ${info.width}×${info.height}  ` +
      `webp ${(info.size / 1024).toFixed(0)} KB  (already transparent)`,
  );
}

async function run(job) {
  if (job.passthrough) return passthrough(job);

  const srcPath = path.join(SRC_DIR, job.src);
  const image = sharp(srcPath).ensureAlpha();
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const alpha = buildAlphaMask(data, width, height, job);

  // Feather the mask so the silhouette does not look cut with scissors.
  const blurred = await sharp(Buffer.from(alpha), {
    raw: { width, height, channels: 1 },
  })
    .blur(job.feather)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const softAlpha = blurred.data;
  const stride = blurred.info.channels;

  if (blurred.info.width !== width || blurred.info.height !== height) {
    throw new Error(
      `Feathered mask changed size: ${blurred.info.width}×${blurred.info.height}`,
    );
  }

  for (let pixel = 0; pixel < width * height; pixel += 1) {
    data[pixel * 4 + 3] = softAlpha[pixel * stride];
  }

  const flatAlpha =
    stride === 1
      ? softAlpha
      : Uint8Array.from({ length: width * height }, (_, pixel) => softAlpha[pixel * stride]);

  const bounds = opaqueBounds(flatAlpha, width, height);

  const cut = sharp(Buffer.from(data), {
    raw: { width, height, channels: 4 },
  })
    .extract(bounds)
    .resize({ width: Math.min(job.maxWidth, bounds.width), withoutEnlargement: true });

  await mkdir(OUT_DIR, { recursive: true });

  // WebP only: the equivalent PNG is 8–10× larger for no visible gain, and
  // every browser that can run this site supports WebP with alpha.
  const webpInfo = await cut
    .clone()
    .webp({ quality: 88, alphaQuality: 92, effort: 5 })
    .toFile(path.join(OUT_DIR, `${job.out}.webp`));

  let cleared = 0;
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    if (flatAlpha[pixel] < 8) cleared += 1;
  }
  const transparent = cleared / (width * height);

  console.log(
    `  ${job.out.padEnd(20)} ${bounds.width}×${bounds.height} → ` +
      `${webpInfo.width}×${webpInfo.height}  ` +
      `webp ${(webpInfo.size / 1024).toFixed(0)} KB  ` +
      `(${(transparent * 100).toFixed(1)}% cut away)`,
  );
}

async function main() {
  let sources;
  try {
    sources = await readdir(SRC_DIR);
  } catch {
    console.log(`No source folder at ${SRC_DIR} — nothing to cut out.`);
    return;
  }

  console.log('Cutting space renders out of their white backdrop:\n');

  for (const job of JOBS) {
    if (!sources.includes(job.src)) {
      console.log(`  ${job.src} missing — skipped`);
      continue;
    }
    await run(job);
  }

  console.log('\nDone.');
}

main().catch((error) => {
  console.error('Cut-out failed:', error);
  process.exit(1);
});

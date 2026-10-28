/**
 * Turns a generated space-journey video into a scroll-scrubbable background.
 *
 * Why this step exists
 * ─────────────────────
 * A normal MP4 stores one full picture (a keyframe) every few seconds and
 * only the *differences* in between. Playing forward, that is efficient.
 * Scrubbing is not playing: every scroll tick asks the browser to jump to an
 * arbitrary frame, and to show frame 137 it must first decode forward from
 * the previous keyframe — maybe 100+ frames of work per tick. The result is
 * the stutter every naive "scroll-driven video" has.
 *
 * So the video is re-encoded with a keyframe every 8 frames (a third of a
 * second) and no B-frames: any seek is at most eight cheap decodes. Measured
 * in Chrome against a keyframe on every frame, seeks were just as fast
 * (3–6 ms either way) and the file a quarter of the size. It is also scaled
 * down, stripped of audio and compressed hard — the footage sits under a
 * navy scrim, where compression artefacts are invisible.
 *
 * Inputs  (assets-src/video/, never deployed)
 *   space-journey.mp4            required — the 16:9 master
 *   space-journey-portrait.mp4   optional — a 9:16 master for phones.
 *                                When absent, phones get the centre of the
 *                                16:9 master, cropped server-side so they
 *                                never download pixels they will not see.
 *
 * Outputs (public/videos/, content-hashed)
 *   space-journey-desktop.<hash>.mp4 / .webp   1280×720
 *   space-journey-mobile.<hash>.mp4  / .webp   540×960
 *   src/content/scroll-video.generated.json    manifest the site reads
 *
 * Filenames carry a content hash, so the files can be cached forever and a
 * re-encode still reaches every returning visitor immediately — unlike the
 * astronaut render that once sat stale in browsers under an `immutable`
 * header with an unchanging name.
 *
 * Run with:  npm run encode:video
 */

import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import sharp from 'sharp';

const run = promisify(execFile);

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(root, 'assets-src', 'video');
const OUT_DIR = path.join(root, 'public', 'videos');
const MANIFEST = path.join(root, 'src', 'content', 'scroll-video.generated.json');

const BASE = 'space-journey';

/**
 * CRF: higher = smaller and softer. The footage lives under a ~55% navy
 * scrim, so it can be pushed much harder than footage shown bare.
 */
const PROFILES = {
  desktop: { width: 1280, height: 720, crf: 30 },
  mobile: { width: 540, height: 960, crf: 31 },
};

/** Frames between keyframes; see the header for why this stays short. */
const KEYFRAME_INTERVAL = 8;

const kb = (bytes) => `${Math.round(bytes / 1024).toLocaleString()} KB`;

let ffmpegPath = '';

/**
 * ffmpeg comes from `ffmpeg-static`, an *optional* dependency: its install
 * step downloads a binary, and a failed download must never be able to fail
 * `npm install` — and with it a deploy — over a tool only this script uses.
 * FFMPEG_PATH, when set, points at any other ffmpeg build instead.
 */
async function findFfmpeg() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try {
    const { default: bundled } = await import('ffmpeg-static');
    if (bundled && existsSync(bundled)) return bundled;
  } catch {
    // Not installed — fall through to the hint below.
  }
  throw new Error(
    'ffmpeg not found. Fetch it with `node node_modules/ffmpeg-static/install.js` ' +
      '(newer npm versions block install scripts), or set FFMPEG_PATH to an ffmpeg binary.',
  );
}

async function ffmpeg(args) {
  try {
    return await run(ffmpegPath, ['-hide_banner', '-loglevel', 'error', '-y', ...args], {
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (error) {
    throw new Error(`ffmpeg failed:\n${error.stderr || error.message}`);
  }
}

/** Duration and frame count, read from ffmpeg's own probe output. */
async function probe(file) {
  const { stderr } = await run(ffmpegPath, ['-hide_banner', '-i', file], {
    maxBuffer: 16 * 1024 * 1024,
  }).catch((error) => error); // `ffmpeg -i` with no output always "fails"
  const duration = stderr.match(/Duration: (\d+):(\d+):([\d.]+)/);
  const fps = stderr.match(/, ([\d.]+) fps/);
  const seconds = duration
    ? Number(duration[1]) * 3600 + Number(duration[2]) * 60 + Number(duration[3])
    : 0;
  return { seconds, fps: fps ? Number(fps[1]) : 24 };
}

async function encode(profileName, input, cropToPortrait) {
  const { width, height, crf } = PROFILES[profileName];

  // Portrait output from a landscape master: take the centre column at the
  // master's full height, then scale. Cropping here, not in CSS, means a
  // phone downloads only the ~32% of the frame it can actually display.
  const geometry = cropToPortrait
    ? `crop=trunc(ih*9/16/2)*2:ih,scale=${width}:${height}:flags=lanczos`
    : `scale=${width}:${height}:force_original_aspect_ratio=increase:flags=lanczos,crop=${width}:${height}`;

  const tempVideo = path.join(OUT_DIR, `.${BASE}-${profileName}.tmp.mp4`);
  const tempPoster = path.join(OUT_DIR, `.${BASE}-${profileName}.tmp.png`);

  await ffmpeg([
    '-i', input,
    '-an', // a background never needs a soundtrack
    '-vf', `${geometry},fps=24,format=yuv420p`,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', String(crf),
    '-g', String(KEYFRAME_INTERVAL),
    '-keyint_min', String(KEYFRAME_INTERVAL),
    '-sc_threshold', '0', // fixed spacing: no extra keyframes on "scene cuts"
    '-bf', '0', // no B-frames, so decode order is display order
    '-movflags', '+faststart', // index first, so the browser knows the duration at once
    tempVideo,
  ]);

  // The poster is the very first frame: it is what the page shows at the
  // top before the video has loaded, so the hand-off is invisible.
  await ffmpeg(['-i', tempVideo, '-frames:v', '1', tempPoster]);
  const posterBuffer = await sharp(tempPoster).webp({ quality: 72, effort: 5 }).toBuffer();
  await rm(tempPoster);

  const videoBuffer = await readFile(tempVideo);
  const hash = createHash('sha256').update(videoBuffer).digest('hex').slice(0, 10);

  const videoName = `${BASE}-${profileName}.${hash}.mp4`;
  const posterName = `${BASE}-${profileName}.${hash}.webp`;

  await rename(tempVideo, path.join(OUT_DIR, videoName));
  await writeFile(path.join(OUT_DIR, posterName), posterBuffer);

  return {
    src: `/videos/${videoName}`,
    poster: `/videos/${posterName}`,
    width,
    height,
    bytes: videoBuffer.length,
    posterBytes: posterBuffer.length,
  };
}

async function main() {
  const landscape = path.join(SRC_DIR, `${BASE}.mp4`);
  const portrait = path.join(SRC_DIR, `${BASE}-portrait.mp4`);

  if (!existsSync(landscape)) {
    console.log(
      `\nNo master found at assets-src/video/${BASE}.mp4 — nothing to encode.\n` +
        'See assets-src/video/PROMPTS.md for how to generate it.\n',
    );
    return;
  }

  ffmpegPath = await findFfmpeg();
  await mkdir(OUT_DIR, { recursive: true });

  // Clear previous hashed outputs so stale versions are not deployed.
  for (const file of await readdir(OUT_DIR)) {
    if (file.startsWith(`${BASE}-`)) await rm(path.join(OUT_DIR, file));
  }

  const info = await probe(landscape);
  console.log(
    `\nMaster: ${BASE}.mp4 — ${info.seconds.toFixed(1)}s at ${info.fps} fps, ` +
      `${kb((await stat(landscape)).size)}`,
  );

  const desktop = await encode('desktop', landscape, false);
  const mobile = existsSync(portrait)
    ? await encode('mobile', portrait, false)
    : await encode('mobile', landscape, true);

  const frames = Math.round(info.seconds * 24);

  const manifest = {
    // Written by scripts/encode-scroll-video.mjs — do not edit by hand.
    desktop: { src: desktop.src, poster: desktop.poster, width: desktop.width, height: desktop.height },
    mobile: { src: mobile.src, poster: mobile.poster, width: mobile.width, height: mobile.height },
    duration: Number(info.seconds.toFixed(3)),
    frames,
  };

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`\n  desktop  ${desktop.src}  ${kb(desktop.bytes)}  (poster ${kb(desktop.posterBytes)})`);
  console.log(
    `  mobile   ${mobile.src}  ${kb(mobile.bytes)}  (poster ${kb(mobile.posterBytes)})` +
      (existsSync(portrait) ? '' : '  ← centre-cropped from the 16:9 master'),
  );
  console.log(
    `\n  ${frames} frames, a keyframe every ${KEYFRAME_INTERVAL} — ` +
      `any scroll position is at most ${KEYFRAME_INTERVAL} decodes away.`,
  );
  console.log('  Manifest written to src/content/scroll-video.generated.json\n');
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});

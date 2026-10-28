'use client';

import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, usePrefersReducedMotion } from '@/lib/hooks';

interface Source {
  src: string;
  poster: string;
  width: number;
  height: number;
}

interface ScrollVideoBackgroundProps {
  desktop: Source;
  mobile: Source;
}

/** Phones in portrait get the 9:16 cut; everything wider gets 16:9. */
const PORTRAIT = '(max-aspect-ratio: 1/1)';

/**
 * The flight is spread over the page's scroll length, but never over fewer
 * screens than this. The home page runs to ~15 screens; without a floor the
 * contact page (~5) would fly three times as fast and the 404 (~2) would
 * whip through all of it in a flick of the wheel. Short pages now cover a
 * proportionate part of the journey instead.
 */
const MIN_JOURNEY_SCREENS = 6;

/**
 * The page background as a journey through space, driven by the scroll bar.
 *
 * Scrolling does not *play* the video — it positions it. The top of the page
 * is the first frame, the bottom of a long page is the last, and everything
 * in between maps linearly. Scroll back up and the journey runs in reverse.
 *
 * Load order is deliberate so it never costs the page its first paint:
 *   1. The first frame, as a plain image chosen by a media query, paints
 *      immediately with the HTML — before any JavaScript runs.
 *   2. Only once the browser is idle does the video element mount and start
 *      downloading. Its poster is that same first frame, so the hand-off from
 *      still to moving picture is invisible.
 *
 * It stays a still image — never downloading the video at all — for visitors
 * who prefer reduced motion, who have Data Saver on, or who are on a 2G
 * connection.
 */
export function ScrollVideoBackground({ desktop, mobile }: ScrollVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const portrait = useMediaQuery(PORTRAIT);
  const source = portrait ? mobile : desktop;
  const [mountVideo, setMountVideo] = useState(false);

  // Decide whether the moving version is worth downloading at all, and if so
  // wait until the browser has finished the work that matters for first paint.
  useEffect(() => {
    if (reducedMotion) {
      setMountVideo(false);
      return;
    }

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '')) {
      return;
    }

    const start = () => setMountVideo(true);

    // The DOM typings claim requestIdleCallback always exists; Safari before
    // 16.4 disagrees, so test the function itself rather than trusting them.
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 1200);
    return () => clearTimeout(id);
  }, [reducedMotion]);

  // Scroll position → video time.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !mountVideo) return;

    const root = document.documentElement;
    let target = 0;
    let current = 0;
    let frame = 0;
    let running = true;

    const measure = () => {
      const scrollable = root.scrollHeight - window.innerHeight;
      const journey = Math.max(scrollable, window.innerHeight * MIN_JOURNEY_SCREENS);
      target = Math.min(Math.max(window.scrollY / journey, 0), 1);
    };

    const tick = () => {
      if (!running) return;

      const { duration } = video;
      if (duration && Number.isFinite(duration)) {
        // Ease toward the scroll position rather than jumping to it: a
        // mouse wheel moves in ~100px steps, and following it literally
        // makes the picture lurch from frame to frame.
        current += (target - current) * 0.12;
        if (Math.abs(target - current) < 0.0004) current = target;

        // Stop a hair short of the end — seeking exactly to `duration` shows
        // a black frame in some browsers.
        const time = current * Math.max(duration - 0.05, 0);

        // Never queue a seek on top of one still decoding. Piled-up seeks are
        // the other classic cause of scroll-video stutter, alongside sparse
        // keyframes (which the encode script rules out).
        if (!video.seeking && Math.abs(video.currentTime - time) > 1 / 48) {
          video.currentTime = time;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    // iOS Safari will not paint a seeked frame until the element has started
    // playback once. Muted inline playback is permitted without a gesture,
    // so start and immediately pause; failure (e.g. Low Power Mode) simply
    // leaves the poster in place.
    video
      .play()
      .then(() => video.pause())
      .catch(() => {});

    measure();
    current = target;

    // Page height changes as images and fonts arrive; keep the mapping true.
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', onVisibility);
    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [mountVideo, source.src]);

  // h-screen rather than inset-0: on phones 100vh is the *large* viewport, so
  // the stage keeps one size while the address bar slides in and out. Pinned
  // to all four edges it would resize instead, and the cover-fitted footage
  // would visibly re-scale every time the scroll direction changed.
  return (
    <div
      aria-hidden="true"
      className="scroll-video-stage pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen overflow-hidden"
    >
      {/* First frame: painted from the HTML, chosen by the browser before
          any script runs, so a phone never fetches the desktop image. */}
      <picture>
        <source media={PORTRAIT} srcSet={mobile.poster} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={desktop.poster}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {mountVideo && (
        <video
          // Remount on orientation change so the right cut loads.
          key={source.src}
          ref={videoRef}
          src={source.src}
          poster={source.poster}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="scroll-video-scrim absolute inset-0" />
    </div>
  );
}

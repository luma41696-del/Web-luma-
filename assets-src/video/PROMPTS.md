# Scroll-driven background video — how to make it

The site background can be a short flight through space that is **driven by
the scroll bar**: the top of the page shows the first frame, the bottom of the
page the last, and scrolling back up flies the camera backwards. The code is
already in place (`src/components/space/ScrollVideoBackground.tsx`); it stays
switched off until a video has been encoded.

The story: the visitor flies through deep space toward the pale-blue ringed
LUMA planet, guided by the golden four-point star from the LUMA mark. At the
top of the page the planet is a tiny jewel in the distance; by the footer the
camera has arrived above its horizon.

## What the footage must do

Scrubbing is not playing. Every rule below exists because the video is pulled
back and forth by the scroll bar, not watched once from start to finish.

| Rule | Why |
| --- | --- |
| One continuous shot, no cuts | A cut becomes a jump at one exact scroll position |
| Constant forward speed | Even speed = the same pace on every part of the page |
| No flashes or sudden light changes | They would flicker every time someone scrolls past them |
| Must look natural in reverse | Half of all scrolling is upward |
| Dark, with empty negative space | Text sits on top of it, under a navy scrim |
| Star and planet on the vertical centre line | Phones see only the centre third of a 16:9 frame |
| No text, logos, people or ships | AI garbles logos; the hero already has its own spaceship and astronaut |

## Reference images (Magnific library)

| Name | Link | Use it for |
| --- | --- | --- |
| "At LUMA" poster | <https://www.magnific.com/app/creation/TdvG84eVNR> | Palette, mood, the golden four-point star |
| LUMA planet — ultra-realistic render | <https://www.magnific.com/app/creation/LUq3JCuswO> | Quality of the deep-space environment only (not its planet, logo or awards) |
| Pale-blue ringed planet | <https://www.magnific.com/app/creation/IapO79ytvE> | The planet's shape and surface in the end frame |
| LUMA planet with ring awards (alternate) | <https://www.magnific.com/app/creation/tfeyJuNmZJ> | Swap in for the render above if you prefer its nebula |

## Step 1 — start frame (image, 16:9, 2K)

Model: GPT-2 (what made the existing LUMA renders) or Nano Banana 2.
References, in this order: **@img1 = "At LUMA" poster**, **@img2 = LUMA planet render**.

```text
Use @img1 only as the colour and mood reference: deep midnight-navy space and a single warm golden four-point star glowing softly from above. Use @img2 only for the quality of the deep-space environment — its starfield, nebula texture and blue-and-gold lighting. Do NOT copy the planet, the logo or the awards from @img2.

A vast, calm, cinematic view into deep space, 16:9 widescreen. Deep midnight navy (#020E1A) graduating to rich navy (#061B2D), with soft, translucent blue nebula clouds (#16496E and steel blue #7892AD) drifting at several depths — thickest toward the left and right edges, thinning toward the centre. Thousands of fine, pin-sharp stars at varied distances, mostly cool white with a few warm gold.

In the upper centre of the frame, a single radiant four-point star of warm golden light (#E8B95C), slender and elegant like the star in @img1, with a soft halo that gently warms the nebula around it. Far away in the lower centre, just above the bottom edge, a tiny pale-blue planet with thin, elegant rings — so distant it reads as a small jewel, no wider than about 4% of the frame.

Overall exposure low and moody, with large areas of near-black negative space so website text can sit on top. Highlights small and precise. Ultra-realistic, premium commercial sci-fi, subtle fine film grain, gentle anamorphic softness, sharp focus.

No text, no logos, no spaceships, no astronauts, no people, no awards, no lens flares across the frame, no large bright areas.
```

Generate 3–4, keep the darkest, calmest one with the star and planet nearest
the centre line.

## Step 2 — end frame (image, 16:9, 2K)

Same model. References, in this order: **@img1 = your start frame from step 1**,
**@img2 = pale-blue ringed planet**, **@img3 = "At LUMA" poster**.

```text
Use @img1 as the exact same scene — the same palette, starfield, nebula and lighting. This is the same camera a few moments later, after flying straight forward. Use @img2 for the planet's shape and surface: smooth pale blue with thin, elegant rings. Use @img3 for the golden four-point star.

The camera has travelled forward through space and arrived above the planet. The pale-blue planet now rises from the bottom of the frame as a vast curved horizon filling the lower third; its thin rings arc diagonally across the frame. A soft warm-gold rim light traces the planet's upper edge. The golden four-point star shines larger and closer in the upper centre, its warm glow reflecting faintly on the rings. The nebula has thinned to delicate wisps at the edges; the sky above the planet is calm, deep navy.

Keep the palette of @img1 — deep midnight navy, steel blue, warm gold accents — and the same low, moody exposure, with plenty of dark negative space in the upper half. Ultra-realistic, premium commercial sci-fi, subtle film grain, 16:9.

No text, no logos on the planet, no spaceships, no people, no awards, no extra planets or moons.
```

## Step 3 — the video

Model: **Seedance 2.5**. Start frame = step 1, end frame = step 2.

| Setting | Value |
| --- | --- |
| Aspect ratio | 16:9 |
| Resolution | 1080p |
| Duration | 15 s (12–15 is fine) |
| Camera motion | Push In |
| Looks (if offered) | Camera ARRI Alexa 35 · Lens Anamorphic · Lighting Low Key · Movie look Cold Space · Halation Warm Halo |
| Audio | Sound effects off, music off — the site never plays sound |

```text
One continuous, unbroken shot — no cuts. The camera glides slowly forward through deep space at a perfectly constant speed, as if on a smooth dolly rail, travelling from the opening frame to the closing frame. Layers of soft blue nebula drift past at different depths, creating gentle parallax; distant stars stream very slowly outward toward the edges of the frame. The tiny pale-blue planet ahead grows steadily larger and rises into view from the bottom of the frame until it becomes a vast curved horizon, its thin elegant rings arcing across it. The golden four-point star in the upper centre grows gradually brighter, its warm light slowly catching the edge of the planet and its rings.

Motion is calm, weightless and silky smooth from the first frame to the last: no camera shake, no rotation, no speed changes, no zoom pulses, no flashes, no light that suddenly appears or disappears, no objects popping in. The movement must still look natural when played in reverse.

Keep the palette deep midnight navy and steel blue with warm gold accents throughout, and keep the exposure dark and moody so the footage works behind text. Photorealistic, cinematic, 24 fps.

No text, no logos, no spaceships, no astronauts, no people, no awards, no explosions, no warp-speed streaks.
```

Generate 2–4 takes. If a take morphs between the two frames instead of
flying, try again with the start frame only and the same prompt.

### Optional — a vertical cut for phones

Without it, phones get the centre of the 16:9 video, which works because the
composition is centred. For a frame composed for portrait, repeat steps 1–3
at **9:16** (change "16:9 widescreen" to "9:16 vertical" in the prompts) and
save the result as `space-journey-portrait.mp4`.

## Step 4 — check a take before using it

Open it in any player and **drag the timeline back and forth** — that is
exactly how the site will show it. Reject it if:

- there is a cut, a flash, or a sudden change in brightness;
- something morphs, melts or pops into existence;
- the speed changes (slow start, fast finish);
- the star or planet drifts far from the vertical centre line;
- it looks bright on its own — it should look almost too dark.

## Step 5 — put it on the site

1. Download the best-quality MP4 and save it as
   `assets-src/video/space-journey.mp4`
   (plus `space-journey-portrait.mp4` if you made one).
2. Run `npm run encode:video`. It writes small, content-hashed cuts to
   `public/videos/` and their paths to
   `src/content/scroll-video.generated.json`, which switches the feature on.
3. `npm run dev` and scroll through the site.
4. Commit `public/videos/` and the manifest. The masters themselves are
   ignored by git (tens of MB each); they stay in the Magnific library.

To switch the video off again, set `desktop` and `mobile` to `null` in the
manifest.

## Tuning

| What | Where |
| --- | --- |
| How dark the footage sits behind text | `.scroll-video-scrim` in `src/app/globals.css` |
| File size vs. sharpness (CRF), keyframe spacing | `PROFILES`, `KEYFRAME_INTERVAL` in `scripts/encode-scroll-video.mjs` |
| How fast short pages fly | `MIN_JOURNEY_SCREENS` in `ScrollVideoBackground.tsx` |

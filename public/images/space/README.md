# Space renders

The two photographic renders used on the site live here as cut-out WebP:

| File                       | Where it appears                                | Source master                             |
| -------------------------- | ----------------------------------------------- | ----------------------------------------- |
| `spaceship.webp`           | Hero, rising out of the depth of the scene       | `assets-src/space/ship-side.png`          |
| `astronaut-floating.webp` | Transition band between Services and Recognition | `assets-src/space/astronaut-floating.png` |
| `astronaut-standing.webp`  | unused — alternative pose, kept for swapping     | `assets-src/space/astronaut-back.png`     |

Both live files carry LUMA branding in the artwork itself — `LUMA AGENCY` on
the ship's hull, the LUMA mark on the astronaut's chest panel — so neither may
be cropped through those areas.

To switch the transition band back to the standing pose, point
`ExplorerBand.tsx` at `astronaut-standing.webp` and revert the container to a
tall aspect (that pose is a portrait figure; the floating one is landscape).

## Regenerating

The 2048² masters ship in `assets-src/space/` and are **not** deployed. They
arrive on a white studio sweep; `scripts/cutout-space.mjs` removes that
backdrop and writes the transparent WebP files here:

```bash
npm run cutout:space
```

Sources that already carry an alpha channel — like the floating astronaut —
are flagged `passthrough: true` and are only resized and re-encoded.

For sources delivered on a white sweep, the cut-out walks the backdrop as a
connected region seeded from the image border, rather than keying on
brightness: the astronaut's suit is nearly the same value as the sweep behind
it, and a plain luminance key punches holes straight through it. Per-image
tuning (`localDelta`, `minLuminance`) sits at the top of that script.

## Swapping in a different render

Drop a new master into `assets-src/space/`, point the matching entry in
`scripts/cutout-space.mjs` at it, and re-run the command above. If the new
render already has a transparent background, you can skip the script and write
`spaceship.webp` / `astronaut-floating.webp` here directly.

## If a file is missing

`<SpaceAsset>` probes for each file and falls back to a vector illustration
(`src/components/space/Fallbacks.tsx`) so a section is never left empty. With
both WebP files present, as shipped, the fallbacks never render.

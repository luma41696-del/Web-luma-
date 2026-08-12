# LUMA Agency — Website

**Where Light Leads Innovation** · حيث يقود الضوء الابتكار

A bilingual (English / العربية) corporate site for LUMA Agency, Amman, Jordan.
Built with Next.js 15 (App Router), TypeScript, Tailwind CSS and Framer Motion.

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build    # production build
npm start        # serve the production build
npm run lint     # eslint
npm run typecheck
```

> **Do not run `npm run build` while `npm run dev` is running.** Both write to
> `.next/` and the dev server will start throwing module-resolution errors. If
> that happens, stop both, `rm -rf .next`, and restart.

---

## Where the content came from

Every fact on this site — services, projects, team, statistics, testimonials,
FAQs, contact details — was taken from the live LUMA API that powered the
previous site (`api.luma-jo.com/api/v1`), captured 9 August 2026. Nothing was
invented. English wording was tightened for rhythm in places; meaning was not
changed.

The Arabic content is a direct translation of that same English source. The
API carried `*_ar` fields but every one of them was `null`, so the previous
site fell back to English for Arabic visitors — this one does not.

**Two things to be aware of:**

1. **The published statistics are internally inconsistent.** The API reports
   *5,000+ projects*, *250+ clients* and *5+ years of experience*, while the
   company profile gives a founding year of 2025. They are reproduced exactly
   as published, at your instruction. Edit them in
   [`src/content/company.ts`](src/content/company.ts) → `stats`.

2. **The previous site's project photography is gone.** Every URL under
   `luma-jo.com/projects/*.jpg` now 404s. Rather than substitute stock
   photography for work LUMA actually delivered, each project renders a
   generated constellation cover keyed to its category. See
   [Adding real project photography](#adding-real-project-photography).

---

## Editing the site

### Contact details and social links — one file

Everything lives in [`src/content/site.config.ts`](src/content/site.config.ts):
phone, WhatsApp, email, city, map coordinates, social profiles, canonical URL.
Nothing else in the codebase hard-codes any of it. Change it there and it
updates the navbar, footer, contact page, JSON-LD and metadata at once.

### Adding a project

Append to the `projects` array in
[`src/content/projects.ts`](src/content/projects.ts):

```ts
{
  slug: 'new-project-slug',
  legacyId: '',
  title:       { en: 'Project Title',  ar: 'عنوان المشروع' },
  client:      'Client Name',
  year:        2026,
  category:    { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
  categorySlug:'digital-marketing',   // must match a projectCategories slug
  description: { en: '…', ar: '…' },
  tags:        { en: ['Tag'], ar: ['وسم'] },
  featured:    true,                   // surfaces it on the home page
}
```

The portfolio filter, the home-page preview and the cover art all pick it up
automatically.

### Adding real project photography

1. Save the image as `public/images/projects/<slug>.jpg`
2. In [`src/components/sections/Portfolio.tsx`](src/components/sections/Portfolio.tsx),
   swap `<ProjectCover …/>` for an `<Image>` pointing at that path.

The generated covers stay as the fallback for projects without a photograph.

### Adding an award to the Hall of Recognition

1. Drop the plaque photograph in `assets-src/awards/<slug>.png`
2. Run `npm run optimize:images` — this writes the 800px card and 1600px
   lightbox derivatives into `public/images/awards/`
3. Append an entry to [`src/content/awards.ts`](src/content/awards.ts):

```ts
{
  slug: 'company-slug',
  image: 'company-slug',          // the filename, without extension
  width: 2048, height: 2048,      // the source dimensions
  awardedBy: { en: 'Company', ar: 'الشركة' },
  title:     { en: 'Shield of Thanks & Appreciation', ar: 'درع شكر وتقدير' },
  recipient: { en: 'Name — Role', ar: 'الاسم — الدور' },   // omit if unnamed
  alt:       { en: 'Describe the object', ar: 'وصف الدرع' },
}
```

Transcribe only what is actually engraved on the plaque. Where a plaque names
no recipient, leave `recipient` out rather than guessing.

### Adding a team member

Photo to `assets-src/team/<slug>.jpg`, run `npm run optimize:images`, then
append to [`src/content/team.ts`](src/content/team.ts) with `image: '<slug>'`.

You can list someone before their photo exists — omit `image` (or leave it
pointing at a file that isn't there yet) and the grid renders their initials as
a gold monogram instead of a broken image. Portraits are served straight from
`public/`, not through `next/image`: they are already square WebP at the two
sizes the grid uses, so the optimiser had nothing to do but upscale and
re-encode them.

### Adding or editing a service

[`src/content/services.ts`](src/content/services.ts). Each service generates its
own page at `/services/<slug>`, its own JSON-LD, a sitemap entry and a slot in
the home-page orbit. If you rename a `slug`, add a redirect from the old one in
[`next.config.mjs`](next.config.mjs) so existing links keep working.

### UI text (buttons, labels, headings)

[`src/i18n/dictionary.ts`](src/i18n/dictionary.ts) — both languages side by side.
Content text lives with its data in `src/content/`, not here.

---

## Asset pipelines

Two scripts turn source artwork into what ships. Both are idempotent — re-run
them any time.

```bash
npm run optimize:images   # award plaques + team portraits → WebP/AVIF
npm run cutout:space      # space renders → transparent WebP
npm run build:fonts       # DIN Next Arabic TTF → WOFF2
```

| Pipeline | In                                | Out                                    | Saving          |
| -------- | --------------------------------- | -------------------------------------- | --------------- |
| Images   | `assets-src/{awards,team}/*`      | `public/images/{awards,team}/*.webp\|avif` | 25 MB → 2.3 MB  |
| Space    | `assets-src/space/*.png`          | `public/images/space/*.webp`           | 16 MB → 0.5 MB  |
| Fonts    | `public/fonts/*.ttf`              | `public/fonts/*.woff2`                 | 637 KB → 199 KB |

**Masters never ship.** Everything under `assets-src/` (~40 MB of 2048²
originals) stays out of `public/`, so the deployed asset payload is **4.4 MB**
rather than 45 MB. Re-run the pipelines any time; they are idempotent.

**Fonts.** DIN Next Arabic carries Latin, Arabic and numerals in one family, so
a single typeface serves both languages — no Google Fonts request, no second
family to keep in sync. Four weights are shipped (300/400/700/800).

**Space renders.** The masters arrive on a white studio sweep.
`scripts/cutout-space.mjs` removes it by walking the backdrop as a connected
region seeded from the image border, rather than keying on brightness — the
astronaut's suit is nearly the same value as the sweep behind it, and a plain
luminance key punches holes straight through it. See
[`public/images/space/README.md`](public/images/space/README.md).

**Award plaques are never cropped or retouched.** Each carries the awarding
company's logo and a full Arabic citation; they are only re-encoded and
resized, and the lightbox shows them whole on a light stage so the engraved
text keeps the contrast it was designed for.

---

## Contact form

Out of the box the form validates client-side and then hands off to the
visitor's mail client with everything pre-filled — no backend required, and no
dead button.

To POST to a real endpoint instead, set `contactEndpoint` in
[`src/content/site.config.ts`](src/content/site.config.ts):

```ts
contactEndpoint: 'https://api.luma-jo.com/api/v1/contact/submissions',
```

It will `POST` JSON: `{ name, company, email, phone, service, message }`.
Any non-2xx response surfaces the localised error state.

---

## SEO

- Per-page `title`, `description`, canonical and Open Graph tags
- JSON-LD: `Organization` + `ProfessionalService` + `WebSite` sitewide,
  `Service` on each service page, `FAQPage` on contact
- `sitemap.xml` and `robots.txt` generated from the content files
- **URL structure preserved from the old site** — `/`, `/about`, `/portfolio`,
  `/contact` are unchanged, and the old MongoDB-id service URLs
  (`/services/69147e87a31c3aa4f67a4a14`) 301-redirect to the new readable
  slugs. See `redirects()` in [`next.config.mjs`](next.config.mjs).

---

## Accessibility

- Semantic landmarks, skip-to-content link, visible focus rings throughout
- Every image has meaningful `alt`; decorative layers are `aria-hidden`
- Lightbox traps focus, restores it on close, and closes on <kbd>Esc</kbd>;
  arrow keys navigate and respect RTL
- Form errors are wired to their inputs via `aria-describedby`; status is a
  polite live region
- **`prefers-reduced-motion` is honoured everywhere**: the starfield paints a
  single static frame instead of animating, parallax and 3D tilt detach their
  listeners entirely, counters print their final value, the preloader is
  skipped, and reveal animations resolve to plain visible content — never to
  content stuck at `opacity: 0`

## Performance

- ~103 kB shared JS; every route is statically prerendered
- The starfield is one `<canvas>` with a single rAF loop that stops when the
  section scrolls out of view or the tab is hidden — no background video, no
  thousands of DOM nodes
- Images lazy-load below the fold; the hero render is eager
- Fonts preloaded and `font-display: swap`

---

## Bilingual behaviour

Language is a client-side preference stored in `localStorage` under
`luma-language`, applied to `<html lang dir>` by a tiny inline script in
`<head>` **before first paint** — an Arabic visitor never sees a flash of
left-to-right English.

Layout mirrors through CSS logical properties (`ps-`, `pe-`, `start-`, `end-`),
so RTL needs no duplicated rules. Arabic runs slightly larger with looser
leading, since DIN Next Arabic has a smaller apparent x-height than its Latin
counterpart at the same size. Numerals render as Eastern Arabic digits in
Arabic via `Intl.NumberFormat`.

Both languages share one URL. This matches the previous site and keeps all
existing inbound links and search rankings intact.

---

## Project structure

```
web/
├─ assets-src/              masters — consumed by scripts, never deployed
│  ├─ awards/               10 plaque photographs (2048²)
│  ├─ team/                 13 portraits
│  └─ space/                spaceship + astronaut renders on white
├─ public/
│  ├─ fonts/                DIN Next Arabic (.ttf sources + .woff2 shipped)
│  ├─ logo/                 LUMA marks — used as delivered, never redrawn
│  └─ images/
│     ├─ awards/            WebP/AVIF derivatives (card + lightbox)
│     ├─ team/              WebP portraits (320 / 640)
│     └─ space/             cut-out spaceship + astronaut WebP
├─ scripts/                 optimize-images · cutout-space · build-fonts
└─ src/
   ├─ app/                  routes, layout, sitemap, robots, 404
   ├─ components/
   │  ├─ layout/            Navbar · Footer · Preloader · CustomCursor
   │  ├─ sections/          Hero · About · Services · Portfolio ·
   │  │                     ExplorerBand · Recognition · WhyLuma ·
   │  │                     Testimonials · Contact · CallToAction
   │  ├─ space/             Starfield · SpaceAsset · vector fallbacks
   │  └─ ui/                Button · Reveal · TiltCard · Lightbox · Counter …
   ├─ content/              ← all site data lives here
   ├─ i18n/                 dictionary + LanguageProvider
   └─ lib/                  hooks + motion presets
```

---

## Deployment

### Vercel (recommended)

```bash
npx vercel
```

Zero configuration — the redirects, image optimisation and static generation in
`next.config.mjs` are all native.

### Netlify

Install `@netlify/plugin-nextjs`, then:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Any Node host

```bash
npm ci && npm run build && npm start   # listens on $PORT, default 3000
```

### Before going live

1. Confirm `siteConfig.url` in `src/content/site.config.ts` is the production
   origin — it drives canonicals, JSON-LD and the sitemap.
2. Point `contactEndpoint` at a real backend, or leave it empty for the mailto
   hand-off.
3. Submit `https://luma-jo.com/sitemap.xml` to Search Console.

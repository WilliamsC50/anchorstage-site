# Image Library

How images are organized, named, and referenced on the ASO marketing site.

## Folder structure

All site imagery lives under `public/images`.

```
heroes/          Page hero artwork, one folder per page
  home/
  network/
  platform/
  who-its-for/
  about/
content/         In-page editorial photography, by subject
  production/
  collaboration/
  equipment/
  crew/
  venues/
  marketing/
ui/
  screenshots/   Real product captures only
  overlays/      Frames, device shells, masks
backgrounds/     Full-bleed section backgrounds
textures/        Tileable or repeating surface art
og/              Purpose-cut social share images (1200x630)
legacy/          Retained but unused. Never referenced by a live page.
```

Brand marks stay in `public/logos` and are not part of this structure.

## Naming convention

Lowercase kebab-case, describing the page or subject first and the content
second. No spaces, no capitals, no dates, no camera filenames.

```
heroes/home/home-hero-foh-festival.png
content/equipment/equipment-road-cases-loadin.jpg
og/og-default.png
```

Pattern: `<context>-<type>-<description>.<ext>`

## Hero images

| Page | Location | Status |
|---|---|---|
| Home | `heroes/home/home-hero-foh-festival.png` | In use |
| Network | `heroes/network/` | Not yet produced |
| Platform | `heroes/platform/` | Not yet produced |
| Who It's For | `heroes/who-its-for/` | Not yet produced |
| About | `heroes/about/` | Not yet produced |

Only Home currently uses hero imagery. The other four pages use the
typographic `PageHeader` and need no image to render correctly.

## Referencing images

Do not hardcode paths in pages or components. Import from `lib/images.ts`:

```ts
import { homeHero } from "@/lib/images";
```

Each entry carries `src`, `width`, `height`, and `alt`, so `next/image` can
reserve layout space without measuring the file. Adding a new image means
adding one manifest entry, then importing it.

Hero artwork is rendered through `components/HeroMedia.tsx`. Changing the home
hero is a change to that one component.

## Legacy asset policy

`legacy/` holds every image from before the library was organized. Nothing in
it is referenced by a live page.

- **Nothing is ever deleted.** Assets move to `legacy/`, they do not disappear.
- **Nothing in `legacy/` may be used on a live page** without first being
  reviewed, renamed, and moved into the correct folder.
- Original filenames are preserved in `legacy/` so provenance stays traceable.

Legacy content is unreviewed, so it is kept out of `content/` deliberately.
A file sitting in `content/production/` reads as approved for use; a file in
`legacy/` does not.

### CFAV imagery

Imagery showing the CFAV stage or CFAV branding must not appear anywhere on
the ASO marketing site. ASO is not a production company, and that content
works against the positioning. Those assets stay in `legacy/` and in
`public/logos`, and no live page may reference them.

## Preferred formats

| Use | Format |
|---|---|
| Photography | JPEG, or PNG when the source is already lossless |
| Illustration, diagrams, marks | SVG |
| Screenshots | PNG |
| Anything with transparency | PNG or SVG |

`next/image` converts to WebP and AVIF on request, so committing modern
formats by hand is unnecessary. Commit the highest-quality source.

## Sizing guidance

| Use | Target width | Notes |
|---|---|---|
| Page hero | 1600 to 2400px | Displayed at roughly 40% of a 1152px container |
| Full-bleed background | 2400px | Heavily darkened, so compression artefacts hide well |
| In-page editorial | 1200 to 1600px | |
| Open Graph | 1200 x 630 exactly | 1.91:1, cropped by every platform |
| Textures | 512px or smaller | Should tile |

Keep source files under about 3MB. Above that, downscale before committing:
the optimizer serves derivatives, but the original still ships in the repo.

Always set `sizes` on `next/image` for anything that is not full-width, so
the browser is not handed a desktop-scale file on a phone.

## Known gaps

- No purpose-cut Open Graph asset exists. Share cards currently use the home
  hero, whose 16:9 ratio crops close enough to 1.91:1 to hold up. A dedicated
  `og/og-default.png` at 1200x630 should replace it.
- `legacy/hero-live-performance.jpg` is not a JPEG. Its header is an MP4
  `ftyp` box, so it is a mislabelled video file and cannot be rendered.
- `public/Icons` and `public/Videos` hold production-service assets from the
  previous site. They are unreferenced and were left in place rather than
  folded into this structure, since they are not site imagery.

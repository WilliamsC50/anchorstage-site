/**
 * Image manifest.
 *
 * Pages and components reference images through this file rather than
 * hardcoding paths, so assets can be renamed, re-cropped, or replaced in one
 * place. See docs/IMAGE_LIBRARY.md for the folder structure and conventions.
 *
 * Every entry carries its intrinsic dimensions so next/image can reserve
 * layout space without a round trip.
 */

export interface ImageAsset {
  src: string;
  /** Intrinsic width in pixels. */
  width: number;
  /** Intrinsic height in pixels. */
  height: number;
  /** Meaningful alt text, or "" when the image is purely decorative. */
  alt: string;
}

// ── Page heroes ───────────────────────────────────────────────────────────────

export const homeHero: ImageAsset = {
  src: "/images/heroes/home/home-hero-foh-festival.png",
  width: 1672,
  height: 941,
  alt:
    "Front of house position at a large outdoor festival, with an engineer at " +
    "a mixing console facing the stage and crowd.",
};

export const networkHero: ImageAsset = {
  src: "/images/heroes/network/network-hero.png",
  width: 1672,
  height: 940,
  alt:
    "Three live event professionals in conversation at a table in a small " +
    "music venue, a laptop open between them and the stage lit behind.",
};

/**
 * Heroes for the remaining pages are not yet produced. Import these once the
 * assets land in their folders; until then those pages use the typographic
 * PageHeader with no imagery.
 */
export const platformHero: ImageAsset | null = null;
export const whoItsForHero: ImageAsset | null = null;
export const aboutHero: ImageAsset | null = null;

// ── Social / Open Graph ───────────────────────────────────────────────────────

/**
 * Share card image. Currently the home hero, whose 16:9 ratio crops close
 * enough to the 1.91:1 Open Graph frame to hold up. A purpose-cut 1200x630
 * asset belongs in /images/og when one is produced.
 */
export const ogDefault: ImageAsset = homeHero;

// ── Brand marks ───────────────────────────────────────────────────────────────

export const logoWordmarkSvg = "/logos/aso-picture-logo.svg";
export const logoWordmarkPng = "/logos/aso-picture-logo.png";

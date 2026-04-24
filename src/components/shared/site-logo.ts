/** Bump query when replacing public/favicon.png (cache bust for browsers). */
export const SITE_LOGO_SRC = '/favicon.png?v=20260424'

/** Shared <img> classes — adjust here to zoom the mark site-wide. */
export const siteLogoClassName = {
  /** Main nav / bar */
  nav: 'h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16',
  /** Home hero top row */
  masthead: 'h-16 w-16 object-contain sm:h-20 sm:w-20',
  /** Page shell & index hero column */
  hero: 'h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24',
  /** Centered feature (e.g. article) */
  feature: 'mx-auto h-20 w-20 object-contain sm:h-24 sm:w-24',
} as const

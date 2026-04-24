import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press desk & wire copy',
  },
  footer: {
    tagline: 'Distribution and reader-facing updates for Global Pressy without extra chrome.',
  },
  hero: {
    badge: 'Current line',
    title: ['Field notes, media lines, and reader-first updates.'],
    description:
      'Global Pressy is an independent distribution surface for press-style posts: clear layout, quick scanning, and long-form room when a story needs it.',
    primaryCta: {
      label: 'Open the latest',
      href: '/updates',
    },
    secondaryCta: {
      label: 'Reach the desk',
      href: '/contact',
    },
    searchPlaceholder: 'Search the archive',
    focusLabel: 'Latest',
    featureCardBadge: 'desk note',
    featureCardTitle: 'New posts sit on the front with straight hierarchy.',
    featureCardDescription:
      'The home page is built like a feature spread: lead item, index list, and a calmer second band for longer synopses.',
  },
  home: {
    metadata: {
      title: 'Global Pressy — media distribution and updates',
      description:
        'Newsroom-style updates, announcements, and long-form items from Global Pressy in a single, readable archive.',
      openGraphTitle: 'Global Pressy — media distribution and updates',
      openGraphDescription: 'Reader-first updates and press-style posts in a clear archive.',
      keywords: [
        'Global Pressy',
        'press updates',
        'media distribution',
        'editorial',
        'announcements',
      ],
    },
    introBadge: 'Scope',
    introTitle: 'Built for fast scanning and unhurried reading.',
    introParagraphs: [
      'The site keeps one primary stream for wire-style items so visitors always know where the newest material lives.',
      'List pages use an index rhythm; story pages use a calmer feature layout with room for bylines and long copy.',
    ],
    sideBadge: 'Emphasis',
    sidePoints: [
      'A single lead block on the home page with no dependency on stock hero imagery.',
      'Archive and detail views that feel related but are not the same template repeated.',
      'Search and contact stay one click away in the masthead and footer.',
    ],
    primaryLink: {
      label: 'Open archive',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Editorial contact',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Editorial',
    title: 'When you need a calmer place to post than a product landing page.',
    description: 'Use the updates stream for partner lines, field notes, and coverage-style posts.',
    primaryCta: {
      label: 'Contact the desk',
      href: '/contact',
    },
    secondaryCta: {
      label: 'View updates',
      href: '/updates',
    },
  },
  taskSectionHeading: 'Running feed',
  taskSectionDescriptionSuffix: 'Wire copy and field updates',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Updates',
    description: 'Read the latest published lines and field posts.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['Long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and public identities.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Updates',
    paragraphs: [
      'This index lists every item in the distribution stream in reading order, with a compact rail for search and recents.',
      'Open any headline for the full layout, byline, and long-form body when it is available.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}

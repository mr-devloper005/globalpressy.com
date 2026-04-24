import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: 'Strictly necessary',
    body: 'Session and security cookies keep you signed in where authentication is used, protect forms, and remember essential preferences such as light interface mode.',
  },
  {
    title: 'Performance & analytics',
    body: 'We may use limited analytics to see aggregate traffic, referrers, and error rates. These are configured to avoid unnecessary cross-site tracking and to support reliability work.',
  },
  {
    title: 'Your control',
    body: 'You can clear cookies in your browser at any time. Some features may not work until necessary cookies are allowed again. We do not use cookies to show third-party ad profiles on this template.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie policy"
      description="What cookies and similar storage may be used when you use this site, and what you can do about it."
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Last updated · April 2026</p>
      <div className="mt-8 space-y-10">
        {sections.map((section) => (
          <div
            key={section.title}
            className="border-b border-border/80 pb-10 last:border-0 last:pb-0"
          >
            <h2 className="font-display text-xl font-medium tracking-[-0.02em] text-foreground">{section.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-[1.85] text-muted-foreground">{section.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}

import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { SITE_LOGO_SRC, siteLogoClassName } from '@/components/shared/site-logo'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the full post for the complete update.'
  return value.length > 220 ? value.slice(0, 217).trimEnd() + '...' : value
}

function postPath(route: string, slug: string) {
  return `${route.replace(/\/$/, '')}/${slug}`
}

export async function TaskListPageOverride({ task, category: _category }: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts(task, 24, { fresh: true })
  const recent = posts.slice(0, 5)
  const config = getTaskConfig(task)
  const route = config?.route || '/updates'
  const sectionTitle = config?.label || 'Archive'

  return (
    <div className="gp-index-surface min-h-screen text-foreground">
      <NavbarShell />
      <div className="gp-hero-canvas border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            <img
              src={SITE_LOGO_SRC}
              alt=""
              width={96}
              height={96}
              className={`${siteLogoClassName.hero} drop-shadow-[0_2px_12px_rgba(201,163,90,0.25)]`}
            />
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-[var(--gp-fg-muted-on-dark)]">
                {siteContent.taskSectionHeading}
              </p>
              <h1 className="font-display mt-3 text-4xl font-medium tracking-[-0.03em] text-white sm:text-5xl">{sectionTitle}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--gp-fg-muted-on-dark)]">{config?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-14">
          <div>
            {posts.length === 0 ? (
              <p className="text-muted-foreground">No posts in this stream yet.</p>
            ) : (
              <ul className="space-y-0">
                {posts.map((post, i) => (
                  <li key={post.id} className="border-t border-border first:border-0 first:pt-0">
                    <article className="py-10 first:pt-4">
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary">
                        {String((post.content as { category?: string } | null)?.category || 'Update')}
                      </p>
                      <h2 className="font-display mt-2 text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                        <Link
                          href={postPath(route, post.slug)}
                          className="transition hover:text-primary"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <div className="mt-3 flex flex-wrap gap-x-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        <time dateTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}>
                          {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </time>
                        <span>by {post.authorName || 'Editorial desk'}</span>
                        <span className="tabular-nums text-foreground/40">#{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <p className="mt-6 max-w-2xl border-l-2 border-primary/40 pl-4 text-base leading-[1.8] text-foreground/85">
                        {excerpt(post.summary)}
                      </p>
                      <Link
                        href={postPath(route, post.slug)}
                        className="mt-5 inline-block text-sm font-medium uppercase tracking-[0.2em] text-primary underline decoration-primary/40 underline-offset-4 transition hover:decoration-primary"
                      >
                        Continue
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside className="space-y-6 lg:pt-2">
            <div className="border border-border bg-card/90 p-5">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Lookup</p>
              <p className="mt-1 text-sm text-foreground/90">{siteContent.hero.searchPlaceholder}</p>
              <Link
                href="/search"
                className="mt-4 block min-h-11 w-full border border-foreground/15 bg-background px-4 py-2.5 text-center text-sm font-medium text-foreground no-underline transition hover:border-primary/50 hover:text-primary"
              >
                Open search
              </Link>
            </div>
            <div className="border border-border bg-card/90 p-5">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">On deck</p>
              <ul className="mt-3 space-y-3">
                {recent.map((post) => (
                  <li key={post.id} className="text-sm">
                    <Link
                      href={postPath(route, post.slug)}
                      className="leading-relaxed text-foreground/80 transition hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { SITE_LOGO_SRC, siteLogoClassName } from '@/components/shared/site-logo'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function postPath(route: string, slug: string) {
  return `${route.replace(/\/$/, '')}/${slug}`
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const config = getTaskConfig(task)
  const route = config?.route || '/updates'
  const related = (await fetchTaskPosts(task, 8, { fresh: true })).filter((item) => item.slug !== slug).slice(0, 5)
  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', 'Post body will appear here.')
  const published = new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen text-foreground">
      <NavbarShell />
      <section className="gp-hero-canvas border-b border-white/10 px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <img
            src={SITE_LOGO_SRC}
            alt=""
            width={96}
            height={96}
            className={`${siteLogoClassName.feature} opacity-95 drop-shadow-[0_2px_12px_rgba(201,163,90,0.2)]`}
          />
          <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-[var(--gp-fg-muted-on-dark)]">Feature</p>
          <h1 className="font-display mt-4 text-3xl font-medium leading-[1.12] tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-[var(--gp-fg-muted-on-dark)]/95">
            <span>Published in {published}</span>
            <span className="mx-2 opacity-50" aria-hidden>
              ·
            </span>
            <span>by {post.authorName || 'Editorial desk'}</span>
          </p>
          <nav className="mt-8 flex flex-wrap justify-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--gp-fg-muted-on-dark)]" aria-label="Breadcrumb">
            <Link href="/" className="text-white/90 transition hover:text-white">Home</Link>
            <span className="opacity-40" aria-hidden>
              /
            </span>
            <Link href={route} className="text-white/90 transition hover:text-white">{config?.label || 'Archive'}</Link>
            <span className="opacity-40" aria-hidden>
              /
            </span>
            <span className="max-w-[12rem] truncate text-white/60">{post.title}</span>
          </nav>
        </div>
      </section>
      <main className="gp-article-canvas">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16 lg:px-8">
          <article>
            <div className="border-b border-foreground/10 pb-2 text-sm text-muted-foreground">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary">Running copy</p>
            </div>
            <div className="article-content prose prose-lg max-w-none px-0 pt-8 text-foreground/95 prose-p:font-sans prose-p:leading-[1.85] prose-headings:font-display sm:pt-10">
              <RichContent html={html} />
            </div>
            {related.length >= 2 ? (
              <div className="mt-16 grid border border-border md:grid-cols-2">
                {related.slice(0, 2).map((item, index) => (
                  <Link
                    key={item.id}
                    href={postPath(route, item.slug)}
                    className="group border-b border-border p-6 first:border-b md:border-b-0 md:first:border-r"
                  >
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-primary">
                      {index === 0 ? 'From the same stream' : 'Also in this run'}
                    </p>
                    <p className="mt-2 text-base font-medium text-foreground transition group-hover:text-primary">
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
          <aside className="space-y-6 lg:pt-4">
            <div className="border border-border bg-card/90 p-5">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">This edition</p>
              <p className="mt-1 text-sm text-foreground/90">Open search to find other items in this stream.</p>
              <Link
                href="/search"
                className="mt-4 block min-h-11 w-full border border-foreground/12 bg-background px-4 py-2.5 text-center text-sm font-medium text-foreground no-underline transition hover:border-primary/50 hover:text-primary"
              >
                Open search
              </Link>
            </div>
            {related.length ? (
              <div className="border border-border bg-card/90 p-5">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Nearby</p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={postPath(route, item.slug)}
                        className="leading-relaxed transition hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}

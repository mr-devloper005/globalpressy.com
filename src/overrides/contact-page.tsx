import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContactDeskForm } from '@/components/shared/contact-desk-form'
import { siteIdentity } from '@/config/site.identity'
import { SITE_LOGO_SRC, siteLogoClassName } from '@/components/shared/site-logo'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const pressEmail = `press@${siteIdentity.domain}`
const helloEmail = `hello@${siteIdentity.domain}`

export function ContactPageOverride() {
  return (
    <div className="min-h-screen text-foreground">
      <NavbarShell />
      <section className="gp-hero-canvas relative border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(201,163,90,0.12),transparent_55%)]" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
            <div className="flex shrink-0 justify-center sm:justify-start">
              <div className="rounded border border-white/10 bg-white/[0.04] p-2 shadow-[0_0_40px_rgba(201,163,90,0.12)]">
                <img
                  src={SITE_LOGO_SRC}
                  alt=""
                  width={96}
                  height={96}
                  className={`${siteLogoClassName.hero} drop-shadow-[0_2px_14px_rgba(201,163,90,0.3)]`}
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-[#c9a35a]/90">Editorial</p>
              <h1 className="font-display mt-4 text-[1.75rem] font-medium leading-tight tracking-[-0.04em] text-white sm:text-4xl md:text-[2.5rem]">
                Contact the desk
              </h1>
              <div className="mt-5 h-px w-16 bg-gradient-to-r from-[#c9a35a] to-[#c9a35a]/20" aria-hidden />
              <p className="mt-6 max-w-2xl text-sm leading-[1.85] text-[#e8dcc8] sm:text-base">
                Send corrections, partnership and syndication questions, or problems with the public site through the inboxes below. We route
                each line to the right person on the team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="border-b border-[#2a1f16]/10 bg-gradient-to-b from-[#f8f4f1] via-[#faf7f2] to-[#f0e8dd]">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <article className="group border border-[#2a1f16]/8 border-l-[3px] border-l-[#c9a35a] bg-white/95 p-7 shadow-[0_12px_40px_rgba(26,17,15,0.08)] sm:p-8">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-[#8b6914]">Editorial & corrections</p>
              <a
                href={`mailto:${pressEmail}`}
                className="mt-4 block font-display text-xl font-medium text-[#1a1410] underline decoration-[#c9a35a]/50 underline-offset-4 transition hover:decoration-[#c9a35a]"
              >
                {pressEmail}
              </a>
              <p className="mt-4 text-sm leading-[1.8] text-[#4a3f38]">
                Factual errors, byline and date fixes, and urgent takedown or clarification requests. Include the story URL, the headline
                as published, and what should change.
              </p>
            </article>
            <article className="group border border-[#2a1f16]/8 border-l-[3px] border-l-[#c9a35a] bg-white/95 p-7 shadow-[0_12px_40px_rgba(26,17,15,0.08)] sm:p-8">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-[#8b6914]">General & business</p>
              <a
                href={`mailto:${helloEmail}`}
                className="mt-4 block font-display text-xl font-medium text-[#1a1410] underline decoration-[#c9a35a]/50 underline-offset-4 transition hover:decoration-[#c9a35a]"
              >
                {helloEmail}
              </a>
              <p className="mt-4 text-sm leading-[1.8] text-[#4a3f38]">
                Wider business introductions, access or login help that is not tied to a single story, and anything that does not belong on
                the editorial line above.
              </p>
            </article>
          </div>

          <section className="mt-12 sm:mt-16">
            <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-[#1a1410]">Write to the desk</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5c4d42]">
              Use this form for structured requests. For simple one-liners, you can still use the email addresses above.
            </p>
            <div className="mt-6 rounded border border-[#2a1f16]/8 border-t-[3px] border-t-[#c9a35a] bg-white/95 p-6 shadow-[0_12px_40px_rgba(26,17,15,0.08)] sm:p-8">
              <ContactDeskForm />
            </div>
          </section>

          <section className="mt-12 rounded border border-[#2a1f16]/10 bg-[#fffcf7]/80 p-6 sm:mt-14 sm:p-8">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#6b5344]">Before you write</p>
            <p className="mt-2 max-w-2xl text-sm text-[#5c4d42]">
              We read everything; short, specific messages get a faster turn around than long forwards.
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#4a3f38]">
              <li className="flex gap-3 sm:items-start">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a35a]/90" aria-hidden />
                <span>
                  If you can edit the piece in your author dashboard, do that first so the public wire updates without a mail thread.
                </span>
              </li>
              <li className="flex gap-3 sm:items-start">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a35a]/90" aria-hidden />
                <span>
                  Search the archive to see whether the story or correction is already live before you file a duplicate note.
                </span>
              </li>
              <li className="flex gap-3 sm:items-start">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a35a]/90" aria-hidden />
                <span>
                  For common flows and troubleshooting, see{' '}
                  <Link
                    href="/help"
                    className="font-medium text-[#8b6914] underline decoration-[#c9a35a]/60 underline-offset-[5px] transition hover:text-[#1a1410] hover:decoration-[#8b6914]"
                  >
                    Help &amp; reference
                  </Link>{' '}
                  before using the inboxes.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

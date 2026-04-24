import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { SITE_RECIPE } from '@/config/site.recipe'
import { siteContent } from '@/config/site.content'
import { cn } from '@/lib/utils'
import { SITE_LOGO_SRC, siteLogoClassName } from '@/components/shared/site-logo'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  const tasks = SITE_CONFIG.tasks
    .filter((t) => t.enabled)
    .sort((a, b) => {
      if (a.key === SITE_RECIPE.primaryTask) return -1
      if (b.key === SITE_RECIPE.primaryTask) return 1
      return 0
    })

  return (
    <footer className="border-t border-[#2a1f16]/30 bg-gradient-to-b from-[#1a1410] to-[#0f0c0a] text-[#c4b4a0]">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <div className="flex items-start gap-4">
            <img
              src={SITE_LOGO_SRC}
              alt=""
              width={80}
              height={80}
              className={`${siteLogoClassName.masthead} shrink-0 opacity-95`}
            />
            <div>
          <p className="font-display text-2xl font-medium tracking-[-0.02em] text-[#f3e9db]">{SITE_CONFIG.name}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#8a7a6a]">{siteContent.footer.tagline}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.35em] text-[#6a5a4a]">Masthead · {SITE_CONFIG.domain}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#6a5a4a]">Dispatch</p>
          <ul className="mt-4 space-y-2 text-sm">
            {tasks.map((t) => (
              <li key={t.key}>
                <Link
                  href={t.route}
                  className={cn(
                    'text-[#b0a090] transition hover:text-[#f0e0d0]',
                    t.key === SITE_RECIPE.primaryTask && 'text-[#e8c97a]/95',
                  )}
                >
                  {t.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/search" className="text-[#7a6a5a] transition hover:text-[#d4c4b0]">Search the archive</Link>
            </li>
            <li>
              <Link href="/contact" className="text-[#7a6a5a] transition hover:text-[#d4c4b0]">Editorial contact</Link>
            </li>
            <li>
              <Link href="/privacy" className="text-[#5a4a3a] transition hover:text-[#9a8a7a]">Privacy</Link>
            </li>
            <li>
              <Link href="/terms" className="text-[#5a4a3a] transition hover:text-[#9a8a7a]">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-[#5a4a3a]">
        &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}

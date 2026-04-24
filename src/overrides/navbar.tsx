'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { SITE_RECIPE } from '@/config/site.recipe'
import { siteContent } from '@/config/site.content'
import { cn } from '@/lib/utils'
import { SITE_LOGO_SRC, siteLogoClassName } from '@/components/shared/site-logo'

export const NAVBAR_OVERRIDE_ENABLED = true

const secondaryNav = [{ label: 'Contact', href: '/contact' }]

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navTasks = useMemo(() => {
    const enabled = SITE_CONFIG.tasks.filter((t) => t.enabled)
    const p = SITE_RECIPE.primaryTask
    return [...enabled.filter((t) => t.key === p), ...enabled.filter((t) => t.key !== p)]
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2a2218]/25 bg-[#1a1410]/92 text-[#f3e9db] shadow-[0_1px_0_rgba(201,163,90,0.12)] backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-[#a89888] transition hover:text-[#f3e9db] sm:text-[0.65rem]"
        >
          {SITE_CONFIG.domain}
        </Link>
        <p className="hidden text-[0.6rem] uppercase tracking-[0.32em] text-[#7a6a5a] sm:block lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          {siteContent.navbar.tagline}
        </p>
        <div className="w-8 sm:w-12" aria-hidden />
      </div>

      <nav className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 text-white"
        >
          <img
            src={SITE_LOGO_SRC}
            alt=""
            width={64}
            height={64}
            className={siteLogoClassName.nav}
          />
          <span className="font-display truncate text-lg font-medium tracking-[-0.04em] sm:text-xl">
            {SITE_CONFIG.name}
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navTasks.map((task) => {
            const active = pathname === task.route || pathname.startsWith(`${task.route}/`)
            return (
              <Link
                key={task.key}
                href={task.route}
                className={cn(
                  'px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] transition',
                  active
                    ? 'text-[#e8c97a]'
                    : 'text-[#b5a08e] hover:text-[#f3e9db]',
                )}
              >
                {task.label}
              </Link>
            )
          })}
          <span className="mx-1 h-4 w-px bg-[#4a3f34]/80" aria-hidden />
          {secondaryNav.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-2.5 py-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] transition',
                  active ? 'text-white' : 'text-[#8a7a6a] hover:text-[#d4c4b0]',
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/search"
            className="ml-1 flex h-9 w-9 items-center justify-center text-[#b5a08e] transition hover:text-white"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-[#d4c4b0] lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[#3a3228]/60 bg-[#14100c] px-4 py-4 lg:hidden">
          <ul className="space-y-1">
            {navTasks.map((task) => {
              const active = pathname === task.route || pathname.startsWith(`${task.route}/`)
              return (
                <li key={task.key}>
                  <Link
                    href={task.route}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-sm px-3 py-3 text-sm font-medium uppercase tracking-[0.12em]',
                      active ? 'bg-white/8 text-[#e8c97a]' : 'text-[#c4b4a2]',
                    )}
                  >
                    {task.label}
                  </Link>
                </li>
              )
            })}
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-3 py-2.5 text-sm text-[#9a8a7a] hover:text-[#e0d0c0]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#9a8a7a]"
              >
                <Search className="h-4 w-4" />
                Search
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}

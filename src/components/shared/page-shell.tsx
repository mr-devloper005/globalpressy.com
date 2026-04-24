'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_LOGO_SRC, siteLogoClassName } from '@/components/shared/site-logo'

export function PageShell({
  title,
  description,
  eyebrow,
  actions,
  children,
}: {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen text-foreground">
      <NavbarShell />
      <main>
        <section className="gp-hero-canvas border-b border-white/10">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
              <div className="shrink-0">
                <img
                  src={SITE_LOGO_SRC}
                  alt=""
                  width={96}
                  height={96}
                  className={`${siteLogoClassName.hero} drop-shadow-[0_2px_12px_rgba(201,163,90,0.25)]`}
                />
              </div>
              <div className="min-w-0 flex-1">
                {eyebrow ? (
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-[var(--gp-fg-muted-on-dark)]">
                    {eyebrow}
                  </p>
                ) : null}
                <h1 className="font-display text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl md:text-[2.35rem]">
                  {title}
                </h1>
                {description ? (
                  <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-[var(--gp-fg-muted-on-dark)] sm:text-[0.95rem]">
                    {description}
                  </p>
                ) : null}
                {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
              </div>
            </div>
          </div>
        </section>
        <section className="border-b border-[#2a1f16]/8 bg-gradient-to-b from-background via-[#faf6ef] to-[#f0e8dd]/90">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

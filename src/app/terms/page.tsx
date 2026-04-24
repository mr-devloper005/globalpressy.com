import { PageShell } from "@/components/shared/page-shell"
import { SITE_CONFIG } from "@/lib/site-config"

const sections = [
  {
    title: "Using the service",
    body: `By accessing ${SITE_CONFIG.name} you agree to use the platform lawfully, respect intellectual property, and not attempt to disrupt the service, scrape it in ways that harm performance, or probe for vulnerabilities beyond good-faith disclosure.`,
  },
  {
    title: "Content & distribution",
    body: "You retain rights to material you are entitled to publish. You grant the site a licence to host, display, and distribute that content in line with the product’s features. You are responsible for accuracy and for any claims arising from what you post.",
  },
  {
    title: "Accounts & security",
    body: "Keep credentials confidential. We may suspend or close accounts that violate these terms, pose security risk, or receive valid legal process requiring action.",
  },
  {
    title: "Disclaimers",
    body: "The service is provided as available. To the extent permitted by law, we limit liability for indirect or consequential loss. Nothing here limits rights that cannot be limited by contract in your jurisdiction.",
  },
]

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of use"
      description={`Rules and expectations for reading and publishing on ${SITE_CONFIG.name}.`}
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

import { PageShell } from '@/components/shared/page-shell'

const licenses = [
  { name: 'Next.js', description: 'MIT License — application framework' },
  { name: 'React', description: 'MIT License — UI layer' },
  { name: 'Tailwind CSS', description: 'MIT License — utility styling' },
  { name: 'Radix UI', description: 'MIT License — accessible primitives' },
  { name: 'Lucide', description: 'ISC License — icon set' },
]

export default function LicensesPage() {
  return (
    <PageShell
      eyebrow="Open source"
      title="Licences & credits"
      description="Key open-source components used to build and ship this site. Full dependency trees live in the project lockfile and package manifest."
    >
      <ul className="divide-y divide-border/80 border border-border/60 bg-card/50">
        {licenses.map((license) => (
          <li key={license.name} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <span className="font-medium text-foreground">{license.name}</span>
            <span className="text-sm text-muted-foreground">{license.description}</span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        This list is representative, not exhaustive. If you need a full attribution bundle for compliance, generate it from the repository’s dependency graph.
      </p>
    </PageShell>
  )
}

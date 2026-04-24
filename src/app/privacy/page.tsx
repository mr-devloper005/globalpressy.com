import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: 'What we collect',
    body: 'We may process account details (email, display name), content you submit for distribution, basic technical logs (IP region, browser class), and feedback you send through contact forms. We do not sell personal data as a product.',
  },
  {
    title: 'How we use it',
    body: 'Data is used to run the site, deliver published material, prevent abuse, and improve reliability. Aggregated, non-identifying statistics may be used to understand which sections readers open most often.',
  },
  {
    title: 'Retention & your choices',
    body: 'Published items stay visible according to your publishing settings. You can request export or deletion of account-held data where the law allows. Marketing email is opt-in only; service messages about your account may still be sent when required.',
  },
  {
    title: 'Contact',
    body: 'For privacy questions or data requests, use the contact page and mark the subject “Privacy”. We respond on a best-effort basis and may need to verify your identity before processing certain requests.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy policy"
      description="How information is handled on this distribution site: collection, use, and the choices available to you."
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

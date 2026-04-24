import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Publishing a line',
    description: 'How items move from draft to the public wire, and what metadata travels with each post.',
  },
  {
    title: 'Search & archive',
    description: 'Using lookup to jump across tasks, and how results stay tied to the same feed rules as the home page.',
  },
  {
    title: 'Account & desk access',
    description: 'Sign-in, roles, and where to go when you need a correction or retraction filed.',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      eyebrow="Reader tools"
      title="Help & reference"
      description="Short guides for scanning the archive, understanding the wire, and reaching the editorial desk when something breaks."
      actions={
        <Button
          asChild
          className="border-0 bg-[#c9a35a] px-6 text-[#1a120c] hover:bg-[#b8934e]"
        >
          <Link href="/contact">Write the desk</Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          {topics.map((topic) => (
            <Card
              key={topic.title}
              className="border-[#2a1f16]/12 bg-[#fffcf7] shadow-[0_6px_24px_rgba(20,10,5,0.05)] transition-transform hover:-translate-y-0.5"
            >
              <CardContent className="p-5 sm:p-6">
                <h2 className="font-display text-lg font-medium text-foreground">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-[#2a1f16]/12 bg-card/90">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-medium text-foreground">Common questions</h3>
            <Accordion type="single" collapsible className="mt-4">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-border/60">
                  <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}

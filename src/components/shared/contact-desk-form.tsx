'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactDeskForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage('')
    setState('submitting')
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      topic: String(fd.get('topic') || 'other'),
      subject: String(fd.get('subject') || ''),
      message: String(fd.get('message') || ''),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          topic: ['editorial', 'general', 'other'].includes(payload.topic) ? payload.topic : 'other',
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setState('error')
        return
      }
      setState('success')
      form.reset()
    } catch {
      setErrorMessage('Network error. Check your connection and try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div
        className="rounded border border-[#2a1f16]/10 border-l-[3px] border-l-[#c9a35a] bg-white/95 p-7 shadow-[0_8px_32px_rgba(26,17,15,0.06)] sm:p-8"
        role="status"
      >
        <p className="font-display text-lg font-medium text-[#1a1410]">Message received</p>
        <p className="mt-2 text-sm leading-relaxed text-[#4a3f38]">
          Thank you. If a reply is needed, someone on the desk will get back to you at the address you provided.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-5 border-[#2a1f16]/20 bg-white text-[#1a1410] hover:bg-[#faf7f2]"
          onClick={() => setState('idle')}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#6b5344]">
            Name
          </Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="h-11 border-[#2a1f16]/15 bg-white"
            placeholder="Your name"
            disabled={state === 'submitting'}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email" className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#6b5344]">
            Email
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11 border-[#2a1f16]/15 bg-white"
            placeholder="you@example.com"
            disabled={state === 'submitting'}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-topic" className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#6b5344]">
          Topic
        </Label>
        <select
          id="contact-topic"
          name="topic"
          required
          disabled={state === 'submitting'}
          className={cn(
            'flex h-11 w-full rounded-md border border-[#2a1f16]/15 bg-white px-3 text-sm text-foreground shadow-xs outline-none',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          <option value="editorial">Editorial & corrections</option>
          <option value="general">General & business</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject" className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#6b5344]">
          Subject <span className="font-normal normal-case tracking-normal text-[#8a7a6a]">(optional)</span>
        </Label>
        <Input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={200}
          className="h-11 border-[#2a1f16]/15 bg-white"
          placeholder="Short line for the inbox"
          disabled={state === 'submitting'}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#6b5344]">
          Message
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          minLength={20}
          className="min-h-36 border-[#2a1f16]/15 bg-white"
          placeholder="Context, links, and what you need from the desk."
          disabled={state === 'submitting'}
        />
        <p className="text-xs text-[#6b5c50]">At least 20 characters so we can route it properly.</p>
      </div>

      {errorMessage ? (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="pt-1">
        <Button
          type="submit"
          disabled={state === 'submitting'}
          className="h-12 min-w-[8rem] gap-2 border-0 bg-[#c9a35a] px-8 text-[#1a120c] hover:bg-[#b8934e] disabled:opacity-70"
        >
          {state === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            'Send message'
          )}
        </Button>
      </div>
    </form>
  )
}

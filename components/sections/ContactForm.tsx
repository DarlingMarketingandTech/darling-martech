'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please say a bit more (10+ characters)'),
})

type FormData = z.infer<typeof schema>

const serviceOptions = [
  { value: '', label: 'What do you need help with?' },
  { value: 'Marketing Strategy & Consulting', label: 'Marketing Strategy & Consulting' },
  { value: 'Web & App Development', label: 'Web & App Development' },
  { value: 'Tech Implementation', label: 'Tech Implementation' },
  { value: 'SEO & Digital Marketing', label: 'SEO & Digital Marketing' },
  { value: "Not sure yet — let's talk", label: "Not sure yet — let's talk" },
]

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-16 px-10 border border-white/8 bg-white/[0.02]">
        <div className="w-8 h-px bg-electric-orange mb-6" />
        <p className="font-display font-bold text-2xl text-warm-off-white mb-3">
          Got it.
        </p>
        <p className="text-mid-gray font-body">
          I&apos;ll be in touch within 1 business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          {...register('name')}
          className={cn(errors.name && 'border-red-500/50')}
        />
        {errors.name && <p className="text-xs text-red-400 font-body">{errors.name.message}</p>}
      </div>

      {/* Company */}
      <div className="space-y-1.5">
        <Label htmlFor="company">Company <span className="text-mid-gray/50">(optional)</span></Label>
        <Input
          id="company"
          placeholder="Your company"
          {...register('company')}
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@company.com"
          {...register('email')}
          className={cn(errors.email && 'border-red-500/50')}
        />
        {errors.email && <p className="text-xs text-red-400 font-body">{errors.email.message}</p>}
      </div>

      {/* Service */}
      <div className="space-y-1.5">
        <Label htmlFor="service">Service</Label>
        <select
          id="service"
          {...register('service')}
          className={cn(
            'flex w-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-body',
            'focus:outline-none focus:border-electric-orange/60 transition-colors',
            'text-mid-gray appearance-none',
            errors.service && 'border-red-500/50'
          )}
        >
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-obsidian text-warm-off-white">
              {opt.label}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-xs text-red-400 font-body">{errors.service.message}</p>}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell me what you're working on..."
          {...register('message')}
          className={cn(errors.message && 'border-red-500/50')}
        />
        {errors.message && <p className="text-xs text-red-400 font-body">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2 font-body font-medium text-sm bg-electric-orange text-warm-off-white px-8 py-4 hover:bg-electric-orange/90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group"
        >
          {status === 'loading' ? 'Sending...' : <>Send it <span className="transition-transform duration-200 group-hover:translate-x-1">→</span></>}
        </button>

        {status === 'error' && (
          <p className="mt-3 text-sm text-red-400 font-body">
            Something went wrong. Please email me directly at{' '}
            <a href="mailto:jacob@jacobdarling.com" className="underline">
              jacob@jacobdarling.com
            </a>
          </p>
        )}
      </div>
    </form>
  )
}

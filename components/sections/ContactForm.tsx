'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { contactServiceOptions } from '@/data/services'
import styles from './ContactForm.module.css'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please say a bit more (10+ characters)'),
})

type FormData = z.infer<typeof schema>

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
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successBox}>
        <div className={styles.successLine} />
        <p className={styles.successTitle}>Got it.</p>
        <p className={styles.successBody}>I&apos;ll be in touch within 1 business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      {/* Name */}
      <div className={styles.field}>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          {...register('name')}
          data-error={!!errors.name}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      {/* Company */}
      <div className={styles.field}>
        <Label htmlFor="company">
          Company <span className={styles.optional}>(optional)</span>
        </Label>
        <Input id="company" placeholder="Your company" {...register('company')} />
      </div>

      {/* Email */}
      <div className={styles.field}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@company.com"
          {...register('email')}
          data-error={!!errors.email}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      {/* Service */}
      <div className={styles.field}>
        <Label htmlFor="service">Service</Label>
        <select
          id="service"
          {...register('service')}
          className={`${styles.select} ${errors.service ? styles.selectError : ''}`}
        >
          {contactServiceOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className={styles.option}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.service && <p className={styles.error}>{errors.service.message}</p>}
      </div>

      {/* Message */}
      <div className={styles.field}>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell me what you're working on..."
          {...register('message')}
          data-error={!!errors.message}
        />
        {errors.message && <p className={styles.error}>{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <div className={styles.submitRow}>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={styles.submitBtn}
        >
          {status === 'loading' ? 'Sending...' : (
            <>Send it <span className={styles.arrow}>→</span></>
          )}
        </button>

        {status === 'error' && (
          <p className={styles.submitError}>
            Something went wrong. Email me directly at{' '}
            <a href="mailto:jacob@jacobdarling.com" className={styles.emailLink}>
              jacob@jacobdarling.com
            </a>
          </p>
        )}
      </div>
    </form>
  )
}

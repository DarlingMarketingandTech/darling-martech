'use client'

import { useState } from 'react'
import styles from './geo-auditor.module.css'

export default function EmailGate({ auditData }: { auditData: any }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch('/api/geo-auditor/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, auditData }),
    })

    const data = await res.json()
    if (data.success) setSuccess(true)
  }

  if (success)
    return <p>Report sent successfully.</p>

  return (
    <form onSubmit={handleSubmit} className={styles.grid}>
      <input
        className={styles.input}
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className={styles.buttonPrimary}>
        Unlock Full Report
      </button>
    </form>
  )
}

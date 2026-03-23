import * as React from 'react'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={className}
        ref={ref}
        style={{
          display: 'flex',
          minHeight: '140px',
          width: '100%',
          border: '1px solid var(--color-border)',
          background: 'rgba(245, 240, 232, 0.03)',
          padding: '0.75rem 1rem',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          resize: 'none',
          outline: 'none',
          boxSizing: 'border-box',
        }}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }

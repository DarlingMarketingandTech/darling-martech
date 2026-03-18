import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-warm-off-white placeholder:text-mid-gray/60 font-body',
        'focus:outline-none focus:border-electric-orange/60 focus:bg-white/8 transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }

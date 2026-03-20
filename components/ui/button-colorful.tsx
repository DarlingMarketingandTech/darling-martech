'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "@phosphor-icons/react"

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

export function ButtonColorful({
  className,
  label = "Explore Components",
  ...props
}: ButtonColorfulProps) {
  return (
    <Button
      className={cn(
        "relative h-10 px-4 overflow-hidden group",
        "border border-[var(--color-border)] hover:border-[var(--color-border-accent)]",
        "transition-colors",
        className
      )}
      style={{ background: 'var(--color-surface)' }}
      {...props}
    >
      {/* Directional fill from left */}
      <span
        className="absolute inset-0 w-0 group-hover:w-full transition-all duration-300 origin-left"
        style={{ background: 'var(--color-accent)' }}
        aria-hidden
      />

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2" style={{ color: 'var(--color-text)' }}>
        <span>{label}</span>
        <ArrowUpRight size={14} weight="light" />
      </span>
    </Button>
  )
}


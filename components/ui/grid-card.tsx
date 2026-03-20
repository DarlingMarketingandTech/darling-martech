import React from 'react'
import { cn } from '@/lib/utils'
import { GridPattern } from '@/components/ui/grid-pattern'

export function GridCard({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'group relative isolate z-0 flex h-full flex-col justify-between overflow-hidden rounded-none border px-5 py-4',
        className,
      )}
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        transition: 'border-color 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
      }}
      {...props}
    >
      <div className="absolute inset-0">
        <div className="absolute -inset-[25%] -skew-y-12 [mask-image:linear-gradient(225deg,black,transparent)]">
          <GridPattern
            width={30}
            height={30}
            x={0}
            y={0}
            squares={getRandomPattern(5)}
            className="fill-border/50 stroke-border absolute inset-0 size-full translate-y-2 transition-transform duration-150 ease-out group-hover:translate-y-0"
          />
        </div>
        {/* Brand accent glow — electric orange, not purple */}
        <div
          className="absolute -inset-[10%] opacity-0 blur-[50px] group-hover:opacity-10 transition-opacity duration-150"
          style={{
            background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          }}
        />
      </div>
      {children}
    </div>
  )
}

function getRandomPattern(length = 5): [x: number, y: number][] {
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ])
}

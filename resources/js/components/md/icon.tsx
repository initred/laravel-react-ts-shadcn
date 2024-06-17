import clsx from 'clsx'
import { ComponentPropsWithoutRef, useId } from 'react'
import { Installation } from '@/components/md/icons/installation.tsx'
import { Lightbulb } from '@/components/md/icons/lightbulb.tsx'
import { Plugins } from '@/components/md/icons/plugins.tsx'
import { Presets } from '@/components/md/icons/presets.tsx'
import { Theming } from '@/components/md/icons/theming.tsx'
import { Warning } from '@/components/md/icons/warning.tsx'

const icons = {
  installation: Installation,
  presets: Presets,
  plugins: Plugins,
  theming: Theming,
  lightbulb: Lightbulb,
  warning: Warning,
}

const iconStyles = {
  blue: '[--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]',
  amber: '[--icon-foreground:theme(colors.amber.900)] [--icon-background:theme(colors.amber.100)]',
}

export function Icon({
  icon,
  color = 'blue',
  className,
  ...props
}: {
  color?: keyof typeof iconStyles
  icon: keyof typeof icons
} & Omit<ComponentPropsWithoutRef<'svg'>, 'color'>) {
  const id = useId()
  const IconComponent = icons[icon]

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={clsx(className, iconStyles[color])}
      {...props}
    >
      <IconComponent id={id} color={color} />
    </svg>
  )
}

const gradients = {
  blue: [
    { stopColor: '#0EA5E9' },
    { stopColor: '#22D3EE', offset: '.527' },
    { stopColor: '#818CF8', offset: 1 },
  ],
  amber: [
    { stopColor: '#FDE68A', offset: '.08' },
    { stopColor: '#F59E0B', offset: '.837' },
  ],
}

export function Gradient({
  color = 'blue',
  ...props
}: {
  color?: keyof typeof gradients
} & Omit<ComponentPropsWithoutRef<'radialGradient'>, 'color'>) {
  return (
    <radialGradient cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" {...props}>
      {gradients[color].map((stop, stopIndex) => (
        <stop key={stopIndex} {...stop} />
      ))}
    </radialGradient>
  )
}

export function LightMode({ className, ...props }: ComponentPropsWithoutRef<'g'>) {
  return <g className={clsx('dark:hidden', className)} {...props} />
}

export function DarkMode({ className, ...props }: ComponentPropsWithoutRef<'g'>) {
  return <g className={clsx('hidden dark:inline', className)} {...props} />
}

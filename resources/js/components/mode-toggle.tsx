import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import IconLucideMoon from '~icons/lucide/moon'
import IconLucideSun from '~icons/lucide/sun'
import { PropsWithChildren } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/theme-provider'

export function ModeToggle({
  className,
  children,
  ...props
}: PropsWithChildren<DropdownMenuContentProps>) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline" size="icon" className={className}>
            <IconLucideSun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <IconLucideMoon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent {...props}>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

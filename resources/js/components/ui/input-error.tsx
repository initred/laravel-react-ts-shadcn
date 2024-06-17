import React from 'react'
import { cn } from '@/lib/utils.ts'

interface InputErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  value?: string
  className?: string
}

const InputError: React.FC<InputErrorProps> = ({ value, className, ...props }) => {
  return (
    value && (
      <p {...props} className={cn('text-destructive text-sm', className)}>
        {value}
      </p>
    )
  )
}

export default InputError

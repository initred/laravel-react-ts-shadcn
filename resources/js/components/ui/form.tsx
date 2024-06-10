// @ts-ignore
import { InertiaFormProps } from "@inertiajs/react/types/useForm"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { createContext, ReactElement, useContext } from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

type FormContextType = InertiaFormProps<Record<string, any>>

const FormContext = createContext<InertiaFormProps<FormContextType> | null>(
  null
)

const Form = ({
  form,
  children,
}: {
  form: FormContextType
  children: React.ReactNode
}) => {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>
}
Form.displayName = "Form"

interface FormFieldContextValue {
  name: string
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null)

interface FormFieldProps {
  name: string
  render: (props: { field: any }) => ReactElement
}

const FormField = ({ name, render, ...props }: FormFieldProps) => {
  const form = useContext(FormContext)

  if (!form) {
    throw new Error("FormField must be used within a Form component")
  }

  const fieldProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      form.setData(name, e.target.value),
    value: form.data[name] || "",
    error: form.errors[name],
    ...props,
  }

  return (
    <FormFieldContext.Provider value={{ name }}>
      {render({ field: fieldProps })}
    </FormFieldContext.Provider>
  )
}
FormField.displayName = "FormField"

const getFieldState = (name: string, form: FormContextType) => {
  return {
    value: form.data[name],
    error: form.errors[name],
  }
}

const useFormField = () => {
  const form = useContext(FormContext)
  const itemContext = React.useContext(FormItemContext)
  const fieldContext = useContext(FormFieldContext)

  if (!form || !fieldContext) {
    throw new Error("useFormField must be used within a Form component")
  }

  const fieldState = getFieldState(fieldContext.name, form)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-danger-500 dark:text-danger-900", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(
        "text-sm text-neutral-500 dark:text-neutral-400",
        className
      )}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()

  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        "text-sm font-medium text-danger-500 dark:text-danger-900",
        className
      )}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
}

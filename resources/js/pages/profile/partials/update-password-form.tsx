import { Lang } from "@/types"
import { Icon } from "@iconify/react"
import { useForm } from "@inertiajs/react"
import type { FormEventHandler } from "react"
import { useRef } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"

export default function UpdatePasswordForm({
  className = "",
  lang,
}: {
  className?: string
  lang: Lang
}) {
  const passwordInput = useRef<HTMLInputElement>(null)
  const currentPasswordInput = useRef<HTMLInputElement>(null)

  const form = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  })

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault()

    form.put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => form.reset(),
      onError: (errors) => {
        if (errors.password) {
          form.reset("password", "password_confirmation")
          passwordInput.current?.focus()
        }

        if (errors.current_password) {
          form.reset("current_password")
          currentPasswordInput.current?.focus()
        }
      },
    })
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{lang["update_password"]}</CardTitle>
        <CardDescription>{lang["update_password_description"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form}>
          <form onSubmit={updatePassword} className="space-y-6">
            {form.recentlySuccessful && (
              <Alert>
                <AlertTitle>{lang["notification"]}</AlertTitle>
                <AlertDescription>{lang["saved"]}</AlertDescription>
              </Alert>
            )}
            <FormField
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{lang["current_password"]}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{lang["new_password"]}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{lang["confirm_password"]}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.processing}>
              {form.processing && (
                <Icon
                  icon="lucide:loader-2"
                  className="mr-2 size-4 animate-spin"
                />
              )}
              <span>{lang["save"]}</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

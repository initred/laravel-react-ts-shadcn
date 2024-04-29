import { Lang } from "@/types"
import { Link, useForm } from "@inertiajs/react"
import { Loader2 } from "lucide-react"
import { FormEventHandler, useEffect } from "react"
import AuthLayout from "@/layouts/auth-layout.tsx"
import CoreLayout from "@/layouts/core-layout.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardFooter,
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

export default function Register({ lang }: { lang: Lang }) {
  const title = lang["register"]
  const form = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  useEffect(() => {
    return () => {
      form.reset("password", "password_confirmation")
    }
  }, [])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    form.post(route("register"))
  }

  return (
    <CoreLayout title={title}>
      <AuthLayout>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form form={form}>
              <form onSubmit={submit} className="space-y-6">
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lang["name"]}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          autoComplete="name"
                          autoFocus
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lang["email"]}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="username"
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
                      <FormLabel>{lang["password"]}</FormLabel>
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
                      <FormLabel>{lang["password_confirmation"]}</FormLabel>
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.processing}
                >
                  {form.processing && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  <span>{lang["register"]}</span>
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <Button type="button" variant="link" asChild>
              <Link href={route("login")}>{lang["already_registered"]}</Link>
            </Button>
          </CardFooter>
        </Card>
      </AuthLayout>
    </CoreLayout>
  )
}

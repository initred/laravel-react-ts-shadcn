import type { Lang, PageProps } from "@/types"
import { Link, useForm, usePage } from "@inertiajs/react"
import type { FormEventHandler } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
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

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
  lang,
}: {
  mustVerifyEmail: boolean
  status?: string
  className?: string
  lang: Lang
}) {
  const user = usePage<PageProps>().props.auth.user

  const form = useForm({
    name: user.name,
    email: user.email,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    form.patch(route("profile.update"))
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{lang["profile_information"]}</CardTitle>
        <CardDescription>
          {lang["profile_information_description"]}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form}>
          <form onSubmit={submit} className="space-y-6">
            {form.recentlySuccessful && (
              <Alert className="w-full">
                <AlertTitle>{lang["notification"]}</AlertTitle>
                <AlertDescription>{lang["saved"]}</AlertDescription>
              </Alert>
            )}
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{lang["name"]}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoFocus
                      autoComplete="name"
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
            <Button disabled={form.processing}>{lang["save"]}</Button>
          </form>
        </Form>
      </CardContent>

      {mustVerifyEmail && user.email_verified_at === null && (
        <CardFooter>
          <div className="flex w-full flex-col">
            <p>
              <span>{lang["email_unverified"]}</span>
              <Button type="button" className="inline" variant="link" asChild>
                <Link
                  href={route("verification.send")}
                  method="post"
                  as="button"
                  className="underline"
                >
                  {lang["resend_verification_email"]}
                </Link>
              </Button>
            </p>

            {status === "verification-link-sent" && (
              <Alert>
                <AlertTitle>{lang["notification"]}</AlertTitle>
                <AlertDescription>
                  {lang["resend_verification_email_sent"]}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

import { Lang } from '@/types'
import { useForm } from '@inertiajs/react'
import IconLucideLoaderTwo from '~icons/lucide/loader-2'
import { FormEventHandler } from 'react'
import AuthLayout from '@/layouts/auth-layout.tsx'
import CoreLayout from '@/layouts/core-layout.tsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'

export default function ForgotPassword({ status, lang }: { status?: string; lang: Lang }) {
  const title = lang['forgot_your_password']
  const form = useForm({
    email: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    form.post(route('password.email'))
  }

  return (
    <CoreLayout title={title}>
      <AuthLayout>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{lang['forgot_your_password_description']}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form form={form}>
              <form onSubmit={submit} className="space-y-6">
                {status && (
                  <Alert>
                    <AlertTitle>Notification</AlertTitle>
                    <AlertDescription>{status}</AlertDescription>
                  </Alert>
                )}
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lang['email']}</FormLabel>
                      <FormControl>
                        <Input type="email" autoComplete="email" autoFocus {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.processing}>
                  {form.processing && <IconLucideLoaderTwo className="mr-2 size-4 animate-spin" />}
                  <span>{lang['email_password_reset_link']}</span>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </AuthLayout>
    </CoreLayout>
  )
}

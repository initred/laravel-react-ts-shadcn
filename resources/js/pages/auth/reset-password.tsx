import { Lang } from '@/types'
import { useForm } from '@inertiajs/react'
import IconLucideLoaderTwo from '~icons/lucide/loader-2'
import { FormEventHandler, useEffect } from 'react'
import AuthLayout from '@/layouts/auth-layout.tsx'
import CoreLayout from '@/layouts/core-layout.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'

export default function ResetPassword({
  token,
  email,
  lang,
}: {
  token: string
  email: string
  lang: Lang
}) {
  const title = lang['reset_password']
  const form = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  })

  useEffect(() => {
    return () => {
      form.reset('password', 'password_confirmation')
    }
  }, [])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    form.post(route('password.store'))
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
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lang['password']}</FormLabel>
                      <FormControl>
                        <Input type="password" autoComplete="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lang['password_confirmation']}</FormLabel>
                      <FormControl>
                        <Input type="password" autoComplete="new-password" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.processing}>
                  {form.processing && <IconLucideLoaderTwo className="mr-2 size-4 animate-spin" />}
                  <span>{lang['reset_password']}</span>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </AuthLayout>
    </CoreLayout>
  )
}

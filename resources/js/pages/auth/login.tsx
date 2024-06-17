import { Lang } from '@/types'
import { Icon } from '@iconify/react'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect } from 'react'
import AuthLayout from '@/layouts/auth-layout.tsx'
import CoreLayout from '@/layouts/core-layout.tsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'

export default function Login({
  status,
  canResetPassword,
  lang,
}: {
  status?: string
  canResetPassword: boolean
  lang: Lang
}) {
  const form = useForm({
    email: '',
    password: '',
    remember: false,
  })

  useEffect(() => {
    return () => {
      form.reset('password')
    }
  }, [])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    form.post(route('login'))
  }

  return (
    <CoreLayout title="Log In">
      <AuthLayout>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{lang['login']}</CardTitle>
          </CardHeader>

          <CardContent>
            <Form form={form}>
              <form onSubmit={submit} className="space-y-6">
                {status && (
                  <Alert>
                    <AlertTitle>Notification</AlertTitle>
                    <AlertDescription>
                      <p>{status}</p>
                    </AlertDescription>
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
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex !space-y-0">
                      <div className="flex items-center">
                        <FormControl>
                          <Checkbox {...field} />
                        </FormControl>
                        <FormLabel className="ml-2">{lang['remember']}</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.processing}>
                  {form.processing && (
                    <Icon icon="lucide:loader-2" className="mr-2 size-4 animate-spin" />
                  )}
                  <span>{lang['login']}</span>
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            {canResetPassword && (
              <Button type="button" variant="link" asChild>
                <Link href={route('password.request')}>{lang['forgot_password']}</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </AuthLayout>
    </CoreLayout>
  )
}

import { Lang } from '@/types'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import AuthLayout from '@/layouts/auth-layout.tsx'
import CoreLayout from '@/layouts/core-layout.tsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Form } from '@/components/ui/form.tsx'

export default function VerifyEmail({ status, lang }: { status?: string; lang: Lang }) {
  const title = lang['verify_email_address']
  const form = useForm({})

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    form.post(route('verification.send'))
  }

  return (
    <CoreLayout title={title}>
      <AuthLayout>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{lang['thank_you_verify_email']}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form form={form}>
              <form onSubmit={submit} className="space-y-6">
                {status === 'verification-link-sent' && (
                  <Alert>
                    <AlertTitle>{lang['notification']}</AlertTitle>
                    <AlertDescription>{lang['new_verification_email_send']}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Button className="w-full" type="submit" disabled={form.processing}>
                    {lang['resend_verification_email']}
                  </Button>

                  <Button type="button" className="w-full" variant="secondary" asChild>
                    <Link href={route('logout')} method="post" as="button">
                      {lang['logout']}
                    </Link>
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </AuthLayout>
    </CoreLayout>
  )
}

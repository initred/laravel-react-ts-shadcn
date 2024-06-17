import { useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect } from 'react'
import AuthLayout from '@/layouts/auth-layout.tsx'
import CoreLayout from '@/layouts/core-layout.tsx'
import { Button } from '@/components/ui/button.tsx'
import InputError from '@/components/ui/input-error.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('password.confirm'))
  }

  return (
    <CoreLayout title="Confirm Password">
      <AuthLayout>
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          This is a secure area of the application. Please confirm your password before continuing.
        </div>

        <form onSubmit={submit}>
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoFocus
              onChange={(e) => setData('password', e.target.value)}
            />

            <InputError className="mt-2" value={errors.password} />
          </div>

          <div className="mt-4 flex items-center justify-end">
            <Button disabled={processing}>Confirm</Button>
          </div>
        </form>
      </AuthLayout>
    </CoreLayout>
  )
}

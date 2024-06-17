import { Lang } from '@/types'
import { Icon } from '@iconify/react'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'

export default function DeleteUserForm({
  className = '',
  lang,
}: {
  className?: string
  lang: Lang
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
  const passwordInput = useRef<HTMLInputElement>(null)
  const form = useForm({
    password: '',
  })

  const deleteUser: FormEventHandler = (e) => {
    console.log('test')
    e.preventDefault()

    form.delete(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => form.reset(),
    })
  }

  const closeModal = () => {
    setConfirmingUserDeletion(false)

    form.reset()
  }

  useEffect(() => {
    if (!confirmingUserDeletion) {
      form.reset()
    }
  }, [confirmingUserDeletion])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{lang['delete_account']}</CardTitle>
        <CardDescription>{lang['delete_account_description']}</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={confirmingUserDeletion} onOpenChange={setConfirmingUserDeletion}>
          <DialogTrigger asChild>
            <Button variant="destructive">{lang['delete_account']}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{lang['delete_account_alert_title']}</DialogTitle>
              <DialogDescription>{lang['delete_account_alert_description']}</DialogDescription>
            </DialogHeader>
            <Form form={form}>
              <form className="space-y-6">
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lang['password']}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          required
                          ref={passwordInput}
                          placeholder={lang['password']}
                          autoFocus={true}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <div className="flex flex-col justify-end gap-2 sm:flex-row">
                <DialogClose asChild>
                  <Button variant="outline">{lang['cancel']}</Button>
                </DialogClose>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={form.processing}
                  onClick={deleteUser}
                >
                  {form.processing && (
                    <Icon icon="lucide:loader-2" className="mr-2 size-4 animate-spin" />
                  )}
                  <span>{lang['delete_account']}</span>
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

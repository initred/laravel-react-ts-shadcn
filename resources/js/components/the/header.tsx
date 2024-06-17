import { PageProps } from '@/types'
import { Icon } from '@iconify/react'
import { Link, usePage } from '@inertiajs/react'
import { cn } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.tsx'
// import AppLogo from "@/components/app-logo.tsx"
import { ModeToggle } from '@/components/mode-toggle.tsx'

const APP_NAME = import.meta.env.VITE_APP_NAME

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const user = usePage<PageProps>().props.auth.user
  const common_lang = usePage<PageProps>().props.common_lang

  return (
    <header
      className={cn(
        'top-0 z-10 flex',
        transparent
          ? 'absolute w-full bg-transparent'
          : 'sticky border-b border-neutral-200 bg-white backdrop-blur dark:border-b dark:border-neutral-800 dark:bg-black'
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl justify-between px-6 lg:px-8">
        <div className="mr-4 flex h-14 items-center">
          <Link href={route('index')} className="mr-6 flex items-center space-x-2 text-white">
            <span>{APP_NAME}</span>
          </Link>
        </div>
        <div className="flex items-center">
          <nav className="hidden items-center gap-2 md:flex">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <span>{user.name}</span>
                    <Icon icon="lucide:chevron-down" className="ml-2.5 size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{common_lang['my_account']}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={route('profile.edit')}>{common_lang['profile']}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link className="w-full" href={route('logout')} method="post" as="button">
                      {common_lang['logout']}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild size="sm" className="">
                  <Link href={route('login')}>{common_lang['login']}</Link>
                </Button>
                <Button asChild size="sm" className="">
                  <Link href={route('register')}>{common_lang['register']}</Link>
                </Button>
              </>
            )}
            <ModeToggle align="end" />
          </nav>
          <nav className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Icon icon="ri-menu-fill" className="size-5" />
              </SheetTrigger>
              <SheetContent className="border-secondary-800 p-0">
                <div className="p-1">
                  <ModeToggle align="start" side="bottom" />
                </div>

                <nav className="flex flex-col">
                  <ul className="flex flex-col divide-y divide-secondary-800 [*&>li>*]:block [*&>li>*]:px-4 [*&>li>*]:py-3 hover:[*&>li>*]:bg-secondary-900">
                    {user ? (
                      <li>
                        <Link href={route('logout')} method="post">
                          로그아웃
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link href={route('register')}>회원가입</Link>
                        </li>
                        <li>
                          <Link href={route('login')}>로그인</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>

                {user && (
                  <div className="absolute bottom-0 flex w-full">
                    <Link
                      href={route('profile.edit')}
                      className="group flex grow border-t border-secondary-800 p-4"
                    >
                      <div>
                        <img
                          className="inline-block size-9 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-secondary-300 group-hover:text-gray-200">
                          {user.name}
                        </p>
                        <p className="text-xs font-medium text-secondary-400 group-hover:text-gray-500">
                          프로필 보기
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  )
}

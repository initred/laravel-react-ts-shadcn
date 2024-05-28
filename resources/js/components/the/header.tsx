import { PageProps } from "@/types"
import { Icon } from "@iconify/react"
import { Link, usePage } from "@inertiajs/react"
import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx"
import AppLogo from "@/components/app-logo.tsx"
import { ModeToggle } from "@/components/mode-toggle.tsx"

const APP_NAME = import.meta.env.VITE_APP_NAME

export default function Header({
  transparent = false,
}: {
  transparent?: boolean
}) {
  const user = usePage<PageProps>().props.auth.user
  const common_lang = usePage<PageProps>().props.common_lang

  return (
    <header
      className={cn(
        "top-0 z-10 flex",
        transparent
          ? "absolute w-full bg-transparent"
          : "sticky border-b bg-white backdrop-blur dark:bg-black"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl justify-between px-6 lg:px-8">
        <div className="mr-4 flex h-14 items-center">
          <Link
            href={route("index")}
            className="mr-6 flex items-center space-x-2"
          >
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
                    <Icon
                      icon="lucide:chevron-down"
                      className="ml-2.5 size-4"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {common_lang["my_account"]}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={route("profile.edit")}>
                      {common_lang["profile"]}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      className="w-full"
                      href={route("logout")}
                      method="post"
                      as="button"
                    >
                      {common_lang["logout"]}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild size="sm" className="">
                  <Link href={route("login")}>{common_lang["login"]}</Link>
                </Button>
                <Button asChild size="sm" className="">
                  <Link href={route("register")}>
                    {common_lang["register"]}
                  </Link>
                </Button>
              </>
            )}
            <ModeToggle />
          </nav>
          <nav className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Icon icon="ri-menu-fill" className="size-5" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  )
}

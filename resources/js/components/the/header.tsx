import { PageProps } from "@/types"
import { Link, usePage } from "@inertiajs/react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import AppLogo from "@/components/app-logo.tsx"

const APP_NAME = import.meta.env.VITE_APP_NAME

export default function Header() {
  const user = usePage<PageProps>().props.auth.user
  const common_lang = usePage<PageProps>().props.common_lang

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link
            href={route("index")}
            className="mr-6 flex items-center space-x-2"
          >
            <AppLogo className="h-6 w-auto" />
            <span>{APP_NAME}</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <span>{user.name}</span>
                    <ChevronDown className="size-4" />
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
                <Button asChild size="sm" variant="secondary">
                  <Link href={route("login")}>{common_lang["login"]}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={route("register")}>
                    {common_lang["register"]}
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

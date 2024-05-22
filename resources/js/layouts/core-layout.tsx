import { Head } from "@inertiajs/react"
import type { PropsWithChildren } from "react"
import { Toaster } from "@/components/ui/toaster.tsx"
import Loading from "@/components/global/loading.tsx"
import Footer from "@/components/the/footer.tsx"
import Header from "@/components/the/header.tsx"

export default function CoreLayout({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) {
  const transparentRoutes = route().current("index")

  return (
    <>
      {title && <Head title={title} />}
      <div className="flex grow flex-col">
        <Header transparent={transparentRoutes} />
        <main className="flex grow flex-col">{children}</main>
        <Footer transparent={transparentRoutes} />
      </div>
      <Toaster />
      <Loading />
    </>
  )
}

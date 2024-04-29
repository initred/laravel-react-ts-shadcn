import { Head } from "@inertiajs/react"
import type { PropsWithChildren } from "react"
import Footer from "@/components/the/footer.tsx"
import Header from "@/components/the/header.tsx"

export default function CoreLayout({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <>
      {title && <Head title={title} />}
      <div className="flex grow flex-col">
        <Header />
        <main className="flex grow flex-col">{children}</main>
        <Footer />
      </div>
    </>
  )
}

import type { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full grow flex-col items-center justify-center ">
      <div className="my-8 flex w-full max-w-sm flex-col items-center justify-center md:*:my-12">
        {children}
      </div>
    </div>
  )
}

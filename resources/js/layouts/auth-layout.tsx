import type { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full grow flex-col items-center justify-center ">
      <div className="flex w-full max-w-sm flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}

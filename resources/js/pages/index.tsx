import type { PageProps } from "@/types"
import CoreLayout from "@/layouts/core-layout.tsx"

export default function Index({
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <CoreLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold">Index</h1>
        <p className="mt-4">Welcome to your Inertia app.</p>
        <p className="mt-4">Laravel version: {laravelVersion}</p>
        <p>PHP version: {phpVersion}</p>
      </div>
    </CoreLayout>
  )
}

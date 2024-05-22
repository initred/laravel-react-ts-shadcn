import CoreLayout from "@/layouts/core-layout.tsx"
import { SparklesCore } from "@/components/sparkles.tsx"

export default function Index() {
  return (
    <CoreLayout>
      <div className="relative flex size-full flex-col items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 h-screen w-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            className="size-full"
            particleColor="#FFFFFF"
          />
        </div>
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl md:text-5xl lg:text-4xl xl:text-6xl">
          XENON
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-center text-base font-normal text-neutral-300">
          Starter kits and documents developing the fastest web service in the
          Laravel Inertia React TypeScript Stack
        </p>
      </div>
    </CoreLayout>
  )
}

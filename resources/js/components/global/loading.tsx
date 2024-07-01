import { useLoadingState } from '@/states'
import { router } from '@inertiajs/react'
import * as Portal from '@radix-ui/react-portal'
import IconSvgSpinnersRingResize from '~icons/svg-spinners/ring-resize'

export default function Loading() {
  const { loading, setLoading } = useLoadingState((state) => state)
  const startEventListener = () => {
    setLoading(true)
  }

  const finishEventListener = () => {
    setLoading(false)
  }

  router.on('start', startEventListener)
  router.on('finish', finishEventListener)

  return (
    loading && (
      <Portal.Root>
        <div className="fixed inset-0 z-50 flex size-full items-center justify-center bg-black/80">
          <IconSvgSpinnersRingResize className="size-12 text-white/70" />
        </div>
      </Portal.Root>
    )
  )
}

import { useLoadingState } from '@/states'
import { Icon } from '@iconify/react'
import { router } from '@inertiajs/react'
import * as Portal from '@radix-ui/react-portal'

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
          <Icon icon="svg-spinners:ring-resize" className="size-12 text-white/70" />
        </div>
      </Portal.Root>
    )
  )
}

import CoreLayout from '@/layouts/core-layout.tsx'
import { Button } from '@/components/ui/catalyst-button.tsx'

export default function Components() {
  return (
    <CoreLayout>
      <div className="container mx-auto">
        <Button type="button" color="emerald">
          Docs
        </Button>
      </div>
    </CoreLayout>
  )
}

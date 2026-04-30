'use client'

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

interface BeforeAfterSliderProps {
  folder: string
  title?: string
  primaPosition?: string
  dopoPosition?: string
}

export function BeforeAfterSlider({
  folder,
  title,
  primaPosition = 'center',
  dopoPosition = 'center',
}: BeforeAfterSliderProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={`/images/before-after/${folder}/prima.jpg`}
            alt={`${title || folder} — Prima`}
            style={{ objectFit: 'cover', objectPosition: primaPosition }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={`/images/before-after/${folder}/dopo.jpg`}
            alt={`${title || folder} — Dopo`}
            style={{ objectFit: 'cover', objectPosition: dopoPosition }}
          />
        }
        style={{ height: 320 }}
      />
      {title && (
        <div className="px-4 py-3 bg-black/40 flex items-center justify-between">
          <span className="text-sm font-medium text-white">{title}</span>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <span>← Prima</span>
            <span>Dopo →</span>
          </div>
        </div>
      )}
    </div>
  )
}

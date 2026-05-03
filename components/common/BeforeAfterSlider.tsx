'use client'

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

interface BeforeAfterSliderProps {
  folder: string
  title?: string
}

function WatchKnob({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{ ...style, width: 44, height: 44, cursor: 'ew-resize' }}
      className="flex items-center justify-center"
    >
      {/* Knob body */}
      <div
        className="relative w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #E0BA6A, #C8A04C 40%, #8A6B2E)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,220,120,0.4)',
        }}
      >
        {/* Tick marks around the knob */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: i % 3 === 0 ? 3 : 1.5,
              height: i % 3 === 0 ? 6 : 4,
              background: i % 3 === 0 ? '#1A1D24' : 'rgba(26,29,36,0.6)',
              borderRadius: 1,
              transformOrigin: '50% 20px',
              transform: `rotate(${i * 30}deg) translateX(-50%)`,
              left: '50%',
              top: 2,
            }}
          />
        ))}
        {/* Center dot */}
        <div className="w-2 h-2 rounded-full bg-steel-dark/80" />
        {/* Vertical line */}
        <div className="absolute h-3 w-px bg-steel-dark/60 top-2 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  )
}

export function BeforeAfterSlider({ folder, title }: BeforeAfterSliderProps) {
  return (
    <div className="rounded overflow-hidden" style={{ border: '1.5px solid rgba(200,160,76,0.35)', boxShadow: '0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,160,76,0.08)' }}>
      {/* Corner decorations */}
      <div className="relative">
        {/* Top-left corner */}
        <svg className="absolute top-0 left-0 z-10 pointer-events-none" width="20" height="20" viewBox="0 0 20 20">
          <path d="M0 20 L0 0 L20 0" stroke="#C8A04C" strokeWidth="1.5" fill="none" opacity="0.7" />
        </svg>
        {/* Top-right corner */}
        <svg className="absolute top-0 right-0 z-10 pointer-events-none" width="20" height="20" viewBox="0 0 20 20">
          <path d="M0 0 L20 0 L20 20" stroke="#C8A04C" strokeWidth="1.5" fill="none" opacity="0.7" />
        </svg>
        {/* Bottom-left corner */}
        <svg className="absolute bottom-8 left-0 z-10 pointer-events-none" width="20" height="20" viewBox="0 0 20 20">
          <path d="M0 0 L0 20 L20 20" stroke="#C8A04C" strokeWidth="1.5" fill="none" opacity="0.7" />
        </svg>
        {/* Bottom-right corner */}
        <svg className="absolute bottom-8 right-0 z-10 pointer-events-none" width="20" height="20" viewBox="0 0 20 20">
          <path d="M20 0 L20 20 L0 20" stroke="#C8A04C" strokeWidth="1.5" fill="none" opacity="0.7" />
        </svg>

        <ReactCompareSlider
          handle={<WatchKnob />}
          itemOne={
            <ReactCompareSliderImage
              src={`/images/before-after/${folder}/prima.jpg`}
              alt={`${title || folder} — Prima`}
              style={{ objectFit: 'cover' }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={`/images/before-after/${folder}/dopo.jpg`}
              alt={`${title || folder} — Dopo`}
              style={{ objectFit: 'cover' }}
            />
          }
          style={{ height: 340 }}
        />
      </div>

      {/* Label bar */}
      {title && (
        <div className="px-4 py-3 flex items-center justify-between bg-steel-mid border-t border-brass/10">
          <span className="font-mono text-xs text-platinum/60 tracking-wider">{title}</span>
          <div className="flex items-center gap-4 font-mono text-[10px] text-platinum/30 tracking-widest uppercase">
            <span>← Prima</span>
            <span className="text-brass/40">|</span>
            <span>Dopo →</span>
          </div>
        </div>
      )}
    </div>
  )
}

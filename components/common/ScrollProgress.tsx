'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      bar.style.width = `${pct}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-steel-mid">
      <div
        ref={barRef}
        className="h-full w-0 transition-none"
        style={{ background: 'linear-gradient(90deg, #8A6B2E, #C8A04C, #E0BA6A)' }}
      />
      {/* Chronograph needle tip */}
      <div
        ref={(el) => {
          if (!el || !barRef.current) return
          const observer = new MutationObserver(() => {
            el.style.left = barRef.current!.style.width
          })
          if (barRef.current) {
            observer.observe(barRef.current, { attributes: true, attributeFilter: ['style'] })
          }
        }}
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brass"
        style={{ left: 0, transform: 'translateY(-50%) translateX(-50%)' }}
      />
    </div>
  )
}

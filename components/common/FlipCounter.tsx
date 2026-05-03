'use client'

import { useEffect, useRef, useState } from 'react'

interface FlipCounterProps {
  value: number
  suffix?: string
  className?: string
}

export function FlipCounter({ value, suffix = '', className = '' }: FlipCounterProps) {
  const [current, setCurrent] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const steps = 20
        const duration = 1400
        let step = 0
        const interval = setInterval(() => {
          step++
          const progress = step / steps
          const eased = 1 - Math.pow(1 - progress, 3)
          setCurrent(Math.round(eased * value))
          setFlipping(true)
          setTimeout(() => setFlipping(false), 150)
          if (step >= steps) clearInterval(interval)
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  const digits = String(current).split('')

  return (
    <div ref={ref} className={`flex items-baseline gap-0.5 ${className}`} style={{ perspective: '300px' }}>
      {digits.map((d, i) => (
        <span
          key={`${i}-${d}`}
          className="inline-block font-mono font-bold text-brass"
          style={{
            animation: flipping ? 'flip-in 0.15s ease-out' : 'none',
            animationDelay: `${i * 0.03}s`,
          }}
        >
          {d}
        </span>
      ))}
      {suffix && (
        <span className="font-mono font-bold text-brass">{suffix}</span>
      )}
    </div>
  )
}

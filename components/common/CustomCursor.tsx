'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const outer = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const onEnter = () => {
      outerRef.current?.classList.add('cursor-hover')
    }
    const onLeave = () => {
      outerRef.current?.classList.remove('cursor-hover')
    }

    let raf: number
    const animate = () => {
      outer.current.x += (pos.current.x - outer.current.x) * 0.1
      outer.current.y += (pos.current.y - outer.current.y) * 0.1
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outer.current.x - 20}px, ${outer.current.y - 20}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#8ABDD4]/60 pointer-events-none z-[9999] transition-[width,height,border-color,background-color] duration-200"
        style={{ willChange: 'transform' }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#8ABDD4] pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
      />
      <style>{`
        body { cursor: none !important; }
        a, button, [role="button"] { cursor: none !important; }
        .cursor-hover {
          width: 56px !important;
          height: 56px !important;
          border-color: rgba(138, 189, 212, 0.9) !important;
          background-color: rgba(138, 189, 212, 0.08) !important;
        }
      `}</style>
    </>
  )
}

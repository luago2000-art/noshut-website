'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const createParticles = () => {
      particles.length = 0
      const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 10000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.6 + 0.15,
          hue: Math.random() > 0.6 ? 200 : 217,
        })
      }
    }

    const drawGrid = () => {
      const step = 70
      ctx.strokeStyle = 'rgba(0,102,255,0.05)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120
          p.vx += (dx / dist) * force * 0.08
          p.vy += (dy / dist) * force * 0.08
        }

        // Velocity damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.2) { p.vx = (p.vx / speed) * 1.2; p.vy = (p.vy / speed) * 1.2 }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Glow effect per particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.opacity})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 70%, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${p.opacity})`
        ctx.fill()
      })

      // Connect nearby particles with gradient lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            const alpha = 0.12 * (1 - dist / 110)
            const lineGrad = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y,
            )
            lineGrad.addColorStop(0, `rgba(0,102,255,${alpha})`)
            lineGrad.addColorStop(1, `rgba(0,212,255,${alpha})`)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = lineGrad
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Mouse proximity glow
      if (mx > 0 && my > 0) {
        const mouseGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 80)
        mouseGlow.addColorStop(0, 'rgba(0,102,255,0.08)')
        mouseGlow.addColorStop(1, 'rgba(0,102,255,0)')
        ctx.beginPath()
        ctx.arc(mx, my, 80, 0, Math.PI * 2)
        ctx.fillStyle = mouseGlow
        ctx.fill()
      }

      animFrame = requestAnimationFrame(draw)
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    resize()
    createParticles()
    draw()

    const ro = new ResizeObserver(() => { resize(); createParticles() })
    ro.observe(canvas)
    window.addEventListener('mousemove', handleMouse, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animFrame)
      ro.disconnect()
      window.removeEventListener('mousemove', handleMouse)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

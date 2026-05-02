'use client'

import { useEffect, useRef } from 'react'
import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { STATS, COMPANY } from '@/lib/constants'

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return
    el.style.opacity = '1'
    el.style.transform = 'none'
  }, [])

  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050505]">

      {/* Animated grid background — pure CSS */}
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Scan line */}
      <div className="scanline absolute inset-0 pointer-events-none z-10" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-4xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#00E5FF]/80">
              Specialisti Data Center — Roma
            </span>
          </div>

          {/* Main headline */}
          <h1
            ref={headlineRef}
            className="font-display font-black leading-[0.9] tracking-tight mb-6"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <span className="block text-white">INFRASTRUTTURA</span>
            <span className="block text-white">SEMPRE</span>
            <span className="block" style={{ color: '#00E5FF', textShadow: '0 0 60px rgba(0,229,255,0.4)' }}>
              OPERATIVA.
            </span>
          </h1>

          {/* Subline */}
          <p className="text-base md:text-lg text-white/40 max-w-xl mb-10 leading-relaxed font-body">
            Pulizia rack, riordino cablaggi e bonifica data center.
            Partner B2B per system integrator in tutta Italia.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-20">
            <button
              onClick={() => handleScroll('#contatti')}
              className="px-7 py-3.5 font-bold text-sm tracking-wider uppercase rounded-lg text-[#050505] bg-[#00E5FF] hover:bg-white transition-colors duration-200 shadow-lg shadow-cyan-500/25"
            >
              Richiedi Preventivo
            </button>
            <button
              onClick={() => handleScroll('#servizi')}
              className="px-7 py-3.5 font-bold text-sm tracking-wider uppercase rounded-lg text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-200"
            >
              Scopri i servizi
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-[#050505] px-6 py-5">
                <div className="text-3xl font-black font-display text-white mb-0.5">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-white/30 font-medium tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }} />
    </section>
  )
}

'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'
import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { HERO_STATS } from '@/lib/constants'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground'),
  { ssr: false, loading: () => <div className="absolute inset-0" /> },
)

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-hero pt-20">
      {/* Animated background */}
      <ParticleBackground />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,102,255,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[#00D4FF] mb-8 border border-[#00D4FF]/20">
          <Shield className="w-4 h-4" />
          Partner certificato per Appalti Pubblici IT
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6">
          Il tuo Data Center{' '}
          <span className="text-gradient">merita di funzionare</span>
          <br />
          al 100%
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Pulizia professionale e riordino cablaggi rack per aziende IT, system integrator e
          appalti pubblici. Operativi su tutto il territorio nazionale.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="#contatti"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-opacity shadow-xl shadow-blue-500/30"
          >
            Richiedi Preventivo
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#servizi"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white/80 rounded-xl glass border border-white/10 hover:border-white/20 hover:text-white transition-all"
          >
            Scopri i Servizi
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-heading text-white mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs md:text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs animate-bounce">
        <span>Scorri</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}

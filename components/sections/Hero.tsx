'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, Shield, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { HERO_STATS } from '@/lib/constants'

const ParticleBackground = dynamic(
  () => import('@/components/common/ParticleBackground'),
  { ssr: false, loading: () => <div className="absolute inset-0" /> },
)

const ease = 'easeOut' as const

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mesh-bg pt-20">
      <ParticleBackground />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      {/* Large background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        aria-hidden
      >
        <span className="text-[22vw] font-black font-heading tracking-tighter text-white/[0.018] leading-none whitespace-nowrap">
          NOSHUT
        </span>
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent pointer-events-none" style={{ top: '30%' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0 }}
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass text-sm font-medium text-[#00D4FF] mb-10 border border-[#00D4FF]/20 animate-border-pulse">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse-glow" />
              Partner certificato per Appalti Pubblici IT
              <Shield className="w-3.5 h-3.5 opacity-80" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black font-heading leading-[0.88] tracking-tight mb-8"
          >
            <span className="block text-white/90">Il tuo</span>
            <span className="block text-gradient neon-glow-text">Data Center</span>
            <span className="block text-white/90">al 100%</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Pulizia professionale e riordino cablaggi rack per aziende IT,
            system integrator e appalti pubblici. Operativi su tutto il territorio nazionale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-20"
          >
            <Link
              href="#contatti"
              className="group inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-white rounded-2xl gradient-primary shadow-2xl shadow-blue-600/35 hover:shadow-blue-600/55 transition-all duration-300 hover:-translate-y-1"
            >
              Richiedi Preventivo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="#servizi"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white/65 rounded-2xl glass border border-white/10 hover:border-white/25 hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <Zap className="w-4 h-4" />
              Scopri i Servizi
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="grid grid-cols-3 gap-3 md:gap-5 max-w-2xl mx-auto w-full"
          >
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="gradient-border-card rounded-2xl p-4 md:p-6 shimmer-card text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-black font-heading text-white mb-1.5 neon-glow-text tabular-nums">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-white/35 leading-tight tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#servizi"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/30 hover:text-white/60 transition-colors duration-300 cursor-pointer group"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-semibold">Scorri</span>
        <div className="relative w-5 h-8 rounded-full border border-white/20 group-hover:border-white/40 transition-colors flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-white/50 animate-bounce" />
        </div>
      </motion.a>
    </section>
  )
}

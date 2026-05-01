'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { HERO_STATS } from '@/lib/constants'

const ThreeScene = dynamic(() => import('@/components/three/ThreeScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#060911]" />,
})

const ease = 'easeOut' as const

const words = ['Il tuo IT.', 'Sempre', 'al massimo.']

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#060911] pt-20">
      {/* 3D Scene full background */}
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#060911]/60 via-transparent to-[#060911]/80 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#060911]/80 via-transparent to-transparent pointer-events-none" />

      {/* Dot grid */}
      <div className="absolute inset-0 z-[1] dot-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col justify-center flex-1 py-20 max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-[#8ABDD4] border border-[#8ABDD4]/20 bg-[#8ABDD4]/5 animate-border-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ABDD4] animate-pulse-glow" />
              Specialisti IT per Aziende Private
            </span>
          </motion.div>

          {/* Main headline — word by word */}
          <div className="mb-8 overflow-hidden">
            {words.map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.div
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.15 }}
                >
                  <span
                    className={`block font-black font-heading leading-[0.9] tracking-tight ${
                      i === 1
                        ? 'text-gradient-animate text-6xl sm:text-7xl md:text-8xl lg:text-9xl'
                        : 'text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
                    }`}
                  >
                    {word}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.8 }}
            className="text-lg md:text-xl text-white/45 max-w-lg leading-relaxed mb-10"
          >
            Pulizia rack, riordino cablaggi e bonifica data center.
            Interventi professionali per aziende IT e MSP su tutto il territorio nazionale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-20"
          >
            <Link
              href="#contatti"
              className="group inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-white rounded-2xl gradient-primary shadow-2xl shadow-[#2E6B9B]/40 hover:shadow-[#2E6B9B]/60 hover:-translate-y-1 transition-all duration-300"
            >
              Richiedi Preventivo Gratuito
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#servizi"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white/55 rounded-2xl glass border border-white/8 hover:border-[#8ABDD4]/30 hover:text-white/90 transition-all duration-300 hover:-translate-y-1"
            >
              Scopri i Servizi
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.15 }}
            className="grid grid-cols-3 gap-3 max-w-lg"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="gradient-border-card rounded-2xl p-4 shimmer-card">
                <div className="text-2xl md:text-3xl font-black font-heading text-white neon-glow-text tabular-nums">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}

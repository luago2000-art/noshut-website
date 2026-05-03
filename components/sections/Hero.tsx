'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { STATS, COMPANY } from '@/lib/constants'

const GearScene = dynamic(() => import('@/components/three/GearScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-brass/30 border-t-brass rounded-full animate-spin" />
    </div>
  ),
})

const HEADLINE = ['PRECISIONE', 'MECCANICA', 'CERTIFICATA.']

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -60 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: 0.6 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export function Hero() {
  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-steel-dark noise-bg">

      {/* Radial brass glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,160,76,0.06) 0%, transparent 70%)' }} />

      {/* Vertical engraved lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, #C8A04C 0px, #C8A04C 1px, transparent 1px, transparent 80px)' }} />

      {/* Three.js — right half */}
      <div className="absolute top-0 right-0 w-full md:w-[55%] h-full pointer-events-none z-0">
        <GearScene />
      </div>

      {/* Dark gradient fade left over 3D */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, #1A1D24 35%, rgba(26,29,36,0.7) 60%, transparent 100%)' }} />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label mb-8"
          >
            Precision Engineered IT Services
          </motion.div>

          {/* Headline — lettera per lettera */}
          <div className="mb-6 overflow-hidden" style={{ perspective: '600px' }}>
            {HEADLINE.map((word, wi) => (
              <div key={word} className="block overflow-hidden">
                <div className="flex flex-wrap">
                  {word.split('').map((letter, li) => (
                    <motion.span
                      key={`${wi}-${li}`}
                      custom={wi * 12 + li}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className={`font-display font-bold leading-none tracking-tight ${
                        wi === 2
                          ? 'text-brass-gradient'
                          : 'text-platinum'
                      }`}
                      style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', display: 'inline-block' }}
                    >
                      {letter === ' ' ? ' ' : letter}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="font-mono text-sm text-platinum-dim tracking-wider max-w-lg mb-10 leading-relaxed"
          >
            Come un orologio svizzero, ogni componente del tuo data center<br />
            deve funzionare in perfetta sincronia. Noi lo garantiamo.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <button
              onClick={() => handleScroll('#contatti')}
              className="btn-mechanical px-8 py-3.5 text-sm tracking-widest uppercase rounded font-mono"
            >
              Richiedi Preventivo
            </button>
            <button
              onClick={() => handleScroll('#servizi')}
              className="px-8 py-3.5 text-sm tracking-widest uppercase font-mono text-platinum/50 border border-brass/20 rounded hover:border-brass/50 hover:text-platinum/80 transition-all duration-300"
            >
              I. Servizi →
            </button>
          </motion.div>

          {/* Stats — flip-style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px"
            style={{ background: 'rgba(200,160,76,0.12)' }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-steel-dark px-5 py-4">
                <div className="font-display font-bold text-3xl text-brass mb-0.5">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-platinum-dim">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #1A1D24)' }} />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest text-brass/50 uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-brass/50 to-transparent animate-tick-pulse" />
      </motion.div>
    </section>
  )
}

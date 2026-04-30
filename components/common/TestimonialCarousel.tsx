'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = () => {
    setDirection(-1)
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }
  const next = () => {
    setDirection(1)
    setIndex((i) => (i + 1) % TESTIMONIALS.length)
  }

  const t = TESTIMONIALS[index]

  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative gradient-border-card rounded-2xl p-8 md:p-12 shimmer-card overflow-hidden"
        >
          {/* Bg glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/8 blur-3xl rounded-full pointer-events-none" />

          {/* Quote icon */}
          <div className="flex justify-center mb-8">
            <div className="p-3 rounded-xl gradient-primary shadow-xl shadow-blue-500/30">
              <Quote className="w-5 h-5 text-white" />
            </div>
          </div>

          <blockquote className="text-xl md:text-2xl text-white/80 leading-relaxed text-center mb-10 italic font-light">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {/* Stars */}
          <div className="flex justify-center gap-1.5 mb-6">
            {Array.from({ length: t.rating }).map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <div className="text-center">
            <p className="font-bold text-white font-heading">{t.name}</p>
            <p className="text-sm text-white/40 mt-0.5">
              {t.role} &mdash; {t.company}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="p-2.5 rounded-xl glass text-white/40 hover:text-white border border-white/[0.07] hover:border-white/20 transition-all duration-200 hover:-translate-x-0.5"
          aria-label="Precedente"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-7 h-2 bg-gradient-to-r from-[#0066FF] to-[#00D4FF]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Testimone ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2.5 rounded-xl glass text-white/40 hover:text-white border border-white/[0.07] hover:border-white/20 transition-all duration-200 hover:translate-x-0.5"
          aria-label="Successivo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

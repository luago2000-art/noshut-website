'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
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
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-2xl p-8 md:p-10 text-center"
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          <blockquote className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 italic">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="flex flex-col items-center gap-1">
            <span className="font-semibold text-white font-heading">{t.name}</span>
            <span className="text-sm text-white/50">
              {t.role} — {t.company}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="p-2 rounded-full glass text-white/50 hover:text-white transition-colors"
          aria-label="Precedente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1)
              setIndex(i)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? 'bg-[#0066FF] w-6' : 'bg-white/30'
            }`}
            aria-label={`Vai al testimone ${i + 1}`}
          />
        ))}

        <button
          onClick={next}
          className="p-2 rounded-full glass text-white/50 hover:text-white transition-colors"
          aria-label="Successivo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

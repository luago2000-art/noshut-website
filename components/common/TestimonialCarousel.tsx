'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = () => { setDirection(-1); setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length) }
  const next = () => { setDirection(1);  setIndex((i) => (i + 1) % TESTIMONIALS.length) }
  const t = TESTIMONIALS[index]

  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="card-metal rounded p-8 md:p-12 relative overflow-hidden"
        >
          {/* Corner accents */}
          <svg className="absolute top-0 left-0 pointer-events-none" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 24 L0 0 L24 0" stroke="#C8A04C" strokeWidth="1" fill="none" opacity="0.4" />
          </svg>
          <svg className="absolute bottom-0 right-0 pointer-events-none" width="24" height="24" viewBox="0 0 24 24">
            <path d="M24 0 L24 24 L0 24" stroke="#C8A04C" strokeWidth="1" fill="none" opacity="0.4" />
          </svg>

          {/* Quote mark */}
          <div className="flex justify-center mb-8">
            <div className="w-10 h-10 rounded border border-brass/30 bg-brass/10 flex items-center justify-center">
              <span className="font-mono text-brass text-lg leading-none font-bold">"</span>
            </div>
          </div>

          <blockquote className="font-body text-xl text-platinum/70 leading-relaxed text-center mb-10 italic">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {/* Stars */}
          <div className="flex justify-center gap-1.5 mb-6">
            {Array.from({ length: t.rating }).map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 text-brass fill-brass" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display font-semibold text-platinum">{t.name}</p>
            <p className="font-mono text-xs text-platinum/30 mt-0.5 tracking-widest uppercase">
              {t.role} — {t.company}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={prev} className="p-2.5 rounded border border-brass/15 text-platinum/30 hover:text-brass hover:border-brass/40 transition-all duration-200 card-metal">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
              className={`rounded-full transition-all duration-300 ${i === index ? 'w-6 h-2 bg-brass' : 'w-2 h-2 bg-platinum/15 hover:bg-platinum/30'}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2.5 rounded border border-brass/15 text-platinum/30 hover:text-brass hover:border-brass/40 transition-all duration-200 card-metal">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

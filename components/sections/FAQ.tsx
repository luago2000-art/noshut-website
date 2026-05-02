'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { FAQ_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <div className="text-center mb-14">
            <span className="section-label justify-center">FAQ</span>
            <h2 className="font-display font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Domande
              <span className="text-[#00E5FF]"> frequenti.</span>
            </h2>
          </div>
        </SectionWrapper>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <SectionWrapper key={i} delay={i * 0.05}>
              <div
                className={cn(
                  'rounded-xl border transition-all duration-300',
                  open === i
                    ? 'border-[#00E5FF]/20 bg-[#00E5FF]/[0.03]'
                    : 'border-white/[0.05] bg-white/[0.02] hover:border-white/[0.09]',
                )}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className={cn('text-sm font-semibold transition-colors', open === i ? 'text-white' : 'text-white/70')}>
                    {item.question}
                  </span>
                  <span className={cn('flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors', open === i ? 'bg-[#00E5FF] text-[#050505]' : 'bg-white/5 text-white/30')}>
                    {open === i ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </span>
                </button>
                {open === i && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-white/40 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}

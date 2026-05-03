'use client'

import { useState } from 'react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionDivider } from '@/components/common/SectionDivider'
import { FAQ_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <SectionDivider label="Meccanismo interno" />
      <section id="faq" className="py-24 bg-steel-dark noise-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper>
            <div className="text-center mb-14">
              <div className="section-label justify-center">V. Inner Workings</div>
              <h2 className="font-display font-bold text-platinum leading-tight"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Domande<br />
                <span className="text-brass-gradient">frequenti.</span>
              </h2>
            </div>
          </SectionWrapper>

          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <SectionWrapper key={i} delay={i * 0.05}>
                <div className={cn(
                  'rounded border transition-all duration-300',
                  open === i
                    ? 'border-brass/30 bg-steel-mid'
                    : 'border-brass/10 bg-steel-dark hover:border-brass/20',
                )}>
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-brass/40 tracking-widest shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={cn(
                        'font-body text-sm font-medium transition-colors',
                        open === i ? 'text-platinum' : 'text-platinum/60',
                      )}>
                        {item.question}
                      </span>
                    </div>

                    {/* Gear open/close icon */}
                    <svg
                      viewBox="0 0 24 24"
                      className={cn(
                        'w-5 h-5 shrink-0 text-brass transition-transform duration-500',
                        open === i ? 'rotate-180' : 'rotate-0',
                      )}
                      fill="none" stroke="currentColor" strokeWidth="1.5"
                    >
                      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 14a4 4 0 110-8 4 4 0 010 8z" />
                      <path strokeLinecap="round" d={open === i ? 'M8 12h8' : 'M8 12h8M12 8v8'} />
                    </svg>
                  </button>

                  {/* Iris reveal content */}
                  {open === i && (
                    <div
                      className="px-6 pb-6 overflow-hidden"
                      style={{
                        animation: 'mechanical-in 0.35s cubic-bezier(0.22,1,0.36,1) forwards',
                      }}
                    >
                      <div className="pl-9 border-l border-brass/20 ml-0.5">
                        <p className="font-body text-sm text-platinum/45 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

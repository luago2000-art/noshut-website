import { SectionWrapper } from '@/components/common/SectionWrapper'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQ_ITEMS } from '@/lib/constants'

export function FAQ() {
  return (
    <section id="faq" className="py-28 bg-[#080C22] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/15 to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      {/* Decorative number */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 text-[20vw] font-black font-heading text-white/[0.015] leading-none select-none pointer-events-none"
        aria-hidden
      >
        ?
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <span className="section-label">Domande frequenti</span>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-4">
            Hai dubbi?
          </h2>
          <p className="text-white/45 text-lg">
            Tutto quello che devi sapere prima di contattarci.
          </p>
        </SectionWrapper>

        <SectionWrapper delay={0.1}>
          <Accordion className="space-y-2.5">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="relative rounded-2xl px-6 overflow-hidden transition-all duration-300 bg-white/[0.04] border border-white/[0.07] data-[state=open]:border-[#0066FF]/40 data-[state=open]:bg-[#0066FF]/[0.06] top-glow-line shimmer-card"
              >
                <AccordionTrigger className="text-left text-white/80 hover:text-white font-semibold py-5 text-[15px] [&[data-state=open]]:text-[#00D4FF] hover:no-underline transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/50 text-sm leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionWrapper>
      </div>
    </section>
  )
}

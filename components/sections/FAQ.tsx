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
    <section id="faq" className="py-24 bg-[#0A0E27]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <p className="text-sm font-semibold text-[#0066FF] uppercase tracking-widest mb-3">
            Domande frequenti
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            FAQ
          </h2>
          <p className="text-white/60 text-lg">
            Tutto quello che devi sapere prima di contattarci.
          </p>
        </SectionWrapper>

        <SectionWrapper delay={0.1}>
          <Accordion className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-white/10 rounded-xl px-5 bg-white/5 data-[state=open]:border-[#0066FF]/40 data-[state=open]:bg-[#0066FF]/5 transition-all"
              >
                <AccordionTrigger className="text-left text-white/90 hover:text-white font-medium py-4 [&[data-state=open]]:text-[#00D4FF] hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 text-sm leading-relaxed pb-4">
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

import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ServiceCard } from '@/components/common/ServiceCard'
import { SERVICES } from '@/lib/constants'

export function Servizi() {
  return (
    <section id="servizi" className="py-24 bg-[#0A0E27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <p className="text-sm font-semibold text-[#0066FF] uppercase tracking-widest mb-3">
            Cosa facciamo
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Servizi Professionali
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Interventi specializzati per infrastrutture IT critiche, con documentazione completa
            e garanzia di qualità.
          </p>
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <SectionWrapper key={service.id} delay={i * 0.08}>
              <ServiceCard service={service} index={i} />
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}

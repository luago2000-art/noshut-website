import { ServiceCard } from '@/components/common/ServiceCard'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SERVICES } from '@/lib/constants'

export function Servizi() {
  return (
    <section id="servizi" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <div className="mb-14">
            <span className="section-label">Cosa facciamo</span>
            <h2 className="font-display font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Servizi<br />
              <span className="text-[#00E5FF]">professionali.</span>
            </h2>
            <p className="mt-4 text-white/40 max-w-lg">
              Dalla pulizia puntuale alla manutenzione programmata, ogni intervento viene documentato con report fotografico.
            </p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <SectionWrapper key={service.title} delay={i * 0.07}>
              <ServiceCard service={service} index={i} />
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}

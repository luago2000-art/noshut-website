import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ServiceCard } from '@/components/common/ServiceCard'
import { SERVICES } from '@/lib/constants'

export function Servizi() {
  return (
    <section id="servizi" className="py-28 bg-[#080C22] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper className="mb-16">
          <div className="flex flex-col items-center text-center">
            <span className="section-label">Cosa facciamo</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white leading-tight mb-5">
              Servizi{' '}
              <span className="text-gradient">Professionali</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg leading-relaxed">
              Interventi specializzati per infrastrutture IT critiche, con documentazione
              completa e garanzia di qualità certificata.
            </p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <SectionWrapper key={service.id} delay={i * 0.07}>
              <ServiceCard service={service} index={i} />
            </SectionWrapper>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <SectionWrapper delay={0.5}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl gradient-border-card shimmer-card">
            <div>
              <p className="text-white font-semibold font-heading mb-1">Hai un progetto IT da gestire?</p>
              <p className="text-sm text-white/45">Ogni intervento include documentazione fotografica pre/post e report as-built.</p>
            </div>
            <a
              href="#contatti"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-px transition-all duration-300 whitespace-nowrap"
            >
              Parlaci del tuo progetto →
            </a>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}

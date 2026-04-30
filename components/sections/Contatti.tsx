import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ContactForm } from '@/components/common/ContactForm'
import { Mail, MapPin, Clock, Zap } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

const INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
  {
    icon: MapPin,
    label: 'Sede',
    value: COMPANY.address,
    href: null,
  },
  {
    icon: Clock,
    label: 'Risposta',
    value: 'Entro 24 ore lavorative',
    href: null,
  },
]

export function Contatti() {
  return (
    <section id="contatti" className="py-28 bg-[#080C22] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/25 to-transparent" />

      {/* Glow orbs */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-cyan-500/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <span className="section-label">Lavoriamo insieme</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white mb-5">
            Richiedi un{' '}
            <span className="text-gradient">Preventivo</span>
          </h2>
          <p className="text-white/45 max-w-xl mx-auto text-lg leading-relaxed">
            Descrivi la tua esigenza e ricevi una risposta entro 24 ore. Per urgenze,
            usa il pulsante WhatsApp in basso a destra.
          </p>
        </SectionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12">
          {/* Form */}
          <SectionWrapper className="lg:col-span-3">
            <div className="gradient-border-card rounded-2xl p-6 md:p-8 shimmer-card overflow-hidden">
              <ContactForm />
            </div>
          </SectionWrapper>

          {/* Info */}
          <SectionWrapper delay={0.2} className="lg:col-span-2">
            <div className="space-y-4">
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:border-[#0066FF]/30 transition-all duration-300 top-glow-line shimmer-card overflow-hidden group"
                >
                  <div className="p-3 rounded-xl gradient-primary shadow-lg shadow-blue-500/20 shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-white/75 hover:text-[#00D4FF] transition-colors font-medium"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/75 font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* System integrator callout */}
              <div className="p-6 rounded-2xl gradient-border-card shimmer-card overflow-hidden">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#0066FF]/15 shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">System integrator?</p>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Contattaci per stabilire una collaborazione continuativa come subappaltatore
                      specializzato in gare ICT e appalti pubblici.
                    </p>
                  </div>
                </div>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D4FF] hover:text-white transition-colors"
                >
                  Scrivici direttamente →
                </a>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}

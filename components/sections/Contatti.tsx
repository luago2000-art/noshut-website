import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ContactForm } from '@/components/common/ContactForm'
import { Mail, MapPin, Clock } from 'lucide-react'
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
    <section id="contatti" className="py-24 bg-[#080C22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <p className="text-sm font-semibold text-[#0066FF] uppercase tracking-widest mb-3">
            Lavoriamo insieme
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Richiedi un Preventivo
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Descrivi la tua esigenza e ricevi una risposta entro 24 ore. Per urgenze, usa il
            pulsante WhatsApp in basso a destra.
          </p>
        </SectionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <SectionWrapper className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <ContactForm />
            </div>
          </SectionWrapper>

          {/* Info */}
          <SectionWrapper delay={0.2} className="lg:col-span-2">
            <div className="space-y-6">
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="p-2.5 rounded-lg gradient-primary shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-white hover:text-[#00D4FF] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/80">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-5 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20">
                <p className="text-sm text-white/70 leading-relaxed">
                  <strong className="text-white">Sei un system integrator</strong> o gestisci
                  appalti pubblici IT? Contattaci per stabilire una collaborazione continuativa
                  come subappaltatore specializzato.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}

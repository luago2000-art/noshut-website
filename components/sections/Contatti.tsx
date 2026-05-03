import { ContactForm } from '@/components/common/ContactForm'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionDivider } from '@/components/common/SectionDivider'
import { COMPANY } from '@/lib/constants'
import { Mail, MapPin, Clock, Phone } from 'lucide-react'

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    mono: true,
  },
  {
    icon: Phone,
    label: 'Telefono',
    value: COMPANY.phone,
    href: `tel:${COMPANY.phone}`,
    mono: true,
  },
  {
    icon: MapPin,
    label: 'Sede Operativa',
    value: COMPANY.address,
    href: null,
    mono: false,
  },
  {
    icon: Clock,
    label: 'Risposta Garantita',
    value: 'Entro 24 ore lavorative',
    href: null,
    mono: false,
  },
]

export function Contatti() {
  return (
    <>
      <SectionDivider label="Segnale" />
      <section id="contatti" className="py-24 bg-steel-mid noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper>
            <div className="text-center mb-14">
              <div className="section-label justify-center">VI. Segnale</div>
              <h2 className="font-display font-bold text-platinum leading-tight"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Avvia il<br />
                <span className="text-brass-gradient">contatto.</span>
              </h2>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* Left — info */}
            <SectionWrapper delay={0.05}>
              <div className="space-y-3">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, mono }) => {
                  const inner = (
                    <div className="flex items-start gap-4 card-metal rounded px-5 py-4 group hover:border-brass/40 transition-all duration-300">
                      <span className="w-9 h-9 rounded border border-brass/20 bg-brass/8 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-brass/50 group-hover:bg-brass/15 transition-all">
                        <Icon className="w-3.5 h-3.5 text-brass" />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.2em] text-brass/40 uppercase mb-1">{label}</p>
                        <p className={`text-sm text-platinum/60 group-hover:text-platinum/90 transition-colors ${mono ? 'font-mono' : 'font-body'}`}>
                          {value}
                        </p>
                      </div>
                    </div>
                  )
                  return href ? (
                    <a key={label} href={href}>{inner}</a>
                  ) : (
                    <div key={label}>{inner}</div>
                  )
                })}
              </div>

              {/* Signal decoration */}
              <div className="mt-8 card-metal rounded px-5 py-5">
                <div className="font-mono text-[10px] tracking-[0.2em] text-brass/40 uppercase mb-4">Trasmissione</div>
                <div className="flex items-end gap-1.5 h-8">
                  {[3, 5, 7, 9, 6, 8, 4, 6, 9, 7, 5, 8, 3, 6, 9, 5].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-brass/30"
                      style={{
                        height: `${h * 10}%`,
                        animationName: 'tick-pulse',
                        animationDuration: `${0.8 + i * 0.1}s`,
                        animationDelay: `${i * 0.05}s`,
                        animationIterationCount: 'infinite',
                        animationTimingFunction: 'ease-in-out',
                        animationDirection: 'alternate',
                      }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brass animate-pulse" />
                  <span className="font-mono text-[9px] text-brass/40 tracking-widest">CANALE ATTIVO — 24/7</span>
                </div>
              </div>
            </SectionWrapper>

            {/* Right — form */}
            <SectionWrapper delay={0.15}>
              <div className="card-metal rounded p-6 md:p-8">
                {/* Panel header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-brass/10">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.2em] text-brass/40 uppercase mb-0.5">Modulo</div>
                    <h3 className="font-display text-sm font-semibold text-platinum">Richiesta Preventivo</h3>
                  </div>
                  {/* Panel LED */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-brass/80 animate-pulse" />
                    <span className="font-mono text-[9px] text-brass/30 tracking-widest">RDY</span>
                  </div>
                </div>
                <ContactForm />
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>
    </>
  )
}

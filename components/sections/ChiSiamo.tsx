import { SectionWrapper } from '@/components/common/SectionWrapper'
import { CheckCircle, Award, Zap, FileCheck } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

const VANTAGGI = [
  { icon: FileCheck, label: 'P.IVA e fatturazione elettronica' },
  { icon: Award, label: 'Compatibile appalti pubblici IT' },
  { icon: Zap, label: 'Intervento rapido su tutto il territorio' },
  { icon: CheckCircle, label: 'Documentazione as-built completa' },
]

const PARTNER_TYPES = [
  { title: 'System Integrator', desc: 'Subappaltiamo interventi di pulizia e cablaggio per i tuoi cantieri IT' },
  { title: 'Appalti Pubblici', desc: 'Partner regolare per gare d\'appalto nel settore IT della PA' },
  { title: 'Aziende IT', desc: 'Supporto specializzato per la tua infrastruttura data center' },
]

export function ChiSiamo() {
  return (
    <section id="chi-siamo" className="py-24 bg-[#0A0E27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <SectionWrapper>
            <p className="text-sm font-semibold text-[#0066FF] uppercase tracking-widest mb-3">
              Chi siamo
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6 leading-tight">
              Il partner che cercavi per la tua{' '}
              <span className="text-gradient">infrastruttura IT</span>
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                <strong className="text-white">{COMPANY.fullName}</strong> è una ditta individuale
                specializzata nella pulizia professionale di rack e server room, riordino e
                gestione cablaggi strutturati, e bonifica completa di data center.
              </p>
              <p>
                Fondata da Luigi Agostino con sede a Roma, NOSHUT opera su tutto il territorio
                nazionale ed è il partner ideale per system integrator, aziende IT e operatori che
                lavorano in appalti pubblici nel settore dell&apos;ICT.
              </p>
              <p>
                Ogni intervento è documentato con report fotografico pre/post e documentazione
                as-built, garantendo tracciabilità e qualità verificabile.
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VANTAGGI.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-[#0066FF]/20">
                    <Icon className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <span className="text-sm text-white/70">{label}</span>
                </li>
              ))}
            </ul>
          </SectionWrapper>

          {/* Right: partner cards */}
          <SectionWrapper delay={0.2}>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6">
                Il partner ideale per
              </p>
              {PARTNER_TYPES.map((pt) => (
                <div
                  key={pt.title}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#0066FF]/30 transition-colors"
                >
                  <div className="w-1.5 h-full min-h-[40px] rounded-full gradient-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white font-heading mb-1">{pt.title}</h3>
                    <p className="text-sm text-white/50">{pt.desc}</p>
                  </div>
                </div>
              ))}

              {/* CTA box */}
              <div className="mt-6 p-6 rounded-xl border border-[#0066FF]/30 bg-[#0066FF]/10">
                <p className="text-sm text-white/70 mb-3">
                  Sei un system integrator o lavori in appalti pubblici IT?
                </p>
                <a
                  href="#contatti"
                  className="inline-flex items-center text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors"
                >
                  Parlaci del tuo progetto →
                </a>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}

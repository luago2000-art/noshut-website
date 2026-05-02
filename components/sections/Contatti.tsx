import { ContactForm } from '@/components/common/ContactForm'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { COMPANY } from '@/lib/constants'
import { Mail, MapPin, Clock } from 'lucide-react'

export function Contatti() {
  return (
    <section id="contatti" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <SectionWrapper>
            <span className="section-label">Contattaci</span>
            <h2 className="font-display font-black text-white leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Parlaci del tuo<br />
              <span className="text-[#00E5FF]">data center.</span>
            </h2>
            <p className="text-white/40 leading-relaxed mb-10">
              Inviaci una richiesta e ti risponderemo con un preventivo personalizzato entro 24 ore lavorative.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] hover:border-[#00E5FF]/20 hover:bg-[#00E5FF]/[0.03] transition-all duration-300 group"
              >
                <span className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#00E5FF]" />
                </span>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-sm text-white/70 group-hover:text-white transition-colors">{COMPANY.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06]">
                <span className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#00E5FF]" />
                </span>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Sede operativa</p>
                  <p className="text-sm text-white/70">{COMPANY.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06]">
                <span className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-[#00E5FF]" />
                </span>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Tempi di risposta</p>
                  <p className="text-sm text-white/70">Entro 24 ore lavorative</p>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Form */}
          <SectionWrapper delay={0.15}>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8">
              <h3 className="text-base font-bold text-white mb-6">Richiesta preventivo</h3>
              <ContactForm />
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}

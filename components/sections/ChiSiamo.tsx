import { SectionWrapper } from '@/components/common/SectionWrapper'
import { CheckCircle, Award, Zap, FileCheck, ArrowRight } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

const VANTAGGI = [
  { icon: FileCheck, label: 'P.IVA e fatturazione elettronica' },
  { icon: Award,     label: 'Compatibile appalti pubblici IT' },
  { icon: Zap,       label: 'Intervento rapido su tutto il territorio' },
  { icon: CheckCircle, label: 'Documentazione as-built completa' },
]

const METRICS = [
  { value: '500+', label: 'Rack puliti', color: '#0066FF' },
  { value: '80+',  label: 'Data center', color: '#00D4FF' },
  { value: '120+', label: 'Clienti attivi', color: '#0066FF' },
]

const PARTNER_TYPES = [
  {
    title: 'System Integrator',
    desc: "Subappaltiamo interventi di pulizia e cablaggio per i tuoi cantieri IT",
    num: '01',
  },
  {
    title: 'Appalti Pubblici',
    desc: "Partner regolare per gare d'appalto nel settore IT della Pubblica Amministrazione",
    num: '02',
  },
  {
    title: 'Aziende IT',
    desc: "Supporto specializzato per la tua infrastruttura data center e server room",
    num: '03',
  },
]

export function ChiSiamo() {
  return (
    <section id="chi-siamo" className="py-28 bg-[#0A0E27] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/15 to-transparent" />

      {/* Large decorative text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[18vw] font-black font-heading text-white/[0.015] leading-none select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        B2B
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left column */}
          <SectionWrapper>
            <span className="section-label">Chi siamo</span>

            <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-6 leading-[1.05]">
              Il partner che cercavi per la tua{' '}
              <span className="text-gradient">infrastruttura IT</span>
            </h2>

            <div className="space-y-4 text-white/50 leading-relaxed text-[15px] mb-8">
              <p>
                <strong className="text-white">{COMPANY.fullName}</strong> è una ditta individuale
                specializzata nella pulizia professionale di rack e server room, riordino e
                gestione cablaggi strutturati, e bonifica completa di data center.
              </p>
              <p>
                Con sede a Roma e operativa su tutto il territorio nazionale, NOSHUT è il
                partner ideale per system integrator, aziende IT e operatori in appalti pubblici
                nel settore ICT.
              </p>
              <p>
                Ogni intervento è documentato con report fotografico pre/post e documentazione
                as-built, garantendo tracciabilità e qualità verificabile.
              </p>
            </div>

            {/* Advantages grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {VANTAGGI.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#0066FF]/30 transition-colors">
                  <div className="p-1.5 rounded-lg bg-[#0066FF]/15 shrink-0">
                    <Icon className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <span className="text-sm text-white/65">{label}</span>
                </li>
              ))}
            </ul>

            {/* Metrics strip */}
            <div className="flex items-center gap-8">
              {METRICS.map((m) => (
                <div key={m.label} className="text-center">
                  <div
                    className="text-3xl font-black font-heading leading-none mb-0.5"
                    style={{ color: m.color, textShadow: `0 0 20px ${m.color}66` }}
                  >
                    {m.value}
                  </div>
                  <div className="text-xs text-white/35 tracking-wide uppercase">{m.label}</div>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Right column */}
          <SectionWrapper delay={0.2}>
            <div className="space-y-3">
              <p className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-6">
                Il partner ideale per
              </p>

              {PARTNER_TYPES.map((pt) => (
                <div
                  key={pt.title}
                  className="group relative flex items-start gap-5 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:border-[#0066FF]/35 hover:bg-[#0066FF]/[0.05] transition-all duration-300 top-glow-line shimmer-card overflow-hidden"
                >
                  <div className="shrink-0 text-4xl font-black font-heading text-white/[0.06] leading-none select-none group-hover:text-white/[0.1] transition-colors">
                    {pt.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white font-heading mb-1 group-hover:text-[#00D4FF] transition-colors">
                      {pt.title}
                    </h3>
                    <p className="text-sm text-white/45 leading-relaxed">{pt.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#0066FF] group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
                </div>
              ))}

              {/* CTA box */}
              <div className="mt-4 p-6 rounded-2xl gradient-border-card shimmer-card">
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  <strong className="text-white">Sei un system integrator</strong> o lavori in
                  appalti pubblici IT? Contattaci per stabilire una collaborazione continuativa.
                </p>
                <a
                  href="#contatti"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#00D4FF] hover:text-white transition-colors group"
                >
                  Parlaci del tuo progetto
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}

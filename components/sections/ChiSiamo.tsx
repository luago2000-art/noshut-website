import { SectionWrapper } from '@/components/common/SectionWrapper'
import { CheckCircle, Award, Zap, FileCheck, ArrowRight } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

const VANTAGGI = [
  { icon: FileCheck, label: 'P.IVA e fatturazione elettronica B2B' },
  { icon: Award,     label: 'Attrezzatura ESD-safe certificata' },
  { icon: Zap,       label: 'Intervento rapido su tutto il territorio' },
  { icon: CheckCircle, label: 'Documentazione as-built completa' },
]

const METRICS = [
  { value: '500+', label: 'Rack puliti',    color: '#2E6B9B' },
  { value: '80+',  label: 'Data center',    color: '#8ABDD4' },
  { value: '120+', label: 'Clienti attivi', color: '#2E6B9B' },
]

const PARTNER_TYPES = [
  {
    title: 'Aziende Private',
    desc: 'IT manager e responsabili infrastrutture che vogliono un data center sempre efficiente e documentato',
    num: '01',
  },
  {
    title: 'MSP & Rivenditori IT',
    desc: 'Managed Service Provider che cercano un partner tecnico affidabile per i cantieri dei propri clienti',
    num: '02',
  },
  {
    title: 'System Integrator',
    desc: 'Integratori che subappaltano pulizia e riordino rack come parte dei loro progetti IT complessi',
    num: '03',
  },
]

export function ChiSiamo() {
  return (
    <section id="chi-siamo" className="py-28 bg-[#060911] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2E6B9B]/20 to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[18vw] font-black font-heading text-white/[0.012] leading-none select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        B2B
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          <SectionWrapper>
            <span className="section-label">Chi siamo</span>
            <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-6 leading-[1.05]">
              Il partner tecnico che{' '}
              <span className="text-gradient">cercavi</span>
            </h2>

            <div className="space-y-4 text-white/48 leading-relaxed text-[15px] mb-8">
              <p>
                <strong className="text-white">{COMPANY.fullName}</strong> è una ditta individuale
                specializzata nella pulizia professionale di rack e server room, riordino e
                gestione cablaggi strutturati, e bonifica completa di data center.
              </p>
              <p>
                Con sede a Roma e operativa su tutto il territorio nazionale, NOSHUT lavora
                direttamente con aziende IT private, MSP e system integrator che cercano
                un partner tecnico affidabile, documentato e sempre disponibile.
              </p>
              <p>
                Ogni intervento include report fotografico pre/post e documentazione as-built
                consegnata al cliente — zero compromessi sulla qualità.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {VANTAGGI.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#2E6B9B]/30 transition-colors">
                  <div className="p-1.5 rounded-lg bg-[#2E6B9B]/15 shrink-0">
                    <Icon className="w-4 h-4 text-[#8ABDD4]" />
                  </div>
                  <span className="text-sm text-white/60">{label}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-8">
              {METRICS.map((m) => (
                <div key={m.label} className="text-center">
                  <div
                    className="text-3xl font-black font-heading leading-none mb-0.5"
                    style={{ color: m.color, textShadow: `0 0 20px ${m.color}66` }}
                  >
                    {m.value}
                  </div>
                  <div className="text-xs text-white/30 tracking-wide uppercase">{m.label}</div>
                </div>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.2}>
            <div className="space-y-3">
              <p className="text-xs font-bold text-white/25 uppercase tracking-[0.2em] mb-6">
                Il partner ideale per
              </p>

              {PARTNER_TYPES.map((pt) => (
                <div
                  key={pt.title}
                  className="group relative flex items-start gap-5 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:border-[#2E6B9B]/40 hover:bg-[#2E6B9B]/[0.05] transition-all duration-300 top-glow-line shimmer-card overflow-hidden"
                >
                  <div className="shrink-0 text-4xl font-black font-heading text-white/[0.06] leading-none select-none group-hover:text-white/[0.1] transition-colors">
                    {pt.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white font-heading mb-1 group-hover:text-[#8ABDD4] transition-colors">
                      {pt.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">{pt.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/15 group-hover:text-[#2E6B9B] group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
                </div>
              ))}

              <div className="mt-4 p-6 rounded-2xl gradient-border-card shimmer-card">
                <p className="text-sm text-white/50 leading-relaxed mb-4">
                  <strong className="text-white">Sei un MSP o IT manager</strong> e cerchi
                  un partner tecnico per la tua infrastruttura? Parliamoci.
                </p>
                <a
                  href="#contatti"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#8ABDD4] hover:text-white transition-colors group"
                >
                  Contattaci subito
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

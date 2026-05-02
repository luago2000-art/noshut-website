import { SectionWrapper } from '@/components/common/SectionWrapper'
import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { ShieldCheck, Zap, Users, Award } from 'lucide-react'

const ADVANTAGES = [
  { icon: ShieldCheck, label: 'Operativi ESD-safe certificati' },
  { icon: Zap, label: 'Interventi urgenti H24' },
  { icon: Users, label: 'Partner white-label per MSP' },
  { icon: Award, label: 'D.Lgs. 81/2008 — Sicurezza sul lavoro' },
]

const PARTNER_TYPES = [
  { num: '01', title: 'System Integrator', desc: 'Subappalto operativo su cantieri IT in tutta Italia.' },
  { num: '02', title: 'MSP & Managed Services', desc: 'Supporto tecnico on-site per i tuoi clienti finali.' },
  { num: '03', title: 'Pubblica Amministrazione', desc: 'Iscritti ai principali albi fornitori PA.' },
  { num: '04', title: 'Enterprise & Corporate', desc: 'SLA dedicati e contratti pluriennali di manutenzione.' },
]

export function ChiSiamo() {
  return (
    <section id="chi-siamo" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <SectionWrapper>
            <span className="section-label">Chi siamo</span>
            <h2 className="font-display font-black text-white leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Precisione tecnica.<br />
              <span className="text-[#00E5FF]">Zero compromessi.</span>
            </h2>
            <p className="text-white/40 leading-relaxed mb-6">
              NOSHUT nasce dall&apos;esperienza di Luigi Agostino nel settore IT: anni di cantieri, data center e infrastrutture critiche hanno generato una specializzazione unica in Italia.
            </p>
            <p className="text-white/40 leading-relaxed mb-10">
              Non siamo una società di pulizie generica. Siamo tecnici IT che capiscono le infrastrutture che toccano. Ogni intervento è eseguito con attrezzature professionali e documentato con report fotografico.
            </p>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { val: 500, suf: '+', label: 'Rack bonificati' },
                { val: 8, suf: ' anni', label: 'Esperienza' },
                { val: 120, suf: '+', label: 'Clienti attivi' },
                { val: 100, suf: '%', label: 'Soddisfazione' },
              ].map((k) => (
                <div key={k.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
                  <div className="text-2xl font-black font-display text-[#00E5FF]">
                    <AnimatedCounter value={k.val} suffix={k.suf} />
                  </div>
                  <div className="text-xs text-white/30 mt-0.5 uppercase tracking-wider">{k.label}</div>
                </div>
              ))}
            </div>

            {/* Advantages */}
            <ul className="space-y-3">
              {ADVANTAGES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-white/50">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#00E5FF]" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </SectionWrapper>

          {/* Right — partner types */}
          <SectionWrapper delay={0.15}>
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/25 mb-6">Con chi lavoriamo</h3>
            <div className="space-y-3">
              {PARTNER_TYPES.map((p) => (
                <div
                  key={p.num}
                  className="group flex items-start gap-5 rounded-xl border border-white/[0.05] bg-white/[0.02] px-6 py-5 hover:border-[#00E5FF]/20 hover:bg-[#00E5FF]/[0.03] transition-all duration-300"
                >
                  <span className="text-3xl font-black font-display text-white/[0.06] group-hover:text-[#00E5FF]/20 transition-colors leading-none pt-1">
                    {p.num}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white/80 mb-1 group-hover:text-white transition-colors">{p.title}</h4>
                    <p className="text-sm text-white/35">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}

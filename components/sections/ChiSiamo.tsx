'use client'

import { useRef, useState } from 'react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { FlipCounter } from '@/components/common/FlipCounter'
import { SectionDivider } from '@/components/common/SectionDivider'
import { ShieldCheck, Zap, Users, Award } from 'lucide-react'

const ADVANTAGES = [
  { icon: ShieldCheck, label: 'Attrezzature ESD-safe certificate' },
  { icon: Zap,         label: 'Interventi urgenti H24' },
  { icon: Users,       label: 'Partner white-label per MSP' },
  { icon: Award,       label: 'D.Lgs. 81/2008 — Sicurezza' },
]

const MILESTONES = [
  { year: '2016', label: 'Fondazione NOSHUT' },
  { year: '2018', label: 'Primo contratto enterprise' },
  { year: '2020', label: '50+ data center serviti' },
  { year: '2024', label: '120+ clienti attivi' },
]

const PARTNER_TYPES = [
  { num: '01', title: 'System Integrator', desc: 'Subappalto operativo su cantieri IT in tutta Italia.' },
  { num: '02', title: 'MSP & Managed Services', desc: 'Supporto tecnico on-site per i tuoi clienti finali.' },
  { num: '03', title: 'Pubblica Amministrazione', desc: 'Iscritti ai principali albi fornitori PA.' },
  { num: '04', title: 'Enterprise & Corporate', desc: 'SLA dedicati e contratti pluriennali.' },
]

/* Interactive gear that follows mouse */
function InteractiveGear() {
  const gearRef = useRef<SVGSVGElement>(null)
  const [rotation, setRotation] = useState(0)
  const lastX = useRef(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const dx = e.clientX - lastX.current
    setRotation((r) => r + dx * 0.8)
    lastX.current = e.clientX
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex items-center justify-center h-72 cursor-pointer select-none"
      title="Muovi il mouse per far girare l'ingranaggio"
    >
      <svg
        ref={gearRef}
        viewBox="0 0 200 200"
        className="w-64 h-64 opacity-60"
        style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.05s linear' }}
      >
        {/* Outer gear teeth */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2
          const ox = 100 + Math.cos(angle) * 88
          const oy = 100 + Math.sin(angle) * 88
          const w = 9
          const h = 14
          return (
            <rect
              key={i}
              x={ox - w / 2}
              y={oy - h / 2}
              width={w}
              height={h}
              fill="#C8A04C"
              opacity={0.8}
              rx={2}
              transform={`rotate(${(i / 16) * 360}, ${ox}, ${oy})`}
            />
          )
        })}
        {/* Main circle */}
        <circle cx="100" cy="100" r="76" fill="none" stroke="#C8A04C" strokeWidth="2" opacity="0.4" />
        <circle cx="100" cy="100" r="72" fill="#2A2F3A" stroke="#C8A04C" strokeWidth="1" opacity="0.6" />
        {/* Inner rings */}
        <circle cx="100" cy="100" r="52" fill="none" stroke="#C8A04C" strokeWidth="0.5" opacity="0.3" />
        <circle cx="100" cy="100" r="36" fill="none" stroke="#C8A04C" strokeWidth="0.5" opacity="0.3" />
        {/* Spokes */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 36}
              y1={100 + Math.sin(a) * 36}
              x2={100 + Math.cos(a) * 68}
              y2={100 + Math.sin(a) * 68}
              stroke="#C8A04C"
              strokeWidth="2"
              opacity="0.5"
            />
          )
        })}
        {/* Center */}
        <circle cx="100" cy="100" r="14" fill="#1A1D24" stroke="#C8A04C" strokeWidth="2" opacity="0.8" />
        <circle cx="100" cy="100" r="6"  fill="#C8A04C" opacity="0.9" />
        {/* Small bolt holes */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2
          return <circle key={i} cx={100 + Math.cos(a) * 52} cy={100 + Math.sin(a) * 52} r="4" fill="#1A1D24" stroke="#C8A04C" strokeWidth="0.8" opacity="0.6" />
        })}
      </svg>
      <span className="absolute bottom-0 font-mono text-[9px] text-brass/30 tracking-[0.3em] uppercase">
        Muovi il mouse →
      </span>
    </div>
  )
}

export function ChiSiamo() {
  return (
    <>
      <SectionDivider label="L'Orologiaio" />
      <section id="chi-siamo" className="py-24 bg-steel-dark noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left */}
            <SectionWrapper>
              <div className="section-label">III. L&apos;Orologiaio</div>
              <h2 className="font-display font-bold text-platinum leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                Precisione tecnica.<br />
                <span className="text-brass-gradient">Zero compromessi.</span>
              </h2>
              <p className="font-body text-platinum/40 leading-relaxed mb-4">
                NOSHUT nasce dall&apos;esperienza di Luigi Agostino nel settore IT: anni di cantieri, data center e infrastrutture critiche hanno generato una specializzazione unica in Italia.
              </p>
              <p className="font-body text-platinum/40 leading-relaxed mb-10">
                Non siamo una società di pulizie generica. Siamo tecnici IT che capiscono le infrastrutture che toccano.
              </p>

              {/* Flip counters */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { val: 500, suf: '+', label: 'Rack bonificati' },
                  { val: 8, suf: ' anni', label: 'Esperienza' },
                  { val: 120, suf: '+', label: 'Clienti attivi' },
                  { val: 100, suf: '%', label: 'Soddisfazione' },
                ].map((k) => (
                  <div key={k.label} className="card-metal rounded p-4">
                    <FlipCounter value={k.val} suffix={k.suf} className="text-2xl mb-0.5" />
                    <div className="font-mono text-[10px] tracking-widest uppercase text-platinum/30">{k.label}</div>
                  </div>
                ))}
              </div>

              {/* Advantages */}
              <ul className="space-y-3">
                {ADVANTAGES.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-platinum/50 font-body">
                    <span className="w-8 h-8 rounded border border-brass/20 bg-brass/8 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-brass" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </SectionWrapper>

            {/* Right */}
            <SectionWrapper delay={0.15}>
              {/* Interactive gear */}
              <InteractiveGear />

              {/* Partner types */}
              <div className="space-y-2 mt-4">
                {PARTNER_TYPES.map((p) => (
                  <div
                    key={p.num}
                    className="group flex items-start gap-4 card-metal rounded px-5 py-4 hover:border-brass/40 transition-all duration-300"
                  >
                    <span className="font-mono text-2xl font-bold text-brass/15 group-hover:text-brass/30 transition-colors leading-none pt-0.5 shrink-0">
                      {p.num}
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-platinum/80 mb-0.5 group-hover:text-platinum transition-colors">{p.title}</h4>
                      <p className="font-body text-xs text-platinum/30">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </div>

          {/* Timeline escapement */}
          <div className="mt-20 pt-10 border-t border-brass/10">
            <div className="font-mono text-[10px] tracking-[0.25em] text-brass/40 uppercase mb-8 text-center">Cronologia</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brass/10">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="bg-steel-dark px-6 py-5">
                  <div className="font-mono text-xs text-brass/40 mb-1 tracking-widest">{m.year}</div>
                  <div className="font-body text-sm text-platinum/60">{m.label}</div>
                  {/* Escapement tick */}
                  <div className="mt-3 flex items-center gap-1">
                    {Array.from({ length: i + 1 }).map((_, j) => (
                      <div key={j} className="w-1.5 h-1.5 rounded-full bg-brass/50" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

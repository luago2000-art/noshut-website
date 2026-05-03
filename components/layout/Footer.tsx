import { COMPANY, NAV_ITEMS } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-steel-dark border-t border-brass/10 noise-bg">

      {/* Caseback decorative strip */}
      <div className="border-b border-brass/10 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          {/* SVG caseback circle */}
          <svg viewBox="0 0 340 80" className="w-full max-w-lg opacity-60" aria-hidden="true">
            {/* Horizontal rule lines */}
            <line x1="0" y1="40" x2="90" y2="40" stroke="#C8A04C" strokeWidth="0.5" opacity="0.4" />
            <line x1="250" y1="40" x2="340" y2="40" stroke="#C8A04C" strokeWidth="0.5" opacity="0.4" />
            {/* Diamond ornament left */}
            <polygon points="95,40 100,35 105,40 100,45" fill="none" stroke="#C8A04C" strokeWidth="0.8" opacity="0.6" />
            {/* Diamond ornament right */}
            <polygon points="235,40 240,35 245,40 240,45" fill="none" stroke="#C8A04C" strokeWidth="0.8" opacity="0.6" />
            {/* Center text */}
            <text x="170" y="36" textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
              fontSize="7" letterSpacing="6" fill="#C8A04C" opacity="0.5" fontWeight="400">
              NOSHUT
            </text>
            <text x="170" y="50" textAnchor="middle" fontFamily="'JetBrains Mono', monospace"
              fontSize="5.5" letterSpacing="3" fill="#C8A04C" opacity="0.3">
              ROMA · ITALIA · EST. 2016
            </text>
            {/* Tick marks */}
            {Array.from({ length: 32 }).map((_, i) => {
              const x = i * (340 / 32) + 5
              const isMajor = i % 8 === 0
              return (
                <line key={i} x1={x} y1={isMajor ? 10 : 14} x2={x} y2={isMajor ? 22 : 18}
                  stroke="#C8A04C" strokeWidth={isMajor ? 1 : 0.5} opacity={isMajor ? 0.5 : 0.2} />
              )
            })}
            {Array.from({ length: 32 }).map((_, i) => {
              const x = i * (340 / 32) + 5
              const isMajor = i % 8 === 0
              return (
                <line key={i} x1={x} y1={isMajor ? 58 : 62} x2={x} y2={isMajor ? 70 : 66}
                  stroke="#C8A04C" strokeWidth={isMajor ? 1 : 0.5} opacity={isMajor ? 0.5 : 0.2} />
              )
            })}
          </svg>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo/logo.png" alt="NOSHUT" width={28} height={28} className="w-7 h-7 object-contain opacity-90" />
              <span className="font-display text-xl font-bold tracking-[0.15em] text-platinum">
                NO<span className="text-brass-gradient">SHUT</span>
              </span>
            </div>
            <p className="font-body text-xs text-platinum/35 leading-relaxed max-w-xs mb-5">
              Specialisti in pulizia rack e bonifica data center. Partner B2B affidabile per system integrator e appalti pubblici IT in tutta Italia.
            </p>
            {/* Engraved spec */}
            <div className="border border-brass/10 rounded px-3 py-2.5 space-y-1">
              {[
                ['P.IVA', COMPANY.piva],
                ['PEC', COMPANY.pec],
                ['D.Lgs.', '81/2008'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] text-brass/30 uppercase">{k}</span>
                  <span className="font-mono text-[9px] text-platinum/25">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-brass/40 uppercase mb-5">Navigazione</h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} className="flex items-center gap-3">
                  <span className="font-mono text-[9px] text-brass/25">{String(i + 1).padStart(2, '0')}</span>
                  <a
                    href={item.href}
                    className="font-body text-sm text-platinum/40 hover:text-platinum/80 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-brass/40 uppercase mb-5">Contatti</h4>
            <ul className="space-y-3">
              <li>
                <span className="font-mono text-[9px] tracking-[0.15em] text-brass/25 uppercase block mb-0.5">Email</span>
                <a href={`mailto:${COMPANY.email}`}
                  className="font-mono text-xs text-platinum/40 hover:text-platinum/80 transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <span className="font-mono text-[9px] tracking-[0.15em] text-brass/25 uppercase block mb-0.5">Sede</span>
                <span className="font-body text-xs text-platinum/35">{COMPANY.address}</span>
              </li>
              <li>
                <span className="font-mono text-[9px] tracking-[0.15em] text-brass/25 uppercase block mb-0.5">Operatività</span>
                <span className="font-body text-xs text-platinum/35">24/7 — Interventi urgenti H24</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom caseback stamp */}
        <div className="pt-6 border-t border-brass/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[9px] text-platinum/20 tracking-[0.2em] uppercase">
            © {year} {COMPANY.name} — {COMPANY.owner} — Tutti i diritti riservati
          </div>
          <div className="flex items-center gap-3">
            {/* Status dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-brass/60 animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-brass/30 uppercase">Sistema Attivo</span>
            {/* Serial number decoration */}
            <span className="font-mono text-[9px] text-platinum/10 ml-4">SN·NST-{year}-001</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

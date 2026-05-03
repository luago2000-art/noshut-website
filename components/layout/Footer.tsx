import { COMPANY, NAV_ITEMS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <img src="/logo/logo.png" alt="NOSHUT" width={32} height={32} className="w-8 h-8 object-contain" />
              <span className="text-2xl font-black tracking-[0.15em] text-white font-display">
                NO<span className="text-[#00E5FF]">SHUT</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-white/40 leading-relaxed max-w-xs">
              Specialisti in pulizia rack e bonifica data center. Partner B2B affidabile per system integrator e appalti pubblici IT.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Navigazione</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/50 hover:text-[#00E5FF] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Contatti</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-[#00E5FF] transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li>{COMPANY.address}</li>
              <li className="text-white/30">P.IVA {COMPANY.piva}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <span>© {new Date().getFullYear()} {COMPANY.name} — {COMPANY.owner}. Tutti i diritti riservati.</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            Online 24/7
          </span>
        </div>
      </div>
    </footer>
  )
}

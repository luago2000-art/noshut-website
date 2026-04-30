import Link from 'next/link'
import { Mail, MapPin, FileText, ArrowRight } from 'lucide-react'
import { COMPANY, NAV_ITEMS, SERVICES } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="relative bg-[#04061A] overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />

      {/* Mesh bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-64 bg-blue-600/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-1/3 w-64 h-48 bg-cyan-500/4 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CTA strip */}
        <div className="py-10 border-b border-white/[0.06]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold font-heading text-lg mb-1">
                Pronto a lavorare con noi?
              </p>
              <p className="text-sm text-white/40">Risposta garantita entro 24 ore lavorative.</p>
            </div>
            <Link
              href="#contatti"
              className="group shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl gradient-primary text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-px transition-all duration-300"
            >
              Richiedi Preventivo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 mb-5">
              <span className="text-2xl font-black font-heading text-white">NO</span>
              <span className="text-2xl font-black font-heading text-gradient">SHUT</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              {COMPANY.description}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/35 font-mono">P.IVA {COMPANY.piva}</span>
            </div>
          </div>

          {/* Col 2: Servizi */}
          <div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">Servizi</h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href="#servizi"
                    className="text-sm text-white/45 hover:text-white/80 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#0066FF]/40 group-hover:bg-[#0066FF] transition-colors" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contatti */}
          <div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">Contatti</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#0066FF] mt-0.5 shrink-0" />
                <span className="text-sm text-white/45 leading-relaxed">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm text-white/45 hover:text-white/75 transition-colors"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FileText className="w-3.5 h-3.5 text-[#0066FF] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-white/25 mb-0.5 uppercase tracking-wider">PEC</p>
                  <a
                    href={`mailto:${COMPANY.pec}`}
                    className="text-sm text-white/45 hover:text-white/75 transition-colors break-all"
                  >
                    {COMPANY.pec}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Info Legali */}
          <div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">Info Legali</h3>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-white/40">{COMPANY.fullName}</span></li>
              <li><span className="text-sm text-white/40">P.IVA: {COMPANY.piva}</span></li>
              <li><span className="text-sm text-white/40">Regime Forfettario</span></li>
              <li className="pt-2 space-y-2">
                <Link href="#" className="block text-sm text-white/30 hover:text-white/55 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-sm text-white/30 hover:text-white/55 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} {COMPANY.fullName}. Tutti i diritti riservati.
          </p>
          <nav className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

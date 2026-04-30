import Link from 'next/link'
import { Mail, MapPin, FileText } from 'lucide-react'
import { COMPANY, NAV_ITEMS, SERVICES } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-[#060917] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold font-heading text-white">NO</span>
              <span className="text-2xl font-bold font-heading text-[#0066FF]">SHUT</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              {COMPANY.description}
            </p>
            <p className="text-xs text-white/30">P.IVA: {COMPANY.piva}</p>
          </div>

          {/* Col 2: Servizi */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 font-heading">Servizi</h3>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href="#servizi"
                    className="text-sm text-white/50 hover:text-white/80 transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contatti */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 font-heading">Contatti</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0066FF] mt-0.5 shrink-0" />
                <span className="text-sm text-white/50">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0066FF] shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm text-white/50 hover:text-white/80 transition-colors"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-[#0066FF] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-white/30">PEC</p>
                  <a
                    href={`mailto:${COMPANY.pec}`}
                    className="text-sm text-white/50 hover:text-white/80 transition-colors break-all"
                  >
                    {COMPANY.pec}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Info Legali */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 font-heading">Info Legali</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-white/50">{COMPANY.fullName}</span>
              </li>
              <li>
                <span className="text-sm text-white/50">P.IVA: {COMPANY.piva}</span>
              </li>
              <li>
                <span className="text-sm text-white/50">Regime Forfettario</span>
              </li>
              <li className="pt-2">
                <Link
                  href="#"
                  className="text-sm text-white/40 hover:text-white/60 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-white/40 hover:text-white/60 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {COMPANY.fullName}. Tutti i diritti riservati.
          </p>
          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-white/30 hover:text-white/50 transition-colors"
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

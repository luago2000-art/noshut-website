'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS, COMPANY } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.querySelector(n.href))
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`) }),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled ? 'glass-dark py-3' : 'py-5',
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
          aria-label="Torna in cima"
        >
          <img src="/logo/logo.png" alt="NOSHUT" width={32} height={32} className="w-8 h-8 object-contain" style={{ filter: 'brightness(0) invert(1) sepia(0.65) saturate(4) hue-rotate(5deg)', opacity: 0.92 }} />
          <span className="font-display font-bold text-lg tracking-[0.12em] text-platinum group-hover:text-brass transition-colors duration-300">
            NO<span className="text-brass">SHUT</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className={cn(
                'px-4 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-200',
                active === item.href
                  ? 'text-brass border-b border-brass/60'
                  : 'text-platinum/40 hover:text-platinum/80',
              )}
            >
              <span className="text-brass/40 mr-1">{String(i + 1).padStart(2, '0')}.</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${COMPANY.email}`}
            className="hidden sm:inline-flex btn-mechanical px-5 py-2 text-xs tracking-widest uppercase rounded font-mono"
          >
            Preventivo
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-platinum/60 hover:text-brass transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-2 mx-4 rounded border border-brass/15 bg-steel-mid overflow-hidden">
          <nav className="py-2">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="w-full text-left px-5 py-3 font-mono text-xs tracking-widest uppercase text-platinum/50 hover:text-brass hover:bg-brass/5 transition-colors"
              >
                <span className="text-brass/30 mr-2">{String(i + 1).padStart(2, '0')}.</span>
                {item.label}
              </button>
            ))}
            <div className="mx-4 mb-3 mt-2">
              <a href={`mailto:${COMPANY.email}`}
                className="block text-center py-2.5 btn-mechanical text-xs tracking-widest uppercase rounded font-mono">
                Richiedi Preventivo
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

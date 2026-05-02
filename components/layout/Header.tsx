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
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'py-5',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
          aria-label="Torna in cima"
        >
          <span className="text-xl font-black tracking-[0.15em] text-white font-display group-hover:text-[#00E5FF] transition-colors duration-300">
            NO<span className="text-[#00E5FF]">SHUT</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                active === item.href
                  ? 'text-[#00E5FF] bg-[#00E5FF]/8'
                  : 'text-white/50 hover:text-white hover:bg-white/5',
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${COMPANY.email}`}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider text-[#050505] bg-[#00E5FF] rounded-lg hover:bg-white transition-colors duration-200 uppercase"
          >
            Preventivo
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-2 mx-4 rounded-2xl bg-[#0D0D0D] border border-white/[0.08] overflow-hidden">
          <nav className="py-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="w-full text-left px-5 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="mx-4 mb-3 mt-1">
              <a
                href={`mailto:${COMPANY.email}`}
                className="block text-center py-2.5 text-xs font-bold tracking-wider text-[#050505] bg-[#00E5FF] rounded-lg uppercase"
              >
                Richiedi Preventivo
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

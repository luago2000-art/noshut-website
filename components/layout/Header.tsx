'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS, COMPANY } from '@/lib/constants'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-dark shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-1">
              <span className="text-xl md:text-2xl font-bold tracking-tight font-heading text-white">
                NO
              </span>
              <span className="text-xl md:text-2xl font-bold tracking-tight font-heading text-[#0066FF]">
                SHUT
              </span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-white/20 mx-1" />
            <span className="hidden sm:block text-xs text-white/50 font-sans">
              Data Center Services
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="#contatti"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg gradient-primary hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25"
            >
              Richiedi Preventivo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-dark border-t border-white/10">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contatti"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white rounded-lg gradient-primary"
            >
              Richiedi Preventivo
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

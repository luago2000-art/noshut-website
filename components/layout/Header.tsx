'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowRight } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.href.replace('#', '')).filter(Boolean)
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.35 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'glass-dark shadow-2xl shadow-black/40' : 'bg-transparent'
      }`}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            href="#hero"
            className="flex items-center gap-3 group"
            onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            <Image
              src="/logo/logo.png"
              alt="NOSHUT"
              width={40}
              height={28}
              className="h-7 w-auto object-contain"
            />
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-black tracking-tight font-heading text-white group-hover:text-white/90 transition-colors">
                NO
              </span>
              <span className="text-xl md:text-2xl font-black tracking-tight font-heading text-gradient">
                SHUT
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm transition-all duration-200 rounded-lg font-medium ${
                    isActive
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/85 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-px bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="#contatti"
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl gradient-primary hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-px"
            >
              Preventivo
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-dark border-t border-white/[0.07]">
          <nav className="px-4 py-5 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contatti"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-white rounded-xl gradient-primary shadow-lg shadow-blue-500/25"
            >
              Richiedi Preventivo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

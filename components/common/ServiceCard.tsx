'use client'

import { useState } from 'react'
import { Server, Cable, Building2, CalendarCheck, Handshake, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ServiceItem } from '@/lib/types'

const ICONS: Record<string, React.ElementType> = {
  Server, Cable, Building2, CalendarCheck, Handshake, MapPin,
}

interface ServiceCardProps {
  service: ServiceItem
  index: number
  featured?: boolean
}

export function ServiceCard({ service, index, featured = false }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false)
  const Icon = ICONS[service.icon] ?? Server

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group relative rounded-2xl p-6 transition-all duration-500 cursor-default overflow-hidden shimmer-card top-glow-line',
        'bg-white/[0.04] border border-white/[0.07]',
        hovered && '-translate-y-2 border-[#0066FF]/35 shadow-2xl shadow-blue-900/30',
        featured && 'md:col-span-2 lg:col-span-1',
      )}
    >
      {/* Gradient overlay on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none',
          hovered ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          background:
            'linear-gradient(135deg, rgba(0,102,255,0.1) 0%, rgba(0,212,255,0.05) 60%, transparent 100%)',
        }}
      />

      {/* Large index watermark */}
      <div className="absolute top-3 right-4 text-8xl font-black font-heading text-white/[0.03] leading-none select-none pointer-events-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="relative">
        {/* Icon */}
        <div
          className={cn(
            'inline-flex p-3.5 rounded-xl mb-5 transition-all duration-400',
            hovered
              ? 'gradient-primary shadow-xl shadow-blue-500/40'
              : 'bg-[#0066FF]/12 border border-[#0066FF]/20',
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        <h3
          className={cn(
            'text-base font-bold font-heading mb-2.5 transition-colors duration-300',
            hovered ? 'text-[#00D4FF]' : 'text-white',
          )}
        >
          {service.title}
        </h3>

        <p className="text-sm text-white/50 mb-5 leading-relaxed line-clamp-3">
          {service.description}
        </p>

        <ul className="space-y-1.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-xs text-white/40">
              <span
                className={cn(
                  'w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300',
                  hovered ? 'bg-[#00D4FF] shadow-[0_0_6px_rgba(0,212,255,0.8)]' : 'bg-[#0066FF]/50',
                )}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

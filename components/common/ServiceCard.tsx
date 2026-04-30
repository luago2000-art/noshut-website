'use client'

import { useState } from 'react'
import {
  Server,
  Cable,
  Building2,
  CalendarCheck,
  Handshake,
  MapPin,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ServiceItem } from '@/lib/types'

const ICONS: Record<string, React.ElementType> = {
  Server,
  Cable,
  Building2,
  CalendarCheck,
  Handshake,
  MapPin,
}

interface ServiceCardProps {
  service: ServiceItem
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false)
  const Icon = ICONS[service.icon] ?? Server

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? 'translateY(-8px) rotateX(2deg)' : 'translateY(0) rotateX(0)',
        transition: 'transform 0.3s ease',
        transformStyle: 'preserve-3d',
        transitionDelay: `${index * 40}ms`,
      }}
      className={cn(
        'relative rounded-2xl p-6 border transition-all duration-300 cursor-default',
        'bg-white/5 border-white/10',
        hovered && 'bg-white/8 border-[#0066FF]/40 shadow-xl shadow-blue-500/10',
      )}
    >
      {/* Glow on hover */}
      {hovered && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0066FF]/10 to-transparent pointer-events-none" />
      )}

      <div className="relative">
        <div
          className={cn(
            'inline-flex p-3 rounded-xl mb-4 transition-all duration-300',
            hovered ? 'gradient-primary' : 'bg-[#0066FF]/20',
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-lg font-semibold font-heading text-white mb-2">{service.title}</h3>
        <p className="text-sm text-white/60 mb-4 leading-relaxed">{service.description}</p>

        <ul className="space-y-1.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-xs text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

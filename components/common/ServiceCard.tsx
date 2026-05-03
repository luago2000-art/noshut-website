'use client'

import { useRef } from 'react'
import Tilt from 'react-parallax-tilt'
import { cn } from '@/lib/utils'
import type { ServiceItem } from '@/lib/types'

const GEAR_PATHS: Record<string, string> = {
  Server: 'M12 2a10 10 0 100 20A10 10 0 0012 2zm0 14a4 4 0 110-8 4 4 0 010 8z',
  Cable: 'M8 3h8v2H8V3zm0 7h8v2H8v-2zm0 7h8v2H8v-2zM4 3h2v18H4V3zm14 0h2v18h-2V3z',
  Building2: 'M3 21V7l9-4 9 4v14H3zm6-7h2v4H9v-4zm4 0h2v4h-2v-4z',
  CalendarCheck: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13zm-9-5l-3-3 1.4-1.4L10 13.2l5.6-5.6L17 9l-7 7z',
  Handshake: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z',
  MapPin: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
}

interface ServiceCardProps {
  service: ServiceItem
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const iconPath = GEAR_PATHS[service.icon] ?? GEAR_PATHS.Server

  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      glareEnable
      glareMaxOpacity={0.06}
      glareColor="#C8A04C"
      glareBorderRadius="4px"
      transitionSpeed={400}
      className="h-full"
    >
      <div className="group relative h-full card-metal rounded p-6 transition-all duration-400 gear-hover overflow-hidden">

        {/* Engrave path — top border animation on hover */}
        <svg className="absolute top-0 left-0 w-full pointer-events-none" height="2" preserveAspectRatio="none">
          <line x1="0" y1="1" x2="100%" y2="1"
            stroke="#C8A04C" strokeWidth="1.5"
            className="engrave-path group-hover:[stroke-dashoffset:0] transition-all duration-700"
            style={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          />
        </svg>

        {/* Index watermark */}
        <div className="absolute top-4 right-5 font-mono text-6xl font-bold text-brass/[0.06] leading-none select-none pointer-events-none">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="relative">
          {/* Gear icon */}
          <div className="mb-5 inline-flex w-11 h-11 items-center justify-center rounded border border-brass/25 bg-brass/8 group-hover:border-brass/60 group-hover:bg-brass/15 transition-all duration-300">
            <svg viewBox="0 0 24 24" className="w-5 h-5 gear-icon" fill="none" stroke="#C8A04C" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
            </svg>
          </div>

          {/* Spec number */}
          <div className="font-mono text-[10px] tracking-[0.25em] text-brass/50 mb-2 uppercase">
            Component · {String(index + 1).padStart(2, '0')}
          </div>

          <h3 className="font-display font-semibold text-platinum text-base mb-2.5 group-hover:text-brass transition-colors duration-300">
            {service.title}
          </h3>

          <p className="text-sm text-platinum/40 leading-relaxed mb-5 line-clamp-3">
            {service.description}
          </p>

          <ul className="space-y-1.5">
            {service.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-platinum/35 font-mono">
                <span className="w-1 h-1 rounded-full bg-brass/50 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Tilt>
  )
}

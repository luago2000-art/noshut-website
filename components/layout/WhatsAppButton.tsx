'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '39XXXXXXXXXX'
const WA_MESSAGE = encodeURIComponent('Ciao NOSHUT! Vorrei richiedere un preventivo per un intervento.')

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Contattaci su WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-0 transition-all duration-300 cursor-pointer"
      style={{
        borderRadius: '999px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(37,211,102,0.25)',
      }}
    >
      <div
        className="relative flex items-center transition-all duration-300 bg-[#128C7E] overflow-hidden"
        style={{
          borderRadius: '999px',
          height: '52px',
          padding: hovered ? '0 20px 0 14px' : '0 14px',
          width: hovered ? 'auto' : '52px',
          maxWidth: hovered ? '260px' : '52px',
        }}
      >
        <MessageCircle className="w-6 h-6 text-white shrink-0" />
        <span
          className="ml-2.5 text-white text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300"
          style={{
            maxWidth: hovered ? '180px' : '0px',
            opacity: hovered ? 1 : 0,
          }}
        >
          Scrivici su WhatsApp
        </span>
      </div>

      {/* Pulse ring when not hovered */}
      {!hovered && (
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping pointer-events-none"
          aria-hidden
        />
      )}
    </a>
  )
}

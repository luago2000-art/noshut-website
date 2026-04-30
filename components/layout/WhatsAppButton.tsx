'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '39XXXXXXXXXX'
  const href = `https://wa.me/${number}?text=Ciao%20NOSHUT%2C%20vorrei%20richiedere%20un%20preventivo.`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{ background: '#25D366' }}
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
    </a>
  )
}

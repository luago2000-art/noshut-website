'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { SERVICE_OPTIONS } from '@/lib/constants'

type State = 'idle' | 'loading' | 'success' | 'error'

const fieldClass =
  'w-full bg-steel-dark border border-brass/15 rounded px-4 py-3 text-sm text-platinum font-body placeholder:text-platinum/20 focus:outline-none focus:border-brass/60 focus:ring-1 focus:ring-brass/20 transition-all duration-200'

const labelClass = 'block font-mono text-[10px] tracking-[0.2em] text-brass/50 uppercase mb-1.5'

export function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setState('success')
        form.reset()
      } else {
        const json = await res.json().catch(() => ({}))
        setErrorMsg(
          json.error === 'rate_limit'
            ? 'Troppi tentativi. Riprova tra qualche minuto.'
            : 'Errore nell\'invio. Scrivici direttamente via email.',
        )
        setState('error')
      }
    } catch {
      setErrorMsg('Errore di rete. Controlla la connessione e riprova.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
        {/* Gear checkmark */}
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 64 64" className="w-full h-full" style={{ animation: 'gear-spin 4s linear infinite' }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2
              return (
                <rect key={i} x={32 + Math.cos(a) * 26 - 3} y={32 + Math.sin(a) * 26 - 5}
                  width={6} height={10} fill="#C8A04C" opacity={0.7} rx={1}
                  transform={`rotate(${(i / 12) * 360}, ${32 + Math.cos(a) * 26}, ${32 + Math.sin(a) * 26})`} />
              )
            })}
            <circle cx="32" cy="32" r="20" fill="#2A2F3A" stroke="#C8A04C" strokeWidth="1.5" opacity="0.8" />
            <path d="M22 32l7 7 13-13" stroke="#C8A04C" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h3 className="font-display font-semibold text-platinum mb-1">Messaggio trasmesso</h3>
          <p className="font-body text-sm text-platinum/40 max-w-xs">
            Risponderemo entro 24 ore lavorative all&apos;email indicata.
          </p>
        </div>
        <button
          onClick={() => setState('idle')}
          className="font-mono text-[10px] tracking-[0.2em] text-brass/60 hover:text-brass uppercase border border-brass/20 hover:border-brass/50 px-4 py-2 rounded transition-all duration-200"
        >
          Nuovo messaggio
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>Nome e Cognome *</label>
          <input id="name" name="name" type="text" required minLength={2}
            placeholder="Mario Rossi" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>Azienda</label>
          <input id="company" name="company" type="text"
            placeholder="TechCorp Srl" className={fieldClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" required
            placeholder="mario@azienda.it" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Telefono</label>
          <input id="phone" name="phone" type="tel"
            placeholder="+39 06 XXXXXXXX" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>Servizio di interesse</label>
        <select id="service" name="service"
          className={fieldClass + ' appearance-none'}>
          <option value="">Seleziona un servizio...</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Messaggio *</label>
        <textarea id="message" name="message" required minLength={10} rows={4}
          placeholder="Descrivi la tua esigenza, tipo di intervento e localizzazione..."
          className={fieldClass + ' resize-none'} />
      </div>

      {state === 'error' && (
        <div className="flex items-start gap-3 px-4 py-3 rounded border border-red-500/20 bg-red-500/5">
          <span className="font-mono text-[9px] tracking-widest text-red-400/80 uppercase mt-0.5">ERR</span>
          <p className="font-body text-sm text-red-400/80">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="btn-mechanical w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="font-mono text-xs tracking-[0.2em]">TRASMISSIONE...</span>
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            <span className="font-mono text-xs tracking-[0.2em]">INVIA RICHIESTA</span>
          </>
        )}
      </button>

      <p className="font-mono text-[9px] text-center text-platinum/20 tracking-widest uppercase">
        Risposta garantita · 24h lavorative · Nessuno spam
      </p>
    </form>
  )
}

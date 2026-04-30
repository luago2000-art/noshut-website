'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { SERVICE_OPTIONS } from '@/lib/constants'

type State = 'idle' | 'loading' | 'success' | 'error'

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
            : 'Errore nell\'invio. Riprova o scrivici direttamente via email.',
        )
        setState('error')
      }
    } catch {
      setErrorMsg('Errore di rete. Controlla la connessione e riprova.')
      setState('error')
    }
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#0066FF]/60 focus:ring-1 focus:ring-[#0066FF]/40 transition-all'
  const labelClass = 'block text-sm font-medium text-white/70 mb-1.5'

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-400" />
        <h3 className="text-xl font-semibold font-heading text-white">Messaggio inviato!</h3>
        <p className="text-white/60 max-w-sm">
          Ti risponderemo entro 24 ore lavorative all&apos;indirizzo email che hai indicato.
        </p>
        <button
          onClick={() => setState('idle')}
          className="mt-4 text-sm text-[#0066FF] hover:underline"
        >
          Invia un altro messaggio
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nome e Cognome *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            placeholder="Mario Rossi"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Azienda
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="TechCorp Srl"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="mario@azienda.it"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Telefono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+39 06 XXXXXXXX"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          Servizio di interesse
        </label>
        <select id="service" name="service" className={inputClass}>
          <option value="">Seleziona un servizio...</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Messaggio *
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Descrivi la tua esigenza, il tipo di intervento e la localizzazione..."
          className={inputClass}
        />
      </div>

      {state === 'error' && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <p className="text-sm text-red-300">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Invio in corso...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Invia Richiesta
          </>
        )}
      </button>

      <p className="text-xs text-center text-white/30">
        Risposta garantita entro 24 ore lavorative. Nessuno spam.
      </p>
    </form>
  )
}

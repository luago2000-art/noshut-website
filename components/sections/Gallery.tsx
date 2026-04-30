'use client'

import { useEffect, useState } from 'react'
import { ImageOff } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BeforeAfterSlider } from '@/components/common/BeforeAfterSlider'
import { SectionWrapper } from '@/components/common/SectionWrapper'

const FOLDER_LABELS: Record<string, { title: string; description: string; location: string }> = {
  'lavoro-01': {
    title: 'Rack Server — Riordino Completo',
    description: 'Riordino cablaggi e pulizia approfondita rack 42U',
    location: 'Roma, RM',
  },
  'lavoro-02': {
    title: 'Data Center — Bonifica Post-Cantiere',
    description: 'Bonifica completa dopo lavori di ristrutturazione',
    location: 'Milano, MI',
  },
  'lavoro-03': {
    title: 'Server Room — Manutenzione Periodica',
    description: 'Intervento di manutenzione trimestrale programmata',
    location: 'Napoli, NA',
  },
}

export function Gallery() {
  const [folders, setFolders] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        setFolders(data.folders ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const selectedMeta = selected ? FOLDER_LABELS[selected] : null

  return (
    <section id="gallery" className="py-24 bg-[#080C22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <p className="text-sm font-semibold text-[#0066FF] uppercase tracking-widest mb-3">
            I nostri lavori
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Prima &amp; Dopo
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Trascina il cursore per confrontare lo stato prima e dopo ogni intervento. I risultati
            parlano da soli.
          </p>
        </SectionWrapper>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && folders.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <ImageOff className="w-16 h-16 text-white/20" />
            <p className="text-white/40 text-lg">
              Le foto dei lavori saranno disponibili a breve.
            </p>
            <p className="text-white/30 text-sm">
              Carica le immagini in{' '}
              <code className="text-[#00D4FF]/60">public/images/before-after/lavoro-XX/</code>
            </p>
          </div>
        )}

        {!loading && folders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {folders.map((folder, i) => {
              const meta = FOLDER_LABELS[folder]
              return (
                <SectionWrapper key={folder} delay={i * 0.1}>
                  <button
                    onClick={() => setSelected(folder)}
                    className="w-full text-left group"
                    aria-label={`Apri gallery ${meta?.title || folder}`}
                  >
                    <BeforeAfterSlider
                      folder={folder}
                      title={meta?.title}
                    />
                    {meta && (
                      <div className="mt-3 px-1">
                        <p className="text-xs text-[#00D4FF] mb-1">{meta.location}</p>
                        <p className="text-sm text-white/60">{meta.description}</p>
                      </div>
                    )}
                  </button>
                </SectionWrapper>
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#0A0E27] border-white/10">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-white font-heading">
              {selectedMeta?.title ?? selected}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="p-6 pt-4">
              <BeforeAfterSlider folder={selected} />
              {selectedMeta && (
                <div className="mt-4 flex items-center justify-between text-sm text-white/50">
                  <span>{selectedMeta.description}</span>
                  <span>{selectedMeta.location}</span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

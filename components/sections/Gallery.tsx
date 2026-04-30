'use client'

import { useEffect, useState } from 'react'
import { ImageOff, Eye } from 'lucide-react'
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
    <section id="gallery" className="py-28 bg-[#0A0E27] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/20 to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-12 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <span className="section-label">I nostri lavori</span>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-5">
            Prima &amp;{' '}
            <span className="text-gradient">Dopo</span>
          </h2>
          <p className="text-white/45 max-w-xl mx-auto text-lg leading-relaxed">
            Trascina il cursore per confrontare ogni intervento. I risultati parlano da soli.
          </p>
        </SectionWrapper>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 rounded-2xl bg-white/[0.04] border border-white/[0.06] animate-pulse" />
            ))}
          </div>
        )}

        {!loading && folders.length === 0 && (
          <div className="flex flex-col items-center gap-5 py-24 text-center">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
              <ImageOff className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/40 text-lg font-medium">Le foto dei lavori saranno disponibili a breve.</p>
            <p className="text-white/25 text-sm">
              Carica le immagini in{' '}
              <code className="text-[#00D4FF]/50 bg-white/5 px-2 py-0.5 rounded">
                public/images/before-after/lavoro-XX/
              </code>
            </p>
          </div>
        )}

        {!loading && folders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {folders.map((folder, i) => {
              const meta = FOLDER_LABELS[folder]
              return (
                <SectionWrapper key={folder} delay={i * 0.1}>
                  <button
                    onClick={() => setSelected(folder)}
                    className="w-full text-left group"
                    aria-label={`Apri gallery ${meta?.title || folder}`}
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] group-hover:border-[#0066FF]/40 transition-all duration-400 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-blue-900/30 top-glow-line">
                      <BeforeAfterSlider folder={folder} title={meta?.title} />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080C22]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex items-center gap-2 text-white text-xs font-semibold">
                          <Eye className="w-3.5 h-3.5" />
                          Visualizza ingrandito
                        </div>
                      </div>
                    </div>

                    {meta && (
                      <div className="mt-3.5 px-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-[#00D4FF] font-semibold tracking-wide">{meta.location}</p>
                        </div>
                        <p className="text-sm text-white/75 font-medium group-hover:text-white transition-colors">{meta.title}</p>
                        <p className="text-xs text-white/40 mt-0.5">{meta.description}</p>
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
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#080C22] border border-white/10 rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-white font-heading font-bold text-lg">
              {selectedMeta?.title ?? selected}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="px-6 pb-6">
              <div className="rounded-xl overflow-hidden">
                <BeforeAfterSlider folder={selected} />
              </div>
              {selectedMeta && (
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-white/45">{selectedMeta.description}</span>
                  <span className="text-[#00D4FF] text-xs font-semibold">{selectedMeta.location}</span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

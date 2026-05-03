'use client'

import { useState, useEffect } from 'react'
import { BeforeAfterSlider } from '@/components/common/BeforeAfterSlider'
import { SectionDivider } from '@/components/common/SectionDivider'
import { SectionWrapper } from '@/components/common/SectionWrapper'

const FALLBACK_PROJECTS = [
  { folder: 'lavoro-01', title: 'Pulizia ventole server — Estrazione e lavaggio' },
  { folder: 'lavoro-02', title: 'Pulizia interna rack — Sede ventole e schede' },
  { folder: 'lavoro-03', title: 'Bonifica data center — Roma' },
]

export function Gallery() {
  const [folders, setFolders] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/gallery').then((r) => r.json()).then((d) => { setFolders(d.folders ?? []); setLoaded(true) }).catch(() => setLoaded(true))
  }, [])

  const projects = folders.length
    ? folders.map((f, i) => ({ folder: f, title: FALLBACK_PROJECTS[i]?.title ?? `Intervento ${i + 1}` }))
    : null

  return (
    <>
      <SectionDivider label="Restauro" />
      <section id="gallery" className="py-24 bg-steel-mid noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper>
            <div className="mb-14">
              <div className="section-label">II. Restauro</div>
              <h2 className="font-display font-bold text-platinum leading-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Ogni intervento,<br />
                <span className="text-brass-gradient">documentato.</span>
              </h2>
              <p className="font-body text-platinum/40 max-w-lg">
                Come un orologiaio che restaura un movimento antico, ogni dettaglio è fotografato prima e dopo l&apos;intervento.
              </p>
            </div>
          </SectionWrapper>

          {!loaded ? (
            <div className="flex items-center justify-center py-24 gap-3">
              <div className="w-6 h-6 border border-brass/40 border-t-brass rounded-full animate-gear-spin" />
              <span className="font-mono text-xs text-platinum/30 tracking-widest">CARICAMENTO...</span>
            </div>
          ) : projects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((p, i) => (
                <SectionWrapper key={p.folder} delay={i * 0.12}>
                  <BeforeAfterSlider folder={p.folder} title={p.title} />
                </SectionWrapper>
              ))}
            </div>
          ) : (
            <div className="border border-brass/15 rounded py-20 text-center bg-steel-dark/50">
              <div className="animate-gear-spin inline-block mb-4">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-brass/30" fill="currentColor">
                  <path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.92c.04-.34.07-.69.07-1.08s-.03-.74-.07-1.08l2.33-1.81c.21-.16.27-.47.12-.71l-2.21-3.83c-.15-.24-.45-.32-.69-.24l-2.75 1.1c-.57-.44-1.18-.81-1.85-1.09l-.42-2.93A.562.562 0 0014 2h-4c-.28 0-.51.2-.55.47l-.42 2.93c-.67.28-1.28.65-1.85 1.09l-2.75-1.1c-.24-.08-.54 0-.69.24L1.53 9.46c-.15.24-.09.55.12.71l2.33 1.81c-.04.34-.07.69-.07 1.08s.03.74.07 1.08l-2.33 1.81c-.21.16-.27.47-.12.71l2.21 3.83c.15.24.45.32.69.24l2.75-1.1c.57.44 1.18.81 1.85 1.09l.42 2.93c.04.27.27.47.55.47h4c.28 0 .51-.2.55-.47l.42-2.93c.67-.28 1.28-.65 1.85-1.09l2.75 1.1c.24.08.54 0 .69-.24l2.21-3.83c.15-.24.09-.55-.12-.71l-2.33-1.81z" />
                </svg>
              </div>
              <p className="font-mono text-xs text-platinum/20 tracking-widest">GALLERY IN ALLESTIMENTO</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

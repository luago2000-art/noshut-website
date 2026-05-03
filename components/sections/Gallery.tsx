'use client'

import { useState, useEffect } from 'react'
import { BeforeAfterSlider } from '@/components/common/BeforeAfterSlider'
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
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((d) => {
        setFolders(d.folders ?? [])
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  const projects = folders.length
    ? folders.map((f, i) => ({
        folder: f,
        title: FALLBACK_PROJECTS[i]?.title ?? `Intervento ${i + 1}`,
      }))
    : null

  return (
    <section id="gallery" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <div className="mb-14">
            <span className="section-label">I nostri lavori</span>
            <h2 className="font-display font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Prima e dopo<br />
              <span className="text-[#00E5FF]">ogni intervento.</span>
            </h2>
            <p className="mt-4 text-white/40 max-w-lg">
              Ogni progetto viene documentato con foto prima e dopo. Scorri il cursore per vedere la trasformazione.
            </p>
          </div>
        </SectionWrapper>

        {!loaded ? (
          <div className="flex items-center justify-center py-24 text-white/20 text-sm">
            Caricamento gallery...
          </div>
        ) : projects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <SectionWrapper key={p.folder} delay={i * 0.1}>
                <BeforeAfterSlider folder={p.folder} title={p.title} />
              </SectionWrapper>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] py-20 text-center">
            <p className="text-white/20 text-sm">
              Le immagini saranno disponibili dopo il primo sopralluogo.
            </p>
            <p className="text-white/10 text-xs mt-2">
              Carica le foto in{' '}
              <code className="bg-white/5 px-1 rounded">public/images/before-after/lavoro-XX/</code>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

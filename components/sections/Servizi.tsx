'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ServiceCard } from '@/components/common/ServiceCard'
import { SectionDivider } from '@/components/common/SectionDivider'
import { SERVICES } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export function Servizi() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.service-card')
    if (!cards?.length) return
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        ease: 'back.out(1.4)',
        stagger: 0.1,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
      },
    )
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <>
      <SectionDivider label="Componenti" />
      <section id="servizi" className="py-24 bg-steel-dark noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-14">
            <div className="section-label">I. Servizi</div>
            <h2 className="font-display font-bold text-platinum leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
              Ogni componente<br />
              <span className="text-brass-gradient">al suo posto.</span>
            </h2>
            <p className="font-body text-platinum/40 max-w-lg">
              Come gli ingranaggi di un meccanismo di precisione, ogni intervento è calibrato, documentato e garantito.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service, i) => (
              <div key={service.title} className="service-card h-full">
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

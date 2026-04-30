import { SectionWrapper } from '@/components/common/SectionWrapper'
import { TestimonialCarousel } from '@/components/common/TestimonialCarousel'

export function Testimonial() {
  return (
    <section className="py-28 bg-[#0A0E27] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <span className="section-label">Cosa dicono i clienti</span>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-4">
            Testimonianze
          </h2>
          <p className="text-white/45 max-w-xl mx-auto text-lg">
            Aziende IT e system integrator che collaborano con NOSHUT da anni.
          </p>
        </SectionWrapper>

        <SectionWrapper delay={0.15}>
          <TestimonialCarousel />
        </SectionWrapper>
      </div>
    </section>
  )
}

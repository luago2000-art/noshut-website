import { SectionWrapper } from '@/components/common/SectionWrapper'
import { TestimonialCarousel } from '@/components/common/TestimonialCarousel'

export function Testimonial() {
  return (
    <section className="py-24 bg-[#080C22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <p className="text-sm font-semibold text-[#0066FF] uppercase tracking-widest mb-3">
            Cosa dicono i clienti
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Testimonianze
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Aziende IT e system integrator che collaborano con NOSHUT da anni.
          </p>
        </SectionWrapper>

        <SectionWrapper delay={0.1}>
          <TestimonialCarousel />
        </SectionWrapper>
      </div>
    </section>
  )
}

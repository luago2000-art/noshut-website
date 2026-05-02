import { TestimonialCarousel } from '@/components/common/TestimonialCarousel'
import { SectionWrapper } from '@/components/common/SectionWrapper'

export function Testimonial() {
  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionWrapper>
          <div className="text-center mb-14">
            <span className="section-label justify-center">Testimonianze</span>
            <h2 className="font-display font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Lo dicono i nostri
              <span className="text-[#00E5FF]"> clienti.</span>
            </h2>
          </div>
        </SectionWrapper>
        <SectionWrapper delay={0.1}>
          <TestimonialCarousel />
        </SectionWrapper>
      </div>
    </section>
  )
}

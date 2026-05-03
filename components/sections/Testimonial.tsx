import { TestimonialCarousel } from '@/components/common/TestimonialCarousel'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionDivider } from '@/components/common/SectionDivider'

export function Testimonial() {
  return (
    <>
      <SectionDivider label="Clienti" />
      <section className="py-24 bg-steel-mid noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper>
            <div className="text-center mb-14">
              <div className="section-label justify-center">IV. Testimonianze</div>
              <h2 className="font-display font-bold text-platinum leading-tight"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Il giudizio dei<br />
                <span className="text-brass-gradient">nostri clienti.</span>
              </h2>
            </div>
          </SectionWrapper>
          <SectionWrapper delay={0.1}>
            <TestimonialCarousel />
          </SectionWrapper>
        </div>
      </section>
    </>
  )
}

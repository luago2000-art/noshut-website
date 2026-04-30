import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { Hero } from '@/components/sections/Hero'
import { Servizi } from '@/components/sections/Servizi'
import { Gallery } from '@/components/sections/Gallery'
import { ChiSiamo } from '@/components/sections/ChiSiamo'
import { Testimonial } from '@/components/sections/Testimonial'
import { FAQ } from '@/components/sections/FAQ'
import { Contatti } from '@/components/sections/Contatti'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servizi />
        <Gallery />
        <ChiSiamo />
        <Testimonial />
        <FAQ />
        <Contatti />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

import type { Metadata } from 'next'
import { COMPANY } from './constants'

export const baseMetadata: Metadata = {
  title: 'NOSHUT — Pulizia Rack & Data Center | Roma',
  description:
    'Specialisti in pulizia rack, riordino cablaggi e bonifica data center. Partner B2B per system integrator e appalti pubblici IT in tutta Italia.',
  keywords: [
    'pulizia data center',
    'riordino rack',
    'bonifica server room',
    'pulizia rack roma',
    'manutenzione data center',
    'riordino cablaggi strutturati',
    'bonifica CED',
    'pulizia server',
    'noshut',
  ],
  authors: [{ name: COMPANY.owner }],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: COMPANY.website,
    siteName: COMPANY.name,
    title: 'NOSHUT — Pulizia Rack & Data Center',
    description: COMPANY.description,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'NOSHUT' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOSHUT — Pulizia Rack & Data Center',
    description: COMPANY.description,
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(COMPANY.website),
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: `${COMPANY.name} — ${COMPANY.owner}`,
  description: COMPANY.description,
  url: COMPANY.website,
  email: COMPANY.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Ventotene 38',
    addressLocality: 'Roma',
    postalCode: '00139',
    addressCountry: 'IT',
  },
  areaServed: 'Italia',
  serviceType: [
    'Pulizia Data Center',
    'Riordino Cablaggi Rack',
    'Bonifica Server Room',
    'Manutenzione Periodica CED',
    'Partner B2B IT',
  ],
  vatID: `IT${COMPANY.piva}`,
  priceRange: '€€',
}

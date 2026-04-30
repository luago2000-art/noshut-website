import type { Metadata } from 'next'
import { COMPANY } from './constants'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noshut.it'

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} — Pulizia Rack & Data Center | Roma`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    'Specialisti in pulizia rack, riordino cablaggi e bonifica data center. Partner B2B per system integrator e appalti pubblici IT. Operativi su tutta Italia.',
  keywords: [
    'pulizia data center',
    'riordino rack',
    'bonifica server room',
    'cablaggi rack',
    'partner IT appalti',
    'pulizia server room Roma',
    'subappalto IT',
    'system integrator',
    'manutenzione rack',
    'bonifica data center',
    'NOSHUT',
  ],
  authors: [{ name: COMPANY.owner }],
  creator: COMPANY.owner,
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: siteUrl,
    siteName: COMPANY.name,
    title: `${COMPANY.name} — Pulizia Rack & Data Center Professionale`,
    description:
      'Specialisti in pulizia rack, riordino cablaggi e bonifica data center per aziende IT e system integrator. Partner ideale per appalti pubblici.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NOSHUT — Pulizia Rack e Data Center Professionale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY.name} — Pulizia Rack & Data Center`,
    description:
      'Specialisti in pulizia rack, riordino cablaggi e bonifica data center. Partner B2B per system integrator.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: COMPANY.fullName,
  description: COMPANY.description,
  url: siteUrl,
  email: COMPANY.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Ventotene 38',
    addressLocality: 'Roma',
    addressRegion: 'RM',
    postalCode: '00139',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.9028,
    longitude: 12.4964,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Italia',
  },
  serviceType: [
    'Pulizia Data Center',
    'Riordino Cablaggi Rack',
    'Bonifica Server Room',
    'Manutenzione Periodica IT',
    'Subappalto IT B2B',
  ],
  vatID: `IT${COMPANY.piva}`,
  priceRange: '€€',
}

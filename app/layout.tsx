import type { Metadata } from 'next'
import { Outfit, Barlow_Condensed } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { baseMetadata, localBusinessSchema } from '@/lib/seo'
import { CustomCursor } from '@/components/common/CustomCursor'
import { SmoothScroll } from '@/components/common/SmoothScroll'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = baseMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      className={`${outfit.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white font-body">
        <SmoothScroll />
        <CustomCursor />
        {children}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  )
}

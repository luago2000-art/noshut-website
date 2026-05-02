export interface NavItem {
  label: string
  href: string
}

export interface ServiceItem {
  icon: string
  title: string
  description: string
  features: string[]
}

export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  rating: number
}

export interface FaqItem {
  question: string
  answer: string
}

export interface GalleryProject {
  folder: string
  title: string
  description: string
}

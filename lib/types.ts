export interface ServiceItem {
  id: string
  icon: string
  title: string
  description: string
  features: string[]
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  company: string
  quote: string
  rating: number
  avatar?: string
  logo?: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface BeforeAfterFolder {
  name: string
  title: string
  description: string
  location: string
}

export interface ContactFormData {
  name: string
  company: string
  email: string
  phone: string
  service: string
  message: string
}

export interface NavItem {
  label: string
  href: string
}

export interface StatItem {
  value: number
  suffix: string
  label: string
}

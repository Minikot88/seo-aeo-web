export type FAQ = {
  question: string
  answer: string
}

export type Offer = {
  price: number
  priceCurrency: 'THB'
  availability: 'InStock' | 'OutOfStock'
  url: string
}

export type Product = {
  id: string
  name: string
  slug: string
  price: number
  discount?: number
  category: string
  image: string
  affiliateUrl: string
  description: string

  // SEO
  seoTitle?: string
  seoDescription?: string

  // AEO / Schema
  faqs?: FAQ[]
  offer?: Offer
}

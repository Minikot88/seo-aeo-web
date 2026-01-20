export type FAQ = {
  question: string
  answer: string
}

export type Offer = {
  price: number
  priceCurrency: 'THB'
  availability:
    | 'https://schema.org/InStock'
    | 'https://schema.org/OutOfStock'
  url: string
}

export type Product = {
  id: string
  name: string
  slug: string
  price: number
  discount?: number
  category: string

  // image รองรับทั้ง string และหลายรูป
  image: string | string[]

  affiliateUrl: string
  description: string

  // SEO
  seoTitle?: string
  seoDescription?: string

  // AEO
  faqs?: FAQ[]
  offer?: Offer

  // Rich Snippet (optional)
  brand?: string
  sku?: string
  ratingValue?: number
  reviewCount?: number
}

import products from '@/data/products.json'
import { Product } from '@/types/product'

export function getAllProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function searchProducts(q: string): Product[] {
  const keyword = q.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  )
}

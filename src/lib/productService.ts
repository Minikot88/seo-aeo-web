import productsData from '@/data/products.json'
import { Product } from '@/types/product'

const products: Product[] = productsData

export function getAllProducts(): Product[] {
  return products
}

export function searchProducts(keyword: string): Product[] {
  const q = keyword.toLowerCase()

  return products.filter(p =>
    [p.name, p.category, p.description]
      .join(' ')
      .toLowerCase()
      .includes(q)
  )
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

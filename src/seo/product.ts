import type { Metadata } from 'next'
import { Product } from '@/types/product'

export function productSEO(product: Product): Metadata {
  return {
    title: `${product.name} ราคาถูก`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

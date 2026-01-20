import type { Metadata } from 'next'
import { Product } from '@/types/product'

export function productSEO(product: Product): Metadata {
  const image =
    typeof product.image === 'string'
      ? product.image
      : product.image?.[0]

  return {
    title: product.seoTitle || `${product.name} ราคาถูก`,
    description: product.seoDescription || product.description,

    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.description,
      images: image ? [image] : [],
    },
  }
}

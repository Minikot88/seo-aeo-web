import { Product } from '@/types/product'

export function productSchema(product: Product) {
  const image =
    typeof product.image === 'string'
      ? product.image
      : Array.isArray(product.image)
      ? product.image[0]
      : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: image ? [image] : [],
    sku: product.sku,
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,

    offers: product.offer
      ? {
          "@type": "Offer",
          price: product.offer.price,
          priceCurrency: product.offer.priceCurrency,
          availability: product.offer.availability,
          url: product.offer.url,
        }
      : undefined,

    aggregateRating:
      product.ratingValue && product.reviewCount
        ? {
            "@type": "AggregateRating",
            ratingValue: product.ratingValue,
            reviewCount: product.reviewCount,
          }
        : undefined,
  }
}

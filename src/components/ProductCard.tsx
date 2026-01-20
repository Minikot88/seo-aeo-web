'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import '@/styles/product-card.css'

const FALLBACK_IMAGE =
  'https://picsum.photos/300/300'

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount =
    typeof product.discount === 'number' && product.discount > 0

  const price = hasDiscount
    ? product.price - (product.price * product.discount!) / 100
    : product.price

  const imageSrc =
    typeof product.image === 'string' &&
    product.image.startsWith('http')
      ? product.image
      : FALLBACK_IMAGE

  return (
    <Link
      href={`/products/${product.slug}`}
      className="card"
    >
      <div className="img-wrap">
        <Image
          src={imageSrc}
          alt={product.name}
          width={300}
          height={300}
        />

        {hasDiscount && (
          <div className="badge-discount">
            -{product.discount}%
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="title">{product.name}</div>
        <div className="price">
          ฿{price.toLocaleString()}
        </div>
      </div>
    </Link>
  )
}

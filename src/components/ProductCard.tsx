'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import '@/styles/product-card.css'

export default function ProductCard({ product }: { product: Product }) {
  const hasImage =
    typeof product.image === 'string' && product.image.startsWith('http')

  return (
    <Link href={`/products/${product.slug}`} className="card">
      <div className="img-wrap">
        {hasImage ? (
          <Image src={product.image} alt={product.name} width={300} height={300} />
        ) : (
          <div className="img-placeholder">ไม่มีรูปสินค้า</div>
        )}

        <div className="badge-mall">Mall</div>
        <div className="badge-discount">-50%</div>
      </div>

      <div className="card-body">
        <div className="title">{product.name}</div>

        {/* ดาวรีวิว */}
        <div className="rating">⭐⭐⭐⭐⭐</div>

        {/* ป้าย */}
        <div className="tags">
          <span className="tag free">ส่งฟรี</span>
          <span className="tag extra">EXTRA COMM</span>
        </div>

        <div className="price-row">
          <span className="price">฿{product.price}</span>
        </div>

        <div className="meta">ขายได้ 100+ ชิ้น</div>
      </div>
    </Link>
  )
}

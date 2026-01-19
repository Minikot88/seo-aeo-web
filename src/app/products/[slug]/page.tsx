import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/productService'
import { productSEO } from '@/seo/product'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) return {}

  return productSEO(product)
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) return notFound()

  return (
    <main style={{ padding: 16 }}>
      <h1>{product.name}</h1>
      <p>฿{product.price}</p>
    </main>
  )
}

import { getAllProducts, searchProducts } from '@/lib/productService'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'

type SearchParams = {
  q?: string
}

type HomePageProps = {
  searchParams?: Promise<SearchParams>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const q = params?.q?.trim() ?? ''

  const products: Product[] = q
    ? searchProducts(q)
    : getAllProducts()

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: '16px auto',
        padding: '0 12px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))',
        gap: 10,
      }}
    >
      {products.length === 0 && (
        <p>ไม่พบสินค้าที่ค้นหา</p>
      )}

      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  )
}

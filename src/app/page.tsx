import { getAllProducts } from '@/lib/productService'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'

type HomePageProps = {
  searchParams?: Promise<{
    q?: string
  }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const q = params?.q?.toLowerCase() ?? ''

  const products: Product[] = getAllProducts().filter(p =>
    p.name.toLowerCase().includes(q)
  )

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
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </main>
  )
}

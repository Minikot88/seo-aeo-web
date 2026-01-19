import { getAllProducts } from '@/lib/productService'
import { Product } from '@/types/product'
import EditForm from './EditForm'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function EditProductPage({ params }: Props) {
  // ✅ unwrap params ให้ถูกต้อง (ห้ามใช้ params.id ตรง ๆ)
  const { id } = await params

  const products: Product[] = getAllProducts()

  // ✅ เลือกแบบเดียวให้ตรงกับ URL
  // ถ้าเข้า /admin/edit/p007 → ใช้ id
  const product = products.find(p => p.id === id)

  // ถ้าเข้า /admin/edit/vacuum-cleaner → ใช้ slug
  // const product = products.find(p => p.slug === id)

  if (!product) {
    return <p>ไม่พบสินค้า</p>
  }

  return <EditForm product={product} />
}

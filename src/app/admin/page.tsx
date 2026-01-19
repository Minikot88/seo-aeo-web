import { getAllProducts } from '@/lib/productService'
import AdminClient from './AdminClient'


export default function AdminPage() {
  const products = getAllProducts()
  return <AdminClient products={products} />
}

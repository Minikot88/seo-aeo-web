'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/types/product'
import '@/styles/admin/admin-base.css'
import '@/styles/admin/admin-list.css'

type Props = {
  products: Product[]
}

export default function AdminClient({ products }: Props) {
  const [q, setQ] = useState('')
  const router = useRouter()

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase())
  )

  async function handleDelete(id: string) {
    const ok = confirm('⚠️ ต้องการลบสินค้านี้หรือไม่ ?')
    if (!ok) return

    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      alert('❌ ลบสินค้าไม่สำเร็จ')
      return
    }

    router.refresh()
  }

  return (
    <main className="admin">
      <div className="admin-header">
        <div>
          <h1>📦 จัดการสินค้า</h1>
          <p className="subtitle">
            สินค้าทั้งหมด {products.length} รายการ
          </p>
        </div>

        <a href="/admin/add" className="btn primary">
          + เพิ่มสินค้า
        </a>
      </div>

      <div className="admin-search">
        <input
          placeholder="🔍 ค้นหาสินค้า..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="table-card">
        <div className="table-row header">
          <div>รูป</div>
          <div>ชื่อสินค้า</div>
          <div>ราคา</div>
          <div>จัดการ</div>
        </div>

        {filtered.map(p => (
          <div className="table-row" key={p.id}>
            <div className="thumb">
              <img src={p.image} alt={p.name} />
            </div>

            <div className="name">{p.name}</div>

            <div className="price">฿{p.price}</div>

            <div className="actions">
              <a href={`/admin/edit/${p.id}`} className="btn edit">
                แก้ไข
              </a>
              <button
                className="btn delete"
                onClick={() => handleDelete(p.id)}
              >
                ลบ
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty">ไม่พบสินค้า</div>
        )}
      </div>
    </main>
  )
}

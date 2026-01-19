'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import '@/styles/admin/admin-base.css'
import '@/styles/admin/admin-list.css'


type Props = {
  products: Product[]
}

export default function AdminClient({ products }: Props) {
  const [q, setQ] = useState('')

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <main className="admin">
      {/* header */}
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

      {/* search */}
      <div className="admin-search">
        <input
          placeholder="🔍 ค้นหาสินค้า..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      {/* table */}
      <div className="table-card">
        <div className="table-row header">
          <div>ชื่อสินค้า</div>
          <div>ราคา</div>
          <div>จัดการ</div>
        </div>

        {filtered.map(p => (
          <div className="table-row" key={p.id}>
            <div className="name">{p.name}</div>
            <div className="price">฿{p.price}</div>
            <div>
              <a href={`/admin/edit/${p.id}`} className="btn edit">
                แก้ไข
              </a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty">
            ไม่พบสินค้า
          </div>
        )}
      </div>
    </main>
  )
}

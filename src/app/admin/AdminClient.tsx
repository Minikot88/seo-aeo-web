'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Product } from '@/types/product'
import '@/styles/admin/admin-list.css'
import '@/styles/admin/admin-logout.css'

type Props = {
  products: Product[]
}

export default function AdminClient({ products }: Props) {
  const [q, setQ] = useState('')
  const [showLogout, setShowLogout] = useState(false)
  const router = useRouter()

  const filtered = products.filter(p =>
    [p.name, p.category, p.description]
      .join(' ')
      .toLowerCase()
      .includes(q.toLowerCase())
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
      {/* ===== TOP BAR ===== */}
      <div className="admin-topbar">
        <button
          className="logout-btn"
          onClick={() => setShowLogout(true)}
        >
          ออกจากระบบ
        </button>
      </div>

      {/* ===== HEADER ===== */}
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

      {/* ===== SEARCH ===== */}
      <div className="admin-search">
        <input
          placeholder="🔍 ค้นหาสินค้า..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      {/* ===== TABLE ===== */}
      <div className="table-card">
        <div className="table-row header">
          <div>รูป</div>
          <div>สินค้า</div>
          <div>ราคา</div>
          <div>ลิงก์</div>
          <div>จัดการ</div>
        </div>

        {filtered.map(p => {
          const finalPrice = p.discount
            ? p.price - (p.price * p.discount) / 100
            : p.price

          const hasImage =
            typeof p.image === 'string' &&
            (p.image.startsWith('http') || p.image.startsWith('/'))

          return (
            <div className="table-row" key={p.id}>
              <div className="thumb">
                {hasImage ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={80}
                    height={50}
                  />
                ) : (
                  <div className="no-image">ไม่มีรูป</div>
                )}
              </div>

              <div className="name">
                <strong>{p.name}</strong>
                <div className="category">{p.category}</div>
              </div>

              <div className="price">
                ฿{finalPrice.toLocaleString()}
              </div>

              <div className="link">
                <a
                  href={p.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  เปิดลิงก์
                </a>
              </div>

              <div className="actions">
                <a
                  href={`/admin/edit/${p.id}`}
                  className="btn edit"
                >
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
          )
        })}

        {filtered.length === 0 && (
          <div className="empty">ไม่พบสินค้า</div>
        )}
      </div>

      {/* ===== LOGOUT MODAL ===== */}
      {showLogout && (
        <div className="logout-backdrop">
          <div className="logout-modal">
            <h3>ออกจากระบบ</h3>
            <p>คุณต้องการออกจากระบบผู้ดูแลหรือไม่</p>

            <div className="logout-actions">
              <button
                className="btn cancel"
                onClick={() => setShowLogout(false)}
              >
                ยกเลิก
              </button>

              <a
                href="/api/auth/logout"
                className="btn danger"
              >
                ออกจากระบบ
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

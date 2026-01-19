'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import '@/styles/admin/admin-base.css'
import '@/styles/admin/admin-edit.css'

export default function EditForm({ product }: { product: Product }) {
  const [data, setData] = useState<Product>(product)
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)

    await fetch('/api/products', {
      method: 'PUT',
      body: JSON.stringify(data),
    })

    setSaving(false)
    alert('บันทึกเรียบร้อย')
  }

  return (
    <main className="admin admin-form">
      <h1>✏️ แก้ไขสินค้า</h1>

      <div className="form-grid">
        <label>ชื่อสินค้า</label>
        <input
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
        />

        <label>ราคา</label>
        <input
          type="number"
          value={data.price}
          onChange={e =>
            setData({ ...data, price: Number(e.target.value) })
          }
        />

        <label>หมวดหมู่</label>
        <input
          value={data.category}
          onChange={e =>
            setData({ ...data, category: e.target.value })
          }
        />

        <label>รูปสินค้า (URL)</label>
        <input
          value={data.image}
          onChange={e =>
            setData({ ...data, image: e.target.value })
          }
        />

        <label>Affiliate URL</label>
        <input
          value={data.affiliateUrl}
          onChange={e =>
            setData({ ...data, affiliateUrl: e.target.value })
          }
        />

        <label>รายละเอียดสินค้า</label>
        <textarea
          value={data.description}
          onChange={e =>
            setData({ ...data, description: e.target.value })
          }
        />
      </div>

      <h3>SEO</h3>

      <div className="form-grid">
        <label>SEO Title</label>
        <input
          value={data.seoTitle ?? ''}
          onChange={e =>
            setData({ ...data, seoTitle: e.target.value })
          }
        />

        <label>SEO Description</label>
        <textarea
          value={data.seoDescription ?? ''}
          onChange={e =>
            setData({ ...data, seoDescription: e.target.value })
          }
        />
      </div>

      <button className="btn primary" onClick={save} disabled={saving}>
        {saving ? 'กำลังบันทึก...' : 'บันทึก'}
      </button>
    </main>
  )
}

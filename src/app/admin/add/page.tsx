'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import '@/styles/admin/admin-base.css'
import '@/styles/admin/admin-add.css'

export default function AddProductPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [saving, setSaving] = useState(false)

  async function save() {
    if (!name) return alert('กรุณาใส่ชื่อสินค้า')

    setSaving(true)

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      price,
      category: 'general',
      image: '',
      affiliateUrl: '',
      description: '',
      seoTitle: name,
      seoDescription: name,
    }

    await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
    })

    location.href = '/admin'
  }

  return (
    <main className="admin admin-form">
      <h1>➕ เพิ่มสินค้า</h1>

      <div className="form-card">
        <div className="form-group">
          <label>ชื่อสินค้า</label>
          <input
            placeholder="เช่น หูฟัง Bluetooth"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>ราคา (บาท)</label>
          <input
            type="number"
            placeholder="เช่น 599"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
          />
        </div>

        <div className="form-actions">
          <button onClick={save} disabled={saving}>
            {saving ? 'กำลังบันทึก...' : 'บันทึกสินค้า'}
          </button>
        </div>
      </div>
    </main>
  )
}

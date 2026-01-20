'use client'

import { useState } from 'react'
import { Product, FAQ } from '@/types/product'
import '@/styles/admin/admin-edit.css'

export default function EditForm({ product }: { product: Product }) {
  const [data, setData] = useState<Product>({
    ...product,
    faqs: product.faqs ?? [],
  })
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)

    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setSaving(false)
    alert('✅ บันทึกเรียบร้อย')
  }

  function addFaq() {
    setData({
      ...data,
      faqs: [...(data.faqs ?? []), { question: '', answer: '' }],
    })
  }

  function updateFaq(index: number, key: keyof FAQ, value: string) {
    const copy = [...(data.faqs ?? [])]
    copy[index] = { ...copy[index], [key]: value }
    setData({ ...data, faqs: copy })
  }

  function removeFaq(index: number) {
    const copy = [...(data.faqs ?? [])]
    copy.splice(index, 1)
    setData({ ...data, faqs: copy })
  }

  return (
    <main className="admin admin-form">
      {/* ===== HEADER ===== */}
      <div className="form-header">
        <button
          className="btn ghost back-top"
          onClick={() => history.back()}
          disabled={saving}
        >
          ← ย้อนกลับ
        </button>
        <h1>✏️ แก้ไขสินค้า</h1>
      </div>

      <div className="form-card">
        {/* ===== PRODUCT ===== */}
        <h2>ข้อมูลสินค้า</h2>

        <input
          placeholder="ชื่อสินค้า"
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="ราคา"
          value={data.price}
          onChange={e =>
            setData({ ...data, price: Number(e.target.value) })
          }
        />

        <input
          placeholder="หมวดหมู่"
          value={data.category}
          onChange={e =>
            setData({ ...data, category: e.target.value })
          }
        />

        <input
          placeholder="รูปสินค้า (URL)"
          value={data.image}
          onChange={e =>
            setData({ ...data, image: e.target.value })
          }
        />

        <input
          placeholder="Affiliate URL"
          value={data.affiliateUrl}
          onChange={e =>
            setData({ ...data, affiliateUrl: e.target.value })
          }
        />

        <textarea
          placeholder="รายละเอียดสินค้า"
          value={data.description}
          onChange={e =>
            setData({ ...data, description: e.target.value })
          }
        />

        {/* ===== SEO ===== */}
        <h2>SEO</h2>

        <input
          placeholder="SEO Title"
          value={data.seoTitle ?? ''}
          onChange={e =>
            setData({ ...data, seoTitle: e.target.value })
          }
        />

        <textarea
          placeholder="SEO Description"
          value={data.seoDescription ?? ''}
          onChange={e =>
            setData({
              ...data,
              seoDescription: e.target.value,
            })
          }
        />

        {/* ===== FAQ (AEO) ===== */}
        <h2>FAQ (AEO)</h2>

        {(data.faqs ?? []).map((f, i) => (
          <div className="faq-item" key={i}>
            <input
              placeholder="คำถาม"
              value={f.question}
              onChange={e =>
                updateFaq(i, 'question', e.target.value)
              }
            />

            <textarea
              placeholder="คำตอบ"
              value={f.answer}
              onChange={e =>
                updateFaq(i, 'answer', e.target.value)
              }
            />

            <button
              className="btn delete small"
              onClick={() => removeFaq(i)}
              type="button"
            >
              ลบคำถาม
            </button>
          </div>
        ))}

        <button
          className="btn ghost"
          onClick={addFaq}
          type="button"
        >
          + เพิ่ม FAQ
        </button>

        {/* ===== ACTION ===== */}
        <div className="form-actions">
          <button
            className="btn primary"
            onClick={save}
            disabled={saving}
          >
            {saving ? 'กำลังบันทึก...' : '💾 บันทึกการแก้ไข'}
          </button>
        </div>
      </div>
    </main>
  )
}
